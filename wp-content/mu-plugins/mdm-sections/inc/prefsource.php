<?php
/**
 * "Preferred source on Google" button: a plain link to Google's preferences page for this domain
 * (google.com/preferences/source?q=<domain>). Logged-in Google users can tick the site as a preferred
 * source, which shows them more of its articles in Top Stories. No script, plugin or Google setup.
 * Shown in the footer (every page) and at the end of every blog post.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_pref_source_url() {
	$host = (string) wp_parse_url( home_url(), PHP_URL_HOST );
	$host = preg_replace( '/^www\./', '', $host );
	return 'https://www.google.com/preferences/source?q=' . rawurlencode( $host );
}

function mdm_pref_source_button( $text = 'Make Million Dollar Media a preferred source on Google', $extra_class = '' ) {
	$g = '<svg class="mdm-gpref__g" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.6 13.3l7.9 6.1C12.4 13.7 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.4c-.5 2.9-2.2 5.3-4.6 7l7.1 5.5c4.2-3.9 7.2-9.6 7.2-16.9z"/><path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.6 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.1-5.5c-2 1.4-4.6 2.2-8.8 2.2-6.3 0-11.6-4.2-13.5-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>';
	return '<a class="mdm-gpref' . ( $extra_class ? ' ' . esc_attr( $extra_class ) : '' ) . '" href="' . esc_url( mdm_pref_source_url() ) . '" target="_blank" rel="noopener">'
		. '<span class="mdm-gpref__icon">' . $g . '</span><span>' . esc_html( $text ) . '</span></a>';
}

// End of every blog post: a short ask with the same button (before the lead form / related articles).
add_filter(
	'the_content',
	static function ( $html ) {
		if ( ! function_exists( 'mdm_blog_is_post' ) || ! mdm_blog_is_post() || ! in_the_loop() || ! is_main_query() || false !== strpos( $html, 'mdm-gpref-box' ) ) {
			return $html;
		}
		$box = '<aside class="mdm-gpref-box"><p><b>Was this useful?</b> Add Million Dollar Media as a preferred source on Google to see more of our articles in Top Stories.</p>'
			. mdm_pref_source_button( 'Add us as a preferred source on Google' ) . '</aside>';
		foreach ( array( '<section class="mdm-lf"', '<aside class="mdm-related"' ) as $marker ) {
			$p = strpos( $html, $marker );
			if ( false !== $p ) {
				return substr( $html, 0, $p ) . $box . substr( $html, $p );
			}
		}
		return $html . $box;
	},
	980 // after the lead form (35) and related box, before the desktop layout split (990)
);
