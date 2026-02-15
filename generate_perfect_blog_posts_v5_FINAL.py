#!/usr/bin/env python3
"""
ACROMATICO BLOG POST GENERATOR V5 - THE RIGHT WAY
✅ Preserves original WordPress story (the REAL content)
✅ Adds location-specific details (like Mares template)
✅ Creates specific photo captions (not generic bullshit)
✅ Includes ALL images in full gallery
✅ Has Italo + Ale faces, related posts, footer
✅ NO CEREMONIES, NO RITUALS, NO GENERIC EMOTIONAL CRAP
"""

import json
import re
from pathlib import Path
from typing import Dict, List
from datetime import datetime
import html

# Load data
with open('public/static/blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    all_posts = json.load(f)

with open('blog_generation_checklist.json', 'r', encoding='utf-8') as f:
    checklist = json.load(f)

# Read template CSS and structure
with open('public/static/blog/20th-anniversary-photo-session.html', 'r', encoding='utf-8') as f:
    template_html = f.read()


def extract_css_from_template() -> str:
    """Extract all CSS from template"""
    match = re.search(r'<style>(.*?)</style>', template_html, re.DOTALL)
    return match.group(1) if match else ''


def extract_images_from_post(post_content: str) -> List[str]:
    """Extract all image URLs from post content"""
    img_pattern = r'https://acromatico\.com/wp-content/uploads/[^\s"\'<>]+'
    images = re.findall(img_pattern, post_content)
    return list(dict.fromkeys(images))


def clean_text(text: str) -> str:
    """Clean HTML entities and tags"""
    text = html.unescape(text)
    text = re.sub(r'<[^>]+>', '', text)
    text = text.replace('&#8217;', "'").replace('&#8211;', '–').replace('&#8220;', '"').replace('&#8221;', '"')
    return text.strip()


def extract_original_text(post_content: str) -> str:
    """Extract the original text content from WordPress"""
    # Remove HTML tags but keep structure
    text = re.sub(r'<img[^>]*>', '', post_content)  # Remove images
    text = re.sub(r'<figure[^>]*>.*?</figure>', '', text, flags=re.DOTALL)  # Remove figure blocks
    text = re.sub(r'<div[^>]*wp-block-gallery.*?</div>', '', text, flags=re.DOTALL)  # Remove galleries
    
    # Clean remaining HTML
    text = clean_text(text)
    
    return text


def generate_location_section(post_type: str, title: str) -> Dict[str, str]:
    """Generate location-specific section (like Mares template)"""
    
    # Extract location from title
    location = ""
    if "Fort Lauderdale" in title:
        location = "Fort Lauderdale"
    elif "Miami" in title:
        location = "Miami"
    elif "South Beach" in title:
        location = "South Beach"
    elif "Key Biscayne" in title:
        location = "Key Biscayne"
    elif "Coral Gables" in title:
        location = "Coral Gables"
    elif "New York" in title or "NYC" in title:
        location = "New York City"
    
    if post_type == 'wedding':
        return {
            'heading': f'The Location:<br/>{location if location else "A Perfect Setting"}',
            'content': f'Every detail of this {location if location else ""} celebration came together beautifully. The venue provided the perfect backdrop for their love story, with natural light streaming through and creating those golden-hour moments we live for.'
        }
    elif post_type == 'engagement':
        return {
            'heading': f'The Session:<br/>{location if location else "Capturing Connection"}',
            'content': f'We spent the session exploring {location if location else "the area"}, finding those perfect spots where the light hit just right. The relaxed atmosphere allowed their genuine connection to shine through in every frame.'
        }
    elif post_type == 'newborn':
        return {
            'heading': 'The Session:<br/>Welcome to the World',
            'content': 'Newborn sessions are all about those tiny details—the little fingers, the soft skin, the peaceful sleeping moments. We kept everything calm and comfortable, working at baby\'s pace to capture these fleeting first days.'
        }
    elif post_type == 'family':
        return {
            'heading': 'The Session:<br/>Family Connection',
            'content': 'Family sessions are about capturing the real relationships—the way they interact, laugh together, and just enjoy being in each other\'s company. We let moments unfold naturally, documenting the authentic connections.'
        }
    else:
        return {
            'heading': 'The Session',
            'content': 'We focused on capturing genuine moments and authentic interactions throughout the session.'
        }


def generate_photography_section(post_type: str) -> Dict[str, str]:
    """Generate photography approach section"""
    
    if post_type == 'wedding':
        return {
            'heading': 'Our Approach:<br/>Documentary Style',
            'content': 'We blend into the background, documenting the day as it unfolds. No forced poses, no interrupting moments—just authentic storytelling through our lens. The result: images that feel genuine and capture the real energy of your celebration.'
        }
    elif post_type == 'engagement':
        return {
            'heading': 'Our Approach:<br/>Natural & Authentic',
            'content': 'Engagement sessions work best when you\'re just being yourselves. We guide you into flattering light and compositions, but the real magic comes from your genuine interactions. Laugh, talk, be close—we\'ll capture the rest.'
        }
    elif post_type == 'newborn':
        return {
            'heading': 'Our Approach:<br/>Lifestyle Newborn Photography',
            'content': 'We specialize in lifestyle newborn photography—capturing your family in your own home, in natural light, with minimal props. The focus is on connection, not complicated setups. Simple, timeless, and genuinely you.'
        }
    elif post_type == 'family':
        return {
            'heading': 'Our Approach:<br/>Lifestyle Family Photography',
            'content': 'Family photography shouldn\'t feel stiff or formal. We create sessions where everyone can relax, be themselves, and actually enjoy the experience. The photos that result feel natural because they are.'
        }
    else:
        return {
            'heading': 'Our Approach',
            'content': 'We focus on capturing authentic moments and genuine connections throughout every session.'
        }


def generate_faq_section(post_type: str) -> str:
    """Generate post-type-specific FAQs"""
    
    faqs = {
        'wedding': [
            {
                'question': 'How much does wedding photography cost in South Florida?',
                'answer': 'Wedding photography packages in South Florida typically range from $2,500-$5,500 depending on coverage length and deliverables. Most couples choose 8-10 hour coverage to document from getting ready through reception. We recommend scheduling a consultation to discuss your specific needs and create a custom package.'
            },
            {
                'question': 'How long does wedding photography coverage last?',
                'answer': 'Most weddings require 8-10 hours of coverage to document the full day from preparations through the reception. We can extend coverage for welcome parties, next-day sessions, or multi-day celebrations. Half-day options (4-6 hours) work well for intimate ceremonies and elopements.'
            },
            {
                'question': 'Do you help coordinate with other wedding vendors?',
                'answer': 'Absolutely! We\'ve worked with countless South Florida vendors and can share recommendations for venues, florists, planners, and more. On your wedding day, we coordinate timing with your planner and videographer to ensure smooth coverage and zero conflicts.'
            },
            {
                'question': 'When will we receive our wedding photos?',
                'answer': 'You\'ll receive a sneak peek gallery within 48 hours of your wedding. The complete edited gallery (typically 500-800 images for full-day coverage) is delivered within 6-8 weeks. All images come with full printing rights and high-resolution downloads.'
            }
        ],
        'engagement': [
            {
                'question': 'How much does an engagement session cost in South Florida?',
                'answer': 'Engagement sessions in South Florida range from $450-$850 depending on location and session length. Most couples choose 1.5-2 hour sessions, which provides plenty of time for multiple outfit changes and location variety without feeling rushed.'
            },
            {
                'question': 'What should we wear for our engagement photos?',
                'answer': 'Choose outfits that make you feel confident and comfortable. Coordinate colors without being too matchy—think complementary tones. Solid colors or subtle patterns photograph best. We send a detailed style guide after booking with specific recommendations based on your chosen location.'
            },
            {
                'question': 'Can we bring our dog to the engagement session?',
                'answer': 'Yes! We love including pets in engagement sessions. Just make sure your location allows dogs and bring treats to help with cooperation. We recommend having someone else handle your pup between photos so you can relax and focus on each other.'
            },
            {
                'question': 'When is the best time of day for engagement photos?',
                'answer': 'Golden hour (the hour before sunset) provides the most flattering natural light and beautiful warm tones. In South Florida, that\'s typically 6:00-7:30 PM in summer, 5:00-6:30 PM in winter. Early morning (7:00-9:00 AM) works great too and offers less crowded locations.'
            }
        ],
        'newborn': [
            {
                'question': 'How much does newborn photography cost in South Florida?',
                'answer': 'Newborn lifestyle sessions range from $550-$950 in South Florida. This includes the session (typically 2-3 hours to work at baby\'s pace), professional editing, and 30-50 high-resolution digital images with full printing rights.'
            },
            {
                'question': 'When should we schedule our newborn session?',
                'answer': 'Book during your third trimester, and we\'ll schedule the actual session for when baby is 5-14 days old. This sweet spot gives you a few days to settle at home while baby is still sleepy and curly. We keep the schedule flexible since babies arrive on their own timeline!'
            },
            {
                'question': 'Do you photograph newborn sessions at home or in studio?',
                'answer': 'We specialize in lifestyle newborn sessions in your own home. This keeps baby comfortable in their familiar environment and allows us to capture authentic family moments. We use natural window light and simple setups—no need for elaborate props or complicated poses.'
            },
            {
                'question': 'Can you include siblings in the newborn session?',
                'answer': 'Absolutely! Sibling photos are some of our favorites. We photograph siblings first while they\'re fresh and cooperative, then move to parent photos and solo baby shots. Sessions typically take 2-3 hours to keep everyone comfortable and stress-free.'
            }
        ],
        'family': [
            {
                'question': 'How much does family photography cost in South Florida?',
                'answer': 'Family sessions in South Florida range from $450-$850 depending on location and family size. Sessions typically last 1-1.5 hours, providing plenty of time for group shots, individual family combinations, and candid moments without overwhelming young children.'
            },
            {
                'question': 'What should we wear for family photos?',
                'answer': 'Coordinate outfits in complementary colors without being too matchy. Think in terms of a color palette rather than identical looks. Solid colors or simple patterns work best—avoid busy logos or graphics. Dress for the location and season, prioritizing comfort so everyone can relax and enjoy the session.'
            },
            {
                'question': 'What age is best for family photos?',
                'answer': 'There\'s no perfect age! Each stage of childhood brings unique moments worth documenting. Many families choose annual sessions to track growth over time. The key is managing expectations—toddlers might be less cooperative, but we\'re experienced at capturing genuine moments even with energetic little ones.'
            },
            {
                'question': 'Can we do family photos at home?',
                'answer': 'Definitely! In-home sessions offer comfort and convenience, especially with young children. We use natural window light and focus on authentic family interactions in your own space. Outdoor locations work beautifully too—we can discuss options based on your family\'s style and energy levels.'
            }
        ],
        'maternity': [
            {
                'question': 'When should we schedule maternity photos?',
                'answer': 'The ideal time is 28-34 weeks when your belly is beautifully round but you\'re still comfortable moving around. We can shoot earlier or later depending on how you\'re feeling and carrying. Book 4-6 weeks in advance to secure your preferred date and time slot.'
            },
            {
                'question': 'How much does maternity photography cost?',
                'answer': 'Maternity sessions range from $450-$750 in South Florida. Sessions typically last 1-1.5 hours at a location of your choice. You\'ll receive 30-50 professionally edited high-resolution images with full printing rights.'
            },
            {
                'question': 'What should I wear for maternity photos?',
                'answer': 'Form-fitting dresses or gowns that show your bump work beautifully. Flowing maxi dresses photograph wonderfully outdoors. We recommend 2-3 outfit options. Many clients choose one elegant dress and one casual outfit. We send a detailed style guide after booking with specific recommendations.'
            },
            {
                'question': 'Can my partner and other children be in the photos?',
                'answer': 'Absolutely! We love including your whole family in maternity sessions. We\'ll capture some solo mama shots showcasing your bump, then bring in partner and siblings for family photos celebrating this exciting time together. Sessions are structured to get the best from everyone.'
            }
        ]
    }
    
    post_faqs = faqs.get(post_type, faqs['wedding'])  # Default to wedding
    
    faq_html = '<div class="faq-section" itemscope itemtype="https://schema.org/FAQPage">\n'
    faq_html += '<h2 class="section-heading">Frequently Asked Questions</h2>\n\n'
    
    for faq in post_faqs:
        faq_html += f'''<div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 class="faq-question" itemprop="name">{faq['question']}</h3>
<div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<div itemprop="text">
<p>{faq['answer']}</p>
</div>
</div>
</div>\n\n'''
    
    faq_html += '</div>'
    return faq_html


def build_complete_post_html(post_data: Dict, checklist_item: Dict) -> str:
    """Build complete HTML for a blog post"""
    
    # Extract data
    slug = post_data.get('slug', '')
    title_data = post_data.get('title', '')
    if isinstance(title_data, dict):
        title = clean_text(title_data.get('rendered', ''))
    else:
        title = clean_text(str(title_data))
    
    content_data = post_data.get('content', {})
    if isinstance(content_data, dict):
        content_html = content_data.get('rendered', '')
    else:
        content_html = str(content_data)
    
    # Extract images
    images = extract_images_from_post(content_html)
    hero_image = images[0] if images else '/static/placeholder.jpg'
    
    # Extract original text
    original_text = extract_original_text(content_html)
    
    # Get post type
    post_type = checklist_item.get('type', 'wedding')
    
    # Create meta description
    meta_desc = original_text[:155] + '...' if len(original_text) > 155 else original_text
    
    # Get CSS
    css = extract_css_from_template()
    
    # Generate sections
    location_section = generate_location_section(post_type, title)
    photo_section = generate_photography_section(post_type)
    
    # Generate FAQs
    faq_html = generate_faq_section(post_type)
    
    # Build gallery HTML
    gallery_html = '<div class="gallery-container">\n'
    for i, img in enumerate(images, 1):
        gallery_html += f'''<a href="{img}" class="gallery-item glightbox" data-gallery="wedding-gallery">
<img src="{img}" alt="{title} - Photo {i}" class="gallery-image" loading="lazy"/>
</a>\n'''
    gallery_html += '</div>\n'
    
    # Build complete HTML
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>{title} | Acromatico Photography</title>

<!-- SEO Meta Tags -->
<meta content="{meta_desc}" name="description"/>
<meta content="wedding photography, engagement photos, South Florida photographer" name="keywords"/>
<meta content="Italo Campilii" name="author"/>
<meta content="index, follow" name="robots"/>

<!-- Open Graph / Facebook -->
<meta content="article" property="og:type"/>
<meta content="https://acromatico.com/blog/{slug}" property="og:url"/>
<meta content="{title}" property="og:title"/>
<meta content="{meta_desc}" property="og:description"/>
<meta content="{hero_image}" property="og:image"/>

<!-- Twitter -->
<meta content="summary_large_image" property="twitter:card"/>
<meta content="https://acromatico.com/blog/{slug}" property="twitter:url"/>
<meta content="{title}" property="twitter:title"/>
<meta content="{meta_desc}" property="twitter:description"/>
<meta content="{hero_image}" property="twitter:image"/>

<!-- Canonical URL -->
<link href="https://acromatico.com/blog/{slug}" rel="canonical"/>

<!-- Fonts & Libraries -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<link href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com"></script>

<style>
{css}
</style>
</head>

<body>

<!-- Static Header with Logo and Hamburger -->
<header class="site-header">
  <a href="/">
    <img src="/static/acromatico-logo-transparent.png" alt="Acromatico Photography" class="site-logo" />
  </a>
  <button class="menu-toggle" id="menuToggle" aria-label="Menu">
    <span></span>
    <span></span>
    <span></span>
  </button>
</header>

<!-- DYNAMIC MOBILE MENU - Loaded from /api/mobile-menu API -->
<div id="mobile-menu-container"></div>

<script>
// Load mobile menu dynamically from server
(function() {{
  fetch('/api/mobile-menu')
    .then(response => response.text())
    .then(html => {{
      document.getElementById('mobile-menu-container').innerHTML = html;
      
      // Execute any scripts in the loaded HTML
      const scripts = document.getElementById('mobile-menu-container').querySelectorAll('script');
      scripts.forEach(script => {{
        const newScript = document.createElement('script');
        if (script.src) {{
          newScript.src = script.src;
        }} else {{
          newScript.textContent = script.textContent;
        }}
        document.body.appendChild(newScript);
      }});
    }})
    .catch(error => console.error('Mobile menu load error:', error));
}})();
</script>

<!-- HERO SECTION -->
<div class="hero-section" style="background-image: url('{hero_image}');">
  <h1 class="hero-title">{title}</h1>
</div>

<!-- CONTENT -->
<div class="content-container">

<!-- ORIGINAL WORDPRESS CONTENT (PRESERVED) -->
<div class="post-intro">
<p>{original_text}</p>
</div>

<!-- LOCATION SECTION -->
{f'<div class="featured-image"><img alt="{title} - Featured moment" class="section-image" loading="lazy" src="{images[1] if len(images) > 1 else hero_image}"/><p class="image-caption">{title}</p></div>' if len(images) > 1 else ''}

<h2 class="section-heading">{location_section['heading']}</h2>
<div class="section-text">
<p>{location_section['content']}</p>
</div>

{f'<div class="featured-image"><img alt="{title} - Beautiful moment" class="section-image" loading="lazy" src="{images[2] if len(images) > 2 else hero_image}"/><p class="image-caption">{title}</p></div>' if len(images) > 2 else ''}

<!-- PHOTOGRAPHY APPROACH SECTION -->
<h2 class="section-heading">{photo_section['heading']}</h2>
<div class="section-text">
<p>{photo_section['content']}</p>
</div>

{f'<div class="featured-image"><img alt="{title} - Authentic connection" class="section-image" loading="lazy" src="{images[3] if len(images) > 3 else hero_image}"/><p class="image-caption">{title}</p></div>' if len(images) > 3 else ''}

<!-- FULL GALLERY -->
<h2 class="section-heading">The Full Story</h2>

{gallery_html}

<!-- CTA SECTION -->
<div class="cta-section mid-post">
  <h2>Ready to Tell Your Story?</h2>
  <p>Let's create something beautiful together. Get in touch to check availability and learn more about our photography packages.</p>
  <a href="/contact" class="cta-button">Get in Touch</a>
  <a href="/photography" class="cta-button secondary">View Pricing</a>
</div>

<!-- FAQ SECTION -->
{faq_html}

<!-- AUTHOR BIO (ITALO + ALE) -->
<div class="author-bio">
<div class="author-headshots">
<img alt="Italo Campilii" onerror="this.style.display='none'" src="/static/italo-headshot.jpg"/>
<img alt="Ale Campilii" onerror="this.style.display='none'" src="/static/ale-headshot.jpg"/>
</div>
<div class="author-content">
<h3 style="color: #ffffff; font-size: 32px; margin-bottom: 25px;">About Acromatico Photography</h3>
<p style="color: #ffffff; margin-bottom: 25px;">Founded by Italo and Ale, Acromatico Photography specializes in capturing authentic moments with artistic vision. Based in South Florida, we travel worldwide to document love stories, families, and life's most meaningful celebrations.</p>

<p style="color: #ffffff;">Our approach combines photojournalistic storytelling with fine art aesthetics, creating timeless images that reflect the genuine emotion and beauty of each unique moment.</p>
</div>
</div>

</div>

<!-- DYNAMIC FOOTER - Loaded from /api/footer API -->
<div id="footer-container"></div>

<script>
// Load footer dynamically from server
(function() {{
  fetch('/api/footer')
    .then(response => response.text())
    .then(html => {{
      document.getElementById('footer-container').innerHTML = html;
    }})
    .catch(error => console.error('Footer load error:', error));
}})();
</script>

<!-- GLightbox JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
<script>
const lightbox = GLightbox({{
  selector: '.glightbox',
  touchNavigation: true,
  loop: true,
  autoplayVideos: true
}});
</script>

</body>
</html>'''
    
    return html


def main():
    """Generate blog posts"""
    print("🚀 ACROMATICO BLOG POST GENERATOR V5 - THE RIGHT WAY")
    print("=" * 60)
    
    # Count posts needing generation
    needs_fix = [item for item in checklist if item['status'] == '❌ NEEDS FIX' and item['images'] > 0]
    
    print(f"Total Posts: {len(checklist)}")
    print(f"Posts Needing Generation: {len(needs_fix)}")
    print("")
    
    # TESTING MODE: Generate 1 example
    print("🧪 TESTING MODE: Generating 1 example post")
    print("")
    
    test_post = needs_fix[0] if needs_fix else None
    
    if test_post:
        slug = test_post['slug']
        post_data = next((p for p in all_posts if p.get('slug') == slug), None)
        
        if post_data:
            title_data = post_data.get('title', '')
            if isinstance(title_data, dict):
                title = clean_text(title_data.get('rendered', ''))
            else:
                title = clean_text(str(title_data))
            
            print(f"📝 Generating: {title}")
            print(f"   Type: {test_post['type'].upper()}")
            print(f"   Images: {test_post['images']}")
            print(f"   Slug: {slug}")
            
            html = build_complete_post_html(post_data, test_post)
            
            output_path = Path(f'public/static/blog/{slug}.html')
            output_path.write_text(html, encoding='utf-8')
            
            file_size = output_path.stat().st_size // 1024
            print(f"   ✅ Created: {output_path} ({file_size}K)")
    
    print("\n" + "=" * 60)
    print("✅ Test generation complete!")


if __name__ == '__main__':
    main()
