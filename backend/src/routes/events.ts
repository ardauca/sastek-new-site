import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth';
import type { Env, EventRecord } from '../lib/types';

export const eventRoutes = new Hono<{ Bindings: Env }>();

// GET /api/events — list active events
eventRoutes.get('/', async (c) => {
  const events = await c.env.DB.prepare('SELECT * FROM events WHERE is_active = 1 ORDER BY id ASC').all<EventRecord>();
  return c.json(events.results);
});

// GET /api/events/admin/all — all events for admin
eventRoutes.get('/admin/all', requireAuth(), async (c) => {
  const events = await c.env.DB.prepare('SELECT * FROM events ORDER BY id DESC').all<EventRecord>();
  return c.json(events.results);
});

// POST /api/events
eventRoutes.post('/', requireAuth(), async (c) => {
  const data = await c.req.json<Partial<EventRecord>>();
  if (!data.slug || !data.title_tr) return c.json({ error: 'Slug and title_tr are required' }, 400);

  const result = await c.env.DB.prepare(`
    INSERT INTO events (slug, title_tr, title_en, summary_tr, summary_en, description_tr, description_en, category_tr, category_en, location_tr, location_en, image_url, status, is_featured, show_details, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    data.slug, data.title_tr, data.title_en ?? data.title_tr,
    data.summary_tr ?? null, data.summary_en ?? null,
    data.description_tr ?? null, data.description_en ?? null,
    data.category_tr ?? null, data.category_en ?? null,
    data.location_tr ?? null, data.location_en ?? null,
    data.image_url ?? null, data.status ?? 'planned',
    data.is_featured ?? 0, data.show_details ?? 0, data.is_active ?? 1
  ).run();

  return c.json({ ok: true, id: result.meta.last_row_id }, 201);
});

// PUT /api/events/:id
eventRoutes.put('/:id', requireAuth(), async (c) => {
  const data = await c.req.json<Partial<EventRecord>>();
  const { id } = c.req.param();

  await c.env.DB.prepare(`
    UPDATE events SET
      slug = COALESCE(?, slug), title_tr = COALESCE(?, title_tr), title_en = COALESCE(?, title_en),
      summary_tr = ?, summary_en = ?, description_tr = ?, description_en = ?,
      category_tr = ?, category_en = ?, location_tr = ?, location_en = ?,
      image_url = ?, status = COALESCE(?, status), is_featured = COALESCE(?, is_featured),
      show_details = COALESCE(?, show_details), is_active = COALESCE(?, is_active)
    WHERE id = ?
  `).bind(
    data.slug ?? null, data.title_tr ?? null, data.title_en ?? null,
    data.summary_tr ?? null, data.summary_en ?? null,
    data.description_tr ?? null, data.description_en ?? null,
    data.category_tr ?? null, data.category_en ?? null,
    data.location_tr ?? null, data.location_en ?? null,
    data.image_url ?? null, data.status ?? null,
    data.is_featured ?? null, data.show_details ?? null, data.is_active ?? null,
    id
  ).run();

  return c.json({ ok: true });
});

// DELETE /api/events/:id
eventRoutes.delete('/:id', requireAuth(), async (c) => {
  await c.env.DB.prepare('DELETE FROM events WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ ok: true });
});
