import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import {
  Gamepad2,
  PenLine,
  BarChart3,
  Award,
  Target,
  Gauge,
  Trophy,
  Flame,
  Camera,
  Palette,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Static data — swap these out for API data as needed                */
/* ------------------------------------------------------------------ */

const STAT_CARDS = [
  {
    icon: Gamepad2,
    label: "Total Matches",
    value: "28",
    sub: "This Season",
    bg: "bg-indigo-50",
    fg: "text-indigo-600",
  },
  {
    icon: PenLine,
    label: "Total Runs",
    value: "7,842",
    sub: "All Matches",
    bg: "bg-emerald-50",
    fg: "text-emerald-600",
  },
  {
    icon: BarChart3,
    label: "Total Wickets",
    value: "356",
    sub: "All Matches",
    bg: "bg-orange-50",
    fg: "text-orange-500",
  },
  {
    icon: PenLine,
    label: "Highest Team Total",
    value: "228/4",
    sub: "Royal Warriors",
    bg: "bg-sky-50",
    fg: "text-sky-600",
  },
  {
    icon: Target,
    label: "Highest Individual Score",
    value: "156*",
    sub: "Naeem Akhter",
    bg: "bg-rose-50",
    fg: "text-rose-500",
  },
  {
    icon: Gauge,
    label: "Best Bowling (Innings)",
    value: "6/18",
    sub: "Imran Ali",
    bg: "bg-violet-50",
    fg: "text-violet-600",
  },
];

const TABS = ["Overview", "Batting", "Bowling", "Fielding", "Team", "Tournament"];

const TOP_BATTERS = [
  { player: "Naeem Akhter", team: "Royal Warriors", teamColor: "bg-orange-400", matches: 7, runs: 562, avg: 93.67, sr: 167.7, hundreds: 2, fifties: 3 },
  { player: "Imran Ali", team: "Super Kings", teamColor: "bg-amber-500", matches: 7, runs: 487, avg: 81.17, sr: 154.2, hundreds: 1, fifties: 4 },
  { player: "Arif Malik", team: "Green Warriors", teamColor: "bg-emerald-500", matches: 7, runs: 342, avg: 68.40, sr: 128.3, hundreds: 0, fifties: 3 },
  { player: "Asif Khan", team: "Thunder Bolts", teamColor: "bg-slate-500", matches: 7, runs: 321, avg: 53.50, sr: 142.6, hundreds: 0, fifties: 2 },
  { player: "Sameer Ansari", team: "Blue Tigers", teamColor: "bg-blue-500", matches: 7, runs: 298, avg: 49.67, sr: 121.6, hundreds: 0, fifties: 2 },
];

const TOP_BOWLERS = [
  { player: "Imran Ali", team: "Super Kings", teamColor: "bg-amber-500", matches: 7, wickets: 18, economy: 8.00, best: "6/18" },
  { player: "Arjun Verma", team: "Thunder Bolts", teamColor: "bg-slate-500", matches: 7, wickets: 16, economy: 7.33, best: "4/22" },
  { player: "Rakesh Singh", team: "Royal Warriors", teamColor: "bg-orange-400", matches: 7, wickets: 14, economy: 7.91, best: "3/19" },
  { player: "Deepak Chahar", team: "Green Warriors", teamColor: "bg-emerald-500", matches: 7, wickets: 12, economy: 6.85, best: "3/14" },
  { player: "Salman Khan", team: "Strikers Club", teamColor: "bg-fuchsia-500", matches: 7, wickets: 11, economy: 8.12, best: "3/21" },
];

const RUNS_SUMMARY = [
  { name: "4s", value: 6123, pct: "78.1%", color: "#6366F1" },
  { name: "6s", value: 1328, pct: "16.9%", color: "#60A5FA" },
  { name: "1s & 2s", value: 391, pct: "5.0%", color: "#FBBF24" },
];

const WICKETS_SUMMARY = [
  { name: "Bowled", value: 146, pct: "41.0%", color: "#6366F1" },
  { name: "Caught", value: 132, pct: "37.1%", color: "#60A5FA" },
  { name: "LBW", value: 48, pct: "13.5%", color: "#FBBF24" },
  { name: "Others", value: 30, pct: "8.4%", color: "#34D399" },
];

const MATCH_OUTCOMES = [
  { name: "Won", value: 14, pct: "50%", color: "#4F46E5" },
  { name: "Lost", value: 10, pct: "35.7%", color: "#E11D48" },
  { name: "No Result", value: 4, pct: "14.3%", color: "#CBD5E1" },
];

const RUN_RATE_TREND = [
  { match: 1, rate: 6.2 }, { match: 3, rate: 7.8 }, { match: 5, rate: 9.5 },
  { match: 7, rate: 6.8 }, { match: 9, rate: 11.2 }, { match: 11, rate: 8.4 },
  { match: 13, rate: 9.9 }, { match: 15, rate: 7.1 }, { match: 17, rate: 10.5 },
  { match: 19, rate: 8.9 }, { match: 21, rate: 6.5 }, { match: 23, rate: 9.2 },
  { match: 25, rate: 7.6 }, { match: 27, rate: 8.9 }, { match: 28, rate: 8.26 },
];

const TOURNAMENT_RECORDS = [
  { icon: PenLine, label: "Highest Team Total", value: "228/4", sub: "Royal Warriors", sub2: "vs Super Kings", bg: "bg-violet-50", fg: "text-violet-500" },
  { icon: PenLine, label: "Lowest Team Total", value: "78", sub: "Phoenix Riders", sub2: "vs Blue Tigers", bg: "bg-emerald-50", fg: "text-emerald-500" },
  { icon: Award, label: "Highest Individual Score", value: "156*", sub: "Naeem Akhter", sub2: "vs Super Kings", bg: "bg-orange-50", fg: "text-orange-500" },
  { icon: Target, label: "Best Bowling (Innings)", value: "6/18", sub: "Imran Ali", sub2: "vs Green Warriors", bg: "bg-sky-50", fg: "text-sky-500" },
  { icon: Flame, label: "Most 6s in an Innings", value: "8", sub: "Arif Malik", sub2: "vs Thunder Bolts", bg: "bg-rose-50", fg: "text-rose-500" },
  { icon: Palette, label: "Most Catches", value: "11", sub: "Arif Malik", sub2: "(Green Warriors)", bg: "bg-indigo-50", fg: "text-indigo-500" },
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                      */
/* ------------------------------------------------------------------ */

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-[11px] font-semibold text-white">
      {initials}
    </div>
  );
}

