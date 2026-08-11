import React from "react";
import { COLORS } from "./constants";
import GoldButton from "./GoldButton";

export default function VotingPhase({
  voterIndex,
  playerCount,
  playerLabel,
  voteConfirmed,
  castVote,
  nextVoter,
}) {
  return (
    <div style={{
      background: COLORS.panel,
      border: `1px solid ${COLORS.hairline}`,
      borderRadius: 14,
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      maxHeight: "80vh",
      overflowY: "auto",
    }}>
      <div style={{ color: COLORS.muted, fontSize: 13, textAlign: "center" }}>
        {voterIndex + 1} / {playerCount}
      </div>
      <div style={{ color: COLORS.goldSoft, fontSize: 17, fontWeight: 600, textAlign: "center" }}>
        صوّت يا {playerLabel(voterIndex)}: شكون الغريب؟
      </div>

      {!voteConfirmed ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: playerCount }).map((_, i) => {
            if (i === voterIndex) return null; // Prevent self-voting
            return (
              <button
                key={i}
                onClick={() => castVote(i)}
                style={{
                  background: COLORS.panelSoft,
                  border: `1px solid ${COLORS.hairline}`,
                  color: COLORS.cream,
                  borderRadius: 8,
                  padding: "16px 14px",
                  fontSize: 15,
                  textAlign: "right",
                  cursor: "pointer",
                }}
              >
                {playerLabel(i)}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div
            style={{
              color: COLORS.goldSoft,
              border: `1px solid ${COLORS.gold}`,
              borderRadius: 10,
              padding: "16px 20px",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            تصويتك اتسجل. خبّي وسلّم للي بعدك.
          </div>
          <GoldButton onClick={nextVoter}>
            {voterIndex + 1 < playerCount ? "التالي" : "خلص التصويت"}
          </GoldButton>
        </div>
      )}
    </div>
  );
}
