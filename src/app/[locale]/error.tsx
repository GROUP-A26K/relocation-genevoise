'use client';

import { useEffect } from 'react';

import ErrorPage from '@/components/sections/ErrorPage';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorPage errorCode={500} />;
}
