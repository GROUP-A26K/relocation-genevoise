import Section from "@/components/customs/Section";
import { PropertySectionHeader } from "@/components/blocks/PropertyDetail/SectionHeader";
import { PhotoTourView } from "@/components/sections/PhotoTour/PhotoTourView";
import { getPropertyPhotoTour } from "@/services/properties.service";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function GalleryPage({ params }: Props) {
  const { locale, id } = await params;
  const property = await getPropertyPhotoTour(id, locale);

  return (
    <Section isDivider={true}>
      <PropertySectionHeader areas={property?.areas || []}/>
      <PhotoTourView areas={property?.areas || []} />
    </Section>
  );
}
