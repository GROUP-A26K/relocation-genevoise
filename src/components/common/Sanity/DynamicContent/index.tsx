import { cn } from '@/libs/utils';
import { RevealItem } from '@/components/common/Reveal';

import { renderGroupedContent } from './renderContent';
import { ANCHOR_SCROLL_MARGIN } from '../../ContentMenu/constants';

import type { TWysiwygBlock } from '@/models/block';

interface IDynamicContentProps extends TWysiwygBlock {
  _key: string;
  className?: string;
  titleClassName?: string;
}

const DynamicContent: React.FC<IDynamicContentProps> = ({
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
