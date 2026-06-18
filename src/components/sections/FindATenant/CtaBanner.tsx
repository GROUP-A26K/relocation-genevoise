import { ArrowRight } from "lucide-react";

import { Link } from "@/libs/i18nNavigation";
import Button from "@/components/customs/Button";
import Section from "@/components/customs/Section";

type TCta = {
  text: string;
  href: string;
};

interface ICtaBannerProps {
  heading: string;
  description: string;
  cta: TCta;
}

export default function CtaBanner({
  heading,
  description,
  cta,
}: ICtaBannerProps) {
  return (
    <Section
      className="bg-white"
      wrapperProps={{ className: "px-0 pt-0 xl:pt-0" }}
      dividerProps={{ className: "pt-0 lg:pt-16" }}
    >
      <div className="flex flex-col items-center gap-8 bg-grey-50 px-4 py-12 text-center lg:p-16 lg:rounded-3xl">
        <div className="flex max-w-[720px] flex-col gap-4">
          <h2 className="text-pretty text-[32px] font-bold !leading-[130%] text-black-500 lg:text-[40px]">
            {heading}
          </h2>
          <p className="text-base font-normal !leading-[150%] text-black-300">
            {description}
          </p>
        </div>

        <Link href={cta.href} className="max-lg:w-full">
          <Button
            as="solid"
            variant="md"
            type="secondary"
            iconEnd={ArrowRight}
            className="w-full rounded-full lg:w-auto"
          >
            {cta.text}
          </Button>
        </Link>
      </div>
    </Section>
  );
}
