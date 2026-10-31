<?php
/**
 * Site-wide design layer (Settings -> Page Designer -> "Whole website"):
 *  - smooth animations on every page (scroll reveal, page transitions, progress line, hovers)
 *  - new footer / floating menu on every page (live with the homepage switch, or in preview)
 *  - new design for WooCommerce cart, checkout and order-received pages
 * Everything is additive: content, forms and payment fields are never removed.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_site_anim_on() {
	return (bool) get_option( MDM_SITE_ANIM_OPTION, 1 );
}

function mdm_site_footer_on() {
	return get_option( MDM_HOME_FOOT_OPTION, 1 ) && mdm_site_design_active();
}

function mdm_site_menu_on() {
	return get_option( MDM_HOME_MENU_OPTION, 0 ) && mdm_site_design_active();
}

function mdm_site_light_on() {
	return (bool) get_option( MDM_SITE_LIGHT_OPTION, 0 ) && mdm_site_design_active();
}

function mdm_is_shop_page() {
	if ( ! function_exists( 'is_checkout' ) ) {
		return false;
	}
	return is_cart() || is_checkout() || ( function_exists( 'is_order_received_page' ) && is_order_received_page() );
}

function mdm_site_shop_on() {
	return (bool) get_option( MDM_SITE_SHOP_OPTION, 1 ) && mdm_is_shop_page();
}

function mdm_site_layer_applies() {
	if ( is_admin() || wp_doing_ajax() || isset( $_GET['elementor-preview'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		return false;
	}
	return mdm_site_anim_on() || mdm_site_footer_on() || mdm_site_menu_on() || mdm_site_shop_on() || mdm_site_light_on();
}

/* Fonts, CSS and JS on every page that uses any part of the layer. */
add_action(
	'wp_head',
	static function () {
		if ( mdm_site_layer_applies() ) {
			if ( mdm_site_light_on() ) {
				// Hide the page for a moment while dark sections are switched to light (max 1.5s).
				echo '<script>document.documentElement.classList.add("mdm-light-pending");setTimeout(function(){document.documentElement.classList.remove("mdm-light-pending")},1500);</script>';
				echo '<style>html.mdm-light-pending body{opacity:0!important}</style>';
			}
			echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
		}
		if ( mdm_site_footer_on() || mdm_site_menu_on() ) {
			?>
			<style id="mdm-site-parts">
				body.mdm-new-footer .site-footer, body.mdm-new-footer #colophon,
				body.mdm-new-footer .elementor-location-footer, body.mdm-new-footer [data-elementor-type="footer"] { display: none !important; }
				body.mdm-new-menu .site-header, body.mdm-new-menu #masthead,
				body.mdm-new-menu .elementor-location-header, body.mdm-new-menu [data-elementor-type="header"] { display: none !important; }
			</style>
			<?php
		}
	},
	100 // after the theme's and Elementor's styles, so their text spacing can't leak into the new sections
);

add_filter(
	'body_class',
	static function ( $classes ) {
		if ( is_admin() ) {
			return $classes;
		}
		if ( mdm_site_anim_on() ) {
			$classes[] = 'mdm-site-anim';
		}
		if ( mdm_site_footer_on() ) {
			$classes[] = 'mdm-new-footer';
		}
		if ( mdm_site_menu_on() ) {
			$classes[] = 'mdm-new-menu';
		}
		if ( mdm_site_shop_on() ) {
			$classes[] = 'mdm-shop';
		}
		if ( mdm_site_light_on() ) {
			$classes[] = 'mdm-site-light';
		}
		return $classes;
	}
);

add_action(
	'wp_body_open',
	static function () {
		if ( mdm_site_layer_applies() && mdm_site_anim_on() ) {
			echo '<div class="mdm-progress" aria-hidden="true"></div><div class="mdm-curtain" aria-hidden="true"></div>';
		}
		if ( mdm_site_menu_on() ) {
			echo do_shortcode( '[mdm_menu]' ); // phpcs:ignore WordPress.Security.EscapeOutput
		}
	},
	20
);

