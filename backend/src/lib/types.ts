// Cloudflare Worker environment bindings
export interface Env {
  DB: D1Database;
  MEDIA: R2Bucket;
  JWT_SECRET: string;
}

// D1 row types
export interface Shop {
  id: number;
  name: string;
  category_id: number | null;
  discount: string | null;
  description_tr: string | null;
  description_en: string | null;
  logo_url: string | null;
  website: string | null;
  address: string | null;
  phone: string | null;
  lat: number | null;
  lng: number | null;
  map_url: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name_tr: string;
  name_en: string;
  icon: string | null;
}

export interface Sponsor {
  id: number;
  name: string;
  logo_url: string | null;
  website: string | null;
  tier: 'platinum' | 'gold' | 'silver' | 'standard';
  is_active: number;
  created_at: string;
}

export interface GalleryItem {
  id: number;
  url: string;
  caption_tr: string | null;
  caption_en: string | null;
  event_tag: string | null;
  width: number | null;
  height: number | null;
  file_size: number | null;
  uploaded_at: string;
}

export interface EventRecord {
  id: number;
  slug: string;
  title_tr: string;
  title_en: string;
  summary_tr: string | null;
  summary_en: string | null;
  description_tr: string | null;
  description_en: string | null;
  category_tr: string | null;
  category_en: string | null;
  location_tr: string | null;
  location_en: string | null;
  image_url: string | null;
  status: string;
  is_featured: number;
  show_details: number;
  is_active: number;
  created_at: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role_tr: string;
  role_en: string;
  email: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  order_num: number;
  is_active: number;
  created_at: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  label: string;
  url: string;
  icon: string | null;
  order_num: number;
  is_active: number;
}

export interface Admin {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
}

export interface QrCode {
  id: number;
  slug: string;
  target_url: string;
  title: string;
  is_active: number;
  is_locked: number;
  created_at: string;
  updated_at: string;
}

export interface QrScan {
  id: number;
  qr_id: number;
  scanned_at: string;
}

export interface QrCodeWithStats extends QrCode {
  total_scans: number;
  today_scans: number;
  last_7d_scans: number;
  last_30d_scans: number;
  last_scanned_at: string | null;
}

// JWT payload
export interface JwtPayload {
  sub: number;    // admin id
  username: string;
  exp: number;
}
