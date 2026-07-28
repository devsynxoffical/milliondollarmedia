<?php

function fca_pc_woo_ajax_add_to_cart() {

	$p = fca_pc_get_woo_product( sanitize_text_field( $_POST['product_id'] ) );

	if ( $p ) {
		
		$options = get_option( 'fca_pc', array() );
		$woo_id_mode = empty( $options['woo_product_id'] ) ? 'post_id' : $options['woo_product_id'];
		$id = $woo_id_mode === 'post_id' ? $p->get_id() : $p->get_sku();
		$content_type = $p->get_type() === 'variable' ? 'product_group' : 'product';
		$value = wc_get_price_to_display( $p );
		$currency = get_woocommerce_currency();
		
		$data = array(
			'facebook' => array(
				'value' => $value,
				'currency' => $currency,
				'content_name' => $p->get_title(),
				'content_ids' => array( $id ),
				'content_type' => $content_type,
			),	
			'tiktok' => array(
				'value' => $value,
				'currency' => $currency,
				'content_name' => $p->get_title(),
				'content_ids' => array( $id ),
				'content_type' => $content_type,
			),	
			'reddit' => array(
				'value' => $value,
				'currency' => $currency,
				'content_name' => $p->get_title(),
				'content_ids' => array( $id ),
				'content_type' => $content_type,
			),
			'ga' => array(
				'value' => $value,
				'currency' => $currency,
				'items' => array( $id ),
			),
			'pinterest' => array(
				'value' => $value,
				'currency' => $currency,
				'product_name' =>$p->get_title(),
				'product_id' => $id,
			),
			'snapchat' => array(
				'price' => $value,
				'currency' => $currency,
				'description' =>$p->get_title(),
				'item_ids' => array( $id ),
			),		
		);
		
		wp_send_json_success( $data );
		
	}
	
	wp_send_json_error();
}
add_action( 'wp_ajax_fca_pc_woo_ajax_add_to_cart', 'fca_pc_woo_ajax_add_to_cart' );
add_action( 'wp_ajax_nopriv_fca_pc_woo_ajax_add_to_cart', 'fca_pc_woo_ajax_add_to_cart' );


function fca_pc_capi_event() {
	
	$nonce = sanitize_text_field( $_POST['nonce'] );
	
	if( wp_verify_nonce( $nonce, 'fca_pc_capi_nonce' ) === false ){
		wp_send_json_error( 'Unauthorized, please log in and try again.' );
	}
	
	$pixels = fca_pc_get_active_pixels();
	forEach( $pixels as $pixel ){
		
		$pixel_id = empty( $pixel['pixel'] ) ? '' : $pixel['pixel'];
		$pixel_type = empty( $pixel['type'] ) ? '' : $pixel['type'];
		$capi_token = empty( $pixel['capi'] ) ? '' : $pixel['capi'];
		$test_code = empty( $pixel['test'] ) ? '' : $pixel['test'];
		
		if( ( ( $pixel_type === 'Conversions API' ) && $pixel_id && $capi_token ) ) {
			fca_pc_fb_api_call( $pixel_id, $capi_token, $test_code );
		}

	}
	
	wp_send_json_success();

}
add_action( 'wp_ajax_fca_pc_capi_event', 'fca_pc_capi_event' );
add_action( 'wp_ajax_nopriv_fca_pc_capi_event', 'fca_pc_capi_event' );

