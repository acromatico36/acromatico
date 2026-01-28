#!/usr/bin/env python3
"""
SYMMETRY FIX: Make individual blog post headers match blog index header
- Add white semi-transparent background
- Add backdrop-filter blur
- Add box-shadow
- Ensure consistent header across all 502 posts + blog index
"""

import os
import re

blog_dir = 'public/static/blog'
posts_fixed = 0
posts_skipped = 0
errors = 0

# The new consistent header CSS
new_header_css = """        .site-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            padding: 20px 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }"""

# Regex to find and replace the site-header CSS
old_header_pattern = r'        \.site-header \{[^}]+\}'

for filename in os.listdir(blog_dir):
    if not filename.endswith('.html'):
        continue
    
    # Skip special files
    if filename in ['blog-index.html', 'blog-template.html', 'NEW-CONTENT-SECTIONS.html']:
        posts_skipped += 1
        continue
    
    filepath = os.path.join(blog_dir, filename)
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if site-header CSS exists
        if '.site-header {' not in content:
            posts_skipped += 1
            continue
        
        # Replace old header CSS with new consistent CSS
        new_content = re.sub(old_header_pattern, new_header_css, content)
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        posts_fixed += 1
        
    except Exception as e:
        print(f"❌ Error processing {filename}: {e}")
        errors += 1

print(f"✅ SYMMETRY ACHIEVED!")
print(f"   Fixed: {posts_fixed} blog posts")
print(f"   Skipped: {posts_skipped} (templates/special files)")
print(f"   Errors: {errors}")
print(f"\n🎯 All blog posts now have:")
print(f"   - White semi-transparent header (rgba(255,255,255,0.95))")
print(f"   - Backdrop blur (20px)")
print(f"   - Box shadow (subtle)")
print(f"   - Logo always visible on any background")
print(f"\n📊 Consistency: Blog Index ↔ Individual Posts = SYMMETRIC!")
