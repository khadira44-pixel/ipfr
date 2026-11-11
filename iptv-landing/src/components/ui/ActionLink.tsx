import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

/** Server-friendly CTA link. Use CheckoutTrigger for actions that open the form. */
export function ActionLink({ href, children, variant = "secondary", className }: ActionLinkProps) {
  return (
    <a
      href={href}
      className={cn(variant === "primary" ? "btn-primary" : "btn-secondary", className)}
    >
      {children}
    </a>
  );
}