// New footer at the end of every page (the theme's footer is hidden by CSS above).
add_action(
	'wp_footer',
	static function () {
		if ( ! is_admin() && mdm_site_footer_on() ) {
			echo '<div class="mdm-site-footer">' . do_shortcode( '[mdm_footer]' ) . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput
		}
	},
	1
);

/* ------------------------------------------------------------------ */
/* Cart / checkout / order received                                    */
/* ------------------------------------------------------------------ */

function mdm_shop_steps( $active ) {
	$steps = array( 'Your order', 'Details & payment', 'Confirmed' );
	$html  = '<ol class="mdm-steps" aria-label="Checkout progress">';
	foreach ( $steps as $i => $label ) {
		$state = $i < $active ? 'is-done' : ( $i === $active ? 'is-current' : '' );
		$html .= '<li class="' . esc_attr( $state ) . '"' . ( $i === $active ? ' aria-current="step"' : '' ) . '><i>' . ( $i < $active ? '✓' : (int) ( $i + 1 ) ) . '</i><span>' . esc_html( $label ) . '</span></li>';
	}
	return $html . '</ol>';
}

function mdm_shop_head( $title, $text, $active ) {
	return '<div class="mdm-shop-head">' . mdm_shop_steps( $active )
		. '<h1 class="mdm-shop-title">' . esc_html( $title ) . '</h1>'
		. ( $text ? '<p class="mdm-shop-sub">' . esc_html( $text ) . '</p>' : '' ) . '</div>';
}

function mdm_shop_trust() {
	$items = array(
		array( '🔒', 'Secure SSL checkout' ),
		array( '⚡', 'Delivered in 24–48 hours' ),
		array( '🔁', 'Revisions included' ),
		array( '💬', 'Support within 24h' ),
	);
	$html = '<ul class="mdm-trust">';
	foreach ( $items as $it ) {
		$html .= '<li><i aria-hidden="true">' . esc_html( $it[0] ) . '</i>' . esc_html( $it[1] ) . '</li>';
	}
	return $html . '</ul>';
}

add_action(
	'woocommerce_before_checkout_form',
	static function () {
		if ( mdm_site_shop_on() ) {
			echo mdm_shop_head( 'Secure checkout', 'Almost there. Fill in your details and your creatives go into production.', 1 ); // phpcs:ignore WordPress.Security.EscapeOutput
		}
	},
	1
);

add_action(
	'woocommerce_review_order_after_submit',
	static function () {
		if ( mdm_site_shop_on() ) {
			echo mdm_shop_trust(); // phpcs:ignore WordPress.Security.EscapeOutput
		}
	}
);

add_action(
	'woocommerce_before_cart',
	static function () {
		if ( mdm_site_shop_on() ) {
			echo mdm_shop_head( 'Your order', 'Review your creatives, then continue to the secure checkout.', 0 ); // phpcs:ignore WordPress.Security.EscapeOutput
		}
	},
	1
);

add_action(
	'woocommerce_before_thankyou',
	static function () {
		if ( mdm_site_shop_on() ) {
			echo '<div class="mdm-thanks-burst" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>'; // phpcs:ignore WordPress.Security.EscapeOutput
			echo mdm_shop_head( 'Thank you! Your order is confirmed.', 'We have emailed your receipt. Your creatives are now in production.', 2 ); // phpcs:ignore WordPress.Security.EscapeOutput
		}
	},
	1
);

// Block-based cart/checkout (if the store uses WooCommerce blocks instead of shortcodes).
add_filter(
	'render_block',
	static function ( $html, $block ) {
		if ( is_admin() || ! mdm_site_shop_on() || empty( $block['blockName'] ) ) {
			return $html;
		}
		if ( 'woocommerce/checkout' === $block['blockName'] ) {
			return mdm_shop_head( 'Secure checkout', 'Almost there. Fill in your details and your creatives go into production.', 1 ) . $html . mdm_shop_trust();
		}
		if ( 'woocommerce/cart' === $block['blockName'] ) {
			return mdm_shop_head( 'Your order', 'Review your creatives, then continue to the secure checkout.', 0 ) . $html;
		}
		return $html;
	},
	10,
	2
);
