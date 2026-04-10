#!/usr/bin/env python3
"""
Generate blog posts for Yanez, Perez, and Perales families
Uses actual SmugMug image IDs from galleries
"""

# Image IDs extracted from SmugMug galleries
YANEZ_IMAGES = [
    "t8rnM4C", "dGx4RMd", "SZkn7P2", "55hxzKb", "VPjMtNg",
    "c8qvzxW", "DLLj9sj", "Hc59JWC", "dCdTQcx", "XrBXBZX",
    "zZ3pMv7", "DrqdbdS", "W8N34nc", "hG8DWvT", "Kw7kHvs",
    "RsxKp36", "ntgkkv3", "QCJJtVg", "3g8VcsQ", "8vctNXK",
    "KrMfb2J", "BHbVJG6", "jGnRxn7", "wKjXH8S", "SRG4nWv",
    "3HpndGG", "XcLnXWH", "6pBxWx6", "9DJDbVS", "vwRgtQV"
]

PEREZ_IMAGES = [
    "HSjd4Tg", "dt9xZF2", "Q3ZDXxr", "sLw6VjD", "F9g2G5k",
    "2tvsNKk", "VKDxzWT", "NCBVFVZ", "8LNkx4V", "pxdkpBD",
    "N2HLw3M", "nzNqkJz", "qDnT4nV", "6Qg4gwr", "Dd8bzWF",
    "D92N2VR", "Lch7f9X", "bzNsmQw", "j8sp3Gt", "PF2Wrgv",
    "ckwprvD", "Nv7VFqc", "Ngw4NPC", "4HHKWPr", "M7rZc2D",
    "f6KkXJZ", "7527FBC", "vwhBGPq", "vjJtp5S", "GVcSCr6"
]

# NOTE: Perales gallery shares same IDs as Yanez - using for second post
PERALES_IMAGES = [
    "JkH9292", "r3TH7mP", "T3LPNMZ", "kfBGP3F", "9c4hbBf",
    "cRF3Jpv", "4tWkMkc", "ZGwVvkR", "GJLtvH8", "9sT8SG4",
    "BQFSVs7", "kDMm9Cv", "Zj6bKVn", "6LfCz8K", "kMs8C8r",
    "qNQc8gn", "zgx5Cf6", "Bp7pXfh", "v4nQZnt", "BGSZBXt",
    "D2PpNhM", "wTNpsKS", "3dhrbNn", "2HTwxNm", "qMjFbgp",
    "PTv8P64", "cH67GSq", "HLN6zsR", "dSzxH44", "rDM9ckC"
]

def get_image_url(image_id):
    """Generate SmugMug direct image URL"""
    return f"https://acromatico.smugmug.com/Portraits/{{GALLERY}}/i-{image_id}/0/X3/i-{image_id}-X3.jpg"

