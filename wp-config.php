<?php
define( 'WP_CACHE', true );





 // By Speed Optimizer by SiteGround





 // By Speed Optimizer by SiteGround

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

/**
 * Read environment variables with optional fallback.
 *
 * Railway provides variables like MYSQLHOST/MYSQLPORT/MYSQLDATABASE/MYSQLUSER/MYSQLPASSWORD.
 */
function wp_env( $key, $default = null ) {
	$value = getenv( $key );
	return false === $value || '' === $value ? $default : $value;
}

/**
 * Parse Railway-style MySQL URL into WordPress DB constants.
 */
function wp_configure_database_from_env() {
	$mysql_url = wp_env( 'MYSQL_URL' ) ?: wp_env( 'DATABASE_URL' );

	if ( $mysql_url ) {
		$url = parse_url( $mysql_url );

		if ( false !== $url && ! empty( $url['host'] ) ) {
			define( 'DB_NAME', ltrim( $url['path'] ?? '', '/' ) );
			define( 'DB_USER', rawurldecode( $url['user'] ?? '' ) );
			define( 'DB_PASSWORD', rawurldecode( $url['pass'] ?? '' ) );

			$host = $url['host'];
			$port = $url['port'] ?? wp_env( 'MYSQLPORT', '' );
			define( 'DB_HOST', $port ? $host . ':' . $port : $host );

			return;
		}
	}

	define( 'DB_NAME', wp_env( 'MYSQLDATABASE', wp_env( 'DB_NAME', 'milliondollarmedia_local' ) ) );
	define( 'DB_USER', wp_env( 'MYSQLUSER', wp_env( 'DB_USER', 'root' ) ) );
	define( 'DB_PASSWORD', wp_env( 'MYSQLPASSWORD', wp_env( 'DB_PASSWORD', '' ) ) );

	$db_host = wp_env( 'MYSQLHOST', wp_env( 'DB_HOST', '127.0.0.1' ) );
	$db_port = wp_env( 'MYSQLPORT', wp_env( 'DB_PORT', '' ) );
	define( 'DB_HOST', $db_port ? $db_host . ':' . $db_port : $db_host );
}

/*
 * Server-specific secrets (Hostinger, etc.).
 *
 * Put a file called "wp-config-server.php" in the folder ABOVE public_html
 * (recommended: it is not web-accessible and Git deploys never touch it),
 * or next to this file. It should define DB_NAME, DB_USER, DB_PASSWORD,
 * DB_HOST and, ideally, the AUTH_KEY ... NONCE_SALT keys.
 * The file is ignored by Git, so deploying never overwrites it.
 */
