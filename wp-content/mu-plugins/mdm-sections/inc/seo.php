<?php
/**
 * SEO layer (Nov 2026 audit):
 *  - unique meta titles / descriptions (+ Open Graph / Twitter) per page, keyword-mapped from real search data
 *  - noindex for funnel / thin pages, matching sitemap exclusions
 *  - industry pages: unique section with that industry's real case studies + FAQ (replaces duplicate template text as the main content signal)
 *  - Service schema on service pages, alt-text fallbacks, related links on blog posts
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** path => [ title, description ]. Titles <= 60 chars, descriptions 120-160 chars. */
function mdm_seo_meta_map() {
	return apply_filters(
		'mdm_seo_meta_map',
		array(
			'/'                                        => array( 'Video Ad Agency for Lead Gen & DTC | Million Dollar Media', 'Done-for-you video ads, VSLs and UGC creatives delivered in 24–48 hours. 12+ years, 247 verified case studies and $100M+ in client revenue. Book a free call.' ),
			'/portfolio/'                              => array( 'Video Ad Examples & Portfolio | Million Dollar Media', 'Watch real video ad examples we produced for roofing, HVAC, solar, SaaS, supplements, recruitment and more: hooks, UGC, VSLs and short-form ads that convert.' ),
			'/case-studies/'                           => array( '247 Video Ad Case Studies: Lead Gen & E-commerce Results', 'Real results from client ad accounts: 124 lead generation and 123 e-commerce case studies with cost per lead, ROAS and revenue. Proof, not promises.' ),
			'/case-studies/lead-generation/'           => array( 'Lead Generation Case Studies: 124 Real Campaigns & CPLs', '124 lead gen campaigns for roofing, MVA, mortgage, MedSpa, coaching and more, with real ad spend, cost per lead and booked calls. Watch the proof videos.' ),
			'/case-studies/ecommerce/'                 => array( 'E-commerce & DTC Case Studies: 123 Results With ROAS', '123 e-commerce and DTC brand results from Shopify dashboards and screen recordings: revenue, ROAS and margins scaled with Meta video ads.' ),
			'/our-story/'                              => array( 'About Million Dollar Media: Video Ad Agency Since 2019', 'Meet the team behind Million Dollar Media: 12+ years in performance creative, $50M+ in ad spend managed and done-for-you video ads for 500+ brands.' ),
			'/book-your-call/'                         => array( 'Book a Free Strategy Call | Million Dollar Media', 'Book a free 15-minute strategy call. We review your offer and ads, show matching case studies and map a video ad plan to get you more leads and sales.' ),
			'/bookcall/'                               => array( 'Get Custom Pricing for Video Ads | Million Dollar Media', 'Need 10+ creatives a month or a full done-for-you package? Pick a time for a free 15-minute call and get custom pricing built around your budget.' ),
			'/blogs/'                                  => array( 'Video Ads & Video Marketing Blog | Million Dollar Media', 'Practical guides on video ads, VSLs, UGC and video marketing for roofers, HVAC, coaches, agencies and e-commerce brands from the Million Dollar Media team.' ),
			'/roofing-video-marketing-services/'       => array( 'Roofing Ads & Video Marketing for Roofers That Get Leads', 'Video ads and done-for-you Meta campaigns for roofing companies, with 11 roofing case studies such as 686 website leads in 8 days. Book a free strategy call.' ),
			'/hvac-video-marketing-services/'          => array( 'HVAC Advertising & Video Marketing That Books Calls', 'HVAC video ads and Meta advertising that fill your schedule. See 6 HVAC case studies, including 326 leads in 26 days for one client. Get a free plan.' ),
			'/plumbing-video-production/'              => array( 'Plumbing Video Production & Video Ads for Plumbers', 'Video production and video ads for plumbing companies: trust-building service videos, short-form ads and lead campaigns that turn local demand into booked jobs.' ),
			'/mva/'                                    => array( 'MVA Leads & Personal Injury Lawyer Marketing With Video', 'Exclusive, OTP-verified MVA leads for personal injury firms from video ads and funnels, including 8,810 leads at $7.61 each. See 13 real legal case studies.' ),
			'/real-estate/'                            => array( 'Real Estate Video Marketing & Video Ads for Agents', 'Real estate video marketing for agents, investors and lenders: listing videos, short-form ads and lead campaigns. See real estate and mortgage case studies.' ),
			'/solar/'                                  => array( 'Solar Ads & Video Marketing for Solar Companies', 'Solar video ads and lead generation for installers: scroll-stopping creatives and funnels that reach homeowners with real interest. See our solar results.' ),
			'/saas/'                                   => array( 'SaaS Video Production & Video Ads That Drive Sales', 'SaaS video production and paid video ads: demo, explainer and UGC-style ads that drive trials, demos and revenue, with 24–48 hour creative turnaround.' ),
			'/agency-owners/'                          => array( 'White Label Video Ads for Marketing Agencies', 'White label video ad production for marketing agencies: on-brand creatives for your clients in 24–48 hours at half the in-house cost. See 9 agency case studies.' ),
			'/home-service-business/'                  => array( 'Home Service Marketing Agency for Video Ads & Leads', 'Video ads and lead generation for home service businesses: roofing, HVAC, plumbing, solar, remodeling and home care. Real campaigns, real CPLs, done for you.' ),
			'/strategic-video-marketing-for-coaches/'  => array( 'Video Marketing & Facebook Ads for Coaches', 'Done-for-you video marketing and Facebook ads for coaches and consultants. See 17 coaching case studies, including $115K from one campaign. Book a call.' ),
			'/video-marketing-for-roofing-business/'   => array( 'Video Marketing for Roofing Companies: Step-by-Step Guide', 'A step-by-step video marketing guide for roofing contractors: video ideas, simple scripts, filming on a phone, and turning videos into local roofing leads.' ),
			'/facebook-ads-for-roofers/'               => array( 'Facebook Ads for Roofers: Real Roofing Lead Costs & Setup', 'How roofers get leads from Facebook ads: real cost per lead from 9 roofing campaigns ($4.27 to $24), plus the targeting, lead form and verification setup.' ),
			'/hvac-facebook-ads/'                      => array( 'Facebook Ads for HVAC: Real Lead, Booking & Install Costs', 'How HVAC companies get leads from Facebook ads: real cost per lead, per booked appointment and per install from our HVAC campaigns, plus the lead form we use.' ),
			'/ugc-ads-examples/'                       => array( 'UGC Ad Examples: 38 UGC-Style Video Ads by Industry', 'Watch 38 real UGC-style video ads we made for roofing, solar, HVAC, legal, finance and SaaS clients, with the hook each one opens with. From $34.97 per video.' ),
			'/what-is-a-vsl/'                          => array( 'What Is a VSL? Video Sales Letter Guide + Real VSL Examples', 'What a VSL (video sales letter) is, the script structure that converts, real VSL examples from our clients, what a VSL costs and when it beats a sales page.' ),
		)
	);
}

