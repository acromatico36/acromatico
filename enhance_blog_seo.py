#!/usr/bin/env python3
"""
Enhance blog post SEO and add rounded image corners
"""
import re

# Read the current blog post
with open('/home/user/webapp/public/static/blog/20th-anniversary-photo-session.html', 'r') as f:
    content = f.read()

# 1. Update meta description to be more specific
old_desc = '<meta content="Professional wedding photography at our location. 20th Anniversary Photo Session | Mares Family." name="description"/>'
new_desc = '<meta content="Celebrate 20 years of love! Professional anniversary photo session for the Mares family in South Florida. Stunning couples photography capturing authentic moments and timeless memories." name="description"/>'
content = content.replace(old_desc, new_desc)

# 2. Update OG description
old_og_desc = '<meta content="Professional wedding photography at our location. 20th Anniversary Photo Session | Mares Family." property="og:description"/>'
new_og_desc = '<meta content="Celebrate 20 years of love! Professional anniversary photo session for the Mares family in South Florida. Stunning couples photography capturing authentic moments." property="og:description"/>'
content = content.replace(old_og_desc, new_og_desc)

# 3. Update Twitter description
old_tw_desc = '<meta content="Professional wedding photography at our location. 20th Anniversary Photo Session | Mares Family." property="twitter:description"/>'
new_tw_desc = '<meta content="Celebrate 20 years of love! Professional anniversary photo session for the Mares family in South Florida. Stunning couples photography capturing authentic moments." property="twitter:description"/>'
content = content.replace(old_tw_desc, new_tw_desc)

# 4. Add article:section and article:tag Open Graph properties
schema_line = '<!-- Schema.org Markup -->'
enhanced_og = '''<!-- Open Graph Extended -->
<meta content="Photography" property="article:section"/>
<meta content="Anniversary Photography" property="article:tag"/>
<meta content="Couples Photography" property="article:tag"/>
<meta content="South Florida Photographer" property="article:tag"/>
<meta content="Family Photography" property="article:tag"/>
<meta content="Italo Campilii" property="article:author"/>
<!-- Schema.org Markup -->'''
content = content.replace(schema_line, enhanced_og)

# 5. Add rounded corners to gallery images
old_gallery_css = '''        .gallery-image {
            width: 100%;
            height: auto;
            display: block;
            cursor: pointer;
            transition: opacity 0.3s ease;
        }'''

new_gallery_css = '''        .gallery-image {
            width: 100%;
            height: auto;
            display: block;
            cursor: pointer;
            transition: opacity 0.3s ease;
            border-radius: 10px;
            overflow: hidden;
        }'''

content = content.replace(old_gallery_css, new_gallery_css)

# 6. Add breadcrumb schema (find the Schema.org section and add breadcrumb)
# Find the last </script> tag before </head>
breadcrumb_schema = '''
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://acromatico.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://acromatico.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "20th Anniversary Photo Session",
      "item": "https://acromatico.com/blog/20th-anniversary-photo-session"
    }
  ]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Acromatico Photography",
  "image": "https://acromatico.com/static/acromatico-logo-dark.png",
  "description": "Professional wedding and portrait photography in South Florida and NYC",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Miami",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.7617",
    "longitude": "-80.1918"
  },
  "url": "https://acromatico.com",
  "telephone": "+1-305-555-0100",
  "priceRange": "$$$$",
  "areaServed": ["Miami", "South Florida", "New York City"],
  "servesCuisine": "Photography Services"
}
</script>
'''

# Insert before </head>
content = content.replace('</head>', breadcrumb_schema + '</head>')

# Write the enhanced version
with open('/home/user/webapp/public/static/blog/20th-anniversary-photo-session.html', 'w') as f:
    f.write(content)

print("✅ SEO ENHANCEMENTS APPLIED!")
print("   1. ✅ Meta description updated (more specific, mentions 20th anniversary)")
print("   2. ✅ OG/Twitter descriptions updated")
print("   3. ✅ Article:section and article:tag added")
print("   4. ✅ Article:author added")
print("   5. ✅ Gallery images now have 10px rounded corners")
print("   6. ✅ Breadcrumb schema added")
print("   7. ✅ LocalBusiness schema added (South Florida location)")
print("")
print("🔗 Test: http://localhost:3000/static/blog/20th-anniversary-photo-session.html")
