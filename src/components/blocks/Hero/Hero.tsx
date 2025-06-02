import Image from "next/image";
import { FC } from "react";
import Button from "@/components/customs/Button";
import { Link } from "@/libs/i18nNavigation";
import { TextWithStrong } from "@/components/customs/Text/TextWithStrong";
import { ArrowRight } from "lucide-react";

interface Props {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
  heroImage: {
    src: string;
    alt: string;
    title: string;
  };
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

export const Hero: FC<Props> = ({
  subHeading = "Your independent broker in Geneva",
  description = "We work with the set of Swiss insurances companies to support companies, professionals and our private clients with solutions personalized thanks to our offices in Geneva and Switzerland.",
  button,
  button2,
  heroImage,
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-12">
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
            src={heroImage.src}
            width={1240}
            height={480}
            className="aspect-video lg:h-[480px] lg:max-h-[480px] max-h-[226px] rounded-2xl w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
        </div>
      </div>
    </div>
  );
};
