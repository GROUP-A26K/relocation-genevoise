"use client";

import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IRoomPhotoTour } from "@/models/Property";

interface IPhotoTourSectionProps {
  room: IRoomPhotoTour;
}

export const PhotoTourSection = ({ room }: IPhotoTourSectionProps) => {
  const roomData = room;
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = thumbRefs.current[activeIndex];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  const prevImage = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0 ? roomData.images.length - 1 : prev - 1,
    );
  }, [roomData.images.length]);

  const nextImage = useCallback(() => {
    setActiveIndex((prev) =>
      prev === roomData.images.length - 1 ? 0 : prev + 1,
    );
  }, [roomData.images.length]);

  const selectImage = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div
      className="flex flex-col gap-8 lg:flex-row lg:gap-16 w-full"
      id={room.id}
    >
      <div className="flex flex-col gap-3 lg:py-6 lg:flex-1 lg:gap-6">
        <h2 className="font-semibold text-3xl text-black-500 leading-[130%]">
          {roomData.name}
        </h2>

        <p className="text-sm text-black-200 leading-[130%]">
          {roomData.description}
        </p>
      </div>
      <div className="lg:flex-[2] flex flex-col gap-4 min-w-0">
        <div className="relative aspect-[784/480] w-full rounded-3xl overflow-hidden">
          <Image
            src={roomData.images[activeIndex].url}
            alt="Bedroom"
            fill
            className="object-cover"
            sizes="(max-width: 784px) 100vw, 784px"
            priority
          />
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
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {roomData.images.map((img, index) => (
            <button
              key={index}
              ref={(node) => {
                thumbRefs.current[index] = node;
              }}
              onClick={() => selectImage(index)}
              className={`relative flex-shrink-0 w-[120px] sm:w-[140px] lg:w-[168px] aspect-[168/120] rounded-xl overflow-hidden transition
              ${activeIndex === index ? "ring-2 ring-black" : "ring-1 ring-transparent"}`}
            >
              <Image
                src={img.url}
                alt={`Thumbnail ${index}`}
                fill
                sizes="(max-width:640px) 120px, (max-width:1024px) 140px, 168px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
