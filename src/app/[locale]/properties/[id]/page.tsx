import { notFound } from "next/navigation";
import { ImagePreview } from "@/components/sections/PropertiesDetails/ImagePreview";
import { PropertyDetailSimilar } from "@/components/sections/PropertiesDetails/PropertyDetailSimilar";
import { PropertyDetailView } from "@/components/sections/PropertiesDetails/PropertyDetailsView";
import {
  fetchProperties,
  getPropertyDetail,
} from "@/services/property.service";
import Section from "@/components/customs/Section";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export const dynamic = "force-dynamic";

export default async function PropertyDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const property = await getPropertyDetail(id, locale);

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
    <section className="w-full flex flex-col justify-center items-center">
      <Section isDivider className="w-full">
        <ImagePreview property={property} propertySlug={id} />

        <PropertyDetailView property={property} />
      </Section>
      <PropertyDetailSimilar
        relatedProperties={listRelatedProperty.properties}
      />
    </section>
  );
}
