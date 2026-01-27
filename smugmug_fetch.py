#!/usr/bin/env python3
"""
Fetch unwatermarked images from SmugMug using API
Replace watermarked images in blog posts with originals
"""

import os
import sys
import json
import requests
from requests_oauthlib import OAuth1Session
import time
from urllib.parse import urlparse

# Load credentials
API_KEY = "FCGHtwWkQqJ5qbpDgXd973DDpCJrDmQw"
API_SECRET = "gtNvPhL77qQ5zRwH8f2fkG2gjBMHxnhKNxp3nckH7C79Tb9QGPjJgsdTtpBQm6r6"

# SmugMug API base URL
API_BASE = "https://api.smugmug.com/api/v2"

print("🔐 SmugMug API Authentication")
print("="*60)

# Step 1: Get Request Token
print("\n📝 Step 1: Getting request token...")
oauth = OAuth1Session(
    API_KEY,
    client_secret=API_SECRET,
    callback_uri='oob'
)

try:
    request_token_url = 'https://secure.smugmug.com/services/oauth/1.0a/getRequestToken'
    fetch_response = oauth.fetch_request_token(request_token_url)
    
    resource_owner_key = fetch_response.get('oauth_token')
    resource_owner_secret = fetch_response.get('oauth_token_secret')
    
    print(f"✅ Request token obtained!")
    print(f"   Token: {resource_owner_key[:20]}...")
    
except Exception as e:
    print(f"❌ Error getting request token: {e}")
    sys.exit(1)

# Step 2: User Authorization
print("\n🔑 Step 2: User authorization required")
print("="*60)
authorization_url = f"https://secure.smugmug.com/services/oauth/1.0a/authorize?oauth_token={resource_owner_key}&Access=Full&Permissions=Read"
print(f"\n📋 Please visit this URL and authorize the application:")
print(f"\n{authorization_url}\n")
print("After authorization, you'll receive a 6-digit verification code.")
oauth_verifier = input("Enter the verification code: ").strip()

# Step 3: Get Access Token
print("\n🎫 Step 3: Getting access token...")
oauth = OAuth1Session(
    API_KEY,
    client_secret=API_SECRET,
    resource_owner_key=resource_owner_key,
    resource_owner_secret=resource_owner_secret,
    verifier=oauth_verifier
)

try:
    access_token_url = 'https://secure.smugmug.com/services/oauth/1.0a/getAccessToken'
    oauth_tokens = oauth.fetch_access_token(access_token_url)
    
    access_token = oauth_tokens.get('oauth_token')
    access_token_secret = oauth_tokens.get('oauth_token_secret')
    
    print(f"✅ Access token obtained!")
    print(f"   Token: {access_token[:20]}...")
    
    # Save tokens for future use
    with open('.env.smugmug.tokens', 'w') as f:
        json.dump({
            'access_token': access_token,
            'access_token_secret': access_token_secret
        }, f)
    print("✅ Tokens saved to .env.smugmug.tokens")
    
except Exception as e:
    print(f"❌ Error getting access token: {e}")
    sys.exit(1)

# Step 4: Test API Access
print("\n🧪 Step 4: Testing API access...")
oauth = OAuth1Session(
    API_KEY,
    client_secret=API_SECRET,
    resource_owner_key=access_token,
    resource_owner_secret=access_token_secret
)

try:
    # Get user info
    response = oauth.get(f"{API_BASE}/!authuser")
    if response.status_code == 200:
        user_data = response.json()
        user = user_data['Response']['User']
        print(f"✅ Successfully authenticated!")
        print(f"   User: {user.get('NickName', 'N/A')}")
        print(f"   Name: {user.get('Name', 'N/A')}")
        
        # Get user's galleries/folders
        print("\n📁 Fetching your galleries...")
        user_uri = user['Uris']['UserAlbums']['Uri']
        albums_response = oauth.get(f"{API_BASE}{user_uri}")
        
        if albums_response.status_code == 200:
            albums_data = albums_response.json()
            albums = albums_data['Response'].get('Album', [])
            print(f"✅ Found {len(albums)} albums/galleries")
            
            # Show first 10 albums
            print("\n📋 Sample albums:")
            for i, album in enumerate(albums[:10]):
                print(f"   {i+1}. {album.get('Name', 'Untitled')} - {album.get('ImageCount', 0)} images")
        else:
            print(f"⚠️  Could not fetch albums: {albums_response.status_code}")
            
    else:
        print(f"❌ Authentication failed: {response.status_code}")
        print(response.text)
        sys.exit(1)
        
except Exception as e:
    print(f"❌ Error testing API: {e}")
    sys.exit(1)

print("\n" + "="*60)
print("🎉 SMUGMUG API SETUP COMPLETE!")
print("="*60)
print("\nNext steps:")
print("1. Map blog posts to SmugMug galleries")
print("2. Fetch unwatermarked originals for each image")
print("3. Update blog posts with new URLs")
