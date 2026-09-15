import { defineQuery } from 'groq';

const BLOG_POST_TYPE = 'relocationBlogPost';
const BLOG_CATEGORY_TYPE = 'relocationBlogCategory';
const JOB_POST_TYPE = 'relocationJobPost';
const JOB_DEPARTMENT_TYPE = 'relocationJobDepartment';
const PROPERTY_TYPE = 'property';
const PROPERTY_CATEGORY_TYPE = 'propertyCategory';
const TRANSLATION_METADATA_TYPE = 'translation.metadata';
const VIDEO_ZONE_TYPE = 'videoZone';
const QUOTE_IMAGE_ZONE_TYPE = 'quoteImageZone';
const PHOTO_ZONE_TYPE = 'photoZone';

export const BLOG_LATEST_QUERY = defineQuery(`
  *[
    _type == "${BLOG_POST_TYPE}" &&
    !(_id in path("drafts.**")) &&
    language == $locale
  ] | order(publishedDate desc)[0] {
    _id,
    title,
    summary,
    language,
    mainPhoto {
      photo {
        asset->{
          _id,
          url,
          "lqip": metadata.lqip
        },
        hotspot,
        crop
      },
      photoAlt
    },
    body[] {
      ...,
      blockTitle {
        ...,
        "content": content[] {
          ...,
          _type == "${VIDEO_ZONE_TYPE}" => {
            ...,
            videoFile {
              asset->{
                _id,
                url
              }
            }
          },
          _type == "${QUOTE_IMAGE_ZONE_TYPE}" => {
            ...,
            photo {
              asset->{
                _id,
                url,
                "lqip": metadata.lqip
              }
            }
          },
          _type == "${PHOTO_ZONE_TYPE}" => {
            ...,
            mainPhoto {
              imageTitle,
              photo {
                asset->{
                  _id,
                  url,
                  "lqip": metadata.lqip
                }
              }
            }
          }
        }
      }
    },
    slug,
    publishedDate,
    timeToRead,
    createdAt,
    "category": category[]->{
      _id,
      name
    },
    "author": author->{
      _id,
      name,
      email,
      authorAvatar {
        asset->{
          _id,
          url,
          "lqip": metadata.lqip
        }
      }
    }
  }
`);

const BLOGS_BASE_FILTER = `
  _type == "${BLOG_POST_TYPE}" &&
  !(_id in path("drafts.**")) &&
  language == $locale &&
  slug.current != $slug &&
  ($category == "" || $category in category[]->name) &&
  ($title == "" || title match $title)
`;

export const BLOGS_QUERY = defineQuery(`
  {
    "blogs": *[${BLOGS_BASE_FILTER}] | order(publishedDate desc)[$start...$end] {
      _originalId,
      _id,
      title,
      summary,
      language,
      mainPhoto {
        photo {
          asset->{
            _id,
            url,
            "lqip": metadata.lqip
          },
          hotspot,
          crop
        },
        photoAlt
      },
      body,
      slug,
      publishedAt,
      publishedDate,
      timeToRead,
      createdAt,
      "category": category[]->{
        _id,
        name
      },
      "author": author->{
        _id,
        name,
        email,
        authorAvatar {
          asset->{
            _id,
            url,
            "lqip": metadata.lqip
          }
        }
      }
    },
    "total": count(*[${BLOGS_BASE_FILTER}])
  }
`);

export const BLOG_DETAIL_QUERY = defineQuery(`
  *[
    _type == "${BLOG_POST_TYPE}" &&
    !(_id in path("drafts.**")) &&
    slug.current == $slug
  ][0] {
    _id,
    _updatedAt,
    title,
    summary,
    language,
    mainPhoto {
      photo {
        asset->{
          _id,
          url,
          "lqip": metadata.lqip
        },
        hotspot,
        crop
      },
      photoAlt
    },
    body[] {
      ...,
      blockTitle {
        ...,
        "content": content[] {
          ...,
          _type == "${VIDEO_ZONE_TYPE}" => {
            ...,
            videoFile {
              asset->{
                _id,
                url
              }
            }
          },
          _type == "${PHOTO_ZONE_TYPE}" => {
            ...,
            mainPhoto {
              imageTitle,
              photo {
                asset->{
                  _id,
                  url,
                  "lqip": metadata.lqip
                }
              }
            }
          },
          _type == "${QUOTE_IMAGE_ZONE_TYPE}" => {
            ...,
            photo {
              asset->{
                _id,
                url,
                "lqip": metadata.lqip
              }
            }
          }
        }
      }
    },
    slug,
    publishedAt,
    publishedDate,
    timeToRead,
    createdAt,
    "category": category[]->{
      _id,
      name
    },
    "author": author->{
      _id,
      name,
      email,
      authorAvatar {
        asset->{
          _id,
          url,
          "lqip": metadata.lqip
        }
      }
    }
  }
`);

