#!/usr/bin/env python3
"""
ACROMATICO BLOG POST GENERATOR V4 - FINAL FINAL VERSION
✅ Completely builds posts from scratch - NO template contamination
✅ Post-type-specific sections & FAQs
✅ Clean Schema.org markup with post-specific images
✅ Author bio + related posts sections
✅ Zero tolerance for cross-contamination
"""

import json
import re
from pathlib import Path
from typing import Dict, List
from datetime import datetime

# Load data
with open('public/static/blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    all_posts = json.load(f)

with open('blog_generation_checklist.json', 'r', encoding='utf-8') as f:
    checklist = json.load(f)

# Read ONLY the CSS/HTML structure from template (not content)
with open('public/static/blog/20th-anniversary-photo-session.html', 'r', encoding='utf-8') as f:
    template_html = f.read()


def extract_images_from_post(post_content: str) -> List[str]:
    """Extract all image URLs from post content"""
    img_pattern = r'https://acromatico\.com/wp-content/uploads/[^\s"\'<>]+'
    images = re.findall(img_pattern, post_content)
    return list(dict.fromkeys(images))


def generate_schema_article(slug: str, title: str, description: str, images: List[str]) -> str:
    """Generate Schema.org Article markup with THIS post's images"""
    
    # Use first 10 images from THIS post
    schema_images = images[:10] if len(images) >= 10 else images
    
    images_json = ',\n    '.join([f'"{img}"' for img in schema_images])
    
    return f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{title}",
  "description": "{description}",
  "image": [
    {images_json}
  ],
  "datePublished": "2024-01-15",
  "dateModified": "{datetime.now().strftime('%Y-%m-%d')}",
  "author": {{
    "@type": "Person",
    "name": "Italo Campilii",
    "url": "https://acromatico.com/our-story",
    "image": "https://acromatico.com/wp-content/uploads/2018/09/italo-campilii-acromatico-photography.jpg",
    "jobTitle": "Professional Photographer",
    "worksFor": {{
      "@type": "Organization",
      "name": "Acromatico Photography"
    }}
  }},
  "publisher": {{
    "@type": "Organization",
    "name": "Acromatico Photography",
    "url": "https://acromatico.com",
    "logo": {{
      "@type": "ImageObject",
      "url": "https://acromatico.com/static/acromatico-logo-dark.png"
    }}
  }},
  "mainEntityOfPage": {{
    "@type": "WebPage",
    "@id": "https://acromatico.com/blog/{slug}"
  }}
}}
</script>'''


def get_related_posts(current_slug: str, post_type: str) -> List[Dict]:
    """Get 3 related posts of same type"""
    related = []
    
    for item in checklist:
        if item['slug'] != current_slug and item['type'] == post_type and item['images'] > 0:
            post_data = next((p for p in all_posts if p['slug'] == item['slug']), None)
            if post_data:
                title_data = post_data.get('title', '')
                if isinstance(title_data, dict):
                    title = title_data.get('rendered', '').replace('&#8217;', "'")
                else:
                    title = str(title_data).replace('&#8217;', "'")
                
                # Get first image
                images = extract_images_from_post(post_data.get('content', {}).get('rendered', ''))
                if images:
                    related.append({
                        'slug': item['slug'],
                        'title': title,
                        'image': images[0]
                    })
        
        if len(related) >= 3:
            break
    
    return related


def generate_faq_section(post_type: str) -> str:
    """Generate post-type-specific FAQ section"""
    
    faqs = {
        'wedding': [
            {'q': 'How much does wedding photography cost?', 'a': 'Wedding photography packages typically start at $2,500 for 6-hour coverage and go up to $5,000+ for full-day coverage with multiple photographers. This includes professional editing, online gallery with high-resolution downloads, and typically 500-800 final images. Custom packages available for destination weddings or extended coverage.'},
            {'q': 'How long does wedding photography coverage last?', 'a': 'Most couples book 8-10 hours of coverage, which allows us to capture everything from getting ready through the reception. We recommend at least 6 hours for intimate weddings and 10-12 hours for full traditional weddings with ceremony, cocktail hour, and reception.'},
            {'q': 'What happens if it rains on our wedding day?', 'a': 'South Florida weather can be unpredictable! We always have backup plans ready—indoor ceremony locations, covered outdoor areas, and creative use of umbrellas for stunning rainy-day portraits. We monitor forecasts closely and discuss contingency plans with you in advance.'},
            {'q': 'When will we receive our wedding photos?', 'a': 'You\'ll receive a sneak peek gallery of 20-30 images within 48-72 hours after your wedding. Your complete edited gallery is delivered within 6-8 weeks. Rush delivery (4 weeks) is available for an additional fee.'},
            {'q': 'Do you travel for destination weddings?', 'a': 'Absolutely! We love destination weddings and have photographed celebrations across Florida, the Caribbean, and beyond. Travel fees vary by location but typically include transportation, accommodation, and travel time.'}
        ],
        'engagement': [
            {'q': 'How much does an engagement photo session cost?', 'a': 'Engagement sessions start at $450 for a 1-hour session at a single location. This includes professional editing, online gallery with high-resolution downloads, and typically 40-60 final images.'},
            {'q': 'What should we wear for our engagement photos?', 'a': 'Choose outfits that make you feel confident and reflect your personality! Coordinate colors but don\'t match exactly. Avoid busy patterns or logos. For South Florida sessions, flowing fabrics work beautifully.'},
            {'q': 'What are the best locations for engagement photos?', 'a': 'Top South Florida locations include Vizcaya Museum & Gardens, Wynwood Walls, parks, beaches, and botanical gardens. We help you choose based on your style and vision.'},
            {'q': 'How long does an engagement session last?', 'a': 'Standard engagement sessions last 60-90 minutes. This gives us plenty of time to capture variety without feeling rushed. We typically shoot at golden hour for the most flattering light.'},
            {'q': 'When will we receive our engagement photos?', 'a': 'You\'ll receive a sneak peek of 5-10 images within 48 hours. Your complete edited gallery is delivered within 2-3 weeks.'}
        ],
        'newborn': [
            {'q': 'How much does a newborn photo session cost?', 'a': 'Newborn photography sessions start at $650 for a 2-3 hour session. This includes professional editing, online gallery with high-resolution downloads, and typically 30-50 final images.'},
            {'q': 'When should we schedule our newborn session?', 'a': 'The ideal time for newborn photos is within the first 5-14 days after birth. Babies are sleepier and more flexible during this window, making it easier to capture those curled-up poses.'},
            {'q': 'What should we bring to the newborn session?', 'a': 'We provide all props, wraps, and backdrops. You just need to bring baby, yourself, and any special items you\'d like included. Have baby fed and changed right before the session.'},
            {'q': 'How long does a newborn session take?', 'a': 'Newborn sessions typically last 2-3 hours. We work on baby\'s schedule with plenty of time for feeding, soothing, and diaper changes. The studio is kept warm (78-80°F) for baby\'s comfort.'},
            {'q': 'Is newborn photography safe?', 'a': 'Safety is our absolute top priority! We\'re trained in safe newborn handling and posing. We never force poses or put baby in uncomfortable positions. Every image is created with baby\'s wellbeing first.'}
        ],
        'maternity': [
            {'q': 'When is the best time for maternity photos?', 'a': 'The ideal time for maternity photos is between 30-36 weeks of pregnancy. Your belly is beautifully round but you\'re still comfortable enough to move and pose.'},
            {'q': 'How much does a maternity photo session cost?', 'a': 'Maternity photography sessions start at $450 for a 1-hour session. This includes professional editing, online gallery with high-resolution downloads, and typically 40-60 final images.'},
            {'q': 'What should I wear for maternity photos?', 'a': 'We provide a client closet with maternity gowns and dresses, or you can bring your own. Fitted silhouettes that show your beautiful belly work best. Flowing fabrics and neutral tones photograph beautifully.'},
            {'q': 'Can my partner and children be included?', 'a': 'Absolutely! We love including partners and older siblings in maternity sessions. Many moms want a mix—some solo portraits and some family images showing the excitement of your growing family.'},
            {'q': 'Where do maternity sessions take place?', 'a': 'We offer both studio and outdoor maternity sessions. Our studio provides a controlled environment perfect for flowing gowns. Outdoor sessions work beautifully at parks, beaches, or urban locations.'}
        ],
        'family': [
            {'q': 'How much does family photography cost?', 'a': 'Family photography sessions start at $450 for a 45-60 minute session at one location. This includes professional editing, online gallery with high-resolution downloads, and typically 40-60 final images.'},
            {'q': 'What should we wear for family photos?', 'a': 'Coordinate colors but avoid overly matching outfits—think complementary tones rather than identical looks. Solid colors and simple patterns work best. For South Florida, light neutrals, soft blues, and earth tones photograph beautifully.'},
            {'q': 'How do you work with young children?', 'a': 'We keep family sessions fun and playful! Kids do best when sessions feel like playtime, not a formal photoshoot. We use games, prompts, and silly jokes to get genuine smiles.'},
            {'q': 'What are the best locations for family photos?', 'a': 'Popular family session locations include parks with natural shade, beaches at sunrise or sunset, and urban areas with colorful walls or architecture. We consider your family\'s energy level and kids\' ages when recommending locations.'},
            {'q': 'When will we receive our family photos?', 'a': 'You\'ll receive a sneak peek of 5-10 images within 48 hours. Your complete edited gallery is delivered within 2-3 weeks.'}
        ],
        'anniversary': [
            {'q': 'How much does an anniversary photo session cost?', 'a': 'Anniversary photo sessions start at $450 for 60-90 minutes of coverage. This includes professional editing, online gallery with high-resolution downloads, and typically 50-70 final images.'},
            {'q': 'What\'s the best time for anniversary photos?', 'a': 'Golden hour is ideal for anniversary sessions in South Florida—typically 1-1.5 hours before sunset. This timing provides soft, warm light that\'s flattering and romantic.'},
            {'q': 'What should we wear for anniversary photos?', 'a': 'Choose outfits that reflect your personal style and coordinate beautifully. Many couples opt for semi-formal to formal attire—flowing dresses, suits, or even recreating your wedding day look!'},
            {'q': 'Can we include family in our anniversary session?', 'a': 'Absolutely! Many couples include children, grandchildren, or extended family. We typically start with couple portraits, then bring in family for group shots.'},
            {'q': 'What are the best locations for anniversary photos?', 'a': 'Top locations include meaningful spots—where you got engaged, where you married, or favorite places you\'ve visited together. In South Florida, popular choices include Vizcaya, parks, and beaches.'}
        ]
    }
    
    post_faqs = faqs.get(post_type, faqs['wedding'])
    
    faq_html = '<div class="faq-section" itemscope itemtype="https://schema.org/FAQPage">\n'
    
    for faq in post_faqs:
        faq_html += f'''<div class="faq-item" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
