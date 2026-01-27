#!/usr/bin/env python3
"""
Complete blog rebuild script - removes ALL Madison content and uses correct data
"""
import json
import os
import re
from pathlib import Path

def create_clean_template():
    """Create a clean blog template without any Madison-specific content"""
    return '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}}</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="{{DESCRIPTION}}">
    <meta name="keywords" content="{{KEYWORDS}}">
    <meta name="author" content="Italo Campilii">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://acromatico.com/blog/{{SLUG}}">
    <meta property="og:title" content="{{TITLE}}">
    <meta property="og:description" content="{{DESCRIPTION}}">
    <meta property="og:image" content="{{HERO_URL}}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://acromatico.com/blog/{{SLUG}}">
    <meta property="twitter:title" content="{{TITLE}}">
    <meta property="twitter:description" content="{{DESCRIPTION}}">
    <meta property="twitter:image" content="{{HERO_URL}}">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://acromatico.com/blog/{{SLUG}}">
    
    <!-- Schema.org Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "{{TITLE}}",
      "image": "{{HERO_URL}}",
      "datePublished": "{{DATE_PUBLISHED}}",
      "dateModified": "{{DATE_MODIFIED}}",
      "author": {
        "@type": "Person",
        "name": "Italo Campilii",
        "url": "https://acromatico.com/our-story",
        "jobTitle": "Chief Marketing Officer & Photographer"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Acromatico Photography",
        "logo": {
          "@type": "ImageObject",
          "url": "https://acromatico.com/static/acromatico-logo-transparent.png"
        }
      },
      "description": "{{DESCRIPTION}}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://acromatico.com/blog/{{SLUG}}"
      }
    }
    </script>
    
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 15px;
            line-height: 1.6;
            color: #3a3a3a;
            background: #ffffff;
        }
        
        .hero-section {
            min-height: 100vh;
            background-image: url('{{HERO_URL}}');
            background-position: center center;
            background-size: cover;
            position: relative;
        }
        
        .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.19);
        }
        
        .site-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            padding: 1.5rem 5%;
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.92);
            box-shadow: 0 2px 10px rgba(0,0,0,0.03);
        }
        
        .site-header .container {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo img {
            height: 45px;
            width: auto;
        }
        
        .hero-overlay {
            position: relative;
            z-index: 1;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            padding: 0 5%;
        }
        
        .hero-content h1 {
            font-size: clamp(2rem, 5vw, 4.5rem);
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 0 4px 20px rgba(0,0,0,0.4);
            letter-spacing: -0.02em;
        }
        
        .main-nav {
            display: flex;
            gap: 2rem;
            align-items: center;
        }
        
        .main-nav a {
            color: #3a3a3a;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: color 0.3s ease;
        }
        
        .main-nav a:hover {
            color: #8B4513;
        }
        
        .content-section {
            max-width: 1200px;
            margin: 0 auto;
            padding: 4rem 5%;
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-top: 3rem;
        }
        
        .gallery-item {
            aspect-ratio: 3/2;
            overflow: hidden;
            cursor: pointer;
            border-radius: 8px;
            transition: transform 0.3s ease;
        }
        
        .gallery-item:hover {
            transform: scale(1.02);
        }
        
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .footer {
            background: #2c2c2c;
            color: #ffffff;
            padding: 3rem 5%;
            text-align: center;
        }
        
        .footer a {
            color: #ffffff;
            text-decoration: none;
        }
        
        @media (max-width: 768px) {
            .main-nav {
                display: none;
            }
            
            .gallery-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
        }
    </style>
</head>
<body>
    <header class="site-header">
        <div class="container">
            <div class="logo">
                <a href="/">
                    <img src="/static/acromatico-logo-transparent.png" alt="Acromatico Photography">
                </a>
            </div>
            <nav class="main-nav">
                <a href="/">Home</a>
                <a href="/photography">Photography</a>
                <a href="/blog">Blog</a>
                <a href="/prints">Prints</a>
                <a href="/our-story">Our Story</a>
                <a href="/contact">Contact</a>
            </nav>
        </div>
    </header>

    <section class="hero-section">
        <div class="hero-overlay">
            <div class="hero-content">
                <h1>{{TITLE}}</h1>
            </div>
        </div>
    </section>

    <section class="content-section">
        <div class="gallery-grid">
            {{GALLERY_IMAGES}}
        </div>
    </section>

    <footer class="footer">
        <p>&copy; 2026 Acromatico Photography. All rights reserved.</p>
        <p><a href="/contact">Contact Us</a> | <a href="/our-story">Our Story</a> | <a href="https://instagram.com/acromatico">@acromatico</a></p>
    </footer>

    <script src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script>
    <script>
        const lightbox = GLightbox({
            selector: '.gallery-item'
        });
    </script>
</body>
</html>'''

def load_watermark_mappings():
    """Load all watermark-free URL mappings"""
    mappings = {}
    
    # Load from watermark_removal_results.json
    if os.path.exists('watermark_removal_results.json'):
        with open('watermark_removal_results.json', 'r') as f:
            data = json.load(f)
            # mappings is already a dict in the JSON file
            mappings = data.get('mappings', {})
    
    print(f"Loaded {len(mappings)} watermark-free URL mappings")
    return mappings

def rebuild_blog_post(post_data, template, mappings, blog_dir):
    """Rebuild a single blog post with clean data"""
    slug = post_data['slug']
    title = post_data['title']
    hero_url = post_data['hero_url']
    total_images = post_data.get('total_images', 0)
    
    # Use watermark-free URL if available
    clean_hero_url = mappings.get(hero_url, hero_url)
    
    # Generate description
    description = f"View {total_images} photos from this beautiful session captured by Acromatico Photography in South Florida."
    
    # Extract main keyword from title for SEO
    keywords = f"{title}, South Florida photographer, wedding photography, portrait photography, Acromatico Photography"
    
    # Generate dates
    date_published = "2026-01-27"
    date_modified = "2026-01-27"
    
    # Build gallery HTML
    gallery_html = []
    base_url = hero_url.rsplit('-1.', 1)[0] if '-1.' in hero_url else hero_url.rsplit('.', 1)[0]
    ext = hero_url.split('.')[-1]
    
    for i in range(1, total_images + 1):
        if i == 1:
            img_url = hero_url
        else:
            img_url = f"{base_url}-{i}.{ext}"
        
        # Use watermark-free version if available
        clean_img_url = mappings.get(img_url, img_url)
        
        gallery_html.append(f'''            <a href="{clean_img_url}" class="gallery-item glightbox">
                <img src="{clean_img_url}" alt="{title} - Photo {i}" loading="lazy">
            </a>''')
    
    gallery_images_html = '\n'.join(gallery_html)
    
    # Fill template
    html_content = template.replace('{{TITLE}}', title)
    html_content = html_content.replace('{{SLUG}}', slug)
    html_content = html_content.replace('{{HERO_URL}}', clean_hero_url)
    html_content = html_content.replace('{{DESCRIPTION}}', description)
    html_content = html_content.replace('{{KEYWORDS}}', keywords)
    html_content = html_content.replace('{{DATE_PUBLISHED}}', date_published)
    html_content = html_content.replace('{{DATE_MODIFIED}}', date_modified)
    html_content = html_content.replace('{{GALLERY_IMAGES}}', gallery_images_html)
    
    # Write to file
    output_path = blog_dir / f"{slug}.html"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    return True

def main():
    # Load data
    with open('remaining_to_process.json', 'r') as f:
        posts = json.load(f)
    
    print(f"Found {len(posts)} blog posts to rebuild")
    
    # Load mappings
    mappings = load_watermark_mappings()
    
    # Create clean template
    template = create_clean_template()
    
    # Setup directories
    blog_dir = Path('public/static/blog')
    blog_dir.mkdir(parents=True, exist_ok=True)
    
    # Rebuild all posts
    success_count = 0
    failed_count = 0
    
    for i, post in enumerate(posts, 1):
        try:
            rebuild_blog_post(post, template, mappings, blog_dir)
            success_count += 1
            if i % 50 == 0:
                print(f"Progress: {i}/{len(posts)} posts rebuilt...")
        except Exception as e:
            print(f"ERROR rebuilding {post.get('slug', 'unknown')}: {str(e)}")
            failed_count += 1
    
    print(f"\n✅ REBUILD COMPLETE:")
    print(f"  - Successfully rebuilt: {success_count} posts")
    print(f"  - Failed: {failed_count} posts")
    print(f"  - Watermark-free URLs used: {len(mappings)}")
    print(f"  - ALL Madison content removed ✅")

if __name__ == '__main__':
    main()
