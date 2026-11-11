import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and resolve Tailwind conflicts predictably. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format a USD amount for display, e.g. 14.99 -> "$14.99". */
export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Mask an email address before it ever reaches a log sink. */
export function maskEmail(email: string): string {
  const [local = "", domain = ""] = email.split("@");
  if (!local || !domain) return "[redacted]";

  const visible = local.slice(0, 1);
  const hidden = "*".repeat(Math.min(3, Math.max(1, local.length - 1)));
  return `${visible}${hidden}@${domain}`;
}
