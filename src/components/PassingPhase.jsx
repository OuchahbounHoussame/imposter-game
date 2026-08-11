import React from "react";
import { COLORS, DISPLAY_FONT } from "./constants";
import DossierBG from "./DossierBG";
import GoldButton from "./GoldButton";

export default function PassingPhase({
  current,
  playerCount,
  playerLabel,
  flipped,
  advancing,
  handleReveal,
  handleNext,
  impostorIndex,
  catUsed,
  word,
}) {
  return (
    <div className="flex flex-col items-center">
      <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 6 }}>
        {current + 1} / {playerCount}
      </div>
      <div style={{ color: COLORS.goldSoft, fontSize: 18, marginBottom: 18, fontWeight: 600 }}>
        الدور على: {playerLabel(current)}
      </div>

      <div
        onClick={() => !flipped && !advancing && handleReveal()}
        style={{ width: 280, height: 380, position: "relative", cursor: flipped || advancing ? "default" : "pointer", perspective: 1200 }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s cubic-bezier(.4,.2,.2,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: COLORS.panel,
              border: `1px solid ${COLORS.hairline}`,
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              transform: "rotateY(0deg)", // Explicitly set for Safari
            }}
          >
            <DossierBG />
            <div
              style={{
                border: `2px solid ${COLORS.gold}`,
                borderRadius: "50%",
                width: 92,
                height: 92,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLORS.gold,
                fontFamily: DISPLAY_FONT,
                fontSize: 13,
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              سري
            </div>
            <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 22 }}>اضغط لكشف الملف</div>
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: COLORS.panelSoft,
              border: `1px solid ${current === impostorIndex ? COLORS.redStamp : COLORS.gold}`,
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              overflow: "hidden",
            }}
          >
            <DossierBG />
            {current === impostorIndex ? (
              <>
                <div
                  style={{
                    color: COLORS.redStamp,
                    border: `3px solid ${COLORS.redStamp}`,
                    borderRadius: 10,
                    padding: "10px 18px",
                    fontFamily: DISPLAY_FONT,
                    fontSize: 26,
                    fontWeight: 700,
                    transform: "rotate(-6deg)",
                    letterSpacing: 2,
                  }}
                >
                  أنت الغريب
                </div>
                <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 24, textAlign: "center" }}>
                  ما تعرفش الكلمة. حاول تفهم من كلام الآخرين
                  <br />
                  وما تكشفش روحك! إلا طلعو بيك، غادي تقدر تخمن الكلمة وتربح نقطة.
                </div>
              </>
            ) : (
              <>
                <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 6 }}>الفئة: {catUsed}</div>
                <div
                  style={{
                    color: COLORS.goldSoft,
                    fontFamily: DISPLAY_FONT,
                    fontSize: 30,
                    fontWeight: 700,
                    border: `2px solid ${COLORS.gold}`,
                    borderRadius: 10,
                    padding: "10px 20px",
                  }}
                >
                  {word}
                </div>
                <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 24 }}>
                  واحد من المجموعة "الغريب" ولا يعرفهاش
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {flipped && (
        <GoldButton onClick={handleNext} style={{ marginTop: 24, width: "auto", padding: "10px 28px" }}>
          {current + 1 < playerCount ? "خبّي وسلّم للي بعدك" : "الكل شاف ملفو"}
        </GoldButton>
      )}
    </div>
  );
}
