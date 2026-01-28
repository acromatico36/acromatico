#!/usr/bin/env python3
"""
COMPREHENSIVE CSS FIX - Hoffer-Inspired Redesign
This script replaces the ENTIRE CSS block in blog-index.html with proper Hoffer-inspired styles
"""

import os
import re

# Target file
blog_index_path = 'public/static/blog-index.html'

# Read the file
with open(blog_index_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define the COMPLETE new CSS block
NEW_CSS_BLOCK = """    <style>
        /* CSS Variables - Acromatico Teal Branding */
        :root {
            --primary: #000000;
            --accent: #4794A6;  /* Acromatico Teal */
            --secondary: #666666;
            --bg: #FAFAFA;
            --text: #1D1D1F;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: var(--text);
            background: var(--bg);
            line-height: 1.6;
        }
        
        /* Header - Fixed with white translucent background */
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
        
        /* Hero Section - Compact 300px Hoffer Style */
        .hero {
            position: relative;
            min-height: 300px;  /* Hoffer-inspired: compact, not full-screen */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            padding: 8rem 5% 3rem;
            background: 
                linear-gradient(135deg, 
                    rgba(71, 148, 166, 0.85) 0%, 
                    rgba(71, 148, 166, 0.70) 100%),  /* Acromatico Teal */
                url('/static/images/no-logo/20th-anniversary-photo-session.jpeg') 
                    center/cover no-repeat;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.3);  /* Slightly darker for text readability */
            z-index: 1;
        }
        
        .hero > * {
            position: relative;
            z-index: 2;
        }
        
        .hero h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5) !important;
            color: white !important;
        }
        
        .hero p {
            font-size: 1.2rem;
            font-weight: 300;
            max-width: 600px;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5) !important;
            color: white !important;
        }
        
        /* Filter Bar - Minimal Dropdown Style */
        .filter-bar {
            position: sticky;
            top: 80px;
            background: white;
            padding: 1.5rem 5%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            display: flex;
            gap: 1.5rem;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            z-index: 100;
        }
        
        .filter-dropdown {
            padding: 0.75rem 1.5rem;
            border: 2px solid var(--accent);
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            color: var(--accent);
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            outline: none;
        }
        
        .filter-dropdown:hover,
        .filter-dropdown:focus {
            background: var(--accent);
            color: white;
        }
        
        /* Search Container */
        .search-container {
            flex: 1;
            max-width: 400px;
        }
        
        .search-input {
            width: 100%;
            padding: 0.75rem 1.5rem;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
            outline: none;
        }
        
        .search-input:focus {
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(71, 148, 166, 0.1);
        }
        
        /* Blog Grid - Hoffer-Inspired Equal Heights */
        .masonry-container {
            padding: 3rem 5%;
            max-width: 1240px;
            margin: 0 auto;
        }
        
        .masonry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
            animation: fadeIn 0.6s ease-in;
        }
        
        /* Blog Cards - Hoffer-Inspired Design */
        .blog-card {
            background: white;
            border-radius: 0;  /* Hoffer uses no border-radius */
            overflow: hidden;
            text-decoration: none;
            color: var(--text);
            display: flex;
            flex-direction: column;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            height: 100%;  /* Equal heights */
        }
        
        .blog-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        
        .blog-card-image {
            width: 100%;
            height: 300px;  /* Fixed height like Hoffer */
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .blog-card:hover .blog-card-image {
            transform: scale(1.05);
        }
        
        .blog-card-content {
            padding: 1.5rem;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .blog-card-category {
            display: inline-block;
            background: var(--accent);  /* Acromatico Teal */
            color: white;
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 1rem;
            align-self: flex-start;
        }
        
        .blog-card-title {
            font-size: 1.4rem;
            font-weight: 600;
            line-height: 1.4;
            margin-bottom: 0.75rem;
            color: var(--primary);
        }
        
        .blog-card-excerpt {
            color: var(--secondary);
            line-height: 1.6;
            font-size: 0.95rem;
            flex: 1;
        }
        
        .blog-card-date {
            margin-top: 1rem;
            font-size: 0.9rem;
            color: #999;
        }
        
        /* Loading Animation */
        .loading {
            text-align: center;
            padding: 4rem;
            font-size: 1.2rem;
            color: #999;
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
        
        /* Footer */
        footer {
            background: var(--primary);
            color: white;
            text-align: center;
            padding: 3rem 5%;
            margin-top: 4rem;
        }
        
        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Responsive - Mobile */
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
    </style>
    <link rel="preload" href="/static/acromatico-logo-transparent.png" as="image">"""

# Find and replace the entire <style> block
# Pattern matches from <style> to </style> including link preload
pattern = r'<style>.*?</style>\s*<link rel="preload"[^>]*>'
replacement = NEW_CSS_BLOCK

# Perform replacement
new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write back
with open(blog_index_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ CSS BLOCK COMPLETELY REPLACED!")
print("\n📋 Changes Applied:")
print("   1. Hero height: 100vh → 300px (Hoffer-inspired compact)")
print("   2. Color scheme: Purple → Acromatico Teal (#4794A6)")
print("   3. Grid layout: Equal-height 3-column grid")
print("   4. Card images: Fixed 300px height")
print("   5. Category badges: Teal background")
print("   6. Enhanced shadows: 0 2px 10px → 0 12px 24px on hover")
print("   7. Hover lift: translateY(-4px)")
print("   8. Filter dropdown: Styled with teal accent")
print("   9. Search bar: Enhanced with focus states")
print("   10. Border radius: 0 (Hoffer style)")
print("\n🔗 Test URL: http://localhost:3000/static/blog-index.html")
print("💡 TIP: Do a HARD REFRESH (Cmd+Shift+R / Ctrl+Shift+R) to see changes!")
