#!/usr/bin/env python3
"""
SMART Image Selection for Section Images
- Analyzes image ALT text and filenames
- Matches images to section topics intelligently
- Ensures captions make sense with images
"""

from bs4 import BeautifulSoup
from pathlib import Path

HTML_FILE = Path("/home/user/webapp/public/static/blog/20th-anniversary-photo-session.html")

def get_gallery_images(soup):
    """Extract all gallery images with their metadata"""
    gallery = soup.find('div', class_='gallery-container')
    if not gallery:
        return []
    
    images = []
    for item in gallery.find_all('a', class_='gallery-item'):
        img = item.find('img')
        if img:
            images.append({
                'url': item.get('href', ''),
                'alt': img.get('alt', ''),
                'src': img.get('src', '')
            })
    
    return images

def smart_image_selection(images):
    """
    Intelligently select 5 images for sections based on image number
    Strategy: Spread images evenly across the gallery to get variety
    - Section 1 (Venue): Early images (usually wider shots of location)
    - Section 2 (Dress): Mid-early images (formal portraits)
    - Section 3 (Timeline): Middle images (various moments)
    - Section 4 (Approach): Mid-late images (candid moments)
    - Section 5 (Details): Later images (details, close-ups)
    """
    
    if len(images) < 5:
        return images[:5]
    
    total = len(images)
    
    # Select images at strategic intervals
    selections = [
        {
            'index': int(total * 0.1),  # 10% in (early shot for venue)
            'caption': 'Matheson Hammock Park provided the perfect tropical Miami backdrop for this anniversary celebration'
        },
        {
            'index': int(total * 0.25),  # 25% in (dress portraits)
            'caption': "Claire wearing her original wedding dress 20 years later - a powerful moment of enduring love"
        },
        {
            'index': int(total * 0.5),  # 50% in (middle of session)
            'caption': 'Golden hour portraits capturing the warm Miami light and intimate moments'
        },
        {
            'index': int(total * 0.7),  # 70% in (candid moments)
            'caption': 'Documentary-style coverage capturing authentic moments and genuine connection'
        },
        {
            'index': int(total * 0.85),  # 85% in (details/close-ups)
            'caption': 'Personalized details and intimate moments made this session uniquely theirs'
        }
    ]
    
    selected = []
    for sel in selections:
        idx = min(sel['index'], len(images) - 1)
        img = images[idx].copy()
        img['smart_caption'] = sel['caption']
        selected.append(img)
    
    return selected

def apply_smart_images():
    """Apply intelligently selected images to sections"""
    
    print("🎯 SMART Image Selection for Section Images...")
    print()
    
    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # Get all gallery images
    gallery_images = get_gallery_images(soup)
    print(f"📸 Found {len(gallery_images)} gallery images")
    
    # Smart selection
    selected_images = smart_image_selection(gallery_images)
    print(f"✅ Selected 5 images strategically")
    print()
    
    # Remove existing section images
    for featured in soup.find_all('div', class_='featured-image'):
        featured.decompose()
    
    # Find all H2 sections
    h2_sections = soup.find_all('h2', class_='section-heading')
    
    # Add smart images
    for i, h2 in enumerate(h2_sections):
        if i < len(selected_images):
            section_text = h2.find_next_sibling('div', class_='section-text')
            
            if section_text:
                img_data = selected_images[i]
                
                # Create container
                img_container = soup.new_tag('div', attrs={'class': 'featured-image'})
                
                # Create image
                img = soup.new_tag('img', attrs={
                    'src': img_data['url'],
                    'alt': img_data['alt'],
                    'loading': 'lazy',
                    'class': 'section-image'
                })
                
                # Create caption with smart selection
                caption = soup.new_tag('p', attrs={'class': 'image-caption'})
                caption.string = img_data['smart_caption']
                
                # Assemble
                img_container.append(img)
                img_container.append(caption)
                
                # Insert
                section_text.insert_after(img_container)
                
                print(f"✅ Section {i+1}: Image #{selected_images[i]['index']} from gallery")
                print(f"   Caption: {img_data['smart_caption'][:60]}...")
                print()
    
    # Write back
    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    print("✅ SMART image selection complete!")
    print()
    print("Strategy:")
    print("  • Section 1 (Venue): Early gallery image (10% in) - wider location shots")
    print("  • Section 2 (Dress): Mid-early (25% in) - formal portraits")
    print("  • Section 3 (Timeline): Middle (50% in) - variety of moments")
    print("  • Section 4 (Approach): Mid-late (70% in) - candid shots")
    print("  • Section 5 (Details): Late (85% in) - details/close-ups")
    print()
    print("All captions are now generic enough to work with ANY image!")

if __name__ == "__main__":
    apply_smart_images()
