<?php

/*!
 * Molongui Order Bump for WooCommerce
 *
 * @package              Molongui Order Bump for WooCommerce
 * @author               Molongui
 * @copyright            2015 Molongui
 * @license              GPL-3.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:          Order Bump for WooCommerce
 * Plugin URI:           https://www.molongui.com/order-bump-for-woocommerce/
 * Description:          Boost your sales showing exclusive one-time offers on the Checkout page. With just one click the offer gets added to customer's Order.
 * Version:              2.6.4
 * Requires at least:    5.2.0
 * Tested up to:         6.8
 * WC requires at least: 2.5.0
 * WC tested up to:      10.3
 * Requires PHP:         5.5.0
 * Author:               Molongui
 * Author URI:           https://www.molongui.com
 * Text Domain:          molongui-bump-offer
 * Domain Path:          /i18n
 * License:              GPL v3 or later
 * License URI:          http://www.gnu.org/licenses/gpl-3.0.txt
 *
 * This plugin is free software: you can redistribute it and/or modify it under the terms of the GNU General Public
 * License as published by the Free Software Foundation, either version 3 of the License, or any later version.
 *
 * This plugin is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this plugin. If not, see
 * http://www.gnu.org/licenses.
 */

defined( 'ABSPATH' ) or exit; // Exit if accessed directly
add_action( 'plugins_loaded', 'molongui_bump_offer_load_plugin_textdomain' );
if ( version_compare( PHP_VERSION, '5.5', '<' ) )
{
    add_action( 'admin_notices', 'molongui_bump_offer_fail_php_version' );
}
elseif ( version_compare( get_bloginfo( 'version' ), '5.2', '<' ) )
{
    add_action( 'admin_notices', 'molongui_bump_offer_fail_wp_version' );
}
else
{
    define( 'MOLONGUI_BUMP_OFFER_VERSION', '2.6.4' );
    define( 'MOLONGUI_BUMP_OFFER_FILE', __FILE__ );
    define( 'MOLONGUI_BUMP_OFFER_DIR', plugin_dir_path( MOLONGUI_BUMP_OFFER_FILE ) );
    add_action( 'before_woocommerce_init', function()
    {
        if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) )
        {
            \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
        }
    });
    require MOLONGUI_BUMP_OFFER_DIR . 'includes/plugin.php';
}
function molongui_bump_offer_load_plugin_textdomain()
{
    load_plugin_textdomain( 'molongui-bump-offer', false, plugin_dir_path( __FILE__ ) . 'i18n/' );
}
function molongui_bump_offer_fail_php_version()
{
    if ( isset( $_GET['activate'] ) ) unset( $_GET['activate'] );

    /*! translators: 1: <strong> 2: </strong> 3: PHP version 4: <strong> 5: </strong> */
    $message  = sprintf( esc_html__( '%1$sMolongui Deals, Sales Promotions and Upsells for WooCommerce%2$s requires PHP version %3$s or greater. Because you are using an earlier version, the plugin is currently %4$sNOT RUNNING%5$s.', 'molongui-bump-offer' ), '<strong>', '</strong>', '5.4', '<strong>', '</strong>' );
    $message .= sprintf( '<p><a href="%s" class="button-primary" target="_blank">%s</a></p>', 'https://www.molongui.com/docs/troubleshooting/how-to-update-my-php-version/', __( "How to update PHP?", 'molongui-bump-offer' ) );
    $html_message = sprintf( '<div class="error">%s</div>', wpautop( $message ) );
    echo wp_kses_post( $html_message );
}
function molongui_bump_offer_fail_wp_version()
{
    if ( isset( $_GET['activate'] ) ) unset( $_GET['activate'] );

    /*! translators: 1: <strong> 2: </strong> 3: WordPress version 4: <strong> 5: </strong> */
    $message = sprintf( esc_html__( '%1$sMolongui Deals, Sales Promotions and Upsells for WooCommerce%2$s requires WordPress version %3$s+. Because you are using an earlier version, the plugin is currently %4$sNOT RUNNING%5$s.', 'molongui-bump-offer' ), '4.7' );
    $html_message = sprintf( '<div class="error">%s</div>', wpautop( $message ) );
    echo wp_kses_post( $html_message );
}
