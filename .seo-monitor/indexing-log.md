# Google Indexing API log

Rule (owner, 2026-11-19): no requests before 2026-11-22; from then on at most 20 URLs per day in total,
never resend a URL sent in the last 7 days. Read-only URL Inspection and IndexNow are not limited.

| Date (UTC) | URL | Response |
|---|---|---|
| 2026-11-16 | /what-is-a-vsl/ | 200 |
| 2026-11-19 | /ugc-ads-examples/ | 200 |
| 2026-11-19 | /what-is-a-vsl/ | 429 (daily quota) |
| 2026-11-19 | /portfolio/ | 429 (daily quota) |
