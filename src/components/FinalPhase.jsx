import React from "react";
import { COLORS, DISPLAY_FONT } from "./constants";
import DossierBG from "./DossierBG";
import GoldButton from "./GoldButton";

export default function FinalPhase({
  catUsed,
  word,
  impostorIndex,
  playerLabel,
  sortedIdx,
  scores,
  resetRound,
}) {
  return (
    <div style={{
      background: COLORS.panel,
      border: `1px solid ${COLORS.hairline}`,
      borderRadius: 14,
      padding: "20px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      maxHeight: "80vh",
      overflowY: "auto",
    }}>
      <DossierBG />
      <div>
        <div style={{ color: COLORS.muted, fontSize: 13 }}>الفئة: {catUsed}</div>
        <div style={{ fontFamily: DISPLAY_FONT, color: COLORS.goldSoft, fontSize: 24, fontWeight: 700 }}>
          الكلمة كانت: {word}
        </div>
      </div>

      <div
        style={{
          color: COLORS.redStamp,
          border: `3px solid ${COLORS.redStamp}`,
          borderRadius: 10,
          display: "inline-block",
          padding: "8px 22px",
          fontFamily: DISPLAY_FONT,
          fontSize: 18,
          fontWeight: 700,
          transform: "rotate(-4deg)",
          alignSelf: "center"
        }}
      >
        الغريب: {playerLabel(impostorIndex)}
      </div>

      <div style={{ color: COLORS.goldSoft, fontSize: 14, fontWeight: 600, textAlign: "right" }}>
        الترتيب
      </div>
      <div className="flex flex-col gap-2" style={{ textAlign: "right" }}>
        {sortedIdx().map((i) => (
          <div
            key={i}
            className="flex items-center justify-between"
            style={{
              background: COLORS.panelSoft,
              borderRadius: 8,
              padding: "12px",
              fontSize: 14,
              border: `1px solid ${i === impostorIndex ? COLORS.redStamp : COLORS.hairline}`,
            }}
          >
            <span style={{ color: i === impostorIndex ? COLORS.redStamp : COLORS.cream }}>
              {playerLabel(i)} {i === impostorIndex ? "(الغريب)" : ""}
            </span>
            <span style={{ color: COLORS.gold, fontFamily: DISPLAY_FONT, fontSize: 16 }}>{scores[i]} نقطة</span>
          </div>
        ))}
      </div>

      <GoldButton onClick={resetRound}>جولة جديدة</GoldButton>
    </div>
  );
}
