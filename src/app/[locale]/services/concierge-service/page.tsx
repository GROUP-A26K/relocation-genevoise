export const dynamic = "force-dynamic";
import { HomeHero } from "@/components/blocks/Hero";
import Section from "@/components/customs/Section";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { BookConsultation2 } from "@/components/blocks/Consultation";
import { ContentView } from "@/components/sections/ServiceDetail";

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
    namespace: "ConciergeService",
  });

  return (
    <>
      <Section className="relative">
        <HomeHero
          heading={t("heading")}
          subHeading={t("subHeading")}
          description={t("description")}
        />
      </Section>
      <ContentView
        section={[
          {
            paragraphType: "introductory",
            content: [
              {
                paragraph: t("sections.0.content.0.paragraph"),
              },
            ],
          },
          {
            paragraphType: "introductory",
            content: [
              {
                paragraph: t("sections.1.content.0.paragraph"),
              },
            ],
          },
        ]}
      />
      <Section>
        <BookConsultation2 />
      </Section>
    </>
  );
}
