# 🗺️ ACROMATICO PLATFORM SITEMAP

## 📊 Overview
- **Total Blog Posts**: 502
- **Base URL**: https://3000-i49aua0ijjil4k3yd5ptd-b9b802c4.sandbox.novita.ai
- **Production URL**: TBD (Cloudflare Pages)

---

## 🏠 Main Pages

### Homepage
- **URL**: `/`
- **File**: `src/index.tsx`
- **Status**: ✅ Active
- **Features**: Hero section, portfolio showcase, contact form

### Blog Index
- **URL**: `/static/blog-index.html`
- **File**: `public/static/blog-index.html`
- **Status**: ✅ Active
- **Features**: Grid layout, SEO-optimized, 502 posts listed

---

## 📝 Blog Posts (502 Total)

### Recent Test Posts
1. **Madison & Jordan Clone** - `/static/madison-clone.html`
   - Status: ✅ Complete - Hoffer Photography clone
   - Features: 71 images, masonry gallery, GLightbox, Acromatico A-logo menu
   - Template for all 501 posts regeneration

### All Blog Posts
- **Location**: `public/static/blog/*.html`
- **Count**: 502 posts
- **URL Pattern**: `/static/blog/{post-slug}.html`

#### Categories Breakdown:
- **Weddings**: ~350 posts
- **Engagements**: ~80 posts
- **Family/Maternity**: ~40 posts
- **Newborn**: ~20 posts
- **Commercial**: ~12 posts

#### Sample Posts:
- `/static/blog/20th-anniversary-photo-session.html`
- `/static/blog/50th-anniversary-photography.html`
- `/static/blog/madison-jordan-cork-factory-wedding.html`
- `/static/blog/rustic-barn-wedding-at-rolling-meadow-farm-sade-luke.html`

---

## 🎨 Development/Test Pages

### Hoffer Photography Clones
1. `/static/hoffer-clone-proper.html`
2. `/static/hoffer-exact-clone.html`
3. `/static/hoffer-menu-clone.html`
4. `/static/madison-complete.html`
5. `/static/madison-full-clone.html`

### Templates
- `blog-template.html`
- `blog-post-template-new.html`
- `blog-test.html`

### Other Test Pages
- `photography-homepage-exact.html`
- `ART_PRINTS_PAGE.tsx`

---

## 🔧 Backend Structure

### API Routes (Hono)
- **File**: `src/index.tsx`
- **Framework**: Hono + Cloudflare Workers
- **Routes**:
  - `GET /` - Homepage
  - `GET /static/*` - Static files (blog posts, images, CSS/JS)
  - `GET /api/*` - API endpoints (if needed)

### Static Assets
- **Location**: `public/static/`
- **Includes**:
  - Blog posts (502 HTML files)
  - Images
  - CSS/JS files
  - Logos (acromatico-logo-black.png, acromatico-logo-white.png)

---

## 📂 Project File Structure

```
webapp/
├── src/
│   └── index.tsx              # Main Hono app
├── public/
│   └── static/
│       ├── blog/              # 502 blog post HTML files
│       ├── blog-index.html    # Blog listing page
│       ├── madison-clone.html # Latest test clone
│       ├── acromatico-logo-black.png
│       └── acromatico-logo-white.png
├── migrations/                # D1 database migrations (if needed)
├── wrangler.jsonc            # Cloudflare config
├── package.json              # Dependencies
├── ecosystem.config.cjs      # PM2 config
└── README.md                 # Project docs
```

---

## 🚀 Next Steps

### Immediate (In Progress)
1. ✅ Clone Madison Jordan post with Hoffer menu
2. ✅ Implement Acromatico A-logo as menu button
3. ⏳ Show full blog post with SEO framework
4. ⏳ Remove background from logo

### Phase 2 (Ready to Execute)
1. Regenerate all 502 posts with new framework
2. Update blog index page
3. Deploy to Cloudflare Pages
4. Set up custom domain

### Phase 3 (Future)
1. Add filtering/search to blog index
2. Implement categories/tags
3. Add related posts feature
4. Performance optimization

---

## 📈 SEO Structure

### Each Blog Post Includes:
- ✅ H1 title with couple names + location
- ✅ H2 section headings
- ✅ Intro paragraph with keywords
- ✅ Gallery with masonry layout
- ✅ Text sections between galleries
- ✅ CTA sections
- ✅ Meta tags (title, description, OG tags)

### URL Structure:
- Clean, descriptive slugs
- Keywords in URL
- No dates in URL (timeless content)

---

## 🎯 Traffic Distribution Plan

### Top Landing Pages:
1. Homepage `/`
2. Blog Index `/static/blog-index.html`
3. Individual wedding posts (502 total)

### SEO Focus Keywords:
- Miami wedding photographer
- Fort Lauderdale engagement photography
- Key West destination weddings
- South Florida family portraits
- Newborn photography Miami

---

**Last Updated**: 2026-01-23  
**Version**: 1.0  
**Status**: Active Development
