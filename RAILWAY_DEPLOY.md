# WordPress -> Railway Deployment Checklist

## 1) Create Railway services
- Create a new Railway project.
- Add a MySQL service.
- Add a service from this repository/folder (Dockerfile-based deploy).

## 2) Set environment variables on the WordPress service
- `MYSQLHOST` (from Railway MySQL)
- `MYSQLPORT` (from Railway MySQL)
- `MYSQLDATABASE` (from Railway MySQL)
- `MYSQLUSER` (from Railway MySQL)
- `MYSQLPASSWORD` (from Railway MySQL)

Optional:
- `WP_HOME` (temporary Railway URL first, then custom domain)
- `WP_SITEURL` (same as `WP_HOME`)
- `WP_DEBUG=0`
- `WP_DEBUG_LOG=0`
- `WP_DEBUG_DISPLAY=0`

## 3) Import existing database
- Export your SiteGround database as `.sql` (if not already exported).
- Connect to Railway MySQL using a DB client (TablePlus, DBeaver, MySQL Workbench).
- Import the `.sql` file.

## 4) Update URLs in database (if needed)
Run SQL after import:

```sql
UPDATE wp_options SET option_value = 'https://YOUR-RAILWAY-URL' WHERE option_name IN ('siteurl', 'home');
```

If your table prefix is different, replace `wp_options` accordingly.

## 5) Verify WordPress
- Open Railway URL.
- Test admin login (`/wp-admin`), pages, images, forms, and permalinks.
- In WordPress dashboard, go to Settings -> Permalinks and click Save once.

## 6) Connect custom domain
- Add your domain in Railway service settings.
- Update DNS records at your DNS provider as Railway instructs.
- Update `WP_HOME` and `WP_SITEURL` (or DB `siteurl/home`) to your real domain.

## 7) Production notes
- Railway containers are ephemeral; media writes can be lost on redeploy/restart unless persistence is configured.
- Recommended: mount a persistent volume for `wp-content/uploads` or use object storage + WordPress media offload plugin.
