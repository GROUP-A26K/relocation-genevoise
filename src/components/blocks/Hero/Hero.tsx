import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import { RevealItem } from '@/components/customs/Reveal';
import { FormattedText } from '@/components/customs/Text';
import { getText } from '@/components/customs/Text/TextWithStrong';

import type { FC } from 'react';

interface Props {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
  heroImage: {
    src: string;
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

export const Hero: FC<Props> = ({
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
              <p className="text-center text-sm leading-[130%]! font-semibold text-secondary-600 lg:text-center">
                {heading}
              </p>
              <h1 className="text-center text-4xl leading-[100%]! font-bold text-pretty lg:text-5xl lg:leading-[130%]!">
                <FormattedText text={subHeading} />
              </h1>
            </div>
            <p className="text-center text-sm leading-[130%]! font-normal text-pretty text-black-200">
              {description}
            </p>
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

      <RevealItem className="relative flex flex-col items-start justify-between">
        <div className="w-full">
          <Image
            alt={getText(heroImage.alt || '')}
            title={getText(heroImage.title || '')}
            src={heroImage.src}
            width={1240}
            height={480}
            className="aspect-video max-h-[226px] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2 lg:h-[480px] lg:max-h-[480px]"
            priority
            loading="eager"
            draggable={false}
            fetchPriority="high"
          />
        </div>
      </RevealItem>
    </div>
  );
};