export const BLOG_SLUG_QUERY = defineQuery(`
  *[
    _type == "${BLOG_POST_TYPE}" &&
    !(_id in path("drafts.**")) &&
    slug.current == $slug
  ][0] {
    "targetSlug": *[
      _type == "${TRANSLATION_METADATA_TYPE}" &&
      references(^._id)
    ][0].translations[].value->{
      language,
      slug
    }
  }
`);

const BLOGS_SITEMAP_FILTER = `
  _type == "${BLOG_POST_TYPE}" &&
  !(_id in path("drafts.**")) &&
  language == $locale &&
  ($category == "" || $category in category[]->name) &&
  ($title == "" || title match $title)
`;

export const BLOGS_SITEMAP_QUERY = defineQuery(`
  {
    "blogs": *[${BLOGS_SITEMAP_FILTER}] | order(publishedDate desc) {
      _originalId,
      _id,
      publishedDate,
      title,
      summary,
      slug
    },
    "total": count(*[${BLOGS_SITEMAP_FILTER}])
  }
`);

const PROPERTIES_SITEMAP_FILTER = `
  _type == "${PROPERTY_TYPE}" &&
  !(_id in path("drafts.**")) &&
  language == $locale
`;

export const PROPERTIES_SITEMAP_QUERY = defineQuery(`
  {
    "properties": *[${PROPERTIES_SITEMAP_FILTER}] | order(_createdAt desc) {
      _id,
      title,
      slug
    },
    "total": count(*[${PROPERTIES_SITEMAP_FILTER}])
  }
`);

export const SITEMAP_DOCUMENTS_QUERY = defineQuery(`
  *[
    _type == $type &&
    !(_id in path("drafts.**")) &&
    coalesce(isHidden, false) == false &&
    ($requiresExplicitVisibility == false || isHidden == false) &&
    language in $locales &&
    defined(slug.current)
  ] | order(_updatedAt desc) {
    _updatedAt,
    language,
    "slug": slug.current,
    "translations": *[
      _type == "${TRANSLATION_METADATA_TYPE}" &&
      !(_id in path("drafts.**")) &&
      references(^._id)
    ][0].translations[].value->{
      language,
      isHidden,
      "slug": slug.current
    }
  }
`);

export const POST_CATEGORIES_QUERY = defineQuery(`
  *[
    _type == "${BLOG_CATEGORY_TYPE}" &&
    count(*[
      _type == "${BLOG_POST_TYPE}" &&
      language == $locale &&
      !(_id in path("drafts.**")) &&
      references(^._id)
    ]) >= 1
  ]
`);

const CAREERS_BASE_FILTER = `
  _type == "${JOB_POST_TYPE}" &&
  isHidden == false &&
  !(_id in path("drafts.**")) &&
  ($department == "" || $department == department->title[$locale]) &&
  language == $locale
`;

export const CAREERS_QUERY = defineQuery(`
  {
    "jobs": *[${CAREERS_BASE_FILTER}] | order(publishedAt desc)[$start...$end] {
      ...,
      _originalId,
      publishedAt,
      "department": department->{
        title
      }
    },
    "total": count(*[${CAREERS_BASE_FILTER}])
  }
`);

export const FEATURED_CAREER_QUERY = defineQuery(`
  {
    "jobs": *[
      _type == "${JOB_POST_TYPE}" &&
      !(_id in path("drafts.**")) &&
      slug.current != $slug &&
      language == $locale &&
      isHidden == false
    ] | order(
      isFeatured desc,
      (department->title[$locale] == $department) desc,
      publishedAt desc
    )[0...5] {
      ...,
      _originalId,
      publishedAt,
      "department": department->{
        title
      }
    }
  }
`);

export const CAREER_DETAIL_QUERY = defineQuery(`
  *[
    _type == "${JOB_POST_TYPE}" &&
    !(_id in path("drafts.**")) &&
    isHidden == false &&
    slug.current == $slug
  ][0] {
    ...,
    body[] {
      ...,
      blockTitle {
        ...,
        "content": content[] {
          ...,
          _type == "${VIDEO_ZONE_TYPE}" => {
            ...,
            videoFile {
              asset->{
                _id,
                url
              }
            }
          },
          _type == "${PHOTO_ZONE_TYPE}" => {
            ...,
            mainPhoto {
              imageTitle,
              photo {
                asset->{
                  _id,
                  url,
                  "lqip": metadata.lqip
                }
              }
            }
          }
        }
      }
    },
    "department": department->{
      title
    }
  }
`);

export const CAREER_SLUG_QUERY = defineQuery(`
  *[
    _type == "${JOB_POST_TYPE}" &&
    !(_id in path("drafts.**")) &&
    slug.current == $slug
  ][0] {
    "targetSlug": *[
      _type == "${TRANSLATION_METADATA_TYPE}" &&
      references(^._id)
    ][0].translations[].value->{
      language,
      slug
    }
  }
`);

// ==================== PROPERTIES ====================

