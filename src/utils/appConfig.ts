import type { LocalePrefixMode } from 'next-intl/routing';

const localePrefix: LocalePrefixMode = 'as-needed';
const locales = ['fr', 'en'] as const;

export type TLocale = (typeof locales)[number];

const routes = {
  home: { fr: '/', en: '/' },
  findAccommodation: { fr: '/trouver-un-logement', en: '/find-accommodation' },
  findATenant: { fr: '/trouver-un-locataire', en: '/find-a-tenant' },
  findATenantLandlords: {
    fr: '/trouver-un-locataire/bailleurs',
    en: '/find-a-tenant/landlords',
  },
  findATenantTenant: {
    fr: '/trouver-un-locataire/locataires',
    en: '/find-a-tenant/tenant',
  },
  companies: { fr: '/entreprises', en: '/companies' },
  academicService: { fr: '/prestations/scolarite', en: '/services/academic' },
  conciergeService: {
    fr: '/prestations/service-de-conciergerie',
    en: '/services/concierge-service',
  },
  discoverGenevaService: {
    fr: '/prestations/decouvrir-geneve',
    en: '/services/discover-geneva',
  },
  properties: { fr: '/proprietes', en: '/properties' },
  blog: { fr: '/blog', en: '/blog' },
  career: { fr: '/carriere', en: '/career' },
  application: { fr: '/candidature', en: '/application' },
  callMeBack: { fr: '/rappelez-moi', en: '/call-me-back' },
  contact: { fr: '/contact', en: '/contact' },
  faq: { fr: '/faq', en: '/faq' },
  legalNotices: { fr: '/mentions-legales', en: '/legal-notice' },
  personalData: { fr: '/donnees-personnelles', en: '/personal-data' },
  sitemap: { fr: '/plan-du-site', en: '/sitemap' },
} as const;

type TLocalizedPath = { readonly fr: string; readonly en: string };

type TSegment = string | TLocalizedPath;

const localized = <T extends TLocalizedPath>(
  route: T,
  ...segments: TSegment[]
) => {
  const suffix = (locale: TLocale) =>
    segments
      .map((segment) =>
        typeof segment === 'string' ? `/${segment}` : `/${segment[locale]}`
      )
      .join('');

  return { fr: `${route.fr}${suffix('fr')}`, en: `${route.en}${suffix('en')}` };
};

const FORM_SEGMENT = { fr: 'formulaire', en: 'form' } as const;

const pathnames = {
  '/': routes.home,
  '/find-accommodation': routes.findAccommodation,
  '/find-a-tenant': routes.findATenant,
  '/find-a-tenant/landlords': routes.findATenantLandlords,
  '/find-a-tenant/landlords/form': localized(
    routes.findATenantLandlords,
    FORM_SEGMENT
  ),
  '/find-a-tenant/tenant': routes.findATenantTenant,
  '/find-a-tenant/tenant/form': localized(
    routes.findATenantTenant,
    FORM_SEGMENT
  ),
  '/companies': routes.companies,
  '/services/academic': routes.academicService,
  '/services/concierge-service': routes.conciergeService,
  '/services/discover-geneva': routes.discoverGenevaService,
  '/properties': routes.properties,
  '/properties/[slug]': localized(routes.properties, '[slug]'),
  '/properties/[slug]/photo-tour': localized(
    routes.properties,
    '[slug]',
    'photo-tour'
  ),
  '/blog': routes.blog,
  '/blog/[slug]': localized(routes.blog, '[slug]'),
  '/career': routes.career,
  '/career/[slug]': localized(routes.career, '[slug]'),
  '/application/[slug]': localized(routes.application, '[slug]'),
  '/call-me-back': routes.callMeBack,
  '/contact': routes.contact,
  '/faq': routes.faq,
  '/legal-notice': routes.legalNotices,
  '/personal-data': routes.personalData,
  '/sitemap': routes.sitemap,
} as const;

export type TPathname = keyof typeof pathnames;

const sitemapPriorities = {
  '/': 1.0,
  '/find-accommodation': 0.8,
  '/find-a-tenant/landlords': 0.8,
  '/find-a-tenant/landlords/form': 0.6,
  '/find-a-tenant/tenant': 0.8,
  '/find-a-tenant/tenant/form': 0.6,
  '/companies': 0.7,
  '/services/academic': 0.5,
  '/services/concierge-service': 0.5,
  '/services/discover-geneva': 0.5,
  '/properties': 0.7,
  '/blog': 0.8,
  '/career': 0.8,
  '/call-me-back': 0.8,
  '/contact': 0.8,
  '/faq': 0.6,
  '/legal-notice': 0.3,
  '/personal-data': 0.3,
  '/sitemap': 0.3,
} as const satisfies Partial<Record<TPathname, number>>;

export type TSitemapPathname = keyof typeof sitemapPriorities;

export const AppConfig = {
  name: 'Relocation Genevoise',
  locales,
  defaultLocale: 'fr',
  localePrefix,
  pathnames,
  sitemapPriorities,
} as const;
