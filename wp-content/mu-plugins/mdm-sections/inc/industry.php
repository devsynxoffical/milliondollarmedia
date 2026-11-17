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
	$cards = mdm_industry_cards( $slug );
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
					<?php foreach ( $cards as $i => $c ) :
						$metric = '';
						foreach ( (array) $c['metrics'] as $m ) {
							if ( false === stripos( $m, 'proof' ) ) {
								$metric = preg_replace( '/\s*headline result$/i', ' result', $m );
								break;
							}
						}
						?>
						<a class="mdm-ihero__card" href="#results" style="--i:<?php echo (int) $i; ?>">
							<img src="<?php echo esc_url( $c['image'] ); ?>" alt="<?php echo esc_attr( $c['niche'] . ' ad results: ' . $c['headline'] ); ?>" <?php echo $i < 2 ? 'fetchpriority="high"' : 'loading="lazy"'; ?> decoding="async" class="skip-lazy no-lazyload" data-no-lazy="1">
							<span class="mdm-ihero__tag"><?php echo esc_html( $c['niche'] ); ?></span>
							<?php if ( $metric ) : ?><span class="mdm-ihero__metric"><?php echo esc_html( $metric ); ?></span><?php endif; ?>
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
		if ( ! in_the_loop() || ! is_main_query() || false !== strpos( $content, 'mdm-ihero' ) ) {
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
	$urls = array_slice( array_values( array_unique( $urls ) ), 0, 8 );
	if ( ! $urls ) {
		return '';
	}
	$label = mdm_industry_heroes()[ $slug ][0];
	$tiles = '';
	foreach ( $urls as $u ) {
		if ( ! preg_match( '~vimeo\.com/(?:video/)?(\d+)~', $u, $m ) ) {
			continue;
		}
		$thumb  = mdm_video_thumb( $u, 'vimeo' );
		$player = 'https://player.vimeo.com/video/' . $m[1] . '?autoplay=1&title=0&byline=0&portrait=0&dnt=1';
		$tiles .= '<div class="mdm-ivid"><button type="button" class="mdm-vfacade" data-src="' . esc_url( $player ) . '" aria-label="Play video">'
			. ( $thumb ? '<img src="' . esc_url( $thumb ) . '" alt="' . esc_attr( $label . ' example' ) . '" loading="lazy" decoding="async">' : '' )
			. '<span class="mdm-vfacade__play" aria-hidden="true"></span></button></div>';
	}
	return '<section class="mdm-ivids"><div class="mdm-ivids__in">'
		. '<span class="mdm-niche__pill">Our work</span>'
		. '<h2 class="mdm-display mdm-ivids__h2">' . esc_html( preg_replace( '/\s*&\s*video ads$|\s*&\s*video marketing$/i', '', $label ) ) . ' videos we made</h2>'
		. '<p class="mdm-ivids__sub">Real ads from our ' . esc_html( strtolower( implode( ', ', $map[ $slug ] ) ) ) . ' clients. Tap any video to play it.</p>'
		. '<div class="mdm-ivids__grid is-' . min( 4, count( $urls ) ) . '">' . $tiles . '</div>'
		. '<p class="mdm-ivids__more"><a href="' . esc_url( home_url( '/portfolio/' ) ) . '">See all video ad examples →</a></p>'
		. '</div></section>';
}
