import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAdminCookieValue, verifyAdminToken } from './lib/adminAuth';

const PUBLIC_PATHS = ['/admin/login', '/api/admin/login', '/api/admin/logout'];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect admin paths
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  // allow public admin endpoints
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = getAdminCookieValue(req);
  const isAuthenticated = verifyAdminToken(token);

  if (!isAuthenticated) {
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
