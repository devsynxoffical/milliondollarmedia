# SEO monitor (every 12 hours)

`monitor.py` pulls Google Search Console data (clicks, impressions, CTR, average position per query and page),
URL Inspection results for the priority pages, and a live health check of every sitemap URL, saves a snapshot
in `snapshots/` and writes `latest-report.md` with the changes since the previous run.

Credentials are never stored here. The script reads the Google service-account key from the
`GOOGLE_SERVICE_ACCOUNT_JSON` environment variable or from `GSA_KEY_FILE` (path to the JSON file).
This folder is blocked from the web by its `.htaccess`.

## Google Indexing API: not used (rule from 23 Nov 2026)

The 23 Nov 2026 plan says not to use the Google Indexing API at all. IndexNow (Bing, Yandex) is fine. Indexing requests in Google are made by the owner in URL Inspection.

Old limit, kept for the record:

At most 20 URLs in any rolling 24 hours (rejected requests count too) and no URL resent within 7 days. Every request is logged in indexing-log.md.
