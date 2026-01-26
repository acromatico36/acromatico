#!/usr/bin/env python3
"""
SMUGMUG IMAGE REPLACEMENT SYSTEM

This script will:
1. Create a mapping of all 502 blog posts with their current hero images
2. Provide a template for you to add Smugmug URLs (without logo)
3. Batch-update ALL posts when Smugmug URLs are provided

USAGE:
1. Run this script to generate smugmug_image_mapping.json
2. Edit the JSON file and add Smugmug URLs for each post
3. Run with --update flag to apply changes to all blog posts
"""

import json
import sys
from pathlib import Path
from bs4 import BeautifulSoup

def create_mapping():
    """Create mapping of all blog posts and their current hero images"""
    
    blog_dir = Path('public/static/blog')
    posts = list(blog_dir.glob('*.html'))
    
    mapping = {}
    
    print(f"📋 Creating mapping for {len(posts)} blog posts...\n")
    
    for post_path in sorted(posts):
        try:
            with open(post_path, 'r', encoding='utf-8') as f:
                soup = BeautifulSoup(f.read(), 'html.parser')
            
            slug = post_path.stem
            
            # Get title
            title_tag = soup.find('h1', class_='post-title')
            title = title_tag.get_text().replace('<br/>', ' | ').replace('<br>', ' | ') if title_tag else slug
            
            # Get current hero image
            hero_section = soup.find('section', class_='hero-section')
            current_image = None
            
            if hero_section:
                style = hero_section.get('style', '')
                # Extract URL from style="background-image: url('...')"
                if 'background-image' in style:
                    import re
                    match = re.search(r'url\([\'"]?([^\'"]+)[\'"]?\)', style)
                    if match:
                        current_image = match.group(1)
            
            mapping[slug] = {
                "title": title,
                "current_wordpress_image": current_image or "Not found",
                "smugmug_image_no_logo": "",  # TO BE FILLED
                "smugmug_gallery_url": "",     # TO BE FILLED
                "notes": ""
            }
        
        except Exception as e:
            print(f"❌ Error processing {post_path.name}: {e}")
    
    return mapping

def save_mapping(mapping, filename='smugmug_image_mapping.json'):
    """Save mapping to JSON file"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Mapping saved to {filename}")
    print(f"📊 Total posts: {len(mapping)}")
    print(f"\n📝 NEXT STEPS:")
    print(f"1. Open {filename}")
    print(f"2. For each post, add:")
    print(f"   - smugmug_image_no_logo: Direct URL to clean image")
    print(f"   - smugmug_gallery_url: Link to Smugmug gallery (optional)")
    print(f"3. Run: python3 {sys.argv[0]} --update")

def update_blog_posts(mapping_file='smugmug_image_mapping.json'):
    """Update all blog posts with Smugmug images"""
    
    with open(mapping_file, 'r', encoding='utf-8') as f:
        mapping = json.load(f)
    
    blog_dir = Path('public/static/blog')
    
    updated_count = 0
    skipped_count = 0
    error_count = 0
    
    print(f"🔄 Updating blog posts with Smugmug images...\n")
    
    for slug, data in mapping.items():
        smugmug_url = data.get('smugmug_image_no_logo', '').strip()
        
        if not smugmug_url:
            skipped_count += 1
            continue
        
        post_path = blog_dir / f"{slug}.html"
        
        if not post_path.exists():
            print(f"❌ File not found: {post_path.name}")
            error_count += 1
            continue
        
        try:
            with open(post_path, 'r', encoding='utf-8') as f:
                soup = BeautifulSoup(f.read(), 'html.parser')
            
            # Update hero section background image
            hero_section = soup.find('section', class_='hero-section')
            if hero_section:
                current_style = hero_section.get('style', '')
                # Replace URL in background-image
                import re
                new_style = re.sub(
                    r'url\([\'"]?[^\'"]+[\'"]?\)',
                    f"url('{smugmug_url}')",
                    current_style
                )
                hero_section['style'] = new_style
            
            # Save updated HTML
            with open(post_path, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            
            updated_count += 1
            
            if updated_count % 50 == 0:
                print(f"✅ Updated {updated_count} posts...")
        
        except Exception as e:
            print(f"❌ Error updating {slug}: {e}")
            error_count += 1
    
    print(f"\n{'='*80}")
    print(f"✅ UPDATED: {updated_count} posts")
    print(f"⏭️  SKIPPED: {skipped_count} posts (no Smugmug URL)")
    print(f"❌ ERRORS: {error_count} posts")
    print(f"{'='*80}\n")
    
    if updated_count > 0:
        print("🎉 SUCCESS! All hero images updated to Smugmug (no logo)")
        print("🚀 Now deploy: cp -r public/static/blog dist/static/ && pm2 restart acromatico")

def main():
    if len(sys.argv) > 1 and sys.argv[1] == '--update':
        # Update mode: Apply Smugmug images
        if not Path('smugmug_image_mapping.json').exists():
            print("❌ ERROR: smugmug_image_mapping.json not found!")
            print("   Run without --update flag first to create mapping.")
            sys.exit(1)
        
        update_blog_posts()
    else:
        # Create mode: Generate mapping file
        mapping = create_mapping()
        save_mapping(mapping)

if __name__ == '__main__':
    main()
