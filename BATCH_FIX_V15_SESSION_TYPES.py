#!/usr/bin/env python3
"""
BATCH V15 - Fix Session Types for All Non-Wedding Posts
========================================================
Identifies and fixes all posts that were incorrectly given wedding sections.
"""

import subprocess
from pathlib import Path
import re

blog_dir = Path("/home/user/webapp/public/static/blog")

# Session type keywords
NON_WEDDING_KEYWORDS = [
    'newborn', 'baby', 'infant',
    'maternity', 'pregnancy',
    'family', 'portrait',
    'engagement', 'proposal',
    'anniversary',
    'senior', 'graduation',
    'commercial', 'branding', 'headshot'
]

# Find all HTML files
html_files = list(blog_dir.glob("*.html"))
html_files = [f for f in html_files if not any(x in f.name for x in ['backup', 'template', 'index', 'test', 'clone'])]

print(f"\n{'='*70}")
print(f"BATCH V15 - FIX SESSION TYPES")
print(f"{'='*70}\n")
print(f"Total posts to check: {len(html_files)}\n")

# Identify posts that might have wrong sections
to_fix = []

for html_file in html_files:
    slug = html_file.stem
    
    # Check if slug contains non-wedding keywords
    for keyword in NON_WEDDING_KEYWORDS:
        if keyword in slug.lower():
            to_fix.append(slug)
            break

print(f"Found {len(to_fix)} non-wedding posts that need fixing\n")
print(f"{'='*70}\n")

# Fix each post
fixed = 0
failed = 0

for i, slug in enumerate(to_fix, 1):
    print(f"[{i}/{len(to_fix)}] Fixing: {slug}")
    
    try:
        result = subprocess.run(
            ['python3', 'FIX_POST_V15_SESSION_TYPE.py', slug],
            cwd='/home/user/webapp',
            capture_output=True,
            text=True,
            timeout=30
        )
        
        if result.returncode == 0:
            fixed += 1
            print(f"  ✓ Fixed\n")
        else:
            failed += 1
            print(f"  ✗ Failed: {result.stderr}\n")
            
    except Exception as e:
        failed += 1
        print(f"  ✗ Error: {e}\n")

print(f"\n{'='*70}")
print(f"BATCH V15 COMPLETE")
print(f"{'='*70}\n")
print(f"Total posts checked: {len(to_fix)}")
print(f"✓ Fixed: {fixed}")
print(f"✗ Failed: {failed}")
print(f"Success rate: {fixed/len(to_fix)*100:.1f}%")
print(f"\n{'='*70}\n")
