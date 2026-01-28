#!/usr/bin/env python3
"""
APPLY LOGO-FREE HERO IMAGES TO ALL BLOG POSTS
Replaces WordPress hero images (with logo) with locally stored logo-free versions
"""

from pathlib import Path
import re
import json

def load_image_mapping():
    """Load the SmugMug image mapping JSON"""
    mapping_file = Path('/home/user/webapp/smugmug_image_mapping.json')
    
    if not mapping_file.exists():
        print("❌ smugmug_image_mapping.json not found")
        return None
    
    with open(mapping_file, 'r') as f:
        return json.load(f)

def replace_hero_image(html_file, slug, no_logo_path):
    """Replace hero image URL in blog post HTML"""
    
    html_path = Path(html_file)
    if not html_path.exists():
        return False
    
    content = html_path.read_text(encoding='utf-8')
    
    # Find hero section background image
    # Pattern: background-image: url('https://acromatico.com/wp-content/uploads/...');
    hero_pattern = r'(\.hero-section\s*\{[^}]*background-image:\s*url\([\'"])(https://acromatico\.com/wp-content/uploads/[^\'")]+)([\'"])'
    
    match = re.search(hero_pattern, content)
    
    if match:
        old_url = match.group(2)
        
        # Replace with logo-free local path
        new_url = no_logo_path
        content = content.replace(old_url, new_url)
        
        # Write back
        html_path.write_text(content, encoding='utf-8')
        
        print(f"   ✅ Replaced: {old_url[-50:]}...")
        print(f"      With: {new_url}")
        return True
    else:
        print(f"   ⚠️  No hero image found in CSS")
        return False

def main():
    """Apply logo-free images to all blog posts"""
    
    # Load mapping
    mapping = load_image_mapping()
    if mapping is None:
        print("❌ Failed to load image mapping")
        return
    
    blog_dir = Path('/home/user/webapp/public/static/blog')
    no_logo_dir = Path('/home/user/webapp/public/static/images/no-logo')
    
    if not blog_dir.exists():
        print("❌ Blog directory not found")
        return
    
    if not no_logo_dir.exists():
        print("❌ No-logo images directory not found")
        return
    
    print(f"🚀 APPLYING LOGO-FREE HERO IMAGES TO ALL BLOG POSTS\n")
    print("="*80)
    
    success = 0
    skipped = 0
    errors = 0
    
    # Process each mapping entry
    for i, (slug, data) in enumerate(mapping.items(), 1):
        no_logo_local = data.get('smugmug_image_no_logo')
        
        if not no_logo_local:
            skipped += 1
            continue
        
        # Find the blog post HTML file
        html_file = blog_dir / f"{slug}.html"
        
        if not html_file.exists():
            print(f"⚠️  [{i}/{len(mapping)}] {slug}: HTML file not found")
            errors += 1
            continue
        
        print(f"\n[{i}/{len(mapping)}] {slug}")
        
        # Replace hero image
        if replace_hero_image(html_file, slug, no_logo_local):
            success += 1
        else:
            errors += 1
        
        # Progress indicator
        if i % 50 == 0:
            print(f"\n💾 Progress: {i}/{len(mapping)} posts processed...")
    
    print("\n" + "="*80)
    print(f"✅ SUCCESS: {success} hero images replaced")
    print(f"⏭️  SKIPPED: {skipped} posts (no logo-free image available)")
    print(f"❌ ERRORS: {errors} posts (HTML not found or pattern mismatch)")
    print("="*80)
    
    print("\n🎯 RESULT:")
    print("All blog posts now use logo-free hero images from local storage!")

if __name__ == '__main__':
    main()
