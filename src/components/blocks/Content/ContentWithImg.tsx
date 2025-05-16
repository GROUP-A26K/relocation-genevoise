import Button from "@/components/customs/Button";
import Image from "next/image";
import { FC } from "react";
import ContentWithImgBG from "@/assets/img/bg/assurance-genevoise-geneve-courtage.webp";
import Link from "next/link";
import { TextWithStrong } from "@/components/customs/Text/TextWithStrong";
interface Props {
  heading?: string;
  subHeading?: string;
  description?: { paragraph: string }[];
  buttonText?: string;
  buttonUrl?: string;
}

export const ContentWithImg: FC<Props> = ({
  buttonText,
  heading = "Why Insurance Geneva ?",
  subHeading = "Our expertise at your service",
  description,
  buttonUrl = "/",
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-14">
      <div className="flex flex-col lg:flex-row items-center justify-end lg:gap-16 gap-12">
        <Image
          src={ContentWithImgBG}
          alt="Assurance Genevoise, votre partenaire de confiance en Suisse"
          title="Assurance Genevoise, votre partenaire de confiance en Suisse"
          width={588}
          height={440}
          className="lg:max-h-[440px] xl:min-w-[588px] max-h-[226px]  rounded-2xl object-cover order-2 lg:order-2"
        />
        <div className="flex flex-col items-start gap-6 lg:justify-center text-left order-1 lg:order-1">
          <div className="flex flex-col lg:gap-6 gap-4">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-secondary-600 !leading-[130%]">
                {heading}
              </p>
              <h2 className="text-3xl font-semibold !leading-[130%]">
                {TextWithStrong(subHeading)}
              </h2>
            </div>
            <p className="lg:text-base text-sm font-normal text-black-200 !leading-[130%] flex flex-col gap-4">
              {description?.map((item, index) => (
                <span key={index}>{item.paragraph}</span>
              ))}
            </p>
          </div>
          {buttonText && (
            <Link href={buttonUrl} className="w-full">
              <Button
                as="solid"
                type="primary"
                variant="md"
                className="lg:w-fit w-full"
              >
                {buttonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
