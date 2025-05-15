'use client';

import ErrorPage from '@/components/sections/ErrorPage';

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  return <ErrorPage errorCode={404} />;
}
