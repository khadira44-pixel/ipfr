import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { serverEnv } from "@/lib/env.server";
import { logger, serializeError } from "@/lib/logger";
import type { CheckoutInput } from "@/lib/checkout/schema";
import type { CheckoutLead } from "@/lib/checkout/types";

interface LeadMeta {
  ip: string;
}

interface LeadReceipt {
  reference: string;
}

function createReference(): string {
  const year = new Date().getUTCFullYear();
  const suffix = randomBytes(3).toString("hex").toUpperCase();
  return `SV-${year}-${suffix}`;
}

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 12);
}

/**
 * Accept a validated lead.
 *
 * There is deliberately no database in this project. Configure
 * CHECKOUT_WEBHOOK_URL to forward leads to a CRM, queue, or serverless
 * function. Without it, the app runs in log-only mode so local development and
 * previews work end to end.
 */
export async function submitLead(
  input: Omit<CheckoutInput, "consent" | "website">,
  meta: LeadMeta,
): Promise<LeadReceipt> {
  const reference = createReference();
  const webhookUrl = serverEnv.CHECKOUT_WEBHOOK_URL;
  const payload: CheckoutLead = {
    reference,
    planId: input.planId,
    fullName: input.fullName,
    email: input.email,
    submittedAt: new Date().toISOString(),
  };

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "user-agent": "StreamVault-Checkout/1.0",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5_000),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`CRM webhook responded with ${response.status}`);
      }
    } catch (error) {
      logger.error("checkout.webhook_failed", {
        reference,
        error: serializeError(error),
      });
      throw new Error("Lead delivery failed");
    }
  } else {
    logger.warn("checkout.persistence_not_configured", {
      reference,
      hint: "Set CHECKOUT_WEBHOOK_URL to persist leads outside the process.",
    });
  }

  logger.info("checkout.lead_accepted", {
    reference,
    planId: input.planId,
    email: input.email,
    ipHash: hashIp(meta.ip),
  });

  return { reference };
}
