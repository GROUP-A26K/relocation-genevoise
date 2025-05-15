'use client';

import ErrorPage from '@/components/sections/ErrorPage';
import { useEffect } from 'react';

export default function GlobalError(props: {
  error: Error & { digest?: string };
  params: { locale: string };
}) {
  useEffect(() => {
    // Handle side effects related to the error
    console.error(props.error);
  }, [props.error]);

  return <ErrorPage errorCode={500} />;
}
