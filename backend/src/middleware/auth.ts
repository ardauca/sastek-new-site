import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { verifyJwt } from '../lib/crypto';
import type { Env, JwtPayload } from '../lib/types';

// Middleware that protects routes requiring authentication
export function requireAuth() {
  return async (
    c: Parameters<Parameters<Hono<{ Bindings: Env }>['use']>[0]>[0],
    next: () => Promise<void>
  ) => {
    const token = getCookie(c, 'auth_token');
    if (!token) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const payload = await verifyJwt(token, c.env.JWT_SECRET);
    if (!payload) {
      return c.json({ error: 'Invalid or expired session' }, 401);
    }

    c.set('jwtPayload' as never, payload as never);
    await next();
  };
}
