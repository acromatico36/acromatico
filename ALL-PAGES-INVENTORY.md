# 📄 COMPLETE PAGE INVENTORY - ACROMATICO PLATFORM

**Last Updated**: 2026-01-24  
**Platform**: Acromatico Multi-Revenue SaaS  
**Base URL**: https://3000-i49aua0ijjil4k3yd5ptd-b9b802c4.sandbox.novita.ai

---

## 🎓 ACADEMY SECTION

### Backend Routes (src/index.tsx)
1. **`/academy`** ✅ LIVE
   - **Purpose**: 12-month kids creative photography curriculum
   - **Features**: 
     - Hero with gradient title
     - Monthly curriculum showcase (Jan-Dec)
     - Video curriculum demo
     - 3-step enrollment modal
     - Pricing tiers (1-4+ students)
     - Monthly vs Annual billing
   - **Logo**: Centered transparent (200px desktop, 150px mobile, WHITE filter)
   - **Content**: 
     - JANUARY: Finding Your Eye (Rule of Thirds, Leading Lines)
     - FEBRUARY: Light & Shadow (Golden Hour)
     - MARCH: Video Basics (Motion capture)
     - APRIL: Portrait Photography (Connection)
     - MAY: Street Photography (Decisive moments)
     - JUNE: Photo Essay Project (First major project)
     - SEPTEMBER: Advanced Composition (Breaking rules)
     - OCTOBER: Photo Editing Mastery (Lightroom)
     - NOVEMBER: Portfolio Building (Curation)
     - DECEMBER: Year-End Showcase (Celebration)

2. **`/pricing`** ✅ LIVE
   - **Purpose**: Academy enrollment pricing
   - **Tiers**:
     - 1 Student: $116/mo (monthly) or $93/mo (annual)
     - 2 Students: $99/mo (monthly) or $79/mo (annual) - Most Popular
     - 3 Students: $89/mo (monthly) or $71/mo (annual)
     - 4+ Students: $79/mo (monthly) or $63/mo (annual)
   - **Features**: Proration calculator, annual savings display
   - **Logo**: Centered transparent

3. **`/curriculum`** ✅ LIVE (redirects to `/academy`)
   - **Purpose**: Alias for academy page

4. **`/faq`** ✅ LIVE
   - **Purpose**: Frequently asked questions
   - **Logo**: Centered transparent

5. **`/login`** 🚧 Coming Soon
   - **Purpose**: Student/Parent portal login
   - **Status**: Placeholder page

### Static HTML Pages
6. **`/static/our-story.html`** ✅ LIVE
   - **Purpose**: Company story, founder bios
   - **Content**: Team photos, mission, timeline
   - **Logo**: Check status

7. **`/static/our-story-new.html`** ✅ LIVE (Version 2)
   - **Purpose**: Updated version of Our Story
   - **Logo**: Check status

8. **`/static/our-story-v2.html`** ✅ LIVE (Version 3)
   - **Purpose**: Another iteration of Our Story
   - **Logo**: Check status

---

## 📸 PHOTOGRAPHY SECTION

### Backend Routes
9. **`/photography`** ✅ LIVE
   - **Redirects to**: `/static/photography-apple-ux.html`
   - **Purpose**: Wedding & event photography booking
   - **Features**:
     - Full-screen video hero
     - Package selection
     - Booking form
     - Testimonials
     - Portfolio carousel
     - Price calculator
   - **Logo**: OLD white logo (per request)
   - **API**: `POST /api/photography/book`

### Static HTML Pages
10. **`/static/photography-apple-ux.html`** ✅ LIVE (Main)
    - **Purpose**: Primary photography booking page
    - **Style**: Apple-inspired UX
    - **Logo**: OLD white logo

11. **`/static/photography-apple-ux-backup.html`** ✅ ARCHIVED
    - **Purpose**: Backup version

12. **`/static/photography-apple-ux-backup-20260121-200647.html`** ✅ ARCHIVED
    - **Purpose**: Timestamped backup

13. **`/static/photography.html`** ✅ LEGACY
    - **Purpose**: Original photography page

14. **`/static/photography-clean.html`** ✅ TEST
    - **Purpose**: Simplified version

15. **`/static/photography-checkout.html`** ✅ TEST
    - **Purpose**: Checkout flow test

---

## 🎨 ART PRINTS SECTION

### Backend Routes
16. **`/prints`** ✅ LIVE
    - **Purpose**: Fine art photography prints store
    - **Features**:
      - Product gallery
      - Size selection (16x20, 24x30, 30x40)
      - Frame options
      - Shopping cart
      - Edition counter (X of 95)
      - Stripe checkout
    - **Logo**: Centered transparent (BLACK on light cream background)
    - **Header**: Light cream glass navbar

