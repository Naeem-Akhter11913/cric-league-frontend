// import React, { useState } from 'react'
// import {
//     Trophy,
//     Radio,
//     CalendarDays,
//     CheckCircle2,
//     XCircle,
//     Plus,
//     Play,
//     MapPin,
//     FileText,
//     ChevronDown,
//     ChevronLeft,
//     ChevronRight,
// } from 'lucide-react'

// const teamColors = {
//     "Royal Warriors": { bg: "#F2B84B", fg: "#7A4B00", label: "RW" },
//     "Super Kings": { bg: "#1E3A8A", fg: "#FFFFFF", label: "SK" },
//     "Thunder Bolts": { bg: "#2563EB", fg: "#FFFFFF", label: "TB" },
//     "Green Warriors": { bg: "#059669", fg: "#FFFFFF", label: "GW" },
//     "Blue Tigers": { bg: "#4338CA", fg: "#FFFFFF", label: "BT" },
//     "Strikers Club": { bg: "#16A34A", fg: "#FFFFFF", label: "SC" },
// };

// const TeamCrest = ({ name, size = 24 }) => {
//     const c = teamColors[name] || { bg: "#9CA3AF", fg: "#FFFFFF", label: name.slice(0, 2).toUpperCase() };
//     return (
//         <div
//             className="rounded-full flex items-center justify-center font-bold shrink-0"
//             style={{ width: size, height: size, background: c.bg, color: c.fg, fontSize: size * 0.34 }}
//         >
//             {c.label}
//         </div>
//     );
// };

// const tabs = [
//     { label: "All Matches", icon: "grid" },
//     { label: "Live", icon: "dot", dotColor: "#DC2626" },
//     { label: "Upcoming", icon: CalendarDays },
//     { label: "Completed", icon: CheckCircle2 },
//     { label: "Cancelled", icon: XCircle },
// ];

// const stats = [
//     { label: "Total Matches", value: "64", sub: "This Season", icon: Trophy, bg: "#EEF2FF", fg: "#4F46E5" },
//     { label: "Live Matches", value: "3", sub: "Ongoing Now", icon: Radio, bg: "#FDF2F8", fg: "#DB2777" },
//     { label: "Upcoming Matches", value: "18", sub: "Next 7 Days", icon: CalendarDays, bg: "#EFF6FF", fg: "#2563EB" },
//     { label: "Completed Matches", value: "40", sub: "This Season", icon: CheckCircle2, bg: "#ECFDF5", fg: "#16A34A" },
//     { label: "Cancelled Matches", value: "3", sub: "This Season", icon: XCircle, bg: "#F3F4F6", fg: "#6B7280" },
// ];

// const liveMatch = {
//     tournament: "Naeem Premier League 2026",
//     matchNo: "Match 18",
//     teamA: "Royal Warriors", scoreA: "128/4", oversA: "(15.3 Overs)",
//     teamB: "Super Kings", scoreB: "125/6", oversB: "(20 Overs)",
//     target: "172", note: "Royal Warriors need 44 runs in 27 balls",
//     crr: "8.25", rrr: "9.78",
//     batting: [
//         { name: "Naeem Akhter *", figures: "52 (31)" },
//         { name: "Asif Khan", figures: "28 (19)" },
//     ],
//     bowling: [
//         { name: "Imran Ali", figures: "2/18 (3.3)" },
//         { name: "Arif Malik", figures: "1/24 (3.0)" },
//     ],
//     lastBalls: [
//         { v: "1", bg: "#16A34A" },
//         { v: "4", bg: "#2563EB" },
//         { v: "W", bg: "#DC2626" },
//         { v: "0", bg: "#9CA3AF" },
//         { v: "6", bg: "#7C3AED" },
//         { v: "2", bg: "#16A34A" },
//     ],
// };

// const upcomingMatches = [
//     { date: "24", month: "MAY", teamA: "Thunder Bolts", teamB: "Green Warriors", meta: "NPL 2026 • Match 19", time: "10:00 AM", venue: "City Stadium, City" },
//     { date: "25", month: "MAY", teamA: "Blue Tigers", teamB: "Strikers Club", meta: "NPL 2026 • Match 20", time: "02:00 PM", venue: "Green Field, City" },
//     { date: "26", month: "MAY", teamA: "Super Kings", teamB: "Royal Warriors", meta: "NPL 2026 • Match 21", time: "07:00 AM", venue: "Central Ground, City" },
//     { date: "27", month: "MAY", teamA: "Thunder Bolts", teamB: "Super Kings", meta: "NPL 2026 • Match 22", time: "10:00 AM", venue: "City Stadium, City" },
//     { date: "28", month: "MAY", teamA: "Green Warriors", teamB: "Blue Tigers", meta: "NPL 2026 • Match 23", time: "02:00 PM", venue: "Green Field, City" },
// ];

// const completedMatches = [
//     { date: "23 MAY 2026", teamA: "Strikers Club", teamB: "Blue Tigers", result: "Strikers Club won", winner: "Strikers Club", margin: "By 28 Runs", venue: "Sports Complex, City", potm: "Arif Malik", potmScore: "4/18 (4 Overs)", avatar: "https://i.pravatar.cc/64?img=15" },
//     { date: "22 MAY 2026", teamA: "Green Warriors", teamB: "Thunder Bolts", result: "Thunder Bolts won", winner: "Thunder Bolts", margin: "By 6 Wickets", venue: "Green Field, City", potm: "Imran Ali", potmScore: "3/22 (4 Overs)", avatar: "https://i.pravatar.cc/64?img=13" },
//     { date: "21 MAY 2026", teamA: "Royal Warriors", teamB: "Super Kings", result: "Royal Warriors won", winner: "Royal Warriors", margin: "By 7 Runs", venue: "Central Ground, City", potm: "Naeem Akhter", potmScore: "78 (45)", avatar: "https://i.pravatar.cc/64?img=12" },
//     { date: "20 MAY 2026", teamA: "Blue Tigers", teamB: "Super Kings", result: "Super Kings won", winner: "Super Kings", margin: "By 5 Wickets", venue: "City Stadium, City", potm: "Asif Khan", potmScore: "65 (38)", avatar: "https://i.pravatar.cc/64?img=14" },
//     { date: "19 MAY 2026", teamA: "Strikers Club", teamB: "Green Warriors", result: "Green Warriors won", winner: "Green Warriors", margin: "By 32 Runs", venue: "Green Field, City", potm: "Arif Malik", potmScore: "5/24 (4 Overs)", avatar: "https://i.pravatar.cc/64?img=15" },
// ];

