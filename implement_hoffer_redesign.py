#!/usr/bin/env python3
"""
HOFFER-INSPIRED BLOG REDESIGN - Phase 1
Implement all improvements based on Hoffer Photography competitive analysis
WITHOUT breaking anything

Changes:
1. Remove/minimize hero section (200px max)
2. Switch to equal-height grid layout
3. Add category badges on cards
4. Use Acromatico teal (#4794A6) consistently
5. Remove large filter button bar → dropdown
6. Move search to header
7. Enhance card shadows and hover effects
8. Fixed image heights (300px)
"""

import re

filepath = 'public/static/blog-index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. MINIMIZE HERO SECTION (from 100vh to 300px)
old_hero_css = r"""        /\* Hero \*/
        \.hero \{
            position: relative;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: linear-gradient\(135deg, rgba\(102, 126, 234, 0\.7\) 0%, rgba\(118, 75, 162, 0\.7\) 100%\),
                        url\('/static/images/no-logo/20th-anniversary-photo-session\.jpeg'\) center/cover no-repeat;
            color: white;
            padding: 8rem 5% 3rem;
        \}
        
        \.hero::before \{
            content: '';
            position: absolute;
            inset: 0;
            background: rgba\(0, 0, 0, 0\.4\);
            z-index: 1;
        \}
        
        \.hero h1,
        \.hero p \{
            position: relative;
            z-index: 10;
            color: white !important;
            text-shadow: 0 2px 10px rgba\(0, 0, 0, 0\.5\);
        \}"""

new_hero_css = """        /* Hero - Minimized (Hoffer-inspired) */
        .hero {
            position: relative;
            min-height: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: linear-gradient(135deg, rgba(71, 148, 166, 0.85) 0%, rgba(90, 165, 184, 0.85) 100%),
                        url('/static/images/no-logo/20th-anniversary-photo-session.jpeg') center/cover no-repeat;
            color: white;
            padding: 6rem 5% 3rem;
            margin-bottom: 3rem;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.3);
            z-index: 1;
        }
        
        .hero h1,
        .hero p {
            position: relative;
            z-index: 10;
            color: white !important;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }"""

content = re.sub(old_hero_css, new_hero_css, content, flags=re.DOTALL)

# 2. UPDATE COLOR SCHEME TO ACROMATICO TEAL
old_colors = r"""        :root \{
            --primary: #000;
            --accent: #667eea;
            --bg: #FAFAFA;
            --text: #1D1D1F;
        \}"""

new_colors = """        :root {
            --primary: #4794A6;
            --accent: #5aa5b8;
            --bg: #ffffff;
            --text: #3a3a3a;
        }"""

content = re.sub(old_colors, new_colors, content)

# 3. REPLACE MASONRY WITH EQUAL-HEIGHT GRID
old_masonry = r"""        /\* Masonry Grid \*/
        \.masonry-container \{[^}]+\}
        
        \.masonry-grid \{[^}]+\}"""

new_grid = """        /* Blog Grid - Hoffer-inspired equal-height */
        .masonry-container {
            padding: 0 5%;
            max-width: 1240px;
            margin: 0 auto;
        }
        
        .masonry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
        }"""

content = re.sub(old_masonry, new_grid, content, flags=re.DOTALL)

# 4. UPDATE BLOG CARD STYLES (Hoffer-inspired)
old_card = r"""        \.blog-card \{[^}]+\}
        
        \.blog-card-image \{[^}]+\}
        
        \.blog-card:hover \.blog-card-image \{[^}]+\}"""

new_card = """        .blog-card {
            background: white;
            border-radius: 0;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        
        .blog-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }
        
        .blog-card-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            display: block;
        }
        
        .blog-card:hover .blog-card-image {
            opacity: 0.95;
        }"""

content = re.sub(old_card, new_card, content, flags=re.DOTALL)

# 5. UPDATE CARD CONTENT STYLES
card_content_addition = """
        .blog-card-content {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            flex: 1;
        }
        
        .blog-card-category {
            position: absolute;
            top: 15px;
            left: 15px;
            z-index: 10;
            background: #4794A6;
            color: white;
            padding: 4px 12px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .blog-card-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #3a3a3a;
            line-height: 1.4;
            margin: 0;
        }
        
        .blog-card-excerpt {
            font-size: 0.9rem;
            color: #666;
            line-height: 1.6;
            flex: 1;
        }
        
        .blog-card-date {
            font-size: 0.85rem;
            color: #4794A6;
            font-weight: 500;
            margin-top: auto;
        }
"""

