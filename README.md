<div align="center">

# SASTEK — Defence Industry & Technologies Club Website

**Official web platform of Eskişehir Technical University (ESTÜ) Defence Industry & Technologies Club**

[![Live Site](https://img.shields.io/badge/Live_Site-sastek.org-ff6b1a?style=for-the-badge&logo=googlechrome&logoColor=white)](https://sastek.org)
[![Astro](https://img.shields.io/badge/Astro-v5.0-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deployed-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)

</div>

---

## About

A bilingual (TR/EN) static website built for SASTEK, the Defence Industry & Technologies Club of Eskişehir Technical University. Designed with a focus on clean architecture, accessibility, and search engine visibility.

---

## Features

- 🌍 **Bilingual (i18n):** Full Turkish and English support via file-based static routing with a dynamic language switcher.
- 🛰️ **Custom Radar/HUD UI:** A thematic interface built with pure CSS keyframe animations — no external animation libraries.
- 🎨 **Tailwind CSS v4 `@theme`:** Centralised design token system with a custom colour palette and glassmorphism effects.
- 🔍 **SEO & Structured Data:** Canonical tags, `hreflang`, Open Graph, Twitter Card, and `Schema.org` JSON-LD (`StudentOrganization`).
- 📱 **Responsive Layout:** Fluid typography and grid across mobile, tablet, and large screens (up to 1600px+).
- 🖼️ **Full Favicon Suite:** SVG, ICO, Apple Touch Icon, and Web App Manifest via RealFaviconGenerator.
- 📄 **Content-Driven Data Layer:** All content (events, team, partners, gallery) managed from typed TypeScript data files — no CMS required.

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | [Astro v5](https://astro.build) | Static site generation (SSG) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) | `@theme` tokens + custom CSS |
| **Language** | [TypeScript](https://www.typescriptlang.org) | Strict mode, typed content interfaces |
| **Deployment** | [Cloudflare Pages](https://pages.cloudflare.com) | Edge CDN with 301 redirect rules |

---

## Project Structure

```
├── public/              # Static assets (favicon suite, robots.txt, sitemap, llms.txt)
├── src/
│   ├── components/
│   │   ├── cards/       # EventCard, PartnerCard
│   │   ├── layout/      # Header, Footer
│   │   ├── pages/       # Page-level components (Home, About, Events, Contact…)
│   │   └── ui/          # RadarHud, SectionHeading, FilterControls
│   ├── data/            # Typed TS data files (events, team, partners, gallery…)
│   ├── layouts/         # BaseLayout (SEO, hreflang, Schema.org)
│   ├── lib/             # i18n helpers, date formatting
│   ├── pages/           # File-based routes (TR root + /en/ prefix)
│   └── styles/          # global.css (Tailwind v4 theme + animations)
└── astro.config.mjs
```

---

## Local Development

Requires **Node.js `>=22.12.0`**.

```bash
git clone https://github.com/ardauca/sastek-new-site.git
cd sastek-new-site
npm install
npm run dev
```

Development server runs at `http://localhost:4321`.

---

## Available Commands

| Command | Action |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Run Astro + TypeScript type checks |

---

## Developer

**Arda Uça**
- GitHub: [@ardauca](https://github.com/ardauca)
- LinkedIn: [linkedin.com/in/ardauca](https://www.linkedin.com/in/ardauca)

---

## License

Copyright (c) 2026 Arda Uça. All rights reserved.

This source code is publicly visible for educational and recruitment purposes only.
Copying, redistribution, or deployment of this project is not permitted without prior written permission.
See the [LICENSE](./LICENSE) file for full terms.

<div align="center">
  <sub>Developed for Eskişehir Technical University Defence Industry & Technology Club</sub>
</div>
