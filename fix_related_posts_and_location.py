#!/usr/bin/env python3
"""
FIX: Related Posts Images + CTA Location Text
- Get actual related post images (not current post images)
- Use actual location in CTA (not venue name)
"""

import os
import json
from bs4 import BeautifulSoup

print("="*80)
print("🔧 FIXING: Related Posts Images + CTA Location Text")
print("="*80)

# Load blog posts data
with open('blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    posts_data = json.load(f)

print(f"✅ Loaded {len(posts_data)} blog posts")

# Pre-process all posts to extract their first image
print("📸 Extracting first image from each post...")
post_first_images = {}

for post in posts_data:
    slug = post.get('slug', '')
    if not slug:
        continue
    
    content_obj = post.get('content', {})
    content_html = content_obj.get('rendered', '') if isinstance(content_obj, dict) else str(content_obj)
    
    content_soup = BeautifulSoup(content_html, 'html.parser')
    all_imgs = content_soup.find_all('img')
    
    # Find first valid image
    for img in all_imgs:
        data_src = img.get('data-src')
        src = img.get('src')
        img_url = data_src if data_src else src
        if img_url and 'acromatico.com/wp-content' in img_url:
            post_first_images[slug] = img_url
            break

print(f"✅ Extracted first image for {len(post_first_images)} posts\n")

def extract_actual_location_from_title_and_content(title, intro_text=""):
    """Extract ACTUAL location (city, state) not venue name"""
    # Common location patterns
    locations = {
        'FL': ['Miami', 'Sarasota', 'Tampa', 'Orlando', 'Fort Lauderdale', 'Key West', 'Naples', 'Palm Beach', 'Boca Raton', 'Davie', 'Florida'],
        'NY': ['NYC', 'New York', 'Manhattan', 'Brooklyn', 'Hudson Valley', 'Cold Spring', 'Long Island'],
        'NC': ['Greensboro', 'Charlotte', 'Raleigh', 'Asheville', 'North Carolina'],
        'PA': ['Lancaster', 'Philadelphia', 'Pittsburgh', 'Pennsylvania'],
        'NJ': ['New Jersey'],
        'CT': ['Connecticut', 'Monroe'],
        'MA': ['Massachusetts', 'Boston'],
        'CA': ['California', 'Los Angeles', 'San Francisco'],
        'TX': ['Texas', 'Austin', 'Dallas', 'Houston']
    }
    
    # First, try to find location in intro text (most reliable)
    if intro_text:
        intro_lower = intro_text.lower()
        for state, cities in locations.items():
            for city in cities:
                if city.lower() in intro_lower:
                    # Found a city, return it with state if not already included
                    if state.lower() not in city.lower():
                        return f"{city}, {state}"
                    else:
                        return city
    
    # Check for explicit location mentions in title
    title_lower = title.lower()
    
    for state, cities in locations.items():
        for city in cities:
            if city.lower() in title_lower:
                # Found a city, return it with state if not already included
                if state.lower() not in city.lower():
                    return f"{city}, {state}"
                else:
                    return city
    
    # If no specific location found, try to extract from end of title
    if '|' in title:
        parts = title.split('|')
        last_part = parts[-1].strip()
        
        # Clean up common suffixes
        last_part = last_part.replace("'s Dream Celebration in the", "").replace("&#8221;", "").strip()
        
        # If it looks like a location (short and contains state abbreviation)
        if len(last_part) < 50 and any(state in last_part for state in locations.keys()):
            return last_part
    
    # Default fallback
    return "South Florida"

print("🔧 Fixing all posts...")
success_count = 0
error_count = 0

for idx, post in enumerate(posts_data):
    try:
        slug = post.get('slug', '')
        if not slug:
            continue
        
        file_path = f'public/static/blog/{slug}.html'
        
        # Check if file exists
        if not os.path.exists(file_path):
            continue
        
        # Read existing HTML
        with open(file_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Parse HTML
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Extract title for location
        title_tag = soup.find('title')
        if not title_tag:
            continue
        
        title = title_tag.string.replace(' | Acromatico Photography', '')
        
        # Also extract intro text to find location
        intro_div = soup.find('div', class_='post-intro')
        intro_text = ""
        if intro_div:
            intro_p = intro_div.find('p')
            if intro_p:
                intro_text = intro_p.get_text()
        
        actual_location = extract_actual_location_from_title_and_content(title, intro_text)
        
        # FIX 1: Update CTA location text
        # Find the end-of-post CTA
        cta_section = soup.find('div', class_='cta-section end-post')
        if cta_section:
            cta_h2 = cta_section.find('h2')
            if cta_h2:
                # Update to use actual location
                cta_h2.string = f"Ready to Book Your {actual_location} Photographer?"
        
        # FIX 2: Fix Related Posts images
        # Find related posts grid
        related_grid = soup.find('div', class_='related-posts-grid')
        if related_grid:
            related_articles = related_grid.find_all('article', class_='related-post')
            
            for i, article in enumerate(related_articles):
                # Get the related post's actual slug from the link
                link = article.find('a')
                if link and link.get('href'):
                    related_slug = link.get('href').replace('/blog/', '')
                    
                    # Get the actual first image for this related post
                    if related_slug in post_first_images:
                        actual_image = post_first_images[related_slug]
                        
                        # Update the image src
                        img = article.find('img')
                        if img:
                            img['src'] = actual_image
                            # Also update alt text
                            related_title = link.get_text() if link else "Related post"
                            img['alt'] = related_title
        
        # Write updated HTML
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        success_count += 1
        
        if (idx + 1) % 50 == 0:
            print(f"✅ {idx + 1}/{len(posts_data)} posts fixed...")
        
    except Exception as e:
        print(f"❌ Error on {post.get('slug', 'unknown')}: {e}")
        error_count += 1

print(f"\n{'='*80}")
print(f"✅ SUCCESS: {success_count} posts fixed!")
print(f"❌ ERRORS: {error_count} posts")
print(f"{'='*80}\n")
print("🎉 FIXES APPLIED:")
print("   ✅ Related Posts now show actual images from each related post")
print("   ✅ CTA location text now uses actual location (not venue name)")
print("\nExamples:")
print("   - 'Ready to Book Your South Florida Photographer?'")
print("   - 'Ready to Book Your Greensboro, NC Photographer?'")
print("   - 'Ready to Book Your NYC Photographer?'")
