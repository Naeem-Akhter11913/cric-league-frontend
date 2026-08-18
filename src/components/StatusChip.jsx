import { Clock, Radio, Trophy } from "lucide-react";
import { daysUntil } from "../utils/tournaments.utils";

export default function StatusChip({ t }) {
  if (t.status === "Live") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[0.65rem] font-bold tracking-wide bg-red-500 text-white">
        <Radio size={11} className="animate-pulse" /> LIVE
      </span>
    );
  }
  if (t.status === "Upcoming") {
    const d = daysUntil(t.start);
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[0.65rem] font-bold tracking-wide bg-blue-500 text-white">
        <Clock size={11} /> {d > 0 ? `IN ${d}D` : "STARTING SOON"}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[0.65rem] font-bold tracking-wide bg-white/15 text-white/80">
      <Trophy size={11} /> DONE
    </span>
  );
}