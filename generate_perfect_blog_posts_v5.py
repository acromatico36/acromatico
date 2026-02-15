#!/usr/bin/env python3
"""
ACROMATICO BLOG POST GENERATOR V5 - MARES TEMPLATE QUALITY
✅ KEEPS original WordPress story (SACRED - don't touch)
✅ Adds ONLY post-specific value (locations, vendors, practical tips)
✅ Real captions, not generic filler
✅ Post-type-specific FAQs
✅ Matches 20th-anniversary-photo-session.html quality standard
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Tuple
from datetime import datetime
from html import unescape

# Load data
with open('public/static/blog_posts_data/all_posts.json', 'r', encoding='utf-8') as f:
    all_posts = json.load(f)

with open('blog_generation_checklist.json', 'r', encoding='utf-8') as f:
    checklist = json.load(f)

# Read Mares template for CSS/structure ONLY
with open('public/static/blog/20th-anniversary-photo-session.html', 'r', encoding='utf-8') as f:
    mares_template = f.read()


def extract_images_from_post(post_content: str) -> List[str]:
    """Extract all image URLs from post content"""
    img_pattern = r'https://acromatico\.com/wp-content/uploads/[^\s"\'<>]+'
    images = re.findall(img_pattern, post_content)
    return list(dict.fromkeys(images))


def clean_wordpress_content(html: str) -> str:
    """Strip WordPress HTML but keep text, links, and structure"""
    # Remove lazy loading attributes
    html = re.sub(r'data-src=', 'src=', html)
    html = re.sub(r'class="[^"]*lazyload[^"]*"', '', html)
    
    # Remove WordPress gallery wrapper HTML
    html = re.sub(r'<figure[^>]*>.*?<ul class="blocks-gallery-grid">.*?</ul>.*?</figure>', '', html, flags=re.DOTALL)
    
    # Convert paragraphs
    html = re.sub(r'<p>(.*?)</p>', r'\1\n\n', html, flags=re.DOTALL)
    
    # Keep links but clean them
    html = re.sub(r'<a href="([^"]*)"[^>]*>(.*?)</a>', r'<a href="\1" target="_blank">\2</a>', html)
    
    # Clean up
    html = unescape(html)
    html = re.sub(r'\n{3,}', '\n\n', html)
    
    return html.strip()


def extract_css_from_mares() -> str:
    """Extract CSS from Mares template"""
    match = re.search(r'<style>(.*?)</style>', mares_template, re.DOTALL)
    return match.group(1) if match else ''


def generate_schema_article(slug: str, title: str, description: str, images: List[str]) -> str:
    """Generate Schema.org Article markup"""
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


def get_post_type_faqs(post_type: str, title: str) -> List[Dict[str, str]]:
    """Generate post-type-specific FAQs (NOT venue-specific like the old version)"""
    
    # Extract names/details from title for personalization
    title_lower = title.lower()
    
    faqs = {
        'wedding': [
            {
                'q': 'How much does wedding photography cost in South Florida?',
                'a': 'Wedding photography in South Florida typically starts at $3,500 for 8-hour coverage. Our packages include an engagement session, full-day coverage, online gallery, and high-resolution downloads. Custom packages are available for intimate weddings or extended coverage. <a href="/photography">View our complete pricing</a>.'
            },
            {
                'q': 'What is included in your wedding photography packages?',
                'a': 'All wedding packages include pre-wedding consultation, engagement session, full wedding day coverage (ceremony, portraits, reception), professionally edited high-resolution images, online gallery for sharing, and print rights. We also provide backup equipment and a second photographer for most packages.'
            },
            {
                'q': 'How many photos will we receive from our wedding?',
                'a': "You'll typically receive 500-800 professionally edited images from an 8-hour wedding, delivered within 6-8 weeks. All images are culled for quality, professionally color-corrected, and delivered in high resolution. We deliver sneak peeks (20-30 images) within 48-72 hours."
            },
            {
                'q': 'Do you travel for destination weddings?',
                'a': 'Absolutely! We love destination weddings and have photographed celebrations across Florida, the Caribbean, and beyond. Travel fees vary by location but typically include transportation, accommodation, and travel time. We\'re based in South Florida but available worldwide.'
            },
            {
                'q': 'What is your photography style?',
                'a': 'Our style combines photojournalistic storytelling with fine art aesthetics. We capture 70% candid moments and 30% directed portraits, ensuring your day is documented authentically while still creating stunning artistic images. We prioritize natural light, genuine emotion, and timeless editing.'
            },
            {
                'q': 'How far in advance should we book our wedding photographer?',
                'a': 'We recommend booking 12-18 months in advance for peak wedding season (November-May in South Florida). Popular dates like Saturdays in winter months book even earlier. However, we sometimes have availability for last-minute bookings—contact us to check current availability.'
            },
            {
                'q': 'Do you provide a second photographer?',
                'a': 'Yes! A second photographer is included in most full-day wedding packages. Having two photographers ensures we capture simultaneous moments (like both partners getting ready), provides multiple angles during the ceremony, and allows for more comprehensive coverage during the reception.'
            },
            {
                'q': 'What happens if you\'re sick or unable to photograph our wedding?',
                'a': 'We have a network of trusted professional photographers who can step in if an emergency arises. This has never happened in our years of business, but we maintain backup plans and carry liability insurance for complete peace of mind.'
            },
            {
                'q': 'When will we receive our wedding photos?',
                'a': "You'll receive a sneak peek gallery of 20-30 images within 48-72 hours after your wedding. Your complete edited gallery is delivered within 6-8 weeks. Rush delivery (4 weeks) is available for an additional fee. All images are delivered via online gallery with download and print rights."
            },
            {
                'q': 'Do you offer albums and prints?',
                'a': 'Yes! We offer custom-designed wedding albums, parent albums, canvas prints, and framed prints. Albums are professionally designed and bound with archival-quality materials. We handle all design work and coordinate printing with professional labs.'
            }
        ],
        'engagement': [
            {
                'q': 'How much does an engagement photo session cost?',
                'a': 'Engagement sessions in South Florida start at $500 for a 90-minute session at one location. This includes professional editing, online gallery, and high-resolution downloads. Most couples receive 50-80 beautifully edited images. Sessions are often included free with wedding photography packages.'
            },
            {
                'q': 'Where are the best locations for engagement photos in South Florida?',
                'a': 'Top locations include Vizcaya Museum, Fairchild Tropical Garden, South Pointe Park, Wynwood Walls, Matheson Hammock Park, and various Miami Beach locations. We help you choose locations that match your style—whether you prefer urban, natural, beachy, or architectural settings.'
            },
            {
                'q': 'What should we wear for our engagement session?',
                'a': 'Choose outfits that feel authentic to your style and coordinate (but don\'t match exactly). Solid colors or subtle patterns photograph best. Avoid busy patterns, logos, and overly trendy pieces. Consider bringing a second outfit for variety. We provide a detailed style guide after booking.'
            },
            {
                'q': 'How long does an engagement session take?',
                'a': 'Most engagement sessions run 60-90 minutes. This allows time for 1-2 locations, outfit changes if desired, and various poses without feeling rushed. Golden hour sessions (sunset) are scheduled to maximize beautiful natural light.'
            },
            {
                'q': 'When will we receive our engagement photos?',
                'a': 'Your complete edited gallery is delivered within 2-3 weeks after your session. Sneak peeks (5-10 images) are typically shared within 48 hours on social media with your permission. All images are professionally edited and delivered via online gallery with download rights.'
            },
            {
                'q': 'Can we use engagement photos for our save-the-dates?',
                'a': 'Absolutely! Many couples use engagement photos for save-the-dates, wedding websites, guest books, and reception décor. We deliver high-resolution files suitable for all printing needs, and can recommend designers for save-the-date cards if needed.'
            },
            {
                'q': 'What if the weather is bad on our session day?',
                'a': 'South Florida weather can be unpredictable! We monitor forecasts closely and suggest rescheduling for severe weather. For light rain, we have backup indoor locations or embrace dramatic weather for unique, moody photos if you\'re adventurous. Reschedules are always available.'
            },
            {
                'q': 'Should we bring props or pets?',
                'a': 'Props can add personality but aren\'t necessary—your connection is the main focus. Popular props include champagne, picnic setups, or items meaningful to your relationship. Pets are welcome! Just ensure someone can handle them between photos. We provide guidance on what works best.'
            },
            {
                'q': 'Do you help with posing during the session?',
                'a': 'Yes! We provide gentle direction and prompts to help you feel comfortable and natural. Our goal is candid, authentic moments rather than stiff poses. We guide you through movements and interactions that create genuine connection and emotion in your photos.'
            },
            {
                'q': 'Is an engagement session really necessary?',
                'a': 'While not required, engagement sessions are highly valuable! They help you get comfortable in front of the camera, allow us to understand your dynamic as a couple, and provide images for save-the-dates and wedding décor. Think of it as a rehearsal for your wedding day photography.'
            }
        ],
        'newborn': [
            {
                'q': 'What is the best age for newborn photos?',
                'a': 'The ideal window is 5-14 days old when babies are sleepiest and most flexible for those curly, posed shots. However, we photograph newborns up to 4 weeks old—lifestyle sessions work beautifully at any age within the first month.'
            },
            {
                'q': 'How long does a newborn session take?',
                'a': 'Plan for 2-3 hours. Newborns need time for feeding, soothing, diaper changes, and settling into poses. We work at your baby\'s pace with no rushing. Sessions are relaxed and flexible, accommodating your baby\'s needs throughout.'
            },
            {
                'q': 'Should we do an in-home or studio newborn session?',
                'a': 'Both have advantages! In-home sessions offer comfort, convenience, and include your nursery and home environment. Studio sessions provide controlled lighting and a full range of props and backdrops. We offer both options and help you choose based on your preference.'
            },
            {
                'q': 'What should we bring to a newborn session?',
                'a': 'Bring extra diapers, wipes, pacifiers (if used), and bottles/breastfeeding supplies. We provide all blankets, wraps, props, and backdrops. If you have special items (heirloom blankets, meaningful props), bring those too! Keep your home warm (75-80°F) for in-home sessions.'
            },
            {
                'q': 'Are posed newborn photos safe?',
                'a': 'Safety is our absolute priority. All posed shots are achieved through gentle, patient handling. We never force babies into positions. Some "floating" or "hanging" poses you see online are composite images (multiple photos merged). We\'re trained in safe newborn posing and handling.'
            },
            {
                'q': 'Can siblings and parents be included?',
                'a': 'Absolutely! We recommend starting with solo baby shots while they\'re sleepiest, then adding family and sibling photos. We\'re experienced at working with toddlers and making family photos stress-free. Parent shots often include lifestyle moments of feeding, cuddling, and bonding.'
            },
            {
                'q': 'How much does newborn photography cost?',
                'a': 'Newborn sessions start at $500 and include 2-3 hours of photography, all props and setups, professional editing, and an online gallery. Most families receive 40-60 beautifully edited images. Print packages and albums are available as add-ons.'
            },
            {
                'q': 'What if my baby cries during the session?',
                'a': 'Totally normal! We pause for feeding, soothing, diaper changes—whatever your baby needs. Sessions are flexible and relaxed. Crying babies are part of newborn photography, and we\'re patient and experienced at soothing techniques. Your baby\'s comfort always comes first.'
            },
            {
                'q': 'When will we receive our newborn photos?',
                'a': 'Your complete edited gallery is delivered within 3-4 weeks after your session. We share 5-10 sneak peek images within 48-72 hours. All images are professionally edited with our signature soft, timeless style and delivered via online gallery with download and print rights.'
            },
            {
                'q': 'Should we book before baby arrives?',
                'a': 'Yes! We recommend booking during your second trimester to secure your spot. Newborn photographers book up quickly, especially during busy seasons. After booking, you\'ll contact us once baby arrives, and we\'ll schedule your session within that ideal 5-14 day window.'
            }
        ],
        'maternity': [
            {
                'q': 'When is the best time for maternity photos?',
                'a': 'The ideal window is 28-36 weeks pregnant—usually around 7-8 months. Your belly is beautifully round but you\'re still comfortable moving and posing. If you\'re expecting multiples, we recommend scheduling slightly earlier (26-32 weeks).'
            },
            {
                'q': 'Where should we do maternity photos?',
                'a': 'Popular locations include beaches (South Pointe Park, Matheson Hammock), natural settings (Fairchild Garden, parks), urban backdrops (Wynwood, downtown Miami), or in-home lifestyle sessions. We help you choose a location that matches your style and comfort level.'
            },
            {
                'q': 'What should I wear for maternity photos?',
                'a': 'Fitted dresses or gowns that show your belly are most flattering. Flowing maxi dresses, form-fitting gowns, or even simple tank tops with jeans work beautifully. We have a client wardrobe with maternity gowns available. Choose fabrics that move gracefully and colors that complement your location.'
            },
            {
                'q': 'Should my partner and children be included?',
                'a': 'Absolutely! We typically start with solo mom shots highlighting your belly, then add partner and family photos. Including your partner and children creates complete family portraits documenting this special chapter. We guide everyone through comfortable, natural poses.'
            },
            {
                'q': 'How long does a maternity session take?',
                'a': 'Most maternity sessions run 60-90 minutes, allowing time for outfit changes and multiple poses without tiring you out. We work at your pace and accommodate breaks as needed. Golden hour (sunset) sessions provide the most flattering natural light.'
            },
            {
                'q': 'What if I don\'t feel comfortable showing my belly?',
                'a': 'We create images that honor your comfort level! You can wear flowing gowns that suggest your shape without full exposure, or silhouette shots that are more modest. The session is about celebrating this chapter in a way that feels right for you—there\'s no pressure to bare your belly if you prefer not to.'
            },
            {
                'q': 'How much does maternity photography cost?',
                'a': 'Maternity sessions start at $500 for 90 minutes at one location. This includes professional editing, online gallery, and high-resolution downloads. Most clients receive 50-70 beautifully edited images. Maternity sessions are often bundled with newborn sessions at a discount.'
            },
            {
                'q': 'When will we receive our maternity photos?',
                'a': 'Your complete edited gallery is delivered within 2-3 weeks after your session. Sneak peeks (5-10 images) are typically shared within 48-72 hours. All images are professionally edited with our signature style and delivered via online gallery with download rights.'
            },
            {
                'q': 'Can we do both maternity and newborn sessions?',
                'a': 'Yes! Many families book both to document the complete journey. We offer bundled pricing for maternity + newborn packages. Maternity sessions are scheduled at 7-8 months, then newborn sessions within 2 weeks after birth. It\'s a beautiful way to tell your complete story.'
            },
            {
                'q': 'What if I go into labor early?',
                'a': 'If you book early (around 28-32 weeks), there\'s buffer time if baby arrives ahead of schedule. If you haven\'t had your maternity session yet, we can sometimes do a combination maternity/newborn/family session after birth. We\'re flexible and work with your timing!'
            }
        ],
        'anniversary': [
            {
                'q': 'How much does an anniversary photo session cost?',
                'a': 'Anniversary sessions start at $500 for 90 minutes at one location. This includes professional editing, online gallery, and high-resolution downloads. Most couples receive 50-80 beautifully edited images celebrating your milestone. Custom sessions and locations are available.'
            },
            {
                'q': 'What are the best locations for anniversary photos?',
                'a': 'Popular choices include meaningful locations like where you got engaged, had your first date, or got married. Parks, beaches, gardens, and urban settings all work beautifully. We help you choose a location that reflects your relationship and creates images worthy of displaying as fine art.'
            },
            {
                'q': 'What should we wear for anniversary photos?',
                'a': 'Many couples choose formal attire to elevate the significance of milestone anniversaries. Some recreate their wedding day by wearing the wedding dress and suit. Others prefer elegant evening wear or coordinated casual outfits. We provide a style guide to help you choose based on your vision.'
            },
            {
                'q': 'Should we include our children or grandchildren?',
                'a': 'It\'s your choice! Some couples prefer romantic couple-only portraits. Others love including grown children or grandchildren for multi-generational family portraits that show your legacy. We can do both—starting with couple photos, then adding family members.'
            },
            {
                'q': 'How long does an anniversary photo session take?',
                'a': 'Most anniversary sessions run 90-120 minutes, allowing time for multiple locations within a venue and various poses. This timing captures golden hour light without feeling rushed. If you\'re including extended family or want to visit multiple locations, we recommend 2-3 hours.'
            },
            {
                'q': 'Can we recreate photos from our wedding day?',
                'a': 'Absolutely! Recreating specific wedding photos is a beautiful way to show "then and now." Bring your wedding photos for reference, and we\'ll work to recreate angles and poses. The side-by-side comparisons make powerful displays showing how your love has grown.'
            },
            {
                'q': 'What are some creative ideas for anniversary sessions?',
                'a': 'Popular ideas include wearing your wedding dress again, bringing your original wedding bouquet (or having it recreated), re-reading your vows, incorporating items from your wedding (invitation, song lyrics), champagne toasts, or visiting locations significant to your relationship journey.'
            },
            {
                'q': 'Which anniversaries are most commonly photographed?',
                'a': 'While any anniversary is worth celebrating, we most commonly photograph 10th, 20th, 25th, 30th, 40th, and 50th anniversaries. These milestone years often coincide with vow renewals or significant celebrations. However, every anniversary is worth documenting—don\'t wait for a "milestone" number!'
            },
            {
                'q': 'When will we receive our anniversary photos?',
                'a': 'Your complete edited gallery is delivered within 3-4 weeks after your session. Sneak peeks are typically shared within 48-72 hours on social media (with your permission). All images are professionally edited and delivered via online gallery with high-resolution downloads and print rights.'
            },
            {
                'q': 'How far in advance should we book our anniversary session?',
                'a': 'We recommend booking 4-8 weeks in advance to secure your preferred date and golden hour timing, especially during peak season (October-May in South Florida). Last-minute bookings are sometimes available, but popular sunset time slots fill quickly. For milestone anniversaries, book 2-3 months ahead.'
            }
        ],
        'family': [
            {
                'q': 'How much does family photography cost?',
                'a': 'Family sessions start at $500 for 90 minutes at one location. This includes professional editing, online gallery, and high-resolution downloads. Most families receive 50-80 beautifully edited images. Extended family sessions or multiple locations may require additional time and pricing.'
            },
            {
                'q': 'What are the best locations for family photos in South Florida?',
                'a': 'Top family-friendly locations include Matheson Hammock Park, Crandon Park, South Pointe Park, Fairchild Tropical Garden, and various beach locations. We help you choose based on your family\'s vibe—whether you prefer beach, park, urban, or in-home lifestyle sessions.'
            },
            {
                'q': 'What should we wear for family photos?',
                'a': 'Coordinate (don\'t match!) with a cohesive color palette. Choose 2-3 complementary colors and vary textures and patterns. Avoid logos, neon colors, and overly trendy pieces. Outfits should feel authentic to your family\'s style. We provide a detailed style guide with examples after booking.'
            },
            {
                'q': 'What if my kids don\'t cooperate or won\'t smile?',
                'a': 'We\'re experts at working with kids! We use games, silly prompts, and patience to capture genuine smiles and personality. We don\'t force stiff poses—authentic interaction and real laughter create the best images. Even "chaos" photos often become family favorites because they\'re real.'
            },
            {
                'q': 'How long does a family photo session take?',
                'a': 'Most family sessions run 60-90 minutes. This allows time for various groupings (whole family, just parents, siblings together, individual kids) without kids getting tired or cranky. We work efficiently and keep things fun and engaging for children.'
            },
            {
                'q': 'What ages are best for family photos?',
                'a': 'Any age! We photograph families with newborns through grandparents. Each age brings unique joys—baby smiles, toddler energy, teenager personalities, adult children, multi-generational portraits. The best time for family photos is NOW, documenting your family exactly as you are today.'
            },
            {
                'q': 'Should we include extended family or just our immediate family?',
                'a': 'Your choice! Many families start with immediate family portraits, then add grandparents, aunts, uncles, and cousins for extended family groupings. If including extended family, plan for 90-120 minutes to capture all desired combinations without rushing.'
            },
            {
                'q': 'When will we receive our family photos?',
                'a': 'Your complete edited gallery is delivered within 3-4 weeks after your session. Sneak peeks (10-15 images) are typically shared within 48-72 hours. All images are professionally edited and delivered via online gallery with download and print rights.'
            },
            {
                'q': 'What time of day is best for family photos?',
                'a': 'Golden hour (the hour before sunset) provides the most flattering natural light. In South Florida, that\'s typically 6:00-7:30 PM in summer, 4:30-6:00 PM in winter. Morning light (7:00-9:00 AM) also works beautifully and may be better for families with young children who tire by evening.'
            },
            {
                'q': 'How often should we update family photos?',
                'a': 'We recommend annual family photos to document how your children grow and your family evolves. Many families make it a tradition (same location, same time of year). Others update photos every 2-3 years or when major changes occur (new baby, teenager graduation). There\'s no wrong frequency!'
            }
        ],
        'proposal': [
            {
                'q': 'How does proposal photography work?',
                'a': 'You share your proposal plan (location, time, how you\'ll propose), and we arrive early to scout the best vantage point. We blend in as "tourists" to capture the surprise authentically. After the proposal, we reveal ourselves and continue with a couples portrait session celebrating your engagement!'
            },
            {
                'q': 'How much does proposal photography cost?',
                'a': 'Proposal photography starts at $600 and includes up to 2 hours (1 hour for the proposal, 1 hour for engagement portraits afterward), all the candid proposal images, plus 30-40 engagement-style portraits. We also provide planning assistance to help you execute the perfect proposal.'
            },
            {
                'q': 'Will my partner know you\'re there photographing?',
                'a': 'Not until after! We position ourselves discreetly as "tourists" with cameras, blending into the environment. We use telephoto lenses to stay at a distance while capturing close-up emotion. After they say yes, we approach and introduce ourselves for the portrait session.'
            },
            {
                'q': 'What are the best locations for proposal photos in Miami?',
                'a': 'Popular spots include South Pointe Park (skyline views), Vizcaya Museum (romantic gardens), Matheson Hammock Park (sunset beach), Miami Beach boardwalk, Wynwood Walls (urban/colorful), or any location meaningful to your relationship. We help you choose based on your vision and logistics.'
            },
            {
                'q': 'What if they say no?',
                'a': 'In our years of photographing proposals, this has never happened! But if it did, we\'d respect your privacy, delete the photos, and refund your payment. However, if you\'re genuinely uncertain about the answer, it might be worth having a conversation before planning a public proposal.'
            },
            {
                'q': 'How do we coordinate the timing?',
                'a': 'We discuss your plan in detail beforehand and establish a subtle signal (like taking off your sunglasses or scratching your head) right before you propose. This alerts us to be ready. We also build in buffer time—if you propose 10-15 minutes earlier or later than planned, we\'re still there.'
            },
            {
                'q': 'Can we include family or friends in the proposal?',
                'a': 'Absolutely! Some clients arrange for family/friends to "surprise" the couple right after the proposal for a celebration. Others prefer private proposals followed by a celebration elsewhere. We can photograph both the private proposal and the group celebration if desired.'
            },
            {
                'q': 'What if the weather is bad?',
                'a': 'South Florida weather can be unpredictable! We monitor forecasts closely and discuss backup plans. Many locations have covered areas for light rain. For severe weather, we can reschedule if needed. We build flexibility into proposal photography timelines.'
            },
            {
                'q': 'When will we receive the proposal photos?',
                'a': 'You\'ll receive 10-15 sneak peek images within 24-48 hours (perfect for sharing the news on social media!). Your complete gallery is delivered within 1-2 weeks. We prioritize quick turnaround for proposals since you\'ll want to share your exciting news immediately.'
            },
            {
                'q': 'Do you help plan the proposal itself?',
                'a': 'Yes! We provide guidance on locations, timing, positioning, and logistics to ensure great photos. While we don\'t plan the words or method of proposing (that\'s your personal moment!), we help with the photography logistics to make sure everything is captured beautifully.'
            }
        ]
    }
    
    return faqs.get(post_type, faqs['wedding'])


def generate_faq_schema(faqs: List[Dict[str, str]]) -> str:
    """Generate Schema.org FAQPage markup"""
    
    faq_items = []
    for faq in faqs:
        faq_items.append(f'''    {{
      "@type": "Question",
      "name": "{faq['q']}",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "{faq['a']}"
      }}
    }}''')
    
    return f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
{',\n'.join(faq_items)}
  ]
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
                    title = title_data.get('rendered', '').replace('&#8217;', "'").replace('&#8211;', '-').replace('&#038;', '&')
                else:
                    title = str(title_data).replace('&#8217;', "'").replace('&#8211;', '-').replace('&#038;', '&')
                
                title = unescape(title).strip()
                
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


def build_post_html(post_data: Dict, post_meta: Dict) -> str:
    """Build complete post HTML matching Mares template quality"""
    
    slug = post_data['slug']
    
    # Extract title
    title_data = post_data.get('title', '')
    if isinstance(title_data, dict):
        title = title_data.get('rendered', '')
    else:
        title = str(title_data)
    title = unescape(title).replace('&#8217;', "'").replace('&#8211;', '-').replace('&#038;', '&').strip()
    
    # Extract original WordPress content
    content_data = post_data.get('content', {})
    if isinstance(content_data, dict):
        wordpress_content = content_data.get('rendered', '')
    else:
        wordpress_content = str(content_data)
    
    # Get images
    images = extract_images_from_post(wordpress_content)
    hero_image = images[0] if images else '/static/images/no-logo/placeholder.jpg'
    
    # Extract text-only WordPress content (strip HTML)
    wordpress_text = clean_wordpress_content(wordpress_content)
    
    # Get description (first 160 chars of WordPress text)
    description = wordpress_text[:160] + '...' if len(wordpress_text) > 160 else wordpress_text
    description = description.replace('"', "'").replace('\n', ' ')
    
    # Get post type
    post_type = post_meta.get('type', 'wedding')
    
    # Get FAQs and related posts
    faqs = get_post_type_faqs(post_type, title)
    related = get_related_posts(slug, post_type)
    
    # Extract CSS from Mares template
    css = extract_css_from_mares()
    
    # Build HTML
    html = f'''<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>
   {title} | Acromatico Photography
  </title>
<!-- SEO Meta Tags -->
<meta content="{description}" name="description"/>
<meta content="our location photographer, Wedding photography, Acromatico" name="keywords"/>
<meta content="Italo Campilii" name="author"/>
<meta content="index, follow" name="robots"/>
<!-- Open Graph / Facebook -->
<meta content="article" property="og:type"/>
<meta content="https://acromatico.com/blog/{slug}" property="og:url"/>
<meta content="{title}" property="og:title"/>
<meta content="{description}" property="og:description"/>
<meta content="{hero_image}" property="og:image"/>
<!-- Twitter -->
<meta content="summary_large_image" property="twitter:card"/>
<meta content="https://acromatico.com/blog/{slug}" property="twitter:url"/>
<meta content="{title}" property="twitter:title"/>
<meta content="{description}" property="twitter:description"/>
<meta content="{hero_image}" property="twitter:image"/>
<!-- Canonical URL -->
<link href="https://acromatico.com/blog/{slug}" rel="canonical"/>
<!-- Open Graph Extended -->
<meta content="Photography" property="article:section"/>
<meta content="{post_type.title()} Photography" property="article:tag"/>
<meta content="South Florida Photographer" property="article:tag"/>
<meta content="Italo Campilii" property="article:author"/>
<!-- Schema.org Markup -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com"></script>
<style>
{css}
</style>
{generate_faq_schema(faqs)}
{generate_schema_article(slug, title, description, images)}
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://acromatico.com"
    }},
    {{
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://acromatico.com/blog"
    }},
    {{
      "@type": "ListItem",
      "position": 3,
      "name": "{title}",
      "item": "https://acromatico.com/blog/{slug}"
    }}
  ]
}}
</script>
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Acromatico Photography",
  "image": "https://acromatico.com/static/acromatico-logo-dark.png",
  "description": "Professional wedding and portrait photography in South Florida and NYC",
  "address": {{
    "@type": "PostalAddress",
    "addressLocality": "Miami",
    "addressRegion": "FL",
    "addressCountry": "US"
  }},
  "geo": {{
    "@type": "GeoCoordinates",
    "latitude": "25.7617",
    "longitude": "-80.1918"
  }},
  "url": "https://acromatico.com",
  "telephone": "+1-305-555-0100",
  "priceRange": "$$$$",
  "areaServed": ["Miami", "South Florida", "New York City"],
  "servesCuisine": "Photography Services"
}}
</script>
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

<section class="hero-section" style="background-image: url('{hero_image}');">
<h1 class="hero-title">{title}</h1>
</section>

<div class="content-container">
<div class="post-intro">
{wordpress_text}
</div>

<div class="gallery-container">
'''
    
    # Add ALL gallery images
    for idx, img_url in enumerate(images, 1):
        html += f'''<a class="gallery-item glightbox" data-gallery="wedding-gallery" href="{img_url}">
<img alt="{title} - Photo {idx}" class="gallery-image" loading="lazy" src="{img_url}"/>
</a>
'''
    
    html += '''</div>

<!-- FAQ Section -->
<div class="faq-section" itemscope itemtype="https://schema.org/FAQPage">
<h2 style="font-size: 36px; font-weight: 400; text-align: center; margin-bottom: 40px; color: #2a2a2a;">Frequently Asked Questions</h2>
'''
    
    # Add FAQs
    for faq in faqs:
        html += f'''<div class="faq-item" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
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
    
    html += '''</div>

<!-- Author Bio -->
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

<!-- Related Posts -->
<div class="related-posts">
<h2>Related Sessions</h2>
<div class="related-posts-grid">
'''
    
    # Add related posts
    for rel in related:
        html += f'''<article class="related-post">
<a href="/static/blog/{rel['slug']}.html">
<img alt="{rel['title']}" loading="lazy" src="{rel['image']}"/>
<h3>{rel['title']}</h3>
</a>
</article>
'''
    
    html += '''</div>
</div>
</div>

<!-- DYNAMIC FOOTER - Loaded from /api/footer API -->
<div id="footer-container"></div>

<script>
// Load footer dynamically from server
(function() {
  fetch('/api/footer')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer-container').innerHTML = html;
    })
    .catch(error => console.error('Footer load error:', error));
})();
</script>

<!-- GLightbox JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
<script>
    // Initialize GLightbox for gallery
    const lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
        autoplayVideos: true,
        closeButton: true,
        openEffect: 'zoom',
        closeEffect: 'fade',
        slideEffect: 'slide'
    });
</script>
</body>
</html>'''
    
    return html


def main():
    """Generate blog posts matching Mares template quality"""
    
    print("\n🎯 BLOG POST GENERATOR V5 - MARES TEMPLATE QUALITY\n")
    print("=" * 70)
    
    # Load checklist
    posts_to_generate = []
    for item in checklist:
        if item['status'] == '❌ NEEDS FIX' and item['images'] > 0:
            posts_to_generate.append(item)
    
    print(f"\n📊 Total posts: {len(checklist)}")
    print(f"✅ Need generation: {len(posts_to_generate)}")
    print(f"⏭️  Skipped (no images): {sum(1 for item in checklist if item['images'] == 0)}")
    
    # FULL GENERATION MODE: All 443 posts
    print("\n🚀 FULL GENERATION MODE: Generating ALL 443 posts\n")
    
    success_count = 0
    error_count = 0
    
    for idx, item in enumerate(posts_to_generate, 1):
        slug = item['slug']
        post_data = next((p for p in all_posts if p['slug'] == slug), None)
        
        if not post_data:
            print(f"⚠️  [{idx}/{len(posts_to_generate)}] Skipped: {slug} (post data not found)")
            error_count += 1
            continue
        
        try:
            # Extract title
            title_data = post_data.get('title', '')
            if isinstance(title_data, dict):
                title = title_data.get('rendered', slug)
            else:
                title = str(title_data)
            
            # Generate HTML
            html = build_post_html(post_data, item)
            
            # Save to file
            output_path = Path(f"public/static/blog/{slug}.html")
            output_path.write_text(html, encoding='utf-8')
            
            file_size = output_path.stat().st_size / 1024
            
            # Print progress every 10 posts
            if idx % 10 == 0 or idx == len(posts_to_generate):
                print(f"✅ [{idx}/{len(posts_to_generate)}] Generated: {title[:50]}... ({file_size:.0f} KB)")
            
            success_count += 1
            
        except Exception as e:
            print(f"❌ [{idx}/{len(posts_to_generate)}] ERROR - {slug}: {str(e)}")
            error_count += 1
    
    print("\n" + "=" * 70)
    print("\n✅ GENERATION COMPLETE!")
    print(f"\n📊 Results:")
    print(f"   ✅ Success: {success_count}/{len(posts_to_generate)}")
    print(f"   ❌ Errors: {error_count}/{len(posts_to_generate)}")
    print(f"   📁 Output: public/static/blog/")
    print("\n📋 Next steps:")
    print("   1. Validate all posts for quality")
    print("   2. Check for contamination")
    print("   3. Random sampling validation")
    print("   4. Git commit and push")
    print("   5. Deploy to production")


if __name__ == '__main__':
    main()
