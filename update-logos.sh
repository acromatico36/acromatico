#!/bin/bash
# Replace old logos with transparent version across all files

echo "🔄 Replacing logos across platform..."

# Find and replace in all HTML files
find ./public/static/blog -name "*.html" -type f -exec sed -i 's|/static/acromatico-logo-white\.png|/static/acromatico-logo-transparent.png|g' {} \;
find ./public/static/blog -name "*.html" -type f -exec sed -i 's|/static/acromatico-logo-black\.png|/static/acromatico-logo-transparent.png|g' {} \;

# Update any root level HTML files
find . -maxdepth 1 -name "*.html" -type f -exec sed -i 's|/static/acromatico-logo-white\.png|/static/acromatico-logo-transparent.png|g' {} \;
find . -maxdepth 1 -name "*.html" -type f -exec sed -i 's|/static/acromatico-logo-black\.png|/static/acromatico-logo-transparent.png|g' {} \;

# Update public/static HTML files
find ./public/static -maxdepth 1 -name "*.html" -type f -exec sed -i 's|/static/acromatico-logo-white\.png|/static/acromatico-logo-transparent.png|g' {} \;
find ./public/static -maxdepth 1 -name "*.html" -type f -exec sed -i 's|/static/acromatico-logo-black\.png|/static/acromatico-logo-transparent.png|g' {} \;

echo "✅ Logo replacement complete!"

# Count replacements
WHITE_COUNT=$(grep -r "acromatico-logo-white" ./public/static/blog 2>/dev/null | wc -l)
BLACK_COUNT=$(grep -r "acromatico-logo-black" ./public/static/blog 2>/dev/null | wc -l)
TRANSPARENT_COUNT=$(grep -r "acromatico-logo-transparent" ./public/static/blog 2>/dev/null | wc -l)

echo ""
echo "📊 Results:"
echo "Old white logos remaining: $WHITE_COUNT"
echo "Old black logos remaining: $BLACK_COUNT"
echo "New transparent logos: $TRANSPARENT_COUNT"