function mdm_seo_path() {
	$p = wp_parse_url( isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '/', PHP_URL_PATH ); // phpcs:ignore
	$p = '/' . trim( (string) $p, '/' ) . '/';
	return '//' === $p ? '/' : $p;
}

function mdm_seo_entry() {
	if ( is_admin() || is_404() || is_search() ) {
		return null;
	}
	$map = mdm_seo_meta_map();
	$p   = is_front_page() ? '/' : mdm_seo_path();
	return isset( $map[ $p ] ) ? $map[ $p ] : null;
}

add_filter( 'rank_math/frontend/title', static function ( $t ) { $e = mdm_seo_entry(); return $e ? $e[0] : $t; }, 20 );
add_filter( 'rank_math/frontend/description', static function ( $d ) { $e = mdm_seo_entry(); return $e ? $e[1] : $d; }, 20 );
foreach ( array( 'facebook/og_title', 'twitter/twitter_title' ) as $f ) {
	add_filter( 'rank_math/opengraph/' . $f, static function ( $t ) { $e = mdm_seo_entry(); return $e ? $e[0] : $t; }, 20 );
}
foreach ( array( 'facebook/og_description', 'twitter/twitter_description' ) as $f ) {
	add_filter( 'rank_math/opengraph/' . $f, static function ( $d ) { $e = mdm_seo_entry(); return $e ? $e[1] : $d; }, 20 );
}

/* ------------------------------------------------------------------ */
/* Index control: funnel steps and thin archives stay out of Google    */
/* ------------------------------------------------------------------ */

function mdm_seo_noindex_ids() {
	// theleadpilot (one-time upsell), bookcall (conversion page, duplicate intent of /book-your-call/), shop (product archive)
	return array( 3439, 4939, 207 );
}
add_filter(
	'rank_math/frontend/robots',
	static function ( $robots ) {
		if ( is_category() || is_tag() || ( is_singular() && in_array( get_queried_object_id(), mdm_seo_noindex_ids(), true ) ) || ( function_exists( 'is_shop' ) && is_shop() ) ) {
			$robots['index']  = 'noindex';
			$robots['follow'] = 'follow';
		}
		return $robots;
	},
	20
);
add_filter( 'rank_math/sitemap/posts_to_exclude', static function ( $ids ) { return array_merge( (array) $ids, mdm_seo_noindex_ids() ); }, 20 );
add_filter( 'rank_math/sitemap/exclude_taxonomy', static function ( $exclude, $type ) { return in_array( $type, array( 'category', 'post_tag' ), true ) ? true : $exclude; }, 20, 2 );

