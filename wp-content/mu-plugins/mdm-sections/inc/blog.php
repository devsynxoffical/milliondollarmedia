<?php
/**
 * Single blog post layout: category pill + reading time in the header, featured image,
 * "In this article" contents box (from the H2s), reading progress bar. Styles: .mdm-post in mdm-sections.css.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_blog_is_post() {
	return ! is_admin() && is_singular( 'post' );
}

function mdm_blog_read_minutes( $post_id ) {
	$text = wp_strip_all_tags( get_post_field( 'post_content', $post_id ) );
	$data = get_post_meta( $post_id, '_elementor_data', true ); // Elementor-built posts keep their text here
	if ( is_string( $data ) && strlen( $data ) > strlen( $text ) ) {
		$text = '';
		foreach ( (array) json_decode( $data, true ) as $el ) {
			array_walk_recursive( $el, static function ( $v, $k ) use ( &$text ) { if ( 'editor' === $k || 'title' === $k ) { $text .= ' ' . wp_strip_all_tags( $v ); } } );
		}
	}
	return max( 1, (int) round( str_word_count( $text ) / 230 ) );
}

add_filter(
	'body_class',
	static function ( $c ) {
		if ( mdm_blog_is_post() ) {
			$c[] = 'mdm-post';
		}
		return $c;
	}
);

// Category pill above the title, reading time + last update under the meta line.
add_action(
	'astra_single_header_top',
	static function () {
		if ( ! mdm_blog_is_post() ) {
			return;
		}
		$id   = get_the_ID();
		$cats = get_the_category();
		$name = $cats ? $cats[0]->name : 'Blog';
		$url  = $cats ? get_category_link( $cats[0] ) : home_url( '/blogs/' );
		echo '<a class="mdm-post-back" href="' . esc_url( home_url( '/blogs/' ) ) . '">← All articles</a>';
		echo '<div class="mdm-post-kicker"><a href="' . esc_url( $url ) . '">' . esc_html( $name ) . '</a>'
			. '<span>' . (int) mdm_blog_read_minutes( $id ) . ' min read</span>'
			. ( get_the_modified_time( 'U', $id ) > get_the_time( 'U', $id ) + DAY_IN_SECONDS ? '<span>Updated ' . esc_html( get_the_modified_date( 'F j, Y', $id ) ) . '</span>' : '' )
			. '</div>';
	}
);

add_action(
	'astra_single_header_bottom',
	static function () {
		if ( ! mdm_blog_is_post() ) {
			return;
		}
		$id   = get_the_ID();
		// Summary under the title: the SEO description, else the post excerpt, shortened.
		$lead = (string) get_post_meta( $id, 'rank_math_description', true );
		if ( '' === trim( $lead ) || false !== strpos( $lead, '%' ) ) {
			$raw  = has_excerpt( $id ) ? get_post_field( 'post_excerpt', $id ) : strip_shortcodes( (string) get_post_field( 'post_content', $id ) );
			$lead = wp_trim_words( wp_strip_all_tags( $raw ), 34, '…' ); // no get_the_excerpt(): it would run every the_content filter
		}
		if ( '' !== trim( $lead ) ) {
			echo '<p class="mdm-post-lead">' . esc_html( $lead ) . '</p>';
		}
		$author = get_the_author_meta( 'display_name', (int) get_post_field( 'post_author', $id ) );
		echo '<div class="mdm-post-byline"><span class="mdm-post-byline__avatar" aria-hidden="true">' . esc_html( mb_substr( $author ? $author : 'M', 0, 1 ) ) . '</span>'
			. '<span><b>' . esc_html( $author ? $author : 'Million Dollar Media' ) . '</b><small>Million Dollar Media · Published ' . esc_html( get_the_date( 'F j, Y', $id ) ) . '</small></span></div>';
	}
);

// Featured image + contents box at the top of the article body.
add_filter(
	'the_content',
	static function ( $html ) {
		if ( ! mdm_blog_is_post() || ! in_the_loop() || ! is_main_query() || false !== strpos( $html, 'mdm-toc' ) ) {
			return $html;
		}
		$id = get_the_ID();

		// Anchor ids on every H2, collected for the contents box.
		$toc  = array();
		$used = array();
		$html = preg_replace_callback(
			'#<h2([^>]*)>(.*?)</h2>#is',
			static function ( $m ) use ( &$toc, &$used ) {
				$label = trim( wp_strip_all_tags( html_entity_decode( $m[2], ENT_QUOTES, 'UTF-8' ) ) );
				if ( '' === $label ) {
					return $m[0];
				}
				if ( preg_match( '#\sid=["\']([^"\']+)#', $m[1], $idm ) ) {
					$slug = $idm[1];
					$attr = $m[1];
				} else {
					$slug = sanitize_title( $label );
					$base = $slug;
					$n    = 2;
					while ( isset( $used[ $slug ] ) ) {
						$slug = $base . '-' . $n++;
					}
					$attr = $m[1] . ' id="' . esc_attr( $slug ) . '"';
				}
				$used[ $slug ] = true;
				$toc[]         = array( $slug, $label );
				return '<h2' . $attr . '>' . $m[2] . '</h2>';
			},
			$html
		);

		$top = '';
		if ( has_post_thumbnail( $id ) ) {
			$src = wp_get_attachment_image_url( get_post_thumbnail_id( $id ), 'full' );
			if ( ! $src || false === strpos( $html, wp_basename( $src ) ) ) {
				$top .= '<figure class="mdm-post-cover">' . get_the_post_thumbnail(
					$id,
					'large',
					array(
						'loading'       => 'eager',
						'fetchpriority' => 'high',
						'alt'           => get_the_title( $id ),
					)
				) . '</figure>';
			}
		} elseif ( function_exists( 'mdm_blog_cover' ) ) {
			$top .= '<figure class="mdm-post-cover">' . mdm_blog_cover( $id ) . '</figure>'; // designed cover when there is no featured image
		}
		if ( count( $toc ) >= 3 && count( $toc ) <= 14 ) { // a very long list (posts that mark every point as a heading) is skipped
			$top .= '<nav class="mdm-toc" aria-label="In this article"><p class="mdm-toc__head">In this article</p><ol>';
			foreach ( $toc as $t ) {
				$top .= '<li><a href="#' . esc_attr( $t[0] ) . '">' . esc_html( $t[1] ) . '</a></li>';
			}
			$top .= '</ol></nav>';
		}
		return $top . $html;
	},
	25
);

// Reading progress bar.
add_action(
	'wp_footer',
	static function () {
		if ( ! mdm_blog_is_post() ) {
			return;
		}
		?>
		<div class="mdm-post-progress" aria-hidden="true"><i></i></div>
		<script>
		(function () {
			var bar = document.querySelector('.mdm-post-progress i'), art = document.querySelector('.ast-article-single .entry-content');
			if (!bar || !art) return;
			var tick = false;
			function draw() {
				var r = art.getBoundingClientRect(), h = r.height - window.innerHeight * 0.6;
				bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, -r.top / (h > 0 ? h : 1))) + ')';
				tick = false;
			}
			window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(draw); } }, { passive: true });
			draw();
		})();
		</script>
		<?php
	},
	50
);

/*
 * Contextual internal links inside blog posts: the first natural mention of a topic in a paragraph
 * links to the most relevant guide or service page. At most 4 per post, never to the post itself,
 * never inside headings or existing links.
 */
