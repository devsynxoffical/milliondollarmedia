# Google Indexing API log

Rule (owner, 2026-11-19): at most 20 URLs in any rolling 24 hours (every request counts, also rejected ones),
never resend a URL sent in the last 7 days. Read-only URL Inspection and IndexNow are not limited.

| Time (UTC) | URL | Response |
|---|---|---|
| 2026-11-16 | /what-is-a-vsl/ | 200 |
| 2026-11-19 07:31 | /ugc-ads-examples/ | 200 |
| 2026-11-19 07:31 | /what-is-a-vsl/ | 429 (daily quota) |
| 2026-11-19 07:31 | /portfolio/ | 429 (daily quota) |
