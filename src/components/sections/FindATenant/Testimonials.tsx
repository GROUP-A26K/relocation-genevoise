"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

import { cn } from "@/libs/utils";
import Section from "@/components/customs/Section";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export type TTestimonial = {
  quote: string;
  name: string;
  role: string;
  avatar?: string | StaticImageData;
};

interface ITestimonialsProps {
  eyebrow: string;
  heading: string;
  description: string;
  items: TTestimonial[];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function Testimonials({
  eyebrow,
  heading,
  description,
  items,
}: ITestimonialsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    const onReInit = () => {
      setSnaps(api.scrollSnapList());
      onSelect();
    };

    onReInit();
    api.on("select", onSelect);
    api.on("reInit", onReInit);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    let intervalId: ReturnType<typeof setInterval>;

    const start = () => {
      stop();

      intervalId = setInterval(() => {
        if (api.canScrollNext()) {
          api.scrollNext();
        } else {
          api.scrollTo(0);
        }
      }, 5000);
    };

    const stop = () => clearInterval(intervalId);

    start();

    api.on("pointerDown", stop);
    api.on("select", start);

    return () => {
      stop();
      api.off("pointerDown", stop);
      api.off("select", start);
    };
  }, [api]);

  if (!items?.length) {
    return null;
  }

  return (
    <Section className="bg-white">
      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-3 text-center">
        <p className="text-sm font-semibold !leading-[130%] text-yellow-600">
          {eyebrow}
        </p>

        <div className="flex flex-col gap-4">
          <h2 className="text-pretty text-[32px] font-bold !leading-[130%] text-black-500 lg:text-[40px]">
            {heading}
          </h2>
          <p className="text-base font-normal !leading-[150%] text-black-300">
            {description}
          </p>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ align: "start", containScroll: "trimSnaps" }}
        className="w-full"
      >
        <CarouselContent className="-ml-8">
          {items.map((item) => (
            <CarouselItem
              key={item.name}
              className="basis-full pl-8 lg:basis-1/3"
            >
              <article className="flex h-full flex-col justify-between gap-8 rounded-2xl bg-grey-50 p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="size-5 fill-[#FDB022] text-[#FDB022]"
                      />
                    ))}
                  </div>
                  <p className="text-base font-normal !leading-[150%] text-black-300">
                    {item.quote}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {item.avatar ? (
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      title={item.name}
                      width={48}
                      height={48}
                      className="size-12 shrink-0 rounded-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-grey-200 text-sm font-semibold text-black-300">
                      {getInitials(item.name)}
                    </div>
                  )}
                  <div className="flex flex-col gap-0.5">
                    <p className="text-base font-semibold !leading-[130%] text-black-500">
                      {item.name}
                    </p>
                    <p className="text-sm font-normal !leading-[150%] text-black-200">
                      {item.role}
                    </p>
                  </div>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          aria-label="Previous testimonials"
          className="flex size-10 items-center justify-center rounded-full border border-black-500 bg-white text-black-500 transition-colors hover:bg-grey-50"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex items-center gap-4">
          {snaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === selectedIndex}
              className={cn(
                "size-2.5 rounded-full transition-colors",
                index === selectedIndex ? "bg-black-500" : "bg-grey-200",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => api?.scrollNext()}
          aria-label="Next testimonials"
          className="flex size-10 items-center justify-center rounded-full border border-black-500 bg-white text-black-500 transition-colors hover:bg-grey-50"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </Section>
  );
}
