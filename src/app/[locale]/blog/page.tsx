import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { PageView } from "@/components/sections/Blog/PageView";
import {
  fetchBlogs,
  fetchLatestBlog,
  fetchPostCategory,
} from "@/services/blog.service";

const PAGE_SIZE = 9;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; filterBy?: string; search?: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "Metadata.Blog",
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale == "fr" ? "" : locale}/blog`,
    },
  };
}

export default async function Page(props: Props) {
  const { locale } = await props.params;
  const { page, filterBy, search } = await props.searchParams;

  const [postCategory, newestBlog] = await Promise.all([
    fetchPostCategory({ locale }),
    fetchLatestBlog(locale),
  ]);

  const { blogs, meta } = await fetchBlogs({
    locale,
    page: Number(page) || 1,
    pageSize: PAGE_SIZE,
    filterBy: filterBy ?? "",
    search: search ?? "",
    exceptSlug: newestBlog?.slug,
  });

  return (
    <Suspense fallback={null}>
      <PageView
        category={postCategory.posts}
        newestBlog={newestBlog}
        blogs={blogs}
        meta={meta}
      />
    </Suspense>
  );
}
