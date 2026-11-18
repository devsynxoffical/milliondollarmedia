<?php
/**
 * One page per case study: /case-study/<slug>/ (served through the /case-studies/ page so the theme,
 * header, footer and Rank Math work as usual). Content comes only from the case data itself plus
 * honest industry context; cases with less than 80 words of real text are noindex (thin content).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* ------------------------------------------------------------------ */
/* Registry: stable slug per case                                      */
/* ------------------------------------------------------------------ */

function mdm_case_key( $item ) {
	return md5( $item['cat'] . '|' . $item['headline'] . '|' . $item['image'] );
}

function mdm_case_clean( $text ) {
	$text = preg_replace( '/[\x{1F000}-\x{1FAFF}\x{2600}-\x{27BF}\x{2B00}-\x{2BFF}\x{1F1E6}-\x{1F1FF}\x{FE0F}\x{200D}\x{2190}-\x{21FF}]/u', '', (string) $text );
	return trim( preg_replace( '/[ \t]+/', ' ', $text ) );
}

/** Full headline: the data title is cut at ~100 characters; the story usually starts with the full one. */
function mdm_case_title( $item ) {
	$t     = mdm_case_clean( $item['headline'] );
	$t     = rtrim( $t, " .…" );
	$first = trim( strtok( mdm_case_clean( $item['desc'] ), "\n" ) );
	if ( $first && strlen( $t ) > 20 && 0 === stripos( $first, substr( $t, 0, 30 ) ) && strlen( $first ) <= 160 ) {
		$t = rtrim( $first, ' .' );
	}
	return $t;
}

function mdm_case_registry() {
	static $reg = null;
	if ( null !== $reg ) {
		return $reg;
	}
	$reg  = array( 'by_slug' => array(), 'by_key' => array() );
	$used = array();
	if ( ! function_exists( 'mdm_case_data' ) ) {
		return $reg;
	}
	foreach ( mdm_case_data() as $cat => $items ) {
		foreach ( $items as $item ) {
			$base = sanitize_title( mdm_case_title( $item ) );
			if ( strlen( $base ) > 70 ) {
				$base = substr( $base, 0, 70 );
				$base = substr( $base, 0, strrpos( $base, '-' ) ?: 70 );
			}
			$base = trim( $base, '-' ) ?: 'case-study';
			$slug = $base;
			$n    = 2;
			while ( isset( $used[ $slug ] ) ) {
				$slug = $base . '-' . $n++;
			}
			$used[ $slug ]                            = true;
			$reg['by_slug'][ $slug ]                  = $item;
			$reg['by_key'][ mdm_case_key( $item ) ] = $slug;
		}
	}
	return $reg;
}

function mdm_case_url( $item ) {
	$reg  = mdm_case_registry();
	$slug = isset( $reg['by_key'][ mdm_case_key( $item ) ] ) ? $reg['by_key'][ mdm_case_key( $item ) ] : '';
	return $slug ? home_url( '/case-study/' . $slug . '/' ) : '';
}

function mdm_case_words( $item ) {
	return str_word_count( mdm_case_clean( $item['desc'] ) );
}

function mdm_case_indexable( $item ) {
	return mdm_case_words( $item ) >= 80;
}

/** The case being viewed, or null. */
function mdm_current_case() {
	$slug = get_query_var( 'mdm_case' );
	if ( ! $slug ) {
		return null;
	}
	$reg = mdm_case_registry();
	return isset( $reg['by_slug'][ $slug ] ) ? $reg['by_slug'][ $slug ] : null;
}

/* ------------------------------------------------------------------ */
/* Routing                                                             */
/* ------------------------------------------------------------------ */

add_filter( 'query_vars', static function ( $v ) { $v[] = 'mdm_case'; return $v; } );

add_action(
	'init',
	static function () {
		add_rewrite_rule( '^case-study/([^/]+)/?$', 'index.php?pagename=case-studies&mdm_case=$matches[1]', 'top' );
		if ( '2' !== get_option( 'mdm_case_rw' ) ) {
			flush_rewrite_rules( false );
			update_option( 'mdm_case_rw', '2', false );
		}
	}
);

