-- LIVE CLASSES SYSTEM MIGRATION
-- This creates the complete workflow for live class enrollment, scheduling, attendance

-- 1. ENROLLMENTS TABLE (tracks which students are enrolled in which courses)
CREATE TABLE IF NOT EXISTS enrollments (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'completed', 'dropped')),
  progress INTEGER DEFAULT 0, -- 0-100 percentage
  UNIQUE(student_id, course_id)
);

-- 2. LIVE_CLASSES TABLE (scheduled live class sessions)
CREATE TABLE IF NOT EXISTS live_classes (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  class_number INTEGER NOT NULL, -- Lesson 1, 2, 3, etc.
  title TEXT NOT NULL,
  description TEXT,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  meeting_link TEXT, -- Zoom/Google Meet link
  meeting_password TEXT,
  instructor_notes TEXT,
  status TEXT DEFAULT 'scheduled' CHECK(status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. CLASS_ATTENDANCE TABLE (track who attended which live classes)
CREATE TABLE IF NOT EXISTS class_attendance (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  live_class_id TEXT NOT NULL REFERENCES live_classes(id) ON DELETE CASCADE,
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'registered' CHECK(status IN ('registered', 'present', 'absent', 'excused')),
  joined_at DATETIME,
  left_at DATETIME,
  attendance_minutes INTEGER, -- How long they attended
  notes TEXT,
  marked_by TEXT REFERENCES users(id),
  marked_at DATETIME,
  UNIQUE(live_class_id, student_id)
);

-- 4. ASSIGNMENTS TABLE (homework/projects for courses)
CREATE TABLE IF NOT EXISTS course_assignments (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  live_class_id TEXT REFERENCES live_classes(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  due_date DATETIME,
  points_possible INTEGER DEFAULT 100,
  assignment_type TEXT CHECK(assignment_type IN ('homework', 'project', 'quiz', 'practice')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. ASSIGNMENT_SUBMISSIONS TABLE (student assignment submissions)
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  assignment_id TEXT NOT NULL REFERENCES course_assignments(id) ON DELETE CASCADE,
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  submission_text TEXT,
  file_url TEXT,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  grade INTEGER, -- 0-100
  feedback TEXT,
  graded_by TEXT REFERENCES users(id),
  graded_at DATETIME,
  status TEXT DEFAULT 'submitted' CHECK(status IN ('draft', 'submitted', 'graded', 'late')),
  UNIQUE(assignment_id, student_id)
);

-- 6. ACHIEVEMENTS TABLE (badges students can earn)
CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT '🏆', -- Emoji or icon URL
  criteria_type TEXT CHECK(criteria_type IN ('classes_attended', 'assignments_completed', 'perfect_attendance', 'high_grades', 'streak', 'manual')),
  criteria_value INTEGER, -- e.g., 10 classes attended
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. STUDENT_ACHIEVEMENTS TABLE (tracks which students earned which achievements)
CREATE TABLE IF NOT EXISTS student_achievements (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  awarded_by TEXT REFERENCES users(id),
  UNIQUE(student_id, achievement_id)
);

-- 8. NOTIFICATIONS TABLE (system notifications for parents/students)
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
  type TEXT CHECK(type IN ('class_reminder', 'class_completed', 'assignment_due', 'assignment_graded', 'achievement_earned', 'payment_due', 'general')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT, -- URL to relevant page
  read BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_live_classes_course ON live_classes(course_id);
CREATE INDEX IF NOT EXISTS idx_live_classes_date ON live_classes(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_class_attendance_class ON class_attendance(live_class_id);
CREATE INDEX IF NOT EXISTS idx_class_attendance_student ON class_attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
