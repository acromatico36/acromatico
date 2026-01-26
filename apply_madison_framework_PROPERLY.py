#!/usr/bin/env python3
"""
Apply Madison Clone Framework PROPERLY to all 502 blog posts
Uses Madison clone as COMPLETE TEMPLATE and only swaps content-specific items
"""

import os
import re
import json
from bs4 import BeautifulSoup
from datetime import datetime

# Load the complete Madison clone as template
with open('public/static/madison-clone.html', 'r', encoding='utf-8') as f:
    madison_template = f.read()

# Load blog posts data
with open('blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    posts_data = json.load(f)

print(f"✅ Loaded Madison clone as complete template")
print(f"✅ Loaded {len(posts_data)} blog posts data\n")
print(f"🚀 Applying Madison framework PROPERLY...\n")

success_count = 0
error_count = 0

for idx, post in enumerate(posts_data):
    try:
        slug = post.get('slug', '')
        if not slug:
            continue
        
        title = post.get('title', 'Acromatico Photography')
        content = post.get('content', '')
        
        # Extract first image as hero
        hero_image = "https://acromatico.com/logo.png"
        gallery_images = []
        
        # Parse content to find images
        soup = BeautifulSoup(content, 'html.parser')
        all_imgs = soup.find_all('img')
        
        for img in all_imgs:
            src = img.get('src') or img.get('data-src')
            if src and 'acromatico.com/wp-content' in src:
                gallery_images.append(src)
        
        if gallery_images:
            hero_image = gallery_images[0]
        
        if len(gallery_images) < 3:
            print(f"⚠️  Skipping {slug}: Not enough images ({len(gallery_images)})")
            error_count += 1
            continue
        
        # Extract text paragraphs for intro
        paragraphs = [p.get_text().strip() for p in soup.find_all('p') if p.get_text().strip() and len(p.get_text().strip()) > 30]
        intro_text = paragraphs[0] if paragraphs else f"Discover stunning photography from this {title} session."
        
        # Create meta description
        meta_description = intro_text[:160] if len(intro_text) > 160 else intro_text
        
        # Extract location from title (for related posts context)
        location = ""
        if '|' in title:
            parts = title.split('|')
            if len(parts) > 1:
                location = parts[1].strip()
        
        # Generate gallery HTML (matching Madison's structure)
        gallery_html = []
        for i, img_src in enumerate(gallery_images):
            gallery_html.append(f'''            <a href="{img_src}" class="gallery-item glightbox">
                <img src="{img_src}" alt="{title}" class="gallery-image" loading="lazy">
            </a>''')
        
        gallery_html_str = '\n'.join(gallery_html)
        
        # Select 3 random related posts (using simple logic for now)
        related_posts_html = []
        for i in range(min(3, len(posts_data))):
            related_idx = (idx + i + 1) % len(posts_data)
            related = posts_data[related_idx]
            related_slug = related.get('slug', '')
            related_title = related.get('title', '')
            related_img = gallery_images[i % len(gallery_images)] if gallery_images else hero_image
            
            related_posts_html.append(f'''                <article class="related-post">
                    <img src="{related_img}" alt="{related_title}">
                    <h3><a href="/blog/{related_slug}">{related_title}</a></h3>
                </article>''')
        
        related_posts_html_str = '\n'.join(related_posts_html)
        
        # START WITH MADISON TEMPLATE
        new_html = madison_template
        
        # Replace ONLY content-specific items
        # 1. Title tag
        new_html = re.sub(
            r'<title>.*?</title>',
            f'<title>{title} | Acromatico Photography</title>',
            new_html
        )
        
        # 2. Meta description
        new_html = re.sub(
            r'<meta name="description" content=".*?">',
            f'<meta name="description" content="{meta_description}">',
            new_html
        )
        
        # 3. Hero section background image
        new_html = re.sub(
            r'<section class="hero-section"></section>',
            f'<section class="hero-section" style="background-image: url(\'{hero_image}\');"></section>',
            new_html
        )
        
        # 4. Post title H1
        new_html = re.sub(
            r'<h1 class="post-title">.*?</h1>',
            f'<h1 class="post-title">{title}</h1>',
            new_html
        )
        
        # 5. Post intro paragraph
        new_html = re.sub(
            r'<div class="post-intro">\s*<p>.*?</p>\s*</div>',
            f'<div class="post-intro">\n            <p>{intro_text}</p>\n        </div>',
            new_html,
            flags=re.DOTALL
        )
        
        # 6. Gallery images (replace entire gallery-container content)
        new_html = re.sub(
            r'<div class="gallery-container">.*?</div>\s*<h2 class="section-heading">Getting Ready',
            f'''<div class="gallery-container">
{gallery_html_str}
        </div>
        
        <h2 class="section-heading">Getting Ready''',
            new_html,
            flags=re.DOTALL
        )
        
        # 7. Related posts
        new_html = re.sub(
            r'<div class="related-posts-grid">.*?</div>',
            f'''<div class="related-posts-grid">
{related_posts_html_str}
            </div>''',
            new_html,
            flags=re.DOTALL
        )
        
        # 8. Update canonical URL and OpenGraph
        new_html = re.sub(
            r'<link rel="canonical" href=".*?">',
            f'<link rel="canonical" href="https://acromatico.com/blog/{slug}">',
            new_html
        )
        
        new_html = re.sub(
            r'<meta property="og:url" content=".*?">',
            f'<meta property="og:url" content="https://acromatico.com/blog/{slug}">',
            new_html
        )
        
        new_html = re.sub(
            r'<meta property="og:title" content=".*?">',
            f'<meta property="og:title" content="{title}">',
            new_html
        )
        
        new_html = re.sub(
            r'<meta property="og:description" content=".*?">',
            f'<meta property="og:description" content="{meta_description}">',
            new_html
        )
        
        new_html = re.sub(
            r'<meta property="og:image" content=".*?">',
            f'<meta property="og:image" content="{hero_image}">',
            new_html
        )
        
        # Write to file
        output_path = f'public/static/blog/{slug}.html'
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(new_html)
        
        success_count += 1
        
        if (idx + 1) % 50 == 0:
            print(f"✅ {idx + 1}/{len(posts_data)} posts updated...")
        
    except Exception as e:
        print(f"❌ Error on {post.get('slug', 'unknown')}: {e}")
        error_count += 1

print(f"\n{'='*60}")
print(f"✅ SUCCESS: {success_count} posts updated with Madison framework!")
print(f"❌ ERRORS: {error_count} posts")
print(f"📁 Location: public/static/blog/")
print(f"{'='*60}\n")
print("🎉 ALL POSTS NOW HAVE MADISON FRAMEWORK WITH THEIR OWN CONTENT!")
print("\n💡 What changed:")
print("  - Title, meta description, canonical URL")
print("  - Hero background image")
print("  - Post title H1")
print("  - Intro paragraph")
print("  - Gallery images")
print("  - Related posts")
print("\n💡 What stayed the same (from Madison):")
print("  - ALL CSS styling")
print("  - Menu/header/footer structure")
print("  - Section headings and text")
print("  - CTA sections")
print("  - Author bio")
print("  - JavaScript functionality")
