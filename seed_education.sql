-- Seed data for testing

-- Insert admin user (password: admin123)
INSERT OR IGNORE INTO users (email, password_hash, role, first_name, last_name) VALUES 
('admin@acromatico.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin', 'Admin', 'User');

-- Insert parent users (password: parent123)
INSERT OR IGNORE INTO users (email, password_hash, role, first_name, last_name, phone) VALUES 
('parent1@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'parent', 'Sarah', 'Johnson', '305-555-0001'),
('parent2@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'parent', 'Michael', 'Chen', '305-555-0002');

-- Insert student users (password: student123)
INSERT OR IGNORE INTO users (email, password_hash, role, first_name, last_name) VALUES 
('emma@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'student', 'Emma', 'Johnson'),
('liam@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'student', 'Liam', 'Chen'),
('olivia@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'student', 'Olivia', 'Martinez');

-- Link students to parents
INSERT OR IGNORE INTO students (user_id, parent_id, age, grade_level) VALUES 
((SELECT id FROM users WHERE email = 'emma@example.com'), (SELECT id FROM users WHERE email = 'parent1@example.com'), 12, '7th Grade'),
((SELECT id FROM users WHERE email = 'liam@example.com'), (SELECT id FROM users WHERE email = 'parent2@example.com'), 10, '5th Grade'),
((SELECT id FROM users WHERE email = 'olivia@example.com'), (SELECT id FROM users WHERE email = 'parent2@example.com'), 14, '9th Grade');

-- Insert sample courses
INSERT OR IGNORE INTO courses (title, slug, description, category, age_range, duration_weeks, price, is_published) VALUES 
('Photography Foundations', 'photography-foundations', 'Learn the fundamentals of photography: composition, lighting, and storytelling through images.', 'photography', '7-9 years', 8, 29, 1),
('Digital Photography Mastery', 'digital-photography-mastery', 'Master camera settings, advanced composition, and post-processing for young photographers.', 'photography', '10-12 years', 12, 49, 1),
('Photography as Business', 'photography-as-business', 'Turn your photography skills into a real business. Learn pricing, client work, and marketing.', 'photography', '13-14 years', 16, 79, 1),
('Filmmaking Basics', 'filmmaking-basics', 'Create compelling short films and social media content using just your phone.', 'filmmaking', '10-14 years', 10, 49, 1);

-- Insert sample lessons for Photography Foundations
INSERT OR IGNORE INTO lessons (course_id, title, slug, description, duration_minutes, order_index, is_published) VALUES 
((SELECT id FROM courses WHERE slug = 'photography-foundations'), 'Welcome to Photography', 'welcome-to-photography', 'Introduction to the course and what you will learn.', 15, 1, 1),
((SELECT id FROM courses WHERE slug = 'photography-foundations'), 'How Light Creates Emotion', 'light-creates-emotion', 'Understand how different lighting affects the mood of your photos.', 20, 2, 1),
((SELECT id FROM courses WHERE slug = 'photography-foundations'), 'Composition Basics', 'composition-basics', 'Learn the rule of thirds and other composition techniques.', 25, 3, 1),
((SELECT id FROM courses WHERE slug = 'photography-foundations'), 'Your First Photo Essay', 'first-photo-essay', 'Create a series of photos that tell a story.', 30, 4, 1);

-- Insert sample lessons for Digital Photography Mastery
INSERT OR IGNORE INTO lessons (course_id, title, slug, description, duration_minutes, order_index, is_published) VALUES 
((SELECT id FROM courses WHERE slug = 'digital-photography-mastery'), 'Camera Fundamentals', 'camera-fundamentals', 'Master aperture, shutter speed, and ISO.', 30, 1, 1),
((SELECT id FROM courses WHERE slug = 'digital-photography-mastery'), 'Lighting Techniques', 'lighting-techniques', 'Learn to sculpt light like a professional.', 35, 2, 1),
((SELECT id FROM courses WHERE slug = 'digital-photography-mastery'), 'Post-Processing Basics', 'post-processing-basics', 'Introduction to Lightroom and basic editing.', 40, 3, 1);

-- Enroll students in courses
INSERT OR IGNORE INTO enrollments (student_id, course_id, progress_percentage, status) VALUES 
((SELECT id FROM students WHERE user_id = (SELECT id FROM users WHERE email = 'emma@example.com')), (SELECT id FROM courses WHERE slug = 'digital-photography-mastery'), 35, 'active'),
((SELECT id FROM students WHERE user_id = (SELECT id FROM users WHERE email = 'liam@example.com')), (SELECT id FROM courses WHERE slug = 'photography-foundations'), 60, 'active'),
((SELECT id FROM students WHERE user_id = (SELECT id FROM users WHERE email = 'olivia@example.com')), (SELECT id FROM courses WHERE slug = 'photography-as-business'), 15, 'active');

-- Mark some lessons as completed
INSERT OR IGNORE INTO lesson_progress (enrollment_id, lesson_id, completed, completed_at, time_spent_minutes) VALUES 
(1, 1, 1, datetime('now', '-5 days'), 35),
(1, 2, 1, datetime('now', '-3 days'), 42),
(2, 1, 1, datetime('now', '-10 days'), 20),
(2, 2, 1, datetime('now', '-8 days'), 25),
(2, 3, 1, datetime('now', '-6 days'), 30),
(3, 1, 1, datetime('now', '-2 days'), 32);
