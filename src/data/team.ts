import type { TeamMember } from '../types/content';

export const team: TeamMember[] = [
  {
    id: 'president',
    name: 'Emre Uça',
    role: { tr: 'Kulüp Başkanı', en: 'Club President' },
    email: 'emreuca.sastek@gmail.com',
    isActive: true,
    linkedinUrl: 'https://www.linkedin.com/in/emreuca/',
    order: 1,
  },
  {
    id: 'vice-president-1',
    name: 'Nigar Özçelik',
    role: { tr: 'Kulüp Başkan Yardımcısı', en: 'Club Vice President' },
    email: 'nigarozceliksastek@gmail.com',
    linkedinUrl: 'https://www.linkedin.com/in/nigar-%C3%B6z%C3%A7elik-712281332/',
    isActive: true,
    order: 2,
  },
  {
    id: 'vice-president-2',
    name: 'Güneş Mart',
    role: { tr: 'Kulüp Başkan Yardımcısı', en: 'Club Vice President' },
    email: 'gunesmart.sastek@gmail.com',
    isActive: true,
    linkedinUrl: 'https://www.linkedin.com/in/gunesmart/',
    order: 3,
  },
];
