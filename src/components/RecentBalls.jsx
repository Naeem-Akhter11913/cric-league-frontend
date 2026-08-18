import React from 'react'
import { ballStyle } from '../utils/liveScore.utils';

const RecentBalls = ({ balls }) => {
  return (
    <div
      className="rounded-[var(--radius-lg)] p-5"
      style={{ border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="font-display font-bold mb-4" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-body)" }}>
        Recent Balls
      </h3>
      <div className="flex flex-col gap-3 mb-4">
        {balls.map((b, i) => {
          const s = ballStyle(b.kind);
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="font-body w-9" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-xs)" }}>
                {b.over}
              </span>
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center font-body font-bold"
                style={{ backgroundColor: s.bg, color: s.fg, fontSize: "11px" }}
              >
                {b.value}
              </span>
              <span
                className="font-body font-medium"
                style={{
                  color: b.kind === "wicket" ? "var(--color-accent-red)" : "var(--color-text-onLight-muted)",
                  fontSize: "var(--fs-xs)",
                }}
              >
                {b.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="text-center pt-3" style={{ borderTop: "1px solid var(--color-border-light)" }}>
        <a href="#" className="font-body font-semibold" style={{ color: "var(--color-primary)", fontSize: "var(--fs-sm)" }}>
          Full Scorecard
        </a>
      </div>
    </div>
  );
}

export default RecentBalls