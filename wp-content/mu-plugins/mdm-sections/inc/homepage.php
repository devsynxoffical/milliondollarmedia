<?php
/**
 * One-click new homepage.
 *
 * WordPress admin -> Settings -> New Homepage:
 *   - "Use the new homepage" checkbox: the front page is rendered from the
 *     MDM sections (menu, video grid, impact cards, how it works, numbers,
 *     about, case studies, FAQ, footer) instead of the Elementor page.
 *   - Preview link: /?mdm_new_home=1 shows the new homepage without switching.
 *   - "Clear page cache" button.
 * Unticking the box brings the old Elementor homepage straight back.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const MDM_HOME_OPTION = 'mdm_use_new_homepage';

/** Sections of the new homepage, in order. Change with the "mdm_homepage_sections" filter. */
function mdm_homepage_sections() {
	return apply_filters(
		'mdm_homepage_sections',
		array(
			'[mdm_menu]',
			'[mdm_reels_showcase]',
			'[mdm_impact_cards]',
			'[mdm_how_it_works]',
			'[mdm_numbers]',
			'[mdm_about]',
			'[mdm_case_studies]',
			'[mdm_faq]',
			'[mdm_footer]',
		)
	);
}

function mdm_new_homepage_active() {
	if ( isset( $_GET['mdm_new_home'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		return '0' !== $_GET['mdm_new_home']; // phpcs:ignore WordPress.Security.NonceVerification
	}
	return (bool) get_option( MDM_HOME_OPTION, false );
}

/* ---------------- front end ---------------- */

add_filter(
	'template_include',
	static function ( $template ) {
		if ( is_admin() || ! is_front_page() || ! mdm_new_homepage_active() ) {
			return $template;
		}
		if ( isset( $_GET['elementor-preview'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
			return $template;
		}
		return __DIR__ . '/homepage-template.php';
	},
	99
);

// The preloader also runs on the preview URL (it is the front page there too).

/* ---------------- page cache ---------------- */

function mdm_clear_page_cache() {
	$dir   = WP_CONTENT_DIR . '/cache/page-cache';
	$count = 0;
	if ( is_dir( $dir ) ) {
		foreach ( (array) glob( $dir . '/*.html' ) as $file ) {
			if ( is_file( $file ) && @unlink( $file ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors
				$count++;
			}
		}
	}
	// LiteSpeed Cache plugin (Hostinger), if active.
	do_action( 'litespeed_purge_all' );
	if ( function_exists( 'wp_cache_flush' ) ) {
		wp_cache_flush();
	}
	return $count;
}

/* ---------------- admin screen ---------------- */

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
			mdm_clear_page_cache();
			$msg = 'cleared';
		} else {
			update_option( MDM_HOME_OPTION, ! empty( $_POST['mdm_use_new'] ) ? 1 : 0 );
			mdm_clear_page_cache();
		}
		wp_safe_redirect( admin_url( 'options-general.php?page=mdm-new-homepage&mdm=' . $msg ) );
		exit;
	}
);

// Show a reminder on the dashboard while the new homepage is not switched on.
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
			'<div class="notice notice-info"><p><strong>New homepage is ready.</strong> <a href="%s" target="_blank">Preview it</a> or <a href="%s">switch it on</a>.</p></div>',
			esc_url( home_url( '/?mdm_new_home=1' ) ),
			esc_url( admin_url( 'options-general.php?page=mdm-new-homepage' ) )
		);
	}
);

function mdm_render_homepage_settings() {
	$on  = (bool) get_option( MDM_HOME_OPTION, false );
	$msg = isset( $_GET['mdm'] ) ? sanitize_key( $_GET['mdm'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
	?>
	<div class="wrap">
		<h1>New Homepage</h1>
		<?php if ( 'saved' === $msg ) : ?>
			<div class="notice notice-success"><p>Saved. The page cache was cleared too.</p></div>
		<?php elseif ( 'cleared' === $msg ) : ?>
			<div class="notice notice-success"><p>Page cache cleared.</p></div>
		<?php endif; ?>

		<p style="font-size:15px">Status:
			<?php if ( $on ) : ?>
				<strong style="color:#1a7f37">The new homepage is LIVE.</strong>
			<?php else : ?>
				<strong style="color:#9a6700">Your old homepage is showing.</strong>
			<?php endif; ?>
		</p>

		<p><a class="button button-secondary" href="<?php echo esc_url( home_url( '/?mdm_new_home=1' ) ); ?>" target="_blank">1. Preview the new homepage ↗</a></p>

		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<?php wp_nonce_field( 'mdm_homepage_save' ); ?>
			<input type="hidden" name="action" value="mdm_homepage_save">
			<p style="font-size:15px">
				<label><input type="checkbox" name="mdm_use_new" value="1" <?php checked( $on ); ?>> <strong>2. Use the new homepage</strong></label>
			</p>
			<p><button type="submit" class="button button-primary button-hero">Save</button></p>
			<p class="description">Untick and save at any time to bring the old homepage back. Nothing in Elementor is changed or deleted.</p>
			<hr>
			<p><button type="submit" name="mdm_clear_cache" value="1" class="button">Clear page cache</button>
			<span class="description">Use this if a change does not show up.</span></p>
		</form>
	</div>
	<?php
}