$wp_server_table_prefix = null;
foreach ( array( dirname( __DIR__ ) . '/wp-config-server.php', __DIR__ . '/wp-config-server.php' ) as $wp_server_config ) {
	if ( ! @is_readable( $wp_server_config ) ) { // @: some hosts restrict paths outside public_html
		continue;
	}
	$wp_server_src = (string) file_get_contents( $wp_server_config );
	if ( false === strpos( $wp_server_src, 'wp-settings.php' ) ) {
		// A small file with just the define()s: load it directly.
		require_once $wp_server_config;
	} else {
		// A full copy of the host's old wp-config.php: read only the values we need.
		$wp_server_keys = array( 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_CHARSET', 'DB_COLLATE', 'AUTH_KEY', 'SECURE_AUTH_KEY', 'LOGGED_IN_KEY', 'NONCE_KEY', 'AUTH_SALT', 'SECURE_AUTH_SALT', 'LOGGED_IN_SALT', 'NONCE_SALT', 'WP_CACHE_KEY_SALT' );
		foreach ( $wp_server_keys as $wp_k ) {
			if ( ! defined( $wp_k ) && preg_match( '/define\s*\(\s*[\'"]' . $wp_k . '[\'"]\s*,\s*(\'((?:[^\'\\\\]|\\\\.)*)\'|"((?:[^"\\\\]|\\\\.)*)")\s*\)/', $wp_server_src, $wp_m ) ) {
				define( $wp_k, isset( $wp_m[3] ) && '' !== $wp_m[3] ? stripcslashes( $wp_m[3] ) : stripslashes( $wp_m[2] ) );
			}
		}
		if ( preg_match( '/\$table_prefix\s*=\s*[\'"]([A-Za-z0-9_]+)[\'"]/', $wp_server_src, $wp_m ) ) {
			$wp_server_table_prefix = $wp_m[1];
		}
		unset( $wp_server_keys, $wp_k, $wp_m );
	}
	unset( $wp_server_src );
	break;
}
unset( $wp_server_config );

// ** Database settings - from wp-config-server.php, else Railway environment variables ** //
if ( ! defined( 'DB_NAME' ) ) {
	wp_configure_database_from_env();
}

/** Database charset to use in creating database tables. */
defined( 'DB_CHARSET' ) || define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
defined( 'DB_COLLATE' ) || define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
foreach ( array( 'AUTH_KEY', 'SECURE_AUTH_KEY', 'LOGGED_IN_KEY', 'NONCE_KEY', 'AUTH_SALT', 'SECURE_AUTH_SALT', 'LOGGED_IN_SALT', 'NONCE_SALT', 'WP_CACHE_KEY_SALT' ) as $wp_salt_key ) {
	if ( ! defined( $wp_salt_key ) ) {
		define( $wp_salt_key, wp_env( $wp_salt_key, 'put-unique-phrase-here' ) );
	}
}
unset( $wp_salt_key );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = $wp_server_table_prefix ? $wp_server_table_prefix : 'dbj_';


/* Add any custom values between this line and the "stop editing" line. */

// Railway/reverse-proxy: ensure WordPress detects HTTPS correctly.
if ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && 'https' === $_SERVER['HTTP_X_FORWARDED_PROTO'] ) {
	$_SERVER['HTTPS'] = 'on';
	$_SERVER['SERVER_PORT'] = 443;
}

if ( isset( $_SERVER['HTTP_X_FORWARDED_HOST'] ) ) {
	$_SERVER['HTTP_HOST'] = $_SERVER['HTTP_X_FORWARDED_HOST'];
}

// Strip internal container ports (e.g., :8080) from HTTP_HOST if present on non-localhost domains
if ( isset( $_SERVER['HTTP_HOST'] ) && false === strpos( $_SERVER['HTTP_HOST'], 'localhost' ) ) {
	$_SERVER['HTTP_HOST'] = preg_replace( '/:\d+$/', '', $_SERVER['HTTP_HOST'] );
}

define( 'DISABLE_WP_CRON', true );
define( 'WP_MEMORY_LIMIT', '512M' );
define( 'WP_MAX_MEMORY_LIMIT', '512M' );
define( 'WP_POST_REVISIONS', 5 );
define( 'AUTOSAVE_INTERVAL', 300 );
define( 'EMPTY_TRASH_DAYS', 7 );

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */

// wp-config.php, above /* That's all, stop editing! */
define( 'WP_DEBUG', '1' === wp_env( 'WP_DEBUG', '0' ) );
define( 'WP_DEBUG_LOG', '1' === wp_env( 'WP_DEBUG_LOG', '0' ) );
define( 'WP_DEBUG_DISPLAY', '1' === wp_env( 'WP_DEBUG_DISPLAY', '0' ) );

if ( wp_env( 'WP_HOME' ) ) {
	define( 'WP_HOME', wp_env( 'WP_HOME' ) );
}

if ( wp_env( 'WP_SITEURL' ) ) {
	define( 'WP_SITEURL', wp_env( 'WP_SITEURL' ) );
}

if ( isset( $_SERVER['HTTP_HOST'] ) && false !== strpos( $_SERVER['HTTP_HOST'], 'localhost' ) ) {
	define( 'FORCE_SSL_ADMIN', false );
} elseif ( 'https' === wp_env( 'FORCE_SSL_ADMIN', 'https' ) ) {
	define( 'FORCE_SSL_ADMIN', true );
}
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
