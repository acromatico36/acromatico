#!/usr/bin/env python3
"""
Fetch Yanez Family gallery images from SmugMug
"""

import requests
from requests_oauthlib import OAuth1
import json

# SmugMug API credentials
API_KEY = "FCGHtwWkQqJ5qbpDgXd973DDpCJrDmQw"
API_SECRET = "gtNvPhL77qQ5zRwH8f2fkG2gjBMHxnhKNxp3nckH7C79Tb9QGPjJgsdTtpBQm6r6"

# Create OAuth1 session (for public API access without user auth)
auth = OAuth1(API_KEY, API_SECRET)

# SmugMug API endpoints
API_BASE = "https://api.smugmug.com/api/v2"

# Try to find the Yanez Family gallery
# First, let's search for the album by name
print("🔍 Searching for Yanez Family Portraits 2026...")

# Get user's albums
try:
    # First, let's try to get the album directly via the web URL pattern
    # The URL is: https://acromatico.smugmug.com/Portraits/Yanez-Family-Portraits-2026
    
    # Try to access album via API
    album_path = "/api/v2/folder/user/acromatico/Portraits!albumlist"
    
    response = requests.get(
        f"https://api.smugmug.com{album_path}",
        auth=auth,
        headers={"Accept": "application/json"}
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Got albums data")
        
        # Search for Yanez album
        albums = data.get('Response', {}).get('Album', [])
        yanez_album = None
        
        for album in albums:
            if 'Yanez' in album.get('Name', ''):
                yanez_album = album
                print(f"✅ Found album: {album['Name']}")
                print(f"   Album Key: {album.get('AlbumKey', 'N/A')}")
                break
        
        if yanez_album:
            # Get images from the album
            album_key = yanez_album['AlbumKey']
            images_url = f"https://api.smugmug.com/api/v2/album/{album_key}!images"
            
            img_response = requests.get(
                images_url,
                auth=auth,
                headers={"Accept": "application/json"}
            )
            
            if img_response.status_code == 200:
                images_data = img_response.json()
                images = images_data.get('Response', {}).get('AlbumImage', [])
                
                print(f"\n📸 Found {len(images)} images in the gallery!")
                print("\n" + "="*80)
                
                # Get full image URLs
                image_list = []
                for idx, img in enumerate(images[:30], 1):  # Get top 30
                    # Get image details
                    image_key = img.get('ImageKey')
                    if image_key:
                        # Get full image URL
                        img_detail_url = f"https://api.smugmug.com/api/v2/image/{image_key}"
                        detail_response = requests.get(
                            img_detail_url,
                            auth=auth,
                            headers={"Accept": "application/json"}
                        )
                        
                        if detail_response.status_code == 200:
                            detail_data = detail_response.json()
                            image_info = detail_data.get('Response', {}).get('Image', {})
                            
                            # Get largest size URL
                            largest_url = image_info.get('ArchivedUri') or image_info.get('Uris', {}).get('LargestImage', {}).get('Uri', '')
                            
                            if largest_url and not largest_url.startswith('http'):
                                # Get the actual image URL
                                size_response = requests.get(
                                    f"https://api.smugmug.com{largest_url}",
                                    auth=auth,
                                    headers={"Accept": "application/json"}
                                )
                                if size_response.status_code == 200:
                                    size_data = size_response.json()
                                    actual_url = size_data.get('Response', {}).get('LargestImage', {}).get('Url', '')
                                    if actual_url:
                                        image_list.append({
                                            'index': idx,
                                            'url': actual_url,
                                            'filename': image_info.get('FileName', f'yanez-{idx}.jpg'),
                                            'caption': image_info.get('Caption', ''),
                                            'keywords': image_info.get('Keywords', '')
                                        })
                                        print(f"{idx}. {actual_url}")
                
                # Save to JSON
                output_file = '/home/user/webapp/yanez_gallery_images.json'
                with open(output_file, 'w') as f:
                    json.dump(image_list, f, indent=2)
                
                print(f"\n✅ Saved {len(image_list)} image URLs to {output_file}")
                
            else:
                print(f"❌ Failed to get images: {img_response.status_code}")
                print(img_response.text)
        else:
            print("❌ Yanez album not found")
    else:
        print(f"❌ Failed to get albums: {response.status_code}")
        print(response.text)
        
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
