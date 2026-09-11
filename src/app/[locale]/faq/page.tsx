import { getTranslations } from 'next-intl/server';

import { Faq } from '@/components/blocks/Faq';
import { getLocalizedPath } from '@/utils/seo';
import Section from '@/components/customs/Section';
import GroupAvatar from '@/assets/img/avt/group-avt-1.webp';
import { BookConsultation } from '@/components/blocks/Consultation';
import FaqJsonLd, { type TFaqItem } from '@/components/seo/FaqJsonLd';

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
    alternates: {
      canonical: getLocalizedPath(locale, 'faq'),
    },
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
        path={getLocalizedPath(locale, 'faq')}
      />

      <Section revealTrigger="load">
        <h1 className="sr-only">{t('heading')}</h1>
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
          imgSrc={GroupAvatar.src}
        />
      </Section>
    </>
  );
}
