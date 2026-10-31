<?php
/**
 * [mdm_impact_cards] - "The difference we make through our work".
 * Green grid background + sticky stacking case-study cards.
 * Replaces the old "Powered by $50M in Ad Spend" section.
 *
 * [mdm_impact_cards eyebrow="Growth · Impact · Speed" title="The difference we make through our work"
 *                   badge="Backed by 250+ case studies" link_text="View project"]
 *
 * Change the cards from code with:
 * add_filter( 'mdm_impact_cards', function ( $cards ) { ... return $cards; } );
 * Each card: brand, stat, prefix, suffix, text, link, image (optional), color.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_impact_cards', 'mdm_shortcode_impact' );

function mdm_default_impact_cards() {
	$cta = MDM_Sections::cta_url();
	return array(
		array(
			'brand'  => 'Texas Roofing',
			'stat'   => '686',
			'prefix' => '',
			'suffix' => '',
			'text'   => 'Website leads in just 8 days at $5.31 CPL and a 2.17% CTR',
			'link'   => $cta,
			'image'  => MDM_Sections::upload_url( '2026/06/Screenshot-2025-12-31-at-11.19.23-PM.png' ),
			'color'  => '#FFBA3B',
		),
		array(
			'brand'  => 'Wellness Brand',
			'stat'   => '6.6',
			'prefix' => '',
			'suffix' => 'x',
			'text'   => 'ROAS: $9,766 turned into $64,455 in 20 days from a brand-new funnel',
			'link'   => $cta,
			'image'  => MDM_Sections::upload_url( '2026/06/Screenshot-2025-12-31-at-11.17.05-PM.png' ),
			'color'  => '#8E6CF0',
		),
		array(
			'brand'  => 'HVAC',
			'stat'   => '326',
			'prefix' => '',
			'suffix' => '',
			'text'   => 'Qualified HVAC leads in just 26 days at $4.68 CPL',
			'link'   => $cta,
			'image'  => MDM_Sections::upload_url( '2026/06/Screenshot-2025-12-31-at-11.30.50-PM.png' ),
			'color'  => '#2FC98F',
		),
		array(
			'brand'  => 'Athleisure E-Com',
			'stat'   => '90597',
			'prefix' => '$',
			'suffix' => '',
			'text'   => 'Revenue from $14,967 in ad spend for a women\'s athleisure brand',
			'link'   => $cta,
			'image'  => MDM_Sections::upload_url( '2026/06/Screenshot-2025-12-31-at-11.17.35-PM.png' ),
			'color'  => '#4F9BFF',
		),
		array(
			'brand'  => 'Case Studies',
			'stat'   => '250',
			'prefix' => '',
			'suffix' => '+',
			'text'   => 'Case studies across Roofing, HVAC, Mortgage, Remodeling, E-Com & Coaching',
			'link'   => $cta,
			'color'  => '#FF7A30',
		),
	);
}

function mdm_shortcode_impact( $atts ) {
	$atts = shortcode_atts(
		array(
			'eyebrow'   => 'Growth · Impact · Speed',
			'title'     => 'The difference we make through our work',
			'badge'     => 'Backed by 250+ case studies',
			'link_text' => 'View project',
		),
		$atts,
		'mdm_impact_cards'
	);

	$cards = apply_filters( 'mdm_impact_cards', mdm_default_impact_cards() );
	$count = count( $cards );
	if ( ! $count ) {
		return '';
	}

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-impact" data-mdm-impact style="--mdm-cards:<?php echo (int) $count; ?>">
		<div class="mdm-impact__grid" aria-hidden="true"></div>
		<div class="mdm-impact__pin">
			<div class="mdm-impact__head">
				<span class="mdm-impact__eyebrow mdm-rise" style="--d:0s"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
				<h2 class="mdm-impact__title"><?php echo MDM_Sections::split_words( $atts['title'] ); // phpcs:ignore ?></h2>
				<?php if ( $atts['badge'] ) : ?>
					<span class="mdm-impact__badge mdm-rise" style="--d:.5s"><i></i><?php echo esc_html( $atts['badge'] ); ?></span>
				<?php endif; ?>
			</div>

			<div class="mdm-impact__stack">
				<span class="mdm-sticker" aria-hidden="true">
					<svg viewBox="0 0 100 100">
						<path fill="#C9A7FF" d="M50 2l8.6 17.4 18.4-6.4-3.6 19.1 19.1 3.6-12.2 15.3 12.2 15.3-19.1 3.6 3.6 19.1-18.4-6.4L50 98l-8.6-17.4-18.4 6.4 3.6-19.1-19.1-3.6L19.7 49 7.5 33.7l19.1-3.6L23 11l18.4 6.4z"/>
						<g fill="none" stroke="#3B1F6B" stroke-width="4" stroke-linecap="round">
							<circle cx="41" cy="44" r="2.5" fill="#3B1F6B" stroke="none"/>
							<circle cx="59" cy="44" r="2.5" fill="#3B1F6B" stroke="none"/>
							<path d="M38 56c6 7 18 7 24 0"/>
						</g>
					</svg>
				</span>

				<?php foreach ( $cards as $i => $card ) :
					$color  = ! empty( $card['color'] ) ? $card['color'] : '#5FB3C9';
					$prefix = isset( $card['prefix'] ) ? $card['prefix'] : '';
					$suffix = isset( $card['suffix'] ) ? $card['suffix'] : '';
					?>
					<article class="mdm-case" style="--c:<?php echo esc_attr( $color ); ?>;z-index:<?php echo (int) ( $i + 1 ); ?>">
						<div class="mdm-case__body">
							<div class="mdm-case__brand">
								<svg viewBox="0 0 32 24" aria-hidden="true"><path fill="var(--c)" d="M8 0h24l-8 10H0zM8 14h24l-8 10H0z"/></svg>
								<span><?php echo esc_html( $card['brand'] ); ?></span>
							</div>
							<div class="mdm-case__bottom">
								<p class="mdm-case__stat"><?php echo esc_html( $prefix ); ?><span class="mdm-count" data-to="<?php echo esc_attr( $card['stat'] ); ?>"><?php echo esc_html( number_format( (float) $card['stat'], strlen( substr( strrchr( $card['stat'], '.' ), 1 ) ) ) ); ?></span><?php echo esc_html( $suffix ); ?></p>
								<p class="mdm-case__text"><?php echo esc_html( $card['text'] ); ?></p>
								<a class="mdm-case__link" href="<?php echo esc_url( $card['link'] ); ?>">
									<?php echo esc_html( $atts['link_text'] ); ?>
									<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
								</a>
							</div>
						</div>
						<div class="mdm-case__visual">
							<?php if ( ! empty( $card['image'] ) ) : ?>
								<div class="mdm-case__shot">
									<img src="<?php echo esc_url( $card['image'] ); ?>" alt="<?php echo esc_attr( $card['brand'] . ' results screenshot' ); ?>" loading="lazy" decoding="async">
								</div>
							<?php else : ?>
								<?php echo mdm_dashboard_mock( $card, $i ); // phpcs:ignore ?>
							<?php endif; ?>
						</div>
					</article>
				<?php endforeach; ?>
			</div>

			<div class="mdm-impact__dots" aria-hidden="true">
				<?php for ( $d = 0; $d < $count; $d++ ) : ?><i></i><?php endfor; ?>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/** A pure-CSS "Ads Manager" screen for cards without an image. */
