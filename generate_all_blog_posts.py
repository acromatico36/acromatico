#!/usr/bin/env python3
"""
Generate all 501 blog posts from JSON data using the master template
"""

import json
import os
import re
from html import unescape
from bs4 import BeautifulSoup
from datetime import datetime

# Load the master template
with open('public/static/blog-theme-master.html', 'r', encoding='utf-8') as f:
    master_template = f.read()

# Load all blog posts data
with open('blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    all_posts = json.load(f)

print(f"✅ Loaded {len(all_posts)} blog posts from JSON")

def extract_images_from_content(html_content):
    """Extract all image URLs from WordPress gallery HTML"""
    soup = BeautifulSoup(html_content, 'html.parser')
    images = []
    
    # Find all img tags
    for img in soup.find_all('img'):
        # Try data-src first (lazy load), then src
        img_url = img.get('data-src') or img.get('src')
        if img_url and 'acromatico.com/wp-content/uploads' in img_url:
            # Get dimensions
            width = img.get('width', '')
            height = img.get('height', '')
            
            images.append({
                'url': img_url,
                'width': width,
                'height': height,
                'alt': img.get('alt', '')
            })
    
    return images

def extract_intro_text(html_content):
    """Extract the intro paragraph (before first gallery)"""
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Find first <p> tag
    first_p = soup.find('p')
    if first_p:
        return first_p.get_text().strip()
    
    return ""

def generate_gallery_html(images):
    """Generate 2-column masonry gallery HTML"""
    if not images:
        return ""
    
    # Split images into sections (full-width and 2-column patterns)
    gallery_html = []
    i = 0
    
    while i < len(images):
        img = images[i]
        
        # Determine if portrait (tall) or landscape (wide)
        try:
            width = int(img['width']) if img['width'] else 2400
            height = int(img['height']) if img['height'] else 1600
            is_portrait = height > width
        except:
            is_portrait = False
        
        # Pattern: 1 full-width, then 2-column, then 1 full-width, etc.
        if i % 3 == 0:
            # Full-width image
            gallery_html.append(f'''
            <div class="gallery-row single">
                <div class="gallery-item">
                    <a href="{img['url']}" class="glightbox">
                        <img src="{img['url']}" alt="{img['alt'] or 'Wedding photography'}">
                    </a>
                </div>
            </div>
            ''')
        else:
            # 2-column layout
            if i + 1 < len(images):
                img2 = images[i + 1]
                gallery_html.append(f'''
                <div class="gallery-row double">
                    <div class="gallery-item">
                        <a href="{img['url']}" class="glightbox">
                            <img src="{img['url']}" alt="{img['alt'] or 'Wedding photography'}">
                        </a>
                    </div>
                    <div class="gallery-item">
                        <a href="{img2['url']}" class="glightbox">
                            <img src="{img2['url']}" alt="{img2['alt'] or 'Wedding photography'}">
                        </a>
                    </div>
                </div>
                ''')
                i += 1  # Skip next image
            else:
                # Last image, make it full-width
                gallery_html.append(f'''
                <div class="gallery-row single">
                    <div class="gallery-item">
                        <a href="{img['url']}" class="glightbox">
                            <img src="{img['url']}" alt="{img['alt'] or 'Wedding photography'}">
                        </a>
                    </div>
                </div>
                ''')
        
        i += 1
    
    return '\n'.join(gallery_html)

def format_date(date_str):
    """Convert WordPress date to readable format"""
    try:
        dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
        return dt.strftime("%B %d, %Y")
    except:
        return "2026"

def extract_location(title):
    """Try to extract location from title"""
    # Common patterns: "at Location Name", "| Location", etc.
    if ' at ' in title:
        parts = title.split(' at ')
        if len(parts) > 1:
            location = parts[1].split('|')[0].strip()
            return location
    
    # Fallback locations
    fallback_locations = [
        "South Florida",
        "Miami, Florida",
        "Key West, Florida",
        "Pennsylvania",
        "New York City"
    ]
    
    # Random fallback
    import random
    return random.choice(fallback_locations)

def get_related_posts(current_index, all_posts):
    """Get 3 related posts (nearby in list)"""
    related = []
    
    # Get posts around current index
    indices = []
    if current_index > 0:
        indices.append(current_index - 1)
    if current_index < len(all_posts) - 1:
        indices.append(current_index + 1)
    if current_index > 1:
        indices.append(current_index - 2)
    
    # Get first 3
    for idx in indices[:3]:
        post = all_posts[idx]
        
        # Extract first image
        images = extract_images_from_content(post['content']['rendered'])
        hero_img = images[0]['url'] if images else 'https://via.placeholder.com/800x600'
        
        related.append({
            'title': post['title']['rendered'],
            'slug': post['slug'],
            'image': hero_img
        })
    
    return related

# Generate all posts
output_dir = 'public/static/blog_posts'
os.makedirs(output_dir, exist_ok=True)

print(f"\n🚀 Generating {len(all_posts)} blog posts...")
print(f"📁 Output directory: {output_dir}/\n")

success_count = 0
error_count = 0

for idx, post in enumerate(all_posts):
    try:
        # Extract data
        title = unescape(post['title']['rendered'])
        slug = post['slug']
        date = format_date(post['date'])
        content_html = post['content']['rendered']
        
        # Extract images and intro
        images = extract_images_from_content(content_html)
        intro_text = extract_intro_text(content_html)
        location = extract_location(title)
        
        if not images:
            print(f"⚠️  Skipping {slug}: No images found")
            error_count += 1
            continue
        
        # Hero image (first image)
        hero_image = images[0]['url']
        
        # Generate gallery (remaining images)
        gallery_html = generate_gallery_html(images[1:] if len(images) > 1 else images)
        
        # Get related posts
        related_posts = get_related_posts(idx, all_posts)
        
        # Generate related posts HTML
        related_html = []
        for related in related_posts:
            related_html.append(f'''
            <div class="related-post">
                <a href="/static/blog_posts/{related['slug']}.html">
                    <img src="{related['image']}" alt="{related['title']}">
                    <h3>{related['title']}</h3>
                </a>
            </div>
            ''')
        
        related_posts_html = '\n'.join(related_html) if related_html else ""
        
        # Replace placeholders in master template
        html = master_template
        
        # Hero section
        html = html.replace('https://hofferphotography.com/wp-content/uploads/2026/01/Madison-Jordan-Cork-Factory-Wedding-Photographer-1.jpg', hero_image)
        html = html.replace('Madison &amp; Jordan | Cork Factory Hotel Wedding', title)
        html = html.replace('January 15, 2026 | Lancaster, Pennsylvania', f'{date} | {location}')
        
        # Content
        html = re.sub(
            r'<p class="intro">.*?</p>',
            f'<p class="intro">{intro_text}</p>',
            html,
            flags=re.DOTALL
        )
        
        # Gallery
        html = re.sub(
            r'<!-- START GALLERY -->.*?<!-- END GALLERY -->',
            f'<!-- START GALLERY -->\n{gallery_html}\n<!-- END GALLERY -->',
            html,
            flags=re.DOTALL
        )
        
        # Related posts
        if related_posts_html:
            html = re.sub(
                r'<div class="related-posts-grid">.*?</div><!-- END related-posts-grid -->',
                f'<div class="related-posts-grid">\n{related_posts_html}\n</div><!-- END related-posts-grid -->',
                html,
                flags=re.DOTALL
            )
        
        # Meta tags
        meta_description = intro_text[:160] if intro_text else f"{title} - Wedding photography by Acromatico"
        html = html.replace('<meta name="description" content="Stunning waterfront wedding at Cork Factory Hotel in Lancaster, PA. View 73 photos, venue details, and timeline from Madison & Jordan\'s industrial-chic celebration.">', 
                          f'<meta name="description" content="{meta_description}">')
        
        # Save to file
        output_path = f'{output_dir}/{slug}.html'
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html)
        
        success_count += 1
        
        # Progress
        if (idx + 1) % 50 == 0:
            print(f"✅ Generated {idx + 1}/{len(all_posts)} posts...")
        
    except Exception as e:
        print(f"❌ Error generating {post.get('slug', 'unknown')}: {e}")
        error_count += 1

