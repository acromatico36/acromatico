-- Migration: Add updated_at column to crm_tasks
-- Created: 2026-03-24

ALTER TABLE crm_tasks ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Update existing records
UPDATE crm_tasks SET updated_at = created_at WHERE updated_at IS NULL;
