# 🗺️ COMPLETE ACROMATICO PLATFORM SITEMAP & FLOW

**Last Updated**: 2026-01-24  
**Version**: 2.0  
**Base URL**: https://3000-i49aua0ijjil4k3yd5ptd-b9b802c4.sandbox.novita.ai

---

## 🏠 MAIN NAVIGATION STRUCTURE

```
┌─────────────────────────────────────────────────────────┐
│                  ACROMATICO PLATFORM                    │
│              (Multi-Revenue SaaS Model)                 │
└─────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    ACADEMY           SERVICES           CONTENT
        │                  │                  │
        │                  │                  │
```

---

## 📍 **1. ACADEMY (Education Platform)**

### Primary Page
- **URL**: `/academy`
- **Purpose**: Kids creative photography education (ages 7-14)
- **Status**: ✅ LIVE with centered transparent logo
- **Features**:
  - 12-month curriculum showcase
  - Video hero section
  - Enrollment modal (3-step flow)
  - Pricing tiers (1-4+ students)
  - Monthly vs Annual billing
  - Live class schedule info

### Supporting Pages
- **Pricing**: `/pricing` - Enrollment plans & pricing
- **FAQ**: `/faq` - Common questions
- **Curriculum**: `/curriculum` → redirects to `/academy`
- **Login**: `/login` - Student/Parent portal (Coming Soon)

**User Flow**:
```
Academy Homepage → Click "Enroll Now" → 3-Step Modal:
  Step 1: Create Account (Email + Password)
  Step 2: Select Package (1-4+ students)
  Step 3: Payment (Stripe integration)
```

---

## 🎨 **2. SERVICES**

### Studio Services
- **URL**: `/studio`
- **Status**: 🚧 Coming Soon
- **Purpose**: Professional photography sessions

### Photography Booking
- **URL**: `/photography`
- **Redirects to**: `/static/photography-apple-ux.html`
- **Status**: ✅ LIVE
- **Features**:
  - Video hero
  - Package selection
  - Booking form
  - Testimonials
  - Portfolio gallery
- **Logo**: OLD white logo (per your request)

### Art Prints Store
- **URL**: `/prints`
- **Status**: ✅ LIVE
- **Features**:
  - Product gallery
  - Shopping cart
  - Stripe checkout
  - Frame selection
  - Size options
- **Logo**: Centered transparent logo (200px desktop, 150px mobile)

---

## 📝 **3. BLOG/CONTENT (502 Posts)**

### Blog Index
- **URL**: `/static/blog-index.html`
- **Status**: ✅ LIVE
- **Features**:
  - Grid layout of all 502 posts
  - Category filtering (coming soon)
  - Search (coming soon)
  - SEO-optimized
- **Logo**: Transparent logo with Acromatico A-menu button

### Individual Blog Posts
- **URL Pattern**: `/static/blog/{post-slug}.html`
- **Total Posts**: 502
- **Categories**:
  - Weddings: ~350 posts
  - Engagements: ~80 posts
  - Family/Maternity: ~40 posts
  - Newborn: ~20 posts
  - Commercial: ~12 posts

### Featured Test Post (Madison Clone)
- **URL**: `/static/madison-clone.html`
- **Status**: ✅ LIVE - Hoffer Photography clone
- **Features**:
  - Full-screen hero
  - 71 images in 2-column masonry gallery
  - GLightbox fullscreen viewer
  - Centered transparent logo header
  - Acromatico A-logo menu button (top-right)
  - Slide-out drawer menu (400px width)
  - Mobile responsive (single column)

**Sample Blog URLs**:
- `/static/blog/madison-jordan-cork-factory-wedding.html`
- `/static/blog/rustic-barn-wedding-at-rolling-meadow-farm-sade-luke.html`
- `/static/blog/key-west-wedding-melissa-brian.html`
- `/static/blog/newborn-photography-miami-jillian.html`

---

## 🏢 **4. COMPANY PAGES**

### About Us
- **URL**: `/our-story`
- **Status**: ✅ LIVE
- **Purpose**: Team, mission, founder story

### Contact
- **URL**: `/contact`
- **Status**: 🚧 Coming Soon

### Homepage
- **URL**: `/`
- **Status**: ✅ LIVE
- **Features**:
  - Hero section
  - Portfolio showcase
  - Service overview
  - Contact CTA

---

## 🛒 **5. E-COMMERCE FLOW**

### Shopping Cart
- **URL**: `/cart`
- **Status**: ✅ LIVE
- **Features**: View/edit cart items

### Checkout
- **URL**: `/checkout`
- **Status**: ✅ LIVE
- **Features**: Stripe payment integration

