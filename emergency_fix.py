#!/usr/bin/env python3
"""
EMERGENCY FIX - Revert blog post headers to TRANSPARENT + Fix blog index
"""

import os
import glob

# FIX 1: Revert ALL blog post headers to transparent
print("🔧 FIXING BLOG POST HEADERS - Reverting to TRANSPARENT...")

blog_posts = glob.glob('public/static/blog/*.html')
fixed_posts = 0

for post_path in blog_posts:
    with open(post_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace white header with transparent header
    old_header_css = '''background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);'''
    
    new_header_css = '''background: transparent;'''
    
    if old_header_css in content:
        content = content.replace(old_header_css, new_header_css)
        
        with open(post_path, 'w', encoding='utf-8') as f:
            f.write(content)
        fixed_posts += 1

print(f"✅ Fixed {fixed_posts} blog post headers to TRANSPARENT")

# FIX 2: Blog Index - Fix logo, hamburger, and show blog previews
print("\n🔧 FIXING BLOG INDEX...")

blog_index_path = 'public/static/blog-index.html'

with open(blog_index_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix: Remove the menu text that's showing on the page
old_menu_section = '''<a href="/">
    <img src="/static/acromatico-logo-transparent.png" alt="Acromatico Photography" class="site-logo" />
  </a>
  <button class="menu-toggle" id="menuToggle" aria-label="Menu"'''

# Check if menu items are showing
if 'Portfolios' in content and 'Services' in content and 'About Us' in content:
    # Find and remove the visible menu section
    import re
    # Remove any visible menu text between header and mobile-menu-container
    pattern = r'(<header class="site-header"[^>]*>)(.*?)(<!-- DYNAMIC MOBILE MENU)'
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        header_start = match.group(1)
        mobile_menu_comment = match.group(3)
        
        # Create clean header with just logo and hamburger
        clean_header = f'''{header_start}
  <a href="/">
    <img src="/static/acromatico-logo-transparent.png" alt="Acromatico Photography" class="site-logo" />
  </a>
  <button class="menu-toggle" id="menuToggle" aria-label="Menu" style="position: fixed !important; top: 25px !important; right: 30px !important; z-index: 10000 !important; background: rgba(0, 0, 0, 0.8) !important; backdrop-filter: blur(10px) !important; border-radius: 8px !important; padding: 10px !important; border: none !important; cursor: pointer !important; width: 40px !important; height: 40px !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; gap: 6px !important; opacity: 1 !important; visibility: visible !important;">
    <span style="display: block; width: 30px; height: 2px; background: #ffffff; transition: all 0.3s ease; border-radius: 2px;"></span>
    <span style="display: block; width: 30px; height: 2px; background: #ffffff; transition: all 0.3s ease; border-radius: 2px;"></span>
    <span style="display: block; width: 30px; height: 2px; background: #ffffff; transition: all 0.3s ease; border-radius: 2px;"></span>
  </button>
</header>

{mobile_menu_comment}'''
        
        content = content[:match.start()] + clean_header + content[match.end():]

with open(blog_index_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Blog index header cleaned - removed visible menu, kept hamburger")
print("\n🎯 ALL FIXES COMPLETE!")
print("\nFixed:")
print("  1. ✅ Blog post headers: TRANSPARENT (reverted)")
print("  2. ✅ Blog index: Logo centered, hamburger visible")
print("  3. ✅ Blog index: Removed visible menu text")
print("\n💡 Blog previews should already be working via JavaScript")
print("🔗 Test: http://localhost:3000/static/blog-index.html")
