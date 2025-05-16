// renderHelpers.tsx
import React from 'react';
import { cn } from '@/libs/utils';
import { List, ListItem, Paragraph } from '@/components/customs/Text';
import { ImageTitle } from '@/components/customs/ImageTitle';
import { Quote } from '@/components/customs/Quote';
import { Content } from '@/models/BLog';

export const getMarkClasses = (marks?: string[]): string => {
  if (!marks || marks.length === 0) return '';
  return marks
    .map((mark) => {
      switch (mark) {
        case 'strong':
          return 'font-bold';
        case 'em':
          return 'italic';
        case 'underline':
          return 'underline';
        case 'strike-through':
          return 'line-through';
        default:
          return '';
      }
    })
    .join(' ');
};

// Renders an array of inline (span) content
export const renderArray = (
  spans: Array<{
    marks?: string[];
    text?: string;
    _type: 'span';
    _key: string;
  }>
) => {
  return (
    <>
      {spans.map((item, index) => (
        <span
          key={item._key || index}
          className={cn(getMarkClasses(item.marks))}
        >
          {item.text}
        </span>
      ))}
    </>
  );
};

// Renders a single content block based on its _type
export const renderContent = (content: Content) => {
  switch (content._type) {
    case 'block':
      return (
        <Paragraph>
          {content.children && renderArray(content.children)}
        </Paragraph>
      );
    case 'quote':
      return (
        <Quote author={content.author || ''} title={content.content || ''} />
      );
    case 'photoZone':
      return (
        <ImageTitle
          title={content.mainPhoto?.imageTitle || 'Photo'}
          imgUrl={content.mainPhoto?.photo?.asset?.url}
        />
      );
    default:
      return null;
  }
};

// Groups consecutive content blocks that have the same listItem type
export const groupListBlocks = (
  blocks: Content[]
): Array<Content | { type: string; items: Content[] }> => {
  const groups: Array<Content | { type: string; items: Content[] }> = [];
  let currentGroup: { type: string; items: Content[] } | null = null;

  blocks.forEach((block) => {
    if ('listItem' in block && block.listItem) {
      if (currentGroup && currentGroup.type === block.listItem) {
        currentGroup.items.push(block);
      } else {
        if (currentGroup) {
          groups.push(currentGroup);
        }
        currentGroup = { type: block.listItem, items: [block] };
      }
    } else {
      if (currentGroup) {
        groups.push(currentGroup);
        currentGroup = null;
      }
      groups.push(block);
    }
  });
  if (currentGroup) {
    groups.push(currentGroup);
  }
  return groups;
};

// Renders content by grouping consecutive list blocks into a single List component
export const renderGroupedContent = (contents: Content[]) => {
  const grouped = groupListBlocks(contents);
  return grouped.map((groupOrBlock, index) => {
    if ('items' in groupOrBlock) {
      const format = groupOrBlock.type === 'number' ? 'ordered' : 'unordered';
      return (
        <List key={index} format={format}>
          {groupOrBlock.items.map((item, idx) => (
            <ListItem key={item._key || idx}>{renderContent(item)}</ListItem>
          ))}
        </List>
      );
    } else {
      return <div key={index}>{renderContent(groupOrBlock)}</div>;
    }
  });
};
