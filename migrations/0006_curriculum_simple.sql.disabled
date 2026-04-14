-- ============================================================================
-- Acromatico Creator Academy - Simplified 12-Month Course Structure
-- Migration: 0006_curriculum_simple.sql
-- Purpose: Create database for 12 monthly modules (clean migration)
-- ============================================================================

-- Drop existing tables if they exist
DROP TABLE IF EXISTS curriculum_submissions;
DROP TABLE IF EXISTS curriculum_progress;
DROP TABLE IF EXISTS curriculum_lessons;
DROP TABLE IF EXISTS curriculum_weeks;
DROP TABLE IF EXISTS curriculum_modules;

-- ============================================================================
-- TABLE: curriculum_modules (Monthly Modules - 12 total, one per month)
-- ============================================================================
CREATE TABLE curriculum_modules (
  id TEXT PRIMARY KEY,
  quarter INTEGER NOT NULL,
  month_number INTEGER NOT NULL,
  month_name TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  emoji TEXT,
  theme_color TEXT,
  adventure_title TEXT NOT NULL,
  adventure_desc TEXT NOT NULL,
  image_url TEXT,
  sort_order INTEGER NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

-- ============================================================================
-- TABLE: curriculum_weeks (Weekly Cycles - 4 per month = 48 total)
-- ============================================================================
CREATE TABLE curriculum_weeks (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL,
  week_number INTEGER NOT NULL,
  week_type TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  emoji TEXT,
  sort_order INTEGER NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (module_id) REFERENCES curriculum_modules(id) ON DELETE CASCADE
);

-- ============================================================================
-- TABLE: curriculum_lessons (Video/PDF Placeholders - 10 per month = 120 total)
-- ============================================================================
CREATE TABLE curriculum_lessons (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL,
  week_id TEXT NOT NULL,
  lesson_type TEXT NOT NULL,
  title TEXT NOT NULL,
  duration_min INTEGER DEFAULT 0,
  video_url TEXT,
  pdf_url TEXT,
  thumbnail_url TEXT,
  description TEXT,
  sort_order INTEGER NOT NULL,
  upload_status TEXT DEFAULT 'awaiting',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (module_id) REFERENCES curriculum_modules(id) ON DELETE CASCADE,
  FOREIGN KEY (week_id) REFERENCES curriculum_weeks(id) ON DELETE CASCADE
);

-- ============================================================================
-- TABLE: curriculum_progress (Student lesson progress tracking)
-- ============================================================================
CREATE TABLE curriculum_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  week_id TEXT NOT NULL,
  status TEXT DEFAULT 'not_started',
  progress_percent INTEGER DEFAULT 0,
  watch_time_seconds INTEGER DEFAULT 0,
  completed_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (lesson_id) REFERENCES curriculum_lessons(id) ON DELETE CASCADE,
  FOREIGN KEY (module_id) REFERENCES curriculum_modules(id) ON DELETE CASCADE,
  FOREIGN KEY (week_id) REFERENCES curriculum_weeks(id) ON DELETE CASCADE,
  UNIQUE(user_id, lesson_id)
);

-- ============================================================================
-- TABLE: curriculum_submissions (Student project gallery uploads)
-- ============================================================================
CREATE TABLE curriculum_submissions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  project_title TEXT NOT NULL,
  caption TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT DEFAULT 'image',
  submitted_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (module_id) REFERENCES curriculum_modules(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_cur_weeks_module ON curriculum_weeks(module_id);
CREATE INDEX idx_cur_lessons_week ON curriculum_lessons(week_id);
CREATE INDEX idx_cur_lessons_module ON curriculum_lessons(module_id);
CREATE INDEX idx_cur_progress_user ON curriculum_progress(user_id);
CREATE INDEX idx_cur_submissions_user ON curriculum_submissions(user_id);

-- ============================================================================
-- SEED DATA: 12 Monthly Modules (Q1-Q4)
-- ============================================================================

-- Q1: JANUARY
INSERT INTO curriculum_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, image_url, sort_order)
VALUES ('mod-jan', 1, 1, 'January', 'Visual Foundations', 'Learning to See Like a Pro', 'Transform from snapshot-taker to visual storyteller. Master the Rule of Thirds, leading lines, and perspective magic.', '📷', '#4794A6', 'My World, My Way', 'Create a stunning portfolio showcasing your unique perspective.', '/static/images/curriculum/january-vintage-camera.jpg', 1);

