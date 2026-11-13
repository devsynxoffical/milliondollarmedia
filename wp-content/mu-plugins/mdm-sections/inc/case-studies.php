<?php
/**
 * Case studies: 124 lead generation + 123 e-commerce / DTC results.
 *
 * [mdm_case_categories]  Two big cards (Lead Generation / Ecom & DTC), like funnelsthatprint.com/case-studies.
 *                        Also used for [mdm_impact_cards] ("The difference we make") on the homepage.
 * [mdm_case_studies cat="all|leadgen|ecom" limit="8"]  Grid of case cards. limit="0" = every case,
 *                        16 at a time with a "Show more" button (the case study pages).
 *
 * Data: data/leadgen.json + img/cases-lg/ (from funnelsthatprint.com),
 *       data/cases.json   + img/cases/    (from brandscalinghacks.com; proof videos stream from there).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_case_studies', 'mdm_shortcode_case_studies' );
add_shortcode( 'mdm_case_categories', 'mdm_shortcode_case_categories' );

/** Where the case study pages live. */
function mdm_case_urls() {
	return apply_filters(
		'mdm_case_urls',
		array(
			'all'     => home_url( '/case-studies/' ),
			'leadgen' => home_url( '/case-studies/lead-generation/' ),
			'ecom'    => home_url( '/case-studies/ecommerce/' ),
		)
	);
}

/** array( 'leadgen' => items, 'ecom' => items ). Each item: cat, niche, headline, metrics, image, video, link. */
function mdm_case_data() {
	static $data = null;
	if ( null !== $data ) {
		return $data;
	}
	$dir  = dirname( __DIR__ );
	$base = WPMU_PLUGIN_URL . '/mdm-sections/img/';
	$read = static function ( $file ) use ( $dir ) {
		$path = $dir . '/data/' . $file;
		$rows = file_exists( $path ) ? json_decode( (string) file_get_contents( $path ), true ) : array(); // phpcs:ignore
		return is_array( $rows ) ? $rows : array();
	};

	$lead = array();
	foreach ( $read( 'leadgen.json' ) as $r ) {
		$lead[] = array(
			'cat'      => 'leadgen',
			'niche'    => $r['n'],
			'headline' => $r['t'],
			'metrics'  => array_merge( (array) $r['m'], array( $r['vid'] ? 'Video proof' : 'Dashboard proof' ) ),
			'image'    => $base . 'cases-lg/' . rawurlencode( $r['img'] ),
			'video'    => ! empty( $r['v'] ) ? $r['v'] : null,
			'link'     => null,
			'desc'     => isset( $r['d'] ) ? $r['d'] : '',
		);
	}
	$ecom = array();
	foreach ( $read( 'cases.json' ) as $r ) {
		$ecom[] = array(
			'cat'      => 'ecom',
			'niche'    => $r['n'],
			'headline' => $r['t'],
			'metrics'  => array_values( array_filter( array( $r['r'], $r['x'], $r['v'] ? 'Video proof' : 'Dashboard proof' ) ) ),
			'image'    => $base . 'cases/' . rawurlencode( $r['img'] ),
			'video'    => $r['v'],
			'link'     => null,
			'desc'     => isset( $r['d'] ) ? $r['d'] : '',
		);
	}
	$data = apply_filters( 'mdm_case_data', array( 'leadgen' => $lead, 'ecom' => $ecom ) );
	return $data;
}

/** Cases of one category, or both mixed (lead gen, ecom, lead gen ...). */
function mdm_case_items( $cat ) {
	$d = mdm_case_data();
	if ( isset( $d[ $cat ] ) ) {
		return $d[ $cat ];
	}
	$out = array();
	$max = max( count( $d['leadgen'] ), count( $d['ecom'] ) );
	for ( $i = 0; $i < $max; $i++ ) {
		foreach ( array( 'leadgen', 'ecom' ) as $k ) {
			if ( isset( $d[ $k ][ $i ] ) ) {
				$out[] = $d[ $k ][ $i ];
			}
		}
	}
	return $out;
}

/** Niche => count, biggest first. */
function mdm_case_niches( $cat ) {
	$c = array();
	foreach ( mdm_case_items( $cat ) as $it ) {
		$c[ $it['niche'] ] = isset( $c[ $it['niche'] ] ) ? $c[ $it['niche'] ] + 1 : 1;
	}
	arsort( $c );
	return $c;
}

