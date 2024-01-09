import { verifyAccessToken } from '@/utils/verifyAccessToken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PAGES = ['/login', '/_next/static', '/favicon.ico', '/manifest.json', '/auth-redirect'];

export function middleware(request: NextRequest) {
  if (PUBLIC_PAGES.some((path) => request.nextUrl.pathname.includes(path))) {
    return NextResponse.next();
  }

  const isLoggedIn = verifyAccessToken();

  if (!isLoggedIn) {
    return NextResponse.redirect(`${process.env.FRONTEND_URL}/login`);
  }

  // Exclude static files from middleware

  return NextResponse.next();
}

export const config = {
  source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
  missing: [
    { type: 'header', key: 'next-router-prefetch' },
    { type: 'header', key: 'purpose', value: 'prefetch' },
  ],
};
