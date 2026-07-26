import { ImageResponse } from "next/og";

export const alt = "DekatLokal Event — Kelola Acara, Hubungkan Peserta, Ukur Dampaknya";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#0255F5",
          color: "white",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "68px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            display: "flex",
            inset: 0,
            opacity: 0.55,
            position: "absolute",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            maxWidth: "790px",
            position: "relative",
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: "14px" }}>
            <div
              style={{
                alignItems: "center",
                background: "white",
                borderRadius: "18px",
                color: "#0255F5",
                display: "flex",
                fontSize: "28px",
                fontWeight: 800,
                height: "58px",
                justifyContent: "center",
                width: "58px",
              }}
            >
              ↗
            </div>
            <div style={{ display: "flex", fontSize: "28px", fontWeight: 700 }}>
              DekatLokal <span style={{ color: "#B7CFFC", marginLeft: "8px" }}>Event</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#B7CFFC",
                display: "flex",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              AI Co-Creation Lab Makassar
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "58px",
                fontWeight: 700,
                letterSpacing: "-0.055em",
                lineHeight: 1.08,
                marginTop: "20px",
              }}
            >
              Kelola Acara. Hubungkan Peserta. Ukur Dampaknya.
            </div>
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            width: "260px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,.12)",
              border: "1px solid rgba(255,255,255,.22)",
              borderRadius: "999px",
              display: "flex",
              height: "260px",
              position: "absolute",
              width: "260px",
            }}
          />
          <div
            style={{
              alignItems: "center",
              background: "white",
              borderRadius: "999px",
              color: "#0255F5",
              display: "flex",
              flexDirection: "column",
              height: "188px",
              justifyContent: "center",
              width: "188px",
            }}
          >
            <span style={{ display: "flex", fontSize: "58px", fontWeight: 800 }}>16+4</span>
            <span style={{ display: "flex", fontSize: "17px", fontWeight: 700 }}>mahasiswa × UMKM</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
