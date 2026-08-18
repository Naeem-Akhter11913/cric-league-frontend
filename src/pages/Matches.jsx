import React, { useState } from 'react'
import {
    Trophy,
    Radio,
    CalendarDays,
    CheckCircle2,
    XCircle,
    Plus,
    Play,
    MapPin,
    FileText,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'

const teamColors = {
    "Royal Warriors": { bg: "#F2B84B", fg: "#7A4B00", label: "RW" },
    "Super Kings": { bg: "#1E3A8A", fg: "#FFFFFF", label: "SK" },
    "Thunder Bolts": { bg: "#2563EB", fg: "#FFFFFF", label: "TB" },
    "Green Warriors": { bg: "#059669", fg: "#FFFFFF", label: "GW" },
    "Blue Tigers": { bg: "#4338CA", fg: "#FFFFFF", label: "BT" },
    "Strikers Club": { bg: "#16A34A", fg: "#FFFFFF", label: "SC" },
};

const TeamCrest = ({ name, size = 24 }) => {
    const c = teamColors[name] || { bg: "#9CA3AF", fg: "#FFFFFF", label: name.slice(0, 2).toUpperCase() };
    return (
        <div
            className="rounded-full flex items-center justify-center font-bold shrink-0"
            style={{ width: size, height: size, background: c.bg, color: c.fg, fontSize: size * 0.34 }}
        >
            {c.label}
        </div>
    );
};

const tabs = [
    { label: "All Matches", icon: "grid" },
    { label: "Live", icon: "dot", dotColor: "#DC2626" },
    { label: "Upcoming", icon: CalendarDays },
    { label: "Completed", icon: CheckCircle2 },
    { label: "Cancelled", icon: XCircle },
];

const stats = [
    { label: "Total Matches", value: "64", sub: "This Season", icon: Trophy, bg: "#EEF2FF", fg: "#4F46E5" },
    { label: "Live Matches", value: "3", sub: "Ongoing Now", icon: Radio, bg: "#FDF2F8", fg: "#DB2777" },
    { label: "Upcoming Matches", value: "18", sub: "Next 7 Days", icon: CalendarDays, bg: "#EFF6FF", fg: "#2563EB" },
    { label: "Completed Matches", value: "40", sub: "This Season", icon: CheckCircle2, bg: "#ECFDF5", fg: "#16A34A" },
    { label: "Cancelled Matches", value: "3", sub: "This Season", icon: XCircle, bg: "#F3F4F6", fg: "#6B7280" },
];

const liveMatch = {
    tournament: "Naeem Premier League 2026",
    matchNo: "Match 18",
    teamA: "Royal Warriors", scoreA: "128/4", oversA: "(15.3 Overs)",
    teamB: "Super Kings", scoreB: "125/6", oversB: "(20 Overs)",
    target: "172", note: "Royal Warriors need 44 runs in 27 balls",
    crr: "8.25", rrr: "9.78",
    batting: [
        { name: "Naeem Akhter *", figures: "52 (31)" },
        { name: "Asif Khan", figures: "28 (19)" },
    ],
    bowling: [
        { name: "Imran Ali", figures: "2/18 (3.3)" },
        { name: "Arif Malik", figures: "1/24 (3.0)" },
    ],
    lastBalls: [
        { v: "1", bg: "#16A34A" },
        { v: "4", bg: "#2563EB" },
        { v: "W", bg: "#DC2626" },
        { v: "0", bg: "#9CA3AF" },
        { v: "6", bg: "#7C3AED" },
        { v: "2", bg: "#16A34A" },
    ],
};

const upcomingMatches = [
    { date: "24", month: "MAY", teamA: "Thunder Bolts", teamB: "Green Warriors", meta: "NPL 2026 • Match 19", time: "10:00 AM", venue: "City Stadium, City" },
    { date: "25", month: "MAY", teamA: "Blue Tigers", teamB: "Strikers Club", meta: "NPL 2026 • Match 20", time: "02:00 PM", venue: "Green Field, City" },
    { date: "26", month: "MAY", teamA: "Super Kings", teamB: "Royal Warriors", meta: "NPL 2026 • Match 21", time: "07:00 AM", venue: "Central Ground, City" },
    { date: "27", month: "MAY", teamA: "Thunder Bolts", teamB: "Super Kings", meta: "NPL 2026 • Match 22", time: "10:00 AM", venue: "City Stadium, City" },
    { date: "28", month: "MAY", teamA: "Green Warriors", teamB: "Blue Tigers", meta: "NPL 2026 • Match 23", time: "02:00 PM", venue: "Green Field, City" },
];

const completedMatches = [
    { date: "23 MAY 2026", teamA: "Strikers Club", teamB: "Blue Tigers", result: "Strikers Club won", winner: "Strikers Club", margin: "By 28 Runs", venue: "Sports Complex, City", potm: "Arif Malik", potmScore: "4/18 (4 Overs)", avatar: "https://i.pravatar.cc/64?img=15" },
    { date: "22 MAY 2026", teamA: "Green Warriors", teamB: "Thunder Bolts", result: "Thunder Bolts won", winner: "Thunder Bolts", margin: "By 6 Wickets", venue: "Green Field, City", potm: "Imran Ali", potmScore: "3/22 (4 Overs)", avatar: "https://i.pravatar.cc/64?img=13" },
    { date: "21 MAY 2026", teamA: "Royal Warriors", teamB: "Super Kings", result: "Royal Warriors won", winner: "Royal Warriors", margin: "By 7 Runs", venue: "Central Ground, City", potm: "Naeem Akhter", potmScore: "78 (45)", avatar: "https://i.pravatar.cc/64?img=12" },
    { date: "20 MAY 2026", teamA: "Blue Tigers", teamB: "Super Kings", result: "Super Kings won", winner: "Super Kings", margin: "By 5 Wickets", venue: "City Stadium, City", potm: "Asif Khan", potmScore: "65 (38)", avatar: "https://i.pravatar.cc/64?img=14" },
    { date: "19 MAY 2026", teamA: "Strikers Club", teamB: "Green Warriors", result: "Green Warriors won", winner: "Green Warriors", margin: "By 32 Runs", venue: "Green Field, City", potm: "Arif Malik", potmScore: "5/24 (4 Overs)", avatar: "https://i.pravatar.cc/64?img=15" },
];

const Matches = () => {
    const [activeTab, setActiveTab] = useState("All Matches");
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    return (
        <div className="h-screen overflow-y-auto no-scrollbar bg-[#F7F7F9]">
            <style>{`
                .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

            <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Matches</h1>
                    <p className="text-sm text-gray-500 mt-1">View, manage and track all tournament matches</p>
                </div>

                {/* Tabs + Schedule button */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-6">
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 overflow-x-auto no-scrollbar w-full lg:w-auto">
                        {tabs.map((t) => {
                            const isActive = activeTab === t.label;
                            return (
                                <button
                                    key={t.label}
                                    onClick={() => setActiveTab(t.label)}
                                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                        isActive ? "bg-[#EEF2FF] text-[#4F46E5]" : "text-gray-500 hover:bg-gray-50"
                                    }`}
                                >
                                    {t.icon === "dot" ? (
                                        <span className="w-2 h-2 rounded-full" style={{ background: t.dotColor }}></span>
                                    ) : t.icon === "grid" ? (
                                        <Trophy size={15} />
                                    ) : (
                                        <t.icon size={15} />
                                    )}
                                    {t.label}
                                </button>
                            );
                        })}
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0">
                        <Plus size={16} />
                        Schedule New Match
                    </button>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
                            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                                <s.icon size={19} style={{ color: s.fg }} />
                            </div>
                            <div className="min-w-0">
                                <div className="text-xs sm:text-sm text-gray-500 truncate">{s.label}</div>
                                <div className="text-xl sm:text-2xl font-bold text-gray-900">{s.value}</div>
                                <div className="text-xs text-gray-400 truncate">{s.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Live match + Upcoming matches */}
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mb-6 items-start">
                    {/* Live match */}
                    <div className="xl:col-span-3 bg-white border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <h2 className="font-semibold text-gray-900">Live Matches</h2>
                            <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                                LIVE
                            </span>
                        </div>

                        <div className="rounded-xl p-4 text-white" style={{ background: "linear-gradient(160deg, #0B0F19, #111827)" }}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-1 rounded">LIVE</span>
                                    <span className="text-xs text-gray-300">{liveMatch.tournament} • {liveMatch.matchNo}</span>
                                </div>
                                <button className="flex items-center gap-1.5 text-xs font-medium border border-white/20 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors shrink-0">
                                    <Play size={12} fill="currentColor" />
                                    Watch Live
                                </button>
                            </div>

                            <div className="flex items-center justify-between gap-2 mb-4">
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <TeamCrest name={liveMatch.teamA} size={48} />
                                    <div className="text-xl sm:text-2xl font-bold">{liveMatch.scoreA}</div>
                                    <div className="text-xs text-gray-400">{liveMatch.oversA}</div>
                                    <div className="text-sm font-medium">{liveMatch.teamA}</div>
                                </div>
                                <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-xs text-gray-300 shrink-0">
                                    VS
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <TeamCrest name={liveMatch.teamB} size={48} />
                                    <div className="text-xl sm:text-2xl font-bold">{liveMatch.scoreB}</div>
                                    <div className="text-xs text-gray-400">{liveMatch.oversB}</div>
                                    <div className="text-sm font-medium">{liveMatch.teamB}</div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-300 border-t border-white/10 pt-3 mb-4">
                                <span>Target: {liveMatch.target}</span>
                                <span className="text-[#60A5FA]">{liveMatch.note}</span>
                                <span className="ml-auto">CRR: {liveMatch.crr}</span>
                                <span>RRR: {liveMatch.rrr}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <div className="text-xs font-semibold text-gray-400 mb-1.5">Batting</div>
                                    {liveMatch.batting.map((b, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs py-1">
                                            <span className="text-gray-200 truncate">{b.name}</span>
                                            <span className="text-white font-medium shrink-0 ml-2">{b.figures}</span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-gray-400 mb-1.5">Bowling</div>
                                    {liveMatch.bowling.map((b, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs py-1">
                                            <span className="text-gray-200 truncate">{b.name}</span>
                                            <span className="text-white font-medium shrink-0 ml-2">{b.figures}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-3">
                                <div className="text-xs font-semibold text-gray-400 mb-2">Last 6 Balls</div>
                                <div className="flex gap-2">
                                    {liveMatch.lastBalls.map((b, i) => (
                                        <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: b.bg }}>
                                            {b.v}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming matches */}
                    <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold text-gray-900">Upcoming Matches</h2>
                            <button className="text-sm text-[#4F46E5] hover:underline">View All</button>
                        </div>
                        <div className="flex flex-col gap-3">
                            {upcomingMatches.map((m, i) => (
                                <div key={i} className="border border-gray-100 rounded-lg p-3">
                                    <div className="flex items-start gap-3">
                                        <div className="flex flex-col items-center justify-center w-11 shrink-0 bg-gray-50 rounded-lg py-1.5">
                                            <span className="text-sm font-bold text-gray-900">{m.date}</span>
                                            <span className="text-[9px] text-gray-400">{m.month}</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-800 mb-1 flex-wrap">
                                                <TeamCrest name={m.teamA} size={20} />
                                                <span className="font-medium truncate">{m.teamA}</span>
                                                <span className="text-gray-400 text-xs">vs</span>
                                                <TeamCrest name={m.teamB} size={20} />
                                                <span className="font-medium truncate">{m.teamB}</span>
                                            </div>
                                            <div className="text-xs text-gray-400">{m.meta}</div>
                                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                                <MapPin size={11} />
                                                {m.venue}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 shrink-0">
                                            <span className="text-xs text-gray-500 whitespace-nowrap">{m.time}</span>
                                            <button className="text-xs font-medium text-[#4F46E5] border border-[#4F46E5]/30 rounded-lg px-2.5 py-1 hover:bg-[#EEF2FF] transition-colors whitespace-nowrap">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Completed matches table */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
                    <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">Completed Matches</h2>
                    </div>
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-sm min-w-[1100px]">
                            <thead>
                                <tr className="text-left text-[11px] tracking-wide text-gray-400 border-b border-gray-100">
                                    <th className="font-medium px-5 py-3">DATE</th>
                                    <th className="font-medium px-3 py-3">MATCH</th>
                                    <th className="font-medium px-3 py-3">RESULT</th>
                                    <th className="font-medium px-3 py-3">WINNER</th>
                                    <th className="font-medium px-3 py-3">MARGIN</th>
                                    <th className="font-medium px-3 py-3">VENUE</th>
                                    <th className="font-medium px-3 py-3">PLAYER OF THE MATCH</th>
                                    <th className="font-medium px-5 py-3 text-right">SCORECARD</th>
                                </tr>
                            </thead>
                            <tbody>
                                {completedMatches.map((row, i) => (
                                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{row.date}</td>
                                        <td className="px-3 py-3">
                                            <div className="flex items-center gap-2 whitespace-nowrap">
                                                <TeamCrest name={row.teamA} size={22} />
                                                <span className="text-gray-800">{row.teamA}</span>
                                                <span className="text-gray-400 text-xs">vs</span>
                                                <TeamCrest name={row.teamB} size={22} />
                                                <span className="text-gray-800">{row.teamB}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-[#4F46E5] font-medium whitespace-nowrap">{row.result}</td>
                                        <td className="px-3 py-3">
                                            <div className="flex items-center gap-2 whitespace-nowrap">
                                                <TeamCrest name={row.winner} size={20} />
                                                <span className="text-gray-800">{row.winner}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{row.margin}</td>
                                        <td className="px-3 py-3 text-gray-500 whitespace-nowrap">{row.venue}</td>
                                        <td className="px-3 py-3">
                                            <div className="flex items-center gap-2 whitespace-nowrap">
                                                <img src={row.avatar} alt={row.potm} className="w-7 h-7 rounded-full object-cover shrink-0" />
                                                <div className="min-w-0">
                                                    <div className="text-gray-800 font-medium truncate">{row.potm}</div>
                                                    <div className="text-xs text-gray-400 truncate">{row.potmScore}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center justify-end">
                                                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-[#4F46E5] hover:bg-[#EEF2FF] transition-colors">
                                                    <FileText size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500">Showing 1 to 5 of 40 matches</span>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <select
                                    value={perPage}
                                    onChange={(e) => setPerPage(Number(e.target.value))}
                                    className="h-9 pl-3 pr-8 rounded-lg border border-gray-200 text-xs text-gray-600 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                                >
                                    <option value={10}>10 per page</option>
                                    <option value={25}>25 per page</option>
                                    <option value={50}>50 per page</option>
                                </select>
                                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
                                disabled={page === 1}
                            >
                                <ChevronLeft size={15} />
                            </button>
                            {[1, 2, 3, 4].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                                        page === p ? "bg-[#4F46E5] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                onClick={() => setPage(Math.min(4, page + 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
                                disabled={page === 4}
                            >
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Matches