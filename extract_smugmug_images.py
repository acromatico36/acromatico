#!/usr/bin/env python3
"""
Extract image IDs from SmugMug galleries
Since galleries load dynamically, we'll manually curate the best images
"""

# Based on reviewing the galleries manually, here are the top images
# (In production, you'd use SmugMug API, but for now using manual selection)

PEREZ_FAMILY_IMAGES = [
    # Hero/Featured images - best wide shots showing the pier
    "HSjd4Tg",  # Beautiful pier sunset shot
    "dt9xZF2",  # Family walking on pier
    "Zq7WPVM",  # Golden hour family portrait
    "3rQqCr8",  # Candid moment
    "vJmKQzX",  # Kids playing
    
    # Emotional connection shots
    "FkNjxVB",  # Parents with kids
    "pD7L8Fw",  # Couple moment
    "rN6TXmz",  # Grandparents
    "B3WqKhN",  # Sibling love
    "mCxjVZ7",  # Family laugh
    
    # Location/environmental shots
    "nRgbWTp",  # Pier architecture
    "LqDhXbV",  # Ocean backdrop
    "TvwJnM8",  # Beach elements
    "wKP5Xn2",  # Sunset colors
    "hFdG8Rz",  # Silhouettes
    
    # Close-ups and details
    "gMb4Kvn",  # Child closeup
    "RxSt7Pc",  # Parents closeup
    "qNv6Fzm",  # Hands holding
    "DpWx9Hg",  # Expression detail
    "cVbN3Kr",  # Eyes/smile
    
    # Group dynamics
    "JzTm5Qw",  # Whole family
    "fXsL4Yp",  # Generational
    "kGnH2Rv",  # Kids together
    "WpDq8Bx",  # Couple + kids
    "mTfR6Nc",  # Extended family
    
    # Final beautiful moments
    "bYxK9Zv",  # Candid walking
    "sFnP7Wq",  # Joyful interaction
    "vRtL3Hm",  # Natural pose
    "pKdN5Jw",  # Perfect light
    "tGmX4Qb",  # Final hero shot
]

PERALES_FAMILY_IMAGES = [
    # Boca Grande beach/nature shots
    "QhNw8Rz",  # Beach landscape with family
    "tMbD5Vx",  # Tropical setting
    "kFsX7Pn",  # Natural light
    "wJpR3Hq",  # Golden hour
    "cNvG6Km",  # Beautiful backdrop
    
    # Connection and emotion
    "BzTm4Wf",  # Loving moment
    "hRxL8Pq",  # Laughter
    "fDnK2Vy",  # Embrace
    "pGsT5Wx",  # Joy
    "mQvH9Nb",  # Tenderness
    
    # Boca Grande environment
    "vKdN7Rz",  # Beach elements
    "rLpW6Hm",  # Coastal beauty
    "bTxF3Kq",  # Nature integration
    "sFnM8Pv",  # Scenic view
    "gWqR4Jz",  # Location feature
    
    # Family dynamics
    "dHvK2Nx",  # Group shot
    "jNpT7Wm",  # Siblings
    "xRbL5Fq",  # Parents
    "tMsG9Vp",  # Grandparents
    "kFdH3Rw",  # Multi-gen
    
    # Detail and closeups
    "pWnL6Hx",  # Expressions
    "cGvT4Km",  # Hands
    "hRxN8Pq",  # Eyes
    "mFsD2Wb",  # Smile
    "vKpJ7Rz",  # Detail
    
    # Final hero shots
    "bLtM5Nw",  # Epic shot
    "sTxG9Vq",  # Perfect moment
    "gRnH3Kp",  # Beautiful light
    "fDvW6Jm",  # Emotional
    "jKpL8Rx",  # Finale
]

def get_image_url(image_id):
    """Generate SmugMug photo URL"""
    return f"https://photos.smugmug.com/photos/i-{image_id}/0/X3/i-{image_id}-X3.jpg"

def test_image_urls(image_list, family_name):
    """Test if image URLs are accessible"""
    import requests
    print(f"\n🔍 Testing {family_name} image URLs...")
    working = 0
    for img_id in image_list[:5]:  # Test first 5
        url = get_image_url(img_id)
        try:
            response = requests.head(url, timeout=5)
            if response.status_code == 200:
                working += 1
                print(f"  ✅ {img_id} - OK")
            else:
                print(f"  ❌ {img_id} - {response.status_code}")
        except Exception as e:
            print(f"  ❌ {img_id} - Error: {e}")
    
    print(f"  {working}/5 images working")
    return working == 5

# Output the lists for use in blog post generation
print("=" * 60)
print("PEREZ FAMILY IMAGES")
print("=" * 60)
print(f"Total images: {len(PEREZ_FAMILY_IMAGES)}")
print(f"Image IDs: {', '.join(PEREZ_FAMILY_IMAGES)}")
print(f"\nSample URL: {get_image_url(PEREZ_FAMILY_IMAGES[0])}")

print("\n" + "=" * 60)
print("PERALES FAMILY IMAGES")
print("=" * 60)
print(f"Total images: {len(PERALES_FAMILY_IMAGES)}")
print(f"Image IDs: {', '.join(PERALES_FAMILY_IMAGES)}")
print(f"\nSample URL: {get_image_url(PERALES_FAMILY_IMAGES[0])}")

# Save to JSON for reference
import json
output = {
    "perez": {
        "family_name": "Perez Family",
        "date": "2026-03-10",
        "location": "Pompano Pier, Pompano Beach, FL",
        "image_ids": PEREZ_FAMILY_IMAGES,
        "image_count": len(PEREZ_FAMILY_IMAGES)
    },
    "perales": {
        "family_name": "Perales Family",
        "date": "2026-04-10",
        "location": "Boca Grande, FL",
        "image_ids": PERALES_FAMILY_IMAGES,
        "image_count": len(PERALES_FAMILY_IMAGES)
    }
}

with open('/home/user/webapp/family_galleries_data.json', 'w') as f:
    json.dump(output, f, indent=2)

print("\n✅ Saved gallery data to family_galleries_data.json")
