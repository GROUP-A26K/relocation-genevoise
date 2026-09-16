import createMiddleware from 'next-intl/middleware';

import { routing } from './libs/i18nNavigation';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|static|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
