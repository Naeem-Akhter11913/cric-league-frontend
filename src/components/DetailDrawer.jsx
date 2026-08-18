import { useState } from "react";
import { fmtDateRange, tier } from "../utils/tournaments.utils";
import ArenaBanner from "./ArenaBanner";
import { Radio, Star, X } from "lucide-react";
import StatusChip from "./StatusChip";
import Crest from "./Crest";

export default function DetailDrawer({ t, onClose, favorited, onToggleFavorite, onRegister }) {
  const [tab, setTab] = useState("Overview");
  const tr = tier(t.prize);
  const fillPct = Math.round((t.teamsFilled / t.teams) * 100);
  const tabs = ["Overview", "Prizes", "Organizer"];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-md h-full bg-[var(--color-bg-dark)] border-l border-[var(--color-border-dark)] flex flex-col animate-slide-in overflow-y-auto">
        <div className="relative">
          <ArenaBanner t={t} mouse={null} />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition">
            <X size={16} className="text-white" />
          </button>
          <div className="absolute top-3 left-3"><StatusChip t={t} /></div>
          <div className="absolute left-6 -bottom-9"><Crest t={t} size={72} /></div>
        </div>

        <div className="px-6 pt-12 pb-6 flex-1 flex flex-col">
          <span className="text-[0.65rem] uppercase tracking-[0.15em] mb-1" style={{ color: tr.ring }}>{tr.name} Tier Tournament</span>
          <h2 className="text-white font-display font-extrabold text-xl mb-1">{t.name}</h2>
          <p className="text-[var(--color-text-onDark-faint)] text-sm mb-5">{fmtDateRange(t.start, t.end)}</p>

          <div className="flex gap-1 mb-5 border-b border-[var(--color-border-dark)]">
            {tabs.map((tb) => (
              <button
                key={tb}
                onClick={() => setTab(tb)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${tab === tb ? "text-white" : "text-[var(--color-text-onDark-faint)] hover:text-white"}`}
              >
                {tb}
                {tab === tb && <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] grad-primary rounded-full" />}
              </button>
            ))}
          </div>

          {tab === "Overview" && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-[0.65rem] text-white/50 uppercase mb-1">Teams</p>
                  <p className="text-white font-bold">{t.teams}</p>
                </div>
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-[0.65rem] text-white/50 uppercase mb-1">Matches</p>
                  <p className="text-white font-bold">{t.matches}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-[var(--color-text-onDark-faint)] mb-1">
                  <span>Roster filled</span><span>{t.teamsFilled}/{t.teams} ({fillPct}%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full grad-primary rounded-full transition-all duration-700" style={{ width: `${fillPct}%` }} />
                </div>
              </div>
              {t.status === "Live" && (
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <Radio size={14} className="animate-pulse" /> {t.viewers.toLocaleString("en-IN")} watching now
                </div>
              )}
            </div>
          )}

          {tab === "Prizes" && (
            <div className="space-y-3 animate-fade-in">
              {[
                { place: "1st Place", pct: 0.5, icon: "🥇" },
                { place: "2nd Place", pct: 0.3, icon: "🥈" },
                { place: "3rd Place", pct: 0.2, icon: "🥉" },
              ].map((p) => (
                <div key={p.place} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5">
                  <span className="text-sm text-white/80">{p.icon} {p.place}</span>
                  <span className="text-white font-semibold">₹{Math.round(t.prize * p.pct).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "Organizer" && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                <div className="w-10 h-10 rounded-full grad-primary flex items-center justify-center text-white font-bold">
                  {t.organizer.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.organizer}</p>
                  <p className="text-[var(--color-text-onDark-faint)] text-xs">Verified organizer</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-auto pt-6 flex items-center gap-3">
            <button
              onClick={() => onToggleFavorite(t.id)}
              className="w-11 h-11 shrink-0 rounded-[var(--radius-sm)] border border-[var(--color-border-dark)] flex items-center justify-center hover:bg-white/5 transition"
            >
              <Star size={16} className={favorited ? "fill-[#f5c542] text-[#f5c542]" : "text-white/70"} />
            </button>
            <button
              onClick={() => onRegister(t)}
              disabled={t.status === "Completed"}
              className="flex-1 py-3 rounded-[var(--radius-sm)] grad-primary text-white text-sm font-semibold hover:brightness-110 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t.status === "Completed" ? "Tournament Ended" : t.status === "Live" ? "Watch Live" : "Register Team"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}