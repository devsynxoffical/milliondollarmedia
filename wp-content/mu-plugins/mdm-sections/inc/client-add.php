<?php
/**
 * One-time job: add a new client to the homepage client slider (built in Elementor).
 *
 * Runs once on the server after deploy. It finds the client card that shows
 * "Darrell Stern", duplicates it as the FIRST card and fills in the new client.
 * The original Elementor data is backed up first; Settings > Page Designer shows the
 * result and has an "Undo" button that restores the backup.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const MDM_CLIENT_JOB_OPTION = 'mdm_client_job_marcus_filly';

function mdm_new_client() {
	return array(
		'match'     => 'Darrell Stern', // an existing client card used as the template
		'name'      => 'Marcus Filly',
		'followers' => '1.1M Followers',
		'lines'     => array( 'Fitness Coach | Founder, Functional Bodybuilding', 'Featured in Men\'s Health' ),
		'image'     => WPMU_PLUGIN_URL . '/mdm-sections/img/clients/marcus-filly.jpg',
		'link'      => 'https://www.instagram.com/marcusfilly/',
	);
}

/** Text of a node and its children (all string settings that hold visible text). */
function mdm_node_text( $node ) {
	$out = '';
	foreach ( (array) ( isset( $node['settings'] ) ? $node['settings'] : array() ) as $k => $v ) {
		if ( is_string( $v ) && mdm_is_text_key( $k ) ) {
			$out .= ' ' . wp_strip_all_tags( $v );
		}
	}
	foreach ( (array) ( isset( $node['elements'] ) ? $node['elements'] : array() ) as $c ) {
		$out .= ' ' . mdm_node_text( $c );
	}
	return $out;
}

function mdm_is_text_key( $k ) {
	return (bool) preg_match( '/^(title|editor|text|title_text|description_text|heading|name|job|testimonial_(content|name|job)|content|caption|ending_number|prefix|suffix|before_text|highlighted_text|after_text)$/', $k );
}

/** Path (list of nodes) from a top-level element down to the node whose own settings contain $needle. */
function mdm_find_path( $nodes, $needle, $path = array() ) {
	foreach ( $nodes as $i => $n ) {
		$here = array_merge( $path, array( array( 'list' => $nodes, 'index' => $i ) ) );
		foreach ( (array) ( isset( $n['settings'] ) ? $n['settings'] : array() ) as $k => $v ) {
			if ( is_string( $v ) && mdm_is_text_key( $k ) && false !== stripos( wp_strip_all_tags( $v ), $needle ) ) {
				return $here;
			}
		}
		if ( ! empty( $n['elements'] ) ) {
			$found = mdm_find_path( $n['elements'], $needle, $here );
			if ( $found ) {
				return $found;
			}
		}
	}
	return null;
}

function mdm_new_el_id() {
	return substr( md5( uniqid( '', true ) . wp_rand() ), 0, 7 );
}

/** Deep copy with fresh ids and the new client's texts / image / link. */
function mdm_clone_for_client( $node, $client, &$line_i ) {
	if ( isset( $node['id'] ) ) {
		$node['id'] = mdm_new_el_id();
	}
	if ( ! empty( $node['settings'] ) && is_array( $node['settings'] ) ) {
		foreach ( $node['settings'] as $k => $v ) {
			// images (image widget, image box, backgrounds, testimonial image ...)
			if ( is_array( $v ) && array_key_exists( 'url', $v ) && ( preg_match( '/image/i', $k ) || 'background_image' === $k ) && preg_match( '/\.(jpe?g|png|webp|gif|avif)/i', (string) $v['url'] ) ) {
				$node['settings'][ $k ] = array( 'url' => $client['image'], 'id' => '', 'size' => '', 'alt' => $client['name'], 'source' => 'url' );
				continue;
			}
			// links on the card
			if ( is_array( $v ) && array_key_exists( 'url', $v ) && preg_match( '/link/i', $k ) && ! empty( $v['url'] ) ) {
				$node['settings'][ $k ]['url']         = $client['link'];
				$node['settings'][ $k ]['is_external'] = 'on';
				continue;
			}
			if ( ! is_string( $v ) || ! mdm_is_text_key( $k ) ) {
				continue;
			}
			$plain = trim( wp_strip_all_tags( $v ) );
			if ( '' === $plain ) {
				continue;
			}
			if ( false !== strpos( $v, '<' ) ) {
				// formatted text: replace each text piece, keep tags and styling
				$node['settings'][ $k ] = mdm_replace_text_nodes( $v, $client, $line_i );
				continue;
			}
			if ( false !== stripos( $plain, $client['match'] ) ) {
				$node['settings'][ $k ] = $client['name'];
			} elseif ( preg_match( '/\d[\d.,]*\s*[kKmM]?\+?\s*(followers?|subscribers?|fans)/i', $plain ) ) {
				$node['settings'][ $k ] = $client['followers'];
			} else {
				$node['settings'][ $k ] = isset( $client['lines'][ $line_i ] ) ? $client['lines'][ $line_i ] : '';
				$line_i++;
			}
		}
	}
	if ( ! empty( $node['elements'] ) ) {
		foreach ( $node['elements'] as $i => $c ) {
			$node['elements'][ $i ] = mdm_clone_for_client( $c, $client, $line_i );
		}
	}
	return $node;
}

