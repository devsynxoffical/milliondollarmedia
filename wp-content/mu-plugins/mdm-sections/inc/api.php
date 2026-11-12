<?php
/**
 * Make WordPress Application Passwords work on hosts that move or hide the
 * Authorization header (some LiteSpeed / CDN setups), plus a small check endpoint:
 *   GET /wp-json/mdm/v1/auth-check  ->  { header_seen, logged_in, user, can_edit }
 * Never returns any part of a password.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Find the Authorization header wherever the server put it. */
function mdm_find_auth_header() {
	foreach ( array( 'HTTP_AUTHORIZATION', 'REDIRECT_HTTP_AUTHORIZATION', 'REDIRECT_REDIRECT_HTTP_AUTHORIZATION', 'HTTP_X_AUTHORIZATION' ) as $k ) {
		if ( ! empty( $_SERVER[ $k ] ) ) {
			return (string) $_SERVER[ $k ]; // phpcs:ignore
		}
	}
	if ( function_exists( 'getallheaders' ) ) {
		foreach ( (array) getallheaders() as $name => $value ) {
			if ( in_array( strtolower( $name ), array( 'authorization', 'x-authorization' ), true ) && $value ) {
				return (string) $value;
			}
		}
	}
	return '';
}

// Runs as the mu-plugin loads, before WordPress decides who the current user is.
( static function () {
	if ( ! empty( $_SERVER['PHP_AUTH_USER'] ) ) {
		return;
	}
	$h = mdm_find_auth_header();
	if ( $h && 0 === stripos( $h, 'basic ' ) ) {
		$pair = base64_decode( substr( $h, 6 ), true ); // phpcs:ignore
		if ( $pair && false !== strpos( $pair, ':' ) ) {
			list( $user, $pass )      = explode( ':', $pair, 2 );
			$_SERVER['PHP_AUTH_USER'] = $user;
			$_SERVER['PHP_AUTH_PW']   = $pass;
		}
	}
} )();

// Some plugins look up the current user before WordPress knows this is an API request; the
// Application Password is then never checked. Re-run WordPress's own check for API requests.
add_action(
	'rest_api_init',
	static function () {
		if ( get_current_user_id() || empty( $_SERVER['PHP_AUTH_USER'] ) || ! function_exists( 'wp_authenticate_application_password' ) ) {
			return;
		}
		$user = wp_authenticate_application_password( null, (string) $_SERVER['PHP_AUTH_USER'], (string) ( isset( $_SERVER['PHP_AUTH_PW'] ) ? $_SERVER['PHP_AUTH_PW'] : '' ) ); // phpcs:ignore
		if ( $user instanceof WP_User ) {
			wp_set_current_user( $user->ID );
		} elseif ( is_wp_error( $user ) ) {
			$GLOBALS['mdm_app_pw_error'] = $user->get_error_code();
		}
	},
	0
);

add_action(
	'rest_api_init',
	static function () {
		register_rest_route(
			'mdm/v1',
			'/auth-check',
			array(
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'callback'            => static function () {
					$u = wp_get_current_user();
					return array(
						'header_seen' => '' !== mdm_find_auth_header() || ! empty( $_SERVER['PHP_AUTH_USER'] ), // phpcs:ignore
						'logged_in'   => $u && $u->ID > 0,
						'user'        => $u && $u->ID ? $u->user_login : null,
						'can_edit'    => current_user_can( 'edit_pages' ),
						'error'       => isset( $GLOBALS['mdm_app_pw_error'] ) ? $GLOBALS['mdm_app_pw_error'] : null, // e.g. incorrect_password / invalid_username
						'scheme'      => strtolower( strtok( mdm_find_auth_header() . ' ', ' ' ) ), // "basic" / "bearer" only, never the value
						'user_sent'   => ! empty( $_SERVER['PHP_AUTH_USER'] ), // phpcs:ignore
						'app_pw_in_use' => class_exists( 'WP_Application_Passwords' ) ? WP_Application_Passwords::is_in_use() : null,
					);
				},
			)
		);
	}
);

/*
 * Admin-only Elementor helpers (need a logged-in user who can edit the page):
 *   GET  /wp-json/mdm/v1/elementor/<id>        -> { id, data } (the page's _elementor_data JSON)
 *   POST /wp-json/mdm/v1/elementor/<id>  {data} -> saves it (old copy kept in option mdm_api_backup_<id>), clears CSS
 *   POST /wp-json/mdm/v1/elementor-css         -> regenerates Elementor's CSS files
 */
function mdm_api_clear_elementor_css() {
	if ( class_exists( '\Elementor\Plugin' ) && isset( \Elementor\Plugin::$instance->files_manager ) ) {
		\Elementor\Plugin::$instance->files_manager->clear_cache();
	}
	if ( function_exists( 'mdm_clear_page_cache' ) ) {
		mdm_clear_page_cache();
	}
	do_action( 'litespeed_purge_all' );
}

add_action(
	'rest_api_init',
	static function () {
		$can = static function ( $req ) {
			$id = (int) $req['id'];
			return $id && current_user_can( 'edit_post', $id );
		};
		register_rest_route(
			'mdm/v1',
			'/elementor/(?P<id>\d+)',
			array(
				array(
					'methods'             => 'GET',
					'permission_callback' => $can,
					'callback'            => static function ( $req ) {
						$id = (int) $req['id'];
						return array( 'id' => $id, 'data' => get_post_meta( $id, '_elementor_data', true ) );
					},
				),
				array(
					'methods'             => 'POST',
					'permission_callback' => $can,
					'callback'            => static function ( $req ) {
						$id   = (int) $req['id'];
						$data = $req->get_param( 'data' );
						$data = is_string( $data ) ? $data : wp_json_encode( $data );
						if ( ! is_array( json_decode( $data, true ) ) ) {
							return new WP_Error( 'mdm_bad_data', 'data must be Elementor JSON', array( 'status' => 400 ) );
						}
						update_option( 'mdm_api_backup_' . $id, array( 'time' => time(), 'data' => get_post_meta( $id, '_elementor_data', true ) ), false );
						update_post_meta( $id, '_elementor_data', wp_slash( $data ) );
						delete_post_meta( $id, '_elementor_css' );
						mdm_api_clear_elementor_css();
						return array( 'saved' => true, 'id' => $id, 'backup' => 'mdm_api_backup_' . $id );
					},
				),
			)
		);
		register_rest_route(
			'mdm/v1',
			'/elementor-css',
			array(
				'methods'             => 'POST',
				'permission_callback' => static function () {
					return current_user_can( 'edit_pages' );
				},
				'callback'            => static function () {
					mdm_api_clear_elementor_css();
					return array( 'cleared' => true );
				},
			)
		);
	}
);
