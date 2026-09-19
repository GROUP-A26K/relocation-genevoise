import { Fragment } from 'react';
import { Check } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';

import Section from '@/components/common/Section';
import CountUp from '@/components/common/CountUp';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';

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
    src: StaticImageData;
    alt: string;
    title?: string;
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
    <Section className="bg-black-700" childrenProps={{ className: 'gap-16' }}>
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-24">
        <RevealItem className="flex flex-1 flex-col gap-3">
          <BodyText variant="sm" className="font-semibold text-yellow-600">
            {eyebrow}
          </BodyText>

          <div className="flex flex-col gap-8">
            <HeadingText
              as="h2"
              className="text-[32px] text-pretty text-white lg:text-[40px]"
            >
              {heading}
            </HeadingText>

            <div className="flex flex-col gap-6">
              <BodyText variant="md" className="leading-[150%] text-grey-100">
                {description}
              </BodyText>

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
                    <BodyText
                      variant="md"
                      asChild
                      className="leading-[150%] text-grey-100"
                    >
                      <span>{highlight}</span>
                    </BodyText>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealItem>

        <RevealItem className="relative aspect-572/420 w-full overflow-hidden rounded-3xl lg:flex-1">
          <Image
            src={image.src}
            placeholder="blur"
            alt={image.alt}
            title={image.title || image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            draggable={false}
          />
        </RevealItem>
      </div>

      <RevealItem className="flex flex-col overflow-hidden rounded-3xl bg-black-500 lg:flex-row">
        {metrics.map((metric, index) => (
          <Fragment key={metric.label}>
            <div className="flex flex-1 flex-col items-center gap-3 p-6 text-center lg:py-12">
              <CountUp
                value={metric.value}
                className="text-4xl leading-[130%] font-bold text-white lg:text-[40px]"
              />
              <BodyText
                variant="md"
                className="font-semibold text-grey-200 lg:text-lg"
              >
                {metric.label}
              </BodyText>
            </div>

            {index < metrics.length - 1 && (
              <div className="h-px w-[100px] self-center bg-white/10 lg:h-[100px] lg:w-px" />
            )}
          </Fragment>
        ))}
      </RevealItem>
    </Section>
  );
}