/**
 * Replace every text piece inside formatted HTML (e.g. "<span>Coach</span><br><b>19K Followers</b>")
 * while keeping the tags/styling: name -> name, "N Followers" -> followers, other pieces -> next line.
 */
function mdm_replace_text_nodes( $html, $client, &$line_i ) {
	return preg_replace_callback(
		'/(^|>)([^<]+)/',
		static function ( $m ) use ( $client, &$line_i ) {
			$t = trim( html_entity_decode( $m[2] ) );
			if ( '' === $t ) {
				return $m[0];
			}
			if ( false !== stripos( $t, $client['match'] ) ) {
				$new = $client['name'];
			} elseif ( preg_match( '/\d[\d.,]*\s*[kKmM]?\+?\s*(followers?|subscribers?|fans)/i', $t ) ) {
				$new = $client['followers'];
			} else {
				$new = isset( $client['lines'][ $line_i ] ) ? $client['lines'][ $line_i ] : '';
				$line_i++;
			}
			return $m[1] . esc_html( $new );
		},
		$html
	);
}

/** Insert the cloned card into the Elementor data. Returns [ new data, message ] or [ null, error ]. */
function mdm_add_client_to_data( $data, $client ) {
	if ( false !== stripos( wp_json_encode( $data ), $client['name'] ) ) {
		return array( null, $client['name'] . ' is already on the page.' );
	}
	$path = mdm_find_path( $data, $client['match'] );
	if ( ! $path ) {
		return array( null, 'Could not find the client card with "' . $client['match'] . '".' );
	}
	// The card = deepest container on the path whose parent holds 2+ items of the same kind
	// (i.e. one card among several), but never a whole top-level section.
	$card_level = null;
	for ( $lvl = count( $path ) - 1; $lvl >= 1; $lvl-- ) {
		$node  = $path[ $lvl ]['list'][ $path[ $lvl ]['index'] ];
		$list  = $path[ $lvl ]['list'];
		$kind  = isset( $node['elType'] ) ? $node['elType'] : '';
		$same  = count( array_filter( $list, static function ( $s ) use ( $kind ) { return isset( $s['elType'] ) && $s['elType'] === $kind; } ) );
		if ( in_array( $kind, array( 'container', 'column', 'section' ), true ) && $same >= 2 ) {
			$card_level = $lvl;
			break;
		}
	}
	if ( null === $card_level ) {
		return array( null, 'Found "' . $client['match'] . '" but could not tell which block is one client card.' );
	}
	$template = $path[ $card_level ]['list'][ $path[ $card_level ]['index'] ];
	$line_i   = 0;
	$card     = mdm_clone_for_client( $template, $client, $line_i );

	// Walk down to the parent list and insert the new card first among its siblings of the same kind.
	$ref    = &$data;
	$parent = null;
	for ( $lvl = 0; $lvl < $card_level; $lvl++ ) {
		$parent = &$ref[ $path[ $lvl ]['index'] ];
		$ref    = &$parent['elements'];
	}
	$old_count = count( $ref );
	$first = 0;
	foreach ( $ref as $i => $s ) {
		if ( isset( $s['elType'] ) && $s['elType'] === $template['elType'] ) {
			$first = $i;
			break;
		}
	}
	array_splice( $ref, $first, 0, array( $card ) );
	// Carousel widgets (e.g. Elementor's nested carousel) keep a slide list that must match the
	// number of child cards: add a matching slide entry at the same position.
	if ( is_array( $parent ) && ! empty( $parent['settings'] ) ) {
		foreach ( $parent['settings'] as $k => $v ) {
			if ( is_array( $v ) && array_values( $v ) === $v && count( $v ) === $old_count && isset( $v[0] ) && is_array( $v[0] ) ) {
				$item = $v[ min( $first, count( $v ) - 1 ) ];
				$item['_id'] = mdm_new_el_id();
				foreach ( $item as $ik => $iv ) {
					if ( is_string( $iv ) && preg_match( '/title|name/i', $ik ) ) {
						$item[ $ik ] = $client['name'];
					}
				}
				array_splice( $parent['settings'][ $k ], $first, 0, array( $item ) );
			}
		}
	}
	unset( $ref, $parent );
	return array( $data, 'Added ' . $client['name'] . ' as the first client card (copied from the "' . $client['match'] . '" card).' );
}

