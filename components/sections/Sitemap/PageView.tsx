'use client';

import { PageContainer } from './PageContainer';
import { Content } from './Content';
import { BlogContentMenu } from '@/components/blocks/BlogContent';
import { useScrollspy } from '@/hooks/useScrollspy';
import { cn } from '@/libs/utils';
import { useTranslations } from 'next-intl';
import { BlogSitemap } from '@/models/BLog';
import { Meta } from '@/models/Meta';

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

export const PageView = ({
  blogSitemap,
}: {
  blogSitemap: { blogs: BlogSitemap[]; meta: Meta };
}) => {
  const t = useTranslations('SiteMap');
  const { activeId, setActiveId } = useScrollspy([
    'general',
    'professional',
    'particular',
    'blog',
  ]);

  const sitemap: NavbarProps = {
    menu: [
      {
        title: t('sections.0.title'),
        id: 'general',
        items: [
          { title: t('sections.0.items.0.title'), url: '/' },
          { title: t('sections.0.items.1.title'), url: '/contact' },
          { title: t('sections.0.items.2.title'), url: '/assistance' },
          { title: t('sections.0.items.3.title'), url: '/rappelez-moi' },
          { title: t('sections.0.items.4.title'), url: '/blog' },
          { title: t('sections.0.items.5.title'), url: '/mentions-legales' },
          { title: t('sections.0.items.6.title'), url: '/donnes-personnelles' },
        ],
      },
      {
        title: t('sections.1.title'),
        id: 'professional',
        items: [
          {
            title: t('sections.1.items.0.title'),
            url: '/professionnel/entreprise',
            items: [
              {
                title: t('sections.1.items.0.items.0.title'),
                url: '/professionnel/entreprise/rc-professionnelle',
              },
              {
                title: t('sections.1.items.0.items.1.title'),
                url: '/professionnel/entreprise/assurance-perte-gain',
              },
              {
                title: t('sections.1.items.0.items.2.title'),
                url: '/professionnel/entreprise/assurance-accident-laa',
              },
              {
                title: t('sections.1.items.0.items.3.title'),
                url: '/professionnel/entreprise/prevoyance-professionnelle-lpp',
              },
              {
                title: t('sections.1.items.0.items.4.title'),
                url: '/professionnel/entreprise/protection-juridique',
              },
              {
                title: t('sections.1.items.0.items.5.title'),
                url: '/professionnel/entreprise/cautions-garanties',
              },
              {
                title: t('sections.1.items.0.items.6.title'),
                url: '/professionnel/entreprise/assurance-perte-exploitation',
              },
              {
                title: t('sections.1.items.0.items.7.title'),
                url: '/professionnel/entreprise/assurance-homme-cle',
              },
              {
                title: t('sections.1.items.0.items.8.title'),
                url: '/professionnel/entreprise/assurance-cyber',
              },
            ],
          },
          { title: t('sections.1.items.1.title'), url: 'international' },
          { title: t('sections.1.items.2.title'), url: '#' },
        ],
      },
      {
        title: t('sections.2.title'),
        id: 'particular',
        items: [
          {
            title: t('sections.2.items.0.title'),
            url: '/particulier/assurance',
            items: [
              {
                title: t('sections.2.items.0.items.0.title'),
                url: '/particulier/assurance/assurance-choses-et-patrimoine',
              },
              {
                title: t('sections.2.items.0.items.1.title'),
                url: '/particulier/assurance/assurance-rc-menage',
              },
              {
                title: t('sections.2.items.0.items.2.title'),
                url: '/particulier/assurance/assurance-animaux',
              },
              {
                title: t('sections.2.items.0.items.3.title'),
                url: '/particulier/assurance/assurance-vehicule',
              },
              {
                title: t('sections.2.items.0.items.4.title'),
                url: '/particulier/assurance/assurance-protection-juridique',
              },
              {
                title: t('sections.2.items.0.items.5.title'),
                url: '/particulier/assurance/assurance-employe-maison',
              },
              {
                title: t('sections.2.items.0.items.6.title'),
                url: '/particulier/assurance/assurance-voyage',
              },
              {
                title: t('sections.2.items.0.items.7.title'),
                url: '/particulier/assurance/assurance-rc-immeuble',
              },
              {
                title: t('sections.2.items.0.items.8.title'),
                url: '/particulier/assurance/assurance-frontalier',
              },
              {
                title: t('sections.2.items.0.items.9.title'),
                url: '/particulier/assurance/assurance-prevoyance',
              },
              {
                title: t('sections.2.items.0.items.10.title'),
                url: '/particulier/assurance/assurance-vie',
              },
              {
                title: t('sections.2.items.0.items.11.title'),
                url: '/particulier/assurance/assurance-libre-passage',
              },
            ],
          },
          { title: t('sections.2.items.1.title'), url: '#' },
          { title: t('sections.2.items.2.title'), url: '#' },
          { title: t('sections.2.items.3.title'), url: '#' },
          { title: t('sections.2.items.4.title'), url: '#' },
          { title: t('sections.2.items.5.title'), url: '#' },
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
    ],
  };

  return (
    <PageContainer>
      <div className="flex flex-col lg:gap-6 gap-4 w-full lg:items-center text-left py-16">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-center text-primary-500 !leading-[130%]">
            {t('heading')}
          </p>
          <h1 className="text-5xl font-semibold text-center !leading-[130%]">
            {t('subHeading')}
          </h1>
        </div>
      </div>

      <div
        className={cn(
          'lg:sticky lg:top-8 lg:h-0 h-fit relative lg:pb-0 pb-12',
          activeId == 'blog' && '!h-fit !pb-20'
        )}
      >
        <BlogContentMenu
          setActiveId={setActiveId}
          activeId={activeId}
          menuItems={sitemap.menu.filter(
            (item): item is { id: string; title: string } => !!item.id
          )}
        />
      </div>

      <Content sitemap={sitemap} />
    </PageContainer>
  );
};
