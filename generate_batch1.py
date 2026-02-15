#!/usr/bin/env python3
"""Generate Batch 1: 10 diverse posts for review"""

import json
import sys
from pathlib import Path

# Import the main generator
sys.path.insert(0, '/home/user/webapp')
from generate_perfect_blog_posts_v4 import build_complete_post_html, all_posts, checklist

# Load batch slugs
with open('/tmp/batch1_posts.json', 'r') as f:
    batch_slugs = json.load(f)

print("🚀 GENERATING BATCH 1: 10 DIVERSE POSTS")
print("=" * 60)

success = 0
failed = 0
errors = []

for slug in batch_slugs:
    # Find post data - use 'slug' key instead of 'post_name'
    post_data = next((p for p in all_posts if p.get('slug') == slug), None)
    checklist_item = next((c for c in checklist if c['slug'] == slug), None)
    
    if not post_data or not checklist_item:
        msg = f"❌ Post not found: {slug}"
        print(msg)
        errors.append(msg)
        failed += 1
        continue
    
    # Use the correct key structure
    title = post_data.get('title', {}).get('rendered', slug) if isinstance(post_data.get('title'), dict) else post_data.get('title', slug)
    post_type = checklist_item.get('type', 'unknown')
    images = checklist_item.get('images', 0)
    
    print(f"\n📝 Generating: {title}")
    print(f"   Type: {post_type.upper()}")
    print(f"   Images: {images}")
    print(f"   Slug: {slug}")
    
    try:
        html = build_complete_post_html(post_data, checklist_item)
        
        # Save to file
        output_path = Path(f'public/static/blog/{slug}.html')
        output_path.write_text(html, encoding='utf-8')
        
        file_size = output_path.stat().st_size // 1024
        print(f"   ✅ Created: {output_path} ({file_size}K)")
        success += 1
        
    except Exception as e:
        import traceback
        msg = f"   ❌ Error for {slug}: {str(e)}"
        print(msg)
        print(traceback.format_exc())
        errors.append(msg)
        failed += 1

print("\n" + "=" * 60)
print(f"✅ SUCCESS: {success}/10 posts generated")
if failed > 0:
    print(f"❌ FAILED: {failed}/10 posts")
    print("\nERRORS:")
    for err in errors:
        print(f"  {err}")
