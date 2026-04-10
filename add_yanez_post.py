#!/usr/bin/env python3
"""
Add Yanez Family blog post to all_posts.json
"""

import json

# Read existing posts
with open('/home/user/webapp/public/static/blog_posts_data/all_posts.json', 'r') as f:
    posts = json.load(f)

# Create Yanez Family post entry
yanez_post = {
    "id": 99999,  # High number to avoid conflicts
    "date": "2026-04-10T12:00:00",
    "slug": "yanez-family-pompano-pier",
    "link": "https://acromatico.com/blog/yanez-family-pompano-pier",
    "title": {
        "rendered": "Yanez Family | Pompano Beach Pier"
    },
    "content": {
        "rendered": '<p>When dear friends trust you to capture their family\'s love story, it becomes more than just a photo session—it becomes a celebration of connection, laughter, and the beautiful chaos that makes family life so precious.</p><figure class="wp-block-image size-full"><img decoding="async" width="2400" height="1600" data-src="https://acromatico.smugmug.com/Portraits/Yanez-Family-Portraits-2026/i-t8rnM4C/A" alt="Yanez Family at Pompano Beach Pier" class="lazyload" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" /></figure>',
        "protected": False
    },
    "excerpt": {
        "rendered": "<p>The Yanez family chose the iconic Pompano Beach Pier as the backdrop for their portrait session. Golden hour light, ocean breezes, and genuine moments of joy combined to create images that will be treasured for generations.</p>",
        "protected": False
    },
    "featured_media": 99999,
    "categories": [
        9999  # Family category
    ]
}

# Add Yanez post to the beginning of the array
posts.insert(0, yanez_post)

# Write back to file
with open('/home/user/webapp/public/static/blog_posts_data/all_posts.json', 'w') as f:
    json.dump(posts, f, indent=2)

print(f"✅ Added Yanez Family post to all_posts.json")
print(f"   Total posts: {len(posts)}")
print(f"   First post: {posts[0]['title']['rendered']}")
