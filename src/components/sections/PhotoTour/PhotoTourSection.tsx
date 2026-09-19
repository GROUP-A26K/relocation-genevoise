'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/libs/utils';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';

import type { IAreaPhotoTour } from '@/models/property';

type TImageObj = {
  url: string;
  lqip?: string;
  title: string;
  thumbnailTitle: string;
};

interface IPhotoTourSectionProps {
  area: IAreaPhotoTour;
  index: number;
  propertyTitle?: string;
}

export const PhotoTourSection = ({
  area,
  index,
  propertyTitle,
}: IPhotoTourSectionProps) => {
  const imageT = useTranslations('Images');
  const resolvedPropertyTitle = propertyTitle || imageT('property.listing');
  const resolvedAreaTitle = area.title || imageT('common.photo');
  const allImages: TImageObj[] = useMemo(
    () => [
      {
        url: area.mainImageUrl,
        lqip: area.mainImageLqip,
        title: imageT('property.photo', {
          property: resolvedPropertyTitle,
          area: resolvedAreaTitle,
          index: '1',
        }),
        thumbnailTitle: imageT('property.thumbnail', {
          property: resolvedPropertyTitle,
          area: resolvedAreaTitle,
          index: '1',
        }),
      },
      ...(area.galleryImages ?? []).map((image, imageIndex) => ({
        ...image,
        title: imageT('property.photo', {
          property: resolvedPropertyTitle,
          area: resolvedAreaTitle,
          index: String(imageIndex + 2),
        }),
        thumbnailTitle: imageT('property.thumbnail', {
          property: resolvedPropertyTitle,
          area: resolvedAreaTitle,
          index: String(imageIndex + 2),
        }),
      })),
    ],
    [
      area.mainImageUrl,
      area.mainImageLqip,
      area.galleryImages,
      imageT,
      resolvedAreaTitle,
      resolvedPropertyTitle,
    ]
  );
  const hasMultipleImages = allImages.length > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbContainerRef = useRef<HTMLDivElement | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const el = thumbRefs.current[activeIndex];
    const container = thumbContainerRef.current;
    if (!el || !container) return;
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const scrollLeft =
      container.scrollLeft +
      (elRect.left - containerRect.left) -
      (container.offsetWidth / 2 - el.offsetWidth / 2);
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, [activeIndex]);

  const prevImage = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const nextImage = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const selectImage = useCallback(
    (idx: number) => emblaApi?.scrollTo(idx),
    [emblaApi]
  );

  return (
    <RevealItem
      className="flex w-full scroll-mt-26 flex-col gap-8 lg:flex-row lg:gap-16"
      id={`area-${index}`}
    >
      <div className="flex flex-col gap-3 lg:flex-1 lg:gap-6 lg:py-6">
        <HeadingText as="h2" className="text-3xl font-semibold">
          {area.title}
        </HeadingText>
        <BodyText variant="sm" className="font-[number:inherit]">
          {area.description}
        </BodyText>
      </div>

      <div className="flex min-w-0 flex-col gap-4 lg:flex-2">
        <div className="relative aspect-784/480 w-full overflow-hidden rounded-3xl">
          <div ref={emblaRef} className="h-full">
            <div className="flex h-full">
              {allImages.map((img, i) => (
                <div key={i} className="relative h-full w-full shrink-0">
                  <Image
                    src={img.url}
                    placeholder={img.lqip ? 'blur' : 'empty'}
                    blurDataURL={img.lqip}
                    alt={img.title}
                    title={img.title}
                    fill
                    className="cursor-pointer object-cover"
                    sizes="(max-width: 784px) 100vw, 784px"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-[25px] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black-500/40 text-white transition hover:bg-black/60"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-[25px] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black-500/40 text-white transition hover:bg-black/60"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {hasMultipleImages && (
          <div
            ref={thumbContainerRef}
            className="scrollbar-hide flex gap-4 overflow-x-auto"
          >
            {allImages.map((img, i) => (
              <button
                key={i}
                data-selected={activeIndex === i}
                ref={(node) => {
                  thumbRefs.current[i] = node;
                }}
                onClick={() => selectImage(i)}
                className={cn(
                  'relative aspect-168/120 w-[120px] shrink-0 overflow-hidden rounded-xl sm:w-[140px] lg:w-[168px]',
                  'before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-xl before:border-2 before:border-transparent before:content-[""]',
                  'data-[selected=true]:before:border-blue-400'
                )}
              >
                <Image
                  src={img.url}
                  placeholder={img.lqip ? 'blur' : 'empty'}
                  blurDataURL={img.lqip}
                  alt={img.thumbnailTitle}
                  title={img.thumbnailTitle}
                  fill
                  sizes="(max-width:640px) 120px, (max-width:1024px) 140px, 168px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </RevealItem>
  );
};
