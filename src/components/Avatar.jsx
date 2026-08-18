import React from 'react';
import { TEAM_COLORS } from "../data/player";
import { initials } from '../utils/plyers.utils';

export default function Avatar({ name, team, size = 32 }) {
  const color = TEAM_COLORS[team] || "var(--color-primary)";
  return (
    <div
      className="rounded-full flex items-center justify-center font-display font-bold shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        color: "#ffffff",
        background: `linear-gradient(135deg, ${color} 0%, var(--color-primary-700) 100%)`,
        border: "2px solid var(--color-bg-light)",
        boxShadow: "0 0 0 1px var(--color-border-light)",
      }}
    >
      {initials(name)}
    </div>
  );
}