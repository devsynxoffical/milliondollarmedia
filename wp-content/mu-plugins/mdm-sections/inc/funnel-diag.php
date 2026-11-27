<?php
/**
 * GET /wp-json/mdm/v1/funnel-diag (admins only, read-only): what the sales funnel is configured with today,
 * so tracking and redirects can be built without guessing. Secrets (tokens, keys) are never returned.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_diag_mask( $v ) {
	if ( is_array( $v ) ) {
		$o = array();
		foreach ( $v as $k => $x ) {
			$o[ $k ] = preg_match( '/token|secret|key|password|pass|api/i', (string) $k ) ? ( $x ? '***set***' : '' ) : mdm_diag_mask( $x );
		}
		return $o;
	}
	return is_string( $v ) && strlen( $v ) > 300 ? substr( $v, 0, 300 ) . '...' : $v;
}

add_action(
	'rest_api_init',
	static function () {
		// Pause Pixel Cat's Facebook Pixel and Conversions API (the funnel engine sends both with shared event IDs). GA4 stays on.
		register_rest_route(
			'mdm/v1',
			'/pixelcat-pause',
			array(
				'methods'             => 'POST',
				'permission_callback' => static function () { return current_user_can( 'manage_options' ); },
				'callback'            => static function ( $req ) {
					$pc = get_option( 'fca_pc' );
					if ( ! is_array( $pc ) ) {
						return new WP_Error( 'mdm_no_pc', 'Pixel Cat settings not found', array( 'status' => 404 ) );
					}
					$undo = (bool) $req->get_param( 'undo' );
					if ( $undo ) {
						$b = get_option( 'mdm_backup_fca_pc' );
						if ( $b ) {
							update_option( 'fca_pc', $b );
						}
						return array( 'restored' => (bool) $b );
					}
					if ( ! get_option( 'mdm_backup_fca_pc' ) ) {
						update_option( 'mdm_backup_fca_pc', $pc, false );
					}
					$done = array();
					foreach ( (array) ( $pc['pixels'] ?? array() ) as $i => $px ) {
						$j = json_decode( stripslashes( (string) $px ), true );
						if ( is_array( $j ) && in_array( $j['type'] ?? '', array( 'Facebook Pixel', 'Conversions API' ), true ) ) {
							$j['paused']           = true;
							$pc['pixels'][ $i ] = addslashes( wp_json_encode( $j ) );
							$done[]             = $j['type'];
						}
					}
					// Its Facebook event rules still call fbq() on the engine's pixel, so remove them too (backup keeps the originals).
					$keep = array();
					foreach ( (array) ( $pc['events'] ?? array() ) as $ev ) {
						$j = json_decode( stripslashes( (string) $ev ), true );
						if ( is_array( $j ) && 'Facebook' === ( $j['pixel_type'] ?? '' ) ) {
							$done[] = 'event ' . ( $j['event'] ?? '' );
							continue;
						}
						$keep[] = $ev;
					}
					$pc['events'] = $keep;
					// Its WooCommerce integration also calls fbq() (AddToCart / InitiateCheckout / Purchase without event IDs).
					// Only the Facebook part is switched off; 'woo_integration_ga' (GA4) is left as it is.
					if ( ! empty( $pc['woo_integration'] ) ) {
						$pc['woo_integration'] = '';
						$done[]                = 'woo_integration (Facebook)';
					}
					update_option( 'fca_pc', $pc );
					if ( function_exists( 'mdm_clear_page_cache' ) ) {
						mdm_clear_page_cache();
					}
					return array( 'paused' => $done, 'backup' => 'mdm_backup_fca_pc' );
				},
			)
		);
		// One CAPI test event to Meta's Test Events (uses the test code saved in Pixel Cat), returns Meta's reply.
		register_rest_route(
			'mdm/v1',
			'/capi-test',
			array(
				'methods'             => 'POST',
				'permission_callback' => static function () { return current_user_can( 'manage_options' ); },
				'callback'            => static function () {
					$pc = get_option( 'fca_pc' );
					$token = '';
					$test  = '';
					foreach ( (array) ( $pc['pixels'] ?? array() ) as $px ) {
						$j = json_decode( stripslashes( (string) $px ), true );
						if ( is_array( $j ) && 'Conversions API' === ( $j['type'] ?? '' ) ) {
							$token = (string) ( $j['capi'] ?? '' );
							$test  = (string) ( $j['test'] ?? '' );
						}
					}
					if ( ! $token ) {
						return new WP_Error( 'mdm_no_token', 'No CAPI token saved', array( 'status' => 400 ) );
					}
					$body = array( 'data' => array( array( 'event_name' => 'ViewContent', 'event_time' => time(), 'event_id' => 'capitest_' . wp_generate_uuid4(), 'action_source' => 'website', 'event_source_url' => home_url( '/' ), 'user_data' => array( 'client_ip_address' => '203.0.113.10', 'client_user_agent' => 'MDM CAPI connection test' ) ) ) );
					if ( $test ) {
						$body['test_event_code'] = $test;
					}
					$r = wp_remote_post( 'https://graph.facebook.com/v21.0/1298651362012468/events?access_token=' . rawurlencode( $token ), array( 'timeout' => 15, 'headers' => array( 'Content-Type' => 'application/json' ), 'body' => wp_json_encode( $body ) ) );
					return array( 'http' => wp_remote_retrieve_response_code( $r ), 'meta' => json_decode( wp_remote_retrieve_body( $r ), true ), 'test_event_code_used' => (bool) $test );
				},
			)
		);
		register_rest_route(
			'mdm/v1',
			'/funnel-diag',
			array(
				'methods'             => 'GET',
				'permission_callback' => static function () { return current_user_can( 'manage_options' ); },
				'callback'            => static function () {
					global $wpdb;
					$out = array();
					$one = isset( $_GET['snippet'] ) ? absint( $_GET['snippet'] ) : 0; // phpcs:ignore
					if ( $one && 'wpcode' === get_post_type( $one ) ) {
						return array( 'id' => $one, 'title' => get_the_title( $one ), 'code' => preg_replace( '/(EAA[A-Za-z0-9]{10,}|pk_[A-Za-z0-9_]{10,}|sk_(live|test)_[A-Za-z0-9]+)/', '***', (string) get_post_field( 'post_content', $one ) ) );
					}
					// Code snippets (WPCode / Insert Headers and Footers) that touch the funnel or pixels.
					$snips = get_posts( array( 'post_type' => 'wpcode', 'post_status' => 'any', 'numberposts' => 200 ) );
					foreach ( $snips as $p ) {
						$code = $p->post_content;
						if ( preg_match( '/thank|order-received|order_received|fbq|oaiq|redirect|leadpilot|book-your-call|booking/i', $code ) ) {
							$out['snippets'][] = array( 'id' => $p->ID, 'title' => $p->post_title, 'status' => $p->post_status, 'location' => get_post_meta( $p->ID, '_wpcode_auto_insert_location', true ), 'code' => preg_replace( '/(EAA[A-Za-z0-9]{10,}|pk_[A-Za-z0-9_]{10,}|sk_(live|test)_[A-Za-z0-9]+)/', '***', substr( $code, 0, 1500 ) ) );
						}
					}
					foreach ( array( 'ihaf_insert_header', 'ihaf_insert_body', 'ihaf_insert_footer' ) as $o ) {
						$v = (string) get_option( $o );
						if ( $v ) {
							$out['ihaf'][ $o ] = substr( $v, 0, 1500 );
						}
					}
					// Pixel Cat settings.
					$pc = get_option( 'fca_pc' );
					$out['pixelcat'] = array();
					foreach ( (array) ( isset( $pc['pixels'] ) ? $pc['pixels'] : array() ) as $px ) {
						$j = json_decode( stripslashes( (string) $px ), true );
						$out['pixelcat']['pixels'][] = is_array( $j ) ? array( 'type' => $j['type'] ?? '', 'pixel' => $j['pixel'] ?? '', 'paused' => $j['paused'] ?? '', 'capi_set' => ! empty( $j['capi'] ), 'test_code_set' => ! empty( $j['test'] ) ) : 'unparsed';
					}
					foreach ( (array) ( isset( $pc['events'] ) ? $pc['events'] : array() ) as $ev ) {
						$j = json_decode( stripslashes( (string) $ev ), true );
						$out['pixelcat']['events'][] = is_array( $j ) ? array( 'event' => $j['event'] ?? '', 'pixel_type' => $j['pixel_type'] ?? '', 'triggerType' => $j['triggerType'] ?? '', 'trigger' => $j['trigger'] ?? '', 'delay' => $j['delay'] ?? '', 'apiAction' => $j['apiAction'] ?? '' ) : 'unparsed';
					}
					$out['pixelcat']['woo_integration'] = $pc['woo_integration'] ?? '';
					$out['pixelcat_options'] = $wpdb->get_col( "SELECT option_name FROM {$wpdb->options} WHERE option_name LIKE 'fca%' OR option_name LIKE '%pixel%' OR option_name LIKE '%capi%' LIMIT 40" ); // phpcs:ignore
					// Payment gateways.
					if ( function_exists( 'WC' ) ) {
						foreach ( WC()->payment_gateways()->payment_gateways() as $id => $g ) {
							if ( 'yes' === $g->enabled ) {
								$s = array();
								foreach ( array( 'saved_cards', 'payment_request', 'express_checkout', 'upe_checkout_experience_enabled', 'testmode', 'title' ) as $k ) {
									if ( isset( $g->settings[ $k ] ) ) {
										$s[ $k ] = $g->settings[ $k ];
									}
								}
								$out['gateways'][ $id ] = $s;
							}
						}
						foreach ( array( 343, 426, 427, 431, 432, 436, 4956, 4977, 4978, 4979, 4980, 4413, 3330 ) as $pid ) {
							$pr = wc_get_product( $pid );
							$out['products'][ $pid ] = $pr ? array( $pr->get_name(), $pr->get_price(), $pr->get_status() ) : null;
						}
						$out['guest_checkout']       = get_option( 'woocommerce_enable_guest_checkout' );
						$out['signup_at_checkout']   = get_option( 'woocommerce_enable_signup_and_login_from_checkout' );
					}
					// Options mentioning a custom thank-you redirect.
					$out['thankyou_options'] = $wpdb->get_col( "SELECT option_name FROM {$wpdb->options} WHERE (option_value LIKE '%thank-you%' OR option_name LIKE '%thank%') AND option_name NOT LIKE '%transient%' LIMIT 30" ); // phpcs:ignore
					// Booking page: which booking tool is embedded.
					$bp = get_page_by_path( 'book-your-call' );
					if ( $bp ) {
						$d = (string) get_post_meta( $bp->ID, '_elementor_data', true ) . $bp->post_content;
						preg_match_all( '#(calendar\.google\.com|msgsndr|leadconnector|calendly|simply|ssa)[^"\'\\\\ ]{0,80}#i', $d, $mm );
						$out['booking_embeds'] = array_values( array_unique( $mm[0] ) );
					}
					// Hooks on the thank-you redirect.
					global $wp_filter;
					foreach ( array( 'woocommerce_thankyou', 'woocommerce_get_return_url', 'template_redirect' ) as $h ) {
						if ( isset( $wp_filter[ $h ] ) ) {
							foreach ( $wp_filter[ $h ]->callbacks as $prio => $cbs ) {
								foreach ( $cbs as $cb ) {
									$f = $cb['function'];
									if ( $f instanceof Closure ) {
										$r = new ReflectionFunction( $f );
										$name = 'closure ' . str_replace( WP_CONTENT_DIR, '', (string) $r->getFileName() ) . ':' . $r->getStartLine();
									} elseif ( is_array( $f ) ) {
										$name = ( is_object( $f[0] ) ? get_class( $f[0] ) : $f[0] ) . '::' . $f[1];
									} else {
										$name = (string) $f;
									}
									$out['hooks'][ $h ][] = $prio . ' ' . $name;
								}
							}
						}
					}
					return $out;
				},
			)
		);
	}
);
