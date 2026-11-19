<?php
/**
 * Site-wide announcement bar above the header: "BFCM Sale Is ON! Use Code: BFCM20".
 * The code is a real WooCommerce coupon (20% off, all products). Turn the bar off with
 * add_filter( 'mdm_announce', '__return_false' ) or change the text with the same filter.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_announce_settings() {
	return apply_filters(
		'mdm_announce',
		array(
			'text' => 'BFCM Sale Is ON!',
			'code' => 'BFCM20',
			'cta'  => 'Shop now',
			'url'  => home_url( '/pricing/' ),
		)
	);
}

add_action(
	'wp_body_open',
	static function () {
		$a = mdm_announce_settings();
		if ( ! $a || is_admin() ) {
			return;
		}
		?>
		<div class="mdm-announce" role="region" aria-label="Sale announcement">
			<div class="mdm-announce__in">
				<span class="mdm-announce__fire" aria-hidden="true">🔥</span>
				<b><?php echo esc_html( $a['text'] ); ?></b>
				<span class="mdm-announce__use">Use Code:</span>
				<button type="button" class="mdm-announce__code" data-code="<?php echo esc_attr( $a['code'] ); ?>" aria-label="<?php echo esc_attr( 'Copy code ' . $a['code'] ); ?>"><?php echo esc_html( $a['code'] ); ?><i aria-hidden="true">Copy</i></button>
				<a class="mdm-announce__cta" href="<?php echo esc_url( $a['url'] ); ?>"><?php echo esc_html( $a['cta'] ); ?> →</a>
			</div>
		</div>
		<script>
		(function () {
			var b = document.querySelector('.mdm-announce__code');
			if (!b) return;
			b.addEventListener('click', function () {
				var c = b.getAttribute('data-code'), i = b.querySelector('i');
				var done = function () { i.textContent = 'Copied!'; b.classList.add('is-copied'); setTimeout(function () { i.textContent = 'Copy'; b.classList.remove('is-copied'); }, 1800); };
				try { navigator.clipboard.writeText(c).then(done, done); } catch (e) { done(); }
			});
		})();
		</script>
		<?php
	},
	1
);
