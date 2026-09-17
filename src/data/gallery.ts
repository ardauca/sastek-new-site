import type { GalleryItem } from '../types/content';

export const gallery: GalleryItem[] = [
  { id: 'g1', src: '/images/gallery/galeri-1.jpg', alt: { tr: 'SASTEK', en: 'SASTEK' }, category: { tr: 'Etkinlik', en: 'Event' }, isFeatured: true, order: 1 },
  { id: 'g2', src: '/images/gallery/galeri-2.jpg', alt: { tr: 'SASTEK', en: 'SASTEK' }, category: { tr: 'Topluluk', en: 'Community' }, isFeatured: true, order: 2 },
  { id: 'g3', src: '/images/gallery/galeri-3.jpg', alt: { tr: 'SASTEK', en: 'SASTEK' }, category: { tr: 'Etkinlik', en: 'Event' }, isFeatured: true, order: 3 },
  { id: 'g4', src: '/images/gallery/galeri-4.jpg', alt: { tr: 'SASTEK', en: 'SASTEK' }, category: { tr: 'Topluluk', en: 'Community' }, isFeatured: false, order: 4 },
  { id: 'g5', src: '/images/gallery/galeri-5.jpg', alt: { tr: 'SASTEK', en: 'SASTEK' }, category: { tr: 'Sosyal', en: 'Social' }, isFeatured: false, order: 5 },
];
