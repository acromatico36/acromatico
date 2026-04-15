# ACROMATICO - Complete Page Routing Table

## 📋 How to Use This Table
Each row shows:
- **Page Name**: What the page is for
- **URL Path**: What users type in browser
- **File Location**: Where the actual HTML file is stored
- **Type**: Whether it's a static HTML file or dynamic route

---

## 🏠 Main Public Pages

| Page Name | URL Path | File Location | Type |
|-----------|----------|---------------|------|
| Homepage | `/` | `src/index.tsx` (line 3058) | Dynamic (TSX) |
| About | `/about` | `src/index.tsx` (line 8006) | Dynamic (TSX) |
| Our Story | `/our-story` | `src/index.tsx` (line 9819) | Dynamic (TSX) |
| Contact | `/contact` | `src/index.tsx` (line 9818) | Dynamic (TSX) |
| FAQ | `/faq` | `src/index.tsx` (line 9871) | Dynamic (TSX) |
| Movement | `/movement` | `src/index.tsx` (line 7618) | Dynamic (TSX) |

---

## 🎓 Education / Academy Pages

| Page Name | URL Path | File Location | Type |
|-----------|----------|---------------|------|
| Education Home | `/education` | `src/index.tsx` (line 3064) | Dynamic (TSX) |
| Academy | `/academy` | `src/index.tsx` (line 5128) | Dynamic (TSX) |
| Masterclass | `/masterclass` | `src/index.tsx` (line 4812) | Dynamic (TSX) |
| Pricing | `/pricing` | `src/index.tsx` (line 8157) | Dynamic (TSX) |
| Enroll (redirects to pricing) | `/enroll` | Redirects to `/static/pricing` | Redirect |
| Curriculum | `/curriculum` | Redirects to `/static/curriculum` | Redirect |
| Login | `/login` | Redirects to `/education/login` | Redirect |
| Education Login | `/education/login` | `src/index.tsx` (line 9797) | Dynamic (TSX) |
| Education Signup | `/education/signup` | `dist/static/education-signup.html` | Static HTML |
| Education Reset Password | `/education/reset-password` | `dist/education-reset-password.html` | Static HTML |

---

## 🎯 Assessment & Onboarding

| Page Name | URL Path | File Location | Type |
|-----------|----------|---------------|------|
| Brand Assessment | `/assessment` | `dist/static/assessment.html` | Static HTML |

---

## 👨‍🎓 Student Dashboard Pages

| Page Name | URL Path | File Location | Type |
|-----------|----------|---------------|------|
| Student Dashboard | `/student/dashboard` | `dist/static/student-dashboard.html` | Static HTML |
| Student Projects | `/student/projects` | `dist/static/student-projects.html` | Static HTML |

---

## 👨‍👩‍👧 Parent Dashboard Pages

| Page Name | URL Path | File Location | Type |
|-----------|----------|---------------|------|
| Parent Dashboard | `/parent/dashboard` | `dist/static/parent-dashboard.html` | Static HTML |

---

## 🔐 Admin Dashboard Pages

| Page Name | URL Path | File Location | Type |
|-----------|----------|---------------|------|
| Admin Dashboard | `/admin/dashboard` | `dist/static/admin-dashboard.html` | Static HTML |
| Admin Curriculum V2 | `/admin/curriculum` | `dist/static/admin-curriculum-v2.html` | Static HTML |
| Admin Curriculum Old | `/admin/curriculum/old` | `dist/static/admin-curriculum.html` | Static HTML |
| Admin CRM | `/admin/crm` | `dist/static/admin-crm.html` | Static HTML |
| Admin CRM Login | `/admin/crm/login` | `src/index.tsx` (line 11311) | Dynamic (TSX) |
| Admin CRM Dashboard | `/admin/crm/dashboard` | `dist/static/admin-crm-dashboard.html` | Static HTML |
| Admin CRM Analytics | `/admin/crm/analytics` | `dist/static/admin-crm-analytics.html` | Static HTML |
| Admin Project Pipeline | `/admin/crm/projects` | `dist/static/admin-project-pipeline.html` | Static HTML |
| TravelDRD Project | `/admin/crm/projects/traveldrd` | `dist/static/traveldrd-summary.html` | Static HTML |
| Project Roadmap | `/admin/crm/roadmap` | `dist/static/project-roadmap.html` | Static HTML |
| Debug Auth | `/debug/auth` | `dist/static/debug-auth.html` | Static HTML |

---

## 📸 Photography Services

| Page Name | URL Path | File Location | Type |
|-----------|----------|---------------|------|
| Photography Main | `/photography` | Redirects to `/static/photography-main` | Redirect |
| Portraits Booking | `/portraits/booking` | Redirects to `/static/portraits-booking` | Redirect |
| Weddings Booking | `/weddings/booking` | Redirects to `/static/weddings-booking` | Redirect |
| Events Booking | `/events/booking` | Redirects to `/static/events-booking` | Redirect |
| Real Estate Booking | `/realestate/booking` | Redirects to `/static/realestate-booking` | Redirect |
| Commercial | `/commercial` | Redirects to `/static/commercial-booking` | Redirect |
| Commercial Booking | `/commercial/booking` | Redirects to `/static/commercial-booking` | Redirect |

**Actual File Locations (in dist/static/):**
- `dist/static/photography-main.html`
- `dist/static/portraits-booking.html`
- `dist/static/weddings-booking.html`
- `dist/static/events-booking.html`
- `dist/static/realestate-booking.html`
- `dist/static/commercial-booking.html`

---

## 🎨 Studio & Creative Services

| Page Name | URL Path | File Location | Type |
|-----------|----------|---------------|------|
| Studio | `/studio` | Redirects to `/static/studio` | Redirect |
| Studio Old | `/studio-old` | `src/index.tsx` (line 6255) | Dynamic (TSX) |

