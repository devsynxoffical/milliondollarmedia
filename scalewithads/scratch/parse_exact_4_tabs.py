import json

with open("scratch/exact_category_vimeos.json", "r") as f:
    data = json.load(f)

target_tabs = ["SAAS", "Window & Doors", "Carpet Cleaning", "VSL"]

for tab in target_tabs:
    vids = data.get(tab, [])
    print(f"=== {tab} (Total {len(vids)} videos on live site) ===")
    print(vids)
