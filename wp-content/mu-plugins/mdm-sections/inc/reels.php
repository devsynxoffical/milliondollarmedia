<?php
/**
 * [mdm_reels_showcase] - "Ads that stop the scroll" video grid (4 per row).
 *
 * Usage (Elementor > Shortcode widget):
 * [mdm_reels_showcase
 *    labels="Roofing|Recruitment|HVAC|Agency Owners|Events|SAAS|..."
 *    videos="https://.../roofing.mp4|https://.../recruitment.mp4|..."   (same order as labels)
 *    posters="https://.../roofing.jpg|..."                               (optional cover images)
 *    links="/roofing/|/recruitment/|..."                                 (optional click-through)
 *    cta_text="Start growing" cta_url="/book-your-call/"]
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'mdm_reels_showcase', 'mdm_shortcode_reels' );

function mdm_shortcode_reels( $atts ) {
	$default_videos = implode(
		'|',
		array(
			MDM_Sections::upload_url( '2025/10/X1.mp4' ),
			MDM_Sections::upload_url( '2026/02/The_Precision_Pivot-1.mp4' ),
			MDM_Sections::upload_url( '2025/10/Untitled-file.mp4' ),
			'https://assets.cdn.filesafe.space/W8B8H8FvOolLCrvxXzYp/media/69ef9443717d5dd4e170f445.mp4',
			MDM_Sections::upload_url( '2026/07/million_dollar_header_video_v1-1080p.mp4' ),
		)
	);

	$atts = shortcode_atts(
		array(
			'head'            => 'yes',
			'intro'           => 'Creating winning ads in 2026 is 80% creative and 20% media buying.|But it’s hard to make good ad creative at scale. And the bottleneck is creative, until now…',
			'eyebrow'         => 'AI Video Production · Done For You',
			'title_1'         => 'Ads that',
			'title_2'         => 'stop the',
			'highlight'       => 'scroll.',
			'subtitle'        => 'Creating winning ads is 80% creative and 20% media buying. We turn your offer into scroll-stopping creative at scale: VSLs, UGC, AI videos and short-form built on data, not gut feelings.',
			'cta_text'        => 'Start growing',
			'cta_url'         => MDM_Sections::cta_url(),
			'labels'          => 'Roofing|Recruitment|HVAC|Agency Owners|Events|SAAS|E-Commerce|Coaches|Real Estate|Mortgage|Remodeling|Fitness',
			'videos'          => $default_videos,
			'posters'         => '',
			'links'           => '',
			'formats'         => 'VSLs|Images|GIFs|Videos|UGC|AI Videos|Short Form',
			'platforms_title' => 'Your audience is everywhere. So are your ads.',
			'more_url'        => '',
			'more_text'       => 'Watch all videos',
			'rows'            => 2,
			'stat'            => 'no',   // "yes" = red "250+ brands & creators" card as the 3rd card
			'names'           => 'no',   // "yes" = name / category label at the bottom of each video
			'stat_label'      => 'Brands & creators we work with',
			'stat_value'      => '250+',
		),
		$atts,
		'mdm_reels_showcase'
	);

	$labels  = MDM_Sections::split_list( $atts['labels'] );
	$videos  = MDM_Sections::split_list( $atts['videos'] );
	$posters = MDM_Sections::split_list( $atts['posters'] );
	$links   = MDM_Sections::split_list( $atts['links'] );

	// Build the card list. When this grid replaces the old video section, the original
	// videos + categories are handed in through the "mdm_reels_source" filter.
	$source = apply_filters( 'mdm_reels_source', null );
	$cards  = array();
	if ( is_array( $source ) && ! empty( $source['items'] ) ) {
		foreach ( $source['items'] as $it ) {
			$cards[] = array( 'label' => $it['label'], 'src' => $it['src'], 'type' => $it['type'], 'poster' => $it['poster'], 'link' => '' );
		}
	} else {
		foreach ( $labels as $i => $label ) {
			$src     = $videos ? $videos[ $i % count( $videos ) ] : '';
			$cards[] = array(
				'label'  => $label,
				'src'    => $src,
				'type'   => preg_match( '/vimeo\.com/i', $src ) ? 'vimeo' : ( preg_match( '/youtu\.?be/i', $src ) ? 'youtube' : 'file' ),
				'poster' => isset( $posters[ $i ] ) ? $posters[ $i ] : '',
				'link'   => isset( $links[ $i ] ) ? $links[ $i ] : '',
			);
		}
	}
	// Featured client videos always come first (newest first). Add more with the "mdm_reels_featured" filter.
	$featured = apply_filters( 'mdm_reels_featured', mdm_default_featured_reels() );
	$seen     = wp_list_pluck( $cards, 'src' );
	$top      = array();
	foreach ( $featured as $fv ) {
		if ( empty( $fv['src'] ) || in_array( $fv['src'], $seen, true ) ) {
			continue;
		}
		$fv['type'] = isset( $fv['type'] ) ? $fv['type'] : ( preg_match( '/vimeo\.com/i', $fv['src'] ) ? 'vimeo' : ( preg_match( '/youtu\.?be/i', $fv['src'] ) ? 'youtube' : 'file' ) );
		$top[]      = $fv + array( 'poster' => '', 'link' => '', 'avatar' => '' );
	}
	$cards = array_merge( $top, $cards );

	// Stat card (like "Creators we work with") as the 3rd card of the first row.
	if ( 'no' !== $atts['stat'] && count( $cards ) >= 3 ) {
		// The real clients from the homepage client slider, each with their own follower count.
		$pills = mdm_client_pills();
		if ( count( $pills ) < 6 ) {
			foreach ( array_unique( wp_list_pluck( $cards, 'label' ) ) as $lbl ) {
				if ( 'Video' !== $lbl && ! in_array( $lbl, wp_list_pluck( $pills, 0 ), true ) ) {
					$pills[] = array( $lbl, '', '' );
				}
			}
		}
		array_splice( $cards, 2, 0, array( array( 'type' => 'stat', 'label' => $atts['stat_label'], 'value' => $atts['stat_value'], 'pills' => $pills, 'src' => '', 'poster' => '', 'link' => '', 'avatar' => '' ) ) );
	}

	$more_url = is_array( $source ) && ! empty( $source['more'] ) ? $source['more'] : $atts['more_url'];
	// Two rows at first; the rest opens with "Show all videos" so the section stays compact.
	$visible = max( 4, (int) $atts['rows'] * 4 );
	$cards   = array_slice( $cards, 0, $visible ); // only full rows; "Watch more" opens the rest
	$names   = 'yes' === $atts['names'];
	$formats = MDM_Sections::split_list( $atts['formats'] );

	$platforms = array(
		array( 'Instagram', 'linear-gradient(45deg,#FEDA75,#FA7E1E,#D62976,#962FBF)', 'IG', '#fff' ),
		array( 'Facebook', '#1877F2', 'f', '#fff' ),
		array( 'YouTube', '#FF0000', '▶', '#fff' ),
		array( 'TikTok', '#111', '♪', '#fff' ),
		array( 'Snapchat', '#FFFC00', '👻', '#111' ),
		array( 'X', '#111', '𝕏', '#fff' ),
		array( 'LinkedIn', '#0A66C2', 'in', '#fff' ),
		array( 'Google', '#fff', 'G', '#4285F4' ),
	);

	ob_start();
	echo MDM_Sections::assets(); // phpcs:ignore WordPress.Security.EscapeOutput
	?>
	<section id="reel" class="mdm-reels<?php echo 'no' === $atts['head'] ? ' mdm-reels--nohead' : ''; ?>" data-mdm-reels>
		<?php if ( 'no' === $atts['head'] ) : ?>
			<?php if ( '' !== trim( $atts['intro'] ) ) : ?>
				<div class="mdm-reels__intro">
					<?php foreach ( MDM_Sections::split_list( $atts['intro'] ) as $k => $line ) : ?>
						<p class="mdm-rise" style="--d:<?php echo esc_attr( 0.1 + $k * 0.12 ); ?>s"><?php echo esc_html( $line ); ?></p>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
		<?php else : ?>
		<div class="mdm-reels__head">
			<?php if ( $atts['eyebrow'] ) : ?>
				<span class="mdm-eyebrow mdm-rise" style="--d:.05s"><?php echo esc_html( $atts['eyebrow'] ); ?></span>
			<?php endif; ?>
			<h2 class="mdm-display mdm-reels__title" aria-label="<?php echo esc_attr( $atts['title_1'] . ' ' . $atts['title_2'] . ' ' . $atts['highlight'] ); ?>">
				<span class="mdm-line" aria-hidden="true"><?php echo MDM_Sections::split_words( $atts['title_1'] ); // phpcs:ignore ?></span>
				<span class="mdm-line" aria-hidden="true"><?php echo MDM_Sections::split_words( $atts['title_2'], 2 ); // phpcs:ignore ?>
					<span class="mdm-pill"><span class="mdm-pill__bg"></span><span class="mdm-pill__text"><?php echo esc_html( $atts['highlight'] ); ?></span></span>
				</span>
			</h2>
			<p class="mdm-lead mdm-rise" style="--d:.7s"><?php echo esc_html( $atts['subtitle'] ); ?></p>
			<?php if ( $formats ) : ?>
				<div class="mdm-reels__formats mdm-rise" style="--d:.8s" aria-label="Formats we produce">
					<?php foreach ( $formats as $k => $fmt ) : ?>
						<span class="mdm-tag" style="--k:<?php echo (int) $k; ?>"><?php echo esc_html( $fmt ); ?></span>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
			<div class="mdm-rise" style="--d:.9s"><?php echo MDM_Sections::button( $atts['cta_text'], $atts['cta_url'] ); // phpcs:ignore ?></div>
		</div>

		<?php endif; ?>

		<div class="mdm-reels__grid">
			<?php foreach ( $cards as $i => $card ) :
				if ( 'stat' === $card['type'] ) :
					?>
					<div class="mdm-reel mdm-reel--stat<?php echo $i >= $visible ? ' is-extra' : ''; ?>" style="--i:<?php echo (int) $i; ?>;--col:<?php echo (int) ( $i % 4 ); ?>">
						<div class="mdm-reel__flip">
							<div class="mdm-reel__face mdm-reel__front mdm-stat">
								<div class="mdm-stat__avatars" aria-hidden="true">
									<?php foreach ( array_slice( $card['pills'], 0, 4 ) as $pi => $pl ) : ?>
										<span<?php echo $pl[2] ? ' style="background-image:url(\'' . esc_url( $pl[2] ) . '\')"' : ''; ?>><?php echo $pl[2] ? '' : esc_html( mb_substr( $pl[0], 0, 1 ) ); ?></span>
									<?php endforeach; ?>
								</div>
								<p class="mdm-stat__label"><?php echo esc_html( $card['label'] ); ?></p>
								<p class="mdm-stat__value"><?php echo esc_html( $card['value'] ); ?></p>
								<div class="mdm-stat__lanes" aria-hidden="true">
									<?php for ( $lane = 0; $lane < 3; $lane++ ) :
										// Each lane gets its own clients (1st, 4th, 7th ... / 2nd, 5th ... / 3rd, 6th ...), so no name repeats on screen.
										$items = array();
										foreach ( $card['pills'] as $pk => $pl ) {
											if ( $pk % 3 === $lane ) {
												$items[] = $pl;
											}
										}
										if ( count( $items ) < 2 ) {
											$items = $card['pills'];
										}
										?>
										<div class="mdm-stat__lane<?php echo 1 === $lane ? ' is-reverse' : ''; ?>"><div class="mdm-stat__lane-inner">
											<?php for ( $dup = 0; $dup < 2; $dup++ ) : foreach ( $items as $pl ) : ?>
												<span class="mdm-chip"><i<?php echo $pl[2] ? ' style="background-image:url(\'' . esc_url( $pl[2] ) . '\')"' : ''; ?>><?php echo $pl[2] ? '' : esc_html( mb_substr( $pl[0], 0, 1 ) ); ?></i><?php echo esc_html( $pl[0] ); ?><?php echo MDM_Sections::verified_icon(); // phpcs:ignore ?><?php echo $pl[1] ? '<em>• ' . esc_html( $pl[1] ) . '</em>' : ''; ?></span>
											<?php endforeach; endfor; ?>
										</div></div>
									<?php endfor; ?>
								</div>
							</div>
							<div class="mdm-reel__face mdm-reel__back" style="--c:var(--mdm-red)"><span><?php echo esc_html( $card['value'] ); ?></span></div>
						</div>
					</div>
					<?php
					continue;
				endif;
				$label  = $card['label'];
				$cat    = ! empty( $card['cat'] ) ? $card['cat'] : $label;
				$poster = $card['poster'] ? $card['poster'] : mdm_video_thumb( $card['src'], $card['type'] );
				$link   = $card['link'];
				?>
				<div class="mdm-reel<?php echo $i >= $visible ? ' is-extra' : ''; ?>" style="--i:<?php echo (int) $i; ?>;--col:<?php echo (int) ( $i % 4 ); ?>">
					<?php if ( $cat && 'Video' !== $cat ) : ?><a class="mdm-reel__cat" href="<?php echo esc_url( $more_url ? $more_url : home_url( '/portfolio/' ) ); ?>"><span><?php echo esc_html( $cat ); ?></span><?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?></a><?php endif; ?>
					<div class="mdm-reel__flip">
						<div class="mdm-reel__face mdm-reel__front">
							<?php if ( 'file' === $card['type'] ) : ?>
								<video class="mdm-reel__video skip-lazy no-lazyload" data-no-lazy="1" muted loop playsinline preload="none"
									data-src="<?php echo esc_url( $card['src'] ); ?>"
									<?php echo $poster ? 'poster="' . esc_url( $poster ) . '"' : ''; ?>></video>
							<?php else : ?>
								<?php if ( $poster ) : ?><img class="mdm-reel__poster skip-lazy" data-no-lazy="1" src="<?php echo esc_url( $poster ); ?>" alt="" decoding="async"<?php echo $i < 4 ? ' fetchpriority="high"' : ''; ?>><?php endif; ?>
								<iframe class="mdm-reel__video mdm-reel__frame skip-lazy no-lazyload" data-no-lazy="1" data-skip-lazy="1" title="<?php echo esc_attr( $label ); ?> video" loading="lazy"
									data-type="<?php echo esc_attr( $card['type'] ); ?>"
									data-src="<?php echo esc_url( mdm_embed_url( $card['src'], $card['type'], true ) ); ?>"
									data-src-sound="<?php echo esc_url( mdm_embed_url( $card['src'], $card['type'], false ) ); ?>"
									allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>
							<?php endif; ?>
							<span class="mdm-reel__shade" aria-hidden="true"></span>
							<button type="button" class="mdm-reel__mute" aria-label="Unmute video">Unmute</button>
							<?php if ( $names ) : ?>
							<<?php echo $link ? 'a href="' . esc_url( $link ) . '"' . ( 0 === strpos( $link, 'http' ) && false === strpos( $link, (string) wp_parse_url( home_url(), PHP_URL_HOST ) ) ? ' target="_blank" rel="noopener"' : '' ) : 'span'; ?> class="mdm-reel__label">
								<?php if ( ! empty( $card['avatar'] ) ) : ?>
									<span class="mdm-reel__avatar mdm-reel__avatar--img" style="background-image:url('<?php echo esc_url( $card['avatar'] ); ?>')" aria-hidden="true"></span>
								<?php else : ?>
									<span class="mdm-reel__avatar"><?php echo esc_html( mb_substr( $label, 0, 1 ) ); ?></span>
								<?php endif; ?>
								<span class="mdm-reel__name"><?php echo esc_html( $label ); ?></span>
								<?php echo MDM_Sections::verified_icon(); // phpcs:ignore ?>
							</<?php echo $link ? 'a' : 'span'; ?>>
							<?php endif; ?>
							<button type="button" class="mdm-reel__play" aria-label="Pause video">
								<svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>
								<svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" fill="currentColor"/></svg>
							</button>
						</div>
						<div class="mdm-reel__face mdm-reel__back" style="--c:var(--mdm-c<?php echo (int) ( $i % 5 ); ?>)"><span><?php echo $names ? esc_html( $label ) : ''; ?></span></div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>

		<?php if ( $more_url ) : ?>
			<div class="mdm-reels__more mdm-rise"><?php echo MDM_Sections::button( $atts['more_text'], $more_url ); // phpcs:ignore ?></div>
		<?php endif; ?>

		<div class="mdm-reels__platforms">
			<p class="mdm-rise"><?php echo esc_html( $atts['platforms_title'] ); ?></p>
			<div class="mdm-marquee" aria-hidden="true">
				<div class="mdm-marquee__inner">
					<?php for ( $dup = 0; $dup < 2; $dup++ ) : foreach ( $platforms as $p ) : ?>
						<span class="mdm-platform"><i style="background:<?php echo esc_attr( $p[1] ); ?>;color:<?php echo esc_attr( $p[3] ); ?>"><?php echo esc_html( $p[2] ); ?></i><?php echo esc_html( $p[0] ); ?></span>
					<?php endforeach; endfor; ?>
				</div>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Player URL for a Vimeo / YouTube / other iframe video.
 * $muted = true: silent autoplay loop without controls (card preview).
 * $muted = false: same video with sound, used after "Unmute".
 */
