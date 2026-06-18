import { getTranslations } from "next-intl/server";
import {
  BadgeCheck,
  CalendarCheck2,
  Camera,
  FileText,
  Globe,
  Scale,
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
import HeroImage from "@/assets/img/find-a-tenant/tenant/hero-image.webp";
import RentalProcessImage from "@/assets/img/find-a-tenant/tenant/rental-process-image.webp";
import WhyChooseUsImage from "@/assets/img/find-a-tenant/tenant/why-choose-us-image.webp";
import TestimonialAva1 from "@/assets/img/find-a-tenant/tenant/testimonials-ava-1.webp";
import TestimonialAva2 from "@/assets/img/find-a-tenant/tenant/testimonials-ava-2.webp";
import TestimonialAva3 from "@/assets/img/find-a-tenant/tenant/testimonials-ava-3.webp";
import TestimonialAva4 from "@/assets/img/find-a-tenant/tenant/testimonials-ava-4.webp";
import TestimonialAva5 from "@/assets/img/find-a-tenant/tenant/testimonials-ava-5.webp";
import TestimonialAva6 from "@/assets/img/find-a-tenant/tenant/testimonials-ava-6.webp";

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
  Scale,
] as const;

export async function generateMetadata(
  props: PageProps<"/[locale]/find-a-tenant/tenant">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "Metadata.FindAccommodation",
  });

  const { routes } = AppConfig;

  const canonical =
    routes["findATenantTenant"][
      locale as keyof (typeof routes)["findATenantTenant"]
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
  props: PageProps<"/[locale]/find-a-tenant/tenant">,
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "FindATenant" });

  const serviceItems: TServiceItem[] = t
    .raw("Tenant.Services.items")
    .map((item: { title: string; description: string }, index: number) => ({
      ...item,
      Icon: SERVICE_ICONS[index],
    }));

  const rentalProcessSteps: TRentalStep[] = t.raw(
    "Tenant.OurRentalProcess.steps",
  );

  const testimonials: TTestimonial[] = t
    .raw("Tenant.Testimonials.items")
    .map((item: TTestimonial, index: number) => ({
      ...item,
      avatar: TESTIMONIAL_AVATARS[index]?.src,
    }));

  return (
    <>
      <Hero
        active="tenant"
        tabLabels={{
          landlords: t("Tabs.landlords"),
          tenant: t("Tabs.tenant"),
        }}
        heading={t("Tenant.Hero.heading")}
        description={t("Tenant.Hero.description")}
        primaryCta={{
          text: t("Tenant.Hero.primaryCta"),
          href: "/find-a-tenant/tenant/form",
        }}
        secondaryCta={{
          text: t("Tenant.Hero.secondaryCta"),
          href: "/contact",
        }}
        image={{
          src: HeroImage.src,
          alt: t("Tenant.Hero.heading"),
        }}
        stats={[
          {
            value: t("Tenant.Hero.stats.0.value"),
            label: t("Tenant.Hero.stats.0.label"),
          },
          {
            value: t("Tenant.Hero.stats.1.value"),
            label: t("Tenant.Hero.stats.1.label"),
          },
          {
            value: t("Tenant.Hero.stats.2.value"),
            label: t("Tenant.Hero.stats.2.label"),
          },
        ]}
      />

      <Services
        eyebrow={t("Tenant.Services.eyebrow")}
        heading={t("Tenant.Services.heading")}
        description={t("Tenant.Services.description")}
        cta={{ text: t("Tenant.Services.cta"), href: "/contact" }}
        items={serviceItems}
      />

      <OurRentalProcess
        eyebrow={t("Tenant.OurRentalProcess.eyebrow")}
        heading={t("Tenant.OurRentalProcess.heading")}
        image={{
          src: RentalProcessImage.src,
          alt: t("Tenant.OurRentalProcess.heading"),
        }}
        steps={rentalProcessSteps}
      />

      <WhyChooseUs
        eyebrow={t("Tenant.WhyChooseUs.eyebrow")}
        heading={t("Tenant.WhyChooseUs.heading")}
        description={t("Tenant.WhyChooseUs.description")}
        highlights={t.raw("Tenant.WhyChooseUs.highlights")}
        metrics={t.raw("Tenant.WhyChooseUs.metrics")}
        image={{
          src: WhyChooseUsImage.src,
          alt: t("Tenant.WhyChooseUs.heading"),
        }}
      />

      <Testimonials
        eyebrow={t("Tenant.Testimonials.eyebrow")}
        heading={t("Tenant.Testimonials.heading")}
        description={t("Tenant.Testimonials.description")}
        items={testimonials}
      />

      <CtaBanner
        heading={t("Tenant.CtaBanner.heading")}
        description={t("Tenant.CtaBanner.description")}
        cta={{
          text: t("Tenant.CtaBanner.cta"),
          href: "/find-a-tenant/tenant/form",
        }}
      />
    </>
  );
}
