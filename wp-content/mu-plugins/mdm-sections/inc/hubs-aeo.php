<?php
/**
 * AEO block for the case study hubs (/case-studies/, /case-studies/lead-generation/, /case-studies/ecommerce/):
 * a direct "In short" answer, key facts built from the live case data, published example results and an FAQ
 * with matching FAQPage data. Counts come from the case data, results only from published case studies.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_hub_slug() {
	if ( is_admin() || ! is_page() || ( function_exists( 'mdm_current_case' ) && mdm_current_case() ) ) {
		return '';
	}
	$s = get_post_field( 'post_name', get_queried_object_id() );
	return in_array( $s, array( 'case-studies', 'lead-generation', 'ecommerce' ), true ) ? $s : '';
}

function mdm_hub_niche_counts( $cat ) {
	$n = array();
	foreach ( function_exists( 'mdm_case_items' ) ? (array) mdm_case_items( $cat ) : array() as $it ) {
		if ( ! empty( $it['niche'] ) ) {
			$n[ $it['niche'] ] = isset( $n[ $it['niche'] ] ) ? $n[ $it['niche'] ] + 1 : 1;
		}
	}
	arsort( $n );
	return $n;
}

function mdm_hub_data( $slug ) {
	$lg = mdm_hub_niche_counts( 'leadgen' );
	$ec = mdm_hub_niche_counts( 'ecom' );
	$nl = array_sum( $lg );
	$ne = array_sum( $ec );
	$top = static function ( $counts, $k ) {
		return implode( ', ', array_map( static function ( $name, $c ) { return $name . ' (' . $c . ')'; }, array_slice( array_keys( $counts ), 0, $k ), array_slice( array_values( $counts ), 0, $k ) ) );
	};
	$lg_results = array(
		'8,810 MVA leads at $7.61 per lead for a pay-per-lead agency in the MVA space',
		'326 HVAC leads in 26 days at $5.57 per lead',
		'$36,444 collected at a 19.63x return on $1,956 of ad spend for a New Jersey HVAC company',
		'1,011 verified med spa patient leads on $4,703 of ad spend in 28 days',
	);
	$ec_results = array(
		'$2.3M in sales at an 11.6x ROAS for an e-commerce store',
		'$115,416 from $26,271 of ad spend (4.39 ROAS) for a skincare brand',
		'$62,182 in 7 days at a 4.50 ROAS for a supplement brand',
		'$61,960 in a single day at a 3.80 ROAS for a DTC brand',
	);
	$faq_common = array(
		array( 'Are these case study results real?', 'Yes. Every case study comes from a client ad account, Shopify dashboard or CRM, and most include a screenshot or screen recording as proof. We publish the numbers as they were reported, including ad spend.' ),
		array( 'Will I get the same results?', 'Not necessarily. Results depend on the offer, the market, the budget and how fast leads are followed up. The case studies show what our video ads and campaigns have done for businesses like yours, not a promise.' ),
	);
	if ( 'lead-generation' === $slug ) {
		return array(
			'q'     => 'What results do video ads get for lead generation?',
			'short' => 'Million Dollar Media has published ' . $nl . ' lead generation case studies with real ad spend, cost per lead and booked calls. Results include 8,810 MVA leads at $7.61 each and 326 HVAC leads at $5.57 each.',
			'facts' => array( 'Case studies: ' . $nl . ' lead generation campaigns', 'Largest industries: ' . $top( $lg, 5 ), 'Proof: ad account, CRM or screen recording for each case', 'Updated: ' . gmdate( 'F Y' ) ),
			'res'   => $lg_results,
			'faq'   => array_merge(
				array(
					array( 'What is a lead generation case study?', 'It is a record of one real campaign: the offer, the ad spend, how many leads or booked calls it produced and what each lead cost, with proof from the ad account or CRM.' ),
					array( 'Which industries are in your lead generation case studies?', 'The largest groups are ' . $top( $lg, 6 ) . '. Use the filters on this page to see the ones closest to your business.' ),
				),
				$faq_common
			),
		);
	}
	if ( 'ecommerce' === $slug ) {
		return array(
			'q'     => 'What results do video ads get for e-commerce brands?',
			'short' => 'Million Dollar Media has published ' . $ne . ' e-commerce and DTC case studies with revenue and ROAS from Shopify dashboards and screen recordings. Results include $2.3M in sales at an 11.6x ROAS and $115,416 at a 4.39 ROAS.',
			'facts' => array( 'Case studies: ' . $ne . ' e-commerce and DTC brands', 'Categories: ' . $top( $ec, 6 ), 'Proof: Shopify dashboard or screen recording for each case', 'Updated: ' . gmdate( 'F Y' ) ),
			'res'   => $ec_results,
			'faq'   => array_merge(
				array(
					array( 'What is an e-commerce case study?', 'It is a record of one real store or brand campaign: ad spend, revenue and ROAS over a set period, with proof from the Shopify dashboard or a screen recording.' ),
					array( 'Do you work with dropshipping stores and DTC brands?', 'Yes. Our e-commerce case studies include ' . $top( $ec, 6 ) . '.' ),
				),
				$faq_common
			),
		);
	}
	return array(
		'q'     => 'What results do Million Dollar Media video ads get?',
		'short' => 'Million Dollar Media has published ' . ( $nl + $ne ) . ' case studies: ' . $nl . ' lead generation campaigns and ' . $ne . ' e-commerce brands, each with proof from the client ad account, dashboard or CRM. Results include $2.3M in sales at an 11.6x ROAS and 326 HVAC leads at $5.57 each.',
		'facts' => array( 'Case studies: ' . ( $nl + $ne ) . ' (' . $nl . ' lead generation, ' . $ne . ' e-commerce)', 'Largest lead generation industries: ' . $top( $lg, 4 ), 'Largest e-commerce categories: ' . $top( $ec, 3 ), 'Updated: ' . gmdate( 'F Y' ) ),
		'res'   => array_merge( array_slice( $ec_results, 0, 2 ), array_slice( $lg_results, 1, 2 ) ),
		'faq'   => array_merge(
			array(
				array( 'How many case studies has Million Dollar Media published?', ( $nl + $ne ) . ': ' . $nl . ' lead generation campaigns and ' . $ne . ' e-commerce and DTC brands.' ),
				array( 'What is a video ad case study?', 'It is a record of one real campaign built on our video ads: the offer, the ad spend and the result, such as leads, booked calls, revenue or ROAS, with proof from the account.' ),
			),
			$faq_common
		),
	);
}

add_filter(
	'the_content',
	static function ( $content ) {
		$slug = mdm_hub_slug();
		if ( ! $slug || ! in_the_loop() || ! is_main_query() || false !== strpos( $content, 'mdm-hubaeo' ) ) {
			return $content;
		}
		$d = mdm_hub_data( $slug );
		ob_start();
		?>
		<div class="mdm-ugc mdm-lp mdm-hubaeo">
			<section class="mdm-ugc__sec mdm-lp__alt">
				<div class="mdm-ugc__in mdm-lp__body">
					<h2 class="mdm-ugc__h2"><?php echo esc_html( $d['q'] ); ?></h2>
					<p><b>In short:</b> <?php echo esc_html( $d['short'] ); ?></p>
					<h3>Key facts</h3>
					<ul><?php foreach ( $d['facts'] as $f ) : ?><li><?php echo esc_html( $f ); ?></li><?php endforeach; ?></ul>
					<h3>Example results from these case studies</h3>
					<ul><?php foreach ( $d['res'] as $r ) : ?><li><?php echo esc_html( $r ); ?></li><?php endforeach; ?></ul>
					<p>See how we make the ads behind these results: <a href="<?php echo esc_url( home_url( '/video-ad-agency/' ) ); ?>">video ad agency</a>, <a href="<?php echo esc_url( home_url( '/ecommerce-video-ads/' ) ); ?>">ecommerce video ads</a> and <a href="<?php echo esc_url( home_url( '/portfolio/' ) ); ?>">video ad examples</a>.</p>
				</div>
			</section>
			<section class="mdm-ugc__sec">
				<div class="mdm-ugc__in mdm-ugc__faq">
					<h2 class="mdm-ugc__h2">Case study questions</h2>
					<?php foreach ( $d['faq'] as $k => $f ) : ?><details<?php echo 0 === $k ? ' open' : ''; ?>><summary><?php echo esc_html( $f[0] ); ?></summary><p><?php echo esc_html( $f[1] ); ?></p></details><?php endforeach; ?>
				</div>
			</section>
		</div>
		<?php
		return $content . ob_get_clean();
	},
	39
);

add_filter(
	'rank_math/json_ld',
	static function ( $data ) {
		$slug = mdm_hub_slug();
		if ( ! $slug || ! is_array( $data ) ) {
			return $data;
		}
		$data['mdmHubFaq'] = array(
			'@type'      => 'FAQPage',
			'@id'        => get_permalink( get_queried_object_id() ) . '#faq',
			'mainEntity' => array_map( static function ( $f ) { return array( '@type' => 'Question', 'name' => $f[0], 'acceptedAnswer' => array( '@type' => 'Answer', 'text' => $f[1] ) ); }, mdm_hub_data( $slug )['faq'] ),
		);
		return $data;
	},
	20
);
