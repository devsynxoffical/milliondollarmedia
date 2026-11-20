# SEO change log (before / after record)

Every change has a reason, the affected URL, how it is validated and when it is re-checked.
Baseline data: Google Search Console, pulled 2026-11-19 (data to 2026-11-17). GA4 (G-PTHZQ0EL6Q) not readable yet: the Analytics API is disabled in the Google Cloud project and the service account has no GA4 access.

## Baseline (2026-11-19)

| Period | Clicks | Impressions | CTR | Avg position | Non-brand clicks |
|---|---|---|---|---|---|
| Last 28 days (Oct 21 – Nov 17) | 20 | 362 | 5.5% | 4.3 | 0 |
| Previous 28 days (Sep 23 – Oct 20) | 6 | 357 | 1.7% | 5.5 | 0 |
| Last 3 months (Aug 20 – Nov 17) | 61 | 2,139 | 2.9% | 5.9 | 0 |
| Previous 3 months (May 22 – Aug 19) | 63 | 1,303 | 4.8% | 9.1 | 0 |

Noise in these totals: 924 impressions in the last 3 months came from the unrelated query "technology milliondollarthings.com" (Aug 25-26, Sep 8-10) and 159 from "site:" checks. Without them the last 3 months have about 1,056 impressions, all brand searches.

Indexing (URL Inspection of all 200 sitemap URLs, 2026-11-19):
- Indexed: 9 of 28 pages and posts (home, blogs, book-your-call, our-story, 3 case-study hubs, 2 new Facebook-ads guides); 150 of 172 case-study pages.
- Crawled, not indexed: all 10 service pages, the VSL guide and 7 older blog posts (some since April).
- Discovered or unknown: portfolio, real-estate, 22 case-study pages.

Brand: Google's knowledge panel for "million dollar media" belongs to milliondollarmedia.com (Million Dollar Media LLC, Woodbridge, NJ, promotions / insured contests). milliondollarmedia.us is not in the top 14 results of a US read of that query.

Authority: 38 backlinks from 35 domains, spam score 59, rank 0 (OpenSEO, 2026-11-19).

## Changes

