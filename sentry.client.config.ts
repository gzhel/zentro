import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://b44d3ed3000ce25c62f221a8c1466c02@o4510102932160512.ingest.de.sentry.io/4510102934650960",

  integrations: [Sentry.replayIntegration()],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
