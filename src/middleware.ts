import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './libs/i18nNavigation';

import type { NextRequest } from 'next/server';

const TEMPORARY_REDIRECT = 307;
const PERMANENT_REDIRECT = 308;

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  if (response.status !== TEMPORARY_REDIRECT) {
    return response;
  }

  return new NextResponse(null, {
    status: PERMANENT_REDIRECT,
    headers: response.headers,
  });
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|static|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
