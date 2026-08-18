import React, { useState } from 'react'
import {
    Trophy,
    Rocket,
    CheckCircle2,
    CalendarDays,
    Users2,
    Download,
    ChevronDown,
    SlidersHorizontal,
    Info,
    RefreshCw,
    ArrowRight,
} from 'lucide-react'

const teamColors = {
    "Royal Warriors": { bg: "#F2B84B", fg: "#7A4B00", label: "RW" },
    "Super Kings": { bg: "#1E3A8A", fg: "#FFFFFF", label: "SK" },
    "Thunder Bolts": { bg: "#2563EB", fg: "#FFFFFF", label: "TB" },
    "Green Warriors": { bg: "#059669", fg: "#FFFFFF", label: "GW" },
    "Blue Tigers": { bg: "#4338CA", fg: "#FFFFFF", label: "BT" },
    "Strikers Club": { bg: "#16A34A", fg: "#FFFFFF", label: "SC" },
    "Phoenix Riders": { bg: "#B45309", fg: "#FFFFFF", label: "PR" },
    "Titans XI": { bg: "#334155", fg: "#FFFFFF", label: "TX" },
};

const TeamCrest = ({ name, size = 26 }) => {
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

const stats = [
    { label: "Total Teams", value: "8", sub: "Participating", icon: Trophy, bg: "#EEF2FF", fg: "#4F46E5" },
    { label: "Total Matches", value: "28", sub: "This Season", icon: Rocket, bg: "#EFF6FF", fg: "#2563EB" },
    { label: "Completed Matches", value: "20", sub: "71.43%", icon: CheckCircle2, bg: "#ECFDF5", fg: "#16A34A" },
    { label: "Remaining Matches", value: "8", sub: "28.57%", icon: CalendarDays, bg: "#FFF7ED", fg: "#EA580C" },
    { label: "Total Points Available", value: "336", sub: "(8 Teams × 14 Matches)", icon: Users2, bg: "#FDF2F8", fg: "#DB2777" },
];

const standings = [
    { pos: 1, team: "Royal Warriors", p: 7, w: 5, l: 2, nr: 0, pts: 10, nrr: "+1.253", forR: "812/98.3", against: "764/100.0", last5: ["W", "W", "W", "L", "NR"], zone: "qualified" },
    { pos: 2, team: "Super Kings", p: 7, w: 5, l: 2, nr: 0, pts: 10, nrr: "+0.782", forR: "801/98.0", against: "765/100.0", last5: ["W", "L", "NR", "W", "W"], zone: "qualified" },
    { pos: 3, team: "Thunder Bolts", p: 7, w: 4, l: 3, nr: 0, pts: 8, nrr: "+0.416", forR: "765/98.4", against: "732/100.0", last5: ["L", "W", "W", "L", "W"], zone: "qualified" },
    { pos: 4, team: "Green Warriors", p: 7, w: 4, l: 3, nr: 0, pts: 8, nrr: "-0.128", forR: "745/99.5", against: "768/100.0", last5: ["W", "W", "L", "W", "L"], zone: "qualified" },
    { pos: 5, team: "Blue Tigers", p: 7, w: 3, l: 4, nr: 0, pts: 6, nrr: "-0.356", forR: "712/100.0", against: "735/98.3", last5: ["W", "L", "L", "W", "L"], zone: "maybe" },
    { pos: 6, team: "Strikers Club", p: 7, w: 2, l: 5, nr: 0, pts: 4, nrr: "-0.845", forR: "698/100.0", against: "755/98.1", last5: ["L", "L", "W", "L", "W"], zone: "eliminated" },
    { pos: 7, team: "Phoenix Riders", p: 7, w: 1, l: 6, nr: 0, pts: 2, nrr: "-1.124", forR: "659/98.2", against: "742/97.0", last5: ["L", "L", "L", "W", "L"], zone: "eliminated" },
    { pos: 8, team: "Titans XI", p: 7, w: 1, l: 6, nr: 0, pts: 2, nrr: "-1.998", forR: "601/98.3", against: "708/96.2", last5: ["L", "L", "L", "W", "L"], zone: "eliminated" },
];

const zoneStyles = {
    qualified: { row: "bg-[#F0FDF4]" },
    maybe: { row: "bg-[#EFF6FF]" },
    eliminated: { row: "bg-[#FEF2F2]" },
};

const resultDot = (r) =>
    r === "W" ? { bg: "#16A34A", label: "W" } : r === "L" ? { bg: "#DC2626", label: "L" } : { bg: "#9CA3AF", label: "NR" };

const topPerformers = [
    { name: "Naeem Akhter", team: "Royal Warriors", value: "562", label: "Runs", avatar: "https://i.pravatar.cc/64?img=12" },
    { name: "Imran Ali", team: "Super Kings", value: "18", label: "Wickets", avatar: "https://i.pravatar.cc/64?img=13" },
    { name: "Arif Malik", team: "Green Warriors", value: "342", label: "Points", avatar: "https://i.pravatar.cc/64?img=15" },
];

const OrgPointsTable = () => {
    const [tournamentOpen, setTournamentOpen] = useState(false);
    const [tournament, setTournament] = useState("Naeem Premier League 2026");
    const [yearOpen, setYearOpen] = useState(false);
    const [year, setYear] = useState("2026");
    const [sortOpen, setSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState("Points");

    const tournaments = ["Naeem Premier League 2026", "City Champions Cup", "Summer Super Cup", "Winter Challenge 2026"];
    const years = ["2026", "2025", "2024"];
    const sortOptions = ["Points", "NRR", "Wins", "Team Name"];

    return (
        <div className="h-screen overflow-y-auto no-scrollbar bg-[#F7F7F9]">
            <style>{`
                .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

            <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="mb-5">
                    <h1 className="text-2xl font-bold text-gray-900">Points Table</h1>
                    <p className="text-sm text-gray-500 mt-1">{tournament}</p>
                </div>

                {/* Selectors + download */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="relative">
                            <button
                                onClick={() => setTournamentOpen(!tournamentOpen)}
                                className="flex items-center gap-2 h-10 px-3.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <Trophy size={15} className="text-gray-400" />
                                {tournament}
                                <ChevronDown size={14} className={`text-gray-400 transition-transform ${tournamentOpen ? "rotate-180" : ""}`} />
                            </button>
                            {tournamentOpen && (
                                <div className="absolute left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                                    {tournaments.map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => { setTournament(t); setTournamentOpen(false); }}
                                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                                tournament === t ? "text-[#4F46E5] font-medium" : "text-gray-600"
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setYearOpen(!yearOpen)}
                                className="flex items-center gap-2 h-10 px-3.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                {year}
                                <ChevronDown size={14} className={`text-gray-400 transition-transform ${yearOpen ? "rotate-180" : ""}`} />
                            </button>
                            {yearOpen && (
                                <div className="absolute left-0 mt-1 w-24 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                                    {years.map((y) => (
                                        <button
                                            key={y}
                                            onClick={() => { setYear(y); setYearOpen(false); }}
                                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                                year === y ? "text-[#4F46E5] font-medium" : "text-gray-600"
                                            }`}
                                        >
                                            {y}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-white border border-[#4F46E5]/30 text-[#4F46E5] text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#EEF2FF] transition-colors shrink-0">
                        <Download size={15} />
                        Download Table
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

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 items-start">
                    {/* Standings */}
                    <div className="xl:col-span-3 bg-white border border-gray-200 rounded-xl overflow-hidden min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">League Standings</h2>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                                    <SlidersHorizontal size={14} />
                                    Filters
                                </button>
                                <div className="relative">
                                    <button
                                        onClick={() => setSortOpen(!sortOpen)}
                                        className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        Sort By <span className="font-medium text-gray-800">{sortBy}</span>
                                        <ChevronDown size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                                    </button>
                                    {sortOpen && (
                                        <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                                            {sortOptions.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => { setSortBy(opt); setSortOpen(false); }}
                                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                                        sortBy === opt ? "text-[#4F46E5] font-medium" : "text-gray-600"
                                                    }`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto no-scrollbar">
                            <table className="w-full text-sm min-w-[900px]">
                                <thead>
                                    <tr className="text-left text-[11px] tracking-wide text-white bg-[#0B1220]">
                                        <th className="font-medium px-4 py-3">#</th>
                                        <th className="font-medium px-3 py-3">TEAM</th>
                                        <th className="font-medium px-3 py-3">P</th>
                                        <th className="font-medium px-3 py-3">W</th>
                                        <th className="font-medium px-3 py-3">L</th>
                                        <th className="font-medium px-3 py-3">NR</th>
                                        <th className="font-medium px-3 py-3">PTS</th>
                                        <th className="font-medium px-3 py-3">NRR</th>
                                        <th className="font-medium px-3 py-3">FOR</th>
                                        <th className="font-medium px-3 py-3">AGAINST</th>
                                        <th className="font-medium px-3 py-3">LAST 5</th>
                                        <th className="font-medium px-4 py-3">FORM</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {standings.map((row) => (
                                        <tr key={row.pos} className={`border-b border-gray-100 last:border-0 ${zoneStyles[row.zone].row}`}>
                                            <td className="px-4 py-3 text-gray-500 font-medium">{row.pos}</td>
                                            <td className="px-3 py-3">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <TeamCrest name={row.team} />
                                                    <span className="text-gray-800 font-medium truncate">{row.team}</span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-3 text-gray-700">{row.p}</td>
                                            <td className="px-3 py-3 text-gray-700">{row.w}</td>
                                            <td className="px-3 py-3 text-gray-700">{row.l}</td>
                                            <td className="px-3 py-3 text-gray-700">{row.nr}</td>
                                            <td className="px-3 py-3 font-bold text-gray-900">{row.pts}</td>
                                            <td className={`px-3 py-3 whitespace-nowrap ${row.nrr.startsWith("-") ? "text-red-500" : "text-green-600"}`}>{row.nrr}</td>
                                            <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{row.forR}</td>
                                            <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{row.against}</td>
                                            <td className="px-3 py-3">
                                                <div className="flex items-center gap-1">
                                                    {row.last5.map((r, i) => {
                                                        const d = resultDot(r);
                                                        return (
                                                            <span
                                                                key={i}
                                                                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                                                                style={{ background: d.bg }}
                                                            >
                                                                {d.label[0]}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-0.5">
                                                    {row.last5.map((r, i) => (
                                                        <span
                                                            key={i}
                                                            className="w-4 h-2 rounded-sm"
                                                            style={{ background: resultDot(r).bg }}
                                                        ></span>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 sm:px-5 py-3.5 border-t border-gray-100 text-xs text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <Info size={13} className="text-gray-400" />
                                Top 4 teams will qualify for the Playoffs
                            </span>
                            <span className="flex items-center gap-1.5">
                                Last Updated: May 24, 2026 10:30 PM
                                <RefreshCw size={13} className="text-gray-400" />
                            </span>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="xl:col-span-1 flex flex-col gap-4">
                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 mb-3">Top Performers</h3>
                            <div className="flex flex-col gap-3">
                                {topPerformers.map((p, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <div className="text-sm text-gray-800 font-medium truncate">{p.name}</div>
                                            <div className="text-xs text-gray-400 truncate">{p.team}</div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className="text-sm font-bold text-gray-900">{p.value}</div>
                                            <div className="text-[10px] text-gray-400">{p.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="flex items-center gap-1 text-sm text-[#4F46E5] hover:underline mt-3 font-medium">
                                View All Stats
                                <ArrowRight size={13} />
                            </button>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 mb-3">Legend</h3>
                            <div className="flex items-center gap-4 flex-wrap mb-3 text-xs text-gray-600">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-4 h-4 rounded-full bg-[#16A34A] text-white text-[9px] font-bold flex items-center justify-center">W</span>
                                    Win
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="w-4 h-4 rounded-full bg-[#DC2626] text-white text-[9px] font-bold flex items-center justify-center">L</span>
                                    Loss
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="w-4 h-4 rounded-full bg-[#9CA3AF] text-white text-[8px] font-bold flex items-center justify-center">NR</span>
                                    No Result
                                </span>
                            </div>
                            <div className="flex flex-col gap-2 text-xs text-gray-600">
                                <span className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-sm bg-[#F0FDF4] border border-green-200"></span>
                                    Qualified for Playoffs
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-sm bg-[#EFF6FF] border border-blue-200"></span>
                                    May qualify for Playoffs
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-sm bg-[#FEF2F2] border border-red-200"></span>
                                    Eliminated
                                </span>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 mb-3">Points System</h3>
                            <div className="flex flex-col gap-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Win</span>
                                    <span className="font-semibold text-gray-900">2 Points</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">No Result</span>
                                    <span className="font-semibold text-gray-900">1 Point</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Loss</span>
                                    <span className="font-semibold text-gray-900">0 Points</span>
                                </div>
                            </div>
                            <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
                                NRR is used as tiebreaker
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrgPointsTable