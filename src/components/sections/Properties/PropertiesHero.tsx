import Image from "next/image";
import { useTranslations } from "next-intl";

import PropertyListingImg from "@/assets/img/bg/properties-listing-bg.webp";

export default function PropertiesHero() {
  const t = useTranslations("Properties");

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

      <div className="relative flex flex-col items-center pt-12 lg:pt-16 pb-24 lg:pb-40 2xl:px-[100px] xl:px-[60px] lg:px-[48px] px-4">
        <article className="flex flex-col gap-4 lg:gap-6 items-center max-w-[720px]">
          <div className="flex flex-col gap-3 items-center w-full">
            <span className="text-body font-semibold text-yellow-500 !leading-[1.3]">
              {t("hero.tagline")}
            </span>
            <h1 className="text-3xl lg:text-h1 font-bold text-white text-center !leading-[1.3] text-balance">
              {t("hero.title")}
            </h1>
          </div>
          <p className="text-body font-normal text-white text-center !leading-[1.3] text-pretty">
            {t("hero.description")}
          </p>
        </article>
      </div>
    </section>
  );
}