INSERT INTO curriculum_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
VALUES
('week-jan-1', 'mod-jan', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 1),
('week-jan-2', 'mod-jan', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 2),
('week-jan-3', 'mod-jan', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 3),
('week-jan-4', 'mod-jan', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 4);

-- Q1: FEBRUARY
INSERT INTO curriculum_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, image_url, sort_order)
VALUES ('mod-feb', 1, 2, 'February', 'Light Mastery', 'Becoming a Light Hunter', 'Transform into a light detective who understands how illumination creates mood and drama.', '💡', '#FFD700', 'Chasing Light', 'Build an epic collection showing your mastery of different lighting conditions.', '/static/images/curriculum/february-beach-boardwalk.jpg', 2);

INSERT INTO curriculum_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
VALUES
('week-feb-1', 'mod-feb', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 5),
('week-feb-2', 'mod-feb', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 6),
('week-feb-3', 'mod-feb', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 7),
('week-feb-4', 'mod-feb', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 8);

-- Q1: MARCH
INSERT INTO curriculum_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, image_url, sort_order)
VALUES ('mod-mar', 1, 3, 'March', 'Story Foundations', 'Every Image Tells a Tale', 'Learn how the best photographers use sequences, emotion, and timing to craft visual narratives that resonate.', '📖', '#9333EA', 'My Epic Story', 'Create a multi-part photo series that takes viewers on an unforgettable journey.', '/static/images/curriculum/march-mountain-photographer.jpg', 3);

INSERT INTO curriculum_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
VALUES
('week-mar-1', 'mod-mar', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 9),
('week-mar-2', 'mod-mar', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 10),
('week-mar-3', 'mod-mar', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 11),
('week-mar-4', 'mod-mar', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 12);

-- Q2: APRIL
INSERT INTO curriculum_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, image_url, sort_order)
VALUES ('mod-apr', 2, 4, 'April', 'Portrait Power', 'Capturing People & Personality', 'Discover how to photograph people in authentic, compelling ways that reveal character and emotion.', '👤', '#EC4899', 'Faces & Stories', 'Build a portrait collection that celebrates the people in your world.', '/static/images/curriculum/april-mom-child-beach.jpg', 4);

INSERT INTO curriculum_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
VALUES
('week-apr-1', 'mod-apr', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 13),
('week-apr-2', 'mod-apr', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 14),
('week-apr-3', 'mod-apr', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 15),
('week-apr-4', 'mod-apr', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 16);

-- Q2: MAY
INSERT INTO curriculum_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, image_url, sort_order)
VALUES ('mod-may', 2, 5, 'May', 'Urban Exploration', 'City as Canvas', 'Transform urban environments into visual playgrounds. Learn architecture, street scenes, and cityscape secrets.', '🏙️', '#14B8A6', 'Concrete Jungle', 'Create a stunning urban portfolio that reveals the hidden beauty of city life.', '/static/images/curriculum/may-chicago-skyline.jpg', 5);

INSERT INTO curriculum_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
VALUES
('week-may-1', 'mod-may', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 17),
('week-may-2', 'mod-may', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 18),
('week-may-3', 'mod-may', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 19),
('week-may-4', 'mod-may', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 20);

-- Q2: JUNE
INSERT INTO curriculum_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, sort_order)
VALUES ('mod-jun', 2, 6, 'June', 'Nature Immersion', 'Wild World Photography', 'Venture into natural environments to capture landscapes, wildlife, and the raw beauty of the outdoors.', '🌲', '#22C55E', 'Into the Wild', 'Build a nature portfolio showcasing the incredible diversity of the natural world.', NULL, 6);

INSERT INTO curriculum_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
VALUES
('week-jun-1', 'mod-jun', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 21),
('week-jun-2', 'mod-jun', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 22),
('week-jun-3', 'mod-jun', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 23),
('week-jun-4', 'mod-jun', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 24);

-- Q3: JULY
INSERT INTO curriculum_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, sort_order)
VALUES ('mod-jul', 3, 7, 'July', 'Action & Motion', 'Freezing the Moment', 'Master the art of capturing movement—sports, dance, action scenes that tell dynamic visual stories.', '⚡', '#F59E0B', 'Motion Magic', 'Create an action portfolio that captures energy, speed, and the thrill of movement.', NULL, 7);