function mdm_blog_autolinks() {
	return array(
		'roofing leads'             => '/facebook-ads-for-roofers/',
		'facebook ads for roofers'  => '/facebook-ads-for-roofers/',
		'HVAC leads'                => '/hvac-facebook-ads/',
		'video sales letter'        => '/what-is-a-vsl/',
		'VSL'                       => '/what-is-a-vsl/',
		'roofing companies'         => '/roofing-video-marketing-services/',
		'roofing businesses'        => '/roofing-video-marketing-services/',
		'HVAC companies'            => '/hvac-video-marketing-services/',
		'HVAC businesses'           => '/hvac-video-marketing-services/',
		'plumbing companies'        => '/plumbing-video-production/',
		'plumbing businesses'       => '/plumbing-video-production/',
		'white label video'         => '/agency-owners/',
		'white-label video'         => '/agency-owners/',
		'home service businesses'   => '/home-service-business/',
		'coaches'                   => '/strategic-video-marketing-for-coaches/',
		'case studies'              => '/case-studies/',
		'video ad examples'         => '/portfolio/',
	);
}

add_filter(
	'the_content',
	static function ( $html ) {
		if ( ! function_exists( 'mdm_blog_is_post' ) || ! mdm_blog_is_post() || ! in_the_loop() || ! is_main_query() ) {
			return $html;
		}
		$self  = untrailingslashit( wp_parse_url( get_permalink(), PHP_URL_PATH ) ) . '/';
		$used  = array();
		$count = 0;
		foreach ( mdm_blog_autolinks() as $phrase => $path ) {
			if ( $count >= 4 || $path === $self || isset( $used[ $path ] ) || false !== stripos( $html, 'href="' . home_url( $path ) ) ) {
				continue;
			}
			$re   = '/(<p\b[^>]*>)((?:(?!<\/p>).)*?)\b(' . preg_quote( $phrase, '/' ) . ')\b/is';
			$done = false;
			$html = preg_replace_callback(
				$re,
				static function ( $m ) use ( $path, &$done ) {
					// skip paragraphs that already link, and matches inside a tag (e.g. an alt attribute)
					if ( $done || false !== stripos( $m[2], '<a ' ) || substr_count( $m[2], '<' ) !== substr_count( $m[2], '>' ) ) {
						return $m[0];
					}
					$done = true;
					return $m[1] . $m[2] . '<a href="' . esc_url( home_url( $path ) ) . '">' . $m[3] . '</a>';
				},
				$html
			);
			if ( $done ) {
				$used[ $path ] = true;
				$count++;
			}
		}
		return $html;
	},
	24
);
