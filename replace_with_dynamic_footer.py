#!/usr/bin/env python3
"""
Replace hardcoded footers with dynamic footer loading.
Blog posts will fetch footer HTML from /api/footer endpoint.
"""

import os
import re
from pathlib import Path

# Paths
BLOG_DIR = Path("public/static/blog")

# Dynamic footer HTML that loads from API
DYNAMIC_FOOTER = '''<!-- DYNAMIC FOOTER - Loaded from /api/footer API -->
<div id="footer-container"></div>

<script>
// Load footer dynamically from server
(function() {
  fetch('/api/footer')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer-container').innerHTML = html;
    })
    .catch(error => console.error('Footer load error:', error));
})();
</script>'''

def replace_footer_in_file(file_path):
    """Replace static footer with dynamic footer loader."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to match existing footer (from <footer to </footer>)
        # More greedy pattern to capture entire footer block
        footer_pattern = r'<footer[^>]*>.*?</footer>'
        
        # Check if file has a footer
        if not re.search(footer_pattern, content, re.DOTALL):
            return False, "No footer found"
        
        # Replace footer with dynamic loader
        new_content = re.sub(footer_pattern, DYNAMIC_FOOTER, content, flags=re.DOTALL)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        return True, "Footer replaced with dynamic loader"
    
    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    """Replace footers in all blog posts."""
    if not BLOG_DIR.exists():
        print(f"❌ Blog directory not found: {BLOG_DIR}")
        return
    
    blog_files = list(BLOG_DIR.glob("*.html"))
    
    if not blog_files:
        print(f"❌ No HTML files found in {BLOG_DIR}")
        return
    
    print(f"📁 Found {len(blog_files)} blog posts")
    print(f"🔄 Replacing static footers with dynamic footer loader...")
    print()
    
    success_count = 0
    skip_count = 0
    error_count = 0
    
    for blog_file in blog_files:
        success, message = replace_footer_in_file(blog_file)
        
        if success:
            success_count += 1
            print(f"✅ {blog_file.name}")
        else:
            if "No footer found" in message:
                skip_count += 1
                print(f"⏭️  {blog_file.name} - {message}")
            else:
                error_count += 1
                print(f"❌ {blog_file.name} - {message}")
    
    print()
    print("=" * 60)
    print(f"✅ Success: {success_count} blog posts now use dynamic footer")
    print(f"⏭️  Skipped: {skip_count} (no footer found)")
    print(f"❌ Errors: {error_count}")
    print("=" * 60)
    print()
    print("🎉 DONE! All blog posts now load footer from /api/footer")
    print("📝 When you update src/components/footer.tsx, ALL pages update automatically!")

if __name__ == "__main__":
    main()
