import { Fragment } from "react";
import { Check } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

import Section from "@/components/customs/Section";

type TMetric = {
  value: string;
  label: string;
};

interface IWhyChooseUsProps {
  eyebrow: string;
  heading: string;
  description: string;
  highlights: string[];
  metrics: TMetric[];
  image: {
    src: string | StaticImageData;
    alt: string;
  };
}

export default function WhyChooseUs({
  eyebrow,
  heading,
  description,
  highlights,
  metrics,
  image,
}: IWhyChooseUsProps) {
  return (
    <Section className="bg-black-700" childrenProps={{ className: "gap-16" }}>
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-24">
        <div className="flex flex-1 flex-col gap-3">
          <p className="text-sm font-semibold !leading-[130%] text-yellow-600">
            {eyebrow}
          </p>

          <div className="flex flex-col gap-8">
            <h2 className="text-pretty text-[32px] font-bold !leading-[130%] text-white lg:text-[40px]">
              {heading}
            </h2>

            <div className="flex flex-col gap-6">
              <p className="text-base font-normal !leading-[150%] text-grey-100">
                {description}
              </p>

              <ul className="flex flex-col gap-3">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="flex h-6 shrink-0 items-center">
                      <span className="flex size-[18px] items-center justify-center rounded-full bg-secondary-500">
                        <Check
                          className="size-3.5 text-black-500"
                          strokeWidth={3}
                        />
                      </span>
                    </span>
                    <span className="text-base font-normal !leading-[150%] text-grey-100">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative aspect-[572/420] w-full overflow-hidden rounded-3xl lg:flex-1">
          <Image
            src={image.src}
            alt={image.alt}
            title={image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            draggable={false}
          />
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-3xl bg-black-500 lg:flex-row">
        {metrics.map((metric, index) => (
          <Fragment key={metric.label}>
            <div className="flex flex-1 flex-col items-center gap-3 p-6 text-center lg:py-12">
              <p className="text-4xl font-bold !leading-[130%] text-white lg:text-[40px]">
                {metric.value}
              </p>
              <p className="text-base font-semibold !leading-[130%] text-grey-200 lg:text-lg">
                {metric.label}
              </p>
            </div>

            {index < metrics.length - 1 && (
              <div className="h-px w-[100px] self-center bg-white/10 lg:h-[100px] lg:w-px" />
            )}
          </Fragment>
        ))}
      </div>
    </Section>
  );
}
