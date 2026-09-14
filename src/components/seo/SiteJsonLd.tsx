import { getTranslations } from 'next-intl/server';

import JsonLd from '@/components/seo/JsonLd';
import { AppConfig } from '@/utils/AppConfig';
import { OG_IMAGE, ORGANIZATION, SITE_NAME } from '@/constants/seo';
import {
  getAbsoluteUrl,
  getLanguageTag,
  getSchemaId,
  getSiteUrl,
} from '@/utils/seo';

interface ISiteJsonLdProps {
  locale: string;
}

export default async function SiteJsonLd({ locale }: ISiteJsonLdProps) {
  const t = await getTranslations({ locale, namespace: 'Metadata.Home' });
  const homeUrl = `${getSiteUrl()}/`;
  const { address, logo } = ORGANIZATION;

  return (
    <JsonLd
      data={{
        '@graph': [
          {
            '@type': 'RealEstateAgent',
            '@id': getSchemaId('organization'),
            name: ORGANIZATION.name,
            legalName: ORGANIZATION.legalName,
            description: t('description'),
            url: homeUrl,
            logo: {
              '@type': 'ImageObject',
              url: getAbsoluteUrl(logo.path),
              width: logo.width,
              height: logo.height,
            },
            image: getAbsoluteUrl(OG_IMAGE.path),
            email: ORGANIZATION.email,
            telephone: ORGANIZATION.telephone,
            address: { '@type': 'PostalAddress', ...address },
            areaServed: { '@type': 'City', name: ORGANIZATION.areaServed },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              email: ORGANIZATION.email,
              telephone: ORGANIZATION.telephone,
              availableLanguage: ORGANIZATION.availableLanguage,
            },
            sameAs: ORGANIZATION.sameAs,
          },
          {
            '@type': 'WebSite',
            '@id': getSchemaId('website'),
            url: homeUrl,
            name: SITE_NAME,
            inLanguage: AppConfig.locales.map(getLanguageTag),
            publisher: { '@id': getSchemaId('organization') },
          },
        ],
      }}
    />
  );
}
