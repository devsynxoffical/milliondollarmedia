<?php
/**
 * [mdm_numbers] - "Real growth. Real brands. Real results." + "By the numbers" card.
 *
 * [mdm_numbers image="https://.../photo.jpg" video="https://.../loop.mp4"]
 * (image OR video for the left card; the video wins when both are set)
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_numbers', 'mdm_shortcode_numbers' );

function mdm_shortcode_numbers( $atts ) {
	$atts = shortcode_atts(
		array(
			'headline'  => 'Real growth.|Real brands.|Real results.',
			'image'     => '',
			'video'     => MDM_Sections::upload_url( '2026/07/million_dollar_header_video_v1-1080p.mp4' ),
			'eyebrow'   => 'By the numbers',
			'big'       => '100',
			'big_before'=> '$',
			'big_after' => 'M+',
			'big_text'  => 'Revenue generated for our clients.',
			'features'  => 'Weekly performance reports|You approve every video|Delivered in 24–48 hours|Revisions included|Hook testing included|Performance-based creative|Dedicated strategist|AI-enhanced editing',
		),
		$atts,
		'mdm_numbers'
	);

	$rows = apply_filters(
		'mdm_numbers_rows',
		array(
			array( 'value' => '50', 'before' => '$', 'after' => 'M+', 'color' => 'var(--mdm-red)', 'text' => 'Spent on ads. Every niche, every platform.' ),
			array( 'value' => '13630', 'before' => '', 'after' => '+', 'color' => 'var(--mdm-ink)', 'text' => 'Offers converted through funnels we built.' ),
			array( 'value' => '250', 'before' => '', 'after' => '+', 'color' => 'var(--mdm-red)', 'text' => 'Case studies across lead gen and e-commerce.' ),
		)
	);

	$features = MDM_Sections::split_list( $atts['features'] );
	$icons    = array( '📊', '✅', '🚀', '🔁', '🎯', '⚡', '🧠', '🤖' );

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-numbers" data-mdm-reveal>
		<div class="mdm-numbers__grid">
			<div class="mdm-numbers__media mdm-rise" style="--d:0s">
				<?php if ( $atts['video'] ) : ?>
					<video muted loop playsinline autoplay preload="none" data-src="<?php echo esc_url( $atts['video'] ); ?>" <?php echo $atts['image'] ? 'poster="' . esc_url( $atts['image'] ) . '"' : ''; ?>></video>
				<?php elseif ( $atts['image'] ) : ?>
					<img src="<?php echo esc_url( $atts['image'] ); ?>" alt="" loading="lazy">
				<?php endif; ?>
				<span class="mdm-numbers__shade" aria-hidden="true"></span>
				<h2 class="mdm-numbers__headline">
					<?php foreach ( MDM_Sections::split_list( $atts['headline'] ) as $k => $line ) : ?>
						<span class="mdm-word" style="--w:<?php echo (int) $k * 2; ?>"><span class="mdm-word__in"><?php echo esc_html( $line ); ?></span></span>
					<?php endforeach; ?>
				</h2>
			</div>

			<div class="mdm-numbers__card mdm-rise" style="--d:.15s">
				<span class="mdm-eyebrow mdm-eyebrow--plain"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
				<p class="mdm-numbers__big"><?php echo esc_html( $atts['big_before'] ); ?><span class="mdm-count" data-to="<?php echo esc_attr( $atts['big'] ); ?>"><?php echo esc_html( number_format( (float) $atts['big'] ) ); ?></span><em style="color:var(--mdm-red)"><?php echo esc_html( $atts['big_after'] ); ?></em></p>
				<p class="mdm-numbers__bigtext"><?php echo esc_html( $atts['big_text'] ); ?></p>
				<div class="mdm-numbers__rows">
					<?php foreach ( $rows as $row ) :
						$dec = strlen( substr( (string) strrchr( $row['value'], '.' ), 1 ) );
						?>
						<div class="mdm-numbers__row">
							<p class="mdm-numbers__val"><?php echo esc_html( $row['before'] ); ?><span class="mdm-count" data-to="<?php echo esc_attr( $row['value'] ); ?>"><?php echo esc_html( number_format( (float) $row['value'], $dec ) ); ?></span><em style="color:<?php echo esc_attr( $row['color'] ); ?>"><?php echo esc_html( $row['after'] ); ?></em></p>
							<p class="mdm-numbers__txt"><?php echo esc_html( $row['text'] ); ?></p>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<?php if ( $features ) : ?>
			<div class="mdm-marquee mdm-marquee--wide" aria-label="What's included">
				<div class="mdm-marquee__inner">
					<?php for ( $dup = 0; $dup < 2; $dup++ ) : foreach ( $features as $k => $f ) : ?>
						<span class="mdm-feature"<?php echo $dup ? ' aria-hidden="true"' : ''; ?>><i><?php echo esc_html( $icons[ $k % count( $icons ) ] ); ?></i><?php echo esc_html( $f ); ?></span>
					<?php endforeach; endfor; ?>
				</div>
			</div>
		<?php endif; ?>
	</section>
	<?php
	return ob_get_clean();
}
