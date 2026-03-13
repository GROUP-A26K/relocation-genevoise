import Section from "@/components/customs/Section";
import { ImagePreview } from "@/components/sections/PropertiesDetails/ImagePreview";
import { PropertyDetailView } from "@/components/sections/PropertiesDetails/PropertyDetailsView";
import { getPropertyDetail } from "@/services/properties.service";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function PropertyDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const property = await getPropertyDetail(id, locale);

  return (
    <>
      <Section isDivider={false}>
        <ImagePreview images={property.gallery} propertyId={id}/>
      </Section>
      <PropertyDetailView property={property}/>
    </>
  );
}