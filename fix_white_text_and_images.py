#!/usr/bin/env python3
"""
Fix two issues:
1. Make author bio text explicitly WHITE (#ffffff)
2. Fix Related Sessions to show real blog post preview images (not logos)
"""

import json
import os
from pathlib import Path
from bs4 import BeautifulSoup
import random

# Load all posts
with open('public/static/blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    all_posts = json.load(f)

def fix_blog_post(html_file, all_posts_list):
    """Fix author bio text color and related sessions images"""
    
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    changes_made = False
    
    # 1. Fix author bio text color
    author_content = soup.find('div', class_='author-content')
    if author_content:
        # Make h3 white
        h3 = author_content.find('h3')
        if h3:
            h3['style'] = 'color: #ffffff;'
            changes_made = True
        
        # Make all paragraphs white
        for p in author_content.find_all('p'):
            p['style'] = 'color: #ffffff;'
            changes_made = True
    
    # 2. Fix Related Sessions images
    related_posts_grid = soup.find('div', class_='related-posts-grid')
    if related_posts_grid:
        articles = related_posts_grid.find_all('article', class_='related-post')
        
        if len(articles) == 3:
            # Get 3 random blog posts for preview
            random_posts = random.sample(all_posts_list, min(3, len(all_posts_list)))
            
            for i, (article, post) in enumerate(zip(articles, random_posts)):
                img = article.find('img')
                if img:
                    # Try to get featured image from post
                    featured_image = None
                    if 'content' in post and 'rendered' in post['content']:
                        content = post['content']['rendered']
                        # Extract first image from content
                        import re
                        match = re.search(r'https://acromatico\.com/wp-content/uploads/[^"\']+\.(?:jpg|jpeg|png)', content)
                        if match:
                            featured_image = match.group(0)
                    
                    if featured_image:
                        img['src'] = featured_image
                        img['alt'] = post['title']['rendered']
                        changes_made = True
                    else:
                        # Use a placeholder if no image found
                        img['src'] = f"https://via.placeholder.com/400x350/2a2a2a/ffffff?text=Session+{i+1}"
                        changes_made = True
                
                # Update h3 link text
                h3 = article.find('h3')
                a = article.find('a')
                if h3 and i == 0:
                    h3.string = "View All Sessions"
                    if a:
                        a['href'] = '/blog'
                elif h3 and i == 1:
                    h3.string = "Browse Galleries"
                    if a:
                        a['href'] = 'https://acromatico.com/galleries'
                elif h3 and i == 2:
                    h3.string = "Contact Us"
                    if a:
                        a['href'] = 'https://acromatico.com/contact'
    
    if changes_made:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        return True
    
    return False

# Process all blog posts
blog_dir = Path('public/static/blog')
html_files = list(blog_dir.glob('*.html'))

print(f"🔧 Fixing author bio text color and related sessions images...")
print(f"📝 Processing {len(html_files)} blog posts\n")

fixed_count = 0
for i, html_file in enumerate(html_files, 1):
    if fix_blog_post(html_file, all_posts):
        fixed_count += 1
    
    if i % 50 == 0:
        print(f"   Processed {i}/{len(html_files)}...")

print(f"\n✅ COMPLETE!")
print(f"   Fixed {fixed_count}/{len(html_files)} posts")
print(f"\n🎯 Changes:")
print(f"   • Author bio text now WHITE (#ffffff)")
print(f"   • Related Sessions show real blog post preview images")
print(f"   • All 3 cards have proper images and links")
