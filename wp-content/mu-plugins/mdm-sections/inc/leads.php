<?php
/**
 * Lead capture: a 2-step "free video ad plan" form (industry + budget, then contact details).
 * Leads are saved in WordPress (admin menu "Leads") and emailed to the business address.
 * Spam protection: honeypot, minimum fill time, per-IP rate limit. Fires GA4 / Meta Lead events on success.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_leads_email() {
	return apply_filters( 'mdm_leads_email', 'vaishali@milliondollarmedia.us' );
}

add_action(
	'init',
	static function () {
		register_post_type(
			'mdm_lead',
			array(
				'label'           => 'Leads',
				'labels'          => array( 'name' => 'Leads', 'singular_name' => 'Lead', 'all_items' => 'All leads' ),
				'public'          => false,
				'show_ui'         => true,
				'show_in_menu'    => true,
				'menu_position'   => 3,
				'menu_icon'       => 'dashicons-email-alt',
				'supports'        => array( 'title', 'editor' ),
				'capability_type' => 'post',
				'capabilities'    => array( 'create_posts' => 'do_not_allow' ),
				'map_meta_cap'    => true,
				'show_in_rest'    => false,
			)
		);
	}
);

add_filter(
	'manage_mdm_lead_posts_columns',
	static function ( $c ) {
		return array( 'cb' => $c['cb'], 'title' => 'Name', 'mdm_contact' => 'Contact', 'mdm_need' => 'Industry / budget', 'mdm_src' => 'Page', 'date' => 'Date' );
	}
);
add_action(
	'manage_mdm_lead_posts_custom_column',
	static function ( $col, $id ) {
		$m = static function ( $k ) use ( $id ) { return esc_html( (string) get_post_meta( $id, $k, true ) ); };
		if ( 'mdm_contact' === $col ) {
			echo $m( '_email' ) . '<br>' . $m( '_phone' ); // phpcs:ignore
		} elseif ( 'mdm_need' === $col ) {
			echo $m( '_industry' ) . '<br>' . $m( '_budget' ); // phpcs:ignore
		} elseif ( 'mdm_src' === $col ) {
			echo $m( '_page' ); // phpcs:ignore
		}
	},
	10,
	2
);

/* ------------------------------------------------------------------ */
/* Endpoint                                                            */
/* ------------------------------------------------------------------ */

add_action(
	'rest_api_init',
	static function () {
		register_rest_route(
			'mdm/v1',
			'/lead',
			array(
				'methods'             => 'POST',
				'permission_callback' => '__return_true',
				'callback'            => 'mdm_leads_submit',
			)
		);
		// Admin-only: Vimeo thumbnail proxy, used to review which portfolio videos fit a page.
		register_rest_route(
			'mdm/v1',
			'/vthumb/(?P<id>\d{5,12})',
			array(
				'methods'             => 'GET',
				'permission_callback' => static function () { return current_user_can( 'manage_options' ); },
				'callback'            => static function ( $req ) {
					$u = function_exists( 'mdm_video_thumb' ) ? mdm_video_thumb( 'https://vimeo.com/' . $req['id'], 'vimeo' ) : '';
					if ( ! $u ) {
						return new WP_Error( 'none', 'no thumbnail', array( 'status' => 404 ) );
					}
					$r = wp_remote_get( $u, array( 'timeout' => 15 ) );
					if ( is_wp_error( $r ) ) {
						return $r;
					}
					return array( 'url' => $u, 'jpg' => base64_encode( wp_remote_retrieve_body( $r ) ) );
				},
			)
		);
	}
);

