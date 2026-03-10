'use client';
import Image from 'next/image'
import { Image as ImageIcon } from 'lucide-react';
import Button from '@/components/customs/Button';
import { useTranslations } from "next-intl";

interface IimagePreviewProps {
  images: string[]
}

export const ImagePreview = ({ images }: IimagePreviewProps) => {
  const t = useTranslations("PropertiesDetails");
  const [mainImage, ...restImages] = images;
  const gridImages = restImages.slice(0, 4);
  const remainingCount = images.length - 5;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:rounded-3xl overflow-hidden relative">
      <div className="relative aspect-[1/0.68] w-full h-full">
        <Image
          src={mainImage}
          alt="Preview image 0"
          fill
          sizes="100vw"
          className="object-cover rounded-2xl lg:rounded-none"
        />
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-2 grid-rows-1 lg:grid-rows-2 gap-2">
        {gridImages.map((img, i) => (
          <div key={i} className="relative aspect-[1/0.68] w-full h-full">
            <Image
              src={img}
              alt={`Preview image ${i + 1}`}
              fill
              sizes="25vw, 25vw"
              className="object-cover rounded-lg lg:rounded-none"
            />
            {i === 3 && remainingCount > 0 && (
              <div className="absolute inset-0 bg-[#000000]/50 rounded-lg lg:hidden flex items-center justify-center">
                <span className="text-white font-semibold text-base leading-[130%]">
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
      >
        {t("imagePreview.viewAllButton")}
      </Button>
    </div>
  )
}