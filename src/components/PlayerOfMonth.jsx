import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import PlayerBust from "./PlayerBust";

export default function PlayerOfMonth({ p }) {
  return (
    <div
      className="rounded-[var(--radius-lg)] p-5 flex flex-col"
      style={{ border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-body)" }}>
          Player of the Month
        </h3>
        <div className="flex items-center gap-1">
          <button
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ border: "1px solid var(--color-border-light)", color: "var(--color-text-onLight-faint)" }}
          >
            <ChevronLeft size={13} />
          </button>
          <button
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ border: "1px solid var(--color-border-light)", color: "var(--color-text-onLight-faint)" }}
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      <PlayerBust team={p.team} />

      <div className="text-center mt-4 mb-4">
        <p className="font-display font-bold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-body)" }}>
          {p.name}
        </p>
        <p className="font-body" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-xs)" }}>
          {p.team}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 pb-4 mb-4" style={{ borderBottom: "1px solid var(--color-border-light)" }}>
        {[
          ["Runs", p.runs],
          ["Matches", p.matches],
          ["Avg", p.avg],
          ["SR", p.sr],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col items-center">
            <span className="font-display font-bold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-h2)" }}>
              {value}
            </span>
            <span className="font-body tracking-wide" style={{ color: "var(--color-text-onLight-faint)", fontSize: "9px" }}>
              {label.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      <button
        className="w-full py-3 rounded-[var(--radius-md)] font-body font-semibold grad-primary"
        style={{ color: "#ffffff", fontSize: "var(--fs-sm)" }}
      >
        View Profile
      </button>
    </div>
  );
}