function mdm_leads_submit( WP_REST_Request $req ) {
	$p = $req->get_json_params();
	if ( ! is_array( $p ) ) {
		$p = $req->get_params();
	}
	$get = static function ( $k, $max = 200 ) use ( $p ) { return isset( $p[ $k ] ) ? substr( sanitize_text_field( wp_unslash( (string) $p[ $k ] ) ), 0, $max ) : ''; };

	// Bots: honeypot filled, or form sent faster than a human can fill it.
	if ( '' !== $get( 'company_site' ) || ( (int) $get( 'ms' ) > 0 && (int) $get( 'ms' ) < 2500 ) ) {
		return array( 'ok' => true );
	}
	$ip  = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
	$key = 'mdm_lead_rl_' . md5( $ip );
	$n   = (int) get_transient( $key );
	if ( $n >= 5 ) {
		return new WP_Error( 'rate', 'Too many requests. Please try again later or message us on WhatsApp.', array( 'status' => 429 ) );
	}
	set_transient( $key, $n + 1, HOUR_IN_SECONDS );

	$name  = $get( 'name', 100 );
	$email = sanitize_email( $get( 'email', 150 ) );
	$phone = $get( 'phone', 40 );
	if ( '' === $name || ( ! is_email( $email ) && strlen( preg_replace( '/\D/', '', $phone ) ) < 7 ) ) {
		return new WP_Error( 'invalid', 'Please add your name and a valid email or phone number.', array( 'status' => 400 ) );
	}
	$f = array(
		'_email'    => $email,
		'_phone'    => $phone,
		'_website'  => esc_url_raw( $get( 'website', 200 ) ),
		'_industry' => $get( 'industry', 80 ),
		'_budget'   => $get( 'budget', 80 ),
		'_goal'     => $get( 'goal', 80 ),
		'_page'     => esc_url_raw( $get( 'page', 300 ) ),
		'_source'   => $get( 'source', 60 ),
	);
	$msg  = substr( sanitize_textarea_field( wp_unslash( (string) ( $p['message'] ?? '' ) ) ), 0, 2000 );
	$body = "Name: {$name}\nEmail: {$email}\nPhone / WhatsApp: {$phone}\nWebsite: {$f['_website']}\nIndustry: {$f['_industry']}\nMonthly ad budget: {$f['_budget']}\nGoal: {$f['_goal']}\nForm: {$f['_source']}\nPage: {$f['_page']}\n\nMessage:\n{$msg}";

	$id = wp_insert_post( array( 'post_type' => 'mdm_lead', 'post_status' => 'private', 'post_title' => $name . ( $f['_industry'] ? ' (' . $f['_industry'] . ')' : '' ), 'post_content' => $body ), true );
	if ( ! is_wp_error( $id ) ) {
		foreach ( $f as $k => $v ) {
			update_post_meta( $id, $k, $v );
		}
	}
	$headers = array( 'Content-Type: text/plain; charset=UTF-8' );
	if ( is_email( $email ) ) {
		$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
	}
	$sent = wp_mail( mdm_leads_email(), 'New lead: ' . $name . ( $f['_industry'] ? ' - ' . $f['_industry'] : '' ), $body, $headers );
	if ( ! is_wp_error( $id ) ) {
		update_post_meta( $id, '_mailed', $sent ? 'yes' : 'no' );
	}
	return array( 'ok' => true );
}

/* ------------------------------------------------------------------ */
/* Form                                                                */
/* ------------------------------------------------------------------ */

