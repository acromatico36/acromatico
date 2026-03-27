-- Project Pipeline System for Creative Agency Management
-- Tracks: Brand Discovery → Design → Development → Delivery

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  project_name TEXT NOT NULL,
  project_type TEXT NOT NULL, -- 'branding', 'website', 'software', 'photography', 'education'
  status TEXT NOT NULL DEFAULT 'discovery', -- 'discovery', 'design', 'development', 'review', 'delivered', 'paused', 'cancelled'
  priority TEXT NOT NULL DEFAULT 'P2', -- P1 (urgent), P2 (high), P3 (normal), P4 (low)
  
  -- Timeline
  start_date TEXT,
  target_delivery TEXT,
  actual_delivery TEXT,
  days_remaining INTEGER,
  
  -- Team
  project_lead TEXT,
  assigned_team TEXT, -- JSON array of team members
  
  -- Progress
  progress_percent INTEGER DEFAULT 0,
  current_milestone TEXT,
  
  -- Budget
  estimated_hours INTEGER,
  actual_hours INTEGER DEFAULT 0,
  budget_dollars INTEGER,
  spent_dollars INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Project Milestones Table
CREATE TABLE IF NOT EXISTS project_milestones (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  milestone_name TEXT NOT NULL,
  milestone_type TEXT NOT NULL, -- 'discovery', 'design', 'development', 'review', 'delivery'
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'blocked'
  
  -- Timeline
  planned_start TEXT,
  planned_end TEXT,
  actual_start TEXT,
  actual_end TEXT,
  
  -- Dependencies
  depends_on TEXT, -- JSON array of milestone IDs
  blocks TEXT, -- JSON array of milestone IDs
  
  -- Deliverables
  deliverables TEXT, -- JSON array of deliverable names
  completion_criteria TEXT,
  
  -- Team
  assigned_to TEXT,
  reviewer TEXT,
  
  -- Progress
  progress_percent INTEGER DEFAULT 0,
  hours_estimated INTEGER,
  hours_actual INTEGER DEFAULT 0,
  
  -- Notes
  notes TEXT,
  blockers TEXT,
  
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Brand Discovery Questionnaire
CREATE TABLE IF NOT EXISTS brand_questionnaire (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  
  -- Core Brand Info
  business_name TEXT,
  tagline TEXT,
  mission_statement TEXT,
  vision_statement TEXT,
  
  -- Target Audience
  target_audience TEXT,
  customer_pain_points TEXT,
  unique_value_prop TEXT,
  
  -- Brand Personality
  brand_adjectives TEXT, -- JSON array
  brand_voice TEXT, -- 'professional', 'friendly', 'bold', 'minimalist', etc.
  brand_emotions TEXT, -- JSON array
  
  -- Visual Identity
  color_preferences TEXT,
  color_dislikes TEXT,
  font_preferences TEXT,
  style_references TEXT, -- JSON array of URLs
  competitors TEXT, -- JSON array of competitor names/URLs
  
  -- Deliverables Needed
  needs_logo BOOLEAN DEFAULT 0,
  needs_website BOOLEAN DEFAULT 0,
  needs_brand_guide BOOLEAN DEFAULT 0,
  needs_social_media BOOLEAN DEFAULT 0,
  needs_photography BOOLEAN DEFAULT 0,
  needs_education BOOLEAN DEFAULT 0,
  
  -- Additional Context
  existing_assets TEXT,
  must_haves TEXT,
  must_not_haves TEXT,
  inspiration_links TEXT, -- JSON array
  
  -- Status
  completed BOOLEAN DEFAULT 0,
  completed_at TEXT,
  
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Deliverables Tracking
CREATE TABLE IF NOT EXISTS project_deliverables (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  milestone_id TEXT,
  
  deliverable_name TEXT NOT NULL,
  deliverable_type TEXT NOT NULL, -- 'brand_guide', 'logo', 'website', 'photography', 'video', 'document'
  file_type TEXT, -- 'pdf', 'png', 'jpg', 'zip', 'url'
  
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'review', 'approved', 'delivered'
  
  -- Files
  file_url TEXT,
  preview_url TEXT,
  version INTEGER DEFAULT 1,
  
  -- Review
  requires_review BOOLEAN DEFAULT 1,
  reviewed_by TEXT,
  review_notes TEXT,
  approved_at TEXT,
  
  -- Delivery
  delivered_to TEXT,
  delivered_at TEXT,
  
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (milestone_id) REFERENCES project_milestones(id)
);

-- Project Activity Log
CREATE TABLE IF NOT EXISTS project_activity (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  
  activity_type TEXT NOT NULL, -- 'status_change', 'milestone_complete', 'file_upload', 'comment', 'deadline_changed'
  description TEXT NOT NULL,
  
  user_id TEXT,
  user_name TEXT,
  
  metadata TEXT, -- JSON for additional context
  
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Create Indexes
CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_priority ON projects(priority);
CREATE INDEX IF NOT EXISTS idx_projects_delivery ON projects(target_delivery);

CREATE INDEX IF NOT EXISTS idx_milestones_project ON project_milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_milestones_status ON project_milestones(status);

CREATE INDEX IF NOT EXISTS idx_deliverables_project ON project_deliverables(project_id);
CREATE INDEX IF NOT EXISTS idx_deliverables_status ON project_deliverables(status);

CREATE INDEX IF NOT EXISTS idx_activity_project ON project_activity(project_id);
CREATE INDEX IF NOT EXISTS idx_activity_created ON project_activity(created_at);
