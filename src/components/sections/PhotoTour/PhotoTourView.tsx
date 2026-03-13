"use client";
import { PhotoTourSection } from "@/components/blocks/PhotoTour/PhotoTourSection";
import { IRoomPhotoTour } from "@/models/Property";

interface PhotoTourViewProps {
  rooms: IRoomPhotoTour[];
}

export const mockImages = [
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0",
  "https://images.unsplash.com/photo-1560184897-ae75f418493e",
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
  "https://images.unsplash.com/photo-1560448075-bb485b067938",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
  "https://images.unsplash.com/photo-1560448075-bb485b067938",
];

export const MOCK_ROOM_DATA: IRoomPhotoTour[] = [
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

export const PhotoTourView = ({ rooms }: PhotoTourViewProps) => {
  return (
    <div className="flex flex-col gap-16">
      {MOCK_ROOM_DATA.map((room) => (
        <PhotoTourSection key={room.id} room={room} />
      ))}
    </div>
  );
};
