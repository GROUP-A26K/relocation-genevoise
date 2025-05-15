export const dynamic = "force-dynamic";
import { BlogList } from "@/components/blocks/Blog/BlogList";
import { ContentWithImg } from "@/components/blocks/Content";
import { ServiceFeature, ContactFeature } from "@/components/blocks/Feature";
import { HomeHero } from "@/components/blocks/Hero";
import { Logos } from "@/components/blocks/Logos";
import { StatsGrid } from "@/components/blocks/Stats";
import Section from "@/components/customs/Section";
import { getTranslations } from "next-intl/server";
import {
  Building,
  Clock3,
  CloudUpload,
  Heart,
  House,
  Map,
  LifeBuoy,
  MessagesSquare,
  ShieldCheck,
  Wallet,
  Globe,
  Scale,
} from "lucide-react";
import { fetchBlogs } from "@/services/blog.service";
import { Metadata } from "next";

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

  const serviceFeatureReasons = [
    {
      reasonName: t("ServiceFeature.reasons.0.reasonName"),
      reasonItems: [
        {
          title: t("ServiceFeature.reasons.0.reasonItems.0.title"),
          description: t("ServiceFeature.reasons.0.reasonItems.0.description"),
          icon: Building,
          link: "/professionnel/entreprise",
        },
        {
          title: t("ServiceFeature.reasons.0.reasonItems.1.title"),
          description: t("ServiceFeature.reasons.0.reasonItems.1.description"),
          icon: Globe,
          link: "/professionnel/international",
        },
        {
          title: t("ServiceFeature.reasons.0.reasonItems.2.title"),
          description: t("ServiceFeature.reasons.0.reasonItems.2.description"),
          icon: Scale,
          link: "/professionnel/profession-liberale",
        },
      ],
    },
    {
      reasonName: t("ServiceFeature.reasons.1.reasonName"),
      reasonItems: [
        {
          title: t("ServiceFeature.reasons.1.reasonItems.0.title"),
          description: t("ServiceFeature.reasons.1.reasonItems.0.description"),
          icon: ShieldCheck,
          link: "/particulier/assurance",
        },
        {
          title: t("ServiceFeature.reasons.1.reasonItems.1.title"),
          description: t("ServiceFeature.reasons.1.reasonItems.1.description"),
          icon: Map,
          link: "/particulier/assurance/assurance-frontalier",
        },
        {
          title: t("ServiceFeature.reasons.1.reasonItems.2.title"),
          description: t("ServiceFeature.reasons.1.reasonItems.2.description"),
          icon: Wallet,
          link: "/particulier/taxes-et-fiscalite",
        },
        {
          title: t("ServiceFeature.reasons.1.reasonItems.3.title"),
          description: t("ServiceFeature.reasons.1.reasonItems.3.description"),
          icon: Heart,
          link: "/particulier/sante",
        },
        {
          title: t("ServiceFeature.reasons.1.reasonItems.4.title"),
          description: t("ServiceFeature.reasons.1.reasonItems.4.description"),
          icon: House,
          link: "/particulier/hypotheque",
        },
        {
          title: t("ServiceFeature.reasons.1.reasonItems.5.title"),
          description: t("ServiceFeature.reasons.1.reasonItems.5.description"),
          icon: LifeBuoy,
          link: "/particulier/prevoyance",
        },
      ],
    },
  ];
  const { blogs } = await fetchBlogs({ page: 1, pageSize: 3, locale: locale });

  return (
    <>
      <Section isDivider className="relative">
        <HomeHero
          heading={t("Hero.heading")}
          subHeading={t("Hero.subHeading")}
          description={t("Hero.description")}
          buttonText={t("Hero.buttonText")}
          experience={t("Hero.experience")}
          customer={t("Hero.customer")}
        />
      </Section>
    </>
  );
}
