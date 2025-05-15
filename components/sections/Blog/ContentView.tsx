'use client';
import { Pagination } from '@/components/blocks/Pagination';
import TabsMenu from '@/components/blocks/TabsMenu';
import { BlogCard } from '@/components/customs/Card';
import Input from '@/components/customs/Input';
import { FC, useCallback, useEffect, useState } from 'react';
import { ContentContainer } from './ContentContainer';
import { fetchBlogs, ParamsProps } from '@/services/blog.service';
import { BlogCategory } from '@/sanity/types';
import Section from '@/components/customs/Section';
import { BlogHero } from '@/components/blocks/Hero';
import { Blog } from '@/models/BLog';
import { Meta } from '@/models/Meta';
import { Spinner } from '@/components/customs/Spinner/Spinner';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
interface Props {
  category: BlogCategory[];
  newestBlog: Blog;
}

const initialParams = {
  page: 1,
  pageSize: 9,
  filterBy: '',
  locale: 'en',
  search: '',
};

export const ContentView: FC<Props> = (props) => {
  const t = useTranslations('Blog');

  const locale = useLocale();

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

  const [searchParams, setSearchParams] = useState<ParamsProps>({
    ...initialParams,
    locale: locale,
  });

  const setPage = (props: { page?: number; filterBy?: string }) => {
    setSearchParams((prev) => ({
      ...prev,
      ...props,
    }));
  };
  const [loading, setLoading] = useState(false);

  const loadNewsPost = useCallback(
    async (params: ParamsProps) => {
      setLoading(true);
      const { blogs, meta } = await fetchBlogs(params);

      const newData = {
        blogs,
        meta,
      };
      setData(newData);
      setLoading(false);
    },

    [data]
  );

  useEffect(() => {
    loadNewsPost({ ...searchParams });
  }, [searchParams]);

  return (
    <>
      <Section isDivider>
        <BlogHero
          heading={t('heading')}
          subHeading={t('subHeading')}
          description={t('description')}
          buttonText={t('buttonText')}
          post={props.newestBlog}
        />
      </Section>

      <ContentContainer>
        <div className="flex lg:flex-row flex-col items-center justify-between gap-8">
          <div className="lg:w-fit w-full px-auto overflow-y-auto">
            <TabsMenu
              category={props.category.map((cat) => {
                return { title: cat.name || 'Unknown Category' };
              })}
              activeValue={searchParams.filterBy}
              onClick={(filterBy: string) => setPage({ filterBy, page: 1 })}
            />
          </div>
          <Input
            as="search"
            type="search"
            placeholder="Search"
            value={searchParams.search}
            onChange={(e) => {
              setSearchParams({
                ...searchParams,
                search: (e.target as HTMLInputElement).value,
              });
            }}
            className="text-base h-10 lg:max-w-[280px] w-full flex items-center"
          />
        </div>
        <>
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
          </AnimatePresence>

          <h2 className="sr-only">Blog posts</h2>
          <AnimatePresence>
            {!loading && (
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
        </>

        <Pagination
          meta={data.meta}
          onClick={(page: number) => setPage({ page })}
        />
      </ContentContainer>
    </>
  );
};
