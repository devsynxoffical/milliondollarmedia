<?php
/**
 * Opening loader on the front page: "We create VSLs / Images / GIFs / Videos / UGC / AI Videos / Short Form".
 * Shown once per browser session. Disable with: add_filter( 'mdm_preloader_enabled', '__return_false' );
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'wp_body_open', 'mdm_render_preloader', 1 );

function mdm_render_preloader() {
	$enabled = is_front_page()
		&& ! is_admin()
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
		@media (prefers-reduced-motion:reduce){.mdm-loader{display:none}}
	</style>
	<div class="mdm-loader" id="mdm-loader" role="presentation" aria-hidden="true">
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
		var seen=false;
		try{seen=sessionStorage.getItem('mdmLoaderSeen')==='1';}catch(e){}
		if(seen||matchMedia('(prefers-reduced-motion: reduce)').matches){el.classList.add('is-gone');return;}
		try{sessionStorage.setItem('mdmLoaderSeen','1');}catch(e){}
		document.documentElement.classList.add('mdm-loading');
		var words=el.querySelectorAll('.mdm-loader__word'),num=document.getElementById('mdm-loader-num'),bar=document.getElementById('mdm-loader-bar');
		var step=320,total=step*words.length+250,start=performance.now(),idx=-1;
		function show(i){if(words[i-1]){words[i-1].classList.remove('is-in');words[i-1].classList.add('is-out');}words[i].classList.add('is-in');}
		function tick(now){
			var t=Math.min(1,(now-start)/total),e=1-Math.pow(1-t,3);
			num.textContent=Math.round(e*100);bar.style.transform='scaleX('+e+')';
			var w=Math.min(words.length-1,Math.floor((now-start)/step));
			if(w!==idx){idx=w;show(w);}
			if(t<1){requestAnimationFrame(tick);}else{setTimeout(done,350);}
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
