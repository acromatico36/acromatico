#!/usr/bin/env python3
"""
Rebuild all blog posts using Madison-clone framework with REAL content from all_posts.json
"""

import json
import re
from pathlib import Path
from bs4 import BeautifulSoup
from datetime import datetime

# Paths
TEMPLATE_PATH = Path("public/static/madison-clone.html")
ALL_POSTS_JSON = Path("public/static/blog_posts_data/all_posts.json")
OUTPUT_DIR = Path("public/static/blog")

def extract_images_from_html(html_content):
    """Extract all image URLs from WordPress HTML content"""
    soup = BeautifulSoup(html_content, 'html.parser')
    images = []
    
    # Find all img tags
    for img in soup.find_all('img'):
        src = img.get('data-src') or img.get('src')
        if src and 'acromatico.com/wp-content/uploads' in src:
            # Clean the URL (remove lazy load placeholders)
            if not src.startswith('data:image'):
                images.append(src)
    
    return images

def extract_text_content(html_content):
    """Extract clean text content from WordPress HTML"""
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remove figure/gallery blocks
    for tag in soup.find_all(['figure', 'script', 'style']):
        tag.decompose()
    
    # Get text from paragraphs
    paragraphs = []
    for p in soup.find_all('p'):
        text = p.get_text(strip=True)
        if text and len(text) > 20:  # Skip empty or very short paragraphs
            paragraphs.append(f'<p>{text}</p>')
    
    return '\n'.join(paragraphs) if paragraphs else '<p>No content available.</p>'

def get_category_from_post(post):
    """Determine category from post data"""
    categories = post.get('categories', [])
    # Common category IDs from WordPress
    if 2207 in categories:
        return 'Wedding'
    elif 2208 in categories:
        return 'Engagement'
    elif 2206 in categories:
        return 'Portrait'
    else:
        return 'Wedding'

def get_location_from_title(title):
    """Extract location from title"""
    # Common patterns: "City, State", "Venue Name - City"
    match = re.search(r'(?:in|at|·|\|)\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:,\s*[A-Z]{2})?)', title)
    if match:
        return match.group(1)
    return "United States"

def format_date(date_str):
    """Format WordPress date to readable format"""
    try:
        dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
        return dt.strftime('%B %d, %Y')
    except:
        return "2024"

