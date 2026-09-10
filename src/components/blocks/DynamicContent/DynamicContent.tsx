import { cn } from '@/libs/utils';

import { renderGroupedContent } from './renderContent';

import type { FC } from 'react';
import type { WysiwygBlock } from '@/models/Block';

export interface ContentProps extends WysiwygBlock {
  _key: string;
  className?: string;
  titleClassName?: string;
}

export const DynamicContent: FC<ContentProps> = ({
  blockTitle,
  _key,
  className,
  titleClassName,
}) => {
  return (
    <div id={_key} className={cn('flex flex-col gap-4', className)}>
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
    </div>
  );
};

export default DynamicContent;
