import Image from 'next/image';

import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import { FormattedText } from '@/components/customs/Text';
import { getText } from '@/components/customs/Text/TextWithStrong';

import type { FC } from 'react';

interface Props {
  heading?: string;
  subHeading?: string;
  description?: { paragraph: string }[];
  buttonText?: string;
  imgSrc?: string;
  link?: {
    text: string;
    url: string;
  };
}

export const InsurancesDetailHero: FC<Props> = ({
  heading = 'Insurance',
  subHeading = 'Relocation of things and heritage',
  description,
  buttonText = 'Call me',
  imgSrc = 'https://www.shadcnblocks.com/images/block/placeholder-1.svg',
}) => {
  const descriptionText =
    description?.map((item) => item.paragraph).join(' ') ?? '';

  return (
    <div className="flex flex-col gap-14 lg:gap-16">
      <div className="flex flex-col items-center justify-end gap-12 lg:flex-row lg:gap-16">
        <div className="flex flex-col items-start gap-6 text-center lg:justify-center lg:text-left">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm leading-[130%]! font-semibold text-secondary-600">
                {heading}
              </p>
              <h1 className="text-4xl leading-[130%]! font-bold xl:text-4xl 2xl:text-5xl">
                <FormattedText text={subHeading} />
              </h1>
            </div>
            <p className="flex flex-col gap-4 text-sm leading-[130%]! font-normal text-black-200 lg:text-sm">
              {description?.map((item, index) => (
                <span key={index}>{item.paragraph}</span>
              ))}
            </p>
          </div>
          <Link href="/rappelez-moi" className="w-full lg:w-fit">
            <Button as="solid" type="primary" variant="md">
              {buttonText}
            </Button>
          </Link>
        </div>

        <Image
          src={imgSrc}
          alt={`Relocation Genevoise,${heading} ${getText(subHeading)}`}
          title={`${getText(subHeading)}, ${descriptionText}`}
          width={588}
          height={560}
          className={cn(
            'rounded-2xl object-cover',
            'min-h-[226px] lg:min-h-[400px] xl:min-h-[560px]',
            'min-w-[226px] lg:min-w-[400px] xl:min-w-[588px]',
            'max-h-[226px] lg:max-h-[560px]'
          )}
        />
      </div>
    </div>
  );
};
