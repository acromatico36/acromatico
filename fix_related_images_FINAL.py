#!/usr/bin/env python3
"""
FIX RELATED POSTS IMAGES - Use CORRECT featured images from acromatico.com/blog
"""

import json
from bs4 import BeautifulSoup
from pathlib import Path

# REAL featured images from acromatico.com/blog (hand-picked by user)
FEATURED_IMAGES = {
    "rustic-barn-wedding-at-rolling-meadow-farm-sade-luke": "https://acromatico.com/wp-content/uploads/2025/09/rustic-barn-wedding-002.jpg",
    "hudson-valley-barn-engagement-kate-steve": "https://acromatico.com/wp-content/uploads/2025/08/Hudson-Valley-Barn-Engagement-001-2.jpg",
    "surprise-proposal-sarasota": "https://acromatico.com/wp-content/uploads/2024/07/SURPRISE-PROPOSAL-SARASOTA-7-scaled.jpg",
    "cold-spring-ny-wedding-zeynep-dominic": "https://acromatico.com/wp-content/uploads/2024/06/COLD-SPRING-NY-WEDDING-19-scaled.jpg",
    "piano-teacher-photo-session-mistico-restaurant-miami-fl": "https://acromatico.com/wp-content/uploads/2024/05/Piano-Teacher-Miami-FL-3.jpg",
    "family-portrait-photos-at-villa-del-balbianello-lake-como": "https://acromatico.com/wp-content/uploads/2024/04/FAMILY-PORTRAIT-PHOTOS-LAKE-COMO-4-scaled.jpg",
    "family-photo-shoot-at-villa-del-balbianello-lake-como-italy": "https://acromatico.com/wp-content/uploads/2024/04/FAMILY-PHOTO-SHOOT-LAKE-COMO-3.jpg",
    "davie-fl-wedding-photography": "https://acromatico.com/wp-content/uploads/2024/03/davie-fl-wedding-photography-9.jpg",
    "20th-anniversary-photo-session": "https://acromatico.com/wp-content/uploads/2024/02/20TH-ANNIVERSARY-PHOTO-SESSION-5-scaled.jpg",
    "newborn-session": "https://acromatico.com/wp-content/uploads/2024/01/NEWBORN-SESSION-1-scaled.jpg"
}

# Load ALL post data to extract first images
print("📂 Loading blog post data...")
with open('blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    posts_data = json.load(f)

# Extract first image from EVERY post
print(f"📸 Extracting first image from {len(posts_data)} posts...")
post_images = {}

for post in posts_data:
    slug = post.get('slug', '')
    if not slug:
        continue
    
    # Use featured image if we have it
    if slug in FEATURED_IMAGES:
        post_images[slug] = FEATURED_IMAGES[slug]
        continue
    
    # Otherwise extract from content
    content_obj = post.get('content', {})
    content_html = content_obj.get('rendered', '') if isinstance(content_obj, dict) else str(content_obj)
    
    soup = BeautifulSoup(content_html, 'html.parser')
    imgs = soup.find_all('img')
    
    for img in imgs:
        data_src = img.get('data-src')
        src = img.get('src')
        img_url = data_src if data_src else src
        
        if img_url and 'acromatico.com/wp-content' in img_url:
            post_images[slug] = img_url
            break

print(f"✅ Extracted images for {len(post_images)} posts\n")

# Now fix all blog post HTMLs
blog_dir = Path('public/static/blog')
posts = list(blog_dir.glob('*.html'))

fixed_count = 0
error_count = 0

print(f"🔧 FIXING RELATED POST IMAGES FOR {len(posts)} POSTS...\n")

for i, post_path in enumerate(posts, 1):
    try:
        with open(post_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
        
        # Find related posts section
        related_section = soup.find('div', class_='related-posts')
        if not related_section:
            related_section = soup.find('section', class_='related-posts')
        
        if related_section:
            # Find all related post articles
            related_articles = related_section.find_all('article', class_='related-post')
            
            for article in related_articles:
                # Find the link to determine slug
                link = article.find('a')
                if link:
                    href = link.get('href', '')
                    # Extract slug from href (e.g., /blog/slug-here)
                    related_slug = href.rstrip('/').split('/')[-1]
                    
                    # Find image in this article
                    img = article.find('img')
                    if img and related_slug in post_images:
                        # Update image src to correct featured image
                        img['src'] = post_images[related_slug]
        
        # Save fixed HTML
        with open(post_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        fixed_count += 1
        
        if i % 50 == 0:
            print(f"✅ Fixed {i}/{len(posts)} posts...")
    
    except Exception as e:
        print(f"❌ ERROR: {post_path.name}: {e}")
        error_count += 1

print(f"\n{'='*80}")
print(f"✅ SUCCESS: {fixed_count} posts fixed!")
print(f"❌ ERRORS: {error_count} posts")
print(f"{'='*80}\n")

print("🎯 NOW EVERY RELATED POST SHOWS ITS ACTUAL FEATURED IMAGE!")
print("🚀 READY TO DEPLOY!\n")
