import type { FC } from 'react';

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
    <div className="grid w-full gap-8 rounded-xl bg-grey-50 p-8 lg:grid-cols-3 lg:gap-8">
      <div className="flex flex-col gap-5">
        <div
          title={firstStat.value}
          className="line-clamp-1 text-center text-3xl leading-[130%]! font-semibold text-secondary-600"
        >
          {firstStat.value}
        </div>
        <p
          title={firstStat.label}
          className="line-clamp-1 text-center text-sm leading-[130%]! font-semibold text-black-500"
        >
          {firstStat.label}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div
          title={secondStat.value}
          className="line-clamp-1 text-center text-3xl leading-[130%]! font-semibold text-secondary-600"
        >
          {secondStat.value}
        </div>
        <p
          title={secondStat.value}
          className="line-clamp-1 text-center text-sm leading-[130%]! font-semibold text-black-500"
        >
          {secondStat.label}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div
          title={thirdStat.value}
          className="line-clamp-1 text-center text-3xl leading-[130%]! font-semibold text-secondary-600"
        >
          {thirdStat.value}
        </div>
        <p
          title={thirdStat.value}
          className="line-clamp-1 text-center text-sm leading-[130%]! font-semibold text-black-500"
        >
          {thirdStat.label}
        </p>
      </div>
    </div>
  );
};

export { StatsList };
