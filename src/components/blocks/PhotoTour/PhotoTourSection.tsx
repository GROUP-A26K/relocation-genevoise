"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IAreaPhotoTour } from "@/models/Property";
import { cn } from "@/libs/utils";

interface IPhotoTourSectionProps {
  area: IAreaPhotoTour;
  index: number;
}

type ImageObj = {
  url: string;
};

export const PhotoTourSection = ({ area, index }: IPhotoTourSectionProps) => {
  const allImages: ImageObj[] = useMemo(
    () => [
      { url: area.mainImageUrl },
      ...(area.galleryImages?.map((img) => ({ url: img.url })) || []),
    ],
    [area.mainImageUrl, area.galleryImages],
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
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
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
    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [activeIndex]);

  const prevImage = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const nextImage = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const selectImage = useCallback(
    (idx: number) => emblaApi?.scrollTo(idx),
    [emblaApi],
  );

  return (
    <div
      className="flex flex-col gap-8 lg:flex-row lg:gap-16 w-full"
      id={`area-${index}`}
    >
      <div className="flex flex-col gap-3 lg:py-6 lg:flex-1 lg:gap-6">
        <h2 className="font-semibold text-3xl text-black-500 leading-[130%]">
          {area.title}
        </h2>
        <p className="text-sm text-black-200 leading-[130%]">
          {area.description}
        </p>
      </div>

      <div className="lg:flex-[2] flex flex-col gap-4 min-w-0">
        <div className="relative aspect-[784/480] w-full rounded-3xl overflow-hidden">
          <div ref={emblaRef} className="h-full">
            <div className="flex h-full">
              {allImages.map((img, i) => (
                <div key={i} className="relative flex-shrink-0 w-full h-full">
                  <Image
                    src={img.url}
                    alt={`${area.title} - ${i + 1}`}
                    title={`${area.title} - ${i + 1}`}
                    fill
                    className="object-cover cursor-pointer"
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
                className="absolute left-[25px] top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black-500/40 text-white hover:bg-black/60 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-[25px] top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black-500/40 text-white hover:bg-black/60 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {hasMultipleImages && (
          <div
            ref={thumbContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide"
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
                  "relative flex-shrink-0 w-[120px] sm:w-[140px] lg:w-[168px] aspect-[168/120] rounded-xl overflow-hidden",
                  'before:content-[""] before:absolute before:inset-0 before:z-10 before:rounded-xl before:border-2 before:border-transparent before:pointer-events-none',
                  "data-[selected=true]:before:border-blue-400",
                )}
              >
                <Image
                  src={img.url}
                  alt={`${area.title} thumbnail ${i + 1}`}
                  title={`${area.title} thumbnail ${i + 1}`}
                  fill
                  sizes="(max-width:640px) 120px, (max-width:1024px) 140px, 168px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
