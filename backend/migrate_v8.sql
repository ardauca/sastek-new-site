-- SASTEK D1 Migration V8: Sponsor sort_order and is_featured
-- Run: wrangler d1 execute sastek-db --file=migrate_v8.sql

ALTER TABLE sponsors ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 0;
ALTER TABLE sponsors ADD COLUMN is_featured INTEGER NOT NULL DEFAULT 0;

-- Preserve existing order by setting sort_order = id for existing rows
UPDATE sponsors SET sort_order = id WHERE sort_order = 0;
