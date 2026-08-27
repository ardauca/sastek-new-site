import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth';
import type { Env, QrCodeWithStats } from '../lib/types';

export const qrRoutes = new Hono<{ Bindings: Env }>();
export const qrPublicRoutes = new Hono<{ Bindings: Env }>();

const RESERVED_SLUGS = [
  'api', 'admin', 'q', 'assets', 'static', 'images', 'login', 'logout',
  'health', 'dashboard', 'settings', 'favicon', 'robots', 'sitemap', 'en',
  'etkinlikler', 'galeri', 'hakkimizda', 'iletisim', 'sponsorlar', 'anlasmali-noktalar'
];

function isValidSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string' || slug.length > 64) return false;
  if (RESERVED_SLUGS.includes(slug.toLowerCase())) return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function isValidTargetUrl(rawUrl: string): boolean {
  if (!rawUrl || typeof rawUrl !== 'string') return false;
  try {
    const u = new URL(rawUrl);
    if (!['http:', 'https:'].includes(u.protocol)) return false;
    if (u.username || u.password) return false;
    return true;
  } catch {
    return false;
  }
}

// ── Admin Protected API (/api/qr) ─────────────────────────────────────────────

// GET /api/qr — List all QR codes with aggregated statistics (No N+1 query)
qrRoutes.get('/', requireAuth(), async (c) => {
  const rows = await c.env.DB.prepare(`
    SELECT 
      q.id, q.slug, q.target_url, q.title, q.is_active, q.created_at, q.updated_at,
      COUNT(s.id) AS total_scans,
      COUNT(CASE WHEN s.scanned_at >= date('now', 'start of day') THEN 1 END) AS today_scans,
      COUNT(CASE WHEN s.scanned_at >= datetime('now', '-7 days') THEN 1 END) AS last_7d_scans,
      COUNT(CASE WHEN s.scanned_at >= datetime('now', '-30 days') THEN 1 END) AS last_30d_scans,
      MAX(s.scanned_at) AS last_scanned_at
    FROM qr_codes q
    LEFT JOIN qr_scans s ON q.id = s.qr_id
    GROUP BY q.id
    ORDER BY q.id DESC
  `).all<QrCodeWithStats>();

  return c.json(rows.results);
});

// POST /api/qr — Create new QR code
qrRoutes.post('/', requireAuth(), async (c) => {
  const data = await c.req.json<{
    title?: string;
    slug?: string;
    target_url?: string;
    is_active?: number;
  }>();

  const title = (data.title || '').trim();
  const slug = (data.slug || '').trim().toLowerCase();
  const targetUrl = (data.target_url || '').trim();
  const isActive = data.is_active !== undefined ? (data.is_active ? 1 : 0) : 1;

  if (!title) {
    return c.json({ error: 'QR başlığı zorunludur' }, 400);
  }
  if (!isValidSlug(slug)) {
    return c.json({ error: 'Geçersiz slug. Yalnızca küçük harf, rakam ve tire (-) içerebilir (maks. 64 karakter)' }, 400);
  }
  if (!isValidTargetUrl(targetUrl)) {
    return c.json({ error: 'Geçersiz hedef URL. Yalnızca geçerli http:// veya https:// bağlantıları kabul edilir' }, 400);
  }

  // Duplicate slug check
  const existing = await c.env.DB.prepare('SELECT id FROM qr_codes WHERE slug = ?').bind(slug).first();
  if (existing) {
    return c.json({ error: 'Bu slug ("' + slug + '") zaten başka bir QR kodda kullanılıyor' }, 409);
  }

  const result = await c.env.DB.prepare(`
    INSERT INTO qr_codes (slug, target_url, title, is_active)
    VALUES (?, ?, ?, ?)
  `).bind(slug, targetUrl, title, isActive).run();

  return c.json({ ok: true, id: result.meta.last_row_id }, 201);
});

