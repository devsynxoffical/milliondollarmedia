<?php
/**
 * Keyword landing pages from the 20 Nov 2026 keyword plan (milliondollarmedia.us owns video ads, UGC, VSL, ad creatives):
 *   [mdm_landing page="video-ad-agency"]      -> /video-ad-agency/      "video ad agency" (390/mo, KD 12)
 *   [mdm_landing page="ecommerce-video-ads"]  -> /ecommerce-video-ads/  "ecommerce video ads" (210/mo, KD 5)
 * Built from real site data only: Portfolio videos, published case studies, live prices.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_landing_pages() {
	$ecom = mdm_landing_ecom_counts();
	return array(
		'video-ad-agency'     => array(
			'pill'    => 'Done-for-you video ads',
			'h1'      => array( 'Video ad agency', 'for lead gen & e-commerce brands' ),
			'lead'    => 'Million Dollar Media is a done-for-you video ad agency. We script, produce and edit video ads (UGC, VSLs, AI videos and short-form) for Facebook, Instagram, TikTok and YouTube, delivered in 24–48 hours from $34.97 per video. Every result we mention is one of our 247 published case studies.',
			'cta'     => 'Get a free video ad plan',
			'stats'   => array( array( '247', 'published case studies' ), array( '15', 'industries in our portfolio' ), array( '24–48h', 'typical delivery' ), array( '$34.97', 'per video, no retainer' ) ),
			'tabs'    => array( 'All' ),
			'vlabel'  => 'Video ad',
			'vh2'     => 'Video ads we made for clients',
			'vsub'    => 'A mix of formats and industries from our portfolio.',
			'cards_h' => 'What our video ad agency makes',
			'cards'   => array(
				array( 'UGC ads', 'One presenter talking straight to camera, filmed like a phone video, with a hook in the first seconds.', '/ugc-ads-examples/', 'See 38 UGC ad examples' ),
				array( 'VSLs', 'Video sales letters for landing pages, application funnels and longer ads.', '/what-is-a-vsl/', 'What is a VSL?' ),
				array( 'AI videos', 'AI avatar or AI voice-over videos when you need volume and speed without a shoot.', '', '' ),
				array( 'Short-form ads', 'Vertical, captioned ads built for Reels, TikTok, Stories and YouTube Shorts.', '/portfolio/', 'Video ad examples' ),
				array( 'Image ads', 'Static ad creatives from $14.97 to test angles and offers next to your videos.', '', '' ),
				array( 'GIF ads', 'Looping animated ads from $24.97, made for retargeting and warm audiences.', '', '' ),
			),
			'cases'   => array( 'cat' => 'all', 'title' => 'Results from our video ads' ),
			'compare' => array(
				'h2'   => 'Video ad agency vs. doing it in-house',
				'head' => array( 'Million Dollar Media', 'In-house or freelancer' ),
				'rows' => array(
					array( 'Turnaround', '24–48 hours per video', 'Depends on one person’s schedule' ),
					array( 'Cost', 'From $34.97 per video, no retainer', 'Salary or day rates, plus tools' ),
					array( 'Formats', 'UGC, VSLs, AI videos, short-form, images, GIFs', 'Usually one or two formats' ),
					array( 'Testing', 'Several hooks per offer, winners kept and scaled', 'Few versions, slow to test' ),
					array( 'Ads management', 'Available: creative only or creative plus media buying', 'Separate hire' ),
				),
			),
			'industries' => true,
			'faq'     => array(
				array( 'What does a video ad agency do?', 'A video ad agency plans, scripts, produces and edits video ads for paid social and YouTube, and often runs the campaigns too. We handle the whole process: you fill in one short questionnaire, approve the drafts, and get finished ads in 24–48 hours.' ),
				array( 'How much does a video ad cost?', 'Our video ads start at $34.97 per video with no retainer. 10 videos cost $299, AI videos start at $44.97, image ads at $14.97 and GIF ads at $24.97. Larger monthly volumes and ads management are quoted on a free strategy call.' ),
				array( 'Do you also run the ads or only make the videos?', 'Both. You can take the creative only, or let us run the media buying too. Most clients choose both, because testing new hooks and scaling the winners is faster under one roof.' ),
				array( 'Which platforms are the videos made for?', 'Facebook, Instagram, TikTok and YouTube, in the formats each placement needs: vertical 9:16 for Reels, Stories, TikTok and Shorts, and square or horizontal versions where they perform better.' ),
				array( 'Which industries do you make video ads for?', 'Mostly lead generation businesses (roofing, HVAC, solar, legal, home services, SaaS, coaching and agencies) and e-commerce brands. Our portfolio covers 15 industries and our case studies show the results.' ),
			),
			'src'     => 'video-ad-agency',
			'form'    => array( 'Get a free video ad plan', 'Tell us about your offer and we will send a short plan: the video formats and hooks we would test first.' ),
		),
		'ecommerce-video-ads' => array(
			'pill'    => 'For Shopify & DTC brands',
			'h1'      => array( 'Ecommerce video ads', 'that scale DTC brands' ),
			'lead'    => 'Video ads for Shopify and DTC brands: UGC-style reviews, product demos, problem-and-solution ads and offer ads for Meta and TikTok. Our ' . (int) $ecom['total'] . ' e-commerce case studies include a store scaled to $2.3M at an 11.6x ROAS.',
			'cta'     => 'Get e-commerce video ads',
			'stats'   => array( array( (string) $ecom['total'], 'e-commerce case studies' ), array( '11.6x', 'best ROAS in our case studies' ), array( '$2.3M', 'largest brand scaled' ), array( '$34.97', 'per video, no retainer' ) ),
			'tabs'    => array( 'eCom Brands', 'Fitness' ),
			'vlabel'  => 'E-commerce video ad',
			'vh2'     => 'E-commerce video ads we made',
			'vsub'    => 'DTC, fitness and supplement brand ads from our portfolio.',
			'cards_h' => 'Results from e-commerce brands',
			'proof'   => array(
				array( '$2.3M', '11.6x ROAS', 'A store we helped build to $2.3M in 2022.' ),
				array( '$115,416', '4.39 ROAS', 'From $26,271 in ad spend for a skincare brand.' ),
				array( '$62,182', '4.50 ROAS', 'In 7 days for a supplement brand.' ),
				array( '$61,960', '3.80 ROAS', 'In a single day for a DTC brand.' ),
			),
			'niches'  => $ecom['niches'],
			'cards2_h' => 'E-commerce video ads we make',
			'cards'   => array(
				array( 'UGC-style reviews', 'A real-looking customer or creator showing the product and why it works, filmed like a phone video.', '/ugc-ads-examples/', 'UGC ad examples' ),
				array( 'Product demos', 'The product in use in the first seconds, with captions for viewers watching on mute.', '', '' ),
				array( 'Problem and solution ads', 'Open with the problem your buyer has, show the product solving it, end with one offer.', '', '' ),
				array( 'Offer and sale ads', 'Short ads built around a launch, bundle or seasonal sale like Black Friday.', '', '' ),
			),
			'cases'   => array( 'cat' => 'ecom', 'title' => 'E-commerce case studies' ),
			'industries' => false,
			'faq'     => array(
				array( 'What are e-commerce video ads?', 'E-commerce video ads are short videos that sell a product directly in the feed: a hook, the product in use, proof such as reviews or results, and one offer. Brands run them on Facebook, Instagram and TikTok to drive purchases on their store.' ),
				array( 'Which e-commerce video ads work best?', 'UGC-style reviews and product demos usually win because they look native to the feed and show the product working. We make several versions with different hooks so the ad account can find the winners quickly.' ),
				array( 'How much do e-commerce video ads cost?', 'From $34.97 per video with no retainer, 10 videos for $299, and AI videos from $44.97. Larger monthly volumes and ads management are quoted on a free strategy call.' ),
				array( 'Do you work with Shopify stores and dropshipping brands?', 'Yes. Our ' . (int) $ecom['total'] . ' e-commerce case studies include Shopify DTC brands, dropshipping stores, beauty and skincare, apparel, fitness and supplement brands.' ),
				array( 'How fast can you deliver?', 'Most videos are delivered in 24–48 hours, with revision rounds included before anything goes live.' ),
			),
			'src'     => 'ecommerce-video-ads',
			'form'    => array( 'Get e-commerce video ads', 'Tell us about your store and products and we will send a short plan: the ad formats and hooks we would test first.' ),
		),
	);
}

/** Real counts from data/cases.json (the e-commerce case studies). */
function mdm_landing_ecom_counts() {
	static $c = null;
	if ( null !== $c ) {
		return $c;
	}
	$p    = dirname( __DIR__ ) . '/data/cases.json';
	$rows = file_exists( $p ) ? json_decode( (string) file_get_contents( $p ), true ) : array(); // phpcs:ignore
	$n    = array();
	foreach ( (array) $rows as $r ) {
		if ( ! empty( $r['n'] ) ) {
			$n[ $r['n'] ] = isset( $n[ $r['n'] ] ) ? $n[ $r['n'] ] + 1 : 1;
		}
	}
	arsort( $n );
	return $c = array( 'total' => count( (array) $rows ), 'niches' => $n );
}

