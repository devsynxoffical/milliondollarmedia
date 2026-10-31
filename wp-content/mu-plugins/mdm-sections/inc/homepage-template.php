<?php
/**
 * Full-page template for the new homepage (see homepage.php).
 * Keeps wp_head()/wp_footer() so the Meta Pixel, Klaviyo, chat widgets and
 * SEO tags keep working, but skips the theme's own header and footer.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
	<style>
		html, body.mdm-home { margin: 0 !important; padding: 0 !important; background: #F6F5F2 !important; overflow-x: hidden; }
		body.mdm-home { font-family: Inter, system-ui, sans-serif; }
		body.mdm-home .mdm-reels { padding-top: clamp(110px, 12vw, 160px); }
	</style>
</head>
<body <?php body_class( 'mdm-home' ); ?> id="top">
<?php
if ( function_exists( 'wp_body_open' ) ) {
	wp_body_open();
}

echo '<main id="mdm-main">';
foreach ( mdm_homepage_sections() as $shortcode ) {
	echo do_shortcode( $shortcode ); // phpcs:ignore WordPress.Security.EscapeOutput
}
echo '</main>';

wp_footer();
?>
</body>
</html>
