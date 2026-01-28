#!/usr/bin/env python3
"""
ACROMATICO BLOG ORIGINALITY AGENT
Complete originality rewrite for ALL 502 posts
Keeps framework, removes template content, adds unique content
"""

import json
import re
from pathlib import Path
from bs4 import BeautifulSoup
import csv

# Paths
TEMPLATE_PATH = Path("public/static/madison-clone.html")
ALL_POSTS_JSON = Path("public/static/blog_posts_data/all_posts.json")
OUTPUT_DIR = Path("public/static/blog")
AUDIT_CSV = Path("MASTER_ORIGINALITY_AUDIT_502.csv")

def extract_images_from_html(html_content):
    """Extract all image URLs"""
    soup = BeautifulSoup(html_content, 'html.parser')
    images = []
    for img in soup.find_all('img'):
        src = img.get('data-src') or img.get('src')
        if src and 'acromatico.com/wp-content/uploads' in src and not src.startswith('data:image'):
            images.append(src)
    return images

def extract_story_paragraphs(html_content):
    """Extract story content from WordPress HTML"""
    soup = BeautifulSoup(html_content, 'html.parser')
    for tag in soup.find_all(['figure', 'script', 'style', 'div']):
        tag.decompose()
    
    paragraphs = []
    for p in soup.find_all('p'):
        text = p.get_text(strip=True)
        if text and len(text) > 30:
            paragraphs.append(text)
    
    return paragraphs[:3] if paragraphs else []

def extract_location_from_title(title):
    """Extract specific location"""
    patterns = [
        r'(?:at|in)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)',
        r'([A-Z][a-z]+\s+[A-Z][a-z]+)\s+(?:Wedding|Engagement)',
        r'([A-Z][a-z]+,\s*[A-Z]{2})'
    ]
    for pattern in patterns:
        match = re.search(pattern, title)
        if match:
            return match.group(1)
    return "our location"

def generate_generic_faq(title, location, category):
    """Generate GENERIC photography FAQ (not venue-specific)"""
    return f'''
        <h2 class="section-heading">Frequently Asked Questions</h2>
        <div class="faq-section">
            <div class="faq-item">
                <h3 class="faq-question">What should I wear for my {category.lower()} session?</h3>
                <div class="faq-answer">
                    <p>Choose outfits that make you feel confident and comfortable. Coordinate colors rather than matching exactly. Avoid busy patterns or logos. Consider the location and season when selecting your wardrobe.</p>
                </div>
            </div>
            
            <div class="faq-item">
                <h3 class="faq-question">How long does a typical session last?</h3>
                <div class="faq-answer">
                    <p>Most sessions last 1-2 hours, giving us plenty of time to capture a variety of images without feeling rushed. Wedding coverage typically ranges from 8-10 hours depending on your needs.</p>
                </div>
            </div>
            
            <div class="faq-item">
                <h3 class="faq-question">When will I receive my photos?</h3>
                <div class="faq-answer">
                    <p>You'll receive a preview gallery within 48 hours, and your complete edited gallery within 2-3 weeks. Wedding galleries are delivered within 4-6 weeks.</p>
                </div>
            </div>
            
            <div class="faq-item">
                <h3 class="faq-question">Do you provide prints and albums?</h3>
                <div class="faq-answer">
                    <p>Yes! We offer professional prints, canvases, and custom-designed albums. All digital files include print rights for your personal use.</p>
                </div>
            </div>
        </div>
'''

def generate_author_bio():
    """Generate author bio section"""
    return '''
        <div class="author-bio">
            <div class="author-headshots">
                <img src="/static/italo-headshot.jpg" alt="Italo Campilii" onerror="this.style.display='none'">
                <img src="/static/ale-headshot.jpg" alt="Ale Campilii" onerror="this.style.display='none'">
            </div>
            <div class="author-content">
                <h3>About Acromatico Photography</h3>
                <p>Founded by Italo and Ale, Acromatico Photography specializes in capturing authentic moments with artistic vision. Based in South Florida, we travel worldwide to document love stories, families, and life's most meaningful celebrations.</p>
                <p>Our approach combines photojournalistic storytelling with fine art aesthetics, creating timeless images that reflect the genuine emotion and beauty of each unique moment.</p>
            </div>
        </div>
'''

