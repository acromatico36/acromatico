#!/usr/bin/env python3
"""Quick validation of generated posts"""
import json
import random
from pathlib import Path

# Load checklist
with open('blog_generation_checklist.json', 'r') as f:
    checklist = json.load(f)

# Get posts that were generated
generated = [item for item in checklist if item['status'] == '❌ NEEDS FIX' and item['images'] > 0]

# Sample validation: 3 random posts from each type
validation_sample = {}
for post_type in ['wedding', 'engagement', 'family', 'newborn', 'maternity', 'anniversary']:
    type_posts = [p for p in generated if p['type'] == post_type]
    if type_posts:
        validation_sample[post_type] = random.sample(type_posts, min(3, len(type_posts)))

print("\n🔍 V5 POST VALIDATION SAMPLE\n")
print("=" * 70)

total_checked = 0
total_valid = 0

for post_type, posts in validation_sample.items():
    print(f"\n📂 {post_type.upper()} Posts:")
    for post in posts:
        slug = post['slug']
        path = Path(f"public/static/blog/{slug}.html")
        
        if not path.exists():
            print(f"   ❌ {slug} - FILE NOT FOUND")
            continue
        
        html = path.read_text(encoding='utf-8')
        
        # Validation checks
        checks = {
            'File size > 40KB': path.stat().st_size > 40000,
            'Has post-intro': 'post-intro' in html,
            'Has gallery images': 'gallery-image' in html,
            'Has FAQs': 'faq-section' in html,
            'Has author bio': 'author-bio' in html,
            'Has related posts': 'related-posts' in html,
            'Has dynamic footer': 'footer-container' in html,
            'No Mares contamination': 'Mares family' not in html and 'Matheson Hammock' not in html
        }
        
        passed = sum(checks.values())
        total = len(checks)
        
        if passed == total:
            print(f"   ✅ {slug[:50]:<50} ({passed}/{total})")
            total_valid += 1
        else:
            print(f"   ⚠️  {slug[:50]:<50} ({passed}/{total})")
            for check, result in checks.items():
                if not result:
                    print(f"      ❌ {check}")
        
        total_checked += 1

print("\n" + "=" * 70)
print(f"\n📊 Validation Summary:")
print(f"   ✅ Valid: {total_valid}/{total_checked}")
print(f"   ⚠️  Issues: {total_checked - total_valid}/{total_checked}")
print(f"\n🎯 Success Rate: {(total_valid/total_checked)*100:.1f}%")

if total_valid == total_checked:
    print("\n✅ ALL SAMPLED POSTS PASSED VALIDATION!")
else:
    print(f"\n⚠️  {total_checked - total_valid} posts have issues - review needed")

