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

/*
 * One-time fix (admin only): a custom code snippet on checkout ticks the Klaviyo newsletter box with
 * .trigger('change') inside its own change listener -> endless loop ("Maximum call stack size exceeded").
 * POST /wp-json/mdm/v1/fix-checkout-snippet finds it (WPCode / Insert Headers & Footers / Elementor custom code),
 * keeps a backup and makes it tick the box only when it is not ticked yet.
 */
add_action(
	'rest_api_init',
	static function () {
		register_rest_route(
			'mdm/v1',
			'/fix-checkout-snippet',
			array(
				'methods'             => 'POST',
				'permission_callback' => static function () {
					return current_user_can( 'manage_options' );
				},
				'callback'            => static function () {
					$re   = '/function\s+forceChecked\s*\(\s*\)\s*\{\s*\$\(\s*([\'"])#kl_newsletter_checkbox\1\s*\)\s*\.prop\(\s*([\'"])checked\2\s*,\s*true\s*\)\s*\.trigger\(\s*([\'"])change\3\s*\)\s*;?\s*\}/';
					$fix  = "function forceChecked() {\n        var \$c = \$('#kl_newsletter_checkbox');\n        if ( \$c.length && ! \$c.prop('checked') ) { \$c.prop('checked', true).trigger('change'); }\n    }";
					$done = array();
					// Options (Insert Headers & Footers / WPCode global header-footer).
					foreach ( array( 'ihaf_insert_header', 'ihaf_insert_body', 'ihaf_insert_footer' ) as $opt ) {
						$v = get_option( $opt );
						if ( is_string( $v ) && preg_match( $re, $v ) ) {
							update_option( 'mdm_backup_' . $opt, $v, false );
							update_option( $opt, preg_replace( $re, $fix, $v ) );
							$done[] = 'option:' . $opt;
						}
					}
					// WPCode snippets and Elementor custom code (post content or meta).
					$posts = get_posts( array( 'post_type' => array( 'wpcode', 'elementor_snippet' ), 'post_status' => 'any', 'numberposts' => 200 ) );
					foreach ( $posts as $p ) {
						if ( preg_match( $re, $p->post_content ) ) {
							update_post_meta( $p->ID, '_mdm_backup_content', $p->post_content );
							wp_update_post( array( 'ID' => $p->ID, 'post_content' => wp_slash( preg_replace( $re, $fix, $p->post_content ) ) ) );
							$done[] = $p->post_type . ':' . $p->ID . ' content';
						}
						foreach ( array( '_elementor_code', '_wpcode_code' ) as $mk ) {
							$m = get_post_meta( $p->ID, $mk, true );
							if ( is_string( $m ) && preg_match( $re, $m ) ) {
								update_post_meta( $p->ID, '_mdm_backup' . $mk, $m );
								update_post_meta( $p->ID, $mk, wp_slash( preg_replace( $re, $fix, $m ) ) );
								$done[] = $p->post_type . ':' . $p->ID . ' ' . $mk;
							}
						}
					}
					if ( $done && function_exists( 'wpcode' ) && isset( wpcode()->cache ) && method_exists( wpcode()->cache, 'cache_all_loaded_snippets' ) ) {
						wpcode()->cache->cache_all_loaded_snippets(); // refresh WPCode's snippet cache
					}
					if ( function_exists( 'mdm_api_clear_elementor_css' ) ) {
						mdm_api_clear_elementor_css();
					}
					return array( 'fixed' => $done );
				},
			)
		);
	}
);
