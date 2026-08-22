import urllib.request
import re
import json

url = "https://milliondollarmedia.us/portfolio/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})

try:
    html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    
    # Find all Vimeo IDs with surrounding 200 chars
    vimeo_blocks = re.findall(r'(\d{8,11})', html)
    
    # Extract all vimeo embeds / URLs / data attributes
    # Looking for vimeo player URLs
    vimeo_urls = re.findall(r'https?://(?:player\.)?vimeo\.com/(?:video/)?(\d+)', html)
    
    print(f"Total unique Vimeo URLs found: {len(set(vimeo_urls))}")
    print("Vimeo IDs list:", list(set(vimeo_urls)))
    
    # Save full HTML for deep parsing
    with open("scratch/portfolio_raw.html", "w") as f:
        f.write(html)
        
    print("Raw HTML saved to scratch/portfolio_raw.html")

except Exception as e:
    print("Error:", e)
