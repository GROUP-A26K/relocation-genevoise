"use client";

import ErrorPage from "@/components/sections/ErrorPage";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError(props: {
  error: Error & { digest?: string };
  params: { locale: string };
}) {
  useEffect(() => {
    Sentry.captureException(props.error);

    if (process.env.NODE_ENV === "development") {
      console.error(props.error);
    }
  }, [props.error]);

  return <ErrorPage errorCode={500} />;
}
