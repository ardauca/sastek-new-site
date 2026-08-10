import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth';
import type { Env } from '../lib/types';

export const settingRoutes = new Hono<{ Bindings: Env }>();

// GET /api/settings — Public endpoint for site settings
settingRoutes.get('/', async (c) => {
  const rows = await c.env.DB.prepare('SELECT * FROM settings').all<{ key: string; value: string }>();
  const settings: Record<string, any> = {
    show_partners_notice: 1,
    show_sponsors_notice: 1,
  };
  rows.results.forEach((row) => {
    settings[row.key] = parseInt(row.value, 10);
  });
  return c.json(settings);
});

// PUT /api/settings — Admin auth required to update settings
settingRoutes.put('/', requireAuth(), async (c) => {
  const body = await c.req.json<Record<string, any>>();
  for (const [key, val] of Object.entries(body)) {
    const strVal = String(val ? 1 : 0);
    await c.env.DB.prepare(
      'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
    ).bind(key, strVal).run();
  }
  return c.json({ ok: true });
});
