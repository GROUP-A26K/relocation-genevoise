import Button from "@/components/customs/Button";
import { FormattedText } from "@/components/customs/Text";
import { getText } from "@/components/customs/Text/TextWithStrong";
import { cn } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  heading?: string;
  subHeading?: string;
  description?: { paragraph: string }[];
  buttonText?: string;
  imgSrc?: string;
  link?: {
    text: string;
    url: string;
  };
}

export const InsurancesDetailHero: FC<Props> = ({
  heading = "Insurance",
  subHeading = "Assurance of things and heritage",
  description,
  buttonText = "Call me",
  imgSrc = "https://www.shadcnblocks.com/images/block/placeholder-1.svg",
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-14">
      <div className="flex flex-col lg:flex-row items-center justify-end lg:gap-16 gap-12">
        <div className="flex flex-col items-start gap-6 lg:justify-center lg:text-left text-center">
          <div className="flex flex-col lg:gap-6 gap-4">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-secondary-500 !leading-[130%]">
                {heading}
              </p>
              <h1 className="2xl:text-5xl xl:text-4xl text-4xl font-bold !leading-[130%]">
                <FormattedText text={subHeading} />
              </h1>
            </div>
            <p className="lg:text-sm text-sm font-normal text-black-200 !leading-[130%] flex flex-col gap-4">
              {description?.map((item, index) => (
                <span key={index}>{item.paragraph}</span>
              ))}
            </p>
          </div>
          <Link href={"/rappelez-moi"} className="lg:w-fit w-full">
            <Button as="solid" type="primary" variant="md">
              {buttonText}
            </Button>
          </Link>
        </div>

        <Image
          src={imgSrc}
          alt={`Assurance Genevoise,${heading} ${getText(subHeading)}`}
          title={`${getText(subHeading)}, ${description}`}
          width={588}
          height={560}
          className={cn(
            "rounded-2xl object-cover",
            "xl:min-h-[560px] lg:min-h-[400px] min-h-[226px]",
            "xl:min-w-[588px] lg:min-w-[400px] min-w-[226px]",
            "lg:max-h-[560px] max-h-[226px]"
          )}
        />
      </div>
    </div>
  );
};
