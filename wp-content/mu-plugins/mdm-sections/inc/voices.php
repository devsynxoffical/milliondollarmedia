<?php
/**
 * [mdm_voices] - "Clients, in their own words." Video testimonials in a bento grid
 * (layout like funnelsthatprint.com), in the Million Dollar Media colours.
 * Tap a tile to play it with sound; one video plays at a time, with a progress bar.
 * Videos live in the media library (uploads/2026/11/mdm-testimonial-*.mp4).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_voices', 'mdm_shortcode_voices' );

function mdm_voices_tiles() {
	$v = static function ( $name ) {
		return MDM_Sections::upload_url( '2026/11/mdm-testimonial-' . $name );
	};
	return apply_filters(
		'mdm_voices',
		array(
			array( 'type' => 'video', 'area' => 'p1', 'video' => $v( 'portrait-1.mp4' ), 'poster' => $v( 'portrait-1.webp' ), 'name' => 'Coaching client', 'time' => '1:22' ),
			array( 'type' => 'video', 'area' => 'l1', 'video' => $v( 'landscape-1.mp4' ), 'poster' => $v( 'landscape-1.webp' ), 'name' => 'Marie Grace Berg', 'time' => '3:37' ),
			array( 'type' => 'stat', 'area' => 's1', 'k' => 'Coaching', 'b' => '$115K', 'p' => 'revenue from a lead form plus WhatsApp follow-up, 7.5x ROAS', 'tag' => '253 booked calls' ),
			array( 'type' => 'video', 'area' => 'p2', 'video' => $v( 'portrait-2.mp4' ), 'poster' => $v( 'portrait-2.webp' ), 'name' => 'Agency owner', 'time' => '1:56' ),
			array( 'type' => 'stat', 'area' => 's2', 'k' => 'Legal / MVA', 'b' => '19x', 'p' => 'ROAS on OTP-verified leads, $388K revenue in 30 days', 'tag' => '' ),
			array( 'type' => 'video', 'area' => 'sq', 'video' => $v( 'square-1.mp4' ), 'poster' => $v( 'square-1.webp' ), 'name' => 'Edgar & Jeremi', 'time' => '2:58' ),
			array( 'type' => 'video', 'area' => 'l2', 'video' => $v( 'landscape-2.mp4' ), 'poster' => $v( 'landscape-2.webp' ), 'name' => 'Consulting client', 'time' => '2:09' ),
			array( 'type' => 'video', 'area' => 'l3', 'video' => $v( 'landscape-3.mp4' ), 'poster' => $v( 'landscape-3.webp' ), 'name' => 'Launch review call', 'time' => '0:18' ),
			array( 'type' => 'cta', 'area' => 's3' ),
		)
	);
}

function mdm_shortcode_voices( $atts ) {
	$atts = shortcode_atts(
		array(
			'eyebrow' => 'Testimonials',
			'title'   => 'Clients, in their own words.',
			'text'    => 'Unedited clips from clients after launch. Tap any tile to play it with sound.',
		),
		$atts,
		'mdm_voices'
	);
	$play  = '<svg class="i1" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><svg class="i2" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>';
	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-cases mdm-voices" data-mdm-reveal id="testimonials">
		<div class="mdm-voices__head">
			<div>
				<span class="mdm-eyebrow mdm-eyebrow--plain mdm-rise" style="--d:0s"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
				<h2 class="mdm-display mdm-voices__title"><?php echo MDM_Sections::split_words( $atts['title'] ); // phpcs:ignore ?></h2>
			</div>
			<p class="mdm-lead mdm-rise" style="--d:.35s"><?php echo esc_html( $atts['text'] ); ?></p>
		</div>
		<div class="mdm-bento" data-mdm-voices>
			<?php foreach ( mdm_voices_tiles() as $i => $t ) : ?>
				<?php if ( 'video' === $t['type'] ) : ?>
					<div class="mdm-bt mdm-bt--v mdm-bt--<?php echo esc_attr( $t['area'] ); ?>" style="--i:<?php echo (int) $i; ?>" role="button" tabindex="0" aria-label="<?php echo esc_attr( 'Play testimonial: ' . $t['name'] ); ?>">
						<img class="mdm-bt__bg" src="<?php echo esc_url( $t['poster'] ); ?>" alt="" aria-hidden="true" loading="lazy">
						<video src="<?php echo esc_url( $t['video'] ); ?>" poster="<?php echo esc_url( $t['poster'] ); ?>" preload="none" playsinline class="skip-lazy" data-no-lazy="1"></video>
						<span class="mdm-bt__pb"><?php echo $play; // phpcs:ignore ?></span>
						<span class="mdm-bt__cap"><span><?php echo esc_html( $t['name'] ); ?></span><em><?php echo esc_html( $t['time'] ); ?></em></span>
						<i class="mdm-bt__vpr"></i>
					</div>
				<?php elseif ( 'stat' === $t['type'] ) : ?>
					<div class="mdm-bt mdm-bt--stat mdm-bt--<?php echo esc_attr( $t['area'] ); ?>" style="--i:<?php echo (int) $i; ?>">
						<span class="mdm-bt__k"><?php echo esc_html( $t['k'] ); ?></span>
						<?php if ( ! empty( $t['tag'] ) ) : ?><em class="mdm-bt__tag"><?php echo esc_html( $t['tag'] ); ?></em><?php endif; ?>
						<b><?php echo esc_html( $t['b'] ); ?></b>
						<p><?php echo esc_html( $t['p'] ); ?></p>
					</div>
				<?php else : ?>
					<a class="mdm-bt mdm-bt--cta mdm-bt--<?php echo esc_attr( $t['area'] ); ?>" style="--i:<?php echo (int) $i; ?>" href="<?php echo esc_url( MDM_Sections::cta_url() ); ?>">
						<span class="mdm-bt__k">Your turn</span>
						<b>Be the next clip.</b>
						<span class="mdm-bt__go">Book a call <i>↗</i></span>
					</a>
				<?php endif; ?>
			<?php endforeach; ?>
		</div>
		<script>
		(function () {
			var grid = document.currentScript && document.currentScript.previousElementSibling;
			if (!grid || grid.__mdmVoices) { return; }
			grid.__mdmVoices = true;
			var tiles = grid.querySelectorAll('.mdm-bt--v');
			function stop(t) { var v = t.querySelector('video'); v.pause(); t.classList.remove('is-playing'); }
			tiles.forEach(function (t) {
				var v = t.querySelector('video'), bar = t.querySelector('.mdm-bt__vpr');
				v.addEventListener('timeupdate', function () { if (v.duration) { bar.style.width = (v.currentTime / v.duration * 100) + '%'; } });
				v.addEventListener('ended', function () { t.classList.remove('is-playing'); bar.style.width = '0'; });
				function toggle() {
					if (t.classList.contains('is-playing')) { stop(t); return; }
					tiles.forEach(function (o) { if (o !== t) { stop(o); } });
					v.muted = false;
					var p = v.play(); if (p && p.catch) { p.catch(function () {}); }
					t.classList.add('is-playing');
				}
				t.addEventListener('click', toggle);
				t.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
			});
		})();
		</script>
	</section>
	<?php
	return ob_get_clean();
}

/*
 * Video testimonials on most pages too (just above the "live calls" strip and the footer).
 * Not on: the homepage (it has them already), cart / checkout, and funnel pages.
 */
function mdm_voices_everywhere_applies() {
	if ( is_admin() || is_front_page() || ! function_exists( 'mdm_site_footer_on' ) || ! mdm_site_footer_on() ) {
		return false;
	}
	if ( function_exists( 'mdm_is_shop_page' ) && mdm_is_shop_page() ) {
		return false;
	}
	$skip = apply_filters( 'mdm_voices_skip_pages', array( 'book-your-call', 'booking-confirmed', 'thank-you', 'upsell', 'downsell', 'provide-information', 'my-account' ) );
	if ( is_page( $skip ) || is_404() ) {
		return false;
	}
	return (bool) apply_filters( 'mdm_voices_everywhere', true );
}
add_action(
	'wp_footer',
	static function () {
		if ( mdm_voices_everywhere_applies() ) {
			echo '<div class="mdm-site-voices">' . do_shortcode( '[mdm_voices]' ) . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput
		}
	},
	-1 // before the live calls strip (0) and the footer (1)
);
