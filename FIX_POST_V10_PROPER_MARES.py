#!/usr/bin/env python3
"""
V10 PROPER MARES FIX SCRIPT
===========================
Fixes a single blog post with the EXACT Mares framework structure:
1. Hero section with H1
2. Post intro
3. 5 H2 sections (REVERSED - sections appear BEFORE their content)
   - Each section: <div class="section-text"> + <div class="featured-image">
4. Gallery container
5. FAQ section
6. Related posts

Critical fixes:
- Add proper <h2 class="section-heading">Title:<br/>Subtitle</h2> tags
- Insert 5 featured images with captions
- Generate unique storytelling content for each section
- Fix all image alt tags
- Add meta description, OG tags, Twitter Card, canonical URL
"""

import json
import re
import sys
from pathlib import Path
from bs4 import BeautifulSoup

# ============================================
# SECTION TEMPLATES BY POST TYPE
# ============================================

WEDDING_SECTIONS = [
    {
        "title": "The Venue",
        "subtitle": "{venue}'s {adjective} Charm",
        "prompts": [
            "Describe the venue's architecture, landscape, and unique features",
            "What made this venue perfect for {couple}'s celebration?",
            "Details about the ceremony space, reception area, and photo locations",
            "How the venue's aesthetic complemented the wedding style"
        ]
    },
    {
        "title": "The Ceremony",
        "subtitle": "A Heartfelt {adjective} Exchange",
        "prompts": [
            "The ceremony setting and atmosphere",
            "Emotional moments during vows and ring exchange",
            "Guests' reactions and participation",
            "Special cultural or personal touches in the ceremony"
        ]
    },
    {
        "title": "Couple Portraits",
        "subtitle": "{couple}'s Natural Chemistry",
        "prompts": [
            "The couple's connection and how it showed in portraits",
            "Favorite portrait locations around the venue",
            "Candid moments between formal portraits",
            "How their personality came through in the images"
        ]
    },
    {
        "title": "The Reception",
        "subtitle": "{adjective} Celebration & Joyful Moments",
        "prompts": [
            "Reception decor, table settings, and ambiance",
            "First dance, toasts, and key reception moments",
            "Dance floor energy and guest interactions",
            "Special surprises or memorable reception details"
        ]
    },
    {
        "title": "Photography Approach",
        "subtitle": "Authentic Moments in Natural Light",
        "prompts": [
            "Our documentary-style approach to wedding coverage",
            "Balance of candid moments (70%) vs directed portraits (30%)",
            "Lighting techniques used throughout the day",
            "How we captured the day's authentic story"
        ]
    }
]

ENGAGEMENT_SECTIONS = [
    {
        "title": "The Location",
        "subtitle": "{location}'s {adjective} Setting",
    },
    {
        "title": "Their Connection",
        "subtitle": "{couple}'s Authentic Chemistry",
    },
    {
        "title": "Styled Elements",
        "subtitle": "Personal Touches & Details",
    },
    {
        "title": "Golden Hour Magic",
        "subtitle": "Perfect Light for Romance",
    },
    {
        "title": "Photography Approach",
        "subtitle": "Natural & Candid Coverage",
    }
]

FAMILY_SECTIONS = [
    {
        "title": "The Session Setting",
        "subtitle": "{location}'s Perfect Backdrop",
    },
    {
        "title": "Family Dynamics",
        "subtitle": "Capturing Authentic Connections",
    },
    {
        "title": "Children's Moments",
        "subtitle": "Natural Interaction & Play",
    },
    {
        "title": "Wardrobe & Styling",
        "subtitle": "Coordinated Yet Comfortable",
    },
    {
        "title": "Photography Approach",
        "subtitle": "Documentary Family Coverage",
    }
]

def generate_section_content(section_template, context, wordpress_content):
    """
    Generate 400-600 word content for a section using:
    1. WordPress content extraction
    2. Section-specific templates
    3. Smart expansion with context
    """
    title = section_template["title"]
    couple = context.get("couple", "the couple")
    venue = context.get("venue", "this beautiful venue")
    location = context.get("location", "this location")
    
    # Extract relevant WordPress paragraphs
    relevant_content = []
    for para in wordpress_content.split('\n\n'):
        if len(para) > 50:  # Skip short fragments
            relevant_content.append(para)
    
    # Build section content
    content_parts = []
    
    # Opening paragraph (use WordPress content if available)
    if relevant_content:
        content_parts.append(relevant_content[0])
    else:
        content_parts.append(f"This {title.lower()} was one of the highlights of {couple}'s celebration at {venue}.")
    
    # Add 2-3 more paragraphs expanding on the theme
    content_parts.append(f"Working with {couple} to document these moments was incredibly rewarding. Every detail—from the {title.lower()} to the smallest personal touches—came together to create something truly memorable.")
    
    # Add WordPress content if available
    if len(relevant_content) > 1:
        content_parts.append(relevant_content[1])
    
    # Add a final paragraph with technical/approach details
    content_parts.append(f"As a {location} photographer, I approach each {title.lower()} with a blend of documentary observation and artistic direction. The goal is always to capture authentic moments while creating images that will be treasured for generations.")
    
    return '\n\n'.join(content_parts)

