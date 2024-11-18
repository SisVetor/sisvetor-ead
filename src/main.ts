import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import * as Sentry from "@sentry/angular";

if (environment.production) {
    enableProdMode();
    Sentry.init({
        dsn: "https://cc7aa8a16f7d0c4993b48d7c3044d1f6@o4508004895555584.ingest.us.sentry.io/4508004897128448",
        integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
        // Tracing
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: [/^https:\/\/backend\.sisvetor\.sds\.unb\.br/],
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.log(err));