function fca_pc_fb_api_call( $pixel, $capi_token, $test_code ){

	$url = "https://graph.facebook.com/v11.0/$pixel/events?access_token=$capi_token";
	$event_name = sanitize_text_field( $_POST['event_name'] );
	$event_time = sanitize_text_field( $_POST['event_time'] );
	$external_id = sanitize_text_field( $_POST['external_id'] );
	$fbc = empty( $_COOKIE['_fbc'] ) ? '' : sanitize_text_field( $_COOKIE['_fbc'] );
	$click_id = sanitize_text_field( $_POST['click_id'] );
	$event_id = sanitize_text_field( $_POST['event_id'] );
	$ip_addr = fca_pc_get_client_ip();
	$client_user_agent = sanitize_text_field( $_POST['client_user_agent'] );
	$event_source_url = sanitize_text_field( $_POST['event_source_url'] );
	$custom_data = empty( $_POST['custom_data'] ) ? '' : json_decode( stripslashes_deep( sanitize_text_field( $_POST['custom_data'] ) ) );
	
	$options = get_option( 'fca_pc', array() );
	$advanced_matching = empty ( $options['advanced_matching'] ) ? false : true;
		
	$user_data = (object) array(
		'external_id' => $external_id,
		'client_ip_address' => $ip_addr,
		'client_user_agent' => $client_user_agent
	);
	
	if( $fbc ) {
		$user_data->fbc = $fbc;
	} else if ( $click_id ) {
		$fbc_value = 'fb.1.' . ( 1000 * $event_time ) . '.' . $click_id;
		$user_data->fbc = $fbc_value;
		setcookie( '_fbc', $fbc_value, ( $event_time + 90 * DAY_IN_SECONDS ) );
		//NONSTANDARD BUT FOR USE LATER IN THIS CALL IF ADVANCED_MATCHING IS ENABLED
		$_COOKIE['_fbc'] = $fbc_value;
	}
	
	if( $advanced_matching ) {
		$user_data = fca_pc_advanced_matching( true );
	}
			
	$fb_data = array(
		'action_source' => 'website',
		'event_name' => $event_name,
		'event_time'  => $event_time,
		'event_id'  =>  $event_id,
		'event_source_url'  => $event_source_url,
		'user_data' => $user_data,		
	);
		
	if( $custom_data ) {
		$fb_data['custom_data'] = $custom_data;
	}
	
	$body = (object) array(
		'data' => array( $fb_data )
	);
		
	if( $test_code ) {
		$body = (object) array(
			'data' => array( $fb_data ),
			'test_event_code' => $test_code
		);
	}
	
	$request = wp_remote_request( $url, array(
		'headers'   => array( 'Content-Type' => 'application/json' ),
		'body'      => json_encode( $body ),
		'method'    => 'POST',
		'data_format' => 'body'
	));
	
	$response = wp_remote_retrieve_body( $request );
	
}

function fca_pc_tiktok_api_event() {
	
	$nonce = sanitize_text_field( $_POST['nonce'] );
	
	if( wp_verify_nonce( $nonce, 'fca_pc_capi_nonce' ) === false ){
		wp_send_json_error( 'Unauthorized, please log in and try again.' );
	}
	
	$pixels = fca_pc_get_active_pixels();
	forEach( $pixels as $pixel ){
		
		$pixel_id = empty( $pixel['pixel'] ) ? '' : $pixel['pixel'];
		$pixel_type = empty( $pixel['type'] ) ? '' : $pixel['type'];
		$capi_token = empty( $pixel['capi'] ) ? '' : $pixel['capi'];
		$test_code = empty( $pixel['test'] ) ? '' : $pixel['test'];
		
		if( ( ( $pixel_type === 'TikTok' ) && $pixel_id && $capi_token ) ) {
			fca_pc_tiktok_api_call( $pixel_id, $capi_token, $test_code );
		}

	}
	
	wp_send_json_success();

}
add_action( 'wp_ajax_fca_pc_tiktok_api_event', 'fca_pc_tiktok_api_event' );
add_action( 'wp_ajax_nopriv_fca_pc_tiktok_api_event', 'fca_pc_tiktok_api_event' );

function fca_pc_tiktok_api_call( $pixel, $capi_token, $test_code ){

	$url = "https://business-api.tiktok.com/open_api/v1.3/event/track/";
	$event_name = sanitize_text_field( $_POST['event_name'] );
	$event_time = sanitize_text_field( $_POST['event_time'] );
	$event_id = sanitize_text_field( $_POST['event_id'] );
	$ip_addr = fca_pc_get_client_ip();
	$client_user_agent = sanitize_text_field( $_POST['client_user_agent'] );
	$event_source_url = sanitize_text_field( $_POST['event_source_url'] );
	$custom_data = empty( $_POST['custom_data'] ) ? '' : json_decode( stripslashes_deep( sanitize_text_field( $_POST['custom_data'] ) ), true );
	
	$body = [
		'event_source' => 'web',
		'event_source_id' => $pixel,
		'data' => [
			[
				'event' => $event_name,
				'event_time'  => $event_time,
				'event_id'  => $event_id,
				'user' => [
					'ip' => $ip_addr,
					'user_agent' => $client_user_agent
				],
				'properties' => $custom_data,
				'page' => [
					'url' => $event_source_url
				]	
			]	
		]
	];
	
	if( $test_code ) {
		$body['test_event_code'] = $test_code;
	}
	
	$body = json_encode( $body );
	
	$request = wp_remote_request( $url, array(
		'headers'   => array( 
			'Access-Token' => $capi_token,
			'Content-Type' => 'application/json'
		),
		'body'      => $body,
		'method'    => 'POST',
	));
	
	$response = wp_remote_retrieve_body( $request );
	
	if( FCA_PC_DEBUG ) {
		error_log( json_encode( $response ) );
	}
}