function mdm_leadform_html( $source = 'page', $title = 'Get a free video ad plan', $sub = 'Tell us about your business and we will send you a short plan: the hooks and video formats we would test first, based on campaigns like yours.' ) {
	static $n = 0;
	$n++;
	$industries = array( 'Roofing', 'HVAC', 'Plumbing', 'Home services', 'Law firm / MVA', 'Real estate / mortgage', 'Solar', 'SaaS', 'Coaching / consulting', 'Agency (white label)', 'E-commerce / DTC', 'Other' );
	$budgets    = array( 'Not running ads yet', 'Under $1k / month', '$1k–5k / month', '$5k–20k / month', '$20k+ / month' );
	$uid        = 'mdmlf' . $n;
	ob_start();
	?>
	<section class="mdm-lf" id="<?php echo 1 === $n ? 'free-plan' : esc_attr( $uid ); ?>">
		<div class="mdm-lf__in">
			<div class="mdm-lf__pitch">
				<span class="mdm-niche__pill">Free, no obligation</span>
				<h2 class="mdm-lf__h2"><?php echo esc_html( $title ); ?></h2>
				<p><?php echo esc_html( $sub ); ?></p>
				<ul class="mdm-lf__points">
					<li><b>247</b> published case studies to learn from</li>
					<li><b>24–48h</b> delivery on most videos</li>
					<li><b>From $34.97</b> per video, no retainer</li>
				</ul>
				<a class="mdm-lf__wa" href="<?php echo esc_url( MDM_Sections::whatsapp_url() ); ?>" target="_blank" rel="noopener">Prefer WhatsApp? Message us →</a>
			</div>
			<form class="mdm-lf__form" data-mdm-lf novalidate>
				<input type="hidden" name="source" value="<?php echo esc_attr( $source ); ?>">
				<div class="mdm-lf__hp" aria-hidden="true"><label>Company website<input type="text" name="company_site" tabindex="-1" autocomplete="off"></label></div>
				<div class="mdm-lf__bar"><i></i></div>
				<fieldset class="mdm-lf__step is-on" data-step="1">
					<legend>1. What is your business?</legend>
					<div class="mdm-lf__chips" role="radiogroup">
						<?php foreach ( $industries as $i ) : ?><label><input type="radio" name="industry" value="<?php echo esc_attr( $i ); ?>"><span><?php echo esc_html( $i ); ?></span></label><?php endforeach; ?>
					</div>
					<legend class="mdm-lf__sub">Monthly ad budget</legend>
					<div class="mdm-lf__chips is-small" role="radiogroup">
						<?php foreach ( $budgets as $b ) : ?><label><input type="radio" name="budget" value="<?php echo esc_attr( $b ); ?>"><span><?php echo esc_html( $b ); ?></span></label><?php endforeach; ?>
					</div>
					<button type="button" class="mdm-lf__next" data-next>Continue <span aria-hidden="true">→</span></button>
				</fieldset>
				<fieldset class="mdm-lf__step" data-step="2">
					<legend>2. Where should we send your plan?</legend>
					<div class="mdm-lf__grid">
						<label>Your name<input type="text" name="name" required autocomplete="name"></label>
						<label>Email<input type="email" name="email" autocomplete="email"></label>
						<label>WhatsApp / phone<input type="tel" name="phone" autocomplete="tel"></label>
						<label>Website (optional)<input type="url" name="website" placeholder="https://"></label>
					</div>
					<label class="mdm-lf__full">What do you want more of? (optional)<textarea name="message" rows="3" placeholder="e.g. more booked calls, lower cost per lead, new ad creatives"></textarea></label>
					<p class="mdm-lf__err" role="alert" hidden></p>
					<div class="mdm-lf__actions">
						<button type="button" class="mdm-lf__back" data-back>← Back</button>
						<button type="submit" class="mdm-lf__send">Send me the free plan</button>
					</div>
					<p class="mdm-lf__note">We reply within one business day. No spam, ever.</p>
				</fieldset>
				<div class="mdm-lf__done" hidden>
					<div class="mdm-lf__tick" aria-hidden="true">✓</div>
					<h3>Thanks, we have your details.</h3>
					<p>We will send your plan within one business day. Want to talk sooner?</p>
					<a class="mdm-ihero__btn is-red" href="<?php echo esc_url( MDM_Sections::cta_url() ); ?>">Book a free strategy call</a>
				</div>
			</form>
		</div>
	</section>
	<?php
	if ( 1 === $n ) {
		add_action( 'wp_footer', 'mdm_leadform_js', 70 );
	}
	return ob_get_clean();
}

