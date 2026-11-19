# SEO monitor (every 12 hours)

`monitor.py` pulls Google Search Console data (clicks, impressions, CTR, average position per query and page),
URL Inspection results for the priority pages, and a live health check of every sitemap URL, saves a snapshot
in `snapshots/` and writes `latest-report.md` with the changes since the previous run.

Credentials are never stored here. The script reads the Google service-account key from the
`GOOGLE_SERVICE_ACCOUNT_JSON` environment variable or from `GSA_KEY_FILE` (path to the JSON file).
This folder is blocked from the web by its `.htaccess`.

## Google Indexing API limit

No requests before 2026-11-22; then at most 20 URLs per day and no URL resent within 7 days. Every request is logged in indexing-log.md.
