import "server-only";
import { z } from "zod";

/**
 * Server-only environment contract.
 *
 * Keep every secret here and never import this module from a Client Component.
 * The `server-only` guard turns accidental imports into a build error.
 */
const optionalUrl = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.url({ error: "CHECKOUT_WEBHOOK_URL must be a valid absolute URL." }).optional(),
);

const serverEnvSchema = z.object({
  CHECKOUT_WEBHOOK_URL: optionalUrl,
});

const parsedServerEnv = serverEnvSchema.safeParse({
  CHECKOUT_WEBHOOK_URL: process.env.CHECKOUT_WEBHOOK_URL,
});

if (!parsedServerEnv.success) {
  throw new Error(`Invalid server environment:\n${z.prettifyError(parsedServerEnv.error)}`);
}

export const serverEnv = Object.freeze(parsedServerEnv.data);
