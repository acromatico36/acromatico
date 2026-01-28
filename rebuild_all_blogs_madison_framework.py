#!/usr/bin/env python3
"""
Rebuild ALL blog posts using Madison-clone template structure
"""

import json
import os
import re
from pathlib import Path

# Paths
TEMPLATE_FILE = '/home/user/webapp/public/static/madison-clone.html'
JSON_DATA = '/home/user/webapp/remaining_to_process.json'
OUTPUT_DIR = '/home/user/webapp/public/static/blog'

# Read template
print(f"Reading template from {TEMPLATE_FILE}...")
with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
    template = f.read()

# Read JSON data
print(f"Reading blog data from {JSON_DATA}...")
with open(JSON_DATA, 'r', encoding='utf-8') as f:
    posts = json.load(f)

print(f"Found {len(posts)} posts to process")

# Create output directory
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Process each post
for idx, post in enumerate(posts, 1):
    slug = post['slug']
    title = post['title']
    hero_url = post['hero_url']
    
    # Clean HTML entities in title
    title_clean = title.replace('&#8211;', '–').replace('&amp;', '&')
    
    print(f"{idx}/{len(posts)}: Processing {slug}...")
    
    # Create blog post HTML from template
    blog_html = template
    
    # Replace Madison content with this post's content
    # 1. Title in <title> tag
    blog_html = re.sub(
        r'<title>.*?</title>',
        f'<title>{title_clean} | Acromatico Photography</title>',
        blog_html,
        flags=re.DOTALL
    )
    
    # 2. Meta description
    blog_html = re.sub(
        r'<meta name="description" content="[^"]*"',
        f'<meta name="description" content="View stunning photos from {title_clean}. Professional photography by Acromatico."',
        blog_html
    )
    
    # 3. Canonical URL
    blog_html = re.sub(
        r'href="https://acromatico\.com/blog/[^"]*"',
        f'href="https://acromatico.com/blog/{slug}"',
        blog_html
    )
    
    # 4. OG URL
    blog_html = re.sub(
        r'<meta property="og:url" content="[^"]*"',
        f'<meta property="og:url" content="https://acromatico.com/blog/{slug}"',
        blog_html
    )
    
    # 5. OG Title
    blog_html = re.sub(
        r'<meta property="og:title" content="[^"]*"',
        f'<meta property="og:title" content="{title_clean}"',
        blog_html
    )
    
    # 6. OG Image (hero URL)
    blog_html = re.sub(
        r'<meta property="og:image" content="[^"]*"',
        f'<meta property="og:image" content="{hero_url}"',
        blog_html
    )
    
    # 7. Twitter Title
    blog_html = re.sub(
        r'<meta property="twitter:title" content="[^"]*"',
        f'<meta property="twitter:title" content="{title_clean}"',
        blog_html
    )
    
    # 8. Twitter Image
    blog_html = re.sub(
        r'<meta property="twitter:image" content="[^"]*"',
        f'<meta property="twitter:image" content="{hero_url}"',
        blog_html
    )
    
    # 9. Schema.org headline
    blog_html = re.sub(
        r'"headline":\s*"[^"]*"',
        f'"headline": "{title_clean}"',
        blog_html
    )
    
    # 10. Schema.org image
    blog_html = re.sub(
        r'"image":\s*"https://hofferphotography[^"]*"',
        f'"image": "{hero_url}"',
        blog_html
    )
    
    # 11. Schema.org mainEntityOfPage
    blog_html = re.sub(
        r'"@id":\s*"https://acromatico\.com/blog/[^"]*"',
        f'"@id": "https://acromatico.com/blog/{slug}"',
        blog_html
    )
    
    # 12. Hero section background image in CSS
    blog_html = re.sub(
        r"background-image:\s*url\('https://hofferphotography[^']*'\);",
        f"background-image: url('{hero_url}');",
        blog_html
    )
    
    # 13. H1 title in hero overlay
    blog_html = re.sub(
        r'<h1[^>]*>Madison & Jordan \| Cork Factory Hotel Wedding</h1>',
        f'<h1>{title_clean}</h1>',
        blog_html
    )
    
    # 14. Subtitle in hero (location/date)
    # Keep generic for now - can be customized later
    blog_html = re.sub(
        r'<p class="subtitle">Lancaster, PA • January 24, 2026</p>',
        f'<p class="subtitle">Professional Photography by Acromatico</p>',
        blog_html
    )
    
    # Write output file
    output_file = os.path.join(OUTPUT_DIR, f'{slug}.html')
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(blog_html)

print(f"\n✅ Successfully generated {len(posts)} blog posts!")
print(f"Output directory: {OUTPUT_DIR}")
