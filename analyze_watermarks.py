#!/usr/bin/env python3
"""
Remove watermarks from blog post hero images using AI
Strategy: Start with hero images only (469 images)
"""

import json
import re
import os
from collections import defaultdict

# Load blog posts
with open('blog_posts_data/all_posts.json', 'r') as f:
    all_posts = json.load(f)

print("🎯 WATERMARK REMOVAL STRATEGY")
print("="*60)

# Collect hero images from each blog post
hero_images = []
posts_processed = 0

for post in all_posts:
    slug = post.get('slug')
    title_obj = post.get('title', {})
    title = title_obj.get('rendered', 'Untitled') if isinstance(title_obj, dict) else title_obj
    content_obj = post.get('content', {})
    content = content_obj.get('rendered', '') if isinstance(content_obj, dict) else content_obj
    
    # Extract images
    images_src = re.findall(r'<img[^>]+src="([^"]+)"', content)
    images_data_src = re.findall(r'<img[^>]+data-src="([^"]+)"', content)
    images = images_src + images_data_src
    images = [img for img in images if 'acromatico.com/wp-content' in img and not img.startswith('data:')]
    
    if images:
        hero_image = images[0]  # First image is hero
        hero_images.append({
            'slug': slug,
            'title': title,
            'hero_url': hero_image,
            'total_images': len(images)
        })
        posts_processed += 1

print(f"✅ Found {len(hero_images)} posts with hero images")
print(f"✅ Total gallery images across all posts: {sum(p['total_images'] for p in hero_images)}")

# Save hero images list
with open('hero_images_to_process.json', 'w') as f:
    json.dump(hero_images, f, indent=2)

print(f"\n📊 BREAKDOWN:")
print(f"   Posts with images: {posts_processed}")
print(f"   Hero images to process: {len(hero_images)}")
print(f"   Avg images per post: {sum(p['total_images'] for p in hero_images) / len(hero_images):.1f}")

print(f"\n💡 RECOMMENDATION:")
print(f"   Option A: Remove watermarks from HERO IMAGES ONLY ({len(hero_images)} images)")
print(f"   Option B: Remove watermarks from ALL IMAGES (~{sum(p['total_images'] for p in hero_images):,} images)")
print(f"\n📁 Saved to: hero_images_to_process.json")

# Show sample
print(f"\n📋 SAMPLE HERO IMAGES:")
for i, img in enumerate(hero_images[:5]):
    print(f"   {i+1}. {img['title'][:50]}...")
    print(f"      URL: {img['hero_url']}")
    print()
