'use client';

import { useId, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

import { cn } from '@/libs/utils';

import { DESKTOP_MENU_OFFSET } from './constants';
import { scrollToContent } from './scrollToContent';

import type { IContentMenuProps } from './types';

const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
  mass: 0.8,
} as const;

const DesktopMenu: React.FC<IContentMenuProps> = ({
  title,
  activeId,
  setActiveId,
  menuItems,
  isTableContent,
  className,
}) => {
  const indicatorId = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    if (!list || !list.offsetParent) return;
    const activeItem = list.querySelector<HTMLElement>('[aria-current="true"]');
    if (!activeItem) return;

    const listRect = list.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const delta =
      itemRect.top < listRect.top
        ? itemRect.top - listRect.top
        : itemRect.bottom > listRect.bottom
          ? itemRect.bottom - listRect.bottom
          : 0;

    if (delta) list.scrollBy({ top: delta, behavior: 'instant' });
  }, [activeId]);

  if (menuItems.length === 0) return null;

  return (
    <motion.div
      layoutRoot
      data-content-menu="desktop"
      style={{
        top: DESKTOP_MENU_OFFSET,
        maxHeight: `calc(100dvh - ${DESKTOP_MENU_OFFSET + 24}px)`,
      }}
      className={cn('hidden h-fit lg:sticky lg:flex', className)}
    >
      <div className="flex max-h-[inherit] w-full flex-col gap-8">
        {isTableContent && title && (
          <div className="shrink-0 text-xl leading-[130%]! font-semibold text-black-500">
            {title}
          </div>
        )}
        <motion.ul
          ref={listRef}
          layoutScroll
          className="relative scrollbar-hide flex min-h-0 w-full flex-col gap-1 overflow-y-auto overscroll-contain border-l-2 border-grey-50"
        >
          {menuItems.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id} className="relative shrink-0">
                {isActive && (
                  <motion.span
                    aria-hidden="true"
                    data-active-indicator
                    layoutId={indicatorId}
                    transition={
                      shouldReduceMotion ? { duration: 0 } : SPRING_TRANSITION
                    }
                    className="pointer-events-none absolute inset-0 border-l-2 border-secondary-500 bg-secondary-25"
                  />
                )}
                <a
                  href={`#${item.id}`}
                  title={item.title}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(event) => {
                    if (
                      event.button !== 0 ||
                      event.metaKey ||
                      event.ctrlKey ||
                      event.shiftKey ||
                      event.altKey
                    )
                      return;
                    event.preventDefault();
                    setActiveId(item.id);
                    scrollToContent(item.id, !!shouldReduceMotion);
                  }}
                  className={cn(
                    'relative block px-4 py-3 text-base leading-[130%]! text-black-200 transition-colors duration-200 motion-reduce:transition-none',
                    isActive && 'font-semibold text-primary-500'
                  )}
                >
                  <span className="line-clamp-4">{item.title}</span>
                </a>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </motion.div>
  );
};

export default DesktopMenu;
