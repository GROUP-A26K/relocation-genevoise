import { SubMenuLink } from "@/components/customs/SubMenuLink";
import { Card } from "@/components/sections/Navigation/Card";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu-custom";
import { Link } from "@/libs/i18nNavigation";
import { cn } from "@/libs/utils";
import { fetchBlogs } from "@/services/blog.service";

interface MenuItem {
  title: string;
  subtitle?: string;
  url: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items?: MenuItem[];
}
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
        className={cn(
          "text-muted-foreground",
          "focus:!bg-transparent focus:!text-black-500 focus:border-b-4 focus:!border-b-secondary-500"
        )}
      >
        <NavigationMenuTrigger
          className={cn(
            "group inline-flex h-[72px] w-max rounded-none items-center border-[3px] borer-t-[3px] border-transparent justify-center text-[16px] px-[8px] py-2 ml-0 text-black-500 font-bold leading-[150%]",
            "hover:text-accent-foreground hover:bg-transparent hover:!text-black-500 hover:border-b-[3px] hover:!border-b-secondary-500",
            "focus:!bg-transparent focus:!text-none  focus:!none",
            "active:!bg-transparent active:!text-black-500 active:!border-b-secondary-500",
            "data-[state=open]:hover:bg-transparent data-[state=open]:!text-black-500 data-[state=open]:!border-b-secondary-500"
          )}
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent
          className={cn(
            "!w-[100vw] !right-0 !justify-center !items-center !m-0"
          )}
        >
          <div className="flex justify-center w-full m-0">
            <div className="!w-full flex xl:flex-row flex-col 2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-xl md:max-w-screen-md  md:w-[300px] lg:w-[400px]  xl:px-[100px] lg:px-[48px] px-[50px]">
              {/* SubMenuLink */}

              <div className="w-full flex xl:p-6 xl:pl-0 p-6 pb-0 flex-col gap-3 pl-0">
                <p className="text-[12px] font-medium uppercase px-[12px] !leading-[130%]">
                  {item.subtitle}
                </p>

                <div className="grid gap-y-3 gap-x-[48px] xl:grid-cols-2 grid-cols-3">
                  {item.items.map((subItem) => (
                    <NavigationMenuLink
                      asChild
                      key={subItem.title}
                      className="flex"
                    >
                      <SubMenuLink {...subItem} variant="lg" />
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
              {/* Blog */}
              <div className="flex xl:p-6 xl:pr-0 p-6 pl-0 pr-0 flex-col gap-3 xl:border-l-[2px] xl:border-gray-50 border-0">
                <p className="text-[12px] px-[12px] font-medium uppercase">
                  Blog
                </p>
                <Card
                  title={blogs[0]?.title ?? "Blog Title'}"}
                  variant="lg"
                  summary={
                    blogs[0]?.description ??
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  }
                  image={
                    blogs[0]?.imageUrl ??
                    "https://shadcnblocks.com/images/block/placeholder-dark-1.svg"
                  }
                  url={blogs[0]?.href ?? "#"}
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
      <Link
        className={cn(
          "group inline-flex h-[72px] border-[3px] border-transparent w-max items-center justify-center bg-background px-[8px] py-2 !ml-0 text-[16px] text-black-500 font-bold transition-colors !leading-[150%]",
          "hover:text-accent-foreground hover:text-black-500 hover:border-b-[3px] hover:border-b-secondary-500"
        )}
        href={item.url}
      >
        {item.title}
      </Link>
    </li>
  );
};
