import re
from html.parser import HTMLParser

with open("scratch/portfolio_raw.html", "r", encoding="utf-8") as f:
    html = f.read()

# Let's find all tab titles and contents by finding text around e-n-tab-title and e-n-tab-content
tab_titles_raw = re.findall(r'e-n-tab-title-(\d+)[^>]*>(.*?)</div>', html, re.DOTALL)
print("--- Tab Titles Found ---")
for t_num, t_html in tab_titles_raw:
    clean = re.sub(r'<[^>]+>', '', t_html).strip()
    print(f"Tab {t_num}: '{clean}'")

# Let's match each tab title to its inner vimeo iframe IDs
# For each tab content container e-n-tab-content-XXXX, extract all iframe src values
contents = re.findall(r'id="e-n-tab-content-(\d+)"(.*?)<!-- \.elementor-element -->', html, re.DOTALL)

print("\n--- Tab Contents Vimeo Count ---")
for c_num, c_html in contents:
    v_ids = re.findall(r'vimeo\.com/(?:video/)?(\d+)', c_html)
    # filter out non-video numbers
    v_ids = [v for v in v_ids if len(v) >= 8]
    print(f"Content {c_num}: {len(v_ids)} vimeos -> {v_ids[:5]}...")

