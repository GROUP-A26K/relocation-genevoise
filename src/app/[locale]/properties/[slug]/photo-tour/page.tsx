import { HydrationBoundary } from '@tanstack/react-query';

import Section from '@/components/common/Section';
import { PhotoTourClient } from '@/components/sections/PhotoTour/PhotoTourClient';
import { hydratePropertyPhotoTour } from '@/features/property/property.hydration';
import { PropertySectionHeader } from '@/components/sections/PropertiesDetail/Block/PropertySectionHeader';

export default async function PhotoTourPage({
  params,
}: PageProps<'/[locale]/properties/[slug]/photo-tour'>) {
  const { locale, slug } = await params;
  const { state, areas, propertyTitle } = await hydratePropertyPhotoTour(
    slug,
    locale
  );

  return (
    <Section isDivider revealTrigger="load">
      <PropertySectionHeader
        areas={areas}
        slug={slug}
        propertyTitle={propertyTitle}
      />
      <HydrationBoundary state={state}>
        <PhotoTourClient
          areas={areas}
          slug={slug}
          locale={locale}
          propertyTitle={propertyTitle}
        />
      </HydrationBoundary>
    </Section>
  );
}