INSERT INTO curriculum_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
VALUES
('week-jul-1', 'mod-jul', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 25),
('week-jul-2', 'mod-jul', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 26),
('week-jul-3', 'mod-jul', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 27),
('week-jul-4', 'mod-jul', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 28);

-- Q3: AUGUST
INSERT INTO curriculum_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, sort_order)
VALUES ('mod-aug', 3, 8, 'August', 'Color Theory', 'Mastering Visual Harmony', 'Dive deep into how color creates mood, emotion, and impact in visual storytelling.', '🎨', '#8B5CF6', 'Color Symphony', 'Build a vibrant portfolio demonstrating your command of color relationships and visual impact.', NULL, 8);

INSERT INTO curriculum_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
VALUES
('week-aug-1', 'mod-aug', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 29),
('week-aug-2', 'mod-aug', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 30),
('week-aug-3', 'mod-aug', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 31),
('week-aug-4', 'mod-aug', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 32);

-- Q3: SEPTEMBER
INSERT INTO curriculum_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, image_url, sort_order)
VALUES ('mod-sep', 3, 9, 'September', 'Advanced Composition', 'Breaking the Rules', 'Level up with advanced framing techniques, creative angles, and experimental approaches to visual design.', '🎬', '#6366F1', 'Visual Rebel', 'Create a portfolio that showcases your unique compositional voice and creative vision.', NULL, 9);

INSERT INTO curriculum_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
VALUES
('week-sep-1', 'mod-sep', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 33),
('week-sep-2', 'mod-sep', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 34),
('week-sep-3', 'mod-sep', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 35),
('week-sep-4', 'mod-sep', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 36);

-- Q4: OCTOBER
INSERT INTO curriculum_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, image_url, sort_order)
VALUES ('mod-oct', 4, 10, 'October', 'Video Storytelling', 'From Stills to Motion', 'Transition into video creation with editing, sequencing, and cinematic storytelling techniques.', '🎥', '#EF4444', 'Motion Pictures', 'Create your first short film showcasing your unique visual storytelling abilities.', '/static/images/curriculum/october-video-editing.jpg', 10);

INSERT INTO curriculum_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
VALUES
('week-oct-1', 'mod-oct', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 37),
('week-oct-2', 'mod-oct', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 38),
('week-oct-3', 'mod-oct', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 39),
('week-oct-4', 'mod-oct', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 40);

-- Q4: NOVEMBER
INSERT INTO curriculum_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, image_url, sort_order)
VALUES ('mod-nov', 4, 11, 'November', 'Portfolio Building', 'Showcasing Your Best Work', 'Learn how to curate, edit, and present your work like a professional creator.', '📸', '#10B981', 'My Signature Collection', 'Build a professional portfolio that opens doors and showcases your creative journey.', '/static/images/curriculum/november-portfolio-dashboard.jpg', 11);

INSERT INTO curriculum_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
VALUES
('week-nov-1', 'mod-nov', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 41),
('week-nov-2', 'mod-nov', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 42),
('week-nov-3', 'mod-nov', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 43),
('week-nov-4', 'mod-nov', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 44);

-- Q4: DECEMBER
INSERT INTO curriculum_modules (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, sort_order)
VALUES ('mod-dec', 4, 12, 'December', 'Creator Summit', 'Your Signature Project', 'Culminate your year with a major creative project that showcases everything you've learned.', '🏆', '#3B82F6', 'The Final Masterpiece', 'Create your ultimate visual project—your signature statement as a young creator.', NULL, 12);

INSERT INTO curriculum_weeks (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
VALUES
('week-dec-1', 'mod-dec', 1, 'eye', 'The Eye', 'Composition & Visual Design', '👁️', 45),
('week-dec-2', 'mod-dec', 2, 'light', 'The Light', 'Timing & Atmosphere', '💡', 46),
('week-dec-3', 'mod-dec', 3, 'story', 'The Story', 'Motion & Narrative', '📖', 47),
('week-dec-4', 'mod-dec', 4, 'share', 'The Share', 'Editing & Presentation', '🎬', 48);
