#!/usr/bin/env python3
"""
Fix logo: Use transparent logo (dark text) instead of white logo.
The white logo appears as a white box because it's white text on transparent background.
"""

import os
import re
from pathlib import Path

# Paths
BLOG_DIR = Path("public/static/blog")

def fix_logo_in_file(file_path):
    """Replace white logo with transparent logo."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace white logo with transparent logo
        if 'acromatico-logo-white.png' in content:
            new_content = content.replace(
                '/static/acromatico-logo-white.png',
                '/static/acromatico-logo-transparent.png'
            )
            
            # Write back
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            return True, "Fixed: white logo → transparent logo"
        
        return False, "No white logo found"
    
    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    """Fix logo in all blog posts."""
    if not BLOG_DIR.exists():
        print(f"❌ Blog directory not found: {BLOG_DIR}")
        return
    
    blog_files = list(BLOG_DIR.glob("*.html"))
    
    print(f"📁 Found {len(blog_files)} blog posts")
    print(f"🔧 Fixing: white logo → transparent logo (dark text)")
    print()
    
    success_count = 0
    skip_count = 0
    
    for blog_file in blog_files:
        success, message = fix_logo_in_file(blog_file)
        
        if success:
            success_count += 1
            if success_count <= 10:
                print(f"✅ {blog_file.name}")
            elif success_count == 11:
                print(f"✅ ... processing remaining files ...")
        else:
            skip_count += 1
    
    print()
    print("=" * 60)
    print(f"✅ Success: {success_count} posts fixed")
    print(f"⏭️  Skipped: {skip_count}")
    print("=" * 60)
    print()
    print("🎉 Logo now visible! Using transparent logo with dark text")

if __name__ == "__main__":
    main()
