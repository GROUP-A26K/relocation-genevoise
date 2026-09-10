import Input from '@/components/customs/Input';
import Button from '@/components/customs/Button';
import { FormattedText } from '@/components/customs/Text';

import type { FC } from 'react';

interface Props {
  heading?: string;
  subHeading?: string;
  statusTitle?: string;
  buttonText?: string;
  inputPlaceholder?: string;
  inputText?: string;
  link?: {
    text: string;
    url: string;
  };
}

export const ContactUsNow: FC<Props> = ({
  heading,
  subHeading,
  statusTitle,
  buttonText,
  inputPlaceholder,
}) => {
  return (
    <div className="grid grid-cols-1 items-start justify-between gap-4 gap-y-4 rounded-xl bg-primary-500 p-6 lg:grid-cols-2 lg:p-16">
      <div className="flex max-w-xl flex-col gap-4 text-white">
        <h2 className="text-2xl leading-[130%]! font-semibold lg:text-3xl">
          {heading}
        </h2>
        <p className="text-sm leading-[130%]! font-normal">
          <FormattedText text={subHeading ?? ''} />
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-start gap-2">
          <div className="flex h-2 w-2 rounded-full bg-white" />

          <p className="text-sm leading-[130%]! text-white">{statusTitle}</p>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-2 lg:flex-row">
          <Input
            as="input"
            type="email"
            placeholder={inputPlaceholder}
            className="h-10 w-full bg-white text-base focus-visible:border-white lg:w-[431px]"
          />
          <Button
            as="outline"
            variant="md"
            type="primary"
            className="w-full lg:w-fit"
          >
            {buttonText}
          </Button>
        </div>
        <p className="text-sm leading-[130%]! font-normal text-white">
          We care about your data in our{' '}
          <span className="cursor-pointer text-sm leading-[130%]! font-semibold">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};