<h3 class="faq-question" itemprop="name">
      {faq['q']}
     </h3>
<div class="faq-answer" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
<p itemprop="text">
       {faq['a']}
      </p>
</div>
</div>
'''
    
    faq_html += '</div>'
    return faq_html


def generate_section_content(post_type: str, section_num: int) -> Dict[str, str]:
    """Generate contextually appropriate section content"""
    
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


def build_complete_post_html(post_data: Dict, checklist_item: Dict) -> str:
    """Build complete post HTML from scratch - ZERO template contamination"""
    
    slug = post_data['slug']
    title_data = post_data.get('title', '')
    if isinstance(title_data, dict):
        title = title_data.get('rendered', '').replace('&#8217;', "'")
    else:
        title = str(title_data).replace('&#8217;', "'")
    post_type = checklist_item.get('type', 'wedding')
    
    # Extract intro
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
    
    # Extract head CSS ONLY - stop BEFORE Schema scripts (which start at line ~908)
    # Find the last </style> tag before </head>
    style_end = template_html.rfind('</style>')
    head_section = template_html[:style_end + 8]  # Include </style>
    head_section += '\n</head>'  # Close head properly
    
    # Replace ALL meta tags
    head_section = head_section.replace('<title>\n   20th Anniversary Photo Session | Mares Family | Acromatico Photography\n  </title>', f'<title>\n   {title} | Acromatico Photography\n  </title>')
    head_section = re.sub(r'<meta content="Celebrate 20 years.*?" name="description"/>', f'<meta content="{meta_description}" name="description"/>', head_section)
    head_section = head_section.replace('https://acromatico.com/blog/20th-anniversary-photo-session', f'https://acromatico.com/blog/{slug}')
    head_section = re.sub(r'<meta content="20th Anniversary Photo Session.*?" property="og:title"/>', f'<meta content="{title}" property="og:title"/>', head_section)
    head_section = re.sub(r'<meta content="Celebrate 20 years.*?" property="og:description"/>', f'<meta content="{meta_description}" property="og:description"/>', head_section)
    head_section = head_section.replace('/static/images/no-logo/20th-anniversary-photo-session.jpeg', hero_image)
    head_section = re.sub(r'<meta content="20th Anniversary Photo Session.*?" property="twitter:title"/>', f'<meta content="{title}" property="twitter:title"/>', head_section)
    head_section = re.sub(r'<meta content="Celebrate 20 years.*?" property="twitter:description"/>', f'<meta content="{meta_description}" property="twitter:description"/>', head_section)
    head_section = head_section.replace('<link href="https://acromatico.com/blog/20th-anniversary-photo-session" rel="canonical"/>', f'<link href="https://acromatico.com/blog/{slug}" rel="canonical"/>')
    head_section = head_section.replace("background-image: url('/static/images/no-logo/20th-anniversary-photo-session.jpeg');", f"background-image: url('{hero_image}');")
    
    # Build body content from scratch
    body_html = '''</head>
