import Image from 'next/image';

import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';
import EmptyJobImage from '@/assets/icons/empty-states/empty-data.svg';

interface IEmptyDataProps {
  title?: string;
  description?: string;
  imageAlt: string;
}

const EmptyData: React.FC<IEmptyDataProps> = ({
  title = "We're Not Hiring Today, But We're Always Listening",
  description = "While we don't have open positions right now, we’re always looking to connect with passionate individuals who share our values.",
  imageAlt,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-8 py-12 lg:gap-y-12">
      <Image
        src={EmptyJobImage}
        alt={imageAlt}
        title={imageAlt}
        className="h-[232.73px] w-[320px] max-w-[320px] object-contain md:max-w-[320px] lg:max-w-[320px]"
        width={320}
        height={232.73}
      />
      <div className="flex max-w-[720px] flex-col items-center justify-center gap-6">
        <HeadingText as="h3" className="font-playfair text-center">
          {title}
        </HeadingText>
        <BodyText variant="sm" className="text-center">
          {description}
        </BodyText>
      </div>
    </div>
  );
};

export default EmptyData;
