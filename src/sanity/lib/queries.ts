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
        mainPhoto {
          photo {
            asset -> {
              _id,
              url
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
              _type == "videoZone" => {
                ...,
                videoFile {
                  asset -> {
                    _id,
                    url
                  }
                }
              },
              _type == "photoZone" => {
                ...,
                mainPhoto {
                  imageTitle,
                  photo {
                    asset -> {
                      _id,
                      url
                    }
                  }
                }
              },
               _type == "quoteImageZone" => {
                ...,
                photo {
                  asset->{
                    _id,
                    url
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
        "category": category[] -> {
          _id,
          name
        },
        "author": author -> {
          _id,
          name,
          email,
          authorAvatar {
            asset -> {
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

export const CAREERS_QUERY = defineQuery(`
  {
    "jobs": *[
      _type == "assuranceJobPost" &&
      isHidden == false &&
      !(_id in path("drafts.**")) &&
      ($department == "" || $department == department->title[$locale])&&
      language == $locale
    ]| order(publishedAt desc) [$start...$end] {
      ...,
      _originalId,
      publishedAt,
      "department": department->{
          title
        }
    },
    "total": count(
      *[
        _type == "assuranceJobPost" &&
        ($department == "" || $department == department->title.fr)&&
        language == $locale &&
        isHidden == false
      ]
    )
  }
`);

export const FEATURED_CAREER_QUERY = defineQuery(`
  {
    "jobs": *[
      _type == "assuranceJobPost" &&
      !(_id in path("drafts.**")) &&
      slug.current != $slug &&
      language == $locale &&
      isHidden == false
    ]
    | order(
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
    },
 }
`);

export const CAREER_DETAIL_QUERY = defineQuery(`
   *[
    _type == "assuranceJobPost" &&
    slug.current == $slug
  ][0] {
  ...,
  body[]{
    ...,
      blockTitle {
      ...,
      "content": content[]{
        ...,
           _type == "videoZone" => {
          ...,
          videoFile{
                asset->{
                _id,
                url
                }
              
            }
          }
        ,
       
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
        },
      }
    },
  "department": department->{
          title
        }
  }
`);

export const DEPARTMENT_QUERY = defineQuery(
  `*[_type == "assuranceJobDepartment" && count(*[_type == "assuranceJobPost" && isHidden == false && language == $locale && !(_id in path("drafts.**")) && references(^._id)]) >= 1]`
);
