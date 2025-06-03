import { BookConsultation } from "@/components/blocks/Consultation";
import { FAQ } from "@/components/blocks/FAQ";
import Section from "@/components/customs/Section";
import { AppConfig } from "@/utils/AppConfig";
import GroupAvatar from "@/assets/img/avt/group-avt-1.webp";
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
    namespace: "FAQ",
  });
  return (
    <>
      <Section>
        <FAQ
          heading={t("heading")}
          subHeading={t("subHeading")}
          description={t("description")}
          faqs={[
            {
              question: t("faqs.0.question"),
              answer: t("faqs.0.answer"),
            },
            {
              question: t("faqs.1.question"),
              answer: t("faqs.1.answer"),
            },
            {
              question: t("faqs.2.question"),
              answer: t("faqs.2.answer"),
            },
            {
              question: t("faqs.3.question"),
              answer: t("faqs.3.answer"),
            },
            {
              question: t("faqs.4.question"),
              answer: t("faqs.4.answer"),
            },
            {
              question: t("faqs.5.question"),
              answer: t("faqs.5.answer"),
            },
          ]}
        />
        <BookConsultation
          subHeading={t("BookConsultation.subHeading")}
          description={t("BookConsultation.description")}
          buttonText1={t("BookConsultation.buttonText1")}
          imgSrc={GroupAvatar.src}
        />
      </Section>
    </>
  );
}
