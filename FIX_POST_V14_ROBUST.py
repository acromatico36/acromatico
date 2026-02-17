#!/usr/bin/env python3
"""
V14 ROBUST SECTION INSERTION
=============================
Fixes the V10 insertion issue where storytelling-sections weren't being added.
Uses a more reliable insertion method.
"""

import sys
from pathlib import Path
from bs4 import BeautifulSoup
import subprocess

def fix_insertion_issue(slug):
    """
    Re-run V10 but with robust insertion check and retry logic.
    """
    blog_dir = Path("/home/user/webapp/public/static/blog")
    html_file = blog_dir / f"{slug}.html"
    
    if not html_file.exists():
        print(f"ERROR: {html_file} not found")
        return False
    
    print(f"\n{'='*60}")
    print(f"V14 ROBUST FIX: {slug}")
    print(f"{'='*60}\n")
    
    # First, run V10
    print("Step 1: Running V10...")
    result = subprocess.run(
        ["python3", "FIX_POST_V10_PROPER_MARES.py", slug],
        cwd="/home/user/webapp",
        capture_output=True,
        text=True
    )
    
    # Check if storytelling-sections was inserted
    html = html_file.read_text(encoding='utf-8')
    if 'storytelling-sections' in html:
        print("✓ V10 succeeded - storytelling-sections found")
        return True
    
    print("⚠ V10 failed to insert sections - applying manual fix...")
    
    # Manual insertion using string replacement (more reliable)
    soup = BeautifulSoup(html, 'html.parser')
    
    # Find where to insert (after post-intro or after content-container opening)
    post_intro = soup.find('div', class_='post-intro')
    content_container = soup.find('div', class_='content-container')
    
    if not post_intro and not content_container:
        print("ERROR: No insertion point found (no post-intro or content-container)")
        return False
    
    # Generate sections HTML manually
    from FIX_POST_V10_PROPER_MARES import (
        WEDDING_SECTIONS, ENGAGEMENT_SECTIONS, FAMILY_SECTIONS,
        generate_section_content, select_featured_images, create_featured_image_html
    )
    
    # Extract context
    title_tag = soup.find('title')
    title_text = title_tag.get_text() if title_tag else ""
    parts = title_text.split('|')
    couple = parts[1].strip() if len(parts) > 1 else "this couple"
    location_session = parts[0].strip() if parts else ""
    
    # Determine sections
    if "wedding" in slug.lower():
        sections = WEDDING_SECTIONS
    elif "engagement" in slug.lower():
        sections = ENGAGEMENT_SECTIONS
    elif "family" in slug.lower():
        sections = FAMILY_SECTIONS
    else:
        sections = WEDDING_SECTIONS
    
    # Get gallery images
    gallery = soup.find('div', class_='gallery-container')
    all_images = []
    if gallery:
        for img_link in gallery.find_all('a', class_='gallery-item'):
            href = img_link.get('href')
            if href:
                all_images.append(href)
    
    featured_images = select_featured_images(all_images, 5)
    
    context = {
        "couple": couple,
        "venue": "this beautiful venue",
        "location": location_session.split()[0] if location_session else "this location"
    }
    
    # Build sections HTML
    sections_html_parts = ['<div class="storytelling-sections">']
    
    for i, section in enumerate(sections):
        title = section["title"]
        subtitle = section["subtitle"].format(
            couple=couple.split()[0],
            venue="this venue",
            location=context["location"],
            adjective=["Romantic", "Intimate", "Beautiful", "Stunning", "Memorable"][i]
        )
        
        # Generate content
        section_content = generate_section_content(section, context, "")
        
        # Build HTML
        sections_html_parts.append(f'<h2 class="section-heading">{title}:<br/>{subtitle}</h2>')
        sections_html_parts.append(f'<div class="section-text">\n<p>{section_content}</p>\n</div>')
        
        # Add featured image
        if i < len(featured_images):
            sections_html_parts.append(create_featured_image_html(
                featured_images[i],
                couple,
                title,
                i
            ))
    
    sections_html_parts.append('</div>')
    sections_html_full = '\n'.join(sections_html_parts)
    
    # Insert using string replacement
    html_str = str(soup)
    
    if post_intro:
        # Insert after post-intro closing tag
        post_intro_str = str(post_intro)
        html_str = html_str.replace(
            post_intro_str,
            post_intro_str + sections_html_full
        )
    else:
        # Insert after content-container opening tag
        html_str = html_str.replace(
            '<div class="content-container">',
            '<div class="content-container">' + sections_html_full
        )
    
    # Save
    backup_file = html_file.with_suffix('.html.backup_v14')
    html_file.rename(backup_file)
    html_file.write_text(html_str, encoding='utf-8')
    
    print(f"✓ Manual insertion succeeded")
    print(f"✓ Backup: {backup_file.name}")
    print(f"✓ Saved: {html_file.name}")
    
    # Verify
    html_check = html_file.read_text(encoding='utf-8')
    if 'storytelling-sections' in html_check:
        print("✓ VERIFIED: storytelling-sections now present")
        return True
    else:
        print("✗ FAILED: storytelling-sections still missing")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python FIX_POST_V14_ROBUST.py <slug>")
        sys.exit(1)
    
    slug = sys.argv[1]
    success = fix_insertion_issue(slug)
    sys.exit(0 if success else 1)
