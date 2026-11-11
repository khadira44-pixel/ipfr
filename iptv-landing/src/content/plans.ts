import type { Plan } from "@/types/plans";
import { PLAN_IDS } from "@/types/plans";

export const plans = [
  {
    id: PLAN_IDS[0],
    name: "Essential",
    duration: "Monthly access",
    price: 14.99,
    billing: "Billed monthly · Cancel anytime",
    description: "A considered introduction to the vault, for one screen and one very good chair.",
    features: [
      "20,000+ live channels in 4K UHD",
      "One screen at a time",
      "Anti-Freeze™ edge routing",
      "Electronic programme guide",
      "Instant activation in 60 seconds",
      "24/7 human support",
    ],
    highlighted: false,
    cta: "Begin with Essential",
  },
  {
    id: PLAN_IDS[1],
    name: "Signature",
    duration: "12-month membership",
    price: 6.99,
    billing: "Billed annually ($83.88) · Save 54%",
    description:
      "Our flagship membership. Every channel, every screen, and the concierge on speed dial.",
    features: [
      "All 20,000+ channels in 4K & 8K",
      "Up to five screens simultaneously",
      "Dedicated fibre edge routing",
      "Dolby Atmos® 7.1.4 passthrough",
      "Seven-day cloud DVR & replay",
      "Every sports package & PPV included",
      "VIP WhatsApp & Telegram concierge",
      "30-day money-back guarantee",
    ],
    highlighted: true,
    badge: "Most selected",
    cta: "Join Signature",
  },
  {
    id: PLAN_IDS[2],
    name: "Household",
    duration: "6-month membership",
    price: 9.99,
    billing: "Billed semi-annually ($59.94) · Save 33%",
    description: "For the household that never agrees on what to watch. Three screens, zero friction.",
    features: [
      "20,000+ live channels in 4K & 8K",
      "Three screens simultaneously",
      "Priority Anti-Freeze™ CDN",
      "Electronic programme guide",
      "Championship sport & PPV",
      "24/7 live assistance",
      "14-day money-back guarantee",
    ],
    highlighted: false,
    cta: "Choose Household",
  },
] as const satisfies readonly Plan[];

export const featuredPlanId = PLAN_IDS[1];

export function getPlan(planId: Plan["id"]): Plan {
  const plan = plans.find((candidate) => candidate.id === planId);
  if (!plan) {
    throw new Error(`Unknown plan id: ${planId}`);
  }
  return plan;
}
