import { ArrowRight } from 'lucide-react';

import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import Section from '@/components/customs/Section';
import { RevealItem } from '@/components/customs/Reveal';

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
      wrapperProps={{ className: 'px-0 pt-0 xl:pt-0' }}
      dividerProps={{ className: 'pt-0 lg:pt-16' }}
    >
      <RevealItem className="flex flex-col items-center gap-8 bg-grey-50 px-4 py-12 text-center lg:rounded-3xl lg:p-16">
        <div className="flex max-w-[720px] flex-col gap-4">
          <h2 className="text-[32px] leading-[130%]! font-bold text-pretty text-black-500 lg:text-[40px]">
            {heading}
          </h2>
          <p className="text-base leading-[150%]! font-normal text-black-300">
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
      </RevealItem>
    </Section>
  );
}
