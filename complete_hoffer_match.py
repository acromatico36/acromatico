#!/usr/bin/env python3
"""
COMPLETE HOFFER MATCH - Remove ALL hero elements, show ONLY blog grid
"""

import re

blog_index_path = 'public/static/blog-index.html'

with open(blog_index_path, 'r', encoding='utf-8') as f:
    content = f.read()

print("🔧 CREATING PERFECT HOFFER MATCH...")

# STEP 1: Remove the entire hero section from HTML
print("\n1. Removing hero section HTML...")
hero_pattern = r'<!-- Hero -->\s*<section class="hero">.*?</section>'
content = re.sub(hero_pattern, '', content, flags=re.DOTALL)

# Also remove any standalone h1 with "Love Stories"
content = re.sub(r'<h1[^>]*>Love Stories</h1>', '', content)
content = re.sub(r'<section class="hero">.*?</section>', '', content, flags=re.DOTALL)

# STEP 2: Remove filter bar completely (Hoffer doesn't have it prominently)
print("2. Hiding filter bar...")
filter_pattern = r'<!-- Filter Bar.*?-->\s*<section class="filter-bar">.*?</section>'
content = re.sub(filter_pattern, '', content, flags=re.DOTALL)

# STEP 3: Update CSS to ensure hero is truly hidden
print("3. Updating CSS...")
old_hero_css = r'\.hero \{[^}]*display: none !important;[^}]*\}'
new_hero_css = '''.hero {
            display: none !important;
            height: 0 !important;
            min-height: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: hidden !important;
            visibility: hidden !important;
        }
        
        /* Filter bar - minimal, hidden by default */
        .filter-bar {
            display: none !important;
        }'''

content = re.sub(old_hero_css, new_hero_css, content, flags=re.DOTALL)

# STEP 4: Adjust masonry container to start immediately after header
print("4. Adjusting grid to start immediately after header...")

# Update masonry-container CSS
old_masonry = r'\.masonry-container \{[^}]*\}'
new_masonry = '''.masonry-container {
            padding: 2rem 5% 4rem;
            max-width: 1240px;
            margin: 80px auto 0;  /* 80px for fixed header */
        }'''

content = re.sub(old_masonry, new_masonry, content)

# STEP 5: Ensure loading indicator is properly placed
print("5. Ensuring loading state displays correctly...")

# Make sure loading div is visible and positioned correctly
if 'id="loading"' in content:
    content = re.sub(
        r'<div class="loading" id="loading">',
        '<div class="loading" id="loading" style="margin-top: 100px;">',
        content
    )

# STEP 6: Fix title in head
print("6. Updating page title...")
content = re.sub(
    r'<title>[^<]*</title>',
    '<title>Blog - Acromatico Photography | Real Wedding Stories</title>',
    content
)

# Write the updated content
with open(blog_index_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ PERFECT HOFFER MATCH COMPLETE!")
print("\n🎯 Changes Made:")
print("   1. Removed hero section completely (NO 'Love Stories' heading)")
print("   2. Hidden filter bar (minimalist approach)")
print("   3. Grid starts immediately after header")
print("   4. Margin-top: 80px to account for fixed header")
print("   5. Loading state positioned correctly")
print("\n📸 Result: PURE PHOTOGRAPHY GRID - Just like Hoffer!")
print("🔗 Test: http://localhost:3000/static/blog-index.html")
