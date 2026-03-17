"use client";

import Image from "next/image";
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbContainerRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
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


  const prevImage = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);

  const nextImage = useCallback(() => {
    setActiveIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  const selectImage = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

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
          <Image
            src={allImages[activeIndex].url}
            alt={`${area.title} - ${activeIndex + 1}`}
            title={`${area.title} - ${activeIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 784px) 100vw, 784px"
            priority
          />
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
          <div ref={thumbContainerRef} className="flex gap-4 overflow-x-auto scrollbar-hide">
            {allImages.map((img, index) => (
              <button
                key={index}
                data-selected={activeIndex === index}
                ref={(node) => {
                  thumbRefs.current[index] = node;
                }}
                onClick={() => selectImage(index)}
                className={cn(
                  "relative flex-shrink-0 w-[120px] sm:w-[140px] lg:w-[168px] aspect-[168/120] rounded-xl overflow-hidden",
                  'before:content-[""] before:absolute before:inset-0 before:z-10 before:rounded-xl before:border-2 before:border-transparent before:pointer-events-none',
                  "data-[selected=true]:before:border-blue-400",
                )}
              >
                <Image
                  src={img.url}
                  alt={`${area.title} thumbnail ${index + 1}`}
                  title={`${area.title} thumbnail ${index + 1}`}
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
