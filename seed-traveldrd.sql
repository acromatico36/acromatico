-- ============================================================
-- TravelDRD CLIENT & PROJECT DATA
-- Vacation Rental Management Platform
-- ============================================================

-- TravelDRD Client
INSERT OR IGNORE INTO crm_clients (
  id, 
  name, 
  company, 
  phone_number, 
  email, 
  tier, 
  status,
  total_projects,
  active_projects,
  total_spent
) VALUES (
  'client-traveldrd',
  'TravelDRD Team',
  'TravelDRD',
  '+18095551234',
  'info@traveldrd.com',
  'premium',
  'active',
  1,
  1,
  25000
);

-- TravelDRD Platform Project
INSERT OR IGNORE INTO crm_projects (
  id,
  client_id,
  name,
  project_type,
  tech_stack,
  status,
  budget_hours,
  hours_used,
  created_at
) VALUES (
  'proj-traveldrd-platform',
  'client-traveldrd',
  'TravelDRD Vacation Rental Platform',
  'web_app',
  '["HTML5", "TailwindCSS", "Cloudinary", "Airtable", "jsPDF", "Stripe/PayPal/Zelle/Venmo"]',
  'completed',
  200,
  200,
  '2024-11-01 00:00:00'
);

-- TravelDRD Client Health Score
INSERT OR IGNORE INTO crm_client_health (
  id,
  client_id,
  health_score,
  churn_risk_level,
  sentiment_trend,
  response_time_avg_hours,
  recent_frustration_count,
  positive_feedback_count,
  payment_history
) VALUES (
  'health-traveldrd',
  'client-traveldrd',
  95,
  'LOW',
  'stable',
  2.5,
  0,
  12,
  'excellent'
);
