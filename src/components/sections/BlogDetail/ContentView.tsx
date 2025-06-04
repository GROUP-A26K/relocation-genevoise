'use client';

import { BlogContentMenu } from '@/components/blocks/BlogContent';
import { cn } from '@/libs/utils';
import { ContentContainer } from './ContentContainer';
import { Content } from './Content';
import { useScrollspy } from '@/hooks/useScrollspy';
import { Block, BlogDetail, WysiwygBlock } from '@/models/BLog';

interface Props {
  tableOfContent?: string;
  blog: BlogDetail;
}

export const ContentView = (props: Props) => {
  const listBlock = props.blog.body.filter(
    (item: Block): item is Block & { _key: string } & WysiwygBlock =>
      '_key' in item && '_type' in item && item._type === 'wysiwygBlock'
  );

  const { activeId, setActiveId } = useScrollspy(
    [...listBlock.map((item) => item._key)],
    50
  );

  return (
    <ContentContainer>
      <div
        className={cn(
          'lg:!sticky lg:!top-8 lg:!h-0 h-fit relative lg:!pb-0 pb-12 w-fit',
          listBlock.length > 1 &&
            activeId === listBlock[listBlock.length - 1]?._key &&
            'lg:!h-fit lg:!pb-20'
        )}
      >
        <BlogContentMenu
          title={props.tableOfContent}
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

      <Content {...props.blog} />
    </ContentContainer>
  );
};
