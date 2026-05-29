import { routing } from "@/libs/i18nNavigation";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { Navbar } from "@/components/sections/Navigation/NavBar";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import { Env } from "@/libs/Env";
import dynamic from "next/dynamic";

const VisualEditing = dynamic(() =>
  import("next-sanity/visual-editing").then((m) => ({
    default: m.VisualEditing,
  })),
);

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={Env.NEXT_PUBLIC_SERVER_TIMEZONE}
    >
      <Navbar locale={locale} />
      {props.children}
      <SanityLive />
      {(await draftMode()).isEnabled && <VisualEditing />}
      <Toaster />
    </NextIntlClientProvider>
  );
}