/* ------------------------------------------------------------------ */
/* Industry pages: unique section built from that industry's cases     */
/* ------------------------------------------------------------------ */

function mdm_seo_niches() {
	return array(
		'roofing-video-marketing-services'      => array(
			'niches' => array( 'Roofing' ),
			'h2'     => 'Roofing ads that bring real homeowners, not tire-kickers',
			'p'      => array(
				'Most roofing companies pay $40–$80 for a single lead from shared lead vendors. We run your own roofing ads instead: short video creatives that show your crew, your work and your offer, sent to homeowners in your service area and qualified by a short form before they reach your phone.',
				'Across our 11 roofing campaigns we have generated 686 website leads in 8 days for a Texas roofer, 537 leads at $4.27 each and 215 leads at $12.79 on $2,749 of spend. Every number below comes from a client ad account, and you can open each one to see the proof.',
			),
			'faq'    => array(
				array( 'How much do roofing ads cost per lead?', 'In our roofing campaigns cost per lead has ranged from about $4 to $13, depending on the market, season and offer. Your budget, service area and storm activity all move this number, so we show you matching case studies on the call.' ),
				array( 'Do you make the videos or just run the ads?', 'Both. We script and edit the video creatives, build the landing page or lead form, launch the Meta campaigns and test new hooks every week.' ),
				array( 'Will the leads be exclusive to my company?', 'Yes. The ads run from your own ad account and funnel, so every lead belongs to you and is never resold.' ),
			),
		),
		'hvac-video-marketing-services'         => array(
			'niches' => array( 'HVAC' ),
			'h2'     => 'HVAC advertising that keeps your techs booked',
			'p'      => array(
				'HVAC demand swings with the weather, so your advertising has to switch on fast. We build short video ads for tune-ups, repairs and replacements, run them on Meta in your service area and pre-qualify every lead so your team only calls homeowners who are ready to book.',
				'Our 6 HVAC case studies include 326 leads in 26 days for one client, $65,872 in cash collected at a 12.7x return for a Florida contractor and $36,444 collected at 19.6x for a New Jersey contractor.',
			),
			'faq'    => array(
				array( 'Which HVAC services work best with video ads?', 'Seasonal tune-up offers, emergency repair and system replacement financing perform best for our clients. We test several offers and keep the one with the lowest cost per booked job.' ),
				array( 'How fast can HVAC ads start producing leads?', 'Most campaigns launch within a week of the strategy call, and the first leads usually arrive in the first few days after launch.' ),
				array( 'Do you verify HVAC leads?', 'Yes. We use qualifying questions and phone verification so fake numbers and out-of-area requests are filtered out before they reach your team.' ),
			),
		),
		'plumbing-video-production'             => array(
			'niches' => array( 'Home Services' ),
			'h2'     => 'Home service results from the same system we use for plumbers',
			'p'      => array(
				'Plumbing is a trust purchase: homeowners let you into their house in a stressful moment. Short videos of your team, your trucks and real customer reviews answer that worry before the first call, and the same video ads can then run on Meta to bring booked jobs.',
				'Below are real home service campaigns from our case studies, including 337 kitchen remodeling appointments in 19 days and 180 home care leads in 14 days. Plumbing campaigns follow the same creative, targeting and lead-qualification system.',
			),
			'faq'    => array(
				array( 'What plumbing videos should I make first?', 'Start with a 30–60 second introduction to your company, one video per core service (drains, water heaters, leaks) and short customer testimonials. These cover search, social and ads.' ),
				array( 'Can you produce videos without a film crew on site?', 'Yes. Our AI-assisted editing works with phone footage you record using our shot list, so you get finished ads in 24–48 hours without a production day.' ),
				array( 'Do you also run the ads?', 'Yes, we can run the Meta campaigns and lead forms for you, or deliver the videos for your in-house team.' ),
			),
		),
		'mva'                                   => array(
			'niches' => array( 'Legal / MVA' ),
			'h2'     => 'Exclusive MVA leads instead of shared lead lists',
			'p'      => array(
				'Shared motor vehicle accident leads are sold to several firms at once and often cost $150 or more. We build personal injury firms their own lead engine: video ads aimed at recent accident victims, a qualifying funnel and OTP phone verification, so every claimant is exclusive to your intake team.',
				'Our 13 legal and MVA case studies include 8,810 MVA leads at $7.61 each on $67,013 of spend, 6,275 OTP-verified accident leads in 19 days and 530 leads at $27 each for a personal injury firm.',
			),
			'faq'    => array(
				array( 'Are the MVA leads exclusive?', 'Yes. Leads come from your own ad account and funnel, not a lead marketplace, so no other firm receives them.' ),
				array( 'How do you filter out bad accident leads?', 'The funnel asks about accident date, injuries and existing representation, and phone verification (OTP) removes fake numbers before intake sees the lead.' ),
				array( 'What does an MVA lead cost?', 'In our campaigns cost per lead has ranged from under $5 to about $27 depending on state, case type and how strict the qualification is.' ),
			),
		),
		'real-estate'                           => array(
			'niches' => array( 'Real Estate', 'Mortgage & Refinance' ),
			'h2'     => 'Real estate video marketing that fills your pipeline',
			'p'      => array(
				'Buyers and sellers watch before they call. We make short real estate videos and ads (listing tours, market updates and seller offers) and run them to the right zip codes, then route every lead through a qualifying form so agents spend time on motivated people.',
				'Our real estate and mortgage case studies include 157 motivated home seller leads at $28 each in 7 days, 247 leads at $16.48 for a Texas real estate business and 208 OTP-verified mortgage leads that led to 37 closings.',
			),
			'faq'    => array(
				array( 'What types of real estate videos work best as ads?', 'Seller offers ("what is my home worth"), new listing tours and short market updates perform best for our clients. We test hooks for each and keep the winners.' ),
				array( 'Do you work with mortgage and refinance companies?', 'Yes. Mortgage and refinance campaigns use the same system, with verified leads and compliance-friendly creative.' ),
				array( 'Can you edit footage I already have?', 'Yes. Send your listing photos and clips and we turn them into finished ads in 24–48 hours.' ),
			),
		),
		'solar'                                 => array(
			'niches' => array( 'Solar' ),
			'h2'     => 'Solar ads that reach homeowners with real interest',
			'p'      => array(
				'Solar buyers need proof before they book a consultation: savings, financing and installs in their area. Our solar video ads show exactly that, and a qualifying funnel checks home ownership and bill size so your setters call people who can actually go solar.',
				'In our solar campaigns we generated 300 leads at $14.71 each while other installers were paying $80–$100 CPMs, and 232 qualified leads in 15 days for another solar client.',
			),
			'faq'    => array(
				array( 'Do you qualify solar leads?', 'Yes. The funnel asks about home ownership, roof and monthly electric bill, and phone verification removes fake numbers.' ),
				array( 'Which solar offers convert best?', 'Savings calculators, $0-down financing and local install stories perform best in our solar tests.' ),
				array( 'Can you run ads in several states?', 'Yes. We split campaigns by state or utility area so each audience sees relevant savings and incentives.' ),
			),
		),
		'saas'                                  => array(
			'niches' => array( 'SaaS' ),
			'h2'     => 'SaaS video ads that turn attention into revenue',
			'p'      => array(
				'Most SaaS founders do not have a product problem, they have a distribution problem. We produce demo, explainer and UGC-style video ads that show the product solving one painful job, then run and test them on Meta to drive trials, demos and direct sales.',
				'Our SaaS case studies include $64,571 in revenue from $19,768 of ad spend, $71,934 for an AI SaaS product and 237 buyers for an AI calling agent.',
			),
			'faq'    => array(
				array( 'What SaaS video formats do you make?', 'Product demos, short explainers, founder-led ads and UGC-style testimonials, each cut in several lengths and aspect ratios for testing.' ),
				array( 'Do you need access to our product?', 'A screen recording or a demo account is enough. We script the video around one clear use case and your best customer outcome.' ),
				array( 'How quickly do you deliver?', 'Most creatives are delivered in 24–48 hours after the brief, so you can keep testing new angles every week.' ),
			),
		),
		'agency-owners'                         => array(
			'niches' => array( 'Agency Scaling' ),
			'h2'     => 'White label video ads your clients will think you made',
			'p'      => array(
				'Agencies win and keep clients on creative. We produce white label video ads under your brand, with no Million Dollar Media logos or contact with your clients, so you can offer more ad volume and better results without hiring editors.',
				'Our 9 agency scaling case studies include 1,890 leads at $6.72 each on $12,707 of spend, $15,900 closed in 10 days for a home services agency and $14,040 from 180 verified appointments.',
			),
			'faq'    => array(
				array( 'Is the work fully white label?', 'Yes. Files are delivered without our branding, and we never contact your clients unless you ask us to join a call.' ),
				array( 'How many creatives can you deliver per month?', 'From a few videos to 10+ per client per month. Bigger monthly volume lowers the price per creative.' ),
				array( 'Can you also run ads for our clients?', 'Yes. Some agencies use us only for creative, others for done-with-you media buying and funnels.' ),
			),
		),
		'home-service-business'                 => array(
			'niches' => array( 'Home Services', 'Roofing', 'HVAC', 'Solar' ),
			'h2'     => 'One lead system for every home service trade',
			'p'      => array(
				'Roofing, HVAC, plumbing, solar, remodeling and home care all have the same problem: shared leads are expensive and rarely answer the phone. We build each business its own video ads and qualifying funnel, so every lead is local, verified and exclusive.',
				'Our home service case studies include 686 roofing leads in 8 days, 326 HVAC leads in 26 days, 337 kitchen remodeling appointments in 19 days and 300 solar leads at $14.71 each.',
			),
			'faq'    => array(
				array( 'Which home service trades do you work with?', 'Roofing, HVAC, plumbing, solar, remodeling, flooring, home care and other local service businesses.' ),
				array( 'Do I need my own ad account?', 'Yes, the ads run in your own Meta ad account so the data and leads stay yours. We help you set it up if needed.' ),
				array( 'How do you stop fake leads?', 'Qualifying questions, service-area targeting and phone verification filter out fake or out-of-area requests.' ),
			),
		),
		'strategic-video-marketing-for-coaches' => array(
			'niches' => array( 'Coaching & Consulting', 'Webinar' ),
			'h2'     => 'Coaching and consulting results from real ad accounts',
			'p'      => array(
				'Coaches sell trust. Our video ads and VSLs put your expertise in front of the right audience, then a funnel moves them to a webinar, application or booked call.',
				'Our coaching and consulting case studies include $115,500 in revenue from 174 appointments, $56,645 from $21,159 of ad spend and 398 leads in 3 days at $5.50 each.',
			),
			'faq'    => array(
				array( 'Do you write the VSL script?', 'Yes. We script, edit and test VSLs and short-form ads around your offer and best client results.' ),
				array( 'Do you run webinar funnels?', 'Yes. Several case studies below are webinar and live event campaigns.' ),
				array( 'Is this done for you or done with you?', 'Both options exist: fully done-for-you creative and ads, or done-with-you coaching for your in-house team.' ),
			),
		),
	);
}

