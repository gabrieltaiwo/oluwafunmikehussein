import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.displayName} — ${profile.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0F2328",
          color: "#F4F7F8",
          padding: "72px 84px",
          borderTop: "12px solid #16B2BA",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#16B2BA",
            fontWeight: 600,
          }}
        >
          {profile.hero.eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              fontFamily: "Georgia, serif",
            }}
          >
            {profile.displayName}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "#C4D3D7",
              maxWidth: "880px",
            }}
          >
            {profile.hero.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #24454D",
            paddingTop: "24px",
            fontSize: 20,
            color: "#C4D3D7",
          }}
        >
          <span>{profile.jobTitle}</span>
          <span style={{ color: "#16B2BA" }}>Lagos, Nigeria</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
