import json

with open("scratch/clean_category_videos.json", "r") as f:
    cat_videos = json.load(f)

# Let's generate clean titles and durations for each video ID in each category
videos_ts = []

video_titles = {
    # Roofing
    "1203105527": ("Equinox Roof Conversion 1", "61s"),
    "1203105510": ("Equinox Storm Roofing 2", "57s"),
    "1203105488": ("Equinox Replacement Roof 3", "51s"),
    "1203105494": ("Equinox High-ROAS Roof 4", "36s"),
    "1203105572": ("Equinox Roofing Scale 5", "48s"),
    "1203105532": ("Equinox Roof Ad 6", "51s"),

    # Supplements
    "1203105580": ("Gummies Bio-Nourish Ad 1", "66s"),
    "1203828901": ("DTC Health Gummies Reel 2", "64s"),
    "1203828900": ("DTC Wellness Formulation 3", "87s"),
    "1203828899": ("Nutritional Health Ad 4", "99s"),

    # Recruitment
    "1203105467": ("LinkedIn Executive Talent Acquisition 1", "60s"),
    "1203105458": ("LinkedIn Talent Recruitment Ad 2", "43s"),

    # Events
    "1203105416": ("Commercial Finance & Keynote Event 1", "31s"),
    "1203105447": ("Seven Fathom B2B SaaS Event Reel 2", "55s"),
    "1203105413": ("Seven Fathom Product Walkthrough Event 3", "65s"),
    "1203105414": ("Seven Fathom Feature Breakdown Event 4", "41s"),
    "1203105415": ("Capital Growth Strategy Event 5", "29s"),

    # HVAC
    "1203812276": ("HVAC Climate Control Ad 1", "41s"),
    "1203812274": ("HVAC Seasonal Offer Ad 2", "29s"),
    "1203812272": ("HVAC Comfort Engine 3", "34s"),
    "1203812271": ("HVAC Heat Pump Promo 4", "31s"),
    "1203815881": ("$0 Down Home Heater Special 5", "37s"),

    # Solar
    "1203808485": ("California Solar Clean Energy 1", "30s"),
    "1203808486": ("California Solar Utility Savings 2", "41s"),
    "1203828547": ("Solar California Federal Incentive 3", "24s"),
    "1203828545": ("Solar Power Lock-In 4", "24s"),
    "1203828548": ("Solar Battery Storage Ad 5", "43s"),
    "1203828546": ("Solar Installation Campaign 6", "28s"),

    # Agency Owner
    "1203105308": ("7-Figure Agency Acquisition 1", "35s"),
    "1203105309": ("Agency Scale & CAPI Engine 2", "52s"),
    "1203808613": ("High-Ticket Client Blueprint 3", "53s"),

    # Chiro
    "1203812402": ("Spine & Pain Chiropractic Ad 1", "47s"),
    "1203812401": ("Wellness Chiro Special Offer 2", "52s"),
    "1203812400": ("Chiropractic Spinal Care 3", "45s"),

    # Finance
    "1203818782": ("Commercial Finance Capital 1", "55s"),
    "1203818781": ("Capital Growth Strategy 2", "42s"),
    "1207996165": ("B2B Lending Acquisition 3", "38s"),
    "1207996164": ("Fintech Growth System 4", "41s"),
    "1207996161": ("Corporate Capital Campaign 5", "46s"),
    "1207996163": ("Financial Advisory Engine 6", "49s"),

    # MVA
    "1203816135": ("Personal Injury MVA Law 1", "31s"),
    "1203816133": ("MVA Legal Client Acquisition 2", "32s"),
    "1203816132": ("MVA Auto Accident Law 3", "28s"),
    "1203816131": ("MVA Injury Settlement Ad 4", "35s"),
    "1203816465": ("MVA Legal Retainer Campaign 5", "36s"),
    "1203816469": ("MVA Accident Claim Ad 6", "42s"),
    "1203816506": ("MVA Law Firm Scale 7", "44s"),
    "1219790482": ("Personal Injury MVA Campaign 8", "48s"),
    "1219790483": ("MVA Auto Accident Settlement Ad 9", "52s"),
    "1219790484": ("MVA Legal Client Retainer Engine 10", "41s"),

    # SAAS
    "1203819145": ("Corporate Hiring & SaaS Engine 1", "39s"),
    "1203819144": ("Career Growth SaaS Funnel 2", "37s"),
    "1203819143": ("SaaS Conversion Platform 3", "42s"),
    "1203819315": ("Keynote Event & SaaS Highlights 4", "41s"),
    "1203827387": ("DTC Health SaaS Reel 5", "40s"),
    "1203827386": ("DTC Wellness SaaS 6", "38s"),
    "1203827815": ("SaaS Automation Tool 7", "45s"),
    "1203827814": ("SaaS Growth System 8", "42s"),

    # Window & Doors
    "1203812402_wd": ("Window & Door Installation Ad 1", "47s"),
    "1203812401_wd": ("Window Replacement Promo 2", "52s"),

    # Carpet Cleaning
    "1203818782_cc": ("Deep Carpet Cleaning Promo 1", "55s"),
    "1203818781_cc": ("Carpet Sanitation Offer 2", "42s"),

    # VSL
    "1203105582": ("Longform Client VSL Script 1", "40s"),
    "1203105583": ("Direct-Response VSL Funnel 2", "38s"),
    "1208393043": ("High-Ticket VSL Breakdown 3", "45s"),
    "1208395435": ("Scale With Ads VSL Architecture 4", "49s"),
    "1203105523": ("System VSL Masterclass 5", "51s"),
}

lines = []
lines.append("const portfolioVideos = [")

for cat, vids in cat_videos.items():
    if not vids:
        continue
    lines.append(f"  // {cat}")
    for idx, v_id in enumerate(vids):
        t_info = video_titles.get(v_id, (f"{cat} Creative Ad {idx+1}", "45s"))
        title = t_info[0]
        dur = t_info[1]
        lines.append(f'  {{ id: "{v_id}_{cat.lower().replace(" ", "_")}", title: "{title}", category: "{cat}", vimeoId: "{v_id}", duration: "{dur}" }},')

lines.append("];")

output_code = "\n".join(lines)
print("Generated Code Length:", len(output_code))
with open("scratch/portfolio_videos_code.ts", "w") as f:
    f.write(output_code)

print("Saved code to scratch/portfolio_videos_code.ts")
