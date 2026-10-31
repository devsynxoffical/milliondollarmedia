<?php
/**
 * New homepage sections, section by section.
 *
 * WordPress admin -> Settings -> New Homepage lists the homepage's own Elementor
 * sections. For each one choose: Keep / Replace with a new section / Remove.
 * Defaults: the video grid -> new video rows, "Powered by $50M" -> new case cards,
 * "How it Works" -> new How it works. Everything else is kept.
 * New-only sections (numbers, about, case studies, FAQ) are added at the end,
 * followed by the new footer.
 * Nothing in Elementor is edited or deleted; untick "Switch on" to go back.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const MDM_HOME_OPTION       = 'mdm_use_new_homepage';
const MDM_HOME_MAP_OPTION   = 'mdm_new_home_map';
const MDM_HOME_EXTRA_OPTION = 'mdm_new_home_extras';
const MDM_HOME_MENU_OPTION  = 'mdm_new_home_menu';
const MDM_HOME_FOOT_OPTION  = 'mdm_new_home_footer';
const MDM_SITE_ANIM_OPTION  = 'mdm_site_animations';
const MDM_SITE_SHOP_OPTION  = 'mdm_site_shop_design';
const MDM_SITE_LIGHT_OPTION = 'mdm_site_light_theme';

/* ------------------------------------------------------------------ */
/* Which page is being designed, and its saved choices                 */
/* ------------------------------------------------------------------ */

/** Page being rendered (front end) or edited (admin screen). */
function mdm_design_pid() {
	if ( is_admin() ) {
		return isset( $GLOBALS['mdm_admin_pid'] ) ? (int) $GLOBALS['mdm_admin_pid'] : mdm_front_page_id();
	}
	if ( is_front_page() ) {
		return mdm_front_page_id();
	}
	return is_page() ? (int) get_queried_object_id() : 0;
}

function mdm_is_front_pid( $pid ) {
	return $pid && (int) $pid === mdm_front_page_id();
}

/** Saved setting of a page. The homepage keeps its original option names. */
function mdm_design_get( $pid, $key, $default = null ) {
	if ( mdm_is_front_pid( $pid ) ) {
		$names = array( 'on' => MDM_HOME_OPTION, 'map' => MDM_HOME_MAP_OPTION, 'extras' => MDM_HOME_EXTRA_OPTION, 'v' => MDM_HOME_MAP_OPTION . '_v' );
		return get_option( $names[ $key ], $default );
	}
	$o = get_option( 'mdm_design_' . (int) $pid, array() );
	return is_array( $o ) && array_key_exists( $key, $o ) ? $o[ $key ] : $default;
}

function mdm_design_set( $pid, $values ) {
	if ( mdm_is_front_pid( $pid ) ) {
		$names = array( 'on' => MDM_HOME_OPTION, 'map' => MDM_HOME_MAP_OPTION, 'extras' => MDM_HOME_EXTRA_OPTION, 'v' => MDM_HOME_MAP_OPTION . '_v' );
		foreach ( $values as $k => $v ) {
			null === $v ? delete_option( $names[ $k ] ) : update_option( $names[ $k ], $v );
		}
		return;
	}
	$o = get_option( 'mdm_design_' . (int) $pid, array() );
	$o = is_array( $o ) ? $o : array();
	foreach ( $values as $k => $v ) {
		if ( null === $v ) {
			unset( $o[ $k ] );
		} else {
			$o[ $k ] = $v;
		}
	}
	update_option( 'mdm_design_' . (int) $pid, $o, false );
}

/** Preview with ?mdm_new_home=1 works on every page. */
function mdm_preview_requested() {
	return isset( $_GET['mdm_new_home'] ) && '0' !== $_GET['mdm_new_home']; // phpcs:ignore WordPress.Security.NonceVerification
}

