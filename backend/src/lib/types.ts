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

export interface Admin {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
}

// JWT payload
export interface JwtPayload {
  sub: number;    // admin id
  username: string;
  exp: number;
}