function mdm_leadform_js() {
	?>
	<script>
	(function () {
		var api = <?php echo wp_json_encode( esc_url_raw( rest_url( 'mdm/v1/lead' ) ) ); ?>;
		document.querySelectorAll('[data-mdm-lf]').forEach(function (f) {
			var t0 = Date.now(), steps = f.querySelectorAll('.mdm-lf__step'), bar = f.querySelector('.mdm-lf__bar i'), err = f.querySelector('.mdm-lf__err');
			function go(i) { steps.forEach(function (s, k) { s.classList.toggle('is-on', k === i); }); bar.style.width = (i ? 100 : 50) + '%'; }
			go(0);
			f.querySelector('[data-next]').addEventListener('click', function () { go(1); var n = f.querySelector('[name=name]'); if (n) n.focus(); });
			f.querySelector('[data-back]').addEventListener('click', function () { go(0); });
			f.addEventListener('change', function (e) { if (e.target.name === 'industry') { /* keep step 1 visible for budget */ } });
			f.addEventListener('submit', function (e) {
				e.preventDefault();
				var d = {}; new FormData(f).forEach(function (v, k) { d[k] = v; });
				d.ms = Date.now() - t0; d.page = location.href;
				if (!d.name || (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email || '') && (d.phone || '').replace(/\D/g, '').length < 7)) { err.textContent = 'Please add your name and a valid email or phone number.'; err.hidden = false; return; }
				err.hidden = true;
				var btn = f.querySelector('.mdm-lf__send'); btn.disabled = true; btn.textContent = 'Sending…';
				fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
					.then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
					.then(function (r) {
						if (!r.ok) { throw new Error((r.j && r.j.message) || 'error'); }
						steps.forEach(function (s) { s.classList.remove('is-on'); }); f.querySelector('.mdm-lf__bar').hidden = true; f.querySelector('.mdm-lf__done').hidden = false;
						try { if (window.gtag) gtag('event', 'generate_lead', { form_location: d.source }); } catch (x) {}
						try { if (window.fbq) fbq('track', 'Lead', { content_name: d.source }); } catch (x) {}
					})
					.catch(function (x) { err.textContent = (x && x.message && x.message !== 'error') ? x.message : 'Something went wrong. Please message us on WhatsApp instead.'; err.hidden = false; btn.disabled = false; btn.textContent = 'Send me the free plan'; });
			});
		});
	})();
	</script>
	<?php
}

/* ------------------------------------------------------------------ */
/* Placement                                                           */
/* ------------------------------------------------------------------ */

add_filter(
	'the_content',
	static function ( $content ) {
		if ( is_admin() || ! in_the_loop() || ! is_main_query() || false !== strpos( $content, 'data-mdm-lf' ) ) {
			return $content;
		}
		if ( function_exists( 'mdm_current_case' ) && mdm_current_case() ) {
			return $content;
		}
		if ( is_front_page() ) {
			return $content . mdm_leadform_html( 'home' );
		}
		if ( is_page( 'portfolio' ) ) {
			return $content . mdm_leadform_html( 'portfolio', 'Want video ads like these?', 'Tell us about your business and we will send a short plan with the video formats and hooks we would test first.' );
		}
		if ( is_singular( 'post' ) ) {
			$form = mdm_leadform_html( 'blog', 'Want this done for your business?', 'Tell us about your business and we will send a short plan: the offers, hooks and video ads we would test first.' );
			$pos  = strpos( $content, '<aside class="mdm-related"' );
			return false === $pos ? $content . $form : substr( $content, 0, $pos ) . $form . substr( $content, $pos );
		}
		if ( function_exists( 'mdm_industry_slug' ) && mdm_industry_slug() ) {
			$form = mdm_leadform_html( 'service-' . mdm_industry_slug() );
			$pos  = strpos( $content, '<div class="mdm-ifaq">' );
			return false === $pos ? $content . $form : substr( $content, 0, $pos ) . $form . substr( $content, $pos );
		}
		return $content;
	},
	35
);
