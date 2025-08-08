import { FeatureRowCard2 } from "@/components/customs/Card";
import { FormattedText } from "@/components/customs/Text";
import Image from "next/image";
import HeroImage from "@/assets/img/bg/trouvez-facilement-votre-nouveau-chez-vous-geneve.webp";

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
  heading = "Discover our offers",
  subHeading = "Our services",
  features,
  description,
}: Props) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-12">
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col lg:gap-6 gap-4 max-w-3xl lg:items-center text-center">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold lg:text-center text-center text-secondary-600 !leading-[130%]">
              {heading}
            </p>
            <h2 className="text-3xl font-semibold lg:text-center text-center !leading-[130%] text-balance">
              <FormattedText text={subHeading} />
            </h2>
          </div>
          <p className="text-sm font-normal lg:text-center text-center text-black-200 !leading-[130%] text-balance">
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
      <div className="flex flex-col relative items-start justify-between">
        <div className="w-full">
          <Image
            alt="Agence de Relocation à Genève"
            title="Agence de Relocation à Genève"
            src={HeroImage}
            width={1240}
            height={380}
            className="aspect-video lg:h-[380px] lg:max-h-[380px] max-h-[226px] rounded-2xl w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
        </div>
      </div>
    </div>
  );
};

export { ServiceFeature2 };
