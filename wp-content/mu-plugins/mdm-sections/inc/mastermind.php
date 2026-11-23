<?php
/**
 * /facebook-ad-creatives-mastermind/ : Creative Mastermind landing page.
 * Elementor page made of: [mdm_mastermind] (tagline, video placeholder, lessons), the home page's
 * creator carousel, "Trusted by" logos and ribbons (copied Elementor sections), [mdm_voices],
 * [mdm_impact_cards], [mdm_faq] and [mdm_leadform_block]. Footer and calls strip are site-wide.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_mastermind_slug() {
	return 'facebook-ad-creatives-mastermind';
}

function mdm_mastermind_lessons() {
	return array(
		array( 'The Psychology Behind High-Converting Creatives', 'Understand how potential customers think, what captures their attention, and what motivates them to take action.' ),
		array( 'Creative Ideation & Angles', 'Discover how to develop winning creative concepts, unique ad angles, and messaging that makes your ads stand out.' ),
		array( 'Messaging That Connects', 'Learn how to craft compelling hooks, headlines, and ad messaging that resonate with your ideal customers and attract qualified leads.' ),
		array( 'Buyer Psychology & Emotional Triggers', 'Understand customer pain points, buying motivations, and psychological triggers that influence purchasing decisions.' ),
		array( 'Creative Frameworks & Ad Structures', 'Explore how to structure video ads, static creatives, and different ad formats to capture attention, build trust, and generate qualified inquiries.' ),
		array( 'Creative Optimization & Cost Reduction', 'Learn how to identify creative performance gaps, improve messaging, test new concepts, and lower your cost per qualified lead through smarter creative strategies.' ),
	);
}

/** Creators shown as small avatars in the hero (all appear in the client carousel on this page and the home page). */
function mdm_mastermind_avatars() {
	$u = content_url( '/' );
	return array(
		array( content_url( '/mu-plugins/mdm-sections/img/clients/marcus-filly.jpg' ), 'Marcus Filly' ),
		array( $u . 'uploads/2026/07/1663106313718.webp', 'Tim Burd' ),
		array( $u . 'uploads/2026/06/c14.webp', 'Travis Stephenson' ),
		array( $u . 'uploads/2026/06/c13.webp', 'Dr. Amy' ),
		array( $u . 'uploads/2026/06/c12.webp', 'Pierce Grimes' ),
	);
}

/*
 * [mdm_mastermind part="hero|lessons|creators"]
 *   hero     : tagline H1, short intro, buttons, creator avatars and the video frame (dark)
 *   lessons  : the 6 lessons (light), with a call to action
 *   creators : heading for the creator carousel that follows it
 * No part = hero + lessons (old behaviour).
 */
