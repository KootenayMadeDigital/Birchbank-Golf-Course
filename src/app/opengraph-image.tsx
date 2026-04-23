import { ImageResponse } from "next/og";

export const alt = "Birchbank Golf Course — Rossland Trail Country Club, Genelle BC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#2B2A28",
          color: "#F5F2EA",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#C89B3C",
          }}
        >
          Birchbank · Genelle, BC
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, lineHeight: 1.0, letterSpacing: "-0.02em" }}>
            Come for
          </div>
          <div style={{ fontSize: 108, lineHeight: 1.0, letterSpacing: "-0.02em" }}>
            the drop.
          </div>
        </div>

        <div
          style={{
            fontSize: 26,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            color: "rgba(245, 242, 234, 0.7)",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span>Set along the banks of the Columbia River.</span>
          <span style={{ color: "#C89B3C" }}>birchbankgolf.com</span>
        </div>
      </div>
    ),
    size,
  );
}
