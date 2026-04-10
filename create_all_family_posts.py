#!/usr/bin/env python3
"""
Create blog posts for Yanez, Perez, and Perales families
Uses SmugMug gallery URLs to fetch images and create SEO-optimized posts
"""

import json
import os
from datetime import datetime

# SmugMug Image IDs from galleries (manually selected top images)
# Format: photos.smugmug.com/photos/i-{ID}/0/X3/i-{ID}-X3.jpg

YANEZ_IMAGES = [
    "t8rnM4C", "dGx4RMd", "SZkn7P2", "55hxzKb", "VPjMtNg",
    "c8qvzxW", "DLLj9sj", "Hc59JWC", "dCdTQcx", "XrBXBZX",
    "zZ3pMv7", "DrqdbdS", "W8N34nc", "hG8DWvT", "Kw7kHvs",
    "RsxKp36", "ntgkkv3", "QCJJtVg", "3g8VcsQ", "8vctNXK",
    "KrMfb2J", "BHbVJG6", "jGnRxn7", "wKjXH8S", "SRG4nWv",
    "3HpndGG", "XcLnXWH", "6pBxWx6", "9DJDbVS", "vwRgtQV"
]

# Need to fetch Perez and Perales from galleries
# For now, using placeholder structure - will update with actual IDs

def get_image_url(image_id):
    """Generate SmugMug image URL"""
    return f"https://photos.smugmug.com/photos/i-{image_id}/0/X3/i-{image_id}-X3.jpg"

