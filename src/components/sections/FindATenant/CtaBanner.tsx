import { ArrowRight } from 'lucide-react';

import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import { Link, type THref } from '@/libs/i18nNavigation';
import HeadingText from '@/components/common/Text/HeadingText';

type TCta = {
  text: string;
  href: THref;
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
          <HeadingText
            as="h2"
            className="text-[32px] text-pretty lg:text-[40px]"
          >
            {heading}
          </HeadingText>
          <BodyText variant="md" className="leading-[150%] text-black-300">
            {description}
          </BodyText>
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
