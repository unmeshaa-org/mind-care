import { NextResponse } from 'next/server';
import { createAdminToken } from '../../../../lib/adminAuth';

const DEFAULT_ADMIN_EMAIL = 'admin@mindcare.local';
const DEFAULT_ADMIN_PASSWORD = 'supersecret';

const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ||
  process.env.ADMIN_USERNAME ||
  (process.env.NODE_ENV !== 'production' ? DEFAULT_ADMIN_EMAIL : '');
const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD ||
  (process.env.NODE_ENV !== 'production' ? DEFAULT_ADMIN_PASSWORD : '');

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin credentials are not configured.' }, { status: 500 });
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  const token = createAdminToken();
  const response = NextResponse.json({ ok: true });
  response.headers.append(
    'Set-Cookie',
    `admin_session=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`,
  );
  return response;
}
