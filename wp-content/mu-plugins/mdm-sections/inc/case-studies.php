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
			'eyebrow'  => '123 verified case studies',
			'title'    => 'Proof, not promises.',
			'subtitle' => 'Real brands, real dashboards and screen recordings. Pick your niche and see what our system does for businesses like yours.',
			'cta_text' => 'Get results like these',
			'cta_url'  => MDM_Sections::cta_url(),
		),
		$atts,
		'mdm_case_studies'
	);

	$groups = apply_filters( 'mdm_case_studies', mdm_default_case_studies() );
	$uid    = 'mdm-cs-' . wp_rand( 1000, 9999 );
	$colors = array( 'var(--mdm-red)', 'var(--mdm-ink)' );

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section class="mdm-cases" data-mdm-cases data-mdm-reveal id="case-studies">
		<div class="mdm-cases__head">
			<span class="mdm-eyebrow mdm-eyebrow--plain mdm-rise" style="--d:0s"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
			<h2 class="mdm-display mdm-cases__title"><?php echo MDM_Sections::split_words( $atts['title'] ); // phpcs:ignore ?></h2>
			<p class="mdm-lead mdm-rise" style="--d:.35s"><?php echo esc_html( $atts['subtitle'] ); ?></p>

			<div class="mdm-switch mdm-rise" style="--d:.45s" role="tablist">
				<span class="mdm-switch__thumb" aria-hidden="true"></span>
				<?php $first = true; foreach ( $groups as $key => $group ) : ?>
					<button type="button" role="tab" class="mdm-switch__btn<?php echo $first ? ' is-on' : ''; ?>" aria-selected="<?php echo $first ? 'true' : 'false'; ?>" aria-controls="<?php echo esc_attr( $uid . '-' . $key ); ?>" data-tab="<?php echo esc_attr( $key ); ?>">
						<?php echo esc_html( $group['label'] ); ?> <small><?php echo count( $group['items'] ); ?></small>
					</button>
				<?php $first = false; endforeach; ?>
			</div>
		</div>

		<?php $first = true; foreach ( $groups as $key => $group ) : ?>
			<div class="mdm-cases__grid<?php echo $first ? ' is-on' : ''; ?>" role="tabpanel" id="<?php echo esc_attr( $uid . '-' . $key ); ?>" data-panel="<?php echo esc_attr( $key ); ?>"<?php echo $first ? '' : ' hidden'; ?>>
				<?php foreach ( $group['items'] as $i => $item ) : ?>
					<article class="mdm-cs" style="--c:<?php echo esc_attr( $colors[ $i % count( $colors ) ] ); ?>;--i:<?php echo (int) ( $i % 8 ); ?>">
						<button type="button" class="mdm-cs__shot" data-full="<?php echo esc_url( $item['image'] ); ?>"<?php echo ! empty( $item['video'] ) ? ' data-video="' . esc_url( $item['video'] ) . '"' : ''; ?> aria-label="<?php echo esc_attr( ( empty( $item['video'] ) ? 'View proof: ' : 'Play proof video: ' ) . $item['headline'] ); ?>">
							<?php if ( ! empty( $item['video'] ) ) : ?><span class="mdm-cs__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span><?php endif; ?>
							<img src="<?php echo esc_url( $item['image'] ); ?>" alt="<?php echo esc_attr( $item['niche'] . ' results: ' . $item['headline'] ); ?>" loading="lazy" decoding="async">
							<span class="mdm-cs__zoom"><?php echo empty( $item['video'] ) ? 'View proof ↗' : 'Watch proof ▶'; ?></span>
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
		<?php $first = false; endforeach; ?>

		<div class="mdm-cases__showall"><button type="button" class="mdm-btn mdm-btn--ghost" data-mdm-cases-more><span class="mdm-btn__icon"><?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?></span><span>Show more case studies</span></button></div>

		<div class="mdm-cases__cta mdm-rise"><?php echo MDM_Sections::button( $atts['cta_text'], $atts['cta_url'] ); // phpcs:ignore ?></div>

		<div class="mdm-lightbox" hidden>
			<button type="button" class="mdm-lightbox__close" aria-label="Close">×</button>
			<img alt="">
			<video controls playsinline preload="none" hidden></video>
		</div>
	</section>
	<?php
	return ob_get_clean();
}