function mdm_seo_niche_section( $slug, $part = 'all' ) {
	$n = mdm_seo_niches();
	if ( empty( $n[ $slug ] ) || ! function_exists( 'mdm_shortcode_case_studies' ) ) {
		return '';
	}
	$c = $n[ $slug ];

	// Stat cards from this industry's real case studies: the count + two headline results.
	$want  = array_map( 'strtolower', $c['niches'] );
	$items = array_values( array_filter( mdm_case_items( 'all' ), static function ( $it ) use ( $want ) { return in_array( strtolower( $it['niche'] ), $want, true ); } ) );
	$stats = array( array( (string) count( $items ), 'verified case studies' ) );
	// Best revenue, then lowest cost per lead (or most leads / appointments). Spend and vague labels are skipped.
	$best = array();
	foreach ( $items as $it ) {
		foreach ( (array) $it['metrics'] as $m ) {
			if ( ! preg_match( '/^([$€£]?)([\d][\d,.]*)\s?([KkMm]?)[x%]?\s+(.+)$/u', $m, $mm ) ) {
				continue;
			}
			$val = (float) str_replace( ',', '', $mm[2] ) * ( 'k' === strtolower( $mm[3] ) ? 1e3 : ( 'm' === strtolower( $mm[3] ) ? 1e6 : 1 ) );
			$lab = strtolower( $mm[4] );
			$typ = preg_match( '/revenue|cash|sales/', $lab ) ? 'rev' : ( false !== strpos( $lab, 'cost per lead' ) ? 'cpl' : ( preg_match( '/^leads/', $lab ) ? 'leads' : ( preg_match( '/appointment|call|booked/', $lab ) ? 'appt' : '' ) ) );
			if ( ! $typ || ( 'cpl' === $typ && $val <= 0 ) ) {
				continue;
			}
			$better = ! isset( $best[ $typ ] ) || ( 'cpl' === $typ ? $val < $best[ $typ ][0] : $val > $best[ $typ ][0] );
			if ( $better ) {
				$best[ $typ ] = array( $val, trim( $mm[1] . $mm[2] . $mm[3] ), 'cpl' === $typ ? 'lowest cost per lead' : ( 'rev' === $typ ? 'revenue for one client' : $mm[4] ) );
			}
		}
	}
	foreach ( array( 'rev', 'cpl', 'leads', 'appt' ) as $typ ) {
		if ( isset( $best[ $typ ] ) && count( $stats ) < 3 ) {
			$stats[] = array( $best[ $typ ][1], $best[ $typ ][2] );
		}
	}
	$label = $c['niches'][0];
	$links = array(
		array( '/case-studies/', 'All 247 case studies' ),
		array( '/portfolio/', 'Video ad examples' ),
		array( '/what-is-a-vsl/', 'What is a VSL?' ),
	);

	ob_start();
	?>
	<div class="mdm-niche mdm-niche--dark" id="results">
		<section class="mdm-niche__top">
			<div class="mdm-niche__copy">
				<span class="mdm-niche__pill">Real results</span>
				<h2 class="mdm-display mdm-niche__h2"><?php echo esc_html( $c['h2'] ); ?></h2>
				<?php foreach ( $c['p'] as $p ) : ?><p><?php echo esc_html( $p ); ?></p><?php endforeach; ?>
				<?php
				$guides = array(
					'roofing-video-marketing-services' => array( '/facebook-ads-for-roofers/', 'Read the guide: Facebook ads for roofers, with real lead costs' ),
					'hvac-video-marketing-services'    => array( '/hvac-facebook-ads/', 'Read the guide: Facebook ads for HVAC, from lead to installation' ),
				);
				if ( isset( $guides[ $slug ] ) ) :
					?>
					<a class="mdm-niche__guide" href="<?php echo esc_url( home_url( $guides[ $slug ][0] ) ); ?>"><?php echo esc_html( $guides[ $slug ][1] ); ?> <i aria-hidden="true">→</i></a>
				<?php endif; ?>
			</div>
			<?php if ( count( $items ) ) : ?>
				<ul class="mdm-niche__stats">
					<?php foreach ( $stats as $i => $st ) : ?>
						<li<?php echo 0 === $i ? ' class="is-red"' : ''; ?>><b><?php echo esc_html( $st[0] ); ?></b><span><?php echo esc_html( 0 === $i ? $label . ' ' . $st[1] : $st[1] ); ?></span></li>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>
		</section>
		<?php
		echo mdm_shortcode_case_studies( array( 'cat' => 'all', 'niche' => implode( '|', $c['niches'] ), 'limit' => '8', 'eyebrow' => 'Case studies', 'title' => 'Proof from this industry', 'badge' => '', 'subtitle' => 'Tap any card to see the proof video or dashboard.' ) ); // phpcs:ignore
		?>
	</div>
	<?php
	$top = ob_get_clean();
	ob_start();
	?>
	<div class="mdm-niche mdm-niche--dark mdm-niche--faqonly">
		<section class="mdm-niche__faqwrap">
			<div class="mdm-niche__faqhead">
				<span class="mdm-niche__pill">FAQ</span>
				<h2 class="mdm-display mdm-niche__h2">Questions we get asked</h2>
				<p>Still unsure? We answer the rest on a free 20-minute call.</p>
				<div class="mdm-niche__btns">
					<a class="mdm-niche__btn is-red" href="<?php echo esc_url( home_url( '/book-your-call/' ) ); ?>">Book a free strategy call</a>
				</div>
			</div>
			<div class="mdm-niche__faqs">
				<?php foreach ( $c['faq'] as $k => $f ) : ?>
					<details class="mdm-niche__faq"<?php echo 0 === $k ? ' open' : ''; ?>><summary><?php echo esc_html( $f[0] ); ?></summary><p><?php echo esc_html( $f[1] ); ?></p></details>
				<?php endforeach; ?>
				<nav class="mdm-niche__more" aria-label="Related">
					<?php foreach ( $links as $l ) : ?><a href="<?php echo esc_url( home_url( $l[0] ) ); ?>"><?php echo esc_html( $l[1] ); ?> <i aria-hidden="true">→</i></a><?php endforeach; ?>
				</nav>
			</div>
		</section>
	</div>
	<?php
	$faq = ob_get_clean();
	return 'top' === $part ? $top : ( 'faq' === $part ? $faq : $top . $faq );
}

