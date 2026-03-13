export interface PropertyDetail {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  language: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  listingType: string;
  price: number;
  priceUnit: string;
  rentPeriod: string;
  description: string;
  availability: boolean;
  mapLocation: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  facilities: PropertyFacility[];
  agent: PropertyAgent;
  category: PropertyCategory;
  areas: PropertyArea[];
  surroundingPlaces: SurroundingPlace[];
}

export interface PropertyFacility {
  icon: string;
  name: string;
  valueType: string;
  numberValue: number;
  textValue: string;
}

export interface PropertyAgent {
  _id: string;
  agentName: string;
  agentPhone: string;
  photoUrl: string;
}

export interface PropertyCategory {
  _id: string;
  categoryName: string;
}

export interface PropertyArea {
  title: string;
  mainImageUrl: string;
  galleryImages: { url: string }[] | null;
}

export interface SurroundingPlace {
  icon: string;
  name: string;
  distance: string;
}

export interface IPropertyAreaPhotoTour {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  slug: {
    _type: "string";
    current: string;
  };
  areas: IAreaPhotoTour[];
}

export interface IAreaPhotoTour {
  title: string;
  description: string;
  mainImageUrl: string;
  galleryImages: { url: string }[] | null;
}
