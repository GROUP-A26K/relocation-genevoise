// renderHelpers.tsx
import React from 'react';
import { cn } from '@/libs/utils';
import { LinkText, List, ListItem, Paragraph } from '@/components/customs/Text';
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

/* ------------------------------------------------------------------ *
 *  INLINE RENDERERS
 * ------------------------------------------------------------------ */

/**
 * Extracts the link definition (if any) for the span and returns:
 *   – linkDef   … the link mark `{ _type:'link', href, _key }`
 *   – restMarks … all other text-style marks (strong, em, …)
 */
const splitLinkMark = (
  marks: string[] | undefined,
  markDefs?:
    | Array<{
        href?: string;
        _type: 'link';
        _key: string;
      }>
    | undefined
): {
  linkDef?: { href?: string };
  restMarks: string[];
} => {
  if (!marks || marks.length === 0) return { restMarks: [] };

  let linkDef;
  const restMarks: string[] = [];

  marks.forEach((mark) => {
    const def = markDefs?.find((d) => d._key === mark && d._type === 'link');
    if (def) {
      linkDef = def;
    } else {
      restMarks.push(mark);
    }
  });

  return { linkDef, restMarks };
};

/**
 * Renders an array of inline span nodes, including nested links.
 */
export const renderArray = (
  spans: Array<{
    marks?: string[];
    text?: string;
    _type: 'span';
    _key: string;
  }>,
  markDefs?: Array<{
    href?: string;
    _type: 'link';
    _key: string;
  }>
) => {
  return (
    <>
      {spans.map((item, index) => {
        const { linkDef, restMarks } = splitLinkMark(item.marks, markDefs);

        const textNode = (
          <span
            key={`${item._key}-inner` || index}
            className={cn(getMarkClasses(restMarks))}
          >
            {item.text}
          </span>
        );

        // If the span has a link mark → wrap the text in <a>
        if (linkDef?.href) {
          return (
            <LinkText key={item._key || index} link={linkDef.href}>
              {textNode}
            </LinkText>
          );
        }

        return (
          <span
            key={item._key || index}
            className={cn(getMarkClasses(restMarks))}
          >
            {item.text}
          </span>
        );
      })}
    </>
  );
};

export const renderQuoteArray = (
  spans: Array<{
    marks?: string[];
    text?: string;
    _type: 'span';
    _key: string;
  }>,
  markDefs?: Array<{
    href?: string;
    _type: 'link';
    _key: string;
  }>
) => {
  return (
    <>
      &quot;
      {spans.map((item, index) => {
        const { linkDef, restMarks } = splitLinkMark(item.marks, markDefs);

        const textNode = (
          <span
            key={`${item._key}-inner` || index}
            className={cn(getMarkClasses(restMarks))}
          >
            {item.text}
          </span>
        );

        // If the span has a link mark → wrap the text in <a>
        if (linkDef?.href) {
          return (
            <LinkText key={item._key || index} link={linkDef.href}>
              {textNode}
            </LinkText>
          );
        }

        return (
          <span
            key={item._key || index}
            className={cn(getMarkClasses(restMarks))}
          >
            {item.text}
          </span>
        );
      })}
      &quot;
    </>
  );
};
/* ------------------------------------------------------------------ *
 *  BLOCK-LEVEL RENDERERS
 * ------------------------------------------------------------------ */

export const renderContent = (content: Content) => {
  switch (content._type) {
    case 'block':
      if (content.style === 'blockquote' && content.children) {
        return (
          <Quote title={renderQuoteArray(content.children, content.markDefs)} />
        );
      }

      if (content.style?.includes('h')) {
        return (
          <Paragraph className="text-black-500 font-bold">
            {content.children &&
              renderArray(content.children, content.markDefs)}
          </Paragraph>
        );
      }

      return (
        <Paragraph>
          {content.children && renderArray(content.children, content.markDefs)}
        </Paragraph>
      );

    case 'quote':
      return (
        <Quote
          author={content.author || ''}
          title={`"${content.content}"` || ''}
        />
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

/* ------------------------------------------------------------------ *
 *  LIST GROUPING HELPERS
 * ------------------------------------------------------------------ */

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
        if (currentGroup) groups.push(currentGroup);
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

  if (currentGroup) groups.push(currentGroup);
  return groups;
};

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
    }

    return <div key={index}>{renderContent(groupOrBlock)}</div>;
  });
};
