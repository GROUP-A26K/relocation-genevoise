import { cn } from '@/libs/utils';
import { RevealItem } from '@/components/customs/Reveal';

import { ANCHOR_SCROLL_MARGIN } from './constants';
import { renderGroupedContent } from './renderContent';

import type { WysiwygBlock } from '@/models/Block';

export interface ContentProps extends WysiwygBlock {
  _key: string;
  className?: string;
  titleClassName?: string;
}

export const DynamicContent: React.FC<ContentProps> = ({
  blockTitle,
  _key,
  className,
  titleClassName,
}) => {
  return (
    <RevealItem
      id={_key}
      className={cn('flex flex-col gap-4', ANCHOR_SCROLL_MARGIN, className)}
    >
      {blockTitle?.title && (
        <h2
          className={cn(
            'blog-title text-3xl leading-[130%]! font-bold text-black-500',
            titleClassName
          )}
        >
          {blockTitle.title}
        </h2>
      )}
      {blockTitle?.content && renderGroupedContent(blockTitle.content)}
    </RevealItem>
  );
};

export default DynamicContent;
