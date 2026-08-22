import re
import json

with open("scratch/portfolio_raw.html", "r") as f:
    html = f.read()

# Match all tab title buttons: <button ... data-tab-index="1"> ... <span class="e-n-tab-title-text">Roofing</span> ... </button>
tab_buttons = re.findall(r'data-tab-index="(\d+)"[^>]*>.*?<span class="e-n-tab-title-text">\s*(.*?)\s*</span>', html, re.DOTALL)

print("Matched tab buttons:", tab_buttons)

category_videos = {}

# Iterate over each tab index
for t_idx, t_name in tab_buttons:
    # Find the elementor container for this tab index
    # <div class="e-n-tab-content" id="e-n-tab-content-..." data-tab-index="1" ... >
    pos = html.find(f'data-tab-index="{t_idx}"')
    if pos != -1:
        # Find next tab content start or end of string
        next_pos = html.find(f'data-tab-index="{int(t_idx)+1}"', pos)
        if next_pos == -1:
            next_pos = len(html)
        
        snippet = html[pos:next_pos]
        v_ids = re.findall(r'player\.vimeo\.com/video/(\d+)', snippet)
        
        # Deduplicate while preserving order
        unique_vids = []
        for v in v_ids:
            if v not in unique_vids:
                unique_vids.append(v)
                
        category_videos[t_name] = unique_vids
        print(f"Mapped Category '{t_name}' (Tab {t_idx}): {len(unique_vids)} videos -> {unique_vids}")

with open("scratch/elementor_category_videos.json", "w") as f:
    json.dump(category_videos, f, indent=2)

print("\nSaved result to scratch/elementor_category_videos.json")
