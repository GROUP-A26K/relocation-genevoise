'use client';
import { PageContainer } from './PageContainer';
import { Content } from './Content';
import { useTranslations } from 'next-intl';
import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';

export const PageView = () => {
  const t = useTranslations('LegalPersonal');

  return (
    <PageContainer>
      <div className="flex flex-col lg:gap-6 gap-4 w-full lg:items-center text-left py-16">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-center text-secondary-600 !leading-[130%]">
            {t('heading')}
          </p>
          <h1 className="text-5xl font-bold text-center !leading-[130%]">
            {TextWithStrong(t('subHeading'))}
          </h1>
        </div>
      </div>
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