**Actual File Location:**
- `dist/static/studio.html`

---

## 🖼️ Prints & Products

| Page Name | URL Path | File Location | Type |
|-----------|----------|---------------|------|
| Art Prints | `/prints` | Redirects to `/static/prints` | Redirect |
| Cart | `/cart` | `src/index.tsx` (line 9378) | Dynamic (TSX) |
| Checkout | `/checkout` | `src/index.tsx` (line 9555) | Dynamic (TSX) |
| Success | `/success` | `src/index.tsx` (line 9308) | Dynamic (TSX) |
| Invoices | `/invoices` | `src/index.tsx` (line 8532) | Dynamic (TSX) |

**Actual File Location:**
- `dist/static/prints.html`

---

## 💳 Payment Pages

| Page Name | URL Path | File Location | Type |
|-----------|----------|---------------|------|
| Payment Success | `/payment/success` | Redirects to `/static/payment-success` | Redirect |
| Payment Cancel | `/payment/cancel` | Redirects to `/static/payment-cancel` | Redirect |
| Payment Declined | `/payment/declined` | Redirects to `/static/payment-declined` | Redirect |
| Payment Success (alt) | `/payment-success` | `src/index.tsx` (line 783) | Dynamic (TSX) |
| Payment Cancel (alt) | `/payment-cancel` | `src/index.tsx` (line 857) | Dynamic (TSX) |

**Actual File Locations (in dist/static/):**
- `dist/static/payment-success.html`
- `dist/static/payment-cancel.html`
- `dist/static/payment-declined.html`

---

## 📝 Blog Pages

| Page Name | URL Path | File Location | Type |
|-----------|----------|---------------|------|
| Blog Index | `/blog` | Handled by blog router | Dynamic |
| Individual Blog Posts | `/blog/{post-slug}` | `dist/static/blog/{post-slug}.html` | Static HTML |

**Blog Post Examples (540+ total in `dist/static/blog/`):**
- `/blog/20th-anniversary-photo-session` → `dist/static/blog/20th-anniversary-photo-session.html`
- `/blog/miami-wedding-derek-shelly` → `dist/static/blog/miami-wedding-derek-shelly.html`
- `/blog/key-west-wedding-melissa-brian` → `dist/static/blog/key-west-wedding-melissa-brian.html`
- etc. (Full list available in file system)

---

## 🔧 API Endpoints (Backend Only - Not User-Facing Pages)

| API Name | URL Path | Purpose |
|----------|----------|---------|
| Spark AI | `POST /api/spark-ai` | AI chat/assistant |
| Mobile Menu | `GET /api/mobile-menu` | Mobile navigation |
| Footer | `GET /api/footer` | Footer component |
| Create Checkout | `POST /api/payments/create-checkout-session` | Stripe checkout |
| Payment Webhook | `POST /api/payments/webhook` | Stripe webhooks |
| Signup | `POST /api/auth/signup` | User registration |
| Login | `POST /api/auth/login` | User authentication |
| Auth Me | `GET /api/auth/me` | Get current user |
| Reset Password | `POST /api/auth/reset-password` | Password reset |
| Create Enrollment | `POST /api/enrollments/create` | Course enrollment |
| Stripe Key | `GET /api/stripe-key` | Get Stripe public key |
| Coming Soon Inquiry | `POST /api/coming-soon-inquiry` | Contact form |
| Health Check | `GET /api/health` | Server status |
| DB Test | `GET /api/db-test` | Database test |

*(Additional 40+ API endpoints for curriculum, student progress, admin functions, CRM, etc.)*

---

## 📊 File Count Summary

- **Total Pages**: 100+ user-facing pages
- **Blog Posts**: 540+ individual blog post HTML files
- **Static HTML Files**: 30+ main pages
- **Dynamic TSX Routes**: 25+ pages rendered by Hono
- **API Endpoints**: 60+ backend routes

---

## 🚀 Deployment Notes

### For Hostinger Upload:
1. **All files in `dist/` folder** need to be uploaded to `public_html/`
2. **Static files** (HTML, CSS, JS, images) are in `dist/static/`
3. **Blog posts** are in `dist/static/blog/`
4. **Main entry point** is `dist/_worker.js` (compiled from `src/index.tsx`)

### Path Structure on Hostinger:
```
public_html/
├── _worker.js                    (main server file)
├── _routes.json                  (routing config)
├── education-login.html
├── education-reset-password.html
├── education-signup.html
├── static/
│   ├── portraits-booking.html
│   ├── weddings-booking.html
│   ├── studio.html
│   ├── photography-main.html
│   ├── education-signup.html
│   ├── admin-crm-dashboard.html
│   ├── blog/
│   │   ├── 20th-anniversary-photo-session.html
│   │   ├── miami-wedding-derek-shelly.html
│   │   └── (538+ more blog posts)
│   └── (all other static assets)
└── (other root files)
```

---

## ✅ Quick Reference for Common Pages

**Most Important User-Facing Pages:**

1. Homepage: `/` 
2. Photography: `/photography`
3. Portraits Booking: `/portraits/booking`
4. Education Signup: `/education/signup`
5. Pricing: `/pricing`
6. Blog: `/blog`
7. About: `/about`
8. Contact: `/contact`

**Most Important Admin Pages:**

1. Admin CRM Dashboard: `/admin/crm/dashboard`
2. Admin Curriculum: `/admin/curriculum`
3. Student Dashboard: `/student/dashboard`
4. Parent Dashboard: `/parent/dashboard`

---

**Generated**: April 14, 2026  
**Platform**: Acromatico on Hostinger  
**Framework**: Hono + Cloudflare Workers → Hostinger migration
