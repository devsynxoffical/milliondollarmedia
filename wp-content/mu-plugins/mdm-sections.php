<?php
/**
 * Plugin Name: Million Dollar Media - Homepage Sections
 * Description: Animated homepage sections for Elementor (add each one with a Shortcode widget):
 *              [mdm_menu] [mdm_reels_showcase] [mdm_impact_cards] [mdm_how_it_works] [mdm_numbers]
 *              [mdm_about] [mdm_case_studies] [mdm_faq] [mdm_footer]
 *              Also renders the opening loader (VSLs, Images, GIFs ...) on the front page.
 *              Section code lives in /mu-plugins/mdm-sections/inc/.
 * Version: 1.1.0
 * Author: Million Dollar Media
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class MDM_Sections {

	const VERSION = '1.1.0';

	/** @var bool */
	private static $assets_printed = false;

	public static function init() {
		$dir = __DIR__ . '/mdm-sections/inc/';
		foreach ( array( 'reels', 'impact', 'how-it-works', 'numbers', 'about', 'case-studies', 'faq', 'menu', 'footer', 'preloader', 'services', 'pricing', 'homepage', 'sitewide' ) as $part ) {
			if ( file_exists( $dir . $part . '.php' ) ) {
				require_once $dir . $part . '.php';
			}
		}
	}

	/* ------------------------------------------------------------------ */
	/* Shared helpers (used by every section in /inc)                     */
	/* ------------------------------------------------------------------ */

	public static function asset_url( $file ) {
		$path = WPMU_PLUGIN_DIR . '/mdm-sections/' . $file;
		$ver  = file_exists( $path ) ? filemtime( $path ) : self::VERSION;
		return WPMU_PLUGIN_URL . '/mdm-sections/' . $file . '?ver=' . $ver;
	}

	/**
	 * Fonts, CSS and JS, printed once inline with the first section that needs them.
	 * Inline printing (instead of wp_enqueue) means the styles are present even
	 * inside Elementor's editor preview and in header/footer templates.
	 */
	public static function assets() {
		if ( self::$assets_printed ) {
			return '';
		}
		self::$assets_printed = true;

		$fonts = 'https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500;600;700;800&display=swap';

		// The site's own fonts (Syncopate headings, Poppins text) are already stored locally by
		// Elementor; use those exact files so new sections match the rest of the page.
		$local = '';
		$upl   = wp_get_upload_dir();
		foreach ( array( 'syncopate', 'poppins' ) as $family ) {
			$rel = 'elementor/google-fonts/css/' . $family . '.css';
			if ( ! empty( $upl['basedir'] ) && file_exists( trailingslashit( $upl['basedir'] ) . $rel ) ) {
				$local .= '<link rel="stylesheet" href="' . esc_url( trailingslashit( $upl['baseurl'] ) . $rel ) . '">';
			} else {
				$local .= '<link rel="stylesheet" href="' . esc_url( 'https://fonts.googleapis.com/css2?family=' . ( 'syncopate' === $family ? 'Syncopate:wght@400;700' : 'Poppins:wght@400;500;600;700;800' ) . '&display=swap' ) . '">';
			}
		}

		return '<link rel="preconnect" href="https://fonts.googleapis.com">'
			. '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
			. '<link rel="stylesheet" href="' . esc_url( $fonts ) . '">'
			. $local
			. '<link rel="stylesheet" href="' . esc_url( self::asset_url( 'mdm-sections.css' ) ) . '">'
			. '<script src="' . esc_url( self::asset_url( 'mdm-sections.js' ) ) . '" defer></script>';
	}

	/** Where every "book a call" button points. Change once here, or pass cta_url="" to a shortcode. */
	public static function cta_url() {
		return apply_filters( 'mdm_cta_url', home_url( '/book-your-call/' ) );
	}

	public static function whatsapp_url() {
		return apply_filters( 'mdm_whatsapp_url', 'https://wa.me/918287782334' );
	}

	public static function upload_url( $relative ) {
		$upload = wp_get_upload_dir();
		return trailingslashit( $upload['baseurl'] ) . ltrim( $relative, '/' );
	}

	public static function split_list( $value ) {
		return array_values( array_filter( array_map( 'trim', explode( '|', (string) $value ) ), 'strlen' ) );
	}

	public static function verified_icon() {
		return '<svg class="mdm-verified" viewBox="0 0 24 24" aria-hidden="true"><path fill="#3B82F6" d="M12 1.5l2.6 1.9 3.2-.2 1 3 2.6 1.9-1 3 1 3-2.6 1.9-1 3-3.2-.2L12 22.5l-2.6-1.9-3.2.2-1-3-2.6-1.9 1-3-1-3 2.6-1.9 1-3 3.2.2z"/><path fill="#fff" d="M10.6 15.6l-3.2-3.2 1.4-1.4 1.8 1.8 4.6-4.6 1.4 1.4z"/></svg>';
	}

	public static function arrow_icon( $class = '' ) {
		return '<svg class="' . esc_attr( $class ) . '" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
	}

	/** Round black "→ label" button used across sections. */
	public static function button( $text, $url, $extra_class = '' ) {
		return '<a class="mdm-btn ' . esc_attr( $extra_class ) . '" href="' . esc_url( $url ) . '">'
			. '<span class="mdm-btn__icon">' . self::arrow_icon() . '</span>'
			. '<span>' . esc_html( $text ) . '</span></a>';
	}

	/**
	 * Wrap each word in spans for the rise-in animation. The word "stop" gets
	 * the stop-sign glyph in place of its "o", like the reference design.
	 */
	public static function split_words( $text, $offset = 0 ) {
		$out   = '';
		$words = preg_split( '/\s+/', trim( (string) $text ) );
		foreach ( $words as $n => $w ) {
			$html = esc_html( $w );
			if ( 'stop' === strtolower( $w ) ) {
				$html = esc_html( mb_substr( $w, 0, 2 ) ) . '<span class="mdm-stop" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="14"/><path d="M26 74L74 26" stroke="currentColor" stroke-width="14"/></svg></span>' . esc_html( mb_substr( $w, 3 ) );
			}
			$out .= '<span class="mdm-word" style="--w:' . (int) ( $n + $offset ) . '"><span class="mdm-word__in">' . $html . '</span></span> ';
		}
		return $out;
	}
}

MDM_Sections::init();
