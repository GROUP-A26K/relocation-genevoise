"use client";

import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useRef, useTransition } from "react";
import { parseAsString, parseAsInteger, useQueryStates } from "nuqs";

import { Blog } from "@/models/BLog";
import { Meta } from "@/models/Meta";
import { BlogCategory } from "@/sanity/types";
import useDebounce from "@/hooks/useDebounce";
import Input from "@/components/customs/Input";
import Section from "@/components/customs/Section";
import TabsMenu from "@/components/blocks/TabsMenu";
import { BlogHero } from "@/components/blocks/Hero";
import { BlogCard } from "@/components/customs/Card";
import EmptyData from "@/components/customs/EmptyData";
import { Pagination } from "@/components/blocks/Pagination";
import { Spinner } from "@/components/customs/Spinner/Spinner";

interface Props {
  category: BlogCategory[];
  newestBlog: Blog | null;
  blogs: Blog[];
  meta: Meta;
}

export const PageView: FC<Props> = (props) => {
  const t = useTranslations("Blog");
  const [isPending, startTransition] = useTransition();

  const [queryParams, setQueryParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      filterBy: parseAsString.withDefault(""),
      search: parseAsString.withDefault(""),
    },
    {
      shallow: false,
      scroll: false,
      startTransition,
    },
  );

  const locale = useLocale();
  const searchPlaceholder = locale === "fr" ? "Rechercher" : "Search";

  const [debouncedSearch, search, setSearch] = useDebounce(
    queryParams.search,
    500,
  );

  const lastPushedSearch = useRef(queryParams.search);

  useEffect(() => {
    if (debouncedSearch === lastPushedSearch.current) {
      return;
    }

    lastPushedSearch.current = debouncedSearch;
    setQueryParams({ search: debouncedSearch, page: 1 });
  }, [debouncedSearch, setQueryParams]);

  const showEmpty = !isPending && props.blogs.length === 0;
  const showList = !isPending && props.blogs.length > 0;

  return (
    <>
      <Section isDivider>
        {props.newestBlog && (
          <BlogHero
            heading={t("heading")}
            subHeading={t("subHeading")}
            description={t("description")}
            buttonText={t("buttonText")}
            blog={props.newestBlog}
          />
        )}
      </Section>

      <Section childrenProps={{ className: "xl:gap-12" }}>
        <div className="flex lg:flex-row flex-col items-center justify-between gap-8">
          <div className="lg:w-fit w-full px-auto overflow-y-auto">
            <TabsMenu
              category={props.category.map((cat) => ({
                title: cat.name || "Unknown Category",
              }))}
              activeValue={queryParams.filterBy}
              onClick={(filterBy: string) =>
                setQueryParams({ filterBy, page: 1 })
              }
            />
          </div>
          <Input
            as="search"
            type="search"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
            className="text-base h-10 lg:max-w-[280px] w-full flex items-center"
          />
        </div>

        <AnimatePresence>
          {isPending && (
            <motion.div
              key="spinner"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Spinner />
            </motion.div>
          )}

          {showEmpty && (
            <motion.div
              key="noBlogs"
              className="flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyData
                title={t("emptyData.title")}
                description={t("emptyData.description")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <h2 className="sr-only">Blog posts</h2>

        <AnimatePresence>
          {showList && (
            <motion.div
              key="blogList"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
              {props.blogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {showList && (
          <AnimatePresence mode="wait">
            <motion.div
              key="pagination"
              className="flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Pagination
                meta={props.meta}
                onClick={(page: number) => setQueryParams({ page })}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </Section>
    </>
  );
};
