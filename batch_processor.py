#!/usr/bin/env python3
"""
MASTER BATCH PROCESSOR - Process ALL remaining hero images
This script will be called multiple times to process images in manageable chunks
"""

import json
import os

# Configuration
BATCH_SIZE = 40  # Process 40 images at a time
PROCESSED_LOG = 'processed_images.json'

# Load what's been processed so far
if os.path.exists(PROCESSED_LOG):
    with open(PROCESSED_LOG, 'r') as f:
        processed_data = json.load(f)
else:
    processed_data = {
        'processed_count': 12,  # We've done 12 so far
        'success_count': 12,
        'failed_count': 3,
        'mappings': {}
    }

# Load remaining images to process
with open('batch_to_process.json', 'r') as f:
    all_remaining = json.load(f)

# Calculate what's left
already_processed = processed_data['processed_count'] - 12  # Subtract initial 12
remaining = all_remaining[already_processed:]

print(f"📊 BATCH PROCESSOR STATUS")
print("="*60)
print(f"Total processed: {processed_data['processed_count']}")
print(f"Remaining: {len(remaining)}")
print(f"Next batch size: {min(BATCH_SIZE, len(remaining))}")
print("="*60)

# Prepare next batch
next_batch = remaining[:BATCH_SIZE]
batch_urls = [img['original_url'] for img in next_batch]

# Save batch for processing
with open('current_batch_urls.json', 'w') as f:
    json.dump({
        'batch_number': (processed_data['processed_count'] - 12) // BATCH_SIZE + 1,
        'urls': batch_urls,
        'slugs': [img['slug'] for img in next_batch],
        'titles': [img['title'] for img in next_batch]
    }, f, indent=2)

print(f"\n✅ Prepared batch of {len(batch_urls)} images")
print(f"📁 Saved to: current_batch_urls.json")
print(f"\n🎯 Ready for image_generation API calls!")
print(f"\nEstimated batches remaining: {(len(remaining) + BATCH_SIZE - 1) // BATCH_SIZE}")
