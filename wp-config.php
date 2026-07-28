<?php
define( 'WP_CACHE', false );





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

	define( 'DB_NAME', wp_env( 'MYSQLDATABASE', wp_env( 'DB_NAME', '' ) ) );
	define( 'DB_USER', wp_env( 'MYSQLUSER', wp_env( 'DB_USER', '' ) ) );
	define( 'DB_PASSWORD', wp_env( 'MYSQLPASSWORD', wp_env( 'DB_PASSWORD', '' ) ) );

	$db_host = wp_env( 'MYSQLHOST', wp_env( 'DB_HOST', '127.0.0.1' ) );
	$db_port = wp_env( 'MYSQLPORT', wp_env( 'DB_PORT', '' ) );
	define( 'DB_HOST', $db_port ? $db_host . ':' . $db_port : $db_host );
}

// ** Database settings - provided by Railway environment variables ** //
wp_configure_database_from_env();

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

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
define( 'AUTH_KEY',          wp_env( 'AUTH_KEY', 'put-unique-phrase-here' ) );
define( 'SECURE_AUTH_KEY',   wp_env( 'SECURE_AUTH_KEY', 'put-unique-phrase-here' ) );
define( 'LOGGED_IN_KEY',     wp_env( 'LOGGED_IN_KEY', 'put-unique-phrase-here' ) );
define( 'NONCE_KEY',         wp_env( 'NONCE_KEY', 'put-unique-phrase-here' ) );
define( 'AUTH_SALT',         wp_env( 'AUTH_SALT', 'put-unique-phrase-here' ) );
define( 'SECURE_AUTH_SALT',  wp_env( 'SECURE_AUTH_SALT', 'put-unique-phrase-here' ) );
define( 'LOGGED_IN_SALT',    wp_env( 'LOGGED_IN_SALT', 'put-unique-phrase-here' ) );
define( 'NONCE_SALT',        wp_env( 'NONCE_SALT', 'put-unique-phrase-here' ) );
define( 'WP_CACHE_KEY_SALT', wp_env( 'WP_CACHE_KEY_SALT', 'put-unique-phrase-here' ) );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'dbj_';


/* Add any custom values between this line and the "stop editing" line. */

// Railway/reverse-proxy: ensure WordPress detects HTTPS correctly.
if ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && 'https' === $_SERVER['HTTP_X_FORWARDED_PROTO'] ) {
	$_SERVER['HTTPS'] = 'on';
}

if ( isset( $_SERVER['HTTP_X_FORWARDED_HOST'] ) ) {
	$_SERVER['HTTP_HOST'] = $_SERVER['HTTP_X_FORWARDED_HOST'];
}

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

if ( 'https' === wp_env( 'FORCE_SSL_ADMIN', 'https' ) ) {
	define( 'FORCE_SSL_ADMIN', true );
}
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
@include_once('/var/lib/sec/wp-settings-pre.php'); // Added by SiteGround WordPress management system
require_once ABSPATH . 'wp-settings.php';
@include_once('/var/lib/sec/wp-settings.php'); // Added by SiteGround WordPress management system
