import { cn } from '@/libs/utils';

import BodyText from './BodyText';
import HeadingText from './HeadingText';

interface IParagraphProps {
  children?: React.ReactNode;
  className?: string;
  style?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote' | 'normal';
}

// CMS headings retain their existing scale, independent of the site heading defaults.
const variantStyles = {
  h1: 'text-5xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl',
  h5: 'text-lg',
  h6: 'text-base',
  blockquote: 'text-base',
  normal: 'text-base',
};

export const Paragraph: React.FC<IParagraphProps> = ({
  children,
  className,
  style = 'normal',
}) => {
  const classes = cn(
    'p-0 font-normal text-black-200',
    variantStyles[style],
    className
  );
  if (style !== 'normal' && style !== 'blockquote') {
    return (
      <HeadingText as={style} className={classes}>
        {children}
      </HeadingText>
    );
  }
  const Tag = style === 'normal' ? 'span' : 'blockquote';
  return (
    <BodyText asChild className={classes}>
      <Tag>{children}</Tag>
    </BodyText>
  );
};
