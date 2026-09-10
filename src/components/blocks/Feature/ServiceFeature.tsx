import { FormattedText } from '@/components/customs/Text';
import { FeatureRowCard } from '@/components/customs/Card';

interface Reason {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
}

interface Props {
  heading?: string;
  subHeading?: string;
  reasons: {
    reasonName: string;
    reasonItems: Reason[];
  }[];
}

const ServiceFeature = ({
  heading = 'Discover our offers',
  subHeading = 'Our services',
  reasons,
}: Props) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="flex flex-col gap-3">
        <p className="text-sm leading-[130%]! font-semibold text-secondary-600">
          {heading}
        </p>
        <h2 className="text-3xl leading-[130%]! font-semibold">
          <FormattedText text={subHeading} />
        </h2>
      </div>
      {reasons.map((reason, i) => (
        <div key={i} className="flex flex-col gap-8 lg:gap-6">
          <h3 className="text-xl leading-[130%]! font-semibold lg:text-2xl">
            {reason.reasonName}
          </h3>

          <ul role="list" className="grid gap-4 lg:grid-cols-3 lg:gap-8">
            {reason.reasonItems.map((reasonItem) => (
              <li key={reasonItem.title}>
                <FeatureRowCard {...reasonItem} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export { ServiceFeature };
