import type { FC } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/libs/utils';
import { Input as ShadcnInput } from '@/components/ui/input';

interface InputSearchProps
  extends React.AnchorHTMLAttributes<HTMLButtonElement> {
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
        <div className={cn('w-full relative', className)}>
          <Search
            className={cn(
              'w-[18px] h-[18px] absolute left-2.5 top-2.5 text-grey-500',
              disabled && 'text-gray-100 font-medium'
            )}
          />
          <ShadcnInput
            type="search"
            className={cn(
              'h-10 shadow-none text-sm placeholder:text-grey-400 text-black-400 rounded-[1.5rem] border-gray-200 pl-8 !leading-[130%]',
              'hover:border-grey-400',
              'focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-50',
              disabled &&
                'placeholder:text-gray-100 placeholder:font-medium text-gray-50 pointer-events-none select-none',
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
            'text-[14px] shadow-none placeholder:text-black-50 text-black-50 rounded-[1.5rem] border-gray-200',
            'hover:border-black-50 hover:text-back-100',
            'focus-visible:text-black-50 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-50',
            disabled &&
              'placeholder:text-gray-100 placeholder:font-medium text-gray-50 pointer-events-none select-none',
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
