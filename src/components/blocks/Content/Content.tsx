import { FormattedText } from '@/components/customs/Text';

import type { FC } from 'react';

interface Props {
  heading?: string;
  subHeading?: string;
  description?: { paragraph: string }[];
  link?: {
    text: string;
    url: string;
  };
}

export const Content: FC<Props> = ({
  heading = 'Trust and Transparency',
  subHeading = 'Why take out property and property insurance?',
  description,
}) => {
  return (
    <div className="flex flex-col gap-14 lg:gap-16">
      <div className="flex flex-col justify-between gap-6 lg:flex-row">
        <div className="flex w-full flex-col items-start justify-start gap-3 text-left">
          <p className="text-sm leading-[130%]! font-semibold text-secondary-600">
            {heading}
          </p>
          <h2 className="text-3xl leading-[130%]! font-semibold">
            <FormattedText text={subHeading} />
          </h2>
        </div>
        <div className="flex max-w-[600px] flex-col items-start justify-start gap-6 text-left">
          <p className="flex flex-col gap-4 text-sm leading-[130%]! font-normal text-black-200 lg:text-sm">
            {description?.map((item, index) => (
              <FormattedText text={item.paragraph} key={index} />
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};
