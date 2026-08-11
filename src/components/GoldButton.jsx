import React from "react";
import { COLORS } from "./constants";

export default function GoldButton({ onClick, children, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        background: `linear-gradient(180deg, ${COLORS.goldSoft}, ${COLORS.gold})`,
        color: COLORS.ink,
        fontWeight: 700,
        fontSize: 15,
        border: "none",
        borderRadius: 10,
        padding: "12px 0",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
