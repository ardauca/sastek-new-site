-- Seed Sponsors
INSERT OR IGNORE INTO sponsors (id, name, logo_url, website, tier, is_active) VALUES
  (1, 'Sponsor bilgisi güncellenecek', 'https://sastek.org/images/sponsors/sample-sponsor.png', NULL, 'standard', 1);

-- Seed Gallery
INSERT OR IGNORE INTO gallery (id, url, caption_tr, caption_en, event_tag) VALUES
  (1, 'https://sastek.org/images/gallery/galeri-1.jpg', 'SASTEK etkinliğinden katılımcılar', 'Participants at a SASTEK event', 'Etkinlik'),
  (2, 'https://sastek.org/images/gallery/galeri-2.jpg', 'SASTEK ekip buluşması', 'SASTEK team gathering', 'Topluluk'),
  (3, 'https://sastek.org/images/gallery/galeri-3.jpg', 'Teknik etkinlik sunumu', 'Technical event presentation', 'Etkinlik'),
  (4, 'https://sastek.org/images/gallery/galeri-4.jpg', 'Kulüp üyeleri bir arada', 'Club members together', 'Topluluk'),
  (5, 'https://sastek.org/images/gallery/galeri-5.jpg', 'SASTEK sosyal etkinliği', 'SASTEK social event', 'Sosyal');
