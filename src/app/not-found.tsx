import Link from "next/link";
import NotFoundAutoReload from "@/components/NotFoundAutoReload";

export default function NotFound() {
  return (
    <>
      {/* Self-heals stale-RSC 404s after a fresh Vercel deploy without
          showing the visitor a 404 they shouldn't be seeing. See
          src/components/NotFoundAutoReload.tsx for the rules. */}
      <NotFoundAutoReload />
      <section className="min-h-[70vh] pt-40 pb-[var(--spacing-section)] container-edge max-w-2xl">
        <p className="eyebrow mb-6">404</p>
        <h1 className="display-xl mb-8">A wayward drive.</h1>
        <p className="prose-editorial text-granite/85 mb-10">
          The page you&apos;re looking for rolled into the rough. Let&apos;s get
          you back on the fairway.
        </p>
        <div className="flex gap-4">
          <Link href="/" className="btn-primary">Back to the tee</Link>
          <Link href="/course" className="btn-ghost">Walk the 18</Link>
        </div>
      </section>
    </>
  );
}
