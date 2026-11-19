<?php
/**
 * Home page video cards: a fixed category order chosen by the owner, one video per category.
 * Fitness, Coaching, Agency, MVA, Roofing, eCom Brands, Supplements, Electrician.
 * Coaching and eCom Brands use the videos the owner sent; the rest are the first video of the
 * matching Portfolio tab (page 380), so they follow the Portfolio when it changes.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_home_reels_order() {
	return array(
		// Label shown on the card => fixed Vimeo URL, or array( 'tab' => Portfolio tab name ).
		'Fitness'     => 'https://vimeo.com/1246210855', // Marcus Filly
		'Coaching'    => 'https://vimeo.com/1248285151',
		'Agency'      => array( 'tab' => 'Agency Owner' ),
		'MVA'         => array( 'tab' => 'MVA' ),
		'Roofing'     => array( 'tab' => 'Roofing' ),
		'eCom Brands' => 'https://vimeo.com/1248282491',
		'Supplements' => array( 'tab' => array( 'Supplements', 'Fitness' ) ), // the Portfolio tab was renamed Supplements -> Fitness
		'Electrician' => array( 'tab' => 'Electrician' ),
	);
}

function mdm_home_reels_items() {
	$tabs  = function_exists( 'mdm_portfolio_tab_videos' ) ? mdm_portfolio_tab_videos() : array();
	$items = array();
	foreach ( mdm_home_reels_order() as $label => $src ) {
		if ( is_array( $src ) ) {
			$url = '';
			foreach ( (array) $src['tab'] as $tab ) {
				if ( ! empty( $tabs[ $tab ][0] ) ) {
					$url = $tabs[ $tab ][0];
					break;
				}
			}
			if ( ! $url ) {
				continue;
			}
			$src = $url;
		}
		if ( ! preg_match( '~vimeo\.com/(?:video/)?(\d+)~', $src, $m ) ) {
			continue;
		}
		$src     = 'https://vimeo.com/' . $m[1];
		$items[] = array(
			'label'  => $label,
			'src'    => $src,
			'type'   => 'vimeo',
			'poster' => function_exists( 'mdm_video_thumb' ) ? mdm_video_thumb( $src, 'vimeo' ) : '',
		);
	}
	return $items;
}

// Replace the cards the home page builds from its old video section (priority 10) with this order.
add_filter(
	'mdm_reels_source',
	static function ( $source ) {
		if ( ! is_front_page() || ! is_array( $source ) ) {
			return $source;
		}
		$items = mdm_home_reels_items();
		if ( count( $items ) >= 4 ) {
			$source['items'] = $items;
		}
		return $source;
	},
	20
);

// Marcus Filly is already the Fitness card, so no extra "featured" card in front of the order.
add_filter(
	'mdm_reels_featured',
	static function ( $featured ) {
		return is_front_page() ? array() : $featured;
	},
	20
);
