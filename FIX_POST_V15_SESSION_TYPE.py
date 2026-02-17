#!/usr/bin/env python3
"""
V15 SMART SESSION TYPE DETECTION
=================================
Fixes the V10 bug where non-wedding sessions got wedding sections.

Proper detection for:
- Newborn sessions
- Maternity sessions
- Family portraits
- Engagement sessions
- Anniversary sessions
- Senior portraits
- Commercial/branding
- Weddings (default)
"""

import re
import sys
from pathlib import Path
from bs4 import BeautifulSoup

# Session type keyword mapping
SESSION_TYPES = {
    'newborn': ['newborn', 'baby', 'infant'],
    'maternity': ['maternity', 'pregnancy', 'expecting'],
    'family': ['family', 'portrait'],
    'engagement': ['engagement', 'engaged', 'proposal'],
    'anniversary': ['anniversary', 'renewal'],
    'senior': ['senior', 'graduation'],
    'commercial': ['commercial', 'branding', 'headshot', 'business'],
    'wedding': ['wedding', 'bride', 'groom', 'ceremony', 'reception']
}

# Section templates by session type
NEWBORN_SECTIONS = [
    {"title": "The Session Setting", "subtitle": "Creating a Calm, Nurturing Environment"},
    {"title": "Baby's Comfort", "subtitle": "Gentle Poses & Peaceful Moments"},
    {"title": "Family Connection", "subtitle": "Parents & Siblings with Baby"},
    {"title": "Detail Shots", "subtitle": "Tiny Fingers, Toes & Features"},
    {"title": "Photography Approach", "subtitle": "Patient, Lifestyle Newborn Coverage"}
]

MATERNITY_SECTIONS = [
    {"title": "The Location", "subtitle": "Perfect Setting for Maternity Portraits"},
    {"title": "The Anticipation", "subtitle": "Celebrating the Journey to Parenthood"},
    {"title": "Connection", "subtitle": "Intimate Moments Between Partners"},
    {"title": "Styled Elements", "subtitle": "Wardrobe & Personal Touches"},
    {"title": "Photography Approach", "subtitle": "Natural Light Maternity Coverage"}
]

FAMILY_SECTIONS = [
    {"title": "The Session Setting", "subtitle": "Perfect Backdrop for Family Portraits"},
    {"title": "Family Dynamics", "subtitle": "Capturing Authentic Connections"},
    {"title": "Children's Moments", "subtitle": "Natural Interaction & Play"},
    {"title": "Wardrobe & Styling", "subtitle": "Coordinated Yet Comfortable"},
    {"title": "Photography Approach", "subtitle": "Documentary Family Coverage"}
]

ENGAGEMENT_SECTIONS = [
    {"title": "The Location", "subtitle": "Perfect Setting for Engagement Portraits"},
    {"title": "Their Connection", "subtitle": "Authentic Chemistry & Love"},
    {"title": "Styled Elements", "subtitle": "Personal Touches & Details"},
    {"title": "Golden Hour Magic", "subtitle": "Perfect Light for Romance"},
    {"title": "Photography Approach", "subtitle": "Natural & Candid Coverage"}
]

ANNIVERSARY_SECTIONS = [
    {"title": "Celebrating Love", "subtitle": "Honoring Years Together"},
    {"title": "The Location", "subtitle": "Meaningful Setting for Portraits"},
    {"title": "Their Connection", "subtitle": "Love That Stands the Test of Time"},
    {"title": "Styled Elements", "subtitle": "Recreating Special Moments"},
    {"title": "Photography Approach", "subtitle": "Timeless Anniversary Coverage"}
]

SENIOR_SECTIONS = [
    {"title": "The Session Setting", "subtitle": "Perfect Backdrop for Senior Portraits"},
    {"title": "Personal Style", "subtitle": "Showcasing Unique Personality"},
    {"title": "Multiple Looks", "subtitle": "Wardrobe Changes & Variety"},
    {"title": "Candid Moments", "subtitle": "Natural, Authentic Expressions"},
    {"title": "Photography Approach", "subtitle": "Modern Senior Portrait Coverage"}
]

