import { FormattedText } from "@/components/customs/Text";
import { getText } from "@/components/customs/Text/TextWithStrong";
import { cn } from "@/libs/utils";
import Image from "next/image";
import { FC } from "react";

interface Reason {
  title: string;
  description: string;
}

interface Props {
  heading?: string;
  subHeading?: string;
  description?: string;
  reasonItems?: Reason[];
  imageSrc?: string;
}

export const InsurancesFeature: FC<Props> = ({
  heading = "Features",
  subHeading = "Why choose us ?",
  description = "Spend smarter, lower your bills, get cashback on everything you buy, and unlock credit to grow your business.",
  reasonItems = [
    {
      title: "Personalized expertise",
      description:
        "We carefully analyze your specific needs to offer you tailor-made’assurance solutions. Your protection is at the heart of our priorities, and we ensure that every detail is taken into account.",
    },
    {
      title: "Access to the widest range of’assurers",
      description:
        "Thanks to our network of partners, we compare the best offers on the market to ensure excellent value for money. You benefit from diversified solutions adapted to your budget.",
    },
    {
      title: "Accompaniment from A to Z",
      description:
        "We are at your side at every step : from the subscription to the monitoring of claims. Our commitment is to make your steps simple and effective while saving you unnecessary hassle.",
    },
    {
      title: "Relationship of trust and transparency",
      description:
        "We favor a lasting and transparent relationship with our customers, without hidden costs or unrealistic promises. Your satisfaction is our best reward, and we work to earn your trust every day.",
    },
  ],
  imageSrc = "https://www.shadcnblocks.com/images/block/placeholder-1.svg",
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-12">
      <div className="flex w-full justify-start">
        <div className="flex flex-col lg:gap-4 gap-4 max-w-3xl text-left">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-secondary-500 !leading-[130%]">
              {heading}
            </p>
            <h2 className="text-3xl font-semibold !leading-[130%]">
              <FormattedText text={subHeading} />
            </h2>
          </div>
          <p className="text-sm font-normal text-black-200 !leading-[130%]">
            {description}
          </p>
        </div>
      </div>
      <div className="flex xl:flex-row flex-col xl:gap-16 gap-12 xl:justify-between items-center">
        <div className="flex flex-col justify-center">
          {reasonItems.map((reasonItem, i) => (
            <div
              key={i}
              className="xl:max-w-[536px] w-full  lg:p-6 p-4 pl-6 !pr-0 flex flex-col text-black-500 border-l-4 border-gray-100 hover:border-primary-500 lg:gap-3 gap-1"
            >
              <h3 className="text-xl font-semibold !leading-[130%]">
                {reasonItem.title}
              </h3>
              <p className="lg:text-sm text-sm text-black-200 font-normal !leading-[130%]">
                <FormattedText text={reasonItem.description} />
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <Image
            src={imageSrc}
            alt={`${heading}, ${getText(subHeading)}`}
            title={`${description}`}
            width={616}
            height={640}
            className={cn(
              "rounded-2xl object-cover",
              "xl:min-h-[640px] lg:min-h-[400px] max-h-[326px]",
              "xl:min-w-[616px] lg:min-w-[700px] min-w-[326px]",
              "lg:max-h-[640px] max-h-[326px]"
            )}
          />
        </div>
      </div>
    </div>
  );
};
