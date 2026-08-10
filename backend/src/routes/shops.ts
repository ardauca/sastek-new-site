import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth';
import type { Env, Shop } from '../lib/types';

export const shopRoutes = new Hono<{ Bindings: Env }>();

// ── Public ────────────────────────────────────────────────────────────────────

// GET /api/shops — list active shops
shopRoutes.get('/', async (c) => {
  const shops = await c.env.DB.prepare(`
    SELECT s.*, c.name_tr as category_tr, c.name_en as category_en, c.icon as category_icon
    FROM shops s
    LEFT JOIN categories c ON s.category_id = c.id
    WHERE s.is_active = 1
    ORDER BY s.order_num ASC, s.name ASC
  `).all<Shop & { category_tr: string; category_en: string; category_icon: string }>();

  return c.json(shops.results);
});

// GET /api/shops/categories — list all categories
shopRoutes.get('/categories', async (c) => {
  const cats = await c.env.DB.prepare('SELECT * FROM categories ORDER BY name_tr ASC').all();
  return c.json(cats.results);
});

// GET /api/shops/:id — single shop
shopRoutes.get('/:id', async (c) => {
  const shop = await c.env.DB.prepare('SELECT * FROM shops WHERE id = ?')
    .bind(c.req.param('id'))
    .first<Shop>();
  if (!shop) return c.json({ error: 'Not found' }, 404);
  return c.json(shop);
});

// ── Protected (Admin Only) ────────────────────────────────────────────────────

// GET /api/shops/admin/all — all shops including inactive
shopRoutes.get('/admin/all', requireAuth(), async (c) => {
  const shops = await c.env.DB.prepare(`
    SELECT s.*, c.name_tr as category_tr, c.name_en as category_en
    FROM shops s LEFT JOIN categories c ON s.category_id = c.id
    ORDER BY s.order_num ASC, s.created_at DESC
  `).all();
  return c.json(shops.results);
});

// POST /api/shops — create shop
shopRoutes.post('/', requireAuth(), async (c) => {
  const data = await c.req.json<Partial<Shop> & { is_featured?: number; show_on_map?: number; is_verified?: number; order_num?: number }>();
  if (!data.name) return c.json({ error: 'Name is required' }, 400);

  const result = await c.env.DB.prepare(`
    INSERT INTO shops (name, category_id, discount, description_tr, description_en, logo_url, website, address, phone, lat, lng, map_url, is_active, is_featured, show_on_map, is_verified, order_num)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    data.name,
    data.category_id ?? null,
    data.discount ?? null,
    data.description_tr ?? null,
    data.description_en ?? null,
    data.logo_url ?? null,
    data.website ?? null,
    data.address ?? null,
    data.phone ?? null,
    data.lat ?? null,
    data.lng ?? null,
    data.map_url ?? null,
    data.is_active ?? 1,
    data.is_featured ?? 0,
    data.show_on_map ?? 1,
    data.is_verified ?? 1,
    data.order_num ?? 1,
  ).run();

  return c.json({ ok: true, id: result.meta.last_row_id }, 201);
});

// PUT /api/shops/:id — update shop
shopRoutes.put('/:id', requireAuth(), async (c) => {
  const data = await c.req.json<Partial<Shop> & { is_featured?: number; show_on_map?: number; is_verified?: number; order_num?: number }>();
  const { id } = c.req.param();

  await c.env.DB.prepare(`
    UPDATE shops SET
      name = COALESCE(?, name),
      category_id = ?,
      discount = ?,
      description_tr = ?,
      description_en = ?,
      logo_url = ?,
      website = ?,
      address = ?,
      phone = ?,
      lat = ?,
      lng = ?,
      map_url = ?,
      is_active = COALESCE(?, is_active),
      is_featured = COALESCE(?, is_featured),
      show_on_map = COALESCE(?, show_on_map),
      is_verified = COALESCE(?, is_verified),
      order_num = COALESCE(?, order_num),
      updated_at = datetime('now')
    WHERE id = ?
  `).bind(
    data.name ?? null,
    data.category_id ?? null,
    data.discount ?? null,
    data.description_tr ?? null,
    data.description_en ?? null,
    data.logo_url ?? null,
    data.website ?? null,
    data.address ?? null,
    data.phone ?? null,
    data.lat ?? null,
    data.lng ?? null,
    data.map_url ?? null,
    data.is_active ?? null,
    data.is_featured ?? null,
    data.show_on_map ?? null,
    data.is_verified ?? null,
    data.order_num ?? null,
    id,
  ).run();

  return c.json({ ok: true });
});

// DELETE /api/shops/:id
shopRoutes.delete('/:id', requireAuth(), async (c) => {
  await c.env.DB.prepare('DELETE FROM shops WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ ok: true });
});

// POST /api/shops/bulk-status — Toplu görünürlük değiştirme (active=0/1)
shopRoutes.post('/bulk-status', requireAuth(), async (c) => {
  const { ids, is_active } = await c.req.json<{ ids: number[]; is_active: number }>();
  if (!Array.isArray(ids) || !ids.length) return c.json({ error: 'IDs array required' }, 400);

  const placeholders = ids.map(() => '?').join(',');
  await c.env.DB.prepare(`UPDATE shops SET is_active = ? WHERE id IN (${placeholders})`)
    .bind(is_active, ...ids)
    .run();

  return c.json({ ok: true, count: ids.length });
});

// POST /api/shops/bulk-field — Toplu alan güncelleme (is_featured, show_on_map, is_verified, is_active)
shopRoutes.post('/bulk-field', requireAuth(), async (c) => {
  const { ids, field, value } = await c.req.json<{ ids: number[]; field: string; value: number }>();
  if (!Array.isArray(ids) || !ids.length) return c.json({ error: 'IDs array required' }, 400);

  const allowedFields = ['is_featured', 'show_on_map', 'is_verified', 'is_active'];
  if (!allowedFields.includes(field)) return c.json({ error: 'Invalid field' }, 400);

  const placeholders = ids.map(() => '?').join(',');
  await c.env.DB.prepare(`UPDATE shops SET ${field} = ? WHERE id IN (${placeholders})`)
    .bind(value, ...ids)
    .run();

  return c.json({ ok: true, count: ids.length });
});

// POST /api/shops/bulk-delete — Toplu silme
shopRoutes.post('/bulk-delete', requireAuth(), async (c) => {
  const { ids } = await c.req.json<{ ids: number[] }>();
  if (!Array.isArray(ids) || !ids.length) return c.json({ error: 'IDs array required' }, 400);

  const placeholders = ids.map(() => '?').join(',');
  await c.env.DB.prepare(`DELETE FROM shops WHERE id IN (${placeholders})`)
    .bind(...ids)
    .run();

  return c.json({ ok: true, count: ids.length });
});
