import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';

export interface IStatsListProps {
  firstStat?: TStatDocument;
  secondStat?: TStatDocument;
  thirdStat?: TStatDocument;
}

export type TStatDocument = {
  label?: string;
  value?: string;
};

const StatsList: React.FC<IStatsListProps> = ({
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
      <RevealItem className="flex flex-col gap-5">
        <BodyText
          asChild
          className="line-clamp-1 text-center text-3xl font-semibold text-secondary-600"
        >
          <div title={firstStat.value}>{firstStat.value}</div>
        </BodyText>
        <BodyText
          variant="sm"
          title={firstStat.label}
          className="line-clamp-1 text-center font-semibold text-black-500"
        >
          {firstStat.label}
        </BodyText>
      </RevealItem>

      <RevealItem className="flex flex-col gap-5">
        <BodyText
          asChild
          className="line-clamp-1 text-center text-3xl font-semibold text-secondary-600"
        >
          <div title={secondStat.value}>{secondStat.value}</div>
        </BodyText>
        <BodyText
          variant="sm"
          title={secondStat.value}
          className="line-clamp-1 text-center font-semibold text-black-500"
        >
          {secondStat.label}
        </BodyText>
      </RevealItem>

      <RevealItem className="flex flex-col gap-5">
        <BodyText
          asChild
          className="line-clamp-1 text-center text-3xl font-semibold text-secondary-600"
        >
          <div title={thirdStat.value}>{thirdStat.value}</div>
        </BodyText>
        <BodyText
          variant="sm"
          title={thirdStat.value}
          className="line-clamp-1 text-center font-semibold text-black-500"
        >
          {thirdStat.label}
        </BodyText>
      </RevealItem>
    </div>
  );
};

export { StatsList };
