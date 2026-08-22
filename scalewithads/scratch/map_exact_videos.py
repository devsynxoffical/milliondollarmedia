import re
import json

with open("scratch/portfolio_raw.html", "r") as f:
    html = f.read()

categories_list = [
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
    "VSL",
    "Carpet Cleaning",
]

# Find all video cards/containers in HTML
# Looking for elements containing vimeo iframe + category title/tag
# Let's inspect occurrences of Roofing, Supplements, etc. in context of vimeo player IDs

results = []

# Search for all Vimeo player occurrences and extract the nearest category text before or after it
for match in re.finditer(r'player\.vimeo\.com/video/(\d+)', html):
    v_id = match.group(1)
    pos = match.start()
    
    # Get surrounding 1000 characters
    start = max(0, pos - 800)
    end = min(len(html), pos + 800)
    context = html[start:end]
    
    # Check which category keyword is in context
    found_cats = []
    for cat in categories_list:
        if re.search(r'\b' + re.escape(cat) + r'\b', context, re.IGNORECASE):
            found_cats.append(cat)
            
    # Extract any title/heading in context
    titles = re.findall(r'<h[1-6][^>]*>(.*?)</h[1-6]>', context)
    clean_titles = [re.sub(r'<[^>]+>', '', t).strip() for t in titles if t.strip()]
    
    results.append({
        "vimeoId": v_id,
        "categories": found_cats,
        "titles": clean_titles,
    })

print(f"Total video matches: {len(results)}")

# Group by category
cat_to_videos = {}
for r in results:
    for c in r["categories"]:
        if c not in cat_to_videos:
            cat_to_videos[c] = []
        if r["vimeoId"] not in [x["vimeoId"] for x in cat_to_videos[c]]:
            cat_to_videos[c].append(r)

for cat, vids in cat_to_videos.items():
    print(f"\n=================== CATEGORY: {cat} ({len(vids)} videos) ===================")
    for v in vids:
        print(f"  Vimeo ID: {v['vimeoId']} | Titles: {v['titles']}")

with open("scratch/cat_to_videos_exact.json", "w") as f:
    json.dump(cat_to_videos, f, indent=2)

print("\nSaved to scratch/cat_to_videos_exact.json")
