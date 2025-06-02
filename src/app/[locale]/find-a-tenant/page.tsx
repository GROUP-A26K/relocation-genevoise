import { Hero } from "@/components/blocks/Hero";
import Section from "@/components/customs/Section";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ContentView } from "@/components/sections/AnimationContent";
import { BookConsultation2 } from "@/components/blocks/Consultation";
import HeroImage from "@/assets/img/bg/relocation-genevoise-trouver-un-locataire.webp";
import ContentImage1 from "@/assets/img/bg/find-a-tenant/service-tenant-1.svg";
import ContentImage2 from "@/assets/img/bg/find-a-tenant/service-tenant-2.svg";
import ContentImage3 from "@/assets/img/bg/find-a-tenant/service-tenant-3.svg";
import ContentImage4 from "@/assets/img/bg/find-a-tenant/service-tenant-4.svg";
import ContentImage5 from "@/assets/img/bg/find-a-tenant/service-tenant-5.svg";
import ContentImage6 from "@/assets/img/bg/find-a-tenant/service-tenant-6.svg";

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
    namespace: "FindATenant",
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
            image: ContentImage1.src,
          },
          {
            title: t("Content.items.1.title"),
            description: t("Content.items.1.description"),
            image: ContentImage2.src,
          },
          {
            title: t("Content.items.2.title"),
            description: t("Content.items.2.description"),
            image: ContentImage3.src,
          },
          {
            title: t("Content.items.3.title"),
            description: t("Content.items.3.description"),
            image: ContentImage4.src,
          },
          {
            title: t("Content.items.4.title"),
            description: t("Content.items.4.description"),
            image: ContentImage5.src,
          },
          {
            title: t("Content.items.5.title"),
            description: t("Content.items.5.description"),
            image: ContentImage6.src,
          },
        ]}
      />

      <Section className="lg:bg-white bg-gray-50">
        <BookConsultation2
          heading={t("BookConsultation.heading")}
          subHeading={t("BookConsultation.subHeading")}
          description={t("BookConsultation.description")}
          buttonText1={t("BookConsultation.buttonText1")}
          buttonText2={t("BookConsultation.buttonText2")}
        />
      </Section>
    </>
  );
}
