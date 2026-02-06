#!/usr/bin/env python3
"""
ACROMATICO BLOG POST VALIDATOR
Runs comprehensive validation checks on generated blog posts
ZERO TOLERANCE for errors - every post must pass ALL checks
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Tuple

def validate_post(post_file: str, post_slug: str, post_type: str, expected_images: int) -> Tuple[bool, List[str]]:
    """
    Run comprehensive validation on a blog post
    Returns: (passed: bool, errors: List[str])
    """
    errors = []
    warnings = []
    
    # Read post file
    try:
        with open(post_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        return (False, [f"❌ FILE NOT FOUND: {post_file}"])
    
    print(f"\n{'='*60}")
    print(f"🔍 VALIDATING: {post_slug}")
    print(f"   Type: {post_type.upper()}")
    print(f"   Expected Images: {expected_images}")
    print(f"{'='*60}")
    
    # ========================================
    # 1. CROSS-CONTAMINATION CHECK (CRITICAL)
    # ========================================
    print("\n1️⃣  CROSS-CONTAMINATION CHECK")
    
    # Check for Mares content in non-Mares posts
    if post_slug not in ['20th-anniversary-photo-session', 'mares-family']:
        contamination_terms = {
            'mares': 'Mares family name',
            'claire': 'Claire (person from Mares post)',
            '20th-anniversary-photo-session': 'Mares post images'
        }
        
        for term, description in contamination_terms.items():
            if term.lower() in content.lower():
                count = content.lower().count(term.lower())
                errors.append(f"❌ CONTAMINATION: Found '{term}' ({description}) {count} times")
                print(f"   ❌ Found '{term}' {count} times")
        
        # Check for Matheson Hammock in non-Matheson posts
        if 'matheson hammock' in post_slug.lower():
            print(f"   ✅ Matheson Hammock allowed (post is AT Matheson Hammock)")
        elif 'matheson hammock' in content.lower():
            count = content.lower().count('matheson hammock')
            errors.append(f"❌ WRONG LOCATION: Found 'Matheson Hammock' {count} times (post not at this location)")
            print(f"   ❌ Found 'Matheson Hammock' {count} times")
    
    if not any('CONTAMINATION' in e or 'WRONG LOCATION' in e for e in errors):
        print("   ✅ No cross-contamination detected")
    
    # ========================================
    # 2. POST TYPE SECTION VALIDATION
    # ========================================
    print("\n2️⃣  POST TYPE SECTION VALIDATION")
    
    wrong_sections = {
        'newborn': {
            'terms': ['ceremony', 'reception', 'first dance', 'vows', 'wedding dress', 'bride', 'groom'],
            'reason': 'Wedding content in newborn post'
        },
        'engagement': {
            'terms': ['ceremony', 'reception', 'baby', 'newborn curl', 'diaper'],
            'reason': 'Wrong content type'
        },
        'maternity': {
            'terms': ['ceremony', 'reception', 'wedding dress', 'first dance'],
            'reason': 'Wedding content in maternity post'
        },
        'family': {
            'terms': ['ceremony', 'groom', 'bride', 'vows', 'wedding dress'],
            'reason': 'Wedding content in family post'
        },
        'anniversary': {
            'terms': ['newborn curl', 'baby wrap', 'diaper', 'umbilical cord'],
            'reason': 'Newborn content in anniversary post'
        }
    }
    
    if post_type in wrong_sections:
        found_wrong = False
        for term in wrong_sections[post_type]['terms']:
            # Be more lenient - only flag if found multiple times or in headings
            count = content.lower().count(term.lower())
            if count > 2:  # Allow 1-2 mentions (might be in FAQ)
                errors.append(f"❌ WRONG CONTENT: Found '{term}' {count} times ({wrong_sections[post_type]['reason']})")
                print(f"   ❌ Found '{term}' {count} times")
                found_wrong = True
        
        if not found_wrong:
            print(f"   ✅ Content appropriate for {post_type} post")
    
    # ========================================
    # 3. TITLE & METADATA VALIDATION
    # ========================================
    print("\n3️⃣  TITLE & METADATA VALIDATION")
    
    # Check page title
    title_match = re.search(r'<title>\s*(.*?)\s*</title>', content, re.DOTALL)
    if title_match:
        page_title = title_match.group(1).strip()
        if '20th anniversary' in page_title.lower() and '20th-anniversary' not in post_slug:
            errors.append(f"❌ WRONG TITLE: Page title references '20th Anniversary' but post is '{post_slug}'")
            print(f"   ❌ Title: {page_title[:60]}...")
        elif 'mares' in page_title.lower() and 'mares' not in post_slug:
            errors.append(f"❌ WRONG TITLE: Page title references 'Mares' but post is '{post_slug}'")
            print(f"   ❌ Title: {page_title[:60]}...")
        else:
            print(f"   ✅ Title: {page_title[:60]}...")
    else:
        errors.append(f"❌ NO TITLE: Missing <title> tag")
        print(f"   ❌ No <title> tag found")
    
    # Check meta description
    meta_desc = re.search(r'<meta content="([^"]*)" name="description"/>', content)
    if meta_desc:
        desc = meta_desc.group(1)
        if 'celebrate 20 years' in desc.lower() and '20th-anniversary' not in post_slug:
            errors.append(f"❌ WRONG META: Description references '20th anniversary' but post is '{post_slug}'")
            print(f"   ❌ Meta Desc: {desc[:60]}...")
        elif 'mares' in desc.lower() and 'mares' not in post_slug:
            errors.append(f"❌ WRONG META: Description references 'Mares' but post is '{post_slug}'")
            print(f"   ❌ Meta Desc: {desc[:60]}...")
        else:
            print(f"   ✅ Meta Desc: {desc[:60]}...")
    else:
        warnings.append(f"⚠️  NO META DESCRIPTION")
        print(f"   ⚠️  No meta description found")
    
    # Check og:image
    og_image = re.search(r'<meta content="([^"]*)" property="og:image"/>', content)
    if og_image:
        img_url = og_image.group(1)
        if '20th-anniversary-photo-session' in img_url.lower() and '20th-anniversary' not in post_slug:
            errors.append(f"❌ WRONG OG:IMAGE: Using Mares session image for different post")
            print(f"   ❌ OG Image: {img_url[:60]}...")
        else:
            print(f"   ✅ OG Image: {img_url[:60]}...")
    
    # ========================================
    # 4. IMAGE VALIDATION
    # ========================================
    print("\n4️⃣  IMAGE VALIDATION")
    
    # Check hero background image
    hero_bg = re.search(r"background-image: url\('([^']*)'\);", content)
    if hero_bg:
        hero_url = hero_bg.group(1)
        if '20th-anniversary-photo-session' in hero_url.lower() and '20th-anniversary' not in post_slug:
            errors.append(f"❌ WRONG HERO: Using Mares session hero image")
            print(f"   ❌ Hero BG: {hero_url[:60]}...")
        else:
            print(f"   ✅ Hero BG: {hero_url[:60]}...")
    else:
        errors.append(f"❌ NO HERO IMAGE: Missing hero background image")
        print(f"   ❌ No hero background image")
    
    # Count gallery images
    gallery_images = re.findall(r'<img[^>]*class="gallery-image"[^>]*>', content)
    gallery_count = len(gallery_images)
    
    if gallery_count == 0:
        errors.append(f"❌ NO GALLERY: No gallery images found")
        print(f"   ❌ No gallery images found")
    elif gallery_count < expected_images * 0.5:  # Less than 50% of expected
        warnings.append(f"⚠️  LOW IMAGE COUNT: Found {gallery_count} but expected ~{expected_images}")
        print(f"   ⚠️  Found {gallery_count} gallery images (expected ~{expected_images})")
    else:
        print(f"   ✅ Found {gallery_count} gallery images")
    
    # Check for Mares images in gallery
    if post_slug not in ['20th-anniversary-photo-session', 'mares-family']:
        mares_gallery_imgs = re.findall(r'20th-Anniversary-Photo-Session-\d+\.jpeg', content)
        if mares_gallery_imgs:
            errors.append(f"❌ MARES IMAGES IN GALLERY: Found {len(mares_gallery_imgs)} Mares images in gallery")
            print(f"   ❌ Found {len(mares_gallery_imgs)} Mares images in gallery")
    
    # ========================================
    # 5. STRUCTURE VALIDATION
    # ========================================
    print("\n5️⃣  STRUCTURE VALIDATION")
    
    required_sections = {
        'hero-title': 'Hero title (H1)',
        'section-heading': 'Section headings',
        'gallery-container': 'Photo gallery',
        'cta-section': 'CTA section',
        'faq-section': 'FAQ section'
    }
    
    for section, description in required_sections.items():
        count = content.count(section)
        if count == 0:
            errors.append(f"❌ MISSING SECTION: {description} ({section}) not found")
            print(f"   ❌ Missing: {description}")
        else:
            print(f"   ✅ {description}: {count} found")
    
    # Count section headings (should be ~4 content + FAQ headings)
    section_headings = re.findall(r'<h2 class="section-heading">', content)
    if len(section_headings) < 4:
        warnings.append(f"⚠️  LOW SECTION COUNT: Found {len(section_headings)} section headings (expected 4+)")
        print(f"   ⚠️  Found {len(section_headings)} section headings (expected 4+)")
    
    # ========================================
    # 6. FAQ VALIDATION
    # ========================================
    print("\n6️⃣  FAQ VALIDATION")
    
    # Check if FAQ section exists
    if 'faq-section' in content:
        # Check for wrong FAQ content
        if post_type == 'newborn':
            if 'anniversary session' in content.lower():
                errors.append(f"❌ WRONG FAQ: Anniversary FAQs in newborn post")
                print(f"   ❌ Found anniversary FAQs in newborn post")
            else:
                print(f"   ✅ FAQ content appropriate for {post_type}")
        elif post_type == 'wedding':
            if 'newborn' in content.lower() or 'baby' in content.lower():
                errors.append(f"❌ WRONG FAQ: Newborn FAQs in wedding post")
                print(f"   ❌ Found newborn FAQs in wedding post")
            else:
                print(f"   ✅ FAQ content appropriate for {post_type}")
    else:
        warnings.append(f"⚠️  NO FAQ SECTION")
        print(f"   ⚠️  No FAQ section found")
    
    # ========================================
    # 7. RESPONSIVE & TECHNICAL
    # ========================================
    print("\n7️⃣  RESPONSIVE & TECHNICAL")
    
    # Check for required CSS/JS
    required_assets = {
        'glightbox': 'GLightbox (lightbox library)',
        'tailwindcss': 'Tailwind CSS',
        'Montserrat': 'Montserrat font'
    }
    
    for asset, description in required_assets.items():
        if asset.lower() in content.lower():
            print(f"   ✅ {description} loaded")
        else:
            warnings.append(f"⚠️  {description} not found")
            print(f"   ⚠️  {description} not found")
    
    # Check for lazy loading
    lazy_images = content.count('loading="lazy"')
    if lazy_images > 0:
        print(f"   ✅ Lazy loading: {lazy_images} images")
    else:
        warnings.append(f"⚠️  No lazy loading on images")
        print(f"   ⚠️  No lazy loading on images")
    
    # ========================================
    # FINAL RESULT
    # ========================================
    print(f"\n{'='*60}")
    
    if len(errors) == 0:
        if len(warnings) == 0:
            print(f"✅ PERFECT! Post validation passed with no errors or warnings!")
            return (True, [])
        else:
            print(f"✅ PASSED with {len(warnings)} warnings")
            for warning in warnings:
                print(f"   {warning}")
            return (True, warnings)
    else:
        print(f"❌ FAILED! Found {len(errors)} critical errors:")
        for error in errors:
            print(f"   {error}")
        if warnings:
            print(f"\n⚠️  Also found {len(warnings)} warnings:")
            for warning in warnings:
                print(f"   {warning}")
        return (False, errors)


def main():
    """Test validation on generated posts"""
    print("🔍 ACROMATICO BLOG POST VALIDATOR")
    print("="*60)
    
    # Test posts
    test_posts = [
        {
            'file': 'public/static/blog/atticus-roche-miami-newborn-session.html',
            'slug': 'atticus-roche-miami-newborn-session',
            'type': 'newborn',
            'expected_images': 30
        },
        {
            'file': 'public/static/blog/adriana-francisco-bill-baggs-state-park-after-wedding-session.html',
            'slug': 'adriana-francisco-bill-baggs-state-park-after-wedding-session',
            'type': 'wedding',
            'expected_images': 14
        }
    ]
    
    results = []
    for post in test_posts:
        passed, errors = validate_post(
            post['file'],
            post['slug'],
            post['type'],
            post['expected_images']
        )
        results.append({
            'slug': post['slug'],
            'passed': passed,
            'errors': errors
        })
    
    # Summary
    print("\n" + "="*60)
    print("📊 VALIDATION SUMMARY")
    print("="*60)
    
    passed_count = sum(1 for r in results if r['passed'])
    total_count = len(results)
    
    print(f"\n✅ Passed: {passed_count}/{total_count}")
    print(f"❌ Failed: {total_count - passed_count}/{total_count}")
    
    if passed_count == total_count:
        print("\n🎉 ALL POSTS PASSED VALIDATION!")
        print("✅ Ready to scale to all 475 posts")
    else:
        print("\n❌ SOME POSTS FAILED - FIX BEFORE SCALING!")
        print("🔧 Review errors above and regenerate failed posts")


if __name__ == '__main__':
    main()