function fca_pc_reddit_api_event() {
	
	$nonce = sanitize_text_field( $_POST['nonce'] );
	
	if( wp_verify_nonce( $nonce, 'fca_pc_capi_nonce' ) === false ){
		wp_send_json_error( 'Unauthorized, please log in and try again.' );
	}
	
	$pixels = fca_pc_get_active_pixels();
	forEach( $pixels as $pixel ){
		
		$pixel_id = empty( $pixel['pixel'] ) ? '' : $pixel['pixel'];
		$pixel_type = empty( $pixel['type'] ) ? '' : $pixel['type'];
		$capi_token = empty( $pixel['capi'] ) ? '' : $pixel['capi'];
		$test_code = empty( $pixel['test'] ) ? '' : $pixel['test'];
		
		if( ( ( $pixel_type === 'Reddit' ) && $pixel_id && $capi_token ) ) {
			fca_pc_reddit_api_call( $pixel_id, $capi_token, $test_code );
		}

	}
	
	wp_send_json_success();

}
add_action( 'wp_ajax_fca_pc_reddit_api_event', 'fca_pc_reddit_api_event' );
add_action( 'wp_ajax_nopriv_fca_pc_reddit_api_event', 'fca_pc_reddit_api_event' );

function fca_pc_reddit_api_call( $pixel, $capi_token, $test_code ) {
    $url               = "https://ads-api.reddit.com/api/v3/pixels/$pixel/conversion_events";
    $event_name        = sanitize_text_field( $_POST['event_name'] );
    $event_time        = intval( $_POST['event_time'] );
    $event_id          = sanitize_text_field( $_POST['event_id'] );
    $external_id       = sanitize_text_field( $_POST['external_id'] );
    $ip_addr           = fca_pc_get_client_ip();
    $client_user_agent = sanitize_text_field( $_POST['client_user_agent'] );
    $event_source_url  = sanitize_text_field( $_POST['event_source_url'] );
    $custom_data       = empty( $_POST['custom_data'] ) ? array() : json_decode( stripslashes_deep( sanitize_text_field( $_POST['custom_data'] ) ), true );

    // Standard events pass directly as tracking_type; anything else is Custom
    $standard_events = array( 'PageVisit', 'ViewContent', 'Search', 'AddToCart', 'AddToWishlist', 'Purchase', 'Lead', 'SignUp' );

    if ( in_array( $event_name, $standard_events ) ) {
        $type = array( 'tracking_type' => $event_name );
    } else {
        $type = array(
            'tracking_type'     => 'Custom',
            'custom_event_name' => $event_name,
        );
    }

    // Build metadata, mapping JS-side field names to Reddit's field names
    $metadata = array(
        'conversion_id' => $event_id,
    );
	
    if ( !empty( $custom_data['value'] ) ) {
		$metadata['value'] = floatval( $custom_data['value'] );
	}
    if ( !empty( $custom_data['currency'] ) ) {
		$metadata['currency'] = $custom_data['currency'];
	}
    if ( !empty( $custom_data['itemCount'] ) ) {
		$metadata['item_count'] = intval( $custom_data['itemCount'] );
	}
    if ( !empty( $custom_data['products'] ) ) {
		$metadata['products'] = $custom_data['products'];
	}
	
    $body = array(
        'data' => array(
            'events' => array(
                array(
                    'event_at'      => $event_time,
                    'action_source' => 'WEBSITE',
					'event_source_url' => $event_source_url,
                    'type'          => $type,
                    'metadata'      => $metadata,
                    'user'          => array(
                        'ip_address'  => $ip_addr,
                        'user_agent'  => $client_user_agent
                    ),
                )
            )
        )
    );

    if ( $test_code ) {
        $body['data']['test_id'] = $test_code;
    }

    $request = wp_remote_request( $url, array(
        'headers' => array(
            'Authorization' => 'Bearer ' . $capi_token,
            'Accept'        => 'application/json',
            'Content-Type'  => 'application/json',
        ),
        'body'   => json_encode( $body ),
        'method' => 'POST',
    ));

    $response = wp_remote_retrieve_body( $request );

    if ( FCA_PC_DEBUG ) {
        error_log( json_encode( $response ) );
    }
}

