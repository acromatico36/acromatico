#!/usr/bin/env python3
"""
Manually fix the two problematic blog posts by copying the 20th Anniversary template
and replacing the content with proper galleries
"""

import json
import re
from pathlib import Path

def extract_images_and_intro(post_data):
    """Extract images and intro paragraph from post JSON"""
    content = post_data['content']['rendered']
    
    # Find all image URLs
    img_urls = re.findall(r'https://acromatico\.com/wp-content/uploads/[^"\'>\s]+\.jpg', content)
    
    # Remove duplicates while preserving order
    seen = set()
    unique_urls = []
    for url in img_urls:
        if url not in seen and 'data:image' not in url:
            seen.add(url)
            unique_urls.append(url)
    
    # Extract first paragraph as intro (before any gallery markup)
    intro_match = re.search(r'<p>(.*?)</p>', content, re.DOTALL)
    intro_text = intro_match.group(0) if intro_match else ""
    
    return unique_urls, intro_text

def create_blog_post_from_template(post_data, template_path, output_path):
    """Create a blog post using the 20th Anniversary template"""
    
    # Read template
    with open(template_path, 'r', encoding='utf-8') as f:
        template_html = f.read()
    
    title = post_data['title']['rendered']
    slug = post_data['slug']
    
    # Extract images and intro
    images, intro_text = extract_images_and_intro(post_data)
    
    print(f"  Title: {title}")
    print(f"  Images: {len(images)}")
    print(f"  Intro: {len(intro_text)} chars")
    
    # Build gallery HTML
    gallery_html = '<div class="gallery-container">\n'
    for i, img_url in enumerate(images, 1):
        gallery_html += f'''<a class="gallery-item glightbox" data-gallery="wedding-gallery" href="{img_url}">
<img alt="{title} - Photo {i}" class="gallery-image" loading="lazy" src="{img_url}"/>
</a>
'''
    gallery_html += '</div>'
    
    # Replace title in template
    new_html = template_html.replace(
        '20th Anniversary Session at Matheson Hammock Park Miami, Florida | Mares Family',
        title
    )
    
    # Replace hero title
    new_html = new_html.replace(
        '<h1 class="hero-title">20th Anniversary Session at Matheson Hammock Park Miami, Florida | Mares Family</h1>',
        f'<h1 class="hero-title">{title}</h1>'
    )
    
    # Replace meta tags
    new_html = new_html.replace(
        '20th Anniversary Photo Session | Mares Family | Acromatico Photography',
        f'{title} | Acromatico Photography'
    )
    
    new_html = new_html.replace(
        'blog/20th-anniversary-photo-session',
        f'blog/{slug}'
    )
    
    # Replace the ENTIRE content section (from content-container to related-posts)
    # Find the content section
    content_pattern = r'(<div class="content-container">).*?(<div class="related-posts-section">)'
    
    new_content_section = f'''\\1
{intro_text}
{gallery_html}
</div>
\\2'''
    
    new_html = re.sub(content_pattern, new_content_section, new_html, flags=re.DOTALL)
    
    # Write output
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    return len(images)

def main():
    # Load all posts
    with open('public/static/blog_posts_data/all_posts.json', 'r') as f:
        all_posts = json.load(f)
    
    # Find the target posts
    target_slugs = {
        'rustic-barn-wedding-at-rolling-meadow-farm-sade-luke': None,
        'hudson-valley-barn-engagement-kate-steve': None
    }
    
    for post in all_posts:
        if post['slug'] in target_slugs:
            target_slugs[post['slug']] = post
    
    template_path = Path('public/static/blog/20th-anniversary-photo-session.html')
    blog_dir = Path('public/static/blog')
    
    print("🔧 MANUALLY FIXING GALLERIES USING TEMPLATE")
    print("=" * 70)
    
    total_images = 0
    for slug, post_data in target_slugs.items():
        if post_data:
            print(f"\n📝 {slug}")
            output_path = blog_dir / f"{slug}.html"
            images_count = create_blog_post_from_template(post_data, template_path, output_path)
            total_images += images_count
            print(f"  ✅ CREATED with {images_count} images!")
    
    print("\n" + "=" * 70)
    print(f"✅ DONE! {total_images} total images across 2 posts")
    print("=" * 70)

if __name__ == '__main__':
    main()
