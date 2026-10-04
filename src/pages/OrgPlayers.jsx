import React, { useEffect, useMemo, useState } from 'react'
import {
    Search, ChevronDown, Eye, ChevronLeft, ChevronRight, Plus,
    Users2, UserCheck, CheckCircle2, Shield, UserX, UserMinus,
    Mail, Phone, BadgeCheck,
} from 'lucide-react'
import Modal from '../model/Modal';
import AddPlayer from '../components/AddPlayer';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { teamColors } from '../data/orgPlayer.data';
import { createPlayer, fetchOrgPlayers, fetchOrgPlayerStats, removeOrgPlayer } from '../store/action/organizer.action';
import PlayerDetails from '../components/PlayerDetails';

const TABS = [
    { label: "All Players", type: "" },
    { label: "Batsmen", type: "batter" },
    { label: "Bowlers", type: "bowler" },
    { label: "All Rounders", type: "all_rounder" },
    { label: "Wicket Keepers", type: "wicket_keeper" },
];

const TYPE_LABEL = { batter: "Batter", bowler: "Bowler", all_rounder: "All Rounder", wicket_keeper: "Wicket Keeper" };
const STYLE_LABEL = { right_hand: "Right hand", left_hand: "Left hand" };
const AVAILABILITY_STYLE = {
    Available: "bg-[#DCFCE7] text-[#16A34A]",
    Injured: "bg-red-50 text-red-600",
    Unavailable: "bg-gray-100 text-gray-500",
    Rested: "bg-blue-50 text-blue-600",
    Retired: "bg-gray-100 text-gray-500",
};

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

const initials = (name = "") => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "?";
const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "-";

const selectCls =
    "h-10 pl-3.5 pr-8 rounded-lg border border-gray-200 text-sm text-gray-600 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30";

