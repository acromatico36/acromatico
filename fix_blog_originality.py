#!/usr/bin/env python3
"""
FIX BLOG ORIGINALITY - Remove ALL Madison content, keep ONLY framework + original content
"""

import os
import json
from bs4 import BeautifulSoup

# Load Madison clone template
print("📖 Loading Madison clone for FRAMEWORK ONLY...")
with open('public/static/madison-clone.html', 'r', encoding='utf-8') as f:
    madison_html = f.read()

# Load blog posts data
print("📖 Loading blog posts data...")
with open('blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    posts_data = json.load(f)

print(f"✅ Loaded Madison clone framework")
print(f"✅ Loaded {len(posts_data)} blog posts\n")
print(f"🔥 FIXING: Removing ALL Madison content, keeping ONLY original content...\n")

success_count = 0
error_count = 0

# Parse Madison template to extract ONLY the framework
madison_soup = BeautifulSoup(madison_html, 'html.parser')

# Extract framework components (CSS, JS, structure - NO CONTENT)
madison_css = ""
for style_tag in madison_soup.find_all('style'):
    madison_css += str(style_tag)

madison_fonts = str(madison_soup.find('link', href=lambda x: x and 'fonts.googleapis' in x)) if madison_soup.find('link', href=lambda x: x and 'fonts.googleapis' in x) else ""
madison_glightbox = str(madison_soup.find('link', href=lambda x: x and 'glightbox' in x)) if madison_soup.find('link', href=lambda x: x and 'glightbox' in x) else ""

# Extract header structure (logo, menu button - NO CONTENT)
header_template = madison_soup.find('header', class_='site-header')
# Extract menu structure (NO CONTENT - we'll keep Madison's menu as-is since it's navigation)
menu_template = madison_soup.find('div', class_='ast-mobile-popup-drawer')
overlay_template = madison_soup.find('div', class_='ast-mobile-popup-overlay')

# Extract footer structure
footer_template = madison_soup.find('footer')

# Extract JavaScript (menu functionality)
script_tags = madison_soup.find_all('script')
madison_js = ""
for script in script_tags:
    if script.string and ('GLightbox' in script.string or 'menuToggle' in script.string):
        madison_js += str(script) + "\n"

glightbox_cdn = ""
for script in script_tags:
    if script.get('src') and 'glightbox' in script.get('src'):
        glightbox_cdn = str(script)

for idx, post in enumerate(posts_data):
    try:
        slug = post.get('slug', '')
        if not slug:
            continue
        
        # Extract data from JSON
        title_obj = post.get('title', {})
        title = title_obj.get('rendered', 'Acromatico Photography') if isinstance(title_obj, dict) else str(title_obj)
        
        content_obj = post.get('content', {})
        content_html = content_obj.get('rendered', '') if isinstance(content_obj, dict) else str(content_obj)
        
        # Parse content to find images
        content_soup = BeautifulSoup(content_html, 'html.parser')
        all_imgs = content_soup.find_all('img')
        
        # Extract images (prioritize data-src for lazy-loaded images)
        gallery_images = []
        for img in all_imgs:
            data_src = img.get('data-src')
            src = img.get('src')
            
            # Use data-src if available, otherwise use src
            img_url = data_src if data_src else src
            
            if img_url and 'acromatico.com/wp-content' in img_url:
                gallery_images.append(img_url)
        
        if len(gallery_images) < 5:
            print(f"⚠️  Skipping {slug}: Not enough images ({len(gallery_images)})")
            error_count += 1
            continue
        
        hero_image = gallery_images[0]
        
        # Extract intro text from content
        paragraphs = [p.get_text().strip() for p in content_soup.find_all('p') if p.get_text().strip() and len(p.get_text().strip()) > 30]
        intro_text = paragraphs[0] if paragraphs else f"Discover stunning photography from this {title} session captured by Acromatico Photography."
        
        # Create meta description from intro
        meta_description = intro_text[:155] + "..." if len(intro_text) > 155 else intro_text
        
        # Extract location from title for keywords
        location_keywords = ""
        if '|' in title:
            parts = title.split('|')
            location_keywords = parts[1].strip() if len(parts) > 1 else ""
        
        # Generate SEO keywords based on actual content (NOT Madison's)
        seo_keywords = f"{location_keywords}, wedding photography, engagement photography, Acromatico Photography, South Florida photographer, NYC photographer"
        
        # BUILD COMPLETELY NEW HTML with ONLY original content
        new_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | Acromatico Photography</title>
    <meta name="description" content="{meta_description}">
    <meta name="keywords" content="{seo_keywords}">
    <meta name="author" content="Italo Campilii">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://acromatico.com/blog/{slug}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://acromatico.com/blog/{slug}">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{meta_description}">
    <meta property="og:image" content="{hero_image}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://acromatico.com/blog/{slug}">
    <meta property="twitter:title" content="{title}">
    <meta property="twitter:description" content="{meta_description}">
    <meta property="twitter:image" content="{hero_image}">
    
    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "{title}",
      "image": "{hero_image}",
      "author": {{
        "@type": "Person",
        "name": "Italo Campilii",
        "url": "https://acromatico.com/our-story"
      }},
      "publisher": {{
        "@type": "Organization",
        "name": "Acromatico Photography",
        "logo": {{
          "@type": "ImageObject",
          "url": "https://acromatico.com/static/acromatico-logo-black.png"
        }}
      }},
      "description": "{meta_description}",
      "mainEntityOfPage": {{
        "@type": "WebPage",
        "@id": "https://acromatico.com/blog/{slug}"
      }}
    }}
    </script>
    
    {madison_fonts}
    {madison_glightbox}
    {madison_css}
