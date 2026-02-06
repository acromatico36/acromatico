#!/usr/bin/env python3
"""
ACROMATICO BLOG POST GENERATOR
Uses the 20th Anniversary (Mares) template structure for ALL posts
Generates unique, SEO-rich content for each post type
"""

import json
import re
from pathlib import Path
from typing import Dict, List

# Load data
with open('public/static/blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    all_posts = json.load(f)

# Load checklist
with open('blog_generation_checklist.json', 'r', encoding='utf-8') as f:
    checklist = json.load(f)

# Load the perfect template
with open('public/static/blog/20th-anniversary-photo-session.html', 'r', encoding='utf-8') as f:
    template_html = f.read()


def extract_images_from_post(post_content: str) -> List[str]:
    """Extract all image URLs from post content"""
    img_pattern = r'https://acromatico\.com/wp-content/uploads/[^\s"\'<>]+'
    images = re.findall(img_pattern, post_content)
    return list(dict.fromkeys(images))  # Remove duplicates, preserve order


def generate_section_content(post_type: str, section_num: int, post_data: Dict) -> Dict[str, str]:
    """Generate contextually appropriate section content based on post type"""
    
    # Handle title being a dict with 'rendered' key
    title_data = post_data.get('title', '')
    if isinstance(title_data, dict):
        title = title_data.get('rendered', '').replace('&#8217;', "'")
    else:
        title = str(title_data).replace('&#8217;', "'")
    
    # Extract location/venue from title if present
    location = ""
    if '|' in title:
        parts = title.split('|')
        if len(parts) > 1:
            location = parts[0].strip()
    
    sections = {
        'wedding': [
            {
                'heading': 'The Ceremony:<br/>Where Two Lives Became One',
                'content': f'The ceremony was intimate and filled with emotion. Every vow exchanged, every tear shed, and every smile shared told the story of two souls committing to a lifetime together. We captured these precious moments with a documentary approach, ensuring nothing was missed.'
            },
            {
                'heading': 'Couple Portraits:<br/>Capturing Your Unique Love Story',
                'content': f'After the ceremony, we took time for couple portraits. This is where the magic happens – authentic moments between newlyweds, natural light, and genuine emotion. We focus on creating timeless images that feel effortless and true to who you are as a couple.'
            },
            {
                'heading': 'The Reception:<br/>Celebrating Love & Family',
                'content': f'The reception was a celebration of love, laughter, and family. From the first dance to the last song, we documented every moment – the toasts, the dancing, the candid interactions. These are the memories you\'ll treasure forever.'
            },
            {
                'heading': 'Photography Approach:<br/>Documentary Style with Artistic Vision',
                'content': f'Our approach combines photojournalism with fine art aesthetics. We capture 70% candid moments and 30% directed portraits, ensuring your day is documented authentically while still creating stunning artistic images. Long lenses, natural light, and a respectful distance allow genuine moments to unfold.'
            }
        ],
        'engagement': [
            {
                'heading': 'The Location:<br/>Setting the Scene for Your Love Story',
                'content': f'Choosing the right location is crucial for engagement photos. This spot provided the perfect backdrop – natural beauty, meaningful significance, and plenty of variety for different looks. We explored multiple areas to create a diverse collection of images.'
            },
            {
                'heading': 'Authentic Moments:<br/>Capturing Your Connection',
                'content': f'The best engagement photos happen when couples forget about the camera and focus on each other. We guide you through prompts that encourage natural interaction – walking together, sharing stories, laughing at inside jokes. The result is genuine emotion captured beautifully.'
            },
            {
                'heading': 'Session Flow:<br/>From Nervous to Natural',
                'content': f'Most couples feel awkward at first, and that\'s completely normal! We start with simple prompts and gradually build comfort. Within 15 minutes, the nerves disappear and the real you emerges. That\'s when the magic happens.'
            },
            {
                'heading': 'Photography Style:<br/>Timeless & Editorial',
                'content': f'Our engagement session style blends editorial sophistication with candid warmth. Think magazine-quality images that also feel genuinely you. We use natural light, thoughtful composition, and a mix of wide environmental shots and intimate close-ups.'
            }
        ],
        'newborn': [
            {
                'heading': 'The Session:<br/>Welcome to the World, Little One',
                'content': f'Newborn sessions are all about those fleeting first days – tiny fingers, peaceful sleep, and that newborn curl. We work gently and patiently, following baby\'s cues. Sessions typically last 2-3 hours, allowing plenty of time for feeding and soothing.'
            },
            {
                'heading': 'Minimal & Timeless:<br/>Classic Newborn Photography',
                'content': f'Our newborn style is clean, simple, and timeless. Soft neutral tones, minimal props, and natural light create images that won\'t feel dated in 20 years. The focus is always on baby – those tiny details, peaceful expressions, and the love surrounding them.'
            },
            {
                'heading': 'Family Connection:<br/>Capturing the Growing Bond',
                'content': f'We include family portraits during newborn sessions – parents gazing at their new baby, siblings meeting their brother or sister for the first time. These are some of the most emotional and meaningful images we create.'
            },
            {
                'heading': 'Safety First:<br/>Professional Newborn Expertise',
                'content': f'Safety is our top priority. We\'re trained in safe newborn posing and handling. The studio is kept warm (78-80°F) for baby\'s comfort, and we never force poses. Every image is created with baby\'s wellbeing as the primary concern.'
            }
        ],
        'maternity': [
            {
                'heading': 'Celebrating Motherhood:<br/>The Beauty of Expecting',
                'content': f'Maternity sessions celebrate the incredible journey of pregnancy. This is a special time that passes quickly, and these photos preserve the anticipation, the glow, and the love already surrounding your growing baby.'
            },
            {
                'heading': 'Timing & Planning:<br/>When to Schedule Your Session',
                'content': f'The ideal time for maternity photos is between 30-36 weeks. Your belly is beautifully round but you\'re still comfortable enough to move and pose. We recommend scheduling early in your third trimester to allow flexibility if baby arrives early.'
            },
            {
                'heading': 'What to Wear:<br/>Styling for Your Session',
                'content': f'We provide gowns and wardrobe options, or you can bring your own favorites. Fitted silhouettes that show your beautiful belly work best. Solid colors, flowing fabrics, and simple accessories keep the focus on you and your bump.'
            },
            {
                'heading': 'Including Partners & Siblings:<br/>Family Love',
                'content': f'Maternity sessions often include partners and older siblings. These family portraits capture the excitement and anticipation of your growing family. We balance solo portraits celebrating mom with family images showing the love surrounding baby.'
            }
        ],
        'family': [
            {
                'heading': 'Family Sessions:<br/>Capturing Connection & Joy',
                'content': f'Family photography is about more than posed group shots. It\'s about capturing relationships – the way kids look at their parents, sibling connections, grandparent love. We blend formal portraits with candid moments of your family being yourselves.'
            },
            {
                'heading': 'Session Experience:<br/>Relaxed & Fun',
                'content': f'We keep family sessions fun and low-pressure. Kids especially do best when sessions feel like playtime, not a chore. We bring energy, prompts, and patience, allowing personalities to shine through naturally.'
            },
            {
                'heading': 'Location & Timing:<br/>Setting Up for Success',
                'content': f'Location and timing matter! We choose spots with visual variety and natural light. For families with young kids, scheduling during their best time of day (usually morning or after nap) makes a huge difference in smiles and cooperation.'
            },
            {
                'heading': 'What to Expect:<br/>From Planning to Gallery',
                'content': f'From our initial consultation through your final gallery delivery, we guide you every step. Wardrobe suggestions, location scouting, session day coaching, and professional editing ensure beautiful images that feel authentically you.'
            }
        ],
        'anniversary': [
            {
                'heading': 'Anniversary Sessions:<br/>Celebrating Lasting Love',
                'content': f'Anniversary sessions honor the journey you\'ve shared together. Whether it\'s 5 years or 50, these photos celebrate your commitment, growth, and the love that continues to deepen with time.'
            },
            {
                'heading': 'Personal Touches:<br/>What Makes Your Story Unique',
                'content': f'We encourage incorporating meaningful elements – wearing your wedding attire, visiting significant locations, recreating old photos. These personal touches transform a photo session into a true celebration of your specific love story.'
            },
            {
                'heading': 'Photography Approach:<br/>Documenting Authentic Connection',
                'content': f'Our approach blends candid documentary style with artfully directed moments. We capture genuine interaction and emotion while also creating beautiful composed portraits. The result is a gallery that feels both authentic and elevated.'
            },
            {
                'heading': 'Planning Your Session:<br/>Making It Memorable',
                'content': f'Anniversary sessions work beautifully at meaningful locations – where you got engaged, where you married, or favorite spots you\'ve visited together. Golden hour timing creates romantic, flattering light. Plan for 60-90 minutes to relax and enjoy the experience.'
            }
        ]
    }
    
    # Get appropriate sections for post type
    post_sections = sections.get(post_type, sections['wedding'])
    
    # Return the section based on index
    if section_num < len(post_sections):
        return post_sections[section_num]
    else:
        # If we need more sections, cycle through them
        return post_sections[section_num % len(post_sections)]


def generate_post_html(post_data: Dict, checklist_item: Dict) -> str:
    """Generate complete HTML for a blog post using Mares template structure"""
    
    slug = post_data['slug']
    # Handle title being a dict with 'rendered' key
    title_data = post_data.get('title', '')
    if isinstance(title_data, dict):
        title = title_data.get('rendered', '').replace('&#8217;', "'")
    else:
        title = str(title_data).replace('&#8217;', "'")
    post_type = checklist_item.get('type', 'wedding')
    
    # Extract first paragraph as intro
    content_text = post_data.get('yoast_head_json', {}).get('og_description', '')
    if not content_text:
        # Try to extract from content
        content = post_data.get('content', {}).get('rendered', '')
        # Remove HTML tags and get first paragraph
        clean_text = re.sub(r'<[^>]+>', '', content)
        paragraphs = [p.strip() for p in clean_text.split('\n') if p.strip()]
        content_text = paragraphs[0] if paragraphs else f'A beautiful {post_type} captured by Acromatico Photography.'
    
    # Extract images
    images = extract_images_from_post(post_data.get('content', {}).get('rendered', ''))
    
    if not images:
        print(f"⚠️ Warning: No images found for {slug}")
        return None
    
    hero_image = images[0]
    
    # Generate meta description
    meta_description = content_text[:160] + '...' if len(content_text) > 160 else content_text
    
    # Start with template
    html = template_html
    
    # Replace title
    html = html.replace(
        '<title>\n   20th Anniversary Photo Session | Mares Family | Acromatico Photography\n  </title>',
        f'<title>\n   {title} | Acromatico Photography\n  </title>'
    )
    
    # Replace meta description
    html = re.sub(
        r'<meta content="Celebrate 20 years.*?" name="description"/>',
        f'<meta content="{meta_description}" name="description"/>',
        html
    )
    
    # Replace og:url
    html = html.replace(
        'https://acromatico.com/blog/20th-anniversary-photo-session',
        f'https://acromatico.com/blog/{slug}'
    )
    
    # Replace og:title
    html = re.sub(
        r'<meta content="20th Anniversary Photo Session.*?" property="og:title"/>',
        f'<meta content="{title}" property="og:title"/>',
        html
    )
    
    # Replace og:image
    html = html.replace(
        '/static/images/no-logo/20th-anniversary-photo-session.jpeg',
        hero_image
    )
    
    # Replace Twitter meta
    html = re.sub(
        r'<meta content="20th Anniversary Photo Session.*?" property="twitter:title"/>',
        f'<meta content="{title}" property="twitter:title"/>',
        html
    )
    
    # Replace canonical URL
    html = html.replace(
        '<link href="https://acromatico.com/blog/20th-anniversary-photo-session" rel="canonical"/>',
        f'<link href="https://acromatico.com/blog/{slug}" rel="canonical"/>'
    )
    
    # Replace hero background image
    html = html.replace(
        "background-image: url('/static/images/no-logo/20th-anniversary-photo-session.jpeg');",
        f"background-image: url('{hero_image}');"
    )
    
    # Replace hero title
    html = re.sub(
        r'<h1 class="hero-title">20th Anniversary Session at Matheson Hammock Park<br/>Miami, Florida \| Mares Family</h1>',
        f'<h1 class="hero-title">{title}</h1>',
        html
    )
    
    # Replace intro content
    intro_pattern = r'<div class="section-text">\s*<p>.*?</p>\s*</div>'
    first_section_text = f'<div class="section-text">\n<p>{content_text}</p>\n</div>'
    html = re.sub(intro_pattern, first_section_text, html, count=1)
    
    # Generate 4 content sections with featured images
    sections_html = []
    for i in range(4):
        section = generate_section_content(post_type, i, post_data)
        
        # Use different images for featured images (skip first one used in hero)
        featured_img_index = (i + 1) % len(images)
        featured_img = images[featured_img_index]
        
        section_html = f'''</div><div class="featured-image"><img alt="{title} - Photo {i+2}" class="section-image" loading="lazy" src="{featured_img}"/><p class="image-caption">{title}</p></div><h2 class="section-heading">{section['heading']}</h2><div class="section-text">
<p>{section['content']}</p>
'''
        sections_html.append(section_html)
    
    # Insert sections before the gallery
    gallery_marker = '<div class="gallery-container">'
    if gallery_marker in html:
        parts = html.split(gallery_marker, 1)
        html = parts[0] + ''.join(sections_html) + gallery_marker + parts[1]
    
    # Replace gallery images
    # First, find and extract the existing gallery container
    gallery_start = html.find('<div class="gallery-container">')
    gallery_end = html.find('</div><div class="cta-section mid-post">')
    
    if gallery_start != -1 and gallery_end != -1:
        # Build new gallery
        gallery_html = '<div class="gallery-container">\n'
        for idx, img_url in enumerate(images):
            gallery_html += f'''<a class="gallery-item glightbox" data-gallery="wedding-gallery" href="{img_url}">
<img alt="{title} - Photo {idx+1}" class="gallery-image" loading="lazy" src="{img_url}"/>
</a>
'''
        gallery_html += '</div>'
        
        # Replace old gallery with new one
        html = html[:gallery_start] + gallery_html + html[gallery_end:]
    
    return html


def main():
    """Generate all blog posts"""
    print("🚀 ACROMATICO BLOG POST GENERATOR")
    print("=" * 60)
    print(f"📊 Total Posts: {len(all_posts)}")
    print(f"📋 Checklist Items: {len(checklist)}")
    print()
    
    # Create a map of slugs to checklist items
    checklist_map = {item['slug']: item for item in checklist}
    
    posts_to_fix = [item for item in checklist if item['status'] == '❌ NEEDS FIX']
    print(f"🔧 Posts Needing Fixes: {len(posts_to_fix)}")
    print()
    
    # For now, let's generate just 3 test posts (1 wedding, 1 newborn, 1 engagement)
    test_posts = []
    for item in checklist:
        if item['status'] == '❌ NEEDS FIX':
            if item['type'] == 'wedding' and len([p for p in test_posts if p['type'] == 'wedding']) == 0:
                test_posts.append(item)
            elif item['type'] == 'newborn' and len([p for p in test_posts if p['type'] == 'newborn']) == 0:
                test_posts.append(item)
            elif item['type'] == 'engagement' and len([p for p in test_posts if p['type'] == 'engagement']) == 0:
                test_posts.append(item)
            
            if len(test_posts) == 3:
                break
    
    print("🧪 TESTING MODE: Generating 3 sample posts")
    print("=" * 60)
    
    for checklist_item in test_posts:
        slug = checklist_item['slug']
        post_type = checklist_item['type']
        
        # Find post data
        post_data = next((p for p in all_posts if p['slug'] == slug), None)
        if not post_data:
            print(f"⚠️ No data found for {slug}")
            continue
        
        print(f"🔨 Generating: {checklist_item['title']}")
        print(f"   Type: {post_type.upper()}")
        print(f"   Images: {checklist_item['images']}")
        
        html = generate_post_html(post_data, checklist_item)
        
        if html:
            # Save the file
            output_path = f"public/static/blog/{slug}.html"
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(html)
            
            print(f"   ✅ Created: {output_path}")
        else:
            print(f"   ❌ Failed to generate")
        
        print()


if __name__ == '__main__':
    main()
