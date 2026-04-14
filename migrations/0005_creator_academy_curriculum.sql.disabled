-- Acromatico Creator Academy - Complete 12-Month Course Structure
-- Migration: 0003_creator_academy_curriculum.sql
-- Purpose: Create database architecture for modular monthly curriculum with video placeholders

-- ============================================================================
-- TABLE: modules (Monthly Course Modules - 12 total)
-- ============================================================================
CREATE TABLE IF NOT EXISTS modules (
  id TEXT PRIMARY KEY,
  quarter INTEGER NOT NULL,                   -- Q1=1, Q2=2, Q3=3, Q4=4
  month_number INTEGER NOT NULL,              -- 1-12 (Jan=1, Dec=12)
  month_name TEXT NOT NULL,                   -- "January", "February", etc.
  title TEXT NOT NULL,                        -- "Visual Foundations", "Light Mastery", etc.
  subtitle TEXT,                              -- "Learning to See Like a Pro"
  description TEXT NOT NULL,                  -- Full description
  emoji TEXT,                                 -- 📷, 💡, etc.
  theme_color TEXT,                           -- #4794A6, #FFD700, etc.
  adventure_project_title TEXT NOT NULL,      -- "My World, My Way"
  adventure_project_description TEXT NOT NULL,
  image_url TEXT,                             -- /static/images/curriculum/january.jpg
  sort_order INTEGER NOT NULL,                -- 1-12 for ordering
  is_active BOOLEAN DEFAULT 1,                -- Enable/disable months
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLE: weeks (Weekly Cycles - 4 per month = 48 total)
-- ============================================================================
CREATE TABLE IF NOT EXISTS weeks (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL,                    -- References modules.id
  week_number INTEGER NOT NULL,               -- 1-4 within the month
  week_type TEXT NOT NULL,                    -- "eye", "light", "story", "share"
  title TEXT NOT NULL,                        -- "The Eye", "The Light", etc.
  subtitle TEXT NOT NULL,                     -- "Composition & Visual Design"
  description TEXT,
  emoji TEXT,                                 -- 👁️, 💡, 📖, 🎬
  sort_order INTEGER NOT NULL,                -- 1-48 globally
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

-- ============================================================================
-- TABLE: lessons (Video Lessons + Resources - 10 per month = 120 total)
-- ============================================================================
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  week_id TEXT NOT NULL,                      -- References weeks.id
  module_id TEXT NOT NULL,                    -- References modules.id (for faster queries)
  lesson_type TEXT NOT NULL,                  -- "welcome", "skill", "mission", "resource"
  title TEXT NOT NULL,                        -- "Rule of Thirds Magic"
  description TEXT,                           -- Teaching objectives
  duration_minutes INTEGER,                   -- Target duration (8-10 min)
  video_url TEXT,                             -- Vimeo/Wistia URL (NULL = placeholder)
  thumbnail_url TEXT,                         -- Video thumbnail
  resource_url TEXT,                          -- PDF/download URL
  resource_type TEXT,                         -- "pdf", "image", "zip"
  upload_status TEXT DEFAULT 'awaiting',      -- "awaiting", "uploaded", "processing", "ready"
  sort_order INTEGER NOT NULL,                -- Order within week
  is_locked BOOLEAN DEFAULT 0,                -- Unlock based on previous completion
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (week_id) REFERENCES weeks(id) ON DELETE CASCADE,
  FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

-- ============================================================================
-- TABLE: student_progress (Track video completions and progress)
-- ============================================================================
CREATE TABLE IF NOT EXISTS student_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,                      -- References users.id
  lesson_id TEXT NOT NULL,                    -- References lessons.id
  module_id TEXT NOT NULL,                    -- For faster queries
  week_id TEXT NOT NULL,                      -- For faster queries
  status TEXT DEFAULT 'not_started',          -- "not_started", "in_progress", "completed"
  progress_percent INTEGER DEFAULT 0,         -- 0-100
  watch_time_seconds INTEGER DEFAULT 0,       -- Time watched
  completed_at DATETIME,                      -- Completion timestamp
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
  FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE,
  FOREIGN KEY (week_id) REFERENCES weeks(id) ON DELETE CASCADE,
  UNIQUE(user_id, lesson_id)
);

-- ============================================================================
-- TABLE: project_submissions (Student project uploads and gallery)
-- ============================================================================
CREATE TABLE IF NOT EXISTS project_submissions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,                      -- References users.id
  module_id TEXT NOT NULL,                    -- Which month's project
  project_title TEXT NOT NULL,                -- "My World, My Way"
  caption TEXT,                               -- Student's description
  media_url TEXT NOT NULL,                    -- Photo/video URL
  media_type TEXT NOT NULL,                   -- "image", "video"
  thumbnail_url TEXT,                         -- Thumbnail for videos
  is_featured BOOLEAN DEFAULT 0,              -- Feature in showcase
  likes_count INTEGER DEFAULT 0,              -- Peer appreciation
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

-- ============================================================================
-- TABLE: enrollments (Which months students have access to)
-- ============================================================================
CREATE TABLE IF NOT EXISTS enrollments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,                      -- References users.id
  module_id TEXT NOT NULL,                    -- Which month they're enrolled in
  enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  access_expires_at DATETIME,                 -- NULL = lifetime access
  is_active BOOLEAN DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE,
  UNIQUE(user_id, module_id)
);

