<?php
/**
 * [mdm_footer] - Footer: short social links + logo on top, giant wordmark with a
 * bouncing dot, serif tagline, "based in" note with a live ticking clock,
 * then link columns, a "Stay in the loop" signup and big social rows that fill on hover.
 *
 * Put it in an Elementor Footer template (Shortcode widget):
 * [mdm_footer accent="#FF5A1F" city="New York" timezone="America/New_York"]
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_footer', 'mdm_shortcode_footer' );

function mdm_shortcode_footer( $atts ) {
	$atts = shortcode_atts(
		array(
			'accent'       => '#FF5A1F',
			'line1'        => 'Million Dollar',
			'line2'        => 'Media',
			'tagline_1'    => 'The Ad Creative',
			'tagline_2'    => 'Agency—',
			'based'        => 'We create ads for clients worldwide and work remotely.',
			'timezone'     => 'America/New_York',
			'tz_label'     => 'Timezone (EST)',
			'col1_links'   => 'Home:/|Services:/services/|Case Studies:/#case-studies|How it works:/#how-it-works|FAQ:/#faq|Contact:/book-your-call/',
			'col2_links'   => 'Privacy Policy:/privacy-policy/|Terms of Service:/terms-of-service/|Refund Policy:/refund-policy/|Book a Call:/book-your-call/',
			'loop_title'   => 'Stay in the loop',
			'loop_text'    => 'Winning hooks, ad breakdowns and case studies, straight to your inbox.',
			'loop_note'    => 'We respect your inbox. No spam, just valuable updates.',
			'loop_action'  => MDM_Sections::cta_url(),
			'email'        => 'hello@milliondollarmedia.us',
			'logo'         => function_exists( 'mdm_site_logo_url' ) ? mdm_site_logo_url() : '',
		),
		$atts,
		'mdm_footer'
	);

	$socials = array(
		array( 'WA', 'WhatsApp', MDM_Sections::whatsapp_url() ),
	);
	foreach ( mdm_socials() as $s ) {
		if ( 'WhatsApp' === $s[0] ) {
			continue;
		}
		$short     = array( 'Instagram' => 'IG', 'Facebook' => 'FB', 'YouTube' => 'YT', 'LinkedIn' => 'LI', 'X' => 'X', 'TikTok' => 'TT' );
		$socials[] = array( isset( $short[ $s[0] ] ) ? $short[ $s[0] ] : $s[0], $s[0], $s[1] );
	}
	$socials[] = array( 'EMAIL', 'Email', 'mailto:' . $atts['email'] );

	// Split the first word so its first "i" can carry the bouncing dot.
	$line1 = esc_html( $atts['line1'] );
	$pos   = stripos( $atts['line1'], 'i' );
	if ( false !== $pos ) {
		$line1 = esc_html( substr( $atts['line1'], 0, $pos ) )
			. '<span class="mdm-ft__i">ı<b class="mdm-ft__dot"></b></span>'
			. esc_html( substr( $atts['line1'], $pos + 1 ) );
	}

	$chev = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4l8 8-8 8" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="4 2.2"/></svg>';

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<footer class="mdm-footer" data-mdm-footer data-mdm-reveal style="--accent:<?php echo esc_attr( $atts['accent'] ); ?>">
		<div class="mdm-ft__top">
			<nav class="mdm-ft__short" aria-label="Social">
				<?php foreach ( $socials as $s ) : ?>
					<a href="<?php echo esc_url( $s[2] ); ?>" <?php echo 0 === strpos( $s[2], 'http' ) ? 'target="_blank" rel="noopener"' : ''; ?> aria-label="<?php echo esc_attr( $s[1] ); ?>"><span data-text="<?php echo esc_attr( $s[0] ); ?>"><?php echo esc_html( $s[0] ); ?></span></a>
				<?php endforeach; ?>
			</nav>
			<a class="mdm-ft__logo" href="<?php echo esc_url( home_url( '/' ) ); ?>">
				<?php if ( $atts['logo'] ) : ?>
					<img src="<?php echo esc_url( $atts['logo'] ); ?>" alt="Million Dollar Media">
				<?php else : ?>
					Million Dollar Media
				<?php endif; ?>
			</a>
			<a class="mdm-ft__totop" href="#top" data-mdm-top aria-label="Back to top"><i></i><i></i></a>
		</div>

		<div class="mdm-ft__hero">
			<div class="mdm-ft__brand">
				<h2 class="mdm-ft__word" aria-label="<?php echo esc_attr( $atts['line1'] . ' ' . $atts['line2'] ); ?>">
					<span class="mdm-ft__line" aria-hidden="true"><span class="mdm-ft__in"><?php echo $line1; // phpcs:ignore -- escaped above ?></span></span>
					<span class="mdm-ft__line mdm-ft__line--2" aria-hidden="true">
						<span class="mdm-ft__in"><?php echo esc_html( $atts['line2'] ); ?><sup>®</sup></span>
						<span class="mdm-ft__tag"><span><?php echo esc_html( $atts['tagline_1'] ); ?></span><span><?php echo esc_html( $atts['tagline_2'] ); ?></span></span>
					</span>
				</h2>
			</div>
			<div class="mdm-ft__based mdm-rise" style="--d:.5s">
				<p class="mdm-ft__note"><i></i><?php echo esc_html( $atts['based'] ); ?></p>
				<p class="mdm-ft__clock" data-tz="<?php echo esc_attr( $atts['timezone'] ); ?>">--:--:--</p>
				<p class="mdm-ft__tz"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><?php echo esc_html( $atts['tz_label'] ); ?></p>
			</div>
		</div>

		<div class="mdm-ft__grid">
			<div class="mdm-ft__links">
				<?php foreach ( array( $atts['col1_links'], $atts['col2_links'] ) as $col ) : ?>
					<ul>
						<?php foreach ( mdm_parse_links( $col ) as $l ) : ?>
							<li><a href="<?php echo esc_url( $l[1] ); ?>"><?php echo esc_html( $l[0] ); ?></a></li>
						<?php endforeach; ?>
					</ul>
				<?php endforeach; ?>
			</div>

			<div class="mdm-ft__loop">
				<h3><?php echo esc_html( $atts['loop_title'] ); ?></h3>
				<p class="mdm-ft__looptext"><?php echo esc_html( $atts['loop_text'] ); ?></p>
				<p class="mdm-ft__loopnote"><?php echo esc_html( $atts['loop_note'] ); ?></p>
				<form class="mdm-ft__form" action="<?php echo esc_url( $atts['loop_action'] ); ?>" method="get">
					<label class="screen-reader-text" for="mdm-ft-email">Your email</label>
					<input id="mdm-ft-email" type="email" name="email" placeholder="Your email" required autocomplete="email">
					<button type="submit" aria-label="Subscribe"><?php echo $chev; // phpcs:ignore ?></button>
				</form>
			</div>

			<div class="mdm-ft__rows">
				<?php foreach ( $socials as $s ) : ?>
					<a href="<?php echo esc_url( $s[2] ); ?>" <?php echo 0 === strpos( $s[2], 'http' ) ? 'target="_blank" rel="noopener"' : ''; ?>>
						<span><?php echo esc_html( $s[1] ); ?></span><?php echo $chev; // phpcs:ignore ?>
					</a>
				<?php endforeach; ?>
			</div>
		</div>

		<div class="mdm-ft__bottom">
			<span>© <?php echo esc_html( gmdate( 'Y' ) ); ?> Million Dollar Media</span>
			<span>All rights reserved.</span>
		</div>
	</footer>
	<?php
	return ob_get_clean();
}
