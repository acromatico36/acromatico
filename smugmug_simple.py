#!/usr/bin/env python3
"""
Fetch SmugMug albums and images using simple API key authentication
No OAuth needed for public galleries!
"""

import requests
import json
import time

API_KEY = "FCGHtwWkQqJ5qbpDgXd973DDpCJrDmQw"
API_BASE = "https://api.smugmug.com/api/v2"

print("🔍 SmugMug Simple API Access")
print("="*60)

# Step 1: Get user info
print("\n📝 Step 1: Getting user info...")
try:
    response = requests.get(
        f"{API_BASE}/user/acromatico",
        params={"APIKey": API_KEY},
        headers={"Accept": "application/json"}
    )
    
    if response.status_code == 200:
        data = response.json()
        user = data['Response']['User']
        print(f"✅ User found: {user.get('Name', 'N/A')}")
        print(f"   NickName: {user.get('NickName')}")
        print(f"   WebUri: {user.get('WebUri')}")
        
        # Get albums URI
        albums_uri = user['Uris']['UserAlbums']['Uri']
        print(f"   Albums URI: {albums_uri}")
        
    else:
        print(f"❌ Error: {response.status_code}")
        print(response.text)
        exit(1)
        
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)

# Step 2: Get all albums
print("\n📁 Step 2: Fetching all albums...")
try:
    response = requests.get(
        f"{API_BASE}{albums_uri}",
        params={"APIKey": API_KEY},
        headers={"Accept": "application/json"}
    )
    
    if response.status_code == 200:
        data = response.json()
        albums = data['Response']['Album']
        print(f"✅ Found {len(albums)} albums")
        
        # Save albums list
        albums_data = []
        for album in albums[:20]:  # Show first 20
            album_info = {
                'name': album.get('Name'),
                'key': album.get('AlbumKey'),
                'image_count': album.get('ImageCount', 0),
                'uri': album.get('Uri'),
                'web_uri': album.get('WebUri')
            }
            albums_data.append(album_info)
            print(f"   - {album_info['name']}: {album_info['image_count']} images")
        
        # Save to file
        with open('smugmug_albums.json', 'w') as f:
            json.dump({
                'total_albums': len(albums),
                'albums': albums_data,
                'all_albums': albums
            }, f, indent=2)
        
        print(f"\n✅ Saved album list to smugmug_albums.json")
        
    else:
        print(f"❌ Error fetching albums: {response.status_code}")
        print(response.text)
        exit(1)
        
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)

# Step 3: Get images from first album as test
if albums:
    print("\n🖼️  Step 3: Testing image fetch from first album...")
    test_album = albums[0]
    album_key = test_album.get('AlbumKey')
    
    try:
        # Get album details with images
        response = requests.get(
            f"{API_BASE}/album/{album_key}!images",
            params={"APIKey": API_KEY},
            headers={"Accept": "application/json"}
        )
        
        if response.status_code == 200:
            data = response.json()
            images = data['Response']['AlbumImage']
            print(f"✅ Found {len(images)} images in '{test_album.get('Name')}'")
            
            # Show first 3 images
            print(f"\n📸 Sample images:")
            for i, img in enumerate(images[:3]):
                print(f"   {i+1}. File: {img.get('FileName')}")
                print(f"      ImageKey: {img.get('ImageKey')}")
                print(f"      ArchivedUri: {img.get('ArchivedUri')}")
                
                # Get full image details to find original URL
                img_uri = img.get('Uri')
                img_response = requests.get(
                    f"{API_BASE}{img_uri}",
                    params={"APIKey": API_KEY},
                    headers={"Accept": "application/json"}
                )
                
                if img_response.status_code == 200:
                    img_data = img_response.json()
                    img_obj = img_data['Response']['Image']
                    
                    # Try to get original/largest size
                    if 'Uris' in img_obj and 'LargestImage' in img_obj['Uris']:
                        largest_uri = img_obj['Uris']['LargestImage']['Uri']
                        largest_response = requests.get(
                            f"{API_BASE}{largest_uri}",
                            params={"APIKey": API_KEY},
                            headers={"Accept": "application/json"}
                        )
                        if largest_response.status_code == 200:
                            largest_data = largest_response.json()
                            largest_url = largest_data['Response']['LargestImage'].get('Url')
                            print(f"      Original URL: {largest_url}")
                
                print()
                
        else:
            print(f"❌ Error fetching images: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

print("\n" + "="*60)
print("🎉 SMUGMUG API ACCESS WORKING!")
print("="*60)
print("\nNext steps:")
print("1. Map blog post titles to SmugMug album names")
print("2. Fetch original unwatermarked images for each album")
print("3. Replace watermarked URLs in blog posts")
