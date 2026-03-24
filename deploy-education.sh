#!/bin/bash
set -e

echo "🎓 Building Education Platform for Deployment..."

# 1. Build normally
npm run build

# 2. Create minimal deployment folder
echo "📦 Creating minimal deployment folder..."
rm -rf dist-education
mkdir -p dist-education/static/images/curriculum

# Copy core files
cp dist/_worker.js dist-education/
cp dist/_routes.json dist-education/

# Copy education HTML pages
cp dist/static/education-login.html dist-education/static/
cp dist/static/education-signup.html dist-education/static/
cp dist/static/education-reset-password.html dist-education/static/
cp dist/static/student-dashboard.html dist-education/static/
cp dist/static/student-projects.html dist-education/static/
cp dist/static/parent-dashboard.html dist-education/static/
cp dist/static/admin-curriculum-v2.html dist-education/static/
cp dist/static/curriculum.html dist-education/static/
cp dist/static/pricing.html dist-education/static/

# Copy essential assets
cp dist/static/acromatico-logo-transparent.png dist-education/static/ 2>/dev/null || true
cp dist/static/acromatico-logo-white.png dist-education/static/ 2>/dev/null || true  
cp dist/static/acromatico-brand.css dist-education/static/ 2>/dev/null || true

# Copy education images only
cp dist/static/images/hero-education-*.jpg dist-education/static/images/ 2>/dev/null || true
cp dist/static/images/curriculum/*.jpg dist-education/static/images/curriculum/ 2>/dev/null || true
cp dist/static/images/curriculum/*.png dist-education/static/images/curriculum/ 2>/dev/null || true

# Copy robots.txt and minimal sitemap
cp dist/robots.txt dist-education/ 2>/dev/null || echo "User-agent: *" > dist-education/robots.txt
cp dist/sitemap-pages.xml dist-education/sitemap.xml 2>/dev/null || echo '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://acromatico.pages.dev/curriculum</loc></url></urlset>' > dist-education/sitemap.xml

echo "✅ Minimal bundle ready!"
echo "📊 Bundle size comparison:"
echo "Full dist: $(du -sh dist | awk '{print $1}')"
echo "Education only: $(du -sh dist-education | awk '{print $1}')"
echo ""
echo "📁 Files count:"
echo "Full dist: $(find dist -type f | wc -l)"
echo "Education only: $(find dist-education -type f | wc -l)"