add_filter(
	'the_content',
	static function ( $content ) {
		if ( is_admin() || ! is_page() || ! in_the_loop() || ! is_main_query() ) {
			return $content;
		}
		$slug = get_post_field( 'post_name', get_queried_object_id() );
		$n    = mdm_seo_niches();
		if ( empty( $n[ $slug ] ) || false !== strpos( $content, 'mdm-niche__top' ) ) {
			return $content;
		}
		// Industry videos right after the hero, then results and case studies; the chat-style FAQ at the end.
		$faq = function_exists( 'mdm_industry_faq_html' ) ? mdm_industry_faq_html( $slug ) : '';
		return ( function_exists( 'mdm_industry_videos_html' ) ? mdm_industry_videos_html( $slug ) : '' ) . mdm_seo_niche_section( $slug, 'top' ) . $content . ( $faq ? $faq : mdm_seo_niche_section( $slug, 'faq' ) );
	},
	30
);

/* ------------------------------------------------------------------ */
/* Blog posts: related services + proof (internal links)               */
/* ------------------------------------------------------------------ */

add_filter(
	'the_content',
	static function ( $content ) {
		if ( is_admin() || ! is_singular( 'post' ) || ! in_the_loop() || ! is_main_query() || false !== strpos( $content, 'mdm-related' ) ) {
			return $content;
		}
		$id   = get_queried_object_id();
		$slug = get_post_field( 'post_name', $id );
		$text = strtolower( $slug . ' ' . get_the_title( $id ) );

		// Services that match the article's topic.
		$topics = array(
			'roof'        => array( '/roofing-video-marketing-services/', 'Roofing ads & video marketing' ),
			'hvac'        => array( '/hvac-video-marketing-services/', 'HVAC advertising & video ads' ),
			'plumb'       => array( '/plumbing-video-production/', 'Plumbing video production' ),
			'white-label' => array( '/agency-owners/', 'White label video ads for agencies' ),
			'agency'      => array( '/agency-owners/', 'White label video ads for agencies' ),
			'vsl'         => array( '/strategic-video-marketing-for-coaches/', 'Video marketing for coaches' ),
		);
		$services = array();
		foreach ( $topics as $kw => $l ) {
			if ( false !== strpos( $text, $kw ) ) {
				$services[ $l[0] ] = $l;
			}
		}
		$services['/home-service-business/'] = array( '/home-service-business/', 'Home service video ads' );
		$services['/case-studies/']          = array( '/case-studies/', '247 case studies' );
		$services['/portfolio/']             = array( '/portfolio/', 'Video ad examples' );
		$services                            = array_slice( array_values( $services ), 0, 4 );

		// Three related articles: same topic first, then the newest.
		$cats    = wp_get_post_categories( $id );
		$related = get_posts( array( 'numberposts' => 3, 'post__not_in' => array( $id ), 'category__in' => $cats, 'post_status' => 'publish' ) );
		if ( count( $related ) < 3 ) {
			$related = array_merge( $related, get_posts( array( 'numberposts' => 3 - count( $related ), 'post__not_in' => array_merge( array( $id ), wp_list_pluck( $related, 'ID' ) ), 'post_status' => 'publish' ) ) );
		}

		$html = '<aside class="mdm-related"><p class="mdm-related__label">Keep reading</p><h2>Related articles</h2><div class="mdm-related__grid">';
		foreach ( $related as $r ) {
			$c     = get_the_category( $r->ID );
			$min   = function_exists( 'mdm_blog_read_minutes' ) ? mdm_blog_read_minutes( $r->ID ) : 0;
			$cover = function_exists( 'mdm_blog_cover' ) ? mdm_blog_cover( $r->ID ) : '';
			$html .= '<a class="mdm-related__card" href="' . esc_url( get_permalink( $r ) ) . '"><span class="mdm-related__img">' . $cover . '</span><span class="mdm-related__body"><span class="mdm-related__meta">' . ( $c ? esc_html( $c[0]->name ) : 'Blog' ) . ( $min ? ' · ' . (int) $min . ' min read' : '' ) . '</span><span class="mdm-related__title">' . esc_html( get_the_title( $r ) ) . '</span></span></a>';
		}
		$html .= '</div><div class="mdm-related__services"><span>Related services:</span>';
		foreach ( $services as $l ) {
			$html .= '<a href="' . esc_url( home_url( $l[0] ) ) . '">' . esc_html( $l[1] ) . '</a>';
		}
		$html .= '</div><p class="mdm-related__ctawrap"><a class="mdm-related__cta" href="' . esc_url( home_url( '/book-your-call/' ) ) . '">Book a free strategy call →</a></p></aside>';
		return $content . $html;
	},
	30
);

