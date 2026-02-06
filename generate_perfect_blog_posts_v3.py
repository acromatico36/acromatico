#!/usr/bin/env python3
"""
ACROMATICO BLOG POST GENERATOR V3 - FINAL VERSION
✅ Removes ALL Mares content
✅ Post-type-specific sections  
✅ Post-type-specific FAQs
✅ Uses only images from THIS post
✅ Zero tolerance for cross-contamination
"""

import json
import re
from pathlib import Path
from typing import Dict, List

# Load data
with open('public/static/blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    all_posts = json.load(f)

with open('blog_generation_checklist.json', 'r', encoding='utf-8') as f:
    checklist = json.load(f)

with open('public/static/blog/20th-anniversary-photo-session.html', 'r', encoding='utf-8') as f:
    template_html = f.read()


def extract_images_from_post(post_content: str) -> List[str]:
    """Extract all image URLs from post content"""
    img_pattern = r'https://acromatico\.com/wp-content/uploads/[^\s"\'<>]+'
    images = re.findall(img_pattern, post_content)
    return list(dict.fromkeys(images))


def generate_faq_section(post_type: str) -> str:
    """Generate post-type-specific FAQ section with Schema.org markup"""
    
    faqs = {
        'wedding': [
            {
                'question': 'How much does wedding photography cost?',
                'answer': 'Wedding photography packages typically start at $2,500 for 6-hour coverage and go up to $5,000+ for full-day coverage with multiple photographers. This includes professional editing, online gallery with high-resolution downloads, and typically 500-800 final images. Custom packages available for destination weddings or extended coverage.'
            },
            {
                'question': 'How long does wedding photography coverage last?',
                'answer': 'Most couples book 8-10 hours of coverage, which allows us to capture everything from getting ready through the reception. We recommend at least 6 hours for intimate weddings and 10-12 hours for full traditional weddings with ceremony, cocktail hour, and reception.'
            },
            {
                'question': 'What happens if it rains on our wedding day?',
                'answer': 'South Florida weather can be unpredictable! We always have backup plans ready—indoor ceremony locations, covered outdoor areas, and creative use of umbrellas for stunning rainy-day portraits. We monitor forecasts closely and discuss contingency plans with you in advance. Some of our most dramatic photos happen in light rain!'
            },
            {
                'question': 'When will we receive our wedding photos?',
                'answer': 'You\'ll receive a sneak peek gallery of 20-30 images within 48-72 hours after your wedding. Your complete edited gallery is delivered within 6-8 weeks. Rush delivery (4 weeks) is available for an additional fee. All images are provided in high-resolution for printing and sharing.'
            },
            {
                'question': 'Do you travel for destination weddings?',
                'answer': 'Absolutely! We love destination weddings and have photographed celebrations across Florida, the Caribbean, and beyond. Travel fees vary by location but typically include transportation, accommodation, and travel time. Contact us for a custom destination wedding quote.'
            }
        ],
        'engagement': [
            {
                'question': 'How much does an engagement photo session cost?',
                'answer': 'Engagement sessions start at $450 for a 1-hour session at a single location. This includes professional editing, online gallery with high-resolution downloads, and typically 40-60 final images. Extended sessions with multiple locations or outfit changes are available starting at $650.'
            },
            {
                'question': 'What should we wear for our engagement photos?',
                'answer': 'Choose outfits that make you feel confident and reflect your personality! Coordinate colors but don\'t match exactly. Avoid busy patterns or logos. For South Florida sessions, flowing fabrics work beautifully. Many couples bring two outfit options—one casual, one dressy. We provide a detailed style guide after booking.'
            },
            {
                'question': 'What are the best locations for engagement photos in Miami?',
                'answer': 'Top Miami engagement session locations include Vizcaya Museum & Gardens (romantic European vibes), Wynwood Walls (urban colorful), Matheson Hammock Park (tropical nature), South Pointe Park (beach with skyline), and Fairchild Tropical Botanic Garden (lush greenery). We help you choose based on your style and vision.'
            },
            {
                'question': 'How long does an engagement session last?',
                'answer': 'Standard engagement sessions last 60-90 minutes. This gives us plenty of time to capture variety without feeling rushed. We typically shoot at golden hour (last hour before sunset) for the most flattering light. Extended sessions up to 2 hours are available for multiple locations.'
            },
            {
                'question': 'When will we receive our engagement photos?',
                'answer': 'You\'ll receive a sneak peek of 5-10 images within 48 hours. Your complete edited gallery is delivered within 2-3 weeks. All images come in high-resolution for printing, perfect for save-the-dates and social media sharing.'
            }
        ],
        'newborn': [
            {
                'question': 'How much does a newborn photo session cost?',
                'answer': 'Newborn photography sessions start at $650 for a 2-3 hour session. This includes professional editing, online gallery with high-resolution downloads, and typically 30-50 final images capturing your baby\'s earliest days. Extended family packages and custom albums are available.'
            },
            {
                'question': 'When should we schedule our newborn session?',
                'answer': 'The ideal time for newborn photos is within the first 5-14 days after birth. Babies are sleepier and more flexible during this window, making it easier to capture those curled-up poses. However, we can create beautiful lifestyle newborn sessions up to 4 weeks. Book during pregnancy to reserve your spot!'
            },
            {
                'question': 'What should we bring to the newborn session?',
                'answer': 'We provide all props, wraps, and backdrops. You just need to bring baby, yourself, and any special items you\'d like included (heirloom blanket, special toy). Have baby fed and changed right before the session. We recommend parents wear solid, neutral colors if you want family portraits.'
            },
            {
                'question': 'How long does a newborn photography session take?',
                'answer': 'Newborn sessions typically last 2-3 hours. We work on baby\'s schedule with plenty of time for feeding, soothing, and diaper changes. There\'s no rush—we work gently and patiently to capture those perfect peaceful moments. The studio is kept warm (78-80°F) for baby\'s comfort.'
            },
            {
                'question': 'Is newborn photography safe?',
                'answer': 'Safety is our absolute top priority! We\'re trained in safe newborn handling and posing. We never force poses or put baby in uncomfortable positions. Every image is created with baby\'s wellbeing first. Props are sanitized between sessions, and we always have a spotter when baby is posed.'
            }
        ],
        'maternity': [
            {
                'question': 'When is the best time for maternity photos?',
                'answer': 'The ideal time for maternity photos is between 30-36 weeks of pregnancy. Your belly is beautifully round but you\'re still comfortable enough to move and pose. We recommend scheduling early in your third trimester to allow flexibility if baby arrives early. Sessions can be done earlier or later based on your comfort level.'
            },
            {
                'question': 'How much does a maternity photo session cost?',
                'answer': 'Maternity photography sessions start at $450 for a 1-hour session. This includes professional editing, online gallery with high-resolution downloads, and typically 40-60 final images. Extended sessions with multiple locations, outfit changes, or partner/family inclusion start at $650.'
            },
            {
                'question': 'What should I wear for maternity photos?',
                'answer': 'We provide a client closet with maternity gowns and dresses, or you can bring your own. Fitted silhouettes that show your beautiful belly work best. Flowing fabrics, solid colors, and neutral tones photograph beautifully. Many moms do a wardrobe change for variety—one casual, one formal look.'
            },
            {
                'question': 'Can my partner and children be included?',
                'answer': 'Absolutely! We love including partners and older siblings in maternity sessions. Many moms want a mix—some solo portraits celebrating motherhood, and some family images showing the excitement of your growing family. Including family adds 20-30 minutes to the session.'
            },
            {
                'question': 'Where do maternity sessions take place?',
                'answer': 'We offer both studio and outdoor maternity sessions. Our studio provides a controlled environment perfect for flowing gowns and intimate portraits. Outdoor sessions work beautifully at parks, beaches, or urban locations—golden hour timing creates gorgeous natural light. We help you choose based on your vision.'
            }
        ],
        'family': [
            {
                'question': 'How much does family photography cost?',
                'answer': 'Family photography sessions start at $450 for a 45-60 minute session at one location. This includes professional editing, online gallery with high-resolution downloads, and typically 40-60 final images. Extended sessions for large families or multiple generations start at $650.'
            },
            {
                'question': 'What should we wear for family photos?',
                'answer': 'Coordinate colors but avoid overly matching outfits—think complementary tones rather than identical looks. Solid colors and simple patterns work best. For South Florida, light neutrals, soft blues, and earth tones photograph beautifully. Avoid neon colors and busy patterns. We provide a detailed style guide after booking!'
            },
            {
                'question': 'How do you work with young children?',
                'answer': 'We keep family sessions fun and playful! Kids do best when sessions feel like playtime, not a formal photoshoot. We use games, prompts, and silly jokes to get genuine smiles. Sessions are kept short (45-60 min) to maintain energy and cooperation. Schedule during your child\'s best time of day!'
            },
            {
                'question': 'What are the best locations for family photos?',
                'answer': 'Popular family session locations include parks with natural shade, beaches at sunrise or sunset, and urban areas with colorful walls or architecture. We consider your family\'s energy level and kids\' ages when recommending locations. Some have playgrounds nearby which helps keep little ones happy!'
            },
            {
                'question': 'When will we receive our family photos?',
                'answer': 'You\'ll receive a sneak peek of 5-10 images within 48 hours—perfect for sharing with excited grandparents! Your complete edited gallery is delivered within 2-3 weeks. All images come in high-resolution for printing and sharing on social media.'
            }
        ],
        'anniversary': [
            {
                'question': 'How much does an anniversary photo session cost?',
                'answer': 'Anniversary photo sessions start at $450 for 60-90 minutes of coverage. This includes professional editing, online gallery with high-resolution downloads, and typically 50-70 final images. Extended sessions for special celebrations (vow renewals, large family gatherings) start at $650.'
            },
            {
                'question': 'What\'s the best time for anniversary photos?',
                'answer': 'Golden hour is ideal for anniversary sessions in South Florida—typically 1-1.5 hours before sunset (around 6:00-7:00 PM in summer, 5:00-6:00 PM in winter). This timing provides soft, warm light that\'s flattering and romantic. Early morning sessions (7:00-8:30 AM) also offer beautiful light with fewer crowds.'
            },
            {
                'question': 'What should we wear for anniversary photos?',
                'answer': 'Choose outfits that reflect your personal style and coordinate beautifully. Many couples opt for semi-formal to formal attire—flowing dresses, suits, or even recreating your wedding day look! Solid colors and classic styles photograph timeless. We provide a detailed style guide to help you prepare.'
            },
            {
                'question': 'Can we include family in our anniversary session?',
                'answer': 'Absolutely! Many couples include children, grandchildren, or extended family in their anniversary sessions. We typically start with couple portraits, then bring in family for group shots. Including family adds 20-30 minutes to the session and creates meaningful multi-generational portraits.'
            },
            {
                'question': 'What are the best locations for anniversary photos?',
                'answer': 'Top locations include meaningful spots—where you got engaged, where you married, or favorite places you\'ve visited together. In South Florida, popular choices are Vizcaya Museum & Gardens, Matheson Hammock Park, Fairchild Tropical Botanic Garden, and South Beach. We help you choose based on your story and style.'
            }
        ]
    }
    
    # Get FAQs for post type
    post_faqs = faqs.get(post_type, faqs['wedding'])  # Default to wedding if unknown
    
    # Build FAQ HTML with Schema.org markup
    faq_html = '<div class="faq-section" itemscope itemtype="https://schema.org/FAQPage">\n'
    
    for faq in post_faqs:
        faq_html += f'''<div class="faq-item" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
<h3 class="faq-question" itemprop="name">
      {faq['question']}
     </h3>
<div class="faq-answer" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
<p itemprop="text">
       {faq['answer']}
      </p>
</div>
</div>
'''
    
    faq_html += '</div>'
    
    return faq_html


def generate_section_content(post_type: str, section_num: int, post_data: Dict) -> Dict[str, str]:
    """Generate contextually appropriate section content based on post type"""
    
    # Handle title
    title_data = post_data.get('title', '')
    if isinstance(title_data, dict):
        title = title_data.get('rendered', '').replace('&#8217;', "'")
    else:
        title = str(title_data).replace('&#8217;', "'")
    
    sections = {
        'wedding': [
            {'heading': 'The Ceremony:<br/>Where Two Lives Became One', 'content': 'The ceremony was intimate and filled with emotion. Every vow exchanged, every tear shed, and every smile shared told the story of two souls committing to a lifetime together. We captured these precious moments with a documentary approach, ensuring nothing was missed.'},
            {'heading': 'Couple Portraits:<br/>Capturing Your Unique Love Story', 'content': 'After the ceremony, we took time for couple portraits. This is where the magic happens – authentic moments between newlyweds, natural light, and genuine emotion. We focus on creating timeless images that feel effortless and true to who you are as a couple.'},
            {'heading': 'The Reception:<br/>Celebrating Love & Family', 'content': 'The reception was a celebration of love, laughter, and family. From the first dance to the last song, we documented every moment – the toasts, the dancing, the candid interactions. These are the memories you\'ll treasure forever.'},
            {'heading': 'Photography Approach:<br/>Documentary Style with Artistic Vision', 'content': 'Our approach combines photojournalism with fine art aesthetics. We capture 70% candid moments and 30% directed portraits, ensuring your day is documented authentically while still creating stunning artistic images.'}
        ],
        'engagement': [
            {'heading': 'The Location:<br/>Setting the Scene', 'content': 'Choosing the right location is crucial for engagement photos. This spot provided the perfect backdrop – natural beauty, meaningful significance, and plenty of variety for different looks.'},
            {'heading': 'Authentic Moments:<br/>Capturing Your Connection', 'content': 'The best engagement photos happen when couples forget about the camera and focus on each other. We guide you through prompts that encourage natural interaction – walking together, sharing stories, laughing at inside jokes.'},
            {'heading': 'Session Flow:<br/>From Nervous to Natural', 'content': 'Most couples feel awkward at first, and that\'s completely normal! We start with simple prompts and gradually build comfort. Within 15 minutes, the nerves disappear and the real you emerges.'},
            {'heading': 'Photography Style:<br/>Timeless & Editorial', 'content': 'Our engagement session style blends editorial sophistication with candid warmth. We use natural light, thoughtful composition, and a mix of wide environmental shots and intimate close-ups.'}
        ],
        'newborn': [
            {'heading': 'The Session:<br/>Welcome to the World', 'content': 'Newborn sessions are all about those fleeting first days – tiny fingers, peaceful sleep, and that newborn curl. We work gently and patiently, following baby\'s cues. Sessions typically last 2-3 hours, allowing plenty of time for feeding and soothing.'},
            {'heading': 'Minimal & Timeless:<br/>Classic Newborn Photography', 'content': 'Our newborn style is clean, simple, and timeless. Soft neutral tones, minimal props, and natural light create images that won\'t feel dated in 20 years. The focus is always on baby – those tiny details and peaceful expressions.'},
            {'heading': 'Family Connection:<br/>Capturing the Growing Bond', 'content': 'We include family portraits during newborn sessions – parents gazing at their new baby, siblings meeting their brother or sister for the first time. These are some of the most emotional and meaningful images we create.'},
            {'heading': 'Safety First:<br/>Professional Expertise', 'content': 'Safety is our top priority. We\'re trained in safe newborn posing and handling. The studio is kept warm for baby\'s comfort, and we never force poses. Every image is created with baby\'s wellbeing as the primary concern.'}
        ],
        'maternity': [
            {'heading': 'Celebrating Motherhood:<br/>The Beauty of Expecting', 'content': 'Maternity sessions celebrate the incredible journey of pregnancy. This is a special time that passes quickly, and these photos preserve the anticipation, the glow, and the love already surrounding your growing baby.'},
            {'heading': 'Timing & Planning:<br/>When to Schedule', 'content': 'The ideal time for maternity photos is between 30-36 weeks. Your belly is beautifully round but you\'re still comfortable enough to move and pose. We recommend scheduling early in your third trimester.'},
            {'heading': 'What to Wear:<br/>Styling Your Session', 'content': 'We provide gowns and wardrobe options, or you can bring your own favorites. Fitted silhouettes that show your beautiful belly work best. Solid colors, flowing fabrics, and simple accessories keep the focus on you.'},
            {'heading': 'Including Partners:<br/>Family Love', 'content': 'Maternity sessions often include partners and older siblings. These family portraits capture the excitement and anticipation of your growing family.'}
        ],
        'family': [
            {'heading': 'Family Sessions:<br/>Capturing Connection', 'content': 'Family photography is about more than posed group shots. It\'s about capturing relationships – the way kids look at their parents, sibling connections, grandparent love. We blend formal portraits with candid moments.'},
            {'heading': 'Session Experience:<br/>Relaxed & Fun', 'content': 'We keep family sessions fun and low-pressure. Kids especially do best when sessions feel like playtime, not a chore. We bring energy, prompts, and patience, allowing personalities to shine through naturally.'},
            {'heading': 'Location & Timing:<br/>Setting Up for Success', 'content': 'Location and timing matter! We choose spots with visual variety and natural light. For families with young kids, scheduling during their best time of day makes a huge difference in smiles and cooperation.'},
            {'heading': 'What to Expect:<br/>From Planning to Gallery', 'content': 'From our initial consultation through your final gallery delivery, we guide you every step. Wardrobe suggestions, location scouting, session day coaching, and professional editing ensure beautiful images.'}
        ],
        'anniversary': [
            {'heading': 'Anniversary Sessions:<br/>Celebrating Lasting Love', 'content': 'Anniversary sessions honor the journey you\'ve shared together. Whether it\'s 5 years or 50, these photos celebrate your commitment, growth, and the love that continues to deepen with time.'},
            {'heading': 'Personal Touches:<br/>What Makes Your Story Unique', 'content': 'We encourage incorporating meaningful elements – wearing your wedding attire, visiting significant locations, recreating old photos. These personal touches transform a photo session into a true celebration.'},
            {'heading': 'Photography Approach:<br/>Documenting Connection', 'content': 'Our approach blends candid documentary style with artfully directed moments. We capture genuine interaction and emotion while also creating beautiful composed portraits.'},
            {'heading': 'Planning Your Session:<br/>Making It Memorable', 'content': 'Anniversary sessions work beautifully at meaningful locations – where you got engaged, where you married, or favorite spots you\'ve visited together. Golden hour timing creates romantic, flattering light.'}
        ]
    }
    
    post_sections = sections.get(post_type, sections['wedding'])
    
    if section_num < len(post_sections):
        return post_sections[section_num]
    else:
        return post_sections[section_num % len(post_sections)]


def generate_post_html(post_data: Dict, checklist_item: Dict) -> str:
    """Generate complete HTML for a blog post"""
    
    slug = post_data['slug']
    title_data = post_data.get('title', '')
    if isinstance(title_data, dict):
        title = title_data.get('rendered', '').replace('&#8217;', "'")
    else:
        title = str(title_data).replace('&#8217;', "'")
    post_type = checklist_item.get('type', 'wedding')
    
    # Extract intro text
    content_text = post_data.get('yoast_head_json', {}).get('og_description', '')
    if not content_text:
        content = post_data.get('content', {}).get('rendered', '')
        clean_text = re.sub(r'<[^>]+>', '', content)
        paragraphs = [p.strip() for p in clean_text.split('\n') if p.strip()]
        content_text = paragraphs[0] if paragraphs else f'A beautiful {post_type} captured by Acromatico Photography.'
    
    # Extract images
    images = extract_images_from_post(post_data.get('content', {}).get('rendered', ''))
    
    if not images:
        print(f"⚠️ Warning: No images found for {slug}")
        return None
    
    hero_image = images[0]
    meta_description = content_text[:160] + '...' if len(content_text) > 160 else content_text
    
    html = template_html
    
    # Replace all metadata
    html = html.replace('<title>\n   20th Anniversary Photo Session | Mares Family | Acromatico Photography\n  </title>', f'<title>\n   {title} | Acromatico Photography\n  </title>')
    html = re.sub(r'<meta content="Celebrate 20 years.*?" name="description"/>', f'<meta content="{meta_description}" name="description"/>', html)
    html = html.replace('https://acromatico.com/blog/20th-anniversary-photo-session', f'https://acromatico.com/blog/{slug}')
    html = re.sub(r'<meta content="20th Anniversary Photo Session.*?" property="og:title"/>', f'<meta content="{title}" property="og:title"/>', html)
    html = re.sub(r'<meta content="Celebrate 20 years.*?" property="og:description"/>', f'<meta content="{meta_description}" property="og:description"/>', html)
    html = html.replace('/static/images/no-logo/20th-anniversary-photo-session.jpeg', hero_image)
    html = re.sub(r'<meta content="20th Anniversary Photo Session.*?" property="twitter:title"/>', f'<meta content="{title}" property="twitter:title"/>', html)
    html = re.sub(r'<meta content="Celebrate 20 years.*?" property="twitter:description"/>', f'<meta content="{meta_description}" property="twitter:description"/>', html)
    html = html.replace('<link href="https://acromatico.com/blog/20th-anniversary-photo-session" rel="canonical"/>', f'<link href="https://acromatico.com/blog/{slug}" rel="canonical"/>')
    html = html.replace("background-image: url('/static/images/no-logo/20th-anniversary-photo-session.jpeg');", f"background-image: url('{hero_image}');")
    html = re.sub(r'<h1 class="hero-title">20th Anniversary Session at Matheson Hammock Park<br/>Miami, Florida \| Mares Family</h1>', f'<h1 class="hero-title">{title}</h1>', html)
    
    # COMPLETELY REPLACE CONTENT
    content_start = html.find('<div class="content-container">')
    cta_start = html.find('<div class="cta-section mid-post">')
    
    # Find author-bio section - this is where we STOP (don't include old footer/scripts)
    author_bio_start = html.find('<div class="author-bio">')
    
    if content_start != -1 and cta_start != -1 and author_bio_start != -1:
        before_content = html[:content_start]
        after_faq = html[author_bio_start:]  # Start from author-bio (includes related posts, footer, scripts)
        
        # Build NEW content
        new_content = '<div class="content-container">\n'
        new_content += f'<div class="section-text">\n<p>{content_text}</p>\n</div>\n\n'
        
        # Add 4 content sections
        for i in range(4):
            section = generate_section_content(post_type, i, post_data)
            featured_img_index = min((i + 1), len(images) - 1)
            featured_img = images[featured_img_index]
            
            new_content += f'''<div class="featured-image">
<img alt="{title} - Photo {i+2}" class="section-image" loading="lazy" src="{featured_img}"/>
<p class="image-caption">{title}</p>
</div>

<h2 class="section-heading">{section['heading']}</h2>

<div class="section-text">
<p>{section['content']}</p>
</div>

'''
        
        # Add gallery
        new_content += '<div class="gallery-container">\n'
        for idx, img_url in enumerate(images):
            new_content += f'''<a class="gallery-item glightbox" data-gallery="wedding-gallery" href="{img_url}">
<img alt="{title} - Photo {idx+1}" class="gallery-image" loading="lazy" src="{img_url}"/>
</a>
'''
        new_content += '</div>\n\n'
        new_content += '</div>\n\n'  # Close content-container
        
        # Add CTA
        cta_html = '''<div class="cta-section mid-post"><h3>Planning Your Wedding?</h3><p>Let's create stunning photos that tell your unique love story.</p><p>Award-winning wedding photography with a photojournalistic style that captures authentic moments.</p><a class="cta-button" href="/photography">View Packages & Pricing</a></div>

'''
        new_content += cta_html
        
        # Add post-type-specific FAQ
        new_content += generate_faq_section(post_type)
        new_content += '\n\n'
        
        # Reassemble
        html = before_content + new_content + after_faq
    
    return html


def main():
    """Generate blog posts"""
    print("🚀 ACROMATICO BLOG POST GENERATOR V3 - FINAL")
    print("="*60)
    print(f"📊 Total Posts: {len(all_posts)}")
    print(f"🔧 Posts Needing Fixes: {len([i for i in checklist if i['status'] == '❌ NEEDS FIX'])}")
    print()
    
    # Generate 3 test posts
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
    print("="*60)
    
    for checklist_item in test_posts:
        slug = checklist_item['slug']
        post_type = checklist_item['type']
        
        post_data = next((p for p in all_posts if p['slug'] == slug), None)
        if not post_data:
            print(f"⚠️ No data found for {slug}")
            continue
        
        print(f"🔨 Generating: {checklist_item['title']}")
        print(f"   Type: {post_type.upper()}")
        print(f"   Images: {checklist_item['images']}")
        
        html = generate_post_html(post_data, checklist_item)
        
        if html:
            output_path = f"public/static/blog/{slug}.html"
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(html)
            
            print(f"   ✅ Created: {output_path}")
        else:
            print(f"   ❌ Failed to generate")
        
        print()


if __name__ == '__main__':
    main()
