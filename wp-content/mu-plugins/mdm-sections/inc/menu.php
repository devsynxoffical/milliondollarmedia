<?php
/**
 * [mdm_menu] - Floating header: logo pill (left), "Menu" pill (centre), CTA (right).
 * "Menu" opens a full-screen panel with big numbered links, a CTA card and socials.
 * Hides while scrolling down, comes back when scrolling up.
 *
 * Put it in an Elementor Header template (Shortcode widget) or at the top of a page:
 * [mdm_menu links="Home:/|Services:/services/|Case Studies:/#case-studies|How it works:/#how-it-works|FAQ:/#faq|Contact:/book-your-call/"
 *           logo="https://.../logo.png" cta_text="Book a call" cta_url="/book-your-call/"]
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_menu', 'mdm_shortcode_menu' );

function mdm_site_logo_url() {
	$id = function_exists( 'get_theme_mod' ) ? get_theme_mod( 'custom_logo' ) : 0;
	if ( $id && function_exists( 'wp_get_attachment_image_url' ) ) {
		$url = wp_get_attachment_image_url( $id, 'medium' );
		if ( $url ) {
			return $url;
		}
	}
	return '';
}

function mdm_parse_links( $raw ) {
	$links = array();
	foreach ( MDM_Sections::split_list( $raw ) as $pair ) {
		$pos = strpos( $pair, ':' );
		if ( false === $pos ) {
			continue;
		}
		$links[] = array( trim( substr( $pair, 0, $pos ) ), trim( substr( $pair, $pos + 1 ) ) );
	}
	return $links;
}

function mdm_socials() {
	return apply_filters(
		'mdm_socials',
		array(
			array( 'Instagram', 'https://www.instagram.com/' ),
			array( 'Facebook', 'https://www.facebook.com/' ),
			array( 'YouTube', 'https://www.youtube.com/' ),
			array( 'WhatsApp', MDM_Sections::whatsapp_url() ),
		)
	);
}

function mdm_shortcode_menu( $atts ) {
	$atts = shortcode_atts(
		array(
			'links'     => 'Home:/|Services:/services/|Case Studies:/#case-studies|How it works:/#how-it-works|FAQ:/#faq|Contact:/book-your-call/',
			'logo'      => mdm_site_logo_url(),
			'brand'     => 'Million Dollar Media',
			'cta_text'  => 'Book a call',
			'cta_url'   => MDM_Sections::cta_url(),
			'card_title'=> 'Ready to make your ads print?',
			'card_text' => 'Free strategy call. We review your offer, show matching case studies and map your first 30 days.',
			'email'     => 'hello@milliondollarmedia.us',
		),
		$atts,
		'mdm_menu'
	);

	$links = mdm_parse_links( $atts['links'] );
	$uid   = 'mdm-menu-' . wp_rand( 1000, 9999 );

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<div class="mdm-nav" data-mdm-menu>
		<div class="mdm-nav__bar">
			<a class="mdm-nav__logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( $atts['brand'] ); ?> home">
				<?php if ( $atts['logo'] ) : ?>
					<img src="<?php echo esc_url( $atts['logo'] ); ?>" alt="<?php echo esc_attr( $atts['brand'] ); ?>">
				<?php else : ?>
					<span class="mdm-nav__mark">M</span><span class="mdm-nav__name"><?php echo esc_html( $atts['brand'] ); ?></span>
				<?php endif; ?>
			</a>
			<button type="button" class="mdm-nav__toggle" aria-expanded="false" aria-controls="<?php echo esc_attr( $uid ); ?>">
				<span class="mdm-nav__dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
				<span class="mdm-nav__label" data-open="Menu" data-close="Close">Menu</span>
			</button>
			<a class="mdm-nav__cta" href="<?php echo esc_url( $atts['cta_url'] ); ?>"><?php echo esc_html( $atts['cta_text'] ); ?> <?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?></a>
		</div>

		<div class="mdm-nav__panel" id="<?php echo esc_attr( $uid ); ?>" role="dialog" aria-modal="true" aria-label="Site menu" hidden>
			<div class="mdm-nav__inner">
				<nav class="mdm-nav__links" aria-label="Main">
					<?php foreach ( $links as $k => $l ) : ?>
						<a href="<?php echo esc_url( $l[1] ); ?>" style="--k:<?php echo (int) $k; ?>;--c:var(--mdm-c<?php echo (int) ( $k % 5 ); ?>)">
							<small><?php echo esc_html( str_pad( (string) ( $k + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></small>
							<span class="mdm-nav__text" data-text="<?php echo esc_attr( $l[0] ); ?>"><?php echo esc_html( $l[0] ); ?></span>
							<?php echo MDM_Sections::arrow_icon( 'mdm-nav__arr' ); // phpcs:ignore ?>
						</a>
					<?php endforeach; ?>
				</nav>
				<aside class="mdm-nav__side">
					<div class="mdm-nav__card">
						<span class="mdm-eyebrow mdm-eyebrow--plain">Free strategy call</span>
						<p class="mdm-nav__cardtitle"><?php echo esc_html( $atts['card_title'] ); ?></p>
						<p><?php echo esc_html( $atts['card_text'] ); ?></p>
						<?php echo MDM_Sections::button( $atts['cta_text'], $atts['cta_url'] ); // phpcs:ignore ?>
					</div>
					<div class="mdm-nav__meta">
						<a href="mailto:<?php echo esc_attr( $atts['email'] ); ?>"><?php echo esc_html( $atts['email'] ); ?></a>
						<div class="mdm-nav__socials">
							<?php foreach ( mdm_socials() as $s ) : ?>
								<a href="<?php echo esc_url( $s[1] ); ?>" target="_blank" rel="noopener"><?php echo esc_html( $s[0] ); ?></a>
							<?php endforeach; ?>
						</div>
					</div>
				</aside>
			</div>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
