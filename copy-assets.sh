#!/bin/bash
# Copy static assets to dist after build
echo "Copying static assets to dist..."
cp -r public/static/* dist/ 2>/dev/null || true
cp public/education-*.html dist/ 2>/dev/null || true
cp public/acromatico-brand.css dist/ 2>/dev/null || true
cp public/acromatico-logo-white.png dist/ 2>/dev/null || true
echo "Assets copied!"
