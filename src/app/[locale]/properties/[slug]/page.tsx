import { notFound } from 'next/navigation';

import Section from '@/components/customs/Section';
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

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <Section isDivider className="w-full">
        <ImagePreview property={property} propertySlug={slug} />

        <PropertyDetailView property={property} />
      </Section>
      <PropertyDetailSimilar
        relatedProperties={listRelatedProperty.properties}
      />
    </section>
  );
}