def create_blog_post(family_data):
    """Create a blog post HTML file"""
    name = family_data["name"]
    date = family_data["date"]
    location = family_data["location"]
    slug = family_data["slug"]
    gallery_name = family_data["gallery_name"]
    images = family_data["images"]
    story_sections = family_data["story_sections"]
    
    # Generate image URLs
    def img_url(idx):
        return get_image_url(images[idx]).replace("{GALLERY}", gallery_name)
    
    content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>{name} Family Portraits at {location} | Acromatico Photography</title>
    <meta name="description" content="Capturing the {name} family's love story at {location} in South Florida. Professional family portraits showcasing genuine connection and authentic moments.">
    <meta name="keywords" content="{location} family photographer, South Florida family portraits, {location.split(',')[0]} photographer, beach family photos, professional portrait session">
    <meta name="author" content="Italo Campilii">
    <link rel="canonical" href="https://acromatico.com/blog/{slug}">
    
    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://acromatico.com/blog/{slug}">
    <meta property="og:title" content="{name} Family Portraits at {location}">
    <meta property="og:description" content="Capturing the {name} family's love story at {location} in South Florida.">
    <meta property="og:image" content="{img_url(0)}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="{name} Family Portraits at {location}">
    <meta property="twitter:description" content="Capturing the {name} family's love story at {location}.">
    <meta property="twitter:image" content="{img_url(0)}">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "{name} Family Portraits at {location}",
        "image": "{img_url(0)}",
        "datePublished": "{date}",
        "author": {{"@type": "Person", "name": "Italo Campilii"}},
        "publisher": {{"@type": "Organization", "name": "Acromatico Photography"}}
    }}
    </script>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
    
    <style>
        body {{ font-family: 'Georgia', serif; line-height: 1.8; }}
        .hero-section {{
            height: 70vh;
            background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('{img_url(0)}');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }}
        .content-section {{ max-width: 800px; margin: 0 auto; padding: 4rem 2rem; }}
        .story-image {{ width: 100%; height: 500px; object-fit: cover; border-radius: 8px; margin: 2rem 0; }}
        .gallery-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin: 3rem 0; }}
        .gallery-item {{ aspect-ratio: 4/3; overflow: hidden; border-radius: 8px; cursor: pointer; transition: transform 0.3s; }}
        .gallery-item:hover {{ transform: scale(1.05); }}
        .gallery-item img {{ width: 100%; height: 100%; object-fit: cover; }}
        h1 {{ font-size: 3rem; font-weight: 700; color: white; }}
        h2 {{ font-size: 2rem; color: #2c3e50; margin: 3rem 0 1.5rem; border-bottom: 3px solid #e67e22; padding-bottom: 0.5rem; }}
        .faq-section {{ background: white; padding: 3rem 2rem; border-radius: 8px; margin: 3rem 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        .faq-item {{ margin: 2rem 0; }}
        .faq-question {{ font-size: 1.3rem; color: #2c3e50; font-weight: 600; margin-bottom: 0.5rem; }}
    </style>
</head>
<body>
    <!-- Hero -->
    <div class="hero-section flex items-center justify-center">
        <div class="text-center text-white px-4">
            <h1>{name} Family</h1>
            <p class="text-xl mt-4">{location}</p>
            <p class="text-lg mt-2">Photographed by Italo Campilii</p>
        </div>
    </div>
    
    <!-- Main Content -->
    <article class="content-section">
        <p class="text-lg mb-6">
            {story_sections["intro"]}
        </p>
'''

    # Add story sections
    section_images = [1, 2, 3, 4, 5]
    for idx, (title, text) in enumerate(story_sections["sections"]):
        content += f'''        
        <h2><i class="{story_sections["icons"][idx]} mr-2 text-orange-500"></i>{title}</h2>
        <img src="{img_url(section_images[idx])}" alt="{name} family {title.lower()}" class="story-image" loading="lazy">
        <p>{text}</p>
'''
    
    # Gallery
    content += '''        
        <h2><i class="fas fa-images mr-2 text-orange-500"></i>Gallery</h2>
        <div class="gallery-grid">
'''
    
    for img_id in images:
        url = get_image_url(img_id).replace("{GALLERY}", gallery_name)
        content += f'''            <a href="{url}" class="gallery-item glightbox" data-gallery="{slug}-gallery">
                <img src="{url}" alt="{name} family portraits" loading="lazy">
            </a>
'''
    
    content += '''        </div>
        
        <!-- FAQ -->
        <div class="faq-section">
            <h2><i class="fas fa-question-circle mr-2 text-orange-500"></i>Frequently Asked Questions</h2>
'''
    
    for q, a in story_sections["faq"]:
        content += f'''            
            <div class="faq-item">
                <h3 class="faq-question">{q}</h3>
                <p>{a}</p>
            </div>
'''
    
    content += '''        </div>
        
        <!-- CTA -->
        <div class="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 class="text-2xl font-bold mb-4 text-gray-800">Ready to Book Your Family Portrait Session?</h3>
            <p class="mb-4">Let's create timeless images that celebrate your family's unique story. Sessions start at $500 and include professional editing, online gallery, and full download rights.</p>
            <a href="https://acromatico.com/portraits/booking" class="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">Book Your Session</a>
        </div>
    </article>
    
    <script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
    <script>
        GLightbox({{ touchNavigation: true, loop: true }});
    </script>
</body>
</html>'''
    
    return content

# Family data
FAMILIES = [
    {
        "name": "Yanez",
        "date": "2026-04-10",
        "location": "Pompano Beach Pier, Pompano Beach, FL",
        "slug": "yanez-family-pompano-pier",
        "gallery_name": "Yanez-Family-Portraits-2026",
        "images": YANEZ_IMAGES,
        "story_sections": {
            "intro": "The Yanez family holds a special place in our hearts. As dear friends, it was an absolute privilege to capture their love story against the iconic backdrop of Pompano Beach Pier. The golden hour light, the gentle ocean breeze, and their genuine connection created magic that no amount of posing could replicate.",
            "sections": [
                ("The Location", "Pompano Beach Pier is one of South Florida's most breathtaking locations for family photography. The combination of weathered wood, turquoise waters, and endless sky creates a timeless backdrop that never fails to inspire. For the Yanez family, this location held special significance—a place where they've made countless memories together."),
                ("Genuine Connection", "What struck me most during this session was the effortless way the Yanez family interacted. There was no need for forced smiles or awkward poses—their love for each other shines through in every frame. These are the moments that matter: the gentle touches, the shared laughter, the quiet moments of connection."),
                ("Golden Hour Magic", "We timed the session perfectly to catch that magical golden hour light—when the sun sits low on the horizon and bathes everything in warm, flattering tones. The pier's structure created beautiful leading lines and natural frames, while the soft, diffused light made everyone look their absolute best."),
                ("Generational Love", "Family portraits are about more than just documenting how people look—they're about capturing legacy, connection, and the bonds that tie generations together. The Yanez family's session beautifully captured these multi-generational relationships, creating heirloom images that will be treasured for decades to come."),
                ("The Acromatico Approach", "Our approach to family photography is simple: create an environment where authentic moments can unfold naturally. We blend gentle direction with documentary-style observation, ensuring you get both beautifully composed portraits and candid moments of real connection. The result? Images that feel both timeless and deeply personal.")
            ],
            "icons": ["fas fa-map-marker-alt", "fas fa-heart", "fas fa-sun", "fas fa-users", "fas fa-camera"],
            "faq": [
                ("What's the best time for beach family photos in South Florida?", "Golden hour—the hour before sunset—provides the most flattering, warm light. In South Florida, this typically means scheduling sessions around 6:00-7:30 PM, depending on the season."),
                ("How long does a family portrait session last?", "Most family sessions run 60-90 minutes. This gives us plenty of time to capture different groupings, locations, and moments without anyone feeling rushed or exhausted."),
                ("What should we wear for beach family photos?", "Coordinate colors without matching exactly. Soft, neutral tones (whites, creams, blues, soft pinks) work beautifully against the beach backdrop. Avoid loud patterns or logos. Comfort is key—you want to move freely and feel confident."),
                ("Do you provide styling guidance?", "Absolutely! We send a detailed style guide to all clients before their session, with outfit suggestions, color palettes, and tips for coordinating the whole family."),
                ("How many edited images do we receive?", "Family portrait sessions typically include 50-80 professionally edited, high-resolution images delivered in a beautiful online gallery. You'll have full download rights and the ability to order prints directly through the gallery."),
                ("What locations do you recommend for family portraits in South Florida?", "Beyond Pompano Pier, we love Delray Beach, Boca Raton's Red Reef Park, Hollywood Beach Broadwalk, and Fort Lauderdale Beach. We're happy to scout locations that hold special meaning for your family.")
            ]
        }
    },
    {
        "name": "Perez",
        "date": "2026-03-10",
        "location": "Pompano Pier, Pompano Beach, FL",
        "slug": "perez-family-pompano-beach",
        "gallery_name": "Perez-Family-Portraits-2026",
        "images": PEREZ_IMAGES,
        "story_sections": {
            "intro": "The Perez family are dear friends whose warmth and love for each other is truly infectious. Photographing their family session at Pompano Pier was an absolute joy—from the playful kids to the loving parents, every moment radiated genuine happiness. The iconic pier provided the perfect backdrop for celebrating this beautiful family.",
            "sections": [
                ("Pompano Pier Magic", "There's something special about Pompano Pier that makes it perfect for family portraits. The weathered wooden planks, the endless ocean views, and that quintessential South Florida vibe create images that are both timeless and unmistakably coastal. For the Perez family, this location captured their fun-loving, beachside spirit perfectly."),
                ("Family Dynamics", "What makes the Perez family so special is how they interact with each other. The kids' infectious laughter, the parents' gentle guidance, the way they naturally gravitate toward each other—these aren't things you can fake. Our job was simply to create the space for these authentic connections to shine through."),
                ("Sunset Perfection", "We scheduled the Perez session for that perfect golden hour window, and Mother Nature delivered. The warm, diffused light wrapped around the family, creating that soft, flattering glow that makes everyone look incredible. As the sun dipped toward the horizon, we captured some truly magical silhouettes and sunset shots."),
                ("Capturing Joy", "Some families are just naturally joyful, and the Perez family embodies this completely. From spontaneous tickle fights to quiet moments of tenderness, their session was filled with laughter, hugs, and pure happiness. These are the images they'll treasure forever—reminders of this beautiful chapter in their family's story."),
                ("Professional Yet Personal", "Our photography style combines professional expertise with personal warmth. We directed when needed to ensure beautiful lighting and composition, but mostly we stepped back and let the Perez family's natural dynamics take center stage. The result? A gallery full of images that feel both polished and authentically them.")
            ],
            "icons": ["fas fa-umbrella-beach", "fas fa-heart", "fas fa-cloud-sun", "fas fa-laugh", "fas fa-camera-retro"],
            "faq": [
                ("When is the best time to book a beach family session?", "We recommend booking 4-6 weeks in advance, especially during peak season (winter and spring in South Florida). This gives us time to scout the perfect location and plan around weather and tide conditions."),
                ("What if it rains on our session day?", "South Florida weather can be unpredictable! We monitor forecasts closely and will reschedule if needed. Most afternoon showers pass quickly, so we remain flexible and communicative leading up to your session."),
                ("Can we bring props or special items?", "Absolutely! Props that have meaning to your family—favorite toys, blankets, or items that represent your interests—can add personality to your photos. Just keep it simple so the focus remains on your family's connection."),
                ("Do you photograph extended family sessions?", "Yes! Extended family sessions with grandparents, aunts, uncles, and cousins are wonderful. We allocate extra time to ensure we capture all the important groupings while everyone still looks fresh and happy."),
                ("What's included in a family portrait package?", "Our standard package includes: 90-minute session, professional editing, online gallery with 50-80 high-resolution images, full download rights, and the option to order prints directly through the gallery. Sessions start at $500."),
                ("How do we prepare young children for the session?", "Keep them well-rested and fed! Bring snacks and water. Let them know it will be fun—we'll play games and explore. Most importantly, don't stress. Kids pick up on parental anxiety, so stay relaxed and know we're experienced in photographing families with little ones.")
            ]
        }
    },
    {
        "name": "Perales",
        "date": "2026-04-10",
        "location": "Boca Grande, FL",
        "slug": "perales-family-boca-grande",
        "gallery_name": "Perales-Family-Portraits-2026",
        "images": PERALES_IMAGES,
        "story_sections": {
            "intro": "The Perales family chose the stunning beaches of Boca Grande, Florida for their portrait session, and what a perfect choice it was. As dear friends, we were honored to capture their love story against this pristine coastal backdrop. The combination of Boca Grande's natural beauty and this family's genuine warmth created images that are nothing short of magical.",
            "sections": [
                ("Boca Grande Beauty", "Boca Grande offers something truly special for family photography—white sand beaches, swaying palm trees, and that untouched Florida island charm. Unlike busier beaches, Boca Grande provides a sense of intimacy and exclusivity that perfectly matched the Perales family's elegant yet relaxed style. The natural setting allowed their connection to take center stage."),
                ("Authentic Moments", "With the Perales family, the best moments happened when they forgot the camera was there. Parents holding hands while walking along the shoreline, kids collecting shells and splashing in the shallow waves, spontaneous group hugs—these unscripted moments tell their story better than any posed portrait ever could."),
                ("Island Light", "Boca Grande's unique geography creates exceptional lighting conditions. The island's position means we get beautiful, soft light even during the middle of the day. For the Perales session, we captured everything from bright, beachy vibes to warm golden hour glow, giving them a diverse gallery that truly showcases their family's energy."),
                ("Multi-Generational Love", "One of the most beautiful aspects of the Perales family is how they've maintained strong bonds across generations. Grandparents, parents, and children all share this incredible closeness. Our session captured not just what they look like, but who they are—a family that cherishes time together and celebrates each other."),
                ("The Acromatico Experience", "We believe family portrait sessions should be enjoyable experiences, not stressful ordeals. With the Perales family, we created a relaxed atmosphere where everyone could be themselves. Our approach combines technical expertise with emotional intelligence, ensuring beautiful images while keeping everyone comfortable and having fun.")
            ],
            "icons": ["fas fa-island-tropical", "fas fa-heart", "fas fa-sun", "fas fa-users", "fas fa-camera"],
            "faq": [
                ("Why choose Boca Grande for family portraits?", "Boca Grande offers pristine beaches, fewer crowds, and a timeless Florida charm. The island's natural beauty provides stunning backdrops without the hustle of more touristy beaches. It's perfect for families seeking elegant, intimate portraits."),
                ("How do we get to Boca Grande?", "Boca Grande is accessible via the Boca Grande Causeway (toll road). We can recommend specific beach access points and parking areas based on your group size and the time of your session. Many families make a day of it, enjoying the island's restaurants and shops."),
                ("What makes a great family portrait location?", "The best locations combine beautiful scenery with minimal distractions. We look for soft, flattering light, interesting textures (driftwood, sand dunes, palm trees), and spots where your family can move freely and interact naturally. Boca Grande checks all these boxes."),
                ("Can we do both beach and indoor portraits?", "Absolutely! While we specialize in natural light outdoor portraits, we can incorporate covered areas or nearby locations if desired. Boca Grande has charming historic areas that provide variety while maintaining the coastal aesthetic."),
                ("How long after our session will we receive photos?", "You'll receive a preview gallery within 48 hours and your full, professionally edited gallery within 2-3 weeks. We take care to ensure every image is color-corrected, professionally retouched, and ready for printing at the highest quality."),
                ("Do you offer prints and albums?", "Yes! Through our online gallery, you can order museum-quality prints, canvas wraps, and custom albums. We work with professional labs to ensure your images are reproduced beautifully. Many families create heirloom albums as a way to preserve and display their favorite moments.")
            ]
        }
    }
]

# Generate all blog posts
for family in FAMILIES:
    filename = f"/home/user/webapp/public/static/blog/{family['slug']}.html"
    content = create_blog_post(family)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Created: {filename}")
    print(f"   Family: {family['name']}")
    print(f"   Location: {family['location']}")
    print(f"   Images: {len(family['images'])}")
    print()

print(f"\n🎉 All blog posts created successfully!")
print(f"   Total families: {len(FAMILIES)}")
print(f"   Total images: {sum(len(f['images']) for f in FAMILIES)}")
