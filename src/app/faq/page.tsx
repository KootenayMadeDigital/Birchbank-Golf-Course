import type { Metadata } from "next";
import { FAQ } from "@/data/faq";
import { faqJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about playing, visiting, and booking at Birchbank Golf.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />

      <section className="pt-40 pb-[var(--spacing-section)] container-edge max-w-3xl">
        <p className="eyebrow mb-6">FAQ</p>
        <h1 className="display-xl max-w-[16ch] mb-14">Things people ask us.</h1>

        <dl className="divide-y divide-granite/15 border-t border-b border-granite/15">
          {FAQ.map((f) => (
            <div key={f.question} className="py-8">
              <dt className="font-display text-2xl mb-4">{f.question}</dt>
              <dd className="prose-editorial text-granite/85 text-base">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