/* ------------------------------------------------------------------ */
/* Service schema on service pages                                     */
/* ------------------------------------------------------------------ */

add_filter(
	'rank_math/json_ld',
	static function ( $data ) {
		if ( ! is_page() && ! is_front_page() ) {
			return $data;
		}
		$slug     = is_front_page() ? '' : get_post_field( 'post_name', get_queried_object_id() );
		$services = array(
			''                                      => 'Video ad production and performance creative',
			'roofing-video-marketing-services'      => 'Roofing video ads and lead generation',
			'hvac-video-marketing-services'         => 'HVAC video ads and advertising',
			'plumbing-video-production'             => 'Plumbing video production and video ads',
			'mva'                                   => 'MVA lead generation for personal injury firms',
			'real-estate'                           => 'Real estate video marketing',
			'solar'                                 => 'Solar video ads and lead generation',
			'saas'                                  => 'SaaS video production and video ads',
			'agency-owners'                         => 'White label video ad production for agencies',
			'home-service-business'                 => 'Home service video ads and lead generation',
			'strategic-video-marketing-for-coaches' => 'Video marketing and ads for coaches',
		);
		if ( ! isset( $services[ $slug ] ) ) {
			return $data;
		}
		$e                   = mdm_seo_entry();
		$data['mdmService'] = array(
			'@type'       => 'Service',
			'name'        => $services[ $slug ],
			'serviceType' => $services[ $slug ],
			'description' => $e ? $e[1] : '',
			'url'         => is_front_page() ? home_url( '/' ) : get_permalink( get_queried_object_id() ),
			'areaServed'  => array( '@type' => 'Country', 'name' => 'United States' ),
			'provider'    => array( '@type' => 'Organization', 'name' => 'Million Dollar Media', 'url' => home_url( '/' ) ),
		);
		return $data;
	},
	99
);

