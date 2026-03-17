import { Metadata } from "next";
import { Env } from "@/libs/Env";
import { AppConfig } from "@/utils/AppConfig";
import { getPropertyDetail } from "@/services/property.service";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, id } = await props.params;
  const property = await getPropertyDetail(id, locale);

  if (!property) {
    return {};
  }

  const propertyPath = `${AppConfig.routes.properties[locale as "fr" | "en"]}/${id}`;
  const propertyUrl = `${Env.NEXT_PUBLIC_SITE_URL}${locale === "fr" ? "" : `/${locale}`}${propertyPath}`;
  const imageUrl = property.areas[0]?.mainImageUrl;

  return {
    title: property.title,
    description: property.description,
    openGraph: {
      type: "website",
      locale: "de-DE",
      siteName: "Relocation Genevoise",
      url: propertyUrl,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: property.title,
            },
          ]
        : [],
    },
    twitter: {
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: property.title,
            },
          ]
        : [],
    },
    alternates: {
      canonical: `/${locale === "fr" ? "" : locale}${propertyPath}`,
    },
  };
}

export default async function PropertyDetailLayout({ children }: Props) {
  return children;
}