// Unknown case slug: a real 404.
add_action(
	'template_redirect',
	static function () {
		if ( get_query_var( 'mdm_case' ) && ! mdm_current_case() ) {
			global $wp_query;
			$wp_query->set_404();
			status_header( 404 );
		}
	},
	1
);

/* ------------------------------------------------------------------ */
/* Page content                                                        */
/* ------------------------------------------------------------------ */

/** Industry -> service page and context. */
function mdm_case_niche_info( $item ) {
	$map = array(
		'Roofing'                   => 'roofing-video-marketing-services',
		'HVAC'                      => 'hvac-video-marketing-services',
		'Legal / MVA'               => 'mva',
		'Real Estate'               => 'real-estate',
		'Mortgage & Refinance'      => 'real-estate',
		'Solar'                     => 'solar',
		'SaaS'                      => 'saas',
		'Agency Scaling'            => 'agency-owners',
		'Home Services'             => 'home-service-business',
		'Coaching & Consulting'     => 'strategic-video-marketing-for-coaches',
		'Webinar'                   => 'strategic-video-marketing-for-coaches',
		'Low-Ticket Offers'         => 'strategic-video-marketing-for-coaches',
	);
	$slug   = isset( $map[ $item['niche'] ] ) ? $map[ $item['niche'] ] : '';
	$niches = function_exists( 'mdm_seo_niches' ) ? mdm_seo_niches() : array();
	$label  = function_exists( 'mdm_industry_heroes' ) && $slug && isset( mdm_industry_heroes()[ $slug ] ) ? mdm_industry_heroes()[ $slug ][0] : '';
	if ( $slug && ! empty( $niches[ $slug ]['p'][0] ) ) {
		$text = $niches[ $slug ]['p'][0];
	} elseif ( 'ecom' === $item['cat'] ) {
		$text = 'For e-commerce and DTC brands we produce scroll-stopping video ads (UGC-style videos, product demos and AI videos), test many hooks quickly on Meta and scale the winners, measuring revenue and ROAS in the store’s own dashboard.';
	} else {
		$text = 'We build short video ads and Meta campaigns for ' . strtolower( $item['niche'] ) . ' offers, qualify every lead before it reaches the sales team and test new hooks every week. Every number we publish comes from the client’s ad account or CRM.';
	}
	return array( 'slug' => $slug, 'label' => $label, 'text' => $text );
}

/** Story text -> paragraphs and bullet lists. The first line is skipped when it repeats the headline. */
function mdm_case_story_html( $item, $title ) {
	$lines = preg_split( '/\R/', (string) $item['desc'] );
	$out   = '';
	$list  = array();
	$flush = static function () use ( &$list, &$out ) {
		if ( $list ) {
			$out .= '<ul>' . implode( '', array_map( static function ( $l ) { return '<li>' . esc_html( $l ) . '</li>'; }, $list ) ) . '</ul>';
			$list = array();
		}
	};
	foreach ( $lines as $i => $raw ) {
		$is_bullet = (bool) preg_match( '/^\s*([\x{2600}-\x{27BF}\x{1F000}-\x{1FAFF}\x{2190}-\x{21FF}]|[-•*>]|\d+[.)]\s)/u', $raw );
		$line      = mdm_case_clean( preg_replace( '/^\s*[-•*>]\s*/u', '', $raw ) );
		if ( '' === $line ) {
			$flush();
			continue;
		}
		if ( 0 === $i && 0 === stripos( $line, substr( $title, 0, 30 ) ) ) {
			continue;
		}
		if ( $is_bullet ) {
			$list[] = $line;
		} else {
			$flush();
			$out .= '<p>' . esc_html( $line ) . '</p>';
		}
	}
	$flush();
	return $out;
}

function mdm_case_metrics( $item ) {
	return array_values( array_filter( (array) $item['metrics'], static function ( $m ) { return false === stripos( $m, 'proof' ) && false === stripos( $m, 'breakdown' ); } ) );
}

