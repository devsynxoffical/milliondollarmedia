<?php
/**
 * Industry page hero: headline + text + buttons on the left, 3–4 real case study cards
 * from that industry on the right. Replaces the old Elementor hero (container 119bcd4).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_industry_heroes() {
	return array(
		'hvac-video-marketing-services'         => array( 'HVAC advertising & video ads', 'for HVAC businesses', 'Short video ads for tune-ups, repairs and replacements, run on Meta in your service area, with every lead pre-qualified before it reaches your team.' ),
		'roofing-video-marketing-services'      => array( 'Roofing ads & video marketing', 'for roofing companies', 'Your own roofing leads instead of shared lead lists: video ads that show your crew and your work, sent to homeowners in your service area.' ),
		'plumbing-video-production'             => array( 'Plumbing video production & ads', 'for plumbing companies', 'Short video ads for emergency calls, water heaters and repipes, run in your service area and built to fill your schedule.' ),
		'mva'                                   => array( 'MVA leads & video ads', 'for personal injury law firms', 'Exclusive motor vehicle accident leads from video ads we script, edit and run for your firm, verified before they reach your intake team.' ),
		'real-estate'                           => array( 'Real estate video marketing', 'for agents, investors & lenders', 'Video ads and funnels that bring buyers, sellers and refinance leads to your calendar, not just likes on your listings.' ),
		'solar'                                 => array( 'Solar ads & video marketing', 'for solar companies', 'Scroll-stopping solar video ads and funnels that reach homeowners with real interest, with leads checked before they reach your closers.' ),
		'saas'                                  => array( 'SaaS video production & ads', 'for SaaS companies', 'Product demos, explainer videos and paid video ads that turn viewers into trials and booked demos.' ),
		'agency-owners'                         => array( 'White label video ads', 'for agency owners', 'Scripted, edited, ready-to-run video ads under your brand, so you can sell more to your clients without hiring editors.' ),
		'home-service-business'                 => array( 'Video ads & lead generation', 'for home service businesses', 'Video ads for roofing, HVAC, plumbing and other home services, run in your area with every lead checked before it reaches you.' ),
		'strategic-video-marketing-for-coaches' => array( 'Video marketing & Facebook ads', 'for coaches & consultants', 'VSLs, short video ads and funnels that book qualified sales calls for your coaching or consulting offer.' ),
	);
}

function mdm_industry_slug() {
	if ( is_admin() || ! is_page() ) {
		return '';
	}
	$slug = get_post_field( 'post_name', get_queried_object_id() );
	$all  = mdm_industry_heroes();
	return isset( $all[ $slug ] ) ? $slug : '';
}

/** Hero photos: 4 industry scenes per page (img/industry/), each with a short service label. */
function mdm_industry_photos( $slug ) {
	$sets = array(
		'roofing-video-marketing-services'      => array( 'roofing', 'Roofing', array( array( 'Crew & project ads', 'Roofers installing new shingles' ), array( 'Contractor UGC ads', 'Roofing contractor recording a video ad on a roof' ), array( 'Homeowner testimonials', 'Homeowners shaking hands with their roofer' ), array( 'Storm damage ads', 'Roofer inspecting storm-damaged shingles' ) ) ),
		'hvac-video-marketing-services'         => array( 'hvac', 'HVAC', array( array( 'Service & repair ads', 'HVAC technician servicing an AC unit' ), array( 'Tech tip videos', 'HVAC technician recording a video tip' ), array( 'Homeowner stories', 'Homeowner adjusting a smart thermostat' ), array( 'Install showcases', 'Technician installing a mini split' ) ) ),
		'plumbing-video-production'             => array( 'plumbing', 'Plumbing', array( array( 'Repair explainers', 'Plumber fixing pipes under a sink' ), array( 'How-to tip videos', 'Plumber recording a how-to video' ), array( 'Install showcases', 'Plumber installing a water heater' ), array( 'Customer testimonials', 'Plumber talking with a happy homeowner' ) ) ),
		'home-service-business'                 => array( 'home', 'Home services', array( array( 'Electrician ads', 'Electrician working on a panel' ), array( 'Window & door ads', 'Installers fitting a new window' ), array( 'Carpet cleaning ads', 'Technician cleaning a carpet' ), array( 'Owner-led UGC ads', 'Business owner recording a video ad by his van' ) ) ),
		'mva'                                   => array( 'mva', 'MVA & PI', array( array( 'Attorney intake ads', 'Attorney consulting a client' ), array( 'Accident victim ads', 'Driver on the phone after a minor car accident' ), array( 'Lawyer video ads', 'Lawyer recording a video ad in his office' ), array( 'Client stories', 'Injured client on a call with her attorney' ) ) ),
		'real-estate'                           => array( 'realestate', 'Real estate', array( array( 'Property walkthroughs', 'Agent filming a property walkthrough video' ), array( 'Buyer stories', 'Agent handing keys to new homeowners' ), array( 'Listing videos', 'Modern family home at golden hour' ), array( 'Mortgage & refi ads', 'Mortgage advisor meeting a couple' ) ) ),
		'solar'                                 => array( 'solar', 'Solar', array( array( 'Install showcases', 'Installers mounting solar panels' ), array( 'Solar home videos', 'House with solar panels at sunset' ), array( 'Savings explainer ads', 'Solar consultant showing savings to a homeowner' ), array( 'Owner-led UGC ads', 'Solar company owner recording a video ad' ) ) ),
		'saas'                                  => array( 'saas', 'SaaS', array( array( 'Product demo videos', 'Founder recording a product demo' ), array( 'Team & launch videos', 'Software team watching a product video' ), array( 'Results explainers', 'Laptop with an analytics dashboard' ), array( 'UGC explainer ads', 'Creator filming a software explainer' ) ) ),
		'agency-owners'                         => array( 'agency', 'White label', array( array( 'Ad creative for clients', 'Agency team reviewing video ads' ), array( 'Editing done for you', 'Video editor cutting a vertical ad' ), array( 'Client-ready results', 'Agency owner presenting results to a client' ), array( 'UGC creator ads', 'Creator filming a UGC product ad' ) ) ),
		'strategic-video-marketing-for-coaches' => array( 'coach', 'Coaching', array( array( 'Talking-head videos', 'Coach recording a talking-head video' ), array( 'Client call clips', 'Coach on a video call with a client' ), array( 'Workshop & event ads', 'Coach speaking at a workshop' ), array( 'VSL production', 'Coach being filmed for a video sales letter' ) ) ),
	);
	if ( empty( $sets[ $slug ] ) ) {
		return array();
	}
	list( $file, $tag, $items ) = $sets[ $slug ];
	$base = WPMU_PLUGIN_URL . '/mdm-sections/img/industry/';
	$out  = array();
	foreach ( $items as $k => $it ) {
		$out[] = array( 'image' => $base . $file . '-' . ( $k + 1 ) . '.webp', 'tag' => $tag, 'label' => $it[0], 'alt' => $it[1] );
	}
	return $out;
}

