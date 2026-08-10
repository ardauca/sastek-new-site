import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth';
import type { Env, SocialLink } from '../lib/types';

export const socialRoutes = new Hono<{ Bindings: Env }>();

// GET /api/socials
socialRoutes.get('/', async (c) => {
  const list = await c.env.DB.prepare('SELECT * FROM socials WHERE is_active = 1 ORDER BY order_num ASC, id ASC').all<SocialLink>();
  return c.json(list.results);
});

// GET /api/socials/admin/all
socialRoutes.get('/admin/all', requireAuth(), async (c) => {
  const list = await c.env.DB.prepare('SELECT * FROM socials ORDER BY order_num ASC, id ASC').all<SocialLink>();
  return c.json(list.results);
});

// POST /api/socials
socialRoutes.post('/', requireAuth(), async (c) => {
  const data = await c.req.json<Partial<SocialLink>>();
  if (!data.platform || !data.url) return c.json({ error: 'Platform and URL are required' }, 400);

  const result = await c.env.DB.prepare(
    'INSERT INTO socials (platform, label, url, icon, order_num, is_active) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(
    data.platform, data.label ?? data.platform, data.url,
    data.icon ?? data.platform.toLowerCase(), data.order_num ?? 0, data.is_active ?? 1
  ).run();

  return c.json({ ok: true, id: result.meta.last_row_id }, 201);
});

// PUT /api/socials/:id
socialRoutes.put('/:id', requireAuth(), async (c) => {
  const data = await c.req.json<Partial<SocialLink>>();
  const { id } = c.req.param();

  await c.env.DB.prepare(
    'UPDATE socials SET platform = COALESCE(?, platform), label = COALESCE(?, label), url = COALESCE(?, url), icon = COALESCE(?, icon), order_num = COALESCE(?, order_num), is_active = COALESCE(?, is_active) WHERE id = ?'
  ).bind(
    data.platform ?? null, data.label ?? null, data.url ?? null,
    data.icon ?? null, data.order_num ?? null, data.is_active ?? null, id
  ).run();

  return c.json({ ok: true });
});

// DELETE /api/socials/:id
socialRoutes.delete('/:id', requireAuth(), async (c) => {
  await c.env.DB.prepare('DELETE FROM socials WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ ok: true });
});

// POST /api/socials/bulk-status
socialRoutes.post('/bulk-status', requireAuth(), async (c) => {
  const { ids, is_active } = await c.req.json<{ ids: number[]; is_active: number }>();
  if (!Array.isArray(ids) || !ids.length) return c.json({ error: 'IDs required' }, 400);

  const placeholders = ids.map(() => '?').join(',');
  await c.env.DB.prepare(`UPDATE socials SET is_active = ? WHERE id IN (${placeholders})`)
    .bind(is_active, ...ids)
    .run();

  return c.json({ ok: true, count: ids.length });
});

// POST /api/socials/bulk-delete
socialRoutes.post('/bulk-delete', requireAuth(), async (c) => {
  const { ids } = await c.req.json<{ ids: number[] }>();
  if (!Array.isArray(ids) || !ids.length) return c.json({ error: 'IDs required' }, 400);

  const placeholders = ids.map(() => '?').join(',');
  await c.env.DB.prepare(`DELETE FROM socials WHERE id IN (${placeholders})`)
    .bind(...ids)
    .run();

  return c.json({ ok: true, count: ids.length });
});