function mdm_case_faq( $item, $title ) {
	$m     = mdm_case_metrics( $item );
	$same  = array_filter( mdm_case_items( $item['cat'] ), static function ( $x ) use ( $item ) { return $x['niche'] === $item['niche']; } );
	$story = trim( strtok( wordwrap( mdm_case_clean( preg_replace( '/\R+/', ' ', $item['desc'] ) ), 220, "\n" ), "\n" ) );
	return array(
		array( 'What results did this ' . $item['niche'] . ' campaign get?', ( $m ? implode( ', ', $m ) . '. ' : '' ) . ( $story ? $story . ( strlen( $story ) >= 200 ? '…' : '' ) : '' ) ),
		array( 'Are these results typical?', 'Results depend on the offer, the market and the budget. This is one of ' . count( $same ) . ' ' . $item['niche'] . ' case studies on our site, and on a free strategy call we show you the ones closest to your business.' ),
		array( 'Can you run a campaign like this for my business?', 'Yes. We script, produce and run the video ads and the funnel for you, with creatives delivered in 24–48 hours. Book a free strategy call and we will map out what we would test first.' ),
	);
}

function mdm_case_page_html( $item ) {
	$title   = mdm_case_title( $item );
	$metrics = mdm_case_metrics( $item );
	$info    = mdm_case_niche_info( $item );
	$catname = 'leadgen' === $item['cat'] ? 'Lead generation' : 'E-commerce';
	$caturl  = home_url( 'leadgen' === $item['cat'] ? '/case-studies/lead-generation/' : '/case-studies/ecommerce/' );
	$cta     = function_exists( 'mdm_pricing_call_url' ) ? mdm_pricing_call_url() : MDM_Sections::cta_url();

	$related = array();
	foreach ( mdm_case_items( $item['cat'] ) as $x ) {
		if ( $x['niche'] === $item['niche'] && mdm_case_key( $x ) !== mdm_case_key( $item ) ) {
			$related[] = $x;
		}
	}
	if ( count( $related ) < 4 ) {
		foreach ( mdm_case_items( $item['cat'] ) as $x ) {
			if ( count( $related ) >= 4 ) {
				break;
			}
			if ( $x['niche'] !== $item['niche'] && mdm_case_key( $x ) !== mdm_case_key( $item ) ) {
				$related[] = $x;
			}
		}
	}
	$related = array_slice( $related, 0, 4 );

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<div class="mdm-casepage mdm-page">
		<section class="mdm-casepage__hero">
			<div class="mdm-casepage__in">
				<nav class="mdm-casepage__crumbs" aria-label="Breadcrumb"><a href="<?php echo esc_url( home_url( '/case-studies/' ) ); ?>">Case studies</a><i>/</i><a href="<?php echo esc_url( $caturl ); ?>"><?php echo esc_html( $catname ); ?></a><i>/</i><span><?php echo esc_html( $item['niche'] ); ?></span></nav>
				<span class="mdm-niche__pill"><?php echo esc_html( $item['niche'] ); ?> case study</span>
				<h1 class="mdm-casepage__h1"><?php echo esc_html( $title ); ?></h1>
				<?php if ( $metrics ) : ?>
					<ul class="mdm-casepage__stats">
						<?php foreach ( $metrics as $i => $m ) : ?><li<?php echo 0 === $i ? ' class="is-red"' : ''; ?>><?php echo esc_html( $m ); ?></li><?php endforeach; ?>
						<li><?php echo esc_html( 'ecom' === $item['cat'] ? 'Meta video ads' : 'Meta video ads + verified leads' ); ?></li>
					</ul>
				<?php endif; ?>
				<div class="mdm-casepage__btns">
					<a class="mdm-ihero__btn is-red" href="<?php echo esc_url( $cta ); ?>">Get results like these <em><?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?></em></a>
					<a class="mdm-ihero__btn" href="#story">Read the case study</a>
				</div>
			</div>
		</section>

		<section class="mdm-casepage__main" id="story">
			<div class="mdm-casepage__in mdm-casepage__grid">
				<div class="mdm-casepage__media">
					<?php if ( ! empty( $item['video'] ) ) : ?>
						<video controls playsinline preload="metadata" poster="<?php echo esc_url( $item['image'] ); ?>" src="<?php echo esc_url( $item['video'] ); ?>"></video>
						<p class="mdm-casepage__cap">Proof video: the client’s results, recorded from the ad account or dashboard.</p>
					<?php else : ?>
						<img src="<?php echo esc_url( $item['image'] ); ?>" alt="<?php echo esc_attr( $item['niche'] . ' case study results: ' . $title ); ?>" loading="eager" decoding="async">
						<p class="mdm-casepage__cap">Proof: screenshot from the client’s ad account or dashboard.</p>
					<?php endif; ?>
				</div>
				<article class="mdm-casepage__story">
					<h2>The case study</h2>
					<?php echo mdm_case_story_html( $item, $title ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<div class="mdm-casepage__context">
						<h2>How we run <?php echo esc_html( strtolower( $item['niche'] ) ); ?> campaigns</h2>
						<p><?php echo esc_html( $info['text'] ); ?></p>
						<p class="mdm-casepage__links">
							<?php if ( $info['slug'] ) : ?><a href="<?php echo esc_url( home_url( '/' . $info['slug'] . '/' ) ); ?>"><?php echo esc_html( $info['label'] ? $info['label'] : 'Our ' . $item['niche'] . ' service' ); ?> →</a><?php endif; ?>
							<a href="<?php echo esc_url( $caturl ); ?>">All <?php echo esc_html( strtolower( $catname ) ); ?> case studies →</a>
							<a href="<?php echo esc_url( home_url( '/portfolio/' ) ); ?>">Video ad examples →</a>
						</p>
					</div>
					<div class="mdm-casepage__faq">
						<h2>Questions about this case study</h2>
						<?php foreach ( mdm_case_faq( $item, $title ) as $k => $f ) : ?>
							<details<?php echo 0 === $k ? ' open' : ''; ?>><summary><?php echo esc_html( $f[0] ); ?></summary><p><?php echo esc_html( $f[1] ); ?></p></details>
						<?php endforeach; ?>
					</div>
				</article>
			</div>
		</section>

		<?php if ( $related ) : ?>
			<section class="mdm-casepage__more">
				<div class="mdm-casepage__in">
					<span class="mdm-niche__pill">Keep exploring</span>
					<h2 class="mdm-casepage__h2">More <?php echo esc_html( $item['niche'] ); ?> case studies</h2>
					<div class="mdm-casepage__cards">
						<?php foreach ( $related as $r ) : ?>
							<a class="mdm-casepage__card" href="<?php echo esc_url( mdm_case_url( $r ) ); ?>">
								<span class="mdm-casepage__cardimg"><img src="<?php echo esc_url( $r['image'] ); ?>" alt="<?php echo esc_attr( $r['niche'] . ' case study: ' . mdm_case_title( $r ) ); ?>" loading="lazy" decoding="async"></span>
								<span class="mdm-casepage__cardbody"><span class="mdm-casepage__cardniche"><?php echo esc_html( $r['niche'] ); ?></span><span class="mdm-casepage__cardtitle"><?php echo esc_html( mdm_case_title( $r ) ); ?></span><?php $rm = mdm_case_metrics( $r ); if ( $rm ) : ?><span class="mdm-casepage__cardmetric"><?php echo esc_html( $rm[0] ); ?></span><?php endif; ?></span>
							</a>
						<?php endforeach; ?>
					</div>
				</div>
			</section>
		<?php endif; ?>

		<section class="mdm-casepage__ctasec">
			<div class="mdm-casepage__in">
				<div class="mdm-ic__cta" style="--bg:url(<?php echo esc_url( $item['image'] ); ?>)">
					<div><h2 class="mdm-ic__h2">Want results like these?</h2><p>Book a free strategy call. We will review your offer and current ads and show you the case studies closest to your business.</p></div>
					<a class="mdm-ihero__btn is-red" href="<?php echo esc_url( $cta ); ?>">Book a free strategy call <em><?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?></em></a>
				</div>
			</div>
		</section>
	</div>
	<?php
	return ob_get_clean();
}

add_filter(
	'the_content',
	static function ( $content ) {
		static $busy = false;
		$item = $busy ? null : mdm_current_case();
		if ( ! $item || ! in_the_loop() || ! is_main_query() ) {
			return $content;
		}
		$busy = true;
		$html = mdm_case_page_html( $item );
		$busy = false;
		return $html;
	},
	50
);

/* ------------------------------------------------------------------ */
/* SEO: title, description, canonical, robots, social, schema          */
/* ------------------------------------------------------------------ */

function mdm_case_seo_title( $item ) {
	$t = mdm_case_title( $item );
	if ( strlen( $t ) > 52 ) {
		$t = substr( $t, 0, 52 );
		$t = substr( $t, 0, strrpos( $t, ' ' ) ) . '…';
	}
	return $t . ' | ' . $item['niche'] . ' Case Study';
}

function mdm_case_seo_desc( $item ) {
	$m    = mdm_case_metrics( $item );
	$base = $item['niche'] . ( 'ecom' === $item['cat'] ? ' e-commerce' : ' lead generation' ) . ' case study' . ( $m ? ': ' . implode( ', ', $m ) : '' ) . '. ';
	$base .= 'See the proof and how Million Dollar Media ran the campaign.';
	return strlen( $base ) > 160 ? substr( $base, 0, 157 ) . '…' : $base;
}

add_filter( 'rank_math/frontend/title', static function ( $t ) { $c = mdm_current_case(); return $c ? mdm_case_seo_title( $c ) : $t; }, 99 );
add_filter( 'rank_math/frontend/description', static function ( $d ) { $c = mdm_current_case(); return $c ? mdm_case_seo_desc( $c ) : $d; }, 99 );
add_filter( 'rank_math/frontend/canonical', static function ( $u ) { $c = mdm_current_case(); return $c ? mdm_case_url( $c ) : $u; }, 99 );
add_filter(
	'rank_math/frontend/robots',
	static function ( $r ) {
		$c = mdm_current_case();
		if ( $c && ! mdm_case_indexable( $c ) ) {
			$r['index']  = 'noindex';
			$r['follow'] = 'follow';
		}
		return $r;
	},
	99
);
foreach ( array( 'facebook/og_title', 'twitter/twitter_title' ) as $tag ) {
	add_filter( 'rank_math/opengraph/' . $tag, static function ( $t ) { $c = mdm_current_case(); return $c ? mdm_case_seo_title( $c ) : $t; }, 99 );
}
foreach ( array( 'facebook/og_description', 'twitter/twitter_description' ) as $tag ) {
	add_filter( 'rank_math/opengraph/' . $tag, static function ( $d ) { $c = mdm_current_case(); return $c ? mdm_case_seo_desc( $c ) : $d; }, 99 );
}
add_filter( 'rank_math/opengraph/facebook/og_url', static function ( $u ) { $c = mdm_current_case(); return $c ? mdm_case_url( $c ) : $u; }, 99 );
foreach ( array( 'facebook/og_image', 'facebook/og_image_secure_url', 'twitter/twitter_image' ) as $tag ) {
	add_filter( 'rank_math/opengraph/' . $tag, static function ( $i ) { $c = mdm_current_case(); return $c ? $c['image'] : $i; }, 99 );
}

add_filter(
	'rank_math/json_ld',
	static function ( $data ) {
		$c = mdm_current_case();
		if ( ! $c || ! is_array( $data ) ) {
			return $data;
		}
		$url   = mdm_case_url( $c );
		$title = mdm_case_title( $c );
		foreach ( $data as $k => $n ) {
			$t = is_array( $n ) && isset( $n['@type'] ) ? $n['@type'] : '';
			if ( 'BreadcrumbList' === $t ) {
				unset( $data[ $k ] );
			} elseif ( in_array( $t, array( 'WebPage', 'CollectionPage', 'ItemPage' ), true ) || ( is_array( $t ) && in_array( 'WebPage', $t, true ) ) ) {
				$data[ $k ]['url']         = $url;
				$data[ $k ]['@id']         = $url . '#webpage';
				$data[ $k ]['name']        = mdm_case_seo_title( $c );
				$data[ $k ]['description'] = mdm_case_seo_desc( $c );
			} elseif ( in_array( $t, array( 'Article', 'BlogPosting', 'FAQPage' ), true ) ) {
				unset( $data[ $k ] );
			}
		}
		$crumbs = array(
			array( home_url( '/case-studies/' ), 'Case studies' ),
			array( home_url( 'leadgen' === $c['cat'] ? '/case-studies/lead-generation/' : '/case-studies/ecommerce/' ), 'leadgen' === $c['cat'] ? 'Lead generation' : 'E-commerce' ),
			array( $url, $title ),
		);
		$list = array();
		foreach ( $crumbs as $i => $cr ) {
			$list[] = array( '@type' => 'ListItem', 'position' => $i + 1, 'item' => array( '@id' => $cr[0], 'name' => $cr[1] ) );
		}
		$data['mdmCaseCrumbs']  = array( '@type' => 'BreadcrumbList', '@id' => $url . '#breadcrumb', 'itemListElement' => $list );
		$data['mdmCaseArticle'] = array(
			'@type'            => 'Article',
			'@id'              => $url . '#article',
			'headline'         => $title,
			'description'      => mdm_case_seo_desc( $c ),
			'image'            => $c['image'],
			'about'            => $c['niche'],
			'author'           => array( '@id' => home_url( '/#organization' ) ),
			'publisher'        => array( '@id' => home_url( '/#organization' ) ),
			'mainEntityOfPage' => $url,
		);
		$q = array();
		foreach ( mdm_case_faq( $c, $title ) as $f ) {
			$q[] = array( '@type' => 'Question', 'name' => $f[0], 'acceptedAnswer' => array( '@type' => 'Answer', 'text' => $f[1] ) );
		}
		$data['mdmCaseFaq'] = array( '@type' => 'FAQPage', '@id' => $url . '#faq', 'mainEntity' => $q );
		return $data;
	},
	120
);

/* ------------------------------------------------------------------ */
/* Sitemap: /case-study-sitemap.xml (indexable cases only)             */
/* ------------------------------------------------------------------ */

add_action(
	'init',
	static function () {
		$path = isset( $_SERVER['REQUEST_URI'] ) ? strtok( (string) $_SERVER['REQUEST_URI'], '?' ) : ''; // phpcs:ignore
		if ( '/case-study-sitemap.xml' !== $path ) {
			return;
		}
		$x = '<?xml version="1.0" encoding="UTF-8"?>' . "\n" . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . "\n";
		foreach ( mdm_case_registry()['by_slug'] as $slug => $item ) {
			if ( ! mdm_case_indexable( $item ) ) {
				continue;
			}
			$x .= '<url><loc>' . esc_url( home_url( '/case-study/' . $slug . '/' ) ) . '</loc><image:image><image:loc>' . esc_url( $item['image'] ) . '</image:loc></image:image></url>' . "\n";
		}
		$x .= '</urlset>';
		status_header( 200 );
		header( 'Content-Type: application/xml; charset=utf-8' );
		header( 'X-Robots-Tag: noindex' );
		echo $x; // phpcs:ignore WordPress.Security.EscapeOutput
		exit;
	},
	0
);

add_filter(
	'rank_math/sitemap/index',
	static function ( $xml ) {
		return $xml . '<sitemap><loc>' . esc_url( home_url( '/case-study-sitemap.xml' ) ) . '</loc><lastmod>' . gmdate( 'c', (int) filemtime( dirname( __DIR__ ) . '/data/leadgen.json' ) ) . '</lastmod></sitemap>' . "\n";
	}
);
