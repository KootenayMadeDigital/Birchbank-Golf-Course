/**
 * WindCompass, small SVG compass showing the wind direction and speed.
 *
 * The arrow points in the direction the wind is BLOWING TOWARD (visually
 * intuitive: an arrow pointing southwest means a SW-blowing wind, which
 * meteorologically is a "northeast wind", but we render the arrow the
 * way a player thinks about it on the tee). The cardinal label uses the
 * meteorological convention from the weather snapshot.
 *
 * No client JS, pure SVG. Server-renderable.
 */
export default function WindCompass({
  bearing,
  kmh,
  cardinal,
  size = 96,
}: {
  /** Meteorological bearing 0..360, where the wind comes FROM. */
  bearing: number;
  kmh: number;
  cardinal: string;
  size?: number;
}) {
  // Rotate arrow to point in the direction the wind is heading: bearing + 180°.
  const arrowRotation = (bearing + 180) % 360;
  const r = size / 2;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label={`Wind ${kmh} km/h from ${cardinal}`}
      className="block"
    >
      {/* Outer ring */}
      <circle cx={r} cy={r} r={r - 1} fill="none" stroke="rgba(43,42,40,0.18)" strokeWidth="1" />
      {/* Cardinal tick marks */}
      {[0, 90, 180, 270].map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180;
        const x1 = r + Math.cos(rad) * (r - 4);
        const y1 = r + Math.sin(rad) * (r - 4);
        const x2 = r + Math.cos(rad) * (r - 9);
        const y2 = r + Math.sin(rad) * (r - 9);
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(43,42,40,0.35)"
            strokeWidth="1"
          />
        );
      })}
      {/* N label */}
      <text
        x={r}
        y={11}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill="rgba(43,42,40,0.55)"
      >
        N
      </text>
      {/* Wind arrow */}
      <g transform={`rotate(${arrowRotation} ${r} ${r})`}>
        <path
          d={`M ${r} ${r - (r - 14)} L ${r - 5} ${r - (r - 22)} L ${r} ${r - (r - 18)} L ${r + 5} ${r - (r - 22)} Z`}
          fill="var(--color-tamarack)"
        />
        <line
          x1={r}
          y1={r}
          x2={r}
          y2={r - (r - 18)}
          stroke="var(--color-tamarack)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      {/* Center value */}
      <text
        x={r}
        y={r + 1}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="18"
        fontWeight="500"
        fill="var(--color-granite)"
      >
        {kmh}
      </text>
      <text
        x={r}
        y={r + 12}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="7"
        letterSpacing="0.1em"
        fill="rgba(43,42,40,0.55)"
      >
        KM/H {cardinal}
      </text>
    </svg>
  );
}
