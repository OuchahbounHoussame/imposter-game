import React from "react";
import { COLORS, DISPLAY_FONT } from "./constants";
import GoldButton from "./GoldButton";

export default function VotingDonePhase({
  votingRevealed,
  revealImpostor,
  impostorIndex,
  playerLabel,
  votes,
  goToImpostorGuess,
}) {
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.hairline}`, borderRadius: 14, padding: 22, textAlign: "center" }}>
      {!votingRevealed ? (
        <>
          <div style={{ color: COLORS.goldSoft, fontSize: 17, marginBottom: 8, fontWeight: 600 }}>
            التصويت خلص
          </div>
          <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20 }}>
            الكل صوّت. الآن نكشفو شكون كان الغريب حقيقة
          </div>
          <GoldButton
            onClick={revealImpostor}
            style={{ background: `linear-gradient(180deg, ${COLORS.redStamp}, #7e3939)`, color: COLORS.cream }}
          >
            كشف الغريب
          </GoldButton>
        </>
      ) : (
        <>
          <div
            style={{
              color: COLORS.redStamp,
              border: `3px solid ${COLORS.redStamp}`,
              borderRadius: 10,
              display: "inline-block",
              padding: "8px 22px",
              fontFamily: DISPLAY_FONT,
              fontSize: 20,
              fontWeight: 700,
              transform: "rotate(-4deg)",
              marginBottom: 18,
            }}
          >
            الغريب: {playerLabel(impostorIndex)}
          </div>
          <div className="flex flex-col gap-2 mb-6" style={{ textAlign: "right" }}>
            {votes.map((v, voter) => {
              const correct = v === impostorIndex;
              return (
                <div
                  key={voter}
                  className="flex items-center justify-between"
                  style={{
                    background: COLORS.panelSoft,
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontSize: 13,
                    border: `1px solid ${correct ? COLORS.greenStamp : COLORS.redStamp}`,
                  }}
                >
                  <span style={{ color: COLORS.cream }}>
                    {playerLabel(voter)} صوّت لـ {playerLabel(v)}
                  </span>
                  <span style={{ color: correct ? COLORS.greenStamp : COLORS.redStamp, fontSize: 12 }}>
                    {correct ? "+1" : "0"}
                  </span>
                </div>
              );
            })}
          </div>
          <GoldButton onClick={goToImpostorGuess}>دور الغريب: يخمّن الكلمة</GoldButton>
        </>
      )}
    </div>
  );
}
