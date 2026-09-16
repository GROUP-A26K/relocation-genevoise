'use client';

import Section from '@/components/common/Section';
import {
  usePropertyDetail,
  usePropertyList,
} from '@/features/property/property.hooks';

import { ImagePreview } from './ImagePreview';
import { PropertyDetailView } from './PropertyDetailView';
import { PropertyDetailSimilar } from './PropertyDetailSimilar';

import type { IPropertyListing, IPropertyDetail } from '@/models/property';

interface IPropertyDetailClientProps {
  slug: string;
  locale: string;
  property: IPropertyDetail;
  relatedProperties: IPropertyListing[];
}

export function PropertyDetailClient({
  slug,
  locale,
  property: initialProperty,
  relatedProperties: initialRelated,
}: IPropertyDetailClientProps) {
  const detailQuery = usePropertyDetail(slug, locale);
  const property = detailQuery.data ?? initialProperty;
  const relatedQuery = usePropertyList({
    page: 1,
    pageSize: 3,
    locale,
    category: property.category?.categoryName
      ? [property.category.categoryName]
      : [],
  });
  const relatedProperties = relatedQuery.data?.properties ?? initialRelated;

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <Section isDivider revealTrigger="load" className="w-full">
        <ImagePreview property={property} propertySlug={slug} />
        <PropertyDetailView property={property} />
      </Section>
      <PropertyDetailSimilar relatedProperties={relatedProperties} />
    </section>
  );
}
