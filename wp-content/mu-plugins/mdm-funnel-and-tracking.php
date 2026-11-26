<?php
/**
 * Plugin Name: Million Dollar Media - Funnel Engine & Tracking
 * Description: Sales funnel routing (Video Ads -> Thank You + $97 Mastermind -> $247 Lead Pilot -> Book Your Call -> Booking Confirmed),
 *              direct checkout, billing pre-fill for the upsell checkouts, and one source of truth for Meta Pixel + Conversions API
 *              (same event_id in browser and server, so Meta deduplicates) and the OpenAI (ChatGPT ads) pixel.
 * Version: 2.0.0
 * Author: Million Dollar Media
 *
 * Funnel and events (owner spec, 26 Nov 2026):
 *   /                    ViewContent                 | OpenAI contents_viewed
 *   /cart/               AddToCart                   | OpenAI items_added
 *   /checkout/           InitiateCheckout            | OpenAI checkout_started
 *   Video Ads paid  ->   /thank-you/      Purchase + VideoAdsPurchase, plus Mastermind (offer shown) | OpenAI order_created
 *   Mastermind paid ->   /theleadpilot/   Purchase + MastermindPurchase
 *   /theleadpilot/       LeadPilot (offer shown)
 *   Lead Pilot paid ->   /book-your-call/ Purchase + LeadPilotPurchase
 *   /book-your-call/     Schedule when a booking is completed in the embedded scheduler (if it reports one) | OpenAI appointment_scheduled
 *   /booking-confirmed/  CompleteRegistration        | OpenAI registration_completed
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class MDM_Funnel_Engine {

	const PIXEL_ID              = '1298651362012468';
	const MASTERMIND_PRODUCT_ID = 4413; // The Hidden Facebook Interest Mastermind ($97)
	const LEADPILOT_PRODUCT_ID  = 3330; // 7-Day Meta Ads Paid Pilot Trial ($247)
	const GRAPH_VERSION         = 'v21.0';

	/** Browser events collected while the page renders: [ [ 'fbq'|'oaiq', name, data, event_id, custom ] ]. */
	private $queue = array();

	public function __construct() {
		// Routing.
		add_filter( 'woocommerce_add_to_cart_redirect', array( $this, 'direct_to_checkout_redirect' ) );
		add_action( 'template_redirect', array( $this, 'handle_custom_cart_actions' ) );
		add_action( 'template_redirect', array( $this, 'route_after_purchase' ), 5 ); // before other order-received redirects

		// Pre-fill for the upsell checkouts + tracking context for server events.
		add_action( 'woocommerce_checkout_order_processed', array( $this, 'save_customer_session_data' ), 10, 3 );
		add_filter( 'woocommerce_checkout_get_value', array( $this, 'prefill_checkout_fields' ), 10, 2 );

		// Server-side Purchase as soon as the payment is confirmed (dedups with the browser Purchase by event_id).
		add_action( 'woocommerce_payment_complete', array( $this, 'server_purchase' ) );
		add_action( 'woocommerce_order_status_processing', array( $this, 'server_purchase' ) );
		add_action( 'woocommerce_order_status_completed', array( $this, 'server_purchase' ) );

		// Pixels and events.
		add_action( 'wp_head', array( $this, 'render_meta_pixel_head' ), 1 );
		add_action( 'wp', array( $this, 'collect_page_events' ) );
		add_action( 'wp_footer', array( $this, 'render_events' ), 20 );
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );

		// YES / NO buttons.
		add_shortcode( 'mdm_mastermind_yes', array( $this, 'shortcode_mastermind_yes' ) );
		add_shortcode( 'mdm_mastermind_no', array( $this, 'shortcode_mastermind_no' ) );
		add_shortcode( 'mdm_leadpilot_yes', array( $this, 'shortcode_leadpilot_yes' ) );
		add_shortcode( 'mdm_leadpilot_no', array( $this, 'shortcode_leadpilot_no' ) );
	}

	/* ------------------------------------------------------------------ */
	/* Routing                                                             */
	/* ------------------------------------------------------------------ */

	public function direct_to_checkout_redirect( $url ) {
		return ! empty( $_REQUEST['add-to-cart'] ) ? wc_get_checkout_url() : $url; // phpcs:ignore WordPress.Security.NonceVerification
	}

	public function handle_custom_cart_actions() {
		if ( ! empty( $_GET['clear_cart'] ) && function_exists( 'WC' ) && WC()->cart ) { // phpcs:ignore WordPress.Security.NonceVerification
			WC()->cart->empty_cart();
		}
	}

	/** Which funnel offer an order is: 'mastermind', 'leadpilot' or 'videoads'. */
	public static function order_kind( $order ) {
		$ids = array();
		foreach ( $order->get_items() as $item ) {
			$ids[] = (int) $item->get_product_id();
		}
		if ( in_array( self::MASTERMIND_PRODUCT_ID, $ids, true ) ) {
			return 'mastermind';
		}
		if ( in_array( self::LEADPILOT_PRODUCT_ID, $ids, true ) ) {
			return 'leadpilot';
		}
		return 'videoads';
	}

	/** After payment: Video Ads -> /thank-you/, Mastermind -> /theleadpilot/, Lead Pilot -> /book-your-call/. */
	public function route_after_purchase() {
		if ( ! function_exists( 'is_wc_endpoint_url' ) || ! is_wc_endpoint_url( 'order-received' ) ) {
			return;
		}
		$order = wc_get_order( absint( get_query_var( 'order-received' ) ) );
		$key   = isset( $_GET['key'] ) ? wc_clean( wp_unslash( $_GET['key'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
		if ( ! $order || ! $key || ! hash_equals( $order->get_order_key(), $key ) || $order->has_status( array( 'failed', 'cancelled' ) ) ) {
			return;
		}
		$dest = array(
			'videoads'   => '/thank-you/',
			'mastermind' => '/theleadpilot/',
			'leadpilot'  => '/book-your-call/',
		);
		wp_safe_redirect( add_query_arg( array( 'order' => $order->get_id(), 'key' => $order->get_order_key() ), home_url( $dest[ self::order_kind( $order ) ] ) ) );
		exit;
	}

	/** The paid order passed to a funnel page (?order=&key=, or the older ?order_id=&order_key=), verified by its key. */
	private function order_from_request() {
		$id  = absint( $_GET['order'] ?? ( $_GET['order_id'] ?? 0 ) ); // phpcs:ignore WordPress.Security.NonceVerification
		$key = wc_clean( wp_unslash( $_GET['key'] ?? ( $_GET['order_key'] ?? '' ) ) ); // phpcs:ignore WordPress.Security.NonceVerification
		if ( ! $id || ! $key || ! function_exists( 'wc_get_order' ) ) {
			return null;
		}
		$order = wc_get_order( $id );
		return ( $order && hash_equals( $order->get_order_key(), (string) $key ) && $order->is_paid() ) ? $order : null;
	}

	/* ------------------------------------------------------------------ */
	/* Pre-fill                                                            */
	/* ------------------------------------------------------------------ */

	public function save_customer_session_data( $order_id, $posted_data, $order ) {
		if ( ! $order ) {
			return;
		}
		$data = array(
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
			WC()->session->set( 'mdm_customer_data', $data );
		}
		// Fallback across sessions: server-only cookie (HttpOnly, not readable by page scripts).
		setcookie( 'mdm_customer_data', wp_json_encode( $data ), array( 'expires' => time() + DAY_IN_SECONDS, 'path' => COOKIEPATH, 'domain' => COOKIE_DOMAIN, 'secure' => is_ssl(), 'httponly' => true, 'samesite' => 'Lax' ) );

		// Context for server-side (CAPI) events sent later, e.g. from a payment webhook.
		$order->update_meta_data( '_mdm_fbp', sanitize_text_field( wp_unslash( $_COOKIE['_fbp'] ?? '' ) ) );
		$order->update_meta_data( '_mdm_fbc', sanitize_text_field( wp_unslash( $_COOKIE['_fbc'] ?? '' ) ) );
		$order->update_meta_data( '_mdm_ip', self::client_ip() );
		$order->update_meta_data( '_mdm_ua', substr( sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ?? '' ) ), 0, 400 ) );
		$order->save();
	}

	public function prefill_checkout_fields( $value, $input ) {
		if ( ! empty( $value ) ) {
			return $value;
		}
		$data = ( function_exists( 'WC' ) && WC()->session ) ? (array) WC()->session->get( 'mdm_customer_data', array() ) : array();
		if ( ! $data && ! empty( $_COOKIE['mdm_customer_data'] ) ) {
			$data = (array) json_decode( wp_unslash( $_COOKIE['mdm_customer_data'] ), true ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		}
		return ! empty( $data[ $input ] ) ? sanitize_text_field( $data[ $input ] ) : $value;
	}

	/* ------------------------------------------------------------------ */
	/* Meta Conversions API                                                */
	/* ------------------------------------------------------------------ */

	/** CAPI access token, read from the Pixel Cat "Conversions API" setting (never printed). */
	private static function capi_token() {
		static $t = null;
		if ( null !== $t ) {
			return $t;
		}
		$t  = defined( 'MDM_CAPI_TOKEN' ) ? (string) MDM_CAPI_TOKEN : '';
		$pc = get_option( 'fca_pc' );
		foreach ( (array) ( $pc['pixels'] ?? array() ) as $px ) {
			$j = json_decode( stripslashes( (string) $px ), true );
			if ( ! $t && is_array( $j ) && 'Conversions API' === ( $j['type'] ?? '' ) && ! empty( $j['capi'] ) ) {
				$t = (string) $j['capi'];
			}
		}
		return $t;
	}

	private static function client_ip() {
		foreach ( array( 'HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR' ) as $h ) {
			if ( ! empty( $_SERVER[ $h ] ) ) {
				$ip = trim( explode( ',', (string) $_SERVER[ $h ] )[0] ); // phpcs:ignore
				if ( filter_var( $ip, FILTER_VALIDATE_IP ) ) {
					return $ip;
				}
			}
		}
		return '';
	}

	private static function h( $v ) {
		$v = strtolower( trim( (string) $v ) );
		return '' === $v ? null : hash( 'sha256', $v );
	}

	/** user_data for CAPI: browser context from this request or the order, plus hashed customer details when known. */
	private static function user_data( $order = null ) {
		$u = array(
			'client_ip_address' => $order ? ( $order->get_meta( '_mdm_ip' ) ?: self::client_ip() ) : self::client_ip(),
			'client_user_agent' => $order ? ( $order->get_meta( '_mdm_ua' ) ?: ( $_SERVER['HTTP_USER_AGENT'] ?? '' ) ) : ( $_SERVER['HTTP_USER_AGENT'] ?? '' ), // phpcs:ignore
			'fbp'               => $order ? ( $order->get_meta( '_mdm_fbp' ) ?: ( $_COOKIE['_fbp'] ?? '' ) ) : ( $_COOKIE['_fbp'] ?? '' ), // phpcs:ignore
			'fbc'               => $order ? ( $order->get_meta( '_mdm_fbc' ) ?: ( $_COOKIE['_fbc'] ?? '' ) ) : ( $_COOKIE['_fbc'] ?? '' ), // phpcs:ignore
		);
		if ( $order ) {
			$u['em']          = array( self::h( $order->get_billing_email() ) );
			$u['ph']          = array( self::h( preg_replace( '/\D+/', '', $order->get_billing_phone() ) ) );
			$u['fn']          = array( self::h( $order->get_billing_first_name() ) );
			$u['ln']          = array( self::h( $order->get_billing_last_name() ) );
			$u['ct']          = array( self::h( preg_replace( '/\s+/', '', $order->get_billing_city() ) ) );
			$u['zp']          = array( self::h( $order->get_billing_postcode() ) );
			$u['country']     = array( self::h( $order->get_billing_country() ) );
			$u['external_id'] = array( self::h( (string) ( $order->get_customer_id() ?: $order->get_billing_email() ) ) );
		} elseif ( is_user_logged_in() ) {
			$me               = wp_get_current_user();
			$u['em']          = array( self::h( $me->user_email ) );
			$u['external_id'] = array( self::h( (string) $me->ID ) );
		}
		return array_filter( $u, static function ( $v ) { return is_array( $v ) ? null !== $v[0] : '' !== (string) $v; } );
	}

	/** Send one server event (non-blocking). Same event_id as the browser event, so Meta keeps one. */
	public static function capi( $name, $event_id, $custom = array(), $order = null, $source_url = '' ) {
		$token = self::capi_token();
		if ( ! $token ) {
			return;
		}
		$event = array(
			'event_name'       => $name,
			'event_time'       => time(),
			'event_id'         => $event_id,
			'action_source'    => 'website',
			'event_source_url' => $source_url ? $source_url : ( is_ssl() ? 'https://' : 'http://' ) . ( $_SERVER['HTTP_HOST'] ?? '' ) . ( $_SERVER['REQUEST_URI'] ?? '' ), // phpcs:ignore
			'user_data'        => self::user_data( $order ),
		);
		if ( $custom ) {
			$event['custom_data'] = $custom;
		}
		$body = array( 'data' => array( $event ) );
		if ( defined( 'MDM_CAPI_TEST_CODE' ) && MDM_CAPI_TEST_CODE ) {
			$body['test_event_code'] = MDM_CAPI_TEST_CODE; // only when explicitly testing
		}
		wp_remote_post(
			'https://graph.facebook.com/' . self::GRAPH_VERSION . '/' . self::PIXEL_ID . '/events?access_token=' . rawurlencode( $token ),
			array( 'timeout' => 4, 'blocking' => false, 'headers' => array( 'Content-Type' => 'application/json' ), 'body' => wp_json_encode( $body ) )
		);
	}

	/* ------------------------------------------------------------------ */
	/* Purchases                                                           */
	/* ------------------------------------------------------------------ */

	private static function purchase_data( $order ) {
		$ids   = array();
		$names = array();
		$items = array();
		foreach ( $order->get_items() as $item ) {
			$ids[]   = (string) $item->get_product_id();
			$names[] = $item->get_name();
			$items[] = array( 'id' => (string) $item->get_product_id(), 'quantity' => (int) $item->get_quantity(), 'item_price' => (float) $order->get_item_total( $item ) );
		}
		return array(
			'value'        => (float) $order->get_total(),
			'currency'     => $order->get_currency(),
			'content_ids'  => $ids,
			'content_name' => implode( ', ', $names ),
			'content_type' => 'product',
			'contents'     => $items,
			'num_items'    => count( $items ),
			'order_id'     => (string) $order->get_id(),
		);
	}

	private static function purchase_custom_name( $order ) {
		$k = self::order_kind( $order );
		return 'mastermind' === $k ? 'MastermindPurchase' : ( 'leadpilot' === $k ? 'LeadPilotPurchase' : 'VideoAdsPurchase' );
	}

	/** Server-side Purchase once per paid order (also covers buyers who close the tab before the funnel page loads). */
	public function server_purchase( $order_id ) {
		$order = wc_get_order( $order_id );
		if ( ! $order || ! $order->is_paid() || $order->get_meta( '_mdm_capi_purchase_sent' ) ) {
			return;
		}
		$order->update_meta_data( '_mdm_capi_purchase_sent', time() );
		$order->save();
		$data = self::purchase_data( $order );
		$url  = $order->get_checkout_order_received_url();
		self::capi( 'Purchase', 'purchase_' . $order->get_id(), $data, $order, $url );
		self::capi( self::purchase_custom_name( $order ), strtolower( self::purchase_custom_name( $order ) ) . '_' . $order->get_id(), $data, $order, $url );
	}

	/** Browser Purchase on the page the buyer lands on after paying (once per order; same event_id as the server event). */
	private function queue_purchase( $order ) {
		if ( $order->get_meta( '_mdm_browser_purchase_fired' ) ) {
			return;
		}
		$order->update_meta_data( '_mdm_browser_purchase_fired', time() );
		$order->save();
		$data   = self::purchase_data( $order );
		$custom = self::purchase_custom_name( $order );
		$this->queue[] = array( 'fbq', 'Purchase', $data, 'purchase_' . $order->get_id(), false );
		$this->queue[] = array( 'fbq', $custom, $data, strtolower( $custom ) . '_' . $order->get_id(), true );
		$this->queue[] = array( 'oaiq', 'order_created', array( 'type' => 'contents' ), 'purchase_' . $order->get_id(), false );
		$this->server_purchase( $order->get_id() ); // no-op if the payment hook already sent it
	}

	/* ------------------------------------------------------------------ */
	/* Page events                                                         */
	/* ------------------------------------------------------------------ */

	/** Allowed browser-reported events and their fixed custom_data (values are never taken from the browser). */
	public static function beacon_events() {
		return array(
			'ViewContent'          => array( array( 'content_name' => 'Video Ads Packages', 'content_category' => 'Video Ads', 'content_type' => 'product' ), false, 'contents_viewed', 'contents' ),
			'Mastermind'           => array( array( 'content_name' => 'The Hidden Facebook Interest Mastermind', 'value' => 97.0, 'currency' => 'USD' ), true, '', '' ),
			'LeadPilot'            => array( array( 'content_name' => '7-Day Meta Ads Paid Pilot Trial', 'value' => 247.0, 'currency' => 'USD' ), true, '', '' ),
			'CompleteRegistration' => array( array( 'content_name' => 'Strategy Call Booking Confirmed', 'status' => 'completed' ), false, 'registration_completed', 'customer_action' ),
		);
	}

	/**
	 * Page event. $cacheable pages (home, thank-you, lead pilot, booking confirmed) can be served from the full-page
	 * cache, so the event_id is made in the browser and the server half is sent through /mdm/v1/track.
	 * Cart and checkout are never cached: the id is made here and the server event is sent right away.
	 */
	private function page_event( $name, $data = array(), $custom = false, $oaiq = '', $oaiq_type = 'contents', $cacheable = false ) {
		if ( $cacheable ) {
			$this->queue[] = array( 'beacon', $name, $data, '', $custom, $oaiq, $oaiq_type );
			return;
		}
		$id            = strtolower( preg_replace( '/[^a-z]/i', '', $name ) ) . '_' . wp_generate_uuid4();
		$this->queue[] = array( 'fbq', $name, $data, $id, $custom );
		if ( $oaiq ) {
			$this->queue[] = array( 'oaiq', $oaiq, array( 'type' => $oaiq_type ), $id, false );
		}
		self::capi( $name, $id, $data );
	}

	public function collect_page_events() {
		if ( is_admin() || wp_doing_ajax() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) || is_feed() || is_404() ) {
			return;
		}
		$wc = function_exists( 'WC' );

		if ( is_front_page() ) {
			$b = self::beacon_events()['ViewContent'];
			$this->page_event( 'ViewContent', $b[0], $b[1], $b[2], $b[3], true );
			return;
		}
		if ( $wc && function_exists( 'is_cart' ) && is_cart() ) {
			$ids = array();
			if ( WC()->cart ) {
				foreach ( WC()->cart->get_cart() as $ci ) {
					$ids[] = (string) $ci['product_id'];
				}
			}
			$this->page_event( 'AddToCart', array( 'content_ids' => $ids, 'content_type' => 'product', 'value' => WC()->cart ? (float) WC()->cart->get_total( 'edit' ) : 0, 'currency' => get_woocommerce_currency(), 'num_items' => WC()->cart ? (int) WC()->cart->get_cart_contents_count() : 0 ), false, 'items_added' );
			return;
		}
		if ( $wc && function_exists( 'is_checkout' ) && is_checkout() && ! is_wc_endpoint_url( 'order-received' ) ) {
			$ids = array();
			if ( WC()->cart ) {
				foreach ( WC()->cart->get_cart() as $ci ) {
					$ids[] = (string) $ci['product_id'];
				}
			}
			$this->page_event( 'InitiateCheckout', array( 'content_ids' => $ids, 'content_type' => 'product', 'value' => WC()->cart ? (float) WC()->cart->get_total( 'edit' ) : 0, 'currency' => get_woocommerce_currency(), 'num_items' => count( $ids ) ), false, 'checkout_started' );
			return;
		}
		if ( is_page( 'thank-you' ) ) {
			$order = $wc ? $this->order_from_request() : null;
			if ( $order ) {
				$this->queue_purchase( $order );
			}
			$b = self::beacon_events()['Mastermind'];
			$this->page_event( 'Mastermind', $b[0], $b[1], $b[2], $b[3], true );
			return;
		}
		if ( is_page( 'theleadpilot' ) ) {
			$order = $wc ? $this->order_from_request() : null;
			if ( $order ) {
				$this->queue_purchase( $order );
			}
			$b = self::beacon_events()['LeadPilot'];
			$this->page_event( 'LeadPilot', $b[0], $b[1], $b[2], $b[3], true );
			return;
		}
		if ( is_page( 'book-your-call' ) ) {
			$order = $wc ? $this->order_from_request() : null;
			if ( $order ) {
				$this->queue_purchase( $order );
			}
			$this->queue[] = array( 'schedule_listener', '', array(), '', false );
			return;
		}
		if ( is_page( 'booking-confirmed' ) ) {
			$b = self::beacon_events()['CompleteRegistration'];
			$this->page_event( 'CompleteRegistration', $b[0], $b[1], $b[2], $b[3], true );
		}
	}

	public function render_meta_pixel_head() {
		if ( is_admin() ) {
			return;
		}
		?>
<!-- Meta Pixel (Million Dollar Media funnel engine: browser + Conversions API share event IDs) -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','<?php echo esc_js( self::PIXEL_ID ); ?>');fbq('track','PageView');
</script>
<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=<?php echo esc_attr( self::PIXEL_ID ); ?>&amp;ev=PageView&amp;noscript=1"></noscript>
		<?php
	}

	public function render_events() {
		if ( ! $this->queue ) {
			return;
		}
		$js     = '';
		$beacon = esc_url_raw( rest_url( 'mdm/v1/track' ) );
		foreach ( $this->queue as $q ) {
			list( $type, $name, $data, $id, $custom ) = $q;
			if ( 'beacon' === $type ) {
				$js .= 'var id=' . wp_json_encode( strtolower( $name ) . '_' ) . '+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,12);'
					. 'if(window.fbq){fbq(' . wp_json_encode( $custom ? 'trackCustom' : 'track' ) . ',' . wp_json_encode( $name ) . ',' . wp_json_encode( (object) $data ) . ',{eventID:id});}'
					. ( $q[5] ? 'if(window.oaiq){oaiq("measure",' . wp_json_encode( $q[5] ) . ',' . wp_json_encode( (object) array( 'type' => $q[6] ) ) . ');}' : '' )
					. 'try{navigator.sendBeacon(' . wp_json_encode( $beacon ) . ',new Blob([JSON.stringify({event:' . wp_json_encode( $name ) . ',event_id:id,url:location.href})],{type:"application/json"}));}catch(e){}';
				continue;
			}
			if ( 'fbq' === $type ) {
				$js .= 'if(window.fbq){fbq(' . wp_json_encode( $custom ? 'trackCustom' : 'track' ) . ',' . wp_json_encode( $name ) . ',' . wp_json_encode( (object) $data ) . ',{eventID:' . wp_json_encode( $id ) . '});}';
			} elseif ( 'oaiq' === $type ) {
				$js .= 'if(window.oaiq){oaiq("measure",' . wp_json_encode( $name ) . ',' . wp_json_encode( (object) $data ) . ');}';
			} elseif ( 'schedule_listener' === $type ) {
				$js .= $this->schedule_listener_js();
			}
		}
		echo "<script>(function(){try{" . $js . "}catch(e){}})();</script>\n"; // phpcs:ignore WordPress.Security.EscapeOutput
	}

	/**
	 * Book Your Call: fire Schedule only when the embedded scheduler reports a completed booking
	 * (LeadConnector / GoHighLevel widget messages, Simply Schedule Appointments events), then go to /booking-confirmed/.
	 * A Google Calendar appointment page embedded in an iframe does not report bookings to the host page.
	 */
	private function schedule_listener_js() {
		$api  = esc_url_raw( rest_url( 'mdm/v1/track-schedule' ) );
		$done = esc_url_raw( home_url( '/booking-confirmed/' ) );
		return 'var mdmBooked=false;function mdmOnBooked(){if(mdmBooked)return;mdmBooked=true;var id="schedule_"+Date.now()+"_"+Math.random().toString(36).slice(2,10);'
			. 'if(window.fbq){fbq("track","Schedule",{content_name:"Strategy Call"},{eventID:id});}'
			. 'if(window.oaiq){oaiq("measure","appointment_scheduled",{type:"customer_action"});}'
			. 'try{navigator.sendBeacon(' . wp_json_encode( $api ) . ',new Blob([JSON.stringify({event_id:id,url:location.href})],{type:"application/json"}));}catch(e){}'
			. 'setTimeout(function(){location.href=' . wp_json_encode( $done ) . ';},900);}'
			. 'window.addEventListener("message",function(e){var o=String(e.origin||"");if(!/leadconnectorhq\\.com|msgsndr\\.com|gohighlevel\\.com/.test(o))return;var d=e.data;var s=typeof d==="string"?d:JSON.stringify(d||"");if(/booking|appointment|scheduled|booked/i.test(s)&&/success|confirm|complete|booked|scheduled/i.test(s)){mdmOnBooked();}});'
			. '["ssa/appointment/booked","ssa_booking_success"].forEach(function(n){window.addEventListener(n,mdmOnBooked);document.addEventListener(n,mdmOnBooked);});';
	}

	/** Server half of the Schedule event (same event_id as the browser), rate limited per visitor. */
	public function register_routes() {
		register_rest_route(
			'mdm/v1',
			'/track',
			array(
				'methods'             => 'POST',
				'permission_callback' => '__return_true',
				'callback'            => static function ( $req ) {
					$name = (string) $req->get_param( 'event' );
					$id   = preg_replace( '/[^a-z0-9_]/i', '', (string) $req->get_param( 'event_id' ) );
					$url  = esc_url_raw( (string) $req->get_param( 'url' ) );
					$ev   = self::beacon_events();
					$k    = 'mdm_trk_' . md5( self::client_ip() . '|' . $name );
					if ( ! isset( $ev[ $name ] ) || ! $id || 0 !== strpos( $id, strtolower( $name ) . '_' ) || strlen( $id ) > 80 || 0 !== strpos( $url, home_url( '/' ) ) || get_transient( $k ) ) {
						return new WP_REST_Response( array( 'ok' => false ), 200 );
					}
					set_transient( $k, 1, 20 ); // one per visitor per event every 20 seconds
					self::capi( $name, $id, $ev[ $name ][0], null, $url );
					return new WP_REST_Response( array( 'ok' => true ), 200 );
				},
			)
		);
		register_rest_route(
			'mdm/v1',
			'/track-schedule',
			array(
				'methods'             => 'POST',
				'permission_callback' => '__return_true',
				'callback'            => static function ( $req ) {
					$id  = preg_replace( '/[^a-z0-9_]/i', '', (string) $req->get_param( 'event_id' ) );
					$url = esc_url_raw( (string) $req->get_param( 'url' ) );
					$ip  = self::client_ip();
					$k   = 'mdm_sched_' . md5( $ip );
					if ( ! $id || 0 !== strpos( $id, 'schedule_' ) || get_transient( $k ) || 0 !== strpos( $url, home_url( '/book-your-call' ) ) ) {
						return new WP_REST_Response( array( 'ok' => false ), 200 );
					}
					set_transient( $k, 1, 10 * MINUTE_IN_SECONDS );
					self::capi( 'Schedule', $id, array( 'content_name' => 'Strategy Call' ), null, $url );
					return new WP_REST_Response( array( 'ok' => true ), 200 );
				},
			)
		);
	}

	/* ------------------------------------------------------------------ */
	/* YES / NO buttons                                                    */
	/* ------------------------------------------------------------------ */

	public function shortcode_mastermind_yes( $atts = array(), $content = '' ) {
		$content = $content ? $content : 'Yes, Add the Hidden Facebook Interest Mastermind to My Order ($97)';
		return sprintf( '<a href="%s" class="mdm-funnel-btn mdm-btn-yes" style="display:inline-block;padding:16px 32px;background:#e50914;color:#fff;font-weight:700;border-radius:8px;text-decoration:none;font-size:18px;text-align:center;">%s</a>', esc_url( add_query_arg( array( 'add-to-cart' => self::MASTERMIND_PRODUCT_ID, 'clear_cart' => '1' ), wc_get_checkout_url() ) ), esc_html( $content ) );
	}

	public function shortcode_mastermind_no( $atts = array(), $content = '' ) {
		$content = $content ? $content : 'No Thanks, I\'ll Keep Wasting My Ad Spend on the Wrong Audience';
		return sprintf( '<a href="%s" class="mdm-funnel-btn mdm-btn-no" style="display:inline-block;margin-top:12px;color:#888;font-size:14px;text-decoration:underline;">%s</a>', esc_url( home_url( '/theleadpilot/' ) ), esc_html( $content ) );
	}

	public function shortcode_leadpilot_yes( $atts = array(), $content = '' ) {
		$content = $content ? $content : 'Yes, Start 7-Day Paid Trial ($247)';
		return sprintf( '<a href="%s" class="mdm-funnel-btn mdm-btn-yes" style="display:inline-block;padding:16px 32px;background:#e50914;color:#fff;font-weight:700;border-radius:8px;text-decoration:none;font-size:18px;text-align:center;">%s</a>', esc_url( add_query_arg( array( 'add-to-cart' => self::LEADPILOT_PRODUCT_ID, 'clear_cart' => '1' ), wc_get_checkout_url() ) ), esc_html( $content ) );
	}

	public function shortcode_leadpilot_no( $atts = array(), $content = '' ) {
		$content = $content ? $content : 'No Thanks, I\'ll Handle the Execution Myself';
		return sprintf( '<a href="%s" class="mdm-funnel-btn mdm-btn-no" style="display:inline-block;margin-top:12px;color:#888;font-size:14px;text-decoration:underline;">%s</a>', esc_url( home_url( '/book-your-call/' ) ), esc_html( $content ) );
	}
}

new MDM_Funnel_Engine();
