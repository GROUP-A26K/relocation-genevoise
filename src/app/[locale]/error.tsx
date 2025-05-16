'use client';

import ErrorPage from '@/components/sections/ErrorPage';
import { useEffect } from 'react';

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