const BEDROOM_COUNT = `facilities[typeRoom == "bedroom" && valueType == "number"][0].numberValue`;
const ROOM_COUNT = `facilities[typeRoom == "room" && valueType == "number"][0].numberValue`;

const PROPERTIES_BASE_FILTER = `
  _type == "${PROPERTY_TYPE}" &&
  !(_id in path("drafts.**")) &&
  language == $locale &&
  (count($categories) == 0 || category->categoryName in $categories) &&
  ($location == "" || mapLocation.name match $location) &&
  ($minPrice == 0 || price >= $minPrice) &&
  ($maxPrice == 0 || price <= $maxPrice) &&
  (
    $rooms == "" ||
    (
      $rooms == "studio" &&
      (
        ${BEDROOM_COUNT} == 0 ||
        (!defined(${BEDROOM_COUNT}) && ${ROOM_COUNT} <= 1.5)
      )
    ) ||
    ($rooms == "1" && ${BEDROOM_COUNT} == 1) ||
    ($rooms == "2" && ${BEDROOM_COUNT} == 2) ||
    ($rooms == "3" && ${BEDROOM_COUNT} == 3) ||
    ($rooms == "4plus" && coalesce(${BEDROOM_COUNT}, 0) >= 4)
  ) &&
  (!$availableOnly || availability == true)
`;

export const PROPERTIES_QUERY = defineQuery(`
  {
    "properties": *[${PROPERTIES_BASE_FILTER}] | order(
      availability desc,
      select($sort == "price_asc" => price) asc,
      select($sort == "price_desc" => price) desc,
      _createdAt desc
    )[$start...$end] {
      _id,
      title,
      slug,
      price,
      priceUnit,
      listingType,
      rentPeriod,
      language,
      availability,
      description,
      mapLocation {
        name,
        coordinates
      },
      "category": category->categoryName,
      "facilities": facilities[] {
        typeRoom,
        name,
        valueType,
        numberValue,
        textValue
      },
      "imageUrl": areas[0].mainImage.asset->url,
      "imageLqip": areas[0].mainImage.asset->metadata.lqip
    },
    "total": count(*[${PROPERTIES_BASE_FILTER}])
  }
`);

export const PROPERTY_CATEGORIES_QUERY = defineQuery(`
  *[
    _type == "${PROPERTY_CATEGORY_TYPE}" &&
    count(*[
      _type == "${PROPERTY_TYPE}" &&
      !(_id in path("drafts.**")) &&
      language == $locale &&
      references(^._id)
    ]) > 0
  ] | order(categoryName asc) {
    _id,
    categoryName
  }
`);

export const DEPARTMENT_QUERY = defineQuery(`
  *[
    _type == "${JOB_DEPARTMENT_TYPE}" &&
    count(*[
      _type == "${JOB_POST_TYPE}" &&
      isHidden == false &&
      language == $locale &&
      !(_id in path("drafts.**")) &&
      references(^._id)
    ]) > 0
  ]
`);

export const PROPERTY_DETAIL_QUERY = defineQuery(`
  *[
    _type == "${PROPERTY_TYPE}" &&
    !(_id in path("drafts.**")) &&
    slug.current == $slug
  ][0] {
    _id,
    _createdAt,
    _updatedAt,
    language,
    title,
    slug,
    listingType,
    price,
    priceUnit,
    rentPeriod,
    description,
    availability,
    mapLocation {
      name,
      coordinates {
        lat,
        lng
      }
    },
    facilities[] {
      typeRoom,
      name,
      valueType,
      numberValue,
      textValue
    },
    agent->{
      _id,
      agentName,
      agentPhone,
      "photoUrl": photo.asset->url,
      "photoLqip": photo.asset->metadata.lqip
    },
    category->{
      _id,
      categoryName
    },
    areas[] {
      title,
      "mainImageUrl": mainImage.asset->url,
      "mainImageLqip": mainImage.asset->metadata.lqip,
      "galleryImages": galleryImages[] {
        "url": asset->url,
        "lqip": asset->metadata.lqip
      }
    },
    surroundingPlaces[] {
      icon,
      name,
      distance
    }
  }
`);

export const PROPERTY_PHOTO_TOUR_QUERY = defineQuery(`
  *[
    _type == "${PROPERTY_TYPE}" &&
    !(_id in path("drafts.**")) &&
    slug.current == $slug
  ][0].areas[] {
    title,
    description,
    "mainImageUrl": mainImage.asset->url,
      "mainImageLqip": mainImage.asset->metadata.lqip,
    "galleryImages": galleryImages[] {
      "url": asset->url,
      "lqip": asset->metadata.lqip
    }
  }
`);

export const PROPERTY_SLUG_QUERY = defineQuery(`
  *[
    _type == "${PROPERTY_TYPE}" &&
    !(_id in path("drafts.**")) &&
    slug.current == $slug
  ][0] {
    "targetSlug": *[
      _type == "${TRANSLATION_METADATA_TYPE}" &&
      references(^._id)
    ][0].translations[].value->{
      language,
      "slug": slug.current
    }
  }
`);
