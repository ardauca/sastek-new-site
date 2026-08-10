import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth';
import type { Env, GalleryItem } from '../lib/types';

export const galleryRoutes = new Hono<{ Bindings: Env }>();

// GET /api/gallery — list gallery photos
galleryRoutes.get('/', async (c) => {
  const items = await c.env.DB.prepare('SELECT * FROM gallery ORDER BY id DESC').all<GalleryItem>();
  return c.json(items.results);
});

// POST /api/gallery — insert new gallery item
galleryRoutes.post('/', requireAuth(), async (c) => {
  const data = await c.req.json<Partial<GalleryItem>>();
  if (!data.url) return c.json({ error: 'URL is required' }, 400);

  const result = await c.env.DB.prepare(`
    INSERT INTO gallery (url, caption_tr, caption_en, event_tag, width, height, file_size)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    data.url,
    data.caption_tr ?? null,
    data.caption_en ?? null,
    data.event_tag ?? null,
    data.width ?? null,
    data.height ?? null,
    data.file_size ?? null,
  ).run();

  return c.json({ ok: true, id: result.meta.last_row_id }, 201);
});

// DELETE /api/gallery/:id
galleryRoutes.delete('/:id', requireAuth(), async (c) => {
  await c.env.DB.prepare('DELETE FROM gallery WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ ok: true });
});

// POST /api/gallery/bulk-delete — Bulk delete gallery photos
galleryRoutes.post('/bulk-delete', requireAuth(), async (c) => {
  const { ids } = await c.req.json<{ ids: number[] }>();
  if (!Array.isArray(ids) || !ids.length) return c.json({ error: 'IDs required' }, 400);

  const placeholders = ids.map(() => '?').join(',');
  await c.env.DB.prepare(`DELETE FROM gallery WHERE id IN (${placeholders})`)
    .bind(...ids)
    .run();

  return c.json({ ok: true, count: ids.length });
});
