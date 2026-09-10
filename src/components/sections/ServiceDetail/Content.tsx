'use client';
import {
  ContentDescriptive,
  ContentIntroductory,
} from '@/components/blocks/Content';

import type { FC } from 'react';

type ParagraphType = 'introductory' | 'descriptive';
interface Section {
  title?: string;
  paragraphType?: ParagraphType;
  content: { paragraph: string; title?: string }[];
}
export interface ContentProps {
  section: Section[];
}

function renderListSection(sections: Section[]) {
  return sections.map((section, index) => {
    switch (section.paragraphType) {
      case 'introductory':
        return <ContentIntroductory key={index} {...section} />;
      case 'descriptive':
        return <ContentDescriptive key={index} {...section} />;
      default:
        return null;
    }
  });
}

export const Content: FC<ContentProps> = ({ section }) => {
  return (
    <div className="top-0 flex flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 xl:max-w-[620px] 2xl:max-w-[720px]">
        <div className="flex flex-col gap-16">
          <div className="relative flex flex-col gap-8">
            {renderListSection(section)}
          </div>
        </div>
      </div>
    </div>
  );
};
