import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getPointsTable } from '../store/action/pointsTableAction';
import { ArrowRight, CalendarDays, CheckCircle2, ChevronDown, Download, Info, RefreshCw, Rocket, Trophy, Users2 } from 'lucide-react';

/* ------------------------------ helpers ------------------------------ */

const PALETTE = [
    ["#F2B84B", "#7A4B00"], ["#1E3A8A", "#FFFFFF"], ["#2563EB", "#FFFFFF"], ["#059669", "#FFFFFF"],
    ["#4338CA", "#FFFFFF"], ["#16A34A", "#FFFFFF"], ["#B45309", "#FFFFFF"], ["#334155", "#FFFFFF"],
];
const hash = (s = "") => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

const Crest = ({ team, size = 26, round = true }) => {
    const name = team?.name || "?";
    if (team?.logoUrl) {
        return <img src={team.logoUrl} alt={name} style={{ width: size, height: size }} className={`${round ? "rounded-full" : ""} object-cover shrink-0`} />;
    }
    const [bg, fg] = PALETTE[hash(name) % PALETTE.length];
    const label = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    return (
        <div className="rounded-full flex items-center justify-center font-bold shrink-0"
            style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.34 }}>
            {label}
        </div>
    );
};

const ZONE_ROW = { qualified: "bg-[#F0FDF4]", maybe: "bg-[#EFF6FF]", eliminated: "bg-[#FEF2F2]" };
const RESULT = {
    W: { bg: "#16A34A", label: "W" }, L: { bg: "#DC2626", label: "L" },
    T: { bg: "#F59E0B", label: "T" }, NR: { bg: "#9CA3AF", label: "NR" },
};
const SORTS = {
    Points: (a, b) => a.pos - b.pos,
    NRR: (a, b) => b.netRunRate - a.netRunRate,
    Wins: (a, b) => b.won - a.won || a.pos - b.pos,
    "Team Name": (a, b) => a.team.name.localeCompare(b.team.name),
};

const nrrText = (n) => `${n > 0 ? "+" : ""}${n.toFixed(3)}`;
const nrrColor = (n) => (n > 0 ? "text-green-600" : n < 0 ? "text-red-500" : "text-gray-500");
const fmtUpdated = (d) =>
    new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const selectCls =
    "h-10 pl-3.5 pr-9 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 appearance-none hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30";

const Select = ({ value, onChange, children, icon }) => (
    <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</span>}
        <select value={value} onChange={(e) => onChange(e.target.value)} className={`${selectCls} ${icon ? "pl-9" : ""}`}>
            {children}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
);

/* -------------------------------- page -------------------------------- */

