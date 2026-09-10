import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import Section from '@/components/customs/Section';

import type { LucideIcon } from 'lucide-react';

type TCta = {
  text: string;
  href: string;
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
      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-3 text-center">
        <p className="text-sm leading-[130%]! font-semibold text-yellow-600">
          {eyebrow}
        </p>

        <div className="flex flex-col gap-4">
          <h2 className="text-[32px] leading-[130%]! font-bold whitespace-pre-line text-black-500 lg:text-[40px]">
            {heading}
          </h2>
          <p className="text-base leading-[150%]! font-normal text-black-300">
            {description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {items.map(({ Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col gap-4 rounded-2xl border border-transparent bg-grey-50 p-6 transition-colors hover:border-secondary-500 hover:bg-white lg:gap-6"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-secondary-500 lg:size-12">
              <Icon className="size-5 text-black-500 lg:size-6" />
            </div>

            <div className="flex flex-col gap-1 lg:gap-2">
              <h3 className="text-xl leading-[130%]! font-semibold text-black-500">
                {title}
              </h3>
              <p className="text-base leading-[150%]! font-normal text-black-300">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full justify-center">
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
      </div>
    </Section>
  );
}
