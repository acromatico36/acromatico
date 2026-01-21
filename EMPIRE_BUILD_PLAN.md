# ACROMATICO EMPIRE - FULL SYSTEM ARCHITECTURE

## PHASE 1: PHOTOGRAPHY PAGE COMPLETION ✅
- [x] Apple/Tesla-style portfolio masonry gallery
- [x] Robust footer (logo, nav, social, contact)
- [x] Complete user flow: Hero → Portfolio → Pricing → Footer

## PHASE 2: CLIENT PORTAL SYSTEM 🚀
### Authentication & Access
- User registration (email/password)
- Secure login with JWT tokens
- Password reset flow
- Email verification

### Client Dashboard
- **Booking Overview Card**
  - Package name, date, photographer
  - Total investment, paid vs. remaining
  - Next payment due date
- **Journey Roadmap** (Visual timeline)
  - Booking Confirmed ✓
  - Contract Signed ✓
  - First Payment ✓
  - Engagement Session (if included)
  - Final Payment
  - Wedding Day
  - Photos Delivered
- **Quick Actions**
  - View/Download Contract
  - Make Payment
  - View Gallery
  - Message Team
  - Reschedule

### Contract Management
- View signed contract PDF
- Download contract
- Contract status: Pending → Signed → Complete
- Digital signature capture
- Timestamp and tracking

### Payment Tracker
- Visual progress bar (paid vs. total)
- Installment schedule with dates
- Payment history with receipts
- Next payment reminder
- Pay now button (Stripe integration)
- Invoice downloads

### Gallery Access
- Private client gallery
- View all delivered photos
- Download high-res images
- Favorites/selections
- Share gallery link
- Print ordering

### Milestone Timeline
- Interactive visual roadmap
- Current phase highlighted
- Upcoming milestones
- Past completions with dates
- Automated email notifications at each stage

## PHASE 3: DATABASE ARCHITECTURE (D1)
### Tables Schema

**users**
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME,
  email_verified BOOLEAN DEFAULT 0
);
```

**bookings**
```sql
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  contract_number TEXT UNIQUE NOT NULL,
  package_name TEXT NOT NULL,
  session_type TEXT NOT NULL, -- 'wedding' or 'portrait'
  event_date DATE NOT NULL,
  ceremony_venue TEXT,
  reception_venue TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'completed'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**payments**
```sql
CREATE TABLE payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER NOT NULL,
  installment_number INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATETIME,
  status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'late'
  payment_method TEXT,
  transaction_id TEXT,
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
```

**contracts**
```sql
CREATE TABLE contracts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER NOT NULL,
  contract_pdf_url TEXT,
  signature_data TEXT,
  signed_date DATETIME,
  status TEXT DEFAULT 'pending', -- 'pending', 'signed'
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
```

**milestones**
```sql
CREATE TABLE milestones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER NOT NULL,
  milestone_name TEXT NOT NULL,
  milestone_type TEXT NOT NULL, -- 'payment', 'session', 'delivery', etc.
  due_date DATE,
  completed_date DATETIME,
  status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'completed'
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
```

**galleries**
```sql
CREATE TABLE galleries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER NOT NULL,
  gallery_url TEXT NOT NULL,
  total_photos INTEGER DEFAULT 0,
  delivery_date DATETIME,
  expiration_date DATETIME,
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
```

## PHASE 4: BACKEND API ROUTES
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/client/dashboard
- GET /api/client/booking/:id
- GET /api/client/payments/:bookingId
- POST /api/client/payment
- GET /api/client/contract/:bookingId
- GET /api/client/gallery/:bookingId
- GET /api/client/timeline/:bookingId

## TECH STACK
- **Frontend:** Vanilla JS, TailwindCSS, Inter font
- **Backend:** Hono (Cloudflare Workers)
- **Database:** Cloudflare D1 (SQLite)
- **Auth:** JWT tokens, bcrypt hashing
- **Payments:** Stripe integration
- **Storage:** Cloudflare R2 (contracts, photos)
- **Email:** SendGrid/Resend for notifications

## REVENUE IMPACT
- **Average booking:** $6,000
- **30 weddings/year:** $180,000
- **Portal automation:** Saves 10hrs/week (client management)
- **Client satisfaction:** Premium experience = referrals

## DEPLOYMENT
1. D1 database setup + migrations
2. Auth system deployment
3. Client portal routes
4. Photography page v2 with portfolio
5. Integration testing
6. Production launch

This is a MULTI-MILLION DOLLAR SYSTEM.
McKinsey-level architecture. Apple-level UX. Tesla-level innovation.

Let's fucking build it. 🚀
