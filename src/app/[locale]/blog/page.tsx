import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { PageView } from "@/components/sections/Blog";
import { fetchLatestBlog, fetchPostCategory } from "@/services/blog.service";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";
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
  const [postCategory, newestBlog] = await Promise.all([
    fetchPostCategory({ locale }),
    fetchLatestBlog(locale),
  ]);
  return (
    <Suspense fallback={null}>
      <PageView category={postCategory.posts} newestBlog={newestBlog} />
    </Suspense>
  );
}
