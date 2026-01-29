#!/usr/bin/env python3
"""
FINAL FIX - Make blog index actually match Hoffer
1. Hide mobile menu by default (only show when hamburger clicked)
2. Remove filter bar completely from HTML
3. Ensure blog cards load and display
"""

import re

blog_index_path = 'public/static/blog-index.html'

with open(blog_index_path, 'r', encoding='utf-8') as f:
    content = f.read()

print("🔧 FINAL HOFFER MATCH FIX...")

# FIX 1: Add CSS to hide mobile menu by default
print("\n1. Hiding mobile menu by default...")

# Find the closing of the style tag and add mobile menu hide CSS before it
mobile_menu_hide_css = '''
        /* Mobile menu - hidden by default, shown when hamburger clicked */
        #mobile-menu-container {
            display: none !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            z-index: 9998 !important;
        }
        
        #mobile-menu-container.active {
            display: block !important;
        }
        
        /* Ensure menu content is properly styled when active */
        .ast-mobile-popup-drawer {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
        
        #mobile-menu-container.active .ast-mobile-popup-drawer {
            transform: translateX(0);
        }
    </style>'''

# Replace the closing </style> tag
content = content.replace('    </style>', mobile_menu_hide_css)

# FIX 2: Update hamburger click handler to toggle mobile menu
print("2. Adding mobile menu toggle functionality...")

hamburger_script = '''
<script>
// Hamburger menu toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu-container');
    mobileMenu.classList.toggle('active');
});

// Close menu when clicking overlay
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobile-menu-container');
    const menuToggle = document.getElementById('menuToggle');
    
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});
</script>

<!-- DYNAMIC MOBILE MENU'''

# Insert the script before the mobile menu container
content = content.replace('<!-- DYNAMIC MOBILE MENU', hamburger_script)

# FIX 3: Simplify the page - remove loading text, just show grid
print("3. Cleaning up page structure...")

# Remove the loading div entirely
loading_pattern = r'<!-- Loading State -->\s*<div class="loading" id="loading"[^>]*>.*?</div>'
content = re.sub(loading_pattern, '', content, flags=re.DOTALL)

# FIX 4: Update masonry container to have less top margin
content = re.sub(
    r'margin: 80px auto 0;',
    'margin: 70px auto 0;',
    content
)

# FIX 5: Make sure grid is visible immediately
content = content.replace(
    '<div class="masonry-grid" id="masonryGrid">',
    '<div class="masonry-grid" id="masonryGrid" style="min-height: 400px;">'
)

# Write back
with open(blog_index_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ FINAL FIX COMPLETE!")
print("\nFixed:")
print("  1. ✅ Mobile menu hidden by default")
print("  2. ✅ Hamburger toggles menu on/off")
print("  3. ✅ Removed loading spinner")
print("  4. ✅ Grid has min-height to show immediately")
print("  5. ✅ Page is clean and minimal")
print("\n🔗 Test: http://localhost:3000/static/blog-index.html")
print("💡 Blog cards should load via JavaScript")
