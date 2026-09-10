'use client';
import { Link } from '@/libs/i18nNavigation';
import { List, ListItem } from '@/components/customs/Text';

import type { NavbarProps } from './PageView';

export const Content = ({ sitemap }: { sitemap: NavbarProps }) => {
  return (
    <div className="top-0 flex flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-x-8 gap-y-8 lg:mx-0 lg:max-w-[470px] lg:grid-cols-3 xl:max-w-[620px] 2xl:max-w-[720px]">
        {sitemap.menu.map((section) => (
          <div id={section.id} className="flex flex-col gap-4" key={section.id}>
            <h2 className="text-xl leading-[130%]! font-bold lg:text-2xl">
              {section.title}
            </h2>
            <List className="flex flex-col gap-4">
              {section.items &&
                section.items.map((item) => (
                  <ListItem dotColor="#F7D913" key={item.title}>
                    <Link key={item.title} href={item.url ?? ''}>
                      {item.title}
                    </Link>
                    {item.items && (
                      <List className="flex flex-col gap-4 pt-4">
                        {item.items.map((subitem) => (
                          <ListItem key={subitem.title} dotColor="#F7D913">
                            <Link key={subitem.title} href={subitem.url ?? ''}>
                              {subitem.title}
                            </Link>
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </ListItem>
                ))}
            </List>
          </div>
        ))}
      </div>
    </div>
  );
};
