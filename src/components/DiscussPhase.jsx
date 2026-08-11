import React from "react";
import { COLORS, DISPLAY_FONT } from "./constants";
import GoldButton from "./GoldButton";

export default function DiscussPhase({
  seconds,
  setSeconds,
  running,
  setRunning,
  fmtTime,
  goToVoting,
}) {
  return (
    <div style={{
      background: COLORS.panel,
      border: `1px solid ${COLORS.hairline}`,
      borderRadius: 14,
      padding: "24px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}>
      <div>
        <div style={{ color: COLORS.goldSoft, fontSize: 16, fontWeight: 600 }}>وقت النقاش</div>
        <div style={{ color: COLORS.muted, fontSize: 12 }}>
          كل واحد يوصف الكلمة بلا ما يبين بزاف، بعدها كل واحد غادي يصوت
        </div>
      </div>

      <div style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(3rem, 10vw, 4rem)", color: seconds === 0 ? COLORS.redStamp : COLORS.gold, letterSpacing: 2 }}>
        {fmtTime(seconds)}
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          style={{ background: COLORS.panelSoft, border: `1px solid ${COLORS.gold}`, color: COLORS.goldSoft, borderRadius: 8, padding: "12px 24px", cursor: "pointer", fontSize: 14, flex: 1 }}
        >
          {running ? "وقف" : "شغّل"}
        </button>
        <button
          onClick={() => { setRunning(false); setSeconds(180); }}
          style={{ background: "transparent", border: `1px solid ${COLORS.hairline}`, color: COLORS.muted, borderRadius: 8, padding: "12px 24px", cursor: "pointer", fontSize: 14, flex: 1 }}
        >
          إعادة
        </button>
      </div>

      <GoldButton onClick={goToVoting} style={{ background: `linear-gradient(180deg, ${COLORS.redStamp}, #7e3939)`, color: COLORS.cream }}>
        خلصنا، بداو التصويت
      </GoldButton>
    </div>
  );
}
