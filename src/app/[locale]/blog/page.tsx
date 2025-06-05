import { ContentView } from '@/components/sections/Blog';
import { fetchBlogs, fetchPostCategory } from '@/services/blog.service';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Blog',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale == 'fr' ? '' : locale}/blog`,
    },
  };
}
export default async function Page(props: Props) {
  const { locale } = await props.params;
  const portCategory = await fetchPostCategory();

  const newestBlog = await fetchBlogs({
    page: 1,
    pageSize: 1,
    filterBy: '',
    locale: locale,
    search: '',
  });

  return (
    <ContentView
      category={portCategory.posts}
      newestBlog={newestBlog.blogs[0]}
    />
  );
}
