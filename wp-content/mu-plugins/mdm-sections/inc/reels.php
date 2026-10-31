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
			'more_text'       => 'Watch more',
			'rows'            => 2,
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
	$more_url = is_array( $source ) && ! empty( $source['more'] ) ? $source['more'] : $atts['more_url'];
	// Two rows at first; the rest opens with "Show all videos" so the section stays compact.
	$visible = max( 4, (int) $atts['rows'] * 4 );
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
	<section class="mdm-reels<?php echo 'no' === $atts['head'] ? ' mdm-reels--nohead' : ''; ?>" data-mdm-reels>
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
				$label  = $card['label'];
				$poster = $card['poster'];
				$link   = $card['link'];
				?>
				<div class="mdm-reel<?php echo $i >= $visible ? ' is-extra' : ''; ?>" style="--i:<?php echo (int) $i; ?>;--col:<?php echo (int) ( $i % 4 ); ?>">
					<div class="mdm-reel__flip">
						<div class="mdm-reel__face mdm-reel__front">
							<?php if ( 'file' === $card['type'] ) : ?>
								<video class="mdm-reel__video" muted loop playsinline preload="none"
									data-src="<?php echo esc_url( $card['src'] ); ?>"
									<?php echo $poster ? 'poster="' . esc_url( $poster ) . '"' : ''; ?>></video>
							<?php else : ?>
								<?php if ( $poster ) : ?><img class="mdm-reel__poster" src="<?php echo esc_url( $poster ); ?>" alt="" loading="lazy"><?php endif; ?>
								<iframe class="mdm-reel__video mdm-reel__frame" title="<?php echo esc_attr( $label ); ?> video" loading="lazy"
									data-type="<?php echo esc_attr( $card['type'] ); ?>"
									data-src="<?php echo esc_url( mdm_embed_url( $card['src'], $card['type'], true ) ); ?>"
									data-src-sound="<?php echo esc_url( mdm_embed_url( $card['src'], $card['type'], false ) ); ?>"
									allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>
							<?php endif; ?>
							<span class="mdm-reel__shade" aria-hidden="true"></span>
							<button type="button" class="mdm-reel__mute" aria-label="Unmute video">Unmute</button>
							<<?php echo $link ? 'a href="' . esc_url( $link ) . '"' : 'span'; ?> class="mdm-reel__label">
								<span class="mdm-reel__avatar"><?php echo esc_html( mb_substr( $label, 0, 1 ) ); ?></span>
								<span class="mdm-reel__name"><?php echo esc_html( $label ); ?></span>
								<?php echo MDM_Sections::verified_icon(); // phpcs:ignore ?>
							</<?php echo $link ? 'a' : 'span'; ?>>
							<button type="button" class="mdm-reel__play" aria-label="Pause video">
								<svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>
								<svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" fill="currentColor"/></svg>
							</button>
						</div>
						<div class="mdm-reel__face mdm-reel__back" style="--c:var(--mdm-c<?php echo (int) ( $i % 5 ); ?>)"><span><?php echo esc_html( $label ); ?></span></div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>

		<?php if ( count( $cards ) > $visible ) : ?>
			<div class="mdm-reels__more"><button type="button" class="mdm-btn mdm-btn--ghost" data-mdm-reels-more><span class="mdm-btn__icon"><?php echo MDM_Sections::arrow_icon(); // phpcs:ignore ?></span><span><?php echo esc_html( sprintf( 'Show all %d videos', count( $cards ) ) ); ?></span></button></div>
		<?php endif; ?>
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
