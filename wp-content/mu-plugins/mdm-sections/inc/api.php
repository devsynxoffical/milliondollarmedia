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
					);
				},
			)
		);
	}
);
