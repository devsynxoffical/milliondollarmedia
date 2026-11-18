<?php
/**
 * [mdm_confirmed] - the /confirmedbooking/ page shown after someone books a strategy call:
 * confirmation hero, 3 steps before the call, what the call covers, proof while they wait,
 * and a reschedule / questions box. Not indexed, no floating "book a call" button.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_confirmed', 'mdm_shortcode_confirmed' );

function mdm_confirmed_slug() {
	return 'confirmedbooking';
}

function mdm_shortcode_confirmed( $atts ) {
	$atts = shortcode_atts(
		array(
			'email' => 'vaishali@milliondollarmedia.us',
		),
		$atts,
		'mdm_confirmed'
	);
	$steps = array(
		array( 'Accept your calendar invite', 'We have emailed your confirmation and calendar invite. Can’t find it? Check your spam or promotions folder, then accept the invite so the call is in your calendar.' ),
		array( 'Prepare three things', 'Your main offer and its price, your current monthly ad spend or budget, and your goal for the next 90 days. Have your website and ad account handy if you run ads.' ),
		array( 'Join on time from a laptop', 'Use the video call link in your invite and join from a quiet place on a laptop, so we can share our screen and walk you through real examples.' ),
	);
	$cover = array(
		'A quick review of your offer and current ads',
		'The case studies closest to your business',
		'The first videos and hooks we would test',
		'The plan and pricing that fits your budget',
		'Every question answered, with no pressure',
	);

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<div class="mdm-cb mdm-page">
		<section class="mdm-cb__hero">
			<div class="mdm-cb__in">
				<div class="mdm-cb__check" aria-hidden="true">
					<svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="none"/><path fill="none" d="M15 27l7 7 15-16"/></svg>
				</div>
				<span class="mdm-niche__pill">Call confirmed</span>
				<h1 class="mdm-cb__h1">You’re booked. <span>See you on the call.</span></h1>
				<p class="mdm-cb__lead">Your free strategy call with Million Dollar Media is confirmed. We have sent the details and your calendar invite to your email.</p>
				<ul class="mdm-cb__chips">
					<li><i aria-hidden="true">✉</i>Invite sent to your email</li>
					<li><i aria-hidden="true">▶</i>Video call link included</li>
					<li><i aria-hidden="true">✓</i>100% free, no obligation</li>
				</ul>
			</div>
		</section>

		<section class="mdm-cb__sec">
			<div class="mdm-cb__in">
				<div class="mdm-cb__head">
					<span class="mdm-niche__pill">Before your call</span>
					<h2 class="mdm-cb__h2">3 quick steps to get the most out of it</h2>
				</div>
				<ol class="mdm-cb__steps">
					<?php foreach ( $steps as $i => $s ) : ?>
						<li><span class="mdm-cb__num"><?php echo (int) ( $i + 1 ); ?></span><h3><?php echo esc_html( $s[0] ); ?></h3><p><?php echo esc_html( $s[1] ); ?></p></li>
					<?php endforeach; ?>
				</ol>
			</div>
		</section>

		<section class="mdm-cb__sec mdm-cb__sec--alt">
			<div class="mdm-cb__in mdm-cb__split">
				<div>
					<span class="mdm-niche__pill">On the call</span>
					<h2 class="mdm-cb__h2">What we will cover together</h2>
					<p class="mdm-cb__p">A focused, practical session. You leave with a clear plan, whether or not you decide to work with us.</p>
				</div>
				<ul class="mdm-cb__cover">
					<?php foreach ( $cover as $c ) : ?><li><?php echo esc_html( $c ); ?></li><?php endforeach; ?>
				</ul>
			</div>
		</section>

		<div class="mdm-cb__proof">
			<?php
			if ( function_exists( 'mdm_shortcode_case_studies' ) ) {
				echo mdm_shortcode_case_studies( // phpcs:ignore WordPress.Security.EscapeOutput
					array(
						'cat'      => 'all',
						'limit'    => '4',
						'eyebrow'  => 'While you wait',
						'title'    => 'Results from businesses like yours',
						'badge'    => '',
						'subtitle' => 'Tap any card to see the proof video or dashboard. We will show you the ones closest to your business on the call.',
						'cta_text' => 'View all case studies',
						'cta_url'  => home_url( '/case-studies/' ),
					)
				);
			}
			?>
		</div>

		<section class="mdm-cb__sec">
			<div class="mdm-cb__in">
				<div class="mdm-cb__help">
					<div>
						<h2 class="mdm-cb__h2">Need to reschedule or have a question?</h2>
						<p>No problem. Message us on WhatsApp or email us and we will sort it out quickly.</p>
					</div>
					<div class="mdm-cb__helpbtns">
						<a class="mdm-ihero__btn is-red" href="<?php echo esc_url( MDM_Sections::whatsapp_url() ); ?>" target="_blank" rel="noopener">Message us on WhatsApp</a>
						<a class="mdm-ihero__btn mdm-cb__mail" href="<?php echo esc_url( 'mailto:' . $atts['email'] ); ?>"><?php echo esc_html( $atts['email'] ); ?></a>
					</div>
				</div>
			</div>
		</section>
	</div>
	<?php
	return ob_get_clean();
}

// Thank-you page: keep it out of Google and the sitemap.
add_filter(
	'rank_math/frontend/robots',
	static function ( $robots ) {
		if ( is_page( mdm_confirmed_slug() ) ) {
			$robots['index']  = 'noindex';
			$robots['follow'] = 'nofollow';
		}
		return $robots;
	},
	25
);
add_filter(
	'rank_math/sitemap/posts_to_exclude',
	static function ( $ids ) {
		$p = get_page_by_path( mdm_confirmed_slug() );
		return $p ? array_merge( (array) $ids, array( (int) $p->ID ) ) : $ids;
	},
	25
);
add_filter( 'astra_the_title_enabled', static function ( $on ) { return is_page( mdm_confirmed_slug() ) ? false : $on; }, 25 );
add_filter( 'mdm_floating_cta', static function ( $on ) { return is_page( mdm_confirmed_slug() ) ? false : $on; } );
