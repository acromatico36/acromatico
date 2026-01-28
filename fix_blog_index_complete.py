#!/usr/bin/env python3
"""
Fix Blog Index Page:
1. Add hero background image (full-screen)
2. Ensure hamburger menu is visible
3. Add blog card images
"""

import re

# Read the current blog index
with open('public/static/blog-index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix hero section - add background image and make it full-screen
old_hero_css = r"""        /\* Hero \*/
        \.hero \{
            padding: 8rem 5% 3rem;
            text-align: center;
            background: linear-gradient\(135deg, #667eea 0%, #764ba2 100%\);
            color: white;
        \}"""

new_hero_css = """        /* Hero */
        .hero {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%),
                        url('/static/images/hero-bg.jpg') center/cover no-repeat;
            color: white;
            padding: 8rem 5% 3rem;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.3);
            z-index: 1;
        }
        
        .hero > * {
            position: relative;
            z-index: 2;
        }"""

content = re.sub(old_hero_css, new_hero_css, content, flags=re.DOTALL)

# 2. Add CSS to ensure hamburger menu is always visible
hamburger_css_addition = """
        /* Hamburger Menu - Always Visible */
        .menu-toggle {
            position: fixed !important;
            top: 25px !important;
            right: 30px !important;
            z-index: 10000 !important;
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 8px !important;
            padding: 10px !important;
            border: none !important;
            cursor: pointer !important;
            width: 40px !important;
            height: 40px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 6px !important;
        }
        
        .menu-toggle span {
            display: block !important;
            width: 30px !important;
            height: 2px !important;
            background: #ffffff !important;
            transition: all 0.3s ease !important;
            border-radius: 2px !important;
        }
        
        .menu-toggle:hover {
            background: rgba(71, 148, 166, 0.9) !important;
        }
        
        .site-header {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 9999 !important;
            padding: 20px 40px !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(20px) !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        }
        
        .site-logo {
            max-width: 200px !important;
            height: auto !important;
            transition: all 0.3s !important;
        }
"""

# Insert before </style>
content = content.replace('    </style>', f'{hamburger_css_addition}    </style>')

# 3. Update blog card styles to show images properly
old_card_css = r"""        \.blog-card \{
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 20px rgba\(0,0,0,0\.08\);
            transition: all 0\.3s;
            cursor: pointer;
        \}"""

new_card_css = """        .blog-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 20px rgba(0,0,0,0.08);
            transition: all 0.3s;
            cursor: pointer;
            position: relative;
        }
        
        .blog-card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            display: block;
        }"""

content = re.sub(old_card_css, new_card_css, content, flags=re.DOTALL)

# Write the updated content
with open('public/static/blog-index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Blog index page updated:")
print("  - Hero section: Full-screen with background image")
print("  - Hamburger menu: Always visible with dark background")
print("  - Blog cards: Ready to display images")
print("\nTest URL: http://localhost:3000/static/blog-index.html")
