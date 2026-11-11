import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";
import { Brand } from "@/components/ui/Brand";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden px-5 py-24 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[120px]"
      />
      <div className="relative z-10 flex flex-col items-center">
        <Brand />
        <p className="mt-9 font-mono text-[9px] uppercase tracking-[0.28em] text-gold">404</p>
        <h1 className="display mt-4 text-balance text-4xl leading-[0.98] text-ink sm:text-5xl">
          This channel is off air.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
          The page you are looking for does not exist or has moved. Return to the vault to keep
          browsing.
        </p>
        <Link href="/" className="btn-primary mt-8 px-6 py-3.5 text-[10px]">
          <Home className="h-4 w-4" aria-hidden="true" />
          Back to the vault
        </Link>
      </div>
    </main>
  );
}
