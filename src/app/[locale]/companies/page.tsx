import { CompaniesInfo } from "@/components/blocks/Info";
import Section from "@/components/customs/Section";
import { AppConfig } from "@/utils/AppConfig";
import {
  Building2,
  CarFront,
  CircleUserRound,
  Coins,
  Dog,
  HandHeart,
  House,
  LifeBuoy,
  Sailboat,
  Scale,
  SquareUserRound,
} from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "Metadata.Particulier",
  });

  const { routes } = AppConfig;

  const canonical =
    routes["personalInsurance"][
      locale as keyof (typeof routes)["personalInsurance"]
    ];

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale == "fr" ? "" : locale}/${canonical}`,
    },
  };
}

export default async function Page(props: Props) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "Particular.Assurance",
  });
  return (
    <>
      <Section>
        <CompaniesInfo
          heading={t("BusinessInfo.heading")}
          subHeading={t("BusinessInfo.subHeading")}
          description={t("BusinessInfo.description")}
          items={[
            {
              title: t("BusinessInfo.items.0.title"),
              description: t("BusinessInfo.items.0.description"),
              icon: HandHeart,
            },
            {
              title: t("BusinessInfo.items.1.title"),
              description: t("BusinessInfo.items.1.description"),
              icon: House,
            },
            {
              title: t("BusinessInfo.items.2.title"),
              description: t("BusinessInfo.items.2.description"),
              icon: Dog,
            },
            {
              title: t("BusinessInfo.items.3.title"),
              description: t("BusinessInfo.items.3.description"),
              icon: CarFront,
            },
            {
              title: t("BusinessInfo.items.4.title"),
              description: t("BusinessInfo.items.4.description"),
              icon: Scale,
            },
            {
              title: t("BusinessInfo.items.5.title"),
              description: t("BusinessInfo.items.5.description"),
              icon: SquareUserRound,
            },
            {
              title: t("BusinessInfo.items.6.title"),
              description: t("BusinessInfo.items.6.description"),
              icon: Sailboat,
            },
            {
              title: t("BusinessInfo.items.7.title"),
              description: t("BusinessInfo.items.7.description"),
              icon: Building2,
            },

            {
              title: t("BusinessInfo.items.9.title"),
              description: t("BusinessInfo.items.9.description"),
              icon: CircleUserRound,
            },
            {
              title: t("BusinessInfo.items.10.title"),
              description: t("BusinessInfo.items.10.description"),
              icon: LifeBuoy,
            },
            {
              title: t("BusinessInfo.items.11.title"),
              description: t("BusinessInfo.items.11.description"),
              icon: Coins,
            },
          ]}
        />
      </Section>
    </>
  );
}
