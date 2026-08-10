import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth';
import type { Env, GalleryItem } from '../lib/types';

export const galleryRoutes = new Hono<{ Bindings: Env }>();

// GET /api/gallery
galleryRoutes.get('/', async (c) => {
  const tag = c.req.query('tag');
  const query = tag
    ? 'SELECT * FROM gallery WHERE event_tag = ? ORDER BY uploaded_at DESC'
    : 'SELECT * FROM gallery ORDER BY uploaded_at DESC';
  const items = await c.env.DB.prepare(query).bind(...(tag ? [tag] : [])).all<GalleryItem>();
  return c.json(items.results);
});

// GET /api/gallery/tags — list distinct event tags
galleryRoutes.get('/tags', async (c) => {
  const tags = await c.env.DB.prepare(
    'SELECT DISTINCT event_tag FROM gallery WHERE event_tag IS NOT NULL ORDER BY event_tag ASC'
  ).all<{ event_tag: string }>();
  return c.json(tags.results.map(t => t.event_tag));
});

// POST /api/gallery — add item (URL already uploaded to R2)
galleryRoutes.post('/', requireAuth(), async (c) => {
  const data = await c.req.json<Partial<GalleryItem>>();
  if (!data.url) return c.json({ error: 'URL is required' }, 400);

  const result = await c.env.DB.prepare(
    'INSERT INTO gallery (url, caption_tr, caption_en, event_tag, width, height, file_size) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(data.url, data.caption_tr ?? null, data.caption_en ?? null, data.event_tag ?? null, data.width ?? null, data.height ?? null, data.file_size ?? null).run();

  return c.json({ ok: true, id: result.meta.last_row_id }, 201);
});

// DELETE /api/gallery/:id — also removes from R2
galleryRoutes.delete('/:id', requireAuth(), async (c) => {
  const item = await c.env.DB.prepare('SELECT url FROM gallery WHERE id = ?')
    .bind(c.req.param('id'))
    .first<{ url: string }>();

  if (item) {
    // Extract the R2 key from the URL (everything after the bucket domain)
    const key = new URL(item.url).pathname.slice(1);
    await c.env.MEDIA.delete(key);
  }

  await c.env.DB.prepare('DELETE FROM gallery WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ ok: true });
});
