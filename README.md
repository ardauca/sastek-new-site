<div align="center">

# 🚀 SASTEK — Savunma Sanayii ve Teknolojileri Kulübü Web Sitesi

**Eskişehir Teknik Üniversitesi (ESTÜ) Savunma Sanayii ve Teknolojileri Kulübü Resmi Web Platformu**

[![Live Site](https://img.shields.io/badge/Live_Site-sastek.org-ff6b1a?style=for-the-badge&logo=googlechrome&logoColor=white)](https://sastek.org)
[![Astro](https://img.shields.io/badge/Astro-v5.0-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deployed-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)

</div>

---

## 🌟 Proje Hakkında

Bu proje, **Eskişehir Teknik Üniversitesi Savunma Sanayii ve Teknolojileri Kulübü (SASTEK)** için geliştirilmiş yüksek performanslı, modern ve çift dilli (TR/EN) kurumsal tanıtım platformudur.

Kullanıcı deneyimi (UX), futuristik tasarım dili (Radar/HUD arayüzü), erişilebilirlik (a11y), arama motoru optimizasyonu (SEO) ve yapay zeka entegrasyonu (GEO - Generative Engine Optimization) ön planda tutularak **Production-Ready** standartlarında mimarisi kurgulanmıştır.

---

## ✨ Öne Çıkan Özellikler

- 🛰️ **Futuristik Radar/HUD Arayüzü:** Saf CSS keyframe animasyonları ile 360° döner radar tarağı, sinyal göstergeleri ve dinamik mikro etkileşimler (`RadarHud.astro`).
- 🌍 **Tam Çift Dil Desteği (i18n):** Türkçe (TR) ve İngilizce (EN) dosya tabanlı statik rotalama, dinamik dil değiştirici ve dil bazlı tarih biçimlendirme (`Intl.DateTimeFormat`).
- 🎯 **Gelişmiş SEO & GEO Altyapısı:** 
  - 580px piksel sınırına tam uyumlu bilingual Meta Title & Description.
  - Sayfa bazlı exact matching self-referencing `hreflang` etiketleri.
  - `Schema.org` `StudentOrganization` & `CollegeOrUniversity` JSON-LD kimlik şeması.
  - Yapay zeka arama motorları (ChatGPT, Perplexity, Gemini) için `public/llms.txt` entegrasyonu.
  - Google & Bing uyumlu `sitemap-index.xml`, `robots.txt` ve `_redirects` 301 yönlendirme kuralları.
- 📱 **Tam Responsive & 1600px+ Ölçeklendirme:** Mobil, tablet, laptop ve 4K/Ultra-Wide (1600px+) büyük ekranlarda akıcı tipografi ve grid düzeni.
- 🎨 **Tailwind CSS v4 `@theme` Mimarisi:** Özelleştirilmiş renk paleti (`--color-navy`, `--color-panel`, `--color-signal`) ve cam efekti (`glassmorphism`) tasarımı.
- 🖼️ **Komple Favicon Paketi:** RealFaviconGenerator standartlarında SVG, ICO, Apple Touch Icon, Android Chrome Manifest (`site.webmanifest`) desteği.

---

## 🛠️ Teknolojik Mimari

| Katman | Teknoloji | Açıklama |
|---|---|---|
| **Framework** | [Astro](https://astro.build) | SSG (Static Site Generation) ile maksimum yükleme hızı (Lighthouse %95+) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) | `@theme` token sistemi ve modüler Vanilla CSS |
| **Language** | [TypeScript](https://www.typescriptlang.org) | Strict tip kontrolü ve modüler arayüz tanımları (`types/content.ts`) |
| **Deployment** | [Cloudflare Pages](https://pages.cloudflare.com) | Edge ağlarında ultra hızlı statik dağıtım |

---

## 📂 Proje Dizini

```text
c:\Users\ARDA\Documents\Sastek 2
├── public/
│   ├── _redirects          # 301 yönlendirme kuralları (www -> non-www)
│   ├── apple-touch-icon.png# Apple iOS cihaz simgesi (180x180)
│   ├── favicon.ico         # Klasik tarayıcı ikon paketi
│   ├── favicon.svg         # SVG vektör favicon
│   ├── llms.txt            # Yapay zeka (LLM/GEO) arama motorları rehberi
│   ├── robots.txt          # Arama motoru taraç kuralları
│   └── site.webmanifest    # PWA Web App Manifest
├── src/
│   ├── components/
│   │   ├── cards/          # EventCard.astro, PartnerCard.astro
│   │   ├── layout/         # Header.astro, Footer.astro
│   │   ├── pages/          # HomePage, AboutPage, EventsPage, ContactPage, PartnersPage vb.
│   │   └── ui/             # RadarHud.astro, SectionHeading.astro, FilterControls.astro vb.
│   ├── data/               # Statik veri kaynakları (events, partners, sponsors, team, gallery vb.)
│   ├── layouts/            # BaseLayout.astro (SEO, OpenGraph, Schema.org, hreflang)
│   ├── lib/                # content.ts (i18n ve tarih yardımcı fonksiyonları)
│   ├── pages/              # Rotalar (TR & EN /en/ sayfaları)
│   └── styles/             # global.css (Tailwind v4 teması & özel uzay animasyonları)
└── astro.config.mjs        # Astro konfigürasyonu (site: https://sastek.org)
```

---

## 💻 Yerel Geliştirme (Local Setup)

Projeyi bilgisayarınızda çalıştırmak için **Node.js `>=22.12.0`** gereklidir.

```bash
# Depoyu klonlayın
git clone https://github.com/ardauca/sastek-new-site.git
cd sastek-new-site

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Sunucu `http://localhost:4321` adresinde yayına başlayacaktır.

---

## 📜 Kullanılabilir Komutlar

- `npm run dev` — Geliştirme sunucusunu başlatır.
- `npm run check` — Astro ve TypeScript tip kontrollerini gerçekleştirir.
- `npm run build` — Üretim sürümünü `dist/` klasörüne derler.
- `npm run preview` — Derlenmiş üretim sürümünü yerelde test eder.

---

## 👨‍💻 Geliştirici

**Arda Uça**  
- **GitHub:** [@ardauca](https://github.com/ardauca)  
- **Web Site:** [https://sastek.org](https://sastek.org)

---

<div align="center">
  <sub>Developed with ❤️ for Eskişehir Technical University Defence Industry & Technology Club</sub>
</div>
