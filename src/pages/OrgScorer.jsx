import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Users,
  CheckCircle2,
  CalendarCheck2,
  Star,
  Trophy,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Phone,
  Mail,
  Plus,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Static data — swap these out for API data as needed                */
/* ------------------------------------------------------------------ */

const STAT_CARDS = [
  { icon: Users, label: "Total Scorers", value: "24", sub: "Registered", bg: "bg-violet-50", fg: "text-violet-500" },
  { icon: CheckCircle2, label: "Active Scorers", value: "18", sub: "Currently Active", bg: "bg-emerald-50", fg: "text-emerald-500" },
  { icon: CalendarCheck2, label: "Matches Scored", value: "156", sub: "This Season", bg: "bg-sky-50", fg: "text-sky-500" },
  { icon: Star, label: "Top Accuracy", value: "99.2%", sub: "Imran Ali", bg: "bg-orange-50", fg: "text-orange-500" },
  { icon: Trophy, label: "Best Performance", value: "245", sub: "Arif Malik", bg: "bg-pink-50", fg: "text-pink-500" },
];

const RATING_STYLES = {
  Excellent: "text-emerald-600",
  Good: "text-sky-600",
  Average: "text-orange-500",
  Poor: "text-rose-600",
};

const SCORERS = [
  { name: "Naeem Akhter", badge: "Chief Scorer", city: "Lucknow, UP", phone: "+91 98765 43210", email: "naeem@example.com", exp: "3+ Years", matches: 32, accuracy: 98.6, rating: "Excellent", status: "Active" },
  { name: "Imran Ali", badge: null, city: "Kanpur, UP", phone: "+91 87654 32109", email: "imran@example.com", exp: "4+ Years", matches: 28, accuracy: 99.2, rating: "Excellent", status: "Active" },
  { name: "Arif Malik", badge: null, city: "Noida, UP", phone: "+91 76543 21098", email: "arif@example.com", exp: "2+ Years", matches: 26, accuracy: 97.8, rating: "Excellent", status: "Active" },
  { name: "Asif Khan", badge: null, city: "Varanasi, UP", phone: "+91 65432 10987", email: "asif@example.com", exp: "2+ Years", matches: 18, accuracy: 96.4, rating: "Good", status: "Active" },
  { name: "Deepak Singh", badge: null, city: "Agra, UP", phone: "+91 54321 09876", email: "deepak@example.com", exp: "1+ Year", matches: 14, accuracy: 95.1, rating: "Good", status: "Inactive" },
  { name: "Rakesh Verma", badge: null, city: "Ghaziabad, UP", phone: "+91 43210 98765", email: "rakesh@example.com", exp: "1+ Year", matches: 12, accuracy: 94.3, rating: "Good", status: "Active" },
  { name: "Salman Khan", badge: null, city: "Meerut, UP", phone: "+91 32109 87654", email: "salman@example.com", exp: "2+ Years", matches: 10, accuracy: 93.7, rating: "Good", status: "Active" },
  { name: "Vivek Tiwari", badge: null, city: "Aligarh, UP", phone: "+91 21098 76543", email: "vivek@example.com", exp: "1+ Year", matches: 8, accuracy: 92.5, rating: "Average", status: "Inactive" },
];

const PERFORMANCE_BREAKDOWN = [
  { name: "Excellent (90%+)", value: 68, pct: "43.6%", color: "#22C55E" },
  { name: "Good (75-90%)", value: 62, pct: "39.7%", color: "#3B82F6" },
  { name: "Average (50-75%)", value: 18, pct: "11.5%", color: "#F59E0B" },
  { name: "Poor (<50%)", value: 8, pct: "5.1%", color: "#EF4444" },
];

