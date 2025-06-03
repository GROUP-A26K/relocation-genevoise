import { InfoCard } from "@/components/customs/Card";
import { FormattedText } from "@/components/customs/Text";
import { Building } from "lucide-react";
import { FC } from "react";

interface Reason {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface Props {
  heading?: string;
  subHeading?: string;
  description?: string;
  reasonItems?: Reason[];
}

export const Info: FC<Props> = ({
  heading,
  subHeading = "Need help? We are here for you!",
  description,
  reasonItems = [
    {
      title: "Guaranteed Protection",
      description:
        "Ensure your valuable assets, property, and heritage are safeguarded for future generations.",
      icon: Building,
    },
    {
      title: "Financial Stability",
      description:
        "Provide long-term financial security by ensuring a smooth transfer of wealth and assets",
      icon: Building,
    },
    {
      title: "Legacy Preservation",
      description:
        "Secure your family’s inheritance and prevent legal disputes over wealth and property distribution.",
      icon: Building,
    },
  ],
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-12">
      {heading && (
        <div className="flex w-full items-center justify-center">
          <div className="flex flex-col lg:gap-6 gap-4 max-w-xl lg:items-center text-left">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-center text-primary-500 !leading-[130%]">
                {heading}
              </p>
              <h2 className="text-3xl font-semibold text-center !leading-[130%]">
                <FormattedText text={subHeading} />
              </h2>
            </div>
            <p className="text-sm font-normal text-center text-black-200 !leading-[130%]">
              {description}
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col lg:gap-8 gap-8">
        <div className="grid lg:grid-cols-3 lg:gap-8 items-start lg:divide-y-0 divide-y divide-grey-100">
          <div className="lg:p-0 pb-6">
            <InfoCard {...reasonItems[0]} />
          </div>

          <div className="lg:p-0 p-6">
            <InfoCard {...reasonItems[1]} />
          </div>

          <div className="lg:p-0 pt-6">
            <InfoCard {...reasonItems[2]} />
          </div>
        </div>
      </div>
    </div>
  );
};
