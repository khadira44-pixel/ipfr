import type { Instrumentation } from "next";
import { serverEnv } from "@/lib/env.server";
import { logger, serializeError } from "@/lib/logger";

/**
 * Observability hook for the server runtime.
 *
 * `onRequestError` catches errors thrown in Server Components, route handlers,
 * and Server Actions. Swap the logger sink for Sentry/Datadog in one place.
 */
export async function register(): Promise<void> {
  // Importing the server env module here fails the boot (not the first
  // checkout) if a server variable is malformed.
  logger.info("app.registered", {
    runtime: process.env.NEXT_RUNTIME ?? "nodejs",
    checkoutWebhookConfigured: Boolean(serverEnv.CHECKOUT_WEBHOOK_URL),
  });
}

export const onRequestError: Instrumentation.onRequestError = (error, request, context) => {
  logger.error("request.unhandled_error", {
    error: serializeError(error),
    path: request.path,
    method: request.method,
    routePath: context.routePath,
    routeType: context.routeType,
    routerKind: context.routerKind,
  });
};
