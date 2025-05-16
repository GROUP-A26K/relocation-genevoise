import Button from '@/components/customs/Button';
import Input from '@/components/customs/Input';
import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';
import { FC } from 'react';

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
    <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-between gap-y-4 bg-primary-500 lg:p-16 p-6 rounded-xl gap-4">
      <div className="flex flex-col gap-4 max-w-xl text-white">
        <h2 className="lg:text-3xl text-2xl font-semibold !leading-[130%]">
          {heading}
        </h2>
        <p className="text-sm font-normal !leading-[130%]">
          {TextWithStrong(subHeading ?? '')}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2 items-center justify-start">
          <div className="flex rounded-full h-2 w-2 bg-white" />

          <p className="text-white text-sm !leading-[130%]">{statusTitle}</p>
        </div>
        <div className="flex lg:flex-row flex-col w-full items-center justify-start gap-2">
          <Input
            as="input"
            type="email"
            placeholder={inputPlaceholder}
            className="lg:w-[431px] w-full text-base h-10 bg-white focus-visible:border-white"
          />
          <Button
            as="outline"
            variant="md"
            type="primary"
            className="lg:w-fit w-full"
          >
            {buttonText}
          </Button>
        </div>
        <p className="text-sm font-normal text-white !leading-[130%]">
          We care about your data in our{' '}
          <span className="text-sm font-semibold !leading-[130%] cursor-pointer">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};
