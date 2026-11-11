"use client";

import { useEffect, type CSSProperties } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const pageStyle: CSSProperties = {
  display: "grid",
  minHeight: "100vh",
  placeItems: "center",
  margin: 0,
  padding: "1.5rem",
  background: "#07080A",
  color: "#F4F0E6",
  fontFamily:
    "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const cardStyle: CSSProperties = {
  width: "100%",
  maxWidth: "32rem",
  border: "1px solid rgba(244,240,230,0.09)",
  borderRadius: "1.25rem",
  background: "#101318",
  padding: "2rem",
  textAlign: "center",
};

const primaryStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  borderRadius: "999px",
  border: 0,
  background: "linear-gradient(120deg, #F0DDC1 0%, #D9B98C 55%, #C9A573 100%)",
  padding: "0.8rem 1.5rem",
  fontSize: "0.6875rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#07080A",
  cursor: "pointer",
};

const secondaryStyle: CSSProperties = {
  ...primaryStyle,
  border: "1px solid rgba(244,240,230,0.09)",
  background: "rgba(255,255,255,0.03)",
  color: "#D9D4C8",
  textDecoration: "none",
};

/**
 * Last-resort boundary used when the root layout itself fails. It must render
 * its own <html> and <body>, and it uses inline styles because application
 * CSS may not have loaded.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Replace with your error reporting SDK (Sentry, Bugsnag, etc.).
    console.error("[app] Root layout error", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={pageStyle}>
        <main style={cardStyle}>
          <p
            style={{
              margin: 0,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "0.625rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#D9B98C",
            }}
          >
            Service unavailable
          </p>
          <h1
            style={{
              margin: "1rem 0 0",
              fontFamily: "Georgia, Cambria, 'Times New Roman', serif",
              fontWeight: 400,
              fontSize: "2rem",
              letterSpacing: "-0.02em",
            }}
          >
            Something went wrong.
          </h1>
          <p style={{ margin: "0.75rem 0 0", fontSize: "0.875rem", lineHeight: 1.6, color: "#969DAA" }}>
            The application failed to start this page. Please retry, or come back in a moment.
          </p>
          {error.digest ? (
            <p
              style={{
                margin: "0.75rem 0 0",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "0.625rem",
                letterSpacing: "0.12em",
                color: "#969DAA",
              }}
            >
              Error ID: {error.digest}
            </p>
          ) : null}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.75rem",
              marginTop: "2rem",
            }}
          >
            <button type="button" onClick={reset} style={primaryStyle}>
              Try again
            </button>
            {/* A hard navigation is intentional: the router may be unavailable here. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" style={secondaryStyle}>
              Back home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
