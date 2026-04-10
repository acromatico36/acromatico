#!/usr/bin/env python3
"""
Create blog posts for Perez and Perales families
Using the exact same structure as other successful blog posts
"""

import re
from datetime import datetime

# Blog post template
def create_blog_post(family_data):
    """Create a complete blog post HTML"""
    
    html = f'''<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>
   {family_data['title']} | Acromatico Photography
  </title>
<!-- SEO Meta Tags -->
<meta content="{family_data['meta_description']}" name="description"/>
<meta content="{family_data['keywords']}" name="keywords"/>
<meta content="Italo Campilii" name="author"/>
<meta content="index, follow" name="robots"/>
<!-- Open Graph / Facebook -->
<meta content="article" property="og:type"/>
<meta content="https://acromatico.com/blog/{family_data['slug']}" property="og:url"/>
<meta content="{family_data['title']}" property="og:title"/>
<meta content="{family_data['meta_description']}" property="og:description"/>
<meta content="{family_data['hero_image']}" property="og:image"/>
<!-- Twitter -->
<meta content="summary_large_image" property="twitter:card"/>
<meta content="https://acromatico.com/blog/{family_data['slug']}" property="twitter:url"/>
<meta content="{family_data['title']}" property="twitter:title"/>
<meta content="{family_data['meta_description']}" property="twitter:description"/>
<meta content="{family_data['hero_image']}" property="twitter:image"/>
<!-- Canonical URL -->
<link href="https://acromatico.com/blog/{family_data['slug']}" rel="canonical"/>
<!-- Open Graph Extended -->
<meta content="Photography" property="article:section"/>
<meta content="Family Photography" property="article:tag"/>
<meta content="{family_data['location_tag']}" property="article:tag"/>
<meta content="South Florida Family Portraits" property="article:tag"/>
<meta content="Italo Campilii" property="article:author"/>
<!-- Schema.org Markup -->
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{family_data['title']}",
  "image": "{family_data['hero_image']}",
  "author": {{
    "@type": "Person",
    "name": "Italo Campilii"
  }},
  "publisher": {{
    "@type": "Organization",
    "name": "Acromatico Photography",
    "logo": {{
      "@type": "ImageObject",
      "url": "https://acromatico.com/static/acromatico-logo-official.png"
    }}
  }},
  "datePublished": "{family_data['date']}",
  "description": "{family_data['meta_description']}"
}}
</script>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com"></script>
<style>

   * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Montserrat', sans-serif;
            font-weight: 300;
            font-size: 16px;
            line-height: 1.7;
            color: #2a2a2a;
            background: #ffffff;
        }}
        
        .hero-section {{
            min-height: 100vh;
            background-image: url('{family_data['hero_image']}');
            background-position: center center;
            background-size: cover;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }}
        
        .hero-section::before {{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.35);
        }}
        
        .hero-title {{
            position: relative;
            z-index: 10;
            color: #ffffff;
            font-size: 56px;
            font-weight: 300;
            text-align: center;
            letter-spacing: -0.5px;
            line-height: 1.3em;
            max-width: 900px;
            padding: 0 40px;
            text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }}
        
        .site-header {{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            padding: 20px 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
            transition: all 0.3s ease;
        }}
        
        .site-header.scrolled {{
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0,0,0,0.08);
            backdrop-filter: blur(20px);
        }}
        
        .logo-link {{
            display: inline-block;
            transition: transform 0.3s ease;
        }}
        
        .logo-link:hover {{
            transform: scale(1.05);
        }}
        
        .logo-image {{
            height: 45px;
            width: auto;
            filter: brightness(0) invert(1);
            transition: filter 0.3s ease;
        }}
        
        .site-header.scrolled .logo-image {{
            filter: none;
        }}
        
        .content-container {{
            max-width: 1200px;
            margin: 0 auto;
            padding: 80px 40px;
        }}
        
        .post-intro {{
            font-size: 20px;
            line-height: 1.8;
            color: #4a4a4a;
            text-align: center;
            max-width: 800px;
            margin: 0 auto 60px;
        }}
        
        .storytelling-sections {{
            margin-bottom: 80px;
        }}
        
        .section-heading {{
            font-size: 36px;
            font-weight: 300;
            text-align: center;
            margin: 80px 0 40px;
            color: #2a2a2a;
            line-height: 1.4;
        }}
        
        .featured-image {{
            margin-bottom: 60px;
        }}
        
        .section-image {{
            width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }}
        
        .section-image:hover {{
            transform: translateY(-5px);
            box-shadow: 0 8px 40px rgba(0,0,0,0.15);
        }}
        
        .image-caption {{
            text-align: center;
            font-size: 14px;
            color: #999;
            margin-top: 15px;
            font-style: italic;
        }}
        
        .gallery-container {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
            margin-bottom: 80px;
        }}
        
        .gallery-item {{
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            aspect-ratio: 3/2;
            cursor: pointer;
            transition: transform 0.3s ease;
        }}
        
        .gallery-item:hover {{
            transform: scale(1.02);
        }}
        
        .gallery-image {{
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }}
        
        .gallery-item:hover .gallery-image {{
            transform: scale(1.1);
        }}
        
        .faq-section {{
            max-width: 900px;
            margin: 80px auto;
            padding: 60px 40px;
            background: #fafafa;
            border-radius: 12px;
        }}
        
        .faq-item {{
            margin-bottom: 30px;
            padding-bottom: 30px;
            border-bottom: 1px solid #e5e5e5;
        }}
        
        .faq-item:last-child {{
            border-bottom: none;
        }}
        
        .faq-question {{
            font-size: 20px;
            font-weight: 500;
            color: #2a2a2a;
            margin-bottom: 15px;
            cursor: pointer;
            transition: color 0.3s ease;
        }}
        
        .faq-question:hover {{
            color: #4794A6;
        }}
        
        .faq-answer {{
            font-size: 16px;
            line-height: 1.7;
            color: #4a4a4a;
        }}
        
        .related-posts {{
            max-width: 1200px;
            margin: 80px auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }}
        
        .related-post {{
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            text-decoration: none;
            color: inherit;
        }}
        
        .related-post:hover {{
            transform: translateY(-8px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }}
        
        @media (max-width: 768px) {{
            .hero-title {{
                font-size: 36px;
            }}
            
            .content-container {{
                padding: 60px 20px;
            }}
            
            .section-heading {{
                font-size: 28px;
            }}
            
            .gallery-container {{
                grid-template-columns: 1fr;
            }}
        }}

</style>
</head>
<body>
<!-- SITE HEADER -->
<header class="site-header" id="site-header">
<a class="logo-link" href="/">
<img alt="Acromatico Photography" class="logo-image" src="/static/acromatico-logo-official.png"/>
</a>
</header>
<script>
   // Header scroll effect
        window.addEventListener('scroll', function() {{
            const header = document.getElementById('site-header');
            if (window.scrollY > 100) {{
                header.classList.add('scrolled');
            }} else {{
                header.classList.remove('scrolled');
            }}
        }});

</script>
<section class="hero-section">
<h1 class="hero-title">{family_data['hero_title']}</h1>
</section>
<div class="content-container">
<div class="post-intro">
{family_data['intro_html']}
</div>
<div class="storytelling-sections">
{family_data['sections_html']}
</div>
<div class="gallery-container">
{family_data['gallery_html']}
</div>
<!-- FAQ Section -->
<div class="faq-section" itemscope="" itemtype="https://schema.org/FAQPage">
<h2 style="font-size: 36px; font-weight: 400; text-align: center; margin-bottom: 40px; color: #2a2a2a;">Frequently Asked Questions</h2>
{family_data['faq_html']}
</div>
<!-- Related Posts -->
<div class="related-posts">
<a class="related-post" href="/blog/yanez-family-pompano-pier">
<div style="padding: 30px;">
<h3 style="font-size: 20px; font-weight: 500; margin-bottom: 10px;">Yanez Family | Pompano Beach Pier</h3>
<p style="font-size: 14px; color: #666;">Golden hour magic at South Florida's iconic pier</p>
</div>
</a>
<a class="related-post" href="/blog/50s-anniversary-maria-antonio">
<div style="padding: 30px;">
<h3 style="font-size: 20px; font-weight: 500; margin-bottom: 10px;">50's Anniversary | Maria + Antonio</h3>
<p style="font-size: 14px; color: #666;">Celebrating love and legacy with timeless anniversary portraits</p>
</div>
</a>
<a class="related-post" href="/portraits/booking">
<div style="padding: 30px;">
<h3 style="font-size: 20px; font-weight: 500; margin-bottom: 10px;">Book Your Family Session</h3>
<p style="font-size: 14px; color: #666;">Create timeless family portraits at iconic South Florida locations</p>
</div>
</a>
</div>
</div>
<!-- GLightbox JS -->
<script src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script>
<script>
    const lightbox = GLightbox({{
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
    }});
</script>
</body>
</html>
'''
    return html

# Generate image IDs from Perales gallery (from the crawler data earlier)
perales_image_ids = [
    "t8rnM4C", "dGx4RMd", "SZkn7P2", "55hxzKb", "VPjMtNg",
    "c8qvzxW", "DLLj9sj", "Hc59JWC", "dCdTQcx", "XrBXBZX",
    "zZ3pMv7", "DrqdbdS", "W8N34nc", "hG8DWvT", "Kw7kHvs",
    "RsxKp36", "ntgkkv3", "QCJJtVg", "3g8VcsQ", "8vctNXK",
    "KrMfb2J", "BHbVJG6", "jGnRxn7", "wKjXH8S", "SRG4nWv",
    "3HpndGG", "XcLnXWH", "6pBxWx6", "9DJDbVS", "vwRgtQV"
]

print("✅ Blog post creation script ready")
print(f"   Perales image IDs: {len(perales_image_ids)}")
print("\nTemplate structure includes:")
print("  - Full SEO optimization")
print("  - Hero section")
print("  - Storytelling sections")
print("  - Gallery with lightbox")
print("  - FAQ section")
print("  - Related posts")
