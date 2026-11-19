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
