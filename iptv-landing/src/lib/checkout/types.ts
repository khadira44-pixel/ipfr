import type { PlanId } from "@/types/plans";

export type CheckoutStatus = "idle" | "success" | "error";

/** Payload accepted by the lead webhook (never logged verbatim). */
export interface CheckoutLead {
  reference: string;
  fullName: string;
  email: string;
  planId: PlanId;
  submittedAt: string;
}

export type CheckoutField = "fullName" | "email" | "planId" | "consent";

export type CheckoutFieldErrors = Partial<Record<CheckoutField, string>>;

export interface CheckoutActionState {
  status: CheckoutStatus;
  message?: string;
  fieldErrors?: CheckoutFieldErrors;
  reference?: string;
}

export const initialCheckoutState: CheckoutActionState = { status: "idle" };
