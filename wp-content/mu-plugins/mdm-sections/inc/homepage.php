<?php
/**
 * New homepage: KEEP the top of the existing Elementor homepage (header, hero,
 * next section) and replace everything from the video section downwards with
 * the MDM sections.
 *
 * WordPress admin -> Settings -> New Homepage:
 *   - Lists the homepage's own Elementor sections; pick the one to start replacing from
 *     (pre-selected: the video section with Roofing / Recruitment / HVAC).
 *   - "Switch on" checkbox, preview link (/?mdm_new_home=1), "Clear page cache".
 * Nothing in Elementor is edited or deleted; untick the box to get the old page back.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const MDM_HOME_OPTION      = 'mdm_use_new_homepage';
const MDM_HOME_CUT_OPTION  = 'mdm_new_home_cut_id';
const MDM_HOME_MENU_OPTION = 'mdm_new_home_menu';
const MDM_HOME_FOOT_OPTION = 'mdm_new_home_footer';

/** Sections added below the kept part, in order. Filter: mdm_homepage_sections. */
function mdm_homepage_sections() {
	return apply_filters(
		'mdm_homepage_sections',
		array(
			'[mdm_reels_showcase head="no"]',
			'[mdm_impact_cards]',
			'[mdm_how_it_works]',
			'[mdm_numbers]',
			'[mdm_about]',
			'[mdm_case_studies]',
			'[mdm_faq]',
		)
	);
}

