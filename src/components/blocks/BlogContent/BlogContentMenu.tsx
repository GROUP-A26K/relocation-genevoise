import { cn } from '@/libs/utils';
import { FC } from 'react';

interface Props {
  title?: string;
  activeId: string;
  setActiveId: (id: string) => void;
  menuItems: { id: string; title: string }[];
  isTableContent?: boolean;
}
export const BlogContentMenu: FC<Props> = (props) => {
  return (
    <div className="flex flex-col gap-4 w-fit">
      {props?.isTableContent && (
        <div className="flex lg:text-xl text-base text-black-500 font-semibold !leading-[130%]">
          {props.title && props.title}
        </div>
      )}
      <ul className="menu flex flex-col gap-3 2xl:max-w-[228px] xl:max-w-[200px] lg:max-w-[160px] w-full">
        {props.menuItems.map((item) => (
          <li key={`menu-item-${item.id}`} className="menu-item flex">
            <a
              href={`#${item.id}`}
              title={item.title}
              onClick={() => props.setActiveId(item.id)}
              className={cn(
                'menu-link text-base text-black-200 font-semibold !leading-[130%] line-clamp-2 text-wrap',
                item.id === props.activeId && 'text-primary-500'
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
