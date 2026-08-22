import json

with open("scratch/exact_category_vimeos.json", "r") as f:
    data = json.load(f)

# The tabs in Elementor are nested cumulatively in DOM order:
# Roofing has 61 videos, Supplements has 55 (6 videos specific to Roofing), Recruitment has 51 (4 specific to Supplements), etc.

categories = [
    "Roofing",
    "Supplements",
    "Recruitment",
    "Events",
    "HVAC",
    "Solar",
    "Agency Owner",
    "Chiro",
    "Finance",
    "MVA",
    "SAAS",
    "Window & Doors",
    "Carpet Cleaning",
    "VSL",
]

result = {}

for i in range(len(categories)):
    curr_cat = categories[i]
    curr_vids = data.get(curr_cat, [])
    
    if i + 1 < len(categories):
        next_cat = categories[i+1]
        next_vids = data.get(next_cat, [])
        # Specific videos for curr_cat are those in curr_vids not in next_vids
        cat_specific = [v for v in curr_vids if v not in next_vids]
    else:
        cat_specific = curr_vids
        
    result[curr_cat] = cat_specific

print("=== EXACT DISJOINT CATEGORY VIDEO MAPPING FROM LIVE SITE ===")
for cat, vids in result.items():
    print(f"'{cat}' ({len(vids)} videos): {vids}")

with open("scratch/clean_category_videos.json", "w") as f:
    json.dump(result, f, indent=2)
