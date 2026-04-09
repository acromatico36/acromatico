-- ============================================================
-- COMPLETE EDUCATION DATABASE INIT
-- User accounts, enrollments, and agreements
-- ============================================================

-- Users table (parents/students)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('parent', 'student', 'instructor', 'admin')),
  first_name TEXT,
  last_name TEXT,
  stripe_customer_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Students table (children of parents)
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  parent_id TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INTEGER,
  grade_level TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price REAL DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Enrollments table with agreement tracking
CREATE TABLE IF NOT EXISTS enrollments (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  student_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  progress_percentage REAL DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'completed', 'dropped')),
  
  -- Agreement tracking
  agreement_signed INTEGER DEFAULT 0,
  agreement_version TEXT DEFAULT 'v1.0',
  signature_method TEXT, -- 'type' or 'draw'
  signature_data TEXT, -- typed name or base64 canvas data
  signature_timestamp DATETIME,
  signature_ip_address TEXT,
  
  -- Billing info
  billing_type TEXT, -- 'Monthly' or 'Annual'
  students_count INTEGER DEFAULT 1,
  monthly_total REAL,
  stripe_session_id TEXT,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  
  UNIQUE(student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_stripe ON enrollments(stripe_session_id);

-- Insert default course (Creator Academy)
INSERT OR IGNORE INTO courses (id, title, description, category, price)
VALUES (
  'course-creator-academy',
  'Creator Academy - Youth Photography & Filmmaking',
  '8 live classes per month (Mon & Thu, 11:30 AM ET). 30-minute micro-learning sessions for ages 10-17.',
  'photography',
  100.00
);
