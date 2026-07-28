<?php
/**
 * Serve cached HTML for anonymous visitors before WordPress bootstraps.
 */

if ( PHP_SAPI === 'cli' ) {
	return;
}

if ( ! defined( 'WP_CONTENT_DIR' ) ) {
	return;
}

if ( ( $_SERVER['REQUEST_METHOD'] ?? 'GET' ) !== 'GET' ) {
	return;
}

$uri = $_SERVER['REQUEST_URI'] ?? '/';
$exclude = array( '/wp-admin', '/wp-login', '/cart', '/checkout', '/my-account', 'add-to-cart', '/wp-json' );

foreach ( $exclude as $path ) {
	if ( false !== stripos( $uri, $path ) ) {
		return;
	}
}

if ( ! empty( $_COOKIE['wordpress_logged_in_'] ) || ! empty( $_COOKIE['woocommerce_items_in_cart'] ) ) {
	return;
}

$cache_dir = WP_CONTENT_DIR . '/cache/page-cache';
$cache_key = md5( ( $_SERVER['HTTP_HOST'] ?? '' ) . $uri );
$cache_file = $cache_dir . '/' . $cache_key . '.html';
$cache_ttl = 3600;

if ( is_readable( $cache_file ) && ( time() - filemtime( $cache_file ) ) < $cache_ttl ) {
	header( 'Content-Type: text/html; charset=UTF-8' );
	header( 'X-Page-Cache: HIT' );
	readfile( $cache_file );
	exit;
}
