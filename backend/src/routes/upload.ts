import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth';
import type { Env } from '../lib/types';

export const uploadRoutes = new Hono<{ Bindings: Env }>();

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_FOLDERS = ['logos', 'gallery', 'sponsors'];

// GET /api/upload/file/:key{.+} — Serve images directly from Cloudflare R2
uploadRoutes.get('/file/:key{.+}', async (c) => {
  const key = c.req.param('key');
  const object = await c.env.MEDIA.get(key);
  if (!object) return c.json({ error: 'File not found' }, 404);

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('cache-control', 'public, max-age=31536000');

  return new Response(object.body, { headers });
});

// POST /api/upload — Upload new file to R2
uploadRoutes.post('/', requireAuth(), async (c) => {
  const form = await c.req.formData();
  const file = form.get('file') as File | null;
  const folder = (form.get('folder') as string | null) ?? 'gallery';

  if (!file) return c.json({ error: 'No file provided' }, 400);
  if (!ALLOWED_TYPES.includes(file.type)) {
    return c.json({ error: `File type not allowed. Use: ${ALLOWED_TYPES.join(', ')}` }, 400);
  }
  if (file.size > MAX_SIZE) {
    return c.json({ error: 'File exceeds 5 MB limit' }, 400);
  }
  if (!ALLOWED_FOLDERS.includes(folder)) {
    return c.json({ error: 'Invalid folder' }, 400);
  }

  // Generate a unique key: folder/timestamp-randomhex.ext
  const ext = file.type.split('/')[1].replace('jpeg', 'jpg');
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(6)))
    .map(b => b.toString(16).padStart(2, '0')).join('');
  const key = `${folder}/${Date.now()}-${rand}.${ext}`;

  const buffer = await file.arrayBuffer();
  await c.env.MEDIA.put(key, buffer, {
    httpMetadata: { contentType: file.type },
  });

  const publicUrl = `https://admin.sastek.org/api/upload/file/${key}`;

  return c.json({ ok: true, url: publicUrl, key });
});

// DELETE /api/upload/:key — Delete file from R2
uploadRoutes.delete('/:key{.+}', requireAuth(), async (c) => {
  const key = c.req.param('key') || '';
  await c.env.MEDIA.delete(key);
  return c.json({ ok: true });
});