add_shortcode(
	'mdm_mastermind',
	static function ( $atts ) {
		$atts = shortcode_atts( array( 'part' => '' ), $atts, 'mdm_mastermind' );
		$part = $atts['part'];
		ob_start();
		echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
		echo '<div class="mdm-mm">';
		if ( '' === $part || 'hero' === $part ) :
			?>
			<section class="mdm-mmx-hero">
				<div class="mdm-mmx-hero__glow" aria-hidden="true"></div>
				<div class="mdm-mm__in mdm-mmx-hero__grid">
					<div class="mdm-mmx-hero__text">
						<span class="mdm-mmx-pill"><i></i>Creative Mastermind<b>6 lessons</b></span>
						<h1 class="mdm-mmx-h1">Discover How to Create <em>Facebook Ad Creatives</em> That Capture Attention, Trigger Buyer Intent &amp; Generate More Qualified Leads at Lower Costs.</h1>
						<p class="mdm-mmx-lead">Six core lessons on creative strategy and buyer psychology, built for service-based businesses that want better leads from the same ad budget.</p>
						<div class="mdm-mmx-btns">
							<a class="mdm-mmx-btn is-red" href="#free-plan">Get a free video ad plan <span aria-hidden="true">&rarr;</span></a>
							<a class="mdm-mmx-btn" href="#lessons">See the 6 lessons</a>
						</div>
						<div class="mdm-mmx-proof">
							<span class="mdm-mmx-avatars"><?php foreach ( mdm_mastermind_avatars() as $a ) : ?><img src="<?php echo esc_url( $a[0] ); ?>" alt="<?php echo esc_attr( $a[1] ); ?>" width="40" height="40" decoding="async"><?php endforeach; ?></span>
							<span>Ad creative for coaches, agencies and brands<br><b>247 published case studies</b></span>
						</div>
					</div>
					<div class="mdm-mmx-hero__art" aria-hidden="true">
						<span class="mdm-mmx-ring"></span>
						<img class="mdm-mmx-person" src="<?php echo esc_url( content_url( '/uploads/2025/10/RKJI0017-2-784x1024.webp' ) ); ?>" alt="" width="784" height="1024" fetchpriority="high" decoding="async">
						<div class="mdm-mmx-adcard">
							<div class="mdm-mmx-adcard__top"><img src="<?php echo esc_url( content_url( '/uploads/2025/05/MillionDollar-Media-icon-only-100x100.png' ) ); ?>" alt="" width="30" height="30"><span><b>Your Brand</b><small>Sponsored</small></span></div>
							<div class="mdm-mmx-adcard__img"><img src="<?php echo esc_url( content_url( '/mu-plugins/mdm-sections/img/industry/coach-1.webp' ) ); ?>" alt="" width="720" height="900" decoding="async"><span class="mdm-mmx-adcard__hook">Struggling to get qualified leads?</span></div>
							<div class="mdm-mmx-adcard__foot"><span>Book a free call</span><em>Learn more</em></div>
						</div>
						<span class="mdm-mmx-chip is-a">Hook</span>
						<span class="mdm-mmx-chip is-b">Angle</span>
						<span class="mdm-mmx-chip is-c">Offer</span>
					</div>
				</div>
				<div class="mdm-mm__in">
					<div class="mdm-mmx-stage">
						<div class="mdm-mmx-player" role="img" aria-label="Creative Mastermind video, coming soon">
							<div class="mdm-mmx-player__bar"><i></i><i></i><i></i><span>Creative Mastermind &middot; Lesson preview</span></div>
							<div class="mdm-mmx-player__screen">
								<span class="mdm-mmx-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="currentColor"/></svg></span>
								<span class="mdm-mmx-soon">Video coming soon</span>
							</div>
							<div class="mdm-mmx-player__ctrl" aria-hidden="true"><span class="mdm-mmx-player__track"><i></i></span><span>00:00</span></div>
						</div>
					</div>
				</div>
			</section>
			<?php
		endif;
		if ( '' === $part || 'lessons' === $part ) :
			?>
			<section class="mdm-mmx-lessons" id="lessons">
				<div class="mdm-mm__in">
					<div class="mdm-mmx-lessons__head">
						<span class="mdm-niche__pill">What You'll Discover</span>
						<h2 class="mdm-mmx-h2">Inside This Exclusive Creative Mastermind</h2>
						<ul class="mdm-mm__chips"><li>6 Core Lessons</li><li>Creative Strategy &amp; Buyer Psychology</li><li>Built for Service-Based Businesses</li></ul>
					</div>
					<?php
					$lessons = mdm_mastermind_lessons();
					$img     = content_url( '/mu-plugins/mdm-sections/img/industry/' );
					$rows    = array(
						array( 'Part 1', 'Psychology &amp; creative angles', array( 0, 1 ), array( 'coach-1.webp', 'agency-4.webp' ), 'Hook in the first 3 seconds' ),
						array( 'Part 2', 'Messaging that brings buyers, not browsers', array( 2, 3 ), array( 'hvac-2.webp', 'realestate-1.webp' ), 'Speak to one buyer' ),
						array( 'Part 3', 'Frameworks, testing &amp; lower costs', array( 4, 5 ), array( 'agency-2.webp', 'saas-3.webp' ), 'Test, keep winners, cut costs' ),
					);
					foreach ( $rows as $r ) :
						?>
						<div class="mdm-mmx-row">
							<div class="mdm-mmx-row__text">
								<span class="mdm-mmx-row__k"><?php echo esc_html( $r[0] ); ?></span>
								<h3 class="mdm-mmx-row__h"><?php echo $r[1]; // phpcs:ignore ?></h3>
								<?php foreach ( $r[2] as $i ) : ?>
									<div class="mdm-mmx-item">
										<span class="mdm-mmx-item__n"><?php echo esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>
										<div>
											<span class="mdm-mmx-item__k">Lesson <?php echo (int) ( $i + 1 ); ?></span>
											<h4><?php echo esc_html( $lessons[ $i ][0] ); ?></h4>
											<p><?php echo esc_html( $lessons[ $i ][1] ); ?></p>
										</div>
									</div>
								<?php endforeach; ?>
							</div>
							<div class="mdm-mmx-row__art" aria-hidden="true">
								<img class="is-main" src="<?php echo esc_url( $img . $r[3][0] ); ?>" alt="" width="720" height="900" loading="lazy" decoding="async">
								<img class="is-side" src="<?php echo esc_url( $img . $r[3][1] ); ?>" alt="" width="720" height="900" loading="lazy" decoding="async">
								<span class="mdm-mmx-row__chip"><?php echo esc_html( $r[4] ); ?></span>
							</div>
						</div>
					<?php endforeach; ?>
					<div class="mdm-mmx-cta">
						<div><b>Want these lessons applied to your own ads?</b><p>Tell us about your offer and we will send a short plan: the hooks and video formats we would test first.</p></div>
						<a class="mdm-mmx-btn is-red" href="#free-plan">Get a free video ad plan <span aria-hidden="true">&rarr;</span></a>
					</div>
				</div>
			</section>
			<?php
		endif;
		if ( 'creators' === $part ) :
			?>
			<section class="mdm-mmx-creators">
				<div class="mdm-mm__in">
					<span class="mdm-niche__pill">Happy customers</span>
					<h2 class="mdm-mmx-h2">Creators &amp; brands we make ads for</h2>
				</div>
			</section>
			<?php
		endif;
		echo '</div>';
		return ob_get_clean();
	}
);

// The "Get a free video ad plan" form as a block for Elementor pages.
add_shortcode(
	'mdm_leadform_block',
	static function () {
		return function_exists( 'mdm_leadform_html' ) ? mdm_leadform_html( 'creative-mastermind' ) : '';
	}
);

add_filter( 'astra_the_title_enabled', static function ( $on ) { return is_page( mdm_mastermind_slug() ) ? false : $on; }, 30 );
// Testimonials are placed in the page itself, so not again above the footer.
add_filter( 'mdm_voices_skip_pages', static function ( $p ) { $p[] = mdm_mastermind_slug(); return $p; } );

// Light theme for the whole page (styles scoped to body.mdm-mm-page).
add_filter( 'body_class', static function ( $c ) { if ( is_page( mdm_mastermind_slug() ) ) { $c[] = 'mdm-mm-page'; } return $c; } );
