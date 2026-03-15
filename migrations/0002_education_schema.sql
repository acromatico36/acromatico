-- Education Platform Additional Tables
-- Add courses, lessons, and progress tracking to existing users/students schema

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK(category IN ('photography', 'filmmaking', 'brand-design', 'web-dev', 'saas-building')),
  age_range TEXT,
  duration_weeks INTEGER,
  thumbnail_url TEXT,
  trailer_url TEXT,
  price REAL DEFAULT 0,
  is_published INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  course_id TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  order_index INTEGER NOT NULL,
  content_text TEXT,
  resources_json TEXT,
  is_published INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Enrollments table (students enrolled in courses)
CREATE TABLE IF NOT EXISTS enrollments (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  student_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  progress_percentage REAL DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'completed', 'dropped')),
  UNIQUE(student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Lesson Progress table (track which lessons students completed)
CREATE TABLE IF NOT EXISTS lesson_progress (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  enrollment_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  completed INTEGER DEFAULT 0,
  completed_at DATETIME,
  time_spent_minutes INTEGER DEFAULT 0,
  notes TEXT,
  UNIQUE(enrollment_id, lesson_id),
  FOREIGN KEY (enrollment_id) REFERENCES enrollments(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- Assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  lesson_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATETIME,
  max_points INTEGER DEFAULT 100,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- Submissions table (student assignment submissions)
CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  assignment_id TEXT NOT NULL,
  student_id TEXT NOT NULL,
  submission_url TEXT,
  submission_text TEXT,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  grade INTEGER,
  feedback TEXT,
  graded_at DATETIME,
  graded_by TEXT,
  FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (graded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_enrollment_id ON lesson_progress(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_assignments_lesson_id ON assignments(lesson_id);
CREATE INDEX IF NOT EXISTS idx_submissions_assignment_id ON submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student_id ON submissions(student_id);
