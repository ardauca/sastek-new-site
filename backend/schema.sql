-- SASTEK D1 Database Schema V2
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
  lat            REAL,
  lng            REAL,
  map_url        TEXT,
  is_active      INTEGER NOT NULL DEFAULT 1,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Sponsors
CREATE TABLE IF NOT EXISTS sponsors (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  logo_url   TEXT,
  website    TEXT,
  tier       TEXT NOT NULL DEFAULT 'standard' CHECK(tier IN ('platinum', 'gold', 'silver', 'standard')),
  is_active  INTEGER NOT NULL DEFAULT 1,
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

-- Events
CREATE TABLE IF NOT EXISTS events (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT UNIQUE NOT NULL,
  title_tr      TEXT NOT NULL,
  title_en      TEXT NOT NULL,
  summary_tr    TEXT,
  summary_en    TEXT,
  description_tr TEXT,
  description_en TEXT,
  category_tr   TEXT,
  category_en   TEXT,
  location_tr   TEXT,
  location_en   TEXT,
  image_url     TEXT,
  status        TEXT DEFAULT 'planned',
  is_featured   INTEGER NOT NULL DEFAULT 0,
  show_details  INTEGER NOT NULL DEFAULT 0,
  is_active     INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Team Members
CREATE TABLE IF NOT EXISTS team (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  name         TEXT NOT NULL,
  role_tr      TEXT NOT NULL,
  role_en      TEXT NOT NULL,
  email        TEXT,
  avatar_url   TEXT,
  linkedin_url TEXT,
  order_num    INTEGER DEFAULT 0,
  is_active    INTEGER NOT NULL DEFAULT 1,
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Social Links
CREATE TABLE IF NOT EXISTS socials (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  platform  TEXT NOT NULL,
  label     TEXT NOT NULL,
  url       TEXT NOT NULL,
  icon      TEXT,
  order_num INTEGER DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1
);

-- Admin Users
CREATE TABLE IF NOT EXISTS admins (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  username      TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);
