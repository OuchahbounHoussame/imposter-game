import React from "react";
import { COLORS } from "./constants";

export default function DossierBG() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.05,
        backgroundImage: `repeating-linear-gradient(0deg, ${COLORS.cream} 0px, ${COLORS.cream} 1px, transparent 1px, transparent 26px)`,
        pointerEvents: "none",
      }}
    />
  );
}
