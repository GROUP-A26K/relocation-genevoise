import Section from "@/components/customs/Section";
import { ImagePreview } from "@/components/sections/PropertiesDetails/ImagePreview";
import { PropertyDetailView } from "@/components/sections/PropertiesDetails/PropertyDetailsView";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function PropertyDetailPage({ params }: Props) {
  const { locale, id } = await params;

  const images = [
    "https://placehold.co/1808x765.png",
    "https://placehold.co/1808x765.png",
    "https://placehold.co/1808x765.png",
    "https://placehold.co/1808x765.png",
    "https://placehold.co/1808x765.png",
    "https://placehold.co/1808x765.png",
    "https://placehold.co/1808x765.png",
    "https://placehold.co/1808x765.png",
  ]

  return (
    <>
      <Section isDivider={false}>
        <ImagePreview images={images}/>
      </Section>
      <PropertyDetailView/>
    </>
  );
}