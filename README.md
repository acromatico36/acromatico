# Acromatico - Multi-Revenue SaaS Platform

## Live URL
**Sandbox:** https://3000-i2ay1vn846a1hkwkyk082-cbeee0f9.sandbox.novita.ai

## Project Overview
Multi-revenue SaaS platform for homeschool families featuring:
- Academy (photography/filmmaking education)
- Studio Services (branding/web design)
- Art Prints (limited editions)
- Wedding Photography

## Current Status ✅

### Completed
- ✅ SpaceX/Astranova-inspired dark design
- ✅ White Acromatico logo centered on all pages
- ✅ Beautiful homepage with cinematic design
- ✅ Complete database schema (19 tables)
- ✅ D1 SQLite database configured
- ✅ Video background (plays on user interaction)
- ✅ Correct schedule (11:30 AM Mon & Thu, 8 classes/month)
- ✅ **Typeform-style enrollment modal with 3 steps**
- ✅ **Monthly/Annual toggle with 20% savings**
- ✅ **Annual billing: 12 months prepaid**
- ✅ **Monthly billing: Prorated first month**
- ✅ **Order summary with savings display**
- ✅ Our Story page (/our-story)
- ✅ Sign In button on right
- ✅ Simplified navigation (logo-centric)
- ✅ Git repository with clean commit history

### Database Tables (19)
1. users - Multi-role support
2. students - Child profiles
3. subscriptions - Academy billing with proration
4. courses - Monthly curriculum
5. classes - Live sessions (11:30 AM Mon/Thu)
6. assignments
7. submissions
8. attendance
9. badges
10. invoices
11. refunds
12. studio_projects
13. art_prints
14. print_orders
15. wedding_bookings
16. blog_posts
17. email_campaigns
18. referrals
19. system_logs

## Tech Stack
- **Framework:** Hono (Cloudflare Workers)
- **Database:** Cloudflare D1 (SQLite)
- **Frontend:** TailwindCSS + JSX
- **Deployment:** Cloudflare Pages
- **Domain:** acromatico.com (pending)

## Next Steps
1. ⏳ **Stripe Integration** - Payment processing for enrollments
2. ⏳ **Authentication System** - JWT + bcrypt with role-based access
3. ⏳ **Student Forms** - Collect student details after payment
4. ⏳ **Database Storage** - Save enrollments to D1
5. ⏳ **Email Confirmation** - Send welcome emails
6. ⏳ **Parent Portal** - Dashboard, children management
7. ⏳ **Student Portal** - Courses, assignments, achievements
8. ⏳ **Admin Dashboard** - KPIs, analytics, management

## Enrollment Flow (COMPLETED ✅)
**Modal Opens on:** "Enroll Now" or "Start Creating Today" buttons

**Step 1: Create Free Account (33%)**
- Email & password
- No credit card required

**Step 2: Select Package (67%)**
- Monthly/Annual toggle (Annual = 20% off)
- 1, 2, 3, or 4+ students
- Most Popular: 2 students
- Auto-advances to payment

**Step 3: Complete Enrollment (100%)**
- Order summary
- **Monthly:** Prorated first month, then $X/mo
- **Annual:** 12 months prepaid, save $X/year
- Stripe payment form (coming soon)

**Testing:** See [ENROLLMENT_FLOW_TEST.md](./ENROLLMENT_FLOW_TEST.md)

## Video Background Note
Due to browser autoplay policies, the background video plays automatically on user interaction (click/scroll). This is standard browser behavior to respect user preferences and save bandwidth.

## Development Commands
```bash
npm run build              # Build project
npm run dev:sandbox        # Local dev with D1
pm2 start ecosystem.config.cjs  # Start with PM2
pm2 logs --nostream        # Check logs
npm run db:migrate:local   # Apply migrations
```

## Git
```bash
git status
git log --oneline
git add . && git commit -m "message"
```

---
Built for creators, by creators. © 2026 Acromatico
