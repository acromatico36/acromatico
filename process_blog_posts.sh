#!/bin/bash

echo "🔄 Merging all blog posts into single file..."

# Combine all pages into one array
jq -s 'add' blog_posts_data/page_*.json > blog_posts_data/all_posts.json

# Count total
TOTAL=$(jq '. | length' blog_posts_data/all_posts.json)
echo "✅ Total posts merged: $TOTAL"

# Get category breakdown
echo ""
echo "📊 BLOG POST BREAKDOWN:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Extract unique slugs for analysis (first 20)
echo ""
echo "📝 Sample post titles:"
jq -r '.[0:20] | .[] | "  • \(.title.rendered)"' blog_posts_data/all_posts.json

echo ""
echo "🎯 Ready to generate HTML files!"
