"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { getPlan } from "@/content/plans";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import type { PlanId } from "@/types/plans";

interface CheckoutDialogProps {
  planId: PlanId;
  onClose: () => void;
}

export function CheckoutDialog({ planId, onClose }: CheckoutDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const plan = getPlan(planId);

  useScrollLock(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();

    // Native showModal focuses the first focusable control (the close button).
    // Move focus to the first field for a faster checkout flow.
    const frame = window.requestAnimationFrame(() => {
      dialog.querySelector<HTMLInputElement>('input[name="fullName"]')?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        // Clicks on the ::backdrop are dispatched to the dialog element itself.
        if (event.target === event.currentTarget) {
          event.currentTarget.close();
        }
      }}
      aria-labelledby="checkout-dialog-title"
      aria-describedby="checkout-dialog-description"
      className="checkout-dialog m-auto w-[calc(100%-2rem)] max-w-lg rounded-[24px] border border-gold/20 bg-obsidian-900 p-0 text-left text-ink shadow-2xl shadow-black/70 backdrop:bg-obsidian-950/85 backdrop:backdrop-blur-md"
    >
      <div className="relative max-h-[min(90dvh,800px)] overflow-y-auto p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,rgba(217,185,140,0.12),transparent_65%)]"
        />

        <div className="relative mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-gold">
              Private invitation
            </p>
            <h2
              id="checkout-dialog-title"
              className="display mt-2 text-[30px] leading-[1.02] text-ink"
            >
              Your seat is waiting.
            </h2>
            <p
              id="checkout-dialog-description"
              className="mt-2 text-[13px] leading-relaxed text-ink-muted"
            >
              Tell us where to send activation details for{" "}
              <span className="font-semibold text-ink">{plan.name}</span>. It takes less than a
              minute.
            </p>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close checkout"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-hairline bg-white/[0.03] text-ink-muted transition hover:border-gold/30 hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <CheckoutForm planId={planId} />
      </div>
    </dialog>
  );
}
