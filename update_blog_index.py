#!/usr/bin/env python3
"""
Update blog-index.html with:
- Static header with logo and hamburger menu
- Dynamic mobile menu loader
- Dynamic footer loader
- Keep all existing blog functionality
"""

import re
from pathlib import Path

BLOG_INDEX = Path("public/static/blog-index.html")

# Static header with logo and hamburger
STATIC_HEADER = '''<!-- Static Header with Logo and Hamburger -->
<header class="site-header" style="position: fixed; top: 0; left: 0; right: 0; z-index: 9999; padding: 20px 40px; display: flex; justify-content: center; align-items: center;">
  <a href="/">
    <img src="/static/acromatico-logo-transparent.png" alt="Acromatico Photography" class="site-logo" style="max-width: 200px; height: auto; transition: all 0.3s;" />
  </a>
  <button class="menu-toggle" id="menuToggle" aria-label="Menu" style="position: fixed; top: 25px; right: 30px; z-index: 10000; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(10px); border-radius: 8px; padding: 10px; border: none; cursor: pointer; width: 40px; height: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;">
    <span style="display: block; width: 30px; height: 2px; background: #ffffff; transition: all 0.3s ease; border-radius: 2px;"></span>
    <span style="display: block; width: 30px; height: 2px; background: #ffffff; transition: all 0.3s ease; border-radius: 2px;"></span>
    <span style="display: block; width: 30px; height: 2px; background: #ffffff; transition: all 0.3s ease; border-radius: 2px;"></span>
  </button>
</header>

<!-- DYNAMIC MOBILE MENU - Loaded from /api/mobile-menu -->
<div id="mobile-menu-container"></div>

<script>
// Load mobile menu dynamically
(function() {
  fetch('/api/mobile-menu')
    .then(response => response.text())
    .then(html => {
      document.getElementById('mobile-menu-container').innerHTML = html;
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
</script>

'''

# Dynamic footer loader
DYNAMIC_FOOTER = '''<!-- DYNAMIC FOOTER - Loaded from /api/footer -->
<div id="footer-container"></div>

<script>
// Load footer dynamically
(function() {
  fetch('/api/footer')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer-container').innerHTML = html;
    })
    .catch(error => console.error('Footer load error:', error));
})();
</script>
'''

def update_blog_index():
    """Update blog index with dynamic header/footer."""
    
    if not BLOG_INDEX.exists():
        print(f"❌ {BLOG_INDEX} not found")
        return False
    
    print(f"📄 Updating {BLOG_INDEX}...")
    
    with open(BLOG_INDEX, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace old nav with new header (after <body> tag)
    body_pattern = r'(<body>)\s*<!-- Navigation -->.*?</nav>'
    content = re.sub(body_pattern, r'\1\n' + STATIC_HEADER, content, flags=re.DOTALL)
    
    # Replace old footer with dynamic footer
    footer_pattern = r'<!-- Footer -->.*?</footer>'
    content = re.sub(footer_pattern, DYNAMIC_FOOTER, content, flags=re.DOTALL)
    
    # Write back
    with open(BLOG_INDEX, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Blog index updated!")
    print("   ✅ Static header with logo + hamburger")
    print("   ✅ Dynamic mobile menu")
    print("   ✅ Dynamic footer")
    return True

if __name__ == "__main__":
    success = update_blog_index()
    if success:
        print()
        print("🎉 Blog index now has:")
        print("   - Visible logo")
        print("   - Working hamburger menu")
        print("   - Same footer as all other pages")
        print()
        print("🔗 Test: http://localhost:3000/static/blog-index.html")

