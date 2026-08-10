import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { authRoutes } from './routes/auth';
import { shopRoutes } from './routes/shops';
import { sponsorRoutes } from './routes/sponsors';
import { galleryRoutes } from './routes/gallery';
import { eventRoutes } from './routes/events';
import { teamRoutes } from './routes/team';
import { socialRoutes } from './routes/socials';
import { uploadRoutes } from './routes/upload';
import { settingRoutes } from './routes/settings';
import { adminApp } from './routes/admin';
import type { Env } from './lib/types';

const app = new Hono<{ Bindings: Env }>();

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use('*', cors({
  origin: ['https://sastek.org', 'https://admin.sastek.org', 'http://localhost:4321', 'http://localhost:8787'],
  credentials: true,
}));

// ── Public & Protected API ───────────────────────────────────────────────────
app.route('/api/auth', authRoutes);
app.route('/api/shops', shopRoutes);
app.route('/api/sponsors', sponsorRoutes);
app.route('/api/gallery', galleryRoutes);
app.route('/api/events', eventRoutes);
app.route('/api/team', teamRoutes);
app.route('/api/socials', socialRoutes);
app.route('/api/upload', uploadRoutes);
app.route('/api/settings', settingRoutes);

// ── Admin Panel (serves HTML) ─────────────────────────────────────────────────
app.route('/', adminApp);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (c) => c.json({ ok: true, service: 'sastek-backend' }));

// ── 404 ──────────────────────────────────────────────────────────────────────
app.notFound((c) => c.json({ error: 'Not found' }, 404));

export default app;