/* ------------------------------------------------------------------ */
/* Run once on the server, with backup                                 */
/* ------------------------------------------------------------------ */

add_action(
	'init',
	static function () {
		if ( wp_doing_ajax() || ( defined( 'WP_CLI' ) && WP_CLI ) || get_option( MDM_CLIENT_JOB_OPTION ) ) {
			return;
		}
		$pid = function_exists( 'mdm_front_page_id' ) ? mdm_front_page_id() : (int) get_option( 'page_on_front' );
		$raw = $pid ? get_post_meta( $pid, '_elementor_data', true ) : '';
		if ( ! $raw ) {
			return; // try again on a later request (e.g. database not ready)
		}
		// lock first so two simultaneous requests can't both run it
		if ( ! add_option( MDM_CLIENT_JOB_OPTION, array( 'status' => 'running', 'time' => time() ), '', false ) ) {
			return;
		}
		$data = is_array( $raw ) ? $raw : json_decode( (string) $raw, true );
		if ( ! is_array( $data ) ) {
			update_option( MDM_CLIENT_JOB_OPTION, array( 'status' => 'error', 'message' => 'Homepage Elementor data could not be read.', 'time' => time() ), false );
			return;
		}
		list( $new, $msg ) = mdm_add_client_to_data( $data, mdm_new_client() );
		if ( null === $new ) {
			update_option( MDM_CLIENT_JOB_OPTION, array( 'status' => 'skipped', 'message' => $msg, 'time' => time() ), false );
			return;
		}
		update_option( 'mdm_backup_elementor_' . $pid, array( 'time' => time(), 'data' => is_string( $raw ) ? $raw : wp_json_encode( $raw ) ), false );
		update_post_meta( $pid, '_elementor_data', wp_slash( wp_json_encode( $new ) ) );
		mdm_flush_elementor( $pid );
		update_option( MDM_CLIENT_JOB_OPTION, array( 'status' => 'done', 'message' => $msg, 'time' => time(), 'pid' => $pid ), false );
	},
	20
);

function mdm_flush_elementor( $pid ) {
	delete_post_meta( $pid, '_elementor_css' );
	delete_post_meta( $pid, '_elementor_element_cache' );
	delete_post_meta( $pid, '_elementor_page_assets' );
	if ( class_exists( '\Elementor\Plugin' ) && isset( \Elementor\Plugin::$instance->files_manager ) ) {
		\Elementor\Plugin::$instance->files_manager->clear_cache();
	}
	clean_post_cache( $pid );
	if ( function_exists( 'mdm_clear_page_cache' ) ) {
		mdm_clear_page_cache();
	}
}

/* Undo from Settings > Page Designer */
add_action(
	'admin_post_mdm_client_undo',
	static function () {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'Not allowed.' );
		}
		check_admin_referer( 'mdm_client_undo' );
		$job    = get_option( MDM_CLIENT_JOB_OPTION );
		$pid    = isset( $job['pid'] ) ? (int) $job['pid'] : mdm_front_page_id();
		$backup = get_option( 'mdm_backup_elementor_' . $pid );
		if ( $backup && ! empty( $backup['data'] ) ) {
			update_post_meta( $pid, '_elementor_data', wp_slash( $backup['data'] ) );
			mdm_flush_elementor( $pid );
			update_option( MDM_CLIENT_JOB_OPTION, array( 'status' => 'undone', 'message' => 'The homepage was restored to how it was before the new client was added.', 'time' => time() ), false );
		}
		wp_safe_redirect( admin_url( 'options-general.php?page=mdm-new-homepage' ) );
		exit;
	}
);

