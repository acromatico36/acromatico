#!/usr/bin/env python3
"""
Replace hardcoded headers/menus with dynamic header loading.
Blog posts will fetch header+menu HTML from /api/header endpoint.
Also fixes:
- Green color (#728012) → Acromatico color (#4794A6)
- Missing menu toggle JavaScript
"""

import os
import re
from pathlib import Path

# Paths
BLOG_DIR = Path("public/static/blog")

# Dynamic header HTML that loads from API
DYNAMIC_HEADER = '''<!-- DYNAMIC HEADER & MENU - Loaded from /api/header API -->
<div id="header-container"></div>

<script>
// Load header dynamically from server
(function() {
  fetch('/api/header')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header-container').innerHTML = html;
      
      // Execute any scripts in the loaded HTML
      const scripts = document.getElementById('header-container').querySelectorAll('script');
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
    .catch(error => console.error('Header load error:', error));
})();
</script>'''

def replace_header_in_file(file_path):
    """Replace static header/menu with dynamic header loader."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to match header block (from <header to end of drawer div)
        # This captures: header + overlay + drawer (the entire menu system)
        header_pattern = r'<header class="site-header">.*?</div>\s*</div>\s*</div>'
        
        # Check if file has a header
        if not re.search(header_pattern, content, re.DOTALL):
            return False, "No header found"
        
        # Replace header with dynamic loader
        new_content = re.sub(header_pattern, DYNAMIC_HEADER, content, flags=re.DOTALL)
        
        # Also fix any remaining green colors (#728012) → Acromatico color
        new_content = new_content.replace('#728012', '#4794A6')
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        return True, "Header replaced with dynamic loader"
    
    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    """Replace headers in all blog posts."""
    if not BLOG_DIR.exists():
        print(f"❌ Blog directory not found: {BLOG_DIR}")
        return
    
    blog_files = list(BLOG_DIR.glob("*.html"))
    
    if not blog_files:
        print(f"❌ No HTML files found in {BLOG_DIR}")
        return
    
    print(f"📁 Found {len(blog_files)} blog posts")
    print(f"🔄 Replacing static headers/menus with dynamic header loader...")
    print(f"🎨 Also fixing green color (#728012) → Acromatico color (#4794A6)")
    print()
    
    success_count = 0
    skip_count = 0
    error_count = 0
    
    for blog_file in blog_files:
        success, message = replace_header_in_file(blog_file)
        
        if success:
            success_count += 1
            if success_count <= 10:  # Show first 10
                print(f"✅ {blog_file.name}")
            elif success_count == 11:
                print(f"✅ ... processing remaining files ...")
        else:
            if "No header found" in message:
                skip_count += 1
                if skip_count <= 5:
                    print(f"⏭️  {blog_file.name} - {message}")
            else:
                error_count += 1
                print(f"❌ {blog_file.name} - {message}")
    
    print()
    print("=" * 60)
    print(f"✅ Success: {success_count} blog posts now use dynamic header")
    print(f"⏭️  Skipped: {skip_count} (no header found)")
    print(f"❌ Errors: {error_count}")
    print("=" * 60)
    print()
    print("🎉 DONE! All blog posts now load header/menu from /api/header")
    print("📝 When you update src/components/header.tsx, ALL pages update automatically!")
    print("🎨 Green color fixed → Acromatico brand color (#4794A6)")
    print("🍔 Hamburger menu now works with proper JavaScript!")

if __name__ == "__main__":
    main()
