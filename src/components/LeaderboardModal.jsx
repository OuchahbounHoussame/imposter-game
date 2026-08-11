import React from "react";
import { COLORS, DISPLAY_FONT } from "./constants";
import GoldButton from "./GoldButton";

export default function LeaderboardModal({
  setShowLeaderboard,
  sortedIdx,
  playerLabel,
  scores,
}) {
  return (
    <div
      onClick={() => setShowLeaderboard(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 30,
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.panel,
          border: `1px solid ${COLORS.hairline}`,
          borderRadius: 14,
          padding: 20,
          width: "100%",
          maxWidth: 360,
        }}
      >
        <div
          style={{
            color: COLORS.goldSoft,
            fontFamily: DISPLAY_FONT,
            fontSize: 20,
            marginBottom: 14,
            textAlign: "center",
          }}
        >
          الترتيب
        </div>
        <div className="flex flex-col gap-2 mb-4" style={{ textAlign: "right" }}>
          {sortedIdx().map((i) => (
            <div
              key={i}
              className="flex items-center justify-between"
              style={{
                background: COLORS.panelSoft,
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 14,
                border: `1px solid ${COLORS.hairline}`,
              }}
            >
              <span style={{ color: COLORS.cream }}>{playerLabel(i)}</span>
              <span
                style={{
                  color: COLORS.gold,
                  fontFamily: DISPLAY_FONT,
                  fontSize: 16,
                }}
              >
                {scores[i]} نقطة
              </span>
            </div>
          ))}
        </div>
        <GoldButton onClick={() => setShowLeaderboard(false)}>سكّر</GoldButton>
      </div>
    </div>
  );
}
