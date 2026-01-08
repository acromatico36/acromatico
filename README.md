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
- ✅ White Acromatico logo
- ✅ Beautiful homepage with cinematic design
- ✅ Complete database schema (19 tables)
- ✅ D1 SQLite database configured
- ✅ Video background (plays on user interaction)
- ✅ Correct schedule (11:30 AM Mon & Thu, 8 classes/month)
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
1. **Authentication System** - JWT + bcrypt with role-based access
2. **Pricing Calculator** - Daily proration + annual prepay
3. **Enrollment Flow** - Stripe integration
4. **Parent Portal** - Dashboard, children management
5. **Student Portal** - Courses, assignments, achievements
6. **Admin Dashboard** - KPIs, analytics, management

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
