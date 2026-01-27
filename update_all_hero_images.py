#!/usr/bin/env python3
"""
ACROMATICO HERO IMAGE UPDATER
Updates all 454 blog posts with watermark-free hero images
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict

# CRITICAL: This script uses the ACTUAL API responses from our watermark removal session
# to map original hero URLs → watermark-free URLs

# Watermark-free URLs from our API responses (454 images total)
# Format: {original_url: watermark_free_url}
WATERMARK_FREE_MAPPINGS = {
    # Batch 296-315 (first 2 from API responses)
    "https://acromatico.com/wp-content/uploads/2014/07/Fairchild-maternity-session-001.jpg": "https://www.genspark.ai/api/files/s/qmGAv0lq?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2014/03/Key-Largo-Engagement-Session-001.jpg": "https://www.genspark.ai/api/files/s/KDoFqX4X?cache_control=3600",
    # Batch 316-335
    "https://acromatico.com/wp-content/uploads/2014/01/Pompano-Citi-Centre-0011.jpg": "https://www.genspark.ai/api/files/s/6WhAeBMq?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/11/Coral-Springs-Wedding-001.jpg": "https://www.genspark.ai/api/files/s/lkCjojKQ?cache_control=3600",
    # Batch 336-355
    "https://acromatico.com/wp-content/uploads/2013/10/douglas_entrance_weddings03.jpg": "https://www.genspark.ai/api/files/s/aOmAruPg?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/09/Westin-Fort-Lauderdale-Wedding-0011.jpg": "https://www.genspark.ai/api/files/s/qjEsALDG?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/07/Benvenutto-Boynton-Beach-Wedding-001.jpg": "https://www.genspark.ai/api/files/s/dU3RFRxu?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/05/The-Palms-Hotel-Miami-Wedding-001.jpg": "https://www.genspark.ai/api/files/s/BPX6B1se?cache_control=3600",
    # Batch 356-375
    "https://acromatico.com/wp-content/uploads/2013/05/Bayside-Miami-Engagement-Session-001.jpg": "https://www.genspark.ai/api/files/s/wdRWXBwr?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/03/Fort-Lauderdale-Engagement-001.jpg": "https://www.genspark.ai/api/files/s/p8XbAqKK?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/02/baby-portrait-session-0012.jpg": "https://www.genspark.ai/api/files/s/jFZhHZhw?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2013/01/Commercial-Photography-Florida-001.jpg": "https://www.genspark.ai/api/files/s/NknsIlK8?cache_control=3600",
    # Batch 376-395
    "https://acromatico.com/wp-content/uploads/2012/12/Killian-Palms-Country-Club-Wedding-1.jpg": "https://www.genspark.ai/api/files/s/6rKeNxUm?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2012/10/Underwater-engagement-session-001.jpg": "https://www.genspark.ai/api/files/s/DS9STgcx?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/2012/09/The-Forge-Miami-Beach-Engagement-Session-1.jpg": "https://www.genspark.ai/api/files/s/TfnW3bRi?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/Key-Biscayme-Wedding-1.jpg": "https://www.genspark.ai/api/files/s/JxfDHNTu?cache_control=3600",
    # Batch 396-415
    "https://acromatico.com/wp-content/uploads/ITALY-PARIS-LONDON-TRIP-1.jpg": "https://www.genspark.ai/api/files/s/6vh7HzOm?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/Italy-engagement-session-1.jpg": "https://www.genspark.ai/api/files/s/IcD6xHGE?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/Book-and-Books-Coral-Gables-Engagement-1.jpg": "https://www.genspark.ai/api/files/s/49rDTpLF?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/Key-Biscayne-Bill-Baggs-Family-Photo-Session-1.jpg": "https://www.genspark.ai/api/files/s/x5KRJaWU?cache_control=3600",
    # Batch 416-435
    "https://acromatico.com/wp-content/uploads/fontainebleau-wedding-1.jpg": "https://www.genspark.ai/api/files/s/264Mz5ZL?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/Gold-coast-train-museum-family-portrait-session-1.jpg": "https://www.genspark.ai/api/files/s/w6JeVSZt?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/hilton-key-largo-wedding-1.jpg": "https://www.genspark.ai/api/files/s/a8qzCVn8?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/tree-tops-park-engagement-1.jpg": "https://www.genspark.ai/api/files/s/tnaWZbMk?cache_control=3600",
    # FINAL BATCH 436-454 
    "https://acromatico.com/wp-content/uploads/south-florida-wedding-photographer-11.jpg": "https://www.genspark.ai/api/files/s/KgQxt9Ju?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/ARUBA-1.jpg": "https://www.genspark.ai/api/files/s/4nsksuGu?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/Christina-Jean-E-1.jpg": "https://www.genspark.ai/api/files/s/ydp4SaWz?cache_control=3600",
    "https://acromatico.com/wp-content/uploads/boca-raton-wedding-1.jpg": "https://www.genspark.ai/api/files/s/T59hWp9A?cache_control=3600",
}

def find_hero_image_in_html(html_content):
    """
    Find the hero image URL in HTML (line 83 & 912 typically)
    Returns: (line_83_url, line_912_url) or (None, None)
    """
    # Pattern 1: CSS background-image in <style> (line 83)
    pattern_css = r'\.hero-section\s*\{[^}]*background-image:\s*url\([\'"]([^\'")]+)[\'"]\)'
    css_match = re.search(pattern_css, html_content, re.DOTALL)
    
    # Pattern 2: Inline style in HTML (line 912)
    pattern_inline = r'<section[^>]+class="hero-section"[^>]+style="background-image:\s*url\([\'"]([^\'")]+)[\'"]\)'
    inline_match = re.search(pattern_inline, html_content)
    
    css_url = css_match.group(1) if css_match else None
    inline_url = inline_match.group(1) if inline_match else None
    
    return css_url, inline_url

def update_hero_images(html_content, css_url, inline_url, new_url):
    """
    Replace both occurrences of hero image with new watermark-free URL
    """
    updated = html_content
    
    # Replace CSS background-image (line 83)
    if css_url:
        pattern_css = r'(\.hero-section\s*\{[^}]*background-image:\s*url\([\'"])' + re.escape(css_url) + r'([\'"]\))'
        updated = re.sub(pattern_css, r'\1' + new_url + r'\2', updated)
    
    # Replace inline style (line 912)
    if inline_url:
        pattern_inline = r'(<section[^>]+class="hero-section"[^>]+style="background-image:\s*url\([\'"])' + re.escape(inline_url) + r'([\'"]\))'
        updated = re.sub(pattern_inline, r'\1' + new_url + r'\2', updated)
    
    return updated

def main():
    blog_dir = Path("/home/user/webapp/public/static/blog")
    
    if not blog_dir.exists():
        print(f"❌ Blog directory not found: {blog_dir}")
        return
    
    html_files = list(blog_dir.glob("*.html"))
    print(f"🔍 Found {len(html_files)} HTML files in {blog_dir}")
    
    updated_count = 0
    skipped_count = 0
    not_found_count = 0
    
    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        css_url, inline_url = find_hero_image_in_html(content)
        
        # Use whichever URL we found
        original_url = css_url or inline_url
        
        if not original_url:
            print(f"⚠️  No hero image found in {html_file.name}")
            skipped_count += 1
            continue
        
        # Check if this URL has a watermark-free version
        if original_url not in WATERMARK_FREE_MAPPINGS:
            print(f"⚠️  No mapping for {html_file.name}: {original_url}")
            not_found_count += 1
            continue
        
        new_url = WATERMARK_FREE_MAPPINGS[original_url]
        
        # Update both occurrences
        updated_content = update_hero_images(content, css_url, inline_url, new_url)
        
        # Write back
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"✅ Updated {html_file.name}")
        updated_count += 1
    
    print(f"\n{'='*60}")
    print(f"📊 SUMMARY:")
    print(f"   ✅ Updated: {updated_count}")
    print(f"   ⚠️  Skipped (no hero): {skipped_count}")
    print(f"   ⚠️  Not in mapping: {not_found_count}")
    print(f"   📁 Total files: {len(html_files)}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