function mdm_landing_slug() {
	if ( ! is_page() ) {
		return '';
	}
	$s = get_post_field( 'post_name', get_queried_object_id() );
	return isset( mdm_landing_pages()[ $s ] ) ? $s : '';
}

/** Home-page style video cards from Portfolio tabs. */
function mdm_landing_videos( $cfg ) {
	if ( ! function_exists( 'mdm_portfolio_tab_videos' ) || ! function_exists( 'mdm_shortcode_reels' ) ) {
		return '';
	}
	$all  = mdm_portfolio_tab_videos();
	$urls = array();
	foreach ( $cfg['tabs'] as $t ) {
		if ( ! empty( $all[ $t ] ) ) {
			$urls = array_merge( $urls, $all[ $t ] );
		}
	}
	$items = array();
	foreach ( array_slice( array_values( array_unique( $urls ) ), 0, 8 ) as $u ) {
		if ( preg_match( '~vimeo\.com/(?:video/)?(\d+)~', $u, $m ) ) {
			$items[] = array( 'label' => $cfg['vlabel'], 'src' => 'https://vimeo.com/' . $m[1], 'type' => 'vimeo', 'poster' => mdm_video_thumb( 'https://vimeo.com/' . $m[1], 'vimeo' ) );
		}
	}
	if ( ! $items ) {
		return '';
	}
	$src = static function () use ( $items ) { return array( 'items' => $items, 'more' => home_url( '/portfolio/' ) ); };
	add_filter( 'mdm_reels_source', $src, 999 );
	add_filter( 'mdm_reels_featured', '__return_empty_array', 999 );
	$grid = mdm_shortcode_reels( array( 'head' => 'no', 'intro' => '', 'rows' => 2, 'more_text' => 'See all video ad examples', 'platforms_title' => 'Made for every feed your buyers scroll.' ) );
	remove_filter( 'mdm_reels_source', $src, 999 );
	remove_filter( 'mdm_reels_featured', '__return_empty_array', 999 );
	return '<section class="mdm-lp__videos"><div class="mdm-ugc__in mdm-lp__center"><span class="mdm-niche__pill">Our work</span><h2 class="mdm-ugc__h2">' . esc_html( $cfg['vh2'] ) . '</h2><p class="mdm-lp__sub">' . esc_html( $cfg['vsub'] ) . ' They play as you scroll; tap a video to open the full portfolio.</p></div>' . $grid . '</section>';
}