/* ------------------------------------------------------------------ */
/* Alt text fallbacks                                                  */
/* ------------------------------------------------------------------ */

function mdm_seo_alt_from( $src ) {
	$name = preg_replace( '/-\d+x\d+$|-scaled$|\.[a-z0-9]+$/i', '', basename( (string) wp_parse_url( $src, PHP_URL_PATH ) ) );
	$name = trim( preg_replace( '/[-_]+/', ' ', preg_replace( '/\b(img|image|copy|final|v\d+|\d{3,})\b/i', ' ', $name ) ) );
	return $name ? ucfirst( $name ) : '';
}
add_filter(
	'wp_get_attachment_image_attributes',
	static function ( $attr, $attachment ) {
		if ( empty( $attr['alt'] ) ) {
			$t           = get_the_title( $attachment );
			$attr['alt'] = $t ? $t : mdm_seo_alt_from( isset( $attr['src'] ) ? $attr['src'] : '' );
		}
		return $attr;
	},
	20,
	2
);
// Elementor image boxes (client slider etc.): use the box title as alt text when the image has none.
add_filter(
	'elementor/image_size/get_attachment_image_html',
	static function ( $html, $settings ) {
		if ( preg_match( '/\salt=""/', $html ) || ! preg_match( '/\salt=/', $html ) ) {
			$alt = ! empty( $settings['title_text'] ) ? wp_strip_all_tags( $settings['title_text'] ) : '';
			if ( ! $alt && preg_match( '/\ssrc="([^"]+)"/', $html, $m ) ) {
				$alt = mdm_seo_alt_from( $m[1] );
			}
			if ( $alt ) {
				$html = preg_match( '/\salt=""/', $html ) ? preg_replace( '/\salt=""/', ' alt="' . esc_attr( $alt ) . '"', $html, 1 ) : preg_replace( '/<img\b/', '<img alt="' . esc_attr( $alt ) . '"', $html, 1 );
			}
		}
		return $html;
	},
	20,
	2
);

// Our custom pages print their own H1, so the theme's page title would be a second H1.
// Blog posts: the theme prints the post title as the H1, so headings inside the body that were written as H1 become H2.
add_filter(
	'the_content',
	static function ( $html ) {
		if ( ! is_singular( 'post' ) || false === stripos( $html, '<h1' ) ) {
			return $html;
		}
		return preg_replace( array( '#<h1(\s|>)#i', '#</h1>#i' ), array( '<h2$1', '</h2>' ), $html );
	},
	20
);

add_filter(
	'astra_the_title_enabled',
	static function ( $on ) {
		return is_page( array( 'our-story', 'case-studies', 'lead-generation', 'ecommerce', 'bookcall' ) ) ? false : $on;
	},
	20
);
