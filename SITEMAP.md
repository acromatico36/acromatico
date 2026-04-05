# Acromatico Complete Sitemap

**Live URL**: https://3000-i49aua0ijjil4k3yd5ptd-82b888ba.sandbox.novita.ai

---

## 🏠 Main Site

### Homepage & Core Pages
- `/` - Main homepage (Acromatico photography site)
- `/studio` - Studio services overview
- `/prints` - Art prints catalog
- `/photography` - Photography services overview page

### About & Info
- `/about` - About Acromatico
- `/our-story` - Company story
- `/contact` - Contact page
- `/blog` - Blog

---

## 📸 Photography Services & Booking Pages

### Service Overview
- `/photography` - Main photography services page with 5 service cards

### Booking Flows (Apple-style checkout with sidebar cart)
1. **Weddings** - `/weddings/booking`
   - Starting at $1,200
   - 9-step flow with custom hours option (2hr minimum)
   - Package selection, album upgrades, prints
   - Sidebar shows "Your Selection" with live pricing
   - 3 Easy Payments schedule
   - Contract signature + payment options

2. **Portraits** - `/portraits/booking`
   - Starting at $500
   - 7-step flow
   - Package selection (1-hour, 2-hour, custom)
   - Memory book add-ons
   - Prints selection with zoom modal
   - Sidebar cart with itemized pricing
   - 2 Easy Payments

3. **Events** - `/events/booking`
   - Starting at $1,200
   - 7-step enterprise flow
   - Corporate packages (half/full/extended day)
   - Team size selection (1-3 photographers)
   - Premium deliverables (rush, drone, live social)
   - Net 30 payment terms for corporate clients

4. **Commercial** - `/commercial/booking`
   - Custom pricing
   - Contact form (not Stripe checkout)
   - Product photography, brand campaigns, editorial
   - Quote request system

5. **Real Estate** - `/realestate/booking`
   - Starting at $350
   - 7-step flow
   - Property details + service selection
   - Aerial drone, twilight photos, virtual tours
   - 24-hour delivery option

---

## 🎓 Education / Academy

### Pages
- `/education` - Main education landing page
- `/academy` - Academy overview
- `/masterclass` - Masterclass details
- `/pricing` - Pricing for education programs
- `/invoices` - Invoice management
- `/faq` - Frequently asked questions

### Checkout
- `/static/education-checkout.html` - Education enrollment checkout

---

## 🔐 Admin & CRM

### Authentication
- `/admin/crm/login` - Email/password login page
  - **Credentials**: italo@acromatico.com / Acromatico2026!
  - Sets `admin_token` cookie + localStorage
  - Redirects to dashboard on success

### CRM Dashboards (Protected - requires admin token)
- `/admin/crm/dashboard` - Main CRM dashboard
- `/admin/crm/analytics` - Analytics & insights
- `/admin/crm/projects` - Project pipeline
- `/admin/crm/roadmap` - Visual roadmap
- `/admin/crm/projects/traveldrd` - TravelDRD client summary page

### CRM API Endpoints (Protected - Bearer token required)
- `POST /api/crm/login` - Login endpoint (returns JWT token)
- `GET /api/crm/clients` - List all clients
- `GET /api/crm/clients/:id` - Get client by ID
- `POST /api/crm/clients` - Create new client
- `PUT /api/crm/clients/:id` - Update client
- `GET /api/crm/tasks` - List all tasks
- `GET /api/crm/tasks/:id` - Get task by ID
- `PUT /api/crm/tasks/:id` - Update task
- `DELETE /api/crm/tasks/:id` - Delete task
- `GET /api/crm/analytics/dashboard` - Analytics data
- `POST /api/crm/message-webhook` - Twilio webhook (public)
- `POST /api/crm/process-message` - Process message

---

## 💳 Stripe Payment System

