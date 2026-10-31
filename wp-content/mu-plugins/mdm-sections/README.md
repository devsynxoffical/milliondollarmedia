# MDM homepage sections

**Easiest:** WordPress admin → Settings → New Homepage. Your header, hero and the next
section stay exactly as they are; pick the section to start replacing from (the video
section is pre-selected), tick "Switch the new sections on", Save.
Nothing in Elementor is changed; untick to go back.

Manual alternative:

Loaded automatically by `wp-content/mu-plugins/mdm-sections.php`. You don't need to activate anything.
In Elementor, add a **Shortcode** widget and paste one of these:

| Shortcode | Replaces / goes where |
|---|---|
| `[mdm_menu]` | Header (Elementor Header template, or top of the page). Hide the old Astra/Elementor header. |
| `[mdm_reels_showcase]` | The old Roofing / Recruitment / HVAC video grid (4 per row) |
| `[mdm_impact_cards]` | The old "Powered by $50M in Ad Spend" section |
| `[mdm_how_it_works]` | The old How it Works (Pick Your Plan / Share Your Vision / Client-Booking Video) |
| `[mdm_numbers]` | New "Real growth. Real brands. Real results." / By the numbers |
| `[mdm_about]` | New dark About block with stats |
| `[mdm_case_studies]` | New case studies: Lead Gen / E-Commerce tabs |
| `[mdm_faq]` | The FAQ section, in chat style |
| `[mdm_footer]` | Footer (Elementor Footer template). Hide the old footer. |

The opening loader (VSLs, Images, GIFs, Videos, UGC, AI Videos, Short Form) shows automatically on the
home page, once per visit.

## Your own videos in the grid

Put the URLs in the same order as the labels, separated by `|`:

```
[mdm_reels_showcase
  labels="Roofing|Recruitment|HVAC|Agency Owners|Events|SAAS|E-Commerce|Coaches"
  videos="https://milliondollarmedia.us/wp-content/uploads/....mp4|https://...mp4|..."]
```

Optional extras: `posters="img1.jpg|img2.jpg|..."` and `links="/roofing/|/recruitment/|..."`.

## Common options

- Every "Book a call" button points to `/book-your-call/`. Change it on any shortcode with `cta_url="/your-page/"`.
- Footer: `accent="#FF5A1F" city/timezone="America/New_York" tz_label="Timezone (EST)"`.
- Menu links: `[mdm_menu links="Home:/|Services:/services/|Case Studies:/#case-studies|FAQ:/#faq"]`.
- Case studies, impact cards and FAQ questions are in `inc/case-studies.php`, `inc/impact.php` and `inc/faq.php`.
