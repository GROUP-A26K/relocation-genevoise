import { Search } from 'lucide-react';

import { cn } from '@/libs/utils';
import { Input as ShadcnInput } from '@/components/ui/input';

import type { FC } from 'react';

interface InputSearchProps extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  href?: never;
  target?: never;
  onClick?: () => void;
  as: 'search';
}

interface InputProps extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  href?: never;
  target?: never;
  onClick?: () => void;
  as: 'input';
}

interface BaseProps extends React.ComponentProps<'input'> {
  className?: string;
  disabled?: boolean;
  error?: boolean;
}

type Props = BaseProps & (InputProps | InputSearchProps);

const Input: FC<Props> = ({
  as,
  disabled = false,
  className,
  error = false,
  ...props
}) => {
  switch (as) {
    case 'search':
      return (
        <div className={cn('relative w-full', className)}>
          <Search
            className={cn(
              'absolute top-2.5 left-2.5 h-[18px] w-[18px] text-grey-500',
              disabled && 'font-medium text-gray-100'
            )}
          />
          <ShadcnInput
            type="search"
            className={cn(
              'h-10 rounded-3xl border-gray-200 pl-8 text-sm leading-[130%]! text-black-400 shadow-none placeholder:text-grey-400',
              'hover:border-grey-400',
              'focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-50',
              disabled &&
                'pointer-events-none text-gray-50 select-none placeholder:font-medium placeholder:text-gray-100',
              error && 'border-red-500 hover:border-red-500',
              'w-full'
            )}
            {...props}
          />
        </div>
      );

    case 'input':
      return (
        <ShadcnInput
          className={cn(
            'rounded-3xl border-gray-200 text-[14px] text-black-50 shadow-none placeholder:text-black-50',
            'hover:text-back-100 hover:border-black-50',
            'focus-visible:border-blue-500 focus-visible:text-black-50 focus-visible:ring-2 focus-visible:ring-blue-50',
            disabled &&
              'pointer-events-none text-gray-50 select-none placeholder:font-medium placeholder:text-gray-100',
            error && 'border-red-500 hover:border-red-500',
            className
          )}
          {...props}
        />
      );

    default:
      return null;
  }
};

export default Input;