### Success Page
- **URL**: `/success`
- **Status**: ✅ LIVE
- **Features**: Order confirmation

---

## 🔧 **6. BACKEND/API ROUTES**

### Health Check
- **GET** `/api/health` - Server health status

### Database Test
- **GET** `/api/db-test` - D1 database connection test

### Stripe Integration
- **POST** `/api/create-checkout` - Create Stripe checkout session
- **GET** `/api/stripe-key` - Get publishable key

### Photography Booking
- **POST** `/api/photography/book` - Submit booking form

---

## 📂 **7. FILE STRUCTURE**

```
webapp/
├── src/
│   ├── index.tsx              # Main Hono backend app
│   ├── blog-page.tsx          # Blog routes (if separate)
│   └── renderer.tsx           # JSX renderer
│
├── public/static/
│   ├── blog/                  # 502 blog post HTML files
│   │   ├── 20th-anniversary-photo-session.html
│   │   ├── madison-jordan-cork-factory-wedding.html
│   │   └── ... (500+ more)
│   │
│   ├── images/                # Image assets
│   │   ├── curriculum/        # Academy curriculum images
│   │   └── blog/              # Blog post images (hosted externally)
│   │
│   ├── blog-index.html        # Blog listing page
│   ├── madison-clone.html     # Featured test post
│   ├── photography-apple-ux.html  # Photography booking page
│   │
│   └── logos/
│       ├── acromatico-logo-transparent.png (NEW - 27KB, 1024x108)
│       ├── acromatico-logo-white.png (OLD - 142KB)
│       ├── acromatico-logo-black.png (OLD - 309KB)
│       └── acromatico-logo-dark.png (OLD - 28KB)
│
├── migrations/                # D1 database migrations
├── wrangler.jsonc            # Cloudflare Workers config
├── package.json              # Dependencies
├── ecosystem.config.cjs      # PM2 daemon config
├── SITEMAP.md                # Original sitemap
└── README.md                 # Project documentation
```

---

## 🎯 **8. LOGO IMPLEMENTATION STATUS**

### ✅ Pages with NEW Centered Transparent Logo (1024x108, 27KB):
1. `/academy` - Education platform (WHITE on dark)
2. `/prints` - Art prints store (BLACK on light)
3. `/` - Homepage (context-dependent)
4. `/static/madison-clone.html` - Blog post (WHITE on dark)
5. **All 502 blog posts** - `/static/blog/*.html` (WHITE on dark)

### 🔄 Pages with OLD White Logo (per request):
1. `/photography` → `/static/photography-apple-ux.html`

---

## 🚀 **9. USER JOURNEY FLOWS**

### **Flow A: Academy Enrollment**
```
1. Visit /academy (see curriculum)
2. Click "Enroll Now" button
3. Modal Step 1: Create account (email + password)
4. Modal Step 2: Select package (1-4+ students)
5. Modal Step 3: Payment via Stripe
6. Redirect to /login (student portal)
```

### **Flow B: Photography Booking**
```
1. Visit /photography
2. View packages & portfolio
3. Fill booking form
4. POST /api/photography/book
5. Confirmation email sent
```

### **Flow C: Art Prints Purchase**
```
1. Visit /prints
2. Browse gallery
3. Select print → choose size & frame
4. Add to cart
5. /cart → review items
6. /checkout → Stripe payment
7. /success → order confirmed
```

### **Flow D: Blog Discovery (SEO Traffic)**
```
1. Google search: "Miami wedding photographer"
2. Land on: /static/blog/miami-wedding-jessica-victor.html
3. View 2-column masonry gallery (71+ images)
4. Click "Book Your Wedding" CTA
5. → /photography or /contact
```

---

## 📊 **10. TRAFFIC DISTRIBUTION PLAN**

### Primary Landing Pages (SEO Focus):
1. **Homepage** `/` - Brand discovery
2. **Blog Index** `/static/blog-index.html` - Portfolio showcase
3. **Individual Blogs** (502 posts) - Long-tail keywords
4. **Academy** `/academy` - Education search terms
5. **Photography** `/photography` - Booking intent

### SEO Keywords by Section:
- **Academy**: "kids photography classes", "homeschool photography", "creative education for kids"
- **Photography**: "Miami wedding photographer", "Fort Lauderdale engagement photography", "Key West destination weddings"
- **Prints**: "fine art photography prints", "wedding photo prints", "custom framing"
- **Blog Posts**: Long-tail location + event keywords (e.g., "Cork Factory Hotel wedding photographer Lancaster PA")

---

## 🔄 **11. NAVIGATION MENU STRUCTURE**

### Desktop Header Navigation:
```
┌────────────────────────────────────────────────────┐
│  [Logo - Centered]                 [CTA]  [Sign In]│
└────────────────────────────────────────────────────┘
```

