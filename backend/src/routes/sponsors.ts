import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth';
import type { Env, Sponsor } from '../lib/types';

export const sponsorRoutes = new Hono<{ Bindings: Env }>();

// GET /api/sponsors — active sponsors
sponsorRoutes.get('/', async (c) => {
  const sponsors = await c.env.DB.prepare('SELECT * FROM sponsors WHERE is_active = 1 ORDER BY id ASC').all<Sponsor>();
  return c.json(sponsors.results);
});

// GET /api/sponsors/admin/all — all sponsors
sponsorRoutes.get('/admin/all', requireAuth(), async (c) => {
  const sponsors = await c.env.DB.prepare('SELECT * FROM sponsors ORDER BY created_at DESC').all<Sponsor>();
  return c.json(sponsors.results);
});

// POST /api/sponsors
sponsorRoutes.post('/', requireAuth(), async (c) => {
  const data = await c.req.json<Partial<Sponsor>>();
  if (!data.name) return c.json({ error: 'Name is required' }, 400);

  const result = await c.env.DB.prepare(
    'INSERT INTO sponsors (name, logo_url, website, tier, is_active) VALUES (?, ?, ?, ?, ?)'
  ).bind(
    data.name, data.logo_url ?? null, data.website ?? null,
    data.tier ?? 'standard', data.is_active ?? 1
  ).run();

  return c.json({ ok: true, id: result.meta.last_row_id }, 201);
});

// PUT /api/sponsors/:id
sponsorRoutes.put('/:id', requireAuth(), async (c) => {
  const data = await c.req.json<Partial<Sponsor>>();
  const { id } = c.req.param();

  await c.env.DB.prepare(
    'UPDATE sponsors SET name = COALESCE(?, name), logo_url = ?, website = ?, tier = COALESCE(?, tier), is_active = COALESCE(?, is_active) WHERE id = ?'
  ).bind(
    data.name ?? null, data.logo_url ?? null, data.website ?? null,
    data.tier ?? null, data.is_active ?? null, id
  ).run();

  return c.json({ ok: true });
});

// DELETE /api/sponsors/:id
sponsorRoutes.delete('/:id', requireAuth(), async (c) => {
  await c.env.DB.prepare('DELETE FROM sponsors WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ ok: true });
});

// POST /api/sponsors/bulk-status
sponsorRoutes.post('/bulk-status', requireAuth(), async (c) => {
  const { ids, is_active } = await c.req.json<{ ids: number[]; is_active: number }>();
  if (!Array.isArray(ids) || !ids.length) return c.json({ error: 'IDs required' }, 400);

  const placeholders = ids.map(() => '?').join(',');
  await c.env.DB.prepare(`UPDATE sponsors SET is_active = ? WHERE id IN (${placeholders})`)
    .bind(is_active, ...ids)
    .run();

  return c.json({ ok: true, count: ids.length });
});

// POST /api/sponsors/bulk-delete
sponsorRoutes.post('/bulk-delete', requireAuth(), async (c) => {
  const { ids } = await c.req.json<{ ids: number[] }>();
  if (!Array.isArray(ids) || !ids.length) return c.json({ error: 'IDs required' }, 400);

  const placeholders = ids.map(() => '?').join(',');
  await c.env.DB.prepare(`DELETE FROM sponsors WHERE id IN (${placeholders})`)
    .bind(...ids)
    .run();

  return c.json({ ok: true, count: ids.length });
});
