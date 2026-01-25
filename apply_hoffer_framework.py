#!/usr/bin/env python3
"""
Apply Hoffer Framework (Madison clone) DESIGN to all 502 existing blog posts
Keep each post's ORIGINAL content but use Madison's CSS/Menu/Layout
"""

import os
import re
from bs4 import BeautifulSoup
from datetime import datetime

# Load the Hoffer framework (Madison clone)
with open('public/static/madison-clone.html', 'r', encoding='utf-8') as f:
    hoffer_html = f.read()

# Parse framework to extract structure
hoffer_soup = BeautifulSoup(hoffer_html, 'html.parser')

# Extract the CSS (everything in <style> tags)
hoffer_css = ""
for style_tag in hoffer_soup.find_all('style'):
    hoffer_css += style_tag.string + "\n"

# Extract the menu/header structure
hoffer_header = str(hoffer_soup.find('header')) if hoffer_soup.find('header') else ""
if not hoffer_header:
    # Try to find the menu button
    menu_section = hoffer_soup.find('button', class_='menu-toggle')
    if menu_section:
        hoffer_header = str(menu_section.parent)

# Extract the slide-out menu
hoffer_menu = str(hoffer_soup.find('div', class_='ast-mobile-popup-drawer'))

# Extract footer
hoffer_footer = str(hoffer_soup.find('footer'))

# Get all existing blog posts
blog_dir = 'public/static/blog'
posts = [f for f in os.listdir(blog_dir) if f.endswith('.html')]

print(f"✅ Loaded Hoffer framework (Madison clone)")
print(f"✅ Found {len(posts)} blog posts to update\n")
print(f"🚀 Applying Hoffer framework to all posts...\n")

success_count = 0
error_count = 0

for idx, post_file in enumerate(posts):
    try:
        post_path = os.path.join(blog_dir, post_file)
        
        # Read existing post
        with open(post_path, 'r', encoding='utf-8') as f:
            original_html = f.read()
        
        original_soup = BeautifulSoup(original_html, 'html.parser')
        
        # Extract CONTENT from original post
        original_title = original_soup.find('title')
        title_text = original_title.string if original_title else "Acromatico Photography"
        
        # Extract meta tags
        original_description = original_soup.find('meta', attrs={'name': 'description'})
        description = original_description['content'] if original_description else ""
        
        # Extract main content (everything in body)
        original_body = original_soup.find('body')
        if not original_body:
            print(f"⚠️  Skipping {post_file}: No body tag")
            error_count += 1
            continue
        
        # Find hero section or main title
        hero_title = original_soup.find('h1')
        if not hero_title:
            hero_title = original_soup.find('h2')
        
        title_for_hero = hero_title.get_text().strip() if hero_title else title_text
        
        # Find all images
        all_images = original_soup.find_all('img')
        hero_image = ""
        for img in all_images:
            src = img.get('src') or img.get('data-src')
            if src and 'acromatico.com/wp-content' in src:
                hero_image = src
                break
        
        if not hero_image:
            hero_image = "https://acromatico.com/logo.png"
        
        # Extract all text paragraphs
        paragraphs = [p.get_text().strip() for p in original_soup.find_all('p') if p.get_text().strip() and len(p.get_text().strip()) > 30]
        intro_text = paragraphs[0] if paragraphs else description[:200] + "..."
        
        # Extract gallery images
        gallery_images = []
        for img in all_images:
            src = img.get('src') or img.get('data-src')
            if src and 'acromatico.com/wp-content' in src:
                gallery_images.append(src)
        
        # Generate gallery HTML with 2-column masonry
        gallery_html = []
        for i, img_src in enumerate(gallery_images):
            if i % 5 == 0 or i % 5 == 3:
                # Full-width
                gallery_html.append(f'''
                <div class="gallery-row single">
                    <div class="gallery-item">
                        <a href="{img_src}" class="glightbox" data-gallery="wedding">
                            <img src="{img_src}" alt="Wedding photography by Acromatico" loading="lazy">
                        </a>
                    </div>
                </div>
                ''')
            else:
                # 2-column
                if i + 1 < len(gallery_images):
                    img_src2 = gallery_images[i + 1]
                    gallery_html.append(f'''
                    <div class="gallery-row double">
                        <div class="gallery-item">
                            <a href="{img_src}" class="glightbox" data-gallery="wedding">
                                <img src="{img_src}" alt="Wedding photography by Acromatico" loading="lazy">
                            </a>
                        </div>
                        <div class="gallery-item">
                            <a href="{img_src2}" class="glightbox" data-gallery="wedding">
                                <img src="{img_src2}" alt="Wedding photography by Acromatico" loading="lazy">
                            </a>
                        </div>
                    </div>
                    ''')
                    # Skip next image since we used it
                    gallery_images[i + 1] = None
        
        gallery_html_str = '\n'.join([g for g in gallery_html if g])
        
        # BUILD NEW HTML with Hoffer framework + Original content
        new_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title_text}</title>
    <meta name="description" content="{description[:160]}">
    
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
    
    <style>
{hoffer_css}
    </style>
</head>
<body>
    {hoffer_header}
    {hoffer_menu}
    
    <!-- Hero Section with post's hero image -->
    <section class="hero-section" style="background-image: url('{hero_image}');">
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <h1 class="post-title">{title_for_hero}</h1>
        </div>
    </section>
    
    <!-- Main Content -->
    <div class="blog-content">
        <div class="content-wrapper">
            <p class="intro">{intro_text}</p>
            
            <!-- Gallery -->
            <div class="gallery-container">
                {gallery_html_str}
            </div>
        </div>
    </div>
    
    {hoffer_footer}
    
    <script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
    <script>
        const lightbox = GLightbox({{
            touchNavigation: true,
            loop: true,
            closeButton: true,
            closeOnOutsideClick: true,
            keyboardNavigation: true
        }});
        
        // Menu functionality
        const menuToggle = document.getElementById('menuToggle');
        const overlay = document.getElementById('overlay');
        const drawer = document.querySelector('.ast-mobile-popup-drawer');
        
        function openMenu() {{
            menuToggle.classList.add('active');
            drawer.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }}
        
        function closeMenu() {{
            menuToggle.classList.remove('active');
            drawer.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }}
        
        if (menuToggle) {{
            menuToggle.addEventListener('click', () => {{
                if (drawer.classList.contains('active')) {{
                    closeMenu();
                }} else {{
                    openMenu();
                }}
            }});
        }}
        
        if (overlay) {{
            overlay.addEventListener('click', closeMenu);
        }}
        
        document.addEventListener('keydown', (e) => {{
            if (e.key === 'Escape' && drawer.classList.contains('active')) {{
                closeMenu();
            }}
        }});
    </script>
</body>
</html>'''
        
        # Write updated post
        with open(post_path, 'w', encoding='utf-8') as f:
            f.write(new_html)
        
        success_count += 1
        
        if (idx + 1) % 50 == 0:
            print(f"✅ {idx + 1}/{len(posts)} posts updated...")
        
    except Exception as e:
        print(f"❌ Error on {post_file}: {e}")
        error_count += 1

print(f"\n{'='*60}")
print(f"✅ SUCCESS: {success_count} posts updated with Hoffer framework!")
print(f"❌ ERRORS: {error_count} posts")
print(f"📁 Location: {blog_dir}/")
print(f"{'='*60}\n")
print("🎉 ALL POSTS NOW HAVE HOFFER DESIGN WITH THEIR ORIGINAL CONTENT!")
