import Image from 'next/image';

import { cn } from '@/libs/utils';
import { RevealItem } from '@/components/customs/Reveal';
import { FormattedText } from '@/components/customs/Text';
import { getText } from '@/components/customs/Text/TextWithStrong';

import type { FC } from 'react';

interface Reason {
  title: string;
  description: string;
}

interface Props {
  heading?: string;
  subHeading?: string;
  description?: string;
  reasonItems?: Reason[];
  imageSrc?: string;
}

export const InsurancesFeature: FC<Props> = ({
  heading = 'Features',
  subHeading = 'Why choose us ?',
  description = 'Spend smarter, lower your bills, get cashback on everything you buy, and unlock credit to grow your business.',
  reasonItems = [
    {
      title: 'Personalized expertise',
      description:
        'We carefully analyze your specific needs to offer you tailor-made’assurance solutions. Your protection is at the heart of our priorities, and we ensure that every detail is taken into account.',
    },
    {
      title: 'Access to the widest range of’assurers',
      description:
        'Thanks to our network of partners, we compare the best offers on the market to ensure excellent value for money. You benefit from diversified solutions adapted to your budget.',
    },
    {
      title: 'Accompaniment from A to Z',
      description:
        'We are at your side at every step : from the subscription to the monitoring of claims. Our commitment is to make your steps simple and effective while saving you unnecessary hassle.',
    },
    {
      title: 'Relationship of trust and transparency',
      description:
        'We favor a lasting and transparent relationship with our customers, without hidden costs or unrealistic promises. Your satisfaction is our best reward, and we work to earn your trust every day.',
    },
  ],
  imageSrc = 'https://www.shadcnblocks.com/images/block/placeholder-1.svg',
}) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <RevealItem className="flex w-full justify-start">
        <div className="flex max-w-3xl flex-col gap-4 text-left lg:gap-4">
          <div className="flex flex-col gap-3">
            <p className="text-sm leading-[130%]! font-semibold text-secondary-600">
              {heading}
            </p>
            <h2 className="text-3xl leading-[130%]! font-semibold">
              <FormattedText text={subHeading} />
            </h2>
          </div>
          <p className="text-sm leading-[130%]! font-normal text-black-200">
            {description}
          </p>
        </div>
      </RevealItem>
      <RevealItem className="flex flex-col items-center gap-12 xl:flex-row xl:justify-between xl:gap-16">
        <div className="flex flex-col justify-center">
          {reasonItems.map((reasonItem, i) => (
            <div
              key={i}
              className="flex w-full flex-col gap-1 border-l-4 border-gray-100 p-4 pr-0! pl-6 text-black-500 hover:border-primary-500 lg:gap-3 lg:p-6 xl:max-w-[536px]"
            >
              <h3 className="text-xl leading-[130%]! font-semibold">
                {reasonItem.title}
              </h3>
              <p className="text-sm leading-[130%]! font-normal text-black-200 lg:text-sm">
                <FormattedText text={reasonItem.description} />
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <Image
            src={imageSrc}
            alt={`${heading}, ${getText(subHeading)}`}
            title={`${description}`}
            width={616}
            height={640}
            className={cn(
              'rounded-2xl object-cover',
              'max-h-[326px] lg:min-h-[400px] xl:min-h-[640px]',
              'min-w-[326px] lg:min-w-[700px] xl:min-w-[616px]',
              'max-h-[326px] lg:max-h-[640px]'
            )}
          />
        </div>
      </RevealItem>
    </div>
  );
};
