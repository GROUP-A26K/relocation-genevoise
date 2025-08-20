import {
  POST_CATEGORIES_QUERY,
  BLOGS_QUERY,
  BLOG_DETAIL_QUERY,
  BLOGS_SITEMAP_QUERY,
  BLOG_SLUG_QUERY,
  BLOG_LASTEST_QUERY,
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import {
  Author,
  BlogCategory,
  BlogPost,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity/types";
import { Blog, BlogDetail, BlogSitemap } from "@/models/BLog";
import { Meta } from "@/models/Meta";
import { formatDate } from "@/utils/Helpers";

export interface AuthorProps extends Omit<Author, "authorAvatar"> {
  authorAvatar?: { asset?: SanityImageAsset };
  name?: string;
  email?: string;
}

export interface BlogPostProps
  extends Omit<BlogPost, "category" | "author" | "mainPhoto"> {
  mainPhoto?: {
    photo?: {
      asset?: SanityImageAsset;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    photoAlt?: string;
  };
  category: BlogCategory[];
  author: AuthorProps;
}

export interface ParamsProps {
  page?: number;
  filterBy?: string;
  search?: string;
  pageSize?: number;
  locale?: string;
  start?: number;
  limit?: number;
  exceptSlug?: string;
}

export const fetchBlogs = async (
  params?: ParamsProps
): Promise<{ blogs: Blog[]; meta: Meta }> => {
  try {
    const end = (params?.page || 1) * (params?.pageSize || 10);

    const start = end - (params?.pageSize || 10);
    const response = await client.fetch<{
      blogs: BlogPostProps[];
      total: number;
    }>(
      BLOGS_QUERY,
      {
        start: start,
        end: end,
        locale: params?.locale ?? "en",
        category: params?.filterBy ?? "",
        title: params?.search ? `*${params?.search}*` : "",
        slug: params?.exceptSlug ?? "",
      },
      { next: { tags: ["blogs"] } }
    );

    return {
      blogs: response.blogs.map((post) => ({
        id: post._id,
        title: post.title || "Untitled Post",
        href: `/blog/${(post?.slug?.current || "").replace(/^[a-z]{2}-/i, "")}`,
        description: post?.summary || "No summary available",
        timeToRead: post?.timeToRead || 0,
        publishedDate: post?.publishedDate
          ? formatDate(post?.publishedDate, params?.locale ?? "en")
          : "Unknown Date",
        slug: post?.slug?.current || "",
        imageUrl:
          post.mainPhoto?.photo?.asset?.url ||
          "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80",
        time: "3",
        category:
          post?.category?.map((cat) => ({
            title: cat?.name || "Unknown Category",
            href: `/blog/category/${cat?.name || ""}`,
          })) || [],
        author: {
          name: post.author?.name || "Unknown Author",
          role: "Author",
          href: `/blog/author/${post?.author?.name || ""}`,
          email: post.author.email || "Unknown Email",
          imageUrl:
            post.author.authorAvatar?.asset?.url ||
            "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80",
        },
      })),
      meta: {
        pagination: {
          total: response.total,
          page: params?.page || 1,
          pageSize: params?.pageSize || 10,
          pageCount: Math.ceil(response.total / (params?.pageSize || 10)),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return {
    blogs: [],
    meta: { pagination: { total: 0, page: 0, pageSize: 0, pageCount: 0 } },
  };
};

export const fetchBlogBySlug = async (
  slug: string,
  locale: string = "en"
): Promise<BlogDetail | null> => {
  try {
    const response = await client.fetch<BlogPostProps>(
      BLOG_DETAIL_QUERY,
      {
        slug: `${locale}-${slug}`,
      },
      { next: { tags: ["blog"] } }
    );
    if (!response) {
      return null;
    }
    return {
      id: response._id,
      title: response.title || "Untitled Post",
      href: `/blog/${(response?.slug?.current || "").replace(/^[a-z]{2}-/i, "")}`,
      description: response?.summary || "No summary available",
      slug: response?.slug?.current || "",
      timeToRead: response?.timeToRead || 0,
      publishedDate: response?.publishedDate || "Unknown Date",
      imageUrl:
        response.mainPhoto?.photo?.asset?.url ||
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80",
      time: "3",
      body: response?.body || [],
      category:
        response?.category?.map((cat) => ({
          title: cat?.name || "Unknown Category",
          href: `/blog/category/${cat?.name || ""}`,
        })) || [],
      author: {
        name: response.author?.name || "Unknown Author",
        role: "Author",
        href: `/blog/author/${response?.author?.name || ""}`,
        email: response.author?.email || "Unknown Email",
        imageUrl:
          response.author?.authorAvatar?.asset?.url ||
          "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80",
      },
    };
  } catch (error) {
    console.error("Error fetching blog detail:", error);
  }

  return null;
};

export const fetchSitemapBlogs = async (
  params?: ParamsProps
): Promise<{ blogs: BlogSitemap[]; meta: Meta }> => {
  try {
    const response = await client.fetch<{
      blogs: BlogPostProps[];
      total: number;
    }>(
      BLOGS_SITEMAP_QUERY,
      {
        locale: params?.locale ?? "en",
        category: "",
        title: "",
      },
      { next: { tags: ["sitemap-blogs"] } }
    );

    return {
      blogs: response.blogs.map((post) => ({
        id: post._id,
        title: post.title || "Untitled Post",
        slug: post?.slug?.current || "",
        href: `/blog/${(post?.slug?.current || "").replace(/^[a-z]{2}-/i, "")}`,
      })),
      meta: {
        pagination: {
          total: response.total,
          page: params?.page || 1,
          pageSize: params?.pageSize || 10,
          pageCount: Math.ceil(response.total / (params?.pageSize || 10)),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return {
    blogs: [],
    meta: { pagination: { total: 0, page: 0, pageSize: 0, pageCount: 0 } },
  };
};

export const fetchLatestBlog = async (
  locale: string = "fr"
): Promise<BlogDetail | null> => {
  try {
    const response = await client.fetch<BlogPostProps>(
      BLOG_LASTEST_QUERY,
      {
        locale,
      },
      { next: { tags: ["blog"] } }
    );
    if (!response) {
      return null;
    }
    return {
      id: response._id,
      title: response.title || "Untitled Post",
      href: `/blog/${(response?.slug?.current || "").replace(/^[a-z]{2}-/i, "")}`,
      description: response?.summary || "No summary available",
      slug: response?.slug?.current || "",
      timeToRead: response?.timeToRead || 0,
      publishedDate: response?.publishedDate || "Unknown Date",
      imageUrl:
        response.mainPhoto?.photo?.asset?.url ||
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80",
      time: "3",
      body: response?.body || [],
      category:
        response?.category?.map((cat) => ({
          title: cat?.name || "Unknown Category",
          href: `/blog/category/${cat?.name || ""}`,
        })) || [],
      author: {
        name: response.author?.name || "Unknown Author",
        role: "Author",
        href: `/blog/author/${response?.author?.name || ""}`,
        email: response.author?.email || "Unknown Email",
        imageUrl:
          response.author?.authorAvatar?.asset?.url ||
          "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80",
      },
    };
  } catch (error) {
    console.error("Error fetching blog detail:", error);
  }

  return null;
};

export async function fetchPostCategory(params?: ParamsProps) {
  const posts = await client.fetch<BlogCategory[]>(
    POST_CATEGORIES_QUERY,
    { locale: params?.locale ?? "en" },
    { next: { tags: ["categories"] } }
  );

  return {
    posts,
  };
}

export const fetchBlogSlugBySlug = async (slug: string) => {
  try {
    const response = await client.fetch<{
      targetSlug: {
        language: string;
        slug: {
          current: string;
        };
      }[];
    } | null>(BLOG_SLUG_QUERY, { slug });

    if (!response?.targetSlug) {
      return [];
    }

    return response.targetSlug.map((item) => ({
      locale: item.language,
      slug: item.slug.current,
      href: `/blog/${item.slug.current.replace(/^[a-z]{2}-/i, "")}`,
    }));
  } catch (error) {
    console.error("Error fetching blog slug:", error);
    return [];
  }
};
