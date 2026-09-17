'use client';
import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';
import { RevealItem } from '@/components/common/Reveal';
import { List, ListItem } from '@/components/common/Text';
import HeadingText from '@/components/common/Text/HeadingText';
import { bodyTextVariants } from '@/components/common/Text/BodyText';
import { ANCHOR_SCROLL_MARGIN } from '@/components/common/ContentMenu/constants';

import type { TSitemap } from './PageView';

interface IContentProps {
  sitemap: TSitemap;
}

export const Content = ({ sitemap }: IContentProps) => {
  return (
    <div className="top-0 flex flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-x-8 gap-y-8 lg:mx-0 lg:max-w-[470px] lg:grid-cols-3 xl:max-w-[620px] 2xl:max-w-[720px]">
        {sitemap.menu.map((section) => (
          <RevealItem
            id={section.id}
            className={cn('flex flex-col gap-4', ANCHOR_SCROLL_MARGIN)}
            key={section.id}
          >
            <HeadingText as="h2" className="text-xl text-inherit lg:text-2xl">
              {section.title}
            </HeadingText>
            <List className="flex flex-col gap-4">
              {section.items &&
                section.items.map((item) => (
                  <ListItem dotColor="#F7D913" key={item.title}>
                    {item.url && (
                      <Link
                        key={item.title}
                        href={item.url}
                        className={cn(
                          bodyTextVariants(),
                          'text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit',
                          ''
                        )}
                      >
                        {item.title}
                      </Link>
                    )}
                    {item.items && (
                      <List className="flex flex-col gap-4 pt-4">
                        {item.items.map((subitem) => (
                          <ListItem key={subitem.title} dotColor="#F7D913">
                            {subitem.url && (
                              <Link
                                key={subitem.title}
                                href={subitem.url}
                                className={cn(
                                  bodyTextVariants(),
                                  'text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit',
                                  ''
                                )}
                              >
                                {subitem.title}
                              </Link>
                            )}
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </ListItem>
                ))}
            </List>
          </RevealItem>
        ))}
      </div>
    </div>
  );
};