// const Matches = () => {
//     const [activeTab, setActiveTab] = useState("All Matches");
//     const [perPage, setPerPage] = useState(10);
//     const [page, setPage] = useState(1);

//     return (
//         <div className="h-screen overflow-y-auto no-scrollbar bg-[#F7F7F9]">
//             <style>{`
//                 .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
//                 .no-scrollbar::-webkit-scrollbar { display: none; }
//             `}</style>

//             <div className="p-4 sm:p-6">
//                 {/* Header */}
//                 <div className="mb-6">
//                     <h1 className="text-2xl font-bold text-gray-900">Matches</h1>
//                     <p className="text-sm text-gray-500 mt-1">View, manage and track all tournament matches</p>
//                 </div>

//                 {/* Tabs + Schedule button */}
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-6">
//                     <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 overflow-x-auto no-scrollbar w-full lg:w-auto">
//                         {tabs.map((t) => {
//                             const isActive = activeTab === t.label;
//                             return (
//                                 <button
//                                     key={t.label}
//                                     onClick={() => setActiveTab(t.label)}
//                                     className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
//                                         isActive ? "bg-[#EEF2FF] text-[#4F46E5]" : "text-gray-500 hover:bg-gray-50"
//                                     }`}
//                                 >
//                                     {t.icon === "dot" ? (
//                                         <span className="w-2 h-2 rounded-full" style={{ background: t.dotColor }}></span>
//                                     ) : t.icon === "grid" ? (
//                                         <Trophy size={15} />
//                                     ) : (
//                                         <t.icon size={15} />
//                                     )}
//                                     {t.label}
//                                 </button>
//                             );
//                         })}
//                     </div>
//                     <button className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0">
//                         <Plus size={16} />
//                         Schedule New Match
//                     </button>
//                 </div>

//                 {/* Stat cards */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
//                     {stats.map((s, i) => (
//                         <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
//                             <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: s.bg }}>
//                                 <s.icon size={19} style={{ color: s.fg }} />
//                             </div>
//                             <div className="min-w-0">
//                                 <div className="text-xs sm:text-sm text-gray-500 truncate">{s.label}</div>
//                                 <div className="text-xl sm:text-2xl font-bold text-gray-900">{s.value}</div>
//                                 <div className="text-xs text-gray-400 truncate">{s.sub}</div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Live match + Upcoming matches */}
//                 <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mb-6 items-start">
//                     {/* Live match */}
//                     <div className="xl:col-span-3 bg-white border border-gray-200 rounded-xl p-4">
//                         <div className="flex items-center gap-2 mb-3">
//                             <h2 className="font-semibold text-gray-900">Live Matches</h2>
//                             <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
//                                 <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
//                                 LIVE
//                             </span>
//                         </div>

//                         <div className="rounded-xl p-4 text-white" style={{ background: "linear-gradient(160deg, #0B0F19, #111827)" }}>
//                             <div className="flex items-center justify-between mb-4">
//                                 <div className="flex items-center gap-2 flex-wrap">
//                                     <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-1 rounded">LIVE</span>
//                                     <span className="text-xs text-gray-300">{liveMatch.tournament} • {liveMatch.matchNo}</span>
//                                 </div>
//                                 <button className="flex items-center gap-1.5 text-xs font-medium border border-white/20 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors shrink-0">
//                                     <Play size={12} fill="currentColor" />
//                                     Watch Live
//                                 </button>
//                             </div>

//                             <div className="flex items-center justify-between gap-2 mb-4">
//                                 <div className="flex flex-col items-center gap-2 flex-1">
//                                     <TeamCrest name={liveMatch.teamA} size={48} />
//                                     <div className="text-xl sm:text-2xl font-bold">{liveMatch.scoreA}</div>
//                                     <div className="text-xs text-gray-400">{liveMatch.oversA}</div>
//                                     <div className="text-sm font-medium">{liveMatch.teamA}</div>
//                                 </div>
//                                 <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-xs text-gray-300 shrink-0">
//                                     VS
//                                 </div>
//                                 <div className="flex flex-col items-center gap-2 flex-1">
//                                     <TeamCrest name={liveMatch.teamB} size={48} />
//                                     <div className="text-xl sm:text-2xl font-bold">{liveMatch.scoreB}</div>
//                                     <div className="text-xs text-gray-400">{liveMatch.oversB}</div>
//                                     <div className="text-sm font-medium">{liveMatch.teamB}</div>
//                                 </div>
//                             </div>

