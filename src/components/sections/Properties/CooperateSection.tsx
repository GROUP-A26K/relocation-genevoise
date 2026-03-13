"use client";

import { FC } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/libs/i18nNavigation";
import { useTranslations } from "next-intl";

const CooperateSection: FC = () => {
  const t = useTranslations("Properties");

  return (
    <section className="bg-white flex flex-col items-center justify-center pb-16 2xl:px-[100px] xl:px-[60px] lg:px-[48px] px-4">
      <div className="w-full max-w-[1240px]">
        <div className="bg-grey-50 flex flex-col gap-8 items-center p-8 lg:p-16 rounded-3xl w-full">
          {/* Quote and subheading */}
          <div className="flex flex-col gap-6 items-center text-center max-w-[720px]">
            <div className="flex flex-col gap-3 w-full">
              <p className="text-body font-semibold text-yellow-600 !leading-[130%]">
                {t("cooperate.tagline")}
              </p>
              <h2 className="text-h2 font-semibold text-black-500 !leading-[130%]">
                {t("cooperate.title")}
              </h2>
            </div>
            <p className="text-body font-normal text-black-200 !leading-[130%]">
              {t("cooperate.description")}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 items-start justify-center">
            <Link href="/contact">
              <button className="flex items-center justify-center gap-2 h-10 px-4 py-3 bg-black-500 hover:bg-black-400 rounded-full text-p font-semibold text-white !leading-[130%] whitespace-nowrap transition-colors">
                {t("cooperate.contactButton")}
              </button>
            </Link>
            <Link href="/properties">
              <button className="flex items-center justify-center gap-2 h-10 px-4 py-3 border border-black-500 hover:bg-grey-100 rounded-full text-p font-semibold text-black-500 !leading-[130%] whitespace-nowrap transition-colors">
                {t("cooperate.findButton")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CooperateSection };
