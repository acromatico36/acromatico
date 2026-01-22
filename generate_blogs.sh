#!/bin/bash
# Generate all 10 blog posts from templates

echo "🚀 GENERATING ALL 10 BLOG POSTS..."

# Will create blog posts here - placeholder for now
mkdir -p /home/user/webapp/public/static/blog

echo "✅ Blog structure ready"
echo "📝 Creating individual posts..."

# List of posts to create
posts=(
  "rustic-barn-wedding"
  "hudson-valley-engagement"
  "surprise-proposal-sarasota"
  "cold-spring-ny-wedding"
  "piano-teacher-miami"
  "family-villa-balbianello-1"
  "family-villa-balbianello-2"
  "davie-fl-wedding"
  "20th-anniversary"
  "newborn-session"
)

for post in "${posts[@]}"; do
  echo "  - $post.html"
done

echo ""
echo "✅ Total: ${#posts[@]} blog posts to generate"
