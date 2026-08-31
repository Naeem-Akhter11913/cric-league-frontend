import React, { useEffect, useMemo, useState } from 'react'
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
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'
import Modal from '../model/Modal';
import CreateTournament from '../components/CreateTournament';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { allVenueList } from '../store/action/venue.action';
import toast from 'react-hot-toast';

import { clearTournamentStatus, clearSelectedTournament } from '../store/Slice/tournamentSlice';
import { createTournament, deleteTournamentById, fetchTournaments, updateTournament } from '../store/action/tournament.action';
import DeleteComponent from '../components/DeleteComponent';
import ShowModel from '../model/ShowModel';

const tabs = [
    { label: "All Tournaments", icon: SlidersHorizontal },
    { label: "Live", icon: "dot", dotColor: "#DC2626" },
    { label: "Upcoming", icon: CalendarDays },
    { label: "Completed", icon: CheckCircle2 },
    { label: "Cancelled", icon: XCircle },
];

const sortOptions = ["Newest First", "Oldest First", "Name A-Z", "Prize Pool"];

const CREST_PALETTE = [
    { bg: "#F2B84B", fg: "#7A4B00" },
    { bg: "#DC2626", fg: "#FFFFFF" },
    { bg: "#1E3A8A", fg: "#FFFFFF" },
    { bg: "#059669", fg: "#FFFFFF" },
    { bg: "#15803D", fg: "#FFFFFF" },
    { bg: "#6D28D9", fg: "#FFFFFF" },
];

// Backend status -> UI status mapping
const STATUS_META = {
    draft: {
        label: "Draft",
        tab: "Upcoming",
        value: 'draft',
        color: "#4F46E5",
        bg: "#EEF2FF"
    },
    upcoming: {
        label: "Upcoming",
        tab: "Upcoming",
        value: 'draft',
        color: "#4F46E5",
        bg: "#EEF2FF"
    },
    registration_open: {
        label: "Registration Open",
        value: "registration_open",
        tab: "Upcoming",
        color: "#EA580C",
        bg: "#FFF7ED"
    },
    ongoing: {
        label: "Ongoing",
        value: 'ongoing',
        tab: "Ongoing",
        color: "#16A34A",
        bg: "#DCFCE7"
    },
    completed: {
        label: "Completed",
        value: 'completed',
        tab: "Completed",
        color: "#4B5563",
        bg: "#F3F4F6"
    },
};

const getCrest = (name = "", index = 0) => {
    const initials = name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() || "")
        .join("") || "TT";
    const palette = CREST_PALETTE[index % CREST_PALETTE.length];
    return { ...palette, label: initials };
};

const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
};

const formatDateRange = (start, end) => `${formatDate(start)} – ${formatDate(end)}`;

const toInputDate = (iso) => (iso ? new Date(iso).toISOString().slice(0, 10) : "");

const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

const Crest = ({ crest, size = 40 }) => (
    <div
        className="rounded-full flex items-center justify-center font-bold shrink-0 ring-2 ring-white"
        style={{ width: size, height: size, background: crest.bg, color: crest.fg, fontSize: size * 0.32 }}
    >
        {crest.label}
    </div>
);

const emptyTournamentForm = {
    name: "",
    format: "",
    formatType: "",
    status: "Draft",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    venues: [],
    rules: "",
    winnerPrice: null,
    runnerPrice: null,
};

const validateTournament = (data) => {
    if (!data.name.trim()) return "Tournament name is required";
    if (!data.format) return "Format is required";
    if (!data.formatType) return "Format type is required";
    if (!data.startDate) return "Start date is required";
    if (!data.endDate) return "End date is required";
    if (!data.registrationDeadline) return "Registration deadline is required";
    if (!data.venues || data.venues.length === 0) return "At least one venue is required";
    if (!data.rules.trim()) return "Tournament rules are required";
    if (!data.winnerPrice) return "Winner price is required";
    if (!data.runnerPrice) return "Runner price is required";

    if (data.startDate && data.endDate) {
        if (new Date(data.endDate) < new Date(data.startDate)) {
            return "End date must be after start date";
        }
    }

    if (data.registrationDeadline && data.startDate) {
        if (new Date(data.registrationDeadline) >= new Date(data.startDate)) {
            return "Registration deadline must be before the start date";
        }
    }

    return null;
};

