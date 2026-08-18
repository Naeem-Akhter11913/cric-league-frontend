import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { PLAYER_OF_MONTH, TABS, TEAM_COLORS, TOP_RUN_SCORERS } from "../data/player";
import Avatar from "../components/Avatar";
import PlayerBust from "../components/PlayerBust";
import PlayerOfMonth from "../components/PlayerOfMonth";
import LeaderboardTable from "../components/LeaderboardTable";
import AllPlayersTable from "../components/AllPlayersTable";
import PlayerHero from "../components/PlayerHero";









export default function Players() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All Role");
  const [team, setTeam] = useState("All Teams");
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const filteredPlayers = useMemo(() => {
    return TOP_RUN_SCORERS.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesRole = role === "All Role" || p.role === role;
      const matchesTeam = team === "All Teams" || p.team === team;
      return matchesQuery && matchesRole && matchesTeam;
    });
  }, [query, role, team]);

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "var(--color-bg-light-2)" }}>
      <PlayerHero query={query} setQuery={setQuery} role={role} setRole={setRole} team={team} setTeam={setTeam} />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between pt-10 pb-5">
          <h2 className="font-display font-bold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-h2)" }}>
            Top Performers
          </h2>
          <a href="#" className="font-body font-semibold" style={{ color: "var(--color-primary)", fontSize: "var(--fs-sm)" }}>
            View All
          </a>
        </div>

        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-[var(--radius-pill)] font-body font-semibold transition-colors"
              style={{
                fontSize: "var(--fs-xs)",
                backgroundColor: activeTab === tab ? "var(--color-primary)" : "transparent",
                color: activeTab === tab ? "#ffffff" : "var(--color-text-onLight-muted)",
                border: activeTab === tab ? "none" : "1px solid var(--color-border-light)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 pb-12">
          <LeaderboardTable players={TOP_RUN_SCORERS} />
          <PlayerOfMonth p={PLAYER_OF_MONTH} />
        </div>

        {/* All Players */}
        <div className="pb-6">
          <h2 className="font-display font-bold mb-4" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-h2)" }}>
            All Players
          </h2>
          <AllPlayersTable players={filteredPlayers} />
          {filteredPlayers.length === 0 && (
            <div className="text-center py-10 font-body" style={{ color: "var(--color-text-onLight-faint)" }}>
              No players match your search.
            </div>
          )}
        </div>
      </div>

      <div className="h-10" />
    </div>
  );
}