/** Site-wide parts (new footer / menu): live when the homepage switch is on, or in preview. */
function mdm_site_design_active() {
	if ( isset( $_GET['mdm_new_home'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		return mdm_preview_requested();
	}
	return (bool) get_option( MDM_HOME_OPTION, 1 );
}

/** New sections that can replace an old one or be added at the end. */
function mdm_new_section_choices() {
	return array(
		'reels'    => array( 'New video rows (4 per row, animated)', '[mdm_reels_showcase head="no"]' ),
		'services' => array( 'What we make (services)', '[mdm_services]' ),
		'pricing'  => array( 'Pricing (Image / Video / GIF plans)', '[mdm_pricing]' ),
		'impact'  => array( 'The difference we make (stacked case cards)', '[mdm_impact_cards]' ),
		'how'     => array( 'How it works (4 coloured steps)', '[mdm_how_it_works]' ),
		'numbers' => array( 'Real growth / By the numbers', '[mdm_numbers]' ),
		'about'   => array( 'About Million Dollar Media', '[mdm_about]' ),
		'cases'   => array( 'Case studies (Lead Gen / E-Commerce)', '[mdm_case_studies]' ),
		'faq'     => array( 'FAQ chat', '[mdm_faq]' ),
	);
}

function mdm_new_homepage_active( $pid = null ) {
	$pid = null === $pid ? mdm_design_pid() : $pid;
	if ( isset( $_GET['mdm_new_home'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		return mdm_preview_requested();
	}
	return (bool) mdm_design_get( $pid, 'on', mdm_is_front_pid( $pid ) ? 1 : false );
}

/** True when the current page is shown with its new sections. */
function mdm_new_home_applies() {
	$pid = is_admin() ? 0 : mdm_design_pid();
	if ( ! $pid || ! mdm_new_homepage_active( $pid ) ) {
		return false;
	}
	if ( isset( $_GET['elementor-preview'] ) || isset( $_GET['preview'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		return false;
	}
	return true;
}

/* ------------------------------------------------------------------ */
/* Reading the homepage's Elementor sections                          */
/* ------------------------------------------------------------------ */

function mdm_front_page_id() {
	return (int) get_option( 'page_on_front' );
}

function mdm_el_text( $el, &$videos ) {
	$out = '';
	if ( isset( $el['widgetType'] ) && in_array( $el['widgetType'], array( 'video', 'html' ), true ) ) {
		$videos++;
	}
	if ( ! empty( $el['settings'] ) && is_array( $el['settings'] ) ) {
		foreach ( array( 'title', 'editor', 'text', 'description_text', 'title_text', 'heading', 'button_text', 'html' ) as $k ) {
			if ( ! empty( $el['settings'][ $k ] ) && is_string( $el['settings'][ $k ] ) ) {
				$out .= ' ' . wp_strip_all_tags( $el['settings'][ $k ] );
			}
		}
	}
	if ( ! empty( $el['elements'] ) && is_array( $el['elements'] ) ) {
		foreach ( $el['elements'] as $child ) {
			$out .= ' ' . mdm_el_text( $child, $videos );
		}
	}
	return $out;
}

function mdm_front_page_outline( $pid = null ) {
	$id = null === $pid ? mdm_design_pid() : (int) $pid;
	if ( ! $id ) {
		return array();
	}
	$raw  = get_post_meta( $id, '_elementor_data', true );
	$data = is_array( $raw ) ? $raw : json_decode( (string) $raw, true );
	if ( ! is_array( $data ) ) {
		return array();
	}
	$outline = array();
	foreach ( $data as $el ) {
		if ( empty( $el['id'] ) ) {
			continue;
		}
		$videos    = 0;
		$text      = trim( preg_replace( '/\s+/', ' ', html_entity_decode( mdm_el_text( $el, $videos ) ) ) );
		$outline[] = array( 'id' => (string) $el['id'], 'text' => $text, 'videos' => $videos, 'el' => $el );
	}
	return $outline;
}

/** Suggested action for a section, from its content. */
function mdm_default_action( $s, $index ) {
	if ( 0 === $index ) {
		return 'keep';
	}
	$t = $s['text'];
	if ( $s['videos'] >= 3 && preg_match( '/\b(roofing|recruitment|hvac)\b/i', $t ) ) {
		return 'reels';
	}
	if ( preg_match( '/^\s*powered by \$?50m/i', $t ) ) {
		return 'impact';
	}
	if ( preg_match( '/^\s*how it works/i', $t ) ) {
		return 'how';
	}
	// The service list is already on the page (the "VSLs / UGC Ads / YouTube / Podcast..." section),
	// so the old "Next-Gen Videos" block is hidden instead of becoming a second services section.
	if ( preg_match( '/^\s*next-gen videos/i', $t ) ) {
		return 'remove';
	}
	if ( preg_match( '/special launch pricing/i', $t ) ) {
		return 'pricing';
	}
	// Merged into the new sections (services / numbers / FAQ), so hidden.
	if ( preg_match( '/^\s*(youtube videos|trusted by titans|since 2019|the latest)\b/i', $t ) ) {
		return 'remove';
	}
	if ( preg_match( '/^\s*(faq|frequently asked)/i', $t ) ) {
		return 'faq';
	}
	return 'keep';
}

/** id => action for every section (saved choice, else the suggestion). */
function mdm_section_map( $outline = null, $pid = null ) {
	$pid     = null === $pid ? mdm_design_pid() : (int) $pid;
	$outline = null === $outline ? mdm_front_page_outline( $pid ) : $outline;
	$saved   = mdm_design_get( $pid, 'map', array() );
	$saved   = is_array( $saved ) ? $saved : array();
	$front   = mdm_is_front_pid( $pid );
	// Choices saved by an older version did not know later suggestions: apply those.
	$version = $front ? (int) mdm_design_get( $pid, 'v', 1 ) : 3;
	$map     = array();
	foreach ( $outline as $k => $s ) {
		// Other pages start with everything kept; you choose what to replace.
		$suggest         = $front ? mdm_default_action( $s, $k ) : 'keep';
		$map[ $s['id'] ] = isset( $saved[ $s['id'] ] ) ? $saved[ $s['id'] ] : $suggest;
		if ( $version < 2 && 'keep' === $map[ $s['id'] ] && in_array( $suggest, array( 'pricing', 'remove' ), true ) ) {
			$map[ $s['id'] ] = $suggest;
		}
		if ( $version < 3 && 'services' === $map[ $s['id'] ] && 'remove' === $suggest ) {
			$map[ $s['id'] ] = 'remove'; // v3: no duplicate services section
		}
	}
	return $map;
}

/** New sections added at the end (those not already used as a replacement). */
function mdm_extra_sections( $map, $pid = null ) {
	$pid    = null === $pid ? mdm_design_pid() : (int) $pid;
	$extras = mdm_design_get( $pid, 'extras', mdm_is_front_pid( $pid ) ? array( 'numbers', 'about', 'cases', 'faq' ) : array() );
	$extras = is_array( $extras ) ? $extras : array();
	$used   = array_values( $map );
	return array_values( array_filter( $extras, static function ( $e ) use ( $used ) { return ! in_array( $e, $used, true ); } ) );
}

/**
 * Videos of an Elementor section, in page order, each with the category heading above it.
 * Supports Elementor Video widgets (self-hosted / external MP4, YouTube, Vimeo) and HTML widgets
 * with <video>, <source> or <iframe>. Mobile-only duplicates and repeats are skipped.
 *
 * @return array{items: array<int, array{label:string, src:string, type:string, poster:string}>, more: string}
 */
function mdm_extract_videos( $el ) {
	$items = array();
	$seen  = array();
	$label = '';
	$more  = '';
	$walk  = static function ( $node ) use ( &$walk, &$items, &$seen, &$label, &$more ) {
		$set = isset( $node['settings'] ) && is_array( $node['settings'] ) ? $node['settings'] : array();
		// Skip anything hidden on desktop (usually a mobile copy of the same video).
		if ( ! empty( $set['hide_desktop'] ) ) {
			return;
		}
		$type = isset( $node['widgetType'] ) ? $node['widgetType'] : '';
		if ( 'heading' === $type && ! empty( $set['title'] ) ) {
			$t = trim( wp_strip_all_tags( $set['title'] ) );
			if ( '' !== $t && strlen( $t ) < 40 && ! preg_match( '/watch more|get videos/i', $t ) ) {
				$label = $t;
			}
		}
		if ( 'button' === $type && ! empty( $set['text'] ) && preg_match( '/watch more|see more|view more/i', $set['text'] ) && ! empty( $set['link']['url'] ) && '' === $more ) {
			$more = $set['link']['url'];
		}
		$found = array();
		if ( 'video' === $type ) {
			$vt     = isset( $set['video_type'] ) ? $set['video_type'] : 'youtube';
			$poster = ! empty( $set['image_overlay']['url'] ) && ! empty( $set['show_image_overlay'] ) ? $set['image_overlay']['url'] : '';
			if ( 'hosted' === $vt ) {
				$src = ! empty( $set['insert_url'] ) && ! empty( $set['external_url']['url'] ) ? $set['external_url']['url'] : ( isset( $set['hosted_url']['url'] ) ? $set['hosted_url']['url'] : '' );
				$found[] = array( $src, 'file', $poster );
			} elseif ( 'vimeo' === $vt && ! empty( $set['vimeo_url'] ) ) {
				$found[] = array( $set['vimeo_url'], 'vimeo', $poster );
			} elseif ( 'youtube' === $vt && ! empty( $set['youtube_url'] ) ) {
				$found[] = array( $set['youtube_url'], 'youtube', $poster );
			}
		} elseif ( 'html' === $type && ! empty( $set['html'] ) ) {
			$html   = $set['html'];
			$poster = preg_match( '/poster=["\']([^"\']+)/i', $html, $pm ) ? $pm[1] : '';
			if ( preg_match_all( '/<(?:video|source)[^>]+src=["\']([^"\']+\.(?:mp4|webm|mov|m3u8)[^"\']*)/i', $html, $mm ) ) {
				$found[] = array( $mm[1][0], 'file', $poster );
			} elseif ( preg_match( '/<iframe[^>]+src=["\']([^"\']+)/i', $html, $im ) ) {
				$found[] = array( $im[1], preg_match( '/vimeo/i', $im[1] ) ? 'vimeo' : ( preg_match( '/youtu/i', $im[1] ) ? 'youtube' : 'iframe' ), $poster );
			}
		}
		foreach ( $found as $f ) {
			$src = trim( html_entity_decode( (string) $f[0] ) );
			if ( '' === $src || isset( $seen[ $src ] ) ) {
				continue;
			}
			$seen[ $src ] = true;
			$items[]      = array( 'label' => $label ? $label : 'Video', 'src' => $src, 'type' => $f[1], 'poster' => (string) $f[2] );
		}
		if ( ! empty( $node['elements'] ) && is_array( $node['elements'] ) ) {
			foreach ( $node['elements'] as $child ) {
				$walk( $child );
			}
		}
	};
	$walk( $el );
	return array( 'items' => $items, 'more' => $more );
}

/* ------------------------------------------------------------------ */
/* Front end                                                           */
/* ------------------------------------------------------------------ */

/** [start, end) of the element whose opening tag carries data-id="$id". */
function mdm_element_bounds( $html, $id ) {
	$pos = strpos( $html, 'data-id="' . $id . '"' );
	if ( false === $pos ) {
		return null;
	}
	$start = strrpos( substr( $html, 0, $pos ), '<' );
	if ( false === $start || ! preg_match( '/^<([a-z0-9]+)/i', substr( $html, $start, 20 ), $m ) ) {
		return null;
	}
	$tag   = strtolower( $m[1] );
	$depth = 0;
	if ( ! preg_match_all( '/<(\/?)' . $tag . '\b[^>]*>/i', $html, $tags, PREG_OFFSET_CAPTURE, $start ) ) {
		return null;
	}
	foreach ( $tags[0] as $i => $t ) {
		$depth += ( '/' === $tags[1][ $i ][0] ) ? -1 : 1;
		if ( 0 === $depth ) {
			return array( $start, $t[1] + strlen( $t[0] ) );
		}
	}
	return null;
}

add_filter(
	'the_content',
	static function ( $content ) {
		static $done = false;
		if ( $done || ! mdm_new_home_applies() || ! in_the_loop() || ! is_main_query() ) {
			return $content;
		}
		$outline = mdm_front_page_outline();
		if ( ! $outline || false === strpos( $content, 'data-id="' . $outline[0]['id'] . '"' ) ) {
			return $content;
		}
		$done    = true;
		$map     = mdm_section_map( $outline );
		$choices = mdm_new_section_choices();

		// 1. Cut the page into its top-level sections.
		$blocks = array();
		foreach ( $outline as $k => $s ) {
			$b = mdm_element_bounds( $content, $s['id'] );
			if ( $b ) {
				$blocks[] = array( 'section' => $s, 'index' => $k, 'start' => $b[0], 'end' => $b[1] );
			}
		}
		if ( ! $blocks ) {
			return $content;
		}
		$region_start = $blocks[0]['start'];
		$region_end   = $blocks[ count( $blocks ) - 1 ]['end'];

		// 2. Kept old sections stay where they are; new sections take the slots of the
		//    sections they replace, plus extra slots after the last replaced one.
		$items     = array(); // pos => html (old) or key (new)
		$new_slots = array();
		$new_keys  = array();
		$last_slot = null;
		foreach ( $blocks as $blk ) {
			$pos    = ( $blk['index'] + 1 ) * 100;
			$action = isset( $map[ $blk['section']['id'] ] ) ? $map[ $blk['section']['id'] ] : 'keep';
			if ( 'keep' === $action ) {
				$items[ $pos ] = array( 'html', substr( $content, $blk['start'], $blk['end'] - $blk['start'] ) );
			} elseif ( isset( $choices[ $action ] ) ) {
				$new_slots[] = $pos;
				$new_keys[]  = $action;
				$last_slot   = $pos;
				if ( 'reels' === $action ) {
					$reels_source = $blk['section']['el'];
				}
			}
		}
		$faq = false;
		foreach ( mdm_extra_sections( $map ) as $key ) {
			if ( 'faq' === $key ) {
				$faq = true; // FAQ always closes the page, just before the footer
				continue;
			}
			if ( isset( $choices[ $key ] ) ) {
				$last_slot   = null === $last_slot ? ( count( $outline ) + 1 ) * 100 : $last_slot;
				$last_slot  += 1;
				$new_slots[] = $last_slot;
				$new_keys[]  = $key;
			}
		}
		if ( in_array( 'faq', $new_keys, true ) ) {
			$faq      = true;
			$i        = array_search( 'faq', $new_keys, true );
			unset( $new_keys[ $i ], $new_slots[ $i ] );
		}

		// 3. Fill the new-section slots in a natural reading order
		//    (work -> results -> process -> price -> numbers -> proof -> about).
		$flow = apply_filters( 'mdm_homepage_flow', array( 'reels', 'impact', 'services', 'how', 'pricing', 'numbers', 'cases', 'about' ) );
		usort( $new_keys, static function ( $a, $b ) use ( $flow ) {
			$ia = array_search( $a, $flow, true );
			$ib = array_search( $b, $flow, true );
			return ( false === $ia ? 99 : $ia ) - ( false === $ib ? 99 : $ib );
		} );
		sort( $new_slots );
		foreach ( array_values( $new_slots ) as $i => $pos ) {
			$items[ $pos ] = array( 'new', $new_keys[ $i ], 'reels' === $new_keys[ $i ] && isset( $reels_source ) ? $reels_source : null );
		}
		if ( $faq ) {
			$items[ PHP_INT_MAX - 1 ] = array( 'new', 'faq' );
		}
		ksort( $items );

		// 4. Render.
		$kept_text = '';
		$out       = '';
		foreach ( $items as $item ) {
			if ( 'html' === $item[0] ) {
				$out       .= $item[1];
				$kept_text .= ' ' . $item[1];
				continue;
			}
			$sc = $choices[ $item[1] ][1];
			// The new video rows play the ORIGINAL videos and categories of the section they replace.
			$reels_items = null;
			if ( 'reels' === $item[1] && ! empty( $item[2] ) ) {
				$reels_items = mdm_extract_videos( $item[2] );
				if ( $reels_items['items'] ) {
					add_filter( 'mdm_reels_source', $f = static function () use ( $reels_items ) { return $reels_items; } );
				}
			}
			// Don't repeat the "80% creative" intro if a kept section above already shows it.
			if ( 'reels' === $item[1] && false !== stripos( wp_strip_all_tags( $kept_text ), '80% creative' ) ) {
				$sc = str_replace( ']', ' intro=""]', $sc );
			}
			$out .= '<div class="mdm-newhome">' . do_shortcode( $sc ) . '</div>';
			if ( isset( $f ) ) {
				remove_filter( 'mdm_reels_source', $f );
				unset( $f );
			}
		}
		$content = substr( $content, 0, $region_start ) . $out . substr( $content, $region_end );
		return $content;
	},
	9999
);

add_filter(
	'body_class',
	static function ( $classes ) {
		if ( mdm_new_home_applies() ) {
			$classes[] = 'mdm-new-home';
		}
		return $classes;
	}
);

add_action(
	'wp_head',
	static function () {
		if ( ! mdm_new_home_applies() ) {
			return;
		}
		?>
		<style id="mdm-new-home">
			/* sticky sections need ancestors without overflow:hidden */
			body.mdm-new-home #page, body.mdm-new-home .site, body.mdm-new-home .site-content,
			body.mdm-new-home .ast-container, body.mdm-new-home #primary { overflow: visible !important; }
			body.mdm-new-home { overflow-x: clip; }
			.mdm-newhome { width: 100%; max-width: none; }
		</style>
		<?php
	},
	99
);

/* ------------------------------------------------------------------ */
/* Page cache                                                          */
/* ------------------------------------------------------------------ */

function mdm_clear_page_cache() {
	$dir = WP_CONTENT_DIR . '/cache/page-cache';
	if ( is_dir( $dir ) ) {
		foreach ( (array) glob( $dir . '/*.html' ) as $file ) {
			if ( is_file( $file ) ) {
				@unlink( $file ); // phpcs:ignore WordPress.PHP.NoSilencedErrors
			}
		}
	}
	do_action( 'litespeed_purge_all' );
	if ( function_exists( 'wp_cache_flush' ) ) {
		wp_cache_flush();
	}
}

/* ------------------------------------------------------------------ */
/* Admin screen                                                        */
/* ------------------------------------------------------------------ */

add_action(
	'admin_menu',
	static function () {
		add_options_page( 'Page Designer', 'Page Designer', 'manage_options', 'mdm-new-homepage', 'mdm_render_homepage_settings' );
	}
);

add_action(
	'admin_post_mdm_homepage_save',
	static function () {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'Not allowed.' );
		}
		check_admin_referer( 'mdm_homepage_save' );

		$pid = isset( $_POST['mdm_pid'] ) ? absint( $_POST['mdm_pid'] ) : mdm_front_page_id();
		$GLOBALS['mdm_admin_pid'] = $pid;
		$msg = 'saved';
		if ( isset( $_POST['mdm_clear_cache'] ) ) {
			$msg = 'cleared';
		} elseif ( isset( $_POST['mdm_reset'] ) ) {
			mdm_design_set( $pid, array( 'map' => null, 'extras' => null, 'v' => null ) );
			$msg = 'reset';
		} else {
			$allowed = array_merge( array( 'keep', 'remove' ), array_keys( mdm_new_section_choices() ) );
			$map     = array();
			if ( ! empty( $_POST['mdm_map'] ) && is_array( $_POST['mdm_map'] ) ) {
				foreach ( wp_unslash( $_POST['mdm_map'] ) as $id => $action ) { // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
					$id     = sanitize_key( $id );
					$action = sanitize_key( $action );
					if ( $id && in_array( $action, $allowed, true ) ) {
						$map[ $id ] = $action;
					}
				}
			}
			$extras = array();
			if ( ! empty( $_POST['mdm_extra'] ) && is_array( $_POST['mdm_extra'] ) ) {
				foreach ( wp_unslash( $_POST['mdm_extra'] ) as $e ) { // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
					$e = sanitize_key( $e );
					if ( isset( mdm_new_section_choices()[ $e ] ) ) {
						$extras[] = $e;
					}
				}
			}
			mdm_design_set( $pid, array( 'map' => $map, 'extras' => $extras, 'v' => 3, 'on' => ! empty( $_POST['mdm_use_new'] ) ? 1 : 0 ) );
			// Site-wide settings.
			update_option( MDM_HOME_MENU_OPTION, ! empty( $_POST['mdm_menu'] ) ? 1 : 0 );
			update_option( MDM_HOME_FOOT_OPTION, ! empty( $_POST['mdm_footer'] ) ? 1 : 0 );
			update_option( MDM_SITE_ANIM_OPTION, ! empty( $_POST['mdm_anim'] ) ? 1 : 0 );
			update_option( MDM_SITE_SHOP_OPTION, ! empty( $_POST['mdm_shop'] ) ? 1 : 0 );
			update_option( MDM_SITE_LIGHT_OPTION, ! empty( $_POST['mdm_light'] ) ? 1 : 0 );
		}
		mdm_clear_page_cache();
		wp_safe_redirect( admin_url( 'options-general.php?page=mdm-new-homepage&design_page=' . $pid . '&mdm=' . $msg ) );
		exit;
	}
);

add_action(
	'admin_notices',
	static function () {
		if ( ! current_user_can( 'manage_options' ) || get_option( MDM_HOME_OPTION, 1 ) ) {
			return;
		}
		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
		if ( $screen && 'settings_page_mdm-new-homepage' === $screen->id ) {
			return;
		}
		printf(
			'<div class="notice notice-info"><p><strong>The new design is ready</strong> (your hero stays the same). <a href="%s" target="_blank">Preview</a> or <a href="%s">open the Page Designer</a>.</p></div>',
			esc_url( home_url( '/?mdm_new_home=1' ) ),
			esc_url( admin_url( 'options-general.php?page=mdm-new-homepage' ) )
		);
	}
);

/** Pages built with Elementor (the ones the designer can work on). */
function mdm_designable_pages() {
	$pages = get_posts(
		array(
			'post_type'      => 'page',
			'post_status'    => array( 'publish', 'private', 'draft' ),
			'posts_per_page' => 200,
			'orderby'        => 'title',
			'order'          => 'ASC',
			'meta_key'       => '_elementor_data', // phpcs:ignore WordPress.DB.SlowDBQuery
		)
	);
	$front = mdm_front_page_id();
	usort( $pages, static function ( $a, $b ) use ( $front ) {
		return ( (int) ( $b->ID === $front ) ) - ( (int) ( $a->ID === $front ) );
	} );
	return $pages;
}

function mdm_render_homepage_settings() {
	$pid = isset( $_GET['design_page'] ) ? absint( $_GET['design_page'] ) : mdm_front_page_id(); // phpcs:ignore WordPress.Security.NonceVerification
	$pid = $pid ? $pid : mdm_front_page_id();
	$GLOBALS['mdm_admin_pid'] = $pid;
	$front   = mdm_is_front_pid( $pid );
	$on      = (bool) mdm_design_get( $pid, 'on', $front ? 1 : false );
	$menu    = (bool) get_option( MDM_HOME_MENU_OPTION, 0 );
	$footer  = (bool) get_option( MDM_HOME_FOOT_OPTION, 1 );
	$anim    = (bool) get_option( MDM_SITE_ANIM_OPTION, 1 );
	$shop    = (bool) get_option( MDM_SITE_SHOP_OPTION, 1 );
	$light   = (bool) get_option( MDM_SITE_LIGHT_OPTION, 0 );
	$outline = mdm_front_page_outline( $pid );
	$map     = mdm_section_map( $outline, $pid );
	$choices = mdm_new_section_choices();
	$extras  = mdm_design_get( $pid, 'extras', $front ? array( 'numbers', 'about', 'cases', 'faq' ) : array() );
	$extras  = is_array( $extras ) ? $extras : array();
	$msg     = isset( $_GET['mdm'] ) ? sanitize_key( $_GET['mdm'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
	$url     = $pid ? get_permalink( $pid ) : home_url( '/' );
	$preview = add_query_arg( 'mdm_new_home', 1, $url );
	$title   = $pid ? get_the_title( $pid ) : 'Homepage';
	?>
	<div class="wrap">
		<h1>Page Designer</h1>
		<?php if ( 'saved' === $msg ) : ?>
			<div class="notice notice-success"><p>Saved. The page cache was cleared too. <a href="<?php echo esc_url( $on ? $url : $preview ); ?>" target="_blank">View ↗</a></p></div>
		<?php elseif ( 'cleared' === $msg ) : ?>
			<div class="notice notice-success"><p>Page cache cleared.</p></div>
		<?php elseif ( 'reset' === $msg ) : ?>
			<div class="notice notice-success"><p>Section choices reset.</p></div>
		<?php endif; ?>

		<form method="get" style="margin:14px 0 6px">
			<input type="hidden" name="page" value="mdm-new-homepage">
			<label for="mdm-page-pick"><strong>Page:</strong></label>
			<select id="mdm-page-pick" name="design_page" onchange="this.form.submit()" style="min-width:320px">
				<?php foreach ( mdm_designable_pages() as $pg ) :
					$is_on = (bool) mdm_design_get( $pg->ID, 'on', mdm_is_front_pid( $pg->ID ) ? 1 : false );
					?>
					<option value="<?php echo (int) $pg->ID; ?>" <?php selected( $pg->ID, $pid ); ?>>
						<?php echo esc_html( ( mdm_is_front_pid( $pg->ID ) ? '★ Homepage: ' : '' ) . ( $pg->post_title ? $pg->post_title : '(no title)' ) . ( $is_on ? '  ✓ new design on' : '' ) ); ?>
					</option>
				<?php endforeach; ?>
			</select>
			<noscript><button class="button">Open</button></noscript>
		</form>

		<p style="font-size:15px">Status of <strong><?php echo esc_html( $title ); ?></strong>:
			<?php echo $on ? '<strong style="color:#1a7f37">new design LIVE</strong>' : '<strong style="color:#9a6700">old design showing</strong>'; ?>
			&nbsp; <a class="button" href="<?php echo esc_url( $preview ); ?>" target="_blank">Preview ↗</a>
		</p>

		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<?php wp_nonce_field( 'mdm_homepage_save' ); ?>
			<input type="hidden" name="action" value="mdm_homepage_save">
			<input type="hidden" name="mdm_pid" value="<?php echo (int) $pid; ?>">

			<h2>1. Sections of this page</h2>
			<?php if ( ! $outline ) : ?>
				<div class="notice notice-warning inline"><p>This page has no Elementor sections to work with.</p></div>
			<?php else : ?>
				<p>Choose what happens to each section. <strong>Keep</strong> leaves it exactly as it is now.<?php echo $front ? '' : ' On this page everything starts as "Keep".'; ?></p>
				<table class="widefat striped" style="max-width:1100px">
					<thead><tr><th style="width:36px">#</th><th>Section content</th><th style="width:360px">What to do</th></tr></thead>
					<tbody>
					<?php foreach ( $outline as $k => $s ) :
						$cur = isset( $map[ $s['id'] ] ) ? $map[ $s['id'] ] : 'keep';
						?>
						<tr<?php echo 'keep' !== $cur ? ' style="background:#fff4f4"' : ''; ?>>
							<td><?php echo (int) ( $k + 1 ); ?></td>
							<td><?php echo esc_html( $s['text'] ? wp_trim_words( $s['text'], 16 ) : '(no text: images / videos)' ); ?><?php echo $s['videos'] ? ' <em>(' . (int) $s['videos'] . ' video blocks)</em>' : ''; ?>
								<?php if ( 'reels' === $cur ) :
									$vx = mdm_extract_videos( $s['el'] );
									?>
									<br><small style="color:<?php echo $vx['items'] ? '#1a7f37' : '#b32d2e'; ?>">
										<?php
										if ( $vx['items'] ) {
											$labels = array_unique( wp_list_pluck( $vx['items'], 'label' ) );
											echo esc_html( sprintf( '✔ Uses your %d original videos: %s', count( $vx['items'] ), implode( ', ', $labels ) ) );
										} else {
											echo esc_html( '✘ No videos could be read from this section, sample videos would be shown. Send this screen to your developer.' );
										}
										?>
									</small>
								<?php endif; ?>
							</td>
							<td>
								<select name="mdm_map[<?php echo esc_attr( $s['id'] ); ?>]" style="width:100%">
									<option value="keep" <?php selected( $cur, 'keep' ); ?>>Keep as it is</option>
									<?php foreach ( $choices as $key => $c ) : ?>
										<option value="<?php echo esc_attr( $key ); ?>" <?php selected( $cur, $key ); ?>>Replace with: <?php echo esc_html( $c[0] ); ?></option>
									<?php endforeach; ?>
									<option value="remove" <?php selected( $cur, 'remove' ); ?>>Remove (hide)</option>
								</select>
							</td>
						</tr>
					<?php endforeach; ?>
					</tbody>
				</table>
			<?php endif; ?>

			<h2>2. Add new sections at the end of this page</h2>
			<?php foreach ( array( 'numbers', 'about', 'cases', 'faq', 'services', 'pricing', 'impact', 'how', 'reels' ) as $key ) : ?>
				<label style="display:block;margin:4px 0"><input type="checkbox" name="mdm_extra[]" value="<?php echo esc_attr( $key ); ?>" <?php checked( in_array( $key, $extras, true ) ); ?>> <?php echo esc_html( $choices[ $key ][0] ); ?></label>
			<?php endforeach; ?>
			<p class="description">A section already chosen as a replacement above is not added twice.</p>

			<h2>3. Go live for this page</h2>
			<p style="font-size:15px"><label><input type="checkbox" name="mdm_use_new" value="1" <?php checked( $on ); ?>> <strong><?php echo $front ? 'Switch the new design on (homepage + new footer/menu on every page)' : 'Use the new sections on this page'; ?></strong></label></p>

			<h2>4. Whole website</h2>
			<p><label><input type="checkbox" name="mdm_anim" value="1" <?php checked( $anim ); ?>> Smooth animations on every page (sections fade in while scrolling, page transitions, scroll progress line, button &amp; image hover effects)</label></p>
			<p><label><input type="checkbox" name="mdm_light" value="1" <?php checked( $light ); ?>> Light theme converter for your existing Elementor sections (not recommended: it repaints your original dark sections; photos and videos are never changed)</label></p>
			<p><label><input type="checkbox" name="mdm_shop" value="1" <?php checked( $shop ); ?>> New design for cart, checkout and order-received pages</label></p>
			<p><label><input type="checkbox" name="mdm_footer" value="1" <?php checked( $footer ); ?>> Use the new footer on every page</label></p>
			<p><label><input type="checkbox" name="mdm_menu" value="1" <?php checked( $menu ); ?>> Use the new floating menu on every page</label></p>
			<p class="description">The new footer and menu go live together with the homepage switch above. Animations and the checkout design work on their own.</p>

			<p>
				<button type="submit" class="button button-primary button-hero">Save</button>
				&nbsp; <button type="submit" name="mdm_reset" value="1" class="button">Reset section choices for this page</button>
			</p>
			<p class="description">Use Preview to check first. Untick and save at any time to go back. Nothing in Elementor is changed or deleted.</p>
			<hr>
			<p><button type="submit" name="mdm_clear_cache" value="1" class="button">Clear page cache</button></p>
		</form>
	</div>
	<?php
}
