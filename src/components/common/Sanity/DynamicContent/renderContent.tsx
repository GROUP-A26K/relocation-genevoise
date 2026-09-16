import React from 'react';

import { cn } from '@/libs/utils';
import { Quote } from '@/components/common/Sanity/Block/Quote';
import Callout from '@/components/common/Sanity/Block/Callout';
import QuoteImage from '@/components/common/Sanity/Block/QuoteImage';
import { TableWithTitle } from '@/components/common/Sanity/Block/Table';
import { ImageTitle } from '@/components/common/Sanity/Block/ImageTitle';
import { LinkText, List, ListItem, Paragraph } from '@/components/common/Text';
import {
  EmbedVideoWithTitle,
  VideoWithTitle,
} from '@/components/common/Sanity/Block/Media';

import type { TContent } from '@/models/block';

export const getMarkClasses = (marks?: string[]): string => {
  if (!marks || marks.length === 0) return '';
  return marks
    .map((mark) => {
      switch (mark) {
        case 'strong':
          return 'font-semibold';
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
  markDefs?: Array<{
    href?: string;
    _type: 'link';
    _key: string;
  }>
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
            key={`${item._key || index}-inner`}
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
            key={`${item._key || index}-inner`}
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

export const renderContent = (content: TContent) => {
  switch (content._type) {
    case 'block':
      if (content.style === 'blockquote' && content.children) {
        return (
          <Quote title={renderQuoteArray(content.children, content.markDefs)} />
        );
      }

      if (content.style?.includes('h')) {
        return (
          <Paragraph
            style={content.style}
            className="font-semibold text-black-500"
          >
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
        <Quote author={content.author || ''} title={`"${content.content}"`} />
      );

    case 'quoteImageZone':
      return (
        <QuoteImage
          author={content.author}
          content={content.content}
          authorInfo={content.authorInfo}
          photoUrl={content.photo?.asset?.url}
          photoLqip={content.photo?.asset?.lqip}
        />
      );

    case 'photoZone':
      return (
        <ImageTitle
          title={content.mainPhoto?.imageTitle || 'Photo'}
          imgUrl={content.mainPhoto?.photo?.asset?.url}
          imgLqip={content.mainPhoto?.photo?.asset?.lqip}
        />
      );

    case 'videoZone':
      if (content.source === 'embed') {
        return (
          <EmbedVideoWithTitle
            videoUrl={content.embedUrl}
            title={content.title}
          />
        );
      }
      return (
        <VideoWithTitle
          title={content.title || 'Video'}
          videoUrl={
            content.source == 'file'
              ? content.videoFile?.asset?.url
              : content.videoUrl
          }
        />
      );

    case 'tableZone':
      return (
        <TableWithTitle
          title={content.tableTitle || 'Table'}
          tableContent={
            content.tableData
              ? {
                  ...content.tableData,
                  rows: (content.tableData.rows || [])
                    .filter((row) => row.cells)
                    .map((row) => ({
                      cells: row.cells || [],
                    })),
                }
              : undefined
          }
        />
      );

    case 'newSectionZone':
      return (
        <Callout
          content={renderGroupedContent(content.sectionContent || [])}
          title={content.sectionTitle || 'Section'}
          sectionType={content.sectionType || ('information' as const)}
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
  blocks: TContent[]
): Array<TContent | { type: string; items: TContent[] }> => {
  const groups: Array<TContent | { type: string; items: TContent[] }> = [];
  let currentGroup: { type: string; items: TContent[] } | null = null;

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

export const renderGroupedContent = (contents: TContent[]) => {
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