function mdm_embed_url( $src, $type, $muted ) {
	if ( 'vimeo' === $type && preg_match( '~vimeo\.com/(?:video/|.*?/)?(\d+)(?:/([0-9a-f]+))?~i', $src, $m ) ) {
		$hash = ! empty( $m[2] ) ? $m[2] : ( preg_match( '/[?&]h=([0-9a-f]+)/i', $src, $h ) ? $h[1] : '' );
		$args = $muted
			? array( 'background' => 1, 'autoplay' => 1, 'loop' => 1, 'muted' => 1, 'autopause' => 0, 'dnt' => 1 )
			: array( 'autoplay' => 1, 'loop' => 1, 'muted' => 0, 'autopause' => 0, 'title' => 0, 'byline' => 0, 'portrait' => 0, 'dnt' => 1 );
		if ( $hash ) {
			$args = array( 'h' => $hash ) + $args;
		}
		return 'https://player.vimeo.com/video/' . $m[1] . '?' . http_build_query( $args );
	}
	if ( 'youtube' === $type && preg_match( '~(?:youtu\.be/|v=|/embed/|/shorts/)([A-Za-z0-9_-]{6,})~', $src, $m ) ) {
		$args = array( 'autoplay' => 1, 'mute' => $muted ? 1 : 0, 'loop' => 1, 'playlist' => $m[1], 'controls' => $muted ? 0 : 1, 'playsinline' => 1, 'rel' => 0, 'modestbranding' => 1, 'enablejsapi' => 1 );
		return 'https://www.youtube.com/embed/' . $m[1] . '?' . http_build_query( $args );
	}
	return $src;
}

