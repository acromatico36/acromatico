-- Acromatico Creator Academy - Complete 12-Month Course Structure
-- Migration: 0005_creator_academy_curriculum.sql (FIXED VERSION)
-- Purpose: Create database architecture for modular monthly curriculum with video placeholders

-- Drop conflicting tables if they exist (from old schema)
DROP TABLE IF EXISTS project_submissions;
DROP TABLE IF EXISTS student_progress;
DROP TABLE IF EXISTS academy_lessons;
DROP TABLE IF EXISTS academy_weeks;
DROP TABLE IF EXISTS academy_modules;
DROP TABLE IF EXISTS academy_enrollments;

-- ============================================================================
-- TABLE: academy_modules (Monthly Course Modules - 12 total)
-- ============================================================================
CREATE TABLE IF NOT EXISTS academy_modules (
  id TEXT PRIMARY KEY,
  quarter INTEGER NOT NULL,
  month_number INTEGER NOT NULL,
  month_name TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  emoji TEXT,
  theme_color TEXT,
  adventure_project_title TEXT NOT NULL,
  adventure_project_description TEXT NOT NULL,
  image_url TEXT,
  sort_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLE: academy_weeks (Weekly Cycles - 4 per month = 48 total)
-- ============================================================================
CREATE TABLE IF NOT EXISTS academy_weeks (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL,
  week_number INTEGER NOT NULL,
  week_type TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT,
  emoji TEXT,
  sort_order INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (module_id) REFERENCES academy_modules(id) ON DELETE CASCADE
);

-- ============================================================================
-- TABLE: academy_lessons (Video Lessons + Resources - 10 per month = 120 total)
-- ============================================================================
CREATE TABLE IF NOT EXISTS academy_lessons (
  id TEXT PRIMARY KEY,
  week_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  lesson_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER,
  video_url TEXT,
  thumbnail_url TEXT,
  resource_url TEXT,
  resource_type TEXT,
  upload_status TEXT DEFAULT 'awaiting',
  sort_order INTEGER NOT NULL,
  is_locked BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (week_id) REFERENCES academy_weeks(id) ON DELETE CASCADE,
  FOREIGN KEY (module_id) REFERENCES academy_modules(id) ON DELETE CASCADE
);

-- ============================================================================
-- TABLE: academy_progress (Track video completions and progress)
-- ============================================================================
CREATE TABLE IF NOT EXISTS academy_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  week_id TEXT NOT NULL,
  status TEXT DEFAULT 'not_started',
  progress_percent INTEGER DEFAULT 0,
  watch_time_seconds INTEGER DEFAULT 0,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES academy_lessons(id) ON DELETE CASCADE,
  FOREIGN KEY (module_id) REFERENCES academy_modules(id) ON DELETE CASCADE,
  FOREIGN KEY (week_id) REFERENCES academy_weeks(id) ON DELETE CASCADE,
  UNIQUE(user_id, lesson_id)
);

-- ============================================================================
-- TABLE: academy_submissions (Student project uploads and gallery)
-- ============================================================================
CREATE TABLE IF NOT EXISTS academy_submissions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  project_title TEXT NOT NULL,
  caption TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL,
  thumbnail_url TEXT,
  is_featured BOOLEAN DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (module_id) REFERENCES academy_modules(id) ON DELETE CASCADE
);

-- ============================================================================
-- TABLE: academy_enrollments (Which months students have access to)
-- ============================================================================
CREATE TABLE IF NOT EXISTS academy_enrollments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  access_expires_at DATETIME,
  is_active BOOLEAN DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (module_id) REFERENCES academy_modules(id) ON DELETE CASCADE,
  UNIQUE(user_id, module_id)
);

-- ============================================================================
-- INDEXES for Performance
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_academy_weeks_module ON academy_weeks(module_id);
CREATE INDEX IF NOT EXISTS idx_academy_lessons_week ON academy_lessons(week_id);
CREATE INDEX IF NOT EXISTS idx_academy_lessons_module ON academy_lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_academy_progress_user ON academy_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_academy_progress_lesson ON academy_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_academy_submissions_user ON academy_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_academy_submissions_module ON academy_submissions(module_id);
CREATE INDEX IF NOT EXISTS idx_academy_enrollments_user ON academy_enrollments(user_id);

