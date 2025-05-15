'use client';
import { List, ListItem } from '@/components/customs/Text';
import { NavbarProps } from './PageView';
import Link from 'next/link';

export const Content = ({ sitemap }: { sitemap: NavbarProps }) => {
  return (
    <div className="top-0 flex flex-col items-center justify-center">
      <div className="mx-auto w-full 2xl:max-w-[720px] xl:max-w-[620px] lg:max-w-[470px] max-w-[720px] gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 flex flex-col">
        {sitemap.menu.map((section) => (
          <div id={section.id} className="flex flex-col gap-4" key={section.id}>
            <h2 className="lg:text-2xl text-xl font-bold !leading-[130%]">
              {section.title}
            </h2>
            <List className="flex flex-col gap-4">
              {section.items &&
                section.items.map((item) => (
                  <ListItem dotColor="#50b370" key={item.title}>
                    <Link key={item.title} href={item.url ?? ''}>
                      {item.title}
                    </Link>
                    {item.items && (
                      <List className="flex flex-col gap-4 pt-4">
                        {item.items.map((subitem) => (
                          <ListItem key={subitem.title} dotColor="#50b370">
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
