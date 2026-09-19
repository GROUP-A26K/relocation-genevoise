'use client';

import { useEffect } from 'react';

import ErrorPage from '@/components/sections/ErrorPage';

interface IErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: IErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorPage errorCode={500} />;
}