// PUT /api/qr/:id — Update QR code
qrRoutes.put('/:id', requireAuth(), async (c) => {
  const id = c.req.param('id');
  const data = await c.req.json<{
    title?: string;
    slug?: string;
    target_url?: string;
    is_active?: number;
  }>();

  const existing = await c.env.DB.prepare('SELECT * FROM qr_codes WHERE id = ?').bind(id).first<{
    id: number; slug: string; target_url: string; title: string; is_active: number;
  }>();
  if (!existing) {
    return c.json({ error: 'QR kod bulunamadı' }, 404);
  }

  const title = data.title !== undefined ? data.title.trim() : existing.title;
  const slug = data.slug !== undefined ? data.slug.trim().toLowerCase() : existing.slug;
  const targetUrl = data.target_url !== undefined ? data.target_url.trim() : existing.target_url;
  const isActive = data.is_active !== undefined ? (data.is_active ? 1 : 0) : existing.is_active;

  if (!title) {
    return c.json({ error: 'QR başlığı zorunludur' }, 400);
  }
  if (!isValidSlug(slug)) {
    return c.json({ error: 'Geçersiz slug. Yalnızca küçük harf, rakam ve tire (-) içerebilir' }, 400);
  }
  if (!isValidTargetUrl(targetUrl)) {
    return c.json({ error: 'Geçersiz hedef URL. Yalnızca geçerli http:// veya https:// bağlantıları kabul edilir' }, 400);
  }

  // Duplicate slug check (other rows)
  if (slug !== existing.slug) {
    const slugConflict = await c.env.DB.prepare('SELECT id FROM qr_codes WHERE slug = ? AND id != ?').bind(slug, id).first();
    if (slugConflict) {
      return c.json({ error: 'Bu slug ("' + slug + '") zaten başka bir QR kodda kullanılıyor' }, 409);
    }
  }

  await c.env.DB.prepare(`
    UPDATE qr_codes SET
      title = ?,
      slug = ?,
      target_url = ?,
      is_active = ?,
      updated_at = datetime('now')
    WHERE id = ?
  `).bind(title, slug, targetUrl, isActive, id).run();

  return c.json({ ok: true });
});

// DELETE /api/qr/:id — Delete QR code (CASCADE deletes scans automatically)
qrRoutes.delete('/:id', requireAuth(), async (c) => {
  const id = c.req.param('id');
  await c.env.DB.prepare('DELETE FROM qr_codes WHERE id = ?').bind(id).run();
  return c.json({ ok: true });
});

// POST /api/qr/bulk-status — Bulk toggle active/inactive
qrRoutes.post('/bulk-status', requireAuth(), async (c) => {
  const { ids, is_active } = await c.req.json<{ ids: number[]; is_active: number }>();
  if (!Array.isArray(ids) || !ids.length) return c.json({ error: 'IDs required' }, 400);

  const status = is_active ? 1 : 0;
  const placeholders = ids.map(() => '?').join(',');
  await c.env.DB.prepare(`UPDATE qr_codes SET is_active = ?, updated_at = datetime('now') WHERE id IN (${placeholders})`)
    .bind(status, ...ids)
    .run();

  return c.json({ ok: true, count: ids.length });
});

// POST /api/qr/bulk-delete — Bulk delete QR codes
qrRoutes.post('/bulk-delete', requireAuth(), async (c) => {
  const { ids } = await c.req.json<{ ids: number[] }>();
  if (!Array.isArray(ids) || !ids.length) return c.json({ error: 'IDs required' }, 400);

  const placeholders = ids.map(() => '?').join(',');
  await c.env.DB.prepare(`DELETE FROM qr_codes WHERE id IN (${placeholders})`)
    .bind(...ids)
    .run();

  return c.json({ ok: true, count: ids.length });
});

// ── Public Redirect Handler (/q/:slug) ───────────────────────────────────────

qrPublicRoutes.get('/:slug', async (c) => {
  const slug = (c.req.param('slug') || '').trim().toLowerCase();

  // 1. D1 lookup
  const qr = await c.env.DB.prepare(
    'SELECT id, target_url, is_active FROM qr_codes WHERE slug = ?'
  ).bind(slug).first<{ id: number; target_url: string; is_active: number }>();

  // 2. Not found or inactive -> Safe 404 response
  if (!qr || qr.is_active !== 1) {
    return c.html(`
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SASTEK — QR Bağlantısı Bulunamadı</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0f1e; color: #e2e8f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
    .card { background: #111827; border: 1px solid #1e2d45; border-radius: 14px; padding: 36px 28px; max-width: 440px; width: 100%; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .icon { font-size: 2.4rem; margin-bottom: 12px; }
    h1 { font-size: 1.15rem; color: #fff; margin: 0 0 8px 0; font-weight: 700; }
    p { color: #94a3b8; font-size: 0.85rem; line-height: 1.6; margin: 0 0 24px 0; }
    .btn { display: inline-block; background: #00d4ff; color: #0a0f1e; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 0.85rem; transition: opacity 0.2s; }
    .btn:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">📱</div>
    <h1>Bağlantı Bulunamadı veya Devre Dışı</h1>
    <p>Bu QR kod şu anda aktif değildir veya yönlendirme adresi kaldırılmıştır.</p>
    <a href="https://sastek.org" class="btn">SASTEK Ana Sayfaya Git</a>
  </div>
</body>
</html>
    `, 404);
  }

  // 3. Log scan asynchronously (never blocks redirect even if D1 fails)
  c.executionCtx.waitUntil(
    c.env.DB.prepare('INSERT INTO qr_scans (qr_id) VALUES (?)').bind(qr.id).run().catch(err => {
      console.error('Failed to log QR scan for id ' + qr.id + ':', err);
    })
  );

  // 4. Cache-preventing headers + 302 Temporary Redirect
  c.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  c.header('Pragma', 'no-cache');
  c.header('Expires', '0');
  return c.redirect(qr.target_url, 302);
});
