import { Hono } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { verifyPassword, hashPassword, signJwt } from '../lib/crypto';
import type { Env, Admin } from '../lib/types';

export const authRoutes = new Hono<{ Bindings: Env }>();

// POST /api/auth/login
authRoutes.post('/login', async (c) => {
  const { username, password } = await c.req.json<{ username: string; password: string }>();

  if (!username || !password) {
    return c.json({ error: 'Username and password required' }, 400);
  }

  const admin = await c.env.DB.prepare('SELECT * FROM admins WHERE username = ?')
    .bind(username)
    .first<Admin>();

  if (!admin || !(await verifyPassword(password, admin.password_hash))) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const token = await signJwt({ sub: admin.id, username: admin.username }, c.env.JWT_SECRET);

  setCookie(c, 'auth_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  });

  return c.json({ ok: true, username: admin.username });
});

// POST /api/auth/logout
authRoutes.post('/logout', (c) => {
  deleteCookie(c, 'auth_token', { path: '/' });
  return c.json({ ok: true });
});

// GET /api/auth/me — check session
authRoutes.get('/me', async (c) => {
  const token = getCookie(c, 'auth_token');
  if (!token) return c.json({ authenticated: false }, 401);

  const { verifyJwt } = await import('../lib/crypto');
  const payload = await verifyJwt(token, c.env.JWT_SECRET);
  if (!payload) return c.json({ authenticated: false }, 401);

  return c.json({ authenticated: true, username: payload.username });
});

// POST /api/auth/setup — first-run: create initial admin
// Disabled automatically once any admin exists
authRoutes.post('/setup', async (c) => {
  const count = await c.env.DB.prepare('SELECT COUNT(*) as n FROM admins').first<{ n: number }>();
  if (count && count.n > 0) {
    return c.json({ error: 'Setup already completed' }, 403);
  }

  const { username, password } = await c.req.json<{ username: string; password: string }>();
  if (!username || !password || password.length < 8) {
    return c.json({ error: 'Username required and password must be at least 8 characters' }, 400);
  }

  const hash = await hashPassword(password);
  await c.env.DB.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)')
    .bind(username, hash)
    .run();

  return c.json({ ok: true, message: 'Admin created. Setup endpoint is now disabled.' });
});
