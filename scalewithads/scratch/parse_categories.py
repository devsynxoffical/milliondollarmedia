import re
import json

with open("scratch/portfolio_raw.html", "r") as f:
    html = f.read()

# Let's inspect the filter categories and their structure in WordPress / Elementor / JetFilter / Custom portfolio grid
# Find filter button elements
filter_buttons = re.findall(r'<[^>]*class="[^"]*filter[^"]*"[^>]*>(.*?)</[^>]+>', html, re.DOTALL)
print("Filter buttons sample:", filter_buttons[:15])

# Find all items and their class names / data attributes / category classes
# Elementor portfolio items usually have classes like "category-roofing", "elementor-portfolio-item category-roofing", etc.
items = re.findall(r'<article[^>]*class="([^"]*)"[^>]*>.*?</article>', html, re.DOTALL)
if not items:
    items = re.findall(r'<div[^>]*class="([^"]*elementor-portfolio-item[^"]*)"[^>]*>.*?</div>', html, re.DOTALL)

print(f"Found {len(items)} portfolio item containers")

# Let's parse all vimeo player iframe tags and their parent/container classes
embed_blocks = re.findall(r'(<[^>]+class="[^"]*"[^>]*>.*?player\.vimeo\.com/video/(\d+).*?</div>)', html, re.DOTALL)
print(f"Found {len(embed_blocks)} vimeo embed blocks")

# Let's print out exact vimeo IDs with their surrounding 500 characters of html to extract categories & titles
results = []
for m in re.finditer(r'player\.vimeo\.com/video/(\d+)', html):
    vimeo_id = m.group(1)
    start = max(0, m.start() - 400)
    end = min(len(html), m.end() + 400)
    snippet = html[start:end]
    
    # Look for category names in snippet
    categories = re.findall(r'category-([a-zA-Z0-9_-]+)', snippet)
    data_cats = re.findall(r'data-category=[\'"]([^\'"]+)[\'"]', snippet)
    headings = re.findall(r'<h[1-6][^>]*>(.*?)</h[1-6]>', snippet)
    
    results.append({
        "vimeoId": vimeo_id,
        "categories": list(set(categories + data_cats)),
        "headings": headings,
        "snippet": snippet[:150]
    })

with open("scratch/parsed_portfolio.json", "w") as f:
    json.dump(results, f, indent=2)

print(f"Parsed {len(results)} items. Saved to scratch/parsed_portfolio.json")
