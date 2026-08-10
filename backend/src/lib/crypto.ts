import type { JwtPayload } from './types';

const ALGORITHM = { name: 'HMAC', hash: 'SHA-256' };

async function getKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey('raw', enc.encode(secret), ALGORITHM, false, ['sign', 'verify']);
}

function b64url(data: string): string {
  return btoa(data).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function decodeB64url(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return atob(str);
}

export async function signJwt(payload: Omit<JwtPayload, 'exp'>, secret: string): Promise<string> {
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 8; // 8 hours
  const body = b64url(JSON.stringify({ ...payload, exp }));
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign(ALGORITHM, key, new TextEncoder().encode(`${header}.${body}`));
  const sigB64 = b64url(String.fromCharCode(...new Uint8Array(sig)));
  return `${header}.${body}.${sigB64}`;
}

export async function verifyJwt(token: string, secret: string): Promise<JwtPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, sigStr] = parts;
    const key = await getKey(secret);
    const sigBuf = Uint8Array.from(decodeB64url(sigStr), (c) => c.charCodeAt(0));
    const valid = await crypto.subtle.verify(ALGORITHM, key, sigBuf, new TextEncoder().encode(`${header}.${body}`));
    if (!valid) return null;
    const payload: JwtPayload = JSON.parse(decodeB64url(body));
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

// PBKDF2-SHA256 password hashing (bcrypt not available in Workers)
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100_000 },
    key, 256
  );
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  const hashHex = Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, '0')).join('');
  return `pbkdf2:${saltHex}:${hashHex}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split(':');
  if (parts.length !== 3 || parts[0] !== 'pbkdf2') return false;
  const salt = Uint8Array.from(parts[1].match(/.{2}/g)!.map(b => parseInt(b, 16)));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100_000 },
    key, 256
  );
  const hashHex = Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex === parts[2];
}
