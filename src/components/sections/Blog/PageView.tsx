"use client";

import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useCallback, useEffect, useState } from "react";
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
import { fetchBlogs, ParamsProps } from "@/services/blog.service";

import { ContentContainer } from "./ContentContainer";

interface Props {
  category: BlogCategory[];
  newestBlog: Blog;
}

const initialParams = {
  page: 1,
  pageSize: 9,
  filterBy: "",
  locale: "en",
  search: "",
};

export const PageView: FC<Props> = (props) => {
  const t = useTranslations("Blog");
  const locale = useLocale();

  const [queryParams, setQueryParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(initialParams.page),
      filterBy: parseAsString.withDefault(initialParams.filterBy),
      search: parseAsString.withDefault(initialParams.search),
    },
    {
      shallow: false,
      scroll: false,
    }
  );

  const [debouncedSearch, search, setSearch] = useDebounce(
    queryParams.search,
    500
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setQueryParams({ search: value, page: 1 });
  };

  const [data, setData] = useState<{ blogs: Blog[]; meta: Meta }>({
    blogs: [],
    meta: {
      pagination: {
        page: 1,
        pageSize: 15,
        pageCount: 0,
        total: 0,
      },
    },
  });

  const [loading, setLoading] = useState(false);

  const searchParams: ParamsProps = {
    ...initialParams,
    locale,
    page: queryParams.page,
    filterBy: queryParams.filterBy,
    search: debouncedSearch,
  };

  const loadNewsPost = useCallback(async (params: ParamsProps) => {
    setLoading(true);
    const { blogs, meta } = await fetchBlogs(params);
    setData({ blogs, meta });
    setLoading(false);
  }, []);

  useEffect(() => {
    loadNewsPost(searchParams);
  }, [queryParams.page, queryParams.filterBy, debouncedSearch, loadNewsPost]);

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

      <ContentContainer>
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
            placeholder="Search"
            value={search}
            onChange={(e) =>
              handleSearchChange((e.target as HTMLInputElement).value)
            }
            className="text-base h-10 lg:max-w-[280px] w-full flex items-center"
          />
        </div>

        <AnimatePresence>
          {loading && (
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

          {!loading && data.blogs.length === 0 && (
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
          {!loading && data.blogs.length > 0 && (
            <motion.div
              key="blogList"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="py-12 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3 border-b border-grey-100"
            >
              {data.blogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && data.blogs.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key="pagination"
              className="flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Pagination
                meta={data.meta}
                onClick={(page: number) => setQueryParams({ page })}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </ContentContainer>
    </>
  );
};