const RECENT_ACTIVITY = [
  { name: "Imran Ali", action: "scored match", detail: "Royal Warriors vs Super Kings", time: "2h ago" },
  { name: "Naeem Akhter", action: "scored match", detail: "Thunder Bolts vs Green Warriors", time: "5h ago" },
  { name: "Arif Malik", action: "scored match", detail: "Blue Tigers vs Strikers Club", time: "1d ago" },
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                      */
/* ------------------------------------------------------------------ */

function Avatar({ name, size = 40, ring = false }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 font-semibold text-white ${ring ? "ring-4 ring-indigo-100" : ""}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}

function StatusPill({ status }) {
  const active = status === "Active";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
      }`}
    >
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export default function OrgScorer() {
  const [search, setSearch] = useState("");

  return (
    <div className="h-screen bg-[#F7F7F9] overflow-y-auto no-scrollbar p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Scorers</h1>
          <p className="mt-1 text-sm text-slate-500">Manage scorers and their performance</p>
        </div>
        <button className="flex items-center gap-2 self-start rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 lg:self-auto">
          <Plus size={16} />
          Add New Scorer
        </button>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
        {STAT_CARDS.map((c) => (
          <div key={c.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}>
              <c.icon size={18} className={c.fg} />
            </div>
            <p className="text-xs text-slate-400">{c.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{c.value}</p>
            <p className="text-xs text-slate-400">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
        {/* Left column */}
        <div className="min-w-0">
          {/* Filter bar */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search scorers..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-300"
              />
            </div>

            {["All Status", "All Tournaments", "All Cities"].map((label) => (
              <button
                key={label}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50"
              >
                {label}
                <ChevronDown size={14} className="text-slate-400" />
              </button>
            ))}

            <button className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-100">
              <SlidersHorizontal size={14} />
              More Filters
            </button>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-slate-400">Sort By</span>
              <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50">
                Name (A-Z)
                <ChevronDown size={14} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Scorers table */}
          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-400">
                    <th className="px-5 py-3 font-medium">Scorer</th>
                    <th className="px-5 py-3 font-medium">Contact</th>
                    <th className="px-5 py-3 font-medium">Experience</th>
                    <th className="px-5 py-3 font-medium">Matches Scored</th>
                    <th className="px-5 py-3 font-medium">Accuracy</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {SCORERS.map((s) => (
                    <tr key={s.name} className="text-slate-700 hover:bg-slate-50/60">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={s.name} size={38} />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-800">{s.name}</span>
                              {s.badge && (
                                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-600">
                                  {s.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-400">{s.city}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Phone size={12} className="text-slate-400" />
                          {s.phone}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                          <Mail size={12} className="text-slate-400" />
                          {s.email}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{s.exp}</td>
                      <td className="px-5 py-4 font-semibold text-slate-800">{s.matches}</td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800">{s.accuracy.toFixed(1)}%</div>
                        <div className={`text-xs font-medium ${RATING_STYLES[s.rating]}`}>{s.rating}</div>
                      </td>
                      <td className="px-5 py-4">
                        <StatusPill status={s.status} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-slate-500">Showing 1 to 8 of 24 scorers</span>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm hover:bg-slate-50">
                  10 per page
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((p) => (
                    <button
                      key={p}
                      className={`h-8 w-8 rounded-lg text-sm font-medium ${
                        p === 1
                          ? "bg-indigo-600 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Top scorer card */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-b from-indigo-50/60 to-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-slate-800">Top Scorer This Season</h3>
              <Trophy size={18} className="text-indigo-300" />
            </div>
            <div className="flex items-center gap-3">
              <Avatar name="Imran Ali" size={56} ring />
              <div>
                <p className="font-semibold text-slate-800">Imran Ali</p>
                <p className="text-xs text-slate-400">Kanpur, UP</p>
                <span className="mt-1 inline-block rounded-full bg-indigo-600 px-2.5 py-0.5 text-[11px] font-medium text-white">
                  Top Performer
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-indigo-100 pt-4 text-center">
              <div>
                <p className="text-lg font-bold text-slate-900">28</p>
                <p className="text-[11px] text-slate-400">Matches</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">99.2%</p>
                <p className="text-[11px] text-slate-400">Accuracy</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">245</p>
                <p className="text-[11px] text-slate-400">Best Score</p>
              </div>
            </div>
          </div>

          {/* Performance overview donut */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-[15px] font-semibold text-slate-800">Scorer Performance Overview</h3>
            <div className="flex items-center gap-4">
              <div className="relative h-[130px] w-[130px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={PERFORMANCE_BREAKDOWN}
                      dataKey="value"
                      innerRadius={42}
                      outerRadius={62}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {PERFORMANCE_BREAKDOWN.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [value, name]}
                      contentStyle={{ borderRadius: 8, fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-slate-800">156</span>
                  <span className="text-center text-[10px] leading-tight text-slate-400">
                    Matches
                    <br />
                    Scored
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2.5">
                {PERFORMANCE_BREAKDOWN.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      {d.name}
                    </div>
                    <div className="font-medium text-slate-700">
                      {d.value} <span className="text-slate-400">({d.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-[15px] font-semibold text-slate-800">Recent Activity</h3>
            <div className="flex flex-col gap-4">
              {RECENT_ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Avatar name={a.name} size={34} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold text-slate-800">{a.name}</span> {a.action}
                    </p>
                    <p className="truncate text-xs text-slate-400">{a.detail}</p>
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-400">
                    {a.time}
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}