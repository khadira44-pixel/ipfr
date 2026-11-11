"use client";

import { useActionState, useId, useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { getPlan, plans } from "@/content/plans";
import { submitCheckoutAction } from "@/lib/actions/checkout";
import { initialCheckoutState } from "@/lib/checkout/types";
import { cn, formatUsd } from "@/lib/utils";
import type { PlanId } from "@/types/plans";

interface CheckoutFormProps {
  planId: PlanId;
}

const labelClass = "mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted";

export function CheckoutForm({ planId }: CheckoutFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitCheckoutAction,
    initialCheckoutState,
  );
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>(planId);
  const fieldId = useId();
  const selectedPlan = getPlan(selectedPlanId);

  const nameId = `${fieldId}-name`;
  const emailId = `${fieldId}-email`;
  const planFieldId = `${fieldId}-plan`;
  const consentId = `${fieldId}-consent`;
  const honeypotId = `${fieldId}-website`;

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-gold/25 bg-gold/[0.06] p-7 text-center"
      >
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold/30 bg-gold/10 text-gold">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="display mt-4 text-2xl text-ink">Request received.</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
          Your reference is{" "}
          <span className="font-mono text-[11px] font-medium text-ink">{state.reference}</span>. Our
          activation team will contact you shortly with setup instructions.
        </p>
        <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.18em] text-ink-muted">
          No payment has been taken
        </p>
      </div>
    );
  }

  const nameError = state.fieldErrors?.fullName;
  const emailError = state.fieldErrors?.email;
  const planError = state.fieldErrors?.planId;
  const consentError = state.fieldErrors?.consent;

  return (
    <form action={formAction} className="relative space-y-5">
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-[13px] text-red-200"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={nameId} className={labelClass}>
            Full name
          </label>
          <input
            id={nameId}
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
            minLength={2}
            maxLength={80}
            autoFocus
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? `${nameId}-error` : undefined}
            className={cn("input-field", nameError && "border-red-400/60")}
          />
          {nameError ? (
            <p id={`${nameId}-error`} className="mt-1.5 text-[11px] text-red-300">
              {nameError}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={emailId} className={labelClass}>
            Email address
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            required
            maxLength={254}
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? `${emailId}-error` : undefined}
            className={cn("input-field", emailError && "border-red-400/60")}
          />
          {emailError ? (
            <p id={`${emailId}-error`} className="mt-1.5 text-[11px] text-red-300">
              {emailError}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor={planFieldId} className={labelClass}>
          Membership
        </label>
        <select
          id={planFieldId}
          name="planId"
          value={selectedPlanId}
          onChange={(event) => setSelectedPlanId(event.target.value as PlanId)}
          aria-invalid={Boolean(planError)}
          aria-describedby={planError ? `${planFieldId}-error` : undefined}
          className={cn(
            "input-field appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10",
            planError && "border-red-400/60",
          )}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23D9B98C' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id} className="bg-obsidian-900 text-ink">
              {plan.name} — {formatUsd(plan.price)}/mo
            </option>
          ))}
        </select>
        <p className="mt-2 text-[11px] text-ink-muted">
          <span className="font-semibold text-ink">{formatUsd(selectedPlan.price)}</span>/month ·{" "}
          {selectedPlan.billing}
        </p>
        {planError ? (
          <p id={`${planFieldId}-error`} className="mt-1.5 text-[11px] text-red-300">
            {planError}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor={consentId}
          className="flex cursor-pointer items-start gap-3 rounded-xl border border-hairline bg-white/[0.02] p-3.5 text-[11px] leading-relaxed text-ink-muted transition hover:border-gold/25"
        >
          <input
            id={consentId}
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(consentError)}
            aria-describedby={consentError ? `${consentId}-error` : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-hairline-strong bg-obsidian-950 accent-gold"
          />
          <span>
            I agree to be contacted about my free trial and accept the terms of service.
          </span>
        </label>
        {consentError ? (
          <p id={`${consentId}-error`} className="mt-1.5 text-[11px] text-red-300">
            {consentError}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from humans and assistive technology. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={honeypotId}>Website</label>
        <input id={honeypotId} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary w-full py-4 text-[10px] disabled:pointer-events-none disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending request…
          </>
        ) : (
          <>
            Claim my free trial
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-center font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-ink-muted">
        Secure request · No card required · Instant activation
      </p>
    </form>
  );
}
