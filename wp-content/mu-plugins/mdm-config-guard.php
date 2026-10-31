<?php
/**
 * Plugin Name: Million Dollar Media - Database Login Guard
 * Description: Keeps a copy of the working database login in wp-config-server.php so
 *              Git deploys (which replace wp-config.php) can never take the site down.
 *              Runs only while the site is connected with a real login; never prints secrets.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'muplugins_loaded',
	static function () {
		if ( ! defined( 'DB_NAME' ) || ! defined( 'DB_USER' ) || ! defined( 'DB_HOST' ) ) {
			return;
		}
		// Never save the repo's placeholder login.
		if ( 'milliondollarmedia_local' === DB_NAME || '' === DB_NAME ) {
			return;
		}

		$target = ABSPATH . 'wp-config-server.php';
		$above  = dirname( rtrim( ABSPATH, '/\\' ) ) . '/wp-config-server.php';
		// wp-config.php reads the file above public_html first; if one exists there, keep that one current.
		if ( @is_readable( $above ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors
			$target = $above;
		}

		$current = @file_get_contents( $target ); // phpcs:ignore
		$marker  = '/* mdm-login: ' . md5( DB_NAME . '|' . DB_USER . '|' . DB_HOST . '|' . ( defined( 'DB_PASSWORD' ) ? DB_PASSWORD : '' ) ) . ' */';
		if ( is_string( $current ) && false !== strpos( $current, $marker ) ) {
			return; // Already up to date.
		}
		// A hand-made file with a real, different login: leave it alone.
		if ( is_string( $current ) && preg_match( "/define\\s*\\(\\s*['\"]DB_NAME['\"]\\s*,\\s*['\"]([^'\"]+)['\"]/", $current, $m )
			&& 'milliondollarmedia_local' !== $m[1] && false === strpos( $current, 'mdm-login:' )
			&& false === strpos( $current, 'wp_configure_database_from_env' ) ) {
			return;
		}

		global $table_prefix;
		$lines   = array( '<?php', '// Saved automatically by mdm-config-guard.php from the working site. Do not commit to Git.', $marker );
		$consts  = array( 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_CHARSET', 'DB_COLLATE', 'AUTH_KEY', 'SECURE_AUTH_KEY', 'LOGGED_IN_KEY', 'NONCE_KEY', 'AUTH_SALT', 'SECURE_AUTH_SALT', 'LOGGED_IN_SALT', 'NONCE_SALT' );
		foreach ( $consts as $c ) {
			if ( defined( $c ) && ! ( 'put-unique-phrase-here' === constant( $c ) ) ) {
				$lines[] = "defined( '" . $c . "' ) || define( '" . $c . "', " . var_export( (string) constant( $c ), true ) . ' );'; // phpcs:ignore
			}
		}
		if ( ! empty( $table_prefix ) && is_string( $table_prefix ) ) {
			$lines[] = '$wp_server_table_prefix = ' . var_export( $table_prefix, true ) . ';'; // phpcs:ignore
		}
		$php = implode( "\n", $lines ) . "\n";

		// Write atomically so a half-written file can never break the site.
		$tmp = $target . '.tmp-' . mt_rand( 1000, 9999 ); // wp_rand() is not loaded yet at this point
		if ( false !== @file_put_contents( $tmp, $php, LOCK_EX ) ) { // phpcs:ignore
			@chmod( $tmp, 0640 ); // phpcs:ignore
			if ( ! @rename( $tmp, $target ) ) { // phpcs:ignore
				@unlink( $tmp ); // phpcs:ignore
			}
		}
	},
	1
);
