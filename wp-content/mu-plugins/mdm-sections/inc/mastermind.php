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

add_shortcode(
	'mdm_mastermind',
	static function () {
		ob_start();
		echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
		?>
		<div class="mdm-mm">
			<section class="mdm-mm__hero">
				<div class="mdm-mm__in">
					<span class="mdm-mm__pill"><i></i>Creative Mastermind</span>
					<h1 class="mdm-mm__h1">Discover How to Create <em>Facebook Ad Creatives</em> That Capture Attention, Trigger Buyer Intent &amp; Generate More Qualified Leads at Lower Costs.</h1>
					<div class="mdm-mm__video" role="img" aria-label="Video coming soon">
						<span class="mdm-mm__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="currentColor"/></svg></span>
					</div>
				</div>
			</section>

			<section class="mdm-mm__lessons" id="lessons">
				<div class="mdm-mm__in">
					<span class="mdm-niche__pill">What You'll Discover</span>
					<h2 class="mdm-mm__h2">Inside This Exclusive Creative Mastermind</h2>
					<ul class="mdm-mm__chips"><li>6 Core Lessons</li><li>Creative Strategy &amp; Buyer Psychology</li><li>Built for Service-Based Businesses</li></ul>
					<div class="mdm-mm__grid">
						<?php foreach ( mdm_mastermind_lessons() as $i => $l ) : ?>
							<article class="mdm-mm__card">
								<span class="mdm-mm__num">Lesson <?php echo esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>
								<h3><?php echo esc_html( $l[0] ); ?></h3>
								<p><?php echo esc_html( $l[1] ); ?></p>
							</article>
						<?php endforeach; ?>
					</div>
				</div>
			</section>
		</div>
		<?php
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