---

## 🏢 COMPANY PAGES

### Backend Routes
17. **`/`** (Homepage) ✅ LIVE
    - **Purpose**: Platform homepage
    - **Features**:
      - Hero section
      - Service overview (Academy, Studio, Prints, Photography)
      - Portfolio showcase
      - Testimonials
      - Contact CTA
    - **Logo**: Centered transparent

18. **`/about`** ✅ LIVE
    - **Purpose**: About Acromatico (alias for /our-story)
    - **Logo**: Centered transparent

19. **`/our-story`** ✅ LIVE
    - **Purpose**: Company story, founder bios (Italo & Ale)
    - **Content**:
      - Founder Story (Italo)
      - Mission & Vision
      - Team Bios
      - Company Timeline
      - Contact CTA
    - **Logo**: Centered transparent

20. **`/contact`** 🚧 Coming Soon
    - **Purpose**: Contact form
    - **Planned**: Name, Email, Subject, Message, Submit

### Static HTML Pages
21. **`/static/index.html`** ✅ LEGACY
    - **Purpose**: Original homepage HTML

22. **`/static/index-v2.html`** ✅ VERSION 2
    - **Purpose**: Updated homepage

23. **`/static/index-real.html`** ✅ VERSION 3
    - **Purpose**: Another homepage iteration

24. **`/static/homepage-exact-clone.html`** ✅ TEST
    - **Purpose**: Homepage clone test

25. **`/static/homepage-perfect-clone.html`** ✅ TEST
    - **Purpose**: Refined homepage clone

---

## 🎬 STUDIO SECTION

### Backend Routes
26. **`/studio`** 🚧 Coming Soon
    - **Purpose**: Studio services (branding, web design, video)
    - **Planned Packages**:
      - Full Brand + Web: $6.5K–$9.9K
      - Website Only: $3.5K–$5.5K
      - Brand Strategy Only: $1.5K–$3.5K
      - Ongoing Management/Retainer
    - **Status**: Placeholder page

---

## 📝 BLOG SECTION (502 POSTS)

### Blog Index
27. **`/static/blog-index.html`** ✅ LIVE
    - **Purpose**: Grid of all 502 blog posts
    - **Features**:
      - Responsive grid layout
      - Post thumbnails
      - SEO-optimized
      - Category filtering (planned)
      - Search (planned)
    - **Logo**: Transparent with A-menu button

### Blog Templates
28. **`/static/blog-template.html`** ✅ TEMPLATE
    - **Purpose**: Base template for blog posts

29. **`/static/blog-test.html`** ✅ TEST
    - **Purpose**: Blog layout testing

### Featured Test Post
30. **`/static/madison-clone.html`** ✅ LIVE - **HOFFER PHOTOGRAPHY CLONE**
    - **Purpose**: Showcase post with full features
    - **Features**:
      - Full-screen hero image
      - Fixed header with centered transparent logo (WHITE)
      - Acromatico "A" logo menu button (top-right)
      - 400px slide-out drawer menu
      - 2-column masonry gallery (desktop)
      - Single column (mobile)
      - 71 images with GLightbox viewer
      - Fullscreen navigation
      - Keyboard controls
      - Text sections interleaved with galleries
      - SEO-optimized
    - **Menu Links**:
      - Portfolios (/)
      - Recent Work (/blog)
      - About Us (/about)
      - FAQ (/faq)
      - Reviews (/reviews)
      - Pricing (/pricing)
      - Contact (/contact)
    - **Logo**: Centered transparent header + full logo in drawer

### All Blog Posts (502 Total)
31. **`/static/blog/*.html`** (502 FILES) ✅ LIVE
    - **URL Pattern**: `/static/blog/{post-slug}.html`
    - **Categories**:
      - **Weddings**: ~350 posts
      - **Engagements**: ~80 posts
      - **Family/Maternity**: ~40 posts
      - **Newborn**: ~20 posts
      - **Commercial**: ~12 posts
    - **Sample URLs**:
      - `/static/blog/20th-anniversary-photo-session.html`
      - `/static/blog/madison-jordan-cork-factory-wedding.html`
      - `/static/blog/rustic-barn-wedding-at-rolling-meadow-farm-sade-luke.html`
      - `/static/blog/key-west-wedding-melissa-brian.html`
      - `/static/blog/newborn-photography-miami-jillian.html`
    - **Logo**: All 502 posts use transparent logo with A-menu button

### Blog Development/Test Pages
32. **`/static/hoffer-final.html`** ✅ TEST
    - **Purpose**: Hoffer Photography layout test

33. **`/static/hoffer-menu-test.html`** ✅ TEST
    - **Purpose**: Menu system test

34. **`/static/mobile-gallery-test.html`** ✅ TEST
    - **Purpose**: Mobile gallery responsive test

