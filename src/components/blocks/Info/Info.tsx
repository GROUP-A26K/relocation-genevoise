import { Building } from 'lucide-react';

import { InfoCard } from '@/components/customs/Card';
import { FormattedText } from '@/components/customs/Text';

import type { FC } from 'react';

interface Reason {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface Props {
  heading?: string;
  subHeading?: string;
  description?: string;
  reasonItems?: Reason[];
}

export const Info: FC<Props> = ({
  heading,
  subHeading = 'Need help? We are here for you!',
  description,
  reasonItems = [
    {
      title: 'Guaranteed Protection',
      description:
        'Ensure your valuable assets, property, and heritage are safeguarded for future generations.',
      icon: Building,
    },
    {
      title: 'Financial Stability',
      description:
        'Provide long-term financial security by ensuring a smooth transfer of wealth and assets',
      icon: Building,
    },
    {
      title: 'Legacy Preservation',
      description:
        'Secure your family’s inheritance and prevent legal disputes over wealth and property distribution.',
      icon: Building,
    },
  ],
}) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {heading && (
        <div className="flex w-full items-center justify-center">
          <div className="flex max-w-xl flex-col gap-4 text-left lg:items-center lg:gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-center text-sm leading-[130%]! font-semibold text-primary-500">
                {heading}
              </p>
              <h2 className="text-center text-3xl leading-[130%]! font-semibold">
                <FormattedText text={subHeading} />
              </h2>
            </div>
            <p className="text-center text-sm leading-[130%]! font-normal text-black-200">
              {description}
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-8 lg:gap-8">
        <div className="grid items-start divide-y divide-grey-100 lg:grid-cols-3 lg:gap-8 lg:divide-y-0">
          <div className="pb-6 lg:p-0">
            <InfoCard {...reasonItems[0]} />
          </div>

          <div className="p-6 lg:p-0">
            <InfoCard {...reasonItems[1]} />
          </div>

          <div className="pt-6 lg:p-0">
            <InfoCard {...reasonItems[2]} />
          </div>
        </div>
      </div>
    </div>
  );
};
