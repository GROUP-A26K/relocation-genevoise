import { Metadata } from 'next';
import { ReactNode } from 'react';
import { Env } from '@/libs/Env';
import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL(Env.NEXT_PUBLIC_SITE_URL),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de-DE',
    url: Env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Relocation Genevoise',
    images: [
      {
        url: `${Env.NEXT_PUBLIC_SITE_URL}/relocation-genevoise-preview.png`,
        width: 1200,
        height: 630,
        alt: 'Relocation Genevoise',
      },
    ],
  },

  twitter: {
    images: [
      {
        url: `${Env.NEXT_PUBLIC_SITE_URL}/relocation-genevoise-preview.png`,
        width: 1200,
        height: 630,
        alt: 'Relocation Genevoise',
      },
    ],
  },
};
// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default async function RootLayout(props: Props) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="icon"
          href="/apple-touch-icon.png"
          type="svg"
          sizes="120x120"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/9a39582ed0c78f02105a4fb9/script.js"
          strategy="beforeInteractive"
        />
      </head>
      <GoogleTagManager gtmId={Env.NEXT_PUBLIC_GTM_ID} />
      <body>{props.children}</body>
    </html>
  );
}
