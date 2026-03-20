import crypto from 'crypto';

const SECRET =
  process.env.ADMIN_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  (process.env.NODE_ENV !== 'production' ? 'dev-admin-session-secret' : '');
const COOKIE_NAME = 'admin_session';
const TOKEN_VALIDITY_SECONDS = 60 * 60 * 24; // 24 hours

export function createAdminToken() {
  if (!SECRET) {
    throw new Error('ADMIN_SECRET / NEXTAUTH_SECRET is not set');
  }

  const exp = Math.floor(Date.now() / 1000) + TOKEN_VALIDITY_SECONDS;
  const payload = `${exp}`;
  const signature = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

export function verifyAdminToken(token: string | null | undefined) {
  if (!token || !SECRET) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [expStr, signature] = parts;
  const exp = Number(expStr);
  if (!exp || exp < Math.floor(Date.now() / 1000)) return false;

  const expected = crypto.createHmac('sha256', SECRET).update(expStr).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function getAdminCookieValue(req: Request) {
  const cookie = req.headers.get('cookie');
  if (!cookie) return null;
  const match = cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function getAdminCookieHeader(token: string | null) {
  if (!token) {
    return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
  }

  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${TOKEN_VALIDITY_SECONDS}; HttpOnly; Secure; SameSite=Lax`;
}
