import 'server-only';

import { toUrlSlug } from '@/utils/slug';
import { sanityFetch } from '@/sanity/lib/fetch';
import { getImageMessages } from '@/utils/imageMessages';
import { AppConfig, type TLocale } from '@/utils/appConfig';
import {
  PROPERTY_DEFAULT_PRICE_UNIT,
  PROPERTY_DEFAULT_RENT_PERIOD,
  PROPERTY_DEFAULT_SORT,
} from '@/constants/property';
import {
  PROPERTIES_QUERY,
  PROPERTIES_SITEMAP_QUERY,
  PROPERTY_CATEGORIES_QUERY,
  PROPERTY_DETAIL_QUERY,
  PROPERTY_PHOTO_TOUR_QUERY,
  PROPERTY_SLUG_QUERY,
} from '@/sanity/lib/queries';

import type {
  IPropertiesResponse,
  TPropertyCategoryParams,
  TPropertyParams,
} from '@/types';
import type {
  PROPERTIES_QUERY_RESULT,
  PROPERTY_CATEGORIES_QUERY_RESULT,
  PROPERTY_DETAIL_QUERY_RESULT,
  PROPERTY_PHOTO_TOUR_QUERY_RESULT,
} from '@/sanity/types';
import type {
  IAreaPhotoTour,
  IPropertyCategory,
  IPropertyGalleryImage,
  IPropertyDetail,
  IPropertyFacility,
  IPropertyListing,
  TPropertyListingType,
  IPropertySitemap,
} from '@/models/property';

const DEFAULT_PROPERTY_PAGE = 1;
const DEFAULT_PROPERTY_PAGE_SIZE = 15;
const DEFAULT_PROPERTY_LOCALE = AppConfig.defaultLocale;
const getLocale = (locale?: string): TLocale => {
  return locale === 'en' ? 'en' : DEFAULT_PROPERTY_LOCALE;
};

const getPaginationRange = (page: number, pageSize: number) => {
  const end = page * pageSize;
  const start = end - pageSize;

  return { start, end };
};

const mapFacility = (facility: {
  typeRoom: string | null;
  name: string | null;
  valueType: IPropertyFacility['valueType'] | null;
  numberValue: number | null;
  textValue: string | null;
}): IPropertyFacility => ({
  typeRoom: facility.typeRoom || '',
  name: facility.name || '',
  valueType: facility.valueType || 'none',
  numberValue: facility.numberValue ?? undefined,
  textValue: facility.textValue ?? undefined,
});

const mapGalleryImage = (image: {
  url: string | null;
  lqip: string | null;
}): IPropertyGalleryImage => ({
  url: image.url || '',
  lqip: image.lqip ?? undefined,
});

const mapAreaPhotoTour = (
  area: NonNullable<PROPERTY_PHOTO_TOUR_QUERY_RESULT>[number]
): IAreaPhotoTour => ({
  title: area.title || '',
  description: area.description || '',
  mainImageUrl: area.mainImageUrl || '',
  mainImageLqip: area.mainImageLqip ?? undefined,
  galleryImages: area.galleryImages?.map(mapGalleryImage) ?? null,
});

const mapPropertyDetail = (
  property: NonNullable<PROPERTY_DETAIL_QUERY_RESULT>
): IPropertyDetail => ({
  _id: property._id,
  _createdAt: property._createdAt,
  _updatedAt: property._updatedAt,
  language: property.language || '',
  title: property.title || '',
  slug: {
    _type: property.slug?._type || 'slug',
    current: property.slug?.current || '',
  },
  listingType: property.listingType || 'rent',
  price: property.price || 0,
  priceUnit: property.priceUnit || '',
  rentPeriod: property.rentPeriod || 'month',
  description: property.description || '',
  availability: Boolean(property.availability),
  mapLocation: {
    name: property.mapLocation?.name || '',
    coordinates: {
      lat: property.mapLocation?.coordinates?.lat ?? 0,
      lng: property.mapLocation?.coordinates?.lng ?? 0,
    },
  },
  facilities: (property.facilities || []).map(mapFacility),
  agent: {
    _id: property.agent?._id || '',
    agentName: property.agent?.agentName || '',
    agentPhone: property.agent?.agentPhone || '',
    photoUrl: property.agent?.photoUrl || '',
    photoLqip: property.agent?.photoLqip ?? undefined,
  },
  category: {
    id: property.category?._id || '',
    categoryName: property.category?.categoryName || '',
  },
  areas: (property.areas || []).map((area) => ({
    title: area.title || '',
    mainImageUrl: area.mainImageUrl || '',
    mainImageLqip: area.mainImageLqip ?? undefined,
    galleryImages: area.galleryImages?.map(mapGalleryImage) ?? null,
  })),
  surroundingPlaces: (property.surroundingPlaces || []).map((place) => ({
    icon: place.icon || '',
    name: place.name || '',
    distance: place.distance || '',
  })),
});

