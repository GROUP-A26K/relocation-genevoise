import { notFound } from 'next/navigation';
import { HydrationBoundary } from '@tanstack/react-query';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { SITE_NAME } from '@/constants/seo';
import { getLocalizedPath, toHref } from '@/utils/seo';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { hydratePropertyDetail } from '@/features/property/property.hydration';
import { PropertyDetailClient } from '@/components/sections/PropertiesDetail/PropertyDetailClient';

export default async function PropertyDetailPage({
  params,
}: PageProps<'/[locale]/properties/[slug]'>) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { state, property, relatedProperties } = await hydratePropertyDetail(
    slug,
    locale
  );

  if (!property) {
    notFound();
  }

  const tBreadcrumb = await getTranslations('Breadcrumb');

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_NAME, path: getLocalizedPath(locale, '/') },
          {
            name: tBreadcrumb('properties'),
            path: getLocalizedPath(locale, '/properties'),
          },
          {
            name: property.title,
            path: getLocalizedPath(locale, toHref('/properties/[slug]', slug)),
          },
        ]}
      />

      <HydrationBoundary state={state}>
        <PropertyDetailClient
          property={property}
          relatedProperties={relatedProperties.properties}
          slug={slug}
          locale={locale}
        />
      </HydrationBoundary>
    </>
  );
}
