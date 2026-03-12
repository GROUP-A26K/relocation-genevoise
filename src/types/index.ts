export interface IIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export type Property = {
  id: string;
  title: string;
  type: string;
  status: string;
  price: number;
  location: {
    street: string;
    city: string;
    country: string;
    full: string;
    lat: number;
    lng: number;
  };
  gallery: {
    id: string;
    url: string;
    isPrimary?: boolean;
  }[];
  facilities: {
    type: string;
    value: string | number | boolean;
    unit?: string;
  }[];
  description: string;
  surroundings: {
    type: string;
    distance: number;
    unit: string;
  }[];
  agent: {
    id: string;
    name: string;
    phone: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type ImageObj = {
  id: string;
  url: string;
  isPrimary?: boolean;
};

export type GalleryMap = {
  [key: string]: {
    images: ImageObj[];
    description: string;
  };
};