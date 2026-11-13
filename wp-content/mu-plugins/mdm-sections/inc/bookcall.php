<?php
/**
 * [mdm_bookcall] - the /bookcall/ page: "Get custom pricing" pitch + the LeadConnector booking calendar
 * (the same calendar as /book-your-call/). Every "Get custom pricing" button points here.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_bookcall', 'mdm_shortcode_bookcall' );

/** Where "Get custom pricing" buttons go. */
function mdm_pricing_call_url() {
	return apply_filters( 'mdm_pricing_call_url', home_url( '/bookcall/' ) );
}

function mdm_shortcode_bookcall( $atts ) {
	$atts = shortcode_atts(
		array(
			'eyebrow'  => 'Custom pricing',
			'title'    => 'Get a plan and price built around your budget',
			'text'     => 'Need 10+ creatives a month, a full done-for-you package or ads management? Pick a time below. On a free 15-minute call we review your offer and current ads, show matching case studies and send you custom pricing.',
			'calendar' => 'https://api.leadconnectorhq.com/widget/booking/mqKLUgDAfvpIc82l2f4Q',
		),
		$atts,
		'mdm_bookcall'
	);
	$points = array(
		array( '💸', 'Volume pricing', 'Bigger monthly orders get a lower price per creative.' ),
		array( '🎯', 'A plan for your niche', 'Creative angles and case studies from businesses like yours.' ),
		array( '⚡', '24–48h delivery', 'Fully done-for-you, at half the cost of most agencies.' ),
		array( '🤝', 'No pressure', 'Honest advice, even if we are not the right fit.' ),
	);
	$id = 'mdm-cal-' . wp_rand( 1000, 9999 );

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-cases mdm-page mdm-book" data-mdm-reveal>
		<div class="mdm-book__grid">
			<div class="mdm-book__pitch">
				<span class="mdm-eyebrow mdm-eyebrow--plain mdm-rise" style="--d:0s"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
				<h1 class="mdm-display mdm-book__title"><?php echo MDM_Sections::split_words( $atts['title'] ); // phpcs:ignore ?></h1>
				<span class="mdm-impact__badge mdm-rise" style="--d:.3s"><i></i>Backed by 250+ case studies</span>
				<p class="mdm-lead mdm-rise" style="--d:.4s"><?php echo esc_html( $atts['text'] ); ?></p>
				<ul class="mdm-book__points">
					<?php foreach ( $points as $i => $p ) : ?>
						<li style="--i:<?php echo (int) $i; ?>"><i><?php echo esc_html( $p[0] ); ?></i><div><b><?php echo esc_html( $p[1] ); ?></b><span><?php echo esc_html( $p[2] ); ?></span></div></li>
					<?php endforeach; ?>
				</ul>
				<div class="mdm-book__stats">
					<div><b>12+</b><span>years</span></div>
					<div><b>$100M+</b><span>client revenue</span></div>
					<div><b>247</b><span>case studies</span></div>
				</div>
				<p class="mdm-book__alt">Prefer chat? <a href="<?php echo esc_url( add_query_arg( 'text', rawurlencode( 'Hi! I want custom pricing for ad creatives.' ), MDM_Sections::whatsapp_url() ) ); ?>" target="_blank" rel="noopener">Message us on WhatsApp →</a></p>
			</div>
			<div class="mdm-book__cal">
				<div class="mdm-book__cal-head"><span class="mdm-book__live"><i></i>Free 15-minute call</span><b>Pick a time that suits you</b></div>
				<iframe src="<?php echo esc_url( $atts['calendar'] ); ?>" id="<?php echo esc_attr( $id ); ?>" class="skip-lazy" data-no-lazy="1" scrolling="no" title="Book a call" style="width:100%;border:none;overflow:visible;min-height:760px"></iframe>
				<script src="https://link.msgsndr.com/js/form_embed.js" type="text/javascript"></script>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}