//                             <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-300 border-t border-white/10 pt-3 mb-4">
//                                 <span>Target: {liveMatch.target}</span>
//                                 <span className="text-[#60A5FA]">{liveMatch.note}</span>
//                                 <span className="ml-auto">CRR: {liveMatch.crr}</span>
//                                 <span>RRR: {liveMatch.rrr}</span>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4 mb-4">
//                                 <div>
//                                     <div className="text-xs font-semibold text-gray-400 mb-1.5">Batting</div>
//                                     {liveMatch.batting.map((b, i) => (
//                                         <div key={i} className="flex items-center justify-between text-xs py-1">
//                                             <span className="text-gray-200 truncate">{b.name}</span>
//                                             <span className="text-white font-medium shrink-0 ml-2">{b.figures}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div>
//                                     <div className="text-xs font-semibold text-gray-400 mb-1.5">Bowling</div>
//                                     {liveMatch.bowling.map((b, i) => (
//                                         <div key={i} className="flex items-center justify-between text-xs py-1">
//                                             <span className="text-gray-200 truncate">{b.name}</span>
//                                             <span className="text-white font-medium shrink-0 ml-2">{b.figures}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="border-t border-white/10 pt-3">
//                                 <div className="text-xs font-semibold text-gray-400 mb-2">Last 6 Balls</div>
//                                 <div className="flex gap-2">
//                                     {liveMatch.lastBalls.map((b, i) => (
//                                         <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: b.bg }}>
//                                             {b.v}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Upcoming matches */}
//                     <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl p-4">
//                         <div className="flex items-center justify-between mb-3">
//                             <h2 className="font-semibold text-gray-900">Upcoming Matches</h2>
//                             <button className="text-sm text-[#4F46E5] hover:underline">View All</button>
//                         </div>
//                         <div className="flex flex-col gap-3">
//                             {upcomingMatches.map((m, i) => (
//                                 <div key={i} className="border border-gray-100 rounded-lg p-3">
//                                     <div className="flex items-start gap-3">
//                                         <div className="flex flex-col items-center justify-center w-11 shrink-0 bg-gray-50 rounded-lg py-1.5">
//                                             <span className="text-sm font-bold text-gray-900">{m.date}</span>
//                                             <span className="text-[9px] text-gray-400">{m.month}</span>
//                                         </div>
//                                         <div className="min-w-0 flex-1">
//                                             <div className="flex items-center gap-2 text-sm text-gray-800 mb-1 flex-wrap">
//                                                 <TeamCrest name={m.teamA} size={20} />
//                                                 <span className="font-medium truncate">{m.teamA}</span>
//                                                 <span className="text-gray-400 text-xs">vs</span>
//                                                 <TeamCrest name={m.teamB} size={20} />
//                                                 <span className="font-medium truncate">{m.teamB}</span>
//                                             </div>
//                                             <div className="text-xs text-gray-400">{m.meta}</div>
//                                             <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
//                                                 <MapPin size={11} />
//                                                 {m.venue}
//                                             </div>
//                                         </div>
//                                         <div className="flex flex-col items-end gap-2 shrink-0">
//                                             <span className="text-xs text-gray-500 whitespace-nowrap">{m.time}</span>
//                                             <button className="text-xs font-medium text-[#4F46E5] border border-[#4F46E5]/30 rounded-lg px-2.5 py-1 hover:bg-[#EEF2FF] transition-colors whitespace-nowrap">
//                                                 View Details
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Completed matches table */}
//                 <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
//                     <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
//                         <h2 className="text-lg font-semibold text-gray-900">Completed Matches</h2>
//                     </div>
//                     <div className="overflow-x-auto no-scrollbar">
//                         <table className="w-full text-sm min-w-[1100px]">
//                             <thead>
//                                 <tr className="text-left text-[11px] tracking-wide text-gray-400 border-b border-gray-100">
//                                     <th className="font-medium px-5 py-3">DATE</th>
//                                     <th className="font-medium px-3 py-3">MATCH</th>
//                                     <th className="font-medium px-3 py-3">RESULT</th>
//                                     <th className="font-medium px-3 py-3">WINNER</th>
//                                     <th className="font-medium px-3 py-3">MARGIN</th>
//                                     <th className="font-medium px-3 py-3">VENUE</th>
//                                     <th className="font-medium px-3 py-3">PLAYER OF THE MATCH</th>
//                                     <th className="font-medium px-5 py-3 text-right">SCORECARD</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {completedMatches.map((row, i) => (
//                                     <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
//                                         <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{row.date}</td>
//                                         <td className="px-3 py-3">
//                                             <div className="flex items-center gap-2 whitespace-nowrap">
//                                                 <TeamCrest name={row.teamA} size={22} />
//                                                 <span className="text-gray-800">{row.teamA}</span>
//                                                 <span className="text-gray-400 text-xs">vs</span>
//                                                 <TeamCrest name={row.teamB} size={22} />
//                                                 <span className="text-gray-800">{row.teamB}</span>
//                                             </div>
//                                         </td>
//                                         <td className="px-3 py-3 text-[#4F46E5] font-medium whitespace-nowrap">{row.result}</td>
//                                         <td className="px-3 py-3">
//                                             <div className="flex items-center gap-2 whitespace-nowrap">
//                                                 <TeamCrest name={row.winner} size={20} />
//                                                 <span className="text-gray-800">{row.winner}</span>
//                                             </div>
//                                         </td>
//                                         <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{row.margin}</td>
//                                         <td className="px-3 py-3 text-gray-500 whitespace-nowrap">{row.venue}</td>
//                                         <td className="px-3 py-3">
//                                             <div className="flex items-center gap-2 whitespace-nowrap">
//                                                 <img src={row.avatar} alt={row.potm} className="w-7 h-7 rounded-full object-cover shrink-0" />
//                                                 <div className="min-w-0">
//                                                     <div className="text-gray-800 font-medium truncate">{row.potm}</div>
//                                                     <div className="text-xs text-gray-400 truncate">{row.potmScore}</div>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className="px-5 py-3">
//                                             <div className="flex items-center justify-end">
//                                                 <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-[#4F46E5] hover:bg-[#EEF2FF] transition-colors">
//                                                     <FileText size={15} />
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Pagination */}
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-t border-gray-100">
//                         <span className="text-xs text-gray-500">Showing 1 to 5 of 40 matches</span>
//                         <div className="flex items-center gap-2">
//                             <div className="relative">
//                                 <select
//                                     value={perPage}
//                                     onChange={(e) => setPerPage(Number(e.target.value))}
//                                     className="h-9 pl-3 pr-8 rounded-lg border border-gray-200 text-xs text-gray-600 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
//                                 >
//                                     <option value={10}>10 per page</option>
//                                     <option value={25}>25 per page</option>
//                                     <option value={50}>50 per page</option>
//                                 </select>
//                                 <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                             </div>
//                             <button
//                                 onClick={() => setPage(Math.max(1, page - 1))}
//                                 className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
//                                 disabled={page === 1}
//                             >
//                                 <ChevronLeft size={15} />
//                             </button>
//                             {[1, 2, 3, 4].map((p) => (
//                                 <button
//                                     key={p}
//                                     onClick={() => setPage(p)}
//                                     className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
//                                         page === p ? "bg-[#4F46E5] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
//                                     }`}
//                                 >
//                                     {p}
//                                 </button>
//                             ))}
//                             <button
//                                 onClick={() => setPage(Math.min(4, page + 1))}
//                                 className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
//                                 disabled={page === 4}
//                             >
//                                 <ChevronRight size={15} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Matches


