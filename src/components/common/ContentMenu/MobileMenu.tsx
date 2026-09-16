'use client';

import { useReducedMotion } from 'motion/react';

import { cn } from '@/libs/utils';
import { useIsStuck } from '@/hooks/useIsStuck';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { HEADER_HEIGHT } from './constants';
import { scrollToContent } from './scrollToContent';

import type { IContentMenuProps } from './types';

const MobileMenu: React.FC<IContentMenuProps> = ({
  activeId,
  setActiveId,
  menuItems,
  title,
}) => {
  const { ref, isStuck } = useIsStuck(HEADER_HEIGHT);
  const shouldReduceMotion = useReducedMotion();

  if (menuItems.length === 0) return null;

  const activeItem =
    menuItems.find((item) => item.id === activeId) ?? menuItems[0];

  const handleValueChange = (id: string) => {
    setActiveId(id);
    scrollToContent(id, !!shouldReduceMotion);
  };

  return (
    <div
      data-content-menu="mobile"
      ref={ref}
      className={cn(
        'sticky top-18 z-30 -mx-4 w-[calc(100%+2rem)] bg-white px-4 pt-3',
        'lg:hidden',
        { '-mb-3 pb-3': isStuck }
      )}
    >
      <Select value={activeItem.id} onValueChange={handleValueChange}>
        <SelectTrigger
          aria-label={title || 'Menu'}
          className="h-10 w-full gap-2 rounded-full border-grey-100 bg-white px-3 py-2 text-sm leading-[130%]! font-normal text-black-500 shadow-none focus:ring-2 focus:ring-primary-100 focus:ring-offset-0 data-[state=open]:ring-2 data-[state=open]:ring-primary-100"
        >
          <SelectValue>
            <span className="line-clamp-1 text-left text-wrap">
              {activeItem.title}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-w-[calc(100vw-2rem)]">
          {menuItems.map((item) => (
            <SelectItem
              key={`menu-item-${item.id}`}
              value={item.id}
              className="text-sm leading-[130%]!"
            >
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MobileMenu;
