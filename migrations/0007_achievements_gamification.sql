-- ==========================================
-- TASK 6A: ACHIEVEMENT & GAMIFICATION SYSTEM
-- For Acromatico Creator Academy (Ages 7-14)
-- ==========================================

-- TABLE 1: ACHIEVEMENTS (Badge Definitions)
-- Stores all possible badges students can earn
CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('milestone', 'streak', 'mastery', 'creative', 'special')),
  icon TEXT NOT NULL, -- Emoji or icon class
  xp_reward INTEGER DEFAULT 0,
  unlock_criteria TEXT, -- JSON string describing how to unlock
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- TABLE 2: USER_ACHIEVEMENTS (Earned Badges)
-- Tracks which badges each student has earned
CREATE TABLE IF NOT EXISTS user_achievements (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL,
  achievement_id TEXT NOT NULL,
  earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  progress_snapshot TEXT, -- JSON snapshot of progress when earned
  UNIQUE(user_id, achievement_id),
  FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE
);

-- TABLE 3: USER_XP (Experience Points & Levels)
-- Tracks student XP, level, and rank
CREATE TABLE IF NOT EXISTS user_xp (
  user_id TEXT PRIMARY KEY,
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  xp_to_next_level INTEGER DEFAULT 100,
  rank_title TEXT DEFAULT 'Beginner Creator',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- TABLE 4: DAILY_STREAKS (Learning Streak Tracking)
-- Tracks daily learning activity for streak calculation
CREATE TABLE IF NOT EXISTS daily_streaks (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL,
  activity_date DATE NOT NULL,
  lessons_completed INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, activity_date)
);

-- TABLE 5: STREAK_STATS (Current Streak Summary)
-- Stores current streak count and longest streak
CREATE TABLE IF NOT EXISTS streak_stats (
  user_id TEXT PRIMARY KEY,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_earned_at ON user_achievements(earned_at);
CREATE INDEX IF NOT EXISTS idx_daily_streaks_user_id ON daily_streaks(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_streaks_date ON daily_streaks(activity_date);
CREATE INDEX IF NOT EXISTS idx_achievements_category ON achievements(category);

-- ==========================================
-- SEED DATA: ACHIEVEMENT BADGES
-- ==========================================

-- MILESTONE BADGES (First-time accomplishments)
INSERT OR REPLACE INTO achievements (id, name, description, category, icon, xp_reward, unlock_criteria, sort_order) VALUES
('ach-first-login', '👋 Welcome Aboard', 'Logged in for the first time', 'milestone', '👋', 10, '{"type":"first_login"}', 1),
('ach-first-lesson', '🎬 First Take', 'Completed your first lesson', 'milestone', '🎬', 25, '{"type":"first_lesson"}', 2),
('ach-first-project', '🎨 First Creation', 'Submitted your first project', 'milestone', '🎨', 50, '{"type":"first_project"}', 3),
('ach-first-week', '📅 Week Warrior', 'Completed all lessons in a week', 'milestone', '📅', 100, '{"type":"complete_week"}', 4),
('ach-first-month', '🎓 Month Master', 'Completed all lessons in a month', 'milestone', '🎓', 250, '{"type":"complete_month"}', 5);

-- STREAK BADGES (Consistency rewards)
INSERT OR REPLACE INTO achievements (id, name, description, category, icon, xp_reward, unlock_criteria, sort_order) VALUES
('ach-streak-3', '🔥 3-Day Streak', 'Learned for 3 days in a row', 'streak', '🔥', 30, '{"type":"streak","days":3}', 10),
('ach-streak-7', '⚡ Week Streak', 'Learned for 7 days in a row', 'streak', '⚡', 75, '{"type":"streak","days":7}', 11),
('ach-streak-14', '🌟 Two Week Streak', 'Learned for 14 days in a row', 'streak', '🌟', 150, '{"type":"streak","days":14}', 12),
('ach-streak-30', '💎 Month Streak', 'Learned for 30 days in a row', 'streak', '💎', 300, '{"type":"streak","days":30}', 13),
('ach-streak-100', '👑 Legendary Streak', 'Learned for 100 days in a row', 'streak', '👑', 1000, '{"type":"streak","days":100}', 14);

-- MASTERY BADGES (Skill progression)
INSERT OR REPLACE INTO achievements (id, name, description, category, icon, xp_reward, unlock_criteria, sort_order) VALUES
('ach-5-lessons', '📚 Learning Rookie', 'Completed 5 lessons', 'mastery', '📚', 50, '{"type":"lesson_count","count":5}', 20),
('ach-10-lessons', '🎯 Dedicated Learner', 'Completed 10 lessons', 'mastery', '🎯', 100, '{"type":"lesson_count","count":10}', 21),
('ach-25-lessons', '🚀 Rising Star', 'Completed 25 lessons', 'mastery', '🚀', 250, '{"type":"lesson_count","count":25}', 22),
('ach-50-lessons', '💫 Content Creator', 'Completed 50 lessons', 'mastery', '💫', 500, '{"type":"lesson_count","count":50}', 23),
('ach-100-lessons', '🏆 Master Creator', 'Completed 100 lessons', 'mastery', '🏆', 1000, '{"type":"lesson_count","count":100}', 24);

-- CREATIVE BADGES (Project-based)
INSERT OR REPLACE INTO achievements (id, name, description, category, icon, xp_reward, unlock_criteria, sort_order) VALUES
('ach-5-projects', '🎬 Storyteller', 'Submitted 5 projects', 'creative', '🎬', 75, '{"type":"project_count","count":5}', 30),
('ach-10-projects', '📸 Visual Artist', 'Submitted 10 projects', 'creative', '📸', 150, '{"type":"project_count","count":10}', 31),
('ach-photo-master', '📷 Photo Master', 'Submitted 10 photo projects', 'creative', '📷', 200, '{"type":"project_type","media":"photo","count":10}', 32),
('ach-video-master', '🎥 Video Master', 'Submitted 10 video projects', 'creative', '🎥', 200, '{"type":"project_type","media":"video","count":10}', 33);

-- SPECIAL BADGES (Unique achievements)
INSERT OR REPLACE INTO achievements (id, name, description, category, icon, xp_reward, unlock_criteria, sort_order) VALUES
('ach-early-bird', '🌅 Early Bird', 'Logged in before 7am', 'special', '🌅', 25, '{"type":"time_based","before":"07:00"}', 40),
('ach-night-owl', '🦉 Night Owl', 'Completed a lesson after 9pm', 'special', '🦉', 25, '{"type":"time_based","after":"21:00"}', 41),
('ach-speed-demon', '⚡ Speed Learner', 'Completed a lesson in under 10 minutes', 'special', '⚡', 50, '{"type":"speed","max_minutes":10}', 42),
('ach-perfectionist', '✨ Perfectionist', 'Watched a video to 100% completion', 'special', '✨', 30, '{"type":"video_complete","percent":100}', 43);

-- LEVEL UP REWARDS (XP thresholds and rank titles)
-- Level 1: 0-99 XP = "Beginner Creator"
-- Level 2: 100-299 XP = "Explorer"
-- Level 3: 300-599 XP = "Adventurer"
-- Level 4: 600-999 XP = "Storyteller"
-- Level 5: 1000-1499 XP = "Filmmaker"
-- Level 6: 1500-2199 XP = "Creative Pro"
-- Level 7: 2200-2999 XP = "Visual Master"
-- Level 8: 3000+ XP = "Legend"
