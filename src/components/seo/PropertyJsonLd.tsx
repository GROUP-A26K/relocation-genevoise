import JsonLd from '@/components/seo/JsonLd';
import {
  getAbsoluteUrl,
  getLanguageTag,
  getSchemaId,
  toIsoDate,
} from '@/utils/seo';

import type { IPropertyDetail, IPropertyFacility } from '@/models/property';

const BUSINESS_FUNCTIONS: Record<IPropertyDetail['listingType'], string> = {
  rent: 'http://purl.org/goodrelations/v1#LeaseOut',
  sale: 'http://purl.org/goodrelations/v1#Sell',
};

const RENT_PERIOD_UNIT_CODES: Record<IPropertyDetail['rentPeriod'], string> = {
  month: 'MON',
  year: 'ANN',
};

const ACCOMMODATION_TYPES: Partial<Record<string, string>> = {
  apartment: 'Apartment',
  penthouse: 'Apartment',
  'terrace flat': 'Apartment',
  house: 'House',
};

const NON_RESIDENTIAL_CATEGORIES = ['office'];

interface IPropertyJsonLdProps {
  property: IPropertyDetail;
  locale: string;
  path: string;
}

const getFacilityNumber = (
  facilities: IPropertyFacility[],
  typeRoom: string
) => {
  const facility = facilities.find(
    (item) => item.typeRoom === typeRoom && item.valueType === 'number'
  );

  return facility?.numberValue && facility.numberValue > 0
    ? facility.numberValue
    : undefined;
};

const getPlace = (property: IPropertyDetail, url: string) => {
  const { facilities, mapLocation } = property;
  const { lat, lng } = mapLocation.coordinates;
  const category = property.category.categoryName.trim().toLowerCase();
  const place = {
    '@id': `${url}#place`,
    name: property.title,
    address: mapLocation.name || undefined,
    geo:
      lat !== 0 || lng !== 0
        ? { '@type': 'GeoCoordinates', latitude: lat, longitude: lng }
        : undefined,
  };

  if (NON_RESIDENTIAL_CATEGORIES.includes(category)) {
    return { '@type': 'Place', ...place };
  }

  const floorSize = getFacilityNumber(facilities, 'area');

  return {
    '@type': ACCOMMODATION_TYPES[category] ?? 'Accommodation',
    ...place,
    numberOfRooms: getFacilityNumber(facilities, 'room'),
    numberOfBedrooms: getFacilityNumber(facilities, 'bedroom'),
    numberOfBathroomsTotal: getFacilityNumber(facilities, 'bathroom'),
    floorSize: floorSize
      ? { '@type': 'QuantitativeValue', value: floorSize, unitCode: 'MTK' }
      : undefined,
  };
};

const getOffer = (property: IPropertyDetail, url: string) => {
  if (property.price <= 0 || !property.priceUnit) {
    return undefined;
  }

  const price = { price: property.price, priceCurrency: property.priceUnit };

  return {
    '@type': 'Offer',
    url,
    ...price,
    priceSpecification:
      property.listingType === 'rent'
        ? {
            '@type': 'UnitPriceSpecification',
            ...price,
            unitCode: RENT_PERIOD_UNIT_CODES[property.rentPeriod],
          }
        : undefined,
    availability: property.availability
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    businessFunction: BUSINESS_FUNCTIONS[property.listingType],
    itemOffered: { '@id': `${url}#place` },
    seller: { '@id': getSchemaId('organization') },
  };
};

export default function PropertyJsonLd({
  property,
  locale,
  path,
}: IPropertyJsonLdProps) {
  const url = getAbsoluteUrl(path);
  const images = property.areas
    .map((area) => area.mainImageUrl)
    .filter(Boolean);

  return (
    <JsonLd
      data={{
        '@type': 'RealEstateListing',
        '@id': `${url}#listing`,
        url,
        name: property.title,
        description: property.description || undefined,
        image: images.length > 0 ? images : undefined,
        datePosted: toIsoDate(property._createdAt),
        dateModified: toIsoDate(property._updatedAt),
        inLanguage: getLanguageTag(locale),
        isPartOf: { '@id': getSchemaId('website') },
        mainEntity: getPlace(property, url),
        offers: getOffer(property, url),
      }}
    />
  );
}
