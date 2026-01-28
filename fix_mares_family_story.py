#!/usr/bin/env python3
"""
Rewrite blog post content using the ACTUAL original story from each post's JSON data.
Extract the real story and enhance it authentically.
"""

import json
import os
from pathlib import Path
from bs4 import BeautifulSoup
import html

# Load all posts with original content
with open('public/static/blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    all_posts = json.load(f)

def extract_text_from_html(html_content):
    """Extract clean text from HTML"""
    soup = BeautifulSoup(html_content, 'html.parser')
    # Remove scripts and styles
    for script in soup(["script", "style"]):
        script.decompose()
    return soup.get_text(separator=' ', strip=True)

def fix_blog_post_content(slug):
    """Fix a single blog post using its original story"""
    
    # Find the post in JSON data
    post_data = next((p for p in all_posts if p['slug'] == slug), None)
    
    if not post_data:
        return False
    
    html_file = f'public/static/blog/{slug}.html'
    
    if not os.path.exists(html_file):
        return False
    
    # Extract original content from JSON
    original_content_html = post_data.get('content', {}).get('rendered', '')
    original_text = extract_text_from_html(original_content_html)
    
    # If we have substantial original content, use it
    if len(original_text) < 100:
        return False  # Skip if no real content
    
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    content_container = soup.find('div', class_='content-container')
    if not content_container:
        return False
    
    # Find intro paragraph
    post_intro = content_container.find('div', class_='post-intro')
    
    if post_intro:
        # Clear existing generic content
        post_intro.clear()
        
        # Use the ORIGINAL content as intro
        # Take first 3-4 paragraphs from original
        original_paras = original_text.split('. ')[:4]
        intro_text = '. '.join(original_paras) + '.'
        
        intro_p = soup.new_tag('p')
        intro_p.string = intro_text
        post_intro.append(intro_p)
    
    # Remove the generic content sections (Ceremony, Portraits, Reception, Details)
    # These were generic and don't match the real story
    for section in content_container.find_all('h2', class_='section-heading'):
        section_text = section.get_text()
        if any(word in section_text for word in ['Emotional Ceremony', 'Couple Portraits', 'Reception Celebration', 'Details That Made']):
            # Remove this section and its content
            next_elem = section.next_sibling
            section.decompose()
            if next_elem and next_elem.name == 'div' and 'section-text' in next_elem.get('class', []):
                next_elem.decompose()
    
    # Save
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    return True

# For the Mares family post specifically, let's fix it properly
print("🔧 Fixing 20th Anniversary (Mares Family) post with REAL story...")

if fix_blog_post_content('20th-anniversary-photo-session'):
    print("✅ Fixed Mares family post with authentic content")
else:
    print("❌ Could not fix Mares family post")

print("\nℹ️  To fix all 501 posts, we need to:")
print("   1. Extract each post's original story from JSON")
print("   2. Rewrite content sections based on REAL details")
print("   3. Remove generic wedding/ceremony language")
print("   4. Use actual names, locations, and stories")