print(f"\n{'='*60}")
print(f"✅ Successfully generated: {success_count} posts")
print(f"❌ Errors: {error_count} posts")
print(f"📁 Output directory: {output_dir}/")
print(f"{'='*60}\n")

# Generate index file with all posts
print("📝 Generating blog index...")

index_html = []
for post in all_posts:
    images = extract_images_from_content(post['content']['rendered'])
    if not images:
        continue
    
    title = unescape(post['title']['rendered'])
    slug = post['slug']
    hero_image = images[0]['url']
    date = format_date(post['date'])
    
    index_html.append(f'''
    <div class="blog-post-card">
        <a href="/static/blog_posts/{slug}.html">
            <img src="{hero_image}" alt="{title}">
            <h3>{title}</h3>
            <p class="date">{date}</p>
        </a>
    </div>
    ''')

# Save index
index_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - Acromatico Photography</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: 'Montserrat', sans-serif; background: #f8f8f8; }}
        .container {{ max-width: 1400px; margin: 0 auto; padding: 80px 40px; }}
        h1 {{ font-size: 48px; text-align: center; margin-bottom: 60px; color: #3a3a3a; }}
        .blog-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 40px; }}
        .blog-post-card {{ background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s; }}
        .blog-post-card:hover {{ transform: translateY(-8px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }}
        .blog-post-card img {{ width: 100%; height: 300px; object-fit: cover; }}
        .blog-post-card h3 {{ padding: 20px 20px 10px; font-size: 20px; color: #3a3a3a; }}
        .blog-post-card .date {{ padding: 0 20px 20px; color: #888; font-size: 14px; }}
        .blog-post-card a {{ text-decoration: none; }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Wedding Photography Blog</h1>
        <div class="blog-grid">
            {''.join(index_html)}
        </div>
    </div>
</body>
</html>'''

with open(f'{output_dir}/index.html', 'w', encoding='utf-8') as f:
    f.write(index_content)

print(f"✅ Blog index generated: {output_dir}/index.html\n")
print("🎉 ALL DONE! Ready to deploy to Cloudflare Pages!")
