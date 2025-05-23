import { FormattedText, Paragraph } from "@/components/customs/Text";
import { FC } from "react";

interface Props {
  title?: string;
  content: { paragraph: string; title?: string }[];
}

export const ContentDescriptive: FC<Props> = ({ title, content }) => {
  return (
    <div className="flex flex-col gap-4">
      {title && <h2 className="lg:text-2xl text-xl font-bold">{title}</h2>}
      <div className="flex flex-col lg:text-base text-sm text-black-200">
        <div className="flex flex-col gap-6 ">
          {content.map((content, index) => (
            <p
              key={index}
              className="flex flex-col gap-2 py-3 pl-6 border-l-4 border-secondary-500"
            >
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
  );
};
