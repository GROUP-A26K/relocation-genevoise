

export interface IRoomPhotoTour {
  id: string;
  name: string;
  description: string;
  images: {
    url: string;
    alt: string;
  }[];
}

export interface IPropertyPhotoTour {
    id: string;
    name: string;
    description: string;
    rooms: IRoomPhotoTour[];
  }