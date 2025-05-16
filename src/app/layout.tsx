import { Metadata } from 'next';
import { ReactNode } from 'react';
import { Env } from '@/libs/Env';
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
};
// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default async function RootLayout(props: Props) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="icon"
          href="/rg-logo.svg"
          type="svg"
          sizes="120x120"
        />
      </head>

      <body>{props.children}</body>
    </html>
  );
}
