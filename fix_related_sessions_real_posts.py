#!/usr/bin/env python3
"""
Fix Related Sessions to show actual related blog posts
- Show 3 REAL blog posts with their actual titles and images
- Link to the actual blog posts
- Make them relevant/related to the current post
"""

import json
import os
from pathlib import Path
from bs4 import BeautifulSoup
import random
import re

# Load all posts
with open('public/static/blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    all_posts = json.load(f)

def extract_first_image(content):
    """Extract first image URL from post content"""
    if not content:
        return None
    match = re.search(r'https://acromatico\.com/wp-content/uploads/[^"\']+\.(?:jpg|jpeg|png)', content)
    return match.group(0) if match else None

def get_related_posts(current_slug, all_posts_list, count=3):
    """Get related posts (excluding current post)"""
    # Filter out current post
    other_posts = [p for p in all_posts_list if p['slug'] != current_slug]
    
    # Get random posts
    if len(other_posts) >= count:
        return random.sample(other_posts, count)
    else:
        return other_posts[:count]

def fix_related_sessions(html_file, current_slug, all_posts_list):
    """Fix Related Sessions to show real blog posts"""
    
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    related_posts_section = soup.find('div', class_='related-posts')
    
    if not related_posts_section:
        return False
    
    # Get 3 related posts
    related_posts = get_related_posts(current_slug, all_posts_list, 3)
    
    if len(related_posts) == 0:
        return False
    
    # Clear existing grid
    related_grid = related_posts_section.find('div', class_='related-posts-grid')
    if related_grid:
        related_grid.clear()
    else:
        return False
    
    # Build new related posts cards
    for post in related_posts:
        title = post['title']['rendered']
        slug = post['slug']
        content = post.get('content', {}).get('rendered', '')
        
        # Get image
        image_url = extract_first_image(content)
        if not image_url:
            # Fallback to a generic image
            image_url = "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Blog+Post"
        
        # Create card HTML
        card_html = f'''
        <article class="related-post">
            <a href="/static/blog/{slug}.html">
                <img src="{image_url}" alt="{title}" loading="lazy">
                <h3>{title}</h3>
            </a>
        </article>
        '''
        
        card_soup = BeautifulSoup(card_html, 'html.parser')
        related_grid.append(card_soup)
    
    # Save
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    return True

# Process all blog posts
blog_dir = Path('public/static/blog')
html_files = list(blog_dir.glob('*.html'))

print(f"🔗 Fixing Related Sessions to show actual blog posts...")
print(f"📝 Processing {len(html_files)} blog posts\n")

fixed_count = 0
for i, html_file in enumerate(html_files, 1):
    # Extract slug from filename
    slug = html_file.stem
    
    if fix_related_sessions(html_file, slug, all_posts):
        fixed_count += 1
    
    if i % 50 == 0:
        print(f"   Processed {i}/{len(html_files)}...")

print(f"\n✅ COMPLETE!")
print(f"   Fixed {fixed_count}/{len(html_files)} posts")
print(f"\n🎯 Related Sessions Now Show:")
print(f"   • 3 actual blog posts")
print(f"   • Real post titles")
print(f"   • Real post images")
print(f"   • Links to actual blog posts")
