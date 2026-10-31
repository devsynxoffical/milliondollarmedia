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

/** New sections that can replace an old one or be added at the end. */
function mdm_new_section_choices() {
	return array(
		'reels'   => array( 'New video rows (4 per row, animated)', '[mdm_reels_showcase head="no"]' ),
		'impact'  => array( 'The difference we make (stacked case cards)', '[mdm_impact_cards]' ),
		'how'     => array( 'How it works (4 coloured steps)', '[mdm_how_it_works]' ),
		'numbers' => array( 'Real growth / By the numbers', '[mdm_numbers]' ),
		'about'   => array( 'About Million Dollar Media', '[mdm_about]' ),
		'cases'   => array( 'Case studies (Lead Gen / E-Commerce)', '[mdm_case_studies]' ),
		'faq'     => array( 'FAQ chat', '[mdm_faq]' ),
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
		$videos    = 0;
		$text      = trim( preg_replace( '/\s+/', ' ', html_entity_decode( mdm_el_text( $el, $videos ) ) ) );
		$outline[] = array( 'id' => (string) $el['id'], 'text' => $text, 'videos' => $videos );
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
	if ( preg_match( '/^\s*(faq|frequently asked)/i', $t ) ) {
		return 'faq';
	}
	return 'keep';
}

/** id => action for every section (saved choice, else the suggestion). */
function mdm_section_map( $outline = null ) {
	$outline = null === $outline ? mdm_front_page_outline() : $outline;
	$saved   = get_option( MDM_HOME_MAP_OPTION, array() );
	$saved   = is_array( $saved ) ? $saved : array();
	$map     = array();
	foreach ( $outline as $k => $s ) {
		$map[ $s['id'] ] = isset( $saved[ $s['id'] ] ) ? $saved[ $s['id'] ] : mdm_default_action( $s, $k );
	}
	return $map;
}

/** New sections added at the end (those not already used as a replacement). */
function mdm_extra_sections( $map ) {
	$extras = get_option( MDM_HOME_EXTRA_OPTION, array( 'numbers', 'about', 'cases', 'faq' ) );
	$extras = is_array( $extras ) ? $extras : array();
	$used   = array_values( $map );
	return array_values( array_filter( $extras, static function ( $e ) use ( $used ) { return ! in_array( $e, $used, true ); } ) );
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

		// Where to add the extra sections + footer: right after the last section.
		$last     = end( $outline );
		$lastb    = mdm_element_bounds( $content, $last['id'] );
		$edits    = array();
		$tail     = '';
		foreach ( mdm_extra_sections( $map ) as $key ) {
			if ( isset( $choices[ $key ] ) ) {
				$tail .= do_shortcode( $choices[ $key ][1] );
			}
		}
		if ( get_option( MDM_HOME_FOOT_OPTION, 1 ) ) {
			$tail .= do_shortcode( '[mdm_footer]' );
		}
		if ( $lastb && '' !== $tail ) {
			$edits[] = array( $lastb[1], $lastb[1], '<div class="mdm-newhome">' . $tail . '</div>' );
		}

		foreach ( $outline as $s ) {
			$action = isset( $map[ $s['id'] ] ) ? $map[ $s['id'] ] : 'keep';
			if ( 'keep' === $action ) {
				continue;
			}
			$b = mdm_element_bounds( $content, $s['id'] );
			if ( ! $b ) {
				continue;
			}
			$html = '';
			if ( isset( $choices[ $action ] ) ) {
				$sc = $choices[ $action ][1];
				// Don't repeat the "80% creative" intro if a kept section above already shows it.
				if ( 'reels' === $action && false !== stripos( wp_strip_all_tags( substr( $content, 0, $b[0] ) ), '80% creative' ) ) {
					$sc = str_replace( ']', ' intro=""]', $sc );
				}
				$html = '<div class="mdm-newhome">' . do_shortcode( $sc ) . '</div>';
			}
			$edits[] = array( $b[0], $b[1], $html );
		}

		// Apply from the end so earlier offsets stay valid.
		usort( $edits, static function ( $a, $b ) { return $b[0] - $a[0]; } );
		foreach ( $edits as $e ) {
			$content = substr( $content, 0, $e[0] ) . $e[2] . substr( $content, $e[1] );
		}
		return $content;
	},
	9999
);

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
			body.mdm-new-home #page, body.mdm-new-home .site, body.mdm-new-home .site-content,
			body.mdm-new-home .ast-container, body.mdm-new-home #primary, body.mdm-new-home .elementor { overflow: visible !important; }
			body.mdm-new-home { overflow-x: clip; }
			.mdm-newhome { width: 100%; max-width: none; }
			body.mdm-new-footer .site-footer, body.mdm-new-footer #colophon,
			body.mdm-new-footer .elementor-location-footer, body.mdm-new-footer [data-elementor-type="footer"] { display: none !important; }
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
		} elseif ( isset( $_POST['mdm_reset'] ) ) {
			delete_option( MDM_HOME_MAP_OPTION );
			delete_option( MDM_HOME_EXTRA_OPTION );
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
			update_option( MDM_HOME_MAP_OPTION, $map );
			update_option( MDM_HOME_EXTRA_OPTION, $extras );
			update_option( MDM_HOME_OPTION, ! empty( $_POST['mdm_use_new'] ) ? 1 : 0 );
			update_option( MDM_HOME_MENU_OPTION, ! empty( $_POST['mdm_menu'] ) ? 1 : 0 );
			update_option( MDM_HOME_FOOT_OPTION, ! empty( $_POST['mdm_footer'] ) ? 1 : 0 );
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
			'<div class="notice notice-info"><p><strong>New sections are ready</strong> (your hero stays the same). <a href="%s" target="_blank">Preview</a> or <a href="%s">choose sections</a>.</p></div>',
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
	$map     = mdm_section_map( $outline );
	$choices = mdm_new_section_choices();
	$extras  = get_option( MDM_HOME_EXTRA_OPTION, array( 'numbers', 'about', 'cases', 'faq' ) );
	$extras  = is_array( $extras ) ? $extras : array();
	$msg     = isset( $_GET['mdm'] ) ? sanitize_key( $_GET['mdm'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
	?>
	<div class="wrap">
		<h1>New Homepage</h1>
		<?php if ( 'saved' === $msg ) : ?>
			<div class="notice notice-success"><p>Saved. The page cache was cleared too. <a href="<?php echo esc_url( home_url( $on ? '/' : '/?mdm_new_home=1' ) ); ?>" target="_blank">View ↗</a></p></div>
		<?php elseif ( 'cleared' === $msg ) : ?>
			<div class="notice notice-success"><p>Page cache cleared.</p></div>
		<?php elseif ( 'reset' === $msg ) : ?>
			<div class="notice notice-success"><p>Section choices reset to the suggestions.</p></div>
		<?php endif; ?>

		<p style="font-size:15px">Status:
			<?php echo $on ? '<strong style="color:#1a7f37">New sections are LIVE.</strong>' : '<strong style="color:#9a6700">Your old homepage is showing.</strong>'; ?>
			&nbsp; <a class="button" href="<?php echo esc_url( home_url( '/?mdm_new_home=1' ) ); ?>" target="_blank">Preview ↗</a>
		</p>

		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<?php wp_nonce_field( 'mdm_homepage_save' ); ?>
			<input type="hidden" name="action" value="mdm_homepage_save">

			<h2>1. Your homepage sections</h2>
			<?php if ( ! $outline ) : ?>
				<div class="notice notice-warning inline"><p>Could not read the homepage's Elementor sections (Settings → Reading must point to a static homepage built with Elementor).</p></div>
			<?php else : ?>
				<p>Choose what happens to each section. <strong>Keep</strong> leaves it exactly as it is now.</p>
				<table class="widefat striped" style="max-width:1100px">
					<thead><tr><th style="width:36px">#</th><th>Section content</th><th style="width:360px">What to do</th></tr></thead>
					<tbody>
					<?php foreach ( $outline as $k => $s ) :
						$cur = isset( $map[ $s['id'] ] ) ? $map[ $s['id'] ] : 'keep';
						?>
						<tr<?php echo 'keep' !== $cur ? ' style="background:#fff4f4"' : ''; ?>>
							<td><?php echo (int) ( $k + 1 ); ?></td>
							<td><?php echo esc_html( $s['text'] ? wp_trim_words( $s['text'], 16 ) : '(no text: images / videos)' ); ?><?php echo $s['videos'] ? ' <em>(' . (int) $s['videos'] . ' video blocks)</em>' : ''; ?></td>
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

			<h2>2. Add new sections at the end (before the footer)</h2>
			<?php foreach ( array( 'numbers', 'about', 'cases', 'faq', 'impact', 'how', 'reels' ) as $key ) : ?>
				<label style="display:block;margin:4px 0"><input type="checkbox" name="mdm_extra[]" value="<?php echo esc_attr( $key ); ?>" <?php checked( in_array( $key, $extras, true ) ); ?>> <?php echo esc_html( $choices[ $key ][0] ); ?></label>
			<?php endforeach; ?>
			<p class="description">A section already chosen as a replacement above is not added twice.</p>

			<h2>3. Header &amp; footer</h2>
			<p><label><input type="checkbox" name="mdm_footer" value="1" <?php checked( $footer ); ?>> Replace the old footer with the new footer</label></p>
			<p><label><input type="checkbox" name="mdm_menu" value="1" <?php checked( $menu ); ?>> Replace the old top menu with the new floating menu</label></p>

			<h2>4. Go live</h2>
			<p style="font-size:15px"><label><input type="checkbox" name="mdm_use_new" value="1" <?php checked( $on ); ?>> <strong>Switch the new sections on for visitors</strong></label></p>
			<p>
				<button type="submit" class="button button-primary button-hero">Save</button>
				&nbsp; <button type="submit" name="mdm_reset" value="1" class="button">Reset section choices to suggestions</button>
			</p>
			<p class="description">Leave "Switch on" unticked and use Preview to check first. Untick and save at any time to go back. Nothing in Elementor is changed or deleted.</p>
			<hr>
			<p><button type="submit" name="mdm_clear_cache" value="1" class="button">Clear page cache</button></p>
		</form>
	</div>
	<?php
}
