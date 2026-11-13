<?php
/**
 * [mdm_story]      Our Story page: intro, numbers, what we believe, how we help.
 * [mdm_story_cta]  Closing "book a call" band (used on the Our Story page).
 * All copy comes from the site itself (old "Since 2019", "Powered by $50M", "Trusted by Titans" sections).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_story', 'mdm_shortcode_story' );
add_shortcode( 'mdm_story_cta', 'mdm_shortcode_story_cta' );

function mdm_shortcode_story( $atts ) {
	$atts = shortcode_atts(
		array(
			'eyebrow' => 'Our story',
			'title'   => 'Built on data. Scaling brands since 2019.',
			'lead'    => 'Million Dollar Media is a done-for-you creative and media buying team with 12+ years of experience. We help agencies, coaches, local service businesses and e-commerce brands turn ads into booked calls and revenue.',
		),
		$atts,
		'mdm_story'
	);
	$stats = array(
		array( '12+', 'Years of experience' ),
		array( '$100M+', 'Revenue generated for clients' ),
		array( '$50M+', 'Spent on ads, every result tracked' ),
		array( '10,000+', 'Creatives produced' ),
		array( '250+', 'Case studies' ),
		array( '500+', 'Collaborations with 7, 8 & 9-figure brands' ),
		array( '50+', 'Specialist editors' ),
		array( '22+', 'Languages' ),
	);
	$beliefs = array(
		array( '📊', 'Data, not guesses', 'From $50M in ad spend and profitable tracked ROAS across roofing, HVAC, solar, legal, coaching, agencies and e-commerce. Every dollar spent and every result is tracked.' ),
		array( '🎬', 'Creative is 80% of the result', 'Winning ads today are 80% creative and 20% media buying. The bottleneck is making great creative at scale, so that is what we built our team around.' ),
		array( '⚡', 'Fast, done-for-you, half the cost', 'Futuristic, high-converting videos in 24–48 hours at half the cost of most agencies, with fully done-for-you execution and instant AI-led support.' ),
	);
	$steps = array(
		array( '01', 'AI-powered content that attracts clients', 'Client-booking videos that stop the scroll, build trust and fill your calendar with high-ticket leads while you focus on your business.' ),
		array( '02', 'AI-driven editing for maximum conversions', 'We turn raw or guided footage into polished, high-converting videos, delivered in half the time.' ),
		array( '03', 'Done-for-you client acquisition', 'Planning, scripting, editing, ads and delivery handled for you, so you can focus on closing deals.' ),
	);

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-cases mdm-page mdm-story" data-mdm-reveal>
		<div class="mdm-story__hero">
			<span class="mdm-eyebrow mdm-eyebrow--plain mdm-rise" style="--d:0s"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
			<h1 class="mdm-display mdm-story__title"><?php echo MDM_Sections::split_words( $atts['title'] ); // phpcs:ignore ?></h1>
			<p class="mdm-lead mdm-rise" style="--d:.4s"><?php echo esc_html( $atts['lead'] ); ?></p>
			<div class="mdm-story__btns mdm-rise" style="--d:.5s">
				<?php echo MDM_Sections::button( 'Book a free strategy call', MDM_Sections::cta_url() ); // phpcs:ignore ?>
				<a class="mdm-story__link" href="<?php echo esc_url( home_url( '/case-studies/' ) ); ?>">See 247 case studies →</a>
			</div>
		</div>

		<div class="mdm-story__stats">
			<?php foreach ( $stats as $i => $s ) : ?>
				<div class="mdm-story__stat" style="--i:<?php echo (int) $i; ?>"><b><?php echo esc_html( $s[0] ); ?></b><span><?php echo esc_html( $s[1] ); ?></span></div>
			<?php endforeach; ?>
		</div>

		<div class="mdm-story__block">
			<h2 class="mdm-display mdm-story__h2">What we believe</h2>
			<div class="mdm-story__cards">
				<?php foreach ( $beliefs as $i => $b ) : ?>
					<div class="mdm-story__card" style="--i:<?php echo (int) $i; ?>"><i><?php echo esc_html( $b[0] ); ?></i><h3><?php echo esc_html( $b[1] ); ?></h3><p><?php echo esc_html( $b[2] ); ?></p></div>
				<?php endforeach; ?>
			</div>
		</div>

		<div class="mdm-story__block">
			<h2 class="mdm-display mdm-story__h2">How we help you grow</h2>
			<div class="mdm-story__steps">
				<?php foreach ( $steps as $i => $s ) : ?>
					<div class="mdm-story__step" style="--i:<?php echo (int) $i; ?>"><b><?php echo esc_html( $s[0] ); ?></b><div><h3><?php echo esc_html( $s[1] ); ?></h3><p><?php echo esc_html( $s[2] ); ?></p></div></div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

function mdm_shortcode_story_cta( $atts ) {
	$atts = shortcode_atts(
		array(
			'title' => 'Ready to be our next case study?',
			'text'  => 'Book a free 15-minute strategy call. We review your offer and current ads, show matching case studies and recommend the plan that fits, with no pressure.',
		),
		$atts,
		'mdm_story_cta'
	);
	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-cases mdm-story-cta" data-mdm-reveal>
		<div class="mdm-quote mdm-rise">
			<div class="mdm-quote__text">
				<span class="mdm-quote__tag">Free strategy call</span>
				<h3><?php echo esc_html( $atts['title'] ); ?></h3>
				<p><?php echo esc_html( $atts['text'] ); ?></p>
			</div>
			<div class="mdm-quote__actions">
				<?php echo MDM_Sections::button( 'Book a free call', MDM_Sections::cta_url(), 'mdm-btn--red' ); // phpcs:ignore ?>
				<a class="mdm-quote__wa" href="<?php echo esc_url( MDM_Sections::whatsapp_url() ); ?>" target="_blank" rel="noopener">or message us on WhatsApp →</a>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/*
 * The pages built here (Our Story, case studies, Book a Call) use the main site header with the menu
 * (Elementor template 69) instead of the logo-only landing-page header (4358) that other pages get.
 */
function mdm_main_header_pages() {
	return apply_filters( 'mdm_main_header_pages', array( 'our-story', 'case-studies', 'lead-generation', 'ecommerce', 'bookcall' ) );
}
add_filter(
	'elementor/theme/get_location_templates/template_id',
	static function ( $template_id, $location = '' ) {
		if ( 'header' !== $location || 4358 !== (int) $template_id || is_admin() ) {
			return $template_id;
		}
		// Funnel steps keep the logo-only header so buyers are not pulled away mid-funnel.
		$funnel = apply_filters( 'mdm_logo_header_pages', array( 'upsell', 'downsell', 'provide-information', 'theleadpilot' ) );
		return is_page( $funnel ) ? $template_id : (int) apply_filters( 'mdm_main_header_id', 69 );
	},
	10,
	2
);
