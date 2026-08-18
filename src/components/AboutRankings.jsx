import { Check } from "lucide-react";
import React from "react";
import { RANKING_FACTORS } from "../data/ranking.utils";

export default function AboutRankings() {
  return (
    <div
      className="rounded-[var(--radius-lg)] p-5"
      style={{ border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="font-display font-bold mb-3" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-body)" }}>
        About Rankings
      </h3>
      <p className="font-body mb-4" style={{ color: "var(--color-text-onLight-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>
        Rankings are updated after every match based on the following parameters.
      </p>
      <ul className="flex flex-col gap-2.5">
        {RANKING_FACTORS.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "var(--color-badge-live-bg)" }}
            >
              <Check size={10} color="var(--color-primary)" strokeWidth={3} />
            </span>
            <span className="font-body" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
              {f}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}