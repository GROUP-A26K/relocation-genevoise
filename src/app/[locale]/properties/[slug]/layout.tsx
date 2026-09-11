import { SITE_NAME } from '@/constants/seo';
import { getLocalizedPath, getOgLocale } from '@/utils/seo';
import { ScrollToTop } from '@/components/customs/ScrollToTop';
import { getPropertyDetail } from '@/services/property.service';

import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const property = await getPropertyDetail(slug, locale);

  if (!property) {
    return {};
  }

  const canonical = getLocalizedPath(locale, 'properties', slug);
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
    alternates: {
      canonical,
    },
  };
}

export default function PropertyDetailLayout({ children }: Props) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}
