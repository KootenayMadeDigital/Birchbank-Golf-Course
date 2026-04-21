import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Bistro",
  description: "The Birchbank Bistro is a fully licensed establishment, open daily to the public. Full menu, beverage cart on course, covered patio, and event catering.",
  alternates: { canonical: "/bistro" },
};

// Images pulled from https://www.birchbankgolf.com/the-bistro/
const BISTRO_IMAGES = [
  "https://www.birchbankgolf.com/wp-content/uploads/2021/01/Photo-Sep-09-9-43-20-AM.jpg",
  "https://www.birchbankgolf.com/wp-content/uploads/2021/01/Photo-Sep-09-9-51-50-AM.jpg",
  "https://www.birchbankgolf.com/wp-content/uploads/2021/01/Photo-Sep-09-9-26-22-AM.jpg",
  "https://www.birchbankgolf.com/wp-content/uploads/2021/01/Photo-Sep-09-10-13-44-AM.jpg",
  "https://www.birchbankgolf.com/wp-content/uploads/2021/01/Photo-Sep-09-10-24-59-AM.jpg",
  "https://www.birchbankgolf.com/wp-content/uploads/2021/01/Photo-Sep-09-10-45-54-AM.jpg",
];

const MENUS = {
  food: "https://www.birchbankgolf.com/wp-content/uploads/2025/09/Fall-Menu-.pdf",
  drinks: "https://www.birchbankgolf.com/wp-content/uploads/2024/08/THE-BISTRO-New-Food_Drink-Menu-8.5x14.pdf",
};

export default function Bistro() {
  return (
    <>
      <section className="pt-40 pb-16 container-edge">
        <p className="eyebrow mb-6">The Bistro</p>
        <h1 className="display-xl max-w-[20ch] mb-10">
          Fully licensed.<br />Open daily to the public.
        </h1>
        <p className="prose-editorial max-w-2xl text-granite/85">
          The Birchbank Bistro is a fully licensed establishment with a full menu and a
          wide range of refreshments. A covered patio overlooks the course; daily specials
          run through the season; event catering and beverage cart service on the course
          are available.
        </p>
        <div className="mt-8 font-mono text-sm text-silt space-y-1">
          <p>Open daily · 12:00 pm – 5:00 pm</p>
          <p>
            <a href="tel:+12506935451" className="underline hover:text-amber">250-693-5451</a>
            <span className="mx-3">·</span>
            <a href="mailto:bistro@birchbankgolf.com" className="underline hover:text-amber">
              bistro@birchbankgolf.com
            </a>
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href={MENUS.food} target="_blank" rel="noopener" className="btn-primary">
            Food menu (PDF) ↗
          </a>
          <a href={MENUS.drinks} target="_blank" rel="noopener" className="btn-ghost">
            Drinks menu (PDF) ↗
          </a>
          <Link href="/events/book" className="btn-ghost">Book an event →</Link>
        </div>
      </section>

      <section className="pb-[var(--spacing-section)] container-edge">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {BISTRO_IMAGES.map((src, i) => (
            <div key={src} className="relative aspect-square bg-granite/5 overflow-hidden">
              <Image
                src={src}
                alt={`Birchbank Bistro — ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>

      <section className="py-[var(--spacing-section)] bg-cedar text-paper">
        <div className="container-edge grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow text-paper/60 mb-4">Private events</p>
            <p className="display-md font-display mb-4">
              Larger groups, meals, appetizers, refreshments.
            </p>
            <p className="text-paper/85 prose-editorial">
              The Bistro dining area can handle larger groups for meals, appetizers, and
              refreshments — as a stand-alone function or paired with a golf package.
              The covered patio suits summer gatherings.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <a
              href="tel:+12506935451"
              className="btn-primary bg-tamarack text-granite hover:bg-paper"
            >
              Call the Bistro · 250-693-5451
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
