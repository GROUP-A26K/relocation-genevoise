import { Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Faq } from '@/components/sections/Faq';
import Section from '@/components/common/Section';
import HeadingText from '@/components/common/Text/HeadingText';
import GroupAvatar from '@/assets/images/faq/advisors-group.webp';
import { getLocalizedPath, getPageAlternates } from '@/utils/seo';
import FaqJsonLd, { type TFaqItem } from '@/components/seo/FaqJsonLd';
import { BookConsultation } from '@/components/common/Consultation/BookConsultation';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/faq'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.FAQ',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getPageAlternates(locale, '/faq'),
  };
}

export default async function Page(props: PageProps<'/[locale]/faq'>) {
  const { locale } = await props.params;
  const t = await getTranslations('FAQ');

  const faqs = t.raw('faqs') as TFaqItem[];

  return (
    <>
      <FaqJsonLd
        items={faqs}
        locale={locale}
        path={getLocalizedPath(locale, '/faq')}
      />

      <Section revealTrigger="load">
        <HeadingText as="h1" className="sr-only">
          {t('heading')}
        </HeadingText>
        <Faq
          heading={t('heading')}
          subHeading={t('subHeading')}
          description={t('description')}
          faqs={faqs}
        />
        <BookConsultation
          subHeading={t('BookConsultation.subHeading')}
          description={t('BookConsultation.description')}
          buttonText1={t('BookConsultation.buttonText1')}
          buttonIcon={Phone}
          imgSrc={GroupAvatar}
          withSection={false}
          className="lg:py-12"
          contentClassName="max-w-none items-stretch"
          titleClassName="text-wrap lg:text-2xl"
          descriptionClassName="text-wrap"
        />
      </Section>
    </>
  );
}
