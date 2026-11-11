import { z } from "zod";
import { PLAN_IDS } from "@/types/plans";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { error: "Please enter your full name." })
    .max(80, { error: "Name must be 80 characters or fewer." }),
  email: z
    .email({ error: "Enter a valid email address." })
    .max(254, { error: "Email must be 254 characters or fewer." }),
  planId: z.enum(PLAN_IDS, { error: "Choose a valid plan." }),
  consent: z.literal(true, { error: "Please accept the terms to continue." }),
  /** Honeypot: real users never see or fill this field. */
  website: z.string().max(200).optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
