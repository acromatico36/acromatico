-- Demo data for Acromatico Education Platform - FIXED
-- Creates sample students and enrollments for testing

-- Student 1: Emma Johnson (Age 10)
INSERT INTO students (first_name, last_name, age, grade, parent_id)
SELECT 'Emma', 'Johnson', 10, '5th Grade', id FROM users WHERE email = 'italo@acromatico.com';

-- Student 2: Lucas Martinez (Age 13)
INSERT INTO students (first_name, last_name, age, grade, parent_id)
SELECT 'Lucas', 'Martinez', 13, '8th Grade', id FROM users WHERE email = 'italo@acromatico.com';

-- Student 3: Sophia Chen (Age 7)
INSERT INTO students (first_name, last_name, age, grade, parent_id)
SELECT 'Sophia', 'Chen', 7, '2nd Grade', id FROM users WHERE email = 'italo@acromatico.com';

-- Now enroll students in courses

-- Emma (10 years old) → Digital Photography Mastery
INSERT INTO enrollments (student_id, course_id, progress, status)
SELECT s.id, c.id, 35, 'active'
FROM students s, courses c
WHERE s.first_name = 'Emma' AND c.slug = 'digital-photography-mastery';

-- Emma → Intro to Filmmaking
INSERT INTO enrollments (student_id, course_id, progress, status)
SELECT s.id, c.id, 15, 'active'
FROM students s, courses c
WHERE s.first_name = 'Emma' AND c.slug = 'intro-to-filmmaking';

-- Lucas (13 years old) → Photography as Business
INSERT INTO enrollments (student_id, course_id, progress, status)
SELECT s.id, c.id, 62, 'active'
FROM students s, courses c
WHERE s.first_name = 'Lucas' AND c.slug = 'photography-as-business';

-- Lucas → Advanced Filmmaking
INSERT INTO enrollments (student_id, course_id, progress, status)
SELECT s.id, c.id, 28, 'active'
FROM students s, courses c
WHERE s.first_name = 'Lucas' AND c.slug = 'advanced-filmmaking-content-creation';

-- Sophia (7 years old) → Visual Thinking Foundation
INSERT INTO enrollments (student_id, course_id, progress, status)
SELECT s.id, c.id, 50, 'active'
FROM students s, courses c
WHERE s.first_name = 'Sophia' AND c.slug = 'visual-thinking-foundation';

-- Add some sample live classes for upcoming week

-- Photography Mastery - Upcoming class tomorrow 3 PM
INSERT INTO live_classes (course_id, class_number, title, description, scheduled_date, scheduled_time, duration_minutes, meeting_link, status)
SELECT 
  id, 
  7, 
  'Posing & Direction Masterclass', 
  'Learn how to direct subjects naturally and confidently for stunning portraits', 
  date('now', '+1 day'),
  '15:00',
  60,
  'https://zoom.us/j/demo123',
  'scheduled'
FROM courses WHERE slug = 'digital-photography-mastery';

-- Photography Business - Class day after tomorrow 4 PM
INSERT INTO live_classes (course_id, class_number, title, description, scheduled_date, scheduled_time, duration_minutes, meeting_link, status)
SELECT 
  id, 
  12, 
  'Client Acquisition Strategies', 
  'Master the art of finding and closing your first 5 clients', 
  date('now', '+2 days'),
  '16:00',
  90,
  'https://zoom.us/j/demo456',
  'scheduled'
FROM courses WHERE slug = 'photography-as-business';

-- Visual Thinking - Tomorrow morning 10 AM
INSERT INTO live_classes (course_id, class_number, title, description, scheduled_date, scheduled_time, duration_minutes, meeting_link, status)
SELECT 
  id, 
  4, 
  'Composition as Storytelling', 
  'How photographers tell stories without words using the rule of thirds', 
  date('now', '+1 day'),
  '10:00',
  45,
  'https://zoom.us/j/demo789',
  'scheduled'
FROM courses WHERE slug = 'visual-thinking-foundation';

-- Add some achievements
INSERT INTO achievements (name, description, icon, criteria_type, criteria_value) VALUES 
('First Steps', 'Completed your first lesson', '🎯', 'assignments_completed', 1),
('Quick Learner', 'Completed 5 assignments', '⚡', 'assignments_completed', 5),
('Dedicated Student', 'Attended 10 live classes', '🔥', 'classes_attended', 10),
('Perfect Week', 'Perfect attendance for one week', '✨', 'perfect_attendance', 7),
('Master Creator', 'Completed an entire course', '🏆', 'assignments_completed', 20);

-- Award some achievements to students
INSERT INTO student_achievements (student_id, achievement_id, awarded_by)
SELECT s.id, a.id, u.id
FROM students s, achievements a, users u
WHERE s.first_name = 'Emma' 
  AND a.name = 'First Steps'
  AND u.email = 'italo@acromatico.com';

INSERT INTO student_achievements (student_id, achievement_id, awarded_by)
SELECT s.id, a.id, u.id
FROM students s, achievements a, users u
WHERE s.first_name = 'Lucas' 
  AND a.name = 'Quick Learner'
  AND u.email = 'italo@acromatico.com';

INSERT INTO student_achievements (student_id, achievement_id, awarded_by)
SELECT s.id, a.id, u.id
FROM students s, achievements a, users u
WHERE s.first_name = 'Lucas' 
  AND a.name = 'Dedicated Student'
  AND u.email = 'italo@acromatico.com';

INSERT INTO student_achievements (student_id, achievement_id, awarded_by)
SELECT s.id, a.id, u.id
FROM students s, achievements a, users u
WHERE s.first_name = 'Sophia' 
  AND a.name = 'First Steps'
  AND u.email = 'italo@acromatico.com';
