'use client';

import { useTranslations } from 'next-intl';

import { useScroll } from '@/hooks/useScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { RevealItem } from '@/components/common/Reveal';
import { FormattedText } from '@/components/common/Text';
import { ContentMenu } from '@/components/common/ContentMenu';
import {
  DESKTOP_MENU_OFFSET,
  MOBILE_MENU_OFFSET,
} from '@/components/common/ContentMenu/constants';

import { Content } from './Content';
import { PageContainer } from './PageContainer';

import type { IMeta } from '@/models/meta';
import type { IBlogSitemap } from '@/models/blog';
import type { THref } from '@/libs/i18nNavigation';
import type { IPropertySitemap } from '@/models/property';

export type TSitemapMenuItem = {
  id?: string;
  url?: THref;
  title: string;
  description?: string;
  items?: TSitemapMenuItem[];
};
export type TSitemap = {
  menu: TSitemapMenuItem[];
};

const SECTION_IDS = ['general', 'services', 'blog', 'properties'];

interface IPageViewProps {
  blogSitemap: { blogs: IBlogSitemap[]; meta: IMeta };
  propertySitemap: { properties: IPropertySitemap[]; meta: { total: number } };
}

export const PageView = ({ blogSitemap, propertySitemap }: IPageViewProps) => {
  const t = useTranslations('SiteMap');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { activeId, setActiveId } = useScroll(
    SECTION_IDS,
    isDesktop ? DESKTOP_MENU_OFFSET : MOBILE_MENU_OFFSET,
    { lockActiveDuringScroll: true }
  );

  const sitemap: TSitemap = {
    menu: [
      {
        title: t('sections.0.title'),
        id: 'general',
        items: [
          { title: t('sections.0.items.0.title'), url: '/' },
          { title: t('sections.0.items.1.title'), url: '/contact' },
          { title: t('sections.0.items.2.title'), url: '/find-accommodation' },
          {
            title: t('sections.0.items.3.title'),
            url: '/find-a-tenant/landlords',
          },
          { title: t('sections.0.items.4.title'), url: '/companies' },
          { title: t('sections.0.items.5.title'), url: '/call-me-back' },
          { title: t('sections.0.items.6.title'), url: '/blog' },
          { title: t('sections.0.items.7.title'), url: '/faq' },
          { title: t('sections.0.items.8.title'), url: '/properties' },
          { title: t('sections.0.items.9.title'), url: '/legal-notice' },
          { title: t('sections.0.items.10.title'), url: '/personal-data' },
        ],
      },
      {
        title: t('sections.1.title'),
        id: 'services',
        items: [
          {
            title: t('sections.1.items.0.title'),
            url: '/services/academic',
          },
          {
            title: t('sections.1.items.1.title'),
            url: '/services/concierge-service',
          },
          {
            title: t('sections.1.items.2.title'),
            url: '/services/discover-geneva',
          },
        ],
      },
      {
        title: 'Blog',
        id: 'blog',
        items: [
          ...blogSitemap.blogs.map((item) => ({
            title: item.title,
            url: item.href,
          })),
        ],
      },
      {
        title: 'Properties',
        id: 'properties',
        items: [
          ...propertySitemap.properties.map((item) => ({
            title: item.title,
            url: item.href,
          })),
        ],
      },
    ],
  };

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

      <div className="flex flex-col gap-8 lg:flex-row">
        <ContentMenu
          className="xl:w-[228px]"
          setActiveId={setActiveId}
          activeId={activeId}
          menuItems={sitemap.menu.filter(
            (item): item is { id: string; title: string } => !!item.id
          )}
        />

        <Content sitemap={sitemap} />
      </div>
    </PageContainer>
  );
};
