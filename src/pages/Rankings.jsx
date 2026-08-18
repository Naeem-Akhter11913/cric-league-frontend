import { useState } from "react";
import { Check } from "lucide-react";
import { MEDAL_COLORS, POINTS_SYSTEM, RANKING_FACTORS, TABS, TEAM_RANKINGS } from "../data/ranking.utils";
import RankingsTable from "../components/RankingsTable";
import PointsSystem from "../components/PointsSystem";
import AboutRankings from "../components/AboutRankings";
import RankingsTabBar from "../components/RankingsTabBar";
import RankingsHero from "../components/RankingsHero";



export default function Rankings() {
  const [activeTab, setActiveTab] = useState("Team Rankings");

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "var(--color-bg-light-2)" }}>
      <RankingsHero />

      <div className="max-w-6xl mx-auto px-6 -mt-8 pb-12">
        <div
          className="rounded-[var(--radius-lg)] overflow-hidden"
          style={{ backgroundColor: "var(--color-bg-light)", boxShadow: "var(--shadow-card)" }}
        >
          <RankingsTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5 px-4 pb-5">
            <div className="overflow-x-auto rounded-[var(--radius-md)]" style={{ border: "1px solid var(--color-border-light)" }}>
              <RankingsTable teams={TEAM_RANKINGS} />
            </div>

            <div className="flex flex-col gap-5">
              <AboutRankings />
              <PointsSystem />
            </div>
          </div>

          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderTop: "1px solid var(--color-border-light)" }}
          >
            <span className="font-body" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-xs)" }}>
              Last Updated: May 15, 2026 10:30 PM
            </span>
            <span className="font-body font-semibold" style={{ color: "var(--color-primary)", fontSize: "var(--fs-xs)" }}>
              Next Update in 15 min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}