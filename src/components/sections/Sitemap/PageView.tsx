'use client';

import { useTranslations } from 'next-intl';

import { useScroll } from '@/hooks/useScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { RevealItem } from '@/components/customs/Reveal';
import { FormattedText } from '@/components/customs/Text';
import { ContentMenu } from '@/components/blocks/DynamicContent';
import {
  DESKTOP_MENU_OFFSET,
  MOBILE_MENU_OFFSET,
} from '@/components/blocks/DynamicContent/constants';

import { Content } from './Content';
import { PageContainer } from './PageContainer';

import type { Meta } from '@/models/Meta';
import type { BlogSitemap } from '@/models/BLog';
import type { PropertySitemap } from '@/models/Property';

export interface MenuItem {
  id?: string;
  url?: string;
  title: string;
  description?: string;
  items?: MenuItem[];
}
export interface NavbarProps {
  menu: MenuItem[];
}

const SECTION_IDS = ['general', 'services', 'blog', 'properties'];

export const PageView = ({
  blogSitemap,
  propertySitemap,
}: {
  blogSitemap: { blogs: BlogSitemap[]; meta: Meta };
  propertySitemap: { properties: PropertySitemap[]; meta: { total: number } };
}) => {
  const t = useTranslations('SiteMap');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { activeId, setActiveId } = useScroll(
    SECTION_IDS,
    isDesktop ? DESKTOP_MENU_OFFSET : MOBILE_MENU_OFFSET,
    { lockActiveDuringScroll: true }
  );

  const sitemap: NavbarProps = {
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