import React, { useEffect, useMemo, useState } from 'react'
import {
    Trophy, Radio, CalendarDays, CheckCircle2, XCircle, Plus, MapPin, FileText,
    ChevronDown, ChevronLeft, ChevronRight, Eye, Pencil, Ban, UserRound,
} from 'lucide-react'
import toast from 'react-hot-toast';
import Modal from '../model/Modal';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchMatches, fetchMatchStats, fetchMatchOptions, createMatch, updateMatch, cancelMatch,
} from '../store/action/match.action';

/* ------------------------------- constants ------------------------------- */

const TABS = [
    { label: "All Matches", icon: "grid" },
    { label: "Live", icon: "dot", dotColor: "#DC2626" },
    { label: "Upcoming", icon: CalendarDays },
    { label: "Completed", icon: CheckCircle2 },
    { label: "Cancelled", icon: XCircle },
];

const FORMATS = ["T20", "T10", "ODI", "Test"];
const DEFAULT_OVERS = { T20: 20, T10: 10, ODI: 50, Test: "" };

const STATUS_LABEL = {
    scheduled: "Scheduled", toss_done: "Toss done", live: "Live", innings_break: "Innings break",
    completed: "Completed", cancelled: "Cancelled", abandoned: "Abandoned",
};
const STATUS_STYLE = {
    scheduled: "bg-blue-50 text-blue-600", toss_done: "bg-indigo-50 text-indigo-600",
    live: "bg-red-50 text-red-600", innings_break: "bg-amber-50 text-amber-600",
    completed: "bg-[#DCFCE7] text-[#16A34A]", cancelled: "bg-gray-100 text-gray-500",
    abandoned: "bg-orange-50 text-orange-600",
};

const inputCls =
    "w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] disabled:bg-gray-50 disabled:text-gray-400";

/* -------------------------------- helpers -------------------------------- */

const PALETTE = [
    ["#F2B84B", "#7A4B00"], ["#1E3A8A", "#FFFFFF"], ["#2563EB", "#FFFFFF"], ["#059669", "#FFFFFF"],
    ["#4338CA", "#FFFFFF"], ["#16A34A", "#FFFFFF"], ["#DB2777", "#FFFFFF"], ["#EA580C", "#FFFFFF"],
];
const hash = (s = "") => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

const TeamCrest = ({ team, size = 24 }) => {
    const name = team?.name || "TBD";
    if (team?.logoUrl) {
        return <img src={team.logoUrl} alt={name} style={{ width: size, height: size }} className="rounded-full object-cover shrink-0" />;
    }
    const [bg, fg] = PALETTE[hash(name) % PALETTE.length];
    const label = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    return (
        <div
            className="rounded-full flex items-center justify-center font-bold shrink-0"
            style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.34 }}
        >
            {label}
        </div>
    );
};

const idOf = (v) => String(v && typeof v === "object" ? v._id : v ?? "");
const venueLabel = (v) => {
    if (!v) return "Venue TBD";
    const city = v.address && typeof v.address === "object" ? v.address.city : "";
    return [v.name, city].filter(Boolean).join(", ");
};
const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
const fmtTime = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
const fmtDateTime = (d) => `${fmtDate(d)}, ${fmtTime(d)}`;
const dateParts = (d) => {
    const x = new Date(d);
    return {
        day: x.toLocaleDateString("en-IN", { day: "2-digit" }),
        month: x.toLocaleDateString("en-IN", { month: "short" }).toUpperCase(),
    };
};
const toLocalInput = (d) => {
    const x = new Date(d);
    const p = (n) => String(n).padStart(2, "0");
    return `${x.getFullYear()}-${p(x.getMonth() + 1)}-${p(x.getDate())}T${p(x.getHours())}:${p(x.getMinutes())}`;
};
const matchTitle = (m) => `${m.teamA?.name} vs ${m.teamB?.name}`;
const matchMeta = (m) => `${m.tournamentId?.name || "Tournament"} • Match ${m.matchNumber ?? "-"}`;
const isUpcomingStatus = (s) => s === "scheduled" || s === "toss_done";

const StatusBadge = ({ status }) => (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS_STYLE[status] || "bg-gray-100 text-gray-500"}`}>
        {STATUS_LABEL[status] || status}
    </span>
);

const MatchCell = ({ m }) => (
    <div className="flex items-center gap-2 whitespace-nowrap">
        <TeamCrest team={m.teamA} size={22} />
        <span className="text-gray-800">{m.teamA?.name}</span>
        <span className="text-gray-400 text-xs">vs</span>
        <TeamCrest team={m.teamB} size={22} />
        <span className="text-gray-800">{m.teamB?.name}</span>
    </div>
);

const IconBtn = ({ title, onClick, tone = "default", children }) => (
    <button
        title={title}
        onClick={onClick}
        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
            tone === "danger" ? "text-gray-400 hover:bg-rose-50 hover:text-rose-500"
            : tone === "primary" ? "text-gray-400 hover:bg-indigo-50 hover:text-[#4F46E5]"
            : "text-gray-400 hover:bg-gray-100"
        }`}
    >
        {children}
    </button>
);

/* ------------------------------ table columns ----------------------------- */

const dateCol = { h: "DATE", cell: (m) => <span className="text-gray-500 whitespace-nowrap">{fmtDate(m.scheduledAt)}</span> };
const dateTimeCol = { h: "DATE & TIME", cell: (m) => <span className="text-gray-500 whitespace-nowrap">{fmtDateTime(m.scheduledAt)}</span> };
const matchCol = { h: "MATCH", cell: (m) => <MatchCell m={m} /> };
const tournamentCol = { h: "TOURNAMENT", cell: (m) => <span className="text-gray-600 whitespace-nowrap">{m.tournamentId?.name || "-"}</span> };
const venueCol = { h: "VENUE", cell: (m) => <span className="text-gray-500 whitespace-nowrap">{venueLabel(m.venueId)}</span> };
const statusCol = { h: "STATUS", cell: (m) => <StatusBadge status={m.status} /> };

