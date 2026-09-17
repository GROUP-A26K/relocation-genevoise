'use client';
import { useTranslations } from 'next-intl';

import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import { FormattedText } from '@/components/common/Text';
import HeadingText from '@/components/common/Text/HeadingText';

import { Content } from './Content';
import { PageContainer } from './PageContainer';

export const PageView = () => {
  const t = useTranslations('LegalPersonal');

  return (
    <PageContainer>
      <RevealItem className="flex w-full flex-col gap-4 py-16 text-left lg:items-center lg:gap-6">
        <div className="flex flex-col gap-3">
          <BodyText
            variant="sm"
            className="text-center font-semibold text-secondary-600"
          >
            {t('heading')}
          </BodyText>
          <HeadingText
            as="h1"
            className="text-center text-4xl leading-[100%] text-pretty text-inherit lg:text-5xl lg:leading-[130%]"
          >
            <FormattedText text={t('subHeading')} />
          </HeadingText>
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
