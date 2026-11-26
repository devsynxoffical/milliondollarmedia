<?php
/**
 * House style: no em dashes anywhere on the site. Imported text (case-study captions, older blog
 * posts, page builder text) still contains them, so they are replaced at display time in page
 * content, titles, meta descriptions and social tags. Stored text and URLs are not changed.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_no_em_dash( $text ) {
	if ( ! is_string( $text ) || false === strpos( $text, "\u{2014}" ) && false === strpos( $text, '&mdash;' ) && false === strpos( $text, '&#8212;' ) ) {
		return $text;
	}
	return preg_replace( '/\s*(?:\x{2014}|&mdash;|&#8212;)\s*/u', ', ', $text );
}

add_filter( 'the_content', 'mdm_no_em_dash', 9999 );
add_filter( 'the_title', 'mdm_no_em_dash', 9999 );
add_filter( 'the_excerpt', 'mdm_no_em_dash', 9999 );
add_filter( 'widget_text', 'mdm_no_em_dash', 9999 );
add_filter( 'pre_get_document_title', 'mdm_no_em_dash', 9999 );
add_filter( 'rank_math/frontend/title', 'mdm_no_em_dash', 9999 );
add_filter( 'rank_math/frontend/description', 'mdm_no_em_dash', 9999 );
foreach ( array( 'facebook/og_title', 'facebook/og_description', 'twitter/twitter_title', 'twitter/twitter_description' ) as $mdm_tag ) {
	add_filter( 'rank_math/opengraph/' . $mdm_tag, 'mdm_no_em_dash', 9999 );
}
// Elementor widgets render outside the_content on some templates.
add_filter( 'elementor/frontend/the_content', 'mdm_no_em_dash', 9999 );
