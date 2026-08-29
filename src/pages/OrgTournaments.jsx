import React, { useState } from 'react'
import {
    Trophy,
    PlayCircle,
    CalendarDays,
    CheckCircle2,
    XCircle,
    Users,
    Search,
    SlidersHorizontal,
    ChevronDown,
    Plus,
    MapPin,
    Eye,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    Shield,
} from 'lucide-react'
import Modal from '../model/Modal';
import CreateTournament from '../components/CreateTournament';

const tabs = [
    { label: "All Tournaments", icon: SlidersHorizontal },
    { label: "Live", icon: "dot", dotColor: "#DC2626" },
    { label: "Upcoming", icon: CalendarDays },
    { label: "Completed", icon: CheckCircle2 },
    { label: "Cancelled", icon: XCircle },
];

const stats = [
    { label: "Total Tournaments", value: "24", sub: "This Season", icon: Trophy, bg: "#EEF2FF", fg: "#4F46E5" },
    { label: "Live Tournaments", value: "5", sub: "Ongoing Now", icon: PlayCircle, bg: "#ECFDF5", fg: "#16A34A" },
    { label: "Upcoming Tournaments", value: "7", sub: "Starting Soon", icon: CalendarDays, bg: "#FFF7ED", fg: "#EA580C" },
    { label: "Completed Tournaments", value: "12", sub: "This Season", icon: CheckCircle2, bg: "#EFF6FF", fg: "#2563EB" },
    { label: "Total Participants", value: "1,248", sub: "Across Tournaments", icon: Users, bg: "#FDF2F8", fg: "#DB2777" },
];

const featuredTournaments = [
    {
        status: "LIVE",
        statusColor: "#DC2626",
        name: "Naeem Premier League 2026",
        dates: "May 10 – May 30, 2026",
        venue: "Central Ground, City",
        teams: 16,
        matches: 32,
        prize: "₹1,00,000",
        crest: { bg: "#F2B84B", fg: "#7A4B00", label: "RL" },
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=60",
        footer: { label: "Live", color: "#16A34A", dot: true },
    },
    {
        status: "UPCOMING",
        statusColor: "#4F46E5",
        name: "City Champions Cup",
        dates: "Jun 05 – Jun 28, 2026",
        venue: "City Stadium, City",
        teams: 32,
        matches: 64,
        prize: "₹75,000",
        crest: { bg: "#DC2626", fg: "#FFFFFF", label: "CC" },
        image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=900&q=60",
        footer: { label: "Starts in 5 Days", color: "#4F46E5", dot: false },
    },
    {
        status: "UPCOMING",
        statusColor: "#4F46E5",
        name: "Summer Super Cup",
        dates: "Jun 15 – Jul 05, 2026",
        venue: "Green Field, City",
        teams: 24,
        matches: 48,
        prize: "₹50,000",
        crest: { bg: "#1E3A8A", fg: "#FFFFFF", label: "SC" },
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=60",
        footer: { label: "Starts in 15 Days", color: "#4F46E5", dot: false },
    },
    {
        status: "COMPLETED",
        statusColor: "#4B5563",
        name: "Winter Challenge 2026",
        dates: "Feb 10 – Mar 02, 2026",
        venue: "Sports Complex, City",
        teams: 20,
        matches: 40,
        prize: "₹30,000",
        crest: { bg: "#6D28D9", fg: "#FFFFFF", label: "WC" },
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=900&q=60",
        footer: { label: "Completed", color: "#16A34A", dot: true },
    },
];

