import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import { Link, type THref } from '@/libs/i18nNavigation';
import HeadingText from '@/components/common/Text/HeadingText';

import type { LucideIcon } from 'lucide-react';

type TCta = {
  text: string;
  href: THref;
};

export type TServiceItem = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

interface IServicesProps {
  eyebrow: string;
  heading: string;
  description: string;
  cta: TCta;
  items: TServiceItem[];
}

export default function Services({
  eyebrow,
  heading,
  description,
  cta,
  items,
}: IServicesProps) {
  return (
    <Section id="services" className="bg-white">
      <RevealItem className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-3 text-center">
        <BodyText variant="sm" className="font-semibold text-yellow-600">
          {eyebrow}
        </BodyText>

        <div className="flex flex-col gap-4">
          <HeadingText
            as="h2"
            className="text-[32px] whitespace-pre-line lg:text-[40px]"
          >
            {heading}
          </HeadingText>
          <BodyText variant="md" className="leading-[150%] text-black-300">
            {description}
          </BodyText>
        </div>
      </RevealItem>

      <RevealItem className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {items.map(({ Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col gap-4 rounded-2xl border border-transparent bg-grey-50 p-6 transition-colors hover:border-secondary-500 hover:bg-white lg:gap-6"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-secondary-500 lg:size-12">
              <Icon className="size-5 text-black-500 lg:size-6" />
            </div>

            <div className="flex flex-col gap-1 lg:gap-2">
              <HeadingText as="h3" className="text-xl">
                {title}
              </HeadingText>
              <BodyText variant="md" className="leading-[150%] text-black-300">
                {description}
              </BodyText>
            </div>
          </div>
        ))}
      </RevealItem>

      <RevealItem className="flex w-full justify-center">
        <Link href={cta.href} className="max-lg:w-full">
          <Button
            as="solid"
            variant="md"
            type="primary"
            className="w-full rounded-full lg:w-auto"
          >
            {cta.text}
          </Button>
        </Link>
      </RevealItem>
    </Section>
  );
}
