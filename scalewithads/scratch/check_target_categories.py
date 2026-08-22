import json

with open("scratch/exact_category_vimeos.json", "r") as f:
    data = json.load(f)

# Elementor nested tabs on milliondollarmedia.us/portfolio/ are:
# Tab order: All (0), Roofing (1), Supplements (2), Recruitment (3), Events (4), HVAC (5), Solar (6), Agency Owner (7), Chiro (8), Finance (9), MVA (10), SAAS (11), Window & Doors (12), Carpet Cleaning (13), VSL (14)

print("=== RAW EXTRACTED VIMEO IDs FROM LIVE PORTFOLIO PER TAB ===")
for cat, vids in data.items():
    print(f"[{cat}] ({len(vids)} vids): {vids}")
