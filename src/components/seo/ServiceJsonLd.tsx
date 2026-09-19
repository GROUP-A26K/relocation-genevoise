import { getTranslations } from 'next-intl/server';

import JsonLd from '@/components/seo/JsonLd';
import { ORGANIZATION } from '@/constants/seo';
import {
  getAbsoluteUrl,
  getLanguageTag,
  getLocalizedPath,
  getSchemaId,
} from '@/utils/seo';

const SERVICES = {
  academic: {
    pathname: '/services/academic',
    metadata: 'AcademicService',
  },
  concierge: {
    pathname: '/services/concierge-service',
    metadata: 'ConciergeService',
  },
  discoverGeneva: {
    pathname: '/services/discover-geneva',
    metadata: 'DiscoverGeneva',
  },
  companies: {
    pathname: '/companies',
    metadata: 'Companies',
  },
  findAccommodation: {
    pathname: '/find-accommodation',
    metadata: 'FindAccommodation',
  },
} as const;

type TService = keyof typeof SERVICES;

interface IServiceJsonLdProps {
  service: TService;
  locale: string;
}

export default async function ServiceJsonLd({
  service,
  locale,
}: IServiceJsonLdProps) {
  const { pathname, metadata } = SERVICES[service];
  const t = await getTranslations({
    locale,
    namespace: 'StructuredData.Service',
  });
  const tMetadata = await getTranslations({ locale, namespace: 'Metadata' });
  const url = getAbsoluteUrl(getLocalizedPath(locale, pathname));

  return (
    <JsonLd
      data={{
        '@type': 'Service',
        '@id': `${url}#service`,
        url,
        name: t(`${service}.name`),
        description: tMetadata(`${metadata}.description`),
        serviceType: t(`${service}.serviceType`),
        provider: { '@id': getSchemaId('organization') },
        areaServed: { '@type': 'City', name: ORGANIZATION.areaServed },
        inLanguage: getLanguageTag(locale),
      }}
    />
  );
}
