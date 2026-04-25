"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Self-heal chunk-load and stale-RSC errors that bubble all the way
  // up to the global error boundary. The primary cause of error-boundary
  // firing on this site (3rd-party DOM injection conflicting with React
  // reconciliation) is fixed in layout.tsx by isolating React inside
  // #app-root. This recovery remains as defense-in-depth for the rare
  // stale-asset case after a Vercel deploy. Bounded by a per-path
  // sessionStorage flag so a real error never loops.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const msg = (error?.message ?? "") + " " + (error?.name ?? "");
    const isRecoverable =
      /Loading chunk|Loading CSS chunk|ChunkLoadError|Failed to fetch dynamically imported module|RSC|manifest/i.test(
        msg,
      );
    if (!isRecoverable) return;
    const path = window.location.pathname;
    const key = `gerr-reload:${path}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    window.setTimeout(() => window.location.reload(), 50);
  }, [error]);

  return (
    <html lang="en-CA">
      <body
        style={{
          background: "#F5F2EA",
          color: "#2B2A28",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          padding: "10vh 2rem",
          maxWidth: "48rem",
          margin: "0 auto",
        }}
      >
        <p style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8C8A82" }}>
          System fault
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1, margin: "1.5rem 0 2rem" }}>
          The course is briefly closed.
        </h1>
        <p style={{ fontSize: "1.125rem", lineHeight: 1.65, marginBottom: "2rem" }}>
          A frost delay on our end. Reload the page, or reach us directly at 250-693-2366.
        </p>
        <button
          onClick={reset}
          style={{
            background: "#3C4A35",
            color: "#F5F2EA",
            padding: "0.9rem 1.5rem",
            border: "none",
            cursor: "pointer",
            fontSize: "0.9375rem",
          }}
        >
          Try again
        </button>
        {error.digest && (
          <p style={{ marginTop: "2rem", fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", color: "#8C8A82" }}>
            Reference: {error.digest}
          </p>
        )}
      </body>
    </html>
  );
}
