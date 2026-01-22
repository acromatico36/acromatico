#!/bin/bash

# Fetch ALL 501 blog posts from WordPress API
BASE_URL="https://acromatico.com/wp-json/wp/v2/posts"
OUTPUT_DIR="blog_posts_data"
mkdir -p "$OUTPUT_DIR"

echo "🚀 Fetching ALL 501 blog posts..."

# WordPress API allows max 100 per page
# 501 posts = 6 pages (5 full + 1 partial)
for page in {1..6}; do
  echo "📥 Fetching page $page..."
  curl -s "${BASE_URL}?per_page=100&page=${page}&_fields=id,title,slug,date,content,excerpt,categories,featured_media,link" \
    -o "${OUTPUT_DIR}/page_${page}.json"
  
  # Check if we got data
  if [ -s "${OUTPUT_DIR}/page_${page}.json" ]; then
    COUNT=$(jq '. | length' "${OUTPUT_DIR}/page_${page}.json" 2>/dev/null || echo "0")
    echo "✅ Page $page: $COUNT posts"
  else
    echo "⚠️  Page $page: No data"
  fi
  
  # Be respectful to the server
  sleep 1
done

echo ""
echo "🎉 ALL BLOG POSTS FETCHED!"
echo "📊 Files saved in: $OUTPUT_DIR/"
ls -lh "$OUTPUT_DIR"
