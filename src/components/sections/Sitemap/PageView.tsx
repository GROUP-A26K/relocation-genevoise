"use client";

import { PageContainer } from "./PageContainer";
import { Content } from "./Content";
import { BlogContentMenu } from "@/components/blocks/BlogContent";
import { useScrollspy } from "@/hooks/useScrollspy";
import { cn } from "@/libs/utils";
import { useTranslations } from "next-intl";
import { BlogSitemap } from "@/models/BLog";
import { Meta } from "@/models/Meta";
import { FormattedText } from "@/components/customs/Text";

export interface MenuItem {
  id?: string;
  url?: string;
  title: string;
  description?: string;
  items?: MenuItem[];
}
export interface NavbarProps {
  menu: MenuItem[];
}

export const PageView = ({
  blogSitemap,
}: {
  blogSitemap: { blogs: BlogSitemap[]; meta: Meta };
}) => {
  const t = useTranslations("SiteMap");
  const { activeId, setActiveId } = useScrollspy([
    "general",
    "services",
    "blog",
  ]);

  const sitemap: NavbarProps = {
    menu: [
      {
        title: t("sections.0.title"),
        id: "general",
        items: [
          { title: t("sections.0.items.0.title"), url: "/" },
          { title: t("sections.0.items.1.title"), url: "/contact" },
          { title: t("sections.0.items.2.title"), url: "/find-accommodation" },
          { title: t("sections.0.items.3.title"), url: "/find-a-tenant" },
          { title: t("sections.0.items.4.title"), url: "/companies" },
          { title: t("sections.0.items.5.title"), url: "/call-me-back" },
          { title: t("sections.0.items.6.title"), url: "/blog" },
          { title: t("sections.0.items.7.title"), url: "/faq" },
          { title: t("sections.0.items.8.title"), url: "/legal-notice" },
          { title: t("sections.0.items.9.title"), url: "/personal-data" },
        ],
      },
      {
        title: t("sections.1.title"),
        id: "services",
        items: [
          {
            title: t("sections.1.items.0.title"),
            url: "/services/academic",
          },
          {
            title: t("sections.1.items.1.title"),
            url: "/services/concierge-service",
          },
          {
            title: t("sections.1.items.2.title"),
            url: "/services/discover-geneva",
          },
        ],
      },
      {
        title: "Blog",
        id: "blog",
        items: [
          ...blogSitemap.blogs.map((item) => ({
            title: item.title,
            url: item.href,
          })),
        ],
      },
    ],
  };

  return (
    <PageContainer>
      <div className="flex flex-col lg:gap-6 gap-4 w-full lg:items-center text-left py-16">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-center text-secondary-600 !leading-[130%]">
            {t("heading")}
          </p>
          <h1 className="lg:text-5xl text-4xl font-bold text-center lg:!leading-[130%] !leading-[100%] text-pretty">
            <FormattedText text={t("subHeading")} />
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div
          className={cn(
            "lg:!sticky lg:!top-8 h-fit relative w-full lg:max-w-[228px]"
          )}
        >
          <BlogContentMenu
            setActiveId={setActiveId}
            activeId={activeId}
            menuItems={sitemap.menu.filter(
              (item): item is { id: string; title: string } => !!item.id
            )}
          />
        </div>

        <Content sitemap={sitemap} />
      </div>
    </PageContainer>
  );
};
