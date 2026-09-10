import Image from 'next/image';
import { useTranslations } from 'next-intl';

import PropertyListingImg from '@/assets/img/bg/properties-listing-bg.webp';

export default function PropertiesHero() {
  const t = useTranslations('Properties');

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={PropertyListingImg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative flex flex-col items-center px-4 pt-12 pb-24 lg:px-[48px] lg:pt-16 lg:pb-40 xl:px-[60px] 2xl:px-[100px]">
        <article className="flex max-w-[720px] flex-col items-center gap-4 lg:gap-6">
          <div className="flex w-full flex-col items-center gap-3">
            <span className="text-body leading-[1.3]! font-semibold text-yellow-500">
              {t('hero.tagline')}
            </span>
            <h1 className="text-center text-3xl leading-[1.3]! font-bold text-balance text-white lg:text-h1">
              {t('hero.title')}
            </h1>
          </div>
          <p className="text-center text-body leading-[1.3]! font-normal text-pretty text-white">
            {t('hero.description')}
          </p>
        </article>
      </div>
    </section>
  );
}
