import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { cn } from '@/libs/utils';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';
import { bodyTextVariants } from '@/components/common/Text/BodyText';
import { RevealItem, RevealSection } from '@/components/common/Reveal';
import PropertyListingImg from '@/assets/images/properties/hero-background.webp';

export default function PropertiesHero() {
  const t = useTranslations('Properties');

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={PropertyListingImg}
          placeholder="blur"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <RevealSection
        trigger="load"
        className="relative flex flex-col items-center px-4 pt-12 pb-24 lg:px-[48px] lg:pt-16 lg:pb-40 xl:px-[60px] 2xl:px-[100px]"
      >
        <article className="flex max-w-[720px] flex-col items-center gap-4 lg:gap-6">
          <RevealItem className="flex w-full flex-col items-center gap-3">
            <BodyText
              variant="sm"
              asChild
              className="font-semibold text-yellow-500"
            >
              <span>{t('hero.tagline')}</span>
            </BodyText>
            <HeadingText
              as="h1"
              className="text-center text-3xl text-balance text-white lg:text-[48px]"
            >
              {t('hero.title')}
            </HeadingText>
          </RevealItem>
          <RevealItem
            as="p"
            className={cn(
              bodyTextVariants(),
              'text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit',
              'text-center text-[14px] leading-[130%] font-normal text-pretty text-white'
            )}
          >
            {t('hero.description')}
          </RevealItem>
        </article>
      </RevealSection>
    </section>
  );
}