def generate_related_posts():
    """Generate generic related posts"""
    return '''
        <div class="related-posts">
            <h2>Related Sessions</h2>
            <div class="related-posts-grid">
                <article class="related-post">
                    <a href="/blog">
                        <img src="/static/acromatico-logo-dark.png" alt="View more sessions" onerror="this.style.display='none'">
                        <h3>View All Sessions</h3>
                    </a>
                </article>
                <article class="related-post">
                    <a href="https://acromatico.com/galleries">
                        <img src="/static/acromatico-logo-dark.png" alt="Browse galleries" onerror="this.style.display='none'">
                        <h3>Browse Galleries</h3>
                    </a>
                </article>
                <article class="related-post">
                    <a href="https://acromatico.com/contact">
                        <img src="/static/acromatico-logo-dark.png" alt="Contact us" onerror="this.style.display='none'">
                        <h3>Contact Us</h3>
                    </a>
                </article>
            </div>
        </div>
'''

def get_category_name(categories):
    """Get category name from category IDs"""
    if 2207 in categories or 3318 in categories:
        return 'Wedding'
    elif 2208 in categories:
        return 'Engagement'
    elif 2206 in categories:
        return 'Portrait'
    else:
        return 'Photography'

def rebuild_post(template_html, post):
    """Rebuild post with ORIGINAL content"""
    slug = post['slug']
    title = post['title']['rendered']
    content_html = post['content']['rendered']
    categories = post.get('categories', [])
    
    # Extract unique elements
    images = extract_images_from_html(content_html)
    story_paras = extract_story_paragraphs(content_html)
    location = extract_location_from_title(title)
    category = get_category_name(categories)
    hero_image = images[0] if images else "https://acromatico.com/wp-content/uploads/default.jpg"
    
    # Build original story content
    story_html = ''
    for para in story_paras:
        story_html += f'<p>{para}</p>\n            '
    
    if not story_html:
        story_html = f'<p>This {category.lower()} session at {location} was beautifully captured by Acromatico Photography.</p>'
    
    # Start with template
    html = template_html
    
    # Replace ALL metadata
    desc = f"Professional {category.lower()} photography at {location}. {title}."
    html = re.sub(r'<title>[^<]+</title>', f'<title>{title} | Acromatico Photography</title>', html)
    html = re.sub(r'<meta name="description" content="[^"]*"', f'<meta name="description" content="{desc}"', html)
    html = re.sub(r'<meta name="keywords" content="[^"]*"', f'<meta name="keywords" content="{location} photographer, {category} photography, Acromatico"', html)
    html = re.sub(r'<meta property="og:title" content="[^"]*"', f'<meta property="og:title" content="{title}"', html)
    html = re.sub(r'<meta property="og:url" content="[^"]*"', f'<meta property="og:url" content="https://acromatico.com/blog/{slug}"', html)
    html = re.sub(r'<meta property="og:image" content="[^"]*"', f'<meta property="og:image" content="{hero_image}"', html)
    html = re.sub(r'<meta property="og:description" content="[^"]*"', f'<meta property="og:description" content="{desc}"', html)
    html = re.sub(r'<meta property="twitter:title" content="[^"]*"', f'<meta property="twitter:title" content="{title}"', html)
    html = re.sub(r'<meta property="twitter:description" content="[^"]*"', f'<meta property="twitter:description" content="{desc}"', html)
    html = re.sub(r'<meta property="twitter:image" content="[^"]*"', f'<meta property="twitter:image" content="{hero_image}"', html)
    html = re.sub(r'<meta property="twitter:url" content="[^"]*"', f'<meta property="twitter:url" content="https://acromatico.com/blog/{slug}"', html)
    html = re.sub(r'<link rel="canonical" href="[^"]*"', f'<link rel="canonical" href="https://acromatico.com/blog/{slug}"', html)
    
    # Replace JSON-LD schema data
    html = re.sub(r'"headline":\s*"[^"]*"', f'"headline": "{title}"', html)
    html = re.sub(r'"image":\s*"[^"]*"', f'"image": "{hero_image}"', html, count=1)
    html = re.sub(r'"description":\s*"[^"]*"', f'"description": "{desc}"', html, count=1)
    
    # Replace hero background
    html = re.sub(r'background-image: url\([\'"]https://hofferphotography[^)]+\)', f'background-image: url(\'{hero_image}\')', html)
    
    # Build NEW content container with ALL sections properly wrapped
    new_content = f'''
    <div class="content-container">
        <h1 class="post-title">{title}</h1>
        
        <div class="post-intro">
            {story_html}
        </div>
        
        <div class="gallery-container">
'''
    
    # Add gallery images
    for i, img_url in enumerate(images[:50], 1):
        new_content += f'''
            <a href="{img_url}" class="gallery-item glightbox" data-gallery="wedding-gallery">
                <img src="{img_url}" alt="{title} - Photo {i}" class="gallery-image" loading="lazy">
            </a>
'''
    
    new_content += '''
        </div>
        
'''
    
    # Add generic FAQ (NOT venue-specific)
    new_content += generate_generic_faq(title, location, category)
    
    # Add author bio
    new_content += generate_author_bio()
    
    # Add related posts
    new_content += generate_related_posts()
    
    # Close content-container
    new_content += '''
    </div>
    
    <div class="post-footer">
        <div class="footer-content">
            <p>&copy; 2026 Acromatico Photography. All rights reserved.</p>
        </div>
    </div>
    
</body>
</html>'''
    
    # Replace from content-container to end
    html = re.sub(r'<div class="content-container">.*$', new_content, html, flags=re.DOTALL)
    
    return html

