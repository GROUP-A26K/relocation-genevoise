'use client';
import { PageContainer } from './PageContainer';
import { Content } from './Content';
import { useTranslations } from 'next-intl';
import { FormattedText } from '@/components/customs/Text';
export const PageView = () => {
  const t = useTranslations('LegalNotices');
  return (
    <PageContainer>
      <div className="flex flex-col lg:gap-6 gap-4 w-full lg:items-center text-left py-16">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-center text-secondary-600 !leading-[130%]">
            {t('heading')}
          </p>
          <h1 className="lg:text-5xl text-4xl font-bold text-center lg:!leading-[130%] !leading-[100%] text-pretty">
            <FormattedText text={t('subHeading')} />
          </h1>
        </div>
      </div>
      <Content
        section={[
          {
            title: t('sections.0.title'),
            content: [
              {
                paragraph: t('sections.0.content.0.paragraph'),
              },
            ],
          },
          {
            title: t('sections.1.title'),
            content: [
              {
                paragraph: t('sections.1.content.0.paragraph'),
              },
              {
                paragraph: t('sections.1.content.1.paragraph'),
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
                title: t('sections.4.content.0.title'),
                paragraph: t('sections.4.content.0.paragraph'),
              },
              {
                title: t('sections.4.content.1.title'),
                paragraph: t('sections.4.content.1.paragraph'),
              },
              {
                title: t('sections.4.content.2.title'),
                paragraph: t('sections.4.content.2.paragraph'),
              },
              {
                title: t('sections.4.content.3.title'),
                paragraph: t('sections.4.content.3.paragraph'),
              },
            ],
          },
          {
            title: t('sections.5.title'),
            content: [
              {
                paragraph: t('sections.5.content.0.paragraph'),
              },
            ],
          },
          {
            title: t('sections.6.title'),
            content: [
              {
                paragraph: t('sections.6.content.0.paragraph'),
              },
            ],
          },
          {
            title: t('sections.7.title'),
            content: [
              {
                paragraph: t('sections.7.content.0.paragraph'),
              },
            ],
          },
        ]}
      />
    </PageContainer>
  );
};
