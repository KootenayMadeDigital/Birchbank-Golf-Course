export default function ConditionsWidget() {
  const now = new Date();
  const day = now.toLocaleDateString("en-CA", { weekday: "long" });
  const time = now.toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" });

  // Until a live feed is wired in, this is a static block with the right shape.
  // Voice per blueprint §8: "Friday, 7:14 a.m. Course open. Frost delay lifted 8:30…"
  return (
    <aside
      aria-label="Course conditions"
      className="border border-granite/15 bg-paper rounded-sm p-6 md:p-7 font-mono text-sm leading-relaxed"
    >
      <p className="eyebrow mb-4 text-cedar">Conditions</p>
      <p className="text-granite">
        {day}, {time}. Course open. No frost delay.
        <br />
        Greens at 10.2. Fairway firmness 7/10.
        <br />
        SW wind 12 km/h. 14°C rising to 22°C.
        <br />
        A two-club day.
      </p>
      <a href="/conditions" className="mt-5 inline-block text-xs text-amber hover:underline">
        Full conditions report →
      </a>
    </aside>
  );
}
