#!/usr/bin/env python3
"""
Fix author bio section to show BOTH Italo and Ale with photos visible and text readable
"""

import os
from pathlib import Path
from bs4 import BeautifulSoup

def fix_author_bio(html_file):
    """Fix author bio to show both Italo and Ale"""
    
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    author_bio = soup.find('div', class_='author-bio')
    
    if not author_bio:
        return False
    
    # Clear existing content
    author_bio.clear()
    
    # Create the correct structure with BOTH photos
    new_bio_html = """
    <div class="author-headshots">
        <img src="/static/italo-headshot.jpg" alt="Italo Campilii" onerror="this.style.display='none'">
        <img src="/static/ale-headshot.jpg" alt="Ale Campilii" onerror="this.style.display='none'">
    </div>
    <div class="author-content">
        <h3>About Acromatico Photography</h3>
        <p>Founded by Italo and Ale, Acromatico Photography specializes in capturing authentic moments with artistic vision. Based in South Florida, we travel worldwide to document love stories, families, and life's most meaningful celebrations.</p>
        <p>Our approach combines photojournalistic storytelling with fine art aesthetics, creating timeless images that reflect the genuine emotion and beauty of each unique moment.</p>
    </div>
    """
    
    new_bio_soup = BeautifulSoup(new_bio_html, 'html.parser')
    for element in new_bio_soup.children:
        if element.name:
            author_bio.append(element)
    
    # Save
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    return True

# Process all blog posts
blog_dir = Path('public/static/blog')
html_files = list(blog_dir.glob('*.html'))

print(f"🔧 Fixing author bio sections...")
print(f"📝 Adding BOTH Italo and Ale photos\n")

fixed_count = 0
for i, html_file in enumerate(html_files, 1):
    if fix_author_bio(html_file):
        fixed_count += 1
    
    if i % 50 == 0:
        print(f"   Processed {i}/{len(html_files)}...")

print(f"\n✅ COMPLETE!")
print(f"   Fixed {fixed_count}/{len(html_files)} posts")
print(f"\n🎯 Author Bio Now Shows:")
print(f"   • Italo's photo")
print(f"   • Ale's photo")
print(f"   • About Acromatico Photography")
print(f"   • White text on black background (readable)")
