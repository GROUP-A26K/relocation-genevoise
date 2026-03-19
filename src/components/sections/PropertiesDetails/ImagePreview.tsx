"use client";
import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import Button from "@/components/customs/Button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { PropertyDetail } from "@/models/Property";

type ImageObj = {
  url: string;
  title: string;
};
interface IImagePreviewProps {
  property: PropertyDetail;
  propertySlug: string;
}

export const ImagePreview = ({
  property,
  propertySlug,
}: IImagePreviewProps) => {
  const t = useTranslations("PropertiesDetails");
  const router = useRouter();
  const locale = useLocale();

  const images: ImageObj[] = property.areas.map((area) => ({
    url: area.mainImageUrl,
    title: `${property.title} - ${area.title}`,
  }));

  const galleryImages: ImageObj[] = property.areas
    .map(
      (area) =>
        area.galleryImages?.map((img, index) => ({
          url: img.url,
          title: `${property.title} - ${area.title} ${index + 1}`,
        })) || [],
    )
    .flat();

  const allImages = images.concat(galleryImages);

  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const mainImageObj = allImages[0];
  const gridImages = allImages.slice(1, 5);
  const remainingCount = allImages.length - 5;

  const handleImageLoad = (imageId: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageId));
  };

  const handleNavigateToPhotoTour = () => {
    router.push(`/${locale}/properties/${propertySlug}/photo-tour`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:rounded-3xl overflow-hidden relative w-full">
      <div className="relative aspect-[1/0.68] w-full h-full">
        {!loadedImages.has(mainImageObj?.url || "") && (
          <Skeleton className="absolute inset-0 rounded-2xl lg:rounded-none" />
        )}
        <Image
          src={mainImageObj?.url}
          alt={mainImageObj?.title || property.title}
          title={mainImageObj?.title || property.title}
          fill
          sizes="100vw"
          className="object-cover rounded-2xl lg:rounded-none hover:brightness-[70%] transition-brightness duration-300 hover:cursor-pointer"
          onClick={handleNavigateToPhotoTour}
          onLoad={() => handleImageLoad(mainImageObj?.url || "")}
        />
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-2 grid-rows-1 lg:grid-rows-2 gap-2">
        {gridImages.map((img, i) => (
          <div key={i} className="relative aspect-[1/0.68] w-full h-full">
            {!loadedImages.has(img.url) && (
              <Skeleton className="absolute inset-0 rounded-lg lg:rounded-none" />
            )}
            <Image
              src={img.url}
              alt={img.title}
              title={img.title}
              fill
              sizes="25vw, 25vw"
              className="object-cover rounded-lg lg:rounded-none hover:brightness-[70%] transition-brightness duration-300 hover:cursor-pointer"
              onClick={handleNavigateToPhotoTour}
              onLoad={() => handleImageLoad(img.url)}
            />
            {i === 3 && remainingCount > 0 && (
              <div className="absolute inset-0 bg-[#000000]/50 rounded-lg lg:hidden flex items-center justify-center">
                <span className="text-white font-semibold text-base leading-[130%]" onClick={handleNavigateToPhotoTour}>
                  +{remainingCount}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <Button
        as="solid"
        variant="md"
        type="primary"
        className="absolute bottom-4 right-4 hidden lg:flex items-center gap-2 z-10"
        iconStart={ImageIcon}
        onClick={handleNavigateToPhotoTour}
      >
        {t("imagePreview.viewAllButton")}
      </Button>
    </div>
  );
};
