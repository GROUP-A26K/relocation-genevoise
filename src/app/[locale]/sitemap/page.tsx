import { getTranslations } from 'next-intl/server';

import { getPageAlternates } from '@/utils/seo';
import { PageView } from '@/components/sections/Sitemap';
import { fetchSitemapBlogs } from '@/features/blog/blog.service';
import { fetchSitemapProperties } from '@/features/property/property.service';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/sitemap'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Sitemap',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getPageAlternates(locale, '/sitemap'),
  };
}
export default async function Page(props: PageProps<'/[locale]/sitemap'>) {
  const { locale } = await props.params;

  const [posts, properties] = await Promise.all([
    fetchSitemapBlogs({ locale }),
    fetchSitemapProperties({ locale }),
  ]);

  return <PageView blogSitemap={posts} propertySitemap={properties} />;
}
