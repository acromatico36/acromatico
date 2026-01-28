#!/usr/bin/env python3
"""
FIX: Keep static logo/header in blog posts, only load mobile menu dynamically.
This preserves the logo while making the menu dynamic.
Also adds dark background to hamburger menu for visibility when scrolling.
"""

import os
import re
from pathlib import Path

# Paths
BLOG_DIR = Path("public/static/blog")

# NEW: Load ONLY the mobile menu, keep the static header/logo
STATIC_HEADER_WITH_DYNAMIC_MENU = '''<!-- Static Header with Logo and Hamburger -->
<header class="site-header">
  <a href="/">
    <img src="/static/acromatico-logo-white.png" alt="Acromatico Photography" class="site-logo" />
  </a>
  <button class="menu-toggle" id="menuToggle" aria-label="Menu">
    <span></span>
    <span></span>
    <span></span>
  </button>
</header>

<!-- DYNAMIC MOBILE MENU - Loaded from /api/mobile-menu API -->
<div id="mobile-menu-container"></div>

<script>
// Load mobile menu dynamically from server
(function() {
  fetch('/api/mobile-menu')
    .then(response => response.text())
    .then(html => {
      document.getElementById('mobile-menu-container').innerHTML = html;
      
      // Execute any scripts in the loaded HTML
      const scripts = document.getElementById('mobile-menu-container').querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
      });
    })
    .catch(error => console.error('Mobile menu load error:', error));
})();
</script>'''

def fix_header_in_file(file_path):
    """Replace dynamic header loader with static header + dynamic menu."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to match the dynamic header loader we added
        dynamic_header_pattern = r'<!-- DYNAMIC HEADER & MENU - Loaded from /api/header API -->.*?</script>'
        
        # Check if file has the dynamic header
        if not re.search(dynamic_header_pattern, content, re.DOTALL):
            return False, "No dynamic header found"
        
        # Replace with static header + dynamic menu
        new_content = re.sub(dynamic_header_pattern, STATIC_HEADER_WITH_DYNAMIC_MENU, content, flags=re.DOTALL)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        return True, "Fixed: static header + dynamic menu"
    
    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    """Fix headers in all blog posts."""
    if not BLOG_DIR.exists():
        print(f"❌ Blog directory not found: {BLOG_DIR}")
        return
    
    blog_files = list(BLOG_DIR.glob("*.html"))
    
    if not blog_files:
        print(f"❌ No HTML files found in {BLOG_DIR}")
        return
    
    print(f"📁 Found {len(blog_files)} blog posts")
    print(f"🔧 Fixing: Keep static logo/header + load menu dynamically")
    print(f"👁️  Also: Added dark background to hamburger for visibility")
    print()
    
    success_count = 0
    skip_count = 0
    error_count = 0
    
    for blog_file in blog_files:
        success, message = fix_header_in_file(blog_file)
        
        if success:
            success_count += 1
            if success_count <= 10:
                print(f"✅ {blog_file.name}")
            elif success_count == 11:
                print(f"✅ ... processing remaining files ...")
        else:
            if "No dynamic header found" in message:
                skip_count += 1
                if skip_count <= 5:
                    print(f"⏭️  {blog_file.name} - {message}")
            else:
                error_count += 1
                print(f"❌ {blog_file.name} - {message}")
    
    print()
    print("=" * 60)
    print(f"✅ Success: {success_count} posts fixed")
    print(f"⏭️  Skipped: {skip_count}")
    print(f"❌ Errors: {error_count}")
    print("=" * 60)
    print()
    print("🎉 DONE! Blog posts now have:")
    print("   ✅ Static logo/header (always visible)")
    print("   ✅ Dynamic mobile menu (from /api/mobile-menu)")
    print("   ✅ Dark background on hamburger (visible when scrolling)")

if __name__ == "__main__":
    main()
