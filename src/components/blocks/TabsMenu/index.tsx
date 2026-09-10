'use client';

import { useId } from 'react';
import { useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';

import { cn } from '@/libs/utils';
import Button from '@/components/customs/Button';

import type { FC } from 'react';

export type IType = 'primary' | 'secondary';

interface TabsMenuProps {
  activeValue?: string;
  category: { title: string }[];
  onClick: (filterBy: string) => void;
  variant?: IType;
}

const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
  mass: 0.8,
} as const;

const TabsMenu: FC<TabsMenuProps> = ({
  activeValue = '',
  category,
  onClick,
  variant = 'primary',
}) => {
  const locale = useLocale();
  const indicatorId = useId();
  const shouldReduceMotion = useReducedMotion();
  const tabs = [
    { value: '', title: locale === 'fr' ? 'Tous' : 'View all' },
    ...category.map(({ title }) => ({ value: title, title })),
  ];

  const handleTabClick = (filterBy: string) => {
    if (filterBy === activeValue) return;
    onClick(filterBy);
  };

  return (
    <div className="relative isolate flex w-fit rounded-full bg-grey-50 p-1">
      {tabs.map(({ value, title }) => {
        const isActive = activeValue === value;

        return (
          <Button
            key={value}
            as="ghost"
            type={variant}
            variant="md"
            className={cn(
              'relative bg-transparent shadow-none hover:bg-transparent active:bg-transparent motion-reduce:transition-none',
              isActive && variant === 'primary'
                ? 'text-white hover:text-white active:text-white'
                : 'text-black-500 hover:text-black-500 active:text-black-500'
            )}
            onClick={() => handleTabClick(value)}
          >
            {isActive && (
              <motion.span
                aria-hidden="true"
                layoutId={shouldReduceMotion ? undefined : indicatorId}
                transition={SPRING_TRANSITION}
                className={cn(
                  'pointer-events-none absolute inset-0 rounded-[inherit]',
                  variant === 'primary' ? 'bg-black-400' : 'bg-yellow-400'
                )}
              />
            )}
            <span className="relative z-10">{title}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default TabsMenu;
