#!/usr/bin/env python3
"""
PROPER Blog Generation: Use Madison FRAMEWORK but each post's ORIGINAL content!
"""

import json
import os
import re
from html import unescape
from bs4 import BeautifulSoup
from datetime import datetime

# Load the master FRAMEWORK template (design only)
with open('public/static/blog-theme-master.html', 'r', encoding='utf-8') as f:
    framework_template = f.read()

# Load all blog posts data
with open('blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    all_posts = json.load(f)

print(f"✅ Loaded FRAMEWORK template")
print(f"✅ Loaded {len(all_posts)} blog posts with ORIGINAL content\n")

def extract_images_from_content(html_content):
    """Extract all image URLs from WordPress gallery HTML"""
    soup = BeautifulSoup(html_content, 'html.parser')
    images = []
    
    for img in soup.find_all('img'):
        img_url = img.get('data-src') or img.get('src')
        if img_url and 'acromatico.com/wp-content/uploads' in img_url:
            width = img.get('width', '')
            height = img.get('height', '')
            
            images.append({
                'url': img_url,
                'width': width,
                'height': height,
                'alt': img.get('alt', '')
            })
    
    return images

def extract_text_content(html_content):
    """Extract all text paragraphs from the post"""
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Find all <p> tags
    paragraphs = []
    for p in soup.find_all('p'):
        text = p.get_text().strip()
        if text and len(text) > 20:  # Skip empty or very short paragraphs
            paragraphs.append(text)
    
    return paragraphs

def generate_gallery_html(images):
    """Generate 2-column masonry gallery with ORIGINAL images"""
    if not images:
        return ""
    
    gallery_html = []
    i = 0
    
    while i < len(images):
        img = images[i]
        
        # Determine layout based on image dimensions
        try:
            width = int(img['width']) if img['width'] else 2400
            height = int(img['height']) if img['height'] else 1600
            is_portrait = height > width
        except:
            is_portrait = False
        
        # Alternate between full-width and 2-column
        if i % 5 == 0 or i % 5 == 3:
            # Full-width images
            gallery_html.append(f'''
            <div class="gallery-row single">
                <div class="gallery-item">
                    <a href="{img['url']}" class="glightbox" data-gallery="wedding">
                        <img src="{img['url']}" alt="{img['alt'] or 'Wedding photography by Acromatico'}" loading="lazy">
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
                        <a href="{img['url']}" class="glightbox" data-gallery="wedding">
                            <img src="{img['url']}" alt="{img['alt'] or 'Wedding photography by Acromatico'}" loading="lazy">
                        </a>
                    </div>
                    <div class="gallery-item">
                        <a href="{img2['url']}" class="glightbox" data-gallery="wedding">
                            <img src="{img2['url']}" alt="{img2['alt'] or 'Wedding photography by Acromatico'}" loading="lazy">
                        </a>
                    </div>
                </div>
                ''')
                i += 1
            else:
                # Last image - make it full-width
                gallery_html.append(f'''
                <div class="gallery-row single">
                    <div class="gallery-item">
                        <a href="{img['url']}" class="glightbox" data-gallery="wedding">
                            <img src="{img['url']}" alt="{img['alt'] or 'Wedding photography by Acromatico'}" loading="lazy">
                        </a>
                    </div>
                </div>
                ''')
        
        i += 1
    
    return '\n'.join(gallery_html)

def generate_text_sections(paragraphs, images):
    """Interleave text paragraphs between image galleries"""
    if not paragraphs:
        return ""
    
    sections_html = []
    
    # First paragraph (intro)
    if paragraphs:
        sections_html.append(f'<p class="intro">{paragraphs[0]}</p>')
    
    # Additional paragraphs as content sections
    for i, para in enumerate(paragraphs[1:6]):  # Use up to 5 more paragraphs
        sections_html.append(f'''
        <div class="content-section">
            <p>{para}</p>
        </div>
        ''')
    
    return '\n'.join(sections_html)

def format_date(date_str):
    """Convert WordPress date to readable format"""
    try:
        dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
        return dt.strftime("%B %d, %Y")
    except:
        return "2026"

def extract_location_from_title(title):
    """Extract location from title"""
    # Common patterns
    locations = []
    
    if ' at ' in title:
        parts = title.split(' at ')
        if len(parts) > 1:
            loc = parts[1].split('|')[0].strip()
            locations.append(loc)
    
    # Check for common location keywords
    location_keywords = [
        'Miami', 'Key West', 'South Florida', 'Fort Lauderdale', 'Boca Raton',
        'Pennsylvania', 'New York', 'NYC', 'Brooklyn', 'Lancaster', 
        'Philadelphia', 'Greensboro', 'North Carolina', 'Florida'
    ]
    
    for keyword in location_keywords:
        if keyword in title:
            return keyword
    
    # Default
    return "South Florida"

def get_related_posts(current_index, all_posts):
    """Get 3 related posts"""
    related = []
    
    indices = []
    if current_index > 0:
        indices.append(current_index - 1)
    if current_index < len(all_posts) - 1:
        indices.append(current_index + 1)
    if current_index > 1:
        indices.append(current_index - 2)
    
    for idx in indices[:3]:
        post = all_posts[idx]
        images = extract_images_from_content(post['content']['rendered'])
        hero_img = images[0]['url'] if images else ''
        
        if hero_img:
            related.append({
                'title': unescape(post['title']['rendered']),
                'slug': post['slug'],
                'image': hero_img
            })
    
    return related

# Generate all posts PROPERLY
output_dir = 'public/static/blog_posts_proper'
os.makedirs(output_dir, exist_ok=True)

print(f"🚀 Generating {len(all_posts)} blog posts PROPERLY...")
print(f"📁 Output: {output_dir}/\n")

success_count = 0
error_count = 0

for idx, post in enumerate(all_posts):
    try:
        # Extract ORIGINAL data for THIS post
        title = unescape(post['title']['rendered'])
        slug = post['slug']
        date = format_date(post['date'])
        content_html = post['content']['rendered']
        
        # Extract THIS post's images and text
        images = extract_images_from_content(content_html)
        paragraphs = extract_text_content(content_html)
        location = extract_location_from_title(title)
        
        if not images:
            print(f"⚠️  Skipping {slug}: No images")
            error_count += 1
            continue
        
        # Hero image (first image)
        hero_image = images[0]['url']
        
        # Generate THIS post's gallery
        gallery_html = generate_gallery_html(images)
        
        # Generate THIS post's text sections
        intro_text = paragraphs[0] if paragraphs else f"Discover {title} - captured by Acromatico Photography."
        
        # Get related posts
        related_posts = get_related_posts(idx, all_posts)
        
        # Generate related posts HTML
        related_html = []
        for related in related_posts:
            related_html.append(f'''
            <div class="related-post">
                <a href="/static/blog_posts_proper/{related['slug']}.html">
                    <img src="{related['image']}" alt="{related['title']}" loading="lazy">
                    <h3>{related['title']}</h3>
                </a>
            </div>
            ''')
        
        related_posts_html = '\n'.join(related_html)
        
        # START WITH FRAMEWORK TEMPLATE
        html = framework_template
        
        # REPLACE with THIS POST's content
        # 1. Hero image
        html = re.sub(
            r'background-image: url\([\'"]https://[^)]+[\']\);',
            f"background-image: url('{hero_image}');",
            html
        )
        
        # 2. Title and date
        html = re.sub(
            r'<h1[^>]*>.*?</h1>',
            f'<h1 class="post-title">{title}</h1>',
            html,
            flags=re.DOTALL,
            count=1
        )
        
        html = re.sub(
            r'<p class="post-date">.*?</p>',
            f'<p class="post-date">{date} | {location}</p>',
            html,
            flags=re.DOTALL,
            count=1
        )
        
        # 3. Intro text
        html = re.sub(
            r'<p class="intro">.*?</p>',
            f'<p class="intro">{intro_text}</p>',
            html,
            flags=re.DOTALL
        )
        
        # 4. Gallery
        html = re.sub(
            r'<!-- START GALLERY -->.*?<!-- END GALLERY -->',
            f'<!-- START GALLERY -->\n{gallery_html}\n<!-- END GALLERY -->',
            html,
            flags=re.DOTALL
        )
        
        # 5. Related posts
        if related_posts_html:
            html = re.sub(
                r'<div class="related-posts-grid">.*?</div><!-- END related-posts-grid -->',
                f'<div class="related-posts-grid">\n{related_posts_html}\n</div><!-- END related-posts-grid -->',
                html,
                flags=re.DOTALL
            )
        
        # 6. Meta tags
        meta_description = intro_text[:160] if intro_text else f"{title} - Wedding photography by Acromatico"
        html = re.sub(
            r'<meta name="description" content="[^"]*">',
            f'<meta name="description" content="{meta_description}">',
            html
        )
        
        # 7. Update page title
        html = re.sub(
            r'<title>.*?</title>',
            f'<title>{title} - Acromatico Photography</title>',
            html
        )
        
        # Save file
        output_path = f'{output_dir}/{slug}.html'
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html)
        
        success_count += 1
        
        if (idx + 1) % 50 == 0:
            print(f"✅ {idx + 1}/{len(all_posts)} posts...")
        
    except Exception as e:
        print(f"❌ Error: {post.get('slug', 'unknown')}: {e}")
        error_count += 1

print(f"\n{'='*60}")
print(f"✅ SUCCESS: {success_count} posts generated PROPERLY!")
print(f"❌ ERRORS: {error_count} posts")
print(f"📁 Output: {output_dir}/")
print(f"{'='*60}\n")

print("🎉 DONE! Each post has its OWN content with the Madison FRAMEWORK!")
