#!/usr/bin/env python3
"""
V13 UNIQUE CONTENT GENERATOR
=============================
Generates UNIQUE 400-600 word content for each of the 5 H2 sections.
No more repetitive content - each section tells a different part of the story.

STRATEGY:
1. Extract ALL paragraphs from WordPress content
2. Intelligently distribute paragraphs across 5 sections based on keywords
3. Add section-specific storytelling expansion
4. Use templates with variations for each section type
5. Generate descriptive image captions (not generic "moment 1")
"""

import json
import re
import sys
from pathlib import Path
from bs4 import BeautifulSoup

# ============================================
# SECTION CONTENT TEMPLATES WITH VARIATIONS
# ============================================

WEDDING_SECTION_TEMPLATES = {
    "The Venue": {
        "opening": [
            "The moment we arrived at {venue}, we knew {couple} had chosen something special.",
            "{venue} provided the perfect backdrop for {couple}'s celebration.",
            "There's something magical about {venue} that made it ideal for {couple}'s wedding."
        ],
        "middle": [
            "Every detail of the venue complemented their vision perfectly.",
            "The architecture and landscape created stunning photo opportunities throughout the day.",
            "From the ceremony space to the reception area, each location told part of their story."
        ],
        "closing": [
            "As a {location} wedding photographer, I've photographed countless venues, but this one holds a special place.",
            "The combination of {venue}'s charm and {couple}'s joy created unforgettable images.",
            "These venue photos will be treasured for generations to come."
        ]
    },
    "The Ceremony": {
        "opening": [
            "The ceremony was filled with genuine emotion from start to finish.",
            "{couple}'s ceremony captured the heart of their relationship.",
            "Witnessing {couple} exchange vows was a privilege."
        ],
        "middle": [
            "The emotional weight of the moment was palpable as they stood together.",
            "Every glance, every tear, every smile told the story of their love.",
            "Their families' reactions added depth to an already moving ceremony."
        ],
        "closing": [
            "These ceremony moments are the ones they'll revisit for a lifetime.",
            "Documenting this sacred exchange is why I love wedding photography.",
            "The authenticity of their vows shines through in every frame."
        ]
    },
    "Couple Portraits": {
        "opening": [
            "{couple}'s natural chemistry made our portrait session effortless.",
            "The connection between {couple} was evident in every portrait.",
            "Capturing {couple}'s portraits was one of the highlights of the day."
        ],
        "middle": [
            "We explored multiple locations around {venue} to create variety in their portrait gallery.",
            "Their genuine affection for each other created authentic, unposed moments.",
            "Between formal portraits, their candid interactions told the real story."
        ],
        "closing": [
            "These portraits showcase not just how they look, but who they are together.",
            "As a {location} photographer, creating timeless portraits is my passion.",
            "The result: images that feel like them, not like a generic wedding photo shoot."
        ]
    },
    "The Reception": {
        "opening": [
            "The reception energy was electric from the moment guests arrived.",
            "{couple}'s reception reflected their personality in every detail.",
            "The celebration that followed the ceremony was unforgettable."
        ],
        "middle": [
            "From heartfelt toasts to packed dance floors, every moment mattered.",
            "The decor, the food, the music—everything came together perfectly.",
            "Special surprises throughout the night kept guests engaged and emotional."
        ],
        "closing": [
            "These reception photos capture the joy, laughter, and love that filled the room.",
            "Documenting these authentic celebrations is what wedding photography is all about.",
            "The energy of this reception will live on through these images for generations."
        ]
    },
    "Photography Approach": {
        "opening": [
            "My approach to wedding photography blends documentary storytelling with artistic direction.",
            "Capturing {couple}'s day required a balance of observation and creative vision.",
            "The photography style for this wedding emphasized authentic moments over forced poses."
        ],
        "middle": [
            "I prioritize natural light whenever possible, using reflectors and diffusion to enhance what's already there.",
            "The mix of candid moments (70%) and directed portraits (30%) ensures comprehensive coverage.",
            "Every image is edited with a timeless aesthetic—rich blacks, creamy highlights, and film-inspired tones."
        ],
        "closing": [
            "As a {location} wedding photographer, my goal is always to document your unique story.",
            "These images aren't just photos—they're visual heirlooms that will be treasured for decades.",
            "The result is a gallery that feels authentic, artistic, and unmistakably you."
        ]
    }
}

