import Button from '@/components/customs/Button';

import { FC } from 'react';
import { Link } from '@/libs/i18nNavigation';
import { FormattedText } from '@/components/customs/Text';
import { ArrowRight } from 'lucide-react';

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
    <div className='flex flex-col lg:gap-16 gap-12 py-12 rounded-xl bg-grey-50'>
      <div className='flex w-full items-center justify-center'>
        <div className='flex flex-col lg:gap-8 gap-4 w-full lg:items-center text-left'>
          <div className='flex flex-col gap-3 max-w-[720px]'>
            <p className='text-sm font-semibold lg:text-center text-center text-secondary-600 !leading-[130%]'>
              {heading}
            </p>
            <h2 className='text-2xl font-semibold text-center !leading-[130%] text-balance'>
              <FormattedText text={subHeading} />
            </h2>
            <p className='text-sm font-normal text-center text-black-200 !leading-[130%] text-balance'>
              {description}
            </p>
          </div>

          <div className='flex lg:flex-row flex-col gap-2 w-full items-center justify-center'>
            <Link href={'/rappelez-moi'} className='lg:w-fit w-full'>
              <Button
                as='solid'
                variant='md'
                type='primary'
                className='lg:w-fit w-full'
              >
                {buttonText1}
              </Button>
            </Link>
            <Link href={'/contact'} className='lg:w-fit w-full'>
              <Button
                as='outline'
                variant='md'
                type='primary'
                iconEnd={ArrowRight}
                className='lg:w-fit w-full'
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
