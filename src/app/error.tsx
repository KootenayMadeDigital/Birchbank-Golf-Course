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
  }, [error]);

  return (
    <section className="min-h-[70vh] pt-40 pb-20 container-edge max-w-2xl">
      <p className="eyebrow mb-6">Something went sideways</p>
      <h1 className="display-xl mb-8">Out of bounds.</h1>
      <p className="prose-editorial text-granite/85 mb-10">
        Our side, not yours. Give it another swing, or call the Pro Shop at 250-693-2366
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
