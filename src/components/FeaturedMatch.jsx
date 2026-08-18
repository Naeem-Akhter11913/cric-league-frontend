import { PlayCircle, Radio } from 'lucide-react';
import React from 'react'
import ScoreCrest from './ScoreCrest';

const FeaturedMatch = ({ m }) => {
   return (
    <div
      className="rounded-[var(--radius-lg)] p-5"
      style={{ border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-body font-bold tracking-wide"
          style={{ backgroundColor: "var(--color-accent-red)", color: "#ffffff", fontSize: "10px" }}
        >
          <Radio size={11} className="animate-pulse" /> LIVE
        </span>
        <span className="font-body" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-xs)" }}>
          {m.tournament}
        </span>
      </div>

      <div className="grid grid-cols-3 items-center gap-3 mb-5">
        <div className="flex flex-col items-center gap-2">
          <ScoreCrest color={m.teamA.crest} size={44} />
          <p className="font-display font-bold text-center" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
            {m.teamA.name}
          </p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold" style={{ color: "var(--color-text-onLight)", fontSize: "1.6rem" }}>
              {m.teamA.score}
            </span>
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center font-body font-semibold"
              style={{ backgroundColor: "var(--color-bg-light-2)", color: "var(--color-text-onLight-faint)", fontSize: "10px" }}
            >
              vs
            </span>
            <span className="font-display font-bold" style={{ color: "var(--color-text-onLight)", fontSize: "1.6rem" }}>
              {m.teamB.score}
            </span>
          </div>
          <div className="flex items-center gap-8">
            <span className="font-body" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-xs)" }}>
              {m.teamA.overs}
            </span>
            <span className="font-body" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-xs)" }}>
              {m.teamB.overs}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <ScoreCrest color={m.teamB.crest} size={44} />
          <p className="font-display font-bold text-center" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
            {m.teamB.name}
          </p>
        </div>
      </div>

      <div
        className="grid grid-cols-2 rounded-[var(--radius-md)] overflow-hidden mb-3"
        style={{ backgroundColor: "var(--color-bg-light-2)" }}
      >
        <div className="text-center py-3" style={{ borderRight: "1px solid var(--color-border-light)" }}>
          <p className="font-body" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-xs)" }}>RRR</p>
          <p className="font-display font-bold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-body)" }}>{m.rrr}</p>
        </div>
        <div className="text-center py-3">
          <p className="font-body" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-xs)" }}>CRR</p>
          <p className="font-display font-bold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-body)" }}>{m.crr}</p>
        </div>
      </div>

      <p className="text-center font-body font-semibold mb-4" style={{ color: "var(--color-accent-green)", fontSize: "var(--fs-sm)" }}>
        {m.situation}
      </p>

      <button
        className="w-full flex items-center justify-center gap-2 py-3 rounded-[var(--radius-md)] font-body font-semibold"
        style={{ backgroundColor: "var(--color-badge-live-bg)", color: "var(--color-primary)", fontSize: "var(--fs-sm)" }}
      >
        <PlayCircle size={16} /> Watch Live
      </button>
    </div>
  );
}

export default FeaturedMatch