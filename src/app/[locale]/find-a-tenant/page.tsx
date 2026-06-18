import { redirect } from "next/navigation";
import { AppConfig } from "@/utils/AppConfig";

export default async function Page(
  props: PageProps<"/[locale]/find-a-tenant">,
) {
  const { locale } = await props.params;

  const { routes } = AppConfig;

  const target =
    routes["findATenantLandlords"][
      locale as keyof (typeof routes)["findATenantLandlords"]
    ];

  redirect(`/${locale === "fr" ? "" : locale}${target}`);
}
