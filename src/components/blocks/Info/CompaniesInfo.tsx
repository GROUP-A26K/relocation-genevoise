import { CompanyCard } from "@/components/customs/Card";
import { FormattedText } from "@/components/customs/Text";
import { Building } from "lucide-react";
import { FC } from "react";

interface Item {
  title: string;
  description?: string;
  info?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  subItems?: Item[];
}

interface Props {
  heading?: string;
  subHeading?: string;
  description?: string;
  linkText?: string;
  items?: Item[];
}

export const CompaniesInfo: FC<Props> = ({
  heading,
  subHeading = "Need help? We are here for you!",
  description,
  items = [
    {
      title: "Professional liability insurance",
      description: "Complete protection for your property and your future.",
      icon: Building,
      link: "/particulier/assurance/assurance-animaux",
      subItems: [
        {
          title: "Animal insurance",
          description: "Protect your pets with comprehensive coverage.",
          icon: Building,
          link: "/particulier/assurance/assurance-animaux",
        },
        {
          title: "Home insurance",
          description: "Secure your home against unforeseen events.",
          icon: Building,
          link: "/particulier/assurance/assurance-habitation",
        },
        {
          title: "Health insurance",
          description: "Ensure your health with our tailored plans.",
          icon: Building,
          link: "/particulier/assurance/assurance-sante",
        },
      ],
    },
  ],
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-12">
      {heading && (
        <div className="flex w-full items-center justify-center">
          <div className="flex flex-col lg:gap-6 gap-4 max-w-xl lg:items-center text-left">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-center text-secondary-500 !leading-[130%]">
                {heading}
              </p>
              <h1 className="text-3xl font-bold text-center !leading-[130%]">
                <FormattedText text={subHeading} />
              </h1>
            </div>
            <p className="text-sm font-normal text-center text-black-200 !leading-[130%]">
              {description}
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col lg:gap-8 gap-8">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col lg:gap-8 gap-8">
            <h3 className="flex lg:text-2xl text-xl font-semibold !leading-[130%] pl-4 border-l-4 border-secondary-500">
              {item.title}
            </h3>

            <ul role="list" className="grid gap-4 lg:grid-cols-3 lg:gap-8">
              {item.subItems &&
                item?.subItems.map((subItem, j) => (
                  <li key={subItem.title} className="h-full">
                    <CompanyCard
                      key={`${i}-${j}`}
                      title={subItem.title}
                      description={subItem.description}
                      icon={subItem.icon}
                    />
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