const COLUMNS = {
    upcoming: [
        dateTimeCol, matchCol, tournamentCol, venueCol,
        { h: "SCORER", cell: (m) => <span className="text-gray-600 whitespace-nowrap">{m.scorerId?.name || "Not assigned"}</span> },
        { h: "OVERS", cell: (m) => <span className="text-gray-600">{m.overs ? `${m.format} • ${m.overs}` : m.format}</span> },
        statusCol,
    ],
    completed: [
        dateCol, matchCol,
        { h: "RESULT", cell: (m) => (
            <span className="text-[#4F46E5] font-medium whitespace-nowrap">
                {m.result?.summary || (m.result?.isTie ? "Tied" : m.result?.isNoResult ? "No result" : "-")}
            </span>
        ) },
        { h: "WINNER", cell: (m) => m.result?.winner ? (
            <div className="flex items-center gap-2 whitespace-nowrap">
                <TeamCrest team={m.result.winner} size={20} />
                <span className="text-gray-800">{m.result.winner.name}</span>
            </div>
        ) : <span className="text-gray-400">-</span> },
        { h: "MARGIN", cell: (m) => <span className="text-gray-600 whitespace-nowrap">{m.result?.margin || "-"}</span> },
        venueCol,
        { h: "PLAYER OF THE MATCH", cell: (m) => {
            const u = m.playerOfMatch?.player?.userId;
            return u ? (
                <div className="whitespace-nowrap">
                    <div className="text-gray-800 font-medium">{u.name}</div>
                    <div className="text-xs text-gray-400">{m.playerOfMatch?.summary}</div>
                </div>
            ) : <span className="text-gray-400">-</span>;
        } },
    ],
    cancelled: [
        dateTimeCol, matchCol, tournamentCol, venueCol, statusCol,
        { h: "REASON", cell: (m) => <span className="text-gray-500">{m.cancelReason || "-"}</span> },
    ],
};

/* ------------------------------ matches table ----------------------------- */

