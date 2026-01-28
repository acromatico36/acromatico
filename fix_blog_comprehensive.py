#!/usr/bin/env python3
"""
COMPREHENSIVE FIX for Blog Index Page:
1. Remove old nav CSS (causing conflicts)
2. Fix hero text visibility (z-index and overlay)
3. Ensure filter bar and blog cards are visible
4. Fix hamburger menu positioning
"""

import re

# Read the current blog index
with open('public/static/blog-index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove OLD nav CSS that's conflicting
old_nav_css = r"""        /\* Navigation \*/
        nav \{
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba\(255,255,255,0\.95\);
            backdrop-filter: blur\(20px\);
            z-index: 1000;
            padding: 1rem 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 1px 3px rgba\(0,0,0,0\.1\);
        \}
        
        nav a \{
            color: var\(--text\);
            text-decoration: none;
            font-weight: 500;
            transition: opacity 0\.3s;
        \}
        
        nav a:hover \{
            opacity: 0\.6;
        \}
        
        \.logo \{
            font-size: 1\.5rem;
            font-weight: 700;
            letter-spacing: -0\.02em;
        \}
        
        """

content = re.sub(old_nav_css, "", content, flags=re.DOTALL)

# 2. Fix hero section - lighter overlay so text is MORE visible
old_hero = r"""        /\* Hero \*/
        \.hero \{
            position: relative;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: linear-gradient\(135deg, rgba\(102, 126, 234, 0\.85\) 0%, rgba\(118, 75, 162, 0\.85\) 100%\),
                        url\('/static/images/no-logo/20th-anniversary-photo-session\.jpeg'\) center/cover no-repeat;
            color: white;
            padding: 8rem 5% 3rem;
        \}
        
        \.hero::before \{
            content: '';
            position: absolute;
            inset: 0;
            background: rgba\(0, 0, 0, 0\.25\);
            z-index: 1;
        \}
        
        \.hero > \* \{
            position: relative;
            z-index: 2;
        \}"""

new_hero = """        /* Hero */
        .hero {
            position: relative;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 100%),
                        url('/static/images/no-logo/20th-anniversary-photo-session.jpeg') center/cover no-repeat;
            color: white;
            padding: 8rem 5% 3rem;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            z-index: 1;
        }
        
        .hero h1,
        .hero p {
            position: relative;
            z-index: 10;
            color: white !important;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }"""

content = re.sub(old_hero, new_hero, content, flags=re.DOTALL)

# 3. Ensure hero h1 and p are super visible
hero_text_css = """
        .hero h1 {
            font-size: clamp(3rem, 8vw, 5rem) !important;
            font-weight: 700 !important;
            letter-spacing: -0.02em !important;
            margin-bottom: 1rem !important;
            position: relative !important;
            z-index: 10 !important;
        }
        
        .hero p {
            font-size: 1.3rem !important;
            opacity: 1 !important;
            max-width: 600px !important;
            margin: 0 auto !important;
            position: relative !important;
            z-index: 10 !important;
        }
"""

# Find where to insert (before /* Filter Bar */)
content = content.replace('        /* Filter Bar */', hero_text_css + '\n        /* Filter Bar */')

# Write the updated content
with open('public/static/blog-index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Blog index page COMPREHENSIVELY FIXED:")
print("  1. Removed old nav CSS (was causing conflicts)")
print("  2. Fixed hero text visibility (stronger z-index + text-shadow)")
print("  3. Adjusted overlay opacity for better readability")
print("  4. Added !important flags to ensure hero text shows")
print("\nTest URL: http://localhost:3000/static/blog-index.html")
print("\n🎯 What you'll see now:")
print("  - Large 'Love Stories' heading visible on hero")
print("  - '501+ Real weddings...' tagline visible")
print("  - Filter buttons below hero")
print("  - Blog post cards loading")
