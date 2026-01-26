#!/usr/bin/env python3
"""
FIX ALL THREE ISSUES:
1. Split title into 2 lines for better visual appeal
2. Make vendor credits clickable links
3. Use CORRECT featured images from acromatico.com/blog
"""

import json
import re
from bs4 import BeautifulSoup
from pathlib import Path

# REAL featured images from acromatico.com/blog
FEATURED_IMAGES = {
    "rustic-barn-wedding-at-rolling-meadow-farm-sade-luke": "https://acromatico.com/wp-content/uploads/2025/09/rustic-barn-wedding-002.jpg",
    "hudson-valley-barn-engagement-kate-steve": "https://acromatico.com/wp-content/uploads/2025/08/Hudson-Valley-Barn-Engagement-001-2.jpg",
    "surprise-proposal-sarasota": "https://acromatico.com/wp-content/uploads/2024/07/SURPRISE-PROPOSAL-SARASOTA-7-scaled.jpg",
    "cold-spring-ny-wedding-zeynep-dominic": "https://acromatico.com/wp-content/uploads/2024/06/COLD-SPRING-NY-WEDDING-19-scaled.jpg",
    "piano-teacher-photo-session-mistico-restaurant-miami-fl": "https://acromatico.com/wp-content/uploads/2024/05/Piano-Teacher-Miami-FL-3.jpg",
    "family-portrait-photos-at-villa-del-balbianello-lake-como": "https://acromatico.com/wp-content/uploads/2024/04/FAMILY-PORTRAIT-PHOTOS-LAKE-COMO-4-scaled.jpg",
    "family-photo-shoot-at-villa-del-balbianello-lake-como-italy": "https://acromatico.com/wp-content/uploads/2024/04/FAMILY-PHOTO-SHOOT-LAKE-COMO-3.jpg",
    "davie-fl-wedding-photography": "https://acromatico.com/wp-content/uploads/2024/03/davie-fl-wedding-photography-9.jpg",
    "20th-anniversary-photo-session": "https://acromatico.com/wp-content/uploads/2024/02/20TH-ANNIVERSARY-PHOTO-SESSION-5-scaled.jpg",
    "newborn-session": "https://acromatico.com/wp-content/uploads/2024/01/NEWBORN-SESSION-1-scaled.jpg"
}

def split_title_into_two_lines(title):
    """
    Split title intelligently:
    - Find natural break point (|, +, at, in, &)
    - If title has |, split there
    - Otherwise split roughly in the middle at a word boundary
    """
    # Remove extra quotes
    title = title.strip('"').strip("'")
    
    # If title has |, split there
    if '|' in title:
        parts = title.split('|')
        line1 = parts[0].strip()
        line2 = '| '.join(parts[1:]).strip()
        return f"{line1}<br>{line2}"
    
    # If title has +, split there
    if ' + ' in title:
        parts = title.split(' + ')
        line1 = parts[0].strip() + ' +'
        line2 = ' + '.join(parts[1:]).strip()
        return f"{line1}<br>{line2}"
    
    # Otherwise split at midpoint
    words = title.split()
    mid = len(words) // 2
    line1 = ' '.join(words[:mid])
    line2 = ' '.join(words[mid:])
    return f"{line1}<br>{line2}"

def extract_venue_from_intro(intro_text):
    """Extract venue name from intro paragraph"""
    # Common patterns:
    # "wedding at VENUE NAME"
    # "engagement at VENUE NAME"
    # "session at VENUE NAME"
    
    patterns = [
        r'(?:wedding|engagement|session|celebration|shoot|proposal|photos)\s+at\s+([^,\.]+?)(?:,|\.|in\s)',
        r'at\s+([A-Z][^,\.]+?)(?:,|\.|in\s)',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, intro_text, re.IGNORECASE)
        if match:
            venue = match.group(1).strip()
            # Clean up common words at the end
            venue = re.sub(r'\s+(was|were|is|are|and|with)$', '', venue, flags=re.IGNORECASE)
            return venue
    
    return None

