import { ArrowRight } from 'lucide-react';

import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import { FormattedText } from '@/components/customs/Text';

import type { FC } from 'react';

interface Props {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
  buttonText1?: string;
  buttonText2?: string;
  buttonUrl?: string;
}

export const BookConsultation2: FC<Props> = ({
  heading = 'Book a consultation',
  subHeading = 'A question ? Our advisors are here to guide you',
  description = 'Benefit from personalized advice and support that meets your needs.',
  buttonText1 = 'Call me',
  buttonText2 = 'Contact me',
}) => {
  return (
    <div className="flex flex-col gap-12 rounded-xl bg-grey-50 py-12 lg:gap-16 lg:py-16">
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full flex-col items-center gap-4 text-left lg:gap-8">
          <div className="flex max-w-[720px] flex-col items-center gap-3">
            <p className="text-center text-sm leading-[130%]! font-semibold text-secondary-600 lg:text-center">
              {heading}
            </p>
            <h2 className="text-center text-2xl leading-[130%]! font-semibold text-balance text-black-500 lg:text-3xl">
              <FormattedText text={subHeading} />
            </h2>
            <p className="text-center text-sm leading-[130%]! font-normal text-balance text-black-200">
              {description}
            </p>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row lg:gap-4">
            <Link href="/contact" className="w-full sm:w-fit">
              <Button
                as="solid"
                variant="md"
                type="primary"
                className="w-full sm:w-fit"
              >
                {buttonText1}
              </Button>
            </Link>
            <Link href="/find-accommodation" className="w-full sm:w-fit">
              <Button
                as="outline"
                variant="md"
                type="primary"
                iconEnd={ArrowRight}
                className="w-full sm:w-fit"
              >
                {buttonText2}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
