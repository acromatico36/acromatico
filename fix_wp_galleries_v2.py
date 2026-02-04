#!/usr/bin/env python3
"""
Fix WordPress gallery markup - simplified version
Convert data-src to src and remove WordPress block wrapper markup
"""

import re
from pathlib import Path

def fix_blog_post(file_path):
    """Fix WordPress gallery markup in a blog post"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract title for gallery
        title_match = re.search(r'<h1 class="hero-title">([^<]+)</h1>', content)
        title = title_match.group(1) if title_match else "Wedding"
        
        # Find all image URLs (both src and data-src)
        images = []
        
        # Match images with src attribute (first image)
        src_matches = re.finditer(r'<img[^>]+src="(https://acromatico\.com/wp-content/uploads/[^"]+)"[^>]*>', content)
        for match in src_matches:
            url = match.group(1)
            if 'data:image/gif' not in url:
                images.append(url)
        
        # Match images with data-src attribute (lazy loaded)
        datasrc_matches = re.finditer(r'<img[^>]+data-src="(https://acromatico\.com/wp-content/uploads/[^"]+)"[^>]*>', content)
        for match in datasrc_matches:
            url = match.group(1)
            if url not in images:
                images.append(url)
        
        if not images:
            print(f"  ⚠️  No images found")
            return False
        
        print(f"  📸 Found {len(images)} images")
        
        # Extract the intro paragraph
        intro_match = re.search(r'<div class="content-container">\s*(<p>.*?</p>)', content, re.DOTALL)
        intro_text = intro_match.group(1) if intro_match else ""
        
        # Build proper gallery HTML
        gallery_html = '<div class="gallery-container">\n'
        for i, img_url in enumerate(images, 1):
            gallery_html += f'''<a class="gallery-item glightbox" data-gallery="wedding-gallery" href="{img_url}">
<img alt="{title} - Photo {i}" class="gallery-image" loading="lazy" src="{img_url}"/>
</a>
'''
        gallery_html += '</div>'
        
        # Replace everything from content-container to related-posts-section
        pattern = r'(<div class="content-container">).*?(<div class="related-posts-section">)'
        
        new_content = f'''\\1
{intro_text}
{gallery_html}
</div>
\\2'''
        
        new_html = re.sub(pattern, new_content, content, flags=re.DOTALL)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_html)
        
        return True
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    blog_dir = Path('/home/user/webapp/public/static/blog')
    
    # Target posts
    target_posts = [
        'rustic-barn-wedding-at-rolling-meadow-farm-sade-luke.html',
        'hudson-valley-barn-engagement-kate-steve.html'
    ]
    
    print("🔧 FIXING WORDPRESS GALLERIES (V2)")
    print("=" * 60)
    
    fixed = 0
    for post_name in target_posts:
        post_path = blog_dir / post_name
        print(f"\n📝 {post_name}")
        if post_path.exists():
            if fix_blog_post(post_path):
                print(f"  ✅ FIXED!")
                fixed += 1
        else:
            print(f"  ⚠️  File not found")
    
    print("\n" + "=" * 60)
    print(f"✅ COMPLETED: {fixed}/{len(target_posts)} posts fixed")
    print("=" * 60)

if __name__ == '__main__':
    main()
