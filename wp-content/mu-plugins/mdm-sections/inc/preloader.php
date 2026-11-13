<?php
/**
 * Opening loader on the front page: "We create VSLs / Images / GIFs / Videos / UGC / AI Videos / Short Form".
 * Shown on every load / refresh of the homepage. Disable with: add_filter( 'mdm_preloader_enabled', '__return_false' );
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'wp_body_open', 'mdm_render_preloader', 1 );

function mdm_render_preloader() {
	// Homepage: the full "We create ..." animation. Other pages: a quick version that leaves as soon
	// as the page has loaded, so visitors never look at a blank white screen.
	$front   = is_front_page();
	$enabled = ! is_admin()
		&& ! ( function_exists( 'mdm_is_shop_page' ) && mdm_is_shop_page() )
		&& ! is_feed()
		&& ! isset( $_GET['elementor-preview'] ) // phpcs:ignore WordPress.Security.NonceVerification
		&& ! isset( $_GET['preview'] ); // phpcs:ignore WordPress.Security.NonceVerification

	if ( ! apply_filters( 'mdm_preloader_enabled', $enabled ) ) {
		return;
	}

	$words  = apply_filters( 'mdm_preloader_words', array( 'VSLs', 'Images', 'GIFs', 'Videos', 'UGC', 'AI Videos', 'Short Form' ) );
	$colors = array( '#ED1C24', '#111114', '#ED1C24', '#111114', '#ED1C24', '#111114', '#ED1C24' );
	?>
	<style>
		.mdm-loader{position:fixed;inset:0;z-index:2147483000;background:#fff;color:#111114;display:flex;align-items:center;justify-content:center;font-family:'Syncopate','Arial Black',sans-serif;font-weight:700;overflow:hidden;transition:transform 1s cubic-bezier(.77,0,.18,1),border-radius 1s cubic-bezier(.77,0,.18,1);animation:mdmLoaderFailsafe .01s 6s forwards}
		.mdm-loader[data-quick]{animation-delay:4s}
		.mdm-loader.is-done{transform:translateY(-100%);border-radius:0 0 50% 50%/0 0 12vh 12vh}
		.mdm-loader.is-gone{display:none}
		.mdm-loader__kicker,.mdm-loader__brand{position:absolute;font:600 13px/1 Inter,system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(17,17,20,.55)}
		.mdm-loader__kicker{top:28px;left:28px}
		.mdm-loader__brand{bottom:32px;right:28px}
		.mdm-loader__count{position:absolute;bottom:20px;left:24px;font-size:clamp(56px,10vw,140px);line-height:1;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
		.mdm-loader__words{position:relative;height:1.2em;font-size:clamp(40px,9vw,128px);line-height:1.2;text-transform:uppercase;overflow:hidden;text-align:center;width:100%}
		.mdm-loader__word{position:absolute;left:0;right:0;top:0;transform:translateY(110%);transition:transform .45s cubic-bezier(.65,0,.35,1)}
		.mdm-loader__word span{display:inline-block;padding:0 .28em;border-radius:.4em;color:#fff}
		.mdm-loader__word.is-in{transform:translateY(0)}
		.mdm-loader__word.is-out{transform:translateY(-110%)}
		.mdm-loader__bar{position:absolute;left:0;bottom:0;height:5px;width:100%;background:#ED1C24;transform-origin:left;transform:scaleX(0)}
		html.mdm-loading,html.mdm-loading body{overflow:hidden!important}
		@keyframes mdmLoaderFailsafe{to{transform:translateY(-100%);visibility:hidden}}
		@media (max-width:600px){.mdm-loader__count{font-size:44px;bottom:22px}.mdm-loader__brand{font-size:10px;bottom:28px;right:20px;letter-spacing:.14em}.mdm-loader__kicker{top:22px;left:22px}}
		@media (prefers-reduced-motion:reduce){.mdm-loader{display:none}}
	</style>
	<div class="mdm-loader" id="mdm-loader" role="presentation" aria-hidden="true"<?php echo $front ? '' : ' data-quick="1"'; ?>>
		<span class="mdm-loader__kicker">We create</span>
		<div class="mdm-loader__words">
			<?php foreach ( $words as $k => $w ) : ?>
				<span class="mdm-loader__word"><span style="background:<?php echo esc_attr( $colors[ $k % count( $colors ) ] ); ?>"><?php echo esc_html( $w ); ?></span></span>
			<?php endforeach; ?>
		</div>
		<span class="mdm-loader__count"><span id="mdm-loader-num">0</span>%</span>
		<span class="mdm-loader__brand">Million Dollar Media</span>
		<span class="mdm-loader__bar" id="mdm-loader-bar"></span>
	</div>
	<script>
	(function(){
		var el=document.getElementById('mdm-loader');
		if(!el)return;
		// Shown on every load / refresh of the homepage.
		if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.classList.add('is-gone');return;}
		document.documentElement.classList.add('mdm-loading');
		var words=el.querySelectorAll('.mdm-loader__word'),num=document.getElementById('mdm-loader-num'),bar=document.getElementById('mdm-loader-bar');
		var quick=el.hasAttribute('data-quick'),loaded=document.readyState==='complete';
		window.addEventListener('load',function(){loaded=true;});
		var step=quick?150:320,total=quick?900:step*words.length+250,start=performance.now(),idx=-1;
		function show(i){var p=words[(i-1+words.length)%words.length];if(p&&p!==words[i]){p.classList.remove('is-in');p.classList.add('is-out');}words[i].classList.remove('is-out');words[i].classList.add('is-in');}
		function tick(now){
			var t=Math.min(1,(now-start)/total),e=1-Math.pow(1-t,3);
			num.textContent=Math.round(e*100);bar.style.transform='scaleX('+e+')';
			var w=quick?Math.floor((now-start)/step)%words.length:Math.min(words.length-1,Math.floor((now-start)/step));
			if(w!==idx){idx=w;show(w);}
			// quick mode: keep going until the page has loaded (max 3.5s)
			if(t<1||(quick&&!loaded&&now-start<3500)){requestAnimationFrame(tick);}else{setTimeout(done,quick?120:350);}
		}
		function done(){
			el.classList.add('is-done');
			document.documentElement.classList.remove('mdm-loading');
			document.dispatchEvent(new CustomEvent('mdm:loaded'));
			setTimeout(function(){el.classList.add('is-gone');},1100);
		}
		requestAnimationFrame(tick);
	})();
	</script>
	<?php
}
