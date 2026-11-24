<?php
/**
 * Entity, structured data and AI-answer (AEO / GEO) improvements:
 *  - one consistent business entity in JSON-LD (Rank Math's generic "Organization" named
 *    "Creativity that converts" collided with the MarketingAgency node on the same @id),
 *  - clean VideoObject names and ISO 8601 upload dates,
 *  - FAQPage JSON-LD on the service pages (same questions as the on-page chat FAQ),
 *  - funnel steps kept out of search, /llms.txt, and a publisher box on blog posts.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_brand_name() {
	return 'Million Dollar Media';
}

/**
 * One brand description sentence, reused in the Organization schema, llms.txt and off-site profiles
 * (Google Business Profile, Clutch, LinkedIn), so AI tools connect them to the same business.
 */
function mdm_brand_sentence() {
	return 'Million Dollar Media is a done-for-you video ad agency that scripts, produces and edits UGC ads, VSLs and AI video ads for lead generation and ecommerce brands, backed by 247 published case studies.';
}

/* robots.txt: allow the AI crawlers explicitly (same private paths kept out as for all bots). */
add_filter(
	'robots_txt',
	static function ( $out ) {
		if ( false !== strpos( $out, 'User-agent: GPTBot' ) ) {
			return $out;
		}
		$ai = "User-agent: GPTBot\nUser-agent: OAI-SearchBot\nUser-agent: ChatGPT-User\nUser-agent: PerplexityBot\nUser-agent: Google-Extended\nUser-agent: ClaudeBot\nUser-agent: Claude-SearchBot\n"
			. "Allow: /\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\nDisallow: /*?add-to-cart=\nDisallow: /*?*add-to-cart=\n\n";
		$pos = strpos( $out, 'Sitemap:' );
		return false === $pos ? rtrim( $out ) . "\n\n" . $ai : substr( $out, 0, $pos ) . $ai . substr( $out, $pos );
	},
	100
);

/** Funnel / thank-you steps: useful for buyers, not for search results. */
function mdm_geo_noindex_slugs() {
	return array( 'provide-information', 'upsell', 'downsell', 'booking-confirmed', 'thank-you' );
}

add_filter(
	'rank_math/frontend/robots',
	static function ( $robots ) {
		if ( is_page( mdm_geo_noindex_slugs() ) ) {
			$robots['index']  = 'noindex';
			$robots['follow'] = 'nofollow';
		}
		return $robots;
	},
	26
);