/** Client videos pinned to the front of the video rows. */
function mdm_default_featured_reels() {
	return array(
		array(
			'label'  => 'Marcus Filly',
			'cat'    => 'Fitness',
			'src'    => 'https://vimeo.com/1246210855',
			'avatar' => WPMU_PLUGIN_URL . '/mdm-sections/img/clients/marcus-filly.webp',
			'link'   => 'https://www.instagram.com/marcusfilly/',
		),
	);
}

/**
 * Clients from the homepage client slider (Elementor image boxes): array( name, followers, photo ).
 * "1.1M Followers" -> "1.1M". Marcus Filly first, then the biggest audiences.
 */
function mdm_client_pills() {
	$pid = function_exists( 'mdm_front_page_id' ) ? mdm_front_page_id() : (int) get_option( 'page_on_front' );
	if ( ! $pid ) {
		return array();
	}
	$key    = 'mdm_client_pills_' . $pid . '_' . md5( (string) get_post_modified_time( 'U', true, $pid ) . get_post_meta( $pid, '_elementor_edit_mode', true ) . '3' );
	$cached = get_transient( $key );
	if ( is_array( $cached ) ) {
		return $cached;
	}
	$raw  = get_post_meta( $pid, '_elementor_data', true );
	$data = is_string( $raw ) ? json_decode( $raw, true ) : $raw;
	$out  = array();
	$walk = static function ( $nodes, $in_carousel ) use ( &$walk, &$out ) {
		foreach ( (array) $nodes as $n ) {
			$type = isset( $n['widgetType'] ) ? $n['widgetType'] : '';
			$in   = $in_carousel || in_array( $type, array( 'nested-carousel', 'n-carousel' ), true );
			if ( $in && 'image-box' === $type && ! empty( $n['settings']['title_text'] ) ) {
				$st   = $n['settings'];
				$desc = isset( $st['description_text'] ) ? (string) $st['description_text'] : '';
				$num  = '';
				if ( preg_match( '/([\d.,]+\s*[KkMm]?)\s*(followers|subscribers|subs)/i', wp_strip_all_tags( $desc ), $m ) ) {
					$num = strtoupper( str_replace( ' ', '', $m[1] ) );
				}
				$img   = isset( $st['image']['url'] ) ? $st['image']['url'] : '';
				$out[] = array( trim( wp_strip_all_tags( $st['title_text'] ) ), $num, $img );
			}
			if ( ! empty( $n['elements'] ) ) {
				$walk( $n['elements'], $in );
			}
		}
	};
	$walk( $data, false );

	// De-duplicate, Marcus Filly first, then by audience size.
	$seen = array();
	$out  = array_values( array_filter( $out, static function ( $c ) use ( &$seen ) {
		$k = strtolower( $c[0] );
		if ( isset( $seen[ $k ] ) ) {
			return false;
		}
		$seen[ $k ] = 1;
		return true;
	} ) );
	$size = static function ( $f ) {
		if ( ! preg_match( '/([\d.]+)([KM]?)/', str_replace( ',', '', $f ), $m ) ) {
			return 0;
		}
		return (float) $m[1] * ( 'M' === $m[2] ? 1000000 : ( 'K' === $m[2] ? 1000 : 1 ) );
	};
	usort( $out, static function ( $a, $b ) use ( $size ) {
		if ( 0 === stripos( $a[0], 'Marcus Filly' ) ) {
			return -1;
		}
		if ( 0 === stripos( $b[0], 'Marcus Filly' ) ) {
			return 1;
		}
		return $size( $b[1] ) <=> $size( $a[1] );
	} );
	set_transient( $key, $out, 12 * HOUR_IN_SECONDS );
	return $out;
}