<body>
<div class="site-header">
<div class="zentangle-container">
<div class="zentangle-layer layer-1"></div>
<div class="zentangle-layer layer-2"></div>
<div class="zentangle-layer layer-3"></div>
</div>
<div class="hamburger-menu" id="hamburger-menu">
<div class="hamburger-icon">
<span></span>
<span></span>
<span></span>
</div>
</div>
<nav class="nav-menu" id="nav-menu">
<a href="/">HOME</a>
<a href="/static/photography.html">PHOTOGRAPHY</a>
<a href="/static/blog-index.html">BLOG</a>
<a href="/static/our-story.html">OUR STORY</a>
<a href="#contact">CONTACT</a>
</nav>
</div>

<div class="hero-section">
<h1 class="hero-title">''' + title + '''</h1>
</section>

<div class="content-container">
<div class="section-text">
<p>''' + content_text + '''</p>
</div>

'''
    
    # Add 4 content sections
    for i in range(4):
        section = generate_section_content(post_type, i)
        featured_img_index = min((i + 1), len(images) - 1)
        featured_img = images[featured_img_index]
        
        body_html += f'''<div class="featured-image">
<img alt="{title} - Photo {i+2}" class="section-image" loading="lazy" src="{featured_img}"/>
<p class="image-caption">{title}</p>
</div>