-- ============================================================================
-- INDEXES for Performance
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_weeks_module ON weeks(module_id);
CREATE INDEX IF NOT EXISTS idx_lessons_week ON lessons(week_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON student_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_lesson ON student_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user ON project_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_module ON project_submissions(module_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);

-- ============================================================================
-- SEED DATA: Q1 - Foundation Adventures (January - March)
-- ============================================================================

-- JANUARY: Visual Foundations
INSERT INTO modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, image_url, sort_order) VALUES
('mod-jan', 1, 1, 'January', 'Visual Foundations', 'Learning to See Like a Pro', 'Transform from snapshot-taker to visual storyteller. Master the Rule of Thirds, leading lines, and perspective magic that makes ordinary scenes look extraordinary.', '📷', '#4794A6', 'My World, My Way', 'Create a stunning portfolio showcasing your unique perspective on the places and things that matter most to you.', '/static/images/curriculum/january-vintage-camera.jpg', 1);

-- January Weeks
INSERT INTO weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-jan-1', 'mod-jan', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 1),
('week-jan-2', 'mod-jan', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 2),
('week-jan-3', 'mod-jan', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 3),
('week-jan-4', 'mod-jan', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 4);

-- January Week 1 Lessons
INSERT INTO lessons (id, week_id, module_id, lesson_type, title, description, duration_minutes, sort_order) VALUES
('jan-w1-welcome', 'week-jan-1', 'mod-jan', 'welcome', 'Welcome to Visual Foundations', 'Introduction to the month and what students will learn', 3, 1),
('jan-w1-skill', 'week-jan-1', 'mod-jan', 'skill', 'Rule of Thirds Magic', 'Master the foundational composition technique with real examples', 8, 2),
('jan-w1-mission', 'week-jan-1', 'mod-jan', 'mission', 'Composition Hunt Adventure', 'Your first hands-on mission capturing great compositions', 5, 3),
('jan-w1-resource', 'week-jan-1', 'mod-jan', 'resource', 'Weekly Challenge Sheet', 'Printable composition practice guide', NULL, 4);

-- FEBRUARY: Light Mastery
INSERT INTO modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, image_url, sort_order) VALUES
('mod-feb', 1, 2, 'February', 'Light Mastery', 'Becoming a Light Hunter', 'Transform into a light detective who understands how illumination creates mood, drama, and pure magic. Chase golden hour beauty and create dramatic shadows.', '💡', '#FFD700', 'Chasing Light', 'Build an epic collection showing your mastery of different lighting conditions throughout your day.', '/static/images/curriculum/february-beach-boardwalk.jpg', 2);