/**
 * Cover image for a Vimeo / YouTube video, shown while the player loads.
 * Vimeo: looked up once with oEmbed and cached for a week.
 */
function mdm_video_thumb( $src, $type ) {
	if ( 'youtube' === $type && preg_match( '~(?:youtu\.be/|v=|/embed/|/shorts/)([A-Za-z0-9_-]{6,})~', $src, $m ) ) {
		return 'https://i.ytimg.com/vi/' . $m[1] . '/hqdefault.jpg';
	}
	if ( 'vimeo' !== $type || ! preg_match( '~vimeo\.com/(?:video/|.*?/)?(\d+)~i', $src, $m ) ) {
		return '';
	}
	$key = 'mdm_vthumb_' . $m[1];
	$hit = get_transient( $key );
	if ( false !== $hit ) {
		return (string) $hit;
	}
	$thumb = '';
	$res   = wp_remote_get( 'https://vimeo.com/api/oembed.json?width=720&url=' . rawurlencode( 'https://vimeo.com/' . $m[1] ), array( 'timeout' => 4 ) );
	if ( ! is_wp_error( $res ) && 200 === (int) wp_remote_retrieve_response_code( $res ) ) {
		$j = json_decode( wp_remote_retrieve_body( $res ), true );
		if ( ! empty( $j['thumbnail_url'] ) ) {
			$thumb = preg_replace( '~_\d+x\d+(\.\w+)?$~', '_720', $j['thumbnail_url'] ); // bigger cover
		}
	}
	set_transient( $key, $thumb, $thumb ? WEEK_IN_SECONDS : HOUR_IN_SECONDS );
	return $thumb;
}

