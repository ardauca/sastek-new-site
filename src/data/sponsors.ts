import type { Sponsor } from '../types/content';

export const sponsors: Sponsor[] = [
  {
    id: 'sample-sponsor',
    name: 'Sponsor bilgisi güncellenecek',
    tier: 'ana-sponsor',
    description: { tr: 'Gerçek sponsor listesi kulüp tarafından doğrulandıktan sonra yayımlanacaktır.', en: 'The verified sponsor list will be published after confirmation by the club.' },
    logo: '/images/sponsors/sample-sponsor.png',
    isActive: true, isFeatured: true, isVerified: false, order: 1,
  },
];
