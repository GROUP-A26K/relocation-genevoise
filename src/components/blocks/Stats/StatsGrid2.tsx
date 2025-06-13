import Image from 'next/image';
import { FC } from 'react';
import StatsBG from '@/assets/img/bg/relocation-genevoise-a-geneve.webp';
import { FormattedText } from '@/components/customs/Text';
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
    <div className="flex flex-col lg:gap-16 gap-14">
      <div className="flex flex-col lg:gap-6 gap-4 max-w-[768px]">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-secondary-600 !leading-[130%]">
            {heading}
          </p>
          <h2 className="text-3xl font-semibold !leading-[130%]">
            <FormattedText text={subHeading} />
          </h2>
        </div>
        <p className="text-sm font-normal text-black-200 !leading-[130%]">
          {description}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-end lg:gap-16 gap-14">
        <Image
          src={StatsBG}
          alt="Relocation Genevoise, votre partenaire de confiance en Suisse"
          title="Relocation Genevoise, votre partenaire de confiance en Suisse"
          width={616}
          height={380}
          className="lg:max-h-[380px] xl:min-w-[616px] lg:min-w-[450px] max-h-[226px] rounded-2xl object-cover lg:order-1 order-2"
        />
        <div className="flex flex-col items-center lg:justify-center text-center lg:text-left lg:w-full w-full lg:order-2 order-1">
          <div className="grid items-center lg:divide-y-0 divide-y divide-grey-100 w-full">
            <div className="grid lg:grid-cols-2 items-center lg:items-start lg:divide-x-2 divide-y lg:divide-yellow-100 divide-grey-100 lg:divide-y-0 lg:pb-4">
              <div className="flex flex-col gap-3 items-center lg:items-start lg:pl-6 lg:pr-4 lg:py-3 pb-9 lg:border-l-2 border-l-0 border-yellow-100 h-full">
                <div className="text-5xl font-bold  bg-clip-text !leading-[130%]">
                  {stats1.value}
                </div>
                <p className="text-lg lg:text-left text-center  font-semibold text-black-200 !leading-[130%]">
                  {stats1.label}
                </p>
              </div>

              <div className="flex flex-col gap-3 items-center lg:items-start lg:pl-6 lg:py-3 py-9 h-full">
                <div className="text-5xl font-bold  bg-clip-text !leading-[130%]">
                  {stats2.value}
                </div>
                <p className="text-lg lg:text-left text-center font-semibold text-black-200 !leading-[130%]">
                  {stats2.label}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 items-center lg:items-start lg:divide-x-2 divide-y lg:divide-y-0 lg:divide-yellow-100 divide-grey-100 lg:pt-4">
              <div className="flex flex-col gap-3 items-center lg:items-start lg:pl-6 lg:pr-4 lg:py-3 py-9 lg:border-l-2 border-l-0 border-yellow-100 h-full">
                <div className="text-5xl font-bold !leading-[130%] bg-clip-text">
                  {stats3.value}
                </div>
                <p className="text-lg lg:text-left text-center font-semibold text-black-200 !leading-[130%]">
                  {stats3.label}
                </p>
              </div>

              <div className="flex flex-col gap-3 items-center lg:items-start lg:pl-6 lg:py-3 pt-9 h-full">
                <div className="text-5xl font-bold bg-clip-text !leading-[130%]">
                  {stats4.value}
                </div>
                <p className="text-lg lg:text-left text-center font-semibold text-black-200 !leading-[130%]">
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