-- ============================================================================
-- SEED DATA: ALL 12 MONTHS + 48 WEEKS
-- ============================================================================

-- Q1: JANUARY
INSERT INTO academy_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, image_url, sort_order) VALUES
('mod-jan', 1, 1, 'January', 'Visual Foundations', 'Learning to See Like a Pro', 'Transform from snapshot-taker to visual storyteller. Master the Rule of Thirds, leading lines, and perspective magic.', '📷', '#4794A6', 'My World, My Way', 'Create a stunning portfolio showcasing your unique perspective.', '/static/images/curriculum/january-vintage-camera.jpg', 1);

INSERT INTO academy_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-jan-1', 'mod-jan', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 1),
('week-jan-2', 'mod-jan', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 2),
('week-jan-3', 'mod-jan', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 3),
('week-jan-4', 'mod-jan', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 4);

-- Q1: FEBRUARY
INSERT INTO academy_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, image_url, sort_order) VALUES
('mod-feb', 1, 2, 'February', 'Light Mastery', 'Becoming a Light Hunter', 'Transform into a light detective who understands how illumination creates mood and drama.', '💡', '#FFD700', 'Chasing Light', 'Build an epic collection showing your mastery of different lighting conditions.', '/static/images/curriculum/february-beach-boardwalk.jpg', 2);

INSERT INTO academy_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-feb-1', 'mod-feb', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 5),
('week-feb-2', 'mod-feb', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 6),
('week-feb-3', 'mod-feb', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 7),
('week-feb-4', 'mod-feb', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 8);

-- Q1: MARCH
INSERT INTO academy_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, image_url, sort_order) VALUES
('mod-mar', 1, 3, 'March', 'Story Foundations', 'Visual Storytelling Mastery', 'Move beyond single images to create photo sequences that tell complete stories.', '📖', '#9333EA', 'Day in the Life', 'Document something meaningful through a 5-photo story.', '/static/images/curriculum/march-mountain-photographer.jpg', 3);

INSERT INTO academy_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-mar-1', 'mod-mar', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 9),
('week-mar-2', 'mod-mar', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 10),
('week-mar-3', 'mod-mar', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 11),
('week-mar-4', 'mod-mar', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 12);

-- Q2: APRIL
INSERT INTO academy_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, image_url, sort_order) VALUES
('mod-apr', 2, 4, 'April', 'Portrait Excellence', 'Capturing Personality and Soul', 'Learn to photograph friends and family with respect, technical skill, and heart.', '👥', '#F97316', 'Family Chronicles', 'Create a portrait series celebrating the people you love most.', '/static/images/curriculum/april-mom-child-beach.jpg', 4);

INSERT INTO academy_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-apr-1', 'mod-apr', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 13),
('week-apr-2', 'mod-apr', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 14),
('week-apr-3', 'mod-apr', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 15),
('week-apr-4', 'mod-apr', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 16);

-- Q2: MAY
INSERT INTO academy_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, image_url, sort_order) VALUES
('mod-may', 2, 5, 'May', 'Urban Exploration', 'Finding Beauty Everywhere', 'The world becomes your creative playground with street photography and architecture.', '🏙️', '#3B82F6', 'My Community Story', 'Document the unique character of your neighborhood.', '/static/images/curriculum/may-chicago-skyline.jpg', 5);

INSERT INTO academy_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-may-1', 'mod-may', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 17),
('week-may-2', 'mod-may', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 18),
('week-may-3', 'mod-may', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 19),
('week-may-4', 'mod-may', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 20);

-- Q2: JUNE
INSERT INTO academy_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, sort_order) VALUES
('mod-jun', 2, 6, 'June', 'Adventure Documentation', 'Travel and Landscape Mastery', 'Perfect for summer adventures! Learn landscape composition and travel techniques.', '🏔️', '#10B981', 'Summer Chronicles', 'Create a visual travel diary of your adventures.', NULL, 6);

