#!/usr/bin/env python3
"""
AUTOMATIC LOGO REMOVAL FROM HERO IMAGES

This script will:
1. Download each hero image from WordPress
2. Detect the logo watermark (bottom right corner)
3. Remove it using inpainting/cropping
4. Upload to a CDN or local storage
5. Update all blog posts with clean images

Strategy:
- Logo is typically in bottom-right corner
- We can either crop it out or use AI inpainting
- For speed, we'll crop the bottom 10% or use content-aware fill
"""

import os
import json
import requests
from pathlib import Path
from PIL import Image
import cv2
import numpy as np
from io import BytesIO

def download_image(url):
    """Download image from URL"""
    try:
        resp = requests.get(url, timeout=30)
        if resp.status_code == 200:
            return Image.open(BytesIO(resp.content))
    except Exception as e:
        print(f"❌ Error downloading {url}: {e}")
    return None

def remove_logo_bottom_right(image, logo_height_percent=10, logo_width_percent=20):
    """
    Remove logo from bottom-right corner by cropping
    
    Args:
        image: PIL Image
        logo_height_percent: Percentage of height where logo is
        logo_width_percent: Percentage of width where logo is
    
    Returns:
        PIL Image with logo area cropped/filled
    """
    width, height = image.size
    
    # Calculate logo area (bottom-right corner)
    logo_height = int(height * logo_height_percent / 100)
    logo_width = int(width * logo_width_percent / 100)
    
    # Convert to numpy array for OpenCV processing
    img_array = np.array(image)
    img_array = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
    
    # Define the region to inpaint (bottom-right corner)
    mask = np.zeros(img_array.shape[:2], dtype=np.uint8)
    mask[height - logo_height:height, width - logo_width:width] = 255
    
    # Use inpainting to remove the logo
    result = cv2.inpaint(img_array, mask, inpaintRadius=3, flags=cv2.INPAINT_TELEA)
    
    # Convert back to PIL Image
    result = cv2.cvtColor(result, cv2.COLOR_BGR2RGB)
    return Image.fromarray(result)

def process_single_image(url, output_path):
    """Download, remove logo, and save image"""
    print(f"📥 Downloading: {url}")
    
    img = download_image(url)
    if not img:
        return False
    
    print(f"   Size: {img.size[0]}x{img.size[1]}")
    
    # Remove logo
    print(f"   🔧 Removing logo...")
    clean_img = remove_logo_bottom_right(img)
    
    # Save
    output_path.parent.mkdir(parents=True, exist_ok=True)
    clean_img.save(output_path, quality=95, optimize=True)
    
    print(f"   ✅ Saved: {output_path}")
    return True

def main():
    """Process all blog post hero images"""
    
    # Load mapping
    with open('smugmug_image_mapping.json', 'r') as f:
        mapping = json.load(f)
    
    # Create output directory
    output_dir = Path('public/static/images/no-logo')
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"🚀 REMOVING LOGOS FROM {len(mapping)} HERO IMAGES\n")
    print("="*80)
    
    success_count = 0
    error_count = 0
    
    for i, (slug, data) in enumerate(mapping.items(), 1):
        wordpress_url = data.get('current_wordpress_image')
        
        if not wordpress_url or wordpress_url == "Not found":
            print(f"⏭️  [{i}/{len(mapping)}] Skipping {slug}: No image")
            continue
        
        print(f"\n[{i}/{len(mapping)}] {slug}")
        
        # Output path
        ext = Path(wordpress_url).suffix or '.jpg'
        output_path = output_dir / f"{slug}{ext}"
        
        # Skip if already processed
        if output_path.exists():
            print(f"   ⏭️  Already processed")
            
            # Update mapping with local path
            data['smugmug_image_no_logo'] = f"/static/images/no-logo/{slug}{ext}"
            success_count += 1
            continue
        
        # Process image
        try:
            if process_single_image(wordpress_url, output_path):
                # Update mapping with local path
                data['smugmug_image_no_logo'] = f"/static/images/no-logo/{slug}{ext}"
                success_count += 1
            else:
                error_count += 1
        except Exception as e:
            print(f"   ❌ Error: {e}")
            error_count += 1
        
        # Save progress every 10 images
        if i % 10 == 0:
            with open('smugmug_image_mapping.json', 'w') as f:
                json.dump(mapping, f, indent=2)
            print(f"\n💾 Progress saved ({success_count} done, {error_count} errors)\n")
    
    # Final save
    with open('smugmug_image_mapping.json', 'w') as f:
        json.dump(mapping, f, indent=2)
    
    print("\n" + "="*80)
    print(f"✅ SUCCESS: {success_count} images processed")
    print(f"❌ ERRORS: {error_count} images failed")
    print("="*80)
    
    print("\n🎯 NEXT STEP:")
    print("Run: python3 smugmug_image_updater.py --update")
    print("Then deploy!")

if __name__ == '__main__':
    main()
