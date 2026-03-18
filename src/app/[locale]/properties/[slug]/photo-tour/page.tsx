import Section from "@/components/customs/Section";
import { PropertySectionHeader } from "@/components/blocks/PropertyDetail/SectionHeader";
import { PhotoTourView } from "@/components/sections/PhotoTour/PhotoTourView";
import { getPropertyPhotoTour } from "@/services/property.service";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function GalleryPage({ params }: Props) {
  const { locale, slug } = await params;
  const areas = await getPropertyPhotoTour(slug, locale);

  return (
    <Section isDivider>
      <PropertySectionHeader areas={areas}/>
      <PhotoTourView areas={areas} />
    </Section>
  );
}
