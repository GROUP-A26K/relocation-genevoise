import cn from 'classnames';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import { FormattedText } from '@/components/customs/Text';
import HeroImage from '@/assets/img/bg/agence-de-relocation-a-geneve.webp';
import { AnimatedGridPattern } from '@/components/ui/magicui/animated-grid-pattern';

import type { FC } from 'react';

interface Props {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
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

export const HomeHero: FC<Props> = ({
  subHeading = 'Your independent broker in Geneva',
  description = 'We work with the set of Swiss insurances companies to support companies, professionals and our private clients with solutions personalized thanks to our offices in Geneva and Switzerland.',
  button,
  heading,
  button2,
}) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[511px] overflow-hidden lg:h-[1216px]">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={1}
          duration={1.5}
          height={80}
          width={80}
          className={cn(
            'size-full stroke-yellow-50/75 text-yellow-25 lg:stroke-yellow-50/90',
            'mask-[radial-gradient(ellipse_50%_100%_at_50%_0%,white,transparent_95%)]',
            'mask-size-[724px_724px] mask-top mask-no-repeat',
            'lg:mask-size-[1216px_1216px]'
          )}
        />
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col gap-6">
          <div className="flex w-full max-w-xl flex-col gap-4 text-center lg:items-center lg:gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-center text-sm leading-[130%]! font-semibold text-secondary-600 lg:text-center">
                {heading}
              </p>
              <h1 className="text-center text-4xl leading-[130%]! font-bold text-balance lg:text-5xl">
                <FormattedText text={subHeading} />
              </h1>
            </div>
            <p className="text-center text-sm leading-[130%]! font-normal text-balance text-black-200">
              {description}
            </p>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-2 lg:flex-row">
            {button && (
              <Link href="/contact" className="w-full lg:w-fit">
                <Button
                  as="solid"
                  variant="md"
                  type="secondary"
                  className="w-full lg:w-fit"
                >
                  {button.text}
                </Button>
              </Link>
            )}
            {button2 && (
              <Link href="/find-accommodation" className="w-full lg:w-fit">
                <Button
                  as="outline"
                  variant="md"
                  type="primary"
                  iconEnd={ArrowRight}
                  className="w-full lg:w-fit"
                >
                  {button2.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-start justify-between">
        <div className="w-full">
          <Image
            alt="Agence de Relocation à Genève"
            title="Agence de Relocation à Genève"
            src={HeroImage}
            width={1240}
            height={480}
            className="aspect-video max-h-[226px] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2 lg:h-[480px] lg:max-h-[480px]"
          />
        </div>
      </div>
    </div>
  );
};
