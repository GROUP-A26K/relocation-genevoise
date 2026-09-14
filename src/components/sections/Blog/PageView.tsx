'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useDebounceValue } from 'usehooks-ts';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { parseAsString, parseAsInteger, useQueryStates } from 'nuqs';

import Show from '@/components/customs/Show';
import Input from '@/components/customs/Input';
import Section from '@/components/customs/Section';
import TabsMenu from '@/components/blocks/TabsMenu';
import { BlogHero } from '@/components/blocks/Hero';
import { BlogCard } from '@/components/customs/Card';
import EmptyData from '@/components/customs/EmptyData';
import { RevealItem } from '@/components/customs/Reveal';
import { Pagination } from '@/components/blocks/Pagination';
import useScrollIntoViewOnChange from '@/hooks/useScrollIntoViewOnChange';
import {
  useBlogCategories,
  useBlogList,
  useLatestBlog,
} from '@/features/blog/blog.hooks';

import { BlogListSkeleton } from './BlogListSkeleton';

import type { Blog } from '@/models/BLog';
import type { Meta } from '@/models/Meta';
import type { BlogCategory } from '@/sanity/types';

interface IPageViewProps {
  category: BlogCategory[];
  newestBlog: Blog | null;
  blogs: Blog[];
  meta: Meta;
}

export const PageView: React.FC<IPageViewProps> = (props) => {
  const t = useTranslations('Blog');

  const [queryParams, setQueryParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      filterBy: parseAsString.withDefault(''),
      search: parseAsString.withDefault(''),
    },
    { shallow: true, scroll: false }
  );

  const locale = useLocale();
  const pathname = usePathname();
  const searchPlaceholder = locale === 'fr' ? 'Rechercher' : 'Search';

  const [search, setSearch] = useState(queryParams.search);
  const [debouncedSearch] = useDebounceValue(search, 500);

  const lastPushedSearch = useRef(queryParams.search);

  useEffect(() => {
    setSearch(queryParams.search);
    lastPushedSearch.current = queryParams.search;
  }, [queryParams.search]);

  useEffect(() => {
    if (debouncedSearch === lastPushedSearch.current) {
      return;
    }

    lastPushedSearch.current = debouncedSearch;
    void setQueryParams({ search: debouncedSearch, page: 1 });
  }, [debouncedSearch, setQueryParams]);

  const filters = {
    locale,
    page: queryParams.page,
    pageSize: 9,
    filterBy: queryParams.filterBy,
    search: queryParams.search,
    exceptSlug: props.newestBlog?.slug,
  };
  const listQuery = useBlogList(filters);
  const categoryQuery = useBlogCategories(locale);
  const latestQuery = useLatestBlog(locale);
  const blogs = listQuery.data?.blogs ?? props.blogs;
  const meta = listQuery.data?.meta ?? props.meta;
  const category = categoryQuery.data?.posts ?? props.category;
  const newestBlog = latestQuery.data ?? props.newestBlog;
  const loading = listQuery.isPending || listQuery.isPlaceholderData;

  const listTopRef = useScrollIntoViewOnChange<HTMLDivElement>(
    `${queryParams.page}|${queryParams.filterBy}|${queryParams.search}`
  );

  return (
    <>
      <Section isDivider revealTrigger="load">
        <Show when={newestBlog}>
          {(blog) => (
            <BlogHero
              heading={t('heading')}
              subHeading={t('subHeading')}
              description={t('description')}
              buttonText={t('buttonText')}
              blog={blog}
            />
          )}
        </Show>
      </Section>

      <Section childrenProps={{ className: 'xl:gap-12' }}>
        <RevealItem
          ref={listTopRef}
          className="flex scroll-mt-26 flex-col items-center justify-between gap-8 lg:flex-row"
        >
          <div className="px-auto w-full overflow-y-auto lg:w-fit">
            <TabsMenu
              category={category.map((cat) => ({
                title: cat.name || 'Unknown Category',
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
            className="flex h-10 w-full items-center text-base lg:max-w-70"
          />
        </RevealItem>

        <h2 className="sr-only">Blog posts</h2>

        <Show when={!loading} fallback={<BlogListSkeleton />}>
          <Show
            when={blogs.length > 0}
            fallback={
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <EmptyData
                  title={t('emptyData.title')}
                  description={t('emptyData.description')}
                />
              </motion.div>
            }
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
            >
              {blogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </motion.div>

            <Show when={meta.pagination.pageCount > 1}>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Pagination
                  meta={meta}
                  className="xl:pt-4"
                  onClick={(page: number) => setQueryParams({ page })}
                  getPageHref={(page) => {
                    const params = new URLSearchParams();
                    if (page > 1) params.set('page', String(page));
                    if (queryParams.filterBy)
                      params.set('filterBy', queryParams.filterBy);
                    if (queryParams.search)
                      params.set('search', queryParams.search);
                    const query = params.toString();
                    return `${pathname}${query ? `?${query}` : ''}`;
                  }}
                />
              </motion.div>
            </Show>
          </Show>
        </Show>
      </Section>
    </>
  );
};
