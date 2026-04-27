"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    // Self-heal chunk-load errors after a fresh Vercel deploy. The
    // primary cause of error-boundary firing on this site (3rd-party
    // DOM injection conflicting with React reconciliation) is fixed in
    // layout.tsx by isolating React inside #app-root. This recovery
    // remains for the rare stale-chunk case after a deploy. Bounded
    // by a per-path sessionStorage flag so a real error is never
    // trapped in a reload loop.
    if (typeof window === "undefined") return;
    const msg = (error?.message ?? "") + " " + (error?.name ?? "");
    const isChunkError =
      /Loading chunk|Loading CSS chunk|ChunkLoadError|Failed to fetch dynamically imported module/i.test(
        msg,
      );
    if (!isChunkError) return;
    const path = window.location.pathname;
    const key = `err-reload:${path}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    window.setTimeout(() => window.location.reload(), 50);
  }, [error]);

  return (
    <section className="min-h-[70vh] pt-40 pb-20 container-edge max-w-2xl">
      <p className="eyebrow mb-6">Something went sideways</p>
      <h1 className="display-xl mb-8">Out of bounds.</h1>
      <p className="prose-editorial text-granite/85 mb-10">
        Our side, not yours. Give it another swing, or call the Pro Shop at 250-693-2255
        and we'll book you in the old-fashioned way.
      </p>
      <div className="flex flex-wrap gap-4">
        <button onClick={reset} className="btn-primary">Try again</button>
        <Link href="/" className="btn-ghost">Back to the tee</Link>
      </div>
      {error.digest && (
        <p className="mt-10 font-mono text-xs text-silt">Reference: {error.digest}</p>
      )}
    </section>
  );
}