function TeamBadge({ color }) {
  return <span className={`inline-block h-2.5 w-2.5 rounded-sm ${color}`} />;
}

function DonutCard({ title, total, totalLabel, data }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-[15px] font-semibold text-slate-800">{title}</h3>
      <div className="flex items-center gap-4">
        <div className="relative h-[130px] w-[130px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={42}
                outerRadius={62}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [value.toLocaleString(), name]}
                contentStyle={{ borderRadius: 8, fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-slate-800">{total}</span>
            <span className="text-[11px] text-slate-400">{totalLabel}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2.5">
          {data.map((d) => (
            <div key={d.name} className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
              </div>
              <div className="font-medium text-slate-700">
                {d.value.toLocaleString()}{" "}
                <span className="text-slate-400">({d.pct})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export default function OrgStatistics() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="bg-[#F7F7F9] p-6 lg:p-8 h-screen overflow-y-auto no-scrollbar">
      {/* Page header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Statistics</h1>
          <p className="mt-1 text-sm text-slate-500">
            In-depth insights and performance analytics
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <Trophy size={16} className="text-indigo-500" />
            Naeem Premier League 2026
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-slate-400">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-400">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            This Season
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-slate-400">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        {STAT_CARDS.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}>
              <c.icon size={18} className={c.fg} />
            </div>
            <p className="text-xs text-slate-400">{c.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{c.value}</p>
            <p className="text-xs text-slate-400">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-6 border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative -mb-px whitespace-nowrap pb-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "text-indigo-600"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-indigo-600" />
            )}
          </button>
        ))}
      </div>

      {/* Top performers tables */}
      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Batting */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[15px] font-semibold text-slate-800">Top Batting Performers</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="text-xs text-slate-400">
                  <th className="pb-3 font-medium">#</th>
                  <th className="pb-3 font-medium">Player</th>
                  <th className="pb-3 font-medium">Team</th>
                  <th className="pb-3 font-medium text-right">Matches</th>
                  <th className="pb-3 font-medium text-right">Runs</th>
                  <th className="pb-3 font-medium text-right">Average</th>
                  <th className="pb-3 font-medium text-right">Strike Rate</th>
                  <th className="pb-3 font-medium text-right">100s</th>
                  <th className="pb-3 font-medium text-right">50s</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {TOP_BATTERS.map((row, i) => (
                  <tr key={row.player} className="text-slate-700">
                    <td className="py-3 text-slate-400">{i + 1}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2 font-medium text-slate-800">
                        <Avatar name={row.player} />
                        {row.player}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <TeamBadge color={row.teamColor} />
                        {row.team}
                      </div>
                    </td>
                    <td className="py-3 text-right">{row.matches}</td>
                    <td className="py-3 text-right font-semibold text-slate-800">{row.runs}</td>
                    <td className="py-3 text-right">{row.avg.toFixed(2)}</td>
                    <td className="py-3 text-right">{row.sr.toFixed(1)}</td>
                    <td className="py-3 text-right">{row.hundreds}</td>
                    <td className="py-3 text-right">{row.fifties}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bowling */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[15px] font-semibold text-slate-800">Top Bowling Performers</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="text-xs text-slate-400">
                  <th className="pb-3 font-medium">#</th>
                  <th className="pb-3 font-medium">Player</th>
                  <th className="pb-3 font-medium">Team</th>
                  <th className="pb-3 font-medium text-right">Matches</th>
                  <th className="pb-3 font-medium text-right">Wickets</th>
                  <th className="pb-3 font-medium text-right">Economy</th>
                  <th className="pb-3 font-medium text-right">Best</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {TOP_BOWLERS.map((row, i) => (
                  <tr key={row.player} className="text-slate-700">
                    <td className="py-3 text-slate-400">{i + 1}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2 font-medium text-slate-800">
                        <Avatar name={row.player} />
                        {row.player}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <TeamBadge color={row.teamColor} />
                        {row.team}
                      </div>
                    </td>
                    <td className="py-3 text-right">{row.matches}</td>
                    <td className="py-3 text-right font-semibold text-slate-800">{row.wickets}</td>
                    <td className="py-3 text-right">{row.economy.toFixed(2)}</td>
                    <td className="py-3 text-right">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Summary donuts + run rate trend */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DonutCard title="Runs Summary" total="7,842" totalLabel="Total Runs" data={RUNS_SUMMARY} />
        <DonutCard title="Wickets Summary" total="356" totalLabel="Total Wickets" data={WICKETS_SUMMARY} />

        {/* Run rate trend */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="mb-2 text-[15px] font-semibold text-slate-800">Run Rate Trend (This Season)</h3>
          <div className="h-[170px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RUN_RATE_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="rrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="match"
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: "Matches", position: "insideBottom", offset: -2, fontSize: 11, fill: "#94A3B8" }}
                />
                <YAxis
                  domain={[4, 14]}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fill="url(#rrGradient)"
                  dot={{ r: 3, fill: "#6366F1", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <DonutCard title="Match Outcomes" total="28" totalLabel="Matches" data={MATCH_OUTCOMES} />
      </div>

      {/* Tournament records */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-[15px] font-semibold text-slate-800">Tournament Records</h3>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-6">
          {TOURNAMENT_RECORDS.map((r) => (
            <div key={r.label} className="flex flex-col items-start gap-2">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${r.bg}`}>
                <r.icon size={18} className={r.fg} />
              </div>
              <p className="text-xs text-slate-400">{r.label}</p>
              <p className="text-lg font-bold text-slate-900">{r.value}</p>
              <p className="text-xs text-slate-500">{r.sub}</p>
              <p className="text-xs text-slate-400">{r.sub2}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}