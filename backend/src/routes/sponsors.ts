import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth';
import type { Env, Sponsor } from '../lib/types';

export const sponsorRoutes = new Hono<{ Bindings: Env }>();

// GET /api/sponsors
sponsorRoutes.get('/', async (c) => {
  const sponsors = await c.env.DB.prepare(
    'SELECT * FROM sponsors WHERE is_active = 1 ORDER BY CASE tier WHEN \'platinum\' THEN 1 WHEN \'gold\' THEN 2 WHEN \'silver\' THEN 3 ELSE 4 END, name ASC'
  ).all<Sponsor>();
  return c.json(sponsors.results);
});

// GET /api/sponsors/admin/all
sponsorRoutes.get('/admin/all', requireAuth(), async (c) => {
  const sponsors = await c.env.DB.prepare('SELECT * FROM sponsors ORDER BY created_at DESC').all();
  return c.json(sponsors.results);
});

// POST /api/sponsors
sponsorRoutes.post('/', requireAuth(), async (c) => {
  const data = await c.req.json<Partial<Sponsor>>();
  if (!data.name) return c.json({ error: 'Name is required' }, 400);

  const result = await c.env.DB.prepare(
    'INSERT INTO sponsors (name, logo_url, website, tier, is_active) VALUES (?, ?, ?, ?, ?)'
  ).bind(data.name, data.logo_url ?? null, data.website ?? null, data.tier ?? 'standard', data.is_active ?? 1).run();

  return c.json({ ok: true, id: result.meta.last_row_id }, 201);
});

// PUT /api/sponsors/:id
sponsorRoutes.put('/:id', requireAuth(), async (c) => {
  const data = await c.req.json<Partial<Sponsor>>();
  await c.env.DB.prepare(
    'UPDATE sponsors SET name = COALESCE(?, name), logo_url = ?, website = ?, tier = COALESCE(?, tier), is_active = COALESCE(?, is_active) WHERE id = ?'
  ).bind(data.name ?? null, data.logo_url ?? null, data.website ?? null, data.tier ?? null, data.is_active ?? null, c.req.param('id')).run();

  return c.json({ ok: true });
});

// DELETE /api/sponsors/:id
sponsorRoutes.delete('/:id', requireAuth(), async (c) => {
  await c.env.DB.prepare('DELETE FROM sponsors WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ ok: true });
});
