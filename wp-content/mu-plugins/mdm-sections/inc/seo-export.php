<?php
/**
 * Read-only, admin-only export of the SEO settings per page/post, for keyword reports:
 * GET /wp-json/mdm/v1/seo-export -> [ { id, type, slug, url, title, focus_keyword, seo_title, seo_description, robots } ]
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'rest_api_init',
	static function () {
		register_rest_route(
			'mdm/v1',
			'/seo-export',
			array(
				'methods'             => 'GET',
				'permission_callback' => static function () {
					return current_user_can( 'manage_options' );
				},
				'callback'            => static function () {
					$out = array();
					$ids = get_posts(
						array(
							'post_type'   => array( 'page', 'post' ),
							'post_status' => 'publish',
							'numberposts' => 500,
							'fields'      => 'ids',
						)
					);
					foreach ( $ids as $id ) {
						$out[] = array(
							'id'              => $id,
							'type'            => get_post_type( $id ),
							'slug'            => get_post_field( 'post_name', $id ),
							'url'             => get_permalink( $id ),
							'title'           => get_the_title( $id ),
							'focus_keyword'   => (string) get_post_meta( $id, 'rank_math_focus_keyword', true ),
							'seo_title'       => (string) get_post_meta( $id, 'rank_math_title', true ),
							'seo_description' => (string) get_post_meta( $id, 'rank_math_description', true ),
							'robots'          => get_post_meta( $id, 'rank_math_robots', true ),
						);
					}
					return $out;
				},
			)
		);
	}
);
