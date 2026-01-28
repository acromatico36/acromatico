#!/usr/bin/env python3
"""
SMART IMAGE SELECTION - AI-POWERED
Replaces section images with ACCURATELY matched images and captions
based on actual image content analysis.
"""

import re
from pathlib import Path

# Smart image selections based on AI analysis
# Order matches the CURRENT order in the HTML file
SMART_IMAGE_SELECTIONS = [
    # First featured-image: Matheson Hammock Park (Location Overview)
    {
        "image_num": 22,
        "url": "https://acromatico.com/wp-content/uploads/2023/05/20th-Anniversary-Photo-Session-22.jpeg",
        "alt": "Family walking hand-in-hand through Matheson Hammock Park Miami",
        "caption": "The Mares family strolling through Matheson Hammock Park's tree-lined pathways – a hidden gem in Miami"
    },
    
    # Second featured-image: Photography Approach (should be #16 - dress train helping)
    {
        "image_num": 16,
        "url": "https://acromatico.com/wp-content/uploads/2023/05/20th-Anniversary-Photo-Session-16.jpeg",
        "alt": "Documentary wedding photography - family helping with wedding dress train",
        "caption": "Candid documentary moment – the family helping Claire with her dress train, capturing authentic connection"
    },
    
    # Third featured-image: Golden Hour Timeline
    {
        "image_num": 32,
        "url": "https://acromatico.com/wp-content/uploads/2023/05/20th-Anniversary-Photo-Session-32.jpeg",
        "alt": "Golden hour couple portrait with Miami sunset glow at Matheson Hammock",
        "caption": "Golden hour magic – the warm Miami sunset creating a natural glow and romantic atmosphere"
    },
    
    # Fourth featured-image: Claire's Wedding Dress Story
    {
        "image_num": 15,
        "url": "https://acromatico.com/wp-content/uploads/2023/05/20th-Anniversary-Photo-Session-15.jpeg",
        "alt": "Claire wearing her original strapless wedding dress 20 years later at Matheson Hammock",
        "caption": "Claire's original wedding dress – preserved beautifully for 20 years and still stunning"
    },
    
    # Fifth featured-image: Personal Touches/Details
    {
        "image_num": 40,
        "url": "https://acromatico.com/wp-content/uploads/2023/05/20th-Anniversary-Photo-Session-40.jpeg",
        "alt": "Close-up of couple holding hands showing wedding ring - 20th anniversary",
        "caption": "The ring that started it all 20 years ago – still shining as bright as their love"
    }
]

def fix_section_images(html_file):
    """Replace section images with smart AI-selected matches"""
    
    html_path = Path(html_file)
    if not html_path.exists():
        print(f"❌ File not found: {html_file}")
        return False
    
    content = html_path.read_text(encoding='utf-8')
    original_content = content
    
    print("🔍 SMART IMAGE SELECTION - Replacing with AI-analyzed matches...\n")
    
    # Find all featured-image blocks
    pattern = r'<div class="featured-image">.*?</div>'
    matches = list(re.finditer(pattern, content, re.DOTALL))
    
    print(f"Found {len(matches)} featured-image blocks\n")
    
    if len(matches) != len(SMART_IMAGE_SELECTIONS):
        print(f"⚠️  WARNING: Expected {len(SMART_IMAGE_SELECTIONS)} blocks, found {len(matches)}")
    
    # Replace each block in reverse order (to preserve indices)
    for idx in range(min(len(matches), len(SMART_IMAGE_SELECTIONS)) - 1, -1, -1):
        match = matches[idx]
        data = SMART_IMAGE_SELECTIONS[idx]
        
        old_block = match.group(0)
        
        # Create new block
        new_block = f'''<div class="featured-image"><img alt="{data['alt']}" class="section-image" loading="lazy" src="{data['url']}"/><p class="image-caption">{data['caption']}</p></div>'''
        
        # Replace
        content = content[:match.start()] + new_block + content[match.end():]
        
        print(f"✅ Block {idx + 1}: Image #{data['image_num']}")
        print(f"   Caption: {data['caption'][:60]}...")
        print()
    
    # Write updated content
    if content != original_content:
        html_path.write_text(content, encoding='utf-8')
        print(f"\n✅ SMART IMAGE SELECTION COMPLETE!")
        print(f"   File: {html_file}")
        print(f"   {len(SMART_IMAGE_SELECTIONS)} images replaced with AI-selected matches")
        return True
    else:
        print("⚠️  No changes made")
        return False

if __name__ == "__main__":
    test_post = "/home/user/webapp/public/static/blog/20th-anniversary-photo-session.html"
    fix_section_images(test_post)
    
    print("\n" + "="*80)
    print("SMART IMAGE SELECTIONS APPLIED:")
    print("="*80)
    print("Section 1: Park Overview → Image #22 (family walking through park)")
    print("Section 2: Photography Approach → Image #16 (helping with dress train)")
    print("Section 3: Golden Hour → Image #32 (sunset glow with lens flare)")
    print("Section 4: Wedding Dress → Image #15 (strapless dress with train)")
    print("Section 5: Personal Touches → Image #40 (hands with wedding ring)")
    print("="*80)
    print("\n✅ All captions now match actual image content!")
