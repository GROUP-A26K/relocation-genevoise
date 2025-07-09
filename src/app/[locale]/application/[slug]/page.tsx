import { Metadata } from 'next';
import { PageView } from '@/components/sections/Application';
import { fetchJobDetailBySlug } from '@/services/career/career.service';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function Page(props: Props) {
  const { slug, locale } = await props.params;
  const jobDetail = await fetchJobDetailBySlug(slug, locale);
  if (!jobDetail) {
    notFound();
  }

  return <PageView jobDetail={jobDetail} />;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const jobDetail = await fetchJobDetailBySlug(slug, locale);

  if (!jobDetail) return {};

  return {
    title: jobDetail.title,
    description: jobDetail.excerpt,
    alternates: {
      canonical: `/${locale == 'fr' ? '' : locale}/${jobDetail.href}`,
    },
  };
}