def rebuild_post(template_html, post):
    """Rebuild a single post with real content"""
    slug = post['slug']
    title = post['title']['rendered']
    content_html = post['content']['rendered']
    date = post['date']
    
    # Extract data
    images = extract_images_from_html(content_html)
    text_content = extract_text_content(content_html)
    category = get_category_from_post(post)
    location = get_location_from_title(title)
    formatted_date = format_date(date)
    
    # Get hero image (first image or featured media)
    hero_image = images[0] if images else "https://acromatico.com/wp-content/uploads/default-hero.jpg"
    
    # Start with template
    html = template_html
    
    # Replace title tag - match the actual format from template
    html = re.sub(r'<title>[^<]+</title>',
                 f'<title>{title} | Acromatico Photography</title>', html)
    
    # Replace ALL Open Graph and Twitter Card meta tags
    html = re.sub(r'<meta property="og:title" content="[^"]*"',
                 f'<meta property="og:title" content="{title}"', html)
    
    html = re.sub(r'<meta property="og:url" content="[^"]*"',
                 f'<meta property="og:url" content="https://acromatico.com/blog/{slug}"', html)
    
    html = re.sub(r'<meta property="og:image" content="[^"]*"',
                 f'<meta property="og:image" content="{hero_image}"', html)
    
    # Replace ALL meta descriptions
    desc_text = f"Professional {category.lower()} photography in {location}. {title}."
    html = re.sub(r'<meta name="description" content="[^"]*"',
                 f'<meta name="description" content="{desc_text}"', html)
    
    html = re.sub(r'<meta name="keywords" content="[^"]*"',
                 f'<meta name="keywords" content="{location} photographer, {category.lower()} photography, Acromatico Photography"', html)
    
    html = re.sub(r'<meta property="og:description" content="[^"]*"',
                 f'<meta property="og:description" content="{desc_text}"', html)
    
    html = re.sub(r'<meta property="twitter:title" content="[^"]*"',
                 f'<meta property="twitter:title" content="{title}"', html)
    
    html = re.sub(r'<meta property="twitter:description" content="[^"]*"',
                 f'<meta property="twitter:description" content="{desc_text}"', html)
    
    html = re.sub(r'<meta property="twitter:image" content="[^"]*"',
                 f'<meta property="twitter:image" content="{hero_image}"', html)
    
    # Replace JSON-LD structured data
    html = re.sub(r'"headline":\s*"[^"]*"',
                 f'"headline": "{title}"', html)
    
    html = re.sub(r'"image":\s*"[^"]*"',
                 f'"image": "{hero_image}"', html)
    
    html = re.sub(r'"description":\s*"[^"]*(?:Stunning|View|See)[^"]*"',
                 f'"description": "{desc_text}"', html)
    
    # Replace hero image
    html = re.sub(r'background-image: url\([\'"]https://hofferphotography\.com/[^)]+\)',
                 f'background-image: url(\'{hero_image}\')', html)
    
    # Replace title in hero
    html = re.sub(r'<h1 class="hero-title">[^<]+</h1>',
                 f'<h1 class="hero-title">{title}</h1>', html)
    
    # Replace category badge
    html = re.sub(r'<span class="category-badge">[^<]+</span>',
                 f'<span class="category-badge">{category}</span>', html)
    
    # Replace date and location
    html = re.sub(r'<p class="post-meta">[^<]+</p>',
                 f'<p class="post-meta">{formatted_date} • {location}</p>', html)
    
    # Build complete content container with proper closing
    content_container = f'''
    <div class="content-container">
        <h1 class="post-title">{title}</h1>
        
        <div class="post-intro">
            {text_content}
        </div>
        
        <div class="gallery-container">
'''
    
    # Add gallery images
    if images:
        for i, img_url in enumerate(images[:50], 1):
            content_container += f'''
            <a href="{img_url}" class="gallery-item glightbox" data-gallery="wedding-gallery">
                <img src="{img_url}" alt="{title} - Photo {i}" class="gallery-image" loading="lazy">
            </a>
'''
    
    content_container += '''
        </div>
    </div>
    
    <!-- POST FOOTER -->
    <div class="post-footer">
        <div class="footer-content">
            <p>&copy; 2026 Acromatico Photography. All rights reserved.</p>
        </div>
    </div>
    
</body>
</html>'''
    
    # Replace from content-container to end of file
    # This removes ALL Madison template content (FAQ, author-bio, related-posts)
    html = re.sub(r'<div class="content-container">.*$',
                 content_container,
                 html,
                 flags=re.DOTALL)
    

    
    return html

def main():
    """Main rebuild function"""
    print("🔨 REBUILDING ALL BLOG POSTS WITH REAL CONTENT...")
    
    # Load template
    template_html = TEMPLATE_PATH.read_text(encoding='utf-8')
    print(f"✅ Loaded Madison template ({len(template_html)} chars)")
    
    # Load all posts
    posts = json.loads(ALL_POSTS_JSON.read_text(encoding='utf-8'))
    print(f"✅ Loaded {len(posts)} posts from all_posts.json")
    
    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Rebuild each post
    successful = 0
    failed = []
    
    for i, post in enumerate(posts, 1):
        try:
            slug = post['slug']
            title = post['title']['rendered']
            
            print(f"\n[{i}/{len(posts)}] {slug}")
            
            # Rebuild post
            html = rebuild_post(template_html, post)
            
            # Write to file
            output_path = OUTPUT_DIR / f"{slug}.html"
            output_path.write_text(html, encoding='utf-8')
            
            successful += 1
            print(f"  ✅ Generated {len(html)} chars")
            
        except Exception as e:
            failed.append((slug, str(e)))
            print(f"  ❌ ERROR: {e}")
    
    # Summary
    print(f"\n{'='*60}")
    print(f"✅ SUCCESS: {successful}/{len(posts)} posts rebuilt")
    if failed:
        print(f"❌ FAILED: {len(failed)} posts")
        for slug, error in failed[:5]:
            print(f"  - {slug}: {error}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
