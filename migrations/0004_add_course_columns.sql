-- Add missing columns to courses table for proper course data

ALTER TABLE courses ADD COLUMN slug TEXT;
ALTER TABLE courses ADD COLUMN category TEXT CHECK(category IN ('photography', 'filmmaking', 'brand-design', 'web-dev', 'saas-building'));
ALTER TABLE courses ADD COLUMN age_range TEXT;
ALTER TABLE courses ADD COLUMN duration_weeks INTEGER;
ALTER TABLE courses ADD COLUMN thumbnail_url TEXT;
ALTER TABLE courses ADD COLUMN trailer_url TEXT;
ALTER TABLE courses ADD COLUMN price REAL DEFAULT 99;
ALTER TABLE courses ADD COLUMN is_published INTEGER DEFAULT 1;

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published);