add_filter(
	'rank_math/json_ld',
	static function ( $data ) {
		if ( ! is_array( $data ) ) {
			return $data;
		}
		$brand  = mdm_brand_name();
		$agency = null;
		foreach ( $data as $k => $node ) {
			if ( is_array( $node ) && isset( $node['@type'] ) && 'MarketingAgency' === $node['@type'] ) {
				$agency = $k;
			}
		}
		if ( null !== $agency && empty( $data[ $agency ]['description'] ) ) {
			$data[ $agency ]['description'] = mdm_brand_sentence();
		}
		$n = 0;
		foreach ( $data as $k => $node ) {
			if ( ! is_array( $node ) || empty( $node['@type'] ) ) {
				continue;
			}
			$type = $node['@type'];

			// Generic Organization: drop it when the MarketingAgency node carries the same @id, else fix its name.
			if ( 'Organization' === $type ) {
				if ( null !== $agency && isset( $node['@id'], $data[ $agency ]['@id'] ) && $node['@id'] === $data[ $agency ]['@id'] ) {
					if ( empty( $data[ $agency ]['logo'] ) || ! is_array( $data[ $agency ]['logo'] ) ) {
						if ( ! empty( $node['logo'] ) ) {
							$data[ $agency ]['logo'] = $node['logo'];
						}
					}
					unset( $data[ $k ] );
					continue;
				}
				$data[ $k ]['name'] = $brand;
				if ( isset( $data[ $k ]['logo']['caption'] ) ) {
					$data[ $k ]['logo']['caption'] = $brand;
				}
			}

			if ( 'MarketingAgency' === $type ) {
				$data[ $k ]['name']          = $brand;
				$data[ $k ]['alternateName'] = 'MDM';
				$data[ $k ]['telephone']     = '+91 82877 82334'; // the site's WhatsApp business number
				if ( ! empty( $node['sameAs'] ) ) {
					$data[ $k ]['sameAs'] = array_values( array_filter( (array) $node['sameAs'], static function ( $u ) { return (bool) preg_match( '#^https?://#', (string) $u ); } ) );
				}
				if ( isset( $data[ $k ]['logo']['caption'] ) ) {
					$data[ $k ]['logo']['caption'] = $brand;
				}
			}

			if ( 'WebSite' === $type ) {
				$data[ $k ]['name']          = $brand;
				$data[ $k ]['alternateName'] = 'MDM';
			}

			// Video file names ("gummies VID", "linekd in 2") are not useful names; dates must be ISO 8601.
			if ( 'VideoObject' === $type ) {
				$n++;
				$name = isset( $node['name'] ) ? (string) $node['name'] : '';
				if ( '' === $name || preg_match( '/\b(vid|f|ff)\b|\(\d+\)|\d$|^[A-Z0-9 ]+$/i', $name ) ) {
					$data[ $k ]['name'] = sprintf( '%s video ad example %d', $brand, $n );
				}
				if ( ! empty( $node['uploadDate'] ) && preg_match( '/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $node['uploadDate'] ) ) {
					try {
						$dt                       = new DateTime( $node['uploadDate'], wp_timezone() );
						$data[ $k ]['uploadDate'] = $dt->format( DATE_ATOM );
					} catch ( Exception $e ) { // phpcs:ignore
					}
				}
			}
		}

		// Pages are authored by the business; never publish an account whose display name is an email address.
		$org_ref = array( '@id' => home_url( '/#organization' ) );
		foreach ( $data as $k => $node ) {
			if ( ! is_array( $node ) ) {
				continue;
			}
			if ( 'Person' === ( $node['@type'] ?? '' ) && false !== strpos( (string) ( $node['name'] ?? '' ), '@' ) ) {
				unset( $data[ $k ] );
				continue;
			}
			if ( isset( $node['author'] ) && is_array( $node['author'] ) && ( is_page() || false !== strpos( (string) ( $node['author']['name'] ?? '' ), '@' ) ) ) {
				$data[ $k ]['author'] = $org_ref;
			}
		}
		// Videos that share one name (Rank Math names page videos after the page title) get numbered.
		$seen = array();
		foreach ( $data as $k => $node ) {
			if ( is_array( $node ) && 'VideoObject' === ( $node['@type'] ?? '' ) && ! empty( $node['name'] ) ) {
				$nm           = html_entity_decode( (string) $node['name'], ENT_QUOTES, 'UTF-8' );
				$seen[ $nm ]  = isset( $seen[ $nm ] ) ? $seen[ $nm ] + 1 : 1;
				$data[ $k ]['name'] = $seen[ $nm ] > 1 ? $nm . ' (video ' . $seen[ $nm ] . ')' : $nm;
			}
		}

		// Service pages: FAQPage with the same questions as the on-page chat FAQ.
		if ( function_exists( 'mdm_industry_slug' ) && function_exists( 'mdm_industry_faq_items' ) ) {
			$slug = mdm_industry_slug();
			$faq  = $slug ? mdm_industry_faq_items( $slug ) : array();
			if ( $faq ) {
				$url  = get_permalink();
				$main = array();
				foreach ( $faq as $f ) {
					$main[] = array(
						'@type'          => 'Question',
						'name'           => $f['q'],
						'acceptedAnswer' => array( '@type' => 'Answer', 'text' => $f['a'] ),
					);
				}
				$data['mdmFaq'] = array(
					'@type'      => 'FAQPage',
					'@id'        => $url . '#faq',
					'url'        => $url,
					'mainEntity' => $main,
					'publisher'  => array( '@id' => home_url( '/#organization' ) ),
				);
			}
		}
		return $data;
	},
	99
);

/* ------------------------------------------------------------------ */
/* /llms.txt: a plain summary of the business for AI assistants        */
/* ------------------------------------------------------------------ */

add_action(
	'init',
	static function () {
		$path = isset( $_SERVER['REQUEST_URI'] ) ? strtok( (string) $_SERVER['REQUEST_URI'], '?' ) : ''; // phpcs:ignore
		if ( '/llms.txt' !== $path ) {
			return;
		}
		$u = static function ( $p ) { return home_url( $p ); };
		$t  = "# Million Dollar Media\n\n";
		$t .= '> ' . mdm_brand_sentence() . "\n\n";
		$t .= "Legal name: Vaishali Media Productions LLC, founded 2019. We also run Meta ad campaigns and funnels for clients. Most creatives are delivered in 24 to 48 hours. Updated: " . gmdate( 'F Y' ) . ".\n\n";
		$t .= "Business address: 30 N Gould St # 58138, Sheridan, WY 82801, USA. Email: vaishali@milliondollarmedia.us. We work with clients across the USA remotely.\n\n";
		$t .= "## Key facts\n\n";
		$t .= "- 247 client case studies published on the site (124 lead generation, 123 e-commerce), each with the client's ad account, dashboard or CRM proof.\n";
		$t .= "- Pricing without a retainer: image \$14.97, AI image \$19.97, 30 images \$197; GIF \$24.97, AI GIF \$29.97, 30 GIFs \$447; video \$34.97, AI video \$44.97, 10 videos \$299, 10 AI videos \$349, 30 videos \$797. Full done-for-you programs and VSL production are quoted on a free strategy call.\n";
		$t .= "- E-commerce results (from the case studies): \$2.3M in sales at 11.6x ROAS; \$115,416 at 4.39x ROAS; \$62,182 in 7 days; \$61,960 in a single day.\n";
		$t .= "- Example results (from the case studies): 686 roofing leads in 8 days at \$5.31 per lead for a Texas roofer; 326 HVAC leads in 26 days at \$5.57 per lead; \$36,444 collected at a 19.63x return on \$1,956 of ad spend for a New Jersey HVAC company.\n\n";
		$t .= "## Main pages\n\n";
		$t .= '- [Home](' . $u( '/' ) . "): services, pricing, video ad examples and FAQ\n";
		$t .= '- [Video ad agency](' . $u( '/video-ad-agency/' ) . "): done-for-you video ads for lead generation and ecommerce brands\n";
		$t .= '- [Ecommerce video ads](' . $u( '/ecommerce-video-ads/' ) . "): video ads for Shopify and DTC brands, 123 e-commerce case studies\n";
		$t .= '- [UGC ads examples](' . $u( '/ugc-ads-examples/' ) . "): 38 real UGC-style client ads with a breakdown of each hook\n";
		$t .= '- [What is a VSL?](' . $u( '/what-is-a-vsl/' ) . "): video sales letter guide with real VSL examples\n";
		$t .= '- [How much do video ads cost?](' . $u( '/how-much-do-video-ads-cost/' ) . "): production prices and ad spend\n";
		$t .= '- [Facebook Ad Creatives Mastermind](' . $u( '/facebook-ad-creatives-mastermind/' ) . "): 6 lessons on Facebook ad creatives\n";
		$t .= '- [Case studies](' . $u( '/case-studies/' ) . "): all 247 case studies, filterable by industry\n";
		$t .= '- [Video ad examples](' . $u( '/portfolio/' ) . "): portfolio by industry\n";
		$t .= '- [Our story](' . $u( '/our-story/' ) . "): who we are\n";
		$t .= '- [Book a free strategy call](' . $u( '/book-your-call/' ) . ")\n\n";
		$t .= "## Industries\n\n";
		$pages = array(
			'/roofing-video-marketing-services/'      => 'Roofing video marketing and video ads',
			'/hvac-video-marketing-services/'         => 'HVAC advertising and video ads',
			'/plumbing-video-production/'             => 'Plumbing video production and ads',
			'/home-service-business/'                 => 'Home service businesses',
			'/mva/'                                   => 'MVA leads and video ads for personal injury law firms',
			'/real-estate-video-marketing/'                           => 'Real estate video marketing',
			'/solar/'                                 => 'Solar ads and video marketing',
			'/saas/'                                  => 'SaaS video production and ads',
			'/strategic-video-marketing-for-coaches/' => 'Video marketing and Facebook ads for coaches',
			'/agency-owners/'                         => 'White label video ads for agencies',
		);
		foreach ( $pages as $p => $label ) {
			$t .= '- [' . $label . '](' . $u( $p ) . ")\n";
		}
		$t .= "\n## Guides\n\n";
		foreach ( get_posts( array( 'numberposts' => 20, 'post_status' => 'publish' ) ) as $post ) {
			$t .= '- [' . html_entity_decode( get_the_title( $post ), ENT_QUOTES, 'UTF-8' ) . '](' . get_permalink( $post ) . ")\n";
		}
		status_header( 200 );
		header( 'Content-Type: text/plain; charset=utf-8' );
		header( 'X-Robots-Tag: noindex' );
		echo $t; // phpcs:ignore WordPress.Security.EscapeOutput
		exit;
	},
	0
);

/* ------------------------------------------------------------------ */
/* Blog posts: publisher box (who is behind the content)               */
/* ------------------------------------------------------------------ */

add_filter(
	'the_content',
	static function ( $content ) {
		if ( is_admin() || ! is_singular( 'post' ) || ! in_the_loop() || ! is_main_query() || false !== strpos( $content, 'mdm-publisher' ) ) {
			return $content;
		}
		$author = get_the_author_meta( 'display_name', (int) get_post_field( 'post_author', get_the_ID() ) );
		$box    = '<aside class="mdm-publisher"><div class="mdm-publisher__logo" aria-hidden="true">MDM</div><div>'
			. '<p class="mdm-publisher__label">About the publisher</p>'
			. '<p class="mdm-publisher__text">' . ( $author ? 'Written by <b>' . esc_html( $author ) . '</b> for ' : 'Published by ' ) . '<b>Million Dollar Media</b>, a done-for-you video ad agency founded in 2019. Our team scripts, produces and runs video ads for lead generation businesses and e-commerce brands, and every result we mention comes from one of our <a href="' . esc_url( home_url( '/case-studies/' ) ) . '">247 published case studies</a>.</p>'
			. '<p class="mdm-publisher__links"><a href="' . esc_url( home_url( '/our-story/' ) ) . '">Our story</a><a href="' . esc_url( home_url( '/portfolio/' ) ) . '">Video ad examples</a><a href="' . esc_url( home_url( '/book-your-call/' ) ) . '">Book a free call</a></p>'
			. '</div></aside>';
		return $content . $box;
	},
	28
);

/* ------------------------------------------------------------------ */
/* Names: Rank Math's own site / business name settings still said     */
/* "Creativity that converts" (the slogan), and one admin account uses */
/* its email address as display name. Fix both at read time.           */
/* ------------------------------------------------------------------ */

add_filter(
	'option_rank-math-options-titles',
	static function ( $opts ) {
		if ( is_array( $opts ) ) {
			foreach ( array( 'website_name', 'knowledgegraph_name' ) as $k ) {
				if ( empty( $opts[ $k ] ) || 'creativity that converts' === strtolower( trim( (string) $opts[ $k ] ) ) ) {
					$opts[ $k ] = mdm_brand_name();
				}
			}
		}
		return $opts;
	}
);

add_filter(
	'get_the_author_display_name',
	static function ( $name, $user_id = 0 ) {
		if ( false === strpos( (string) $name, '@' ) ) {
			return $name;
		}
		$full = trim( ucwords( strtolower( get_user_meta( (int) $user_id, 'first_name', true ) . ' ' . get_user_meta( (int) $user_id, 'last_name', true ) ) ) );
		return '' !== $full ? $full : mdm_brand_name();
	},
	10,
	2
);
add_filter(
	'the_author',
	static function ( $name ) {
		if ( false === strpos( (string) $name, '@' ) ) {
			return $name;
		}
		global $authordata;
		$uid = is_object( $authordata ) ? (int) $authordata->ID : 0;
		return apply_filters( 'get_the_author_display_name', $name, $uid );
	}
);

/* IndexNow (Bing, Yandex and others): the key file that proves we own the site. */
function mdm_indexnow_key() {
	return 'cf33d5ec6898a2dab3cbccb39411d214';
}
add_action(
	'init',
	static function () {
		$path = isset( $_SERVER['REQUEST_URI'] ) ? strtok( (string) $_SERVER['REQUEST_URI'], '?' ) : ''; // phpcs:ignore
		if ( '/' . mdm_indexnow_key() . '.txt' === $path ) {
			status_header( 200 );
			header( 'Content-Type: text/plain; charset=utf-8' );
			echo mdm_indexnow_key(); // phpcs:ignore WordPress.Security.EscapeOutput
			exit;
		}
	},
	0
);

/* The correct business WhatsApp is +91 82877 82334; old buttons that still point to the previous number are rewritten. */
function mdm_fix_old_whatsapp( $html ) {
	if ( ! is_string( $html ) || false === strpos( $html, '9654913015' ) ) {
		return $html;
	}
	return str_replace( array( '%2B919654913015', '+919654913015', '919654913015' ), array( '%2B918287782334', '+918287782334', '918287782334' ), $html );
}
add_filter( 'the_content', 'mdm_fix_old_whatsapp', 999 );
add_filter( 'elementor/frontend/the_content', 'mdm_fix_old_whatsapp', 999 );
