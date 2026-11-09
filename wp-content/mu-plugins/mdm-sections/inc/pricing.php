<?php
/**
 * [mdm_pricing] - The old "Special Launch Pricing" plans (Image / Video / GIF)
 * in the new style. Same WooCommerce products and checkout links, with a
 * working quantity selector.
 *
 * Change plans from code: add_filter( 'mdm_pricing_plans', function ( $plans ) { ... } );
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_pricing', 'mdm_shortcode_pricing' );

function mdm_default_pricing_plans() {
	return array(
		array(
			'name'     => 'Image',
			'unit'     => 'per image',
			'price'    => '14.97',
			'product'  => 343,
			'badge'    => '',
			'features' => array( 'Attention-grabbing visual elements', 'Custom designs that reflect your brand', 'Dedicated graphic designer', 'High-quality visuals for impact', 'Fast turnaround (24–48 hrs per image)' ),
		),
		array(
			'name'     => 'Video',
			'unit'     => 'per video',
			'price'    => '34.97',
			'product'  => 427,
			'badge'    => 'Most popular',
			'features' => array( '45–60 second videos', 'Royalty-free stock audio & video', 'Stock footage & custom B-roll', 'Lower-third titles and transitions', 'Dedicated video editor', 'Fast turnaround (24–48 hrs per video)' ),
		),
		array(
			'name'     => 'GIF',
			'unit'     => 'per GIF',
			'price'    => '24.97',
			'product'  => 432,
			'badge'    => '',
			'features' => array( 'Loop-perfect animations', 'Strategic messaging in seconds', 'Branded motion graphics', 'Perfect for retargeting & warm audiences', 'Fast turnaround (24–48 hrs per GIF)', 'Dedicated account manager' ),
		),
	);
}

function mdm_shortcode_pricing( $atts ) {
	$atts = shortcode_atts(
		array(
			'eyebrow'   => '🔥 Special launch pricing',
			'title'     => 'Pay per creative. Scale when it',
			'highlight' => 'works.',
			'subtitle'  => 'No retainers, no lock-ins. Order exactly what you need and get it back in 24–48 hours.',
			'checkout'  => home_url( '/checkout/' ),
			'points'    => 'Delivered in 24–48 hours|Half the cost of agencies|Fully done-for-you|Instant AI-led support|10+ years of experience|$100M+ in client results',
		),
		$atts,
		'mdm_pricing'
	);
	$plans  = apply_filters( 'mdm_pricing_plans', mdm_default_pricing_plans() );
	$points = MDM_Sections::split_list( $atts['points'] );
	$icons  = array( '⏱', '💸', '🤝', '🤖', '🏆', '📈' );

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-pricing" data-mdm-reveal data-mdm-pricing id="pricing">
		<div class="mdm-pricing__head">
			<span class="mdm-eyebrow mdm-eyebrow--plain mdm-rise" style="--d:0s"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
			<h2 class="mdm-display mdm-pricing__title">
				<?php echo MDM_Sections::split_words( $atts['title'] ); // phpcs:ignore ?>
				<span class="mdm-pill"><span class="mdm-pill__bg"></span><span class="mdm-pill__text"><?php echo esc_html( $atts['highlight'] ); ?></span></span>
			</h2>
			<p class="mdm-lead mdm-rise" style="--d:.5s"><?php echo esc_html( $atts['subtitle'] ); ?></p>
		</div>

		<div class="mdm-pricing__grid">
			<?php foreach ( $plans as $i => $p ) :
				$base = add_query_arg( array( 'add-to-cart' => (int) $p['product'] ), $atts['checkout'] );
				?>
				<article class="mdm-plan<?php echo $p['badge'] ? ' mdm-plan--hot' : ''; ?>" style="--i:<?php echo (int) $i; ?>" data-price="<?php echo esc_attr( $p['price'] ); ?>">
					<?php if ( $p['badge'] ) : ?><span class="mdm-plan__badge"><?php echo esc_html( $p['badge'] ); ?></span><?php endif; ?>
					<p class="mdm-plan__name"><?php echo esc_html( $p['name'] ); ?></p>
					<p class="mdm-plan__price"><sup>$</sup><span data-plan-total><?php echo esc_html( $p['price'] ); ?></span></p>
					<p class="mdm-plan__unit"><?php echo esc_html( $p['unit'] ); ?></p>
					<ul class="mdm-plan__list">
						<?php foreach ( $p['features'] as $f ) : ?><li><?php echo esc_html( $f ); ?></li><?php endforeach; ?>
					</ul>
					<div class="mdm-plan__buy">
						<div class="mdm-qty" role="group" aria-label="<?php echo esc_attr( 'Quantity, ' . $p['name'] ); ?>">
							<button type="button" data-qty="-1" aria-label="Fewer">−</button>
							<output data-qty-val>1</output>
							<button type="button" data-qty="1" aria-label="More">+</button>
						</div>
						<a class="mdm-plan__cta" data-base="<?php echo esc_url( $base ); ?>" href="<?php echo esc_url( add_query_arg( 'quantity', 1, $base ) ); ?>">
							Buy now <?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?>
						</a>
					</div>
				</article>
			<?php endforeach; ?>
		</div>

		<?php if ( $points ) : ?>
			<div class="mdm-marquee mdm-marquee--wide" aria-label="Why us">
				<div class="mdm-marquee__inner">
					<?php for ( $dup = 0; $dup < 2; $dup++ ) : foreach ( $points as $k => $p ) : ?>
						<span class="mdm-feature"<?php echo $dup ? ' aria-hidden="true"' : ''; ?>><i><?php echo esc_html( $icons[ $k % count( $icons ) ] ); ?></i><?php echo esc_html( $p ); ?></span>
					<?php endforeach; endfor; ?>
				</div>
			</div>
		<?php endif; ?>
	</section>
	<?php
	return ob_get_clean();
}
