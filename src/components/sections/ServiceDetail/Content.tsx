'use client';
import { ContentDescriptive } from '@/components/sections/ServiceDetail/ContentDescriptive';
import { ContentIntroductory } from '@/components/sections/ServiceDetail/ContentIntroductory';

type TParagraphType = 'introductory' | 'descriptive';
type TSection = {
  title?: string;
  paragraphType?: TParagraphType;
  content: { paragraph: string; title?: string }[];
};
export interface IContentProps {
  section: TSection[];
}

function renderListSection(sections: TSection[]) {
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

export const Content: React.FC<IContentProps> = ({ section }) => {
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
