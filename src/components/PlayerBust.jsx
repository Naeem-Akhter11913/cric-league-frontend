import React from 'react'
import { TEAM_COLORS } from "../data/player";

export default 
function PlayerBust({ team }) {
  const color = TEAM_COLORS[team] || "var(--color-primary)";
  return (
    <div
      className="relative w-full h-32 rounded-[var(--radius-md)] overflow-hidden flex items-end justify-center"
      style={{
        background: `linear-gradient(160deg, ${color}33 0%, var(--color-bg-dark) 75%)`,
      }}
    >
      <svg viewBox="0 0 100 90" className="w-24 h-24">
        <circle cx="50" cy="28" r="16" fill="#e7b895" />
        <path
          d="M18 90 C18 62 30 48 50 48 C70 48 82 62 82 90 Z"
          fill={color}
        />
        <path d="M50 48 C58 48 66 51 72 56 L60 70 L50 60 Z" fill={color} opacity="0.75" />
        <path d="M50 48 C42 48 34 51 28 56 L40 70 L50 60 Z" fill={color} opacity="0.75" />
      </svg>
      <span
        className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 5v2M12 17v2M5 12h2M17 12h2" />
        </svg>
      </span>
    </div>
  );
}