#!/usr/bin/env python3
"""
Generate all XML sitemaps for Acromatico
- sitemap.xml (main index)
- sitemap-pages.xml (static pages)
- sitemap-blog.xml (all 502 blog posts)
- sitemap-images.xml (all blog images)
"""

import os
import json
import re
from datetime import datetime
from pathlib import Path
from bs4 import BeautifulSoup

BASE_URL = "https://acromatico.com"
BLOG_DIR = Path("/home/user/webapp/public/static/blog")
POSTS_JSON = Path("/home/user/webapp/blog_posts.json")
OUTPUT_DIR = Path("/home/user/webapp/public")

def get_current_date():
    """Get current date in W3C format"""
    return datetime.now().strftime("%Y-%m-%d")

def generate_sitemap_index():
    """Generate main sitemap index"""
    current_date = get_current_date()
    
    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>{BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>{current_date}</lastmod>
  </sitemap>
  <sitemap>
    <loc>{BASE_URL}/sitemap-blog.xml</loc>
    <lastmod>{current_date}</lastmod>
  </sitemap>
  <sitemap>
    <loc>{BASE_URL}/sitemap-images.xml</loc>
    <lastmod>{current_date}</lastmod>
  </sitemap>
</sitemapindex>"""
    
    output_path = OUTPUT_DIR / "sitemap.xml"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(xml)
    
    print(f"✅ Generated sitemap.xml")
    return xml

def generate_pages_sitemap():
    """Generate sitemap for static pages"""
    current_date = get_current_date()
    
    # Define static pages with priority and change frequency
    pages = [
        {"loc": f"{BASE_URL}/", "priority": "1.0", "changefreq": "weekly"},
        {"loc": f"{BASE_URL}/blog", "priority": "0.9", "changefreq": "daily"},
        {"loc": f"{BASE_URL}/photography", "priority": "0.9", "changefreq": "monthly"},
        {"loc": f"{BASE_URL}/portraits", "priority": "0.8", "changefreq": "monthly"},
        {"loc": f"{BASE_URL}/education", "priority": "0.9", "changefreq": "weekly"},
        {"loc": f"{BASE_URL}/contact", "priority": "0.7", "changefreq": "monthly"},
        {"loc": f"{BASE_URL}/our-story", "priority": "0.6", "changefreq": "monthly"},
    ]
    
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for page in pages:
        xml += f"""  <url>
    <loc>{page['loc']}</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>{page['changefreq']}</changefreq>
    <priority>{page['priority']}</priority>
  </url>\n"""
    
    xml += '</urlset>'
    
    output_path = OUTPUT_DIR / "sitemap-pages.xml"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(xml)
    
    print(f"✅ Generated sitemap-pages.xml ({len(pages)} pages)")
    return xml

def generate_blog_sitemap():
    """Generate sitemap for all blog posts"""
    current_date = get_current_date()
    
    # Get all HTML files in blog directory
    blog_files = list(BLOG_DIR.glob("*.html"))
    
    # Filter out template files
    blog_posts = [f for f in blog_files if not f.name.startswith('blog-') and not f.name in ['NEW-CONTENT-SECTIONS.html', 'madison-clone.html']]
    
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for html_file in sorted(blog_posts):
        slug = html_file.stem  # filename without .html extension
        
        # Get file modification date
        try:
            mtime = datetime.fromtimestamp(html_file.stat().st_mtime)
            post_date = mtime.strftime("%Y-%m-%d")
        except:
            post_date = current_date
        
        xml += f"""  <url>
    <loc>{BASE_URL}/static/blog/{slug}.html</loc>
    <lastmod>{post_date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n"""
    
    xml += '</urlset>'
    
    output_path = OUTPUT_DIR / "sitemap-blog.xml"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(xml)
    
    print(f"✅ Generated sitemap-blog.xml ({len(blog_posts)} posts)")
    return xml

def extract_images_from_html(html_path):
    """Extract all image URLs from a blog post HTML"""
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
        
        images = []
        
        # Find all img tags
        for img in soup.find_all('img'):
            src = img.get('src', '')
            alt = img.get('alt', '')
            
            if src and src.startswith('http'):
                images.append({
                    'loc': src,
                    'caption': alt,
                    'title': alt
                })
        
        # Find all gallery items with links to images
        for link in soup.find_all('a', class_='gallery-item'):
            href = link.get('href', '')
            img = link.find('img')
            alt = img.get('alt', '') if img else ''
            
            if href and href.startswith('http'):
                images.append({
                    'loc': href,
                    'caption': alt,
                    'title': alt
                })
        
        return images
    except Exception as e:
        print(f"  Warning: Could not extract images from {html_path.name}: {e}")
        return []

def generate_images_sitemap():
    """Generate sitemap for all blog images"""
    current_date = get_current_date()
    
    # Get all HTML files in blog directory
    blog_files = list(BLOG_DIR.glob("*.html"))
    
    # Filter out template files
    blog_posts = [f for f in blog_files if not f.name.startswith('blog-') and not f.name in ['NEW-CONTENT-SECTIONS.html', 'madison-clone.html']]
    
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'
    
    total_images = 0
    processed_posts = 0
    
    for html_file in blog_posts:
        slug = html_file.stem
        
        # Extract images from this post
        images = extract_images_from_html(html_file)
        
        if images:
            page_url = f"{BASE_URL}/static/blog/{slug}.html"
            
            xml += f"""  <url>
    <loc>{page_url}</loc>\n"""
            
            for img in images:
                xml += f"""    <image:image>
      <image:loc>{img['loc']}</image:loc>\n"""
                
                if img.get('caption'):
                    xml += f"""      <image:caption><![CDATA[{img['caption']}]]></image:caption>\n"""
                
                if img.get('title'):
                    xml += f"""      <image:title><![CDATA[{img['title']}]]></image:title>\n"""
                
                xml += f"""    </image:image>\n"""
            
            xml += """  </url>\n"""
            
            total_images += len(images)
            processed_posts += 1
        
        # Progress update every 50 posts
        if processed_posts % 50 == 0:
            print(f"  Processed {processed_posts}/{len(blog_posts)} posts, {total_images} images...")
    
    xml += '</urlset>'
    
    output_path = OUTPUT_DIR / "sitemap-images.xml"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(xml)
    
    print(f"✅ Generated sitemap-images.xml ({processed_posts} posts, {total_images} images)")
    return xml

def main():
    print("🚀 Generating Acromatico sitemaps...")
    print()
    
    # Generate all sitemaps
    generate_pages_sitemap()
    generate_blog_sitemap()
    generate_images_sitemap()
    generate_sitemap_index()
    
    print()
    print("✅ ALL SITEMAPS GENERATED!")
    print()
    print("📁 Output files:")
    print(f"  • {OUTPUT_DIR}/sitemap.xml (main index)")
    print(f"  • {OUTPUT_DIR}/sitemap-pages.xml (static pages)")
    print(f"  • {OUTPUT_DIR}/sitemap-blog.xml (blog posts)")
    print(f"  • {OUTPUT_DIR}/sitemap-images.xml (all images)")
    print()
    print("🔗 Public URLs:")
    print(f"  • {BASE_URL}/sitemap.xml")
    print(f"  • {BASE_URL}/sitemap-pages.xml")
    print(f"  • {BASE_URL}/sitemap-blog.xml")
    print(f"  • {BASE_URL}/sitemap-images.xml")
    print()
    print("📝 Next steps:")
    print("  1. Verify sitemaps are accessible at public URLs")
    print("  2. Submit all sitemaps to Google Search Console")
    print("  3. Validate XML syntax (should have zero errors)")
    print("  4. Monitor indexing in GSC Performance report")

if __name__ == "__main__":
    main()