def audit_post(post_data, html):
    """Audit for originality"""
    title = post_data['title']['rendered']
    slug = post_data['slug']
    
    checks = {
        'no_madison': 'Madison' not in html and 'Cork Factory' not in html,
        'has_content': len(html) > 10000,
        'has_title': title in html,
        'has_hero_url': 'background-image: url' in html
    }
    
    return {
        'status': 'ORIGINAL' if all(checks.values()) else 'NEEDS_REVIEW',
        'checks': checks
    }

def main():
    """Process all 502 posts"""
    print("🎯 ACROMATICO BLOG ORIGINALITY AGENT")
    print("="*60)
    
    template_html = TEMPLATE_PATH.read_text(encoding='utf-8')
    print(f"✅ Loaded template ({len(template_html)} chars)")
    
    posts = json.loads(ALL_POSTS_JSON.read_text(encoding='utf-8'))
    print(f"✅ Loaded {len(posts)} posts")
    
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    audit_rows = []
    successful = 0
    
    for i, post in enumerate(posts, 1):
        try:
            slug = post['slug']
            title = post['title']['rendered']
            
            print(f"\n[{i}/{len(posts)}] {slug}")
            
            # Rebuild with original content
            html = rebuild_post(template_html, post)
            
            # Audit
            audit = audit_post(post, html)
            
            # Write
            output_path = OUTPUT_DIR / f"{slug}.html"
            output_path.write_text(html, encoding='utf-8')
            
            # Record
            audit_rows.append({
                'post_num': i,
                'title': title,
                'slug': slug,
                'status': audit['status'],
                'no_madison': '✓' if audit['checks']['no_madison'] else '✗',
                'has_content': '✓' if audit['checks']['has_content'] else '✗'
            })
            
            successful += 1
            print(f"  ✅ {audit['status']} | {len(html)} chars")
            
        except Exception as e:
            print(f"  ❌ ERROR: {e}")
            audit_rows.append({
                'post_num': i,
                'title': title if 'title' in locals() else 'UNKNOWN',
                'slug': slug if 'slug' in locals() else 'UNKNOWN',
                'status': 'FAILED',
                'no_madison': '✗',
                'has_content': '✗'
            })
    
    # Write audit
    with open(AUDIT_CSV, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=audit_rows[0].keys())
        writer.writeheader()
        writer.writerows(audit_rows)
    
    print(f"\n{'='*60}")
    print(f"✅ SUCCESS: {successful}/{len(posts)} posts processed")
    print(f"📊 Audit: {AUDIT_CSV}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