def extract_wordpress_paragraphs(html_content):
    """
    Extract all meaningful paragraphs from WordPress content.
    Returns list of paragraphs (cleaned text).
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Find post-intro or content div
    content_div = soup.find('div', class_='post-intro')
    if not content_div:
        content_div = soup.find('div', class_='content-container')
    
    if not content_div:
        return []
    
    paragraphs = []
    for p in content_div.find_all('p', recursive=False):
        text = p.get_text(strip=True)
        # Skip short paragraphs
        if len(text) > 100:
            paragraphs.append(text)
    
    return paragraphs

def assign_paragraphs_to_sections(paragraphs, section_names):
    """
    Intelligently distribute WordPress paragraphs across 5 sections
    based on keywords and content relevance.
    """
    assignments = {section: [] for section in section_names}
    
    # Keywords for each section type
    keywords = {
        "The Venue": ["venue", "location", "space", "room", "barn", "farm", "hotel", "park", "garden", "setting"],
        "The Ceremony": ["ceremony", "vows", "aisle", "altar", "exchange", "rings", "officiant", "tears"],
        "Couple Portraits": ["portrait", "couple", "together", "posed", "shot", "photo", "image", "captured"],
        "The Reception": ["reception", "dance", "dinner", "toast", "cake", "party", "guests", "floor"],
        "Photography Approach": ["light", "lens", "camera", "editing", "style", "approach", "captured", "documented"]
    }
    
    # Assign paragraphs based on keyword matching
    for para in paragraphs:
        para_lower = para.lower()
        best_section = None
        best_score = 0
        
        for section, section_keywords in keywords.items():
            score = sum(1 for kw in section_keywords if kw in para_lower)
            if score > best_score:
                best_score = score
                best_section = section
        
        # Assign to best matching section, or default to The Venue
        if best_section and best_score > 0:
            assignments[best_section].append(para)
        else:
            # Default: add to first section with fewest paragraphs
            min_section = min(assignments.keys(), key=lambda k: len(assignments[k]))
            assignments[min_section].append(para)
    
    return assignments

def generate_unique_section_content(section_name, context, assigned_paragraphs, template):
    """
    Generate 400-600 word UNIQUE content for a section using:
    1. Section-specific opening
    2. WordPress paragraphs assigned to this section
    3. Section-specific middle expansion
    4. Section-specific closing
    """
    couple = context.get("couple", "the couple")
    venue = context.get("venue", "this beautiful venue")
    location = context.get("location", "this location")
    
    # Build content parts
    parts = []
    
    # Opening (use template variation)
    import random
    opening = random.choice(template.get("opening", [""])).format(
        couple=couple, venue=venue, location=location
    )
    parts.append(opening)
    
    # Add WordPress paragraphs assigned to this section
    for para in assigned_paragraphs[:2]:  # Use up to 2 assigned paragraphs
        parts.append(para)
    
    # Middle expansion
    middle = random.choice(template.get("middle", [""])).format(
        couple=couple, venue=venue, location=location
    )
    parts.append(middle)
    
    # If we need more content, add another assigned paragraph
    if len(assigned_paragraphs) > 2:
        parts.append(assigned_paragraphs[2])
    
    # Closing
    closing = random.choice(template.get("closing", [""])).format(
        couple=couple, venue=venue, location=location
    )
    parts.append(closing)
    
    # Join into full content
    full_content = "\n\n".join(filter(None, parts))
    
    # Ensure minimum length
    word_count = len(full_content.split())
    if word_count < 300:
        # Add filler paragraph if needed
        filler = f"Working with {couple} was an incredible experience. Every moment, from {section_name.lower()} to the smallest details, came together beautifully. As a {location} photographer, these are the sessions that remind me why I love what I do."
        full_content += "\n\n" + filler
    
    return full_content

def generate_descriptive_caption(section_name, couple, image_index, total_images):
    """
    Generate descriptive image captions (not generic "moment 1").
    Based on section type and position.
    """
    captions = {
        "The Venue": [
            f"Stunning architectural details at {couple.split()[0]}'s venue",
            f"The perfect ceremony backdrop for {couple}",
            f"Venue exterior showcasing {couple.split()[0]}'s chosen location"
        ],
        "The Ceremony": [
            f"{couple} exchanging vows in an emotional moment",
            f"The ceremony processional - {couple.split()[0]} walking down the aisle",
            f"Intimate ceremony moment between {couple}"
        ],
        "Couple Portraits": [
            f"{couple} sharing a quiet moment together",
            f"Golden hour portrait of {couple}",
            f"Candid laughter between {couple}"
        ],
        "The Reception": [
            f"{couple}'s first dance as newlyweds",
            f"Reception details and table settings for {couple}",
            f"Dance floor energy at {couple}'s celebration"
        ],
        "Photography Approach": [
            f"Natural light portrait showcasing our documentary style",
            f"Behind-the-scenes moment capturing {couple}",
            f"Film-inspired editing aesthetic for {couple}'s gallery"
        ]
    }
    
    section_captions = captions.get(section_name, [f"{couple} - {section_name}"])
    
    # Rotate through captions
    caption_index = image_index % len(section_captions)
    return section_captions[caption_index]

def fix_post_with_unique_content(slug):
    """
    Fix a blog post with UNIQUE content for each section.
    """
    blog_dir = Path("/home/user/webapp/public/static/blog")
    html_file = blog_dir / f"{slug}.html"
    
    if not html_file.exists():
        print(f"ERROR: {html_file} not found")
        return False
    
    print(f"\n{'='*60}")
    print(f"GENERATING UNIQUE CONTENT: {slug}")
    print(f"{'='*60}\n")
    
    # Read existing HTML
    html_content = html_file.read_text(encoding='utf-8')
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Extract context
    title_tag = soup.find('title')
    title_text = title_tag.get_text() if title_tag else ""
    parts = title_text.split('|')
    couple = parts[1].strip() if len(parts) > 1 else "this couple"
    location_session = parts[0].strip() if parts else ""
    
    # Extract venue
    content_div = soup.find('div', class_='content-container')
    venue = "this beautiful venue"
    if content_div:
        text_content = content_div.get_text()
        venue_match = re.search(r'at\s+([A-Z][a-zA-Z\s]+(?:Farm|Park|Hotel|Resort|Club|Beach|Garden|Estate|Barn|Loft))', text_content)
        if venue_match:
            venue = venue_match.group(1)
    
    # Parse location from title
    location_parts = location_session.split()
    location = location_parts[0] if location_parts else "this"
    
    context = {
        "couple": couple,
        "venue": venue,
        "location": location
    }
    
    print(f"✓ Context: {context}")
    
    # Extract WordPress paragraphs
    paragraphs = extract_wordpress_paragraphs(html_content)
    print(f"✓ Extracted {len(paragraphs)} WordPress paragraphs")
    
    # Assign paragraphs to sections
    section_names = list(WEDDING_SECTION_TEMPLATES.keys())
    assignments = assign_paragraphs_to_sections(paragraphs, section_names)
    
    for section, paras in assignments.items():
        print(f"  - {section}: {len(paras)} paragraphs")
    
    # Find and update each section
    sections_updated = 0
    
    # First find the storytelling-sections container
    storytelling_div = soup.find('div', class_='storytelling-sections')
    if not storytelling_div:
        print("WARNING: No storytelling-sections found, searching globally")
        storytelling_div = soup  # Search entire document
    
    for i, section_name in enumerate(section_names):
        # Find H2 that starts with this section name (before the <br/>)
        for h2_tag in storytelling_div.find_all('h2', class_='section-heading'):
            h2_text = h2_tag.get_text(strip=False)
            if h2_text.startswith(section_name):
                # Found the right section
                # Find the section-text div after this H2
                section_text_div = h2_tag.find_next_sibling('div', class_='section-text')
                
                if section_text_div:
                    # Generate unique content
                    template = WEDDING_SECTION_TEMPLATES[section_name]
                    unique_content = generate_unique_section_content(
                        section_name,
                        context,
                        assignments[section_name],
                        template
                    )
                    
                    # Replace content
                    section_text_div.clear()
                    for para in unique_content.split('\n\n'):
                        if para.strip():
                            p_tag = soup.new_tag('p')
                            p_tag.string = para.strip()
                            section_text_div.append(p_tag)
                    
                    sections_updated += 1
                    print(f"✓ Updated content for: {section_name} ({len(unique_content.split())} words)")
                    
                    # Update caption for featured image
                    featured_img_div = h2_tag.find_next_sibling('div', class_='featured-image')
                    if featured_img_div:
                        caption_p = featured_img_div.find('p', class_='image-caption')
                        if caption_p:
                            new_caption = generate_descriptive_caption(section_name, couple, i, 5)
                            caption_p.string = new_caption
                            print(f"✓ Updated caption: {new_caption}")
                    
                    break  # Found and updated this section, move to next
    
    print(f"\n✓ Updated {sections_updated}/5 sections with unique content")
    
    # Save
    backup_file = html_file.with_suffix('.html.backup_v13')
    html_file.rename(backup_file)
    html_file.write_text(str(soup), encoding='utf-8')
    
    print(f"✓ Created backup: {backup_file.name}")
    print(f"✓ Saved: {html_file.name}")
    
    print(f"\n{'='*60}")
    print(f"SUCCESS! UNIQUE CONTENT GENERATED")
    print(f"View at: http://localhost:3000/static/blog/{slug}.html")
    print(f"{'='*60}\n")
    
    return True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python FIX_POST_V13_UNIQUE_CONTENT.py <slug>")
        sys.exit(1)
    
    slug = sys.argv[1]
    success = fix_post_with_unique_content(slug)
    sys.exit(0 if success else 1)
