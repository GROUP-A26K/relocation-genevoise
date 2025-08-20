import { cn } from '@/libs/utils';
import { type FC } from 'react';
import type { JSX } from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
  style?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote' | 'normal';
}

const variantStyles: Record<string, string> = {
  h1: 'text-5xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl',
  h5: 'text-lg',
  h6: 'text-base',
  blockquote: 'text-base',
  normal: 'text-base',
};

export const Paragraph: FC<Props> = ({
  children,
  className = '',
  style = 'normal',
}) => {
  const Tag =
    style === 'normal' ? 'span' : (style as keyof JSX.IntrinsicElements);
  return (
    <Tag
      className={cn(
        variantStyles[style] || variantStyles.normal,
        'text-black-200 font-normal !leading-[130%] p-0',
        className
      )}
    >
      {children}
    </Tag>
  );
};