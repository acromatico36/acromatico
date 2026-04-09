-- ============================================================
-- ENROLLMENT AGREEMENTS TRACKING
-- Store signed enrollment agreements with timestamp, IP, signature
-- ============================================================

-- Add agreement fields to enrollments table
ALTER TABLE enrollments ADD COLUMN agreement_signed INTEGER DEFAULT 0;
ALTER TABLE enrollments ADD COLUMN agreement_version TEXT;
ALTER TABLE enrollments ADD COLUMN signature_method TEXT; -- 'type' or 'draw'
ALTER TABLE enrollments ADD COLUMN signature_data TEXT; -- typed name or base64 canvas data
ALTER TABLE enrollments ADD COLUMN signature_timestamp DATETIME;
ALTER TABLE enrollments ADD COLUMN signature_ip_address TEXT;
ALTER TABLE enrollments ADD COLUMN billing_type TEXT; -- 'Monthly' or 'Annual'
ALTER TABLE enrollments ADD COLUMN students_count INTEGER DEFAULT 1;
ALTER TABLE enrollments ADD COLUMN monthly_total REAL;
ALTER TABLE enrollments ADD COLUMN stripe_session_id TEXT;
ALTER TABLE enrollments ADD COLUMN stripe_customer_id TEXT;
ALTER TABLE enrollments ADD COLUMN stripe_subscription_id TEXT;

-- Create index for quick lookup
CREATE INDEX IF NOT EXISTS idx_enrollments_stripe_session ON enrollments(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_parent_email ON enrollments(student_id);