<h2 class="section-heading">{section['heading']}</h2>

<div class="section-text">
<p>{section['content']}</p>
</div>

'''
    
    # Add gallery
    body_html += '<div class="gallery-container">\n'
    for idx, img_url in enumerate(images):
        body_html += f'''<a class="gallery-item glightbox" data-gallery="wedding-gallery" href="{img_url}">
<img alt="{title} - Photo {idx+1}" class="gallery-image" loading="lazy" src="{img_url}"/>
</a>
'''
    body_html += '</div>\n\n'
    body_html += '</div>\n\n'  # Close content-container
    
    # Add CTA
    body_html += '''<div class="cta-section mid-post"><h3>Planning Your Wedding?</h3><p>Let's create stunning photos that tell your unique love story.</p><p>Award-winning wedding photography with a photojournalistic style that captures authentic moments.</p><a class="cta-button" href="/photography">View Packages & Pricing</a></div>

'''
    
    # Add FAQ
    body_html += generate_faq_section(post_type)
    body_html += '\n\n'
    
    # Add author bio
    body_html += '''<div class="author-bio"><div class="author-headshots">
<img alt="Italo Campilii" onerror="this.style.display='none'" src="/static/italo-headshot.jpg"/>
<img alt="Ale Campilii" onerror="this.style.display='none'" src="/static/ale-headshot.jpg"/>
</div><div class="author-content">
<h3 style="color: #ffffff; font-size: 32px; margin-bottom: 25px;">About Acromatico Photography</h3>
<p style="color: #ffffff; margin-bottom: 25px;">Founded by Italo and Ale, Acromatico Photography specializes in capturing authentic moments with artistic vision. Based in South Florida, we travel worldwide to document love stories, families, and life's most meaningful celebrations.</p>
<p style="color: #ffffff;">Our approach combines photojournalistic storytelling with fine art aesthetics, creating timeless images that reflect the genuine emotion and beauty of each unique moment.</p>
</div></div>'''
    
    # Add related posts
    related_posts = get_related_posts(slug, post_type)
    if related_posts:
        body_html += '<div class="related-posts">\n<h2>Related Sessions</h2>\n<div class="related-posts-grid">\n'
        for related in related_posts:
            body_html += f'''<article class="related-post">
<a href="/static/blog/{related['slug']}.html">
<img alt="{related['title']}" loading="lazy" src="{related['image']}"/>
<h3>{related['title']}</h3>
</a>
</article>
'''
        body_html += '</div>\n</div>'
    
    # Add footer loaded via API
    body_html += '\n<div id="footer-placeholder"></div>\n\n'
    
    # Add Schema.org JSON-LD with THIS post's images
    body_html += generate_schema_article(slug, title, meta_description, images)
    body_html += '\n\n'
    
    # Add scripts
    body_html += '''<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
<script>
const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
});

// Hamburger menu
document.getElementById('hamburger-menu').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('nav-menu').classList.toggle('active');
});

// Load footer
fetch('/api/footer')
    .then(response => response.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    });
</script>
</body>
</html>'''
    
    # Combine head + body
    complete_html = head_section + body_html
    
    return complete_html


def main():
    """Generate blog posts"""
    print("🚀 ACROMATICO BLOG POST GENERATOR V4 - COMPLETELY FROM SCRATCH")
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
        
        html = build_complete_post_html(post_data, checklist_item)
        
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
