import { ArrowRight } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';

import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/common/Button';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import { FormattedText } from '@/components/common/Text';
import HeadingText from '@/components/common/Text/HeadingText';
import { getText } from '@/components/common/Text/TextWithStrong';

interface IHeroProps {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
  heroImage: {
    src: StaticImageData;
    alt: string;
    title: string;
  };
  button?: {
    text?: string;
    url?: string;
  };
  button2?: {
    text?: string;
    url?: string;
  };
  buttonUrl?: string;
}

export const Hero: React.FC<IHeroProps> = ({
  subHeading = 'Your independent broker in Geneva',
  description = 'We work with the set of Swiss insurances companies to support companies, professionals and our private clients with solutions personalized thanks to our offices in Geneva and Switzerland.',
  button,
  button2,
  heading,
  heroImage,
}) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col gap-6">
          <RevealItem className="flex w-full max-w-3xl flex-col gap-4 text-center lg:items-center lg:gap-6">
            <div className="flex flex-col gap-3">
              <BodyText
                variant="sm"
                className="text-center font-semibold text-secondary-600 lg:text-center"
              >
                {heading}
              </BodyText>
              <HeadingText
                as="h1"
                className="text-center text-4xl leading-[100%] text-pretty text-inherit lg:text-5xl lg:leading-[130%]"
              >
                <FormattedText text={subHeading} />
              </HeadingText>
            </div>
            <BodyText variant="sm" className="text-center text-pretty">
              {description}
            </BodyText>
          </RevealItem>

          <RevealItem className="flex w-full flex-row items-center justify-center gap-2">
            {button && (
              <Link href="/call-me-back">
                <Button as="solid" variant="md" type="secondary">
                  {button.text}
                </Button>
              </Link>
            )}
            {button2 && (
              <Link href="/contact">
                <Button
                  as="outline"
                  variant="md"
                  type="primary"
                  iconEnd={ArrowRight}
                >
                  {button2.text}
                </Button>
              </Link>
            )}
          </RevealItem>
        </div>
      </div>

      <RevealItem className="relative aspect-1240/480 w-full overflow-hidden rounded-3xl">
        <Image
          alt={getText(heroImage.alt)}
          title={getText(heroImage.title)}
          src={heroImage.src}
          placeholder="blur"
          fill
          sizes="(min-width: 1440px) 1240px, 100vw"
          className="object-cover"
          priority
          loading="eager"
          draggable={false}
          fetchPriority="high"
        />
      </RevealItem>
    </div>
  );
};
