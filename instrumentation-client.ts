import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN =
  process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN || "";

const thirdPartyFramePattern =
  /translate_http|translate\.goog|\/el_main|tr\.de\.[A-Za-z0-9-]+|cdn-cookieyes\.com|\/client_data\/[a-f0-9]+\/banner\.js|clarity\.ms/;

Sentry.init({
  dsn: SENTRY_DSN || undefined,
  debug: process.env.NODE_ENV === "development",
  tracesSampleRate: 1.0,
  environment:
    process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ||
    process.env.SENTRY_ENVIRONMENT ||
    process.env.NODE_ENV,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [Sentry.replayIntegration()],
  denyUrls: [
    /translate\.goog/i,
    /translate_http/i,
    /translate-pa\.googleapis\.com/i,
    // CookieYes consent banner (cdn-cookieyes.com) throws SecurityError in
    // Safari private mode / ITP-restricted contexts when writing consent state.
    /cdn-cookieyes\.com/i,
    /\/client_data\/[a-f0-9]+\/banner\.js/i,
    /clarity\.ms/i,
  ],
  ignoreErrors: [
    // Google Translate proxy injects scripts that throw minified errors (e.g. "Yd")
    // and triggers RSC fetch failures on the translate.goog host.
    "Failed to fetch RSC payload for https://relocation--genevoise-ch.translate.goog",
    // Minified single/double-letter error names ("Yd", "Zd", etc.) originate from
    // Google Translate's bundled code — never from our own bundle. Real app errors
    // always surface as TypeError/RangeError/etc., not 1-2 letter identifiers.
    /^[A-Z][a-z]?$/,
    // Fetch was aborted because the user navigated away or React unmounted the
    // component holding the in-flight request. No user-visible failure.
    "AbortError",
    "Fetch is aborted",
    "The operation was aborted",
    "The user aborted a request",
    "signal is aborted without reason",
    // Third-party scripts / browser extensions mutate DOM nodes React is
    // reconciling. Only headless bots and translation extensions hit these.
    "removeChild",
    "Failed to execute 'removeChild' on 'Node'",
    "The node to be removed is not a child of this node",
    "React expected a <body> element",
    // Third-party scripts (CookieYes / GTM / Google Translate proxy) read
    // localStorage from event handlers. Blocked in Safari ITP, private mode,
    // and cross-origin iframes — surfaces here because we don't touch
    // localStorage in our own code. Sentry's browserApiErrors wrapper
    // attributes the throw to addEventListener with an <anonymous> handler,
    // so the third-party stack-frame URL filter below can't catch it.
    "Failed to read the 'localStorage' property from 'Window'",
    "Failed to read the 'sessionStorage' property from 'Window'",
    "Access is denied for this document",
    "SecurityError",
  ],
  beforeSend(event, hint) {
    const ua =
      event.request?.headers?.["User-Agent"] ||
      (typeof navigator !== "undefined" ? navigator.userAgent : "");
    if (ua && /HeadlessChrome|bot|crawler|spider/i.test(ua)) {
      return null;
    }

    const url = event.request?.url || "";
    if (url.includes("translate.goog")) return null;

    // Google Translate (including the Google iOS in-app browser's auto-translate)
    // injects scripts that mutate the DOM during React renders, producing noisy
    // errors like RangeError (recursion via dispatchEvent) or "b.setAttribute on null".
    // Drop any event whose stack mentions Google Translate's injected modules.
    const stackFromError =
      hint?.originalException && (hint.originalException as Error)?.stack;
    if (
      typeof stackFromError === "string" &&
      thirdPartyFramePattern.test(stackFromError)
    ) {
      return null;
    }
    const exceptionFrames = event.exception?.values?.flatMap(
      (value) => value.stacktrace?.frames ?? [],
    );
    if (
      exceptionFrames?.some((frame) =>
        thirdPartyFramePattern.test(
          `${frame.filename ?? ""} ${frame.abs_path ?? ""}`,
        ),
      )
    ) {
      return null;
    }
    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
