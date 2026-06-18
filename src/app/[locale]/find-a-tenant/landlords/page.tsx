import { getTranslations } from "next-intl/server";
import {
  BadgeCheck,
  CalendarCheck2,
  Camera,
  FileText,
  Globe,
  KeyRound,
  type LucideIcon,
} from "lucide-react";

import { AppConfig } from "@/utils/AppConfig";
import Hero from "@/components/sections/FindATenant/Hero";
import Services, {
  type TServiceItem,
} from "@/components/sections/FindATenant/Services";
import OurRentalProcess, {
  type TRentalStep,
} from "@/components/sections/FindATenant/OurRentalProcess";
import WhyChooseUs from "@/components/sections/FindATenant/WhyChooseUs";
import Testimonials, {
  type TTestimonial,
} from "@/components/sections/FindATenant/Testimonials";
import CtaBanner from "@/components/sections/FindATenant/CtaBanner";
import HeroImage from "@/assets/img/find-a-tenant/landlords/hero-image.webp";
import WhyChooseUsImage from "@/assets/img/find-a-tenant/landlords/why-choose-us-image.webp";
import RentalProcessImage from "@/assets/img/find-a-tenant/landlords/rental-process-image.webp";
import TestimonialAva1 from "@/assets/img/find-a-tenant/landlords/testimonials-ava-1.webp";
import TestimonialAva2 from "@/assets/img/find-a-tenant/landlords/testimonials-ava-2.webp";
import TestimonialAva3 from "@/assets/img/find-a-tenant/landlords/testimonials-ava-3.webp";
import TestimonialAva4 from "@/assets/img/find-a-tenant/landlords/testimonials-ava-4.webp";
import TestimonialAva5 from "@/assets/img/find-a-tenant/landlords/testimonials-ava-5.webp";
import TestimonialAva6 from "@/assets/img/find-a-tenant/landlords/testimonials-ava-6.webp";

import type { Metadata } from "next";
import type { StaticImageData } from "next/image";

const TESTIMONIAL_AVATARS: StaticImageData[] = [
  TestimonialAva1,
  TestimonialAva2,
  TestimonialAva3,
  TestimonialAva4,
  TestimonialAva5,
  TestimonialAva6,
] as const;

const SERVICE_ICONS: LucideIcon[] = [
  Camera,
  Globe,
  BadgeCheck,
  CalendarCheck2,
  FileText,
  KeyRound,
] as const;

export async function generateMetadata(
  props: PageProps<"/[locale]/find-a-tenant/landlords">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "Metadata.FindATenant",
  });

  const { routes } = AppConfig;

  const canonical =
    routes["findATenantLandlords"][
      locale as keyof (typeof routes)["findATenantLandlords"]
    ];

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale == "fr" ? "" : locale}/${canonical}`,
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/find-a-tenant/landlords">,
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "FindATenant" });

  const serviceItems: TServiceItem[] = t
    .raw("Landlords.Services.items")
    .map((item: { title: string; description: string }, index: number) => ({
      ...item,
      Icon: SERVICE_ICONS[index],
    }));

  const rentalProcessSteps: TRentalStep[] = t.raw(
    "Landlords.OurRentalProcess.steps",
  );

  const testimonials: TTestimonial[] = t
    .raw("Landlords.Testimonials.items")
    .map((item: TTestimonial, index: number) => ({
      ...item,
      avatar: TESTIMONIAL_AVATARS[index]?.src,
    }));

  return (
    <>
      <Hero
        active="landlords"
        tabLabels={{
          landlords: t("Tabs.landlords"),
          tenant: t("Tabs.tenant"),
        }}
        heading={t("Landlords.Hero.heading")}
        description={t("Landlords.Hero.description")}
        primaryCta={{
          text: t("Landlords.Hero.primaryCta"),
          href: "/find-a-tenant/landlords/form",
        }}
        secondaryCta={{
          text: t("Landlords.Hero.secondaryCta"),
          href: "/find-a-tenant/landlords#services",
        }}
        image={{
          src: HeroImage.src,
          alt: t("Landlords.Hero.heading"),
        }}
        stats={[
          {
            value: t("Landlords.Hero.stats.0.value"),
            label: t("Landlords.Hero.stats.0.label"),
          },
          {
            value: t("Landlords.Hero.stats.1.value"),
            label: t("Landlords.Hero.stats.1.label"),
          },
          {
            value: t("Landlords.Hero.stats.2.value"),
            label: t("Landlords.Hero.stats.2.label"),
          },
        ]}
      />

      <Services
        eyebrow={t("Landlords.Services.eyebrow")}
        heading={t("Landlords.Services.heading")}
        description={t("Landlords.Services.description")}
        cta={{ text: t("Landlords.Services.cta"), href: "/contact" }}
        items={serviceItems}
      />

      <OurRentalProcess
        eyebrow={t("Landlords.OurRentalProcess.eyebrow")}
        heading={t("Landlords.OurRentalProcess.heading")}
        image={{
          src: RentalProcessImage.src,
          alt: t("Landlords.OurRentalProcess.heading"),
        }}
        steps={rentalProcessSteps}
      />

      <WhyChooseUs
        eyebrow={t("Landlords.WhyChooseUs.eyebrow")}
        heading={t("Landlords.WhyChooseUs.heading")}
        description={t("Landlords.WhyChooseUs.description")}
        highlights={t.raw("Landlords.WhyChooseUs.highlights")}
        metrics={t.raw("Landlords.WhyChooseUs.metrics")}
        image={{
          src: WhyChooseUsImage.src,
          alt: t("Landlords.WhyChooseUs.heading"),
        }}
      />

      <Testimonials
        eyebrow={t("Landlords.Testimonials.eyebrow")}
        heading={t("Landlords.Testimonials.heading")}
        description={t("Landlords.Testimonials.description")}
        items={testimonials}
      />

      <CtaBanner
        heading={t("Landlords.CtaBanner.heading")}
        description={t("Landlords.CtaBanner.description")}
        cta={{
          text: t("Landlords.CtaBanner.cta"),
          href: "/find-a-tenant/landlords/form",
        }}
      />
    </>
  );
}
