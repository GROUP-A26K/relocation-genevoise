import { SITE_NAME } from '@/constants/seo';
import ErrorPage from '@/components/sections/ErrorPage';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `404 – ${SITE_NAME}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <ErrorPage errorCode={404} />;
}
