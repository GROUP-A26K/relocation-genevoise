'use client';
import { useTranslations } from 'next-intl';

import { RevealItem } from '@/components/customs/Reveal';
import { FormattedText } from '@/components/customs/Text';

import { Content } from './Content';
import { PageContainer } from './PageContainer';

export const PageView = () => {
  const t = useTranslations('LegalPersonal');

  return (
    <PageContainer>
      <RevealItem className="flex w-full flex-col gap-4 py-16 text-left lg:items-center lg:gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-center text-sm leading-[130%]! font-semibold text-secondary-600">
            {t('heading')}
          </p>
          <h1 className="text-center text-4xl leading-[100%]! font-bold text-pretty lg:text-5xl lg:leading-[130%]!">
            <FormattedText text={t('subHeading')} />
          </h1>
        </div>
      </RevealItem>
      <Content
        section={[
          {
            content: [
              {
                paragraph: t('sections.0.content.0.paragraph'),
              },
              {
                paragraph: t('sections.0.content.1.paragraph'),
              },
            ],
          },
          {
            title: t('sections.1.title'),
            content: [
              {
                paragraph: t('sections.1.content.0.paragraph'),
              },
            ],
          },
          {
            title: t('sections.2.title'),
            content: [
              {
                paragraph: t('sections.2.content.0.paragraph'),
              },
            ],
          },
          {
            title: t('sections.3.title'),
            content: [
              {
                paragraph: t('sections.3.content.0.paragraph'),
              },
            ],
          },
          {
            title: t('sections.4.title'),
            content: [
              {
                paragraph: t('sections.4.content.0.paragraph'),
              },
            ],
          },
          {
            title: t('sections.5.title'),
            content: [
              {
                paragraph: t('sections.5.content.0.paragraph'),
              },
              {
                paragraph: t('sections.5.content.1.paragraph'),
              },
              {
                paragraph: t('sections.5.content.2.paragraph'),
              },
            ],
          },
        ]}
      />
    </PageContainer>
  );
};
