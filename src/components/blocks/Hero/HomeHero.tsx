import cn from "classnames";
import { FC } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Link } from "@/libs/i18nNavigation";
import Button from "@/components/customs/Button";
import { FormattedText } from "@/components/customs/Text";
import HeroImage from "@/assets/img/bg/agence-de-relocation-a-geneve.webp";
import { AnimatedGridPattern } from "@/components/ui/magicui/animated-grid-pattern";

interface Props {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
  button?: {
    text?: string;
    url?: string;
  };
  button2?: {
    text?: string;
    url?: string;
  };
  buttonUrl?: string;
}

export const HomeHero: FC<Props> = ({
  subHeading = "Your independent broker in Geneva",
  description = "We work with the set of Swiss insurances companies to support companies, professionals and our private clients with solutions personalized thanks to our offices in Geneva and Switzerland.",
  button,
  heading,
  button2,
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-12">
      <div className="flex justify-center absolute size-full lg:top-0 top-0 inset-0 -z-10">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={1}
          duration={1.5}
          height={80}
          width={80}
          className={cn(
            "min-h-1226",
            "[mask-image:radial-gradient(450px_circle_at_center,white,transparent)]",
            "md:[mask-image:radial-gradient(380px_circle_at_center,white,transparent)]",
            "lg:[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
          )}
        />
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:gap-6 gap-4 max-w-xl w-full lg:items-center text-center">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold lg:text-center text-center text-secondary-600 !leading-[130%]">
                {heading}
              </p>
              <h1 className="lg:text-5xl text-4xl font-bold text-center text-balance !leading-[130%]">
                <FormattedText text={subHeading} />
              </h1>
            </div>
            <p className="text-sm font-normal text-center text-black-200 !leading-[130%] text-balance">
              {description}
            </p>
          </div>

          <div className="flex lg:flex-row flex-col gap-2 w-full items-center justify-center">
            {button && (
              <Link href={"/contact"} className="lg:w-fit w-full">
                <Button
                  as="solid"
                  variant="md"
                  type="secondary"
                  className="lg:w-fit w-full"
                >
                  {button.text}
                </Button>
              </Link>
            )}
            {button2 && (
              <Link href={"/find-accommodation"} className="lg:w-fit w-full">
                <Button
                  as="outline"
                  variant="md"
                  type="primary"
                  iconEnd={ArrowRight}
                  className="lg:w-fit w-full"
                >
                  {button2.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col relative items-start justify-between">
        <div className="w-full">
          <Image
            alt="Agence de Relocation à Genève"
            title="Agence de Relocation à Genève"
            src={HeroImage}
            width={1240}
            height={480}
            className="aspect-video lg:h-[480px] lg:max-h-[480px] max-h-[226px] rounded-2xl w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
        </div>
      </div>
    </div>
  );
};
