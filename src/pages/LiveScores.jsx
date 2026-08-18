import { useState } from "react";
import { RefreshCw, Radio, PlayCircle } from "lucide-react";
import { FEATURED_MATCH, OTHER_LIVE_MATCHES, RECENT_BALLS, TABS } from "../data/liveScore";
import OtherMatchRow from "../components/OtherMatchRow";
import RecentBalls from "../components/RecentBalls";
import FeaturedMatch from "../components/FeaturedMatch";
import LiveScoreHero from "../components/LiveScoreHero";
import LiveScoreTabBar from "../components/LiveScoreTabBar";




export default function LiveScores() {
  const [activeTab, setActiveTab] = useState("Live");

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "var(--color-bg-light-2)" }}>
      <LiveScoreHero />

      <div className="max-w-6xl mx-auto px-6 -mt-0">
        <div className="rounded-[var(--radius-lg)] overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
          <LiveScoreTabBar activeTab={activeTab} setActiveTab={setActiveTab} onRefresh={() => {}} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 mt-5 mb-8">
          <FeaturedMatch m={FEATURED_MATCH} />
          <RecentBalls balls={RECENT_BALLS} />
        </div>

        <div className="pb-10">
          <h2 className="font-display font-bold mb-4" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-h2)" }}>
            Other Live Matches
          </h2>
          <div
            className="rounded-[var(--radius-lg)] overflow-hidden"
            style={{ border: "1px solid var(--color-border-light)" }}
          >
            {OTHER_LIVE_MATCHES.map((m, i) => (
              <OtherMatchRow key={i} m={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}