-- February Weeks
INSERT INTO weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-feb-1', 'mod-feb', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 5),
('week-feb-2', 'mod-feb', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 6),
('week-feb-3', 'mod-feb', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 7),
('week-feb-4', 'mod-feb', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 8);

-- MARCH: Story Foundations
INSERT INTO modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, image_url, sort_order) VALUES
('mod-mar', 1, 3, 'March', 'Story Foundations', 'Visual Storytelling Mastery', 'Move beyond single images to create photo sequences that tell complete, compelling stories through imagery.', '📖', '#9333EA', 'Day in the Life', 'Document something meaningful through a 5-photo story that makes viewers feel like they were there.', '/static/images/curriculum/march-mountain-photographer.jpg', 3);

-- March Weeks
INSERT INTO weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-mar-1', 'mod-mar', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 9),
('week-mar-2', 'mod-mar', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 10),
('week-mar-3', 'mod-mar', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 11),
('week-mar-4', 'mod-mar', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 12);

-- ============================================================================
-- SEED DATA: Q2 - Human Connection Adventures (April - June)
-- ============================================================================

-- APRIL: Portrait Excellence
INSERT INTO modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, image_url, sort_order) VALUES
('mod-apr', 2, 4, 'April', 'Portrait Excellence', 'Capturing Personality and Soul', 'Learn to photograph friends and family with respect, technical skill, and heart. Capture genuine expressions that reveal true personality.', '👥', '#F97316', 'Family Chronicles', 'Create a portrait series celebrating the people you love most, showing different sides of their personalities.', '/static/images/curriculum/april-mom-child-beach.jpg', 4);

-- April Weeks
INSERT INTO weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-apr-1', 'mod-apr', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 13),
('week-apr-2', 'mod-apr', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 14),
('week-apr-3', 'mod-apr', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 15),
('week-apr-4', 'mod-apr', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 16);

-- MAY: Urban Exploration
INSERT INTO modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, image_url, sort_order) VALUES
('mod-may', 2, 5, 'May', 'Urban Exploration', 'Finding Beauty Everywhere', 'The world becomes your creative playground. Master street photography and architectural appreciation.', '🏙️', '#3B82F6', 'My Community Story', 'Document the unique character and hidden beauty of your neighborhood or favorite local spot.', '/static/images/curriculum/may-chicago-skyline.jpg', 5);

-- May Weeks
INSERT INTO weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-may-1', 'mod-may', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 17),
('week-may-2', 'mod-may', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 18),
('week-may-3', 'mod-may', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 19),
('week-may-4', 'mod-may', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 20);

-- JUNE: Adventure Documentation
INSERT INTO modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, sort_order) VALUES
('mod-jun', 2, 6, 'June', 'Adventure Documentation', 'Travel and Landscape Mastery', 'Perfect for summer adventures! Learn landscape composition and travel documentation techniques.', '🏔️', '#10B981', 'Summer Chronicles', 'Create a visual travel diary of your early summer adventures, big or small.', NULL, 6);

-- June Weeks
INSERT INTO weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-jun-1', 'mod-jun', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 21),
('week-jun-2', 'mod-jun', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 22),
('week-jun-3', 'mod-jun', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 23),
('week-jun-4', 'mod-jun', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 24);

-- ============================================================================
-- SEED DATA: Q3 - Motion and Media Adventures (July - September)
-- ============================================================================

-- JULY: Action Mastery
INSERT INTO modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, sort_order) VALUES
('mod-jul', 3, 7, 'July', 'Action Mastery', 'Controlling Time Through Your Camera', 'Learn to freeze lightning-fast action or show movement through creative blur. Capture pure energy and excitement.', '⚡', '#EF4444', 'Life in Motion', 'Build an action-packed collection showcasing movement techniques through sports, play, pets, or water.', NULL, 7);

