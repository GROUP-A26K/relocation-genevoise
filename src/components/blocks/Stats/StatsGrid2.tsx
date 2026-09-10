import Image from 'next/image';

import { FormattedText } from '@/components/customs/Text';
import StatsBG from '@/assets/img/bg/relocation-genevoise-a-geneve.webp';

import type { FC } from 'react';
interface Props {
  heading?: string;
  subHeading?: string;
  description?: string;
  link?: {
    text: string;
    url: string;
  };
  stats1?: {
    value: string;
    label: string;
  };
  stats2?: {
    value: string;
    label: string;
  };
  stats3?: {
    value: string;
    label: string;
  };
  stats4?: {
    value: string;
    label: string;
  };
}

const StatsGrid2: FC<Props> = ({
  heading = 'Reliability & transparency',
  subHeading = 'Your trusted partner in Switzerland',
  description = 'We are fully committed to our customers with transparency, responsiveness, and in-depth expertise.',
  stats1 = {
    value: '25+',
    label: 'Years experience',
  },
  stats2 = {
    value: '2500+',
    label: 'Accompanied clients',
  },
  stats3 = {
    value: '3',
    label: 'Mastered languages',
  },
  stats4 = {
    value: '4',
    label: 'Establishments in Switzerland',
  },
}) => {
  return (
    <div className="flex flex-col gap-14 lg:gap-16">
      <div className="flex max-w-[768px] flex-col gap-4 lg:gap-6">
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

      <div className="flex flex-col items-center justify-end gap-14 lg:flex-row lg:gap-16">
        <Image
          src={StatsBG}
          alt="Relocation Genevoise, votre partenaire de confiance en Suisse"
          title="Relocation Genevoise, votre partenaire de confiance en Suisse"
          width={616}
          height={380}
          className="order-2 max-h-[226px] rounded-2xl object-cover lg:order-1 lg:max-h-[380px] lg:min-w-[450px] xl:min-w-[616px]"
        />
        <div className="order-1 flex w-full flex-col items-center text-center lg:order-2 lg:w-full lg:justify-center lg:text-left">
          <div className="grid w-full items-center divide-y divide-grey-100 lg:divide-y-0">
            <div className="grid items-center divide-y divide-grey-100 lg:grid-cols-2 lg:items-start lg:divide-x-2 lg:divide-y-0 lg:divide-yellow-100 lg:pb-4">
              <div className="flex h-full flex-col items-center gap-3 border-l-0 border-yellow-100 pb-9 lg:items-start lg:border-l-2 lg:py-3 lg:pr-4 lg:pl-6">
                <div className="bg-clip-text text-5xl leading-[130%]! font-bold">
                  {stats1.value}
                </div>
                <p className="text-center text-lg leading-[130%]! font-semibold text-black-200 lg:text-left">
                  {stats1.label}
                </p>
              </div>

              <div className="flex h-full flex-col items-center gap-3 py-9 lg:items-start lg:py-3 lg:pl-6">
                <div className="bg-clip-text text-5xl leading-[130%]! font-bold">
                  {stats2.value}
                </div>
                <p className="text-center text-lg leading-[130%]! font-semibold text-black-200 lg:text-left">
                  {stats2.label}
                </p>
              </div>
            </div>

            <div className="grid items-center divide-y divide-grey-100 lg:grid-cols-2 lg:items-start lg:divide-x-2 lg:divide-y-0 lg:divide-yellow-100 lg:pt-4">
              <div className="flex h-full flex-col items-center gap-3 border-l-0 border-yellow-100 py-9 lg:items-start lg:border-l-2 lg:py-3 lg:pr-4 lg:pl-6">
                <div className="bg-clip-text text-5xl leading-[130%]! font-bold">
                  {stats3.value}
                </div>
                <p className="text-center text-lg leading-[130%]! font-semibold text-black-200 lg:text-left">
                  {stats3.label}
                </p>
              </div>

              <div className="flex h-full flex-col items-center gap-3 pt-9 lg:items-start lg:py-3 lg:pl-6">
                <div className="bg-clip-text text-5xl leading-[130%]! font-bold">
                  {stats4.value}
                </div>
                <p className="text-center text-lg leading-[130%]! font-semibold text-black-200 lg:text-left">
                  {stats4.label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { StatsGrid2 };
