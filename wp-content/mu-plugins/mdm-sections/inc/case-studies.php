<?php
/**
 * [mdm_case_studies] - Case studies with a Lead Gen / E-Commerce switch.
 * Each card shows the real results screenshot (click to enlarge).
 *
 * Edit / add cards from code:
 * add_filter( 'mdm_case_studies', function ( $groups ) { $groups['leadgen']['items'][] = array(...); return $groups; } );
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_case_studies', 'mdm_shortcode_case_studies' );

function mdm_default_case_studies() {
	// 123 verified e-commerce / DTC case studies (from brandscalinghacks.com). Images are stored
	// in img/cases/, the proof videos stream from brandscalinghacks.com.
	$file = dirname( __DIR__ ) . '/data/cases.json';
	$rows = file_exists( $file ) ? json_decode( (string) file_get_contents( $file ), true ) : array(); // phpcs:ignore
	$rows = is_array( $rows ) ? $rows : array();
	$all  = array();
	$by   = array();
	foreach ( $rows as $r ) {
		$item = array(
			'niche'    => $r['n'],
			'headline' => $r['t'],
			'metrics'  => array_values( array_filter( array( $r['r'], $r['x'], $r['v'] ? 'Video proof' : 'Dashboard proof' ) ) ),
			'image'    => WPMU_PLUGIN_URL . '/mdm-sections/img/cases/' . rawurlencode( $r['img'] ),
			'video'    => $r['v'],
		);
		$all[]               = $item;
		$by[ $r['n'] ][]     = $item;
	}
	uasort( $by, static function ( $a, $b ) { return count( $b ) - count( $a ); } );
	$groups = array( 'all' => array( 'label' => 'All', 'items' => $all ) );
	foreach ( $by as $label => $items ) {
		$groups[ sanitize_title( $label ) ] = array( 'label' => $label, 'items' => $items );
	}
	return $groups;
}

function mdm_shortcode_case_studies( $atts ) {
	$atts = shortcode_atts(
		array(
			'eyebrow'  => 'Case studies',
			'title'    => 'Proof, not promises.',
			'badge'    => 'Backed by 250+ case studies',
			'subtitle' => 'Real brands, real dashboards and screen recordings. Tap any card to see the proof.',
			'limit'    => '8',               // 0 = show every case study (the /case-studies/ page)
			'all_url'  => home_url( '/case-studies/' ),
			'all_text' => 'View all case studies',
			'cta_text' => 'Get results like these',
			'cta_url'  => MDM_Sections::cta_url(),
		),
		$atts,
		'mdm_case_studies'
	);

	$groups = apply_filters( 'mdm_case_studies', mdm_default_case_studies() );
	$items  = isset( $groups['all'] ) ? $groups['all']['items'] : array();
	if ( ! $items ) {
		foreach ( $groups as $g ) {
			$items = array_merge( $items, $g['items'] );
		}
	}
	$total = count( $items );
	$limit = (int) $atts['limit'];
	$shown = $limit > 0 ? array_slice( $items, 0, $limit ) : $items;
	$is_all = $limit <= 0;
	$colors = array( 'var(--mdm-red)', 'var(--mdm-ink)' );

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

		<div class="mdm-cases__grid is-on" data-panel="all">
			<?php foreach ( $shown as $i => $item ) :
				$has_video = ! empty( $item['video'] );
				?>
				<article class="mdm-cs" style="--c:<?php echo esc_attr( $colors[ $i % count( $colors ) ] ); ?>;--i:<?php echo (int) ( $i % 8 ); ?>">
					<button type="button" class="mdm-cs__shot" data-full="<?php echo esc_url( $item['image'] ); ?>"<?php echo $has_video ? ' data-video="' . esc_url( $item['video'] ) . '"' : ''; ?> aria-label="<?php echo esc_attr( ( $has_video ? 'Play proof video: ' : 'View proof: ' ) . $item['headline'] ); ?>">
						<img class="skip-lazy no-lazyload" data-no-lazy="1" src="<?php echo esc_url( $item['image'] ); ?>" alt="<?php echo esc_attr( $item['niche'] . ' results: ' . $item['headline'] ); ?>" loading="lazy" decoding="async">
						<?php if ( $has_video ) : ?>
							<video class="mdm-cs__preview skip-lazy" data-src="<?php echo esc_url( $item['video'] ); ?>" muted loop playsinline preload="none" aria-hidden="true"></video>
							<span class="mdm-cs__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>
						<?php endif; ?>
						<span class="mdm-cs__zoom"><?php echo $has_video ? 'Watch proof ▶' : 'View proof ↗'; ?></span>
					</button>
					<div class="mdm-cs__body">
						<span class="mdm-cs__niche"><i></i><?php echo esc_html( $item['niche'] ); ?></span>
						<h3 class="mdm-cs__headline"><?php echo esc_html( $item['headline'] ); ?></h3>
						<div class="mdm-cs__metrics">
							<?php foreach ( $item['metrics'] as $m ) : ?><span><?php echo esc_html( $m ); ?></span><?php endforeach; ?>
						</div>
					</div>
				</article>
			<?php endforeach; ?>
		</div>

		<div class="mdm-cases__cta mdm-rise">
			<?php if ( ! $is_all && $total > count( $shown ) && $atts['all_url'] ) : ?>
				<?php echo MDM_Sections::button( $atts['all_text'] . ' (' . $total . ')', $atts['all_url'], 'mdm-cases__all' ); // phpcs:ignore ?>
			<?php else : ?>
				<?php echo MDM_Sections::button( $atts['cta_text'], $atts['cta_url'] ); // phpcs:ignore ?>
			<?php endif; ?>
		</div>

		<div class="mdm-lightbox" hidden>
			<button type="button" class="mdm-lightbox__close" aria-label="Close">×</button>
			<img alt="">
			<video controls playsinline preload="none" hidden></video>
		</div>
	</section>
	<?php
	return ob_get_clean();
}