def create_yanez_post():
    """Create Yanez Family blog post with fixed image URLs"""
    
    content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>Yanez Family Portraits at Pompano Beach Pier | Acromatico Photography</title>
    <meta name="description" content="Capturing the Yanez family's love story at Pompano Beach Pier in South Florida. Golden hour beach portraits showcasing genuine connection and generational love.">
    <meta name="keywords" content="Pompano Beach family photographer, beach family photos, South Florida family portraits, Pompano Pier photographer, golden hour photography, beach portrait session">
    <meta name="author" content="Italo Campilii">
    <link rel="canonical" href="https://acromatico.com/blog/yanez-family-pompano-pier">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://acromatico.com/blog/yanez-family-pompano-pier">
    <meta property="og:title" content="Yanez Family Portraits at Pompano Beach Pier | Acromatico Photography">
    <meta property="og:description" content="Capturing the Yanez family's love story at Pompano Beach Pier in South Florida. Golden hour beach portraits showcasing genuine connection and generational love.">
    <meta property="og:image" content="{get_image_url(YANEZ_IMAGES[0])}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://acromatico.com/blog/yanez-family-pompano-pier">
    <meta property="twitter:title" content="Yanez Family Portraits at Pompano Beach Pier | Acromatico Photography">
    <meta property="twitter:description" content="Capturing the Yanez family's love story at Pompano Beach Pier in South Florida.">
    <meta property="twitter:image" content="{get_image_url(YANEZ_IMAGES[0])}">
    
    <!-- Schema.org Markup -->
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Yanez Family Portraits at Pompano Beach Pier",
        "image": "{get_image_url(YANEZ_IMAGES[0])}",
        "author": {{
            "@type": "Person",
            "name": "Italo Campilii"
        }},
        "publisher": {{
            "@type": "Organization",
            "name": "Acromatico Photography",
            "logo": {{
                "@type": "ImageObject",
                "url": "https://acromatico.com/static/images/acromatico-logo.png"
            }}
        }},
        "datePublished": "2026-04-10",
        "description": "Capturing the Yanez family's love story at Pompano Beach Pier in South Florida."
    }}
    </script>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
    
    <style>
        :root {{
            --primary-color: #2c3e50;
            --accent-color: #e67e22;
            --text-color: #333;
            --bg-color: #f9f9f9;
        }}
        
        body {{
            font-family: 'Georgia', serif;
            color: var(--text-color);
            line-height: 1.8;
        }}
        
        .hero-section {{
            height: 70vh;
            background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('{get_image_url(YANEZ_IMAGES[0])}');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }}
        
        .content-section {{
            max-width: 800px;
            margin: 0 auto;
            padding: 4rem 2rem;
        }}
        
        .story-image {{
            width: 100%;
            height: 500px;
            object-fit: cover;
            border-radius: 8px;
            margin: 2rem 0;
        }}
        
        .gallery-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            margin: 3rem 0;
        }}
        
        .gallery-item {{
            aspect-ratio: 4/3;
            overflow: hidden;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.3s ease;
        }}
        
        .gallery-item:hover {{
            transform: scale(1.05);
        }}
        
        .gallery-item img {{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }}
        
        h1 {{
            font-size: 3rem;
            font-weight: 700;
            color: white;
        }}
        
        h2 {{
            font-size: 2rem;
            color: var(--primary-color);
            margin: 3rem 0 1.5rem;
            border-bottom: 3px solid var(--accent-color);
            padding-bottom: 0.5rem;
        }}
        
        .faq-section {{
            background: white;
            padding: 3rem 2rem;
            border-radius: 8px;
            margin: 3rem 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}
        
        .faq-item {{
            margin: 2rem 0;
        }}
        
        .faq-question {{
            font-size: 1.3rem;
            color: var(--primary-color);
            font-weight: 600;
            margin-bottom: 0.5rem;
        }}
    </style>
</head>
<body>
    <!-- Hero Section -->
    <div class="hero-section flex items-center justify-center">
        <div class="text-center text-white px-4">
            <h1>Yanez Family</h1>
            <p class="text-xl mt-4">Pompano Beach Pier • South Florida</p>
            <p class="text-lg mt-2">Photographed by Italo Campilii</p>
        </div>
    </div>
    
    <!-- Main Content -->
    <article class="content-section">
        <p class="text-lg leading-relaxed mb-6">
            The Yanez family holds a special place in our hearts. As dear friends, it was an absolute privilege to capture 
            their love story against the iconic backdrop of Pompano Beach Pier. The golden hour light, the gentle ocean breeze, 
            and their genuine connection created magic that no amount of posing could replicate.
        </p>
        
        <!-- Story Section 1 -->
        <h2><i class="fas fa-map-marker-alt mr-2 text-orange-500"></i>The Location</h2>
        <img src="{get_image_url(YANEZ_IMAGES[1])}" alt="Pompano Beach Pier family portraits" class="story-image" loading="lazy">
        <p>
            Pompano Beach Pier is one of South Florida's most breathtaking locations for family photography. The combination of 
            weathered wood, turquoise waters, and endless sky creates a timeless backdrop that never fails to inspire. For the Yanez 
            family, this location held special significance—a place where they've made countless memories together.
        </p>
        
        <!-- Story Section 2 -->
        <h2><i class="fas fa-heart mr-2 text-orange-500"></i>Genuine Connection</h2>
        <img src="{get_image_url(YANEZ_IMAGES[2])}" alt="Family love and connection" class="story-image" loading="lazy">
        <p>
            What struck me most during this session was the effortless way the Yanez family interacted. There was no need for forced 
            smiles or awkward poses—their love for each other shines through in every frame. These are the moments that matter: 
            the gentle touches, the shared laughter, the quiet moments of connection.
        </p>
        
        <!-- Story Section 3 -->
        <h2><i class="fas fa-sun mr-2 text-orange-500"></i>Golden Hour Magic</h2>
        <img src="{get_image_url(YANEZ_IMAGES[3])}" alt="Golden hour beach photography" class="story-image" loading="lazy">
        <p>
            We timed the session perfectly to catch that magical golden hour light—when the sun sits low on the horizon and bathes 
            everything in warm, flattering tones. The pier's structure created beautiful leading lines and natural frames, while the 
            soft, diffused light made everyone look their absolute best.
        </p>
        
        <!-- Story Section 4 -->
        <h2><i class="fas fa-users mr-2 text-orange-500"></i>Generational Love</h2>
        <img src="{get_image_url(YANEZ_IMAGES[4])}" alt="Multi-generational family portraits" class="story-image" loading="lazy">
        <p>
            Family portraits are about more than just documenting how people look—they're about capturing legacy, connection, and 
            the bonds that tie generations together. The Yanez family's session beautifully captured these multi-generational 
            relationships, creating heirloom images that will be treasured for decades to come.
        </p>
        
        <!-- Story Section 5 -->
        <h2><i class="fas fa-camera mr-2 text-orange-500"></i>The Acromatico Approach</h2>
        <img src="{get_image_url(YANEZ_IMAGES[5])}" alt="Professional family photography" class="story-image" loading="lazy">
        <p>
            Our approach to family photography is simple: create an environment where authentic moments can unfold naturally. We blend 
            gentle direction with documentary-style observation, ensuring you get both beautifully composed portraits and candid moments 
            of real connection. The result? Images that feel both timeless and deeply personal.
        </p>
        
        <!-- Gallery Section -->
        <h2><i class="fas fa-images mr-2 text-orange-500"></i>Gallery</h2>
        <div class="gallery-grid">
'''
    
    # Add all gallery images
    for img_id in YANEZ_IMAGES:
        content += f'''            <a href="{get_image_url(img_id)}" class="gallery-item glightbox" data-gallery="yanez-gallery">
                <img src="{get_image_url(img_id)}" alt="Yanez family portraits" loading="lazy">
            </a>
'''
    
    content += '''        </div>
        
        <!-- FAQ Section -->
        <div class="faq-section">
            <h2><i class="fas fa-question-circle mr-2 text-orange-500"></i>Frequently Asked Questions</h2>
            
            <div class="faq-item">
                <h3 class="faq-question">What's the best time for beach family photos in South Florida?</h3>
                <p>Golden hour—the hour before sunset—provides the most flattering, warm light. In South Florida, this typically means scheduling sessions around 6:00-7:30 PM, depending on the season. The soft light minimizes harsh shadows and creates that magical glow.</p>
            </div>
            
            <div class="faq-item">
                <h3 class="faq-question">How long does a family portrait session last?</h3>
                <p>Most family sessions run 60-90 minutes. This gives us plenty of time to capture different groupings, locations, and moments without anyone feeling rushed or exhausted—especially important when photographing families with young children.</p>
            </div>
            
            <div class="faq-item">
                <h3 class="faq-question">What should we wear for beach family photos?</h3>
                <p>Coordinate colors without matching exactly. Soft, neutral tones (whites, creams, blues, soft pinks) work beautifully against the beach backdrop. Avoid loud patterns or logos. Comfort is key—you want to move freely and feel confident.</p>
            </div>
            
            <div class="faq-item">
                <h3 class="faq-question">Do you provide styling guidance?</h3>
                <p>Absolutely! We send a detailed style guide to all clients before their session, with outfit suggestions, color palettes, and tips for coordinating the whole family. We want you to look back on these images and love them for decades.</p>
            </div>
            
            <div class="faq-item">
                <h3 class="faq-question">How many edited images do we receive?</h3>
                <p>Family portrait sessions typically include 50-80 professionally edited, high-resolution images delivered in a beautiful online gallery. You'll have full download rights and the ability to order prints directly through the gallery.</p>
            </div>
            
            <div class="faq-item">
                <h3 class="faq-question">What locations do you recommend for family portraits in South Florida?</h3>
                <p>Beyond Pompano Pier, we love Delray Beach, Boca Raton's Red Reef Park, Hollywood Beach Broadwalk, and Fort Lauderdale Beach. We're happy to scout locations that hold special meaning for your family or suggest spots based on your aesthetic preferences.</p>
            </div>
        </div>
        
        <!-- Related Posts -->
        <div class="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 class="text-2xl font-bold mb-4 text-gray-800">Ready to Book Your Family Portrait Session?</h3>
            <p class="mb-4">Let's create timeless images that celebrate your family's unique story. Sessions start at $500 and include professional editing, online gallery, and full download rights.</p>
            <a href="https://acromatico.com/portraits/booking" class="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">Book Your Session</a>
        </div>
    </article>
    
    <!-- GLightbox JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
    <script>
        const lightbox = GLightbox({{
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        }});
    </script>
</body>
</html>'''
    
    return content

# Write the file
output_file = "/home/user/webapp/public/static/blog/yanez-family-pompano-pier.html"
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(create_yanez_post())

print(f"✅ Created Yanez Family blog post: {output_file}")
print(f"   Using {len(YANEZ_IMAGES)} images from SmugMug")
print(f"   Image URL format: photos.smugmug.com/photos/i-{{ID}}/0/X3/")
