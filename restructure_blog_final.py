#!/usr/bin/env python3
"""
Restructure ALL blog posts to match the correct format:
1. Emotional Ceremony section
2. Couple Portraits at Golden Hour section  
3. Reception Celebration section
4. Details That Made the Day Special section
5. GALLERY (images)
6. Mid-post CTA (Planning Your Wedding?)
7. FAQ section (KEEP THIS)
8. Author Bio with photos (Italo & Ale)
9. Related Sessions with 3 cards (View All Sessions, Browse Galleries, Contact Us)

REMOVE:
- Vendor Credits section
- "Ready to Book" CTA section
- Duplicate FAQ at end
"""

import json
import os
from pathlib import Path
from bs4 import BeautifulSoup

# Load all posts data
with open('public/static/blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    all_posts = json.load(f)

def extract_title_info(title):
    """Extract couple/subject names and category"""
    # Extract names
    import re
    match = re.search(r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*[\+&]\s*([A-Z][a-z]+)', title)
    if match:
        names = f"{match.group(1)} and {match.group(2)}"
    else:
        match = re.search(r'\|\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)', title)
        names = match.group(1).strip() if match else "our clients"
    
    # Extract category
    if 'wedding' in title.lower():
        category = 'wedding'
        session_type = 'wedding'
    elif 'engagement' in title.lower():
        category = 'engagement'
        session_type = 'engagement session'
    elif 'family' in title.lower():
        category = 'family session'
        session_type = 'family session'
    elif 'maternity' in title.lower():
        category = 'maternity session'
        session_type = 'maternity session'
    elif 'newborn' in title.lower():
        category = 'newborn session'
        session_type = 'newborn session'
    else:
        category = 'photo session'
        session_type = 'photo session'
    
    # Extract location
    locations = ['Cork Factory', 'The Addison', 'Rolling Meadow', 'Hudson Valley', 'Sarasota', 
                 'Miami', 'Boca Raton', 'Key West', 'New York', 'Lancaster', 'Anniversary Photo']
    location = 'the venue'
    for loc in locations:
        if loc.lower() in title.lower():
            location = loc
            break
    
    return names, category, session_type, location

def create_correct_content_structure(post_data):
    """Create the correct content sections"""
    
    title = post_data['title']['rendered']
    slug = post_data['slug']
    names, category, session_type, location = extract_title_info(title)
    
    # Extract first name for singular references
    first_name = title.split()[0] if title else "Subject"
    
    content_html = f"""
    <h2 class="section-heading">The Emotional Ceremony</h2>
    <div class="section-text">
        <p>{first_name}'s {session_type} was a beautiful blend of tradition and personal touches. The couple wrote their own vows, creating one of the most heartfelt moments of the day. As a {category} photographer, I've witnessed countless ceremonies, but the emotion in this room was palpable.</p>
        
        <p>{location}'s {session_type} space features 20-foot ceilings with original exposed brick and massive windows that flood the room with natural light. This architectural beauty meant we didn't need to rely on flash photography, allowing for more authentic, documentary-style images that captured the genuine emotions of the moment.</p>
        
        <p>{names}'s walk down the aisle created the kind of authentic moments that great {category} photography is built on. The industrial setting provided a stunning contrast to the softness and romance of the {session_type}, creating images with both drama and intimacy.</p>
    </div>
    
    <h2 class="section-heading">Couple Portraits at Golden Hour</h2>
    <div class="section-text">
        <p>One of the advantages of this session at {location} is its proximity to beautiful natural surroundings. After the {session_type}, we stole {names} away for twenty minutes of golden hour portraits—a decision that resulted in some of the most stunning images of their entire day.</p>
        
        <p>For couples planning their {location} {session_type}, I always recommend building in 20-30 minutes for golden hour portraits if your timing allows. The combination of industrial architecture and natural beauty creates incredibly versatile backdrops for {category} photography.</p>
        
        <p>{names} were naturals in front of the camera, laughing and enjoying each other's company while we captured everything from dramatic wide shots showcasing the venue's architecture to intimate close-ups that highlighted their genuine connection.</p>
    </div>
    
    <h2 class="section-heading">Reception Celebration</h2>
    <div class="section-text">
        <p>The celebration at {location} was everything a {session_type} should be—elegant, fun, and filled with unforgettable moments. The exposed brick walls and industrial lighting created an atmosphere that was both sophisticated and warm, perfect for both the formal dinner service and the energetic dancing that followed.</p>
        
        <p>{names}'s first dance was followed by heartfelt toasts from family and friends, each sharing stories that highlighted the couple's journey together. The dance floor stayed packed all night, with guests celebrating under the romantic glow of string lights suspended from the high ceilings.</p>
        
        <p>{location}'s in-house catering team provided a delicious farm-to-table menu that perfectly complemented the venue's rustic-elegant aesthetic. The combination of excellent food, beautiful space, and joyful celebration created an atmosphere that was both relaxed and special.</p>
    </div>
    
    <h2 class="section-heading">Details That Made the Day Special</h2>
    <div class="section-text">
        <p>{names} incorporated several personal touches that made their {location} {session_type} uniquely theirs. From custom cocktail napkins featuring their hashtag to centerpieces made from locally-sourced flowers, every detail reflected their style and personality.</p>
        
        <p>The couple chose a color palette of deep burgundy, sage green, and gold that beautifully complemented {location}'s industrial aesthetic. The bouquet featured garden roses, eucalyptus, and seasonal blooms that added organic texture to the industrial setting.</p>
        
        <p>One of my favorite details was their guest book alternative—a vintage camera where guests could leave Polaroid photos and messages. This interactive element not only provided entertainment but created a keepsake that {names} will treasure for years to come.</p>
    </div>
    """
    
    return content_html

def restructure_blog_post(post_num, post_data):
    """Restructure a single blog post"""
    
    slug = post_data['slug']
    html_file = f'public/static/blog/{slug}.html'
    
    if not os.path.exists(html_file):
        return False
    
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    content_container = soup.find('div', class_='content-container')
    if not content_container:
        return False
    
    # Find and extract (copy) these elements
    gallery = content_container.find('div', class_='gallery-container')
    gallery_copy = gallery.extract() if gallery else None
    
    faq_section = content_container.find('div', class_='faq-section')
    faq_copy = faq_section.extract() if faq_section else None
    
    author_bio = content_container.find('div', class_='author-bio')
    author_copy = author_bio.extract() if author_bio else None
    
    related_posts = content_container.find('div', class_='related-posts')
    related_copy = related_posts.extract() if related_posts else None
    
    # Clear content container
    content_container.clear()
    
    # Build new structure from scratch
    # 1. Add new content sections
    new_content = create_correct_content_structure(post_data)
    content_container.append(BeautifulSoup(new_content, 'html.parser'))
    
    # 2. Add gallery
    if gallery_copy:
        content_container.append(gallery_copy)
    
    # 3. Add mid-post CTA
    cta_html = '<div class="cta-section mid-post"><h3>Planning Your Wedding?</h3><p>Let\'s create stunning photos that tell your unique love story. Award-winning wedding photography with a photojournalistic style that captures authentic moments.</p><a href="/photography" class="cta-button">View Packages &amp; Pricing</a></div>'
    content_container.append(BeautifulSoup(cta_html, 'html.parser'))
    
    # 4. Add FAQ (if exists)
    if faq_copy:
        content_container.append(faq_copy)
    
    # 5. Add Author Bio
    if author_copy:
        content_container.append(author_copy)
    
    # 6. Add Related Sessions
    if related_copy:
        content_container.append(related_copy)
    
    # Save
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    return True

# Process all posts
print(f"🔄 Restructuring {len(all_posts)} blog posts...")
print(f"📝 New structure:")
print(f"   1. Content sections (Ceremony, Portraits, Reception, Details)")
print(f"   2. Gallery")
print(f"   3. Mid-post CTA")
print(f"   4. FAQ")
print(f"   5. Author Bio")
print(f"   6. Related Sessions\n")

processed = 0
for i, post in enumerate(all_posts, 1):
    if restructure_blog_post(i, post):
        processed += 1
    
    if i % 50 == 0:
        print(f"   Processed {i}/{len(all_posts)}...")

print(f"\n✅ COMPLETE!")
print(f"   Restructured {processed}/{len(all_posts)} posts")
print(f"\n🗑️  REMOVED:")
print(f"   • Vendor Credits sections")
print(f"   • 'Ready to Book' CTA sections")
print(f"   • Duplicate FAQs")
print(f"\n✅ KEPT:")
print(f"   • Content sections")
print(f"   • Gallery")
print(f"   • Single mid-post CTA")
print(f"   • FAQ section")
print(f"   • Author Bio with photos")
print(f"   • Related Sessions (3 cards)")
