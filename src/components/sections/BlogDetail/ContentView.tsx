'use client';

import { cn } from '@/libs/utils';
import { useScrollspy } from '@/hooks/useScrollspy';
import { BlogContentMenu } from '@/components/blocks/BlogContent';
import {
  type Block,
  BLOG_BODY_BLOCKS,
  type BlogDetail,
  type WysiwygBlock,
} from '@/models/BLog';

import { Content } from './Content';
import { ContentContainer } from './ContentContainer';
interface Props {
  tableOfContent?: string;
  blog: BlogDetail;
}

export const ContentView = ({ blog, tableOfContent }: Props) => {
  const allowedBlockTypes = [
    BLOG_BODY_BLOCKS.WYSIWYG_BLOCK,
    BLOG_BODY_BLOCKS.FAQ_BLOCK,
  ] as const;

  const listBlock = blog.body.filter(
    (item): item is Block & { _key: string } & WysiwygBlock =>
      typeof item === 'object' &&
      '_key' in item &&
      '_type' in item &&
      allowedBlockTypes.includes(
        item._type as (typeof allowedBlockTypes)[number]
      )
  );

  const { activeId, setActiveId } = useScrollspy(
    [...listBlock.map((item) => item._key)],
    50
  );

  return (
    <ContentContainer>
      <div
        className={cn('relative h-fit w-full lg:sticky! lg:top-8! lg:w-fit')}
      >
        <BlogContentMenu
          title={tableOfContent}
          setActiveId={setActiveId}
          activeId={activeId}
          isTableContent
          menuItems={[
            ...listBlock.map((item) => ({
              id: item._key,
              title: item.blockTitle?.title ?? '',
            })),
          ]}
        />
      </div>

      <Content {...blog} />
    </ContentContainer>
  );
};