COMMERCIAL_SECTIONS = [
    {"title": "The Vision", "subtitle": "Understanding Brand Identity"},
    {"title": "The Setup", "subtitle": "Professional Studio Environment"},
    {"title": "Styled Elements", "subtitle": "Wardrobe & Branding Details"},
    {"title": "Final Results", "subtitle": "Polished Professional Images"},
    {"title": "Photography Approach", "subtitle": "Commercial Photography Excellence"}
]

WEDDING_SECTIONS = [
    {"title": "The Venue", "subtitle": "Romantic Setting & Atmosphere"},
    {"title": "The Ceremony", "subtitle": "Heartfelt Vows & Emotional Moments"},
    {"title": "Couple Portraits", "subtitle": "Intimate Connection & Chemistry"},
    {"title": "The Reception", "subtitle": "Celebration & Joyful Moments"},
    {"title": "Photography Approach", "subtitle": "Authentic Wedding Day Coverage"}
]

def detect_session_type(slug, title=""):
    """
    Detect session type from slug and title.
    Returns: (session_type_string, sections_array)
    """
    text = f"{slug} {title}".lower()
    
    # Check each session type
    for session_type, keywords in SESSION_TYPES.items():
        for keyword in keywords:
            if keyword in text:
                return session_type, globals()[f"{session_type.upper()}_SECTIONS"]
    
    # Default to wedding
    return "wedding", WEDDING_SECTIONS

def fix_post_sections(slug):
    """
    Fix sections for a single post based on proper session type detection.
    """
    blog_dir = Path("/home/user/webapp/public/static/blog")
    html_file = blog_dir / f"{slug}.html"
    
    if not html_file.exists():
        print(f"✗ File not found: {html_file}")
        return False
    
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Get title for better detection
        title_tag = soup.find('title')
        title = title_tag.string if title_tag else ""
        
        # Detect session type
        session_type, correct_sections = detect_session_type(slug, title)
        
        print(f"✓ Detected session type: {session_type}")
        print(f"✓ Using {len(correct_sections)} appropriate sections")
        
        # Find storytelling sections
        storytelling = soup.find('div', class_='storytelling-sections')
        if not storytelling:
            print(f"✗ No storytelling-sections div found")
            return False
        
        # Get current H2 sections
        current_h2s = storytelling.find_all('h2', class_='section-heading')
        
        if len(current_h2s) != 5:
            print(f"⚠ Found {len(current_h2s)} H2 sections (expected 5)")
        
        # Replace each H2 with correct title/subtitle
        for i, (h2, new_section) in enumerate(zip(current_h2s, correct_sections)):
            old_text = h2.get_text()
            
            # Create new H2 content
            new_title = new_section['title']
            new_subtitle = new_section['subtitle']
            
            # Clear H2 and rebuild with br
            h2.clear()
            h2.string = f"{new_title}:"
            br = soup.new_tag('br')
            h2.append(br)
            h2.append(new_subtitle)
            
            print(f"  [{i+1}/5] '{old_text[:50]}...' → '{new_title}: {new_subtitle}'")
        
        # Update captions (remove "moment 1", "moment 2" generic text)
        captions = storytelling.find_all('p', class_='image-caption')
        for i, caption in enumerate(captions):
            old_caption = caption.get_text()
            if 'moment' in old_caption.lower():
                # Extract name from caption
                parts = old_caption.split(' - ')
                name = parts[0] if parts else "Subject"
                section_title = correct_sections[i]['title'] if i < len(correct_sections) else "Moment"
                
                # Generate better caption
                new_caption = f"{name} - {section_title} portrait"
                caption.string = new_caption
                
                print(f"  Caption: '{old_caption}' → '{new_caption}'")
        
        # Backup original
        backup_file = html_file.parent / f"{slug}.html.backup_v15"
        with open(backup_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        # Write fixed HTML
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"✓ Fixed {slug}")
        print(f"✓ Backup saved: {backup_file.name}")
        return True
        
    except Exception as e:
        print(f"✗ Error fixing {slug}: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 FIX_POST_V15_SESSION_TYPE.py <slug>")
        sys.exit(1)
    
    slug = sys.argv[1]
    success = fix_post_sections(slug)
    sys.exit(0 if success else 1)
