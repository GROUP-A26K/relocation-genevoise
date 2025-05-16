import { FeatureColCard2 } from "@/components/customs/Card";
import { TextWithStrong } from "@/components/customs/Text/TextWithStrong";
import { Clock3, CloudUpload, MessagesSquare } from "lucide-react";
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
  buttonText?: string;
  buttonUrl?: string;
}

const Feature: FC<Props> = ({
  heading = "Simplicity & Speed",
  subHeading = "We’re an ambitious and smart teamwith a shared mission",
  description = "Our shared values keep us connected and guide us as one team.",
  reasonItems = [
    {
      title: "Contact with an advisor",
      description:
        "We exchange together to understand your situation, identify your specific needs and find the right solutions.",
      icon: MessagesSquare,
    },
    {
      title: "Return within 24h",
      description:
        "We will get back to you within 24 hours and will usually give you your quote within 48 hours after your first contact.",
      icon: Clock3,
    },
    {
      title: "Contract signing",
      description:
        "We proceed to sign a free brokerage mandate and present you the solutions of our partners.",
      icon: CloudUpload,
    },
    {
      title: "Contract signing",
      description:
        "We proceed to sign a free brokerage mandate and present you the solutions of our partners.",
      icon: CloudUpload,
    },
  ],
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-12">
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col lg:gap-6 gap-4 max-w-3xl lg:items-center text-left">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold lg:text-center text-left text-secondary-600 !leading-[130%]">
              {heading}
            </p>
            <h2 className="text-3xl font-semibold lg:text-center text-left !leading-[130%] text-balance">
              {TextWithStrong(subHeading)}
            </h2>
          </div>
          <p className="text-sm font-normal lg:text-center text-left text-black-200 !leading-[130%] text-balance">
            {description}
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:gap-8 gap-6">
        <ul role="list" className="grid gap-4 lg:grid-cols-4 lg:gap-8">
          {reasonItems.map((reasonItem) => (
            <li key={reasonItem.title} className="h-full">
              <FeatureColCard2 {...reasonItem} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Feature };
