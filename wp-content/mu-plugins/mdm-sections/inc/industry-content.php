<?php
/**
 * Designed long-form sections for the service pages that had a long text article
 * (plumbing, roofing, coaches): intro split, problem → with-video cards, card grids,
 * a step timeline, tips and a CTA band. Replaces the old Elementor text blocks.
 * Content is condensed from the original articles; unverifiable claims were left out.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mdm_industry_content() {
	$up  = content_url( '/uploads/2026/03/' );
	$cta = $up . 'Modern-digital-marketing-workspace-with-a-professional.webp';

	$steps = array(
		array( 'Strategy call', 'We learn your services, area, ideal customer and goals, then plan which videos and offers to test first.' ),
		array( 'Scripts & hooks', 'Our team writes hook-first scripts and simple storyboards, so every video has one clear message and one call to action.' ),
		array( 'Production', 'We produce with UGC creators, AI avatars or voice-over and b-roll, or edit footage your team films on a phone with our shot list. No studio day needed.' ),
		array( 'Editing & approval', 'Captions, graphics, music and sound design, delivered in 24–48 hours. You review and request changes before anything goes live.' ),
		array( 'Launch, test & scale', 'We run the videos as Meta ads and set them up for your website and Google Business Profile, keep the winners and replace the rest.' ),
	);

	return array(
		'plumbing-video-production'             => array(
			array(
				'type'   => 'intro',
				'pill'   => 'Why video',
				'h2'     => 'Why video works for plumbing companies',
				'p'      => array(
					'Most plumbing companies compete for the same leads with the same photos and the same promises. Homeowners decide fast, and they pick the plumber who looks most trustworthy online.',
					'Video shows your team, your work and your professionalism before the first call. It explains your services clearly, brings in better-qualified leads and even helps you hire skilled technicians.',
				),
				'points' => array( 'Builds trust before the phone rings', 'Explains complex jobs in seconds', 'Turns local searches into calls', 'Strengthens your hiring brand' ),
				'media'  => array( 'img', $up . 'Why-Video-Is-Essential-1.webp', 'Why video matters for plumbing companies' ),
			),
			array(
				'type'  => 'compare',
				'pill'  => 'Problems we solve',
				'h2'    => 'The problems video solves for plumbers',
				'items' => array(
					array( 'Trust', 'Homeowners hesitate to let a plumber they have never met into their home.', 'They see your team and your work on video before they call.' ),
					array( 'Lead quality', 'Leads are inconsistent, and many never turn into booked jobs.', 'Clear video ads attract homeowners with a real job, and every lead is checked first.' ),
					array( 'Complex services', 'Hydro-jetting, trenchless repair or a repipe are hard to explain in text.', 'A 60–90 second explainer makes the job and its value easy to understand.' ),
					array( 'Emergency calls', 'When a pipe bursts, homeowners call the first plumber they remember.', 'Urgency-driven video ads keep your name top of mind for high-intent searches.' ),
					array( 'Hiring', 'Generic job ads do not attract skilled, motivated plumbers.', 'Recruitment and culture videos show why your company is a great place to work.' ),
					array( 'Younger customers', 'Outdated marketing does not reach younger homeowners.', 'Short-form video meets them on Instagram, Facebook, TikTok and YouTube.' ),
				),
			),
			array(
				'type'  => 'grid',
				'pill'  => 'What we make',
				'h2'    => 'Videos we make for plumbers',
				'sub'   => 'Every video is built to solve a real plumbing business problem: more calls, better leads or better hires.',
				'items' => array(
					array( 'Service explainers', 'Explain drain cleaning, hydro-jetting, water heaters or repipes in a way homeowners instantly understand.' ),
					array( 'Customer testimonials', 'Turn happy customers into short, unscripted trust signals for your ads and service pages.' ),
					array( 'Meet the team', 'Put faces to your company so homeowners trust you before the first visit.' ),
					array( 'Emergency service ads', 'Fast, urgent video ads that turn burst-pipe searches into immediate calls.' ),
					array( 'Educational & DIY tips', 'Short tips like how to shut off the main water valve that build trust before the emergency.' ),
					array( 'Recruitment & culture', 'Show your work environment, benefits and growth path to attract plumbers who stay.' ),
				),
			),
			array( 'type' => 'steps', 'pill' => 'How it works', 'h2' => 'From first call to booked jobs', 'sub' => 'A simple process built for busy plumbing companies, with almost no time needed from your team.', 'items' => $steps ),
			array( 'type' => 'cta', 'h2' => 'Ready to turn views into plumbing calls?', 'p' => 'Book a free strategy call. We will look at your current marketing and show you the videos and offers we would test first.', 'bg' => $cta ),
		),

		'roofing-video-marketing-services'      => array(
			array(
				'type'   => 'intro',
				'pill'   => 'Why video',
				'h2'     => 'Why video works for roofing companies',
				'p'      => array(
					'Homeowners no longer pick a roofer from a name and a phone number. They research, compare and decide before they ever contact you, and video plays a big part in that decision.',
					'Showing real projects, real people and real results helps you stand out in a crowded local market and attract homeowners who already understand your value and are ready to book an estimate.',
				),
				'points' => array( 'Real projects instead of stock photos', 'Trust before the first conversation', 'A lead source that does not depend on referrals', 'Remembered when the roof needs replacing' ),
				'media'  => array( 'img', WPMU_PLUGIN_URL . '/mdm-sections/img/industry/roofing-2.webp', 'Roofing contractor recording a video ad on a roof' ),
			),
			array( 'type' => 'steps', 'pill' => 'How it works', 'h2' => 'From first call to booked estimates', 'sub' => 'A clear, done-for-you process that keeps you informed at every step.', 'items' => $steps ),
			array( 'type' => 'cta', 'h2' => 'Ready to grow your roofing business?', 'p' => 'Book a free strategy call. We will show you the roofing campaigns closest to yours and the videos we would test first.', 'bg' => $cta ),
		),

		'strategic-video-marketing-for-coaches' => array(
			array(
				'type'   => 'intro',
				'pill'   => 'Why video',
				'h2'     => 'Stand out in a crowded coaching market',
				'p'      => array(
					'Life, business, executive and health coaches all compete for the same attention. Potential clients are overwhelmed by options, and it is hard to make your voice and your method stand out.',
					'Coaching is personal. Before someone commits, they need to feel they can trust you. Video lets them see your personality, your expertise and your empathy, something text alone cannot do.',
				),
				'points' => array( 'Show the transformation you deliver', 'Build trust before the sales call', 'Done for you, from script to edit', 'Book qualified calls with VSLs and ads' ),
				'media'  => array( 'img', $up . 'Video-Essential-scaled.webp', 'The essentials of a coaching video' ),
			),
			array(
				'type'  => 'compare',
				'pill'  => 'Problems we solve',
				'h2'    => 'What holds coaches back from video',
				'items' => array(
					array( 'Overwhelm', 'Scripting, filming and editing feels like a second job.', 'We handle the strategy, scripts, editing and ads. You show up and coach.' ),
					array( 'Not sure what works', 'You do not know which videos will resonate with your audience.', 'We start from what already converts in your niche and test several hooks.' ),
					array( 'Fear of the camera', 'You worry about looking unpolished or unprofessional on video.', 'We script you, guide you remotely, or use UGC creators and AI avatars instead.' ),
					array( 'No time', 'Client sessions leave little time for marketing.', 'One short questionnaire and a review of the drafts is all we need from you.' ),
				),
			),
			array(
				'type'  => 'grid',
				'pill'  => 'Who we help',
				'h2'    => 'Coaches we work with',
				'cols'  => 2,
				'items' => array(
					array( 'Transformation coaches', 'Coaches who inspire and build community, sharing their method and client stories in a way that resonates.' ),
					array( 'Thought leaders & high-ticket', 'Coaches positioning themselves as the authority for corporate clients and entrepreneurs.' ),
					array( 'Wellbeing & educators', 'Coaches who educate and motivate, connecting with clients on a deeper, empathetic level.' ),
					array( 'New or scaling coaches', 'Whether you need a strong visual foundation or want to scale, we build the system around your stage.' ),
				),
			),
			array(
				'type'  => 'grid',
				'pill'  => 'What is included',
				'h2'    => 'A done-for-you video system for coaches',
				'items' => array(
					array( 'Audience research', 'We study your ideal clients and competitors to find the angles that make you different.' ),
					array( 'Content pillars', 'Video topics aligned with your core offer, so every piece reinforces your method.' ),
					array( 'Scripts & storytelling', 'Hook-first scripts and storytelling frameworks that capture attention and build trust.' ),
					array( 'Editing & sound', 'Editing, graphics, captions and sound design so every video looks polished.' ),
					array( 'Repurposing', 'One longer video becomes many short clips for Instagram, YouTube, TikTok and email.' ),
					array( 'Paid ad campaigns', 'VSLs and short video ads on Meta that book qualified sales calls.' ),
				),
			),
			array(
				'type'  => 'tips',
				'pill'  => 'Expert tips',
				'h2'    => 'Five tips for your first coaching videos',
				'items' => array(
					array( 'Start with why', 'Make your core transformation the focus: why should someone choose you?' ),
					array( 'Be authentic', 'People connect with genuine personality, not perfection.' ),
					array( 'Get the audio right', 'Clear sound matters more than an expensive camera.' ),
					array( 'One clear call to action', 'Tell viewers exactly what to do next: book, download or reply.' ),
					array( 'Repurpose relentlessly', 'Turn every longer video into several short clips.' ),
				),
			),
			array( 'type' => 'steps', 'pill' => 'How it works', 'h2' => 'From overwhelmed to booked out', 'sub' => 'A done-for-you process designed for busy coaches.', 'items' => $steps ),
			array( 'type' => 'cta', 'h2' => 'Ready to amplify your coaching message?', 'p' => 'Book a free strategy session. We will look at your offer and audience and map out the videos that fit your goals, with no pressure.', 'bg' => $cta ),
		),
	);
}

function mdm_industry_content_html( $slug ) {
	$all = mdm_industry_content();
	if ( empty( $all[ $slug ] ) ) {
		return '';
	}
	$cta_url = class_exists( 'MDM_Sections' ) ? MDM_Sections::cta_url() : home_url( '/book-your-call/' );
	ob_start();
	echo '<div class="mdm-ic">';
	foreach ( $all[ $slug ] as $k => $s ) {
		$pill = ! empty( $s['pill'] ) ? '<span class="mdm-niche__pill">' . esc_html( $s['pill'] ) . '</span>' : '';
		$head = $pill . '<h2 class="mdm-ic__h2">' . esc_html( $s['h2'] ) . '</h2>' . ( ! empty( $s['sub'] ) ? '<p class="mdm-ic__sub">' . esc_html( $s['sub'] ) . '</p>' : '' );
		switch ( $s['type'] ) {
			case 'intro':
				echo '<section class="mdm-ic__sec mdm-ic__intro"><div class="mdm-ic__in mdm-ic__split"><div>' . $pill . '<h2 class="mdm-ic__h2">' . esc_html( $s['h2'] ) . '</h2>'; // phpcs:ignore
				foreach ( $s['p'] as $p ) {
					echo '<p class="mdm-ic__p">' . esc_html( $p ) . '</p>';
				}
				echo '<ul class="mdm-ic__checks">';
				foreach ( $s['points'] as $pt ) {
					echo '<li>' . esc_html( $pt ) . '</li>';
				}
				echo '</ul></div><div class="mdm-ic__media">';
				if ( 'img' === $s['media'][0] ) {
					echo '<img src="' . esc_url( $s['media'][1] ) . '" alt="' . esc_attr( $s['media'][2] ) . '" loading="lazy" decoding="async">';
				} else {
					echo mdm_ic_youtube( $s['media'][1], $s['media'][2] ); // phpcs:ignore
				}
				echo '</div></div></section>';
				break;
			case 'compare':
				echo '<section class="mdm-ic__sec"><div class="mdm-ic__in"><div class="mdm-ic__head">' . $head . '</div><div class="mdm-ic__compare">'; // phpcs:ignore
				foreach ( $s['items'] as $it ) {
					echo '<article class="mdm-ic__cmp"><h3>' . esc_html( $it[0] ) . '</h3><div class="mdm-ic__row is-bad"><b>The problem</b><p>' . esc_html( $it[1] ) . '</p></div><div class="mdm-ic__row is-good"><b>With video</b><p>' . esc_html( $it[2] ) . '</p></div></article>';
				}
				echo '</div></div></section>';
				break;
			case 'grid':
				$cols = ! empty( $s['cols'] ) ? (int) $s['cols'] : 3;
				echo '<section class="mdm-ic__sec"><div class="mdm-ic__in"><div class="mdm-ic__head">' . $head . '</div><div class="mdm-ic__grid is-' . $cols . '">'; // phpcs:ignore
				foreach ( $s['items'] as $i => $it ) {
					echo '<article class="mdm-ic__card"><span class="mdm-ic__num">' . esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ) . '</span><h3>' . esc_html( $it[0] ) . '</h3><p>' . esc_html( $it[1] ) . '</p></article>';
				}
				echo '</div></div></section>';
				break;
			case 'tips':
				echo '<section class="mdm-ic__sec"><div class="mdm-ic__in"><div class="mdm-ic__head">' . $head . '</div><div class="mdm-ic__tips">'; // phpcs:ignore
				foreach ( $s['items'] as $it ) {
					echo '<article class="mdm-ic__tip"><span aria-hidden="true">💡</span><h3>' . esc_html( $it[0] ) . '</h3><p>' . esc_html( $it[1] ) . '</p></article>';
				}
				echo '</div></div></section>';
				break;
			case 'steps':
				echo '<section class="mdm-ic__sec"><div class="mdm-ic__in"><div class="mdm-ic__head">' . $head . '</div><ol class="mdm-ic__steps">'; // phpcs:ignore
				foreach ( $s['items'] as $i => $it ) {
					echo '<li><span class="mdm-ic__stepn">' . (int) ( $i + 1 ) . '</span><div><h3>' . esc_html( $it[0] ) . '</h3><p>' . esc_html( $it[1] ) . '</p></div></li>';
				}
				echo '</ol></div></section>';
				break;
			case 'videos':
				echo '<section class="mdm-ic__sec"><div class="mdm-ic__in"><div class="mdm-ic__head">' . $head . '</div><div class="mdm-ic__vids">'; // phpcs:ignore
				foreach ( $s['items'] as $id ) {
					echo mdm_ic_youtube( $id, $s['h2'] ); // phpcs:ignore
				}
				echo '</div></div></section>';
				break;
			case 'cta':
				echo '<section class="mdm-ic__sec mdm-ic__ctasec"><div class="mdm-ic__in"><div class="mdm-ic__cta" style="--bg:url(' . esc_url( $s['bg'] ) . ')"><div><h2 class="mdm-ic__h2">' . esc_html( $s['h2'] ) . '</h2><p>' . esc_html( $s['p'] ) . '</p></div><a class="mdm-ihero__btn is-red" href="' . esc_url( $cta_url ) . '">Book a free strategy call <em>' . MDM_Sections::arrow_icon() . '</em></a></div></div></section>'; // phpcs:ignore
				break;
		}
	}
	echo '</div>';
	return ob_get_clean();
}

/** YouTube cover + click-to-play (reuses the .mdm-vfacade script from reels.php). */
function mdm_ic_youtube( $id, $label ) {
	$id = preg_replace( '/[^A-Za-z0-9_-]/', '', $id );
	return '<div class="mdm-ic__yt"><button type="button" class="mdm-vfacade" data-src="' . esc_url( 'https://www.youtube-nocookie.com/embed/' . $id . '?autoplay=1&rel=0' ) . '" aria-label="' . esc_attr( 'Play video: ' . $label ) . '">'
		. '<img src="' . esc_url( 'https://i.ytimg.com/vi/' . $id . '/hqdefault.jpg' ) . '" alt="' . esc_attr( $label ) . '" loading="lazy" decoding="async"><span class="mdm-vfacade__play" aria-hidden="true"></span></button></div>';
}

/** Put the designed sections where the old article was: just before the newsletter block. */
add_filter(
	'the_content',
	static function ( $content ) {
		if ( ! in_the_loop() || ! is_main_query() || ! function_exists( 'mdm_industry_slug' ) || false !== strpos( $content, 'class="mdm-ic"' ) ) {
			return $content;
		}
		$slug = mdm_industry_slug();
		$html = $slug ? mdm_industry_content_html( $slug ) : '';
		if ( ! $html ) {
			return $content;
		}
		$pos = strpos( $content, '<div class="elementor-element elementor-element-c014af3' );
		return false === $pos ? $content . $html : substr( $content, 0, $pos ) . $html . substr( $content, $pos );
	},
	29
);
