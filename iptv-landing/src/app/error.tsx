"use client";

import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Replace with your error reporting SDK (Sentry, Bugsnag, etc.).
    console.error("[app] Unhandled error", error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden px-5 py-24 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[120px]"
      />
      <div className="relative z-10">
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold">
          Something interrupted the signal
        </p>
        <h1 className="display mt-5 text-balance text-4xl leading-[0.98] text-ink sm:text-5xl">
          We couldn&apos;t load this page.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
          A temporary error occurred. Try again, and if it keeps happening contact the concierge
          with the reference below.
        </p>
        {error.digest ? (
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
            Error ID: {error.digest}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn-primary px-6 py-3.5 text-[10px]">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try again
          </button>
          <Link href="/" className="btn-secondary px-6 py-3.5 text-[10px]">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
