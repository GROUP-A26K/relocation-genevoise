import { PageView } from '@/components/sections/Sitemap';
import { fetchSitemapBlogs } from '@/services/blog.service';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Sitemap',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale == 'fr' ? '' : locale}/sitemap`,
    },
  };
}
export default async function Page(props: Props) {
  const { locale } = await props.params;
  // Fetch data if needed
  const posts = await fetchSitemapBlogs({
    locale: locale,
  });
  return <PageView blogSitemap={posts} />;
}
