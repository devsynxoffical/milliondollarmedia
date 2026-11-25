<?php
/**
 * More [mdm_landing] pages (SEO plan 25 Nov 2026):
 *   /commercial-video-production/       commercial video production
 *   /video-marketing-agency/            video marketing agency, best video marketing agency
 *   /video-production/los-angeles-ca/   video production company los angeles (owner confirmed a real LA address)
 * Same template and design as /video-ad-agency/. Only published prices and case-study results are used.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter(
	'mdm_landing_pages',
	static function ( $pages ) {
		$ecom  = function_exists( 'mdm_landing_ecom_counts' ) ? mdm_landing_ecom_counts() : array( 'total' => 123 );
		$cs    = '/case-study/';
		$steps = array(
			array( 'Brief', 'One short questionnaire about your offer, audience, platforms and what converts today.' ),
			array( 'Scripts', 'Hook-first scripts and shot lists written for each placement.' ),
			array( 'Production', 'Creators, AI avatars, voice-over with B-roll, or footage your team films with our shot list.' ),
			array( 'Edit & delivery', 'Captions, motion graphics and sound, delivered in 24 to 48 hours for most videos.' ),
			array( 'Test & scale', 'Run the versions, keep the winners and replace the rest.' ),
		);

		$pages['commercial-video-production'] = array(
			'pill'    => 'Commercial video production',
			'h1'      => array( 'Commercial Video Production', 'for brands that sell online and locally' ),
			'lead'    => 'Million Dollar Media is a commercial video production company for brands that need videos that sell, not just look good: ad commercials, product demos, UGC-style spots, VSLs and social cutdowns, scripted, produced and edited in-house and delivered in 24 to 48 hours from $34.97 per video.',
			'lead2'   => '<b>What is commercial video production?</b> It is the process of planning, scripting, filming or generating, and editing a video whose job is to promote a business, usually as an ad on social platforms, YouTube, streaming TV or a website. Performance commercials are judged by the leads and sales they bring, so they are built to be tested in several versions.',
			'cta'     => 'Get a free video plan',
			'stats'   => array( array( '247', 'published case studies' ), array( '24 to 48h', 'typical delivery' ), array( '$34.97', 'per video, no retainer' ), array( '15', 'industries in our portfolio' ) ),
			'tabs'    => array( 'All' ),
			'vlabel'  => 'Commercial video',
			'vh2'     => 'Commercials and ads we produced',
			'vsub'    => 'A mix of commercial formats and industries from our portfolio.',
			'cards_h' => 'What our commercial video production includes',
			'cards'   => array(
				array( 'Ad commercials', '15 to 60 second spots for Facebook, Instagram, TikTok and YouTube, cut in several hook versions.', '/video-ad-agency/', 'Video ad agency' ),
				array( 'Product demos', 'The product working in the first seconds, with captions for viewers on mute.', '/product-video-ads/', 'Product video ads' ),
				array( 'UGC-style commercials', 'A creator or customer talking straight to camera, filmed like a phone video.', '/ugc-ads-examples/', 'UGC ads examples' ),
				array( 'VSLs', 'Longer sales videos for landing pages, webinars and high-ticket offers.', '/what-is-a-vsl/', 'What is a VSL?' ),
				array( 'Social cutdowns', 'Vertical 9:16, square and horizontal versions of each commercial for every placement.', '', '' ),
				array( 'Image and GIF ads', 'Static and looping creatives that support the video in retargeting.', '', '' ),
			),
			'body'    => array(
				array( 'Commercial video production pricing', '<p>Our prices are published and there is no retainer. A commercial ad video of 45 to 60 seconds costs $34.97, an AI video $44.97, 10 videos $299 and 30 videos $797. Image ads start at $14.97 and GIF ads at $24.97. Longer productions such as a full VSL with scripting and testing are quoted on a free call because the length and scope vary. See the full breakdown in <a href="/how-much-do-video-ads-cost/">how much video ads cost</a>.</p><p>The production budget is only part of the cost of a commercial. The media budget you spend to show it decides how many people see it, so we keep production lean and spend the effort on testing more versions.</p>' ),
				array( 'How we produce commercials', '<p>Most of our commercials are produced remotely. Depending on the brief, the on-camera part comes from vetted UGC creators, from AI avatars and voice-over with B-roll, or from footage your own team films with the shot list we write. Our editors then add captions, motion graphics, music and sound, and deliver every version in the aspect ratios each platform needs.</p><p>We work with brands across the United States and have a Los Angeles address. See our <a href="/video-production/los-angeles-ca/">Los Angeles video production</a> page for LA businesses.</p>' ),
				array( 'Results from commercials we produced', '<p>Every number below comes from one of our published case studies: $2.3M in sales at an 11.6x ROAS for an e-commerce store, $115,416 at a 4.39 ROAS for a skincare brand, 326 HVAC leads at $5.57 per lead, and $36,444 collected at a 19.63x return on $1,956 of ad spend for a New Jersey HVAC company. Browse all ' . (int) $ecom['total'] . ' e-commerce and 124 lead generation results in our <a href="/case-studies/">case studies</a>.</p>' ),
			),
			'cases'   => array( 'cat' => 'ecom', 'title' => 'Case studies from our commercials' ),
			'compare' => array(
				'h2'    => 'Performance commercials vs. traditional TV production',
				'intro' => 'A traditional commercial is built once and run for months. A performance commercial is built to be tested: several hooks, lengths and formats, with the winners kept and the rest replaced.',
				'head'  => array( 'Performance commercial (Million Dollar Media)', 'Traditional production' ),
				'rows'  => array(
					array( 'Main job', 'Leads and sales you can measure', 'Brand awareness' ),
					array( 'Versions', 'Several hooks and cuts per commercial', 'One or two final cuts' ),
					array( 'Turnaround', '24 to 48 hours for most videos', 'Usually weeks' ),
					array( 'Pricing', 'From $34.97 per video, no retainer', 'Quoted per production' ),
					array( 'Formats', '9:16, 1:1 and 16:9 for every placement', 'Mostly 16:9' ),
				),
			),
			'steps'   => $steps,
			'industries' => true,
			'faq'     => array(
				array( 'What is commercial video production?', 'It is the planning, scripting, filming or generating, and editing of a video that promotes a business, usually as an ad on social platforms, YouTube or a website.' ),
				array( 'How much does a commercial video cost?', 'With us, a commercial ad video costs $34.97, an AI video $44.97, 10 videos $299 and 30 videos $797, with no retainer. Full VSL productions are quoted on a free call. See <a href="/how-much-do-video-ads-cost/">how much video ads cost</a>.' ),
				array( 'How long does commercial video production take?', 'Most videos are delivered in 24 to 48 hours after the brief is approved, with revision rounds included.' ),
				array( 'Do I need to be on camera?', 'No. We can use UGC creators, AI avatars or voice-over with B-roll. If you want to appear yourself, we write the script and shot list and edit the footage you film.' ),
				array( 'Which platforms are the commercials made for?', 'Facebook, Instagram, TikTok and YouTube, in vertical, square and horizontal versions, plus website and landing page versions.' ),
				array( 'Can you also run the ads?', 'Yes. You can take the commercials only, or let us run the media buying and testing as well.' ),
			),
			'src'     => 'commercial-video-production',
			'form'    => array( 'Get a free commercial video plan', 'Tell us about your offer and we will send a short plan: the commercial formats and hooks we would test first.' ),
		);

		$pages['video-marketing-agency'] = array(
			'pill'    => 'Strategy, production and ads',
			'h1'      => array( 'Video Marketing Agency', 'strategy, production and ads under one roof' ),
			'lead'    => 'Million Dollar Media is a video marketing agency for lead generation and ecommerce brands. We plan the strategy, script and produce the videos, and run them as ads on Facebook, Instagram, TikTok and YouTube, so every video is measured by the leads and sales it brings.',
			'lead2'   => '<b>What does a video marketing agency do?</b> It decides which videos a business needs, produces them, and gets them in front of buyers through ads, social media, landing pages and email. A good one reports on leads, booked calls and sales, not on views.',
			'cta'     => 'Get a free video marketing plan',
			'stats'   => array( array( '247', 'published case studies' ), array( '15', 'industries in our portfolio' ), array( '24 to 48h', 'typical delivery' ), array( '$34.97', 'per video, no retainer' ) ),
			'tabs'    => array( 'All' ),
			'vlabel'  => 'Video marketing',
			'vh2'     => 'Videos from our client campaigns',
			'vsub'    => 'Ads, UGC-style videos and VSLs from live campaigns.',
			'cards_h' => 'Proof from our video marketing',
			'proof'   => array(
				array( '$2.3M', '11.6x ROAS', 'In sales for an e-commerce store we helped build.' ),
				array( '$115,416', '4.39 ROAS', 'From $26,271 in ad spend for a skincare brand.' ),
				array( '326 leads', '$5.57 per lead', 'For an HVAC company in 26 days.' ),
				array( '$36,444', '19.63x return', 'Collected on $1,956 of ad spend for a New Jersey HVAC company.' ),
			),
			'cards2_h' => 'What our video marketing agency does',
			'cards'   => array(
				array( 'Strategy', 'Offer, audience and angle research, then a test plan for the first 30 days.', '', '' ),
				array( 'Video production', 'UGC-style ads, product demos, AI videos and VSLs, scripted and edited in-house.', '/commercial-video-production/', 'Commercial video production' ),
				array( 'Paid video ads', 'Campaigns on Facebook, Instagram, TikTok and YouTube, with new hooks tested every week.', '/video-ad-agency/', 'Video ad agency' ),
				array( 'Landing pages and VSLs', 'Pages and sales videos that turn the click into a lead or a sale.', '/what-is-a-vsl/', 'What is a VSL?' ),
			),
			'body'    => array(
				array( 'How to choose the best video marketing agency', '<p>Use these criteria to compare any agency, including us:</p><ol><li><b>Published results.</b> Real case studies with ad spend, leads or revenue, not only showreels.</li><li><b>Testing volume.</b> Several hooks and versions per offer every month.</li><li><b>Production and ads together.</b> The team that edits the video should see how it performs.</li><li><b>Clear pricing.</b> Prices per video or per package you can check before a call.</li><li><b>Speed.</b> New creatives in days, not weeks, so the account never runs out of fresh ads.</li><li><b>Your industry.</b> Examples from businesses like yours.</li></ol><p>Our answers: <a href="/case-studies/">247 published case studies</a>, prices from $34.97 per video, most videos delivered in 24 to 48 hours, and examples from 15 industries in our <a href="/portfolio/">portfolio</a>.</p>' ),
				array( 'Video marketing for lead generation and ecommerce', '<p>For service businesses we build video ads and funnels that bring booked calls: roofing, HVAC, real estate, coaching and agencies among them. For online stores we make UGC-style reviews, product demos and offer ads, and our ' . (int) $ecom['total'] . ' e-commerce case studies show the results. See <a href="/ecommerce-video-ads/">ecommerce video ads</a> and <a href="/real-estate-video-marketing/">real estate video marketing</a>.</p>' ),
			),
			'cases'   => array( 'cat' => 'leadgen', 'niche' => 'Coaching & Consulting|Agency Scaling|Webinar|SaaS', 'title' => 'Video marketing case studies' ),
			'steps'   => $steps,
			'industries' => true,
			'faq'     => array(
				array( 'What does a video marketing agency do?', 'It plans which videos a business needs, produces them and distributes them through ads, social media, landing pages and email, then measures the leads and sales they bring.' ),
				array( 'What is the best video marketing agency?', 'The best one for you shows published results in your industry, tests many creatives each month, runs production and ads together and publishes clear pricing. Use the checklist on this page to compare agencies.' ),
				array( 'How much does a video marketing agency cost?', 'With us, videos start at $34.97 each, 10 videos cost $299 and AI videos $44.97, with no retainer. Full programs with ads management are quoted on a free call.' ),
				array( 'Video marketing agency or video ad agency: what is the difference?', 'A video ad agency focuses on paid ads. A video marketing agency also covers strategy, landing pages, VSLs and organic video. We do both.' ),
				array( 'How fast will I see results?', 'Most videos are delivered in 24 to 48 hours. How fast results come depends on your offer and budget; our case studies show the timelines for each campaign.' ),
			),
			'src'     => 'video-marketing-agency',
			'form'    => array( 'Get a free video marketing plan', 'Tell us about your business and we will send a short plan: the videos and channels we would start with.' ),
		);

		$pages['los-angeles-ca'] = array(
			'pill'    => 'Los Angeles, CA',
			'h1'      => array( 'Video Production in Los Angeles', 'video ads and marketing videos for LA businesses' ),
			'lead'    => 'Million Dollar Media is a video production and video marketing company with a Los Angeles address. We script, produce and edit video ads, UGC-style videos, real estate videos and VSLs for Los Angeles businesses, and we can run them as ads to buyers in your part of the city.',
			'lead2'   => '<b>What does a Los Angeles video production company do for a local business?</b> It turns your offer into short videos people actually watch on their phones, then puts them in front of buyers in your service area, so the result is calls, bookings and sales, not only views.',
			'cta'     => 'Get a free LA video plan',
			'stats'   => array( array( '247', 'published case studies' ), array( '24 to 48h', 'typical delivery' ), array( '$34.97', 'per video, no retainer' ), array( 'LA', 'Los Angeles address' ) ),
			'tabs'    => array( 'All' ),
			'vlabel'  => 'Video',
			'vh2'     => 'Video ads we produced',
			'vsub'    => 'Examples from our portfolio across industries.',
			'cards_h' => 'Video production for Los Angeles businesses',
			'cards'   => array(
				array( 'Real estate videos', 'Listing tours, just-sold videos and agent introduction videos for LA agents and brokerages.', '/real-estate-video-marketing/', 'Real estate video marketing' ),
				array( 'Home service video ads', 'Short ads for HVAC, roofing, plumbing and other home services across LA neighborhoods.', '/hvac-video-marketing-los-angeles/', 'HVAC video marketing in LA' ),
				array( 'Med spa and clinic ads', 'Treatment explainers and offer videos that book consultations.', '', '' ),
				array( 'E-commerce and DTC videos', 'UGC-style reviews and product demos for brands selling online.', '/ecommerce-video-ads/', 'Ecommerce video ads' ),
				array( 'Commercials and social cutdowns', 'Ad commercials in vertical, square and horizontal versions.', '/commercial-video-production/', 'Commercial video production' ),
				array( 'VSLs', 'Sales videos for coaches, consultants and high-ticket offers.', '/what-is-a-vsl/', 'What is a VSL?' ),
			),
			'body'    => array(
				array( 'Why LA businesses use video ads', '<p>In a city as busy as Los Angeles, polished brand content is easy to scroll past. The videos that win here look native to the platform: a person talking straight to camera, a real job or a real listing, captions for silent viewing and one clear offer. That is the style we produce, and we make several hook versions of each video so the ad account can find the one that works for your audience.</p><p>For local businesses the targeting matters as much as the video. We can run your ads only in the neighborhoods and zip codes you serve, from the Westside to the San Fernando Valley, so your budget reaches people who can actually become customers.</p>' ),
				array( 'A Los Angeles result from our case studies', '<p>One of our med spa clients runs video ads to patients in New York City and Los Angeles: 1,011 verified patient leads on $4,703 of ad spend in 28 days. You can see the proof in the <a href="/case-study/if-you-live-in-new-york-city-or-los-angeles-youve-probably-already/">med spa case study</a>. Our other published results include 326 HVAC leads at $5.57 per lead and $2.3M in sales at an 11.6x ROAS for an e-commerce store.</p>' ),
				array( 'Real estate videographer or video marketing partner?', '<p>A videographer films the property. A video marketing partner also writes the hook, edits versions for each platform and runs the ads that bring seller and buyer leads. LA agents can use us for both the videos and the ads, or send us existing footage and photos and we turn them into finished listing videos and ads. See <a href="/real-estate-video-marketing/">real estate video marketing</a> for the video types that bring leads.</p>' ),
				array( 'Pricing for Los Angeles video production', '<p>Our prices are the same for LA businesses as everywhere else and they are published: $34.97 per ad video, $44.97 per AI video, 10 videos for $299 and 30 videos for $797, with no retainer. Image ads start at $14.97 and GIF ads at $24.97. Larger productions and ads management are quoted on a free call. See <a href="/how-much-do-video-ads-cost/">how much video ads cost</a> for the full breakdown.</p>' ),
				array( 'How we work with LA businesses', '<p>Start with one short questionnaire about your offer, service area and ideal customer. We write hook-first scripts, produce the videos with creators, AI avatars or footage your team films with our shot list, and deliver most videos in 24 to 48 hours. If you want us to run the ads, we launch them in your area, test the versions and keep the winners.</p>' ),
			),
			'cases'   => array( 'cat' => 'leadgen', 'niche' => 'MedSpa|Real Estate|HVAC|Home Services', 'title' => 'Case studies for local businesses' ),
			'steps'   => $steps,
			'industries' => true,
			'faq'     => array(
				array( 'Do you have an office in Los Angeles?', 'Million Dollar Media has a Los Angeles address and works with businesses across Los Angeles and the rest of the United States.' ),
				array( 'How much does video production cost in Los Angeles?', 'With us, ad videos cost $34.97 each, AI videos $44.97, 10 videos $299 and 30 videos $797, with no retainer. Larger productions are quoted on a free call.' ),
				array( 'Do you make real estate videos for LA agents?', 'Yes. Listing tours, just-sold videos, neighborhood guides and agent introduction videos, plus the ads that bring seller and buyer leads.' ),
				array( 'Can you run the ads only in my part of LA?', 'Yes. Ads can be limited to the zip codes and neighborhoods you serve so the budget reaches people who can become customers.' ),
				array( 'How fast can you deliver?', 'Most videos are delivered in 24 to 48 hours after the brief is approved, with revision rounds included.' ),
				array( 'Do you only work with Los Angeles businesses?', 'No. We work with businesses across the United States; this page is for LA businesses that want a local partner.' ),
			),
			'src'     => 'video-production-los-angeles',
			'form'    => array( 'Get a free LA video plan', 'Tell us about your business and service area and we will send a short plan: the videos and hooks we would test first.' ),
		);
		return $pages;
	}
);
