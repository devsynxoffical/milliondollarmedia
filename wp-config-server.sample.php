<?php
/**
 * Copy this file to "wp-config-server.php" ON THE SERVER (Hostinger File Manager),
 * ideally in the folder above public_html, and fill in your real values.
 * Find them in hPanel -> Websites -> Databases -> Management (MySQL Databases).
 * Never commit the real file - it is in .gitignore.
 */

define( 'DB_NAME', 'u000000000_xxxxx' );     // MySQL database name
define( 'DB_USER', 'u000000000_xxxxx' );     // MySQL user
define( 'DB_PASSWORD', 'your-db-password' ); // MySQL password
define( 'DB_HOST', 'localhost' );            // Hostinger is usually "localhost"

// Paste fresh keys from https://api.wordpress.org/secret-key/1.1/salt/ here:
// define( 'AUTH_KEY', '...' ); ... define( 'NONCE_SALT', '...' );
