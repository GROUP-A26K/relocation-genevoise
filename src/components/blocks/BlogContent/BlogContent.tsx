import { FC } from 'react';
import { cn } from '@/libs/utils';
import { WysiwygBlock } from '@/models/BLog';
import { renderGroupedContent } from './renderContent';

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
        <h2 className="blog-title text-black-500 text-3xl font-bold !leading-[130%]">
          {blockTitle.title}
        </h2>
      )}
      {blockTitle?.content && renderGroupedContent(blockTitle.content)}
    </div>
  );
};

export default BlogContent;
