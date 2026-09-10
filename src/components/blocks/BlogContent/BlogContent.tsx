import { cn } from '@/libs/utils';

import { renderGroupedContent } from './renderContent';

import type { FC } from 'react';
import type { WysiwygBlock } from '@/models/BLog';

export interface BlogContentProps extends WysiwygBlock {
  _key: string;
  className?: string;
}

export const BlogContent: FC<BlogContentProps> = ({
  blockTitle,
  _key,
  className,
}) => {
  return (
    <div id={_key} className={cn('flex flex-col gap-4', className)}>
      {blockTitle?.title && (
        <h2 className="blog-title text-3xl leading-[130%]! font-bold text-black-500">
          {blockTitle.title}
        </h2>
      )}
      {blockTitle?.content && renderGroupedContent(blockTitle.content)}
    </div>
  );
};

export default BlogContent;
