import re

with open("scratch/portfolio_raw.html", "r") as f:
    html = f.read()

# Let's search for "Roofing" in the text and print surrounding 300 chars
for match in re.finditer(r'Roofing', html):
    pos = match.start()
    print("--- ROOFING MATCH ---")
    print(html[max(0, pos-200):min(len(html), pos+200)])

