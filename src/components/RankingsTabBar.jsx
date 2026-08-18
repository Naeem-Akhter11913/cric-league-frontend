import { TABS } from "../data/ranking.utils";

export default function RankingsTabBar({ activeTab, setActiveTab }) {
  return (
    <div className="flex items-center gap-1 px-4 pt-4 pb-2">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="px-4 py-2 rounded-[var(--radius-sm)] font-body font-semibold transition-colors"
          style={{
            fontSize: "var(--fs-sm)",
            backgroundColor: activeTab === tab ? "var(--color-primary)" : "transparent",
            color: activeTab === tab ? "#ffffff" : "var(--color-text-onLight-muted)",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}