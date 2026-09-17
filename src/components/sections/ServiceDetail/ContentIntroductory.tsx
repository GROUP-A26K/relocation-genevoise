import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';
import { FormattedText, Paragraph } from '@/components/common/Text';

interface IContentIntroductoryProps {
  title?: string;
  content: { paragraph: string; title?: string }[];
}

export const ContentIntroductory: React.FC<IContentIntroductoryProps> = ({
  title,
  content,
}) => {
  return (
    <RevealItem className="flex flex-col gap-4">
      {title && (
        <HeadingText
          as="h2"
          className="text-xl leading-7 text-inherit lg:text-2xl lg:leading-8"
        >
          {title}
        </HeadingText>
      )}
      <div className="flex flex-col text-sm text-black-200 lg:text-base">
        <div className="flex flex-col gap-4">
          {content.map((content, index) => (
            <BodyText
              className="flex flex-col gap-2 text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit"
              key={index}
            >
              {content.title && (
                <BodyText
                  variant="xl"
                  asChild
                  className="leading-7 font-medium text-black-500"
                >
                  <span>{content.title}</span>
                </BodyText>
              )}
              <Paragraph>
                <FormattedText text={content.paragraph} />
              </Paragraph>
            </BodyText>
          ))}
        </div>
      </div>
    </RevealItem>
  );
};