const tournamentList = [
    { crest: { bg: "#F2B84B", fg: "#7A4B00", label: "RL" }, name: "Naeem Premier League 2026", dates: "May 10 – May 30, 2026", venue: "Central Ground, City", teams: 16, matches: 32, prize: "₹1,00,000", status: "Live", statusBg: "#DCFCE7", statusFg: "#16A34A" },
    { crest: { bg: "#DC2626", fg: "#FFFFFF", label: "CC" }, name: "City Champions Cup", dates: "Jun 05 – Jun 28, 2026", venue: "City Stadium, City", teams: 32, matches: 64, prize: "₹75,000", status: "Upcoming", statusBg: "#EEF2FF", statusFg: "#4F46E5" },
    { crest: { bg: "#1E3A8A", fg: "#FFFFFF", label: "SC" }, name: "Summer Super Cup", dates: "Jun 15 – Jul 05, 2026", venue: "Green Field, City", teams: 24, matches: 48, prize: "₹50,000", status: "Upcoming", statusBg: "#EEF2FF", statusFg: "#4F46E5" },
    { crest: { bg: "#059669", fg: "#FFFFFF", label: "DL" }, name: "District Premier League", dates: "Jul 10 – Aug 10, 2026", venue: "District Ground, City", teams: 40, matches: 80, prize: "₹1,50,000", status: "Upcoming", statusBg: "#EEF2FF", statusFg: "#4F46E5" },
    { crest: { bg: "#15803D", fg: "#FFFFFF", label: "MC" }, name: "Monsoon Challenge", dates: "Aug 15 – Sep 05, 2026", venue: "Sports Complex, City", teams: 20, matches: 40, prize: "₹30,000", status: "Upcoming", statusBg: "#EEF2FF", statusFg: "#4F46E5" },
    { crest: { bg: "#6D28D9", fg: "#FFFFFF", label: "WC" }, name: "Winter Challenge 2026", dates: "Feb 10 – Mar 02, 2026", venue: "Sports Complex, City", teams: 20, matches: 40, prize: "₹30,000", status: "Completed", statusBg: "#DCFCE7", statusFg: "#16A34A" },
];

const Crest = ({ crest, size = 40 }) => (
    <div
        className="rounded-full flex items-center justify-center font-bold shrink-0 ring-2 ring-white"
        style={{ width: size, height: size, background: crest.bg, color: crest.fg, fontSize: size * 0.32 }}
    >
        {crest.label}
    </div>
);