/* ------------------------------------------------------------------ */
/* [mdm_case_categories]                                               */
/* ------------------------------------------------------------------ */

function mdm_shortcode_case_categories( $atts ) {
	$atts  = shortcode_atts(
		array(
			'eyebrow' => 'Growth · Impact · Speed',
			'title'   => 'The difference we make through our work',
			'badge'   => 'Backed by 250+ case studies',
			'text'    => 'Every figure comes from a client ad account, Shopify dashboard or CRM. Pick the model that fits your business.',
		),
		$atts,
		'mdm_case_categories'
	);
	$urls  = mdm_case_urls();
	$cards = array(
		'leadgen' => array(
			'tag'   => 'Lead generation',
			'name'  => 'Lead<br>Generation',
			'text'  => 'Booked calls, verified leads and lower cost per lead for service businesses, agencies, coaches and local trades.',
			'cta'   => 'Explore lead gen cases',
			'class' => 'is-dark',
		),
		'ecom'    => array(
			'tag'   => 'E-commerce & DTC',
			'name'  => 'Ecom &amp; DTC',
			'text'  => 'Revenue and ROAS for direct-response e-commerce and DTC brands, scaled with Meta ads and creative engines.',
			'cta'   => 'Explore ecom cases',
			'class' => 'is-red',
		),
	);

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-cases mdm-cats" data-mdm-reveal id="results">
		<div class="mdm-cats__head">
			<span class="mdm-eyebrow mdm-eyebrow--plain mdm-rise" style="--d:0s"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
			<h2 class="mdm-display mdm-cats__title"><?php echo MDM_Sections::split_words( $atts['title'] ); // phpcs:ignore ?></h2>
			<?php if ( $atts['badge'] ) : ?>
				<span class="mdm-impact__badge mdm-rise" style="--d:.3s"><i></i><?php echo esc_html( $atts['badge'] ); ?></span>
			<?php endif; ?>
			<?php if ( $atts['text'] ) : ?>
				<p class="mdm-lead mdm-rise" style="--d:.4s"><?php echo esc_html( $atts['text'] ); ?></p>
			<?php endif; ?>
		</div>
		<div class="mdm-cats__grid">
			<?php $k = 0; foreach ( $cards as $cat => $c ) :
				$items  = mdm_case_items( $cat );
				$niches = array_slice( array_keys( mdm_case_niches( $cat ) ), 0, 6 );
				$fan    = array_slice( $items, 1, 3 );
				?>
				<a class="mdm-cat <?php echo esc_attr( $c['class'] ); ?>" href="<?php echo esc_url( $urls[ $cat ] ); ?>" style="--k:<?php echo (int) $k++; ?>">
					<span class="mdm-cat__fan" aria-hidden="true">
						<?php foreach ( $fan as $j => $it ) : ?>
							<img src="<?php echo esc_url( $it['image'] ); ?>" alt="" loading="lazy" decoding="async" style="--j:<?php echo (int) $j; ?>">
						<?php endforeach; ?>
					</span>
					<span class="mdm-cat__tag"><?php echo esc_html( $c['tag'] ); ?></span>
					<span class="mdm-cat__name"><?php echo wp_kses( $c['name'], array( 'br' => array() ) ); ?></span>
					<span class="mdm-cat__count"><b><?php echo (int) count( $items ); ?></b> case studies</span>
					<span class="mdm-cat__text"><?php echo esc_html( $c['text'] ); ?></span>
					<span class="mdm-cat__chips"><?php foreach ( $niches as $n ) : ?><i><?php echo esc_html( $n ); ?></i><?php endforeach; ?></span>
					<span class="mdm-cat__btn"><?php echo esc_html( $c['cta'] ); ?> <em><?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?></em></span>
				</a>
			<?php endforeach; ?>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/* ------------------------------------------------------------------ */
/* [mdm_case_studies]                                                  */
/* ------------------------------------------------------------------ */

function mdm_shortcode_case_studies( $atts ) {
	$atts = shortcode_atts(
		array(
			'cat'      => 'all',             // all | leadgen | ecom
			'eyebrow'  => 'Case studies',
			'title'    => 'Proof, not promises.',
			'badge'    => 'auto',            // auto = "124 verified case studies" (the real count of this page)
			'subtitle' => 'Real ad accounts, dashboards and screen recordings. Tap any card to see the proof.',
			'limit'    => '8',               // 0 = every case study, 16 at a time
			'all_url'  => '',
			'all_text' => 'View all case studies',
			'cta_text' => 'Get results like these',
			'cta_url'  => MDM_Sections::cta_url(),
		),
		$atts,
		'mdm_case_studies'
	);

	$cat    = in_array( $atts['cat'], array( 'leadgen', 'ecom' ), true ) ? $atts['cat'] : 'all';
	$items  = mdm_case_items( $cat );
	$total  = count( $items );
	$limit  = (int) $atts['limit'];
	$is_all = $limit <= 0;
	$shown  = $is_all ? $items : array_slice( $items, 0, $limit );
	$urls   = mdm_case_urls();
	$all    = $atts['all_url'] ? $atts['all_url'] : $urls[ $cat ];
	$colors = array( 'var(--mdm-red)', 'var(--mdm-ink)' );
	if ( 'auto' === $atts['badge'] ) {
		$atts['badge'] = $is_all ? sprintf( '%d verified case studies', $total ) : 'Backed by 250+ case studies';
	}

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-cases mdm-cases--clean<?php echo $is_all ? ' mdm-cases--all' : ''; ?>" data-mdm-cases data-mdm-reveal id="case-studies" data-first="<?php echo $is_all ? 0 : (int) $limit; ?>">
		<div class="mdm-cases__head">
			<span class="mdm-eyebrow mdm-eyebrow--plain mdm-rise" style="--d:0s"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
			<h2 class="mdm-display mdm-cases__title"><?php echo MDM_Sections::split_words( $atts['title'] ); // phpcs:ignore ?></h2>
			<?php if ( $atts['badge'] ) : ?>
				<span class="mdm-impact__badge mdm-rise" style="--d:.3s"><i></i><?php echo esc_html( $atts['badge'] ); ?></span>
			<?php endif; ?>
			<?php if ( $atts['subtitle'] ) : ?>
				<p class="mdm-lead mdm-rise" style="--d:.4s"><?php echo esc_html( $atts['subtitle'] ); ?></p>
			<?php endif; ?>
		</div>

		<?php
		// Filter tags (case study pages): niches on a category page, Lead gen / E-commerce on the all page.
		$filters = array();
		if ( $is_all ) {
			if ( 'all' === $cat ) {
				$filters = array( 'cat-leadgen' => array( 'Lead generation', 0 ), 'cat-ecom' => array( 'E-commerce & DTC', 0 ) );
				foreach ( $items as $it ) {
					$filters[ 'cat-' . $it['cat'] ][1]++;
				}
			} else {
				foreach ( mdm_case_niches( $cat ) as $n => $c ) {
					$filters[ 'n-' . sanitize_title( $n ) ] = array( $n, $c );
				}
			}
		}
		?>
		<?php if ( count( $filters ) > 1 ) : ?>
			<div class="mdm-cfilter mdm-rise" style="--d:.45s" role="toolbar" aria-label="Filter case studies">
				<button type="button" class="mdm-cfilter__btn is-on" data-filter="*" aria-pressed="true">All <small><?php echo (int) $total; ?></small></button>
				<?php foreach ( $filters as $fk => $f ) : ?>
					<button type="button" class="mdm-cfilter__btn" data-filter="<?php echo esc_attr( $fk ); ?>" aria-pressed="false"><?php echo esc_html( $f[0] ); ?> <small><?php echo (int) $f[1]; ?></small></button>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
		<div class="mdm-cases__grid is-on" data-panel="all">
			<?php foreach ( $shown as $i => $item ) :
				$has_video = ! empty( $item['video'] );
				$label     = $has_video || ! empty( $item['link'] ) ? 'Watch proof ▶' : 'View proof ↗';
				?>
				<article class="mdm-cs" data-f="<?php echo esc_attr( 'cat-' . $item['cat'] . ' n-' . sanitize_title( $item['niche'] ) ); ?>" style="--c:<?php echo esc_attr( $colors[ $i % count( $colors ) ] ); ?>;--i:<?php echo (int) ( $i % 8 ); ?>">
					<button type="button" class="mdm-cs__shot" data-full="<?php echo esc_url( $item['image'] ); ?>"<?php echo $has_video ? ' data-video="' . esc_url( $item['video'] ) . '"' : ''; ?><?php echo ! empty( $item['link'] ) ? ' data-link="' . esc_url( $item['link'] ) . '"' : ''; ?> aria-label="<?php echo esc_attr( 'View proof: ' . $item['headline'] ); ?>">
						<img class="skip-lazy no-lazyload" data-no-lazy="1" src="<?php echo esc_url( $item['image'] ); ?>" alt="<?php echo esc_attr( $item['niche'] . ' results: ' . $item['headline'] ); ?>" loading="lazy" decoding="async">
						<?php if ( $has_video ) : ?>
							<video class="mdm-cs__preview skip-lazy" data-src="<?php echo esc_url( $item['video'] ); ?>" muted loop playsinline preload="none" aria-hidden="true"></video>
						<?php endif; ?>
						<?php if ( $has_video || ! empty( $item['link'] ) ) : ?>
							<span class="mdm-cs__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>
						<?php endif; ?>
						<span class="mdm-cs__zoom"><?php echo esc_html( $label ); ?></span>
					</button>
					<div class="mdm-cs__body">
						<span class="mdm-cs__niche"><i></i><?php echo esc_html( ( 'leadgen' === $item['cat'] ? 'Lead gen · ' : 'Ecom · ' ) . $item['niche'] ); ?></span>
						<h3 class="mdm-cs__headline"><?php echo esc_html( $item['headline'] ); ?></h3>
						<div class="mdm-cs__metrics">
							<?php foreach ( $item['metrics'] as $m ) : ?><span><?php echo esc_html( $m ); ?></span><?php endforeach; ?>
						</div>
						<?php if ( ! empty( $item['desc'] ) ) : ?>
							<div class="mdm-cs__desc" hidden><?php echo wp_kses_post( wpautop( esc_html( $item['desc'] ) ) ); ?></div>
						<?php endif; ?>
					</div>
				</article>
			<?php endforeach; ?>
		</div>

		<?php if ( false ) : ?>
			<div class="mdm-cases__showall"><button type="button" class="mdm-btn mdm-btn--ghost" data-mdm-cases-more><span class="mdm-btn__icon"><?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?></span><span>Show more case studies</span></button></div>
		<?php endif; ?>

		<div class="mdm-cases__cta mdm-rise">
			<?php if ( ! $is_all && $total > count( $shown ) ) : ?>
				<?php echo MDM_Sections::button( $atts['all_text'] . ' (' . $total . ')', $all, 'mdm-cases__all' ); // phpcs:ignore ?>
			<?php else : ?>
				<?php echo MDM_Sections::button( $atts['cta_text'], $atts['cta_url'] ); // phpcs:ignore ?>
			<?php endif; ?>
		</div>

		<div class="mdm-casebox" hidden role="dialog" aria-modal="true" aria-label="Case study">
			<div class="mdm-casebox__panel">
				<button type="button" class="mdm-casebox__close" aria-label="Close">×</button>
				<div class="mdm-casebox__media">
					<img class="mdm-casebox__bg" alt="" aria-hidden="true">
					<img class="mdm-casebox__img" alt="">
					<video class="mdm-casebox__video" controls playsinline preload="none" hidden></video>
				</div>
				<div class="mdm-casebox__info">
					<span class="mdm-casebox__niche"></span>
					<h3 class="mdm-casebox__title"></h3>
					<div class="mdm-casebox__metrics"></div>
					<div class="mdm-casebox__text"></div>
					<div class="mdm-casebox__cta">
						<a class="mdm-casebox__book" href="<?php echo esc_url( function_exists( 'mdm_pricing_call_url' ) ? mdm_pricing_call_url() : MDM_Sections::cta_url() ); ?>">Get results like these <span>→</span></a>
						<a class="mdm-casebox__wa" href="<?php echo esc_url( MDM_Sections::whatsapp_url() ); ?>" target="_blank" rel="noopener">or message us on WhatsApp</a>
					</div>
				</div>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}
