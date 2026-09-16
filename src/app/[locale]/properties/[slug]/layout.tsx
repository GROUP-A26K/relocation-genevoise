import { SITE_NAME } from '@/constants/seo';
import { getOgLocale, getPageAlternates, getSlugByLocale } from '@/utils/seo';
import {
  fetchPropertySlugBySlug,
  getPropertyDetail,
} from '@/features/property/property.service';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: LayoutProps<'/[locale]/properties/[slug]'>
): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const property = await getPropertyDetail(slug, locale);

  if (!property) {
    return {};
  }

  const translations = await fetchPropertySlugBySlug(property.slug.current);
  const alternates = getPageAlternates(
    locale,
    '/properties/[slug]',
    getSlugByLocale(locale, slug, translations)
  );
  const { canonical } = alternates;
  const imageUrl = property.areas[0]?.mainImageUrl;
  const images = imageUrl ? [{ url: imageUrl, alt: property.title }] : [];

  return {
    title: property.title,
    description:
      property.description.length > 160
        ? `${property.description.substring(0, 157)}...`
        : property.description,
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      siteName: SITE_NAME,
      url: canonical,
      images,
    },
    twitter: {
      images,
    },
    alternates,
  };
}

export default function PropertyDetailLayout({
  children,
}: React.PropsWithChildren) {
  return children;
}
