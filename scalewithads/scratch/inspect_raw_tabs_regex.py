import re

with open("scratch/portfolio_raw.html", "r", encoding="utf-8") as f:
    html = f.read()

# Find all e-n-tab-title containers
pattern = r'id="(e-n-tab-title-\d+)".*?>(.*?)<'
titles = re.findall(pattern, html, re.DOTALL)

# Alternative regex for tab titles
tab_blocks = re.findall(r'<div[^>]*id="(e-n-tab-title-\d+)"[^>]*>(.*?)</div>', html, re.DOTALL)

print(f"Found {len(tab_blocks)} tab blocks")
for t_id, t_content in tab_blocks:
    # clean text
    clean_title = re.sub(r'<[^>]+>', '', t_content).strip()
    print(f"Tab ID: {t_id} -> Title: '{clean_title}'")

# Search for Vimeo URLs in each tab content section
content_blocks = re.findall(r'<div[^>]*id="(e-n-tab-content-\d+)"[^>]*>(.*?)</div>\s*</div>', html, re.DOTALL)
print(f"\nFound {len(content_blocks)} content blocks")

# Search specifically for SAAS, Window & Doors, Carpet Cleaning, VSL
vimeo_pattern = r'vimeo\.com/video/(\d+)|player\.vimeo\.com/video/(\d+)|vimeo\.com/(\d+)'

# Let's search all iframe src attributes in portfolio_raw.html
iframes = re.findall(r'<iframe[^>]+src=["\']([^"\']+)["\']', html)
print(f"\nTotal iframes in document: {len(iframes)}")

vimeos = []
for src in iframes:
    m = re.search(r'(\d{8,11})', src)
    if m:
        vimeos.append(m.group(1))

print(f"Total extracted Vimeo IDs from iframes: {len(vimeos)}")
print("Unique Vimeo IDs count:", len(set(vimeos)))
