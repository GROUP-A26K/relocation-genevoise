
import { ImagePreview } from "@/components/sections/PropertiesDetails/ImagePreview";
import { PropertyDetailSimilar } from "@/components/sections/PropertiesDetails/PropertyDetailSimilar";
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
      <section className="flex flex-col items-center py-12 lg:py-16 2xl:px-[100px] xl:px-[60px] lg:px-[48px] px-4 gap-12 lg:gap-16">
        <ImagePreview property={property!} propertySlug={id} />

        <PropertyDetailView property={property!} />
      </section>
      <PropertyDetailSimilar
        category={property?.category?.categoryName ?? ""}
      />
    </>
  );
}
