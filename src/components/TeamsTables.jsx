import React, { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, Eye, MoreVertical, Search, SlidersHorizontal } from 'lucide-react'
import { getPlayerAvatar, getPlayerName, teamColors } from '../utils/teams.utils';

const Crest = ({ name, size = 40 }) => {
    const c = teamColors[name] || { bg: "#9CA3AF", fg: "#FFFFFF", label: (name || "NA").slice(0, 2).toUpperCase() };
    return (
        <div
            className="rounded-full flex items-center justify-center font-bold shrink-0 ring-2 ring-white"
            style={{ width: size, height: size, background: c.bg, color: c.fg, fontSize: size * 0.32 }}
        >
            {c.label}
        </div>
    );
};

// NOTE: added `onEdit` prop + a local `openMenu` state so the MoreVertical
// button actually opens something. Previously it rendered an icon with no
// menu behind it at all, so there was no way to trigger edit from the table.
//
// Tabs/search/sort now render as this table's own header row instead of a
// separate block above it — one less wrapping div, and the filter controls
// sit right next to what they control.
const TeamsTables = ({
    tabs,
    activeTab,
    onTabChange,
    search,
    onSearchChange,
    sortOpen,
    setSortOpen,
    sortBy,
    setSortBy,
    sortOptions,
    page,
    filteredList,
    setPerPage,
    setPage,
    perPage,
    onEdit,
}) => {
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 px-4 sm:px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-5 border-b border-gray-200 lg:border-0 w-full lg:w-auto overflow-x-auto no-scrollbar">
                    {tabs.map((t) => (
                        <button
                            key={t}
                            onClick={() => onTabChange(t)}
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
                            onChange={(e) => onSearchChange(e.target.value)}
                            type="text"
                            placeholder="Search teams..."
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
                            <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
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

            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-sm min-w-[900px]">
                    <thead>
                        <tr className="text-left text-[11px] tracking-wide text-gray-400 border-b border-gray-100">
                            <th className="font-medium px-5 py-3">TEAM</th>
                            <th className="font-medium px-3 py-3">CAPTAIN</th>
                            <th className="font-medium px-3 py-3">TOURNAMENTS</th>
                            <th className="font-medium px-3 py-3">PLAYERS</th>
                            <th className="font-medium px-3 py-3">MATCHES</th>
                            <th className="font-medium px-3 py-3">WON</th>
                            <th className="font-medium px-3 py-3">LOST</th>
                            <th className="font-medium px-3 py-3">POINTS</th>
                            <th className="font-medium px-3 py-3">STATUS</th>
                            <th className="font-medium px-5 py-3 text-right">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList.map((row, i) => {
                            const captainName = getPlayerName(row.players, row.captain);
                            const captainAvatar = getPlayerAvatar(row.players, row.captain);
                            const isActive = (row.status || "").toLowerCase() === "active";
                            return (
                                <tr key={row._id || i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <Crest name={row.name} size={30} />
                                            <span className="text-gray-800 font-medium truncate">{row.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <img
                                                src={captainAvatar}
                                                alt={captainName}
                                                className="w-6 h-6 rounded-full object-cover shrink-0"
                                            />
                                            <span className="text-gray-600 truncate">{captainName}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 text-gray-600">-</td>
                                    <td className="px-3 py-3 text-gray-600">{row.players?.length ?? "-"}</td>
                                    <td className="px-3 py-3 text-gray-600">-</td>
                                    <td className="px-3 py-3 text-gray-600">-</td>
                                    <td className="px-3 py-3 text-gray-600">-</td>
                                    <td className="px-3 py-3 text-gray-900 font-medium">-</td>
                                    <td className="px-3 py-3">
                                        <span
                                            className={`flex items-center gap-1.5 text-xs font-medium w-fit px-2.5 py-1 rounded-full capitalize ${isActive ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>}
                                            {row.status || "N/A"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                                                <Eye size={15} />
                                            </button>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setOpenMenu(openMenu === i ? null : i)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                                                >
                                                    <MoreVertical size={15} />
                                                </button>
                                                {openMenu === i && (
                                                    <>
                                                        {/* click-catcher so the menu closes on any outside click — must sit
                                                        BELOW the menu itself, or it swallows clicks on the menu's own
                                                        buttons (that was the earlier bug: Edit never fired because the
                                                        catcher's z-index was higher than the menu's) */}
                                                        <div className="fixed inset-0 z-30" onClick={() => setOpenMenu(null)} />
                                                        <div className="absolute right-0 top-9 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-40 py-1">
                                                            <button
                                                                onClick={() => {
                                                                    onEdit(row);
                                                                    setOpenMenu(null);
                                                                }}
                                                                className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">Message</button>
                                                            <button className="w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-gray-50">Remove</button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {filteredList.length === 0 && (
                            <tr>
                                <td colSpan={10} className="px-5 py-8 text-center text-sm text-gray-400">
                                    No teams found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">Showing 1 to {filteredList.length} of {filteredList.length} teams</span>
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
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${page === p ? "bg-[#4F46E5] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
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
    )
}

export default TeamsTables