const OrgPlayers = () => {
    const dispatch = useAppDispatch();
    const { orgPlayers, orgPlayersTotal, orgPlayersLoading, playerStats } = useAppSelector((s) => s.organizer);

    const [viewPlayer, setViewPlayer] = useState(null);
    const [activeTab, setActiveTab] = useState("All Players");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [removingId, setRemovingId] = useState(null);
    const [formData, setFormData] = useState({ email: "" });

    const s = playerStats;
    const dash = (n) => (s ? n ?? 0 : "–");

    const statCards = [
        { label: "Total Players", value: dash(s?.total), sub: "In your organization", icon: Users2, bg: "#EEF2FF", fg: "#4F46E5" },
        { label: "Active Players", value: dash(s?.active), sub: s ? `${s.suspended} suspended` : "Currently active", icon: UserCheck, bg: "#ECFDF5", fg: "#16A34A" },
        { label: "Available", value: dash(s?.available), sub: "Ready to play", icon: CheckCircle2, bg: "#EFF6FF", fg: "#2563EB" },
        { label: "In a Team", value: dash(s?.assigned), sub: "Part of a squad", icon: Shield, bg: "#FFF7ED", fg: "#EA580C" },
        { label: "Without a Team", value: dash(s?.unassigned), sub: "Free to pick", icon: UserX, bg: "#FDF2F8", fg: "#DB2777" },
    ];

    const countFor = (type) => (!s ? null : type ? s.byType?.[type] ?? 0 : s.total);

    // search: wait for the user to stop typing
    useEffect(() => {
        const id = setTimeout(() => { setDebouncedSearch(search.trim()); setPage(1); }, 350);
        return () => clearTimeout(id);
    }, [search]);

    // list
    useEffect(() => {
        dispatch(fetchOrgPlayers({
            page,
            limit: perPage,
            search: debouncedSearch || undefined,
            playerType: TABS.find((t) => t.label === activeTab)?.type || undefined,
            status: statusFilter || undefined,
            sort: sortBy,
        }))
            .unwrap()
            .catch((err) => toast.error(typeof err === "string" ? err : "Failed to load players"));
    }, [dispatch, page, perPage, debouncedSearch, activeTab, statusFilter, sortBy, refreshKey]);

    // stats
    useEffect(() => { dispatch(fetchOrgPlayerStats()); }, [dispatch]);

    const refresh = () => {
        setRefreshKey((n) => n + 1);
        dispatch(fetchOrgPlayerStats());
    };

    const totalPages = Math.max(1, Math.ceil(orgPlayersTotal / perPage));
    const from = orgPlayersTotal ? (page - 1) * perPage + 1 : 0;
    const to = Math.min(page * perPage, orgPlayersTotal);

    // e.g. removing the last row of the last page
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

    const handleSubmit = async (isClose) => {
        const email = formData.email.trim();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error("Enter a valid email");
            return;
        }
        try {
            setSubmitting(true);
            await dispatch(createPlayer({ email })).unwrap();
            toast.success("Player added to your organization");
            setFormData({ email: "" });
            if (isClose) setIsModalOpen(false);
            refresh();
        } catch (err) {
            toast.error(typeof err === "string" ? err : err?.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    const handleRemove = async (row) => {
        const name = row.userId?.name || "this player";
        const n = row.teams?.length || 0;
        const warn = n
            ? ` They will also be removed from ${n} team${n > 1 ? "s" : ""} and from any Playing XI that uses them.`
            : "";
        if (!window.confirm(`Remove ${name} from your organization?${warn}`)) return false;
        try {
            setRemovingId(row._id);
            await dispatch(removeOrgPlayer(row._id)).unwrap();
            toast.success(`${name} removed from your organization`);
            refresh();
            return true;
        } catch (err) {
            toast.error(typeof err === "string" ? err : "Failed to remove player");
            return false;
        } finally {
            setRemovingId(null);
        }
    };

    return (
        <div className="h-screen overflow-y-auto no-scrollbar bg-[#F7F7F9]">
            <style>{`
                .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

            <div className="p-4 sm:p-6">
                <div className="mb-6 flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Players</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage and view all players in your organization</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-1.5 h-10 px-4 rounded-lg bg-[#4F46E5] text-white text-sm font-medium hover:bg-[#4338CA] transition-colors"
                    >
                        <Plus size={16} /> Add Player
                    </button>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    {statCards.map((c, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
                            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: c.bg }}>
                                <c.icon size={19} style={{ color: c.fg }} />
                            </div>
                            <div className="min-w-0">
                                <div className="text-xs sm:text-sm text-gray-500 truncate">{c.label}</div>
                                <div className="text-xl sm:text-2xl font-bold text-gray-900">{c.value}</div>
                                <div className="text-xs text-gray-400 truncate">{c.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Players list */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 px-4 sm:px-5 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-5 border-b border-gray-200 lg:border-0 w-full lg:w-auto overflow-x-auto no-scrollbar">
                            {TABS.map((t) => {
                                const count = countFor(t.type);
                                return (
                                    <button
                                        key={t.label}
                                        onClick={() => { setActiveTab(t.label); setPage(1); }}
                                        className={`pb-2.5 lg:pb-0 text-sm font-medium whitespace-nowrap border-b-2 lg:border-0 transition-colors ${activeTab === t.label ? "text-[#4F46E5] border-[#4F46E5]" : "text-gray-500 border-transparent hover:text-gray-700"}`}
                                    >
                                        {t.label}{count != null ? ` (${count})` : ""}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            <div className="relative">
                                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="text"
                                    placeholder="Search name or email..."
                                    className="h-10 pl-9 pr-3 w-48 sm:w-60 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all"
                                />
                            </div>
                            <div className="relative">
                                <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className={selectCls}>
                                    <option value="">All statuses</option>
                                    <option value="active">Active</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative">
                                <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }} className={selectCls}>
                                    <option value="newest">Newest first</option>
                                    <option value="oldest">Oldest first</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-sm min-w-[980px]">
                            <thead>
                                <tr className="text-left text-[11px] tracking-wide text-gray-400 border-b border-gray-100">
                                    <th className="font-medium px-5 py-3">PLAYER</th>
                                    <th className="font-medium px-3 py-3">TEAM</th>
                                    <th className="font-medium px-3 py-3">ROLE</th>
                                    <th className="font-medium px-3 py-3">BATTING</th>
                                    <th className="font-medium px-3 py-3">BOWLING</th>
                                    <th className="font-medium px-3 py-3">AVAILABILITY</th>
                                    <th className="font-medium px-3 py-3">STATUS</th>
                                    <th className="font-medium px-3 py-3">ADDED</th>
                                    <th className="font-medium px-5 py-3 text-right">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orgPlayers.map((row) => {
                                    const name = row.userId?.name || "Unknown";
                                    const active = row.status === "active";
                                    return (
                                        <tr key={row._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    {row.userId?.avatarUrl ? (
                                                        <img src={row.userId.avatarUrl} alt={name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                                                            {initials(name)}
                                                        </div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <div className="text-gray-800 font-medium truncate">{name}</div>
                                                        <div className="text-xs text-gray-400 truncate">{row.userId?.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-3">
                                                {row.teams?.length ? (
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <TeamCrest name={row.teams[0].name} />
                                                        <span className="text-gray-600 truncate">{row.teams[0].name}</span>
                                                        {row.teams.length > 1 && <span className="text-xs text-gray-400">+{row.teams.length - 1}</span>}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">No team</span>
                                                )}
                                            </td>
                                            <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{TYPE_LABEL[row.playerType] || "Not set"}</td>
                                            <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{STYLE_LABEL[row.battingStyle] || "-"}</td>
                                            <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{row.bowlingStyle || "-"}</td>
                                            <td className="px-3 py-3">
                                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${AVAILABILITY_STYLE[row.availability] || "bg-gray-100 text-gray-500"}`}>
                                                    {row.availability || "-"}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3">
                                                <span className="flex items-center gap-1.5 text-xs font-medium w-fit capitalize" style={{ color: active ? "#16A34A" : "#EA580C" }}>
                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: active ? "#16A34A" : "#EA580C" }} />
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3 text-gray-500 whitespace-nowrap">{formatDate(row.createdAt)}</td>
                                            <td className="px-5 py-3">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => setViewPlayer(row)}
                                                        title="View"
                                                        className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                                                        <Eye size={15} />
                                                    </button>
                                                    <button
                                                        title="Remove from organization"
                                                        onClick={() => handleRemove(row)}
                                                        disabled={removingId === row._id}
                                                        className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition-colors disabled:opacity-40"
                                                    >
                                                        <UserMinus size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {orgPlayers.length === 0 && (
                                    <tr>
                                        <td colSpan={9} className="px-5 py-8 text-center text-sm text-gray-400">
                                            {orgPlayersLoading ? "Loading players..." : "No players found."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500">Showing {from} to {to} of {orgPlayersTotal} players</span>
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
            </div>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={() => handleSubmit(true)}
                onSaveAndAddAnother={() => handleSubmit(false)}
                loading={submitting}
            >
                <AddPlayer formData={formData} setFormData={setFormData} />
            </Modal>
            <Modal open={!!viewPlayer} onClose={() => setViewPlayer(null)} islogin>
                {viewPlayer && (
                    <PlayerDetails
                        player={viewPlayer}
                        removing={removingId === viewPlayer._id}
                        onClose={() => setViewPlayer(null)}
                        onRemove={async () => {
                            const removed = await handleRemove(viewPlayer);
                            if (removed) setViewPlayer(null);
                        }}
                    />
                )}
            </Modal>
        </div>
    )
}

export default OrgPlayers