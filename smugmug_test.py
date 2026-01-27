#!/usr/bin/env python3
"""
Fetch SmugMug albums and images using simple API key (no OAuth needed for public data)
"""

import requests
import json
import time

API_KEY = "FCGHtwWkQqJ5qbpDgXd973DDpCJrDmQw"
API_BASE = "https://api.smugmug.com/api/v2"

print("🔍 SmugMug Simple API Access (Public Data)")
print("="*60)

# Step 1: Get user info
print("\n📝 Step 1: Getting user info...")
try:
    response = requests.get(
        f"{API_BASE}/user/acromatico",
        params={"APIKey": API_KEY},
        headers={"Accept": "application/json"},
        timeout=10
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
        
        # Save user info
        with open('smugmug_user.json', 'w') as f:
            json.dump(user, f, indent=2)
        
    else:
        print(f"❌ Error: {response.status_code}")
        print(response.text[:500])
        exit(1)
        
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)

print("\n" + "="*60)
print("✅ SUCCESS! SmugMug API is working!")
print("="*60)
print("\nNext: I'll fetch all albums and map them to blog posts")