const MatchesTable = ({ status, title, refreshKey, onView, onEdit, onCancel }) => {
    const dispatch = useAppDispatch();
    const { items, total, loading } = useAppSelector((s) => s.match.lists.table);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        dispatch(fetchMatches({ key: "table", params: { status, page, limit: perPage } }))
            .unwrap()
            .catch((err) => toast.error(typeof err === "string" ? err : "Failed to load matches"));
    }, [dispatch, status, page, perPage, refreshKey]);

    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const from = total ? (page - 1) * perPage + 1 : 0;
    const to = Math.min(page * perPage, total);
    useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

    const pageNumbers = useMemo(() => {
        const set = new Set([1, totalPages, page - 1, page, page + 1]);
        const list = [...set].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
        const out = [];
        list.forEach((p, i) => {
            if (i && p - list[i - 1] > 1) out.push(`gap-${p}`);
            out.push(p);
        });
        return out;
    }, [page, totalPages]);

    const cols = COLUMNS[status];

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            </div>
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-sm min-w-[1000px]">
                    <thead>
                        <tr className="text-left text-[11px] tracking-wide text-gray-400 border-b border-gray-100">
                            {cols.map((c, i) => (
                                <th key={c.h} className={`font-medium py-3 ${i === 0 ? "px-5" : "px-3"}`}>{c.h}</th>
                            ))}
                            <th className="font-medium px-5 py-3 text-right">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((m) => (
                            <tr key={m._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                                {cols.map((c, i) => (
                                    <td key={c.h} className={`py-3 ${i === 0 ? "px-5" : "px-3"}`}>{c.cell(m)}</td>
                                ))}
                                <td className="px-5 py-3">
                                    <div className="flex items-center justify-end gap-1">
                                        {status === "completed" ? (
                                            <IconBtn title="Match details" tone="primary" onClick={() => onView(m)}><FileText size={15} /></IconBtn>
                                        ) : (
                                            <IconBtn title="View details" onClick={() => onView(m)}><Eye size={15} /></IconBtn>
                                        )}
                                        {m.status === "scheduled" && (
                                            <IconBtn title="Edit" tone="primary" onClick={() => onEdit(m)}><Pencil size={15} /></IconBtn>
                                        )}
                                        {isUpcomingStatus(m.status) && (
                                            <IconBtn title="Cancel match" tone="danger" onClick={() => onCancel(m)}><Ban size={15} /></IconBtn>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan={cols.length + 1} className="px-5 py-8 text-center text-sm text-gray-400">
                                    {loading ? "Loading matches..." : `No ${status} matches yet.`}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">Showing {from} to {to} of {total} matches</span>
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="relative">
                        <select
                            value={perPage}
                            onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                            className="h-9 pl-3 pr-8 rounded-lg border border-gray-200 text-xs text-gray-600 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                        >
                            <option value={10}>10 per page</option>
                            <option value={25}>25 per page</option>
                            <option value={50}>50 per page</option>
                        </select>
                        <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
                    >
                        <ChevronLeft size={15} />
                    </button>
                    {pageNumbers.map((p) =>
                        typeof p === "number" ? (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${page === p ? "bg-[#4F46E5] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                            >
                                {p}
                            </button>
                        ) : (
                            <span key={p} className="w-8 h-8 flex items-center justify-center text-gray-400 text-xs">…</span>
                        )
                    )}
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
                    >
                        <ChevronRight size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ------------------------- live + upcoming sections ------------------------ */

const LiveCard = ({ m, onView }) => (
    <div className="rounded-xl p-4 text-white" style={{ background: "linear-gradient(160deg, #0B0F19, #111827)" }}>
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                    {m.status === "innings_break" ? "Innings break" : "Live"}
                </span>
                <span className="text-xs text-gray-300">{matchMeta(m)}</span>
            </div>
            <button
                onClick={() => onView(m)}
                className="text-xs font-medium border border-white/20 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors shrink-0"
            >
                View Details
            </button>
        </div>

        <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex flex-col items-center gap-2 flex-1">
                <TeamCrest team={m.teamA} size={48} />
                <div className="text-sm font-medium text-center">{m.teamA?.name}</div>
            </div>
            <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-xs text-gray-300 shrink-0">VS</div>
            <div className="flex flex-col items-center gap-2 flex-1">
                <TeamCrest team={m.teamB} size={48} />
                <div className="text-sm font-medium text-center">{m.teamB?.name}</div>
            </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-300 border-t border-white/10 pt-3">
            <span className="flex items-center gap-1"><MapPin size={11} />{venueLabel(m.venueId)}</span>
            <span className="flex items-center gap-1"><UserRound size={11} />{m.scorerId?.name || "No scorer assigned"}</span>
            <span>{m.overs ? `${m.format} • ${m.overs} overs` : m.format}</span>
        </div>
        {/* Live score, batters, bowlers and last 6 balls plug in here once Innings / ball data exists */}
        <p className="mt-3 text-xs text-gray-400">Live score appears here once the scorer starts recording balls.</p>
    </div>
);

const LiveSection = ({ list, onView, className = "" }) => (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
            <h2 className="font-semibold text-gray-900">Live Matches</h2>
            {list.items.length > 0 && (
                <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    LIVE
                </span>
            )}
        </div>
        {list.items.length ? (
            <div className="flex flex-col gap-3">
                {list.items.map((m) => <LiveCard key={m._id} m={m} onView={onView} />)}
            </div>
        ) : (
            <p className="py-10 text-center text-sm text-gray-400">
                {list.loading ? "Loading..." : "No live matches right now."}
            </p>
        )}
    </div>
);

const UpcomingPanel = ({ list, onView, onViewAll, className = "" }) => (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">Upcoming Matches</h2>
            <button onClick={onViewAll} className="text-sm text-[#4F46E5] hover:underline">View All</button>
        </div>
        {list.items.length ? (
            <div className="flex flex-col gap-3">
                {list.items.map((m) => {
                    const { day, month } = dateParts(m.scheduledAt);
                    const overdue = new Date(m.scheduledAt) < new Date();
                    return (
                        <div key={m._id} className="border border-gray-100 rounded-lg p-3">
                            <div className="flex items-start gap-3">
                                <div className="flex flex-col items-center justify-center w-11 shrink-0 bg-gray-50 rounded-lg py-1.5">
                                    <span className="text-sm font-bold text-gray-900">{day}</span>
                                    <span className="text-[9px] text-gray-400">{month}</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 text-sm text-gray-800 mb-1 flex-wrap">
                                        <TeamCrest team={m.teamA} size={20} />
                                        <span className="font-medium truncate">{m.teamA?.name}</span>
                                        <span className="text-gray-400 text-xs">vs</span>
                                        <TeamCrest team={m.teamB} size={20} />
                                        <span className="font-medium truncate">{m.teamB?.name}</span>
                                    </div>
                                    <div className="text-xs text-gray-400">{matchMeta(m)}</div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                        <MapPin size={11} />
                                        {venueLabel(m.venueId)}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2 shrink-0">
                                    <span className="text-xs text-gray-500 whitespace-nowrap">{fmtTime(m.scheduledAt)}</span>
                                    {overdue && <span className="text-[10px] font-semibold text-red-500">Overdue</span>}
                                    <button
                                        onClick={() => onView(m)}
                                        className="text-xs font-medium text-[#4F46E5] border border-[#4F46E5]/30 rounded-lg px-2.5 py-1 hover:bg-[#EEF2FF] transition-colors whitespace-nowrap"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        ) : (
            <p className="py-10 text-center text-sm text-gray-400">
                {list.loading ? "Loading..." : "No upcoming matches. Schedule one to get started."}
            </p>
        )}
    </div>
);

/* ------------------------------ schedule form ----------------------------- */

const Label = ({ children }) => (
    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">{children}</label>
);

const ScheduleForm = ({ options, initial, saving, onSubmit, onClose }) => {
    const isEdit = !!initial;
    const [f, setF] = useState(() => ({
        tournamentId: idOf(initial?.tournamentId),
        teamA: idOf(initial?.teamA),
        teamB: idOf(initial?.teamB),
        scheduledAt: initial?.scheduledAt ? toLocalInput(initial.scheduledAt) : "",
        venueId: idOf(initial?.venueId),
        scorerId: idOf(initial?.scorerId),
        format: initial?.format || "T20",
        overs: initial ? initial.overs ?? "" : 20,
    }));
    const [error, setError] = useState("");
    const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

    const onTournament = (id) => {
        const t = options.tournaments.find((x) => x._id === id);
        setF((p) => ({
            ...p,
            tournamentId: id,
            ...(t?.format && FORMATS.includes(t.format) && { format: t.format, overs: DEFAULT_OVERS[t.format] }),
            ...(t?.overs && { overs: t.overs }),
        }));
    };
    const onFormat = (fmt) => setF((p) => ({ ...p, format: fmt, overs: DEFAULT_OVERS[fmt] }));

    const submit = () => {
        if (!f.tournamentId) return setError("Select a tournament");
        if (!f.teamA || !f.teamB) return setError("Select both teams");
        if (f.teamA === f.teamB) return setError("Team A and Team B must be different");
        if (!f.scheduledAt) return setError("Pick a date and time");
        const changedDate = !isEdit || toLocalInput(initial.scheduledAt) !== f.scheduledAt;
        if (changedDate && new Date(f.scheduledAt) <= new Date()) return setError("Match time must be in the future");
        if (f.format !== "Test" && !(Number(f.overs) >= 1)) return setError("Enter the number of overs");
        setError("");
        onSubmit({
            tournamentId: f.tournamentId,
            teamA: f.teamA,
            teamB: f.teamB,
            venueId: f.venueId,        // "" clears it
            scorerId: f.scorerId,
            format: f.format,
            overs: f.format === "Test" ? undefined : Number(f.overs),
            scheduledAt: new Date(f.scheduledAt).toISOString(),
        });
    };

    return (
        <div className="w-full min-w-[min(90vw,560px)] max-w-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{isEdit ? "Edit Match" : "Schedule New Match"}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                    <Label>Tournament</Label>
                    <select value={f.tournamentId} disabled={isEdit} onChange={(e) => onTournament(e.target.value)} className={inputCls}>
                        <option value="">Select tournament</option>
                        {options.tournaments.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
                    </select>
                </div>

                <div>
                    <Label>Team A</Label>
                    <select value={f.teamA} onChange={(e) => set("teamA", e.target.value)} className={inputCls}>
                        <option value="">Select team</option>
                        {options.teams.filter((t) => t._id !== f.teamB).map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
                    </select>
                </div>
                <div>
                    <Label>Team B</Label>
                    <select value={f.teamB} onChange={(e) => set("teamB", e.target.value)} className={inputCls}>
                        <option value="">Select team</option>
                        {options.teams.filter((t) => t._id !== f.teamA).map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
                    </select>
                </div>

                <div>
                    <Label>Date & time</Label>
                    <input
                        type="datetime-local"
                        value={f.scheduledAt}
                        min={toLocalInput(new Date())}
                        onChange={(e) => set("scheduledAt", e.target.value)}
                        className={inputCls}
                    />
                </div>
                <div>
                    <Label>Venue (optional)</Label>
                    <select value={f.venueId} onChange={(e) => set("venueId", e.target.value)} className={inputCls}>
                        <option value="">To be decided</option>
                        {options.venues.map((v) => <option key={v._id} value={v._id}>{venueLabel(v)}</option>)}
                    </select>
                </div>

                <div>
                    <Label>Format</Label>
                    <select value={f.format} onChange={(e) => onFormat(e.target.value)} className={inputCls}>
                        {FORMATS.map((x) => <option key={x} value={x}>{x}</option>)}
                    </select>
                </div>
                <div>
                    <Label>Overs</Label>
                    <input
                        type="number" min={1} max={50}
                        value={f.overs}
                        disabled={f.format === "Test"}
                        placeholder={f.format === "Test" ? "Not limited" : "Overs"}
                        onChange={(e) => set("overs", e.target.value)}
                        className={inputCls}
                    />
                </div>

                <div className="sm:col-span-2">
                    <Label>Scorer (optional)</Label>
                    <select value={f.scorerId} onChange={(e) => set("scorerId", e.target.value)} className={inputCls}>
                        <option value="">Assign later</option>
                        {options.scorers.map((s) => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
                    </select>
                </div>
            </div>

            {error && <p className="mt-3 text-sm text-rose-500">{error}</p>}

            <div className="flex items-center justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
                <button onClick={onClose} className="h-10 px-5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                    Cancel
                </button>
                <button
                    onClick={submit}
                    disabled={saving}
                    className="h-10 px-5 rounded-lg bg-[#4F46E5] text-white text-sm font-semibold hover:bg-[#4338CA] transition-colors disabled:opacity-50"
                >
                    {saving ? "Saving..." : isEdit ? "Save Changes" : "Schedule Match"}
                </button>
            </div>
        </div>
    );
};

/* ------------------------------ details modal ----------------------------- */

const Row = ({ label, value }) => (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
        <span className="text-xs uppercase tracking-wide text-gray-400 shrink-0">{label}</span>
        <span className="text-sm text-gray-800 text-right">{value || <span className="text-gray-400">-</span>}</span>
    </div>
);

const MatchDetails = ({ m, onClose, onEdit, onCancel }) => (
    <div className="w-full min-w-[min(90vw,520px)] max-w-lg">
        <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500">{matchMeta(m)}</span>
            <StatusBadge status={m.status} />
        </div>

        <div className="flex items-center justify-between gap-2 mb-5">
            <div className="flex flex-col items-center gap-2 flex-1">
                <TeamCrest team={m.teamA} size={52} />
                <span className="text-sm font-semibold text-gray-900 text-center">{m.teamA?.name}</span>
            </div>
            <span className="text-xs text-gray-400">VS</span>
            <div className="flex flex-col items-center gap-2 flex-1">
                <TeamCrest team={m.teamB} size={52} />
                <span className="text-sm font-semibold text-gray-900 text-center">{m.teamB?.name}</span>
            </div>
        </div>

        <div className="rounded-xl border border-gray-100 px-4 py-2">
            <Row label="Date & time" value={fmtDateTime(m.scheduledAt)} />
            <Row label="Venue" value={venueLabel(m.venueId)} />
            <Row label="Format" value={m.overs ? `${m.format} • ${m.overs} overs` : m.format} />
            <Row label="Scorer" value={m.scorerId?.name} />
            {m.toss?.winner && (
                <Row label="Toss" value={`${m.toss.winner.name} chose to ${m.toss.decision}`} />
            )}
            {m.status === "completed" && (
                <Row label="Result" value={[m.result?.summary, m.result?.margin].filter(Boolean).join(" • ") || (m.result?.isTie ? "Tied" : m.result?.isNoResult ? "No result" : "")} />
            )}
            {(m.status === "cancelled" || m.status === "abandoned") && m.cancelReason && (
                <Row label="Reason" value={m.cancelReason} />
            )}
        </div>

        <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
                {m.status === "scheduled" && (
                    <button onClick={() => onEdit(m)} className="flex items-center gap-1.5 h-10 px-4 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        <Pencil size={14} /> Edit
                    </button>
                )}
                {isUpcomingStatus(m.status) && (
                    <button onClick={() => onCancel(m)} className="flex items-center gap-1.5 h-10 px-4 rounded-lg border border-rose-200 text-sm font-medium text-rose-500 hover:bg-rose-50 transition-colors">
                        <Ban size={14} /> Cancel match
                    </button>
                )}
            </div>
            <button onClick={onClose} className="h-10 px-5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Close
            </button>
        </div>
    </div>
);

/* ---------------------------------- page ---------------------------------- */

const Matches = () => {
    const dispatch = useAppDispatch();
    const { lists, stats, options } = useAppSelector((s) => s.match);
    console.log({lists, stats, options})

    const [activeTab, setActiveTab] = useState("All Matches");
    const [refreshKey, setRefreshKey] = useState(0);
    const [scheduleModal, setScheduleModal] = useState(null); // { mode: 'create' } | { mode: 'edit', match }
    const [detailsMatch, setDetailsMatch] = useState(null);
    const [saving, setSaving] = useState(false);

    const refresh = () => {
        setRefreshKey((n) => n + 1);
        dispatch(fetchMatchStats());
    };
    const onLoadError = (err) => toast.error(typeof err === "string" ? err : "Failed to load matches");

    useEffect(() => { dispatch(fetchMatchStats()); }, [dispatch]);

    const showLive = activeTab === "All Matches" || activeTab === "Live";
    const showUpcomingPanel = activeTab === "All Matches";

    useEffect(() => {
        if (!showLive) return;
        dispatch(fetchMatches({ key: "live", params: { status: "live", limit: 10 } })).unwrap().catch(onLoadError);
    }, [dispatch, showLive, refreshKey]);

    useEffect(() => {
        if (!showUpcomingPanel) return;
        dispatch(fetchMatches({ key: "upcoming", params: { status: "upcoming", limit: 5 } })).unwrap().catch(onLoadError);
    }, [dispatch, showUpcomingPanel, refreshKey]);

    const val = (n) => (stats ? n ?? 0 : "–");
    const statCards = [
        { label: "Total Matches", value: val(stats?.total), sub: "All time", icon: Trophy, bg: "#EEF2FF", fg: "#4F46E5" },
        { label: "Live Matches", value: val(stats?.live), sub: "Ongoing Now", icon: Radio, bg: "#FDF2F8", fg: "#DB2777" },
        { label: "Upcoming Matches", value: val(stats?.upcoming), sub: stats ? `${stats.upcomingNext7Days} in next 7 days` : "Next 7 Days", icon: CalendarDays, bg: "#EFF6FF", fg: "#2563EB" },
        { label: "Completed Matches", value: val(stats?.completed), sub: "Played", icon: CheckCircle2, bg: "#ECFDF5", fg: "#16A34A" },
        { label: "Cancelled Matches", value: val(stats?.cancelled), sub: "Cancelled or abandoned", icon: XCircle, bg: "#F3F4F6", fg: "#6B7280" },
    ];

    const openSchedule = (match = null) => {
        setDetailsMatch(null);
        setScheduleModal(match ? { mode: "edit", match } : { mode: "create" });
        dispatch(fetchMatchOptions());
    };

    const handleSave = async (payload) => {
        try {
            setSaving(true);
            if (scheduleModal.mode === "edit") {
                await dispatch(updateMatch({ id: scheduleModal.match._id, payload })).unwrap();
                toast.success("Match updated");
            } else {
                await dispatch(createMatch(payload)).unwrap();
                toast.success("Match scheduled");
            }
            setScheduleModal(null);
            refresh();
        } catch (err) {
            toast.error(typeof err === "string" ? err : "Failed to save match");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = async (m) => {
        const reason = window.prompt(`Cancel ${matchTitle(m)}? Add a reason (optional):`, "");
        if (reason === null) return false;
        try {
            await dispatch(cancelMatch({ id: m._id, reason })).unwrap();
            toast.success("Match cancelled");
            setDetailsMatch(null);
            refresh();
            return true;
        } catch (err) {
            toast.error(typeof err === "string" ? err : "Failed to cancel match");
            return false;
        }
    };

    const tableProps = { refreshKey, onView: setDetailsMatch, onEdit: openSchedule, onCancel: handleCancel };

    return (
        <div className="h-screen overflow-y-auto no-scrollbar bg-[#F7F7F9]">
            <style>{`
                .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

            <div className="p-4 sm:p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Matches</h1>
                    <p className="text-sm text-gray-500 mt-1">View, manage and track all tournament matches</p>
                </div>

                {/* Tabs + Schedule button */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-6">
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 overflow-x-auto no-scrollbar w-full lg:w-auto">
                        {TABS.map((t) => {
                            const isActive = activeTab === t.label;
                            return (
                                <button
                                    key={t.label}
                                    onClick={() => setActiveTab(t.label)}
                                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${isActive ? "bg-[#EEF2FF] text-[#4F46E5]" : "text-gray-500 hover:bg-gray-50"}`}
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
                    <button
                        onClick={() => openSchedule()}
                        className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0"
                    >
                        <Plus size={16} />
                        Schedule New Match
                    </button>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    {statCards.map((s, i) => (
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

                {/* Tab content */}
                {activeTab === "All Matches" && (
                    <>
                        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mb-6 items-start">
                            <LiveSection list={lists.live} onView={setDetailsMatch} className="xl:col-span-3" />
                            <UpcomingPanel list={lists.upcoming} onView={setDetailsMatch} onViewAll={() => setActiveTab("Upcoming")} className="xl:col-span-2" />
                        </div>
                        <MatchesTable key="completed" status="completed" title="Completed Matches" {...tableProps} />
                    </>
                )}
                {activeTab === "Live" && <div className="mb-6"><LiveSection list={lists.live} onView={setDetailsMatch} /></div>}
                {activeTab === "Upcoming" && <MatchesTable key="upcoming" status="upcoming" title="Upcoming Matches" {...tableProps} />}
                {activeTab === "Completed" && <MatchesTable key="completed-tab" status="completed" title="Completed Matches" {...tableProps} />}
                {activeTab === "Cancelled" && <MatchesTable key="cancelled" status="cancelled" title="Cancelled Matches" {...tableProps} />}
            </div>

            {/* Schedule / edit modal */}
            <Modal open={!!scheduleModal} onClose={() => setScheduleModal(null)} islogin>
                {scheduleModal && (options ? (
                    <ScheduleForm
                        key={scheduleModal.mode === "edit" ? scheduleModal.match._id : "new"}
                        options={options}
                        initial={scheduleModal.mode === "edit" ? scheduleModal.match : null}
                        saving={saving}
                        onSubmit={handleSave}
                        onClose={() => setScheduleModal(null)}
                    />
                ) : (
                    <p className="py-10 px-8 text-sm text-gray-400">Loading form...</p>
                ))}
            </Modal>

            {/* Details modal */}
            <Modal open={!!detailsMatch} onClose={() => setDetailsMatch(null)} islogin>
                {detailsMatch && (
                    <MatchDetails
                        m={detailsMatch}
                        onClose={() => setDetailsMatch(null)}
                        onEdit={openSchedule}
                        onCancel={handleCancel}
                    />
                )}
            </Modal>
        </div>
    )
}

export default Matches