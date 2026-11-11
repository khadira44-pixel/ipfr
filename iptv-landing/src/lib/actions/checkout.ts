"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { checkoutSchema } from "@/lib/checkout/schema";
import { submitLead } from "@/lib/checkout/service";
import type { CheckoutActionState, CheckoutField, CheckoutFieldErrors } from "@/lib/checkout/types";
import { logger, serializeError } from "@/lib/logger";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";

const CHECKOUT_FIELDS: readonly CheckoutField[] = ["fullName", "email", "planId", "consent"];

function isCheckoutField(field: string): field is CheckoutField {
  return (CHECKOUT_FIELDS as readonly string[]).includes(field);
}

export async function submitCheckoutAction(
  _previousState: CheckoutActionState,
  formData: FormData,
): Promise<CheckoutActionState> {
  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);

  const limit = rateLimit({ key: `checkout:${ip}`, limit: 10, windowMs: 10 * 60_000 });
  if (!limit.allowed) {
    return {
      status: "error",
      message: `Too many attempts. Please try again in ${Math.ceil(limit.retryAfterSeconds / 60)} minute(s).`,
    };
  }

  // Bots fill hidden inputs. Pretend success and drop the payload without
  // consuming a webhook call or writing a lead.
  const honeypot = formData.get("website");
  if (honeypot !== null && honeypot !== "") {
    logger.warn("checkout.honeypot_triggered");
    return { status: "success", reference: "SV-RECEIVED" };
  }

  const parsed = checkoutSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    planId: formData.get("planId"),
    consent: formData.get("consent") === "on",
    website: formData.get("website") ?? undefined,
  });

  if (!parsed.success) {
    const { fieldErrors: rawFieldErrors } = z.flattenError(parsed.error);
    const fieldErrors: CheckoutFieldErrors = {};

    for (const [field, messages] of Object.entries(rawFieldErrors)) {
      const message = messages?.[0];
      if (isCheckoutField(field) && message) {
        fieldErrors[field] = message;
      }
    }

    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const { website: _website, consent: _consent, ...lead } = parsed.data;

  try {
    const { reference } = await submitLead(lead, { ip });
    return {
      status: "success",
      reference,
      message: "Your request has been received.",
    };
  } catch (error) {
    logger.error("checkout.submission_failed", {
      error: serializeError(error),
    });
    return {
      status: "error",
      message:
        "We couldn't submit your request right now. Please try again or contact support.",
    };
  }
}
