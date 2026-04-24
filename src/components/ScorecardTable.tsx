import { FRONT_NINE, BACK_NINE, HOLES, HOLE_SUMMARY, sumYardage, sumPar, type TeeKey, type Hole } from "@/data/holes";

type Props = {
  tee: TeeKey;
  showStrokeIndex?: boolean;
};

function formatYd(v: number | null | undefined): string {
  return v == null ? "–" : String(v);
}

function HalfTable({ holes, label, tee, showStrokeIndex, totalLabel }: {
  holes: Hole[];
  label: string;
  tee: TeeKey;
  showStrokeIndex?: boolean;
  totalLabel: string;
}) {
  const y = sumYardage(holes, tee);
  const p = sumPar(holes);
  const forwardHcp = tee === "white" || tee === "red";
  return (
    <div className="overflow-x-auto">
      <p className="eyebrow mb-3">{label}</p>
      <table className="w-full font-mono text-sm min-w-[640px]">
        <thead>
          <tr className="border-b border-granite/20 text-silt">
            <th className="text-left py-2 pr-4 font-normal">Hole</th>
            {holes.map((h) => (
              <th key={h.number} className="text-right py-2 px-2 font-normal">{h.number}</th>
            ))}
            <th className="text-right py-2 pl-4 font-normal">{totalLabel}</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-granite/10">
            <td className="py-2 pr-4 text-silt">Yards</td>
            {holes.map((h) => (
              <td key={h.number} className="text-right py-2 px-2">{formatYd(h.yardage[tee])}</td>
            ))}
            <td className="text-right py-2 pl-4 font-semibold">{y == null ? "–" : y}</td>
          </tr>
          <tr className="border-b border-granite/10">
            <td className="py-2 pr-4 text-silt">Par</td>
            {holes.map((h) => (
              <td key={h.number} className="text-right py-2 px-2">{h.par}</td>
            ))}
            <td className="text-right py-2 pl-4 font-semibold">{p}</td>
          </tr>
          {showStrokeIndex && (
            <tr>
              <td className="py-2 pr-4 text-silt">HCP</td>
              {holes.map((h) => (
                <td key={h.number} className="text-right py-2 px-2">
                  {forwardHcp ? (h.strokeIndexForward ?? h.strokeIndex) : h.strokeIndex}
                </td>
              ))}
              <td className="text-right py-2 pl-4 text-silt">–</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function ScorecardTable({ tee, showStrokeIndex = true }: Props) {
  const totalYards = sumYardage(HOLES, tee);
  return (
    <div className="space-y-10">
      <HalfTable holes={FRONT_NINE} label="Front nine" tee={tee} showStrokeIndex={showStrokeIndex} totalLabel="Out" />
      <HalfTable holes={BACK_NINE} label="Back nine" tee={tee} showStrokeIndex={showStrokeIndex} totalLabel="In" />
      <div className="border-t border-b border-granite/25 py-5 font-mono text-sm flex flex-wrap gap-x-10 gap-y-2">
        <span>Total par <span className="font-semibold">{HOLE_SUMMARY.par}</span></span>
        <span>{tee.charAt(0).toUpperCase() + tee.slice(1)} total <span className="font-semibold">{totalYards == null ? "–" : `${totalYards.toLocaleString()} yd`}</span></span>
      </div>
    </div>
  );
}
