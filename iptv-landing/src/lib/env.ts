import { z } from "zod";

/**
 * Public environment contract.
 *
 * Only NEXT_PUBLIC_* values live here, so this module is safe to import from
 * both Server and Client Components. Invalid values fail fast at startup
 * instead of surfacing as broken URLs in production.
 */
const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .url({ error: "NEXT_PUBLIC_SITE_URL must be a valid absolute URL." })
    .refine(
      (value) => value.startsWith("http://") || value.startsWith("https://"),
      "NEXT_PUBLIC_SITE_URL must use http or https.",
    )
    .default("http://localhost:3000"),
  NEXT_PUBLIC_SUPPORT_EMAIL: z
    .email({ error: "NEXT_PUBLIC_SUPPORT_EMAIL must be a valid email address." })
    .default("support@streamvault.example"),
});

const parsedPublicEnv = publicEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
});

if (!parsedPublicEnv.success) {
  throw new Error(`Invalid public environment:\n${z.prettifyError(parsedPublicEnv.error)}`);
}

export const publicEnv = Object.freeze({
  siteUrl: parsedPublicEnv.data.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, ""),
  supportEmail: parsedPublicEnv.data.NEXT_PUBLIC_SUPPORT_EMAIL,
});