add_action(
	'admin_notices',
	static function () {
		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
		if ( ! $screen || 'settings_page_mdm-new-homepage' !== $screen->id ) {
			return;
		}
		$job = get_option( MDM_CLIENT_JOB_OPTION );
		if ( ! is_array( $job ) || empty( $job['message'] ) ) {
			return;
		}
		$ok = 'done' === $job['status'];
		echo '<div class="notice ' . ( $ok ? 'notice-success' : 'notice-warning' ) . '"><p><strong>New client (Marcus Filly):</strong> ' . esc_html( $job['message'] );
		if ( $ok ) {
			echo ' <a class="button button-small" href="' . esc_url( wp_nonce_url( admin_url( 'admin-post.php?action=mdm_client_undo' ), 'mdm_client_undo' ) ) . '" onclick="return confirm(\'Remove the new client card and restore the homepage as it was?\')">Undo</a>';
		}
		echo '</p></div>';
	}
);

/* ------------------------------------------------------------------ */
/* One-time repair: the first run kept Darrell's subtitle on the new    */
/* card (title + followers live together in one formatted field).      */
/* ------------------------------------------------------------------ */

function mdm_fix_client_subtitle( $nodes, $client, $template_desc, &$changed ) {
	foreach ( $nodes as $i => $n ) {
		$set = isset( $n['settings'] ) && is_array( $n['settings'] ) ? $n['settings'] : array();
		if ( isset( $set['title_text'] ) && trim( wp_strip_all_tags( $set['title_text'] ) ) === $client['name'] && isset( $set['description_text'] ) && null !== $template_desc ) {
			$line_i = 0;
			$nodes[ $i ]['settings']['description_text'] = mdm_replace_text_nodes( $template_desc, $client, $line_i );
			$changed = true;
		}
		if ( ! empty( $n['elements'] ) ) {
			$nodes[ $i ]['elements'] = mdm_fix_client_subtitle( $n['elements'], $client, $template_desc, $changed );
		}
	}
	return $nodes;
}

function mdm_find_desc_of( $nodes, $name ) {
	foreach ( $nodes as $n ) {
		$set = isset( $n['settings'] ) && is_array( $n['settings'] ) ? $n['settings'] : array();
		if ( isset( $set['title_text'], $set['description_text'] ) && false !== stripos( wp_strip_all_tags( $set['title_text'] ), $name ) ) {
			return $set['description_text'];
		}
		if ( ! empty( $n['elements'] ) ) {
			$d = mdm_find_desc_of( $n['elements'], $name );
			if ( null !== $d ) {
				return $d;
			}
		}
	}
	return null;
}

add_action(
	'init',
	static function () {
		if ( wp_doing_ajax() || get_option( 'mdm_client_job_marcus_filly_fix1' ) ) {
			return;
		}
		$job = get_option( MDM_CLIENT_JOB_OPTION );
		if ( ! is_array( $job ) || 'done' !== $job['status'] ) {
			return; // only repairs a card that the first job added
		}
		if ( ! add_option( 'mdm_client_job_marcus_filly_fix1', array( 'status' => 'running', 'time' => time() ), '', false ) ) {
			return;
		}
		$pid  = isset( $job['pid'] ) ? (int) $job['pid'] : mdm_front_page_id();
		$raw  = get_post_meta( $pid, '_elementor_data', true );
		$data = is_array( $raw ) ? $raw : json_decode( (string) $raw, true );
		if ( ! is_array( $data ) ) {
			update_option( 'mdm_client_job_marcus_filly_fix1', array( 'status' => 'error', 'time' => time() ), false );
			return;
		}
		$client  = mdm_new_client();
		$changed = false;
		$data    = mdm_fix_client_subtitle( $data, $client, mdm_find_desc_of( $data, $client['match'] ), $changed );
		if ( $changed ) {
			update_option( 'mdm_backup_elementor_' . $pid . '_fix1', array( 'time' => time(), 'data' => is_string( $raw ) ? $raw : wp_json_encode( $raw ) ), false );
			update_post_meta( $pid, '_elementor_data', wp_slash( wp_json_encode( $data ) ) );
			mdm_flush_elementor( $pid );
		}
		update_option( 'mdm_client_job_marcus_filly_fix1', array( 'status' => $changed ? 'done' : 'nothing-to-fix', 'time' => time() ), false );
	},
	21
);
