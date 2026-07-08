import type { EventItem } from '../types/content';

export const events: EventItem[] = [
  {
    id: 'coffee-talk', slug: 'coffee-talk', title: { tr: 'Coffee Talk', en: 'Coffee Talk' },
    summary: { tr: 'Sektör profesyonelleriyle samimi kariyer sohbetleri.', en: 'Informal career conversations with industry professionals.' },
    description: { tr: 'Alanında deneyimli konuklarla kariyer yolları, teknoloji ve sektör deneyimleri üzerine etkileşimli buluşmalar.', en: 'Interactive meetings with experienced guests about career paths, technology and industry experience.' },
    category: { tr: 'Sektör Buluşması', en: 'Industry Meetup' }, location: { tr: 'Konum güncellenecek', en: 'Location to be announced' }, image: '/images/events/coffeetalk.png', status: 'planned', isFeatured: true, showDetails: false,
  },
  {
    id: 'muhendisler-nerede', slug: 'muhendisler-nerede', title: { tr: 'Mühendisler Nerede?', en: 'Where Are Engineers?' },
    summary: { tr: 'Mühendislerin farklı sektörlerdeki kariyer yolculukları.', en: 'Career journeys of engineers across different industries.' },
    description: { tr: 'Mühendislerin çalışma alanlarını, sorumluluklarını ve kariyer deneyimlerini öğrencilerle buluşturan etkinlik serisi.', en: 'An event series introducing students to engineers’ fields, responsibilities and career experiences.' },
    category: { tr: 'Kariyer', en: 'Career' }, location: { tr: 'Konum güncellenecek', en: 'Location to be announced' }, image: '/images/events/muhnerde.png', status: 'planned', isFeatured: true, showDetails: false,
  },
  {
    id: 'savunma-gunlukleri', slug: 'savunma-gunlukleri', title: { tr: 'Savunma Günlükleri', en: 'Defence Diaries' },
    summary: { tr: 'Savunma sanayiinin teknolojilerini ve gündemini keşfedin.', en: 'Explore defence technologies and current developments.' },
    description: { tr: 'Savunma sanayii ekosistemini teknik, akademik ve sektörel bakış açılarıyla ele alan içerik ve etkinlik serisi.', en: 'A series exploring the defence industry ecosystem through technical, academic and professional perspectives.' },
    category: { tr: 'Savunma Sanayii', en: 'Defence Industry' }, location: { tr: 'Konum güncellenecek', en: 'Location to be announced' }, image: '/images/events/savunmagunlukleri.png', status: 'planned', isFeatured: true, showDetails: false,
  },
  {
    id: 'teknik-gezi', slug: 'teknik-gezi', title: { tr: 'Teknik Geziler', en: 'Technical Visits' },
    summary: { tr: 'Üretim ve Ar-Ge ortamlarını yerinde tanıma fırsatı.', en: 'First-hand access to production and R&D environments.' },
    description: { tr: 'Öğrencilerin şirketleri, üretim tesislerini ve teknoloji merkezlerini yerinde incelemesini sağlayan geziler.', en: 'Visits enabling students to explore companies, production facilities and technology centres.' },
    category: { tr: 'Teknik Gezi', en: 'Technical Visit' }, location: { tr: 'Konum güncellenecek', en: 'Location to be announced' }, image: '/images/events/teknikgezi.png', status: 'planned', isFeatured: false, showDetails: false,
  },
  {
    id: 'egitimler', slug: 'egitimler', title: { tr: 'Eğitimler', en: 'Training' },
    summary: { tr: 'Teknik ve profesyonel becerileri geliştiren eğitimler.', en: 'Training that develops technical and professional skills.' },
    description: { tr: 'Mühendislik araçlarından kariyer yetkinliklerine uzanan uygulamalı eğitim programları.', en: 'Practical programmes ranging from engineering tools to career skills.' },
    category: { tr: 'Eğitim', en: 'Training' }, location: { tr: 'Konum güncellenecek', en: 'Location to be announced' }, image: '/images/events/egitimler.png', status: 'planned', isFeatured: false, showDetails: false,
  },
  {
    id: 'sosyal-etkinlikler', slug: 'sosyal-etkinlikler', title: { tr: 'Sosyal Etkinlikler', en: 'Social Events' },
    summary: { tr: 'Kulüp kültürünü ve ekip bağlarını güçlendiren buluşmalar.', en: 'Meetups that strengthen club culture and team bonds.' },
    description: { tr: 'Üyelerin tanışmasını, paylaşmasını ve birlikte üretmesini destekleyen sosyal buluşmalar.', en: 'Social gatherings supporting members in connecting, sharing and creating together.' },
    category: { tr: 'Sosyal', en: 'Social' }, location: { tr: 'Konum güncellenecek', en: 'Location to be announced' }, image: '/images/events/sosyaletkinlik.png', status: 'planned', isFeatured: false, showDetails: false,
  },
];
