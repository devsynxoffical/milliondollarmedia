<?php
/**
 * Permanent (301) redirects for pages whose slug was changed so the primary keyword is in the URL
 * (keyword rule: primary keyword in title, description, H1 and slug).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_redirect_map() {
	return array(
		'/real-estate/'              => '/real-estate-video-marketing/', // 2026-11-20, primary: real estate video marketing
		'/facebook-ads-for-roofers/' => '/roofing-video-ads/',           // 2026-11-20, primary: roofing video ads
	);
}

add_action(
	'template_redirect',
	static function () {
		$path = (string) wp_parse_url( isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '', PHP_URL_PATH ); // phpcs:ignore
		$path = '/' . trim( $path, '/' ) . '/';
		$map  = mdm_redirect_map();
		if ( isset( $map[ $path ] ) ) {
			$qs = isset( $_SERVER['QUERY_STRING'] ) && '' !== $_SERVER['QUERY_STRING'] ? '?' . wp_unslash( $_SERVER['QUERY_STRING'] ) : ''; // phpcs:ignore
			wp_safe_redirect( home_url( $map[ $path ] ) . $qs, 301, 'Million Dollar Media' );
			exit;
		}
	},
	1
);
