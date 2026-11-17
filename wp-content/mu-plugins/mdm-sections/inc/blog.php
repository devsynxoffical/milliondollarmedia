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
		$cats = get_the_category();
		$name = $cats ? $cats[0]->name : 'Blog';
		$url  = $cats ? get_category_link( $cats[0] ) : home_url( '/blogs/' );
		echo '<div class="mdm-post-kicker"><a href="' . esc_url( home_url( '/blogs/' ) ) . '">Blog</a><i aria-hidden="true">/</i><a href="' . esc_url( $url ) . '">' . esc_html( $name ) . '</a></div>';
	}
);

add_action(
	'astra_single_header_bottom',
	static function () {
		if ( ! mdm_blog_is_post() ) {
			return;
		}
		$id = get_the_ID();
		echo '<div class="mdm-post-facts"><span>' . (int) mdm_blog_read_minutes( $id ) . ' min read</span>';
		if ( get_the_modified_time( 'U', $id ) > get_the_time( 'U', $id ) + DAY_IN_SECONDS ) {
			echo '<span>Updated ' . esc_html( get_the_modified_date( 'F j, Y', $id ) ) . '</span>';
		}
		echo '</div>';
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
