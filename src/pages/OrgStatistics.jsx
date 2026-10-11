import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, AreaChart, Area,
} from "recharts";
import {
  Gamepad2, PenLine, BarChart3, Award, Target, Gauge, Trophy, Flame, Palette, Download, ChevronDown, Users,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getStatisticsTable } from "../store/action/statistics.action";

/* ------------------------------ helpers ------------------------------ */

const TABS = ["Overview", "Batting", "Bowling", "Fielding", "Team", "Tournament"];

const TEAM_COLORS = ["#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#14B8A6", "#EF4444", "#64748B"];
const hash = (s = "") => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

function Avatar({ name = "", src }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";
  if (src) return <img src={src} alt={name} className="h-8 w-8 shrink-0 rounded-full object-cover" />;
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-[11px] font-semibold text-white">
      {initials}
    </div>
  );
}

function TeamBadge({ team }) {
  if (!team) return <span className="text-slate-400">–</span>;
  return (
    <div className="flex items-center gap-1.5 text-slate-500">
      <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: TEAM_COLORS[hash(team.name) % TEAM_COLORS.length] }} />
      {team.name}
    </div>
  );
}

function Select({ value, onChange, children, icon }) {
  return (
    <div className="relative">
      {icon && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500">{icon}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pr-9 text-sm font-medium text-slate-700 shadow-sm outline-none hover:bg-slate-50 focus:border-indigo-300 ${icon ? "pl-9" : "pl-4"}`}
      >
        {children}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

function DonutCard({ title, total, totalLabel, data }) {
  const sum = data.reduce((n, d) => n + d.value, 0);
  const shown = sum ? data.filter((d) => d.value > 0) : [{ name: "No data", value: 1, color: "#E5E7EB" }];
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-[15px] font-semibold text-slate-800">{title}</h3>
      <div className="flex items-center gap-4">
        <div className="relative h-[130px] w-[130px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={shown} dataKey="value" innerRadius={42} outerRadius={62} paddingAngle={sum ? 2 : 0} stroke="none">
                {shown.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              {sum > 0 && <Tooltip formatter={(v, n) => [v.toLocaleString(), n]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />}
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-slate-800">{total}</span>
            <span className="text-[11px] text-slate-400">{totalLabel}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2.5">
          {data.map((d) => (
            <div key={d.name} className="flex items-center justify-between gap-2 text-[13px]">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
              </div>
              <div className="whitespace-nowrap font-medium text-slate-700">
                {d.value.toLocaleString()} <span className="text-slate-400">({d.pct})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------- leaderboard tables --------------------------- */

const num = (v, d = 2) => (v == null ? "–" : Number(v).toFixed(d));

const BAT_COLS = [
  { h: "Matches", v: (r) => r.matches, short: true },
  { h: "Inns", v: (r) => r.innings },
  { h: "Runs", v: (r) => r.runs, bold: true, short: true },
  { h: "HS", v: (r) => r.highest },
  { h: "Average", v: (r) => num(r.average), short: true },
  { h: "Strike Rate", v: (r) => num(r.strikeRate, 1), short: true },
  { h: "4s", v: (r) => r.fours },
  { h: "6s", v: (r) => r.sixes },
  { h: "100s", v: (r) => r.hundreds, short: true },
  { h: "50s", v: (r) => r.fifties, short: true },
];
const BOWL_COLS = [
  { h: "Matches", v: (r) => r.matches, short: true },
  { h: "Overs", v: (r) => r.overs },
  { h: "Runs", v: (r) => r.runs },
  { h: "Wickets", v: (r) => r.wickets, bold: true, short: true },
  { h: "Economy", v: (r) => num(r.economy), short: true },
  { h: "Average", v: (r) => num(r.average) },
  { h: "Best", v: (r) => r.best, short: true },
];
const FIELD_COLS = [
  { h: "Matches", v: (r) => r.matches },
  { h: "Catches", v: (r) => r.catches },
  { h: "Run outs", v: (r) => r.runOuts },
  { h: "Stumpings", v: (r) => r.stumpings },
  { h: "Total", v: (r) => r.total, bold: true },
];

function LeaderTable({ title, rows, cols, limit, onViewAll, emptyText }) {
  const shownCols = limit ? cols.filter((c) => c.short) : cols;
  const list = limit ? rows.slice(0, limit) : rows;
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-slate-800">{title}</h3>
        {onViewAll && rows.length > (limit || 0) && (
          <button onClick={onViewAll} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="text-xs text-slate-400">
              <th className="pb-3 font-medium">#</th>
              <th className="pb-3 font-medium">Player</th>
              <th className="pb-3 font-medium">Team</th>
              {shownCols.map((c) => <th key={c.h} className="pb-3 text-right font-medium">{c.h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {list.map((r, i) => (
              <tr key={r.id} className="text-slate-700">
                <td className="py-3 text-slate-400">{i + 1}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2 font-medium text-slate-800">
                    <Avatar name={r.name} src={r.avatarUrl} />
                    {r.name}
                  </div>
                </td>
                <td className="py-3"><TeamBadge team={r.team} /></td>
                {shownCols.map((c) => (
                  <td key={c.h} className={`py-3 text-right ${c.bold ? "font-semibold text-slate-800" : ""}`}>{c.v(r)}</td>
                ))}
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={3 + shownCols.length} className="py-8 text-center text-sm text-slate-400">{emptyText}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------- page -------------------------------- */

const RECORDS = [
  { key: "highestTeamTotal", icon: PenLine, label: "Highest Team Total", bg: "bg-violet-50", fg: "text-violet-500" },
  { key: "lowestTeamTotal", icon: PenLine, label: "Lowest Team Total", bg: "bg-emerald-50", fg: "text-emerald-500" },
  { key: "highestScore", icon: Award, label: "Highest Individual Score", bg: "bg-orange-50", fg: "text-orange-500" },
  { key: "bestBowling", icon: Target, label: "Best Bowling (Innings)", bg: "bg-sky-50", fg: "text-sky-500" },
  { key: "mostSixes", icon: Flame, label: "Most 6s in an Innings", bg: "bg-rose-50", fg: "text-rose-500" },
  { key: "mostCatches", icon: Palette, label: "Most Catches", bg: "bg-indigo-50", fg: "text-indigo-500" },
];

export default function OrgStatistics() {
  const {
    data: statisticsData,
    loading: statisticsLoading,
    error: statisticsError,
  } = useAppSelector((state) => state.statistics);
  const dispatch = useAppDispatch();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tournamentId, setTournamentId] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");
  console.log("statisticsDatastatisticsDatastatisticsDatastatisticsData", statisticsData)

  
  useEffect(() => {
    setData(statisticsData);
  }, [statisticsData]);

  useEffect(() => {
    setError(statisticsError || "");
  }, [statisticsError]);

  useEffect(() => {
    setLoading(statisticsLoading);
  }, [statisticsLoading]);

  const load = useCallback(async (silent = false) => {
    try {
      console.log("Hhh")
      dispatch(getStatisticsTable({ tournamentId: tournamentId || undefined })).unwrap();
    } catch (err) {
      console.log(err)
      const msg =
        typeof err === "string"
          ? err
          : err?.message || "Could not load the points table";

      if (silent) {
        toast.error(msg);
      }
    }
  }, [dispatch, tournamentId]);

  useEffect(() => {
    load();
  }, [load]);

  const byTeam = (rows) => (teamFilter ? rows.filter((r) => r.team?._id === teamFilter) : rows);
  const leaders = useMemo(
    () => ({
      batting: byTeam(data?.leaders.batting || []),
      bowling: byTeam(data?.leaders.bowling || []),
      fielding: byTeam(data?.leaders.fielding || []),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, teamFilter]
  );

  const shell = (body) => (
    <div className="h-screen overflow-y-auto bg-[#F7F7F9] p-6 no-scrollbar lg:p-8">{body}</div>
  );

  if (error && !data) return shell(<div className="rounded-2xl border border-slate-100 bg-white p-10 text-center text-sm text-rose-500">{error}</div>);
  if (!data) return shell(<div className="rounded-2xl border border-slate-100 bg-white p-10 text-center text-sm text-slate-400">Loading statistics...</div>);
  if (!data.tournament) {
    return shell(
      <>
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Statistics</h1>
        <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center text-sm text-slate-400">
          Create a tournament and complete a match to see statistics here.
        </div>
      </>
    );
  }

  const { records: rec, cards, summary, teams } = data;
  const statCards = [
    { icon: Gamepad2, label: "Total Matches", value: cards.matches, sub: "Completed", bg: "bg-indigo-50", fg: "text-indigo-600" },
    { icon: PenLine, label: "Total Runs", value: cards.runs.toLocaleString(), sub: "All Matches", bg: "bg-emerald-50", fg: "text-emerald-600" },
    { icon: BarChart3, label: "Total Wickets", value: cards.wickets.toLocaleString(), sub: "All Matches", bg: "bg-orange-50", fg: "text-orange-500" },
    { icon: PenLine, label: "Highest Team Total", value: rec.highestTeamTotal?.value ?? "–", sub: rec.highestTeamTotal?.sub ?? "No data yet", bg: "bg-sky-50", fg: "text-sky-600" },
    { icon: Target, label: "Highest Individual Score", value: rec.highestScore?.value ?? "–", sub: rec.highestScore?.sub ?? "No data yet", bg: "bg-rose-50", fg: "text-rose-500" },
    { icon: Gauge, label: "Best Bowling (Innings)", value: rec.bestBowling?.value ?? "–", sub: rec.bestBowling?.sub ?? "No data yet", bg: "bg-violet-50", fg: "text-violet-600" },
  ];

  const exportCsv = () => {
    const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const section = (title, headers, rows) => [title, headers.join(","), ...rows.map((r) => r.map(q).join(",")), ""];
    const lines = [
      ...section(`${data.tournament.name} - Statistics report`, ["Matches", "Runs", "Wickets"], [[cards.matches, cards.runs, cards.wickets]]),
      ...section("Batting", ["Player", "Team", "Matches", "Inns", "Runs", "HS", "Average", "Strike rate", "4s", "6s", "100s", "50s"],
        data.leaders.batting.map((r) => [r.name, r.team?.name, r.matches, r.innings, r.runs, r.highest, num(r.average), num(r.strikeRate, 1), r.fours, r.sixes, r.hundreds, r.fifties])),
      ...section("Bowling", ["Player", "Team", "Matches", "Overs", "Runs", "Wickets", "Economy", "Average", "Best"],
        data.leaders.bowling.map((r) => [r.name, r.team?.name, r.matches, r.overs, r.runs, r.wickets, num(r.economy), num(r.average), r.best])),
      ...section("Fielding", ["Player", "Team", "Catches", "Run outs", "Stumpings", "Total"],
        data.leaders.fielding.map((r) => [r.name, r.team?.name, r.catches, r.runOuts, r.stumpings, r.total])),
      ...section("Teams", ["Team", "Matches", "Won", "Lost", "Runs scored", "Wickets taken", "Highest", "Avg score", "NRR"],
        teams.map((t) => [t.team.name, t.matches, t.won, t.lost, t.runsScored, t.wicketsTaken, t.highest, t.avgScore, t.nrr.toFixed(3)])),
      ...section("Records", ["Record", "Value", "Player / Team", "Against"],
        RECORDS.map((r) => [r.label, rec[r.key]?.value, rec[r.key]?.sub, rec[r.key]?.sub2])),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.tournament.name} - statistics.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const noData = !data.hasData && (
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
      No completed matches in this tournament yet. These numbers fill in as soon as the first match is finished.
    </div>
  );

  return shell(
    <>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Statistics</h1>
          <p className="mt-1 text-sm text-slate-500">In-depth insights and performance analytics</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={data.tournament._id} onChange={setTournamentId} icon={<Trophy size={16} />}>
            {data.tournaments.map((t) => <option key={t._id} value={t._id}>{t.name} ({t.year})</option>)}
          </Select>
          <Select value={teamFilter} onChange={setTeamFilter} icon={<Users size={16} />}>
            <option value="">All teams</option>
            {teams.map((t) => <option key={t.team._id} value={t.team._id}>{t.team.name}</option>)}
          </Select>
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {noData}

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        {statCards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}>
              <c.icon size={18} className={c.fg} />
            </div>
            <p className="text-xs text-slate-400">{c.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{c.value}</p>
            <p className="truncate text-xs text-slate-400">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-6 overflow-x-auto border-b border-slate-200 no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative -mb-px whitespace-nowrap pb-3 text-sm font-medium transition-colors ${activeTab === tab ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
          >
            {tab}
            {activeTab === tab && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-indigo-600" />}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "Overview" && (
        <>
          <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <LeaderTable title="Top Batting Performers" rows={leaders.batting} cols={BAT_COLS} limit={5}
              onViewAll={() => setActiveTab("Batting")} emptyText="No batting data yet." />
            <LeaderTable title="Top Bowling Performers" rows={leaders.bowling} cols={BOWL_COLS} limit={5}
              onViewAll={() => setActiveTab("Bowling")} emptyText="No bowling data yet." />
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <DonutCard title="Runs Summary" total={cards.runs.toLocaleString()} totalLabel="Total Runs" data={data.runsSummary} />
            <DonutCard title="Wickets Summary" total={cards.wickets.toLocaleString()} totalLabel="Total Wickets" data={data.wicketsSummary} />

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h3 className="mb-2 text-[15px] font-semibold text-slate-800">Run Rate Trend</h3>
              {data.trend.length === 0 ? (
                <p className="flex h-[170px] items-center justify-center text-sm text-slate-400">Appears after the first match.</p>
              ) : (
                <div className="h-[170px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="rrGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366F1" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="match" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false}
                        label={{ value: "Match no.", position: "insideBottom", offset: -2, fontSize: 11, fill: "#94A3B8" }} />
                      <YAxis domain={["auto", "auto"]} tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v) => [v, "Runs per over"]} labelFormatter={(l) => `Match ${l}`} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                      <Area type="monotone" dataKey="rate" stroke="#6366F1" strokeWidth={2} fill="url(#rrGradient)"
                        dot={{ r: 3, fill: "#6366F1", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <DonutCard title="Match Outcomes" total={data.outcomeTotal} totalLabel="Matches" data={data.outcomes} />
          </div>
        </>
      )}

      {activeTab === "Batting" && <LeaderTable title="Batting Leaderboard" rows={leaders.batting} cols={BAT_COLS} emptyText="No batting data yet." />}
      {activeTab === "Bowling" && <LeaderTable title="Bowling Leaderboard" rows={leaders.bowling} cols={BOWL_COLS} emptyText="No bowling data yet." />}
      {activeTab === "Fielding" && <LeaderTable title="Fielding Leaderboard" rows={leaders.fielding} cols={FIELD_COLS} emptyText="No catches, run outs or stumpings yet." />}

      {activeTab === "Team" && (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-[15px] font-semibold text-slate-800">Team Statistics</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="text-xs text-slate-400">
                  <th className="pb-3 font-medium">#</th>
                  <th className="pb-3 font-medium">Team</th>
                  {["Matches", "Won", "Lost", "Runs scored", "Wickets taken", "Highest", "Avg score", "NRR"].map((h) => (
                    <th key={h} className="pb-3 text-right font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {teams.map((t, i) => (
                  <tr key={t.team._id} className={`text-slate-700 ${teamFilter === t.team._id ? "bg-indigo-50/50" : ""}`}>
                    <td className="py-3 text-slate-400">{i + 1}</td>
                    <td className="py-3 font-medium text-slate-800">{t.team.name}</td>
                    <td className="py-3 text-right">{t.matches}</td>
                    <td className="py-3 text-right">{t.won}</td>
                    <td className="py-3 text-right">{t.lost}</td>
                    <td className="py-3 text-right font-semibold text-slate-800">{t.runsScored}</td>
                    <td className="py-3 text-right">{t.wicketsTaken}</td>
                    <td className="py-3 text-right">{t.highest}</td>
                    <td className="py-3 text-right">{t.avgScore}</td>
                    <td className={`py-3 text-right ${t.nrr > 0 ? "text-green-600" : t.nrr < 0 ? "text-red-500" : ""}`}>
                      {t.nrr > 0 ? "+" : ""}{t.nrr.toFixed(3)}
                    </td>
                  </tr>
                ))}
                {teams.length === 0 && <tr><td colSpan={10} className="py-8 text-center text-sm text-slate-400">No teams in this tournament yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Records are shown on Overview and on the Tournament tab */}
      {(activeTab === "Overview" || activeTab === "Tournament") && (
        <div className={`rounded-2xl border border-slate-100 bg-white p-5 shadow-sm ${activeTab === "Tournament" ? "mb-6" : ""}`}>
          <h3 className="mb-4 text-[15px] font-semibold text-slate-800">Tournament Records</h3>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-6">
            {RECORDS.map((r) => (
              <div key={r.key} className="flex flex-col items-start gap-2">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${r.bg}`}>
                  <r.icon size={18} className={r.fg} />
                </div>
                <p className="text-xs text-slate-400">{r.label}</p>
                <p className="text-lg font-bold text-slate-900">{rec[r.key]?.value ?? "–"}</p>
                <p className="text-xs text-slate-500">{rec[r.key]?.sub ?? ""}</p>
                <p className="text-xs text-slate-400">{rec[r.key]?.sub2 ?? ""}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Tournament" && (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-[15px] font-semibold text-slate-800">Tournament Summary</h3>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-6">
            {[
              ["Avg 1st innings", summary.avgFirstInnings],
              ["Avg 2nd innings", summary.avgSecondInnings],
              ["Runs per match", summary.avgRunsPerMatch],
              ["Fours", summary.fours],
              ["Sixes", summary.sixes],
              ["Extras", summary.extras],
            ].map(([label, v]) => (
              <div key={label}>
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-1 text-xl font-bold text-slate-900">{v}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}