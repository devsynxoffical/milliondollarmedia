<?php
/**
 * [mdm_live_calls] - "Unfiltered strategy sprints & live client audits": a dark, slowly scrolling row of
 * call screenshots in little window frames (like funnelsthatprint.com). Printed above the footer on every page.
 * Turn off above the footer: add_filter( 'mdm_live_calls_above_footer', '__return_false' );
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_live_calls', 'mdm_shortcode_live_calls' );

function mdm_live_call_cards() {
	return apply_filters(
		'mdm_live_calls',
		array(
			array( 'Funnel Build', 'anastasia', 'Client Offer Architecture' ),
			array( 'Strategy Session', 'ann', 'Live Growth Breakdown' ),
			array( 'ROAS Verified', 'analytics', 'Real-Time Tracking Core' ),
			array( 'Scaling Audit', 'george', 'Backend Conversion Review' ),
			array( 'Deep-Dive', 'edgar_jeermei', 'Offer & Angle Mapping' ),
			array( 'Client Onboarding', 'guilia', 'High-Ticket Pipeline Setup' ),
			array( 'Traffic Scale', 'ig_shot', 'Paid Acquisition Proof' ),
			array( 'Growth Workshop', 'owne', 'Unit Economics Audit' ),
			array( 'Pipeline Review', 'sina', 'Closing Optimization' ),
		)
	);
}

function mdm_shortcode_live_calls( $atts ) {
	$atts  = shortcode_atts(
		array(
			'eyebrow' => 'Behind the scenes',
			'title'   => 'Unfiltered strategy sprints & live client audits',
			'text'    => 'Real calls with real clients: offer mapping, scaling audits and onboarding, recorded live.',
		),
		$atts,
		'mdm_live_calls'
	);
	$cards = mdm_live_call_cards();
	$base  = WPMU_PLUGIN_URL . '/mdm-sections/img/calls/';
	$rots  = array( -2, 1.5, -1, 2, -1.5, 1, -2, 1.5, -1 );

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-calls" aria-label="<?php echo esc_attr( $atts['title'] ); ?>">
		<div class="mdm-calls__head">
			<span class="mdm-calls__eyebrow"><i></i><?php echo esc_html( $atts['eyebrow'] ); ?></span>
			<h2 class="mdm-calls__title"><?php echo esc_html( $atts['title'] ); ?></h2>
			<p class="mdm-calls__text"><?php echo esc_html( $atts['text'] ); ?></p>
		</div>
		<div class="mdm-calls__track">
			<div class="mdm-calls__row">
				<?php for ( $dup = 0; $dup < 2; $dup++ ) : foreach ( $cards as $i => $c ) : ?>
					<figure class="mdm-call" style="--rot:<?php echo esc_attr( $rots[ $i % count( $rots ) ] ); ?>deg"<?php echo $dup ? ' aria-hidden="true"' : ''; ?>>
						<div class="mdm-call__bar">
							<span class="mdm-call__dots"><i></i><i></i><i></i></span>
							<span class="mdm-call__badge"><i></i><?php echo esc_html( $c[0] ); ?></span>
						</div>
						<div class="mdm-call__img"><img src="<?php echo esc_url( $base . $c[1] . '.webp' ); ?>" alt="<?php echo $dup ? '' : esc_attr( $c[2] . ' (client call)' ); ?>" loading="lazy" decoding="async"></div>
						<figcaption><span><?php echo esc_html( $c[2] ); ?></span><b>Live recording</b></figcaption>
					</figure>
				<?php endforeach; endfor; ?>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

// Above the footer on every front-end page (cart / checkout excluded).
add_action(
	'wp_footer',
	static function () {
		if ( is_admin() || ! function_exists( 'mdm_site_footer_on' ) || ! mdm_site_footer_on() ) {
			return;
		}
		if ( function_exists( 'mdm_is_shop_page' ) && mdm_is_shop_page() ) {
			return;
		}
		if ( ! apply_filters( 'mdm_live_calls_above_footer', true ) ) {
			return;
		}
		echo '<div class="mdm-site-calls">' . do_shortcode( '[mdm_live_calls]' ) . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput
	},
	0 // just before the footer (printed at priority 1)
);
