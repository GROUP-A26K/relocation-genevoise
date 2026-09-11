import { getTranslations } from 'next-intl/server';

import { PageView } from '@/components/sections/Sitemap';
import { fetchSitemapBlogs } from '@/services/blog.service';
import { fetchSitemapProperties } from '@/services/property.service';

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
    alternates: {
      canonical: `/${locale == 'fr' ? '' : locale}/sitemap`,
    },
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
