import { cn } from "@/lib/utils";

interface BrandProps {
  showBadge?: boolean;
  className?: string;
}

export function Brand({ showBadge = true, className }: BrandProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/35 bg-obsidian-900"
      >
        <span className="absolute inset-[3px] rounded-full border border-gold/15" />
        <span className="font-serif text-[17px] leading-none tracking-[-0.04em] text-gold">SV</span>
      </span>

      <span className="flex flex-col">
        <span className="font-serif text-[23px] leading-none tracking-[-0.01em] text-ink">
          StreamVault
        </span>
        <span className="mt-1 font-mono text-[7px] uppercase tracking-[0.32em] text-gold/70">
          Private Cinema
        </span>
      </span>

      {showBadge ? (
        <span className="ml-1 hidden rounded-full border border-hairline px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-ink-muted sm:inline-block">
          8K
        </span>
      ) : null}
    </span>
  );
}
