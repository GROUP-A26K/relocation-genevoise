const release = process.env.SENTRY_RELEASE || process.env.VERCEL_GIT_COMMIT_SHA || undefined;

const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true,
  ...(release
    ? {
        release: {
          name: release,
          cleanArtifacts: true,
        },
      }
    : {}),
};

export default sentryWebpackPluginOptions;
