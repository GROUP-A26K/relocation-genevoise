import Image from 'next/image';

import Button from '@/components/common/Button';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import { Link, type THref } from '@/libs/i18nNavigation';
import { FormattedText } from '@/components/common/Text';
import HeadingText from '@/components/common/Text/HeadingText';
import ContentWithImgBG from '@/assets/images/shared/relocation-genevoise-geneve-courtage.webp';

interface IContentWithImgProps {
  heading?: string;
  subHeading?: string;
  description?: { paragraph: string }[];
  buttonText?: string;
  buttonUrl?: THref;
}

export const ContentWithImg: React.FC<IContentWithImgProps> = ({
  buttonText,
  heading = 'Why Insurance Geneva ?',
  subHeading = 'Our expertise at your service',
  description,
  buttonUrl = '/',
}) => {
  return (
    <RevealItem className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col items-start gap-6 text-left lg:justify-center xl:max-w-140">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-3">
            <BodyText variant="sm" className="font-semibold text-secondary-600">
              {heading}
            </BodyText>
            <HeadingText
              as="h2"
              className="text-3xl font-semibold text-inherit"
            >
              <FormattedText text={subHeading} />
            </HeadingText>
          </div>
          <BodyText variant="sm" className="flex flex-col gap-4 lg:text-base">
            {description?.map((item, index) => (
              <span key={index}>{item.paragraph}</span>
            ))}
          </BodyText>
        </div>
        {buttonText && (
          <Link href={buttonUrl} className="w-full">
            <Button
              as="solid"
              type="primary"
              variant="md"
              className="w-full lg:w-fit"
            >
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
      <div className="relative aspect-588/440 w-full overflow-hidden rounded-3xl">
        <Image
          src={ContentWithImgBG}
          placeholder="blur"
          alt="Relocation Genevoise, votre partenaire de confiance en Suisse"
          title="Relocation Genevoise, votre partenaire de confiance en Suisse"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </RevealItem>
  );
};
