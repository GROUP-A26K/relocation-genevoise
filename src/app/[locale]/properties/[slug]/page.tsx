import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { SITE_NAME } from '@/constants/seo';
import { getLocalizedPath } from '@/utils/seo';
import Section from '@/components/customs/Section';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { ImagePreview } from '@/components/sections/PropertiesDetails/ImagePreview';
import {
  fetchProperties,
  getPropertyDetail,
} from '@/services/property.service';
import { PropertyDetailView } from '@/components/sections/PropertiesDetails/PropertyDetailsView';
import { PropertyDetailSimilar } from '@/components/sections/PropertiesDetails/PropertyDetailSimilar';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function PropertyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const property = await getPropertyDetail(slug, locale);

  if (!property) {
    notFound();
  }

  const listRelatedProperty = await fetchProperties({
    page: 1,
    pageSize: 3,
    category: property.category?.categoryName
      ? [property.category.categoryName]
      : [],
    locale: locale,
  });

  const tBreadcrumb = await getTranslations('Breadcrumb');

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_NAME, path: getLocalizedPath(locale, 'home') },
          {
            name: tBreadcrumb('properties'),
            path: getLocalizedPath(locale, 'properties'),
          },
          {
            name: property.title,
            path: getLocalizedPath(locale, 'properties', slug),
          },
        ]}
      />

      <section className="flex w-full flex-col items-center justify-center">
        <Section isDivider revealTrigger="load" className="w-full">
          <ImagePreview property={property} propertySlug={slug} />

          <PropertyDetailView property={property} />
        </Section>
        <PropertyDetailSimilar
          relatedProperties={listRelatedProperty.properties}
        />
      </section>
    </>
  );
}
