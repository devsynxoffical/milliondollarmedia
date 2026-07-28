<?php
/**
 * Railway performance tweaks without external CDN/Redis.
 */

/**
 * Disable SiteGround cache plugin on Railway.
 */
add_filter(
	'option_active_plugins',
	static function ( $plugins ) {
		if ( ! is_array( $plugins ) ) {
			return $plugins;
		}

		return array_values(
			array_filter(
				$plugins,
				static function ( $plugin ) {
					return false === strpos( $plugin, 'sg-cachepress' );
				}
			)
		);
	}
);

/**
 * Reduce WordPress overhead on public pages.
 */
add_action(
	'init',
	static function () {
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' );
		wp_deregister_script( 'wp-embed' );
	}
);

add_filter( 'heartbeat_settings', static function ( $settings ) {
	if ( ! is_admin() ) {
		$settings['interval'] = 60;
	}

	return $settings;
} );

/**
 * Save full-page HTML cache for anonymous visitors.
 */
add_action(
	'template_redirect',
	static function () {
		if ( is_admin() || is_user_logged_in() || is_search() || is_404() ) {
			return;
		}

		if ( function_exists( 'is_cart' ) && ( is_cart() || is_checkout() || is_account_page() ) ) {
			return;
		}

		if ( ! empty( $_COOKIE['woocommerce_items_in_cart'] ) ) {
			return;
		}

		ob_start(
			static function ( $html ) {
				if ( http_response_code() !== 200 || strlen( $html ) < 500 ) {
					return $html;
				}

				$cache_dir = WP_CONTENT_DIR . '/cache/page-cache';
				if ( ! is_dir( $cache_dir ) ) {
					wp_mkdir_p( $cache_dir );
				}

				$cache_key = md5( ( $_SERVER['HTTP_HOST'] ?? '' ) . ( $_SERVER['REQUEST_URI'] ?? '/' ) );
				file_put_contents( $cache_dir . '/' . $cache_key . '.html', $html );

				header( 'X-Page-Cache: MISS' );

				return $html;
			}
		);
	},
	0
);
