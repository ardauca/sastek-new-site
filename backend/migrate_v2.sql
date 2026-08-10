-- Migration v2: Add lat, lng, map_url to shops, create events, team, socials tables
ALTER TABLE shops ADD COLUMN lat REAL;
ALTER TABLE shops ADD COLUMN lng REAL;
ALTER TABLE shops ADD COLUMN map_url TEXT;

-- Update ARC coordinates
UPDATE shops SET lat = 39.77758361376617, lng = 30.5139965830759, map_url = 'https://maps.app.goo.gl/AAxUxLVudZxujrnF6' WHERE name = 'ARC';

-- Create Events table
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

-- Seed Events
INSERT OR IGNORE INTO events (slug, title_tr, title_en, summary_tr, summary_en, description_tr, description_en, category_tr, category_en, location_tr, location_en, image_url, status, is_featured, show_details, is_active) VALUES
  ('coffee-talk', 'Coffee Talk', 'Coffee Talk', 'Alanında yetkin konuklarla samimi kariyer ve deneyim buluşmaları.', 'Informal career and experience meetups with qualified guests.', 'Coffee Talk, alanında yetkin kişileri Eskişehir’e davet ederek uygun ve samimi bir ortamda öğrencilerle buluşturmayı hedefleyen söyleşi formatıdır.', 'Coffee Talk is a conversation format that brings qualified guests to Eskişehir.', 'Sektör Buluşması', 'Industry Meetup', 'Konum güncellenecek', 'Location to be announced', '/images/events/coffeetalk.png', 'planned', 1, 0, 1),
  ('muhendisler-nerede', 'Mühendisler Nerede?', 'Where Are Engineers?', 'Farklı sektörlerde çalışan mühendislerden kariyer ve sektör deneyimleri.', 'Career and industry insights from engineers.', 'Mühendisler Nerede?, farklı sektörlerden mühendisleri öğrencilerle buluşturan çevrim içi bir etkinlik formatıdır.', 'Where Are Engineers? is an online event format.', 'Kariyer', 'Career', 'Konum güncellenecek', 'Location to be announced', '/images/events/muhnerde.png', 'planned', 1, 0, 1),
  ('savunma-gunlukleri', 'Savunma Günlükleri', 'Defence Diaries', 'Türk savunma sanayii temsilcileriyle öğrenci-yetkili buluşmaları.', 'Student-professional meetups with defence industry representatives.', 'Savunma Günlükleri, Türk savunma sanayiinin önde gelen şirketlerini öğrencilerle buluşturan etkinlik serisidir.', 'Defence Diaries is an event series connecting students with industry leads.', 'Savunma Sanayii', 'Defence Industry', 'Konum güncellenecek', 'Location to be announced', '/images/events/savunmagunlukleri.png', 'planned', 1, 0, 1),
  ('teknik-gezi', 'Teknik Geziler', 'Technical Visits', 'Firmaları, üretim alanlarını ve çalışma ortamlarını yerinde tanıma fırsatı.', 'First-hand access to companies and production areas.', 'Teknik geziler, kulüp üyelerinin Türkiye’nin önde gelen firmalarını şehir içi ve şehir dışı ziyaretlerle yerinde tanımasını sağlar.', 'Technical visits allow club members to explore leading companies.', 'Teknik Gezi', 'Technical Visit', 'Konum güncellenecek', 'Location to be announced', '/images/events/teknikgezi.png', 'planned', 0, 0, 1),
  ('egitimler', 'Eğitimler', 'Training', 'Topluluğun ihtiyaçlarına göre planlanan sertifikalı eğitimler.', 'Certified trainings shaped around community needs.', 'Eğitimler, kulüp topluluğunun talepleri ve ihtiyaçları doğrultusunda düzenlenir.', 'Training programmes are planned according to community needs.', 'Eğitim', 'Training', 'Konum güncellenecek', 'Location to be announced', '/images/events/egitimler.png', 'planned', 0, 0, 1),
  ('sosyal-etkinlikler', 'Sosyal Etkinlikler', 'Social Events', 'Kulüp kültürünü, ekip çalışmasını ve sosyal bağı güçlendiren buluşmalar.', 'Meetups that strengthen club culture and teamwork.', 'Sosyal etkinlik ve workshoplar, üyelerin kişisel gelişimine katkıda bulunmayı hedefler.', 'Social events and workshops support personal development.', 'Sosyal', 'Social', 'Konum güncellenecek', 'Location to be announced', '/images/events/sosyaletkinlik.png', 'planned', 0, 0, 1);

-- Create Team table
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

-- Seed Team
INSERT OR IGNORE INTO team (id, name, role_tr, role_en, email, linkedin_url, order_num, is_active) VALUES
  (1, 'Emre Uça', 'Kulüp Başkanı', 'Club President', 'emreuca.sastek@gmail.com', 'https://www.linkedin.com/in/emreuca/', 1, 1),
  (2, 'Nigar Özçelik', 'Kulüp Başkan Yardımcısı', 'Club Vice President', 'nigarozceliksastek@gmail.com', 'https://www.linkedin.com/in/nigar-%C3%B6z%C3%A7elik-712281332/', 2, 1),
  (3, 'Güneş Mart', 'Kulüp Başkan Yardımcısı', 'Club Vice President', 'gunesmart.sastek@gmail.com', 'https://www.linkedin.com/in/gunesmart/', 3, 1);

-- Create Socials table
CREATE TABLE IF NOT EXISTS socials (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  platform  TEXT NOT NULL,
  label     TEXT NOT NULL,
  url       TEXT NOT NULL,
  icon      TEXT,
  order_num INTEGER DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1
);

-- Seed Socials
INSERT OR IGNORE INTO socials (id, platform, label, url, icon, order_num, is_active) VALUES
  (1, 'instagram', 'Instagram', 'https://www.instagram.com/esastek/', 'instagram', 1, 1),
  (2, 'linkedin', 'LinkedIn', 'https://www.linkedin.com/company/savunma-sanayii-ve-teknolojileri-kul%C3%BCb%C3%BC/', 'linkedin', 2, 1),
  (3, 'youtube', 'YouTube', 'https://youtube.com/@esastek', 'youtube', 3, 1),
  (4, 'x', 'Twitter/X', 'https://x.com/esastek', 'x', 4, 1);
