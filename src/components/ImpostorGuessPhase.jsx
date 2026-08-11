import React from "react";
import { COLORS, DISPLAY_FONT } from "./constants";
import GoldButton from "./GoldButton";

export default function ImpostorGuessPhase({
  impostorIndex,
  playerLabel,
  guessOptions,
  guessPicked,
  pickGuess,
  word,
  setPhase,
}) {
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.hairline}`, borderRadius: 14, padding: 22, textAlign: "center" }}>
      <div style={{ color: COLORS.redStamp, fontFamily: DISPLAY_FONT, fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
        دور الغريب: {playerLabel(impostorIndex)}
      </div>
      <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 18 }}>
        إلا خمّن الكلمة الصحيحة، كيربح نقطة
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {guessOptions.map((w) => {
          const isPicked = guessPicked === w;
          const isCorrect = w === word;
          let borderColor = COLORS.hairline;
          let textColor = COLORS.cream;
          if (guessPicked) {
            if (isCorrect) { borderColor = COLORS.greenStamp; textColor = COLORS.greenStamp; }
            else if (isPicked) { borderColor = COLORS.redStamp; textColor = COLORS.redStamp; }
          }
          return (
            <button
              key={w}
              onClick={() => pickGuess(w)}
              disabled={!!guessPicked}
              style={{
                background: COLORS.panelSoft,
                border: `1px solid ${borderColor}`,
                color: textColor,
                borderRadius: 8,
                padding: "12px 8px",
                fontSize: 14,
                cursor: guessPicked ? "default" : "pointer",
              }}
            >
              {w}
            </button>
          );
        })}
      </div>

      {guessPicked && (
        <>
          <div style={{ color: guessPicked === word ? COLORS.greenStamp : COLORS.redStamp, fontSize: 14, marginBottom: 16 }}>
            {guessPicked === word ? "صحيح! ربحتي نقطة" : `غالط، الكلمة كانت: ${word}`}
          </div>
          <GoldButton onClick={() => setPhase("final")}>شوف الترتيب</GoldButton>
        </>
      )}
    </div>
  );
}
