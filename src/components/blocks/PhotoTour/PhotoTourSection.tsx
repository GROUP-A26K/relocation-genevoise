"use client"

import Image from "next/image"
import { useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0",
  "https://images.unsplash.com/photo-1560184897-ae75f418493e",
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
  "https://images.unsplash.com/photo-1560448075-bb485b067938",
]

export const PhotoTourSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const prevImage = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [])

  const nextImage = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [])

  const selectImage = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-16 w-full">
      <div className="lg:flex-1 flex flex-col py-6 gap-6">
        <h2 className="font-semibold text-3xl text-black-500 leading-[130%]">
          Bedroom
        </h2>

        <p className="text-sm text-black-200 leading-[130%]">
          This cozy bedroom features a comfortable double bed, perfect for a restful night's sleep.
          The warm lamp accents add a touch of softness, while the wooden closet provides ample
          storage for your belongings.
        </p>
      </div>
      <div className="lg:flex-[2] flex flex-col gap-4 min-w-0">
        <div className="relative aspect-[784/480] w-full rounded-3xl overflow-hidden">

          <Image
            src={images[activeIndex]}
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
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative flex-shrink-0 w-[120px] sm:w-[140px] lg:w-[168px] aspect-[168/120] rounded-xl overflow-hidden transition
              ${activeIndex === index ? "ring-2 ring-black" : "ring-1 ring-transparent"}`}
            >
              <Image
                src={img}
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
  )
}