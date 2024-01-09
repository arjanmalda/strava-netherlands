import { REFRESH_TOKEN_KEY } from '@/utils/tokens';
import { verifyAccessToken } from '@/utils/verifyAccessToken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PAGES = ['/login', '/_next/static', '/favicon.ico', '/manifest.json', '/auth-redirect', '/auth-refresh'];

export function middleware(request: NextRequest) {
  if (PUBLIC_PAGES.some((path) => request.nextUrl.pathname.includes(path))) {
    return NextResponse.next();
  }

  const isLoggedIn = verifyAccessToken();

  if (!isLoggedIn) {
    const refresh_token = cookies().get(REFRESH_TOKEN_KEY)?.value;

    if (!refresh_token) {
      return NextResponse.redirect(`${process.env.FRONTEND_URL}/login`);
    }

    return NextResponse.redirect(`${process.env.FRONTEND_URL}/auth-refresh`);
  }

  return NextResponse.next();
}

export const config = {
  source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
  missing: [
    { type: 'header', key: 'next-router-prefetch' },
    { type: 'header', key: 'purpose', value: 'prefetch' },
  ],
};
