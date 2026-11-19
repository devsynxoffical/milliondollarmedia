<?php
/**
 * /portfolio/: crawlable text about the video ad examples (the page was ~96 words of tab labels),
 * built from the portfolio's own categories and counts plus facts already published on the site.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_portfolio_text_html() {
	$tabs  = function_exists( 'mdm_portfolio_tab_videos' ) ? mdm_portfolio_tab_videos() : array();
	$links = array(
		'Roofing'      => '/roofing-video-marketing-services/',
		'HVAC'         => '/hvac-video-marketing-services/',
		'Solar'        => '/solar/',
		'MVA'          => '/mva/',
		'SAAS'         => '/saas/',
		'Agency Owner' => '/agency-owners/',
		'Electrician'  => '/home-service-business/',
		'VSL'          => '/what-is-a-vsl/',
	);
	$all   = array();
	$rows  = '';
	foreach ( $tabs as $name => $urls ) {
		if ( 'All' === $name || ! $urls ) {
			continue;
		}
		$all   = array_merge( $all, $urls );
		$label = esc_html( $name ) . ' <span>' . (int) count( $urls ) . ' video' . ( 1 === count( $urls ) ? '' : 's' ) . '</span>';
		$rows .= isset( $links[ $name ] ) ? '<li><a href="' . esc_url( home_url( $links[ $name ] ) ) . '">' . $label . '</a></li>' : '<li>' . $label . '</li>';
	}
	$total = count( array_unique( $all ) );
	$faq   = array(
		array( 'What makes a good video ad?', 'A hook in the first seconds that names the viewer and their problem, one clear offer, captions for people watching with the sound off, real footage or real customers instead of stock clips, and a single call to action. That is the pattern behind the examples on this page.' ),
		array( 'How much does a video ad cost?', 'Our video ads start at $34.97 per video with no retainer, and 10 videos cost $299. Images start at $14.97 and GIFs at $24.97. Full done-for-you programs with ad management are quoted on a free strategy call.' ),
		array( 'How fast can you make a video ad?', 'Most videos are delivered in 24–48 hours, with revision rounds included before anything goes live.' ),
		array( 'Can you make video ads for my industry?', 'Yes. The categories above are the industries we produce for most often, and our case studies show the results those ads produced. If your industry is not listed, we start from what already converts in a similar market.' ),
	);
	ob_start();
	?>
	<section class="mdm-pftext">
		<div class="mdm-pftext__in">
			<div class="mdm-pftext__intro">
				<span class="mdm-niche__pill">About these examples</span>
				<h2 class="mdm-pftext__h2">Real video ads we made for clients</h2>
				<p>Every video on this page is a real ad we scripted, edited or produced for a client: <?php echo (int) $total; ?> examples across <?php echo (int) max( 0, count( $tabs ) - 1 ); ?> industries, including UGC-style testimonials, founder and expert videos, VSLs and short-form ads for Facebook, Instagram, TikTok and YouTube Shorts.</p>
				<p>Use the tabs to filter by industry, or tap any video to play it. To see what these ads achieved, open the <a href="<?php echo esc_url( home_url( '/case-studies/' ) ); ?>">case studies</a>, where each result comes with the ad account, dashboard or CRM proof. Looking for talking-head creator ads? Browse our <a href="<?php echo esc_url( home_url( '/ugc-ads-examples/' ) ); ?>">UGC ad examples</a> with the hook each one opens with.</p>
			</div>
			<div class="mdm-pftext__cats">
				<h3>Video ad examples by industry</h3>
				<ul><?php echo $rows; // phpcs:ignore WordPress.Security.EscapeOutput ?></ul>
			</div>
		</div>
		<div class="mdm-pftext__in mdm-pftext__faq">
			<h2 class="mdm-pftext__h2">Video ad questions</h2>
			<?php foreach ( $faq as $k => $f ) : ?>
				<details<?php echo 0 === $k ? ' open' : ''; ?>><summary><?php echo esc_html( $f[0] ); ?></summary><p><?php echo esc_html( $f[1] ); ?></p></details>
			<?php endforeach; ?>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

add_filter(
	'the_content',
	static function ( $content ) {
		if ( is_admin() || ! is_page( 'portfolio' ) || ! in_the_loop() || ! is_main_query() || false !== strpos( $content, 'mdm-pftext' ) ) {
			return $content;
		}
		$html = mdm_portfolio_text_html();
		$pos  = strpos( $content, '<div class="elementor-element elementor-element-c014af3' );
		return false === $pos ? $content . $html : substr( $content, 0, $pos ) . $html . substr( $content, $pos );
	},
	29
);

// FAQPage data for the same questions.
add_filter(
	'rank_math/json_ld',
	static function ( $data ) {
		if ( ! is_page( 'portfolio' ) || ! is_array( $data ) ) {
			return $data;
		}
		$q = array(
			array( 'What makes a good video ad?', 'A hook in the first seconds that names the viewer and their problem, one clear offer, captions for people watching with the sound off, real footage or real customers instead of stock clips, and a single call to action.' ),
			array( 'How much does a video ad cost?', 'Our video ads start at $34.97 per video with no retainer, and 10 videos cost $299. Full done-for-you programs are quoted on a free strategy call.' ),
			array( 'How fast can you make a video ad?', 'Most videos are delivered in 24–48 hours, with revision rounds included.' ),
		);
		$data['mdmPfFaq'] = array(
			'@type'      => 'FAQPage',
			'@id'        => home_url( '/portfolio/#faq' ),
			'mainEntity' => array_map( static function ( $f ) { return array( '@type' => 'Question', 'name' => $f[0], 'acceptedAnswer' => array( '@type' => 'Answer', 'text' => $f[1] ) ); }, $q ),
		);
		return $data;
	},
	110
);
