import { FC } from 'react';

export interface StatsBlock {
  firstStat?: StatDocument;
  secondStat?: StatDocument;
  thirdStat?: StatDocument;
}

export interface StatDocument {
  label?: string;
  value?: string;
}

const StatsList: FC<StatsBlock> = ({
  firstStat = {
    value: '400+',
    label: 'Projects completed',
  },
  secondStat = {
    value: '600%',
    label: 'Return on investment',
  },
  thirdStat = {
    value: '10k',
    label: 'Global downloads',
  },
}) => {
  return (
    <div className="w-full grid gap-8 lg:grid-cols-3 lg:gap-8 bg-grey-50 rounded-xl p-8">
      <div className="flex flex-col gap-5">
        <div
          title={firstStat.value}
          className="line-clamp-1 text-3xl font-semibold !leading-[130%] text-primary-500 text-center"
        >
          {firstStat.value}
        </div>
        <p
          title={firstStat.label}
          className="line-clamp-1 text-sm font-semibold !leading-[130%] text-black-500 text-center"
        >
          {firstStat.label}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div
          title={secondStat.value}
          className="line-clamp-1 text-3xl font-semibold !leading-[130%] text-primary-500 text-center"
        >
          {secondStat.value}
        </div>
        <p
          title={secondStat.value}
          className="line-clamp-1 text-sm font-semibold !leading-[130%] text-black-500 text-center"
        >
          {secondStat.label}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div
          title={thirdStat.value}
          className="line-clamp-1 text-3xl font-semibold !leading-[130%] text-primary-500 text-center"
        >
          {thirdStat.value}
        </div>
        <p
          title={thirdStat.value}
          className="line-clamp-1 text-sm font-semibold !leading-[130%] text-black-500 text-center"
        >
          {thirdStat.label}
        </p>
      </div>
    </div>
  );
};

export { StatsList };
