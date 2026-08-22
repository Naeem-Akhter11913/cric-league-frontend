import React, { useState } from 'react'
import {
    Users2,
    UserCheck2,
    UserRound,
    PersonStanding,
    Search,
    SlidersHorizontal,
    ChevronDown,
    Plus,
    Eye,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    BadgeCheck,
} from 'lucide-react'
import Modal from '../model/Modal';
import AddPlayer from '../components/AddPlayer';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { registerUser } from '../store/action/auth.action';
import { teamColors, allPlayers, featuredPlayers,roleBadge,stats,tabs } from '../data/orgPlayer.data';

const TeamCrest = ({ name, size = 22 }) => {
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

const ratingColor = (r) => (r >= 650 ? "#16A34A" : r >= 600 ? "#CA8A04" : "#EA580C");

const OrgPlayers = () => {
    const dispatch = useAppDispatch();
    const { user, accessToken, status, error, sessionChecked } = useAppSelector(state => state.auth)
    const [activeTab, setActiveTab] = useState("All Players");
    const [search, setSearch] = useState("");
    const [listSearch, setListSearch] = useState("");
    const [sortOpen, setSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState("Rating: High to Low");
    const [openMenu, setOpenMenu] = useState(null);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "player"
    });

    const sortOptions = ["Rating: High to Low", "Rating: Low to High", "Name A-Z", "Most Matches"];

    const roleMap = {
        "Batsmen": "Batsman",
        "Bowlers": "Bowler",
        "All Rounders": "All Rounder",
        "Wicket Keepers": "Wicket Keeper",
    };

    const filteredList = allPlayers.filter((p) => {
        const matchesTab = activeTab === "All Players" ? true : p.role === roleMap[activeTab];
        const matchesSearch = p.name.toLowerCase().includes(listSearch.toLowerCase());
        return matchesTab && matchesSearch;
    });

    // console.log({user,accessToken,status,error,sessionChecked})
    const handleSubmit = async isClose => {
        try {
            if (formData.password !== formData.confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            const { confirmPassword, ...playerDetails } = formData;
            await dispatch(registerUser(playerDetails)).unwrap();
            if (isClose) setIsModalOpen(false);
            toast.success("Player Added Successfully!");
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div className="h-screen overflow-y-auto no-scrollbar bg-[#F7F7F9]">
            <style>{`
                .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

            <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Players</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage and view all registered players</p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0">
                        <Plus size={16} />
                        Add New Player
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

                {/* Tabs + search/filter row */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-5">
                    <div className="flex items-center gap-5 border-b border-gray-200 lg:border-0 w-full lg:w-auto overflow-x-auto no-scrollbar">
                        {tabs.map((t) => (
                            <button
                                key={t}
                                onClick={() => setActiveTab(t)}
                                className={`pb-2.5 lg:pb-0 text-sm font-medium whitespace-nowrap border-b-2 lg:border-0 transition-colors ${activeTab === t ? "text-[#4F46E5] border-[#4F46E5]" : "text-gray-500 border-transparent hover:text-gray-700"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="relative">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Search players..."
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
                                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
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

                {/* Featured player cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
                    {featuredPlayers.map((p, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                            <div className="relative h-40">
                                <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                                <span
                                    className="absolute top-2.5 left-2.5 text-[9px] font-bold text-white px-2 py-1 rounded uppercase"
                                    style={{ background: roleBadge[p.role] }}
                                >
                                    {p.role}
                                </span>
                                <div className="absolute -bottom-4 left-3">
                                    <TeamCrest name={p.team} size={30} />
                                </div>
                            </div>
                            <div className="p-3.5 pt-6 flex flex-col flex-1">
                                <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-1 truncate">
                                    {p.name}
                                    <BadgeCheck size={14} className="text-[#4F46E5] shrink-0" />
                                </h3>
                                <div className="text-xs text-gray-500 mb-3 truncate">{p.team}</div>
                                <div className="grid grid-cols-4 gap-1 text-center mb-3">
                                    {p.line.map(([label, val], j) => (
                                        <div key={j} className="min-w-0">
                                            <div className="text-[9px] text-gray-400">{label}</div>
                                            <div className="text-xs font-bold text-gray-900 truncate">{val}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-1.5 mt-auto">
                                    <button className="flex-1 text-xs font-medium text-[#4F46E5] border border-[#4F46E5]/30 rounded-lg px-3 py-2 hover:bg-[#EEF2FF] transition-colors">
                                        View Profile
                                    </button>
                                    <div className="relative">
                                        <button
                                            onClick={() => setOpenMenu(openMenu === i ? null : i)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"
                                        >
                                            <MoreVertical size={15} />
                                        </button>
                                        {openMenu === i && (
                                            <div className="absolute right-0 bottom-9 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                                                <button className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">Edit</button>
                                                <button className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">Message</button>
                                                <button className="w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-gray-50">Remove</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* All Players list */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
                    <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">All Players List</h2>
                    </div>
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-sm min-w-[1000px]">
                            <thead>
                                <tr className="text-left text-[11px] tracking-wide text-gray-400 border-b border-gray-100">
                                    <th className="font-medium px-5 py-3">PLAYER</th>
                                    <th className="font-medium px-3 py-3">TEAM</th>
                                    <th className="font-medium px-3 py-3">ROLE</th>
                                    <th className="font-medium px-3 py-3">MATCHES</th>
                                    <th className="font-medium px-3 py-3">RUNS</th>
                                    <th className="font-medium px-3 py-3">WICKETS</th>
                                    <th className="font-medium px-3 py-3">HS / BB</th>
                                    <th className="font-medium px-3 py-3">AVG</th>
                                    <th className="font-medium px-3 py-3">SR / ECON</th>
                                    <th className="font-medium px-3 py-3">RATING</th>
                                    <th className="font-medium px-3 py-3">STATUS</th>
                                    <th className="font-medium px-5 py-3 text-right">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredList.map((row, i) => (
                                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <img src={row.avatar} alt={row.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
                                                <span className="text-gray-800 font-medium truncate">{row.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <TeamCrest name={row.team} />
                                                <span className="text-gray-600 truncate">{row.team}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{row.role}</td>
                                        <td className="px-3 py-3 text-gray-600">{row.matches}</td>
                                        <td className="px-3 py-3 text-gray-600">{row.runs}</td>
                                        <td className="px-3 py-3 text-gray-600">{row.wickets ?? "–"}</td>
                                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{row.hsBb}</td>
                                        <td className="px-3 py-3 text-gray-600">{row.avg}</td>
                                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{row.srEcon}</td>
                                        <td className="px-3 py-3 font-semibold" style={{ color: ratingColor(row.rating) }}>{row.rating}</td>
                                        <td className="px-3 py-3">
                                            <span
                                                className="flex items-center gap-1.5 text-xs font-medium w-fit"
                                                style={{ color: row.status === "Active" ? "#16A34A" : "#EA580C" }}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: row.status === "Active" ? "#16A34A" : "#EA580C" }}></span>
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
                                {filteredList.length === 0 && (
                                    <tr>
                                        <td colSpan={12} className="px-5 py-8 text-center text-sm text-gray-400">
                                            No players found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500">Showing 1 to 6 of 256 players</span>
                        <div className="flex items-center gap-2 flex-wrap">
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
                            <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-xs">…</span>
                            <button
                                onClick={() => setPage(26)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${page === 26 ? "bg-[#4F46E5] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                26
                            </button>
                            <button
                                onClick={() => setPage(Math.min(26, page + 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
                                disabled={page === 26}
                            >
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSubmit}
                onSaveAndAddAnother={handleSubmit}
            >
                <AddPlayer
                    formData={formData}
                    setFormData={setFormData}
                />
            </Modal>
        </div>
    )
}

export default OrgPlayers