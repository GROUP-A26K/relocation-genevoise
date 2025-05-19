import { defineQuery } from "next-sanity";

export const BLOGS_QUERY = defineQuery(`
    {
    "blogs": *[
      _type == "blogPost" &&
      !(_id in path("drafts.**")) &&
      language == $locale &&
      ($category == "" || $category in category[]->name)&&
      ($title == "" || title match $title)
    ]| order(publishedDate desc) [$start...$end] {
      _originalId,
      _id,
      title,
      summary,
      language,
      mainPhoto{
        photo{
          asset->{
            _id,
            url
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
        authorAvatar{
          asset->{
            _id,
            url
          }
        }
      }
    },
    "total": count(
      *[
        _type == "blogPost" &&
        language == $locale &&
        ($category == "" || $category in category[]->name)
      ]
    )
  }
`);

export const BLOG_DETAIL_QUERY = defineQuery(`
 *[
    _type == "blogPost" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    summary,
    language,
    mainPhoto{
      photo{
        asset->{
          _id,
          url
        },
        hotspot,
        crop
      },
      photoAlt
    },
     body[]{
    ...,
     blockTitle {
      ...,
      "content": content[]{
        ...,
        _type == "photoZone" => {
          ...,
          mainPhoto{
            imageTitle,
              photo{
                asset->{
                _id,
                url
                }
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
      authorAvatar{
        asset->{
          _id,
          url
        }
      }
    }
  }
`);

export const BLOGS_SITEMAP_QUERY = defineQuery(`
  {
  "blogs": *[
    _type == "blogPost" &&
    !(_id in path("drafts.**")) &&
    language == $locale &&
    ($category == "" || $category in category[]->name)&&
    ($title == "" || title match $title)
  ]| order(publishedDate desc) [$start...$end] {
    _originalId,
    _id,
    title,
    summary,
    slug,
  },
  "total": count(
    *[
      _type == "blogPost" &&
      language == $locale &&
      ($category == "" || $category in category[]->name)
    ]
  )
}
`);

export const POST_CATEGORIES_QUERY = defineQuery(
  `*[_type == "blogCategory" && count(*[_type == "blogPost" && !(_id in path("drafts.**")) && language == $locale && references(^._id)]) > 1]`
);