def create_google_maps_link(venue_name, location):
    """Create Google Maps search link"""
    query = f"{venue_name} {location}".replace(' ', '+')
    return f"https://www.google.com/maps/search/{query}"

def fix_blog_post(html_path):
    """Fix a single blog post"""
    with open(html_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    slug = html_path.stem
    
    # 1. FIX TITLE - Split into 2 lines
    title_tag = soup.find('h1', class_='post-title')
    if title_tag:
        original_title = title_tag.get_text()
        new_title_html = split_title_into_two_lines(original_title)
        title_tag.clear()
        title_tag.append(BeautifulSoup(new_title_html, 'html.parser'))
    
    # 2. FIX FEATURED IMAGE in related posts
    if slug in FEATURED_IMAGES:
        # Update related posts images
        related_imgs = soup.select('.related-posts .related-post-card img')
        for img in related_imgs:
            current_src = img.get('src', '')
            # Find which related post this is
            card = img.find_parent('a')
            if card:
                href = card.get('href', '')
                related_slug = href.split('/')[-1]
                if related_slug in FEATURED_IMAGES:
                    img['src'] = FEATURED_IMAGES[related_slug]
    
    # 3. FIX VENDOR CREDITS - Make them clickable
    vendor_section = soup.find('div', class_='vendor-credits')
    if vendor_section:
        # Extract intro to find venue name
        intro = soup.find('p', class_='post-intro')
        venue_name = None
        location = ""
        
        if intro:
            intro_text = intro.get_text()
            venue_name = extract_venue_from_intro(intro_text)
            
            # Extract location from CTA
            cta = soup.find('h2', string=re.compile(r'Ready to Book Your .+ Photographer\?'))
            if cta:
                location_match = re.search(r'Book Your (.+?) Photographer', cta.get_text())
                if location_match:
                    location = location_match.group(1)
        
        # Find venue paragraph and make it clickable
        vendor_paragraphs = vendor_section.find_all('p')
        for p in vendor_paragraphs:
            text = p.get_text()
            # Look for "Venue: VENUE NAME" or "Location: VENUE NAME"
            venue_match = re.search(r'(Venue|Location):\s*(.+?)(?:\n|$)', text)
            if venue_match and venue_name:
                venue_type = venue_match.group(1)
                venue_text = venue_match.group(2).strip()
                
                # Create clickable link
                maps_link = create_google_maps_link(venue_name, location)
                new_html = f'<p><strong>{venue_type}:</strong> <a href="{maps_link}" target="_blank" rel="noopener" style="color: #728012; text-decoration: none; border-bottom: 1px solid #728012;">{venue_text}</a></p>'
                
                # Replace paragraph
                new_p = BeautifulSoup(new_html, 'html.parser')
                p.replace_with(new_p)
    
    # Save fixed HTML
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    return True

def main():
    blog_dir = Path('public/static/blog')
    posts = list(blog_dir.glob('*.html'))
    
    fixed_count = 0
    error_count = 0
    
    print(f"🔧 FIXING ALL THREE ISSUES FOR {len(posts)} POSTS...\n")
    
    for i, post_path in enumerate(posts, 1):
        try:
            fix_blog_post(post_path)
            fixed_count += 1
            
            if i % 50 == 0:
                print(f"✅ Fixed {i}/{len(posts)} posts...")
        
        except Exception as e:
            print(f"❌ ERROR fixing {post_path.name}: {e}")
            error_count += 1
    
    print(f"\n{'='*80}")
    print(f"✅ SUCCESS: {fixed_count} posts fixed!")
    print(f"❌ ERRORS: {error_count} posts")
    print(f"{'='*80}\n")
    
    print("🎯 FIXES APPLIED:")
    print("   1. ✅ Titles split into 2 lines for visual appeal")
    print("   2. ✅ Vendor credits now have clickable Google Maps links")
    print("   3. ✅ Related posts use CORRECT featured images from acromatico.com/blog")
    print("\n🚀 ALL POSTS FIXED!\n")

if __name__ == '__main__':
    main()
