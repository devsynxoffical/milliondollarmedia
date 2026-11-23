<?php
/**
 * /ugc-ads-examples/ page ([mdm_ugc_examples]) and the "VSL examples" section on /what-is-a-vsl/.
 * Videos come from data/ugc.json: portfolio ads reviewed by thumbnail (talking-head, UGC-style)
 * with the on-screen hook text as it appears in each video.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_ugc_examples', 'mdm_shortcode_ugc_examples' );

function mdm_ugc_data() {
	static $d = null;
	if ( null === $d ) {
		$p = dirname( __DIR__ ) . '/data/ugc.json';
		$d = file_exists( $p ) ? json_decode( (string) file_get_contents( $p ), true ) : array(); // phpcs:ignore
		$d = is_array( $d ) ? $d : array();
	}
	return $d;
}

function mdm_ugc_tile( $id, $label, $hook = '' ) {
	$thumb  = function_exists( 'mdm_video_thumb' ) ? mdm_video_thumb( 'https://vimeo.com/' . $id, 'vimeo' ) : '';
	$player = 'https://player.vimeo.com/video/' . rawurlencode( $id ) . '?autoplay=1&title=0&byline=0&portrait=0&dnt=1';
	return '<div class="mdm-ugc__video"><button type="button" class="mdm-vfacade" data-src="' . esc_url( $player ) . '" aria-label="' . esc_attr( 'Play ' . $label ) . '">'
		. ( $thumb ? '<img src="' . esc_url( $thumb ) . '" alt="' . esc_attr( $label . ( $hook ? ': ' . $hook : '' ) ) . '" loading="lazy" decoding="async">' : '' )
		. '<span class="mdm-vfacade__play" aria-hidden="true"></span></button></div>';
}

function mdm_ugc_industry_link( $industry ) {
	$map = array(
		'Roofing'        => '/roofing-video-marketing-services/',
		'HVAC'           => '/hvac-video-marketing-services/',
		'Solar'          => '/solar/',
		'MVA'            => '/mva/',
		'SAAS'           => '/saas/',
		'Electrician'    => '/home-service-business/',
		'Window & Doors' => '/home-service-business/',
	);
	return isset( $map[ $industry ] ) ? home_url( $map[ $industry ] ) : '';
}

function mdm_ugc_faq() {
	return array(
		array( 'What is a UGC ad?', 'A UGC ad (user-generated content ad) is a short video that looks like it was made by a real customer or creator rather than a brand: a person talking straight to the camera, filmed on a phone, with captions and a quick hook. Brands run them as paid ads because they blend into the feed and feel more trustworthy than a polished commercial.' ),
		array( 'Are the presenters in these examples real people?', 'The examples use a mix of creators and AI avatar presenters, depending on the client’s budget and speed. Both follow the same UGC format: one presenter, direct to camera, a hook in the first seconds and captions.' ),
		array( 'What makes a good UGC ad hook?', 'A good hook tells the right viewer, in one to three seconds and with the sound off, that the video is for them. The most common openers in these examples are questions (“Injured?”, “What if…”), call-outs that name the audience, place or problem (“Attention UK business owners”), and pattern interrupts that say something unexpected (“Don’t hire my dad”).' ),
		array( 'How much does a UGC video ad cost?', 'Our UGC-style video ads start at $34.97 per video with no retainer, and 10 videos cost $299. Larger programs with ad management are quoted on a free strategy call.' ),
		array( 'How long does it take to make a UGC ad?', 'Most videos are delivered in 24–48 hours, with revision rounds included before anything goes live.' ),
		array( 'Do UGC ads work for local service businesses?', 'Yes. Most of the examples on this page are for roofing, solar, HVAC, legal and other local services. The format works because a homeowner or claimant sees someone like them explaining the problem and the offer.' ),
	);
}

function mdm_shortcode_ugc_examples() {
	$d   = mdm_ugc_data();
	$ugc = isset( $d['ugc'] ) ? $d['ugc'] : array();
	if ( ! $ugc ) {
		return '';
	}
	$inds = array();
	foreach ( $ugc as $u ) {
		$inds[ $u['industry'] ] = isset( $inds[ $u['industry'] ] ) ? $inds[ $u['industry'] ] + 1 : 1;
	}
	arsort( $inds );
	$hooked = count( array_filter( $ugc, static function ( $u ) { return '' !== $u['hook']; } ) );
	$q      = count( array_filter( $ugc, static function ( $u ) { return (bool) preg_match( '/^(what if|if |some people|imagine)/i', $u['hook'] ); } ) );
	$total  = count( $ugc );
	$cta    = MDM_Sections::cta_url();

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<div class="mdm-ugc mdm-page" data-mdm-ugc>
		<section class="mdm-ugc__hero">
			<div class="mdm-ugc__in mdm-ugc__herogrid">
				<div>
					<span class="mdm-niche__pill">Real client ads</span>
					<h1 class="mdm-ugc__h1">UGC ads examples <span>that real brands ran</span></h1>
					<p class="mdm-ugc__lead"><?php echo (int) $total; ?> UGC examples: real UGC-style video ads we made for clients in <?php echo (int) count( $inds ); ?> industries, from roofing and solar to legal and SaaS. Filter by industry, tap any video to watch it, and see the hook each one opens with.</p>
					<div class="mdm-ugc__btns">
						<a class="mdm-ihero__btn is-red" href="#free-plan">Get UGC ads for your business <em><?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?></em></a>
						<a class="mdm-ihero__btn" href="#examples">See the examples</a>
					</div>
				</div>
				<ul class="mdm-ugc__stats">
					<li class="is-red"><b><?php echo (int) $total; ?></b><span>UGC-style ad examples</span></li>
					<li><b><?php echo (int) count( $inds ); ?></b><span>industries</span></li>
					<li><b>24–48h</b><span>typical delivery</span></li>
					<li><b>$34.97</b><span>per video, no retainer</span></li>
				</ul>
			</div>
		</section>

		<section class="mdm-ugc__sec" id="examples">
			<div class="mdm-ugc__in">
				<div class="mdm-ugc__head">
					<h2 class="mdm-ugc__h2">Browse UGC ad examples by industry</h2>
					<div class="mdm-ugc__filters" role="group" aria-label="Filter by industry">
						<button type="button" class="is-on" data-ugc-f="all">All <small><?php echo (int) $total; ?></small></button>
						<?php foreach ( $inds as $name => $c ) : ?><button type="button" data-ugc-f="<?php echo esc_attr( sanitize_title( $name ) ); ?>"><?php echo esc_html( 'SAAS' === $name ? 'SaaS' : $name ); ?> <small><?php echo (int) $c; ?></small></button><?php endforeach; ?>
					</div>
				</div>
				<div class="mdm-ugc__grid">
					<?php foreach ( $ugc as $u ) :
						$name = 'SAAS' === $u['industry'] ? 'SaaS' : $u['industry'];
						$link = mdm_ugc_industry_link( $u['industry'] );
						?>
						<article class="mdm-ugc__card" data-ugc-i="<?php echo esc_attr( sanitize_title( $u['industry'] ) ); ?>">
							<?php echo mdm_ugc_tile( $u['id'], $name . ' UGC ad example', $u['hook'] ); // phpcs:ignore ?>
							<div class="mdm-ugc__meta">
								<span class="mdm-ugc__ind"><?php echo $link ? '<a href="' . esc_url( $link ) . '">' . esc_html( $name ) . '</a>' : esc_html( $name ); // phpcs:ignore ?></span>
								<?php if ( $u['hook'] ) : ?><p class="mdm-ugc__hook"><span>Hook</span>“<?php echo esc_html( $u['hook'] ); ?>”</p><?php endif; ?>
								<?php if ( ! empty( $u['why'] ) ) : ?><p class="mdm-ugc__why"><b><?php echo esc_html( $u['type'] ); ?>:</b> <?php echo esc_html( $u['why'] ); ?></p><?php endif; ?>
							</div>
						</article>
					<?php endforeach; ?>
				</div>
			</div>
		</section>

		<?php
		$types = array();
		foreach ( $ugc as $u ) {
			if ( empty( $u['type'] ) ) {
				continue;
			}
			$t = preg_replace( '/^(.*?)( \+.*)?$/', '$1', $u['type'] ); // "Objection + social proof" -> "Objection"
			$t = in_array( $t, array( 'Conditional "if you…"', '"What if" question', 'Pain question', 'Question opener', 'One-word question' ), true ) ? 'Question openers' : $t;
			$t = in_array( $t, array( 'Audience call-out', 'Location call-out', 'Local call-out', 'Topic call-out', 'Benefit call-out', 'Goal call-out', 'Pain call-out' ), true ) ? 'Call-outs (audience, place or pain)' : $t;
			$t = in_array( $t, array( 'Objection first', 'Objection' ), true ) ? 'Objection first' : $t;
			$types[ $t ][] = $u;
		}
		uasort( $types, static function ( $a, $b ) { return count( $b ) - count( $a ); } );
		?>
		<section class="mdm-ugc__sec mdm-ugc__sec--alt" id="hook-types">
			<div class="mdm-ugc__in">
				<span class="mdm-niche__pill">UGC ad hooks, broken down</span>
				<h2 class="mdm-ugc__h2">UGC ad examples by hook type</h2>
				<p class="mdm-ugc__intro">The first one to three seconds decide whether a UGC ad gets watched. Here is every example above grouped by the kind of hook it opens with, so you can pick a proven opener for your own ads.</p>
				<div class="mdm-ugc__types">
					<?php foreach ( $types as $name => $list ) : ?>
						<div class="mdm-ugc__type">
							<h3><?php echo esc_html( $name ); ?> <small><?php echo (int) count( $list ); ?> <?php echo 1 === count( $list ) ? 'example' : 'examples'; ?></small></h3>
							<ul>
								<?php foreach ( array_slice( $list, 0, 4 ) as $u ) : ?>
									<li><?php echo $u['hook'] ? '“' . esc_html( $u['hook'] ) . '” ' : ''; ?><span><?php echo esc_html( 'SAAS' === $u['industry'] ? 'SaaS' : $u['industry'] ); ?></span></li>
								<?php endforeach; ?>
							</ul>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		</section>

		<section class="mdm-ugc__sec mdm-ugc__sec--dark">
			<div class="mdm-ugc__in">
				<span class="mdm-niche__pill">What they have in common</span>
				<h2 class="mdm-ugc__h2">The pattern behind these UGC ads</h2>
				<div class="mdm-ugc__pattern">
					<div><b><?php echo (int) $total; ?>/<?php echo (int) $total; ?></b><h3>One presenter, straight to camera</h3><p>Every example uses a single person talking directly to the viewer, the way a friend would on a phone video.</p></div>
					<div><b><?php echo (int) $hooked; ?>/<?php echo (int) $total; ?></b><h3>A hook written on screen</h3><p>Big on-screen text in the first frame (“Injured?”, “Don’t hire my dad”, “This is not a scam”), so the ad works with the sound off.</p></div>
					<div><b><?php echo (int) $q; ?>/<?php echo (int) $total; ?></b><h3>Question or “what if” openers</h3><p>Openers like “What if replacing your window didn’t require…” make the viewer answer in their head and keep watching.</p></div>
					<div><b>9:16</b><h3>Built for the feed</h3><p>Vertical, captioned and short, made for Reels, TikTok, Stories and YouTube Shorts rather than a TV screen.</p></div>
				</div>
			</div>
		</section>

		<section class="mdm-ugc__sec">
			<div class="mdm-ugc__in">
				<h2 class="mdm-ugc__h2">UGC-style ads vs. polished brand videos</h2>
				<div class="mdm-ugc__tablewrap">
					<table class="mdm-ugc__table">
						<thead><tr><th></th><th>UGC-style ad</th><th>Polished brand video</th></tr></thead>
						<tbody>
							<tr><td>Look and feel</td><td>Phone-filmed, one presenter, direct to camera</td><td>Studio lighting, b-roll, voice-over</td></tr>
							<tr><td>Main job</td><td>Stop the scroll and get the click or lead</td><td>Build brand image</td></tr>
							<tr><td>Production time</td><td>24–48 hours per video with us</td><td>Usually weeks</td></tr>
							<tr><td>Testing</td><td>Cheap to make many hooks and test them</td><td>Few versions, hard to test</td></tr>
							<tr><td>Best for</td><td>Paid social for lead gen and e-commerce</td><td>Website hero, TV, brand campaigns</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>

		<section class="mdm-ugc__sec mdm-ugc__sec--alt">
			<div class="mdm-ugc__in">
				<h2 class="mdm-ugc__h2">How we make UGC ads for you</h2>
				<ol class="mdm-ic__steps">
					<li><span class="mdm-ic__stepn">1</span><div><h3>Short brief</h3><p>One questionnaire about your offer, audience and what converts today.</p></div></li>
					<li><span class="mdm-ic__stepn">2</span><div><h3>Hooks & scripts</h3><p>We write several hook-first scripts like the ones above.</p></div></li>
					<li><span class="mdm-ic__stepn">3</span><div><h3>Presenter</h3><p>A UGC creator, an AI avatar, or footage you film on your phone.</p></div></li>
					<li><span class="mdm-ic__stepn">4</span><div><h3>Edit & captions</h3><p>Captions, on-screen hooks and sound, delivered in 24–48 hours.</p></div></li>
					<li><span class="mdm-ic__stepn">5</span><div><h3>Test & scale</h3><p>Run them as ads, keep the winners and replace the rest.</p></div></li>
				</ol>
				<p class="mdm-ugc__more">See the results these ads produced in our <a href="<?php echo esc_url( home_url( '/case-studies/' ) ); ?>">case studies</a>, more formats in our <a href="<?php echo esc_url( home_url( '/portfolio/' ) ); ?>">video ad examples</a>, longer sales videos in <a href="<?php echo esc_url( home_url( '/what-is-a-vsl/' ) ); ?>">what is a VSL</a>, and how we run full campaigns as a <a href="<?php echo esc_url( home_url( '/video-ad-agency/' ) ); ?>">video ad agency</a> or for online stores with <a href="<?php echo esc_url( home_url( '/ecommerce-video-ads/' ) ); ?>">ecommerce video ads</a>.</p>
			</div>
		</section>

		<?php echo function_exists( 'mdm_leadform_html' ) ? mdm_leadform_html( 'ugc-examples', 'Get UGC ads for your business', 'Tell us about your offer and we will send a short plan: the UGC hooks and presenters we would test first.' ) : ''; // phpcs:ignore ?>

		<section class="mdm-ugc__sec">
			<div class="mdm-ugc__in mdm-ugc__faq">
				<h2 class="mdm-ugc__h2">UGC ad questions</h2>
				<?php foreach ( mdm_ugc_faq() as $k => $f ) : ?>
					<details<?php echo 0 === $k ? ' open' : ''; ?>><summary><?php echo esc_html( $f[0] ); ?></summary><p><?php echo esc_html( $f[1] ); ?></p></details>
				<?php endforeach; ?>
			</div>
		</section>
	</div>
	<script>
	(function () {
		var r = document.querySelector('[data-mdm-ugc]'); if (!r) return;
		var b = r.querySelectorAll('[data-ugc-f]'), c = r.querySelectorAll('[data-ugc-i]');
		b.forEach(function (x) { x.addEventListener('click', function () { var f = x.getAttribute('data-ugc-f'); b.forEach(function (y) { y.classList.toggle('is-on', y === x); }); c.forEach(function (k) { k.hidden = !(f === 'all' || k.getAttribute('data-ugc-i') === f); }); }); });
	})();
	</script>
	<?php
	return ob_get_clean();
}

add_filter( 'astra_the_title_enabled', static function ( $on ) { return is_page( 'ugc-ads-examples' ) ? false : $on; }, 30 );

add_filter(
	'rank_math/json_ld',
	static function ( $data ) {
		if ( ! is_page( 'ugc-ads-examples' ) || ! is_array( $data ) ) {
			return $data;
		}
		$data['mdmUgcFaq'] = array(
			'@type'      => 'FAQPage',
			'@id'        => home_url( '/ugc-ads-examples/#faq' ),
			'mainEntity' => array_map( static function ( $f ) { return array( '@type' => 'Question', 'name' => $f[0], 'acceptedAnswer' => array( '@type' => 'Answer', 'text' => $f[1] ) ); }, mdm_ugc_faq() ),
		);
		return $data;
	},
	110
);

/* ------------------------------------------------------------------ */
/* /what-is-a-vsl/: real VSL examples before the script template       */
/* ------------------------------------------------------------------ */

add_filter(
	'the_content',
	static function ( $html ) {
		if ( ! is_singular( 'post' ) || 'what-is-a-vsl' !== get_post_field( 'post_name', get_the_ID() ) || false !== strpos( $html, 'mdm-vslx' ) ) {
			return $html;
		}
		$d = mdm_ugc_data();
		if ( empty( $d['vsl'] ) ) {
			return $html;
		}
		$box = '<div class="mdm-vslx"><h2 id="vsl-examples">VSL examples from our clients</h2><p>These are ' . count( $d['vsl'] ) . ' real VSLs we produced for clients. Tap one to watch how the hook, the proof on screen and the call to action fit the structure above.</p><div class="mdm-vslx__grid">';
		foreach ( $d['vsl'] as $i => $v ) {
			$box .= mdm_ugc_tile( $v['id'], 'VSL example ' . ( $i + 1 ) );
		}
		$box .= '</div></div>';
		if ( preg_match( '/<h2[^>]*>\s*How to write a VSL script/i', $html, $m, PREG_OFFSET_CAPTURE ) ) {
			return substr( $html, 0, $m[0][1] ) . $box . substr( $html, $m[0][1] );
		}
		return $html . $box;
	},
	26
);
