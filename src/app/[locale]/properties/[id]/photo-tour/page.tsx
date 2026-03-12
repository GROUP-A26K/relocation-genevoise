import Section from "@/components/customs/Section";
import { PropertySectionHeader } from "@/components/blocks/PropertyDetail/SectionHeader"; 
import { useTranslations } from "next-intl";
import { PhotoTourView } from "@/components/sections/PhotoTour/PhotoTourView";
import { GalleryMap } from "@/types";

interface Props {
  gallery: GalleryMap;
}

export default function GalleryPage({ images }: Props) {
  return (
    <Section isDivider={true}>
      <PropertySectionHeader heading="Photo Tour" subheading="Photo"/>
      <PhotoTourView />
    </Section>
  );
}