const mapProperty = (
  property: PROPERTIES_QUERY_RESULT['properties'][number],
  locale: TLocale
): IPropertyListing => ({
  id: property._id,
  title: property.title || getImageMessages(locale).property.listing,
  slug: property.slug?.current || '',
  href: {
    pathname: '/properties/[slug]',
    params: {
      slug: toUrlSlug(property.slug?.current || ''),
    },
  },
  price: property.price || 0,
  priceUnit: property.priceUnit || PROPERTY_DEFAULT_PRICE_UNIT,
  listingType: (property.listingType as TPropertyListingType) || 'rent',
  rentPeriod: property.rentPeriod || PROPERTY_DEFAULT_RENT_PERIOD,
  location: {
    name: property.mapLocation?.name || '',
    lat: property.mapLocation?.coordinates?.lat,
    lng: property.mapLocation?.coordinates?.lng,
  },
  category: property.category || '',
  facilities: (property.facilities || []).map(mapFacility),
  description: property.description || '',
  imageUrl: property.imageUrl || '',
  imageLqip: property.imageLqip ?? undefined,
  availability: Boolean(property.availability),
});

const mapPropertyCategory = (
  category: PROPERTY_CATEGORIES_QUERY_RESULT[number]
): IPropertyCategory => ({
  id: category._id,
  categoryName: category.categoryName || '',
});

export const fetchProperties = async (
  params?: TPropertyParams
): Promise<IPropertiesResponse> => {
  const page = params?.page ?? DEFAULT_PROPERTY_PAGE;
  const pageSize = params?.pageSize ?? DEFAULT_PROPERTY_PAGE_SIZE;
  const locale = getLocale(params?.locale);
  const sort = params?.sort ?? PROPERTY_DEFAULT_SORT;
  const { start, end } = getPaginationRange(page, pageSize);

  const categories = params?.category?.filter(Boolean) ?? [];

  const availableOnly = params?.availableOnly ?? false;

  const response = await sanityFetch(
    PROPERTIES_QUERY,
    {
      start,
      end,
      sort,
      availableOnly,
      locale,
      categories,
      location: params?.location || '',
      minPrice: params?.minPrice ?? 0,
      maxPrice: params?.maxPrice ?? 0,
      rooms: params?.rooms ?? '',
    },
    { tags: ['properties'] }
  );

  return {
    properties: response.properties.map((property) =>
      mapProperty(property, locale)
    ),
    meta: {
      pagination: {
        total: response.total,
        page,
        pageSize,
        pageCount: Math.ceil(response.total / pageSize),
      },
    },
  };
};

export const fetchPropertyCategories = async (
  params?: TPropertyCategoryParams
): Promise<IPropertyCategory[]> => {
  const response = await sanityFetch(
    PROPERTY_CATEGORIES_QUERY,
    {
      locale: getLocale(params?.locale),
    },
    { tags: ['property-categories'] }
  );

  return response.map(mapPropertyCategory);
};

export async function getPropertyDetail(
  slug: string,
  locale: string = 'en'
): Promise<IPropertyDetail | null> {
  const response = await sanityFetch(
    PROPERTY_DETAIL_QUERY,
    { slug: `${locale}-${slug}` },
    { tags: ['property'] }
  );

  return response ? mapPropertyDetail(response) : null;
}

export async function getPropertyPhotoTour(
  slug: string,
  locale: string = 'en'
): Promise<IAreaPhotoTour[]> {
  const response = await sanityFetch(
    PROPERTY_PHOTO_TOUR_QUERY,
    { slug: `${locale}-${slug}` },
    { tags: ['property'] }
  );

  return (response ?? []).map(mapAreaPhotoTour);
}

export const fetchSitemapProperties = async (
  params?: TPropertyParams
): Promise<{ properties: IPropertySitemap[]; meta: { total: number } }> => {
  const response = await sanityFetch(
    PROPERTIES_SITEMAP_QUERY,
    {
      locale: getLocale(params?.locale),
    },
    { tags: ['sitemap-properties'] }
  );

  return {
    properties: response.properties.map((property) => ({
      id: property._id,
      title: property.title || 'Untitled Property',
      slug: property.slug?.current || '',
      href: {
        pathname: '/properties/[slug]',
        params: {
          slug: toUrlSlug(property.slug?.current || ''),
        },
      },
    })),
    meta: { total: response.total },
  };
};

export const fetchPropertySlugBySlug = async (slug: string) => {
  const response = await sanityFetch(
    PROPERTY_SLUG_QUERY,
    { slug },
    { tags: ['property'] }
  );

  return (response?.targetSlug ?? []).flatMap((item) => {
    if (!item?.language || !item.slug) {
      return [];
    }

    return [
      {
        locale: item.language,
        slug: item.slug,
        href: {
          pathname: '/properties/[slug]',
          params: { slug: toUrlSlug(item.slug) },
        },
      },
    ];
  });
};