### Stripe Products (Test Mode Active)
**Photography Services:**
1. Wedding Photography - `price_1TIqnhDinAxxUzekFvej2UIZ` - $1,200
2. Portrait Photography - `price_1TIqnhDinAxxUzekZHpWCHSY` - $500
3. Event Photography - `price_1TIqniDinAxxUzekh4VgC3sy` - $1,200
4. Commercial Photography - `price_1TIqniDinAxxUzekBmAgYr8f` - $1,500
5. Real Estate Photography - `price_1TIqnjDinAxxUzek22CVTAst` - $350

### Stripe API Endpoints
- `POST /api/payments/create-checkout-session` - Create Stripe checkout
  - Requires: priceId, quantity, mode, successUrl, cancelUrl, metadata
  - Returns: { url: "https://checkout.stripe.com/..." }

### Checkout Pages (OLD - To be connected)
- `/static/photography-checkout.html` - Photography services checkout
- `/static/education-checkout.html` - Education checkout

### Payment Success/Cancel
- `/payment/success` - Payment success page
- `/payment/cancel` - Payment cancelled page

---

## 🗄️ Database (Cloudflare D1)

### Database Name
- **Local**: `acromatico-education` (SQLite in `.wrangler/state/v3/d1/`)
- **Production**: `acromatico-education`

### Main Tables
**Education:**
- users, students, subscriptions, courses, classes, assignments, submissions, attendance, badges, invoices, refunds

**Studio:**
- studio_projects, art_prints, print_orders, wedding_bookings

**Marketing:**
- blog_posts, email_campaigns, referrals, contacts, subscribers, bookings

**Projects:**
- projects, project_milestones, project_deliverables, brand_questionnaire, project_activity

**CRM:**
- crm_clients, crm_projects, crm_messages, crm_tasks, crm_client_health

**System:**
- system_logs, d1_migrations

---

## 📄 Static Assets

### HTML Pages
- `admin-crm-analytics.html`
- `admin-crm-dashboard.html`
- `admin-crm-login.html`
- `admin-project-pipeline.html`
- `commercial-booking.html`
- `education-checkout.html`
- `events-booking.html`
- `index-v2.html`
- `our-story-v2.html`
- `photography-apple-ux-backup.html`
- `photography-checkout.html`
- `photography-main.html`
- `portraits-booking.html`
- `prints.html`
- `realestate-booking.html`
- `studio-backup.html`
- `studio.html`
- `traveldrd-summary.html`
- `weddings-booking-new.html`
- `weddings-booking.html`

### JavaScript & CSS
- `/static/app.js` - Main frontend JavaScript
- `/static/styles.css` - Custom styles

---

## 🔑 Environment Variables (.dev.vars)

```
STRIPE_SECRET_KEY=sk_test_51SnJO8DinAxxUzek...
STRIPE_PUBLISHABLE_KEY=pk_test_51SnJO8DinAxxUzek...
DB_NAME=acromatico-education
GENSPARK_API_KEY=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...
```

---

## 🎯 Next Steps: Stripe Integration

### What Needs to be Connected:
1. **Wedding Booking** → Stripe Checkout (Step 7 - Payment Options)
2. **Portrait Booking** → Stripe Checkout (Step 7 - Payment Options)
3. **Events Booking** → Stripe Checkout (Step 7 - Payment Options)
4. **Real Estate Booking** → Stripe Checkout (Step 6/7 - Payment Options)
5. **Commercial Booking** → Keep as contact form (custom pricing)

### Integration Plan:
- Each booking flow already has payment step
- Need to add Stripe checkout trigger
- Pass booking data (package, add-ons, total) to Stripe
- Redirect to Stripe Checkout
- Handle success/cancel callbacks
- Store booking in database on success

---

## 📱 Footer Links (Global)

**Academy:**
- Education, Academy, Masterclass, Pricing, Invoices, FAQ

**Services:**
- Studio, Prints, Photography

**Company:**
- About, Blog, Contact

**Legal:**
- Privacy, Terms

**Admin:**
- 🔒 CRM Login

---

**Test Card**: 4242 4242 4242 4242, Exp: 12/34, CVC: 123, ZIP: 12345
