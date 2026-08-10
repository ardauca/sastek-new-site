-- SASTEK D1 Database Schema
-- Run: wrangler d1 execute sastek-db --file=schema.sql

-- Categories for shops/partners
CREATE TABLE IF NOT EXISTS categories (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  name_tr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  icon    TEXT
);

-- Anlaşmalı Noktalar (Partner Shops)
CREATE TABLE IF NOT EXISTS shops (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  name           TEXT NOT NULL,
  category_id    INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  discount       TEXT,
  description_tr TEXT,
  description_en TEXT,
  logo_url       TEXT,
  website        TEXT,
  address        TEXT,
  phone          TEXT,
  is_active      INTEGER NOT NULL DEFAULT 1,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Sponsors
CREATE TABLE IF NOT EXISTS sponsors (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  name      TEXT NOT NULL,
  logo_url  TEXT,
  website   TEXT,
  tier      TEXT NOT NULL DEFAULT 'standard' CHECK(tier IN ('platinum', 'gold', 'silver', 'standard')),
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  url         TEXT NOT NULL,
  caption_tr  TEXT,
  caption_en  TEXT,
  event_tag   TEXT,
  width       INTEGER,
  height      INTEGER,
  file_size   INTEGER,
  uploaded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Admin Users
CREATE TABLE IF NOT EXISTS admins (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  username      TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Seed: Default categories
INSERT OR IGNORE INTO categories (id, name_tr, name_en, icon) VALUES
  (1, 'Yemek & İçecek',  'Food & Drink',    '🍽️'),
  (2, 'Eğitim',          'Education',        '📚'),
  (3, 'Teknoloji',       'Technology',       '💻'),
  (4, 'Sağlık',          'Health',           '🏥'),
  (5, 'Spor',            'Sports',           '⚽'),
  (6, 'Diğer',           'Other',            '🏪');