### Mobile Header (≤768px):
```
┌────────────────────────────────────────────────────┐
│              [Logo - Centered 150px]               │
│                   [CTA Button]                     │
└────────────────────────────────────────────────────┘
```

### Footer (Mobile Only):
```
┌────────────────────────────────────────────────────┐
│     [Sign In to Your Account →]  (Teal Glow)      │
│  © 2026 Acromatico. Built for creators, by creators.│
└────────────────────────────────────────────────────┘
```

### Blog Post Menu (Slide-out Drawer):
```
┌────────────────────┐
│ [Acromatico Logo]  │
│                    │
│ → Portfolios       │
│ → Recent Work      │
│ → About Us         │
│ → FAQ              │
│ → Reviews          │
│ → Pricing          │
│ → Contact          │
└────────────────────┘
```

---

## 🎨 **12. DESIGN SYSTEM**

### Color Palette:
- **Primary Teal**: `#4794A6` - CTA buttons, accents
- **Black**: `#000000` - Backgrounds (Academy, Blog)
- **White**: `#FFFFFF` - Text on dark backgrounds
- **Light Cream**: `rgba(253, 253, 251, 0.95)` - Prints store background
- **Gray**: `#3D3935` - Secondary text

### Typography:
- **Primary Font**: Montserrat (Blog posts)
- **System Font**: Inter (Academy, Services)
- **Headings**: Bold, 700-900 weight
- **Body**: Regular, 400 weight

### Responsive Breakpoints:
- **Desktop**: ≥769px
- **Mobile**: ≤768px
- **Logo Sizes**: 200px (desktop) / 150px (mobile)
- **Gallery**: 2 columns (desktop) / 1 column (mobile)

---

## 📈 **13. NEXT STEPS & ROADMAP**

### ✅ Completed:
1. Platform architecture (Academy + Services + Blog)
2. 502 blog posts migrated
3. New transparent logo implemented (506 files updated)
4. Madison clone test post (Hoffer layout)
5. Academy enrollment flow
6. Stripe checkout integration
7. Mobile header optimization

### ⏳ In Progress:
1. Show full Madison blog post with SEO content
2. Verify all logo implementations
3. Test enrollment flow end-to-end

### 🚧 Phase 2 (Ready):
1. Regenerate all 502 posts with Madison framework
2. Deploy to Cloudflare Pages production
3. Set up custom domain
4. GitHub repository push

### 🔮 Phase 3 (Future):
1. Blog filtering/search
2. Category pages
3. Related posts feature
4. Student portal (login system)
5. Contact form functionality
6. Studio services page

---

## 🔗 **14. QUICK REFERENCE LINKS**

### Live Pages:
- **Homepage**: https://3000-i49aua0ijjil4k3yd5ptd-b9b802c4.sandbox.novita.ai/
- **Academy**: https://3000-i49aua0ijjil4k3yd5ptd-b9b802c4.sandbox.novita.ai/academy
- **Photography**: https://3000-i49aua0ijjil4k3yd5ptd-b9b802c4.sandbox.novita.ai/photography
- **Art Prints**: https://3000-i49aua0ijjil4k3yd5ptd-b9b802c4.sandbox.novita.ai/prints
- **Blog Index**: https://3000-i49aua0ijjil4k3yd5ptd-b9b802c4.sandbox.novita.ai/static/blog-index.html
- **Madison Clone**: https://3000-i49aua0ijjil4k3yd5ptd-b9b802c4.sandbox.novita.ai/static/madison-clone.html

### Development:
- **Health Check**: https://3000-i49aua0ijjil4k3yd5ptd-b9b802c4.sandbox.novita.ai/api/health
- **DB Test**: https://3000-i49aua0ijjil4k3yd5ptd-b9b802c4.sandbox.novita.ai/api/db-test

---

## 📝 **15. TECHNICAL STACK**

### Frontend:
- **HTML5 + TailwindCSS** (via CDN)
- **Vanilla JavaScript** (no framework)
- **FontAwesome Icons** (via CDN)
- **GLightbox** (image lightbox)
- **Swiper.js** (carousels)

### Backend:
- **Hono Framework** (Cloudflare Workers)
- **Cloudflare Pages** (hosting)
- **Cloudflare D1** (SQLite database)
- **Stripe API** (payments)

### Deployment:
- **PM2** (process manager for dev)
- **Wrangler** (Cloudflare CLI)
- **Git** (version control)
- **GitHub** (repository)

---

**END OF SITEMAP**

---

This is your **complete platform architecture** Italo! 💪

Need me to adjust anything or dive deeper into any section?
