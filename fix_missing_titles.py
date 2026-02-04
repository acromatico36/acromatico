#!/usr/bin/env python3
"""
FIX MISSING BLOG POST TITLES
Extract titles from all_posts.json and add them to blog post hero sections
"""

import json
import re
from pathlib import Path

BLOG_DIR = Path('/home/user/webapp/public/static/blog')
JSON_PATH = Path('/home/user/webapp/public/static/blog_posts_data/all_posts.json')

def load_posts_data():
    """Load all posts from JSON"""
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def fix_blog_post_title(file_path, title):
    """Add title to empty hero section"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if hero section is empty
        if '<section class="hero-section">\n</section>' in content:
            # Add title to hero section
            fixed_content = content.replace(
                '<section class="hero-section">\n</section>',
                f'<section class="hero-section">\n<h1 class="hero-title">{title}</h1></section>'
            )
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            
            return True
        
        return False
        
    except Exception as e:
        print(f"❌ Error fixing {file_path.name}: {e}")
        return False

def main():
    print("🔧 FIXING MISSING BLOG POST TITLES")
    print("-" * 70)
    
    # Load posts data
    posts = load_posts_data()
    print(f"📄 Loaded {len(posts)} posts from JSON")
    
    # Create slug -> title mapping
    slug_to_title = {}
    for post in posts:
        slug = post['slug']
        title = post['title']['rendered']
        # Remove HTML entities and tags
        title = re.sub(r'<[^>]+>', '', title)
        title = title.replace('&amp;', '&').replace('&#8217;', "'").replace('&#8211;', '–')
        slug_to_title[slug] = title
    
    print(f"📊 Created {len(slug_to_title)} slug-to-title mappings")
    print("-" * 70)
    
    # Fix all blog posts
    fixed_count = 0
    skipped_count = 0
    
    for html_file in sorted(BLOG_DIR.glob('*.html')):
        slug = html_file.stem
        
        if slug in slug_to_title:
            title = slug_to_title[slug]
            if fix_blog_post_title(html_file, title):
                fixed_count += 1
                if fixed_count % 50 == 0:
                    print(f"✅ Fixed {fixed_count} posts...")
        else:
            skipped_count += 1
            print(f"⚠️  No title found for: {slug}")
    
    print("-" * 70)
    print(f"✅ COMPLETE!")
    print(f"   Fixed: {fixed_count}")
    print(f"   Skipped: {skipped_count}")
    print(f"   Total: {fixed_count + skipped_count}")

if __name__ == '__main__':
    main()
