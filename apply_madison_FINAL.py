#!/usr/bin/env python3
"""
Apply Madison Clone Framework to all blog posts
Uses BeautifulSoup to properly clone structure and swap content
"""

import os
import json
from bs4 import BeautifulSoup

# Load Madison clone template
print("📖 Loading Madison clone template...")
with open('public/static/madison-clone.html', 'r', encoding='utf-8') as f:
    madison_html = f.read()

# Load blog posts data
print("📖 Loading blog posts data...")
with open('blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    posts_data = json.load(f)

print(f"✅ Loaded Madison clone ({len(madison_html)} chars)")
print(f"✅ Loaded {len(posts_data)} blog posts\n")
print(f"🚀 Applying Madison framework to all posts...\n")

success_count = 0
error_count = 0

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
        intro_text = paragraphs[0] if paragraphs else f"Discover stunning photography from this {title} session."
        meta_description = intro_text[:160] if len(intro_text) > 160 else intro_text
        
        # Clone Madison template
        soup = BeautifulSoup(madison_html, 'html.parser')
        
        # 1. Update title tag
        title_tag = soup.find('title')
        if title_tag:
            title_tag.string = f"{title} | Acromatico Photography"
        
        # 2. Update meta description
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc:
            meta_desc['content'] = meta_description
        
        # 3. Update OpenGraph tags
        og_title = soup.find('meta', property='og:title')
        if og_title:
            og_title['content'] = title
        
        og_desc = soup.find('meta', property='og:description')
        if og_desc:
            og_desc['content'] = meta_description
        
        og_url = soup.find('meta', property='og:url')
        if og_url:
            og_url['content'] = f"https://acromatico.com/blog/{slug}"
        
        og_image = soup.find('meta', property='og:image')
        if og_image:
            og_image['content'] = hero_image
        
        # 4. Update canonical URL
        canonical = soup.find('link', rel='canonical')
        if canonical:
            canonical['href'] = f"https://acromatico.com/blog/{slug}"
        
        # 5. Update hero section background
        hero = soup.find('section', class_='hero-section')
        if hero:
            hero['style'] = f"background-image: url('{hero_image}');"
        
        # 6. Update post title H1
        h1 = soup.find('h1', class_='post-title')
        if h1:
            h1.string = title
        
        # 7. Update post intro
        post_intro = soup.find('div', class_='post-intro')
        if post_intro:
            intro_p = post_intro.find('p')
            if intro_p:
                intro_p.string = intro_text
        
        # 8. Update gallery images
        gallery_container = soup.find('div', class_='gallery-container')
        if gallery_container:
            # Clear existing gallery
            gallery_container.clear()
            
            # Add new images
            for img_src in gallery_images:
                a_tag = soup.new_tag('a', href=img_src, **{'class': 'gallery-item glightbox'})
                img_tag = soup.new_tag('img', src=img_src, alt=title, **{'class': 'gallery-image', 'loading': 'lazy'})
                a_tag.append(img_tag)
                gallery_container.append(a_tag)
                gallery_container.append('\n            ')
        
        # 9. Update related posts (use next 3 posts cyclically)
        related_grid = soup.find('div', class_='related-posts-grid')
        if related_grid:
            related_grid.clear()
            
            for i in range(min(3, len(posts_data))):
                related_idx = (idx + i + 1) % len(posts_data)
                related = posts_data[related_idx]
                related_slug = related.get('slug', '')
                related_title_obj = related.get('title', {})
                related_title = related_title_obj.get('rendered', '') if isinstance(related_title_obj, dict) else str(related_title_obj)
                related_img = gallery_images[i % len(gallery_images)]
                
                # Create related post article
                article = soup.new_tag('article', **{'class': 'related-post'})
                img = soup.new_tag('img', src=related_img, alt=related_title)
                h3 = soup.new_tag('h3')
                a = soup.new_tag('a', href=f"/blog/{related_slug}")
                a.string = related_title
                h3.append(a)
                
                article.append(img)
                article.append(h3)
                related_grid.append('\n                ')
                related_grid.append(article)
            
            related_grid.append('\n            ')
        
        # Write to file
        output_path = f'public/static/blog/{slug}.html'
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(str(soup.prettify()))
        
        success_count += 1
        
        if (idx + 1) % 50 == 0:
            print(f"✅ {idx + 1}/{len(posts_data)} posts updated...")
        
    except Exception as e:
        print(f"❌ Error on {post.get('slug', 'unknown')}: {e}")
        import traceback
        traceback.print_exc()
        error_count += 1

print(f"\n{'='*70}")
print(f"✅ SUCCESS: {success_count} posts updated with Madison framework!")
print(f"❌ ERRORS: {error_count} posts")
print(f"📁 Location: public/static/blog/")
print(f"{'='*70}\n")
print("🎉 ALL POSTS NOW HAVE MADISON FRAMEWORK!")
