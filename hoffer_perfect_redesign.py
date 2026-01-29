#!/usr/bin/env python3
"""
COMPLETE HOFFER BLOG REDESIGN - Perfect Pixel Match
Based on https://hofferphotography.com/blog/

Key Hoffer Design Elements:
1. NO HERO SECTION - photography grid starts immediately
2. Card images: 200px height, grayscale filter, blur on hover
3. Title overlay on images with gradient background
4. Green #728012 accent color throughout
5. Montserrat font family
6. Tight 3-column equal-height grid
7. Minimal whitespace, photography-first approach
"""

import os
import re

blog_index_path = 'public/static/blog-index.html'

with open(blog_index_path, 'r', encoding='utf-8') as f:
    content = f.read()

# NEW CSS BLOCK - Perfect Hoffer Match
NEW_CSS = """    <style>
        /* Hoffer-Inspired Design */
        :root {
            --primary: #FFFFFF;  /* Hoffer white */
            --accent: #728012;  /* Hoffer green */
            --text: #3a3a3a;  /* Hoffer dark gray */
            --bg: #FFFFFF;  /* Pure white background */
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-weight: 400;
            color: var(--text);
            background: var(--bg);
            line-height: 1.6;
        }
        
        /* Header */
        .site-header {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 9999 !important;
            padding: 15px 40px !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            background: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(10px) !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08) !important;
        }
        
        .site-logo {
            max-width: 160px !important;
            height: auto !important;
        }
        
        /* Hamburger Menu */
        .menu-toggle {
            position: fixed !important;
            top: 20px !important;
            right: 30px !important;
            z-index: 10000 !important;
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 6px !important;
            padding: 8px !important;
            border: none !important;
            cursor: pointer !important;
            width: 36px !important;
            height: 36px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 5px !important;
        }
        
        .menu-toggle span {
            display: block !important;
            width: 24px !important;
            height: 2px !important;
            background: #ffffff !important;
            transition: all 0.3s ease !important;
            border-radius: 2px !important;
        }
        
        .menu-toggle:hover {
            background: rgba(114, 128, 18, 0.9) !important;
        }
        
        /* NO HERO - Photography First */
        .hero {
            display: none !important;  /* Remove hero completely */
        }
        
        /* Filter Bar - Minimal Hoffer Style */
        .filter-bar {
            position: sticky;
            top: 60px;
            background: white;
            padding: 1rem 5%;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
            display: flex;
            gap: 1rem;
            align-items: center;
            justify-content: center;
            z-index: 100;
            margin-top: 60px;  /* Account for fixed header */
        }
        
        .filter-dropdown {
            padding: 0.6rem 1.2rem;
            border: 1px solid var(--accent);
            border-radius: 4px;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--accent);
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Montserrat', sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .filter-dropdown:hover,
        .filter-dropdown:focus {
            background: var(--accent);
            color: white;
        }
        
        /* Search */
        .search-container {
            flex: 1;
            max-width: 300px;
        }
        
        .search-input {
            width: 100%;
            padding: 0.6rem 1.2rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 0.9rem;
            font-family: 'Montserrat', sans-serif;
            transition: all 0.3s ease;
        }
        
        .search-input:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 2px rgba(114, 128, 18, 0.1);
        }
        
        /* Blog Grid - Hoffer 3-Column Equal Height */
        .masonry-container {
            padding: 2rem 5% 4rem;
            max-width: 1240px;
            margin: 0 auto;
        }
        
        .masonry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
            gap: 1.5rem;  /* Tight spacing like Hoffer */
        }
        
        /* Blog Cards - Perfect Hoffer Match */
        .blog-card {
            background: white;
            border-radius: 10px;  /* Hoffer uses rounded corners on cards */
            overflow: hidden;
            text-decoration: none;
            color: var(--text);
            display: flex;
            flex-direction: column;
            box-shadow: 0 6px 15px -2px rgba(16, 24, 40, 0.05);
            transition: all 0.3s ease;
            height: 100%;
            position: relative;
        }
        
        .blog-card:hover {
            box-shadow: 0 12px 24px -2px rgba(16, 24, 40, 0.12);
        }
        
        .blog-card-image-wrapper {
            position: relative;
            width: 100%;
            height: 200px;  /* Hoffer card height */
            overflow: hidden;
        }
        
        .blog-card-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.5s ease;
            filter: saturate(0%) contrast(67%) brightness(100%);  /* Hoffer grayscale */
        }
        
        .blog-card:hover .blog-card-image {
            transform: scale(1.02);
            filter: saturate(0%) contrast(100%) brightness(100%) blur(1px);  /* Hoffer hover effect */
        }
        
        /* Title Overlay - Hoffer Style */
        .blog-card-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.6) 70%);
            padding: 1.5rem 1rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            text-align: center;
        }
        
        .blog-card-title {
            font-size: 1.4rem;
            font-weight: 400;
            line-height: 1.3;
            color: white;
            font-family: 'Montserrat', sans-serif;
            margin-bottom: 0.5rem;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        
        /* Category Badge - Hoffer Style */
        .blog-card-category {
            font-size: 0.75rem;
            font-weight: 300;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: white;
            font-family: 'Montserrat', sans-serif;
        }
        
        /* Card Content Below Image */
        .blog-card-content {
            padding: 0;  /* No padding - Hoffer shows title on image */
            flex: 1;
            display: none;  /* Hide - Hoffer only shows title on image */
        }
        
        .blog-card-excerpt,
        .blog-card-date {
            display: none;  /* Hoffer doesn't show these */
        }
        
        /* Loading */
        .loading {
            text-align: center;
            padding: 4rem;
            font-size: 1.1rem;
            color: #999;
            font-family: 'Montserrat', sans-serif;
        }
        
        .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid var(--accent);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        /* Animations */
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .masonry-grid {
                grid-template-columns: 1fr;
                gap: 1.25rem;
            }
            
            .filter-bar {
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .search-container {
                max-width: 100%;
            }
            
            .blog-card-image-wrapper {
                height: 180px;
            }
        }
    </style>
    <link rel="preload" href="/static/acromatico-logo-transparent.png" as="image">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">"""