35. **`/static/mobile-test-simple.html`** ✅ TEST
    - **Purpose**: Simplified mobile test

36. **`/static/test-lightbox.html`** ✅ TEST
    - **Purpose**: GLightbox integration test

37. **`/static/css-debug-test.html`** ✅ DEBUG
    - **Purpose**: CSS debugging

---

## 🛒 E-COMMERCE FLOW

### Backend Routes
38. **`/cart`** ✅ LIVE
    - **Purpose**: Shopping cart view/edit
    - **Features**: 
      - View cart items
      - Update quantities
      - Remove items
      - Calculate totals
    - **Logo**: Centered transparent

39. **`/checkout`** ✅ LIVE
    - **Purpose**: Stripe checkout
    - **Features**:
      - Order summary
      - Payment form
      - Billing address
      - Terms acceptance
    - **API**: `POST /api/create-checkout`
    - **Logo**: Centered transparent

40. **`/success`** ✅ LIVE
    - **Purpose**: Order confirmation
    - **Features**:
      - Success message
      - Order details
      - Next steps
      - Invoice download
    - **Logo**: Centered transparent

---

## 🔧 API ROUTES

41. **`GET /api/health`** ✅ LIVE
    - **Purpose**: Server health check
    - **Response**: JSON status

42. **`GET /api/db-test`** ✅ LIVE
    - **Purpose**: D1 database connection test
    - **Response**: Database status

43. **`POST /api/create-checkout`** ✅ LIVE
    - **Purpose**: Create Stripe checkout session
    - **Body**: Items array (name, size, frame, price)
    - **Response**: Checkout session ID

44. **`GET /api/stripe-key`** ✅ LIVE
    - **Purpose**: Get Stripe publishable key
    - **Response**: Key string

45. **`POST /api/photography/book`** ✅ LIVE
    - **Purpose**: Submit photography booking form
    - **Body**: Name, email, date, package, message
    - **Response**: Confirmation

---

## 📊 LOGO STATUS BY PAGE

### ✅ NEW Centered Transparent Logo (1024x108, 27KB, RGBA):
- `/academy` (WHITE on dark, 200px/150px)
- `/prints` (BLACK on light, 200px/150px)
- `/` - Homepage (context-dependent)
- `/pricing` (WHITE on dark)
- `/faq` (WHITE on dark)
- `/cart` (context-dependent)
- `/checkout` (context-dependent)
- `/success` (context-dependent)
- **All 502 blog posts** - `/static/blog/*.html` (WHITE on dark, header + menu)
- `/static/madison-clone.html` (WHITE on dark, header + menu)

### 🔄 OLD White Logo (142KB PNG):
- `/static/photography-apple-ux.html` (per your request to keep old logo)

### ⚠️ Logo Status Unknown (Need to Check):
- `/static/our-story.html`
- `/static/our-story-new.html`
- `/static/our-story-v2.html`
- `/static/index.html`
- `/static/index-v2.html`
- `/static/index-real.html`

---

## 📈 TOTAL PAGE COUNT

### Live Production Pages: **47**
- Academy Section: 5 pages (4 live + 1 coming soon)
- Photography Section: 6 pages (1 main + 5 test/backup)
- Art Prints Section: 1 page
- Company Pages: 6 pages (4 live + 2 coming soon)
- Studio Section: 1 page (coming soon)
- Blog Index: 1 page
- Blog Posts: 502 pages
- Featured Test Post: 1 page (Madison Clone)
- E-commerce: 3 pages
- API Endpoints: 5 routes
- Test/Development: 14 pages

### Total: **545 Pages**
- **529 Live Pages** (47 main + 502 blog posts)
- **16 Test/Development Pages**
- **5 API Endpoints**
- **2 Coming Soon Placeholders**

---

## 🔍 MISSING PAGES YOU MENTIONED

**Italo & Ale Educators Page**: 
- ❌ NOT FOUND in current codebase
- **Possible locations checked**:
  - `/about` (backend route exists but may not have educator section)
  - `/static/our-story.html` (exists but need to verify content)
  - `/static/our-story-new.html` (exists but need to verify content)
  - `/static/our-story-v2.html` (exists but need to verify content)

**Action Required**: 
- Need to read the `/static/our-story*.html` files to find Italo & Ale educator content
- May need to CREATE a dedicated `/educators` or `/team` page

---

## 🚀 NEXT STEPS

1. **Read all our-story pages** to find Italo & Ale educator content
2. **Verify logo status** on all static HTML pages
3. **Identify missing Academy pages** (educators, team, etc.)
4. **Update SITEMAP.md** with corrected inventory
5. **Add missing pages** if needed

---

**Italo - I'll now search for the educators page with your and Ale's bios!**
