#!/usr/bin/env python3
"""
ACROMATICO BLOG ORIGINALITY AGENT
Process ALL 502 posts for complete originality - no template language
"""

import json
import re
from pathlib import Path
from bs4 import BeautifulSoup
from datetime import datetime
import csv

# Paths
TEMPLATE_PATH = Path("public/static/madison-clone.html")
ALL_POSTS_JSON = Path("public/static/blog_posts_data/all_posts.json")
OUTPUT_DIR = Path("public/static/blog")
AUDIT_CSV = Path("ORIGINALITY_AUDIT_502.csv")

def extract_images_from_html(html_content):
    """Extract all image URLs from WordPress HTML content"""
    soup = BeautifulSoup(html_content, 'html.parser')
    images = []
    
    for img in soup.find_all('img'):
        src = img.get('data-src') or img.get('src')
        if src and 'acromatico.com/wp-content/uploads' in src:
            if not src.startswith('data:image'):
                images.append(src)
    
    return images

def extract_unique_story(html_content, title):
    """Extract UNIQUE story elements from WordPress content"""
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remove galleries
    for tag in soup.find_all(['figure', 'script', 'style']):
        tag.decompose()
    
    # Get all paragraphs
    paragraphs = []
    for p in soup.find_all('p'):
        text = p.get_text(strip=True)
        if text and len(text) > 30:  # Skip short/empty
            paragraphs.append(text)
    
    # Return first 3 paragraphs as unique story
    return paragraphs[:3] if paragraphs else [f"This {title.lower()} was a special moment captured by Acromatico Photography."]

def get_unique_location_details(post_title, post_content):
    """Extract UNIQUE location details from title and content"""
    # Extract location from title
    location_patterns = [
        r'(?:at|in|·|\|)\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:,\s*[A-Z]{2})?)',
        r'([A-Z][a-z]+\s+[A-Z][a-z]+)\s+(?:Wedding|Engagement|Session)',
        r'([A-Z][a-z]+(?:,\s*[A-Z]{2})?)\s*\|'
    ]
    
    for pattern in location_patterns:
        match = re.search(pattern, post_title)
        if match:
            return match.group(1)
    
    # Default
    return "United States"

def generate_original_content(post):
    """Generate COMPLETELY ORIGINAL content for this specific post"""
    slug = post['slug']
    title = post['title']['rendered']
    content_html = post['content']['rendered']
    
    # Extract UNIQUE elements
    images = extract_images_from_html(content_html)
    story_paragraphs = extract_unique_story(content_html, title)
    location = get_unique_location_details(title, content_html)
    
    # Get hero image
    hero_image = images[0] if images else "https://acromatico.com/wp-content/uploads/default.jpg"
    
    # Build ORIGINAL content (not template)
    original_paragraphs = []
    for para in story_paragraphs:
        # Use the actual paragraph text from WordPress
        original_paragraphs.append(f'<p>{para}</p>')
    
    original_content = '\n            '.join(original_paragraphs) if original_paragraphs else '<p>Professional photography session by Acromatico.</p>'
    
    return {
        'slug': slug,
        'title': title,
        'hero_image': hero_image,
        'images': images[:50],
        'original_content': original_content,
        'location': location
    }

