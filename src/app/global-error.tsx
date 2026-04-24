"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Aggressive self-heal: when the global error boundary fires, almost
  // always the cause is a stale RSC payload from a previous Vercel
  // deploy that the visitor's open tab is still trying to fetch. A
  // single auto-reload pulls fresh HTML and the page works. Bounded by
  // a per-path sessionStorage flag so a genuinely persistent error is
  // not trapped in a reload loop, the second visit shows the actual
  // "frost delay" message and the user can call.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname;
    const key = `gerr-reload:${path}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    window.setTimeout(() => window.location.reload(), 50);
  }, []);

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
