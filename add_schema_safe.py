#!/usr/bin/env python3
"""
Add comprehensive Schema markup to all Acromatico blog posts
SAFE VERSION - Uses json.dumps() to prevent HTML breakage
"""

import os
import json
from pathlib import Path
from bs4 import BeautifulSoup
from datetime import datetime

BLOG_DIR = Path("/home/user/webapp/public/static/blog")
BASE_URL = "https://acromatico.com"

def extract_title(soup):
    """Extract post title"""
    title_elem = soup.find('h1', class_='post-title')
    if title_elem:
        return title_elem.get_text(strip=True)
    return "Acromatico Photography Blog Post"

def extract_description(soup):
    """Extract post intro as description"""
    intro = soup.find('div', class_='post-intro')
    if intro:
        text = intro.get_text(strip=True)
        return text[:250] + "..." if len(text) > 250 else text
    return "Professional wedding and portrait photography by Acromatico Photography in South Florida."

def extract_images(soup):
    """Extract all images from post"""
    images = []
    
    # Gallery images
    for item in soup.find_all('a', class_='gallery-item'):
        img = item.find('img')
        if img:
            src = item.get('href', '') or img.get('src', '')
            alt = img.get('alt', '')
            if src and src.startswith('http'):
                images.append({'url': src, 'caption': alt, 'alt': alt})
    
    return images

def extract_faqs(soup):
    """Extract FAQ questions and answers"""
    faqs = []
    
    faq_items = soup.find_all('div', class_='faq-item')
    for item in faq_items:
        question_elem = item.find('h3', class_='faq-question')
        answer_elem = item.find('div', class_='faq-answer')
        
        if question_elem and answer_elem:
            question = question_elem.get_text(strip=True)
            answer = answer_elem.get_text(strip=True)
            faqs.append({'question': question, 'answer': answer})
    
    return faqs

def generate_article_schema(slug, title, description, images, date_published="2024-01-15"):
    """Generate Article schema"""
    featured_image = images[0]['url'] if images else f"{BASE_URL}/static/acromatico-logo-dark.png"
    image_urls = [img['url'] for img in images[:10]]
    
    schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": image_urls if image_urls else [featured_image],
        "datePublished": date_published,
        "dateModified": datetime.now().strftime("%Y-%m-%d"),
        "author": {
            "@type": "Person",
            "name": "Italo Campilii",
            "url": f"{BASE_URL}/our-story",
            "image": "https://acromatico.com/wp-content/uploads/2018/09/italo-campilii-acromatico-photography.jpg",
            "jobTitle": "Professional Photographer",
            "worksFor": {
                "@type": "Organization",
                "name": "Acromatico Photography"
            }
        },
        "publisher": {
            "@type": "Organization",
            "name": "Acromatico Photography",
            "url": BASE_URL,
            "logo": {
                "@type": "ImageObject",
                "url": f"{BASE_URL}/static/acromatico-logo-dark.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": f"{BASE_URL}/static/blog/{slug}.html"
        }
    }
    
    return schema

def generate_faq_schema(faqs):
    """Generate FAQ schema"""
    if not faqs:
        return None
    
    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": []
    }
    
    for faq in faqs:
        schema["mainEntity"].append({
            "@type": "Question",
            "name": faq['question'],
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq['answer']
            }
        })
    
    return schema

def generate_breadcrumb_schema(slug, title):
    """Generate Breadcrumb schema"""
    schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": BASE_URL
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": f"{BASE_URL}/blog"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": title,
                "item": f"{BASE_URL}/static/blog/{slug}.html"
            }
        ]
    }
    
    return schema

def generate_image_object_schema(images):
    """Generate ImageObject schema"""
    if not images:
        return None
    
    img = images[0]
    schema = {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "url": img['url'],
        "caption": img['caption'],
        "description": img['alt']
    }
    
    return schema

def add_schema_to_post(html_path):
    """Add all schema markup to a blog post - SAFE VERSION"""
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
        
        slug = html_path.stem
        
        # Extract data
        title = extract_title(soup)
        description = extract_description(soup)
        images = extract_images(soup)
        faqs = extract_faqs(soup)
        
        # Generate schemas
        article_schema = generate_article_schema(slug, title, description, images)
        faq_schema = generate_faq_schema(faqs) if faqs else None
        breadcrumb_schema = generate_breadcrumb_schema(slug, title)
        image_schema = generate_image_object_schema(images) if images else None
        
        # Remove existing schema (if any)
        for script in soup.find_all('script', type='application/ld+json'):
            script.decompose()
        
        # Add schemas to head
        head = soup.find('head')
        if not head:
            return False
        
        # Article Schema - SAFE JSON encoding
        article_script = soup.new_tag('script', type='application/ld+json')
        article_script.string = '\n' + json.dumps(article_schema, indent=2, ensure_ascii=False) + '\n'
        head.append(article_script)
        
        # FAQ Schema - SAFE JSON encoding
        if faq_schema:
            faq_script = soup.new_tag('script', type='application/ld+json')
            faq_script.string = '\n' + json.dumps(faq_schema, indent=2, ensure_ascii=False) + '\n'
            head.append(faq_script)
        
        # Breadcrumb Schema - SAFE JSON encoding
        breadcrumb_script = soup.new_tag('script', type='application/ld+json')
        breadcrumb_script.string = '\n' + json.dumps(breadcrumb_schema, indent=2, ensure_ascii=False) + '\n'
        head.append(breadcrumb_script)
        
        # ImageObject Schema - SAFE JSON encoding
        if image_schema:
            image_script = soup.new_tag('script', type='application/ld+json')
            image_script.string = '\n' + json.dumps(image_schema, indent=2, ensure_ascii=False) + '\n'
            head.append(image_script)
        
        # Write back with proper encoding
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        return True
    
    except Exception as e:
        print(f"  ❌ Error processing {html_path.name}: {e}")
        return False

def main():
    print("🚀 Adding Schema markup to all Acromatico blog posts (SAFE VERSION)...")
    print()
    
    # Get all blog HTML files
    blog_files = list(BLOG_DIR.glob("*.html"))
    blog_posts = [f for f in blog_files if not f.name.startswith('blog-') and not f.name in ['NEW-CONTENT-SECTIONS.html', 'madison-clone.html']]
    
    total = len(blog_posts)
    processed = 0
    success = 0
    
    for html_file in blog_posts:
        if add_schema_to_post(html_file):
            success += 1
        
        processed += 1
        
        if processed % 50 == 0:
            print(f"  {processed}/{total} posts processed...")
    
    print()
    print(f"✅ COMPLETE: Added schema to {success}/{total} posts")

if __name__ == "__main__":
    main()
