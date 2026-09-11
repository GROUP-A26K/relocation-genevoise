import { getTranslations } from 'next-intl/server';

import { Faq } from '@/components/blocks/Faq';
import Section from '@/components/customs/Section';
import GroupAvatar from '@/assets/img/avt/group-avt-1.webp';
import { BookConsultation } from '@/components/blocks/Consultation';

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
      canonical: `/${locale == 'fr' ? '' : locale}/faq`,
    },
  };
}

export default async function Page() {
  const t = await getTranslations('FAQ');

  return (
    <Section revealTrigger="load">
      <h1 className="sr-only">{t('heading')}</h1>
      <Faq
        heading={t('heading')}
        subHeading={t('subHeading')}
        description={t('description')}
        faqs={[
          {
            question: t('faqs.0.question'),
            answer: t('faqs.0.answer'),
          },
          {
            question: t('faqs.1.question'),
            answer: t('faqs.1.answer'),
          },
          {
            question: t('faqs.2.question'),
            answer: t('faqs.2.answer'),
          },
          {
            question: t('faqs.3.question'),
            answer: t('faqs.3.answer'),
          },
          {
            question: t('faqs.4.question'),
            answer: t('faqs.4.answer'),
          },
          {
            question: t('faqs.5.question'),
            answer: t('faqs.5.answer'),
          },
        ]}
      />
      <BookConsultation
        subHeading={t('BookConsultation.subHeading')}
        description={t('BookConsultation.description')}
        buttonText1={t('BookConsultation.buttonText1')}
        imgSrc={GroupAvatar.src}
      />
    </Section>
  );
}