function mdm_new_homepage_active() {
	if ( isset( $_GET['mdm_new_home'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		return '0' !== $_GET['mdm_new_home']; // phpcs:ignore WordPress.Security.NonceVerification
	}
	return (bool) get_option( MDM_HOME_OPTION, false );
}

function mdm_new_home_applies() {
	if ( is_admin() || ! is_front_page() || ! mdm_new_homepage_active() ) {
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

/** Collect readable text from an Elementor element tree. */
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

/** Top-level sections of the homepage: id, label, video count. */
function mdm_front_page_outline() {
	$id = mdm_front_page_id();
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
		$videos = 0;
		$text   = trim( preg_replace( '/\s+/', ' ', html_entity_decode( mdm_el_text( $el, $videos ) ) ) );
		$outline[] = array(
			'id'     => (string) $el['id'],
			'text'   => $text,
			'videos' => $videos,
		);
	}
	return $outline;
}

/** The section to start replacing from: saved choice, else the detected video section. */
function mdm_cut_id( $outline = null ) {
	$saved = (string) get_option( MDM_HOME_CUT_OPTION, '' );
	if ( '' !== $saved ) {
		return $saved;
	}
	$outline = null === $outline ? mdm_front_page_outline() : $outline;
	foreach ( $outline as $k => $s ) {
		if ( $k > 0 && preg_match( '/\b(roofing|recruitment|hvac|agency owners)\b/i', $s['text'] ) ) {
			return $s['id'];
		}
	}
	foreach ( $outline as $k => $s ) {
		if ( $k > 0 && $s['videos'] >= 3 ) {
			return $s['id'];
		}
	}
	return '';
}

/* ------------------------------------------------------------------ */
/* Front end: cut the Elementor content and append the new sections   */
/* ------------------------------------------------------------------ */

add_filter(
	'the_content',
	static function ( $content ) {
		static $done = false;
		if ( $done || ! mdm_new_home_applies() || ! in_the_loop() || ! is_main_query() ) {
			return $content;
		}
		$cut = mdm_cut_id();
		if ( '' === $cut ) {
			return $content;
		}
		$pos = strpos( $content, 'data-id="' . $cut . '"' );
		if ( false === $pos ) {
			return $content;
		}
		$start = strrpos( substr( $content, 0, $pos ), '<' );
		if ( false === $start ) {
			return $content;
		}
		$done = true;

		$kept = substr( $content, 0, $start );
		// How many wrapper <div>s are still open at the cut point - close them after our sections.
		$depth = max( 0, preg_match_all( '/<div[\s>]/i', $kept ) - preg_match_all( '/<\/div>/i', $kept ) );

		// Keep the intro line above the videos if it lived inside the replaced section.
		$intro = false === stripos( wp_strip_all_tags( $kept ), '80% creative' ) ? '' : ' intro=""';

		$new = '';
		foreach ( mdm_homepage_sections() as $sc ) {
			if ( '' !== $intro && false !== strpos( $sc, 'mdm_reels_showcase' ) ) {
				$sc = str_replace( ']', $intro . ']', $sc );
			}
			$new .= do_shortcode( $sc );
		}
		if ( get_option( MDM_HOME_FOOT_OPTION, 1 ) ) {
			$new .= do_shortcode( '[mdm_footer]' );
		}

		return $kept . '<div class="mdm-newhome">' . $new . '</div>' . str_repeat( '</div>', $depth );
	},
	9999
);

// New menu (optional) on the front page.
add_action(
	'wp_body_open',
	static function () {
		if ( mdm_new_home_applies() && get_option( MDM_HOME_MENU_OPTION, 0 ) ) {
			echo do_shortcode( '[mdm_menu]' ); // phpcs:ignore WordPress.Security.EscapeOutput
		}
	},
	20
);

add_filter(
	'body_class',
	static function ( $classes ) {
		if ( mdm_new_home_applies() ) {
			$classes[] = 'mdm-new-home';
			if ( get_option( MDM_HOME_FOOT_OPTION, 1 ) ) {
				$classes[] = 'mdm-new-footer';
			}
			if ( get_option( MDM_HOME_MENU_OPTION, 0 ) ) {
				$classes[] = 'mdm-new-menu';
			}
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
			body.mdm-new-home .ast-container, body.mdm-new-home #primary, body.mdm-new-home .elementor { overflow: visible !important; }
			body.mdm-new-home { overflow-x: clip; }
			.mdm-newhome { width: 100%; max-width: none; }
			/* old footer is replaced by [mdm_footer] */
			body.mdm-new-footer .site-footer, body.mdm-new-footer #colophon,
			body.mdm-new-footer .elementor-location-footer, body.mdm-new-footer [data-elementor-type="footer"] { display: none !important; }
			/* old header hidden only when the new menu is switched on */
			body.mdm-new-menu .site-header, body.mdm-new-menu #masthead,
			body.mdm-new-menu .elementor-location-header, body.mdm-new-menu [data-elementor-type="header"] { display: none !important; }
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
	do_action( 'litespeed_purge_all' ); // LiteSpeed Cache (Hostinger), if active
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
		add_options_page( 'New Homepage', 'New Homepage', 'manage_options', 'mdm-new-homepage', 'mdm_render_homepage_settings' );
	}
);

add_action(
	'admin_post_mdm_homepage_save',
	static function () {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'Not allowed.' );
		}
		check_admin_referer( 'mdm_homepage_save' );

		$msg = 'saved';
		if ( isset( $_POST['mdm_clear_cache'] ) ) {
			$msg = 'cleared';
		} else {
			update_option( MDM_HOME_OPTION, ! empty( $_POST['mdm_use_new'] ) ? 1 : 0 );
			update_option( MDM_HOME_MENU_OPTION, ! empty( $_POST['mdm_menu'] ) ? 1 : 0 );
			update_option( MDM_HOME_FOOT_OPTION, ! empty( $_POST['mdm_footer'] ) ? 1 : 0 );
			if ( isset( $_POST['mdm_cut'] ) ) {
				update_option( MDM_HOME_CUT_OPTION, sanitize_key( wp_unslash( $_POST['mdm_cut'] ) ) );
			}
		}
		mdm_clear_page_cache();
		wp_safe_redirect( admin_url( 'options-general.php?page=mdm-new-homepage&mdm=' . $msg ) );
		exit;
	}
);

add_action(
	'admin_notices',
	static function () {
		if ( ! current_user_can( 'manage_options' ) || get_option( MDM_HOME_OPTION, false ) ) {
			return;
		}
		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
		if ( $screen && 'settings_page_mdm-new-homepage' === $screen->id ) {
			return;
		}
		printf(
			'<div class="notice notice-info"><p><strong>New sections are ready</strong> (your hero stays the same). <a href="%s" target="_blank">Preview</a> or <a href="%s">switch on</a>.</p></div>',
			esc_url( home_url( '/?mdm_new_home=1' ) ),
			esc_url( admin_url( 'options-general.php?page=mdm-new-homepage' ) )
		);
	}
);

function mdm_render_homepage_settings() {
	$on      = (bool) get_option( MDM_HOME_OPTION, false );
	$menu    = (bool) get_option( MDM_HOME_MENU_OPTION, 0 );
	$footer  = (bool) get_option( MDM_HOME_FOOT_OPTION, 1 );
	$outline = mdm_front_page_outline();
	$cut     = mdm_cut_id( $outline );
	$msg     = isset( $_GET['mdm'] ) ? sanitize_key( $_GET['mdm'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
	$replace = false;
	?>
	<div class="wrap">
		<h1>New Homepage</h1>
		<?php if ( 'saved' === $msg ) : ?>
			<div class="notice notice-success"><p>Saved. The page cache was cleared too.</p></div>
		<?php elseif ( 'cleared' === $msg ) : ?>
			<div class="notice notice-success"><p>Page cache cleared.</p></div>
		<?php endif; ?>

		<p style="font-size:15px">Status:
			<?php echo $on ? '<strong style="color:#1a7f37">New sections are LIVE.</strong>' : '<strong style="color:#9a6700">Your old homepage is showing.</strong>'; ?>
		</p>
		<p><a class="button" href="<?php echo esc_url( home_url( '/?mdm_new_home=1' ) ); ?>" target="_blank">Preview ↗</a></p>

		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<?php wp_nonce_field( 'mdm_homepage_save' ); ?>
			<input type="hidden" name="action" value="mdm_homepage_save">

			<h2>Your homepage sections</h2>
			<?php if ( ! $outline ) : ?>
				<div class="notice notice-warning inline"><p>Could not read the homepage's Elementor sections (Settings → Reading must point to a static homepage built with Elementor).</p></div>
			<?php else : ?>
				<p>Everything <strong>above</strong> the selected section stays exactly as it is. The selected section and everything below it is replaced by the new sections.</p>
				<table class="widefat striped" style="max-width:900px">
					<thead><tr><th style="width:150px">Replace from here</th><th>#</th><th>Section content</th><th>Result</th></tr></thead>
					<tbody>
					<?php foreach ( $outline as $k => $s ) :
						if ( $s['id'] === $cut ) {
							$replace = true;
						}
						?>
						<tr>
							<td><label><input type="radio" name="mdm_cut" value="<?php echo esc_attr( $s['id'] ); ?>" <?php checked( $s['id'], $cut ); ?> <?php disabled( 0 === $k ); ?>> start here</label></td>
							<td><?php echo (int) ( $k + 1 ); ?></td>
							<td><?php echo esc_html( $s['text'] ? wp_trim_words( $s['text'], 16 ) : '(no text: images / videos)' ); ?><?php echo $s['videos'] ? ' <em>(' . (int) $s['videos'] . ' video blocks)</em>' : ''; ?></td>
							<td><?php echo $replace ? '<span style="color:#b32d2e">replaced</span>' : '<span style="color:#1a7f37">kept</span>'; ?></td>
						</tr>
					<?php endforeach; ?>
					</tbody>
				</table>
			<?php endif; ?>

			<h2>Options</h2>
			<p><label><input type="checkbox" name="mdm_footer" value="1" <?php checked( $footer ); ?>> Replace the old footer with the new footer</label></p>
			<p><label><input type="checkbox" name="mdm_menu" value="1" <?php checked( $menu ); ?>> Replace the old top menu with the new floating menu</label></p>
			<hr>
			<p style="font-size:15px"><label><input type="checkbox" name="mdm_use_new" value="1" <?php checked( $on ); ?>> <strong>Switch the new sections on for visitors</strong></label></p>
			<p><button type="submit" class="button button-primary button-hero">Save</button></p>
			<p class="description">Untick and save at any time to go back. Nothing in Elementor is changed or deleted.</p>
			<hr>
			<p><button type="submit" name="mdm_clear_cache" value="1" class="button">Clear page cache</button></p>
		</form>
	</div>
	<?php
}
