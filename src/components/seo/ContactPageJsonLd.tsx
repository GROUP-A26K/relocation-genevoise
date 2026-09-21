import { getTranslations } from 'next-intl/server';

import JsonLd from '@/components/seo/JsonLd';
import {
  getAbsoluteUrl,
  getLanguageTag,
  getLocalizedPath,
  getSchemaId,
} from '@/utils/seo';

interface IContactPageJsonLdProps {
  locale: string;
}

export default async function ContactPageJsonLd({
  locale,
}: IContactPageJsonLdProps) {
  const t = await getTranslations({ locale, namespace: 'Metadata.Contact' });
  const url = getAbsoluteUrl(getLocalizedPath(locale, '/contact'));

  return (
    <JsonLd
      data={{
        '@type': 'ContactPage',
        '@id': `${url}#contactpage`,
        url,
        name: t('title'),
        description: t('description'),
        inLanguage: getLanguageTag(locale),
        isPartOf: { '@id': getSchemaId('website') },
        mainEntity: { '@id': getSchemaId('organization') },
      }}
    />
  );
}
