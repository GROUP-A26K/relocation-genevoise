import { FormattedText, Paragraph } from '@/components/customs/Text';
import { FC } from 'react';

interface Section {
  title: string;
  content: { paragraph: string; title?: string }[];
}
interface ContentProps {
  section: Section[];
}

export const Content: FC<ContentProps> = ({ section }) => {
  return (
    <div className="top-0 flex flex-col items-center justify-center">
      <div className="mx-auto w-full 2xl:max-w-[720px] xl:max-w-[620px] lg:max-w-[470px] max-w-[720px] gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 flex flex-col">
        {section.map((item, index) => (
          <div key={index} className="flex flex-col gap-4">
            <h2 className="lg:text-2xl text-xl font-bold">{item.title}</h2>
            <div className="flex flex-col lg:text-base text-sm text-black-200">
              <div className="flex flex-col gap-4">
                {item.content.map((content, index) => (
                  <p key={index} className="flex flex-col gap-2">
                    {content.title && (
                      <span className="font-medium text-black-500 text-xl">
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
