import { FormattedText, Paragraph } from '@/components/customs/Text';

import type { FC } from 'react';

interface Section {
  title?: string;
  content: { paragraph: string; title?: string }[];
}
interface ContentProps {
  section: Section[];
}

export const Content: FC<ContentProps> = ({ section }) => {
  return (
    <div className="top-0 flex flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 xl:max-w-[620px] 2xl:max-w-[720px]">
        {section.map((item, index) => (
          <div key={index} className="flex flex-col gap-4">
            {item.title && (
              <h2 className="text-xl font-bold lg:text-2xl">{item.title}</h2>
            )}
            <div className="flex flex-col text-sm text-black-200 lg:text-base">
              <div className="flex flex-col gap-4">
                {item.content.map((content, index) => (
                  <p key={index} className="flex flex-col gap-2">
                    {content.title && (
                      <span className="text-xl font-medium text-black-500">
                        {content.title}
                      </span>
                    )}
                    <Paragraph>
                      <FormattedText text={content.paragraph} />
                    </Paragraph>
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
