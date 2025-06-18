import React, { FC, ReactNode } from 'react';
import { LinkText } from './LinkText';

// So when you invent a new inline element, you only have to touch three tiny spots.
// type Marker
// ENTRY
// const OPEN/CLOSE
// switch

interface Props {
  text: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Recursive parser                                                  */
/* ------------------------------------------------------------------ */

type Marker = 'bold' | 'italic' | 'link' | 'strong';

const OPEN = {
  bold: '**',
  italic: '*',
  link: '[[',
  strong: '((',
} as const;

const CLOSE = {
  bold: '**',
  italic: '*',
  link: ']]',
  strong: '))',
} as const;

function findNextMarker(
  source: string,
  start: number
): { pos: number; type: Marker } | null {
  // order: link → bold → italic (link has two-char opener, bold also two)
  const link = source.indexOf(OPEN.link, start);
  const bold = source.indexOf(OPEN.bold, start);
  const strong = source.indexOf(OPEN.strong, start);
  // single * that is not part of **
  let italic = source.indexOf(OPEN.italic, start);
  while (italic !== -1 && source.slice(italic, italic + 2) === '**') {
    italic = source.indexOf(OPEN.italic, italic + 2);
  }

  const entries: Array<[number, Marker]> = [
    [link, 'link'],
    [bold, 'bold'],
    [italic, 'italic'],
    [strong, 'strong'],
  ].filter(([pos]) => pos !== -1) as Array<[number, Marker]>;

  if (!entries.length) return null;
  entries.sort(([a], [b]) => a - b); // earliest marker wins
  return { pos: entries[0][0], type: entries[0][1] };
}

function parseSegment(segment: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  while (cursor < segment.length) {
    const next = findNextMarker(segment, cursor);

    if (!next) {
      nodes.push(<>{segment.slice(cursor)}</>);
      break;
    }

    // push plain text before marker
    if (next.pos > cursor) {
      nodes.push(<>{segment.slice(cursor, next.pos)}</>);
    }

    const open = OPEN[next.type];
    const close = CLOSE[next.type];
    const startInner = next.pos + open.length;
    const end = segment.indexOf(close, startInner);

    // if no closing tag → treat opener literally
    if (end === -1) {
      nodes.push(<>{open}</>);
      cursor = startInner;
      continue;
    }

    const inner = segment.slice(startInner, end);
    const children = parseSegment(inner, `${keyPrefix}-${key}`);

    switch (next.type) {
      case 'bold':
        nodes.push(
          <strong key={`${keyPrefix}-${key++}`} className="font-semibold">
            {children}
          </strong>
        );
        break;
      case 'italic':
        nodes.push(
          <em key={`${keyPrefix}-${key++}`} className="italic">
            {children}
          </em>
        );
        break;

      case 'strong':
        nodes.push(
          <strong key={`${keyPrefix}-${key++}`} className="font-inherit">
            {children}
          </strong>
        );
        break;
      case 'link':
        if (inner.toString().includes('|')) {
          const [text, url] = inner.toString().split('|');
          nodes.push(
            <LinkText link={url} key={`${keyPrefix}-${key++}`}>
              {text}
            </LinkText>
          );
        } else {
          nodes.push(
            <LinkText key={`${keyPrefix}-${key++}`}>{inner}</LinkText>
          );
        }

        break;
    }

    cursor = end + close.length;
  }

  return nodes;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export const FormattedText: FC<Props> = ({ text }) => {
  const lines = text.split(/\n+/);

  return (
    <>
      {lines.map((line, lineIdx) => (
        <React.Fragment key={`line-${lineIdx}`}>
          {parseSegment(line, `l${lineIdx}`)}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
};