const OrgTournaments = () => {
    const [activeTab, setActiveTab] = useState("All Tournaments");
    const [search, setSearch] = useState("");
    const [listSearch, setListSearch] = useState("");
    const [sortOpen, setSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState("Newest First");
    const [openMenu, setOpenMenu] = useState(null);
    const [isModelOpenTournament, setIsModelOpenTournament] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const sortOptions = ["Newest First", "Oldest First", "Name A-Z", "Prize Pool"];

    return (
        <>
        <div className="min-h-screen bg-[#F7F7F9] p-4 sm:p-6 overflow-y-auto no-scrollbar">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tournaments</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and organize tournaments seamlessly</p>
                </div>
            </div>

            {/* Tabs + Create button */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-6">
                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 overflow-x-auto no-scrollbar w-full lg:w-auto">
                    {tabs.map((t) => {
                        const isActive = activeTab === t.label;
                        return (
                            <button
                                key={t.label}
                                onClick={() => setActiveTab(t.label)}
                                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${isActive ? "bg-[#EEF2FF] text-[#4F46E5]" : "text-gray-500 hover:bg-gray-50"
                                    }`}
                            >
                                {t.icon === "dot" ? (
                                    <span className="w-2 h-2 rounded-full" style={{ background: t.dotColor }}></span>
                                ) : (
                                    <t.icon size={15} />
                                )}
                                {t.label}
                            </button>
                        );
                    })}
                </div>
                <button onClick={() =>{
                    setIsModelOpenTournament(true)
                }} className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0">
                    <Plus size={16} />
                    Create Tournament
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
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

            {/* All Tournaments header row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">All Tournaments</h2>
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="relative">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search tournaments..."
                            className="h-10 pl-9 pr-3 w-48 sm:w-56 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-1.5 h-10 px-3.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                        <SlidersHorizontal size={15} />
                        Filters
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setSortOpen(!sortOpen)}
                            className="flex items-center gap-1.5 h-10 px-3.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Sort By
                            <ChevronDown size={15} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                        </button>
                        {sortOpen && (
                            <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                                {sortOptions.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => { setSortBy(opt); setSortOpen(false); }}
                                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${sortBy === opt ? "text-[#4F46E5] font-medium" : "text-gray-600"
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

            {/* Featured tournament cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {featuredTournaments.map((t, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                        <div className="relative h-32">
                            <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                            <span
                                className="absolute top-2.5 left-2.5 text-[10px] font-bold text-white px-2 py-1 rounded"
                                style={{ background: t.statusColor }}
                            >
                                {t.status}
                            </span>
                            <div className="absolute -bottom-5 left-4">
                                <Crest crest={t.crest} />
                            </div>
                        </div>
                        <div className="p-4 pt-7 flex flex-col flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1.5 truncate">{t.name}</h3>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                                <CalendarDays size={13} />
                                {t.dates}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                                <MapPin size={13} />
                                {t.venue}
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center border-y border-gray-100 py-3 mb-3">
                                <div>
                                    <div className="text-sm font-bold text-gray-900">{t.teams}</div>
                                    <div className="text-[10px] text-gray-400">TEAMS</div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">{t.matches}</div>
                                    <div className="text-[10px] text-gray-400">MATCHES</div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">{t.prize}</div>
                                    <div className="text-[10px] text-gray-400">PRIZE POOL</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2 mt-auto">
                                <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: t.footer.color }}>
                                    {t.footer.dot && <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.footer.color }}></span>}
                                    {t.footer.label}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <button className="text-xs font-medium text-[#4F46E5] border border-[#4F46E5]/30 rounded-lg px-3 py-1.5 hover:bg-[#EEF2FF] transition-colors">
                                        View Details
                                    </button>
                                    <div className="relative">
                                        <button
                                            onClick={() => setOpenMenu(openMenu === i ? null : i)}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"
                                        >
                                            <MoreVertical size={15} />
                                        </button>
                                        {openMenu === i && (
                                            <div className="absolute right-0 bottom-9 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                                                <button className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">Edit</button>
                                                <button className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">Duplicate</button>
                                                <button className="w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-gray-50">Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tournament list table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
                <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Tournament List</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[760px]">
                        <thead>
                            <tr className="text-left text-[11px] tracking-wide text-gray-400 border-b border-gray-100">
                                <th className="font-medium px-5 py-3">TOURNAMENT</th>
                                <th className="font-medium px-3 py-3">DATES</th>
                                <th className="font-medium px-3 py-3">VENUE</th>
                                <th className="font-medium px-3 py-3">TEAMS</th>
                                <th className="font-medium px-3 py-3">MATCHES</th>
                                <th className="font-medium px-3 py-3">PRIZE POOL</th>
                                <th className="font-medium px-3 py-3">STATUS</th>
                                <th className="font-medium px-5 py-3 text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tournamentList
                                .filter((row) => row.name.toLowerCase().includes(listSearch.toLowerCase()))
                                .map((row, i) => (
                                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <Crest crest={row.crest} size={28} />
                                                <span className="text-gray-800 font-medium truncate">{row.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-gray-500 whitespace-nowrap">{row.dates}</td>
                                        <td className="px-3 py-3 text-gray-500 whitespace-nowrap">{row.venue}</td>
                                        <td className="px-3 py-3 text-gray-600">{row.teams}</td>
                                        <td className="px-3 py-3 text-gray-600">{row.matches}</td>
                                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{row.prize}</td>
                                        <td className="px-3 py-3">
                                            <span
                                                className="text-xs font-medium px-2.5 py-1 rounded-full"
                                                style={{ background: row.statusBg, color: row.statusFg }}
                                            >
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                                                    <Eye size={15} />
                                                </button>
                                                <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                                                    <MoreVertical size={15} />
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
                    <span className="text-xs text-gray-500">Showing 1 to 6 of 24 tournaments</span>
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
                        {[1, 2, 3].map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${page === p ? "bg-[#4F46E5] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage(Math.min(3, page + 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
                            disabled={page === 3}
                        >
                            <ChevronRight size={15} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Modal
        open={isModelOpenTournament}
        onClose={() => setIsModelOpenTournament(false)}
      >
        <CreateTournament />
      </Modal>
        </>
    )

}

export default OrgTournaments