-- July Weeks
INSERT INTO weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-jul-1', 'mod-jul', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 25),
('week-jul-2', 'mod-jul', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 26),
('week-jul-3', 'mod-jul', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 27),
('week-jul-4', 'mod-jul', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 28);

-- AUGUST: Video Fundamentals
INSERT INTO modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, sort_order) VALUES
('mod-aug', 3, 8, 'August', 'Video Fundamentals', 'Bringing Stories to Life with Motion', 'Transition from still photography to video. Learn stability, shot types, and simple editing.', '🎬', '#EC4899', '60-Second Story', 'Create a one-minute video showcasing your summer experiences, hobbies, or passions.', NULL, 8);

-- August Weeks
INSERT INTO weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-aug-1', 'mod-aug', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 29),
('week-aug-2', 'mod-aug', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 30),
('week-aug-3', 'mod-aug', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 31),
('week-aug-4', 'mod-aug', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 32);

-- SEPTEMBER: Documentary Adventures
INSERT INTO modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, sort_order) VALUES
('mod-sep', 3, 9, 'September', 'Documentary Adventures', 'Real People, Real Stories', 'Learn documentary approaches including interviews, B-roll, and respectful documentation with heart.', '🎥', '#6366F1', 'Someone I Admire', 'Create a short documentary celebrating a family member, friend, or mentor who inspires you.', NULL, 9);

-- September Weeks
INSERT INTO weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-sep-1', 'mod-sep', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 33),
('week-sep-2', 'mod-sep', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 34),
('week-sep-3', 'mod-sep', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 35),
('week-sep-4', 'mod-sep', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 36);

-- ============================================================================
-- SEED DATA: Q4 - Mastery and Showcase Adventures (October - December)
-- ============================================================================

-- OCTOBER: Post-Production Excellence
INSERT INTO modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, image_url, sort_order) VALUES
('mod-oct', 4, 10, 'October', 'Post-Production Excellence', 'Digital Editing and Style Development', 'Learn professional editing techniques, color theory, and develop a consistent visual style that reflects your unique personality.', '🎨', '#EAB308', 'Style Evolution', 'Create stunning before-and-after showcases demonstrating your editing growth and artistic style.', '/static/images/curriculum/october-video-editing.jpg', 10);

-- October Weeks
INSERT INTO weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-oct-1', 'mod-oct', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 37),
('week-oct-2', 'mod-oct', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 38),
('week-oct-3', 'mod-oct', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 39),
('week-oct-4', 'mod-oct', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 40);

-- NOVEMBER: Purpose-Driven Projects
INSERT INTO modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, image_url, sort_order) VALUES
('mod-nov', 4, 11, 'November', 'Purpose-Driven Projects', 'Photography as Appreciation and Service', 'Use your skills for good! Create meaningful projects that celebrate gratitude and serve your community.', '💝', '#F43F5E', 'Gratitude Gallery', 'Create a collection celebrating unnoticed beauty, unsung heroes, or things you are most thankful for.', '/static/images/curriculum/november-portfolio-collage.jpg', 11);

-- November Weeks
INSERT INTO weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-nov-1', 'mod-nov', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 41),
('week-nov-2', 'mod-nov', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 42),
('week-nov-3', 'mod-nov', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 43),
('week-nov-4', 'mod-nov', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 44);

-- DECEMBER: Portfolio Showcase
INSERT INTO modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_project_title, adventure_project_description, sort_order) VALUES
('mod-dec', 4, 12, 'December', 'Portfolio Showcase', 'Celebrating Your Creative Journey', 'The year culminates with professional portfolio development, presentation skills, and celebration of your growth.', '🏆', '#F59E0B', 'Year in Review', 'Build a professional portfolio showcasing your creative journey and best work from the entire year.', NULL, 12);

-- December Weeks
INSERT INTO weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order) VALUES
('week-dec-1', 'mod-dec', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 45),
('week-dec-2', 'mod-dec', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 46),
('week-dec-3', 'mod-dec', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 47),
('week-dec-4', 'mod-dec', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 48);
