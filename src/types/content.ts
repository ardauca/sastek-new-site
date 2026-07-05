export type Locale = 'tr' | 'en';
export type LocalizedText = Record<Locale, string>;

export type EventStatus = 'planned' | 'active' | 'past';

export interface EventItem {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  date?: string;
  location: LocalizedText;
  image: string;
  status: EventStatus;
  isFeatured: boolean;
  applicationUrl?: string;
  galleryIds?: string[];
}

export interface Partner {
  id: string;
  name: string;
  category: LocalizedText;
  discountLabel: LocalizedText;
  campaignText?: LocalizedText;
  description?: LocalizedText;
  logo: string;
  location?: string;
  mapUrl?: string;
  instagramUrl?: string;
  websiteUrl?: string;
  phone?: string;
  isActive: boolean;
  isFeatured: boolean;
  isVerified: boolean;
  order: number;
}

export type SponsorTier = 'ana-sponsor' | 'altin' | 'gumus' | 'bronz' | 'destekci' | 'partner';

export interface Sponsor {
  id: string;
  name: string;
  tier: SponsorTier;
  description?: LocalizedText;
  logo: string;
  websiteUrl?: string;
  instagramUrl?: string;
  isActive: boolean;
  isFeatured: boolean;
  isVerified: boolean;
  order: number;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: LocalizedText;
  category: LocalizedText;
  eventSlug?: string;
  isFeatured: boolean;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: LocalizedText;
  email?: string;
  isActive: boolean;
  order: number;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: 'instagram' | 'linkedin' | 'youtube' | 'x';
  isActive: boolean;
  order: number;
}