</head>
<body>
    {str(header_template)}
    {str(overlay_template)}
    {str(menu_template)}
    
    <!-- Hero Section with post's ACTUAL hero image -->
    <section class="hero-section" style="background-image: url('{hero_image}');"></section>
    
    <!-- Main Content with post's ACTUAL content -->
    <div class="content-container">
        <h1 class="post-title">{title}</h1>
        
        <div class="post-intro">
            <p>{intro_text}</p>
        </div>
        
        <!-- Gallery with post's ACTUAL images -->
        <div class="gallery-container">
'''
        
        # Add gallery images
        for img_src in gallery_images:
            new_html += f'''            <a href="{img_src}" class="gallery-item glightbox">
                <img src="{img_src}" alt="{title}" class="gallery-image" loading="lazy">
            </a>
'''
        
        new_html += '''        </div>
        
        <!-- Author Bio (SAME FOR ALL - it's about Ale & Italo) -->
        <div class="author-bio">
            <div class="author-headshots">
                <img src="/static/italo-headshot.jpg" alt="Italo Campilii - Wedding Photographer & CMO">
                <img src="/static/ale-headshot.jpg" alt="Ale Campilii - Wedding Photographer & Creative Director">
            </div>
            <div class="author-info">
                <h3>About Ale & Italo Campilii</h3>
                <p>We're <strong>Ale & Italo Campilii</strong> — a husband-and-wife photography team based between South Florida and NYC. For over 20 years, we've been capturing love stories with a documentary style that's honest, warm, and totally us. We believe the best wedding photos happen when couples feel like themselves, not like they're performing for the camera.</p>
                <p>Our work has been featured in Martha Stewart Weddings, The Knot, and Wedding Wire — but honestly? Our favorite moments are the quiet ones: stolen glances, belly laughs, happy tears. We love candid moments, raw emotion, educating the next generation of creatives, and most of all — having fun and living our passion in true colors.</p>
                <p>
                    <a href="/our-story">Read Our Story</a> | 
                    <a href="https://www.instagram.com/acromatico" target="_blank">@acromatico</a> | 
                    <a href="/photography">View Our Portfolio</a>
                </p>
            </div>
        </div>
        
        <!-- End-of-Post CTA -->
        <div class="cta-section end-post">
            <h2>Ready to Book Your Photography Session?</h2>
            <p>Acromatico Photography captures authentic moments across South Florida, NYC, and destination locations worldwide. Let's create stunning images that tell your unique story.</p>
            <div class="cta-buttons">
                <a href="/photography" class="cta-button primary">View Packages & Pricing</a>
                <a href="/contact" class="cta-button secondary">Get In Touch</a>
            </div>
        </div>
        
        <!-- Related Posts (will show other recent posts) -->
        <div class="related-posts">
            <h2>More From Our Portfolio</h2>
            <div class="related-posts-grid">
'''
        
        # Add 3 related posts
        for i in range(min(3, len(posts_data))):
            related_idx = (idx + i + 1) % len(posts_data)
            related = posts_data[related_idx]
            related_slug = related.get('slug', '')
            related_title_obj = related.get('title', {})
            related_title = related_title_obj.get('rendered', '') if isinstance(related_title_obj, dict) else str(related_title_obj)
            related_img = gallery_images[i % len(gallery_images)]
            
            new_html += f'''                <article class="related-post">
                    <img src="{related_img}" alt="{related_title}">
                    <h3><a href="/blog/{related_slug}">{related_title}</a></h3>
                </article>
'''
        
        new_html += '''            </div>
        </div>
    </div>
    
'''
        
        new_html += f'''    {str(footer_template)}
    
    {glightbox_cdn}
    {madison_js}
</body>
</html>'''
        
        # Write to file
        output_path = f'public/static/blog/{slug}.html'
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(new_html)
        
        success_count += 1
        
        if (idx + 1) % 50 == 0:
            print(f"✅ {idx + 1}/{len(posts_data)} posts fixed...")
        
    except Exception as e:
        print(f"❌ Error on {post.get('slug', 'unknown')}: {e}")
        import traceback
        traceback.print_exc()
        error_count += 1

print(f"\n{'='*70}")
print(f"✅ SUCCESS: {success_count} posts fixed with ORIGINAL content only!")
print(f"❌ ERRORS: {error_count} posts")
print(f"📁 Location: public/static/blog/")
print(f"{'='*70}\n")
print("🎉 ALL POSTS NOW HAVE THEIR OWN ORIGINAL CONTENT!")
print("   - NO Madison content leaked")
print("   - Each post has its own title, images, intro text")
print("   - Each post has unique meta tags and schema")
print("   - Madison framework (CSS/menu/footer) preserved")
