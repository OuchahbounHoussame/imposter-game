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
    <div style={{
      background: COLORS.panel,
      border: `1px solid ${COLORS.hairline}`,
      borderRadius: 14,
      padding: "20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      maxHeight: "80vh",
      overflowY: "auto",
    }}>
      {!votingRevealed ? (
        <>
          <div style={{ color: COLORS.goldSoft, fontSize: 17, fontWeight: 600 }}>
            التصويت خلص
          </div>
          <div style={{ color: COLORS.muted, fontSize: 13 }}>
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
              alignSelf: "center"
            }}
          >
            الغريب: {playerLabel(impostorIndex)}
          </div>
          <div className="flex flex-col gap-2" style={{ textAlign: "right" }}>
            {votes.map((v, voter) => {
              const correct = v === impostorIndex;
              return (
                <div
                  key={voter}
                  className="flex items-center justify-between"
                  style={{
                    background: COLORS.panelSoft,
                    borderRadius: 8,
                    padding: "12px",
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
