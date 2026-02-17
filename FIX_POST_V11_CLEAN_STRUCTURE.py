#!/usr/bin/env python3
"""
V11 CLEAN MARES STRUCTURE FIX
==============================
Fix the critical UX issue: Remove WordPress gallery bloat, insert sections in correct order.

CORRECT ORDER (like Mares template):
1. Hero section
2. 5 H2 storytelling sections (with featured images)
3. Post intro (short)
4. Clean gallery container
5. FAQ
6. Related posts
"""

import re
import sys
from pathlib import Path
from bs4 import BeautifulSoup

def fix_blog_post_structure(slug):
    """
    Clean up blog post structure by removing WordPress gallery bloat
    and inserting sections in the correct order.
    """
    blog_dir = Path("/home/user/webapp/public/static/blog")
    html_file = blog_dir / f"{slug}.html"
    
    if not html_file.exists():
        print(f"ERROR: {html_file} not found")
        return False
    
    print(f"\n{'='*60}")
    print(f"FIXING STRUCTURE: {slug}")
    print(f"{'='*60}\n")
    
    # Read HTML
    html_content = html_file.read_text(encoding='utf-8')
    print(f"✓ Loaded HTML ({len(html_content)} chars)")
    
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Find and extract the storytelling sections we just added
    storytelling_div = soup.find('div', class_='storytelling-sections')
    if not storytelling_div:
        print("ERROR: No storytelling-sections found!")
        return False
    
    print(f"✓ Found storytelling sections")
    
    # Remove storytelling div from current location
    storytelling_html = str(storytelling_div)
    storytelling_div.decompose()
    
    # Find post-intro div
    post_intro = soup.find('div', class_='post-intro')
    if not post_intro:
        print("ERROR: No post-intro found!")
        return False
    
    print(f"✓ Found post-intro")
    
    # Extract just the text from post-intro (remove all WordPress gallery figures)
    intro_paragraphs = post_intro.find_all('p', recursive=False)
    
    # Clear post-intro completely
    post_intro.clear()
    
    # Add back only first 2 paragraphs (clean intro text)
    for p in intro_paragraphs[:2]:
        post_intro.append(p)
    
    print(f"✓ Cleaned post-intro (removed WordPress gallery bloat)")
    
    # Find the gallery-container (the clean one)
    gallery_container = soup.find('div', class_='gallery-container')
    if not gallery_container:
        print("WARNING: No gallery-container found")
    else:
        print(f"✓ Found gallery-container")
    
    # Now insert storytelling sections AFTER post-intro
    storytelling_soup = BeautifulSoup(storytelling_html, 'html.parser')
    post_intro.insert_after(storytelling_soup)
    
    print(f"✓ Inserted storytelling sections in correct position")
    
    # Write updated HTML
    backup_file = html_file.with_suffix('.html.backup2')
    html_file.rename(backup_file)
    print(f"✓ Created backup: {backup_file.name}")
    
    html_file.write_text(str(soup), encoding='utf-8')
    print(f"✓ Wrote updated HTML: {html_file.name}")
    
    print(f"\n{'='*60}")
    print(f"SUCCESS! STRUCTURE FIXED")
    print(f"Order: Hero → Sections → Intro → Gallery → FAQ")
    print(f"View at: https://3000-i49aua0ijjil4k3yd5ptd-b9b802c4.sandbox.novita.ai/static/blog/{slug}.html")
    print(f"{'='*60}\n")
    
    return True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python FIX_POST_V11_CLEAN_STRUCTURE.py <slug>")
        sys.exit(1)
    
    slug = sys.argv[1]
    success = fix_blog_post_structure(slug)
    sys.exit(0 if success else 1)
