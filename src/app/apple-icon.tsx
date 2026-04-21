import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#3C4A35",
          color: "#F5F2EA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 120,
          fontFamily: "Georgia, serif",
          fontWeight: 500,
          letterSpacing: "-0.04em",
        }}
      >
        B
      </div>
    ),
    size,
  );
}