const OrgTournaments = () => {
    const dispatch = useAppDispatch();
    const { venueAllList: allVenueInList } = useAppSelector((state) => state.venue);
    const {
        loading,
        error,
        success,
        list: allTournamentsList,
        totalPages,
        tournamentCount,
    } = useAppSelector((state) => state.tournaments);

    const [activeTab, setActiveTab] = useState("All Tournaments");
    const [listSearch, setListSearch] = useState("");
    const [sortOpen, setSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState("Newest First");
    const [isModelOpenTournament, setIsModelOpenTournament] = useState(false);
    const [modalMode, setModalMode] = useState("create"); // 'create' | 'edit'
    const [editingId, setEditingId] = useState(null);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [tournamentLogo, setTournamentLogo] = useState(null);
    const [tournamentData, setTournamentData] = useState(emptyTournamentForm);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [tournamentToDelete, setTournamentToDelete] = useState(null);

    useEffect(() => {
        dispatch(allVenueList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchTournaments({ page, limit: perPage }));
    }, [dispatch, page, perPage]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearTournamentStatus());
            return;
        }
        if (success) {
            toast.success(success);
            dispatch(clearTournamentStatus());
            dispatch(clearSelectedTournament());
            setIsModelOpenTournament(false);
            setTournamentData(emptyTournamentForm);
            setTournamentLogo(null);
            setEditingId(null);
            setTournamentToDelete(null);
            setOpenDeleteModel(false);
            dispatch(fetchTournaments({ page, limit: perPage }));
        }
    }, [error, success, dispatch, page, perPage]);

    // Normalize raw API tournaments into everything the UI needs
    const mappedTournaments = useMemo(() => {
        return (allTournamentsList || []).map((t, i) => {
            const statusMeta = STATUS_META[t.status] || STATUS_META.draft;
            return {
                ...t,
                crest: getCrest(t.name, i),
                dates: formatDateRange(t.startDate, t.endDate),
                venueNames: (t.venues || []).map((v) => v.name).join(", ") || "—",
                teams: t.teamCount ?? 0,
                matches: "—", // no Match model yet — see note above
                prize: formatCurrency(t.winnerPrice),
                winnerPrice: t.winnerPrice ?? 0,
                runnerPrice: t.runnerPrice ?? 0,
                rulesPreview: stripHtml(t.rules),
                statusLabel: statusMeta.label,
                statusColor: statusMeta.color,
                statusBg: statusMeta.bg,
                tabGroup: statusMeta.tab,
                organizerName: t.organizer?.name || "—",
            };
        });
    }, [allTournamentsList]);

    const filteredTournaments = useMemo(() => {
        let rows = mappedTournaments;

        if (activeTab !== "All Tournaments") {
            rows = rows.filter((t) => t.tabGroup === activeTab);
        }

        if (listSearch.trim()) {
            const q = listSearch.toLowerCase();
            rows = rows.filter((t) => t.name.toLowerCase().includes(q));
        }

        const sorted = [...rows];
        switch (sortBy) {
            case "Oldest First":
                sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case "Name A-Z":
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Prize Pool":
                sorted.sort((a, b) => (b.winnerPrice || 0) - (a.winnerPrice || 0));
                break;
            default: // Newest First
                sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return sorted;
    }, [mappedTournaments, activeTab, listSearch, sortBy]);

    // Stats derived from the currently loaded page of tournaments.
    // Live/Upcoming/Completed counts and total participants come from
    // the backend's statusCounts/totalParticipants when available; total
    // tournament count comes from pagination.
    const stats = useMemo(() => {
        const counts = mappedTournaments.reduce(
            (acc, t) => {
                acc[t.tabGroup] = (acc[t.tabGroup] || 0) + 1;
                return acc;
            },
            {}
        );
        const totalParticipants = mappedTournaments.reduce(
            (sum, t) => sum + (t.teams || 0),
            0
        );

        return [
            { label: "Total Tournaments", value: String(tournamentCount ?? mappedTournaments.length), sub: "This Season", icon: Trophy, bg: "#EEF2FF", fg: "#4F46E5" },
            { label: "Live Tournaments", value: String(counts.Live || 0), sub: "Ongoing Now", icon: PlayCircle, bg: "#ECFDF5", fg: "#16A34A" },
            { label: "Upcoming Tournaments", value: String(counts.Upcoming || 0), sub: "Starting Soon", icon: CalendarDays, bg: "#FFF7ED", fg: "#EA580C" },
            { label: "Completed Tournaments", value: String(counts.Completed || 0), sub: "This Season", icon: CheckCircle2, bg: "#EFF6FF", fg: "#2563EB" },
            { label: "Total Participants", value: String(totalParticipants), sub: "Across Tournaments", icon: Users, bg: "#FDF2F8", fg: "#DB2777" },
        ];
    }, [mappedTournaments, tournamentCount]);

    const openCreateModal = () => {
        setModalMode("create");
        setEditingId(null);
        setTournamentData(emptyTournamentForm);
        setTournamentLogo(null);
        setIsModelOpenTournament(true);
    };

    const openEditModal = (row) => {
        setModalMode("edit");
        setEditingId(row._id);
        setTournamentData({
            name: row.name || "",
            format: row.format || "",
            formatType: row.formatType || "",
            status: row.status || "draft",
            startDate: toInputDate(row.startDate),
            endDate: toInputDate(row.endDate),
            registrationDeadline: toInputDate(row.registrationDeadline),
            venues: (row.venues || []).map((v) => v._id),
            rules: row.rules || "",
            winnerPrice: row.winnerPrice ?? null,
            runnerPrice: row.runnerPrice ?? null,
        });
        setTournamentLogo(row.logo || null);
        setIsModelOpenTournament(true);
    };

    const handleDelete = (row) => {
        setTournamentToDelete(row);
        setOpenDeleteModel(true)
    };

    const handleConfirmDelete = () => {
        dispatch(deleteTournamentById(tournamentToDelete._id))
    }

    const handleTournamentSave = () => {
        const errors = validateTournament(tournamentData);
        if (errors) {
            toast.error(errors);
            return;
        }

        if (modalMode === "edit" && editingId) {
            dispatch(updateTournament({ id: editingId, ...tournamentData, logo: tournamentLogo || '' }));
        } else {
            dispatch(createTournament({ ...tournamentData, logo: '' }));
        }
    };

    const closeModal = () => {
        setIsModelOpenTournament(false);
        setModalMode("create");
        setEditingId(null);
        setTournamentData(emptyTournamentForm);
        setTournamentLogo(null);
    };

    return (
        <>
            <div className="min-h-screen bg-[#F7F7F9] p-4 sm:p-6 overflow-y-auto no-scrollbar">
                {/* Header */}
               

                {/* Tabs + Create button */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-1">
 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tournaments</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage and organize tournaments seamlessly</p>
                    </div>
                </div>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0"
                    >
                        <Plus size={16} />
                        Create Tournament
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

                {/* Tournament list — title, search and sort now share one header row
                    with the table itself, instead of a duplicate "All Tournaments" /
                    "Tournament List" title pair in two separate wrapping blocks */}
                <div className="mb-3 flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 overflow-x-auto no-scrollbar w-full lg:w-auto">
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
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">All Tournaments</h2>
                        <div className="flex items-center gap-2 flex-wrap">
                            <div className="relative">
                                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    value={listSearch}
                                    onChange={(e) => { setListSearch(e.target.value); setPage(1); }}
                                    type="text"
                                    placeholder="Search tournaments..."
                                    className="h-10 pl-9 pr-3 w-48 sm:w-56 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all"
                                />
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => setSortOpen(!sortOpen)}
                                    className="flex items-center gap-1.5 h-10 px-3.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Sort By
                                    <ChevronDown size={15} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                                </button>
                                {sortOpen && (
                                    <>
                                        <div className="fixed inset-0 z-30" onClick={() => setSortOpen(false)} />
                                        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-40 py-1">
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
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm min-w-[1080px]">
                            <thead>
                                <tr className="text-left text-[11px] tracking-wide text-gray-400 border-b border-gray-100">
                                    <th className="font-medium px-5 py-3">TOURNAMENT</th>
                                    <th className="font-medium px-3 py-3">FORMAT</th>
                                    <th className="font-medium px-3 py-3">DATES</th>
                                    <th className="font-medium px-3 py-3">VENUE</th>
                                    <th className="font-medium px-3 py-3">TEAMS</th>
                                    <th className="font-medium px-3 py-3">MATCHES</th>
                                    <th className="font-medium px-3 py-3">WINNER PRIZE</th>
                                    <th className="font-medium px-3 py-3">RUNNER PRIZE</th>
                                    <th className="font-medium px-3 py-3">STATUS</th>
                                    <th className="font-medium px-5 py-3 text-right">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && filteredTournaments.length === 0 && (
                                    <tr>
                                        <td colSpan={10} className="px-5 py-8 text-center text-sm text-gray-400">
                                            Loading tournaments...
                                        </td>
                                    </tr>
                                )}
                                {!loading && filteredTournaments.length === 0 && (
                                    <tr>
                                        <td colSpan={10} className="px-5 py-8 text-center text-sm text-gray-400">
                                            No tournaments found.
                                        </td>
                                    </tr>
                                )}
                                {filteredTournaments.map((row) => (
                                    <tr key={row._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <Crest crest={row.crest} size={28} />
                                                <span className="text-gray-800 font-medium truncate">{row.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-gray-500 whitespace-nowrap">
                                            {row.format}{row.formatType ? ` · ${row.formatType}` : ""}
                                        </td>
                                        <td className="px-3 py-3 text-gray-500 whitespace-nowrap">{row.dates}</td>
                                        <td className="px-3 py-3 text-gray-500 max-w-[180px] truncate" title={row.venueNames}>{row.venueNames}</td>
                                        <td className="px-3 py-3 text-gray-600">{row.teams}</td>
                                        <td className="px-3 py-3 text-gray-600">{row.matches}</td>
                                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{formatCurrency(row.winnerPrice)}</td>
                                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{formatCurrency(row.runnerPrice)}</td>
                                        <td className="px-3 py-3">
                                            <span
                                                className="text-xs font-medium px-2.5 py-1 rounded-full"
                                                style={{ background: row.statusBg, color: row.statusColor }}
                                            >
                                                {row.statusLabel}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    title="View"
                                                    className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                                                >
                                                    <Eye size={15} />
                                                </button>
                                                <button
                                                    title="Edit"
                                                    onClick={() => openEditModal(row)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                                                >
                                                    <Pencil size={15} />
                                                </button>
                                                <button
                                                    title="Delete"
                                                    onClick={() => handleDelete(row)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={15} />
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
                        <span className="text-xs text-gray-500">
                            Showing page {page} of {totalPages || 1} ({tournamentCount || 0} tournaments)
                        </span>
                        <div className="flex items-center gap-2">
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
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
                                disabled={page === 1}
                            >
                                <ChevronLeft size={15} />
                            </button>
                            {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((p) => (
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
                                onClick={() => setPage((p) => Math.min(totalPages || 1, p + 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
                                disabled={page === (totalPages || 1)}
                            >
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={isModelOpenTournament}
                onClose={closeModal}
                onSave={handleTournamentSave}
                onSaveAndAddAnother={modalMode === "create" ? handleTournamentSave : undefined}
                loading={loading}
                title={modalMode === "edit" ? "Edit Tournament" : "Create Tournament"}
                submitLabel={modalMode === "edit" ? "Save Changes" : "Create"}
            >
                <CreateTournament
                    logo={tournamentLogo}
                    setLogo={setTournamentLogo}
                    form={tournamentData}
                    setForm={setTournamentData}
                    allVenueInList={allVenueInList}
                />
            </Modal>

            <ShowModel
                open={openDeleteModel}
                onClose={() => {
                    setOpenDeleteModel(false);
                    setTournamentToDelete(null);
                }}
                title={"Are you sure you want to delete this venue? This action cannot be undone."}
            >
                <DeleteComponent
                    onCancel={() => {
                        setOpenDeleteModel(false);
                        setTournamentToDelete(null);
                    }}
                    onDelete={handleConfirmDelete}
                    loading={loading}
                />
            </ShowModel>
        </>
    )
}

export default OrgTournaments