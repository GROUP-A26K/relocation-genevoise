import Section from '@/components/customs/Section';
import { getPropertyPhotoTour } from '@/services/property.service';
import { PhotoTourView } from '@/components/sections/PhotoTour/PhotoTourView';
import { PropertySectionHeader } from '@/components/blocks/PropertyDetail/SectionHeader';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function GalleryPage({ params }: Props) {
  const { locale, slug } = await params;
  const areas = await getPropertyPhotoTour(slug, locale);

  return (
    <Section isDivider>
      <PropertySectionHeader areas={areas} slug={slug} />
      <PhotoTourView areas={areas} />
    </Section>
  );
}
