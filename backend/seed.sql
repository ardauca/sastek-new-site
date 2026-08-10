-- Seed: Add Kafe and Sosyal Mekan categories (not in initial schema)
INSERT OR IGNORE INTO categories (id, name_tr, name_en, icon) VALUES
  (7, 'Kafe', 'Café', '☕'),
  (8, 'Sosyal Mekân', 'Social Venue', '🎲'),
  (9, 'Yeme–İçme', 'Food & Drink', '🍕');

-- Seed: Migrate existing partners from static data
INSERT INTO shops (name, category_id, discount, description_tr, description_en, logo_url, website, address, is_active) VALUES
  (
    'ARC',
    7,
    'SASTEK üyelerine özel %15 indirim',
    'ESTÜ yakınında yer alan ARC Kafe, SASTEK üyelerine özel indirim sunmaktadır.',
    'ARC Café, located near ESTÜ, offers an exclusive discount to SASTEK members.',
    'https://sastek.org/images/partners/arc-logo.png',
    NULL,
    'İstiklal, Porsuk Bulvari Su Sk No:43/B, 26010 Odunpazarı/Eskişehir',
    1
  ),
  (
    'Meeple',
    8,
    NULL,
    'SASTEK üyelerine özel avantaj sunmaktadır.',
    'Exclusive benefits for SASTEK members.',
    'https://sastek.org/images/partners/meeple.png',
    NULL,
    NULL,
    1
  ),
  (
    'Pizza Köy',
    9,
    NULL,
    'SASTEK üyelerine özel avantaj sunmaktadır.',
    'Exclusive benefits for SASTEK members.',
    'https://sastek.org/images/partners/pizzakoy.png',
    NULL,
    NULL,
    1
  ),
  (
    'Fox Gym',
    5,
    NULL,
    'SASTEK üyelerine özel avantaj sunmaktadır.',
    'Exclusive benefits for SASTEK members.',
    'https://sastek.org/images/partners/foxgym.png',
    NULL,
    NULL,
    1
  ),
  (
    'Walker''s',
    7,
    NULL,
    'SASTEK üyelerine özel avantaj sunmaktadır.',
    'Exclusive benefits for SASTEK members.',
    'https://sastek.org/images/partners/walkers.png',
    NULL,
    NULL,
    1
  );
