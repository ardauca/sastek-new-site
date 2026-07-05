import type { Partner } from '../types/content';

const pending = { tr: 'Kampanya bilgisi güncellenecek', en: 'Offer details to be updated' };
const description = { tr: 'Bu kayıt arşiv görselinden oluşturulmuştur ve yayımlanmadan önce doğrulanmalıdır.', en: 'This entry was created from an archive asset and must be verified before publication.' };

export const partners: Partner[] = [
  { id: 'arc', name: 'ARC', category: { tr: 'Kafe', en: 'Café' }, discountLabel: pending, description, logo: '/images/partners/arc-logo.png', isActive: true, isFeatured: true, isVerified: false, order: 1 },
  { id: 'jardin', name: 'Jardin', category: { tr: 'Kafe', en: 'Café' }, discountLabel: pending, description, logo: '/images/partners/jardin.png', isActive: true, isFeatured: true, isVerified: false, order: 2 },
  { id: 'meeple', name: 'Meeple', category: { tr: 'Sosyal Mekân', en: 'Social Venue' }, discountLabel: pending, description, logo: '/images/partners/meeple.png', isActive: true, isFeatured: true, isVerified: false, order: 3 },
  { id: 'pizzakoy', name: 'Pizza Köy', category: { tr: 'Yeme–İçme', en: 'Food & Drink' }, discountLabel: pending, description, logo: '/images/partners/pizzakoy.png', isActive: true, isFeatured: false, isVerified: false, order: 4 },
  { id: 'foxgym', name: 'Fox Gym', category: { tr: 'Spor', en: 'Sports' }, discountLabel: pending, description, logo: '/images/partners/foxgym.png', isActive: true, isFeatured: false, isVerified: false, order: 5 },
  { id: 'walkers', name: "Walker's", category: { tr: 'Kafe', en: 'Café' }, discountLabel: pending, description, logo: '/images/partners/walkers.png', isActive: true, isFeatured: false, isVerified: false, order: 6 },
];