INSERT INTO academy_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-jun-1', 'mod-jun', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 21),
('week-jun-2', 'mod-jun', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 22),
('week-jun-3', 'mod-jun', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 23),
('week-jun-4', 'mod-jun', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 24);

-- Q3: JULY
INSERT INTO academy_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, sort_order) VALUES
('mod-jul', 3, 7, 'July', 'Action Mastery', 'Controlling Time Through Your Camera', 'Learn to freeze action or show movement through creative blur.', '⚡', '#EF4444', 'Life in Motion', 'Build an action-packed collection.', NULL, 7);

INSERT INTO academy_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-jul-1', 'mod-jul', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 25),
('week-jul-2', 'mod-jul', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 26),
('week-jul-3', 'mod-jul', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 27),
('week-jul-4', 'mod-jul', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 28);

-- Q3: AUGUST
INSERT INTO academy_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, sort_order) VALUES
('mod-aug', 3, 8, 'August', 'Video Fundamentals', 'Bringing Stories to Life with Motion', 'Transition from still photography to video.', '🎬', '#EC4899', '60-Second Story', 'Create a one-minute video showcasing your passions.', NULL, 8);

INSERT INTO academy_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-aug-1', 'mod-aug', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 29),
('week-aug-2', 'mod-aug', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 30),
('week-aug-3', 'mod-aug', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 31),
('week-aug-4', 'mod-aug', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 32);

-- Q3: SEPTEMBER
INSERT INTO academy_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, sort_order) VALUES
('mod-sep', 3, 9, 'September', 'Documentary Adventures', 'Real People, Real Stories', 'Learn documentary approaches including interviews and B-roll.', '🎥', '#6366F1', 'Someone I Admire', 'Create a short documentary celebrating someone who inspires you.', NULL, 9);

INSERT INTO academy_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-sep-1', 'mod-sep', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 33),
('week-sep-2', 'mod-sep', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 34),
('week-sep-3', 'mod-sep', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 35),
('week-sep-4', 'mod-sep', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 36);

-- Q4: OCTOBER
INSERT INTO academy_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, image_url, sort_order) VALUES
('mod-oct', 4, 10, 'October', 'Post-Production Excellence', 'Digital Editing and Style Development', 'Learn professional editing techniques and color theory.', '🎨', '#EAB308', 'Style Evolution', 'Create stunning before-and-after showcases.', '/static/images/curriculum/october-video-editing.jpg', 10);

INSERT INTO academy_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-oct-1', 'mod-oct', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 37),
('week-oct-2', 'mod-oct', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 38),
('week-oct-3', 'mod-oct', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 39),
('week-oct-4', 'mod-oct', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 40);

-- Q4: NOVEMBER
INSERT INTO academy_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, image_url, sort_order) VALUES
('mod-nov', 4, 11, 'November', 'Purpose-Driven Projects', 'Photography as Appreciation and Service', 'Use your skills for good!', '💝', '#F43F5E', 'Gratitude Gallery', 'Create a collection celebrating unsung heroes.', '/static/images/curriculum/november-portfolio-collage.jpg', 11);

INSERT INTO academy_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-nov-1', 'mod-nov', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 41),
('week-nov-2', 'mod-nov', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 42),
('week-nov-3', 'mod-nov', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 43),
('week-nov-4', 'mod-nov', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 44);

-- Q4: DECEMBER
INSERT INTO academy_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, sort_order) VALUES
('mod-dec', 4, 12, 'December', 'Portfolio Showcase', 'Celebrating Your Creative Journey', 'The year culminates with professional portfolio development.', '🏆', '#F59E0B', 'Year in Review', 'Build a professional portfolio showcasing your journey.', NULL, 12);

INSERT INTO academy_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-dec-1', 'mod-dec', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 45),
('week-dec-2', 'mod-dec', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 46),
('week-dec-3', 'mod-dec', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 47),
('week-dec-4', 'mod-dec', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 48);
