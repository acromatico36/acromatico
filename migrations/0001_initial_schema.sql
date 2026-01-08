-- ============================================
-- ACROMATICO DATABASE SCHEMA
-- Initial migration with all 19 tables
-- ============================================

-- TABLE 1: USERS
-- Core user table supporting multiple roles
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT CHECK(role IN ('student', 'parent', 'client', 'instructor', 'admin')) NOT NULL,
  first_name TEXT,
  last_name TEXT,
  stripe_customer_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);

-- TABLE 2: STUDENTS
-- Child profiles linked to parent accounts
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  parent_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INTEGER,
  grade TEXT,
  enrollment_status TEXT DEFAULT 'active' CHECK(enrollment_status IN ('active', 'paused', 'inactive')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_students_parent_id ON students(parent_id);
CREATE INDEX IF NOT EXISTS idx_students_enrollment_status ON students(enrollment_status);

-- TABLE 3: SUBSCRIPTIONS
-- Academy subscription management with proration support
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  parent_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_ids TEXT NOT NULL, -- JSON array stored as text
  num_students INTEGER NOT NULL CHECK(num_students >= 1),
  monthly_price REAL NOT NULL,
  billing_cycle TEXT CHECK(billing_cycle IN ('monthly', 'annual')) NOT NULL,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'paused', 'canceled')),
  next_billing_date DATE,
  prorated_amount REAL,
  remaining_education_months_at_signup INTEGER,
  stripe_subscription_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_parent_id ON subscriptions(parent_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_next_billing_date ON subscriptions(next_billing_date);

-- TABLE 4: COURSES
-- Monthly curriculum courses
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  title TEXT NOT NULL,
  description TEXT,
  month TEXT NOT NULL, -- e.g., "January", "March"
  year INTEGER NOT NULL,
  curriculum_summary TEXT,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published', 'archived')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_courses_month_year ON courses(month, year);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);

-- TABLE 5: CLASSES
-- Individual live class sessions (Tue-Fri 12:30 PM ET)
CREATE TABLE IF NOT EXISTS classes (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  class_date DATE NOT NULL,
  class_time TIME NOT NULL DEFAULT '12:30:00', -- 12:30 PM ET
  duration INTEGER NOT NULL, -- minutes (30 or 35)
  class_type TEXT CHECK(class_type IN ('create_inspire', 'review_think')),
  zoom_link TEXT,
  recording_url TEXT, -- Vimeo link
  recording_expires_at DATETIME, -- 7-day access from class date
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_classes_course_id ON classes(course_id);
CREATE INDEX IF NOT EXISTS idx_classes_class_date ON classes(class_date);
CREATE INDEX IF NOT EXISTS idx_classes_recording_expires_at ON classes(recording_expires_at);

-- TABLE 6: ASSIGNMENTS
-- Student assignments linked to classes
CREATE TABLE IF NOT EXISTS assignments (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  class_id TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  max_points INTEGER DEFAULT 100,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_assignments_class_id ON assignments(class_id);
CREATE INDEX IF NOT EXISTS idx_assignments_due_date ON assignments(due_date);

-- TABLE 7: SUBMISSIONS
-- Student assignment submissions with grading
CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  assignment_id TEXT NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  file_url TEXT,
  submission_text TEXT,
  grade TEXT,
  points_earned INTEGER,
  feedback TEXT,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  graded_at DATETIME,
  UNIQUE(assignment_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_submissions_assignment_id ON submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student_id ON submissions(student_id);

-- TABLE 8: ATTENDANCE
-- Class attendance tracking
CREATE TABLE IF NOT EXISTS attendance (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  class_id TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  attended BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(class_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_attendance_class_id ON attendance(class_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance(student_id);

-- TABLE 9: BADGES
-- Student achievements and badges
CREATE TABLE IF NOT EXISTS badges (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  earned_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_badges_student_id ON badges(student_id);
CREATE INDEX IF NOT EXISTS idx_badges_badge_type ON badges(badge_type);

-- TABLE 10: INVOICES
-- Billing invoices for all revenue streams
CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  subscription_id TEXT REFERENCES subscriptions(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  invoice_number TEXT UNIQUE NOT NULL,
  amount REAL NOT NULL,
  status TEXT CHECK(status IN ('draft', 'sent', 'paid', 'overdue', 'refunded')),
  pdf_url TEXT,
  stripe_invoice_id TEXT,
  issued_date DATE,
  due_date DATE,
  paid_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_subscription_id ON invoices(subscription_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);

-- TABLE 11: REFUNDS
-- Refund requests (scholarship-specific for Academy)
CREATE TABLE IF NOT EXISTS refunds (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL REFERENCES users(id),
  invoice_id TEXT REFERENCES invoices(id),
  amount REAL NOT NULL,
  reason TEXT,
  proof_url TEXT, -- StepUpForStudents proof upload
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  stripe_refund_id TEXT,
  processed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_refunds_user_id ON refunds(user_id);
CREATE INDEX IF NOT EXISTS idx_refunds_status ON refunds(status);

-- TABLE 12: STUDIO_PROJECTS
-- Client projects for studio services
CREATE TABLE IF NOT EXISTS studio_projects (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  client_id TEXT NOT NULL REFERENCES users(id),
  project_type TEXT CHECK(project_type IN ('full_brand_web', 'website_only', 'brand_strategy', 'retainer')),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'discovery' CHECK(status IN ('discovery', 'design', 'development', 'completed', 'on_hold')),
  total_cost REAL,
  deposit_amount REAL,
  balance_due REAL,
  start_date DATE,
  estimated_completion DATE,
  actual_completion DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_studio_projects_client_id ON studio_projects(client_id);
CREATE INDEX IF NOT EXISTS idx_studio_projects_status ON studio_projects(status);

-- TABLE 13: ART_PRINTS
-- Limited edition fine art prints
CREATE TABLE IF NOT EXISTS art_prints (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  title TEXT NOT NULL,
  description TEXT,
  story TEXT,
  image_url TEXT NOT NULL,
  edition_size INTEGER DEFAULT 100,
  editions_sold INTEGER DEFAULT 0,
  base_price REAL NOT NULL,
  current_price REAL NOT NULL,
  price_increment REAL DEFAULT 5.00,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'sold_out', 'archived')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_art_prints_status ON art_prints(status);
CREATE INDEX IF NOT EXISTS idx_art_prints_editions_sold ON art_prints(editions_sold);

-- TABLE 14: PRINT_ORDERS
-- Orders for limited edition prints
CREATE TABLE IF NOT EXISTS print_orders (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  print_id TEXT NOT NULL REFERENCES art_prints(id),
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  size TEXT NOT NULL,
  edition_number INTEGER NOT NULL,
  price_paid REAL NOT NULL,
  stripe_payment_id TEXT,
  shipping_address TEXT,
  tracking_number TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'printed', 'shipped', 'delivered', 'canceled')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_print_orders_print_id ON print_orders(print_id);
CREATE INDEX IF NOT EXISTS idx_print_orders_customer_email ON print_orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_print_orders_status ON print_orders(status);

-- TABLE 15: WEDDING_BOOKINGS
-- Wedding photography bookings
CREATE TABLE IF NOT EXISTS wedding_bookings (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  client_email TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT,
  wedding_date DATE NOT NULL,
  venue TEXT,
  venue_address TEXT,
  package_type TEXT,
  total_cost REAL,
  deposit_paid REAL,
  balance_due REAL,
  status TEXT DEFAULT 'inquiry' CHECK(status IN ('inquiry', 'booked', 'completed', 'canceled')),
  notes TEXT,
  contract_signed BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_wedding_bookings_wedding_date ON wedding_bookings(wedding_date);
CREATE INDEX IF NOT EXISTS idx_wedding_bookings_status ON wedding_bookings(status);
CREATE INDEX IF NOT EXISTS idx_wedding_bookings_client_email ON wedding_bookings(client_email);

-- TABLE 16: BLOG_POSTS
-- Blog content management
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT,
  tags TEXT, -- JSON array stored as text
  author_id TEXT REFERENCES users(id),
  featured_image TEXT,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published', 'archived')),
  view_count INTEGER DEFAULT 0,
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);

-- TABLE 17: EMAIL_CAMPAIGNS
-- Email marketing campaigns
CREATE TABLE IF NOT EXISTS email_campaigns (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  audience TEXT, -- JSON filter criteria stored as text
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'scheduled', 'sent', 'canceled')),
  scheduled_at DATETIME,
  sent_at DATETIME,
  recipients_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_scheduled_at ON email_campaigns(scheduled_at);

-- TABLE 18: REFERRALS
-- Referral program tracking
CREATE TABLE IF NOT EXISTS referrals (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  referrer_id TEXT NOT NULL REFERENCES users(id),
  referee_email TEXT NOT NULL,
  referee_name TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'signed_up', 'completed')),
  reward_amount REAL,
  reward_type TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);

-- TABLE 19: SYSTEM_LOGS
-- System activity and error logging
CREATE TABLE IF NOT EXISTS system_logs (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  log_type TEXT NOT NULL CHECK(log_type IN ('info', 'warning', 'error', 'security')),
  message TEXT NOT NULL,
  user_id TEXT REFERENCES users(id),
  metadata TEXT, -- JSON data stored as text
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_system_logs_log_type ON system_logs(log_type);
CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_system_logs_user_id ON system_logs(user_id);