function mdm_dashboard_mock( $card, $i ) {
	$bars = array( 28, 42, 35, 55, 48, 66, 60, 78, 72, 92 );
	$rows = array(
		array( 'Roofing · 686 leads', '$5.31' ),
		array( 'HVAC · 326 leads', '$4.68' ),
		array( 'Mortgage · 773 leads', '$25.61' ),
		array( 'Wellness · 6.6x ROAS', '$64K' ),
	);
	ob_start();
	?>
	<div class="mdm-mock" aria-hidden="true">
		<div class="mdm-mock__screen mdm-mock__screen--back">
			<div class="mdm-mock__bar"></div>
			<div class="mdm-mock__lines"><i></i><i></i><i></i><i></i></div>
		</div>
		<div class="mdm-mock__screen">
			<div class="mdm-mock__top"><b>Case study vault</b><span>2025 – 2026</span></div>
			<div class="mdm-mock__kpis">
				<div><span>Case studies</span><b>250+</b></div>
				<div><span>Best ROAS</span><b>6.6x</b></div>
				<div><span>Lowest CPL</span><b>$0.50</b></div>
			</div>
			<div class="mdm-mock__chart">
				<?php foreach ( $bars as $k => $h ) : ?>
					<i style="--h:<?php echo (int) $h; ?>%;--k:<?php echo (int) $k; ?>"></i>
				<?php endforeach; ?>
			</div>
			<div class="mdm-mock__rows">
				<?php foreach ( $rows as $row ) : ?>
					<div><span class="dot"></span><span><?php echo esc_html( $row[0] ); ?></span><b><?php echo esc_html( $row[1] ); ?></b></div>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
