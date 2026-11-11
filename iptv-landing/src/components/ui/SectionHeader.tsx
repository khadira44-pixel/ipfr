import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleId?: string;
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleId,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-14 sm:mb-20",
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-ink-muted",
          centered && "justify-center",
        )}
      >
        <span className="text-gold">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-gold/40" />
        <span>{eyebrow}</span>
      </p>

      <h2
        id={titleId}
        className="display mt-7 text-balance text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.98] text-ink"
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-5 text-pretty text-sm leading-relaxed text-ink-muted sm:text-base",
            centered ? "mx-auto max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
