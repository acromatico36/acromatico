#!/usr/bin/env python3
"""
Batch process all remaining hero images for watermark removal
"""

import json
import time

# Load hero images
with open('hero_images_to_process.json', 'r') as f:
    hero_images = json.load(f)

# Already processed first 10, so start from index 10
remaining = hero_images[10:]

print(f"🚀 PROCESSING {len(remaining)} REMAINING HERO IMAGES")
print("="*60)

# Save image mapping for batch processing
batch_data = []
for i, img in enumerate(remaining, start=11):
    batch_data.append({
        'index': i,
        'slug': img['slug'],
        'title': img['title'],
        'original_url': img['hero_url']
    })

# Save for processing
with open('batch_to_process.json', 'w') as f:
    json.dump(batch_data, f, indent=2)

print(f"✅ Prepared {len(batch_data)} images for processing")
print(f"📁 Saved to: batch_to_process.json")
print(f"\n🎯 Ready for batch API calls!")
