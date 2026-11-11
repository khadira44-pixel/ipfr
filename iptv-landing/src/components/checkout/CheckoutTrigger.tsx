"use client";

import type { ReactNode } from "react";
import { useCheckout } from "@/components/checkout/CheckoutProvider";
import { cn } from "@/lib/utils";
import type { PlanId } from "@/types/plans";

interface CheckoutTriggerProps {
  children: ReactNode;
  planId?: PlanId;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

export function CheckoutTrigger({
  children,
  planId,
  variant = "primary",
  className,
  onClick,
}: CheckoutTriggerProps) {
  const { openCheckout } = useCheckout();

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openCheckout(planId);
      }}
      className={cn(variant === "primary" ? "btn-primary" : "btn-secondary", className)}
    >
      {children}
    </button>
  );
}
