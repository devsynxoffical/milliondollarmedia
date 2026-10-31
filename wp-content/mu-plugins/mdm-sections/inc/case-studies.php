<?php
/**
 * [mdm_case_studies] - Case studies with a Lead Gen / E-Commerce switch.
 * Each card shows the real results screenshot (click to enlarge).
 *
 * Edit / add cards from code:
 * add_filter( 'mdm_case_studies', function ( $groups ) { $groups['leadgen']['items'][] = array(...); return $groups; } );
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_case_studies', 'mdm_shortcode_case_studies' );

function mdm_default_case_studies() {
	$img = function ( $file ) {
		return MDM_Sections::upload_url( '2026/06/' . $file );
	};
	return array(
		'leadgen' => array(
			'label' => 'Lead Gen',
			'items' => array(
				array( 'niche' => 'Roofing · Texas', 'headline' => '686 leads in 8 days', 'metrics' => array( '$5.31 CPL', '2.17% CTR', '8 days' ), 'image' => $img( 'Screenshot-2025-12-31-at-11.19.23-PM.png' ) ),
				array( 'niche' => 'Roofing', 'headline' => '537 qualified leads from $2,292', 'metrics' => array( '$4.27 CPL', '$2,292 spend' ), 'image' => $img( 'Screenshot-2025-12-31-at-11.27.53-PM.png' ) ),
				array( 'niche' => 'HVAC', 'headline' => '326 qualified leads in 26 days', 'metrics' => array( '$4.68 CPL', '26 days' ), 'image' => $img( 'Screenshot-2025-12-31-at-11.30.50-PM.png' ) ),
				array( 'niche' => 'Mortgage', 'headline' => '773 OTP-verified leads in 45 days', 'metrics' => array( '$25.61 CPL', 'OTP verified' ), 'image' => $img( 'Screenshot-2025-12-31-at-10.11.39-PM.png' ) ),
				array( 'niche' => 'Roofing · Texas', 'headline' => '850 leads in 8 days', 'metrics' => array( '$7.60 CPL', '$6,461 spend' ), 'image' => $img( 'Screenshot-2026-01-03-at-1.36.46-PM.png' ) ),
				array( 'niche' => 'HVAC', 'headline' => '630 OTP-verified leads from $14.5K', 'metrics' => array( '$23.09 CPL', 'OTP verified' ), 'image' => $img( 'Screenshot-2026-01-03-at-1.08.01-PM.png' ) ),
				array( 'niche' => 'Kitchen Remodeling', 'headline' => '337 appointments in 19 days', 'metrics' => array( 'Cold traffic', '19 days' ), 'image' => $img( 'Screenshot-2025-12-31-at-10.31.57-PM.png' ) ),
				array( 'niche' => 'Mortgage', 'headline' => '492 mortgage-ready leads in 19 days', 'metrics' => array( '19 days', 'Registrations' ), 'image' => $img( 'Screenshot-2025-12-31-at-11.13.14-PM.png' ) ),
				array( 'niche' => 'Roofing', 'headline' => '177 roofing leads in 7 days', 'metrics' => array( '$4.80 per lead', '$849 spend' ), 'image' => $img( 'Screenshot-2026-01-03-at-1.07.27-PM.png' ) ),
			),
		),
		'ecom'    => array(
			'label' => 'E-Commerce',
			'items' => array(
				array( 'niche' => 'Wellness', 'headline' => '$9,766 into $64,455 in 20 days', 'metrics' => array( '6.6x ROAS', 'New funnel' ), 'image' => $img( 'Screenshot-2025-12-31-at-11.17.05-PM.png' ) ),
				array( 'niche' => "Women's Athleisure", 'headline' => '$14,967 spend into $90,597', 'metrics' => array( '6.05x ROAS', '30 days' ), 'image' => $img( 'Screenshot-2025-12-31-at-11.17.35-PM.png' ) ),
				array( 'niche' => 'Luxury Skincare', 'headline' => 'Scaling at 4.42 ROAS into Q4', 'metrics' => array( '4.42x ROAS', 'Full speed' ), 'image' => $img( 'Screenshot-2025-12-31-at-11.22.05-PM.png' ) ),
				array( 'niche' => 'Fitness LTO', 'headline' => '$100,000+ in just 30 days', 'metrics' => array( '$100K+', '30 days' ), 'image' => $img( 'Screenshot-2026-01-03-at-1.38.39-PM.png' ) ),
				array( 'niche' => 'Agency Scaling', 'headline' => '$846,000 year, 235 clients closed', 'metrics' => array( '$3,600 avg deal', 'All tracked' ), 'image' => $img( 'Screenshot-2025-12-31-at-10.11.17-PM.png' ) ),
				array( 'niche' => 'Info Product', 'headline' => '2,064 registrations at $0.50 CPL', 'metrics' => array( '$0.50 CPL', 'Live session' ), 'image' => $img( 'Screenshot-2025-12-31-at-11.25.11-PM.png' ) ),
			),
		),
	);
}

function mdm_shortcode_case_studies( $atts ) {
	$atts = shortcode_atts(
		array(
			'eyebrow'  => 'Case studies',
			'title'    => 'Proof, not promises.',
			'subtitle' => 'Real accounts, real screenshots. Pick a model and see what our system does for businesses like yours.',
			'cta_text' => 'Get results like these',
			'cta_url'  => MDM_Sections::cta_url(),
		),
		$atts,
		'mdm_case_studies'
	);

	$groups = apply_filters( 'mdm_case_studies', mdm_default_case_studies() );
	$uid    = 'mdm-cs-' . wp_rand( 1000, 9999 );
	$colors = array( 'var(--mdm-red)', 'var(--mdm-ink)' );

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-cases" data-mdm-cases data-mdm-reveal id="case-studies">
		<div class="mdm-cases__head">
			<span class="mdm-eyebrow mdm-eyebrow--plain mdm-rise" style="--d:0s"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
			<h2 class="mdm-display mdm-cases__title"><?php echo MDM_Sections::split_words( $atts['title'] ); // phpcs:ignore ?></h2>
			<p class="mdm-lead mdm-rise" style="--d:.35s"><?php echo esc_html( $atts['subtitle'] ); ?></p>

			<div class="mdm-switch mdm-rise" style="--d:.45s" role="tablist">
				<span class="mdm-switch__thumb" aria-hidden="true"></span>
				<?php $first = true; foreach ( $groups as $key => $group ) : ?>
					<button type="button" role="tab" class="mdm-switch__btn<?php echo $first ? ' is-on' : ''; ?>" aria-selected="<?php echo $first ? 'true' : 'false'; ?>" aria-controls="<?php echo esc_attr( $uid . '-' . $key ); ?>" data-tab="<?php echo esc_attr( $key ); ?>">
						<?php echo esc_html( $group['label'] ); ?> <small><?php echo count( $group['items'] ); ?></small>
					</button>
				<?php $first = false; endforeach; ?>
			</div>
		</div>

		<?php $first = true; foreach ( $groups as $key => $group ) : ?>
			<div class="mdm-cases__grid<?php echo $first ? ' is-on' : ''; ?>" role="tabpanel" id="<?php echo esc_attr( $uid . '-' . $key ); ?>" data-panel="<?php echo esc_attr( $key ); ?>"<?php echo $first ? '' : ' hidden'; ?>>
				<?php foreach ( $group['items'] as $i => $item ) : ?>
					<article class="mdm-cs" style="--c:<?php echo esc_attr( $colors[ $i % count( $colors ) ] ); ?>;--i:<?php echo (int) $i; ?>">
						<button type="button" class="mdm-cs__shot" data-full="<?php echo esc_url( $item['image'] ); ?>" aria-label="<?php echo esc_attr( 'Enlarge screenshot: ' . $item['headline'] ); ?>">
							<img src="<?php echo esc_url( $item['image'] ); ?>" alt="<?php echo esc_attr( $item['niche'] . ' results: ' . $item['headline'] ); ?>" loading="lazy" decoding="async">
							<span class="mdm-cs__zoom">View proof ↗</span>
						</button>
						<div class="mdm-cs__body">
							<span class="mdm-cs__niche"><i></i><?php echo esc_html( $item['niche'] ); ?></span>
							<h3 class="mdm-cs__headline"><?php echo esc_html( $item['headline'] ); ?></h3>
							<div class="mdm-cs__metrics">
								<?php foreach ( $item['metrics'] as $m ) : ?><span><?php echo esc_html( $m ); ?></span><?php endforeach; ?>
							</div>
						</div>
					</article>
				<?php endforeach; ?>
			</div>
		<?php $first = false; endforeach; ?>

		<div class="mdm-cases__cta mdm-rise"><?php echo MDM_Sections::button( $atts['cta_text'], $atts['cta_url'] ); // phpcs:ignore ?></div>

		<div class="mdm-lightbox" hidden>
			<button type="button" class="mdm-lightbox__close" aria-label="Close">×</button>
			<img alt="">
		</div>
	</section>
	<?php
	return ob_get_clean();
}