/** Up to 4 case studies of this industry with an image (topped up with other lead gen cases if there are fewer than 3). */
function mdm_industry_cards( $slug ) {
	$niches = function_exists( 'mdm_seo_niches' ) ? mdm_seo_niches() : array();
	$want   = isset( $niches[ $slug ]['niches'] ) ? array_map( 'strtolower', $niches[ $slug ]['niches'] ) : array();
	if ( ! function_exists( 'mdm_case_items' ) ) {
		return array();
	}
	$mine = array();
	$rest = array();
	foreach ( mdm_case_items( 'leadgen' ) as $it ) {
		if ( empty( $it['image'] ) ) {
			continue;
		}
		if ( in_array( strtolower( $it['niche'] ), $want, true ) ) {
			$mine[] = $it;
		} else {
			$rest[] = $it;
		}
	}
	$cards = array_slice( $mine, 0, 4 );
	if ( count( $cards ) < 3 ) {
		$cards = array_merge( $cards, array_slice( $rest, 0, 4 - count( $cards ) ) );
	}
	return $cards;
}

function mdm_industry_hero_html( $slug ) {
	$h     = mdm_industry_heroes()[ $slug ];
	$cards = mdm_industry_photos( $slug );
	$n     = count( $cards );
	ob_start();
	?>
	<section class="mdm-ihero">
		<div class="mdm-ihero__in">
			<div class="mdm-ihero__copy">
				<span class="mdm-ihero__pill"><i></i>Your all-in-one video ad agency</span>
				<h1 class="mdm-ihero__h1"><?php echo esc_html( $h[0] ); ?> <span><?php echo esc_html( $h[1] ); ?></span></h1>
				<p class="mdm-ihero__sub"><?php echo esc_html( $h[2] ); ?></p>
				<div class="mdm-ihero__btns">
					<a class="mdm-ihero__btn is-red" href="<?php echo esc_url( MDM_Sections::cta_url() ); ?>">Book a free strategy call <em><?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?></em></a>
					<a class="mdm-ihero__btn" href="#results">See the results</a>
				</div>
				<ul class="mdm-ihero__trust">
					<li><b>247+</b> verified case studies</li>
					<li><b>12 yrs</b> making video ads</li>
					<li><b>Done for you:</b> script, edit &amp; ads</li>
				</ul>
			</div>
			<?php if ( $n ) : ?>
				<div class="mdm-ihero__cards is-<?php echo (int) $n; ?>">
					<?php foreach ( $cards as $i => $c ) : ?>
						<a class="mdm-ihero__card" href="#results" style="--i:<?php echo (int) $i; ?>">
							<img src="<?php echo esc_url( $c['image'] ); ?>" alt="<?php echo esc_attr( $c['alt'] ); ?>" width="720" height="900" <?php echo $i < 2 ? 'fetchpriority="high"' : 'loading="lazy"'; ?> decoding="async" class="skip-lazy no-lazyload" data-no-lazy="1">
							<span class="mdm-ihero__tag"><?php echo esc_html( $c['tag'] ); ?></span>
							<span class="mdm-ihero__metric"><?php echo esc_html( $c['label'] ); ?></span>
						</a>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

add_filter(
	'body_class',
	static function ( $c ) {
		if ( mdm_industry_slug() ) {
			$c[] = 'mdm-service';
		}
		return $c;
	}
);

add_filter(
	'the_content',
	static function ( $content ) {
		if ( ! in_the_loop() || ! is_main_query() || false !== strpos( $content, 'class="mdm-ihero"' ) ) {
			return $content;
		}
		$slug = mdm_industry_slug();
		return $slug ? mdm_industry_hero_html( $slug ) . $content : $content;
	},
	31
);

/* ------------------------------------------------------------------ */
/* Each service page shows only its own industry's video ads, taken    */
/* live from the matching Portfolio tab(s) (page 380).                 */
/* ------------------------------------------------------------------ */

function mdm_industry_video_tabs() {
	return array(
		'roofing-video-marketing-services' => array( 'Roofing' ),
		'hvac-video-marketing-services'    => array( 'HVAC' ),
		'solar'                            => array( 'Solar' ),
		'mva'                              => array( 'MVA' ),
		'saas'                             => array( 'SAAS' ),
		'agency-owners'                    => array( 'Agency Owner' ),
		'home-service-business'            => array( 'Electrician', 'Window & Doors', 'Carpet Cleaning' ),
		// plumbing, real estate and coaches: no matching portfolio category yet, so no video section.
	);
}

/** array( tab title => array( vimeo urls ) ) from the Portfolio page's Elementor tabs. */
function mdm_portfolio_tab_videos() {
	$pid  = 380;
	$key  = 'mdm_pf_tabs_' . get_post_modified_time( 'U', true, $pid );
	$hit  = get_transient( $key );
	if ( is_array( $hit ) ) {
		return $hit;
	}
	$out  = array();
	$data = json_decode( (string) get_post_meta( $pid, '_elementor_data', true ), true );
	$find = static function ( $nodes ) use ( &$find ) {
		foreach ( (array) $nodes as $n ) {
			if ( isset( $n['widgetType'] ) && 'nested-tabs' === $n['widgetType'] && ! empty( $n['settings']['tabs'] ) && count( $n['settings']['tabs'] ) > 3 ) {
				return $n;
			}
			$r = $find( isset( $n['elements'] ) ? $n['elements'] : array() );
			if ( $r ) {
				return $r;
			}
		}
		return null;
	};
	$tabs = $find( $data );
	if ( $tabs ) {
		foreach ( $tabs['settings']['tabs'] as $i => $t ) {
			$urls = array();
			$walk = static function ( $nodes ) use ( &$walk, &$urls ) {
				foreach ( (array) $nodes as $m ) {
					if ( isset( $m['widgetType'] ) && 'video' === $m['widgetType'] && isset( $m['settings']['video_type'] ) && 'vimeo' === $m['settings']['video_type'] && ! empty( $m['settings']['vimeo_url'] ) ) {
						$urls[] = $m['settings']['vimeo_url'];
					}
					$walk( isset( $m['elements'] ) ? $m['elements'] : array() );
				}
			};
			$walk( isset( $tabs['elements'][ $i ] ) ? array( $tabs['elements'][ $i ] ) : array() );
			$out[ trim( $t['tab_title'] ) ] = array_values( array_unique( $urls ) );
		}
	}
	set_transient( $key, $out, DAY_IN_SECONDS );
	return $out;
}

function mdm_industry_videos_html( $slug ) {
	$map = mdm_industry_video_tabs();
	if ( empty( $map[ $slug ] ) || ! function_exists( 'mdm_video_thumb' ) ) {
		return '';
	}
	$all  = mdm_portfolio_tab_videos();
	$urls = array();
	foreach ( $map[ $slug ] as $tab ) {
		if ( ! empty( $all[ $tab ] ) ) {
			$urls = array_merge( $urls, $all[ $tab ] );
		}
	}
	$urls = array_slice( array_values( array_unique( $urls ) ), 0, 8 ); // two rows of four
	if ( ! $urls ) {
		return '';
	}
	$names = array(
		'roofing-video-marketing-services' => 'Roofing',
		'hvac-video-marketing-services'    => 'HVAC',
		'solar'                            => 'Solar',
		'mva'                              => 'MVA & personal injury',
		'saas'                             => 'SaaS',
		'agency-owners'                    => 'Agency',
		'home-service-business'            => 'Home service',
	);
	$label = isset( $names[ $slug ] ) ? $names[ $slug ] : 'Industry';
	$subs  = array(
		'roofing-video-marketing-services' => 'Real ads we made for roofing companies.',
		'hvac-video-marketing-services'    => 'Real ads we made for HVAC companies.',
		'solar'                            => 'Real ads we made for solar companies.',
		'mva'                              => 'Real ads we made for MVA and personal injury law firms.',
		'saas'                             => 'Real ads we made for SaaS companies.',
		'agency-owners'                    => 'Real white label ads we made for agency owners.',
		'home-service-business'            => 'Real ads we made for electricians, window & door and carpet cleaning companies.',
	);
	// Same video cards as the home page (muted autoplay preview, unmute, flip-in), via the reels grid.
	$items = array();
	foreach ( $urls as $u ) {
		if ( preg_match( '~vimeo\.com/(?:video/)?(\d+)~', $u, $m ) ) {
			$items[] = array( 'label' => $label, 'src' => 'https://vimeo.com/' . $m[1], 'type' => 'vimeo', 'poster' => mdm_video_thumb( 'https://vimeo.com/' . $m[1], 'vimeo' ) );
		}
	}
	if ( ! $items || ! function_exists( 'mdm_shortcode_reels' ) ) {
		return '';
	}
	$src = static function () use ( $items ) {
		return array( 'items' => $items, 'more' => home_url( '/portfolio/' ) );
	};
	add_filter( 'mdm_reels_source', $src, 999 );
	add_filter( 'mdm_reels_featured', '__return_empty_array', 999 );
	$grid = mdm_shortcode_reels( array( 'head' => 'no', 'intro' => '', 'rows' => 2, 'more_text' => 'See all video ad examples', 'platforms_title' => 'Built for every feed your customers scroll.' ) );
	remove_filter( 'mdm_reels_source', $src, 999 );
	remove_filter( 'mdm_reels_featured', '__return_empty_array', 999 );

	return '<section class="mdm-ivids mdm-ivids--reels"><div class="mdm-ivids__in">'
		. '<span class="mdm-niche__pill">Our work</span>'
		. '<h2 class="mdm-display mdm-ivids__h2">' . esc_html( $label ) . ' video ads we made</h2>'
		. '<p class="mdm-ivids__sub">' . esc_html( $subs[ $slug ] ?? 'Real ads from our clients.' ) . ' They play as you scroll. Tap Unmute to hear one.</p>'
		. '</div>' . $grid . '</section>';
}

/* ------------------------------------------------------------------ */
/* Service pages: the same chat-style FAQ as the main pages, with      */
/* questions written for that industry.                                */
/* ------------------------------------------------------------------ */

function mdm_industry_faq_items( $slug ) {
	$who = array(
		'roofing-video-marketing-services'      => 'roofing companies',
		'hvac-video-marketing-services'         => 'HVAC companies',
		'plumbing-video-production'             => 'plumbing companies',
		'home-service-business'                 => 'home service businesses',
		'mva'                                   => 'personal injury law firms',
		'real-estate'                           => 'agents, investors and lenders',
		'solar'                                 => 'solar companies',
		'saas'                                  => 'SaaS companies',
		'strategic-video-marketing-for-coaches' => 'coaches and consultants',
		'agency-owners'                         => 'agency owners',
	);
	$niches = function_exists( 'mdm_seo_niches' ) ? mdm_seo_niches() : array();
	if ( empty( $who[ $slug ] ) || empty( $niches[ $slug ] ) ) {
		return array();
	}
	$w   = $who[ $slug ];
	$n   = $niches[ $slug ];
	$hero = mdm_industry_heroes()[ $slug ];
	$lead = ! in_array( $slug, array( 'saas', 'agency-owners', 'strategic-video-marketing-for-coaches' ), true );

	$items   = array();
	$items[] = array( 'cat' => 'services', 'q' => 'What do you make for ' . $w . '?', 'a' => $hero[2] . ' That means scripts, VSLs, short video ads, UGC-style testimonials, AI videos and image or GIF ad variations, plus the Meta campaigns and funnels behind them.', 'tags' => array( 'Video ads', 'Meta Ads', 'Funnels' ) );
	if ( ! empty( $n['faq'][0] ) ) {
		$items[] = array( 'cat' => 'services', 'q' => $n['faq'][0][0], 'a' => $n['faq'][0][1], 'tags' => array( 'Strategy' ) );
	}
	$items[] = array( 'cat' => 'services', 'q' => 'Do you also run the ads or only make the videos?', 'a' => 'Both. You can take the creative only, or let us run the media buying too. Most ' . $w . ' choose both, because testing new hooks and scaling the winners is much faster under one roof.', 'tags' => array( 'Media buying', 'Creative' ) );
	if ( $lead ) {
		$items[] = array( 'cat' => 'services', 'q' => 'Are the leads exclusive to my business?', 'a' => 'Yes. The ads run for your brand only, so every lead that comes in is yours. We do not sell or share leads with other companies.', 'tags' => array( 'Exclusive leads' ) );
	} elseif ( 'agency-owners' === $slug ) {
		$items[] = array( 'cat' => 'services', 'q' => 'Can I sell the videos to my clients under my own brand?', 'a' => 'Yes. Everything is fully white label: no Million Dollar Media branding on the videos or files, and we can work quietly in the background of your client accounts.', 'tags' => array( 'White label' ) );
	}
	if ( ! empty( $n['faq'][1] ) ) {
		$items[] = array( 'cat' => 'process', 'q' => $n['faq'][1][0], 'a' => $n['faq'][1][1], 'tags' => array( 'Launch' ) );
	}
	$items[] = array( 'cat' => 'process', 'q' => 'How fast do you deliver the videos?', 'a' => 'Most images, GIFs and videos are delivered in 24–48 hours. Bigger batches roll out in stages so there is always fresh creative to test, and revision rounds are included before anything goes live.', 'tags' => array( '24–48 hours', 'Revisions' ) );
	$items[] = array( 'cat' => 'process', 'q' => 'Do I need to film anything or be on camera?', 'a' => 'No. We can use UGC creators, AI avatars or voice-over with b-roll. If you or your team want to be on camera, we write the script and edit the footage you record on your phone.', 'tags' => array( 'UGC', 'AI avatars' ) );
	$items[] = array( 'cat' => 'process', 'q' => 'What do you need from me to get started?', 'a' => 'One short questionnaire about your offer, service area and ideal customer, plus access to your ad account if we run the ads. We handle the strategy, scripts, production and editing from there.', 'tags' => array( 'Onboarding' ) );
	if ( ! empty( $n['faq'][2] ) ) {
		$items[] = array( 'cat' => 'results', 'q' => $n['faq'][2][0], 'a' => $n['faq'][2][1], 'tags' => array( 'Quality' ) );
	}
	if ( ! empty( $n['p'][1] ) ) {
		$items[] = array( 'cat' => 'results', 'q' => 'What results have you gotten for ' . $w . '?', 'a' => $n['p'][1] . ' Every number comes from a client ad account or CRM, and you can open each one in our case studies.', 'tags' => array( 'Case studies', 'Real numbers' ) );
	}
	$items[] = array( 'cat' => 'results', 'q' => 'How much does it cost?', 'a' => 'You can pay per creative with no retainer: images from $14.97, GIFs from $24.97 and videos from $34.97, or 10 videos for $299. For a full done-for-you program with ads and funnels, book a free call and we will quote it for you.', 'tags' => array( 'Pricing', 'No retainer' ) );
	$items[] = array( 'cat' => 'results', 'q' => 'How do I get started?', 'a' => 'Book a free strategy call. We look at your offer and current ads, show you the case studies closest to your business and recommend the plan that fits, with no pressure.', 'tags' => array( 'Free call' ) );
	return $items;
}

function mdm_industry_faq_html( $slug ) {
	$items = mdm_industry_faq_items( $slug );
	if ( ! $items || ! function_exists( 'mdm_shortcode_faq' ) ) {
		return '';
	}
	$who = array(
		'roofing-video-marketing-services'      => 'roofers',
		'hvac-video-marketing-services'         => 'HVAC owners',
		'plumbing-video-production'             => 'plumbers',
		'home-service-business'                 => 'home service owners',
		'mva'                                   => 'law firms',
		'real-estate'                           => 'real estate pros',
		'solar'                                 => 'solar companies',
		'saas'                                  => 'SaaS founders',
		'strategic-video-marketing-for-coaches' => 'coaches',
		'agency-owners'                         => 'agency owners',
	);
	return '<div class="mdm-ifaq">' . mdm_shortcode_faq(
		array(
			'title'    => 'What ' . $who[ $slug ] . ' ask us.',
			'subtitle' => 'Pick a question and get a straight answer, the same way we would answer it on a call. Or type your own.',
		),
		$items
	) . '</div>';
}

/* Case study hub pages (indexed, gaining impressions): link to every industry service page. */
add_filter(
	'the_content',
	static function ( $content ) {
		if ( is_admin() || ! in_the_loop() || ! is_main_query() || ! is_page( array( 'case-studies', 'lead-generation', 'ecommerce' ) ) ) {
			return $content;
		}
		if ( ( function_exists( 'mdm_current_case' ) && mdm_current_case() ) || false !== strpos( $content, 'mdm-indlinks' ) ) {
			return $content;
		}
		$html = '<section class="mdm-indlinks"><div class="mdm-indlinks__in"><span class="mdm-niche__pill">Industries we serve</span><h2 class="mdm-indlinks__h2">Video ads and lead generation by industry</h2><div class="mdm-indlinks__grid">';
		foreach ( mdm_industry_heroes() as $slug => $h ) {
			$html .= '<a href="' . esc_url( home_url( '/' . $slug . '/' ) ) . '"><b>' . esc_html( $h[0] ) . '</b><span>' . esc_html( $h[1] ) . '</span></a>';
		}
		return $content . $html . '</div></div></section>';
	},
	40
);

// Service pages: no site-wide client testimonials block (each page shows its own industry videos and case studies instead).
add_filter(
	'mdm_voices_everywhere',
	static function ( $on ) {
		return mdm_industry_slug() ? false : $on;
	}
);
