# Google Indexing API log

Rule (owner, 2026-11-19): at most 20 URLs in any rolling 24 hours (every request counts, also rejected ones),
never resend a URL sent in the last 7 days. Read-only URL Inspection and IndexNow are not limited.

| Time (UTC) | URL | Response |
|---|---|---|
| 2026-11-16 | /what-is-a-vsl/ | 200 |
| 2026-11-19 07:31 | /ugc-ads-examples/ | 200 |
| 2026-11-19 07:31 | /what-is-a-vsl/ | 429 (daily quota) |
| 2026-11-19 07:31 | /portfolio/ | 429 (daily quota) |
| 2026-11-19 18:27 | /roofing-video-marketing-services/ | 429 (quota exceeded) |
| 2026-11-19 18:27 | /hvac-video-marketing-services/ | 429 (quota exceeded) |
| 2026-11-19 18:27 | /plumbing-video-production/ | 429 (quota exceeded) |
| 2026-11-19 18:27 | /home-service-business/ | 429 (quota exceeded) |
| 2026-11-19 18:27 | /mva/ | 429 (quota exceeded) |
| 2026-11-19 18:27 | /real-estate/ | 429 (quota exceeded) |
| 2026-11-19 18:27 | /solar/ | 429 (quota exceeded) |
| 2026-11-19 18:27 | /saas/ | 429 (quota exceeded) |
| 2026-11-19 18:27 | /strategic-video-marketing-for-coaches/ | 429 (quota exceeded) |
| 2026-11-19 18:27 | /agency-owners/ | 429 (quota exceeded) |

Note: on a 429 stop the batch at the first rejection; every request counts toward the 20.
| 2026-11-20 06:28 | /video-production-for-marketing-guide/ | 429 |
| 2026-11-20 07:03 | /video-ad-agency/ | 429 |
| 2026-11-20 18:35 | /roofing-video-ads/ | 429 |
| 2026-11-21 06:30 | (none sent) | skipped: every request since 2026-11-19 returned 429; waiting for the Google Cloud quota to be checked |
| 2026-11-21 18:30 | (none sent) | skipped: Indexing API quota still rejecting every request (429) |
| 2026-11-22 06:30 | (none sent) | skipped: Indexing API quota still rejecting every request (429) |
| 2026-11-22 18:30 | (none sent) | skipped: Indexing API quota still rejecting every request (429) |
| 2026-11-23 06:30 | (none sent) | skipped: Indexing API quota still rejecting every request (429) |

**2026-11-23: Google Indexing API no longer used.** The 23 Nov 2026 plan (CLAUDE_CODE_TOP10_milliondollarmedia_us.md) says not to use it. No further requests will be sent; IndexNow is used instead and the owner requests indexing in URL Inspection.
| 2026-11-23 07:45 | IndexNow: 10 URLs (UGC page, HVAC and VSL guides, 2 new guides, home, portfolio, mastermind, video ad agency, ecommerce video ads) | 200 |
| 2026-11-23 09:55 | IndexNow: 5 URLs after the content update (video ad agency, VSL, HVAC, real estate, UGC) | 200 |
| 2026-11-23 18:30 | (none sent) | no pages changed since the 09:55 IndexNow submission |
| 2026-11-24 06:40 | (none sent) | /our-story/ change not deployed yet; no live page changed |
| 2026-11-24 | IndexNow: /our-story/ (new link block) and / (Organization schema description) | 200 |
| 2026-11-24 18:30 | (none sent) | no pages changed this run |
| 2026-11-25 06:30 | (none sent) | no pages changed this run |
| 2026-11-25 | IndexNow (Bing): 3 new pages (commercial video production, video marketing agency, Los Angeles) + /hvac-video-marketing-los-angeles/ (new link) | 200 |
| 2026-11-25 18:30 | (none sent) | no pages changed this run |
| 2026-11-26 06:30 | (none sent) | no pages changed this run |
| 2026-11-26 | IndexNow (Bing): all 208 sitemap URLs after the metadata pass (case titles, H1s, descriptions, 6 new case slugs, hub answer blocks, page and post titles). Google: sitemap_index.xml and case-study-sitemap.xml resubmitted through the Search Console sitemaps API (204) | 200 |
