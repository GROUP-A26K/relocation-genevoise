export type PropertyPriceUnit = "$" | "CHF" | "EUR";

export type PropertyRentPeriod = "month" | "year";

export interface PropertyListing {
  id: string;
  title: string;
  slug: string;
  href: string;
  price: number;
  priceUnit: PropertyPriceUnit;
  rentPeriod: PropertyRentPeriod;
  location: {
    name: string;
    lat?: number;
    lng?: number;
  };
  category: string;
  facilities: PropertyFacility[];
  description: string;
  imageUrl: string;
  availability: boolean;
}

export interface PropertyFacility {
  icon: string;
  name: string;
  valueType: "number" | "text" | "none";
  numberValue?: number;
  textValue?: string;
}

export interface PropertyCategory {
  id: string;
  categoryName: string;
}
