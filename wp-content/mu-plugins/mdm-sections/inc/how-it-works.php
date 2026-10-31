<?php
/**
 * [mdm_how_it_works] - "Four steps from brief to content that converts."
 * Four coloured tab cards (S/1 .. S/4), each with its own animated mini-widget.
 * Replaces the old How it Works (Pick Your Plan / Share Your Vision / Client-Booking Video).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_how_it_works', 'mdm_shortcode_how_it_works' );

function mdm_shortcode_how_it_works( $atts ) {
	$atts = shortcode_atts(
		array(
			'eyebrow'   => 'How it works',
			'title'     => 'Four steps from brief to content that',
			'highlight' => 'converts.',
			'video'     => MDM_Sections::upload_url( '2026/02/The_Precision_Pivot-1.mp4' ),
			'cta_text'  => 'Book a free call',
			'cta_url'   => MDM_Sections::cta_url(),
			's1_title'  => 'Pick your plan',
			's1_text'   => 'Choose the package that fits your goals, one client-booking video or a full-scale bundle designed to flood your calendar.',
			's2_title'  => 'Share your vision',
			's2_text'   => 'Complete a quick questionnaire so we tailor every script, shot and edit for your ideal audience using AI-enhanced systems and proven creative strategies.',
			's3_title'  => 'Client-booking video',
			's3_text'   => 'We handle strategy, scripting, production and delivery: futuristic, high-converting videos that turn attention into appointments while you focus on closing.',
			's4_title'  => 'Test, learn, scale',
			's4_text'   => 'We launch, test hooks and angles, and double down on the winners so every week books more calls.',
		),
		$atts,
		'mdm_how_it_works'
	);

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-how" data-mdm-reveal id="how-it-works">
		<div class="mdm-how__head">
			<span class="mdm-eyebrow mdm-eyebrow--plain mdm-rise" style="--d:0s"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
			<h2 class="mdm-display mdm-how__title mdm-blur-in">
				<?php echo MDM_Sections::split_words( $atts['title'] ); // phpcs:ignore ?>
				<span class="mdm-pill mdm-pill--glow"><span class="mdm-pill__bg"></span><span class="mdm-pill__text"><?php echo esc_html( $atts['highlight'] ); ?></span></span>
			</h2>
		</div>

		<div class="mdm-how__cards">
			<!-- S/1 -->
			<article class="mdm-step" style="--c:var(--mdm-yellow);--i:0">
				<span class="mdm-step__tab">S/1</span>
				<div class="mdm-step__card">
					<div class="mdm-step__widget mdm-checks">
						<div class="mdm-check is-done"><i></i><div><b>Client-booking video</b><span>Selected</span></div></div>
						<div class="mdm-check is-busy"><i></i><div><b>Content bundle</b><span>Most popular…</span></div></div>
						<div class="mdm-check"><i></i><div><b>Full-scale bundle</b><span>Flood your calendar</span></div></div>
					</div>
					<h3><?php echo esc_html( $atts['s1_title'] ); ?></h3>
					<p><?php echo esc_html( $atts['s1_text'] ); ?></p>
				</div>
			</article>

			<!-- S/2 -->
			<article class="mdm-step" style="--c:var(--mdm-blue);--i:1">
				<span class="mdm-step__tab">S/2</span>
				<div class="mdm-step__card">
					<div class="mdm-step__widget mdm-orbit" aria-hidden="true">
						<span class="mdm-orbit__ring mdm-orbit__ring--a">
							<i style="--a:0deg">🎯</i><i style="--a:120deg">✍️</i><i style="--a:240deg">🎬</i>
						</span>
						<span class="mdm-orbit__ring mdm-orbit__ring--b">
							<i style="--a:60deg">🤖</i><i style="--a:200deg">📈</i>
						</span>
						<span class="mdm-orbit__core">
							<svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" class="track"/><circle cx="22" cy="22" r="19" class="fill"/></svg>
							<b><span class="mdm-count" data-to="92">92</span>%</b>
						</span>
						<span class="mdm-orbit__name">Your brief <?php echo MDM_Sections::verified_icon(); // phpcs:ignore ?></span>
					</div>
					<h3><?php echo esc_html( $atts['s2_title'] ); ?></h3>
					<p><?php echo esc_html( $atts['s2_text'] ); ?></p>
				</div>
			</article>

			<!-- S/3 -->
			<article class="mdm-step" style="--c:var(--mdm-green);--i:2">
				<span class="mdm-step__tab">S/3</span>
				<div class="mdm-step__card">
					<div class="mdm-step__widget mdm-approve">
						<div class="mdm-approve__media">
							<video muted loop playsinline preload="none" data-src="<?php echo esc_url( $atts['video'] ); ?>"></video>
							<span class="mdm-approve__tag">Ok to live</span>
						</div>
						<span class="mdm-approve__chip">Delivered in 24–48h</span>
						<span class="mdm-approve__chip mdm-approve__chip--ok">✓ You approve</span>
					</div>
					<h3><?php echo esc_html( $atts['s3_title'] ); ?></h3>
					<p><?php echo esc_html( $atts['s3_text'] ); ?></p>
				</div>
			</article>

			<!-- S/4 -->
			<article class="mdm-step mdm-step--cta" style="--c:var(--mdm-orange);--i:3">
				<span class="mdm-step__tab">S/4</span>
				<div class="mdm-step__card">
					<div class="mdm-step__widget mdm-bars" aria-hidden="true">
						<?php
						$days = array( array( 'M', 38 ), array( 'T', 56 ), array( 'W', 34 ), array( 'T', 70 ), array( 'F', 100 ), array( 'S', 86 ), array( 'S', 92 ) );
						foreach ( $days as $k => $d ) :
							?>
							<span class="mdm-bars__col<?php echo 4 === $k ? ' is-peak' : ''; ?>" style="--h:<?php echo (int) $d[1]; ?>%;--k:<?php echo (int) $k; ?>">
								<?php if ( 4 === $k ) : ?><em>100</em><?php endif; ?>
								<i></i><small><?php echo esc_html( $d[0] ); ?></small>
							</span>
						<?php endforeach; ?>
					</div>
					<h3><?php echo esc_html( $atts['s4_title'] ); ?></h3>
					<p><?php echo esc_html( $atts['s4_text'] ); ?></p>
				</div>
				<a class="mdm-step__cta" href="<?php echo esc_url( $atts['cta_url'] ); ?>">
					<?php echo esc_html( $atts['cta_text'] ); ?>
					<span><?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?></span>
				</a>
			</article>
		</div>
	</section>
	<?php
	return ob_get_clean();
}
