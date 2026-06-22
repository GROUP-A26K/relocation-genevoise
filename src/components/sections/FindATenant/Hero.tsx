import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

import { cn } from "@/libs/utils";
import { Link } from "@/libs/i18nNavigation";
import Button from "@/components/customs/Button";
import CountUp from "@/components/customs/CountUp";
import Section from "@/components/customs/Section";
import { AnimatedGridPattern } from "@/components/ui/magicui/animated-grid-pattern";

import HeroTabs, { type TFindATenantAudience } from "./HeroTabs";

type TCta = {
  text: string;
  href: string;
};

type TStat = {
  value: string;
  label: string;
};

interface IHeroProps {
  active: TFindATenantAudience;
  tabLabels: { landlords: string; tenant: string };
  heading: string;
  description: string;
  primaryCta: TCta;
  secondaryCta: TCta;
  image: {
    src: string | StaticImageData;
    alt: string;
  };
  stats: TStat[];
}

export default function Hero({
  active,
  tabLabels,
  heading,
  description,
  primaryCta,
  secondaryCta,
  image,
  stats,
}: IHeroProps) {
  return (
    <Section className="relative">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="relative flex flex-col items-stretch gap-12 lg:flex-row lg:items-start lg:gap-24">
          <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center overflow-hidden">
            <AnimatedGridPattern
              numSquares={40}
              maxOpacity={1}
              duration={3}
              height={80}
              width={80}
              className={cn(
                "size-full text-yellow-25 opacity-70",
                "[mask-image:radial-gradient(circle_at_top,white,transparent_95%)]",
              )}
            />
          </div>

          <div className="flex flex-1 flex-col items-center gap-6 lg:gap-12 lg:items-start">
            <HeroTabs active={active} labels={tabLabels} />

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h1 className="whitespace-pre-line text-pretty text-center text-4xl font-bold !leading-[130%] text-black-500 lg:text-5xl lg:text-left">
                  {heading}
                </h1>
                <p className="text-pretty text-base text-center font-normal !leading-[150%] text-black-300 lg:text-left">
                  {description}
                </p>
              </div>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <Link href={primaryCta.href} className="max-lg:w-full">
                  <Button
                    as="solid"
                    variant="md"
                    type="secondary"
                    iconEnd={ArrowRight}
                    className="rounded-full w-full"
                  >
                    {primaryCta.text}
                  </Button>
                </Link>
                <Link href={secondaryCta.href} className="max-lg:w-full">
                  <Button
                    as="outline"
                    variant="md"
                    type="primary"
                    className="rounded-full w-full"
                  >
                    {secondaryCta.text}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex-1 relative aspect-[572/420] w-full">
            <Image
              src={image.src}
              alt={image.alt}
              title={image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="rounded-3xl object-cover"
              priority
              loading="eager"
              fetchPriority="high"
              draggable={false}
            />
          </div>
        </div>

        <div className="flex flex-col overflow-hidden items-center rounded-3xl bg-secondary-25 sm:flex-row">
          {stats.map((stat, index) => (
            <Fragment key={stat.label}>
              <div className="flex flex-1 w-full flex-col items-center gap-3 p-6 text-center lg:py-12">
                <CountUp
                  value={stat.value}
                  className="text-4xl font-bold !leading-[130%] text-black-500 lg:text-[40px]"
                />
                <p className="text-base lg:text-lg font-semibold !leading-[130%] text-black-200">
                  {stat.label}
                </p>
              </div>

              {index < stats.length - 1 && (
                <div className="bg-yellow-300 h-px w-[100px] lg:w-px lg:h-[100px]" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </Section>
  );
}
