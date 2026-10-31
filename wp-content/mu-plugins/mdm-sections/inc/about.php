<?php
/**
 * [mdm_about] - Dark "About" block with a halftone photo banner, three pillars,
 * big stats and a moving blue light at the bottom.
 *
 * [mdm_about image="https://.../founder.jpg" button_url="/about/"]
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_about', 'mdm_shortcode_about' );

function mdm_shortcode_about( $atts ) {
	$atts = shortcode_atts(
		array(
			'image'       => MDM_Sections::upload_url( '2025/10/RKJI0017.png' ),
			'face_y'      => '25%', // vertical focus of the banner photo (0% top - 100% bottom)
			'title'       => 'About Million Dollar Media',
			'text'        => 'A done-for-you creative and media buying team helping agencies, coaches, local service and e-commerce brands turn ads into booked calls and revenue.',
			'button_text' => 'Our story',
			'button_url'  => MDM_Sections::cta_url(),
			'p1'          => 'Built and scaled funnels across roofing, HVAC, mortgage, remodeling, coaching and e-commerce.',
			'p2'          => 'Creative that sells: VSLs, UGC, AI videos and short-form, tested and iterated every week.',
			'p3'          => 'Two Comma Club winners, ClickFunnels award recipients and a team obsessed with tracking.',
			'stat1'       => '10|+|Years in the game',
			'stat2'       => '24||–48h|Turnaround per creative',
			'stat3'       => '100||%|Done-for-you',
		),
		$atts,
		'mdm_about'
	);

	// stat format: "value|after|label" or "value|before|after|label"
	$stats = array();
	foreach ( array( $atts['stat1'], $atts['stat2'], $atts['stat3'] ) as $raw ) {
		$p = explode( '|', $raw );
		if ( 4 === count( $p ) ) {
			$stats[] = array( 'value' => $p[0], 'before' => $p[1], 'after' => $p[2], 'label' => $p[3] );
		} elseif ( 3 === count( $p ) ) {
			$stats[] = array( 'value' => $p[0], 'before' => '', 'after' => $p[1], 'label' => $p[2] );
		}
	}

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-about" data-mdm-reveal>
		<?php if ( $atts['image'] ) : ?>
			<div class="mdm-about__photo">
				<img src="<?php echo esc_url( $atts['image'] ); ?>" alt="<?php echo esc_attr( $atts['title'] ); ?>" loading="lazy" style="object-position:50% <?php echo esc_attr( $atts['face_y'] ); ?>">
				<span class="mdm-about__dots" aria-hidden="true"></span>
			</div>
		<?php endif; ?>
		<div class="mdm-about__glow" aria-hidden="true"><i></i><i></i><i></i></div>

		<div class="mdm-about__inner">
			<div class="mdm-about__top">
				<div>
					<h2 class="mdm-about__title"><?php echo MDM_Sections::split_words( $atts['title'] ); // phpcs:ignore ?></h2>
					<p class="mdm-about__text mdm-rise" style="--d:.3s"><?php echo esc_html( $atts['text'] ); ?></p>
					<a class="mdm-about__btn mdm-rise" style="--d:.4s" href="<?php echo esc_url( $atts['button_url'] ); ?>"><?php echo esc_html( $atts['button_text'] ); ?> <?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?></a>
				</div>
			</div>

			<div class="mdm-about__cols">
				<?php foreach ( array( $atts['p1'], $atts['p2'], $atts['p3'] ) as $k => $p ) :
					$s = isset( $stats[ $k ] ) ? $stats[ $k ] : null;
					?>
					<div class="mdm-about__col" style="--k:<?php echo (int) $k; ?>">
						<span class="mdm-about__line"></span>
						<p class="mdm-about__pillar"><?php echo esc_html( $p ); ?></p>
						<?php if ( $s ) : ?>
							<p class="mdm-about__num"><?php echo esc_html( $s['before'] ); ?><span class="mdm-count" data-to="<?php echo esc_attr( $s['value'] ); ?>"><?php echo esc_html( $s['value'] ); ?></span><?php echo esc_html( $s['after'] ); ?></p>
							<p class="mdm-about__label"><?php echo esc_html( $s['label'] ); ?></p>
						<?php endif; ?>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}
