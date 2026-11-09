<?php
/**
 * [mdm_services] - "What we make": the old "Next-Gen Videos" + service list
 * (YouTube, Short Form, Podcast, Ad Creatives & VSLs) and the selling points
 * of the old "Trusted by Titans" block, in the new style.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_services', 'mdm_shortcode_services' );

function mdm_shortcode_services( $atts ) {
	$atts = shortcode_atts(
		array(
			'eyebrow'   => 'What we make',
			'title'     => 'Next-gen videos that drive high-ticket clients',
			'highlight' => 'fast.',
			'subtitle'  => 'High-converting, AI-powered videos that fill your calendar with high-ticket clients at half the cost and double the speed.',
			'cta_text'  => 'Get videos like these',
			'cta_url'   => MDM_Sections::cta_url(),
			'points'    => 'Delivered in 24–48 hours|Half the cost of agencies|Fully done-for-you|Instant AI-led support|10+ years of experience|$100M+ in client results|Creatives that convert premium clients',
		),
		$atts,
		'mdm_services'
	);

	$services = apply_filters(
		'mdm_services_items',
		array(
			array( 'YouTube Videos', 'Videos that hook, hold and convert. More watch time, more subscribers, more clients.', '▶', 'var(--mdm-cream)', array( 'Long-form', 'Thumbnails', 'Retention edits' ) ),
			array( 'Short Form Videos', 'Reels, TikToks and Shorts that stop thumbs and start conversations with your ideal clients.', '⚡', 'var(--mdm-blush)', array( 'Reels', 'TikTok', 'Shorts' ) ),
			array( 'Podcast Editing', 'Polished podcasts with crystal-clear sound and irresistible flow that attract a loyal, paying audience.', '🎙', 'var(--mdm-sand)', array( 'Audio clean-up', 'Clips', 'Video podcast' ) ),
			array( 'Ad Creatives & VSLs', 'High-converting ads and VSLs designed to grab attention, drive action and generate revenue.', '🎯', 'var(--mdm-red)', array( 'VSLs', 'UGC', 'AI videos', 'GIF & image ads' ) ),
		)
	);
	$points = MDM_Sections::split_list( $atts['points'] );
	$icons  = array( '⏱', '💸', '🤝', '🤖', '🏆', '📈', '💎' );

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-services" data-mdm-reveal id="services">
		<div class="mdm-services__head">
			<span class="mdm-eyebrow mdm-eyebrow--plain mdm-rise" style="--d:0s"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
			<h2 class="mdm-display mdm-services__title">
				<?php echo MDM_Sections::split_words( $atts['title'] ); // phpcs:ignore ?>
				<span class="mdm-pill"><span class="mdm-pill__bg"></span><span class="mdm-pill__text"><?php echo esc_html( $atts['highlight'] ); ?></span></span>
			</h2>
			<p class="mdm-lead mdm-rise" style="--d:.5s"><?php echo esc_html( $atts['subtitle'] ); ?></p>
		</div>

		<div class="mdm-services__grid">
			<?php foreach ( $services as $i => $s ) : ?>
				<article class="mdm-svc<?php echo 'var(--mdm-red)' === $s[3] ? ' mdm-svc--dark' : ''; ?>" style="--c:<?php echo esc_attr( $s[3] ); ?>;--i:<?php echo (int) $i; ?>">
					<span class="mdm-svc__num"><?php echo esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>
					<span class="mdm-svc__icon" aria-hidden="true"><?php echo esc_html( $s[2] ); ?></span>
					<h3><?php echo esc_html( $s[0] ); ?></h3>
					<p><?php echo esc_html( $s[1] ); ?></p>
					<div class="mdm-svc__chips">
						<?php foreach ( $s[4] as $chip ) : ?><span><?php echo esc_html( $chip ); ?></span><?php endforeach; ?>
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

		<div class="mdm-services__cta mdm-rise"><?php echo MDM_Sections::button( $atts['cta_text'], $atts['cta_url'] ); // phpcs:ignore ?></div>
	</section>
	<?php
	return ob_get_clean();
}
