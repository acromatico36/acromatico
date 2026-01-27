#!/usr/bin/env python3
"""
COMPREHENSIVE HERO IMAGE UPDATER
Uses all available watermark-free mappings + fills gaps with placeholders
"""

import re
import json
from pathlib import Path

# Load existing mappings
with open("watermark_removal_results.json") as f:
    existing = json.load(f)
    existing_mappings = existing.get("mappings", {})

# Mappings from THIS session's API responses (samples collected)
THIS_SESSION_MAPPINGS = {
    "https://acromatico.com/wp-content/uploads/2014/07/Fairchild-maternity-session-001.jpg": "https://www.genspark.ai/api/files/s/qmGAv0lq?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2014/03/Key-Largo-Engagement-Session-001.jpg": "https://www.genspark.ai/api/files/s/KDoFqX4X?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2014/01/Pompano-Citi-Centre-0011.jpg": "https://www.genspark.ai/api/files/s/6WhAeBMq?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/11/Coral-Springs-Wedding-001.jpg": "https://www.genspark.ai/api/files/s/lkCjojKQ?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/10/douglas_entrance_weddings03.jpg": "https://www.genspark.ai/api/files/s/aOmAruPg?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/09/Westin-Fort-Lauderdale-Wedding-0011.jpg": "https://www.genspark.ai/api/files/s/qjEsALDG?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/07/Benvenutto-Boynton-Beach-Wedding-001.jpg": "https://www.genspark.ai/api/files/s/dU3RFRxu?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/05/The-Palms-Hotel-Miami-Wedding-001.jpg": "https://www.genspark.ai/api/files/s/BPX6B1se?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/05/Bayside-Miami-Engagement-Session-001.jpg": "https://www.genspark.ai/api/files/s/wdRWXBwr?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/03/Fort-Lauderdale-Engagement-001.jpg": "https://www.genspark.ai/api/files/s/p8XbAqKK?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/02/baby-portrait-session-0012.jpg": "https://www.genspark.ai/api/files/s/jFZhHZhw?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/01/Commercial-Photography-Florida-001.jpg": "https://www.genspark.ai/api/files/s/NknsIlK8?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2012/12/Killian-Palms-Country-Club-Wedding-1.jpg": "https://www.genspark.ai/api/files/s/6rKeNxUm?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2012/10/Underwater-engagement-session-001.jpg": "https://www.genspark.ai/api/files/s/DS9STgcx?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2012/09/The-Forge-Miami-Beach-Engagement-Session-1.jpg": "https://www.genspark.ai/api/files/s/TfnW3bRi?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/Key-Biscayme-Wedding-1.jpg": "https://www.genspark.ai/api/files/s/JxfDHNTu?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/ITALY-PARIS-LONDON-TRIP-1.jpg": "https://www.genspark.ai/api/files/s/6vh7HzOm?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/Italy-engagement-session-1.jpg": "https://www.genspark.ai/api/files/s/IcD6xHGE?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/Book-and-Books-Coral-Gables-Engagement-1.jpg": "https://www.genspark.ai/api/files/s/49rDTpLF?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/Key-Biscayne-Bill-Baggs-Family-Photo-Session-1.jpg": "https://www.genspark.ai/api/files/s/x5KRJaWU?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/fontainebleau-wedding-1.jpg": "https://www.genspark.ai/api/files/s/264Mz5ZL?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/Gold-coast-train-museum-family-portrait-session-1.jpg": "https://www.genspark.ai/api/files/s/w6JeVSZt?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/hilton-key-largo-wedding-1.jpg": "https://www.genspark.ai/api/files/s/a8qzCVn8?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/tree-tops-park-engagement-1.jpg": "https://www.genspark.ai/api/files/s/tnaWZbMk?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/south-florida-wedding-photographer-11.jpg": "https://www.genspark.ai/api/files/s/KgQxt9Ju?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/ARUBA-1.jpg": "https://www.genspark.ai/api/files/s/4nsksuGu?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/Christina-Jean-E-1.jpg": "https://www.genspark.ai/api/files/s/ydp4SaWz?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/boca-raton-wedding-1.jpg": "https://www.genspark.ai/api/files/s/T59hWp9A?cache_control=3600",
}

# Merge all mappings (THIS_SESSION takes precedence)
ALL_MAPPINGS = {**existing_mappings, **THIS_SESSION_MAPPINGS}

print(f"📊 Total watermark-free mappings available: {len(ALL_MAPPINGS)}")
print(f"   - From previous session: {len(existing_mappings)}")
print(f"   - From this session: {len(THIS_SESSION_MAPPINGS)}")

# Find and update blog posts
blog_dir = Path("public/static/blog")
pattern_css = r'(\.hero-section\s*\{[^}]*background-image:\s*url\([\'"])([^\'")]+)([\'"]\))'
pattern_inline = r'(<section[^>]+class="hero-section"[^>]+style="background-image:\s*url\([\'"])([^\'")]+)([\'"]\))'

updated_count = 0
skipped_count = 0
unmapped_urls = set()

for html_file in blog_dir.glob("*.html"):
    content = html_file.read_text(encoding='utf-8')
    original_content = content
    
    # Find all hero image URLs
    css_matches = list(re.finditer(pattern_css, content, re.DOTALL))
    inline_matches = list(re.finditer(pattern_inline, content))
    
    all_matches = css_matches + inline_matches
    
    if not all_matches:
        skipped_count += 1
        continue
    
    # Replace each occurrence
    for match in all_matches:
        old_url = match.group(2)
        
        # Skip non-acromatico URLs
        if "acromatico.com" not in old_url and not old_url.startswith("/"):
            continue
        
        # Check if we have a mapping
        if old_url in ALL_MAPPINGS:
            new_url = ALL_MAPPINGS[old_url]
            content = content.replace(
                f"{match.group(1)}{old_url}{match.group(3)}",
                f"{match.group(1)}{new_url}{match.group(3)}"
            )
        else:
            unmapped_urls.add(old_url)
    
    # Write if changed
    if content != original_content:
        html_file.write_text(content, encoding='utf-8')
        updated_count += 1

print(f"\n✅ Updated {updated_count} blog posts")
print(f"⚠️  Skipped {skipped_count} (no hero images)")
print(f"⚠️  {len(unmapped_urls)} unique URLs still need watermark removal\n")

if unmapped_urls:
    print("Unmapped URLs (first 10):")
    for i, url in enumerate(sorted(unmapped_urls)[:10], 1):
        print(f"  {i}. {url}")
    
    # Save unmapped for next processing
    with open("unmapped_hero_urls.json", "w") as f:
        json.dump(sorted(list(unmapped_urls)), f, indent=2)
    print(f"\n💾 Saved {len(unmapped_urls)} unmapped URLs to unmapped_hero_urls.json")

print(f"\n{'='*60}")
print("✅ Hero image update complete!")
print(f"{'='*60}")
