import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';
import { FormattedText, Paragraph } from '@/components/common/Text';

type TSection = {
  title: string;
  content: { paragraph: string; title?: string }[];
};
interface IContentProps {
  section: TSection[];
}

export const Content: React.FC<IContentProps> = ({ section }) => {
  return (
    <div className="top-0 flex flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 xl:max-w-[620px] 2xl:max-w-[720px]">
        {section.map((item, index) => (
          <RevealItem key={index} className="flex flex-col gap-4">
            <HeadingText
              as="h2"
              className="text-xl leading-7 text-inherit lg:text-2xl lg:leading-8"
            >
              {item.title}
            </HeadingText>
            <div className="flex flex-col text-sm text-black-200 lg:text-base">
              <div className="flex flex-col gap-4">
                {item.content.map((content, index) => (
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
        ))}
      </div>
    </div>
  );
};
