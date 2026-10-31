<?php
/**
 * Shown by WordPress instead of "Error establishing a database connection".
 * Explains in plain words what is missing. Never prints passwords.
 */

if ( ! headers_sent() ) {
	header( 'HTTP/1.1 503 Service Unavailable' );
	header( 'Retry-After: 300' );
	header( 'Content-Type: text/html; charset=utf-8' );
}

$mdm_root      = defined( 'ABSPATH' ) ? rtrim( ABSPATH, '/' ) : dirname( __DIR__ );
$mdm_above     = dirname( $mdm_root ) . '/wp-config-server.php';
$mdm_inside    = $mdm_root . '/wp-config-server.php';
$mdm_has_above = @is_readable( $mdm_above ); // phpcs:ignore
$mdm_has_in    = @is_readable( $mdm_inside ); // phpcs:ignore
$mdm_config    = @file_get_contents( $mdm_root . '/wp-config.php' ); // phpcs:ignore
$mdm_new_code  = is_string( $mdm_config ) && false !== strpos( $mdm_config, 'wp-config-server.php' );
$mdm_host      = defined( 'DB_HOST' ) ? DB_HOST : '';
$mdm_fallback  = in_array( $mdm_host, array( '127.0.0.1', '' ), true ) && defined( 'DB_NAME' ) && 'milliondollarmedia_local' === DB_NAME;

$mdm_file_ok   = false;
$mdm_is_repo   = false; // the copy was made from the Git version of wp-config.php
$mdm_name_hint = '';
foreach ( array( $mdm_above, $mdm_inside ) as $f ) {
	$src = @file_get_contents( $f ); // phpcs:ignore
	if ( ! is_string( $src ) ) {
		continue;
	}
	if ( false !== strpos( $src, 'wp_configure_database_from_env' ) || false !== strpos( $src, 'wp-config-server.php' ) ) {
		$mdm_is_repo = true;
	}
	if ( preg_match( "/define\\s*\\(\\s*['\"]DB_NAME['\"]\\s*,\\s*['\"]([^'\"]+)['\"]/", $src, $mm ) && 'milliondollarmedia_local' !== $mm[1] ) {
		$mdm_file_ok   = true;
		$mdm_name_hint = substr( $mm[1], 0, 4 ) . str_repeat( '•', max( 0, strlen( $mm[1] ) - 4 ) );
	}
	break;
}
?><!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Site maintenance</title>
<style>
body{margin:0;background:#f6f5f2;font:16px/1.55 system-ui,-apple-system,Segoe UI,sans-serif;color:#111}
.box{max-width:720px;margin:8vh auto;background:#fff;border-radius:16px;padding:32px;box-shadow:0 10px 40px -20px rgba(0,0,0,.3)}
h1{margin:0 0 6px;font-size:24px} .ok{color:#1a7f37} .bad{color:#ED1C24} li{margin:6px 0} code{background:#f2f2f2;padding:2px 6px;border-radius:4px}
.fix{background:#fff4f4;border-left:4px solid #ED1C24;padding:14px 18px;border-radius:8px;margin-top:18px}
</style></head><body><div class="box">
<h1>We'll be right back.</h1>
<p>The website can't reach its database right now.</p>
<p><strong>For the site owner, the checklist below shows what's wrong:</strong></p>
<ul>
	<li class="<?php echo $mdm_new_code ? 'ok' : 'bad'; ?>"><?php echo $mdm_new_code ? '✔' : '✘'; ?> Latest code deployed (wp-config.php reads <code>wp-config-server.php</code>)</li>
	<li class="<?php echo ( $mdm_has_above || $mdm_has_in ) ? 'ok' : 'bad'; ?>"><?php echo ( $mdm_has_above || $mdm_has_in ) ? '✔' : '✘'; ?> <code>wp-config-server.php</code> found <?php echo $mdm_has_above ? '(above public_html)' : ( $mdm_has_in ? '(in public_html)' : '' ); ?></li>
	<li class="<?php echo $mdm_file_ok ? 'ok' : 'bad'; ?>"><?php echo $mdm_file_ok ? '✔' : '✘'; ?> That file contains your real database name<?php echo $mdm_name_hint ? ' (<code>' . htmlspecialchars( $mdm_name_hint ) . '</code>)' : ''; ?><?php echo $mdm_is_repo ? ' — it is a copy of the <em>new</em> wp-config.php, made after a deploy' : ''; ?></li>
	<li class="<?php echo $mdm_fallback ? 'bad' : 'ok'; ?>"><?php echo $mdm_fallback ? '✘ Using the placeholder database (127.0.0.1)' : '✔ Using the server database settings (the database itself may be down)'; ?></li>
</ul>
<div class="fix">
<?php if ( ! $mdm_new_code ) : ?>
	<strong>Fix:</strong> Hostinger deployed an older branch. In hPanel → Git, set the branch to <code>claude/awesome-volta-2thvq6</code> (or merge it into main) and click Deploy.
<?php elseif ( ! $mdm_has_above && ! $mdm_has_in ) : ?>
	<strong>Fix:</strong> Restore <code>public_html/wp-config.php</code> from a Hostinger backup taken <em>before</em> the deploy (hPanel → Files → Backups), then in File Manager copy it and name the copy <code>wp-config-server.php</code>.
<?php elseif ( ! $mdm_file_ok ) : ?>
	<strong>Fix:</strong> <code>wp-config-server.php</code> is a copy of the wrong file (it has no real database name). Restore <code>wp-config.php</code> from a backup taken <em>before</em> the first deploy, copy it again as <code>wp-config-server.php</code> (replace the old one), then deploy.
<?php elseif ( $mdm_fallback ) : ?>
	<strong>Fix:</strong> The file is there but was not loaded yet. Click Deploy again in hPanel → Git (branch <code>claude/awesome-volta-2thvq6</code>) and reload this page.
<?php else : ?>
	<strong>Fix:</strong> The settings look right, so the database server may be down or the password changed. Check hPanel → Databases, or contact Hostinger support.
<?php endif; ?>
</div>
</div></body></html>
<?php
exit;
