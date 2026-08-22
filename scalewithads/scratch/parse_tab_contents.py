import re
import json

with open("scratch/portfolio_raw.html", "r") as f:
    html = f.read()

# Match tab button IDs and their titles: <button id="e-n-tab-title-12345" ...> ... Roofing ... </button>
button_matches = re.findall(r'<button[^>]*id="(e-n-tab-title-\d+)"[^>]*>.*?<span class="e-n-tab-title-text">\s*(.*?)\s*</span>', html, re.DOTALL)

print(f"Found {len(button_matches)} tab buttons:")
for b_id, b_title in button_matches:
    print(f"  Button ID: {b_id} => '{b_title}'")

category_to_vimeos = {}

for b_id, b_title in button_matches:
    # Content panel ID corresponds to replacing 'title' with 'content'
    c_id = b_id.replace("title", "content")
    
    # Find start of content div <div ... id="e-n-tab-content-12345" ... >
    c_pos = html.find(f'id="{c_id}"')
    if c_pos != -1:
        # Find next e-n-tab-content or end of container
        next_c_pos = html.find('class="e-n-tab-content"', c_pos + 50)
        if next_c_pos == -1:
            next_c_pos = len(html)
            
        block = html[c_pos:next_c_pos]
        v_ids = re.findall(r'player\.vimeo\.com/video/(\d+)', block)
        
        # Deduplicate while preserving order
        unique_vids = []
        for v in v_ids:
            if v not in unique_vids:
                unique_vids.append(v)
                
        category_to_vimeos[b_title] = unique_vids
        print(f"\n=================== CATEGORY: '{b_title}' ({len(unique_vids)} videos) ===================")
        print(unique_vids)

with open("scratch/exact_category_vimeos.json", "w") as f:
    json.dump(category_to_vimeos, f, indent=2)

print("\nSaved exact mapping to scratch/exact_category_vimeos.json")
