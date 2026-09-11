'use client';

import { useMemo } from 'react';

import { useScroll } from '@/hooks/useScroll';
import Section from '@/components/customs/Section';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ContentMenu } from '@/components/blocks/DynamicContent';
import {
  DESKTOP_MENU_OFFSET,
  MOBILE_MENU_OFFSET,
} from '@/components/blocks/DynamicContent/constants';
import {
  type Block,
  type FaqBlock,
  BLOG_BODY_BLOCKS,
  type BlogDetail,
  type WysiwygBlock,
} from '@/models/BLog';

import { Content } from './Content';

interface IContentViewProps {
  tableOfContent?: string;
  blog: BlogDetail;
}

const allowedBlockTypes = [
  BLOG_BODY_BLOCKS.WYSIWYG_BLOCK,
  BLOG_BODY_BLOCKS.FAQ_BLOCK,
] as const;

export const ContentView = ({ blog, tableOfContent }: IContentViewProps) => {
  const listBlock = useMemo(
    () =>
      blog.body.filter(
        (item): item is Block & { _key: string } & (WysiwygBlock | FaqBlock) =>
          item !== null &&
          typeof item === 'object' &&
          '_key' in item &&
          '_type' in item &&
          allowedBlockTypes.includes(
            item._type as (typeof allowedBlockTypes)[number]
          )
      ),
    [blog.body]
  );

  const itemIds = useMemo(
    () => listBlock.map((item) => item._key),
    [listBlock]
  );
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { activeId, setActiveId } = useScroll(
    itemIds,
    isDesktop ? DESKTOP_MENU_OFFSET : MOBILE_MENU_OFFSET,
    { lockActiveDuringScroll: true }
  );

  return (
    <Section className="relative">
      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[263fr_945fr]">
        <ContentMenu
          title={tableOfContent}
          setActiveId={setActiveId}
          activeId={activeId}
          isTableContent
          menuItems={[
            ...listBlock.map((item) => ({
              id: item._key,
              title:
                item._type === BLOG_BODY_BLOCKS.FAQ_BLOCK
                  ? 'FAQ'
                  : (item.blockTitle?.title ?? ''),
            })),
          ]}
        />

        <Content {...blog} />
      </div>
    </Section>
  );
};
