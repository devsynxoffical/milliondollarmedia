<?php
/**
 * Booking-first touches, on every front-end page:
 *  - a floating "Need custom pricing? Book a free call" button + WhatsApp,
 *    shown after the visitor scrolls past the first screen and hidden over the footer.
 * Self-contained (inline CSS/JS) so it works on every page template.
 * Turn off: add_filter( 'mdm_floating_cta', '__return_false' );
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_floating_cta_applies() {
	if ( is_admin() || wp_doing_ajax() || is_feed() || is_embed() ) {
		return false;
	}
	if ( function_exists( 'mdm_is_shop_page' ) && mdm_is_shop_page() ) {
		return false; // don't distract buyers on cart / checkout
	}
	if ( is_page( array( 'book-your-call', 'booking-confirmed' ) ) ) {
		return false; // already on the booking page
	}
	if ( isset( $_GET['elementor-preview'] ) || ( function_exists( 'mdm_site_design_active' ) && ! mdm_site_design_active() ) ) { // phpcs:ignore
		return false;
	}
	return (bool) apply_filters( 'mdm_floating_cta', true );
}

add_action(
	'wp_footer',
	static function () {
		if ( ! mdm_floating_cta_applies() ) {
			return;
		}
		$cta = MDM_Sections::cta_url();
		$wa  = add_query_arg( 'text', rawurlencode( 'Hi! I saw your website and want custom pricing for ad creatives.' ), MDM_Sections::whatsapp_url() );
		?>
		<div class="mdm-fcta" data-mdm-fcta aria-hidden="true">
			<a class="mdm-fcta__book" href="<?php echo esc_url( $cta ); ?>" tabindex="-1">
				<span class="mdm-fcta__dot" aria-hidden="true"></span>
				<span class="mdm-fcta__txt"><small>Need custom pricing?</small><b>Book a free call</b></span>
				<span class="mdm-fcta__arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
			</a>
			<a class="mdm-fcta__wa" href="<?php echo esc_url( $wa ); ?>" target="_blank" rel="noopener" aria-label="Message us on WhatsApp" tabindex="-1">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>
			</a>
		</div>
		<style>
		html .mdm-fcta{position:fixed;right:clamp(14px,2vw,28px);bottom:clamp(14px,2vw,28px);z-index:9990;display:flex;align-items:center;gap:10px;font-family:Poppins,Inter,system-ui,sans-serif;opacity:0;transform:translateY(24px) scale(.96);pointer-events:none;transition:opacity .45s ease,transform .6s cubic-bezier(.22,1,.36,1)}
		html .mdm-fcta.is-on{opacity:1;transform:none;pointer-events:auto}
		html .mdm-fcta a{text-decoration:none!important}
		html .mdm-fcta__book{display:flex;align-items:center;gap:12px;padding:9px 9px 9px 18px;border-radius:999px;background:#111114;color:#fff!important;box-shadow:0 18px 40px -14px rgba(17,17,20,.55);transition:transform .3s cubic-bezier(.22,1,.36,1),background .3s}
		html .mdm-fcta__book:hover{transform:translateY(-3px);background:#ED1C24}
		html .mdm-fcta__dot{width:9px;height:9px;border-radius:50%;background:#2BD46A;box-shadow:0 0 0 0 rgba(43,212,106,.6);animation:mdmFctaPulse 2s infinite}
		html .mdm-fcta__txt{display:flex;flex-direction:column;line-height:1.15}
		html .mdm-fcta__txt small{font-size:11.5px;opacity:.72;font-weight:500}
		html .mdm-fcta__txt b{font-size:15px;font-weight:700}
		html .mdm-fcta__arrow{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:#ED1C24;color:#fff;transition:transform .3s,background .3s}
		html .mdm-fcta__book:hover .mdm-fcta__arrow{background:#fff;color:#ED1C24;transform:rotate(-45deg)}
		html .mdm-fcta__arrow svg{width:18px;height:18px}
		html .mdm-fcta__wa{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;background:#25D366;color:#fff!important;box-shadow:0 18px 40px -14px rgba(37,211,102,.7);transition:transform .3s cubic-bezier(.22,1,.36,1)}
		html .mdm-fcta__wa:hover{transform:translateY(-3px) scale(1.05)}
		html .mdm-fcta__wa svg{width:28px;height:28px}
		@keyframes mdmFctaPulse{70%{box-shadow:0 0 0 8px rgba(43,212,106,0)}100%{box-shadow:0 0 0 0 rgba(43,212,106,0)}}
		@media (max-width:640px){
			html .mdm-fcta{left:12px;right:12px;bottom:12px}
			html .mdm-fcta__book{flex:1;justify-content:space-between}
			html .mdm-fcta__wa{width:52px;height:52px;flex:none}
		}
		@media (prefers-reduced-motion:reduce){html .mdm-fcta,html .mdm-fcta__dot{transition:none;animation:none}}
		</style>
		<script>
		(function(){
			var el=document.querySelector('[data-mdm-fcta]');if(!el)return;
			var footerSeen=false,ticking=false;
			function set(){ticking=false;var on=window.scrollY>window.innerHeight*.8&&!footerSeen;
				if(on!==el.classList.contains('is-on')){el.classList.toggle('is-on',on);el.setAttribute('aria-hidden',on?'false':'true');
				el.querySelectorAll('a').forEach(function(a){a.tabIndex=on?0:-1;});}}
			window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(set);}},{passive:true});
			if('IntersectionObserver'in window){var f=document.querySelector('.mdm-site-footer, .mdm-footer, footer.site-footer');
				if(f)new IntersectionObserver(function(e){footerSeen=e[0].isIntersecting;set();},{rootMargin:'0px 0px -80px 0px'}).observe(f);}
			set();
		})();
		</script>
		<?php
	},
	50
);
