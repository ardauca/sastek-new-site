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

function getR2KeyFromUrl(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/\/api\/upload\/file\/(.+)$/);
  return match ? match[1] : null;
}

// DELETE /api/gallery/:id
galleryRoutes.delete('/:id', requireAuth(), async (c) => {
  const id = c.req.param('id');

  // 1. Önce D1'den kaydın URL'sini al
  const item = await c.env.DB.prepare('SELECT url FROM gallery WHERE id = ?').bind(id).first<{ url: string }>();

  // 2. D1'den kaydı sil
  await c.env.DB.prepare('DELETE FROM gallery WHERE id = ?').bind(id).run();

  // 3. D1 silme başarılı olduktan sonra R2 key çıkarılabiliyorsa best-effort sil
  if (item?.url) {
    const r2Key = getR2KeyFromUrl(item.url);
    if (r2Key) {
      try {
        await c.env.MEDIA.delete(r2Key);
      } catch (err) {
        console.error(`Failed to delete R2 object for gallery id ${id} (key: ${r2Key}):`, err);
      }
    }
  }

  return c.json({ ok: true });
});

// POST /api/gallery/bulk-delete — Bulk delete gallery photos
galleryRoutes.post('/bulk-delete', requireAuth(), async (c) => {
  const { ids } = await c.req.json<{ ids: number[] }>();
  if (!Array.isArray(ids) || !ids.length) return c.json({ error: 'IDs required' }, 400);

  const placeholders = ids.map(() => '?').join(',');

  // 1. Silinecek kayıtların URL'lerini D1 DELETE'ten önce al
  const items = await c.env.DB.prepare(`SELECT url FROM gallery WHERE id IN (${placeholders})`)
    .bind(...ids)
    .all<{ url: string }>();

  // 2. D1 kayıtlarını sil
  await c.env.DB.prepare(`DELETE FROM gallery WHERE id IN (${placeholders})`)
    .bind(...ids)
    .run();

  // 3. Başarılı D1 silme sonrasında ilgili R2 key'lerini best-effort olarak sil
  if (items.results && items.results.length > 0) {
    const r2Keys = items.results
      .map(row => getR2KeyFromUrl(row.url))
      .filter((k): k is string => Boolean(k));

    if (r2Keys.length > 0) {
      await Promise.allSettled(
        r2Keys.map(async (key) => {
          try {
            await c.env.MEDIA.delete(key);
          } catch (err) {
            console.error(`Failed to delete R2 object in bulk-delete (key: ${key}):`, err);
          }
        })
      );
    }
  }

  return c.json({ ok: true, count: ids.length });
});
