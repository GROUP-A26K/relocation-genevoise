export const dynamic = "force-dynamic";
import { HomeHero } from "@/components/blocks/Hero";
import Section from "@/components/customs/Section";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { BookConsultation2 } from "@/components/blocks/Consultation";

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
    namespace: "HomePage",
  });

  return (
    <>
      <Section className="relative">
        <HomeHero
          heading={t("Hero.heading")}
          subHeading={t("Hero.subHeading")}
          description={t("Hero.description")}
        />
      </Section>

      <Section>
        <BookConsultation2 />
      </Section>
    </>
  );
}
