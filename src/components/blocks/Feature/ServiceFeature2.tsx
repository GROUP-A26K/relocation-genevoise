import Image from 'next/image';

import { FormattedText } from '@/components/customs/Text';
import { FeatureRowCard2 } from '@/components/customs/Card';
import HeroImage from '@/assets/img/bg/trouvez-facilement-votre-nouveau-chez-vous-geneve.webp';

interface Feature {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
}

interface Props {
  heading?: string;
  subHeading?: string;
  description: string;
  features: Feature[];
}

const ServiceFeature2 = ({
  heading = 'Discover our offers',
  subHeading = 'Our services',
  features,
  description,
}: Props) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="flex w-full items-center justify-center">
        <div className="flex max-w-3xl flex-col gap-4 text-center lg:items-center lg:gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-center text-sm leading-[130%]! font-semibold text-secondary-600 lg:text-center">
              {heading}
            </p>
            <h2 className="text-center text-3xl leading-[130%]! font-semibold text-balance lg:text-center">
              <FormattedText text={subHeading} />
            </h2>
          </div>
          <p className="text-center text-sm leading-[130%]! font-normal text-balance text-black-200 lg:text-center">
            {description}
          </p>
        </div>
      </div>
      <ul role="list" className="grid gap-4 lg:grid-cols-3 lg:gap-8">
        {features.map((feature) => (
          <li key={feature.title}>
            <FeatureRowCard2 {...feature} />
          </li>
        ))}
      </ul>
      <div className="relative flex flex-col items-start justify-between">
        <div className="w-full">
          <Image
            alt="Agence de Relocation à Genève"
            title="Agence de Relocation à Genève"
            src={HeroImage}
            width={1240}
            height={380}
            className="aspect-video max-h-[226px] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2 lg:h-[380px] lg:max-h-[380px]"
          />
        </div>
      </div>
    </div>
  );
};

export { ServiceFeature2 };
