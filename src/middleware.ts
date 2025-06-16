import createMiddleware from 'next-intl/middleware';
import { routing } from './libs/i18nNavigation';

export default createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: routing.localeDetection,
});

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|static|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
