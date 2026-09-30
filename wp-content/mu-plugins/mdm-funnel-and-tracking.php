<?php
/**
 * Plugin Name: Million Dollar Media - Funnel Engine & Meta Pixel Tracking
 * Description: Complete sales funnel routing, direct checkout, customer billing pre-population, and deduplicated Meta Pixel & CAPI tracking across all funnel stages.
 * Version: 1.0.0
 * Author: Million Dollar Media
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class MDM_Funnel_Engine {

	const PIXEL_ID = '1298651362012468';
	const MASTERMIND_PRODUCT_ID = 4413; // Hidden Facebook Interest Mastermind ($97)
	const LEADPILOT_PRODUCT_ID   = 3330; // 7-Day Meta Ads Paid Pilot Trial ($247)

	public function __construct() {
		// 1. Direct-to-Checkout routing (Bypass Cart on Buy Now)
		add_filter( 'woocommerce_add_to_cart_redirect', array( $this, 'direct_to_checkout_redirect' ) );
		add_action( 'template_redirect', array( $this, 'handle_custom_cart_actions' ) );

		// 2. Persist customer billing info for frictionless 1-Click Upsell/Downsell
		add_action( 'woocommerce_checkout_order_processed', array( $this, 'save_customer_session_data' ), 10, 3 );
		add_filter( 'woocommerce_checkout_get_value', array( $this, 'prefill_checkout_fields' ), 10, 2 );

		// 3. Post-Purchase redirection flow
		add_action( 'woocommerce_thankyou', array( $this, 'post_purchase_funnel_redirect' ), 1 );

		// 4. Meta Pixel Head Script & Global Tracker
		add_action( 'wp_head', array( $this, 'render_meta_pixel_head' ), 1 );
		add_action( 'wp_footer', array( $this, 'render_funnel_tracking_events' ), 20 );

		// 5. Shortcodes for Funnel YES / NO Buttons
		add_shortcode( 'mdm_mastermind_yes', array( $this, 'shortcode_mastermind_yes' ) );
		add_shortcode( 'mdm_mastermind_no', array( $this, 'shortcode_mastermind_no' ) );
		add_shortcode( 'mdm_leadpilot_yes', array( $this, 'shortcode_leadpilot_yes' ) );
		add_shortcode( 'mdm_leadpilot_no', array( $this, 'shortcode_leadpilot_no' ) );
	}

	/**
	 * 1. Direct to Checkout on Buy Now (Bypass Cart)
	 */
	public function direct_to_checkout_redirect( $url ) {
		if ( ! empty( $_REQUEST['add-to-cart'] ) ) {
			return wc_get_checkout_url();
		}
		return $url;
	}

	/**
	 * Handle special parameters like clear_cart=1 before adding to cart
	 */
	public function handle_custom_cart_actions() {
		if ( ! empty( $_GET['clear_cart'] ) && function_exists( 'WC' ) && WC()->cart ) {
			WC()->cart->empty_cart();
		}
	}

	/**
	 * 2. Save Customer Data into Session/Cookie for 1-Click Upsell Pre-population
	 */
	public function save_customer_session_data( $order_id, $posted_data, $order ) {
		if ( ! $order ) {
			return;
		}

		$customer_data = array(
			'billing_first_name' => $order->get_billing_first_name(),
			'billing_last_name'  => $order->get_billing_last_name(),
			'billing_email'      => $order->get_billing_email(),
			'billing_phone'      => $order->get_billing_phone(),
			'billing_address_1'  => $order->get_billing_address_1(),
			'billing_address_2'  => $order->get_billing_address_2(),
			'billing_city'       => $order->get_billing_city(),
			'billing_state'      => $order->get_billing_state(),
			'billing_postcode'   => $order->get_billing_postcode(),
			'billing_country'    => $order->get_billing_country(),
			'last_order_id'      => $order_id,
		);

		if ( function_exists( 'WC' ) && WC()->session ) {
			WC()->session->set( 'mdm_customer_data', $customer_data );
		}

		// Store in secure cookie as fallback across page navigation
		setcookie( 'mdm_customer_data', wp_json_encode( $customer_data ), time() + ( 86400 * 7 ), COOKIEPATH, COOKIE_DOMAIN, is_ssl(), false );
	}

	/**
	 * Pre-fill Checkout fields from saved session/cookie
	 */
	public function prefill_checkout_fields( $value, $input ) {
		if ( ! empty( $value ) ) {
			return $value;
		}

		$customer_data = array();
		if ( function_exists( 'WC' ) && WC()->session ) {
			$customer_data = WC()->session->get( 'mdm_customer_data', array() );
		}

		if ( empty( $customer_data ) && ! empty( $_COOKIE['mdm_customer_data'] ) ) {
			$customer_data = json_decode( stripslashes( $_COOKIE['mdm_customer_data'] ), true );
		}

		if ( ! empty( $customer_data[ $input ] ) ) {
			return sanitize_text_field( $customer_data[ $input ] );
		}

		return $value;
	}

	/**
	 * 3. Automatic Funnel Post-Purchase Redirection
	 */
	public function post_purchase_funnel_redirect( $order_id ) {
		if ( ! $order_id ) {
			return;
		}

		$order = wc_get_order( $order_id );
		if ( ! $order ) {
			return;
		}

		// Check if this was a Mastermind purchase ($97)
		$has_mastermind = false;
		$has_leadpilot   = false;

		foreach ( $order->get_items() as $item ) {
			$product_id = $item->get_product_id();
			if ( (int) $product_id === self::MASTERMIND_PRODUCT_ID ) {
				$has_mastermind = true;
			}
			if ( (int) $product_id === self::LEADPILOT_PRODUCT_ID ) {
				$has_leadpilot = true;
			}
		}

		// Prevent redirect loops if already on destination
		$current_uri = $_SERVER['REQUEST_URI'] ?? '';

		if ( $has_mastermind ) {
			if ( false === strpos( $current_uri, '/theleadpilot' ) ) {
				wp_safe_redirect( home_url( '/theleadpilot/?mastermind_order=' . $order_id . '&order_key=' . $order->get_order_key() ) );
				exit;
			}
		} elseif ( $has_leadpilot ) {
			if ( false === strpos( $current_uri, '/book-your-call' ) ) {
				wp_safe_redirect( home_url( '/book-your-call/?leadpilot_order=' . $order_id . '&order_key=' . $order->get_order_key() ) );
				exit;
			}
		} else {
			// Video Ads / Main offer purchase -> Redirect to Thank You + $97 Mastermind Upsell
			if ( false === strpos( $current_uri, '/thank-you' ) ) {
				wp_safe_redirect( home_url( '/thank-you/?order_id=' . $order_id . '&order_key=' . $order->get_order_key() ) );
				exit;
			}
		}
	}

	/**
	 * 4. Render Meta Pixel Head Script
	 */
	public function render_meta_pixel_head() {
		$pixel_id = self::PIXEL_ID;
		?>
		<!-- Meta Pixel Code by Million Dollar Media -->
		<script>
		!function(f,b,e,v,n,t,s)
		{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
		n.callMethod.apply(n,arguments):n.queue.push(arguments)};
		if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
		n.queue=[];t=b.createElement(e);t.async=!0;
		t.src=v;s=b.getElementsByTagName(e)[0];
		s.parentNode.insertBefore(t,s)}(window, document,'script',
		'https://connect.facebook.net/en_US/fbevents.js');
		fbq('init', '<?php echo esc_js( $pixel_id ); ?>');
		fbq('track', 'PageView');
		</script>
		<noscript><img height="1" width="1" style="display:none"
		src="https://www.facebook.com/tr?id=<?php echo esc_attr( $pixel_id ); ?>&ev=PageView&noscript=1"
		/></noscript>
		<!-- End Meta Pixel Code -->
		<?php
	}

	/**
	 * 5. Render Deduplicated Meta Events for Each Funnel Step
	 */
	public function render_funnel_tracking_events() {
		$current_uri = trim( $_SERVER['REQUEST_URI'] ?? '', '/' );
		$path_parts  = explode( '?', $current_uri );
		$page_slug   = $path_parts[0];

		// STEP 1: Homepage (milliondollarmedia.us) -> ViewContent
		if ( is_front_page() || empty( $page_slug ) || 'home' === $page_slug ) {
			$event_id = 'vc_home_' . gmdate( 'YmdH' );
			?>
			<script>
			if (typeof fbq === 'function') {
				fbq('track', 'ViewContent', {
					content_name: 'Million Dollar Media - Video Ads & Creative Engine',
					content_category: 'Video Advertising Services',
					currency: 'USD',
					value: 34.97
				}, { eventID: '<?php echo esc_js( $event_id ); ?>' });
			}
			</script>
			<?php
			return;
		}

		// STEP 2: Cart Page (/cart/) -> AddToCart
		if ( function_exists( 'is_cart' ) && is_cart() ) {
			$cart_total = 0;
			$item_count = 0;
			if ( function_exists( 'WC' ) && WC()->cart ) {
				$cart_total = WC()->cart->get_total( 'edit' );
				$item_count = WC()->cart->get_cart_contents_count();
			}
			$event_id = 'atc_cart_' . md5( (string) $cart_total . '_' . (string) $item_count );
			?>
			<script>
			if (typeof fbq === 'function') {
				fbq('track', 'AddToCart', {
					content_name: 'Shopping Cart',
					content_type: 'product',
					value: <?php echo (float) $cart_total; ?>,
					currency: 'USD',
					num_items: <?php echo (int) $item_count; ?>
				}, { eventID: '<?php echo esc_js( $event_id ); ?>' });
			}
			</script>
			<?php
			return;
		}

		// STEP 3: Main Checkout (/checkout/) -> InitiateCheckout
		if ( function_exists( 'is_checkout' ) && is_checkout() && ! is_wc_endpoint_url( 'order-received' ) ) {
			$checkout_total = 0;
			$items_array    = array();
			if ( function_exists( 'WC' ) && WC()->cart ) {
				$checkout_total = WC()->cart->get_total( 'edit' );
				foreach ( WC()->cart->get_cart() as $cart_item ) {
					$items_array[] = $cart_item['product_id'];
				}
			}
			$event_id = 'ic_checkout_' . md5( implode( ',', $items_array ) . '_' . (string) $checkout_total );
			?>
			<script>
			if (typeof fbq === 'function') {
				fbq('track', 'InitiateCheckout', {
					content_ids: <?php echo wp_json_encode( $items_array ); ?>,
					content_type: 'product',
					value: <?php echo (float) $checkout_total; ?>,
					currency: 'USD',
					num_items: <?php echo count( $items_array ); ?>
				}, { eventID: '<?php echo esc_js( $event_id ); ?>' });
			}
			</script>
			<?php
			return;
		}

		// STEP 4: Thank You & $97 Mastermind Upsell (/thank-you/) -> Purchase + Mastermind Event
		if ( 'thank-you' === $page_slug || is_page( 'thank-you' ) ) {
			$order_id = ! empty( $_GET['order_id'] ) ? absint( $_GET['order_id'] ) : 0;
			$order    = $order_id ? wc_get_order( $order_id ) : false;

			$purchase_tracked = false;
			$order_total      = 34.97;
			$product_names    = 'Video Ads Package';

			if ( $order ) {
				$order_total   = $order->get_total();
				$order_key     = $order->get_order_key();
				$items         = array();
				foreach ( $order->get_items() as $item ) {
					$items[] = $item->get_name();
				}
				$product_names = implode( ', ', $items );

				// Check if already tracked to prevent refresh duplicates
				$purchase_tracked = (bool) $order->get_meta( '_mdm_purchase_event_fired' );
				if ( ! $purchase_tracked ) {
					$order->update_meta_data( '_mdm_purchase_event_fired', '1' );
					$order->save();
				}
			}

			$purchase_event_id   = 'purchase_order_' . ( $order_id ? $order_id : 'guest_' . gmdate( 'YmdHis' ) );
			$mastermind_event_id = 'mm_view_' . gmdate( 'YmdH' );
			?>
			<script>
			if (typeof fbq === 'function') {
				<?php if ( ! $purchase_tracked ) : ?>
				// 1. Fire Purchase Event for the completed Video Ads order
				fbq('track', 'Purchase', {
					content_name: '<?php echo esc_js( $product_names ); ?>',
					content_type: 'product',
					value: <?php echo (float) $order_total; ?>,
					currency: 'USD',
					transaction_id: '<?php echo esc_js( (string) $order_id ); ?>'
				}, { eventID: '<?php echo esc_js( $purchase_event_id ); ?>' });
				<?php endif; ?>

				// 2. Fire Mastermind Offer Event
				fbq('trackCustom', 'Mastermind', {
					offer_name: 'Hidden Facebook Interest Mastermind',
					value: 97.00,
					currency: 'USD'
				}, { eventID: '<?php echo esc_js( $mastermind_event_id ); ?>' });
			}
			</script>
			<?php
			return;
		}

		// STEP 5: The Lead Pilot ($247 Paid Trial Downsell) (/theleadpilot/) -> LeadPilot Event
		if ( 'theleadpilot' === $page_slug || is_page( 'theleadpilot' ) ) {
			$event_id = 'leadpilot_view_' . gmdate( 'YmdH' );
			?>
			<script>
			if (typeof fbq === 'function') {
				fbq('trackCustom', 'LeadPilot', {
					offer_name: '7-Day Meta Ads Paid Pilot Trial',
					value: 247.00,
					currency: 'USD'
				}, { eventID: '<?php echo esc_js( $event_id ); ?>' });

				fbq('track', 'ViewContent', {
					content_name: '7-Day Meta Ads Paid Pilot Trial',
					content_category: 'Downsell Offer',
					value: 247.00,
					currency: 'USD'
				}, { eventID: '<?php echo esc_js( $event_id ); ?>' });
			}
			</script>
			<?php
			return;
		}

		// STEP 6: Book Your Call (/book-your-call/) -> Schedule Event
		if ( 'book-your-call' === $page_slug || is_page( 'book-your-call' ) ) {
			$event_id = 'schedule_page_' . gmdate( 'YmdH' );
			?>
			<script>
			document.addEventListener('DOMContentLoaded', function() {
				// Listen for SSA (Simply Schedule Appointments) or form submission
				function handleBookingSuccess() {
					if (typeof fbq === 'function') {
						fbq('track', 'Schedule', {
							content_name: 'Million Dollar Media Strategy Session',
							status: 'scheduled'
						}, { eventID: 'sched_' + Date.now() });
					}
					// Auto redirect to Booking Confirmed
					setTimeout(function() {
						window.location.href = '<?php echo esc_url( home_url( '/booking-confirmed/' ) ); ?>';
					}, 1000);
				}

				// Simply Schedule Appointments JS hook listener
				window.addEventListener('ssa/appointment/booked', handleBookingSuccess);
				window.addEventListener('ssa_booking_success', handleBookingSuccess);
				document.addEventListener('ssa_booking_success', handleBookingSuccess);
			});
			</script>
			<?php
			return;
		}

		// STEP 7: Booking Confirmed (/booking-confirmed/) -> CompleteRegistration Event
		if ( 'booking-confirmed' === $page_slug || is_page( 'booking-confirmed' ) ) {
			$event_id = 'reg_confirm_' . gmdate( 'YmdHis' );
			?>
			<script>
			if (typeof fbq === 'function') {
				fbq('track', 'CompleteRegistration', {
					content_name: 'Strategy Call Booking Confirmed',
					status: 'completed'
				}, { eventID: '<?php echo esc_js( $event_id ); ?>' });
			}
			</script>
			<?php
			return;
		}
	}

	/**
	 * Shortcodes for Upsell / Downsell YES & NO Buttons
	 */
	public function shortcode_mastermind_yes( $atts = array(), $content = 'Yes, Add the Hidden Facebook Interest Mastermind to My Order ($97)' ) {
		$checkout_url = add_query_arg(
			array(
				'add-to-cart' => self::MASTERMIND_PRODUCT_ID,
				'clear_cart'  => '1',
			),
			wc_get_checkout_url()
		);
		return sprintf(
			'<a href="%s" class="mdm-funnel-btn mdm-btn-yes" style="display:inline-block;padding:16px 32px;background:#e50914;color:#fff;font-weight:700;border-radius:8px;text-decoration:none;font-size:18px;text-align:center;">%s</a>',
			esc_url( $checkout_url ),
			esc_html( $content )
		);
	}

	public function shortcode_mastermind_no( $atts = array(), $content = 'No Thanks, I\'ll Keep Wasting My Ad Spend on the Wrong Audience' ) {
		$no_url = home_url( '/theleadpilot/' );
		return sprintf(
			'<a href="%s" class="mdm-funnel-btn mdm-btn-no" style="display:inline-block;margin-top:12px;color:#888;font-size:14px;text-decoration:underline;">%s</a>',
			esc_url( $no_url ),
			esc_html( $content )
		);
	}

	public function shortcode_leadpilot_yes( $atts = array(), $content = 'Yes — Start 7-Day Paid Trial ($247)' ) {
		$checkout_url = add_query_arg(
			array(
				'add-to-cart' => self::LEADPILOT_PRODUCT_ID,
				'clear_cart'  => '1',
			),
			wc_get_checkout_url()
		);
		return sprintf(
			'<a href="%s" class="mdm-funnel-btn mdm-btn-yes" style="display:inline-block;padding:16px 32px;background:#e50914;color:#fff;font-weight:700;border-radius:8px;text-decoration:none;font-size:18px;text-align:center;">%s</a>',
			esc_url( $checkout_url ),
			esc_html( $content )
		);
	}

	public function shortcode_leadpilot_no( $atts = array(), $content = 'No Thanks, I\'ll Handle the Execution Myself' ) {
		$no_url = home_url( '/book-your-call/' );
		return sprintf(
			'<a href="%s" class="mdm-funnel-btn mdm-btn-no" style="display:inline-block;margin-top:12px;color:#888;font-size:14px;text-decoration:underline;">%s</a>',
			esc_url( $no_url ),
			esc_html( $content )
		);
	}
}

new MDM_Funnel_Engine();
