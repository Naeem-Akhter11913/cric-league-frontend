import React from "react";
import { POINTS_SYSTEM } from "../data/ranking.utils";

export default function PointsSystem() {
  return (
    <div
      className="rounded-[var(--radius-lg)] p-5"
      style={{ border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="font-display font-bold mb-3" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-body)" }}>
        Points System
      </h3>
      <div className="flex flex-col">
        {POINTS_SYSTEM.map((p, i) => (
          <div
            key={p.label}
            className="flex items-center justify-between py-2.5"
            style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border-light)" }}
          >
            <span className="font-body" style={{ color: "var(--color-text-onLight-muted)", fontSize: "var(--fs-sm)" }}>
              {p.label}
            </span>
            <span className="font-body font-semibold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
              {p.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}