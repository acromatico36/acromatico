#!/usr/bin/env python3
"""
Try alternative SmugMug access methods
"""

import requests
import json

API_KEY = "FCGHtwWkQqJ5qbpDgXd973DDpCJrDmQw"
API_SECRET = "gtNvPhL77qQ5zRwH8f2fkG2gjBMHxnhKNxp3nckH7C79Tb9QGPjJgsdTtpBQm6r6"

print("🔍 Testing SmugMug API endpoints...")
print("="*60)

# Test 1: Basic API endpoint
print("\n1. Testing basic API endpoint...")
try:
    response = requests.get("https://api.smugmug.com/api/v2", timeout=10)
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        print(f"   ✅ API is accessible")
    else:
        print(f"   ⚠️  API returned: {response.status_code}")
except Exception as e:
    print(f"   ❌ Error: {e}")

# Test 2: OAuth endpoint
print("\n2. Testing OAuth endpoint...")
try:
    response = requests.get("https://secure.smugmug.com/services/oauth/1.0a/getRequestToken", timeout=10)
    print(f"   Status: {response.status_code}")
    if response.status_code == 500:
        print(f"   ❌ OAuth service is still down")
    else:
        print(f"   Response: {response.text[:200]}")
except Exception as e:
    print(f"   ❌ Error: {e}")

# Test 3: Try public gallery access
print("\n3. Testing public gallery access...")
try:
    # Try to access a public SmugMug page
    response = requests.get("https://acromatico.smugmug.com", timeout=10)
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        print(f"   ✅ Public site is accessible")
        # Look for gallery data in HTML
        if 'data-gallery' in response.text or 'imageUrl' in response.text:
            print(f"   ✅ Found image data in page")
    else:
        print(f"   Response: {response.status_code}")
except Exception as e:
    print(f"   ❌ Error: {e}")

print("\n" + "="*60)
print("💡 RECOMMENDATION:")
print("   - SmugMug OAuth is experiencing issues")
print("   - Alternative: Use AI watermark removal instead")
print("   - Or wait for SmugMug to fix OAuth service")
