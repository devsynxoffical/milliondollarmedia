<?php
/**
 * Local development router for PHP built-in server (php -S localhost:8000 router.php)
 */

$root = $_SERVER['DOCUMENT_ROOT'];
$path = parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH );
$file = $root . $path;

// Serve static files directly if they exist
if ( $path !== '/' && file_exists( $file ) && ! is_dir( $file ) ) {
	return false;
}

// Serve directory index if exists
if ( is_dir( $file ) && file_exists( rtrim( $file, '/' ) . '/index.php' ) ) {
	require rtrim( $file, '/' ) . '/index.php';
	return;
}

// Route all other requests through WordPress index.php
$_SERVER['SCRIPT_NAME'] = '/index.php';
require_once $root . '/index.php';
