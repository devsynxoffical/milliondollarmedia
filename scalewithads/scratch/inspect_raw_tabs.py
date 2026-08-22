from bs4 import BeautifulSoup
import re

with open("scratch/portfolio_raw.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

tabs = soup.find_all(class_=re.compile(r"e-n-tab-title"))
print(f"Found {len(tabs)} tab titles:")
for t in tabs:
    t_id = t.get("id", "")
    t_text = t.get_text(strip=True)
    # Find matching content div
    content_id = t_id.replace("e-n-tab-title-", "e-n-tab-content-")
    c_div = soup.find(id=content_id)
    vimeos = []
    if c_div:
        iframes = c_div.find_all("iframe")
        for ifr in iframes:
            src = ifr.get("src", "") or ifr.get("data-src", "")
            m = re.search(r"vimeo\.com/video/(\d+)", src)
            if m:
                vimeos.append(m.group(1))
            else:
                m2 = re.search(r"player\.vimeo\.com/video/(\d+)", src)
                if m2:
                    vimeos.append(m2.group(1))
    
    print(f"Tab '{t_text}' ({t_id}) -> Content ({content_id}): {len(vimeos)} vimeos")
    if vimeos:
        print(f"   Vimeos: {vimeos}")
