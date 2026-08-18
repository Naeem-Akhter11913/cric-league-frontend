import { useState } from "react";
import { TOP_TOURNAMENTS, STATUS_STYLES } from "./data";
import { fmtDateRange, tier } from "../utils/tournaments.utils";
import { Star, Swords, Users } from "lucide-react";
import StatusChip from "./StatusChip";
import ArenaBanner from "./ArenaBanner";
import Highlight from "./Highlight";
import Crest from "./Crest";

export default function TournamentsCard({ t, favorited, onToggleFavorite, onOpen, query }) {
  const [mouse, setMouse] = useState(null);
  const tr = tier(t.prize);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse(null)}
      onClick={() => onOpen(t)}
      className="group relative rounded-[var(--radius-lg)] overflow-hidden bg-[#14121f] border border-[var(--color-border-dark)] cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(124,92,252,0.25)] animate-fade-in"
    >
      {/* favorite toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(t.id); }}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center hover:bg-black/60 transition"
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Star
          size={15}
          className={favorited ? "fill-[#f5c542] text-[#f5c542]" : "text-white/70"}
        />
      </button>

      {/* status chip */}
      <div className="absolute top-3 left-3 z-10">
        <StatusChip t={t} />
      </div>

      {/* arena banner */}
      <ArenaBanner t={t} mouse={mouse} />

      {/* crest, overlapping banner/body seam */}
      <div className="relative px-5 -mt-8">
        <Crest t={t} size={64} />
      </div>

      {/* body */}
      <div className="px-5 pt-3 pb-5">
        <h3 className="font-display font-bold text-white text-base mb-1 truncate">
          <Highlight text={t.name} query={query} />
        </h3>
        <p className="text-[0.7rem] font-semibold uppercase tracking-wide" style={{ color: tr.ring }}>
          {tr.name} Tier
        </p>

        <p className="text-[var(--color-text-onDark-faint)] text-xs mt-2 mb-4">
          {fmtDateRange(t.start, t.end)}
        </p>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--color-border-dark)]">
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-1 text-white font-display font-bold text-sm">
              <Users size={12} className="text-[var(--color-text-onDark-faint)]" /> {t.teams}
            </span>
            <span className="text-[9px] tracking-wide text-[var(--color-text-onDark-faint)]">TEAMS</span>
          </div>
          <div className="flex flex-col items-center border-x border-[var(--color-border-dark)]">
            <span className="inline-flex items-center gap-1 text-white font-display font-bold text-sm">
              <Swords size={12} className="text-[var(--color-text-onDark-faint)]" /> {t.matches}
            </span>
            <span className="text-[9px] tracking-wide text-[var(--color-text-onDark-faint)]">MATCHES</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-display font-bold text-sm">
              ₹{t.prize >= 1000 ? `${Math.round(t.prize / 1000)}K` : t.prize}
            </span>
            <span className="text-[9px] tracking-wide text-[var(--color-text-onDark-faint)]">PRIZE</span>
          </div>
        </div>
      </div>
    </div>
  );
}