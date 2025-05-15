import Image from "next/image";
import { FC } from "react";
import StatsBG from "@/assets/img/bg/assurance-genevoise-a-geneve.webp";
import { TextWithStrong } from "@/components/customs/Text/TextWithStrong";
interface Props {
  heading?: string;
  subHeading?: string;
  description?: string;
  link?: {
    text: string;
    url: string;
  };
  stats1?: {
    value: string;
    label: string;
  };
  stats2?: {
    value: string;
    label: string;
  };
  stats3?: {
    value: string;
    label: string;
  };
  stats4?: {
    value: string;
    label: string;
  };
}

const StatsGrid: FC<Props> = ({
  heading = "Reliability & transparency",
  subHeading = "Your trusted partner in Switzerland",
  description = "We are fully committed to our customers with transparency, responsiveness, and in-depth expertise.",
  stats1 = {
    value: "25+",
    label: "Years experience",
  },
  stats2 = {
    value: "2500+",
    label: "Accompanied clients",
  },
  stats3 = {
    value: "3",
    label: "Mastered languages",
  },
  stats4 = {
    value: "4",
    label: "Establishments in Switzerland",
  },
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-14">
      <div className="flex flex-col lg:gap-6 gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-primary-500 !leading-[130%]">
            {heading}
          </p>
          <h2 className="text-3xl font-semibold !leading-[130%]">
            {TextWithStrong(subHeading)}
          </h2>
        </div>
        <p className="text-sm font-normal text-black-200 !leading-[130%]">
          {description}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-end lg:gap-16 gap-14">
        <div className="flex flex-col items-center lg:justify-center text-center lg:text-left lg:w-full w-full">
          <div className="grid items-center divide-y divide-grey-100 w-full">
            <div className="grid lg:grid-cols-2 items-center lg:items-start lg:divide-x divide-y divide-grey-100 lg:divide-y-0 lg:pb-3">
              <div className="flex flex-col gap-3 items-center lg:pr-4 lg:py-3 pb-9">
                <div className="text-5xl font-bold  bg-gradient-to-r from-secondary-902 to-secondary-901 text-transparent bg-clip-text !leading-[130%]">
                  {stats1.value}
                </div>
                <p className="text-lg text-center font-semibold text-black-200 !leading-[130%]">
                  {stats1.label}
                </p>
              </div>

              <div className="flex flex-col gap-3 items-center lg:pl-4 lg:py-3 py-9">
                <div className="text-5xl font-bold  bg-gradient-to-r from-secondary-902 to-secondary-901 text-transparent bg-clip-text !leading-[130%]">
                  {stats2.value}
                </div>
                <p className="text-lg text-center font-semibold text-black-200 !leading-[130%]">
                  {stats2.label}
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 items-center lg:items-start lg:divide-x divide-y lg:divide-y-0 divide-grey-100 lg:pt-3">
              <div className="flex flex-col gap-3 items-center lg:pr-4 lg:py-3 py-9">
                <div className="text-5xl font-bold !leading-[130%] bg-gradient-to-r from-secondary-902 to-secondary-901 text-transparent bg-clip-text">
                  {stats3.value}
                </div>
                <p className="text-lg text-center font-semibold text-black-200 !leading-[130%]">
                  {stats3.label}
                </p>
              </div>

              <div className="flex flex-col gap-3 items-center lg:pl-4 lg:py-3 pt-9">
                <div className="text-5xl font-bold bg-gradient-to-r from-secondary-902 to-secondary-901 text-transparent bg-clip-text !leading-[130%]">
                  {stats4.value}
                </div>
                <p className="text-lg text-center font-semibold text-black-200 !leading-[130%]">
                  {stats4.label}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Image
          src={StatsBG}
          alt="Assurance Genevoise, votre partenaire de confiance en Suisse"
          title="Assurance Genevoise, votre partenaire de confiance en Suisse"
          width={616}
          height={380}
          className="lg:max-h-[380px] xl:min-w-[616px] lg:min-w-[450px]  max-h-[226px]  rounded-2xl object-cover"
        />
      </div>
    </div>
  );
};

export { StatsGrid };
