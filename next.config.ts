import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

import sentryWebpackPluginOptions from './sentry.config';

import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/libs/i18n.ts');

// Public URLs that changed when localized pathnames moved into next-intl.
// Safe to delete once Search Console reports no crawls on them (~2027-09).
const legacyRedirects = [
  { source: '/donnes-personnelles', destination: '/donnees-personnelles' },
  { source: '/sitemap', destination: '/plan-du-site' },
  {
    source: '/find-a-tenant',
    destination: '/trouver-un-locataire/bailleurs',
  },
].map((redirect) => ({ ...redirect, permanent: true }));

const HTML_LIMITED_BOTS =
  /Googlebot|Google-InspectionTool|Mediapartners-Google|AdsBot-Google|Google-PageRenderer|Storebot-Google|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|Applebot|OAI-SearchBot|ChatGPT-User|GPTBot|ClaudeBot|Claude-SearchBot|Claude-User|PerplexityBot|Perplexity-User|meta-externalagent|Amazonbot|MistralAI-User|CCBot|cohere-ai|facebookexternalhit|facebookcatalog|LinkedInBot|Twitterbot|Slackbot|Discordbot|WhatsApp|TelegramBot|Pinterestbot|redditbot|SkypeUriPreview|vkShare|ia_archiver|SemrushBot|AhrefsBot/i;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'randomuser.me' },
    ],
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  htmlLimitedBots: HTML_LIMITED_BOTS,
  sentry: {
    hideSourceMaps: true,
    widenClientFileUpload: true,
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default withSentryConfig(
  withNextIntl(nextConfig),
  sentryWebpackPluginOptions
);
