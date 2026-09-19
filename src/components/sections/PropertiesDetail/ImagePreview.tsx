'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Image as ImageIcon } from 'lucide-react';

import Button from '@/components/common/Button';
import { useRouter } from '@/libs/i18nNavigation';
import { Skeleton } from '@/components/ui/skeleton';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';

import type { IPropertyDetail } from '@/models/property';

type TImageObj = {
  url: string;
  lqip?: string;
  title: string;
  thumbnailTitle: string;
};
interface IImagePreviewProps {
  property: IPropertyDetail;
  propertySlug: string;
}

export const ImagePreview = ({
  property,
  propertySlug,
}: IImagePreviewProps) => {
  const t = useTranslations('PropertiesDetails');
  const imageT = useTranslations('Images');
  const router = useRouter();

  const images: TImageObj[] = property.areas.map((area, index) => ({
    url: area.mainImageUrl,
    lqip: area.mainImageLqip,
    title: imageT('property.photo', {
      property: property.title || imageT('property.listing'),
      area: area.title || imageT('common.photo'),
      index: String(index + 1),
    }),
    thumbnailTitle: imageT('property.thumbnail', {
      property: property.title || imageT('property.listing'),
      area: area.title || imageT('common.photo'),
      index: String(index + 1),
    }),
  }));

  const galleryImages: TImageObj[] = property.areas
    .map(
      (area) =>
        area.galleryImages?.map((img, index) => ({
          url: img.url,
          lqip: img.lqip,
          title: imageT('property.photo', {
            property: property.title || imageT('property.listing'),
            area: area.title || imageT('common.photo'),
            index: String(index + 2),
          }),
          thumbnailTitle: imageT('property.thumbnail', {
            property: property.title || imageT('property.listing'),
            area: area.title || imageT('common.photo'),
            index: String(index + 2),
          }),
        })) || []
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
    router.push({
      pathname: '/properties/[slug]/photo-tour',
      params: { slug: propertySlug },
    });
  };

  return (
    <RevealItem className="relative grid w-full grid-cols-1 gap-2 overflow-hidden lg:grid-cols-2 lg:rounded-3xl">
      <div className="relative h-0 w-full pb-[68%] lg:pb-[68%]">
        {!loadedImages.has(mainImageObj?.url || '') && (
          <Skeleton className="absolute inset-0 rounded-2xl lg:rounded-none" />
        )}
        <Image
          src={mainImageObj?.url}
          placeholder={mainImageObj?.lqip ? 'blur' : 'empty'}
          blurDataURL={mainImageObj?.lqip}
          alt={mainImageObj?.title || imageT('property.listing')}
          title={mainImageObj?.title || imageT('property.listing')}
          fill
          sizes="(min-width: 1440px) 616px, (min-width: 1024px) 50vw, 100vw"
          className="transition-brightness rounded-2xl object-cover duration-300 hover:cursor-pointer hover:brightness-70 lg:rounded-none"
          onClick={handleNavigateToPhotoTour}
          onLoad={() => handleImageLoad(mainImageObj?.url || '')}
        />
      </div>
      <div className="grid grid-cols-4 gap-2 lg:grid-cols-2 lg:grid-rows-2">
        {gridImages.map((img, i) => (
          <div key={i} className="relative h-0 w-full pb-[68%]">
            {!loadedImages.has(img.url) && (
              <Skeleton className="absolute inset-0 rounded-lg lg:rounded-none" />
            )}
            <Image
              src={img.url}
              placeholder={img.lqip ? 'blur' : 'empty'}
              blurDataURL={img.lqip}
              alt={img.thumbnailTitle}
              title={img.thumbnailTitle}
              fill
              sizes="(min-width: 1440px) 304px, 25vw"
              className="transition-brightness rounded-lg object-cover duration-300 hover:cursor-pointer hover:brightness-70 lg:rounded-none"
              onClick={handleNavigateToPhotoTour}
              onLoad={() => handleImageLoad(img.url)}
            />
            {i === 3 && remainingCount > 0 && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#000000]/50 lg:hidden">
                <BodyText
                  variant="md"
                  asChild
                  className="font-semibold text-white"
                  onClick={handleNavigateToPhotoTour}
                >
                  <span>+{remainingCount}</span>
                </BodyText>
              </div>
            )}
          </div>
        ))}
      </div>
      <Button
        as="solid"
        variant="md"
        type="primary"
        className="absolute right-4 bottom-4 z-10 hidden items-center gap-2 lg:flex"
        iconStart={ImageIcon}
        onClick={handleNavigateToPhotoTour}
      >
        {t('imagePreview.viewAllButton')}
      </Button>
    </RevealItem>
  );
};