add_shortcode(
	'mdm_landing',
	static function ( $atts ) {
		$atts  = shortcode_atts( array( 'page' => '' ), $atts, 'mdm_landing' );
		$pages = mdm_landing_pages();
		if ( empty( $pages[ $atts['page'] ] ) ) {
			return '';
		}
		$c   = $pages[ $atts['page'] ];
		$cta = MDM_Sections::cta_url();
		ob_start();
		echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
		?>
		<div class="mdm-ugc mdm-lp mdm-page">
			<section class="mdm-ugc__hero mdm-lp__hero">
				<div class="mdm-ugc__in mdm-ugc__herogrid">
					<div>
						<span class="mdm-niche__pill"><?php echo esc_html( $c['pill'] ); ?></span>
						<h1 class="mdm-ugc__h1"><?php echo esc_html( $c['h1'][0] ); ?> <span><?php echo esc_html( $c['h1'][1] ); ?></span></h1>
						<p class="mdm-ugc__lead"><?php echo esc_html( $c['lead'] ); ?></p>
						<div class="mdm-ugc__btns">
							<a class="mdm-ihero__btn is-red" href="#free-plan"><?php echo esc_html( $c['cta'] ); ?> <em><?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?></em></a>
							<a class="mdm-ihero__btn" href="<?php echo esc_url( $cta ); ?>">Book a free strategy call</a>
						</div>
					</div>
					<ul class="mdm-ugc__stats">
						<?php foreach ( $c['stats'] as $i => $s ) : ?><li<?php echo 0 === $i ? ' class="is-red"' : ''; ?>><b><?php echo esc_html( $s[0] ); ?></b><span><?php echo esc_html( $s[1] ); ?></span></li><?php endforeach; ?>
					</ul>
				</div>
			</section>

			<?php echo mdm_landing_videos( $c ); // phpcs:ignore ?>

			<?php if ( ! empty( $c['proof'] ) ) : ?>
				<section class="mdm-ugc__sec mdm-lp__alt">
					<div class="mdm-ugc__in">
						<span class="mdm-niche__pill">Proof</span>
						<h2 class="mdm-ugc__h2"><?php echo esc_html( $c['cards_h'] ); ?></h2>
						<div class="mdm-lp__proof">
							<?php foreach ( $c['proof'] as $p ) : ?><div><b><?php echo esc_html( $p[0] ); ?></b><em><?php echo esc_html( $p[1] ); ?></em><p><?php echo esc_html( $p[2] ); ?></p></div><?php endforeach; ?>
						</div>
						<?php if ( ! empty( $c['niches'] ) ) : ?>
							<p class="mdm-lp__niches"><span>Case studies by category:</span> <?php echo esc_html( implode( ' · ', array_map( static function ( $k, $v ) { return $k . ' ' . $v; }, array_keys( $c['niches'] ), $c['niches'] ) ) ); ?></p>
						<?php endif; ?>
					</div>
				</section>
			<?php endif; ?>

			<section class="mdm-ugc__sec">
				<div class="mdm-ugc__in">
					<span class="mdm-niche__pill">Formats</span>
					<h2 class="mdm-ugc__h2"><?php echo esc_html( ! empty( $c['cards2_h'] ) ? $c['cards2_h'] : $c['cards_h'] ); ?></h2>
					<div class="mdm-lp__cards">
						<?php foreach ( $c['cards'] as $i => $k ) : ?>
							<article class="mdm-lp__card"><span class="mdm-ic__num"><?php echo esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span><h3><?php echo esc_html( $k[0] ); ?></h3><p><?php echo esc_html( $k[1] ); ?></p><?php echo $k[2] ? '<a href="' . esc_url( home_url( $k[2] ) ) . '">' . esc_html( $k[3] ) . ' →</a>' : ''; ?></article>
						<?php endforeach; ?>
					</div>
				</div>
			</section>

			<div class="mdm-lp__cases"><?php echo function_exists( 'mdm_shortcode_case_studies' ) ? mdm_shortcode_case_studies( array( 'cat' => $c['cases']['cat'], 'limit' => '8', 'eyebrow' => 'Case studies', 'title' => $c['cases']['title'], 'badge' => 'auto', 'subtitle' => 'Real ad accounts, dashboards and screen recordings. Tap any card to see the proof.' ) ) : ''; // phpcs:ignore ?></div>

			<?php if ( ! empty( $c['compare'] ) ) : ?>
				<section class="mdm-ugc__sec mdm-lp__alt">
					<div class="mdm-ugc__in">
						<h2 class="mdm-ugc__h2"><?php echo esc_html( $c['compare']['h2'] ); ?></h2>
						<div class="mdm-ugc__tablewrap"><table class="mdm-ugc__table"><thead><tr><th></th><th><?php echo esc_html( $c['compare']['head'][0] ); ?></th><th><?php echo esc_html( $c['compare']['head'][1] ); ?></th></tr></thead><tbody>
							<?php foreach ( $c['compare']['rows'] as $r ) : ?><tr><td><?php echo esc_html( $r[0] ); ?></td><td><?php echo esc_html( $r[1] ); ?></td><td><?php echo esc_html( $r[2] ); ?></td></tr><?php endforeach; ?>
						</tbody></table></div>
					</div>
				</section>
			<?php endif; ?>

			<?php echo do_shortcode( '[mdm_pricing]' ); // live prices with the package dropdowns ?>

			<section class="mdm-ugc__sec mdm-lp__alt">
				<div class="mdm-ugc__in">
					<span class="mdm-niche__pill">How it works</span>
					<h2 class="mdm-ugc__h2">From brief to live ads in days</h2>
					<ol class="mdm-ic__steps">
						<li><span class="mdm-ic__stepn">1</span><div><h3>Short brief</h3><p>One questionnaire about your offer, audience and what converts today.</p></div></li>
						<li><span class="mdm-ic__stepn">2</span><div><h3>Hooks & scripts</h3><p>We write several hook-first scripts for each offer.</p></div></li>
						<li><span class="mdm-ic__stepn">3</span><div><h3>Production</h3><p>UGC creators, AI avatars or voice-over, or footage you film with our shot list.</p></div></li>
						<li><span class="mdm-ic__stepn">4</span><div><h3>Edit & approval</h3><p>Captions, hooks and sound, delivered in 24–48 hours for your review.</p></div></li>
						<li><span class="mdm-ic__stepn">5</span><div><h3>Test & scale</h3><p>Run them as ads, keep the winners and replace the rest.</p></div></li>
					</ol>
				</div>
			</section>

			<?php if ( ! empty( $c['industries'] ) && function_exists( 'mdm_industry_heroes' ) ) : ?>
				<section class="mdm-ugc__sec">
					<div class="mdm-ugc__in">
						<span class="mdm-niche__pill">Industries</span>
						<h2 class="mdm-ugc__h2">Video ads by industry</h2>
						<div class="mdm-lp__inds">
							<?php foreach ( mdm_industry_heroes() as $slug => $h ) : ?><a href="<?php echo esc_url( home_url( '/' . $slug . '/' ) ); ?>"><b><?php echo esc_html( $h[0] ); ?></b><span><?php echo esc_html( $h[1] ); ?></span></a><?php endforeach; ?>
							<a href="<?php echo esc_url( home_url( '/ecommerce-video-ads/' ) ); ?>"><b>E-commerce video ads</b><span>for Shopify & DTC brands</span></a>
						</div>
					</div>
				</section>
			<?php endif; ?>

			<?php echo function_exists( 'mdm_leadform_html' ) ? mdm_leadform_html( $c['src'], $c['form'][0], $c['form'][1] ) : ''; // phpcs:ignore ?>

			<section class="mdm-ugc__sec">
				<div class="mdm-ugc__in mdm-ugc__faq">
					<h2 class="mdm-ugc__h2">Questions</h2>
					<?php foreach ( $c['faq'] as $k => $f ) : ?><details<?php echo 0 === $k ? ' open' : ''; ?>><summary><?php echo esc_html( $f[0] ); ?></summary><p><?php echo esc_html( $f[1] ); ?></p></details><?php endforeach; ?>
					<p class="mdm-ugc__more">More: <a href="<?php echo esc_url( home_url( '/portfolio/' ) ); ?>">video ad examples</a> · <a href="<?php echo esc_url( home_url( '/ugc-ads-examples/' ) ); ?>">UGC ad examples</a> · <a href="<?php echo esc_url( home_url( '/what-is-a-vsl/' ) ); ?>">what is a VSL</a> · <a href="<?php echo esc_url( home_url( '/case-studies/' ) ); ?>">247 case studies</a> · <?php echo 'ecommerce-video-ads' === $atts['page'] ? '<a href="' . esc_url( home_url( '/product-video-ads/' ) ) . '">product video ads guide</a>' : '<a href="' . esc_url( home_url( '/how-much-do-video-ads-cost/' ) ) . '">how much video ads cost</a>'; // phpcs:ignore ?></p>
				</div>
			</section>
		</div>
		<?php
		return ob_get_clean();
	}
);

// Theme title off (the hero has the H1), light service-page styling.
add_filter( 'astra_the_title_enabled', static function ( $on ) { return mdm_landing_slug() ? false : $on; }, 30 );
add_filter( 'body_class', static function ( $c ) { if ( mdm_landing_slug() ) { $c[] = 'mdm-landing'; } return $c; } );

// FAQPage data.
add_filter(
	'rank_math/json_ld',
	static function ( $data ) {
		$s = mdm_landing_slug();
		if ( ! $s || ! is_array( $data ) ) {
			return $data;
		}
		$data['mdmLandingFaq'] = array(
			'@type'      => 'FAQPage',
			'@id'        => home_url( '/' . $s . '/#faq' ),
			'mainEntity' => array_map( static function ( $f ) { return array( '@type' => 'Question', 'name' => $f[0], 'acceptedAnswer' => array( '@type' => 'Answer', 'text' => $f[1] ) ); }, mdm_landing_pages()[ $s ]['faq'] ),
		);
		return $data;
	},
	110
);

// Same as the service pages: no site-wide testimonials block.
add_filter( 'mdm_voices_everywhere', static function ( $on ) { return mdm_landing_slug() ? false : $on; } );
