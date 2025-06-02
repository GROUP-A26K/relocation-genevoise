import { Hero } from "@/components/blocks/Hero";
import Section from "@/components/customs/Section";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ContentView } from "@/components/sections/FindAccommodation";
import { BookConsultation2 } from "@/components/blocks/Consultation";
import HeroImage from "@/assets/img/bg/relocation-genevoise-trouver-un-iogement.webp";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "Metadata.Home",
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale == "fr" ? "" : locale}`,
    },
  };
}

export default async function Page(props: Props) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "FindAccommodation",
  });

  return (
    <>
      <Section className="relative">
        <Hero
          heroImage={{
            src: HeroImage.src,
            alt: t("Hero.heading"),
            title: t("Hero.heading"),
          }}
          heading={t("Hero.heading")}
          subHeading={t("Hero.subHeading")}
          description={t("Hero.description")}
        />
      </Section>

      <ContentView
        items={[
          {
            title: t("Content.items.0.title"),
            description: t("Content.items.0.description"),
            image: HeroImage.src,
          },
          {
            title: t("Content.items.1.title"),
            description: t("Content.items.1.description"),
            image: HeroImage.src,
          },
          {
            title: t("Content.items.2.title"),
            description: t("Content.items.2.description"),
            image: HeroImage.src,
          },
          {
            title: t("Content.items.3.title"),
            description: t("Content.items.3.description"),
            image: HeroImage.src,
          },
          {
            title: t("Content.items.4.title"),
            description: t("Content.items.4.description"),
            image: HeroImage.src,
          },
          {
            title: t("Content.items.5.title"),
            description: t("Content.items.5.description"),
            image: HeroImage.src,
          },
          {
            title: t("Content.items.6.title"),
            description: t("Content.items.6.description"),
            image: HeroImage.src,
          },
          {
            title: t("Content.items.7.title"),
            description: t("Content.items.7.description"),
            image: HeroImage.src,
          },
          {
            title: t("Content.items.8.title"),
            description: t("Content.items.8.description"),
            image: HeroImage.src,
          },
        ]}
      />

      <Section>
        <BookConsultation2 />
      </Section>
    </>
  );
}
