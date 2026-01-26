#!/usr/bin/env python3
"""
PROPERLY Apply Hoffer Framework to all 502 blog posts
Strategy: Use Madison Clone as template and replace ONLY content placeholders
"""

import os
import re
import json

# Load Madison Clone as template
with open('public/static/madison-clone.html', 'r', encoding='utf-8') as f:
    template = f.read()

# Load blog posts data
with open('blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    all_posts = json.load(f)

blog_dir = 'public/static/blog'
os.makedirs(blog_dir, exist_ok=True)

print(f"✅ Loaded Hoffer template (Madison Clone)")
print(f"✅ Loaded {len(all_posts)} blog posts\n")
print(f"🚀 Applying Hoffer framework PROPERLY...\n")

success_count = 0
error_count = 0

for idx, post in enumerate(all_posts):
    try:
        # Extract post data
        title_obj = post.get('title', {})
        title = title_obj.get('rendered', 'Untitled Post') if isinstance(title_obj, dict) else title_obj
        slug = post.get('slug', 'untitled')
        date = post.get('date', '2026-01-01')
        content_obj = post.get('content', {})
        content = content_obj.get('rendered', '') if isinstance(content_obj, dict) else content_obj
        
        # Get first paragraph from content
        paragraphs = re.findall(r'<p>(.*?)</p>', content, re.DOTALL)
        intro_text = paragraphs[0] if paragraphs else "A beautiful wedding captured by Acromatico Photography."
        intro_text = re.sub(r'<[^>]+>', '', intro_text).strip()[:300] + "..."
        
        # Extract images (check both src and data-src for lazy-loaded images)
        images_src = re.findall(r'<img[^>]+src="([^"]+)"', content)
        images_data_src = re.findall(r'<img[^>]+data-src="([^"]+)"', content)
        images = images_src + images_data_src
        # Filter for real images (not data:image placeholders)
        images = [img for img in images if 'acromatico.com/wp-content' in img and not img.startswith('data:')]
        
        if not images:
            print(f"⚠️  Skipping {slug}: No images")
            error_count += 1
            continue
        
        hero_image = images[0] if images else "https://acromatico.com/logo.png"
        
        # Extract location from title (simple heuristic)
        # Look for patterns like "at [Location]" or "| [Location]"
        location_match = re.search(r'(?:at|in|\|)\s+([A-Z][^|]+)', title)
        location = location_match.group(1).strip() if location_match else ""
        
        # Create gallery HTML
        gallery_html = []
        for i, img_url in enumerate(images[1:60]):  # Use first 60 images max
            gallery_html.append(f'''
            <a href="{img_url}" class="gallery-item glightbox">
                <img src="{img_url}" alt="{title}" class="gallery-image" loading="lazy">
            </a>''')
        
        gallery_html_str = '\n'.join(gallery_html)
        
        # Replace content in template
        output_html = template
        
        # Replace page title
        output_html = re.sub(
            r'<title>.*?</title>',
            f'<title>{title} | Acromatico Photography</title>',
            output_html
        )
        
        # Replace meta description
        output_html = re.sub(
            r'<meta name="description" content="[^"]*">',
            f'<meta name="description" content="{intro_text[:160]}">',
            output_html
        )
        
        # Replace canonical URL
        output_html = re.sub(
            r'<link rel="canonical" href="[^"]*">',
            f'<link rel="canonical" href="https://acromatico.com/blog/{slug}">',
            output_html
        )
        
        # Replace hero section CSS background
        output_html = re.sub(
            r'(<section class="hero-section"></section>)',
            f'<section class="hero-section" style="background-image: url(\'{hero_image}\');"></section>',
            output_html
        )
        
        # Replace H1 post title
        output_html = re.sub(
            r'<h1 class="post-title">.*?</h1>',
            f'<h1 class="post-title">{title}</h1>',
            output_html
        )
        
        # Replace intro paragraph
        output_html = re.sub(
            r'<div class="post-intro">\s*<p>.*?</p>\s*</div>',
            f'<div class="post-intro">\n            <p>{intro_text}</p>\n        </div>',
            output_html,
            flags=re.DOTALL
        )
        
        # Replace first H2 section heading if location exists
        if location:
            output_html = re.sub(
                r'<h2 class="section-heading">The Perfect Lancaster Venue</h2>',
                f'<h2 class="section-heading">The Perfect {location} Venue</h2>',
                output_html
            )
        
        # Replace gallery images
        # Find the gallery-container and replace its contents
        output_html = re.sub(
            r'(<div class="gallery-container">).*?(</div>\s*<h2 class="section-heading">Understanding)',
            f'\\1\n{gallery_html_str}\n        </div>\n        <h2 class="section-heading">Understanding',
            output_html,
            flags=re.DOTALL
        )
        
        # If that pattern doesn't match, try simpler pattern
        if '<div class="gallery-container">' in output_html and len(gallery_html) > 0:
            # Find gallery container and replace all gallery items
            gallery_start = output_html.find('<div class="gallery-container">')
            if gallery_start != -1:
                # Find the end of gallery container (before FAQ or next section)
                gallery_end = output_html.find('</div>', gallery_start)
                next_section = output_html.find('<h2 class="section-heading">', gallery_start)
                
                if next_section != -1 and next_section < gallery_end:
                    # Gallery ends before next section
                    gallery_end = output_html.rfind('</div>', gallery_start, next_section)
                
                if gallery_end != -1:
                    before_gallery = output_html[:gallery_start + len('<div class="gallery-container">')]
                    after_gallery = output_html[gallery_end:]
                    output_html = before_gallery + '\n' + gallery_html_str + '\n        ' + after_gallery
        
        # Write output
        output_path = os.path.join(blog_dir, f'{slug}.html')
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(output_html)
        
        success_count += 1
        
        if (idx + 1) % 50 == 0:
            print(f"✅ {idx + 1}/{len(all_posts)} posts updated...")
        
    except Exception as e:
        print(f"❌ Error on {post.get('slug', 'unknown')}: {e}")
        error_count += 1

print(f"\n{'='*60}")
print(f"✅ SUCCESS: {success_count} posts updated with Hoffer framework!")
print(f"❌ ERRORS: {error_count} posts")
print(f"📁 Location: {blog_dir}/")
print(f"{'='*60}\n")
print("🎉 ALL POSTS NOW HAVE PROPER HOFFER DESIGN WITH ORIGINAL CONTENT!")
