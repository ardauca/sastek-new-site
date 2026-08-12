import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth';
import type { Env, TeamMember } from '../lib/types';

export const teamRoutes = new Hono<{ Bindings: Env }>();

// GET /api/team
teamRoutes.get('/', async (c) => {
  const team = await c.env.DB.prepare('SELECT * FROM team WHERE is_active = 1 ORDER BY order_num ASC, id ASC').all<TeamMember>();
  return c.json(team.results);
});

// GET /api/team/admin/all
teamRoutes.get('/admin/all', requireAuth(), async (c) => {
  const team = await c.env.DB.prepare('SELECT * FROM team ORDER BY order_num ASC, id ASC').all<TeamMember>();
  return c.json(team.results);
});

// POST /api/team
teamRoutes.post('/', requireAuth(), async (c) => {
  const data = await c.req.json<Partial<TeamMember>>();
  if (!data.name || !data.role_tr) return c.json({ error: 'Name and role_tr are required' }, 400);

  const result = await c.env.DB.prepare(
    'INSERT INTO team (name, role_tr, role_en, email, avatar_url, linkedin_url, order_num, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(
    data.name, data.role_tr, data.role_en ?? data.role_tr,
    data.email ?? null, data.avatar_url ?? null, data.linkedin_url ?? null,
    data.order_num ?? 0, data.is_active ?? 1
  ).run();

  return c.json({ ok: true, id: result.meta.last_row_id }, 201);
});

// PUT /api/team/:id
teamRoutes.put('/:id', requireAuth(), async (c) => {
  const data = await c.req.json<Partial<TeamMember>>();
  const { id } = c.req.param();

  await c.env.DB.prepare(
    'UPDATE team SET name = COALESCE(?, name), role_tr = COALESCE(?, role_tr), role_en = COALESCE(?, role_en), email = ?, avatar_url = COALESCE(?, avatar_url), linkedin_url = ?, order_num = COALESCE(?, order_num), is_active = COALESCE(?, is_active) WHERE id = ?'
  ).bind(
    data.name ?? null, data.role_tr ?? null, data.role_en ?? null,
    data.email ?? null, data.avatar_url ?? null, data.linkedin_url ?? null,
    data.order_num ?? null, data.is_active ?? null, id
  ).run();

  return c.json({ ok: true });
});

// DELETE /api/team/:id
teamRoutes.delete('/:id', requireAuth(), async (c) => {
  await c.env.DB.prepare('DELETE FROM team WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ ok: true });
});

// POST /api/team/bulk-status
teamRoutes.post('/bulk-status', requireAuth(), async (c) => {
  const { ids, is_active } = await c.req.json<{ ids: number[]; is_active: number }>();
  if (!Array.isArray(ids) || !ids.length) return c.json({ error: 'IDs required' }, 400);

  const placeholders = ids.map(() => '?').join(',');
  await c.env.DB.prepare(`UPDATE team SET is_active = ? WHERE id IN (${placeholders})`)
    .bind(is_active, ...ids)
    .run();

  return c.json({ ok: true, count: ids.length });
});

// POST /api/team/bulk-delete
teamRoutes.post('/bulk-delete', requireAuth(), async (c) => {
  const { ids } = await c.req.json<{ ids: number[] }>();
  if (!Array.isArray(ids) || !ids.length) return c.json({ error: 'IDs required' }, 400);

  const placeholders = ids.map(() => '?').join(',');
  await c.env.DB.prepare(`DELETE FROM team WHERE id IN (${placeholders})`)
    .bind(...ids)
    .run();

  return c.json({ ok: true, count: ids.length });
});
