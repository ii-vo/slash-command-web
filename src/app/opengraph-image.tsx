import { ImageResponse } from "next/og";

export const alt = "Slash Command - Claude Code Plugin";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "black",
              color: "white",
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            /
          </div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "black",
            marginBottom: 16,
          }}
        >
          Slash Command
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#71717a",
          }}
        >
          Structured workflows for Claude Code
        </div>
      </div>
    ),
    { ...size }
  );
}
