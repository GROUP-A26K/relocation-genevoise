'use client';

import { Globe } from 'lucide-react';

import { cn } from '@/libs/utils';

import { useLanguageSwitcher } from './hooks';

const WRAPPER_STYLE = cn(
  'inline-flex h-9 w-fit items-center justify-center gap-2 whitespace-nowrap',
  'rounded-3xl bg-grey-50 px-[16px] py-[20px] shadow-none',
  'lineHeight-md text-[16px] font-semibold text-primary-500',
  '[&_svg]:pointer-events-none [&_svg]:shrink-0'
);

interface ILanguageSelectorProps {
  className?: string;
}

const LanguageSelector: React.FC<ILanguageSelectorProps> = ({ className }) => {
  const { locales, locale, isRotated, pendingLocale, switchTo } =
    useLanguageSwitcher();

  return (
    <div className={cn(WRAPPER_STYLE, className)}>
      <Globe
        className={cn('size-5 transition-transform duration-500', {
          'rotate-180': isRotated,
        })}
      />
      <div className="flex divide-x-2 divide-grey-200">
        {locales.map((item, index) => {
          const isActive = item === locale;
          const isDisabled = isActive || Boolean(pendingLocale);

          return (
            <button
              key={item}
              type="button"
              aria-label={`Switch language to ${item.toUpperCase()}`}
              aria-current={isActive}
              disabled={isDisabled}
              onClick={() => switchTo(item)}
              className={cn(
                'transition-colors duration-200',
                'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-hidden',
                index > 0 ? 'pl-2' : 'pr-2',
                isDisabled ? 'cursor-default' : 'cursor-pointer',
                isActive
                  ? 'text-primary-500'
                  : 'text-grey-500 hover:text-primary-400',
                { 'text-primary-400': pendingLocale === item }
              )}
            >
              {item.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { LanguageSelector };
