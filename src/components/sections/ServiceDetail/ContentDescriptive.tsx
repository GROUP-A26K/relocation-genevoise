import { RevealItem } from '@/components/common/Reveal';
import { FormattedText, Paragraph } from '@/components/common/Text';

interface IContentDescriptiveProps {
  title?: string;
  content: { paragraph: string; title?: string }[];
}

export const ContentDescriptive: React.FC<IContentDescriptiveProps> = ({
  title,
  content,
}) => {
  return (
    <RevealItem className="flex flex-col gap-4">
      {title && <h2 className="text-xl font-bold lg:text-2xl">{title}</h2>}
      <div className="flex flex-col text-sm text-black-200 lg:text-base">
        <div className="flex flex-col gap-6">
          {content.map((content, index) => (
            <p
              key={index}
              className="flex flex-col gap-2 border-l-4 border-secondary-500 py-3 pl-6"
            >
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
    </RevealItem>
  );
};