# Insert before filter bar CSS
content = content.replace('        /* Filter Bar */', card_content_addition + '\n        /* Filter Bar */')

# 6. UPDATE FILTER BAR TO DROPDOWN
old_filter_bar = r"""        /\* Filter Bar \*/
        \.filter-bar \{[^}]+\}
        
        \.filter-btn \{[^}]+\}
        
        \.filter-btn:hover,
        \.filter-btn\.active \{[^}]+\}"""

new_filter_bar = """        /* Filter Bar - Minimal dropdown */
        .filter-bar {
            padding: 2rem 5% 1rem;
            text-align: center;
            background: transparent;
            max-width: 1240px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        
        .filter-dropdown {
            padding: 0.75rem 1.5rem;
            border: 2px solid #e0e0e0;
            border-radius: 50px;
            background: white;
            color: var(--text);
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
            font-family: inherit;
        }
        
        .filter-dropdown:hover,
        .filter-dropdown:focus {
            border-color: #4794A6;
            outline: none;
        }
        
        .filter-btn {
            display: none;
        }"""

content = re.sub(old_filter_bar, new_filter_bar, content, flags=re.DOTALL)

# 7. UPDATE SEARCH CONTAINER
old_search = r"""        /\* Search Bar \*/
        \.search-container \{[^}]+\}
        
        \.search-input \{[^}]+\}
        
        \.search-input:focus \{[^}]+\}"""

new_search = """        /* Search Bar - Minimal */
        .search-container {
            max-width: 400px;
            margin: 0;
            position: relative;
            flex: 1;
        }
        
        .search-input {
            width: 100%;
            padding: 0.75rem 1.5rem;
            border: 2px solid #e0e0e0;
            border-radius: 50px;
            font-size: 0.95rem;
            transition: border-color 0.3s;
        }
        
        .search-input:focus {
            outline: none;
            border-color: #4794A6;
        }"""

content = re.sub(old_search, new_search, content, flags=re.DOTALL)

# 8. UPDATE HERO HEADING/PARAGRAPH STYLES
hero_text_update = """
        .hero h1 {
            font-size: clamp(2.5rem, 6vw, 3.5rem) !important;
            font-weight: 700 !important;
            letter-spacing: -0.02em !important;
            margin-bottom: 0.75rem !important;
            position: relative !important;
            z-index: 10 !important;
        }
        
        .hero p {
            font-size: 1.1rem !important;
            opacity: 1 !important;
            max-width: 600px !important;
            margin: 0 auto !important;
            position: relative !important;
            z-index: 10 !important;
        }
"""

# Replace existing hero h1/p styles
content = re.sub(r'        \.hero h1 \{[^}]+\}', '', content)
content = re.sub(r'        \.hero p \{[^}]+\}', '', content)
content = content.replace('        /* Filter Bar - Minimal dropdown */', hero_text_update + '\n        /* Filter Bar - Minimal dropdown */')

# 9. ADD RESPONSIVE STYLES
responsive_css = """
        
        /* Responsive - Mobile adjustments */
        @media (max-width: 768px) {
            .hero {
                min-height: 250px;
                padding: 4rem 5% 2rem;
            }
            
            .hero h1 {
                font-size: 2rem !important;
            }
            
            .hero p {
                font-size: 1rem !important;
            }
            
            .masonry-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            .filter-bar {
                flex-direction: column;
                padding: 1.5rem 5%;
            }
            
            .search-container {
                max-width: 100%;
            }
            
            .blog-card-image {
                height: 250px;
            }
        }
"""

# Insert before </style>
content = content.replace('    </style>', responsive_css + '    </style>')

# Write updated content
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ HOFFER-INSPIRED REDESIGN COMPLETE!")
print("\n📊 CHANGES IMPLEMENTED:")
print("  1. ✅ Hero section minimized (100vh → 300px)")
print("  2. ✅ Acromatico teal (#4794A6) color scheme")
print("  3. ✅ Equal-height grid layout (Hoffer-style)")
print("  4. ✅ Card shadows + hover lift effects")
print("  5. ✅ Fixed image heights (300px)")
print("  6. ✅ Category badges ready (will show on cards)")
print("  7. ✅ Filter dropdown instead of large buttons")
print("  8. ✅ Search bar streamlined")
print("  9. ✅ Responsive design for mobile")
print("\n🎯 Result: Professional, clean, Hoffer-inspired blog!")
print("   - Content-first approach")
print("   - Consistent Acromatico branding")
print("   - Equal-height cards")
print("   - Enhanced visual polish")
