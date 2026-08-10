import type { MiddlewareHandler } from 'hono';
import { getCookie } from 'hono/cookie';
import { verifyJwt } from '../lib/crypto';
import type { Env } from '../lib/types';

// Auth middleware for protecting routes
export const requireAuth = (): MiddlewareHandler<{ Bindings: Env }> => {
  return async (c, next) => {
    const token = getCookie(c, 'auth_token');
    if (!token) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const payload = await verifyJwt(token, c.env.JWT_SECRET);
    if (!payload) {
      return c.json({ error: 'Invalid or expired session' }, 401);
    }

    await next();
  };
};
