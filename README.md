<div align="center">

# SASTEK — Defence Industry & Technologies Club Platform

**Official digital platform and edge infrastructure of Eskişehir Technical University (ESTÜ) Defence Industry & Technologies Club.**

[![Live Platform](https://img.shields.io/badge/Live_Site-sastek.org-ff6b1a?style=for-the-badge&logo=googlechrome&logoColor=white)](https://sastek.org)
[![Admin CMS](https://img.shields.io/badge/Admin_CMS-admin.sastek.org-00D4FF?style=for-the-badge&logo=cloudflare&logoColor=white)](https://admin.sastek.org/admin/)
[![Astro](https://img.shields.io/badge/Astro-v7.0-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Hono.js](https://img.shields.io/badge/Hono.js-v4.6-E36002?style=for-the-badge&logo=hono&logoColor=white)](https://hono.dev)
[![Cloudflare D1](https://img.shields.io/badge/Cloudflare_D1-Serverless_SQL-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/d1/)
[![Cloudflare R2](https://img.shields.io/badge/Cloudflare_R2-Object_Storage-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/r2/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

</div>

---

## Overview

**SASTEK Digital Platform** is an enterprise-grade, serverless web platform developed for Eskişehir Technical University's Defence Industry & Technologies Club. The system combines high-performance Static Site Generation (SSG) with client-side edge rehydration, a headless administrative Content Management System (CMS), dynamic QR code redirect engine, interactive geospatial mapping, and an aerospace-grade radar/HUD user interface.

Built specifically to serve thousands of university students and industry partners with sub-millisecond edge routing, zero infrastructure maintenance overhead, and strict security guarantees.

---

## Architectural Highlights

```
                          ┌────────────────────────┐
                          │   Visitor / Student    │
                          └───────────┬────────────┘
                                      │
                                      ▼
                        ┌───────────────────────────┐
                        │   Cloudflare Global Edge  │
                        └──────┬─────────────┬──────┘
                               │             │
              Static Routes /  │             │  Edge QR Dynamic Proxy
              Pages CDN Assets │             │  (/q/:slug)
                               ▼             ▼
                     ┌───────────────┐ ┌───────────────────────────┐
                     │ Cloudflare    │ │ Cloudflare Pages Function │
                     │ Pages (Astro) │ │ (functions/q/[slug].ts)   │
                     └───────┬───────┘ └─────────────┬─────────────┘
                             │                       │
                             │ Client Re-hydration   │ Proxy 302 Redirect
                             │ (Fetch API)           │
                             ▼                       ▼
            ┌─────────────────────────────────────────────────────┐
            │   Cloudflare Worker Backend (admin.sastek.org)      │
            │   - Hono.js Edge Routing & REST API                 │
            │   - PBKDF2 Password Hashing & JWT Auth              │
            │   - Edge QR Generation (Canvasless pngjs / qrcode)  │
            │   - Admin Dashboard UI                              │
            └───────────────┬─────────────────────┬───────────────┘
                            │                     │
                            ▼                     ▼
           ┌────────────────────────────────┐ ┌──────────────────────┐
           │ Cloudflare D1 (sastek-db)      │ │ Cloudflare R2 Bucket │
           │ - Events, Partners, Team,      │ │ (sastek-media)       │
           │   Sponsors, Gallery, QR Codes, │ │ - Image & Document   │
           │   Scan Analytics, Site Notices │ │   Object Storage     │
           └────────────────────────────────┘ └──────────────────────┘
```

---

## Key Features

- 🌍 **Bilingual Internationalization (i18n):** Native Turkish (root `/`) and English (`/en/`) static routing with seamless path-preserving locale toggling, canonical tags, and structured `hreflang` headers.
- ⚡ **Hybrid Architecture (SSG + Live Client Rehydration):** Astro pre-renders 27 static HTML routes at build time for instant TTFB and perfect SEO, while lightweight client scripts rehydrate dynamic modules (partner shops, active events, announcements) directly from Cloudflare D1 at runtime.
- 📲 **Production-Critical Dynamic QR Engine (`/q/:slug`):** Edge-based URL redirect service powering physical NFC/QR membership cards printed for students. Features database locks (`is_locked = 1`), 302 redirect responses with `no-store` cache controls, non-blocking scan analytics via `c.executionCtx.waitUntil()`, and dynamic canvasless PNG/SVG rendering.
- 🛠️ **Custom Headless Admin Dashboard (`admin.sastek.org`):** Unified administration portal powered by Hono.js. Facilitates full CRUD operations on events, partner businesses, sponsors, club executives, photo gallery, global warning banners, and QR tracking without external CMS dependencies.
- 🗺️ **Interactive Partner Discovery & Mapbox Integration:** Interactive map interface showcasing local commercial partners offering discounts to club members. Includes real-time category filtering, responsive cards, and automated GPS navigation deep-links.
- 🛰️ **Thematic Aerospace Radar / HUD UI:** Custom retro-futuristic interface featuring canvas-based particle starfields (`DepthStars.astro`), rotating sweep radars (`RadarHud.astro`), glassmorphism cards, and pure CSS keyframes with zero external animation dependencies.
- 🛡️ **Zero-Trust Security & Reliability:** Salted PBKDF2 password derivation, tamper-proof HTTP-only JWTs, parameterized SQL queries preventing injection, slug validation filters against reserved keywords, and complete isolation of credentials.

---

## Dynamic QR Redirection Subsystem (`/q/:slug`)

SASTEK distributes physical membership cards with permanently printed QR codes. To guarantee that physical print media never breaks, the platform includes a dedicated edge-routing redirect layer:

```
Physical Card Scan (https://sastek.org/q/anlasmali-noktalar)
   │
   ▼
[Cloudflare Pages Function: functions/q/[slug].ts]
   │  Intersects request at Cloudflare Edge
   │  Fetches backend Worker with redirect: 'manual'
   ▼
[Cloudflare Worker: backend/src/routes/qr.ts]
   │  1. Parameter validation & reserved slug check
   │  2. Queries Cloudflare D1 for active target_url
   │  3. Asynchronously records scan event (IP hash, User-Agent, timestamp)
   │     via c.executionCtx.waitUntil() — Zero latency penalty
   ▼
Clean 302 Redirect with 'Cache-Control: no-store'
   │
   ▼
Destination: https://sastek.org/anlasmali-noktalar/
```

### QR Safety Mechanisms:
1. **Database Lock Protection (`is_locked = 1`):** Production-critical QR codes (e.g. printed card targets) cannot be deleted or have their slugs changed from the admin UI.
2. **Asynchronous Analytics:** Scan counts and metrics are committed to the `qr_scans` table using Cloudflare execution contexts without blocking the HTTP redirect cycle.
3. **Canvasless QR Image Generation:** On-the-fly PNG and SVG generation (`/q/:slug/image?format=png`) runs inside V8 Worker isolates via `qrcode` and `pngjs` without requiring native Node.js canvas binaries.

---

## Tech Stack

| Domain | Technology | Description |
|---|---|---|
| **Frontend Framework** | [Astro v7.0](https://astro.build) | Modern content-driven web framework with static site generation |
| **Styling** | [Tailwind CSS v4.1](https://tailwindcss.com) | Modern CSS engine utilizing `@theme` tokens and zero-runtime CSS |
| **Backend API** | [Hono v4.6](https://hono.dev) | High-performance, lightweight web framework designed for edge runtimes |
| **Serverless Compute** | [Cloudflare Workers](https://workers.cloudflare.com) & [Pages Functions](https://pages.cloudflare.com) | Low-latency globally distributed serverless runtime |
| **Database** | [Cloudflare D1](https://developers.cloudflare.com/d1/) | Serverless, SQLite-compatible relational database with replication |
| **Object Storage** | [Cloudflare R2](https://developers.cloudflare.com/r2/) | High-durability S3-compatible asset and media bucket |
| **Geospatial** | [Mapbox GL JS](https://www.mapbox.com/) | Client-side vector map rendering for partner discovery |
| **QR Engine** | `qrcode` + `pngjs` | Pure-JavaScript QR rasterization and vector rendering for serverless isolates |
| **Language** | [TypeScript](https://www.typescriptlang.org) | Strict type safety enforced across both frontend and backend codebases |

---

## Content Architecture: Static vs Dynamic

The platform employs a deliberate architectural boundary between build-time defaults and runtime data:

- **Build-Time Static Fallbacks (`src/data/*.ts`):** 
  - `events.ts`: Contains canonical event slug definitions required by Astro's `getStaticPaths()` to pre-render dynamic routes (`[slug].astro`) during build time.
  - `site.ts`, `navigation.ts`, `socials.ts`: Provide structural layout constants and navigation metadata.
- **Runtime Dynamic CMS (Cloudflare D1 & R2):**
  - Partner businesses (`shops`), sponsor agreements (`sponsors`), active event registrations, executive board rosters (`team`), and photo galleries are fetched from `admin.sastek.org/api/*` on client initialization.
  - Changes made via the Admin Dashboard reflect on the production site immediately without triggering a frontend rebuild.

---

## Project Structure

```
sastek-new-site/
├── backend/                         # Cloudflare Worker API & Admin Dashboard
│   ├── src/
│   │   ├── admin/
│   │   │   └── dashboard.ts         # Server-rendered administrative dashboard UI
│   │   ├── lib/
│   │   │   └── types.ts             # Backend data schemas & Worker environment bindings
│   │   ├── middleware/
│   │   │   └── auth.ts              # JWT verification and PBKDF2 authentication middleware
│   │   ├── routes/                  # API endpoints (auth, events, shops, sponsors, qr, etc.)
│   │   └── index.ts                 # Worker entrypoint, CORS configuration & route mounting
│   ├── schema.sql                   # Relational D1 schema & production migrations
│   ├── wrangler.toml                # Cloudflare Worker bindings (D1, R2, environment)
│   ├── .dev.vars.example            # Environment secret template for local Worker dev
│   └── package.json
├── functions/
│   └── q/
│       └── [slug].ts                # Cloudflare Pages Function handling edge QR proxying
├── public/                          # Static public assets (icons, robots.txt, sitemap, llms.txt)
├── src/
│   ├── components/
│   │   ├── cards/                   # EventCard, PartnerCard
│   │   ├── layout/                  # Header, Footer, LanguageSwitcher
│   │   ├── pages/                   # Page view components (HomePage, PartnersPage, EventsPage...)
│   │   └── ui/                      # RadarHud, DepthStars, FilterControls, NoticeBanner
│   ├── data/                        # Static fallback data and static path generators
│   ├── layouts/
│   │   └── BaseLayout.astro         # Global HTML shell, SEO metadata, JSON-LD Schema
│   ├── lib/
│   │   └── i18n.ts                  # Localization dictionary and helper utilities
│   ├── pages/                       # Astro file-based routing (/ and /en/ subpaths)
│   └── styles/
│       └── global.css               # Tailwind v4 configuration, HUD effects & animations
├── .env.example                     # Environment template for frontend client variables
├── astro.config.mjs                 # Astro configuration and Vite plugins
├── LICENSE                          # Source code usage license
└── package.json                     # Frontend dependencies and build scripts
```

---

## Local Development

### Prerequisites

- **Node.js** `>=22.12.0`
- **npm** `>=9.6.5`
- Cloudflare Wrangler CLI (for backend development)

### 1. Frontend Setup

```bash
# Clone the repository
git clone https://github.com/ardauca/sastek-new-site.git
cd sastek-new-site

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Set PUBLIC_MAPBOX_TOKEN in .env if testing interactive maps

# Launch the Astro development server
npm run dev
```

The frontend will be available at `http://localhost:4321`.

### 2. Backend Setup (Cloudflare Worker)

```bash
cd backend

# Install backend dependencies
npm install

# Configure local development secrets
cp .dev.vars.example .dev.vars
# Set JWT_SECRET in .dev.vars

# Run the Worker in local emulation mode with local D1/R2 storage
npm run dev
```

The backend API and Admin panel will be available at `http://localhost:8787`.

---

## Environment Variables

| Variable | Scope | Required | Description |
|---|---|---|---|
| `PUBLIC_MAPBOX_TOKEN` | Frontend (`.env`) | Optional | Public Mapbox GL token for interactive venue maps. If omitted, list view remains fully functional. |
| `JWT_SECRET` | Backend (`.dev.vars` / Wrangler Secret) | **Yes** | Secret cryptographic key used to sign and verify administrative JWT tokens. |

---

## Build & Quality Verification

```bash
# Type check and build frontend production bundle
npm run check
npm run build

# Run TypeScript checks on backend Worker
cd backend
npm run type-check
```

---

## Security Practices

- **Zero Secret Exposure:** No API keys, credentials, or private tokens are tracked in version control (`.env` and `.dev.vars` are gitignored).
- **Password Security:** Passwords are never stored in plaintext; hashed using PBKDF2 with unique cryptographic salt per user.
- **Tamper-Proof Session Management:** Stateless JWT authentication with expiration checks and secure cookie delivery.
- **SQL Injection Immunization:** All D1 database queries utilize parameterized prepared statements (`c.env.DB.prepare(...).bind(...)`).
- **Physical QR Resilience:** Mission-critical QR targets are locked at the database schema level (`is_locked = 1`) to eliminate the possibility of accidental deletion.

---

## Author

**Arda Uça**  
- GitHub: [@ardauca](https://github.com/ardauca)  
- LinkedIn: [linkedin.com/in/ardauca](https://www.linkedin.com/in/ardauca)

Developed for **Eskişehir Technical University Defence Industry & Technologies Club**.

---

## License

Copyright (c) 2026 Arda Uça. All rights reserved.

This source code is publicly visible for educational and portfolio evaluation purposes only.  
Unauthorized copying, redistribution, or deployment of this project without prior written consent is strictly prohibited.  
See the [LICENSE](./LICENSE) file for complete terms.
