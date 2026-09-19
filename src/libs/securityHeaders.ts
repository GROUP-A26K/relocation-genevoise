type TDirectiveMap = Record<string, readonly string[]>;

type TSecurityHeader = {
  key: string;
  value: string;
};

type TSentryEndpoints = {
  origin: string;
  reportUri: string;
};

const SELF = "'self'";
const UNSAFE_INLINE = "'unsafe-inline'";
const UNSAFE_EVAL = "'unsafe-eval'";

const GOOGLE_TAG_MANAGER = 'https://www.googletagmanager.com';
const GOOGLE_ANALYTICS = 'https://*.google-analytics.com';
const GOOGLE = 'https://www.google.com';
const GOOGLE_ADS = 'https://googleads.g.doubleclick.net';
const DOUBLECLICK = 'https://*.g.doubleclick.net';
const COOKIEYES_CDN = 'https://cdn-cookieyes.com';
const CLARITY = 'https://*.clarity.ms';
const BING = 'https://c.bing.com';
const SANITY_CDN = 'https://cdn.sanity.io';
const TURNSTILE = 'https://challenges.cloudflare.com';

const getSentryEndpoints = (dsn?: string): TSentryEndpoints | null => {
  if (!dsn || !URL.canParse(dsn)) {
    return null;
  }

  const { origin, pathname, username } = new URL(dsn);
  const projectId = pathname.replace(/\//g, '');

  if (!projectId || !username) {
    return null;
  }

  return {
    origin,
    reportUri: `${origin}/api/${projectId}/security/?sentry_key=${username}`,
  };
};

const getCspDirectives = (
  sentry: TSentryEndpoints | null,
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
    'https://www.googleadservices.com',
    GOOGLE_ADS,
    GOOGLE,
    COOKIEYES_CDN,
    CLARITY,
    TURNSTILE,
  ],
  'style-src': [SELF, UNSAFE_INLINE],
  'img-src': [
    SELF,
    'data:',
    'blob:',
    SANITY_CDN,
    GOOGLE_TAG_MANAGER,
    GOOGLE_ANALYTICS,
    DOUBLECLICK,
    GOOGLE_ADS,
    GOOGLE,
    'https://www.google.ch',
    COOKIEYES_CDN,
    CLARITY,
    BING,
  ],
  'font-src': [SELF, 'data:'],
  'media-src': [SELF, SANITY_CDN, 'https://stream.mux.com'],
  'connect-src': [
    SELF,
    GOOGLE_ANALYTICS,
    'https://analytics.google.com',
    'https://*.analytics.google.com',
    GOOGLE_TAG_MANAGER,
    DOUBLECLICK,
    GOOGLE,
    'https://pagead2.googlesyndication.com',
    COOKIEYES_CDN,
    'https://log.cookieyes.com',
    'https://directory.cookieyes.com',
    CLARITY,
    BING,
    ...(sentry ? [sentry.origin] : []),
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
  'upgrade-insecure-requests': [],
  ...(sentry ? { 'report-uri': [sentry.reportUri] } : {}),
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
        getSentryEndpoints(process.env.NEXT_PUBLIC_SENTRY_DSN),
        process.env.NODE_ENV === 'development'
      )
    ),
  },
];
