-- Seed script to create all tables manually (bypass migration conflicts)

-- Projects table (from 0010)
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  project_name TEXT NOT NULL,
  project_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'discovery',
  priority TEXT NOT NULL DEFAULT 'P2',
  start_date TEXT,
  target_delivery TEXT,
  actual_delivery TEXT,
  days_remaining INTEGER,
  project_lead TEXT,
  assigned_team TEXT,
  progress_percent INTEGER DEFAULT 0,
  current_milestone TEXT,
  estimated_hours INTEGER,
  actual_hours INTEGER DEFAULT 0,
  budget_dollars INTEGER,
  spent_dollars INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Insert sample projects
INSERT OR IGNORE INTO projects (id, client_id, project_name, project_type, status, priority, start_date, target_delivery, project_lead, estimated_hours, budget_dollars, progress_percent, days_remaining) VALUES
('proj-001', 'client-joes-pizza', 'Joe''s Pizza - Brand Identity + Website', 'branding', 'design', 'P1', '2026-03-15', '2026-05-15', 'Italo', 160, 24000, 35, 49),
('proj-002', 'client-fitpro', 'FitPro App - Software Development', 'software', 'development', 'P2', '2026-03-01', '2026-06-01', 'Italo', 320, 48000, 60, 66),
('proj-003', 'client-boutique', 'Bella Boutique - Photography Package', 'photography', 'review', 'P2', '2026-03-20', '2026-04-10', 'Italo', 40, 6000, 90, 14);

-- Project milestones
CREATE TABLE IF NOT EXISTS project_milestones (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  milestone_name TEXT NOT NULL,
  milestone_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  planned_start TEXT,
  planned_end TEXT,
  actual_start TEXT,
  actual_end TEXT,
  depends_on TEXT,
  blocks TEXT,
  deliverables TEXT,
  completion_criteria TEXT,
  assigned_to TEXT,
  reviewer TEXT,
  progress_percent INTEGER DEFAULT 0,
  hours_estimated INTEGER,
  hours_actual INTEGER DEFAULT 0,
  notes TEXT,
  blockers TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Sample milestones for project 1
INSERT OR IGNORE INTO project_milestones (id, project_id, milestone_name, milestone_type, status, planned_start, planned_end, progress_percent) VALUES
('ms-001', 'proj-001', 'Brand Discovery', 'discovery', 'completed', '2026-03-15', '2026-03-22', 100),
('ms-002', 'proj-001', 'Logo Design', 'design', 'in_progress', '2026-03-23', '2026-04-05', 70),
('ms-003', 'proj-001', 'Website Development', 'development', 'pending', '2026-04-06', '2026-05-01', 0),
('ms-004', 'proj-001', 'Final Review', 'review', 'pending', '2026-05-02', '2026-05-10', 0),
('ms-005', 'proj-001', 'Launch', 'delivery', 'pending', '2026-05-11', '2026-05-15', 0);

-- Project deliverables
CREATE TABLE IF NOT EXISTS project_deliverables (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  milestone_id TEXT,
  deliverable_name TEXT NOT NULL,
  deliverable_type TEXT NOT NULL,
  file_type TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  file_url TEXT,
  preview_url TEXT,
  version INTEGER DEFAULT 1,
  requires_review BOOLEAN DEFAULT 1,
  reviewed_by TEXT,
  review_notes TEXT,
  approved_at TEXT,
  delivered_to TEXT,
  delivered_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (milestone_id) REFERENCES project_milestones(id)
);

-- Brand questionnaire
CREATE TABLE IF NOT EXISTS brand_questionnaire (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  business_name TEXT,
  tagline TEXT,
  mission_statement TEXT,
  vision_statement TEXT,
  target_audience TEXT,
  customer_pain_points TEXT,
  unique_value_prop TEXT,
  brand_adjectives TEXT,
  brand_voice TEXT,
  brand_emotions TEXT,
  color_preferences TEXT,
  color_dislikes TEXT,
  font_preferences TEXT,
  style_references TEXT,
  competitors TEXT,
  needs_logo BOOLEAN DEFAULT 0,
  needs_website BOOLEAN DEFAULT 0,
  needs_brand_guide BOOLEAN DEFAULT 0,
  needs_social_media BOOLEAN DEFAULT 0,
  needs_photography BOOLEAN DEFAULT 0,
  needs_education BOOLEAN DEFAULT 0,
  existing_assets TEXT,
  must_haves TEXT,
  must_not_haves TEXT,
  inspiration_links TEXT,
  completed BOOLEAN DEFAULT 0,
  completed_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Project activity log
CREATE TABLE IF NOT EXISTS project_activity (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  description TEXT NOT NULL,
  user_id TEXT,
  user_name TEXT,
  metadata TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_priority ON projects(priority);
CREATE INDEX IF NOT EXISTS idx_milestones_project ON project_milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_deliverables_project ON project_deliverables(project_id);
CREATE INDEX IF NOT EXISTS idx_activity_project ON project_activity(project_id);
