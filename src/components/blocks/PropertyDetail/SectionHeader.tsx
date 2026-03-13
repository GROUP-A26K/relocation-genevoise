import { IRoomPhotoTour } from "@/models/Property";
import { useTranslations } from "next-intl";
import Image from "next/image";

export interface PropertySectionHeaderProps {
  heading?: string;
  subheading?: string;
}

interface IPropertySectionHeaderProps {
  rooms: IRoomPhotoTour[];
}

export const mockImages = [
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0",
  "https://images.unsplash.com/photo-1560184897-ae75f418493e",
];

const MOCK_ROOM_DATA: IRoomPhotoTour[] = [
  {
    id: "1",
    name: "Bedroom",
    description:
      "This cozy bedroom features a comfortable double bed, perfect for a restful night's sleep. The warm lamp accents add a touch of softness, while the wooden closet provides ample storage for your belongings.",
    images: mockImages.map((image) => ({
      url: image,
      alt: "Bedroom",
    })),
  },
  {
    id: "2",
    name: "Living Room",
    description:
      "This cozy Living Room features a comfortable double bed, perfect for a restful night's sleep. The warm lamp accents add a touch of softness, while the wooden closet provides ample storage for your belongings.",
    images: mockImages.map((image) => ({
      url: image,
      alt: "Living Room",
    })),
  },
];

export function PropertySectionHeader({ rooms }: IPropertySectionHeaderProps) {
  const t = useTranslations("PhotoTour");
  const title = t("title");
  const subheading = t("subheading");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start gap-3">
        <h1 className="text-yellow-600 text-sm !leading[130%]">{title}</h1>
        <h2 className="font-semibold text-3xl !leading[130%] text-black-500">
          {subheading}
        </h2>
      </div>

      <div className="hidden lg:flex flex-wrap gap-6 w-full">
        {MOCK_ROOM_DATA.map((room, index) => (
          <a
            className="flex-shrink-0 flex flex-col gap-6"
            key={index}
            href={`#${room.id}`}
          >
            <div className="relative flex-shrink-0 aspect-[224.4/167] rounded-2xl w-[210px] xl:w-[224px] overflow-hidden">
              <Image
                src={room.images[0].url}
                fill
                alt={`Thumbnail ${index}`}
                sizes="(max-width:640px) 210px, (max-width:1280px) 210px, 224px"
              />
            </div>
            <h4 className="font-semibold text-black-500 !leading[130%] text-xl">
              {room.name}
            </h4>
          </a>
        ))}
      </div>
    </div>
  );
}
