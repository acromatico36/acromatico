#!/usr/bin/env python3
"""
Remove duplicate CTA and "More Wedding Photography" sections from middle of blog posts.
Keep only the ones at the END of each post.
"""

import os
from bs4 import BeautifulSoup
from pathlib import Path

def remove_duplicate_sections(html_file):
    """Remove duplicate sections from middle of blog post"""
    
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    changes_made = False
    content_container = soup.find('div', class_='content-container')
    
    if not content_container:
        return False
    
    # Find all CTA sections
    cta_sections = content_container.find_all('div', class_='cta-section')
    
    # If there are multiple CTAs, remove all except the LAST one
    if len(cta_sections) > 1:
        for cta in cta_sections[:-1]:  # Remove all except last
            cta.decompose()
            changes_made = True
    
    # Find all "More Wedding Photography" / "Related Posts" sections
    related_sections = content_container.find_all('div', class_='related-posts')
    
    # If there are multiple, remove all except the LAST one
    if len(related_sections) > 1:
        for related in related_sections[:-1]:  # Remove all except last
            related.decompose()
            changes_made = True
    
    # Also check for any "Ready to Book" sections that might be duplicated
    ready_to_book_sections = content_container.find_all('h2', string=lambda text: text and 'Ready to Book' in text)
    
    if len(ready_to_book_sections) > 1:
        # Remove all except the last one (and its parent section)
        for i in range(len(ready_to_book_sections) - 1):
            parent = ready_to_book_sections[i].parent
            if parent:
                parent.decompose()
                changes_made = True
    
    if changes_made:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        return True
    
    return False

def main():
    blog_dir = Path('public/static/blog')
    
    if not blog_dir.exists():
        print(f"❌ Blog directory not found: {blog_dir}")
        return
    
    html_files = list(blog_dir.glob('*.html'))
    
    print(f"🧹 Removing duplicate CTA and Related Posts sections...")
    print(f"📝 Processing {len(html_files)} blog posts\n")
    
    fixed_count = 0
    for i, html_file in enumerate(html_files, 1):
        if remove_duplicate_sections(html_file):
            fixed_count += 1
        
        if i % 50 == 0:
            print(f"   Processed {i}/{len(html_files)} posts...")
    
    print(f"\n✅ COMPLETE!")
    print(f"   Fixed {fixed_count}/{len(html_files)} posts")
    print(f"\n🎯 Removed:")
    print(f"   • Duplicate 'Ready to Book' CTA sections")
    print(f"   • Duplicate 'More Wedding Photography' sections")
    print(f"   • Kept only the FINAL instances at end of each post")

if __name__ == '__main__':
    main()