function fca_pc_snapchat_api_event() {
	
	$nonce = sanitize_text_field( $_POST['nonce'] );
	
	if( wp_verify_nonce( $nonce, 'fca_pc_capi_nonce' ) === false ){
		wp_send_json_error( 'Unauthorized, please log in and try again.' );
	}
	
	$pixels = fca_pc_get_active_pixels();
	forEach( $pixels as $pixel ){
		
		$pixel_id = empty( $pixel['pixel'] ) ? '' : $pixel['pixel'];
		$pixel_type = empty( $pixel['type'] ) ? '' : $pixel['type'];
		$capi_token = empty( $pixel['capi'] ) ? '' : $pixel['capi'];
		$test_code = empty( $pixel['test'] ) ? '' : $pixel['test'];
		
		if( ( ( $pixel_type === 'Snapchat' ) && $pixel_id && $capi_token ) ) {
			fca_pc_snapchat_api_call( $pixel_id, $capi_token, $test_code );
		}

	}
	
	wp_send_json_success();

}
add_action( 'wp_ajax_fca_pc_snapchat_api_event', 'fca_pc_snapchat_api_event' );
add_action( 'wp_ajax_nopriv_fca_pc_snapchat_api_event', 'fca_pc_snapchat_api_event' );

function fca_pc_snapchat_api_call( $pixel, $capi_token, $test_code ){

	$url = "https://tr.snapchat.com/v3/$pixel/events?access_token=$capi_token";
	
	if( !empty( $test_code ) ) {
		$url = "https://tr.snapchat.com/v3/$pixel/events/validate?access_token=$capi_token";
	}
	
	$event_name = sanitize_text_field( $_POST['event_name'] );
	$event_time = sanitize_text_field( $_POST['event_time'] );
	$event_id = sanitize_text_field( $_POST['event_id'] );
	$ip_addr = fca_pc_get_client_ip();
	$client_user_agent = sanitize_text_field( $_POST['client_user_agent'] );
	$event_source_url = sanitize_text_field( $_POST['event_source_url'] );
	$custom_data = empty( $_POST['custom_data'] ) ? '' : json_decode( stripslashes_deep( sanitize_text_field( $_POST['custom_data'] ) ), true );
	$snapchat_custom_data = [];
	
	$body = [
		'data' => [
			[
				'event_name' => $event_name,
				'event_time'  => $event_time,
				'event_id'  => $event_id,
				'action_source' => 'WEB',
				'action_source_url' => $event_source_url,
				'user_data' => [
					'client_ip_address' => $ip_addr,
					'client_user_agent' => $client_user_agent
				]
			]	
		]
	];
	
	if( !empty( $custom_data['item_ids'] ) ) {		
		$snapchat_custom_data['content_ids'] = $custom_data['item_ids'];
	}
	
	if( !empty( $custom_data['description'] ) ) {
		$snapchat_custom_data['content_name'] = $custom_data['description'];
	}
	
	if( !empty( $custom_data['price'] ) ) {		
		$snapchat_custom_data['value'] = $custom_data['price'];
	}
	
	if( !empty( $custom_data['currency'] ) ) {	
		$snapchat_custom_data['currency'] = $custom_data['currency'];	
	}
	
	if( !empty( $custom_data['transaction_id'] ) ) {	
		$snapchat_custom_data['order_id'] = $custom_data['transaction_id'];	
	}
	
	if( !empty( $custom_data['number_items'] ) ) {	
		$snapchat_custom_data['num_items'] = intval( $custom_data['number_items'] );	
	}	
	
	if( !empty( $custom_data['content_category'] ) ) {	
		$snapchat_custom_data['content_category'] = $custom_data['content_category'];	
	}
	
	if( !empty( $snapchat_custom_data ) ) {
		$body['data'][0]['custom_data'] = $snapchat_custom_data;
	}
	
	if( !empty( $test_code ) ) {
		$body['data'][0]['test_event_code'] = $test_code;
	}
		
	$body = json_encode( $body );
		
	$request = wp_remote_request( $url, [
		'headers'   => [
			'Content-Type' => 'application/json'
		],
		'body'      => $body,
		'method'    => 'POST',
	]);
	
	$response = wp_remote_retrieve_body( $request );
	
	if( FCA_PC_DEBUG ) {
		error_log( json_encode( $response ) );
	}
}

