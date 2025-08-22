import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Section from "@/components/customs/Section";
import { BlogList } from "@/components/blocks/Blog";
import { BlogDetailHero } from "@/components/blocks/Hero";
import { ContentView } from "@/components/sections/BlogDetail";
import { fetchBlogBySlug, fetchBlogs } from "@/services/blog.service";
import { Env } from "@/libs/Env";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export const dynamic = "force-dynamic";

export default async function Page(props: Props) {
  const { slug, locale } = await props.params;

  const t = await getTranslations({
    locale,
    namespace: "BlogDetail",
  });

  const blogDetail = await fetchBlogBySlug(slug, locale);

  if (!blogDetail) {
    notFound();
  }

  const { blogs } = await fetchBlogs({
    page: 1,
    pageSize: 3,
    locale: locale,
  });

  return (
    <>
      <Section>
        <BlogDetailHero {...blogDetail} />
      </Section>

      <ContentView tableOfContent={t("tableContent")} blog={blogDetail} />

      <Section>
        <BlogList
          blogs={blogs}
          heading={t("BlogList.heading")}
          subHeading={t("BlogList.subHeading")}
          description={t("BlogList.description")}
          buttonText={t("BlogList.buttonText")}
          buttonUrl={"/blog"}
        />
      </Section>
    </>
  );
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const blogDetail = await fetchBlogBySlug(slug, locale);

  if (!blogDetail) return {};

  const bloglUrl = `${Env.NEXT_PUBLIC_SITE_URL}/${locale === "fr" ? "" : locale}${blogDetail.href}`;

  return {
    title: blogDetail.title,
    description: blogDetail.description,
    openGraph: {
      type: "website",
      locale: "de-DE",
      siteName: "Relocation Genevoise",
      url: bloglUrl,
      images: [
        {
          url: blogDetail.imageUrl,
          width: 1200,
          height: 630,
          alt: blogDetail.title,
        },
      ],
    },

    twitter: {
      images: [
        {
          url: blogDetail.imageUrl,
          width: 1200,
          height: 630,
          alt: blogDetail.title,
        },
      ],
    },
    alternates: {
      canonical: `/${locale == "fr" ? "" : locale}/${blogDetail.href}`,
    },
  };
}
