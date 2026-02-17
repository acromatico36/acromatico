#!/usr/bin/env python3
"""
SIMPLE FINAL TEST - All 501 Posts
Quick validation of structure and SEO
"""

import os
import glob
from bs4 import BeautifulSoup
from pathlib import Path

print("\n" + "="*70)
print("FINAL COMPREHENSIVE TEST - ALL 501 BLOG POSTS")
print("="*70 + "\n")

# Get all HTML files
blog_dir = Path("public/static/blog")
html_files = sorted(blog_dir.glob("*.html"))
html_files = [f for f in html_files if not f.name.endswith('.backup') and not f.name.endswith('.backup2') and not f.name.endswith('.backup_v13')]

print(f"Total Posts Found: {len(html_files)}\n")

stats = {
    'excellent': 0,  # ≥90%
    'good': 0,       # 80-89%
    'fair': 0,       # 70-79%
    'poor': 0        # <70%
}

results = []

for i, html_file in enumerate(html_files, 1):
    slug = html_file.stem
    
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
        
        score = 0
        
        # Quick 10-point check
        # 1. Hero H1
        if soup.find('h1', class_='hero-title'):
            score += 1
        
        # 2. 5 H2 sections
        h2_sections = soup.find_all('h2', class_='section-heading')
        if len(h2_sections) >= 5:
            score += 1
        
        # 3. Featured images
        featured_images = soup.find_all('div', class_='featured-image')
        if len(featured_images) >= 5:
            score += 1
        
        # 4. Gallery
        if soup.find('div', class_='gallery-container'):
            score += 1
        
        # 5. Meta description
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc and len(meta_desc.get('content', '')) >= 100:
            score += 1
        
        # 6. Open Graph tags
        og_tags = soup.find_all('meta', attrs={'property': lambda x: x and x.startswith('og:')})
        if len(og_tags) >= 5:
            score += 1
        
        # 7. Twitter tags
        twitter_tags = soup.find_all('meta', attrs={'name': lambda x: x and x.startswith('twitter:')})
        if len(twitter_tags) >= 5:
            score += 1
        
        # 8. Alt tags
        images = soup.find_all('img')
        images_with_alt = [img for img in images if img.get('alt') and len(img.get('alt', '')) > 10]
        if len(images) > 0 and len(images_with_alt) / len(images) >= 0.8:
            score += 1
        
        # 9. Schema markup
        schema = soup.find_all('script', attrs={'type': 'application/ld+json'})
        if len(schema) >= 2:
            score += 1
        
        # 10. FAQ section
        if soup.find('div', class_='faq-section'):
            score += 1
        
        # Calculate percentage (normalize to 30-point scale)
        percentage = int((score / 10) * 100)
        
        # Determine status
        if percentage >= 90:
            status = "🏆 EXCELLENT"
            stats['excellent'] += 1
        elif percentage >= 80:
            status = "✅ GOOD"
            stats['good'] += 1
        elif percentage >= 70:
            status = "⚠️  FAIR"
            stats['fair'] += 1
        else:
            status = "❌ POOR"
            stats['poor'] += 1
        
        print(f"[{i}/{len(html_files)}] {status} {slug}: {score}/10 ({percentage}%)")
        
        results.append({
            'slug': slug,
            'score': score,
            'percentage': percentage,
            'status': status
        })
        
    except Exception as e:
        print(f"[{i}/{len(html_files)}] ❌ ERROR {slug}: {str(e)}")
        stats['poor'] += 1

# Final summary
total = len(html_files)
print(f"\n{'='*70}")
print(f"FINAL TEST REPORT")
print(f"{'='*70}\n")
print(f"Total Posts Tested: {total}")
print(f"🏆 EXCELLENT (≥90%): {stats['excellent']} ({int(stats['excellent']/total*100) if total > 0 else 0}%)")
print(f"✅ GOOD (80-89%): {stats['good']} ({int(stats['good']/total*100) if total > 0 else 0}%)")
print(f"⚠️  FAIR (70-79%): {stats['fair']} ({int(stats['fair']/total*100) if total > 0 else 0}%)")
print(f"❌ POOR (<70%): {stats['poor']} ({int(stats['poor']/total*100) if total > 0 else 0}%)")

# Calculate average
avg = sum(r['percentage'] for r in results) / len(results) if results else 0
print(f"\nOverall Average Score: {avg:.1f}%")
print(f"{'='*70}\n")

# Show top 10 and bottom 10
if results:
    sorted_results = sorted(results, key=lambda x: x['percentage'], reverse=True)
    
    print(f"\n🏆 TOP 10 POSTS:")
    print(f"{'='*70}")
    for r in sorted_results[:10]:
        print(f"{r['status']} {r['slug']}: {r['score']}/10 ({r['percentage']}%)")
    
    print(f"\n\n❌ BOTTOM 10 POSTS (Need Attention):")
    print(f"{'='*70}")
    for r in sorted_results[-10:]:
        print(f"{r['status']} {r['slug']}: {r['score']}/10 ({r['percentage']}%)")

print(f"\n{'='*70}")
print(f"TEST COMPLETE!")
print(f"{'='*70}\n")