function fca_pc_pinterest_api_event() {
	
	$nonce = sanitize_text_field( $_POST['nonce'] );
	
	if( wp_verify_nonce( $nonce, 'fca_pc_capi_nonce' ) === false ){
		wp_send_json_error( 'Unauthorized, please log in and try again.' );
	}
	
	$pixels = fca_pc_get_active_pixels();
	forEach( $pixels as $pixel ){
		
		$pixel_id = empty( $pixel['pixel'] ) ? '' : $pixel['pixel'];
		$pixel_type = empty( $pixel['type'] ) ? '' : $pixel['type'];
		$account = empty( $pixel['account'] ) ? '' : $pixel['account'];
		$capi_token = empty( $pixel['capi'] ) ? '' : $pixel['capi'];
		$test_code = empty( $pixel['test'] ) ? '' : $pixel['test'];
		
		if( ( ( $pixel_type === 'Pinterest' ) && $pixel_id && $capi_token ) ) {
			fca_pc_pinterest_api_call( $pixel_id, $capi_token, $account, $test_code );
		}

	}
	
	wp_send_json_success();

}
add_action( 'wp_ajax_fca_pc_pinterest_api_event', 'fca_pc_pinterest_api_event' );
add_action( 'wp_ajax_nopriv_fca_pc_pinterest_api_event', 'fca_pc_pinterest_api_event' );

function fca_pc_pinterest_api_call( $pixel, $capi_token, $account, $test_code ){

	$url = "https://api.pinterest.com/v5/ad_accounts/$account/events";
	if( $test_code ) {
		$url = "https://api.pinterest.com/v5/ad_accounts/$account/events?test=true";
	}
	
	$user = wp_get_current_user();
	$event_name = sanitize_text_field( $_POST['event_name'] );
	$event_time = sanitize_text_field( $_POST['event_time'] );
	$event_id = sanitize_text_field( $_POST['event_id'] );
	$external_id = !empty( $_POST['external_id'] ) ? sanitize_text_field( $_POST['external_id'] ) : false;
	$ip_addr = fca_pc_get_client_ip();
	$client_user_agent = sanitize_text_field( $_POST['client_user_agent'] );
	$event_source_url = sanitize_text_field( $_POST['event_source_url'] );
	$custom_data = empty( $_POST['custom_data'] ) ? '' : json_decode( stripslashes_deep( sanitize_text_field( $_POST['custom_data'] ) ), true );
	$pinterest_custom_data = [];
	
	$event_map = [
		'AddToCart' => 'add_to_cart',
		'Checkout' => 'checkout',
		'Lead' => 'lead',
		'PageVisit' => 'page_visit',
		'Signup' => 'signup',
		'InitiateCheckout' => 'initiate_checkout',	
		'AddPaymentInfo' => 'add_payment_info',	
		'ViewContent' => 'view_content',
	];
	
	$pinterest_event = array_key_exists( $event_name, $event_map ) ? $event_map[$event_name] : 'custom';
	
	$body = [
		'data' => [
			[
				'event_name' => $pinterest_event,
				'action_source' => 'web',
				'event_time'  => (int) $event_time,
				'event_id'  => $event_id,
				'event_source_url' => $event_source_url,
				'user_data' =>	[
					'client_ip_address' => $ip_addr,
					'client_user_agent' => $client_user_agent,
					'external_id' => [ hash( 'sha256', $external_id ) ],
				],
			]
		]
	];
	
	if( !empty( $user->user_email ) ) {
		$body['data'][0]['user_data']['em'] =  [ hash( 'sha256', strtolower( $user->user_email ) ) ];
	}
	
	if( !empty( $custom_data['product_id'] ) ) {		
		$pinterest_custom_data['content_ids'] = array_map( 'strval', $custom_data['product_id'] );
	}
	
	if( !empty( $custom_data['product_name'] ) ) {
		$pinterest_custom_data['content_name'] = $custom_data['product_name'];
	}
	
	if( !empty( $custom_data['value'] ) ) {		
		$pinterest_custom_data['value'] = strval( $custom_data['value'] );
	}
	
	if( !empty( $custom_data['currency'] ) ) {	
		$pinterest_custom_data['currency'] = $custom_data['currency'];	
	}
	
	if( !empty( $custom_data['transaction_id'] ) ) {	
		$pinterest_custom_data['order_id'] = $custom_data['transaction_id'];	
	}
	
	if( !empty( $custom_data['product_quantity'] ) ) {	
		$pinterest_custom_data['num_items'] = intval( $custom_data['product_quantity'] );	
	}
	
	if( !empty( $pinterest_custom_data ) ) {
		$body['data'][0]['custom_data'] = $pinterest_custom_data;
	}
			
	$body = json_encode( $body );
		
	$request = wp_remote_request( $url, array(
		'headers'   => array( 
			'Authorization' => 'Bearer ' . $capi_token,
			'Content-Type' => 'application/json'
		),
		'body'      => $body,
		'method'    => 'POST',
	));
	
	$response = wp_remote_retrieve_body( $request );
	
	if( FCA_PC_DEBUG ) {
		error_log( json_encode( $response ) );
	}
}