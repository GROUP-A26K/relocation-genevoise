type TDirectiveMap = Record<string, readonly string[]>;

type TSecurityHeader = {
  key: string;
  value: string;
};

const SELF = "'self'";
const UNSAFE_INLINE = "'unsafe-inline'";
const UNSAFE_EVAL = "'unsafe-eval'";

const GOOGLE_TAG_MANAGER = 'https://www.googletagmanager.com';
const GOOGLE_ANALYTICS = 'https://*.google-analytics.com';
const GOOGLE = 'https://www.google.com';
const GOOGLE_ADS = 'https://googleads.g.doubleclick.net';
const DOUBLECLICK = 'https://*.doubleclick.net';
const GOOGLE_AD_SERVICES = 'https://www.googleadservices.com';
const GOOGLE_SYNDICATION = 'https://pagead2.googlesyndication.com';
const GOOGLE_FONTS_STYLES = 'https://fonts.googleapis.com';
const GOOGLE_FONTS_FILES = 'https://fonts.gstatic.com';
const CLOUDFLARE_INSIGHTS_SCRIPT = 'https://static.cloudflareinsights.com';
const CLOUDFLARE_INSIGHTS_BEACON = 'https://cloudflareinsights.com';
const COOKIEYES_CDN = 'https://cdn-cookieyes.com';
const CLARITY = 'https://*.clarity.ms';
const BING = 'https://c.bing.com';
const SANITY_CDN = 'https://cdn.sanity.io';
const TURNSTILE = 'https://challenges.cloudflare.com';

const GOOGLE_COUNTRY_DOMAINS = [
  'https://www.google.ch',
  'https://www.google.fr',
  'https://www.google.de',
  'https://www.google.it',
  'https://www.google.es',
  'https://www.google.co.uk',
];

const getSentryOrigin = (dsn?: string) =>
  dsn && URL.canParse(dsn) ? new URL(dsn).origin : null;

const getCspDirectives = (
  sentryOrigin: string | null,
  isDevelopment: boolean
): TDirectiveMap => ({
  'default-src': [SELF],
  'base-uri': [SELF],
  'object-src': ["'none'"],
  'frame-ancestors': [SELF],
  'form-action': [SELF],
  'script-src': [
    SELF,
    UNSAFE_INLINE,
    ...(isDevelopment ? [UNSAFE_EVAL] : []),
    GOOGLE_TAG_MANAGER,
    GOOGLE_ANALYTICS,
    GOOGLE_AD_SERVICES,
    GOOGLE_ADS,
    GOOGLE,
    COOKIEYES_CDN,
    CLARITY,
    TURNSTILE,
    CLOUDFLARE_INSIGHTS_SCRIPT,
  ],
  'style-src': [SELF, UNSAFE_INLINE, GOOGLE_FONTS_STYLES],
  'img-src': [SELF, 'data:', 'blob:', 'https:'],
  'font-src': [SELF, 'data:', GOOGLE_FONTS_FILES],
  'media-src': [SELF, SANITY_CDN, 'https://stream.mux.com'],
  'connect-src': [
    SELF,
    GOOGLE_ANALYTICS,
    'https://analytics.google.com',
    'https://*.analytics.google.com',
    GOOGLE_TAG_MANAGER,
    DOUBLECLICK,
    GOOGLE,
    ...GOOGLE_COUNTRY_DOMAINS,
    GOOGLE_AD_SERVICES,
    GOOGLE_SYNDICATION,
    COOKIEYES_CDN,
    'https://log.cookieyes.com',
    'https://directory.cookieyes.com',
    CLARITY,
    BING,
    CLOUDFLARE_INSIGHTS_BEACON,
    ...(sentryOrigin ? [sentryOrigin] : []),
  ],
  'frame-src': [
    SELF,
    GOOGLE,
    GOOGLE_TAG_MANAGER,
    'https://td.doubleclick.net',
    'https://www.youtube-nocookie.com',
    'https://www.youtube.com',
    'https://player.vimeo.com',
    TURNSTILE,
  ],
  'worker-src': [SELF, 'blob:'],
  'manifest-src': [SELF],
});

const PERMISSIONS_POLICY: TDirectiveMap = {
  camera: [],
  microphone: [],
  geolocation: [],
  payment: [],
  usb: [],
  'browsing-topics': [],
};

const serializeCsp = (directives: TDirectiveMap) =>
  Object.entries(directives)
    .map(([name, sources]) => [name, ...sources].join(' '))
    .join('; ');

const serializePermissionsPolicy = (features: TDirectiveMap) =>
  Object.entries(features)
    .map(([feature, allowlist]) => `${feature}=(${allowlist.join(' ')})`)
    .join(', ');

export const getSecurityHeaders = (): TSecurityHeader[] => [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: serializePermissionsPolicy(PERMISSIONS_POLICY),
  },
  {
    key: 'Content-Security-Policy-Report-Only',
    value: serializeCsp(
      getCspDirectives(
        getSentryOrigin(process.env.NEXT_PUBLIC_SENTRY_DSN),
        process.env.NODE_ENV === 'development'
      )
    ),
  },
];
