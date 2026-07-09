import type { TeamMember } from '../types/content';

export const team: TeamMember[] = [
  {
    id: 'president',
    name: 'Emre Uça',
    role: { tr: 'Kulüp Başkanı', en: 'Club President' },
    email: 'asdasdas@sastek.org',
    isActive: true,
    photo: '/images/team/emre-uca.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/emreuca/',
    order: 1,
  },
  {
    id: 'vice-president-1',
    name: 'Nigar Özçelik',
    role: { tr: 'Kulüp Başkan Yardımcısı', en: 'Club Vice President' },
    email: 'asdas@sastek.org',
    isActive: true,
    order: 2,
  },
  {
    id: 'vice-president-2',
    name: 'Güneş Mart',
    role: { tr: 'Kulüp Başkan Yardımcısı', en: 'Club Vice President' },
    email: 'asdas@sastek.org',
    isActive: true,
    order: 3,
  },
];
