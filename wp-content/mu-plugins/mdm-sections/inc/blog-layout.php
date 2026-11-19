<?php
/**
 * Desktop layout for single blog posts: cover across the full width, then the article in a
 * reading column with a sticky sidebar (contents + call card), then the lead form and the
 * related articles across the full width. Mobile keeps one column with the contents box on top.
 * Runs after every other the_content filter that adds blocks to posts (TOC 25, lead form 35, related, publisher).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter(
	'the_content',
	static function ( $html ) {
		if ( ! function_exists( 'mdm_blog_is_post' ) || ! mdm_blog_is_post() || ! in_the_loop() || ! is_main_query() || false !== strpos( $html, 'mdm-post-layout' ) ) {
			return $html;
		}

		// 1. Full-width tail: lead form + related articles (whichever comes first).
		$tail = '';
		$cut  = false;
		foreach ( array( '<section class="mdm-lf"', '<aside class="mdm-related"' ) as $marker ) {
			$p = strpos( $html, $marker );
			if ( false !== $p && ( false === $cut || $p < $cut ) ) {
				$cut = $p;
			}
		}
		if ( false !== $cut ) {
			$tail = substr( $html, $cut );
			$html = substr( $html, 0, $cut );
		}

		// 2. Cover goes above the columns.
		$cover = '';
		if ( preg_match( '#<figure class="mdm-post-cover">.*?</figure>#s', $html, $m ) ) {
			$cover = $m[0];
			$html  = str_replace( $cover, '', $html );
		}

		// 3. Sidebar copy of the contents box (the inline one stays for phones and tablets).
		$side_toc = '';
		if ( preg_match( '#<nav class="mdm-toc"[^>]*>.*?</nav>#s', $html, $m ) ) {
			$side_toc = str_replace( '<nav class="mdm-toc"', '<nav class="mdm-toc mdm-toc--side"', $m[0] );
		}

		$cta  = class_exists( 'MDM_Sections' ) ? MDM_Sections::cta_url() : home_url( '/book-your-call/' );
		$wa   = class_exists( 'MDM_Sections' ) ? add_query_arg( 'text', rawurlencode( 'Hi! I read "' . wp_strip_all_tags( get_the_title() ) . '" and want help with my ads.' ), MDM_Sections::whatsapp_url() ) : '';
		$card = '<div class="mdm-sidecta">'
			. '<p class="mdm-sidecta__tag">Done for you</p>'
			. '<p class="mdm-sidecta__title">Want ads like these for your business?</p>'
			. '<ul><li><b>247</b> published case studies</li><li><b>24–48h</b> delivery on most videos</li><li>From <b>$34.97</b> per video, no retainer</li></ul>'
			. '<a class="mdm-sidecta__btn" href="' . esc_url( $cta ) . '">Book a free strategy call →</a>'
			. ( $wa ? '<a class="mdm-sidecta__wa" href="' . esc_url( $wa ) . '" target="_blank" rel="noopener">or message us on WhatsApp</a>' : '' )
			. '</div>';

		return $cover
			. '<div class="mdm-post-layout"><div class="mdm-post-main">' . $html . '</div>'
			. '<aside class="mdm-post-side" aria-label="Article tools"><div class="mdm-post-side__in">' . $side_toc . $card . '</div></aside></div>'
			. ( $tail ? '<div class="mdm-post-tail">' . $tail . '</div>' : '' );
	},
	990
);

// Highlight the section being read in the sidebar contents.
add_action(
	'wp_footer',
	static function () {
		if ( ! function_exists( 'mdm_blog_is_post' ) || ! mdm_blog_is_post() ) {
			return;
		}
		?>
		<script>
		(function () {
			var links = document.querySelectorAll('.mdm-toc--side a[href^="#"]');
			if (!links.length || !('IntersectionObserver' in window)) return;
			var map = {};
			links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
			var heads = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
			var current = null;
			var io = new IntersectionObserver(function (entries) {
				entries.forEach(function (en) {
					if (en.isIntersecting) {
						if (current) current.classList.toggle('is-active', false);
						current = map[en.target.id];
						current.classList.toggle('is-active', true);
					}
				});
			}, { rootMargin: '0px 0px -70% 0px' });
			heads.forEach(function (h) { io.observe(h); });
		})();
		</script>
		<?php
	},
	80
);
