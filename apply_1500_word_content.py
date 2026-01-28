#!/usr/bin/env python3
"""
Apply 1500-word SEO content sections to ALL blog posts
Takes NEW-CONTENT-SECTIONS.html as template and customizes for each post
"""

import os
import json
import re
from bs4 import BeautifulSoup

print("="*80)
print("🚀 APPLYING 1500-WORD CONTENT TO ALL BLOG POSTS")
print("="*80)

# Load the content template
with open('public/static/blog/NEW-CONTENT-SECTIONS.html', 'r', encoding='utf-8') as f:
    template_content = f.read()

# Load blog posts data
with open('public/static/blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    posts_data = json.load(f)

def extract_location_from_title(title):
    """Extract location from title"""
    patterns = [
        r'(?:at|in)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:,\s*[A-Z]{2})?)',
        r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:Wedding|Engagement|Session)',
    ]
    for pattern in patterns:
        match = re.search(pattern, title)
        if match:
            return match.group(1)
    return "this beautiful location"

def get_category(title):
    """Determine category from title"""
    title_lower = title.lower()
    if 'wedding' in title_lower:
        return 'Wedding'
    elif 'engagement' in title_lower:
        return 'Engagement'
    elif 'maternity' in title_lower:
        return 'Maternity'
    elif 'newborn' in title_lower or 'baby' in title_lower:
        return 'Newborn'
    elif 'family' in title_lower:
        return 'Family'
    elif 'anniversary' in title_lower:
        return 'Anniversary'
    elif 'portrait' in title_lower:
        return 'Portrait'
    else:
        return 'Photo Session'

def customize_content(template, title, location, category, slug):
    """Customize template content for specific post"""
    # Replace Madison & Jordan with couple names
    couple_names = title.split('|')[0].strip() if '|' in title else "this couple"
    
    # Generic customization
    content = template.replace("Madison & Jordan", couple_names)
    content = content.replace("Madison and Jordan", couple_names)
    content = content.replace("Cork Factory Hotel", location)
    content = content.replace("Lancaster", location.split(',')[0] if ',' in location else location)
    content = content.replace("Pennsylvania", "")
    
    # Customize for category
    if category == 'Family':
        content = content.replace("wedding", "family session")
        content = content.replace("ceremony", "photo session")
        content = content.replace("reception", "family time")
    elif category == 'Engagement':
        content = content.replace("wedding day", "engagement session")
        content = content.replace("ceremony", "photo session")
    elif category == 'Maternity':
        content = content.replace("wedding", "maternity session")
        content = content.replace("ceremony", "photo session")
    
    return content

# Process each blog post
blog_dir = 'public/static/blog'
blog_files = [f for f in os.listdir(blog_dir) if f.endswith('.html') and not f.startswith(('NEW-', 'madison', 'blog-', 'hoffer', 'photography', 'index', 'our-story', 'test', 'homepage'))]

print(f"\n📝 Processing {len(blog_files)} blog posts...")

updated_count = 0

for filename in blog_files:
    file_path = os.path.join(blog_dir, filename)
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            html = f.read()
        
        soup = BeautifulSoup(html, 'html.parser')
        
        # Extract title
        title_tag = soup.find('h1', class_='post-title')
        if not title_tag:
            continue
        title = title_tag.get_text(strip=True)
        
        # Get location and category
        location = extract_location_from_title(title)
        category = get_category(title)
        slug = filename.replace('.html', '')
        
        # Customize content for this post
        customized_content = customize_content(template_content, title, location, category, slug)
        
        # Find insertion point (after post-intro or after hero)
        post_intro = soup.find('div', class_='post-intro')
        if not post_intro:
            continue
        
        # Check if content sections already exist
        if soup.find('h2', string=re.compile('Timeline|Ceremony|Details|FAQ')):
            continue  # Already has content
        
        # Insert the content sections after post-intro
        content_soup = BeautifulSoup(customized_content, 'html.parser')
        
        # Find gallery container (we insert BEFORE the gallery)
        gallery = soup.find('div', class_='gallery-container')
        if gallery:
            # Insert all content sections before gallery
            for element in content_soup:
                if element.name:
                    new_elem = soup.new_tag(element.name)
                    new_elem.string = element.get_text()
                    for attr, value in element.attrs.items():
                        new_elem[attr] = value
                    gallery.insert_before(element)
        
        # Write updated HTML
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup.prettify()))
        
        updated_count += 1
        if updated_count % 50 == 0:
            print(f"  ✓ Updated {updated_count} posts...")
    
    except Exception as e:
        print(f"  ❌ Error processing {filename}: {e}")
        continue

print(f"\n✅ COMPLETE: Updated {updated_count} blog posts with 1500-word content!")
print(f"📊 Each post now includes:")
print(f"  • Timeline/Story sections")
print(f"  • Ceremony/Session details")
print(f"  • Golden hour portraits")
print(f"  • Reception/Activity details")
print(f"  • Special details")
print(f"  • Vendor credits")
print(f"  • FAQ section")
print(f"\n🎯 Content is customized per post based on:")
print(f"  • Couple/subject names")
print(f"  • Location")
print(f"  • Category (wedding, family, etc.)")
