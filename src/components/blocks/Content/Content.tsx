import { FormattedText } from "@/components/customs/Text";
import { TextWithStrong } from "@/components/customs/Text/TextWithStrong";
import { FC } from "react";

interface Props {
  heading?: string;
  subHeading?: string;
  description?: { paragraph: string }[];
  link?: {
    text: string;
    url: string;
  };
}

export const Content: FC<Props> = ({
  heading = "Trust and Transparency",
  subHeading = "Why take out property and property insurance?",
  description,
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-14">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="w-full flex flex-col items-start gap-3 text-left justify-start">
          <p className="text-sm font-semibold text-secondary-500 !leading-[130%]">
            {heading}
          </p>
          <h2 className="text-3xl font-semibold !leading-[130%]">
            {TextWithStrong(subHeading)}
          </h2>
        </div>
        <div className="max-w-[600px] flex flex-col items-start gap-6 text-left justify-start">
          <p className="lg:text-sm text-sm font-normal text-black-200 !leading-[130%] flex flex-col gap-4">
            {description?.map((item, index) => (
              <FormattedText text={item.paragraph} key={index} />
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};
