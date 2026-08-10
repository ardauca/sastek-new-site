<div align="center">

# SASTEK — Defence Industry & Technologies Club Website

**Official web platform of Eskişehir Technical University (ESTÜ) Defence Industry & Technologies Club**

[![Live Site](https://img.shields.io/badge/Live_Site-sastek.org-ff6b1a?style=for-the-badge&logo=googlechrome&logoColor=white)](https://sastek.org)
[![Admin Panel](https://img.shields.io/badge/Admin_Panel-admin.sastek.org-00D4FF?style=for-the-badge&logo=hono&logoColor=white)](https://admin.sastek.org/admin/)
[![Astro](https://img.shields.io/badge/Astro-v5.0-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Hono.js](https://img.shields.io/badge/Hono.js-v4-E36002?style=for-the-badge&logo=hono&logoColor=white)](https://hono.dev)
[![Cloudflare D1](https://img.shields.io/badge/Cloudflare_D1-Database-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/d1/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

</div>

---

## About

A bilingual (TR/EN) hybrid website built for SASTEK, the Defence Industry & Technologies Club of Eskişehir Technical University. Designed with a focus on clean architecture, live D1 database re-hydration, full admin CMS control, accessibility, and search engine visibility.

---

## Features

- 🌍 **Bilingual (i18n):** Full Turkish and English support via file-based static routing with a dynamic language switcher.
- ⚡ **Cloudflare D1 & R2 Backend (Live Hydration):** Full dynamic content management powered by Cloudflare D1 SQL database and R2 object storage with live client re-hydration across all modules.
- 🛠️ **Custom Admin Panel (`admin.sastek.org`):** Hono.js + JWT authenticated dashboard featuring bulk action controls, direct image uploads, map coordinate auto-parsing, and notice banner toggles.
- 🛰️ **Custom Radar/HUD UI:** A thematic interface built with pure CSS keyframe animations — no external animation libraries.
- 🎨 **Tailwind CSS v4 `@theme`:** Centralised design token system with a custom colour palette and glassmorphism effects.
- 🔍 **SEO & Structured Data:** Canonical tags, `hreflang`, Open Graph, Twitter Card, and `Schema.org` JSON-LD (`StudentOrganization`).
- 📱 **Responsive Layout:** Fluid typography and grid across mobile, tablet, and large screens (up to 1600px+).

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| **Frontend** | [Astro v5](https://astro.build) | Hybrid Static Site Generation (SSG) + Client Live Hydration |
| **Backend API** | [Hono.js](https://hono.dev) + [Cloudflare Workers](https://workers.cloudflare.com) | Edge API server deployed at `admin.sastek.org` |
| **Database** | [Cloudflare D1](https://developers.cloudflare.com/d1/) | Serverless SQL database storing events, shops, sponsors, team, gallery & settings |
| **Storage** | [Cloudflare R2](https://developers.cloudflare.com/r2/) | S3-compatible media bucket for logos, event images and gallery photos |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) | `@theme` tokens + custom CSS |
| **Language** | [TypeScript](https://www.typescriptlang.org) | Strict mode across frontend and backend |
| **Deployment** | [Cloudflare Pages & Workers](https://pages.cloudflare.com) | Edge CDN with 301 redirect rules and subdomains |

---

## Project Structure

```
├── backend/             # Cloudflare Worker API & Admin Panel (Hono.js + D1 + R2)
│   ├── src/             # API routes (events, shops, sponsors, team, socials, gallery, settings)
│   ├── schema.sql       # D1 database SQL schema & migration files
│   └── wrangler.jsonc   # Cloudflare Worker bindings configuration
├── public/              # Static assets (favicon suite, robots.txt, sitemap, llms.txt)
├── src/
│   ├── components/
│   │   ├── cards/       # EventCard, PartnerCard
│   │   ├── layout/      # Header, Footer
│   │   ├── pages/       # Page-level components (Home, About, Events, Contact…)
│   │   └── ui/          # RadarHud, SectionHeading, FilterControls
│   ├── data/            # Fallback data files
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
