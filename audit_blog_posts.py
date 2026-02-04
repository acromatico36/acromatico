#!/usr/bin/env python3
"""
COMPREHENSIVE BLOG POST AUDIT
Check all 536 blog posts for:
1. Missing content
2. Broken images
3. Empty galleries
4. Missing titles
"""

import os
import re
from pathlib import Path
from collections import defaultdict

BLOG_DIR = Path('/home/user/webapp/public/static/blog')

def audit_blog_post(file_path):
    """Audit a single blog post for issues"""
    issues = []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check 1: Missing or empty title
        title_match = re.search(r'<h1[^>]*class="hero-title"[^>]*>(.*?)</h1>', content, re.DOTALL)
        if not title_match or len(title_match.group(1).strip()) < 5:
            issues.append("MISSING_TITLE")
        
        # Check 2: Missing hero image
        hero_match = re.search(r'background-image:\s*url\([\'"]?([^\'"]+)[\'"]?\)', content)
        if not hero_match:
            issues.append("NO_HERO_IMAGE")
        
        # Check 3: Check for gallery images
        img_pattern = r'<img[^>]+src=["\']([^"\']+)["\']'
        images = re.findall(img_pattern, content)
        
        # Filter out data: images and small icons
        real_images = [img for img in images if not img.startswith('data:') and 'icon' not in img.lower()]
        
        if len(real_images) < 3:
            issues.append(f"LOW_IMAGE_COUNT_{len(real_images)}")
        
        # Check 4: Content length (post body)
        # Find content between </style> and footer
        content_match = re.search(r'</style>(.*?)<div id="footer-container"', content, re.DOTALL)
        if content_match:
            body_content = content_match.group(1)
            # Remove HTML tags for text count
            text_only = re.sub(r'<[^>]+>', '', body_content)
            word_count = len(text_only.split())
            
            if word_count < 50:
                issues.append(f"LOW_WORD_COUNT_{word_count}")
        else:
            issues.append("NO_CONTENT_SECTION")
        
        # Check 5: Broken image URLs (404-prone patterns)
        for img in real_images:
            if 'undefined' in img or 'null' in img or img == '':
                issues.append("BROKEN_IMAGE_URL")
                break
        
        return issues
        
    except Exception as e:
        return [f"READ_ERROR_{str(e)[:30]}"]

def main():
    print("🔍 STARTING COMPREHENSIVE BLOG POST AUDIT")
    print(f"📁 Directory: {BLOG_DIR}")
    print("-" * 70)
    
    # Get all HTML files
    html_files = sorted(BLOG_DIR.glob('*.html'))
    
    if not html_files:
        print("❌ No HTML files found!")
        return
    
    print(f"📄 Found {len(html_files)} blog posts")
    print("-" * 70)
    
    # Track issues
    issue_counts = defaultdict(int)
    posts_with_issues = []
    perfect_posts = 0
    
    for file_path in html_files:
        issues = audit_blog_post(file_path)
        
        if issues:
            posts_with_issues.append({
                'file': file_path.name,
                'issues': issues
            })
            for issue in issues:
                issue_counts[issue] += 1
        else:
            perfect_posts += 1
    
    # Print summary
    print("\n" + "=" * 70)
    print("📊 AUDIT SUMMARY")
    print("=" * 70)
    print(f"✅ Perfect posts: {perfect_posts}")
    print(f"⚠️  Posts with issues: {len(posts_with_issues)}")
    print()
    
    if issue_counts:
        print("🔴 ISSUE BREAKDOWN:")
        for issue, count in sorted(issue_counts.items(), key=lambda x: -x[1]):
            print(f"   {issue}: {count} posts")
    
    # Show first 10 problematic posts
    if posts_with_issues:
        print("\n" + "-" * 70)
        print("⚠️  FIRST 10 PROBLEMATIC POSTS:")
        print("-" * 70)
        for i, post in enumerate(posts_with_issues[:10], 1):
            print(f"\n{i}. {post['file']}")
            for issue in post['issues']:
                print(f"   ❌ {issue}")
    
    # Save full report
    report_path = '/home/user/webapp/blog_audit_report.txt'
    with open(report_path, 'w') as f:
        f.write("FULL BLOG POST AUDIT REPORT\n")
        f.write("=" * 70 + "\n\n")
        f.write(f"Total posts: {len(html_files)}\n")
        f.write(f"Perfect posts: {perfect_posts}\n")
        f.write(f"Posts with issues: {len(posts_with_issues)}\n\n")
        
        f.write("ISSUE COUNTS:\n")
        for issue, count in sorted(issue_counts.items(), key=lambda x: -x[1]):
            f.write(f"  {issue}: {count}\n")
        
        f.write("\n\nALL PROBLEMATIC POSTS:\n")
        f.write("-" * 70 + "\n")
        for post in posts_with_issues:
            f.write(f"\n{post['file']}\n")
            for issue in post['issues']:
                f.write(f"  - {issue}\n")
    
    print(f"\n📄 Full report saved: {report_path}")
    print("\n✅ AUDIT COMPLETE!")

if __name__ == '__main__':
    main()
