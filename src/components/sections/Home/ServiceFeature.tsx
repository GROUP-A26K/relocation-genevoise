import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import { FormattedText } from '@/components/common/Text';
import { FeatureRowCard } from '@/components/common/Card';
import HeadingText from '@/components/common/Text/HeadingText';
import HeroImage from '@/assets/images/home/trouvez-facilement-votre-nouveau-chez-vous-geneve.webp';

import type { THref } from '@/libs/i18nNavigation';

export type TFeature = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: THref;
};

interface IServiceFeatureProps {
  heading?: string;
  subHeading?: string;
  description: string;
  features: TFeature[];
}

const ServiceFeature = ({
  heading = 'Discover our offers',
  subHeading = 'Our services',
  features,
  description,
}: IServiceFeatureProps) => {
  const imageT = useTranslations('Images');

  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <RevealItem className="flex w-full items-center justify-center">
        <div className="flex max-w-3xl flex-col gap-4 text-center lg:items-center lg:gap-6">
          <div className="flex flex-col gap-3">
            <BodyText
              variant="sm"
              className="text-center font-semibold text-secondary-600 lg:text-center"
            >
              {heading}
            </BodyText>
            <HeadingText
              as="h2"
              className="text-center text-3xl font-semibold text-balance text-inherit lg:text-center"
            >
              <FormattedText text={subHeading} />
            </HeadingText>
          </div>
          <BodyText
            variant="sm"
            className="text-center text-balance lg:text-center"
          >
            {description}
          </BodyText>
        </div>
      </RevealItem>
      <RevealItem
        as="ul"
        role="list"
        className="grid gap-4 lg:grid-cols-3 lg:gap-8"
      >
        {features.map((feature) => (
          <li key={feature.title}>
            <FeatureRowCard {...feature} />
          </li>
        ))}
      </RevealItem>
      <RevealItem className="relative aspect-1240/380 w-full overflow-hidden rounded-3xl">
        <Image
          alt={imageT('home.services')}
          title={imageT('home.services')}
          src={HeroImage}
          placeholder="blur"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </RevealItem>
    </div>
  );
};

export { ServiceFeature };
