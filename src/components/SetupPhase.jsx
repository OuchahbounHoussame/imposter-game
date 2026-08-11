import React from "react";
import { COLORS, CAT_NAMES } from "./constants";
import GoldButton from "./GoldButton";

export default function SetupPhase({
  playerCount,
  setPlayerCount,
  names,
  setNames,
  category,
  setCategory,
  startGame,
  scores,
  resetScores,
}) {
  return (
    <div
      style={{
        background: COLORS.panel,
        border: `1px solid ${COLORS.hairline}`,
        borderRadius: 14,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
      className="shadow-lg"
    >
      <div>
        <div style={{ color: COLORS.goldSoft, fontSize: 14, marginBottom: 8 }}>
          عدد اللاعبين: <span style={{ color: COLORS.cream }}>{playerCount}</span>
        </div>
        <input
          type="range"
          min={3}
          max={8}
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
          style={{ width: "100%", accentColor: COLORS.gold }}
        />
        <div className="flex justify-between" style={{ color: COLORS.muted, fontSize: 11 }}>
          <span>3</span>
          <span>8</span>
        </div>
      </div>

      <div>
        <div style={{ color: COLORS.goldSoft, fontSize: 14, marginBottom: 8 }}>أسماء اللاعبين (اختياري)</div>
        <div className="flex flex-col gap-2">
          {names.map((n, i) => (
            <input
              key={i}
              value={n}
              onChange={(e) => {
                const arr = [...names];
                arr[i] = e.target.value;
                setNames(arr);
              }}
              placeholder={`اللاعب ${i + 1}`}
              style={{
                background: COLORS.panelSoft,
                border: `1px solid ${COLORS.hairline}`,
                color: COLORS.cream,
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 14,
                textAlign: "right",
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <div style={{ color: COLORS.goldSoft, fontSize: 14, marginBottom: 8 }}>الفئة</div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            background: COLORS.panelSoft,
            border: `1px solid ${COLORS.hairline}`,
            color: COLORS.cream,
            borderRadius: 8,
            padding: "10px 12px",
            fontSize: 14,
          }}
        >
          <option value="عشوائي">عشوائي</option>
          {CAT_NAMES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <GoldButton onClick={startGame}>ابدأ اللعبة</GoldButton>

      {scores.some((s) => s > 0) && (
        <div className="flex items-center justify-between" style={{ fontSize: 12, color: COLORS.muted }}>
          <span>عندكم نقط محفوظة من جولة سابقة</span>
          <button
            onClick={resetScores}
            style={{ color: COLORS.redStamp, background: "transparent", border: "none", cursor: "pointer", fontSize: 12 }}
          >
            تصفير النقط
          </button>
        </div>
      )}

      <div style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.7 }}>
        مرّرو الهاتف بالدور. كل واحد كيشوف ملفو الخاص بلا ما يبين للباقي.
        الكل كيخذ نفس الكلمة، غير <span style={{ color: COLORS.redStamp }}>الغريب</span> ما
        كيعرفهاش. من بعد، تناقشو، صوّتو، وشوفو شكون ربح النقط.
      </div>
    </div>
  );
}
