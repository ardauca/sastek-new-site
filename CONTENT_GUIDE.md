# 📖 SASTEK İçerik ve Veri Güncelleme Rehberi

Bu döküman, SASTEK web sitesindeki içeriklerin (etkinlikler, anlaşmalı noktalar, sponsorlar, galeri, ekip üyeleri, sosyal medya ve site ayarları) nasıl güncelleneceğini ve yönetileceğini açıklar.

> **Önemli Kural:** Her İçerik değişikliğinden sonra terminalde `npm run check` ve `npm run build` komutlarını çalıştırarak statik tip ve derleme kontrolünü doğrulayın. Dosya adlarında ve slug alanlarında Türkçe karakter kullanmayın (`ch`, `sh`, `u`, `g` vb. İngilizce alfabe karakterleri tercih edin).

---

## 📅 1. Etkinlik Ekleme / Güncelleme (`src/data/events.ts`)

Etkinlikler `src/data/events.ts` dosyasından yönetilir. Yeni bir etkinlik eklemek için aşağıdaki objeyi diziye dahil edin:

```typescript
{
  id: 'yeni-etkinlik-slug',
  slug: 'yeni-etkinlik-slug',
  title: {
    tr: 'Etkinlik Başlığı',
    en: 'Event Title'
  },
  summary: {
    tr: 'Kısa özet metni...',
    en: 'Short summary text...'
  },
  description: {
    tr: 'Detaylı etkinlik açıklaması...',
    en: 'Detailed event description...'
  },
  category: {
    tr: 'Sektör Buluşması',
    en: 'Industry Meetup'
  },
  date: '2026-10-15', // İsteğe bağlı (YYYY-AA-GG)
  location: {
    tr: 'ESTÜ Yabancı Diller Yüksekokulu Konferans Salonu',
    en: 'ESTU School of Foreign Languages Auditorium'
  },
  image: '/images/events/etkinlik-gorseli.png',
  status: 'planned', // 'planned' | 'active' | 'past'
  isFeatured: true, // Ana sayfada görünsün mü?
  showDetails: true, // Detay sayfası aktif olsun mu?
  applicationUrl: 'https://form.sastek.org/basvuru' // İsteğe bağlı başvuru linki
}
```

* **Görsel Konumu:** Etkinlik afişini `public/images/events/` klasörü altına ekleyin.

---

## 🏬 2. Anlaşmalı Noktalar (`src/data/partners.ts`)

Öğrenci indirimleri ve mekan anlaşmaları `src/data/partners.ts` dosyasından yönetilir:

```typescript
{
  id: 'mekan-id',
  name: 'Mekan Adı',
  category: { tr: 'Kafe', en: 'Café' },
  discountLabel: {
    tr: 'SASTEK üyelerine özel %15 indirim',
    en: '15% discount for SASTEK members'
  },
  description: {
    tr: 'Mekan açıklaması ve kampanya detayları.',
    en: 'Venue description and offer details.'
  },
  logo: '/images/partners/mekan-logo.png',
  location: 'İstiklal Mah. Porsuk Bulvarı No:12 Eskişehir',
  coordinates: { lat: 39.7775, lng: 30.5139 }, // Haritada görünmesi için gereklidir
  mapUrl: 'https://maps.app.goo.gl/...',
  showOnMap: true,
  isActive: true,
  isFeatured: true,
  isVerified: true, // Doğrulanmış firma işareti
  order: 1
}
```

* **Logo Konumu:** Logoları `public/images/partners/` altına koyun.

---

## 🤝 3. Sponsorlar (`src/data/sponsors.ts`)

Kulüp sponsorları `src/data/sponsors.ts` dosyasından yönetilir:

```typescript
{
  id: 'sponsor-id',
  name: 'Şirket Adı',
  tier: 'ana-sponsor', // 'ana-sponsor' | 'altin' | 'gumus' | 'bronz' | 'destekci' | 'partner'
  description: {
    tr: 'Sponsorluk kapsamı ve destek bilgisi.',
    en: 'Sponsorship scope and contribution info.'
  },
  logo: '/images/sponsors/sponsor-logo.png',
  websiteUrl: 'https://sirket.com',
  isActive: true,
  isFeatured: true,
  isVerified: true,
  order: 1
}
```

* **Logo Konumu:** Sponsor logolarını `public/images/sponsors/` altına ekleyin.

---

## 🖼️ 4. Galeri (`src/data/gallery.ts`)

Kulüp fotoğrafları `src/data/gallery.ts` dosyasından yönetilir:

```typescript
{
  id: 'g1',
  src: '/images/gallery/galeri-1.jpg',
  alt: {
    tr: 'SASTEK etkinliğinden katılımcılar',
    en: 'Participants at a SASTEK event'
  },
  category: { tr: 'Etkinlik', en: 'Event' }, // 'Etkinlik' | 'Topluluk' | 'Sosyal'
  isFeatured: true, // Ana sayfa önizlemesinde görünsün mü?
  order: 1
}
```

* **Görsel Konumu:** Optimize edilmiş görselleri `public/images/gallery/` klasörüne yerleştirin.

---

## 👥 5. Yönetim Ekibi (`src/data/team.ts`)

Yönetim kurulu `src/data/team.ts` üzerinden güncellenir:

```typescript
{
  id: 'uye-id',
  name: 'Ad Soyad',
  role: {
    tr: 'Kulüp Başkanı',
    en: 'Club President'
  },
  email: 'eposta@sastek.org',
  linkedinUrl: 'https://www.linkedin.com/in/kullanici/',
  isActive: true,
  order: 1
}
```

---

## 🔗 6. Sosyal Medya & Site Bilgileri (`src/data/socials.ts`, `src/data/site.ts`)

* **Sosyal Bağlantılar:** `src/data/socials.ts` dosyasında `isActive: true` ve gerçek URL tanımlanarak yönetilir.
* **Genel Bilgiler:** `src/data/site.ts` dosyasında kulüp adı, üniversite adı, resmi açıklama ve alan adı bilgileri yer alır.