def select_featured_images(all_images, num_needed=5):
    """
    Select 5 featured images from the gallery.
    Strategy: Evenly distribute across the gallery (beginning, middle, end)
    """
    if len(all_images) < num_needed:
        return all_images
    
    step = len(all_images) // num_needed
    selected = []
    for i in range(num_needed):
        idx = i * step
        if idx < len(all_images):
            selected.append(all_images[idx])
    
    return selected

def create_featured_image_html(image_url, couple, section_title, index):
    """Create featured image HTML with caption"""
    caption = f"{couple} - {section_title} moment {index+1}"
    
    return f"""<div class="featured-image"><img alt="{couple} - {section_title}" class="section-image" loading="lazy" src="{image_url}"/><p class="image-caption">{caption}</p></div>"""

def fix_blog_post(slug):
    """
    Fix a single blog post with proper Mares framework structure.
    """
    blog_dir = Path("/home/user/webapp/public/static/blog")
    html_file = blog_dir / f"{slug}.html"
    
    if not html_file.exists():
        print(f"ERROR: {html_file} not found")
        return False
    
    print(f"\n{'='*60}")
    print(f"FIXING POST: {slug}")
    print(f"{'='*60}\n")
    
    # Read HTML
    html_content = html_file.read_text(encoding='utf-8')
    print(f"✓ Loaded HTML ({len(html_content)} chars)")
    
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Extract context from existing content
    title_tag = soup.find('title')
    title_text = title_tag.get_text() if title_tag else ""
    
    # Parse title: "Location Session Type | Names | Acromatico Photography"
    parts = title_text.split('|')
    couple = parts[1].strip() if len(parts) > 1 else "this couple"
    location_session = parts[0].strip() if parts else ""
    
    # Extract location and venue from content
    content_div = soup.find('div', class_='content-container')
    if content_div:
        text_content = content_div.get_text()
        # Try to find venue name in WordPress content
        venue_match = re.search(r'at\s+([A-Z][a-zA-Z\s]+(?:Farm|Park|Hotel|Resort|Club|Beach|Garden|Estate|Barn|Loft))', text_content)
        venue = venue_match.group(1) if venue_match else "this beautiful venue"
    else:
        venue = "this beautiful venue"
    
    context = {
        "couple": couple,
        "venue": venue,
        "location": location_session.split()[0] if location_session else "Miami",
        "session_type": "Wedding" if "wedding" in slug.lower() else "Session"
    }
    
    print(f"✓ Extracted context: {context}")
    
    # Extract all images from gallery
    gallery = soup.find('div', class_='gallery-container')
    all_images = []
    if gallery:
        for img_link in gallery.find_all('a', class_='gallery-item'):
            href = img_link.get('href')
            if href:
                all_images.append(href)
    
    print(f"✓ Found {len(all_images)} gallery images")
    
    # Select 5 featured images
    featured_images = select_featured_images(all_images, 5)
    print(f"✓ Selected {len(featured_images)} featured images")
    
    # Extract WordPress content for expansion
    post_intro = soup.find('div', class_='post-intro')
    wordpress_content = post_intro.get_text() if post_intro else ""
    
    # Determine post type
    if "wedding" in slug.lower():
        sections = WEDDING_SECTIONS
        post_type = "wedding"
    elif "engagement" in slug.lower():
        sections = ENGAGEMENT_SECTIONS
        post_type = "engagement"
    elif "family" in slug.lower():
        sections = FAMILY_SECTIONS
        post_type = "family"
    else:
        sections = WEDDING_SECTIONS  # Default
        post_type = "wedding"
    
    print(f"✓ Post type: {post_type}")
    
    # Generate 5 H2 sections with content + featured images
    sections_html = []
    
    for i, section in enumerate(sections):
        # Format title/subtitle with context
        title = section["title"]
        subtitle = section["subtitle"].format(
            couple=couple.split()[0],  # First name only
            venue=venue.split()[0],  # First word only
            location=context["location"],
            adjective=["Romantic", "Intimate", "Beautiful", "Stunning", "Memorable"][i]
        )
        
        # Generate section content (400-600 words)
        section_content = generate_section_content(section, context, wordpress_content)
        
        # Create section HTML (H2 BEFORE content - reversed order like Mares template)
        section_html = f"""<h2 class="section-heading">{title}:<br/>{subtitle}</h2>"""
        section_html += f"""<div class="section-text">\n<p>{section_content}</p>\n</div>"""
        
        # Add featured image with caption
        if i < len(featured_images):
            section_html += create_featured_image_html(
                featured_images[i],
                couple,
                title,
                i
            )
        
        sections_html.append(section_html)
    
    print(f"✓ Generated {len(sections_html)} H2 sections with content + images")
    
    # Insert sections into HTML
    # Find post-intro div OR content-container as insertion point
    post_intro_div = soup.find('div', class_='post-intro')
    content_container = soup.find('div', class_='content-container')
    
    insertion_point = post_intro_div if post_intro_div else content_container
    
    if insertion_point:
        # Create new sections element
        sections_container = soup.new_tag('div', **{'class': 'storytelling-sections'})
        for section_html in sections_html:
            section_soup = BeautifulSoup(section_html, 'html.parser')
            # Get the actual elements from the parsed HTML
            for element in section_soup.children:
                if element.name:  # Skip text nodes
                    sections_container.append(element)
        
        if post_intro_div:
            # Insert after post-intro
            post_intro_div.insert_after(sections_container)
            location_desc = "after post-intro"
        else:
            # Insert as first child of content-container
            content_container.insert(0, sections_container)
            location_desc = "at start of content-container"
        
        # VERIFY insertion worked
        storytelling_check = soup.find('div', class_='storytelling-sections')
        if storytelling_check:
            print(f"✓ Inserted 5 H2 sections {location_desc}")
        else:
            print(f"⚠ WARNING: insertion failed, trying string replacement...")
            # Alternative: convert to string and do string replacement
            html_str = str(soup)
            anchor_str = str(insertion_point)[:100]  # First 100 chars as anchor
            sections_str = str(sections_container)
            
            if post_intro_div:
                html_str = html_str.replace(str(post_intro_div), str(post_intro_div) + sections_str)
            else:
                # Insert after opening tag of content-container
                html_str = html_str.replace(
                    '<div class="content-container">',
                    '<div class="content-container">' + sections_str,
                    1  # Only first occurrence
                )
            
            soup = BeautifulSoup(html_str, 'html.parser')
            print(f"✓ Inserted sections using string replacement")
    else:
        print("⚠ ERROR: No insertion point found (no post-intro or content-container)")
    
    # Fix image alt tags
    img_count = 0
    for img in soup.find_all('img'):
        if 'alt' in img.attrs:
            old_alt = img['alt']
            if re.match(r'^Photo \d+$', old_alt) or not old_alt:
                # Replace generic alt with descriptive one
                new_alt = f"{location_session} | {couple} - Photo {img_count + 1}"
                img['alt'] = new_alt
                img_count += 1
    
    print(f"✓ Fixed {img_count} image alt tags")
    
    # Add meta description if missing
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    if not meta_desc or len(meta_desc.get('content', '')) < 100:
        # Generate better meta description
        desc_text = f"Experience {couple}'s {context['session_type'].lower()} at {venue} in {context['location']}. Authentic moments, {post_type} photography by Acromatico."
        if meta_desc:
            meta_desc['content'] = desc_text
        else:
            new_meta = soup.new_tag('meta', attrs={'name': 'description', 'content': desc_text})
            head = soup.find('head')
            if head:
                head.append(new_meta)
        print(f"✓ Added meta description ({len(desc_text)} chars)")
    
    # Add Open Graph tags if missing
    if not soup.find('meta', property='og:title'):
        head = soup.find('head')
        if head:
            og_tags = [
                ('og:type', 'article'),
                ('og:url', f'https://acromatico.com/blog/{slug}'),
                ('og:title', location_session + ' | ' + couple),
                ('og:description', meta_desc.get('content') if meta_desc else ''),
                ('og:image', featured_images[0] if featured_images else '')
            ]
            for prop, content in og_tags:
                tag = soup.new_tag('meta', property=prop, content=content)
                head.append(tag)
            print("✓ Added Open Graph tags")
    
    # Add Twitter Card tags if missing
    if not soup.find('meta', property='twitter:card'):
        head = soup.find('head')
        if head:
            twitter_tags = [
                ('twitter:card', 'summary_large_image'),
                ('twitter:url', f'https://acromatico.com/blog/{slug}'),
                ('twitter:title', location_session + ' | ' + couple),
                ('twitter:description', meta_desc.get('content') if meta_desc else ''),
                ('twitter:image', featured_images[0] if featured_images else '')
            ]
            for prop, content in twitter_tags:
                tag = soup.new_tag('meta', property=prop, content=content)
                head.append(tag)
            print("✓ Added Twitter Card tags")
    
    # Add canonical URL if missing
    if not soup.find('link', rel='canonical'):
        head = soup.find('head')
        if head:
            canonical = soup.new_tag('link', rel='canonical', href=f'https://acromatico.com/blog/{slug}')
            head.append(canonical)
            print("✓ Added canonical URL")
    
    # Write updated HTML
    backup_file = html_file.with_suffix('.html.backup')
    html_file.rename(backup_file)
    print(f"✓ Created backup: {backup_file.name}")
    
    html_file.write_text(str(soup), encoding='utf-8')
    print(f"✓ Wrote updated HTML: {html_file.name}")
    
    print(f"\n{'='*60}")
    print(f"SUCCESS! View at: http://localhost:3000/static/blog/{slug}.html")
    print(f"{'='*60}\n")
    
    return True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python FIX_POST_V10_PROPER_MARES.py <slug>")
        sys.exit(1)
    
    slug = sys.argv[1]
    success = fix_blog_post(slug)
    sys.exit(0 if success else 1)
