export const dynamic = "force-dynamic";
import { HomeHero } from "@/components/blocks/Hero";
import Section from "@/components/customs/Section";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import {
  ContactFeature,
  Feature,
  ServiceFeature2,
} from "@/components/blocks/Feature";
import {
  Building,
  Clock3,
  CloudUpload,
  Globe,
  MessagesSquare,
  Scale,
} from "lucide-react";
import { StatsGrid2 } from "@/components/blocks/Stats";
import { ContentWithImg } from "@/components/blocks/Content";
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

  const features = [
    {
      title: t("ServiceFeature.reasons.0.reasonItems.0.title"),
      icon: Building,
      link: "/professionnel/entreprise",
    },
    {
      title: t("ServiceFeature.reasons.0.reasonItems.1.title"),
      icon: Globe,
      link: "/professionnel/international",
    },
    {
      title: t("ServiceFeature.reasons.0.reasonItems.2.title"),
      icon: Scale,
      link: "/professionnel/profession-liberale",
    },
  ];

  return (
    <>
      <Section isDivider className="relative">
        <HomeHero
          heading={t("Hero.heading")}
          subHeading={t("Hero.subHeading")}
          description={t("Hero.description")}
          button={{
            text: t("Hero.buttonText"),
            url: "/rappelez-moi",
          }}
          button2={{
            text: t("Hero.buttonText2"),
            url: "/contact",
          }}
        />
      </Section>

      <Section isDivider>
        <ContactFeature
          heading={t("ContactFeature.heading")}
          subHeading={t("ContactFeature.subHeading")}
          description={t("ContactFeature.description")}
          buttonText={t("ContactFeature.buttonText")}
          buttonUrl={"/rappelez-moi"}
          reasonItems={[
            {
              title: t("ContactFeature.reasonItems.0.title"),
              description: t("ContactFeature.reasonItems.0.description"),
              icon: MessagesSquare,
            },
            {
              title: t("ContactFeature.reasonItems.1.title"),
              description: t("ContactFeature.reasonItems.1.description"),
              icon: Clock3,
            },
            {
              title: t("ContactFeature.reasonItems.2.title"),
              description: t("ContactFeature.reasonItems.2.description"),
              icon: CloudUpload,
            },
            {
              title: t("ContactFeature.reasonItems.3.title"),
              description: t("ContactFeature.reasonItems.3.description"),
              icon: CloudUpload,
            },
          ]}
        />
      </Section>

      <Section>
        <StatsGrid2
          heading={t("StatsGrid.heading")}
          subHeading={t("StatsGrid.subHeading")}
          description={t("StatsGrid.description")}
          stats1={{
            value: t("StatsGrid.start1.value"),
            label: t("StatsGrid.start1.label"),
          }}
          stats2={{
            value: t("StatsGrid.start2.value"),
            label: t("StatsGrid.start2.label"),
          }}
          stats3={{
            value: t("StatsGrid.start3.value"),
            label: t("StatsGrid.start3.label"),
          }}
          stats4={{
            value: t("StatsGrid.start4.value"),
            label: t("StatsGrid.start4.label"),
          }}
        />
      </Section>

      <Section className="bg-gray-50">
        <Feature
          heading={t("ContactFeature.heading")}
          subHeading={t("ContactFeature.subHeading")}
          description={t("ContactFeature.description")}
          reasonItems={[
            {
              title: t("ContactFeature.reasonItems.0.title"),
              description: t("ContactFeature.reasonItems.0.description"),
              icon: MessagesSquare,
            },
            {
              title: t("ContactFeature.reasonItems.1.title"),
              description: t("ContactFeature.reasonItems.1.description"),
              icon: Clock3,
            },
            {
              title: t("ContactFeature.reasonItems.2.title"),
              description: t("ContactFeature.reasonItems.2.description"),
              icon: CloudUpload,
            },
            {
              title: t("ContactFeature.reasonItems.3.title"),
              description: t("ContactFeature.reasonItems.3.description"),
              icon: CloudUpload,
            },
          ]}
        />
      </Section>

      <Section isDivider>
        <ContentWithImg
          heading={t("ContentWithImg.heading")}
          subHeading={t("ContentWithImg.subHeading")}
          buttonText={t("ContentWithImg.buttonText")}
          buttonUrl={"/contact"}
          description={[
            {
              paragraph: t("ContentWithImg.description.0.paragraph"),
            },
          ]}
        />
      </Section>

      <Section>
        <ServiceFeature2
          heading={t("ServiceFeature.heading")}
          subHeading={t("ServiceFeature.subHeading")}
          description={t("ContactFeature.description")}
          features={features}
        />
      </Section>

      <Section className="bg-gray-50">
        <BookConsultation2 />
      </Section>
    </>
  );
}
