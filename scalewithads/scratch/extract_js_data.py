import re
import json

with open("scratch/portfolio_raw.html", "r") as f:
    html = f.read()

# Search for JSON data objects in script tags
scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
print(f"Total script tags: {len(scripts)}")

for i, s in enumerate(scripts):
    if "Roofing" in s or "Supplements" in s or "vimeo" in s or "video" in s:
        print(f"--- Script {i} matching keywords (len={len(s)}) ---")
        print(s[:600])
        print("...")

# Search for any occurrences of Roofing, Supplements, Recruitment, HVAC, Solar, Agency Owner, Chiro in HTML
categories = ["Roofing", "Supplements", "Recruitment", "Events", "HVAC", "Solar", "Agency Owner", "Chiro", "Finance", "MVA", "SAAS", "VSL", "Carpet Cleaning", "Window & Doors"]

for cat in categories:
    count = len(re.findall(re.escape(cat), html, re.IGNORECASE))
    print(f"Category '{cat}': found {count} times")

