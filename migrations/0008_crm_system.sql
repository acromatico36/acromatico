-- ============================================================
-- ACROMATICO CRM SYSTEM
-- AI-Powered Client Relationship & Task Management
-- ============================================================

-- CRM Clients (businesses hiring Acromatico for branding/web/app work)
CREATE TABLE IF NOT EXISTS crm_clients (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  company TEXT,
  phone_number TEXT UNIQUE,
  email TEXT,
  tier TEXT DEFAULT 'standard', -- 'premium', 'standard', 'trial'
  status TEXT DEFAULT 'active', -- 'active', 'lead', 'churned'
  
  -- Quick stats
  total_projects INTEGER DEFAULT 0,
  active_projects INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  CHECK (tier IN ('premium', 'standard', 'trial')),
  CHECK (status IN ('active', 'lead', 'churned', 'paused'))
);

-- CRM Projects (client engagements)
CREATE TABLE IF NOT EXISTS crm_projects (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  client_id TEXT NOT NULL REFERENCES crm_clients(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  project_type TEXT, -- 'branding', 'website', 'web_app', 'mobile_app', 'seo', 'consulting'
  tech_stack TEXT, -- JSON: ["React", "Node.js", "PostgreSQL"]
  
  status TEXT DEFAULT 'active', -- 'active', 'on_hold', 'completed', 'cancelled'
  budget_hours INTEGER,
  hours_used INTEGER DEFAULT 0,
  budget_remaining INTEGER,
  
  deadline DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  
  CHECK (status IN ('active', 'on_hold', 'completed', 'cancelled'))
);

-- CRM Messages (all incoming client communications)
CREATE TABLE IF NOT EXISTS crm_messages (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  client_id TEXT REFERENCES crm_clients(id) ON DELETE SET NULL,
  project_id TEXT REFERENCES crm_projects(id) ON DELETE SET NULL,
  
  source TEXT NOT NULL, -- 'sms', 'whatsapp', 'email', 'portal', 'phone'
  phone_number TEXT,
  email_address TEXT,
  body TEXT NOT NULL,
  
  -- Agent 1: Classification Results
  message_type TEXT, -- 'BUSINESS_PROJECT', 'BUSINESS_ADMIN', 'PERSONAL', 'SPAM'
  category TEXT, -- 'bug_critical', 'feature_request', 'design_change', 'content_update', etc.
  urgency TEXT, -- 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'
  sentiment TEXT, -- 'ENTHUSIASTIC', 'POSITIVE', 'NEUTRAL', 'FRUSTRATED', 'ANGRY'
  action_required TEXT, -- 'create_task', 'escalate_immediately', 'needs_clarification', 'auto_resolve', 'ignore'
  confidence_score REAL, -- 0.0 to 1.0
  
  -- Processing metadata
  processed_at DATETIME,
  auto_response_sent TEXT,
  escalated INTEGER DEFAULT 0, -- 0 = false, 1 = true
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  CHECK (message_type IN ('BUSINESS_PROJECT', 'BUSINESS_ADMIN', 'PERSONAL', 'SPAM', 'UNKNOWN')),
  CHECK (urgency IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')),
  CHECK (sentiment IN ('ENTHUSIASTIC', 'POSITIVE', 'NEUTRAL', 'FRUSTRATED', 'ANGRY', 'UNKNOWN'))
);

-- CRM Tasks (auto-generated from messages)
CREATE TABLE IF NOT EXISTS crm_tasks (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  message_id TEXT REFERENCES crm_messages(id) ON DELETE SET NULL,
  project_id TEXT REFERENCES crm_projects(id) ON DELETE CASCADE,
  client_id TEXT REFERENCES crm_clients(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  priority TEXT, -- 'P1', 'P2', 'P3', 'P4'
  effort TEXT, -- 'XS', 'S', 'M', 'L', 'XL'
  estimated_hours REAL,
  
  status TEXT DEFAULT 'open', -- 'open', 'in_progress', 'blocked', 'completed', 'cancelled'
  assigned_to TEXT, -- User ID from users table
  
  -- Technical specifications (Agent 2 output)
  acceptance_criteria TEXT, -- JSON array as string
  technical_notes TEXT,
  scope_flag INTEGER DEFAULT 0, -- 0 = in scope, 1 = out of scope
  client_approval_required INTEGER DEFAULT 0,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  due_date DATETIME,
  completed_at DATETIME,
  
  CHECK (priority IN ('P1', 'P2', 'P3', 'P4')),
  CHECK (effort IN ('XS', 'S', 'M', 'L', 'XL')),
  CHECK (status IN ('open', 'in_progress', 'blocked', 'completed', 'cancelled'))
);

-- CRM Client Health Scores (Agent 3 output)
CREATE TABLE IF NOT EXISTS crm_client_health (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  client_id TEXT NOT NULL REFERENCES crm_clients(id) ON DELETE CASCADE,
  
  health_score INTEGER, -- 0-100
  churn_risk_level TEXT, -- 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
  sentiment_trend TEXT, -- 'improving', 'stable', 'declining'
  upsell_opportunities TEXT, -- JSON: [{"type": "mobile_app", "confidence": 0.8}]
  
  -- Factors
  response_time_avg_hours REAL,
  recent_frustration_count INTEGER,
  positive_feedback_count INTEGER,
  payment_history TEXT, -- 'excellent', 'good', 'late', 'problematic'
  
  calculated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  CHECK (churn_risk_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  CHECK (sentiment_trend IN ('improving', 'stable', 'declining'))
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_crm_clients_phone ON crm_clients(phone_number);
CREATE INDEX IF NOT EXISTS idx_crm_clients_status ON crm_clients(status);
CREATE INDEX IF NOT EXISTS idx_crm_projects_client ON crm_projects(client_id);
CREATE INDEX IF NOT EXISTS idx_crm_projects_status ON crm_projects(status);
CREATE INDEX IF NOT EXISTS idx_crm_messages_client ON crm_messages(client_id);
CREATE INDEX IF NOT EXISTS idx_crm_messages_project ON crm_messages(project_id);
CREATE INDEX IF NOT EXISTS idx_crm_messages_created ON crm_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_project ON crm_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_status ON crm_tasks(status);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_priority ON crm_tasks(priority);

-- ============================================================
-- SEED DATA: Sample clients and projects for testing
-- ============================================================

-- Sample Client 1: Local Restaurant
INSERT OR IGNORE INTO crm_clients (id, name, company, phone_number, email, tier, status) 
VALUES ('client-joes-pizza', 'Joe Martinez', 'Joes Gourmet Pizza', '+15555551234', 'joe@joespizza.com', 'standard', 'active');

-- Sample Project 1: Website Redesign
INSERT OR IGNORE INTO crm_projects (id, client_id, name, project_type, tech_stack, status, budget_hours, hours_used)
VALUES ('proj-joes-website', 'client-joes-pizza', 'Joes Pizza Website Redesign', 'website', '["React", "Tailwind", "Cloudflare Pages"]', 'active', 40, 15);

-- Sample Client 2: Fitness Startup
INSERT OR IGNORE INTO crm_clients (id, name, company, phone_number, email, tier, status)
VALUES ('client-fitpro', 'Sarah Chen', 'FitPro App', '+15555555678', 'sarah@fitproapp.com', 'premium', 'active');

-- Sample Project 2: Mobile App MVP
INSERT OR IGNORE INTO crm_projects (id, client_id, name, project_type, tech_stack, status, budget_hours, hours_used)
VALUES ('proj-fitpro-app', 'client-fitpro', 'FitPro Mobile App MVP', 'mobile_app', '["React Native", "Node.js", "MongoDB"]', 'active', 120, 45);

-- Sample Client 3: E-commerce Store
INSERT OR IGNORE INTO crm_clients (id, name, company, phone_number, email, tier, status)
VALUES ('client-boutique', 'Emily Rodriguez', 'Bella Boutique', '+15555559999', 'emily@bellaboutique.com', 'standard', 'active');

-- Sample Project 3: Online Store
INSERT OR IGNORE INTO crm_projects (id, client_id, name, project_type, tech_stack, status, budget_hours, hours_used)
VALUES ('proj-boutique-store', 'client-boutique', 'Bella Boutique E-commerce Store', 'web_app', '["Next.js", "Stripe", "Shopify API"]', 'active', 60, 28);
