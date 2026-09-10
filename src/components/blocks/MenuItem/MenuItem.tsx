import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';
import { fetchBlogs } from '@/services/blog.service';
import { Card } from '@/components/sections/Navigation/Card';
import { SubMenuLink } from '@/components/customs/SubMenuLink';
import MotionNavItem from '@/components/sections/Navigation/MotionNavItem';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

interface MenuItem {
  title: string;
  subtitle?: string;
  url: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items?: MenuItem[];
}

const MENU_LINK_STYLE = cn(
  'ml-0! inline-flex h-[72px] w-max items-center justify-center rounded-none border-0 bg-transparent px-[8px] py-2 text-[16px] leading-[150%]! font-bold text-black-500 shadow-none transition-colors',
  'hover:bg-transparent hover:text-black-500 focus:bg-transparent focus:text-black-500 focus:outline-hidden',
  'active:bg-transparent active:text-black-500'
);

export const renderMenuItem = async (item: MenuItem, locale?: string) => {
  if (item.items) {
    const { blogs } = await fetchBlogs({
      page: 1,
      pageSize: 1,
      locale: locale,
    });
    return (
      <NavigationMenuItem
        key={item.title}
        value={item.title}
        className="text-muted-foreground"
      >
        <MotionNavItem itemKey={item.title}>
          <NavigationMenuTrigger
            className={cn(
              'group',
              MENU_LINK_STYLE,
              'data-[state=open]:bg-transparent data-[state=open]:text-black-500 data-[state=open]:hover:bg-transparent'
            )}
          >
            {item.title}
          </NavigationMenuTrigger>
        </MotionNavItem>
        <NavigationMenuContent
          className={cn(
            'right-0! m-0! w-screen! items-center! justify-center!'
          )}
        >
          <div className="m-0 flex w-full justify-center">
            <div className="flex w-full! flex-col px-[50px] md:w-[300px] md:max-w-(--breakpoint-md) lg:w-[400px] lg:max-w-(--breakpoint-xl) lg:px-[48px] xl:max-w-(--breakpoint-xl) xl:flex-row xl:px-[100px] 2xl:max-w-(--breakpoint-2xl)">
              {/* SubMenuLink */}

              <div className="flex w-full flex-col gap-3 p-6 pb-0 pl-0 xl:p-6 xl:pl-0">
                <p className="px-[12px] text-subtle leading-[130%]! font-medium uppercase">
                  {item.subtitle}
                </p>

                <div className="grid grid-cols-3 gap-x-[48px] gap-y-3 xl:grid-cols-2">
                  {item.items.map((subItem) => (
                    <Link href={subItem.url} key={subItem.title}>
                      <NavigationMenuLink asChild className="flex">
                        <SubMenuLink {...subItem} variant="lg" />
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </div>
              </div>
              {/* Blog */}
              <div className="flex flex-col gap-3 border-0 p-6 pr-0 pl-0 xl:border-l-2 xl:border-gray-50 xl:p-6 xl:pr-0">
                <p className="px-[12px] text-subtle font-medium uppercase">
                  Blog
                </p>
                <Card
                  title={blogs[0]?.title ?? 'Our Latest Blog'}
                  variant="lg"
                  summary={
                    blogs[0]?.description ??
                    'Discover the latest insights and updates from our blog.'
                  }
                  image={
                    blogs[0]?.imageUrl ??
                    'https://shadcnblocks.com/images/block/placeholder-dark-1.svg'
                  }
                  url={blogs[0]?.href ?? '#'}
                />
              </div>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <li key={item.title}>
      <MotionNavItem itemKey={item.title}>
        <Link className={cn('group', MENU_LINK_STYLE)} href={item.url}>
          {item.title}
        </Link>
      </MotionNavItem>
    </li>
  );
};
