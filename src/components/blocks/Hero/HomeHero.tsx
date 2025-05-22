import BlocksBackground from "@/assets/img/bg/blocks-bg.svg";
import Image from "next/image";
import { FC } from "react";
import Button from "@/components/customs/Button";
import { Link } from "@/libs/i18nNavigation";
import HeroImage from "@/assets/img/bg/agence-de-relocation a-geneve.webp";
import { TextWithStrong } from "@/components/customs/Text/TextWithStrong";
import { ArrowRight } from "lucide-react";

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
  button2,
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-12">
      <div className="flex justify-center absolute size-full lg:top-0 top-0 inset-0 -z-10">
        <Image
          width={1240}
          height={1226}
          alt="Agence de Relocation à Genève"
          title="Agence de Relocation à Genève"
          src={BlocksBackground}
          className="flex min-w-1240 min-h-1226 object-cover  stroke-gray-200 lg:[mask-image:radial-gradient(circle_at_50%_40%,white,transparent)] [mask-image:radial-gradient(circle_at_50%_5%,white,transparent)]"
        />
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:gap-6 gap-4 max-w-xl w-full lg:items-center text-left">
            <div className="flex flex-col gap-3">
              <h1 className="lg:text-5xl text-4xl font-bold text-center text-balance !leading-[130%]">
                {TextWithStrong(subHeading)}
              </h1>
            </div>
            <p className="text-sm font-normal text-center text-black-200 !leading-[130%] text-balance">
              {description}
            </p>
            {/* <ul
              role="list"
              className="flex flex-col lg:flex-row gap-3 lg:gap-6 w-full items-center justify-center"
            >
              {[experience, customer].map((text) => (
                <li
                  key={text}
                  className="flex flex-row items-center gap-1 lg:w-[236px]"
                >
                  <CircleCheck
                    aria-hidden="true"
                    className="h-4 w-4 lg:h-6 lg:w-6 text-primary-500"
                  />
                  <span className="text-sm font-semibold text-black-500 leading-[130%]">
                    {text}
                  </span>
                </li>
              ))}
            </ul> */}
          </div>

          <div className="flex flex-row gap-2 w-full items-center justify-center">
            {button && (
              <Link href={"/rappelez-moi"}>
                <Button as="solid" variant="md" type="secondary">
                  {button.text}
                </Button>
              </Link>
            )}
            {button2 && (
              <Link href={"/contact"}>
                <Button
                  as="outline"
                  variant="md"
                  type="primary"
                  iconEnd={ArrowRight}
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
