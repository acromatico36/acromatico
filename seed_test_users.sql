-- Seed test users for education platform

-- Insert admin user (email: admin@acromatico.com, password: admin123)
-- Password hash generated with bcrypt
INSERT OR IGNORE INTO users (id, email, password_hash, role, first_name, last_name) VALUES 
('admin-001', 'admin@acromatico.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin', 'Admin', 'User');

-- Insert test parent (email: parent@test.com, password: parent123)
INSERT OR IGNORE INTO users (id, email, password_hash, role, first_name, last_name) VALUES 
('parent-001', 'parent@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'parent', 'Sarah', 'Johnson');

-- Insert test students linked to parent
INSERT OR IGNORE INTO students (id, parent_id, first_name, last_name, age, grade) VALUES 
('student-001', 'parent-001', 'Emma', 'Johnson', 12, '7th'),
('student-002', 'parent-001', 'Liam', 'Johnson', 10, '5th');

-- Insert sample course
INSERT OR IGNORE INTO courses (id, title, description, month, year, status) VALUES 
('course-001', 'January Photography Course', 'Learn photography fundamentals', 'January', 2026, 'published');

-- Create sample subscription
INSERT OR IGNORE INTO subscriptions (id, parent_id, student_ids, num_students, monthly_price, billing_cycle, status) VALUES 
('sub-001', 'parent-001', '["student-001", "student-002"]', 2, 58, 'monthly', 'active');