# Replace CSS block
pattern = r'<style>.*?</style>\s*<link rel="preload"[^>]*>'
new_content = re.sub(pattern, NEW_CSS, content, flags=re.DOTALL)

# Update renderBlogPosts function to match Hoffer card structure
old_render = r'''card\.innerHTML = `
                    <img src="\${post\.image}" alt="\${post\.title}" class="blog-card-image" loading="lazy">
                    <span class="blog-card-category">\${post\.category}</span>
                    <div class="blog-card-content">
                        <h3 class="blog-card-title">\${post\.title}</h3>
                        <p class="blog-card-excerpt">\${post\.excerpt}</p>
                        <p class="blog-card-date">\${post\.date}</p>
                    </div>
                `;'''

new_render = '''card.innerHTML = `
                    <div class="blog-card-image-wrapper">
                        <img src="${post.image}" alt="${post.title}" class="blog-card-image" loading="lazy">
                        <div class="blog-card-overlay">
                            <h3 class="blog-card-title">${post.title}</h3>
                            <span class="blog-card-category">${post.category}</span>
                        </div>
                    </div>
                `;'''

new_content = new_content.replace(old_render, new_render)

# Write back
with open(blog_index_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ PERFECT HOFFER BLOG REDESIGN COMPLETE!")
print("\n🎨 Hoffer Design Elements Implemented:")
print("   1. NO HERO SECTION - Photography grid starts immediately")
print("   2. Card images: 200px height with grayscale filter")
print("   3. Title overlay on images with gradient background")
print("   4. Green #728012 accent color (Hoffer green)")
print("   5. Montserrat font family throughout")
print("   6. Tight 3-column grid with 1.5rem gap")
print("   7. Rounded 10px corners on cards")
print("   8. Grayscale + blur hover effect")
print("   9. Category badges in uppercase with letter-spacing")
print("   10. Minimal whitespace, photography-first")
print("\n🔗 Test URL: http://localhost:3000/static/blog-index.html")
print("💡 Hard refresh (Cmd+Shift+R) to see changes!")
