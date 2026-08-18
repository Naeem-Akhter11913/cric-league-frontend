import React from "react";
import ScoreCrest from "./ScoreCrest";


export default function OtherMatchRow({ m }) {
  return (
    <div
      className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-4 px-5 py-4"
      style={{ borderBottom: "1px solid var(--color-border-light)" }}
    >
      <div>
        <p className="font-body mb-1" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-xs)" }}>
          {m.tournament}
        </p>
        <div className="flex items-center gap-2 mb-1">
          <ScoreCrest color={m.teamA.crest} size={22} />
          <span className="font-body font-semibold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
            {m.teamA.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ScoreCrest color={m.teamB.crest} size={22} />
          <span className="font-body font-semibold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
            {m.teamB.name}
          </span>
        </div>
      </div>

      <span className="font-body font-medium" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-xs)" }}>
        vs
      </span>

      <div className="text-right">
        <p className="font-body font-semibold mb-1" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
          {m.teamA.score}
        </p>
        <p className="font-body font-semibold mb-1" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
          {m.teamB.score}
        </p>
        <p className="font-body" style={{ color: m.noteColor, fontSize: "var(--fs-xs)" }}>
          {m.note}
        </p>
      </div>

      <button
        className="px-5 py-2 rounded-[var(--radius-sm)] font-body font-semibold grad-primary"
        style={{ color: "#ffffff", fontSize: "var(--fs-sm)" }}
      >
        View
      </button>
    </div>
  );
}