export const PLAN_IDS = ["starter-1m", "vip-12m", "plus-6m"] as const;

export type PlanId = (typeof PLAN_IDS)[number];

export interface Plan {
  id: PlanId;
  name: string;
  duration: string;
  /** Effective monthly price in USD. */
  price: number;
  billing: string;
  description: string;
  features: readonly string[];
  highlighted: boolean;
  badge?: string;
  cta: string;
}
