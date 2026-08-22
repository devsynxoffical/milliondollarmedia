import re

with open("scratch/portfolio_raw.html", "r", encoding="utf-8") as f:
    html = f.read()

categories_map = {
    "2083056101": "All",
    "2083056102": "Roofing",
    "2083056103": "Supplements",
    "2083056104": "Recruitment",
    "2083056105": "Events",
    "2083056106": "HVAC",
    "2083056107": "Solar",
    "2083056108": "Agency Owner",
    "2083056109": "Chiro",
    "20830561010": "Finance",
    "20830561011": "MVA",
    "20830561012": "SAAS",
    "20830561013": "Window & Doors",
    "20830561014": "Carpet Cleaning",
    "20830561015": "VSL",
}

results = {}

for tab_id, cat_name in categories_map.items():
    # Find the content div for this tab ID
    # Search for id="e-n-tab-content-XXXX" ... until the end of that tab content block
    pattern = r'id="e-n-tab-content-' + tab_id + r'"(.*)'
    m = re.search(pattern, html, re.DOTALL)
    if m:
        content_snippet = m.group(1)
        # Find next e-n-tab-content div to limit the search scope
        next_tab = re.search(r'id="e-n-tab-content-\d+"', content_snippet)
        if next_tab:
            content_snippet = content_snippet[:next_tab.start()]
        
        # Extract Vimeo IDs
        vids = re.findall(r'vimeo\.com/(?:video/)?(\d+)', content_snippet)
        # deduplicate while keeping order
        seen = set()
        clean_vids = [v for v in vids if len(v) >= 8 and not (v in seen or seen.add(v))]
        results[cat_name] = clean_vids

print("=== EXACT VIMEO IDs PER TAB FROM DOM ===")
for cat, vids in results.items():
    print(f"'{cat}': {len(vids)} videos -> {vids}")

with open("scratch/exact_dom_vimeos.json", "w") as f:
    json.dump(results, f, indent=2)
