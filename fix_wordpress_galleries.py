#!/usr/bin/env python3
"""
Fix WordPress gallery markup in blog posts by converting to proper HTML gallery format
"""

import re
import os
from pathlib import Path

def extract_images_from_wp_blocks(html_content):
    """Extract all image URLs from WordPress block markup"""
    images = []
    
    # Find all img tags with data-src or src
    img_pattern = r'<img[^>]+(?:data-src|src)="([^"]+)"[^>]*>'
    matches = re.finditer(img_pattern, html_content)
    
    for match in matches:
        img_url = match.group(1)
        # Skip placeholder images
        if 'data:image/gif' not in img_url and img_url not in images:
            images.append(img_url)
    
    return images

def create_proper_gallery(images, title):
    """Create proper gallery HTML from image list"""
    gallery_html = '<div class="gallery-container">\n'
    
    for i, img_url in enumerate(images, 1):
        gallery_html += f'''<a class="gallery-item glightbox" data-gallery="wedding-gallery" href="{img_url}">
<img alt="{title} - Photo {i}" class="gallery-image" loading="lazy" src="{img_url}"/>
</a>
'''
    
    gallery_html += '</div>'
    return gallery_html

def fix_blog_post(file_path):
    """Fix a single blog post's gallery markup"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract title for alt text
        title_match = re.search(r'<h1 class="hero-title">([^<]+)</h1>', content)
        title = title_match.group(1) if title_match else "Blog Post"
        
        # Find the content container
        content_match = re.search(r'(<div class="content-container">)(.*?)(</div>\s*<div class="cta-section|</div>\s*<footer)', content, re.DOTALL)
        
        if not content_match:
            print(f"  ⚠️ No content container found")
            return False
        
        old_content = content_match.group(2)
        
        # Extract all images from WordPress blocks
        images = extract_images_from_wp_blocks(old_content)
        
        if not images:
            print(f"  ⚠️ No images found")
            return False
        
        # Extract intro paragraph (before first figure/gallery)
        intro_match = re.search(r'^(.*?)(?=<figure|<div class="gallery)', old_content, re.DOTALL)
        intro_text = intro_match.group(1).strip() if intro_match else ""
        
        # Create new content with proper gallery
        new_content = intro_text + '\n' + create_proper_gallery(images, title) + '\n'
        
        # Replace the content
        new_html = content.replace(
            content_match.group(1) + content_match.group(2),
            content_match.group(1) + new_content
        )
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_html)
        
        return True
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def main():
    blog_dir = Path('/home/user/webapp/public/static/blog')
    
    # Target only the two problematic posts
    target_posts = [
        'rustic-barn-wedding-at-rolling-meadow-farm-sade-luke.html',
        'hudson-valley-barn-engagement-kate-steve.html'
    ]
    
    print("🔧 FIXING WORDPRESS GALLERY MARKUP")
    print("=" * 60)
    
    fixed = 0
    for post_name in target_posts:
        post_path = blog_dir / post_name
        if post_path.exists():
            print(f"\n📝 {post_name}")
            if fix_blog_post(post_path):
                print(f"  ✅ Fixed!")
                fixed += 1
        else:
            print(f"\n📝 {post_name}")
            print(f"  ⚠️ File not found")
    
    print("\n" + "=" * 60)
    print(f"✅ FIXED {fixed}/{len(target_posts)} posts")
    print("=" * 60)

if __name__ == '__main__':
    main()
