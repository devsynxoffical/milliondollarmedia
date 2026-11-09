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
	// Highlights only. The screenshots themselves live in the Case studies section ("See the proof").
	$proof = '#case-studies';
	return array(
		array(
			'brand' => 'Texas Roofing', 'stat' => '686', 'prefix' => '', 'suffix' => '',
			'text'  => 'Website leads in just 8 days at $5.31 CPL and a 2.17% CTR',
			'link'  => $proof, 'color' => '#ED1C24',
			'kpis'  => array( array( 'Leads', '686' ), array( 'CPL', '$5.31' ), array( 'CTR', '2.17%' ) ),
			'bars'  => array( 12, 20, 26, 35, 44, 52, 63, 74, 86, 100 ),
		),
		array(
			'brand' => 'Wellness Brand', 'stat' => '6.6', 'prefix' => '', 'suffix' => 'x',
			'text'  => 'ROAS: $9,766 turned into $64,455 in 20 days from a brand-new funnel',
			'link'  => $proof, 'color' => '#3A0A0C',
			'kpis'  => array( array( 'Spend', '$9,766' ), array( 'Revenue', '$64,455' ), array( 'ROAS', '6.6x' ) ),
			'bars'  => array( 20, 18, 30, 34, 42, 40, 58, 66, 80, 96 ),
		),
		array(
			'brand' => 'HVAC', 'stat' => '326', 'prefix' => '', 'suffix' => '',
			'text'  => 'Qualified HVAC leads in just 26 days at $4.68 CPL',
			'link'  => $proof, 'color' => '#ED1C24',
			'kpis'  => array( array( 'Leads', '326' ), array( 'CPL', '$4.68' ), array( 'Days', '26' ) ),
			'bars'  => array( 30, 26, 38, 44, 40, 55, 62, 60, 78, 92 ),
		),
		array(
			'brand' => 'Athleisure E-Com', 'stat' => '90597', 'prefix' => '$', 'suffix' => '',
			'text'  => 'Revenue from $14,967 in ad spend for a women\'s athleisure brand',
			'link'  => $proof, 'color' => '#3A0A0C',
			'kpis'  => array( array( 'Spend', '$14,967' ), array( 'Revenue', '$90,597' ), array( 'ROAS', '6.05x' ) ),
			'bars'  => array( 16, 24, 22, 36, 48, 46, 60, 72, 84, 100 ),
		),
	);
}

function mdm_shortcode_impact( $atts ) {
	$atts = shortcode_atts(
		array(
			'eyebrow'   => 'Growth · Impact · Speed',
			'title'     => 'The difference we make through our work',
			'badge'     => 'Backed by 250+ case studies',
			'link_text' => 'See the proof',
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
						<path fill="#FFC9C4" d="M50 2l8.6 17.4 18.4-6.4-3.6 19.1 19.1 3.6-12.2 15.3 12.2 15.3-19.1 3.6 3.6 19.1-18.4-6.4L50 98l-8.6-17.4-18.4 6.4 3.6-19.1-19.1-3.6L19.7 49 7.5 33.7l19.1-3.6L23 11l18.4 6.4z"/>
						<g fill="none" stroke="#7A0A10" stroke-width="4" stroke-linecap="round">
							<circle cx="41" cy="44" r="2.5" fill="#7A0A10" stroke="none"/>
							<circle cx="59" cy="44" r="2.5" fill="#7A0A10" stroke="none"/>
							<path d="M38 56c6 7 18 7 24 0"/>
						</g>
					</svg>
				</span>

				<?php foreach ( $cards as $i => $card ) :
					$color  = ! empty( $card['color'] ) ? $card['color'] : '#ED1C24';
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
	$bars = ! empty( $card['bars'] ) ? $card['bars'] : array( 28, 42, 35, 55, 48, 66, 60, 78, 72, 92 );
	$kpis = ! empty( $card['kpis'] ) ? $card['kpis'] : array();
	ob_start();
	?>
	<div class="mdm-mock" aria-hidden="true">
		<div class="mdm-mock__screen">
			<div class="mdm-mock__top"><b><?php echo esc_html( $card['brand'] ); ?></b><span>Ads Manager</span></div>
			<div class="mdm-mock__kpis">
				<?php foreach ( $kpis as $kpi ) : ?>
					<div><span><?php echo esc_html( $kpi[0] ); ?></span><b><?php echo esc_html( $kpi[1] ); ?></b></div>
				<?php endforeach; ?>
			</div>
			<div class="mdm-mock__chart">
				<?php foreach ( $bars as $k => $h ) : ?>
					<i style="--h:<?php echo (int) $h; ?>%;--k:<?php echo (int) $k; ?>"></i>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
