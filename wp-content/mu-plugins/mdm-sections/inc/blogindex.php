<?php
/**
 * /blogs/ page: designed blog index (dark hero with category filters, featured latest post,
 * card grid, CTA). Replaces the plain Elementor posts widget. Posts without a featured image
 * get a designed cover instead of an empty card.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_blog_cover( $post_id, $class = '' ) {
	if ( has_post_thumbnail( $post_id ) ) {
		return get_the_post_thumbnail( $post_id, 'large', array( 'class' => $class, 'loading' => 'lazy', 'decoding' => 'async', 'alt' => get_the_title( $post_id ) ) );
	}
	$cats = get_the_category( $post_id );
	return '<span class="mdm-bcover ' . esc_attr( $class ) . '" aria-hidden="true"><i>' . esc_html( $cats ? $cats[0]->name : 'Blog' ) . '</i><b>' . esc_html( get_the_title( $post_id ) ) . '</b><em>Million Dollar Media</em></span>';
}

function mdm_blog_card_meta( $post_id ) {
	$cats = get_the_category( $post_id );
	$min  = function_exists( 'mdm_blog_read_minutes' ) ? mdm_blog_read_minutes( $post_id ) : 5;
	return '<div class="mdm-bcard__meta">' . ( $cats ? '<span class="mdm-bcard__cat">' . esc_html( $cats[0]->name ) . '</span>' : '' )
		. '<span>' . esc_html( get_the_date( 'M j, Y', $post_id ) ) . '</span><span>' . (int) $min . ' min read</span></div>';
}

function mdm_blog_excerpt( $post_id, $words = 24 ) {
	// Never call get_the_excerpt() here: it runs the_content filters again (this index is one of them).
	$ex = get_post_field( 'post_excerpt', $post_id );
	if ( ! $ex ) {
		$ex = strip_shortcodes( (string) get_post_field( 'post_content', $post_id ) );
	}
	return wp_trim_words( wp_strip_all_tags( $ex ), $words, '…' );
}

function mdm_blog_index_html() {
	$q = new WP_Query(
		array(
			'post_type'           => 'post',
			'post_status'         => 'publish',
			'posts_per_page'      => 60,
			'ignore_sticky_posts' => true,
			'no_found_rows'       => true,
		)
	);
	$posts = $q->posts;
	if ( ! $posts ) {
		return '';
	}
	$cats = array();
	foreach ( $posts as $p ) {
		foreach ( get_the_category( $p->ID ) as $c ) {
			$cats[ $c->slug ] = $c->name;
		}
	}
	$first = array_shift( $posts );
	ob_start();
	?>
	<div class="mdm-blog" data-mdm-blog>
		<section class="mdm-blog__hero">
			<div class="mdm-blog__in">
				<span class="mdm-niche__pill">The MDM blog</span>
				<h1 class="mdm-blog__h1">Video marketing insights &amp; growth strategies</h1>
				<p class="mdm-blog__lead">Proven video marketing strategies, paid ad frameworks and content systems from the team behind 247+ client case studies. Practical, step-by-step and ready to use.</p>
				<div class="mdm-blog__filters" role="group" aria-label="Filter articles by topic">
					<button type="button" class="is-on" data-blog-cat="all">All <small><?php echo (int) ( count( $posts ) + 1 ); ?></small></button>
					<?php foreach ( $cats as $slug => $name ) : ?>
						<button type="button" data-blog-cat="<?php echo esc_attr( $slug ); ?>"><?php echo esc_html( $name ); ?></button>
					<?php endforeach; ?>
				</div>
			</div>
		</section>

		<section class="mdm-blog__body">
			<div class="mdm-blog__in">
				<?php $fc = wp_list_pluck( get_the_category( $first->ID ), 'slug' ); ?>
				<a class="mdm-bfeat" href="<?php echo esc_url( get_permalink( $first ) ); ?>" data-cats="<?php echo esc_attr( implode( ' ', $fc ) ); ?>">
					<span class="mdm-bfeat__img"><?php echo mdm_blog_cover( $first->ID ); // phpcs:ignore ?><span class="mdm-bfeat__badge">Latest article</span></span>
					<span class="mdm-bfeat__txt">
						<?php echo mdm_blog_card_meta( $first->ID ); // phpcs:ignore ?>
						<span class="mdm-bfeat__title"><?php echo esc_html( get_the_title( $first ) ); ?></span>
						<span class="mdm-bfeat__ex"><?php echo esc_html( mdm_blog_excerpt( $first->ID, 40 ) ); ?></span>
						<span class="mdm-bcard__more">Read article <i aria-hidden="true">→</i></span>
					</span>
				</a>

				<div class="mdm-bgrid">
					<?php foreach ( $posts as $p ) : $pc = wp_list_pluck( get_the_category( $p->ID ), 'slug' ); ?>
						<a class="mdm-bcard" href="<?php echo esc_url( get_permalink( $p ) ); ?>" data-cats="<?php echo esc_attr( implode( ' ', $pc ) ); ?>">
							<span class="mdm-bcard__img"><?php echo mdm_blog_cover( $p->ID ); // phpcs:ignore ?></span>
							<span class="mdm-bcard__body">
								<?php echo mdm_blog_card_meta( $p->ID ); // phpcs:ignore ?>
								<span class="mdm-bcard__title"><?php echo esc_html( get_the_title( $p ) ); ?></span>
								<span class="mdm-bcard__ex"><?php echo esc_html( mdm_blog_excerpt( $p->ID ) ); ?></span>
								<span class="mdm-bcard__more">Read article <i aria-hidden="true">→</i></span>
							</span>
						</a>
					<?php endforeach; ?>
				</div>
				<p class="mdm-blog__empty" hidden>No articles in this topic yet.</p>

				<div class="mdm-ic__cta mdm-blog__cta" style="--bg:url(<?php echo esc_url( content_url( '/uploads/2026/03/Modern-digital-marketing-workspace-with-a-professional.webp' ) ); ?>)">
					<div><h2 class="mdm-ic__h2">Want these strategies done for you?</h2><p>Book a free strategy call. We will review your offer and current ads and show you the case studies closest to your business.</p></div>
					<a class="mdm-ihero__btn is-red" href="<?php echo esc_url( MDM_Sections::cta_url() ); ?>">Book a free strategy call <em><?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?></em></a>
				</div>
			</div>
		</section>
		<script>
		(function () {
			var root = document.querySelector('[data-mdm-blog]');
			if (!root) return;
			var btns = root.querySelectorAll('[data-blog-cat]'), cards = root.querySelectorAll('[data-cats]'), empty = root.querySelector('.mdm-blog__empty');
			btns.forEach(function (b) {
				b.addEventListener('click', function () {
					var c = b.getAttribute('data-blog-cat'), shown = 0;
					btns.forEach(function (x) { x.classList.toggle('is-on', x === b); });
					cards.forEach(function (card) {
						var on = c === 'all' || (' ' + card.getAttribute('data-cats') + ' ').indexOf(' ' + c + ' ') > -1;
						card.hidden = !on; if (on) shown++;
					});
					empty.hidden = shown > 0;
				});
			});
		})();
		</script>
	</div>
	<?php
	return ob_get_clean();
}

add_filter(
	'the_content',
	static function ( $content ) {
		static $busy = false;
		if ( $busy || is_admin() || ! is_page( 'blogs' ) || ! in_the_loop() || ! is_main_query() ) {
			return $content;
		}
		$busy = true;
		$html = mdm_blog_index_html();
		$busy = false;
		return $html ? $html : $content;
	},
	40
);
