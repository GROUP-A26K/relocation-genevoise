import { defineQuery } from 'next-sanity';

export const BLOGS_QUERY = defineQuery(`
    {
    "blogs": *[
      _type == "relocationBlogPost" &&
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
        _type == "relocationBlogPost" &&
        language == $locale &&
        ($category == "" || $category in category[]->name)
      ]
    )
  }
`);

export const BLOG_DETAIL_QUERY = defineQuery(`
 *[
    _type == "relocationBlogPost" &&
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
      _type == "relocationBlogPost" &&
      language == $locale &&
      ($category == "" || $category in category[]->name)&&
      ($title == "" || title match $title)
    ]| order(publishedDate desc) {
    _originalId,
    _id,
    publishedDate,
    title,
    summary,
    slug,
  },
  "total": count(
    *[
      _type == "relocationBlogPost" &&
      language == $locale &&
      ($category == "" || $category in category[]->name)
    ]
  )
}
`);

export const POST_CATEGORIES_QUERY = defineQuery(
  `*[_type == "relocationBlogCategory" && count(*[_type == "relocationBlogPost" && !(_id in path("drafts.**")) && references(^._id)]) > 1]`
);