| # | Date | URL | Change | Reason | Validation | Re-check |
|---|---|---|---|---|---|---|
| 1 | 2026-11-19 | / | H1 moved from "WE MAKE CONTENT THAT" to the subline, which now reads "VIDEO ADS. CREATIVE. DIGITAL ADVERTISING. SOCIAL MEDIA."; the old H1 becomes an H2 with identical styling | The only page with organic clicks had an H1 with no description of the business and "video ads" appeared 0 times on the page | Rendered H1 text; before/after hero screenshots; Search Console queries for / that mention video ads | 2026-12-03 |
| 2 | 2026-11-19 | /portfolio/ | Added ~400 words: what the examples are, a list of all 15 industries with real video counts linking to the service pages, 4 FAQs with real prices and turnaround, FAQPage data | 65 real video ads but only 96 words of text; Google has not crawled it; matches "video ads examples" (320/mo, KD 0) and "facebook video ad examples" (390/mo, KD 10) | Rendered word count; URL Inspection moves from "Discovered" to crawled/indexed; impressions for "video ad examples" queries | 2026-12-03 |
| 3 | 2026-11-19 | 10 service pages | Removed the identical "Million Dollar Media" intro block (Elementor aab0427) | Same text on all 10 pages, and its "5,000 B2B brands served" claim contradicts "500+ brands" on /our-story/ | Unique-text share per page (sim.py) before vs after; URL Inspection status after recrawl | 2026-12-03 |
| 4 | 2026-11-19 | /, /portfolio/, posts, 10 service pages | 2-step lead form (industry + budget chips, then contact details). Leads are saved in WP admin > Leads and emailed to vaishali@milliondollarmedia.us; spam guard (honeypot, min fill time, 5/hour/IP); fires GA4 `generate_lead` and Meta `Lead` | The site had no on-page way to become a lead except leaving for the booking page | Test lead 2026-11-19: API 200, saved, email sent. Count of real leads in WP admin; GA4 generate_lead events once GA4 is readable | 2026-12-03 |
| 5 | 2026-11-19 | /ugc-ads-examples/ (new) | New page: 38 real UGC-style client ads with industry filter, hook per video, pattern breakdown, UGC vs polished table, process, lead form, FAQ + FAQPage data; linked from footer and /portfolio/ | People search for "ugc ad examples" and the videos already existed but were not described anywhere | Indexing API accepted 2026-11-19 (IndexNow 200). URL Inspection status; impressions for "ugc" queries | 2026-12-03 |
| 6 | 2026-11-19 | /what-is-a-vsl/ | Added a "Real VSL examples" box with 4 client VSLs; title now "What Is a VSL? Video Sales Letter Guide + Real VSL Examples" | Page is "crawled, not indexed": generic text, no examples; "vsl examples" searches want examples | URL Inspection moves to indexed; impressions for "vsl" queries | 2026-12-03 |
| 7 | 2026-11-19 | 10 service pages | Light theme; industry videos (home-page reel cards) moved right after the hero; removed the "As featured in" / "100X your productivity" block, the newsletter block and the testimonials grid. Roofing: also removed the problems, what-we-make and testimonial sections, and swapped the off-topic agency video for a roofing image | Owner request: dark pages looked bad and repeated the same blocks on every page | Visual check desktop + mobile (no horizontal overflow, 1 H1, 200); URL Inspection and impressions per page | 2026-12-03 |
| 8 | 2026-11-20 | /facebook-ads-for-roofers/, /roofing-video-marketing-services/ | Retargeted from "roofing facebook ads / roofing ads / roofing marketing" to "roofing video ads" and "roofing ad creatives" (title, H1, intro, meta, focus keyword, nav and footer labels) | Keyword plan 20 Nov: roofing leads/ads/marketing belong to roofingsystems.co; two sister sites competing for one keyword split the ranking | Search Console queries for roofing pages; no "roofing leads" overlap with roofingsystems.co | 2026-12-04 |
| 9 | 2026-11-20 | /, /hvac-facebook-ads/, /what-is-a-vsl/, /ugc-ads-examples/, /real-estate/ | Title, H1 / first paragraph and Rank Math focus keyword aligned to the mapped keyword: video marketing agency + video production agency; hvac facebook ads; video sales letter, vsl examples, what is a vsl; ugc ads examples, ugc examples; real estate video marketing | Keyword plan 20 Nov, step 2 (retitle existing pages) | Impressions per mapped keyword in Search Console; Semrush position tracking | 2026-12-04 |
| 10 | 2026-11-20 | /video-ad-agency/ (new), /ecommerce-video-ads/ (new) | Two P1 pages: "video ad agency" (390/mo, KD 12) and "ecommerce video ads" (210/mo, KD 5). Real portfolio videos, published case studies, live pricing with package options, lead form, FAQ + FAQPage data; linked from footer, Portfolio and each other | Keyword plan 20 Nov, step 3 (P1 new pages) | Indexing status (URL Inspection), impressions and position for the target keyword | 2026-12-04 |
| 11 | 2026-11-20 | /, /ecommerce-video-ads/, /roofing-video-marketing-services/, /what-is-a-vsl/, /real-estate-video-marketing/ (was /real-estate/), /roofing-video-ads/ (was /facebook-ads-for-roofers/) | Rule: the primary keyword sits in the title, meta description, H1 and slug. Home H1 now "VIDEO MARKETING AGENCY. VIDEO ADS. CREATIVE."; ecommerce page uses "Ecommerce"; roofing service page primary = roofing video marketing; VSL guide primary = what is a vsl; two slugs changed with 301 redirects (inc/redirects.php) and all internal links updated | Owner rule (20 Nov) | Audit script: 9/9 pages pass title, description, H1, slug; old URLs return 301; sitemaps list the new URLs | 2026-12-04 |

## Immediate validation (2026-11-19, live site)

1. `/`: rendered H1 is now "VIDEO ADS. CREATIVE. DIGITAL ADVERTISING. SOCIAL MEDIA." (was "WE MAKE CONTENT THAT"). Heading sizes measured at 1440 / 1024 / 768 / 390 px match the before state exactly (36/30 px desktop, 27.36/22.8 px tablet and phone). Search impact: re-check 2026-12-03.
2. `/portfolio/`: main-area text 96 → 408 words, one H1, FAQPage data present, all 15 industries listed with live video counts (63 unique videos). Indexing: still "Discovered" on 2026-11-19; re-check 2026-12-03.
3. Service pages, unique-text share before → after: roofing 59→61%, HVAC 58→62%, plumbing 64→64% (block was not on this page), home services 32→34%, MVA 63→66%, real estate 64→67%, solar 51→55%, SaaS 54→58%, agencies 65→69%, coaches 77→74% (block held unique text there). Indexing: all "Crawled - currently not indexed" on 2026-11-19; re-check 2026-12-03.
