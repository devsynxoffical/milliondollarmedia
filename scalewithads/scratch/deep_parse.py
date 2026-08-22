import re
import json

with open("scratch/portfolio_raw.html", "r") as f:
    html = f.read()

# Let's find all filter buttons/tabs on milliondollarmedia.us/portfolio/
# Looking for button text, tab text, data-filter or category filters
filters = re.findall(r'<li[^>]*data-filter=[\'"]([^\'"]+)[\'"][^>]*>(.*?)</li>', html, re.DOTALL)
if not filters:
    filters = re.findall(r'<button[^>]*data-filter=[\'"]([^\'"]+)[\'"][^>]*>(.*?)</button>', html, re.DOTALL)
if not filters:
    filters = re.findall(r'class=[\'"][^\'"]*filter[^\'"]*[\'"][^>]*>(.*?)<', html)

print("Found filters:", filters)

# Let's find all section/grid blocks or elementor containers containing videos and titles
# Search for category headings or section headings
sections = re.split(r'<h[1-3][^>]*>', html)
print(f"Total sections split: {len(sections)}")

cat_videos = {}
current_cat = "All"

for sec in sections:
    # Get heading title
    h_match = re.match(r'^(.*?)</h[1-3]>', sec, re.DOTALL)
    if h_match:
        title_text = re.sub(r'<[^>]+>', '', h_match.group(1)).strip()
        if title_text:
            current_cat = title_text
            
    vimeos = re.findall(r'player\.vimeo\.com/video/(\d+)', sec)
    if vimeos:
        if current_cat not in cat_videos:
            cat_videos[current_cat] = []
        cat_videos[current_cat].extend(vimeos)

print(f"Categories found with videos:")
for cat, v_list in cat_videos.items():
    print(f"Category '{cat}': {len(v_list)} videos -> {v_list[:5]}")

with open("scratch/cat_videos.json", "w") as f:
    json.dump(cat_videos, f, indent=2)
