-- SASTEK D1 Migration V6: QR Codes and Analytics
-- Run: wrangler d1 execute sastek-db --file=migrate_v6.sql

CREATE TABLE IF NOT EXISTS qr_codes (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT UNIQUE NOT NULL,
  target_url  TEXT NOT NULL,
  title       TEXT NOT NULL,
  is_active   INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS qr_scans (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  qr_id       INTEGER NOT NULL REFERENCES qr_codes(id) ON DELETE CASCADE,
  scanned_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_qr_codes_slug ON qr_codes(slug);
CREATE INDEX IF NOT EXISTS idx_qr_scans_qr_date ON qr_scans(qr_id, scanned_at);
CREATE INDEX IF NOT EXISTS idx_qr_scans_date ON qr_scans(scanned_at);
