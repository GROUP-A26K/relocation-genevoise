import JsonLd from '@/components/seo/JsonLd';
import { ORGANIZATION, SITE_NAME } from '@/constants/seo';
import {
  getAbsoluteUrl,
  getLanguageTag,
  getSchemaId,
  getSiteUrl,
  toIsoDate,
} from '@/utils/seo';

import type { BlogDetail } from '@/models/BLog';

interface IBlogJsonLdProps {
  blog: BlogDetail;
  locale: string;
  path: string;
}

export default function BlogJsonLd({ blog, locale, path }: IBlogJsonLdProps) {
  const url = getAbsoluteUrl(path);
  const datePublished = toIsoDate(blog.publishedDate);

  return (
    <JsonLd
      data={{
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: blog.title,
        description: blog.description,
        image: [blog.imageUrl],
        datePublished,
        dateModified: toIsoDate(blog.updatedAt) ?? datePublished,
        inLanguage: getLanguageTag(locale),
        timeRequired: blog.timeToRead > 0 ? `PT${blog.timeToRead}M` : undefined,
        author: { '@type': 'Person', name: blog.author.name },
        publisher: {
          '@type': 'Organization',
          '@id': getSchemaId('organization'),
          name: SITE_NAME,
          url: `${getSiteUrl()}/`,
          logo: {
            '@type': 'ImageObject',
            url: getAbsoluteUrl(ORGANIZATION.logo.path),
          },
        },
        isPartOf: { '@id': getSchemaId('website') },
      }}
    />
  );
}