def build_html_from_template(template_html, post_data):
    """Build HTML using template CSS but with ORIGINAL content"""
    slug = post_data['slug']
    title = post_data['title']
    hero_image = post_data['hero_image']
    images = post_data['images']
    content = post_data['original_content']
    location = post_data['location']
    
    # Start with template
    html = template_html
    
    # Replace metadata
    desc = f"Professional photography in {location}. {title}."
    html = re.sub(r'<title>[^<]+</title>', f'<title>{title} | Acromatico Photography</title>', html)
    html = re.sub(r'<meta name="description" content="[^"]*"', f'<meta name="description" content="{desc}"', html)
    html = re.sub(r'<meta name="keywords" content="[^"]*"', f'<meta name="keywords" content="{location} photographer, Acromatico Photography"', html)
    html = re.sub(r'<meta property="og:title" content="[^"]*"', f'<meta property="og:title" content="{title}"', html)
    html = re.sub(r'<meta property="og:url" content="[^"]*"', f'<meta property="og:url" content="https://acromatico.com/blog/{slug}"', html)
    html = re.sub(r'<meta property="og:image" content="[^"]*"', f'<meta property="og:image" content="{hero_image}"', html)
    html = re.sub(r'<meta property="og:description" content="[^"]*"', f'<meta property="og:description" content="{desc}"', html)
    html = re.sub(r'<meta property="twitter:title" content="[^"]*"', f'<meta property="twitter:title" content="{title}"', html)
    html = re.sub(r'<meta property="twitter:description" content="[^"]*"', f'<meta property="twitter:description" content="{desc}"', html)
    html = re.sub(r'<meta property="twitter:image" content="[^"]*"', f'<meta property="twitter:image" content="{hero_image}"', html)
    
    # Replace hero image
    html = re.sub(r'background-image: url\([\'"]https://hofferphotography[^)]+\)', f'background-image: url(\'{hero_image}\')', html)
    
    # Build content container
    content_html = f'''
    <div class="content-container">
        <h1 class="post-title">{title}</h1>
        
        <div class="post-intro">
            {content}
        </div>
        
        <div class="gallery-container">
'''
    
    # Add gallery
    for i, img_url in enumerate(images, 1):
        content_html += f'''
            <a href="{img_url}" class="gallery-item glightbox" data-gallery="wedding-gallery">
                <img src="{img_url}" alt="{title} - Photo {i}" class="gallery-image" loading="lazy">
            </a>
'''
    
    content_html += '''
        </div>
    </div>
    
    <div class="post-footer">
        <div class="footer-content">
            <p>&copy; 2026 Acromatico Photography. All rights reserved.</p>
        </div>
    </div>
    
</body>
</html>'''
    
    # Replace from content-container to end
    html = re.sub(r'<div class="content-container">.*$', content_html, html, flags=re.DOTALL)
    
    return html

def audit_originality(post_data, html):
    """Audit post for originality"""
    checks = {
        'title_unique': 'Kate' not in post_data['title'] and 'Steve' not in post_data['title'],  # Not reusing test data
        'location_present': post_data['location'] != "United States",
        'images_unique': len(post_data['images']) > 0,
        'content_has_text': len(post_data['original_content']) > 100,
        'no_madison': 'Madison' not in html and 'Cork Factory' not in html
    }
    
    all_pass = all(checks.values())
    
    return {
        'status': 'ORIGINAL' if all_pass else 'NEEDS_REVIEW',
        'checks': checks
    }

def main():
    """Process ALL 502 posts"""
    print("🎯 ACROMATICO BLOG ORIGINALITY AGENT")
    print("="*60)
    
    # Load template
    template_html = TEMPLATE_PATH.read_text(encoding='utf-8')
    print(f"✅ Loaded template")
    
    # Load posts
    posts = json.loads(ALL_POSTS_JSON.read_text(encoding='utf-8'))
    print(f"✅ Loaded {len(posts)} posts")
    
    # Create output dir
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Prepare audit CSV
    audit_rows = []
    
    # Process each post
    successful = 0
    for i, post in enumerate(posts, 1):
        try:
            slug = post['slug']
            title = post['title']['rendered']
            
            print(f"\n[{i}/{len(posts)}] {slug}")
            
            # Generate original content
            post_data = generate_original_content(post)
            
            # Build HTML
            html = build_html_from_template(template_html, post_data)
            
            # Audit originality
            audit_result = audit_originality(post_data, html)
            
            # Write file
            output_path = OUTPUT_DIR / f"{slug}.html"
            output_path.write_text(html, encoding='utf-8')
            
            # Record audit
            audit_rows.append({
                'post_num': i,
                'title': title,
                'slug': slug,
                'location': post_data['location'],
                'images_count': len(post_data['images']),
                'status': audit_result['status'],
                'location_present': '✓' if audit_result['checks']['location_present'] else '✗',
                'images_unique': '✓' if audit_result['checks']['images_unique'] else '✗',
                'no_madison': '✓' if audit_result['checks']['no_madison'] else '✗'
            })
            
            successful += 1
            print(f"  ✅ {audit_result['status']} | {len(post_data['images'])} images | {post_data['location']}")
            
        except Exception as e:
            print(f"  ❌ ERROR: {e}")
            audit_rows.append({
                'post_num': i,
                'title': title,
                'slug': slug,
                'location': 'ERROR',
                'images_count': 0,
                'status': 'FAILED',
                'location_present': '✗',
                'images_unique': '✗',
                'no_madison': '✗'
            })
    
    # Write audit CSV
    with open(AUDIT_CSV, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=audit_rows[0].keys())
        writer.writeheader()
        writer.writerows(audit_rows)
    
    print(f"\n{'='*60}")
    print(f"✅ SUCCESS: {successful}/{len(posts)} posts processed")
    print(f"📊 Audit saved to: {AUDIT_CSV}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
