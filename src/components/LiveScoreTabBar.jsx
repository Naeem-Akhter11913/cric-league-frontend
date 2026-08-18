import { RefreshCw } from 'lucide-react';
import React from 'react'
import { TABS } from '../data/liveScore';

const LiveScoreTabBar = ({ activeTab, setActiveTab, onRefresh }) => {
  return (
    <div
      className="flex items-center justify-between px-2 rounded-t-[var(--radius-lg)]"
      style={{ backgroundColor: "var(--color-bg-light)", borderBottom: "1px solid var(--color-border-light)" }}
    >
      <div className="flex items-center gap-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative px-4 py-4 font-body font-semibold transition-colors"
            style={{
              fontSize: "var(--fs-sm)",
              color: activeTab === tab ? "var(--color-primary)" : "var(--color-text-onLight-muted)",
            }}
          >
            {tab}
            {activeTab === tab && (
              <span
                className="absolute left-3 right-3 -bottom-px h-[2px] rounded-full"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
            )}
          </button>
        ))}
      </div>
      <button
        onClick={onRefresh}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] font-body font-medium mr-1"
        style={{ color: "var(--color-text-onLight-muted)", fontSize: "var(--fs-xs)" }}
      >
        <RefreshCw size={13} /> Refresh
      </button>
    </div>
  );
}

export default LiveScoreTabBar