const OrgPointsTable = () => {
    const navigate = useNavigate();
    const {
        data: pointTableData,
        loading: pointTableLoading,
        error: pointTableError,
    } = useAppSelector((state) => state.pointTable);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [tournamentId, setTournamentId] = useState("");   // empty = let the server choose
    const [sortBy, setSortBy] = useState("Points");
    const dispatch = useAppDispatch();
    // console.log("pointTableDatapointTableDatapointTableDatapointTableData", data)
    // const load = useCallback(async (silent) => {
    //     try {
    //         if (!silent) setLoading(true);
    //         // const body = await getPointsTable({ tournamentId: tournamentId || undefined });
    //         // setData(body.data);
    //         dispatch(getPointsTable({ tournamentId: tournamentId || undefined }))
    //         setError("");
    //     } catch (err) {
    //         const msg = err.response?.data?.message || "Could not load the points table";
    //         if (silent) toast.error(msg); else setError(msg);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [tournamentId]);


    useEffect(() => {
        setData(pointTableData);
    }, [pointTableData]);

    useEffect(() => {
        setError(pointTableError || "");
    }, [pointTableError]);

    useEffect(() => {
        setLoading(pointTableLoading);
    }, [pointTableLoading]);


    const load = useCallback(async (silent = false) => {
        try {
            await dispatch(
                getPointsTable({
                    tournamentId: tournamentId || undefined,
                })
            ).unwrap();
        } catch (err) {
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
    // useEffect(() => { load(false); }, [load]);

    // standings change when a match finishes, so refresh quietly every 30 seconds
    // useEffect(() => {
    //     const t = setInterval(() => { if (!document.hidden) load(true); }, 30000);
    //     return () => clearInterval(t);
    // }, [load]);

    const current = data?.tournament;
    const years = useMemo(
        () => [...new Set((data?.tournaments || []).map((t) => t.year))].sort((a, b) => b - a),
        [data]
    );
    const inYear = (data?.tournaments || []).filter((t) => t.year === current?.year);

    const changeYear = (y) => {
        const first = (data.tournaments || []).find((t) => String(t.year) === String(y));
        if (first) setTournamentId(first._id);
    };

    const rows = useMemo(
        () => [...(data?.standings || [])].sort(SORTS[sortBy]),
        [data, sortBy]
    );

    const download = () => {
        const head = ["Pos", "Team", "P", "W", "L", "T", "NR", "Pts", "NRR", "For", "Against"];
        const lines = rows.map((r) =>
            [r.pos, `"${r.team.name.replace(/"/g, '""')}"`, r.played, r.won, r.lost, r.tied, r.noResult,
            r.points, r.netRunRate.toFixed(3), `${r.runsFor}/${r.oversFor}`, `${r.runsAgainst}/${r.oversAgainst}`].join(",")
        );
        const blob = new Blob([[head.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${current.name} - points table.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const shell = (body) => (
        <div className="h-screen overflow-y-auto no-scrollbar bg-[#F7F7F9]">
            <style>{`
                .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
            <div className="p-4 sm:p-6">{body}</div>
        </div>
    );


    if (error && !data) return shell(<div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-sm text-rose-500">{error}</div>);
    if (!data) return shell(<div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-sm text-gray-400">Loading points table...</div>);
    if (!current) {
        return shell(
            <>
                <h1 className="text-2xl font-bold text-gray-900 mb-5">Points Table</h1>
                <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-sm text-gray-400">
                    Create a tournament and schedule matches to see its points table here.
                </div>
            </>
        );
    }

    const s = data.stats;
    const pct = (n) => (s.totalMatches ? `${((n / s.totalMatches) * 100).toFixed(1)}%` : "0%");
    const statCards = [
        { label: "Total Teams", value: s.teams, sub: "Participating", icon: Trophy, bg: "#EEF2FF", fg: "#4F46E5" },
        { label: "Total Matches", value: s.totalMatches, sub: "In this tournament", icon: Rocket, bg: "#EFF6FF", fg: "#2563EB" },
        { label: "Completed Matches", value: s.completed, sub: pct(s.completed), icon: CheckCircle2, bg: "#ECFDF5", fg: "#16A34A" },
        { label: "Remaining Matches", value: s.remaining, sub: pct(s.remaining), icon: CalendarDays, bg: "#FFF7ED", fg: "#EA580C" },
        { label: "Total Points Available", value: s.pointsAvailable, sub: `${s.pointsAwarded} awarded so far`, icon: Users2, bg: "#FDF2F8", fg: "#DB2777" },
    ];
    const ps = data.pointsSystem;
    const spots = current.spots;

    return shell(
        <>
            {/* Header */}
            <div className="mb-5">
                <h1 className="text-2xl font-bold text-gray-900">Points Table</h1>
                <p className="text-sm text-gray-500 mt-1">{current.name}</p>
            </div>

            {/* Selectors + download */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                    <Select value={current._id} onChange={setTournamentId} icon={<Trophy size={15} />}>
                        {inYear.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
                    </Select>
                    <Select value={String(current.year)} onChange={changeYear}>
                        {years.map((y) => <option key={y} value={y}>{y}</option>)}
                    </Select>
                </div>
                <button
                    onClick={download}
                    disabled={rows.length === 0}
                    className="flex items-center justify-center gap-2 bg-white border border-[#4F46E5]/30 text-[#4F46E5] text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#EEF2FF] transition-colors shrink-0 disabled:opacity-40"
                >
                    <Download size={15} />
                    Download Table
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

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 items-start">
                {/* Standings */}
                <div className="xl:col-span-3 bg-white border border-gray-200 rounded-xl overflow-hidden min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">League Standings</h2>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            Sort By
                            <Select value={sortBy} onChange={setSortBy}>
                                {Object.keys(SORTS).map((k) => <option key={k} value={k}>{k}</option>)}
                            </Select>
                        </div>
                    </div>

                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-sm min-w-[960px]">
                            <thead>
                                <tr className="text-left text-[11px] tracking-wide text-white bg-[#0B1220]">
                                    <th className="font-medium px-4 py-3">#</th>
                                    <th className="font-medium px-3 py-3">TEAM</th>
                                    <th className="font-medium px-3 py-3">P</th>
                                    <th className="font-medium px-3 py-3">W</th>
                                    <th className="font-medium px-3 py-3">L</th>
                                    <th className="font-medium px-3 py-3">T</th>
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
                                {rows.map((r) => (
                                    <tr key={r.team._id} className={`border-b border-gray-100 last:border-0 ${ZONE_ROW[r.zone] || ""}`}>
                                        <td className="px-4 py-3 text-gray-500 font-medium">{r.pos}</td>
                                        <td className="px-3 py-3">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <Crest team={r.team} />
                                                <span className="text-gray-800 font-medium truncate">{r.team.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-gray-700">{r.played}</td>
                                        <td className="px-3 py-3 text-gray-700">{r.won}</td>
                                        <td className="px-3 py-3 text-gray-700">{r.lost}</td>
                                        <td className="px-3 py-3 text-gray-700">{r.tied}</td>
                                        <td className="px-3 py-3 text-gray-700">{r.noResult}</td>
                                        <td className="px-3 py-3 font-bold text-gray-900">{r.points}</td>
                                        <td className={`px-3 py-3 whitespace-nowrap ${nrrColor(r.netRunRate)}`}>{nrrText(r.netRunRate)}</td>
                                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{r.runsFor}/{r.oversFor}</td>
                                        <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{r.runsAgainst}/{r.oversAgainst}</td>
                                        <td className="px-3 py-3">
                                            <div className="flex items-center gap-1">
                                                {r.last5.length === 0 && <span className="text-xs text-gray-400">–</span>}
                                                {r.last5.map((x, i) => (
                                                    <span key={i} className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold"
                                                        style={{ background: RESULT[x].bg, fontSize: x === "NR" ? 7 : 9 }}>
                                                        {RESULT[x].label}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-0.5">
                                                {r.last5.map((x, i) => <span key={i} className="w-4 h-2 rounded-sm" style={{ background: RESULT[x].bg }} />)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {rows.length === 0 && (
                                    <tr>
                                        <td colSpan={13} className="px-5 py-10 text-center text-sm text-gray-400">
                                            No teams yet. Teams appear here as soon as a match is scheduled in this tournament.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 sm:px-5 py-3.5 border-t border-gray-100 text-xs text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <Info size={13} className="text-gray-400" />
                            {spots > 0
                                ? `Top ${spots} teams will qualify for the Playoffs`
                                : "Ranked by points, then net run rate, then wins"}
                        </span>
                        <span className="flex items-center gap-1.5">
                            Last Updated: {data.lastUpdated ? fmtUpdated(data.lastUpdated) : "–"}
                            <button onClick={() => load(false)} title="Refresh">
                                <RefreshCw size={13} className={`text-gray-400 ${loading ? "animate-spin" : ""}`} />
                            </button>
                        </span>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="xl:col-span-1 flex flex-col gap-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Top Performers</h3>
                        {data.topPerformers.length === 0 ? (
                            <p className="text-sm text-gray-400">Shown once matches in this tournament are completed.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {data.topPerformers.map((p) => (
                                    <div key={p.key} className="flex items-center gap-3">
                                        <Crest team={{ name: p.name, logoUrl: p.avatarUrl }} size={36} />
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
                        )}
                        <button
                            onClick={() => navigate("/statistics")}
                            className="flex items-center gap-1 text-sm text-[#4F46E5] hover:underline mt-3 font-medium"
                        >
                            View All Stats
                            <ArrowRight size={13} />
                        </button>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Legend</h3>
                        <div className="flex items-center gap-4 flex-wrap mb-3 text-xs text-gray-600">
                            {[["W", "Win"], ["L", "Loss"], ["T", "Tie"], ["NR", "No Result"]].map(([k, label]) => (
                                <span key={k} className="flex items-center gap-1.5">
                                    <span className="w-4 h-4 rounded-full text-white font-bold flex items-center justify-center"
                                        style={{ background: RESULT[k].bg, fontSize: k === "NR" ? 7 : 9 }}>
                                        {k}
                                    </span>
                                    {label}
                                </span>
                            ))}
                        </div>
                        {spots > 0 && (
                            <div className="flex flex-col gap-2 text-xs text-gray-600">
                                <span className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-sm bg-[#F0FDF4] border border-green-200" />In playoff places</span>
                                <span className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-sm bg-[#EFF6FF] border border-blue-200" />May qualify for Playoffs</span>
                                <span className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-sm bg-[#FEF2F2] border border-red-200" />Eliminated (once the tournament ends)</span>
                            </div>
                        )}
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Points System</h3>
                        <div className="flex flex-col gap-2 text-sm">
                            {[["Win", ps.win], ["Tie", ps.tie], ["No Result", ps.noResult], ["Loss", ps.loss]].map(([label, v]) => (
                                <div key={label} className="flex items-center justify-between">
                                    <span className="text-gray-600">{label}</span>
                                    <span className="font-semibold text-gray-900">{v} {v === 1 ? "Point" : "Points"}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">NRR is used as tiebreaker</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrgPointsTable