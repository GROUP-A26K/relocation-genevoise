import { getTranslations } from 'next-intl/server';

import { SITE_NAME } from '@/constants/seo';
import { getLocalizedPath } from '@/utils/seo';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

import type { TPathname } from '@/utils/appConfig';

const BREADCRUMB_KEYS = {
  '/find-accommodation': 'findAccommodation',
  '/find-a-tenant/landlords': 'findATenantLandlords',
  '/find-a-tenant/landlords/form': 'form',
  '/find-a-tenant/tenant': 'findATenantTenant',
  '/find-a-tenant/tenant/form': 'form',
  '/companies': 'companies',
  '/services/academic': 'academicService',
  '/services/concierge-service': 'conciergeService',
  '/services/discover-geneva': 'discoverGenevaService',
  '/properties': 'properties',
  '/blog': 'blog',
  '/career': 'career',
  '/call-me-back': 'callMeBack',
  '/contact': 'contact',
  '/faq': 'faq',
  '/legal-notice': 'legalNotices',
  '/personal-data': 'personalData',
  '/sitemap': 'sitemap',
} as const satisfies Partial<Record<TPathname, string>>;

type TBreadcrumbPathname = keyof typeof BREADCRUMB_KEYS;

interface IPageBreadcrumbJsonLdProps {
  locale: string;
  trail: TBreadcrumbPathname[];
}

export default async function PageBreadcrumbJsonLd({
  locale,
  trail,
}: IPageBreadcrumbJsonLdProps) {
  const t = await getTranslations({ locale, namespace: 'Breadcrumb' });

  return (
    <BreadcrumbJsonLd
      items={[
        { name: SITE_NAME, path: getLocalizedPath(locale, '/') },
        ...trail.map((pathname) => ({
          name: t(BREADCRUMB_KEYS[pathname]),
          path: getLocalizedPath(locale, pathname),
        })),
      ]}
    />
  );
}
