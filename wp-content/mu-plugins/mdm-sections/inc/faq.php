<?php
/**
 * [mdm_faq] - FAQ as a chat: question list (search + filters) on the left,
 * an "assistant" that types the answer on the right, follow-up suggestions,
 * and an "Ask your own question" box that finds the closest answer.
 *
 * Edit questions from code:
 * add_filter( 'mdm_faq_items', function ( $items ) { ... return $items; } );
 * Each item: q, a, cat (must match a key in mdm_faq_categories), tags (array).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_faq', 'mdm_shortcode_faq' );

function mdm_default_faq_items() {
	return array(
		array( 'cat' => 'services', 'q' => 'What does Million Dollar Media actually do?', 'a' => 'We build and run your whole client-acquisition engine: scroll-stopping ad creative (VSLs, UGC, AI videos, short-form, statics and GIFs), Meta ad campaigns, landing pages and funnels, plus the follow-up that turns leads into booked calls.', 'tags' => array( 'Creative', 'Meta Ads', 'Funnels' ) ),
		array( 'cat' => 'services', 'q' => 'What kind of videos do you create?', 'a' => 'Client-booking VSLs, UGC-style testimonials, AI avatar and AI b-roll videos, short-form reels for Instagram, Facebook, TikTok and YouTube Shorts, plus image and GIF ad variations so we can test many hooks fast.', 'tags' => array( 'VSLs', 'UGC', 'AI Videos' ) ),
		array( 'cat' => 'services', 'q' => 'Which industries do you work with?', 'a' => 'Lead gen businesses like roofing, HVAC, mortgage, remodeling, recruitment and agencies, plus e-commerce, coaching, info products and events. Our case studies cover all of them, so we start from what already works in your niche.', 'tags' => array( 'Lead gen', 'E-com' ) ),
		array( 'cat' => 'services', 'q' => 'Do you also run the ads or only make the creative?', 'a' => 'Both. You can take creative only, or let us run the media buying too. Creative is about 80% of the result in 2026, so most clients want both under one roof for faster testing.', 'tags' => array( 'Media buying', 'Creative' ) ),
		array( 'cat' => 'process', 'q' => 'How does the process work?', 'a' => 'Four steps: pick your plan, fill in a short questionnaire about your offer and audience, we script, produce and deliver your videos for approval, then we launch, test hooks and scale the winners.', 'tags' => array( 'Onboarding', '4 steps' ) ),
		array( 'cat' => 'process', 'q' => 'How fast is the first content ready?', 'a' => 'Your first content is usually live within 7 days of finishing the questionnaire. Larger bundles roll out in weekly batches so there is always fresh creative to test.', 'tags' => array( '7 days', 'Speed' ) ),
		array( 'cat' => 'process', 'q' => 'Do I get to approve everything?', 'a' => 'Yes. Nothing goes live without your approval, and revisions are included until the video is right.', 'tags' => array( 'Approval', 'Revisions' ) ),
		array( 'cat' => 'process', 'q' => 'Do I need to be on camera?', 'a' => 'No. We can use UGC creators, AI avatars or voice-over with b-roll. If you like being on camera, we will script you and edit the footage you record on your phone.', 'tags' => array( 'UGC', 'AI avatars' ) ),
		array( 'cat' => 'results', 'q' => 'What results can I expect?', 'a' => 'It depends on offer, market and budget, but our case studies include 686 roofing leads in 8 days at $5.31 CPL, 326 HVAC leads at $4.68 CPL and a 6.6x ROAS for an e-commerce wellness brand. We will show you the ones closest to your business on a call.', 'tags' => array( 'Case studies', 'ROAS', 'CPL' ) ),
		array( 'cat' => 'results', 'q' => 'How much ad budget do I need?', 'a' => 'You can start testing with a modest daily budget. For our done-for-you growth program we work best with businesses already doing $10K+ per month so there is room to scale the winners.', 'tags' => array( 'Budget', '$10K+' ) ),
		array( 'cat' => 'results', 'q' => 'How do I get started?', 'a' => 'Book a free strategy call. We review your offer and current ads, show matching case studies and recommend the plan that fits, with no pressure.', 'tags' => array( 'Free call' ) ),
	);
}

function mdm_shortcode_faq( $atts ) {
	$atts = shortcode_atts(
		array(
			'eyebrow'   => 'FAQ',
			'title'     => 'Ask us anything.',
			'subtitle'  => 'Pick a question and get a straight answer, the same way we would answer on a call.',
			'bot_name'  => 'Million Dollar Media',
			'bot_short' => 'MDM',
			'bot_status'=> 'Usually replies within a day',
			'stat1'     => '7 days|to first content',
			'stat2'     => '<24h|reply time',
			'stat3'     => '250+|case studies',
		),
		$atts,
		'mdm_faq'
	);

	$cats  = apply_filters(
		'mdm_faq_categories',
		array(
			'services' => 'Services',
			'process'  => 'Process',
			'results'  => 'Results & budget',
		)
	);
	$items = apply_filters( 'mdm_faq_items', mdm_default_faq_items() );
	$total = count( $items );

	$counts = array();
	foreach ( $items as $it ) {
		$counts[ $it['cat'] ] = isset( $counts[ $it['cat'] ] ) ? $counts[ $it['cat'] ] + 1 : 1;
	}

	$data = array(
		'items'    => array_values( $items ),
		'fallback' => sprintf(
			'Good question. That one is best answered on a quick call or on WhatsApp so we can look at your business. <a href="%s">Book a free call</a> or <a href="%s" target="_blank" rel="noopener">message us on WhatsApp</a>.',
			esc_url( MDM_Sections::cta_url() ),
			esc_url( MDM_Sections::whatsapp_url() )
		),
	);

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-faq" data-mdm-faq data-mdm-reveal id="faq">
		<div class="mdm-faq__head">
			<div>
				<span class="mdm-eyebrow mdm-eyebrow--plain mdm-rise" style="--d:0s"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
				<h2 class="mdm-display mdm-faq__title"><?php echo MDM_Sections::split_words( $atts['title'] ); // phpcs:ignore ?></h2>
				<p class="mdm-lead mdm-rise" style="--d:.3s"><?php echo esc_html( $atts['subtitle'] ); ?></p>
			</div>
			<div class="mdm-faq__stats">
				<?php foreach ( array( $atts['stat1'], $atts['stat2'], $atts['stat3'] ) as $k => $s ) :
					$p = explode( '|', $s, 2 );
					?>
					<div class="mdm-rise" style="--d:<?php echo esc_attr( 0.3 + $k * 0.1 ); ?>s"><b><?php echo esc_html( $p[0] ); ?></b><span><?php echo esc_html( isset( $p[1] ) ? $p[1] : '' ); ?></span></div>
				<?php endforeach; ?>
			</div>
		</div>

		<div class="mdm-faq__app mdm-rise" style="--d:.2s">
			<aside class="mdm-faq__side">
				<label class="mdm-faq__search">
					<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
					<input type="search" placeholder="Search questions" aria-label="Search questions" data-faq-search>
				</label>
				<div class="mdm-faq__filters" role="group" aria-label="Filter questions">
					<button type="button" class="is-on" data-faq-cat="all">All <small><?php echo (int) $total; ?></small></button>
					<?php foreach ( $cats as $key => $label ) : ?>
						<button type="button" data-faq-cat="<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $label ); ?> <small><?php echo (int) ( isset( $counts[ $key ] ) ? $counts[ $key ] : 0 ); ?></small></button>
					<?php endforeach; ?>
				</div>
				<ol class="mdm-faq__list">
					<?php foreach ( $items as $i => $it ) : ?>
						<li>
							<button type="button" data-faq-q="<?php echo (int) $i; ?>" data-cat="<?php echo esc_attr( $it['cat'] ); ?>"<?php echo 0 === $i ? ' class="is-on" aria-current="true"' : ''; ?>>
								<span class="n"><?php echo esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>
								<span class="t"><?php echo esc_html( $it['q'] ); ?></span>
								<span class="a" aria-hidden="true">→</span>
							</button>
						</li>
					<?php endforeach; ?>
				</ol>
				<p class="mdm-faq__empty" hidden>No matching questions. Try asking it in the chat →</p>
			</aside>

			<div class="mdm-faq__chat">
				<header class="mdm-faq__bar">
					<span class="mdm-faq__avatar"><?php echo esc_html( $atts['bot_short'] ); ?><i></i></span>
					<div class="mdm-faq__who"><b><?php echo esc_html( $atts['bot_name'] ); ?></b><span><?php echo esc_html( $atts['bot_status'] ); ?></span></div>
					<div class="mdm-faq__nav">
						<span><b data-faq-index>01</b> / <?php echo esc_html( str_pad( (string) $total, 2, '0', STR_PAD_LEFT ) ); ?></span>
						<button type="button" data-faq-prev aria-label="Previous question">←</button>
						<button type="button" data-faq-next aria-label="Next question">→</button>
					</div>
				</header>
				<div class="mdm-faq__log" aria-live="polite" data-faq-log></div>
				<div class="mdm-faq__suggest" data-faq-suggest></div>
				<form class="mdm-faq__ask" data-faq-form>
					<input type="text" placeholder="Ask your own question…" aria-label="Ask your own question" data-faq-input>
					<button type="submit">Send <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>
				</form>
			</div>
		</div>
		<script type="application/json" data-faq-data><?php echo wp_json_encode( $data ); ?></script>
	</section>
	<?php
	return ob_get_clean();
}
