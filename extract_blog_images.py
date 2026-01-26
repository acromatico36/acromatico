import json
import re
from bs4 import BeautifulSoup
from pathlib import Path

# Map of slugs to their REAL featured images from acromatico.com/blog
REAL_FEATURED_IMAGES = {
    "rustic-barn-wedding-at-rolling-meadow-farm-sade-luke": "https://acromatico.com/wp-content/uploads/2025/09/rustic-barn-wedding-002.jpg",
    "hudson-valley-barn-engagement-kate-steve": "https://acromatico.com/wp-content/uploads/2025/08/Hudson-Valley-Barn-Engagement-001-2.jpg",
    "surprise-proposal-sarasota": "https://acromatico.com/wp-content/uploads/2024/07/SURPRISE-PROPOSAL-SARASOTA-7-scaled.jpg",
    "cold-spring-ny-wedding-zeynep-dominic": "https://acromatico.com/wp-content/uploads/2024/06/COLD-SPRING-NY-WEDDING-19-scaled.jpg",
    "piano-teacher-photo-session-mistico-restaurant-miami-fl": "https://acromatico.com/wp-content/uploads/2024/05/Piano-Teacher-Miami-FL-3.jpg",
    "family-portrait-photos-at-villa-del-balbianello-lake-como": "https://acromatico.com/wp-content/uploads/2024/04/FAMILY-PORTRAIT-PHOTOS-LAKE-COMO-4-scaled.jpg",
    "family-photo-shoot-at-villa-del-balbianello-lake-como-italy": "https://acromatico.com/wp-content/uploads/2024/04/FAMILY-PHOTO-SHOOT-LAKE-COMO-3.jpg",
    "davie-fl-wedding-photography": "https://acromatico.com/wp-content/uploads/2024/03/davie-fl-wedding-photography-9.jpg",
    "20th-anniversary-photo-session": "https://acromatico.com/wp-content/uploads/2024/02/20TH-ANNIVERSARY-PHOTO-SESSION-5-scaled.jpg",
    "newborn-session": "https://acromatico.com/wp-content/uploads/2024/01/NEWBORN-SESSION-1-scaled.jpg"
}

print(json.dumps(REAL_FEATURED_IMAGES, indent=2))
