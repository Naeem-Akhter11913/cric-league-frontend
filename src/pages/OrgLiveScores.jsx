import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
    Radio, FileText, MessageSquare, BarChart3, Info, RefreshCw, Calendar, MapPin,
    Trophy, Users, Tv, ChevronDown, Users2,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { getLive, getMyMatches } from '../store/API/scoringAPI';


/* ------------------------------ helpers ------------------------------ */

const PALETTE = [
    ["#6D28D9", "#FFFFFF"], ["#F2B84B", "#7A4B00"], ["#1E3A8A", "#FFFFFF"], ["#2563EB", "#FFFFFF"],
    ["#059669", "#FFFFFF"], ["#4338CA", "#FFFFFF"], ["#DB2777", "#FFFFFF"], ["#EA580C", "#FFFFFF"],
];
const hash = (s = "") => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

const TeamCrest = ({ team, size = 56 }) => {
    const name = team?.name || "TBD";
    if (team?.logoUrl) {
        return <img src={team.logoUrl} alt={name} style={{ width: size, height: size }} className="rounded-2xl object-cover shrink-0" />;
    }
    const [bg, fg] = PALETTE[hash(name) % PALETTE.length];
    const label = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    return (
        <div className="rounded-2xl flex items-center justify-center font-bold shrink-0"
            style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.3 }}>
            {label}
        </div>
    );
};

const TABS = [
    { label: "Live", icon: Radio },
    { label: "Scorecard", icon: FileText },
    { label: "Commentary", icon: MessageSquare },
    { label: "Stats", icon: BarChart3 },
    { label: "Info", icon: Info },
];

const BALL_BG = { dot: "#9CA3AF", run: "#16A34A", four: "#2563EB", six: "#7C3AED", wicket: "#DC2626", extra: "#F59E0B" };
const overBg = (o) => (o.wickets ? "#DC2626" : o.runs >= 12 ? "#2563EB" : o.runs >= 8 ? "#16A34A" : "#9CA3AF");

const STATUS_BADGE = {
    live: ["LIVE", "#DC2626"], innings_break: ["INNINGS BREAK", "#D97706"], completed: ["COMPLETED", "#16A34A"],
    toss_done: ["TOSS DONE", "#4F46E5"], scheduled: ["SCHEDULED", "#6B7280"],
};

const fmt2 = (n) => (n == null ? "–" : Number(n).toFixed(2));
const fmtDateTime = (d) =>
    new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const Card = ({ title, right, children, className = "" }) => (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 ${className}`}>
        {(title || right) && (
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{title}</h3>
                {right}
            </div>
        )}
        {children}
    </div>
);

const Bubble = ({ kind, children, size = 24 }) => (
    <div className="rounded-full flex items-center justify-center text-white font-bold shrink-0"
        style={{ width: size, height: size, fontSize: size * 0.42, background: BALL_BG[kind] || "#9CA3AF" }}>
        {children}
    </div>
);

/* ------------------------------- tables ------------------------------- */

const BattingTable = ({ inn, showOut = false, compact = false }) => (
    <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-xs sm:text-sm min-w-[420px]">
            <thead>
                <tr className="text-left text-[11px] text-gray-400 border-b border-gray-100">
                    <th className="font-medium py-2">Batter</th>
                    <th className="font-medium py-2 px-1">R</th>
                    <th className="font-medium py-2 px-1">B</th>
                    <th className="font-medium py-2 px-1">4s</th>
                    <th className="font-medium py-2 px-1">6s</th>
                    <th className="font-medium py-2 px-1">SR</th>
                </tr>
            </thead>
            <tbody>
                {inn.batting.map((b) => (
                    <tr key={b.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-2">
                            <div className={`truncate ${b.atCrease ? "text-[#4F46E5] font-medium" : "text-gray-800"}`}>
                                {b.name}{b.onStrike ? " *" : ""}
                            </div>
                            {(showOut || b.isOut) && <div className="text-[11px] text-gray-400">{b.out}</div>}
                        </td>
                        <td className="py-2 px-1 text-gray-800 font-medium">{b.runs}</td>
                        <td className="py-2 px-1 text-gray-600">{b.balls}</td>
                        <td className="py-2 px-1 text-gray-600">{b.fours}</td>
                        <td className="py-2 px-1 text-gray-600">{b.sixes}</td>
                        <td className="py-2 px-1 text-gray-600">{b.sr}</td>
                    </tr>
                ))}
                <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-500" colSpan={6}>
                        Extras: {inn.extras.total} (wd {inn.extras.wides}, nb {inn.extras.noBalls}, b {inn.extras.byes}, lb {inn.extras.legByes})
                    </td>
                </tr>
                <tr>
                    <td className="py-2 font-bold text-gray-900">Total</td>
                    <td className="py-2 font-bold text-gray-900" colSpan={3}>{inn.runs}/{inn.wickets} ({inn.overs} Overs)</td>
                    <td className="py-2 font-bold text-gray-900" colSpan={2}>CRR: {fmt2(inn.crr)}</td>
                </tr>
                {!compact && inn.didNotBat.length > 0 && (
                    <tr><td className="pt-2 text-xs text-gray-500" colSpan={6}>Did not bat: {inn.didNotBat.join(", ")}</td></tr>
                )}
            </tbody>
        </table>
    </div>
);

const BowlingTable = ({ inn }) => (
    <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-xs sm:text-sm min-w-[380px]">
            <thead>
                <tr className="text-left text-[11px] text-gray-400 border-b border-gray-100">
                    <th className="font-medium py-2">Bowler</th>
                    <th className="font-medium py-2 px-1">O</th>
                    <th className="font-medium py-2 px-1">M</th>
                    <th className="font-medium py-2 px-1">R</th>
                    <th className="font-medium py-2 px-1">W</th>
                    <th className="font-medium py-2 px-1">Econ</th>
                </tr>
            </thead>
            <tbody>
                {inn.bowling.map((b) => (
                    <tr key={b.id} className="border-b border-gray-50 last:border-0">
                        <td className={`py-2 truncate ${b.isCurrent ? "text-[#4F46E5] font-medium" : "text-gray-800"}`}>{b.name}</td>
                        <td className="py-2 px-1 text-gray-600">{b.overs}</td>
                        <td className="py-2 px-1 text-gray-600">{b.maidens}</td>
                        <td className="py-2 px-1 text-gray-600">{b.runs}</td>
                        <td className="py-2 px-1 text-gray-800 font-medium">{b.wickets}</td>
                        <td className="py-2 px-1 text-gray-600">{fmt2(b.econ)}</td>
                    </tr>
                ))}
                {inn.bowling.length === 0 && <tr><td className="py-3 text-gray-400" colSpan={6}>No overs bowled yet.</td></tr>}
            </tbody>
        </table>
    </div>
);

/* ----------------------------- commentary ----------------------------- */

const FILTERS = [
    { value: "all", label: "All Balls" },
    { value: "boundaries", label: "Boundaries" },
    { value: "wickets", label: "Wickets" },
];

const filterItems = (items, filter) =>
    items.filter((c) => {
        if (filter === "all") return true;
        if (c.endOfOver) return false;
        return filter === "wickets" ? c.kind === "wicket" : c.kind === "four" || c.kind === "six";
    });

const CommentaryItem = ({ c }) =>
    c.endOfOver ? (
        <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-xs font-medium text-gray-500">
            <span>End of Over {c.endOfOver}</span>
            <span>{c.runs} Runs</span>
        </div>
    ) : (
        <div className="flex items-start gap-3">
            <span className="text-[11px] text-gray-400 w-8 pt-1 shrink-0">{c.over}</span>
            <Bubble kind={c.kind}>{c.ball}</Bubble>
            <div className="min-w-0">
                <div className="text-xs text-gray-500 truncate">{c.bowler} to {c.batter}</div>
                <div className="text-sm text-gray-800">{c.text}</div>
                {c.sub && <div className="text-xs text-gray-500 mt-0.5">{c.sub}</div>}
            </div>
        </div>
    );

const FilterSelect = ({ value, onChange }) => (
    <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)}
            className="appearance-none text-xs font-medium text-[#4F46E5] bg-transparent pr-4 focus:outline-none cursor-pointer">
            {FILTERS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
        <ChevronDown size={13} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#4F46E5] pointer-events-none" />
    </div>
);

/* -------------------------------- page -------------------------------- */

const OrgLiveScores = () => {
    const [params, setParams] = useSearchParams();
    const [list, setList] = useState({ live: [], recent: [] });
    const [listLoaded, setListLoaded] = useState(false);
    const [selectedId, setSelectedId] = useState(params.get("match") || "");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("Live");
    const [filter, setFilter] = useState("all");
    const [cmInnings, setCmInnings] = useState(0);   // 0 = latest innings

    const loadList = useCallback(async () => {
        try {
            // const body = await getMyMatches();
            // // console.log(body)
            // const live = body.data.active.filter((m) => m.status === "live" || m.status === "innings_break");
            // const next = { live, recent: body.data.recent };
            // setList(next);
            // setListLoaded(true);
            // return next;


            const body = await getMyMatches();

            const items = body.data.items || [];

            const live = items.filter(
                (m) => m.status === "live" || m.status === "innings_break"
            );

            const recent = items.filter(
                (m) => m.status === "completed"
            );

            const next = { live, recent };

            setList(next);
            setListLoaded(true);

            return next;

        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || "Could not load matches");
            setListLoaded(true);
            return null;
        }
    }, []);

    // first load: pick a live match, else the latest finished one
    useEffect(() => {
        loadList().then((l) => {
            if (!l || selectedId) return;
            const first = l.live[0] || l.recent[0];
            if (first) setSelectedId(first._id);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadMatch = useCallback(async (silent) => {
        if (!selectedId) return;
        try {
            if (!silent) setLoading(true);
            const body = await getLive(selectedId);
            setData(body.data);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Could not load this match");
        } finally {
            setLoading(false);
        }
    }, [selectedId]);

    useEffect(() => { setData(null); setCmInnings(0); loadMatch(false); }, [loadMatch]);

    const inProgress = !!data && ["live", "innings_break"].includes(data.match.status);

    // score refreshes every 5 seconds while the match is on; the match list every 20
    useEffect(() => {
        if (!inProgress) return;
        const t = setInterval(() => { if (!document.hidden) loadMatch(true); }, 5000);
        return () => clearInterval(t);
    }, [inProgress, loadMatch]);

    useEffect(() => {
        const t = setInterval(() => { if (!document.hidden) loadList(); }, 20000);
        return () => clearInterval(t);
    }, [loadList]);

    const pick = (id) => { setSelectedId(id); setParams(id ? { match: id } : {}); };

    const refresh = () => { loadList(); loadMatch(false); };

    /* ---------- empty / loading states ---------- */

    const selector = (
        <select value={selectedId} onChange={(e) => pick(e.target.value)}
            className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 max-w-full">
            {!selectedId && <option value="">Select a match</option>}
            {list.live.length > 0 && (
                <optgroup label="Live now">
                    {list.live.map((m) => <option key={m._id} value={m._id}>{m.teamA.name} vs {m.teamB.name}</option>)}
                </optgroup>
            )}
            {list.recent.length > 0 && (
                <optgroup label="Recently completed">
                    {list.recent.map((m) => <option key={m._id} value={m._id}>{m.teamA.name} vs {m.teamB.name}</option>)}
                </optgroup>
            )}
        </select>
    );

    const header = (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Live Score</h1>
                <p className="text-sm text-gray-500 mt-1">Real-time scores and ball-by-ball updates</p>
            </div>
            <div className="flex items-center gap-2">
                {(list.live.length > 0 || list.recent.length > 0) && selector}
                <button onClick={refresh}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-3.5 py-2 bg-white hover:bg-gray-50 transition-colors">
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>
        </div>
    );

    const shell = (body) => (
        <div className="h-screen overflow-y-auto no-scrollbar bg-[#F7F7F9]">
            <style>{`
                .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
            <div className="p-4 sm:p-6">{header}{body}</div>
        </div>
    );

    if (!selectedId) {
        return shell(
            <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-sm text-gray-400">
                {listLoaded
                    ? "No live matches right now. A match appears here as soon as scoring starts."
                    : "Loading..."}
            </div>
        );
    }
    if (error && !data) return shell(<div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-sm text-rose-500">{error}</div>);
    if (!data) return shell(<div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-sm text-gray-400">Loading match...</div>);

    /* ---------- data ready ---------- */

    const { match: m, innings, current: cur, winProbability: win, commentary, topPerformer: top, xi } = data;
    const curInn = innings[innings.length - 1];
    const [badgeText, badgeColor] = STATUS_BADGE[m.status] || ["", "#6B7280"];

    const teamBlock = (team) => {
        const inn = innings.find((i) => i.battingTeam._id === team._id);
        return (
            <div className="flex flex-col items-center gap-2 flex-1">
                <TeamCrest team={team} />
                <div className="text-2xl sm:text-3xl font-bold">{inn ? `${inn.runs}/${inn.wickets}` : "–"}</div>
                <div className="text-xs text-gray-400">{inn ? `(${inn.overs} Overs)` : "Yet to bat"}</div>
                <div className="text-sm font-medium text-center">{team.name}</div>
            </div>
        );
    };

    const battingTeamName = curInn?.battingTeam.name;
    const latestCm = cmInnings || (curInn ? curInn.number : 1);
    const cmAll = commentary.filter((c) => c.inningsNumber === latestCm).slice().reverse();
    const liveCm = filterItems(commentary.filter((c) => c.inningsNumber === (curInn?.number || 1)).slice().reverse(), filter).slice(0, 14);

    const last6 = curInn ? curInn.oversBreakdown.slice(-6) : [];
    const hp = cur?.highestPartnership;

    const hero = (
        <div className="rounded-xl overflow-hidden text-white relative" style={{ background: "linear-gradient(160deg, #0B0F19, #111827)" }}>
            <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-white text-[10px] font-bold px-2 py-1 rounded" style={{ background: badgeColor }}>{badgeText}</span>
                        <span className="text-xs text-gray-300">{m.tournament} • Match {m.matchNumber}</span>
                    </div>
                    <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-200">
                        {m.overs ? `${m.overs} Overs Match` : m.format}
                    </span>
                </div>
                {m.tossText && <div className="text-center text-xs sm:text-sm text-gray-300 mb-4">{m.tossText}</div>}
                <div className="flex items-center justify-between gap-2 mb-2">
                    {teamBlock(m.teamA)}
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs text-gray-300 shrink-0">VS</div>
                    {teamBlock(m.teamB)}
                </div>
            </div>
            <div className="bg-[#F5F1E6] text-gray-800 px-4 sm:px-5 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm">
                {m.status === "completed" ? (
                    <span className="text-[#4F46E5] font-semibold">{m.result?.summary}{m.result?.margin ? ` • ${m.result.margin}` : ""}</span>
                ) : curInn ? (
                    <>
                        <span>CRR: <b>{fmt2(curInn.crr)}</b></span>
                        {cur?.chase && (
                            <>
                                <span className="text-gray-400">|</span>
                                <span>RRR: <b>{fmt2(cur.chase.rrr)}</b></span>
                                <span className="text-gray-400">|</span>
                                <span>Target: <b>{cur.chase.target}</b></span>
                                <span className="text-gray-400 hidden sm:inline">|</span>
                                <span className="text-[#4F46E5] font-medium">
                                    {battingTeamName} need {cur.chase.runsNeeded} runs in {cur.chase.ballsLeft} balls
                                </span>
                            </>
                        )}
                        {m.status === "innings_break" && <span className="text-[#4F46E5] font-medium">Innings break</span>}
                    </>
                ) : (
                    <span className="text-gray-600">The match has not started yet.</span>
                )}
            </div>
        </div>
    );

    const tabsBar = (
        <div className="flex items-center gap-5 border-b border-gray-200 overflow-x-auto no-scrollbar">
            {TABS.map((t) => (
                <button key={t.label} onClick={() => setActiveTab(t.label)}
                    className={`flex items-center gap-1.5 pb-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === t.label ? "text-[#4F46E5] border-[#4F46E5]" : "text-gray-500 border-transparent hover:text-gray-700"
                        }`}>
                    <t.icon size={15} />
                    {t.label}
                </button>
            ))}
        </div>
    );

    /* ---------- tab bodies ---------- */

    const liveTab = !curInn ? (
        <Card><p className="py-8 text-center text-sm text-gray-400">Ball-by-ball updates start once the first ball is bowled.</p></Card>
    ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
                <Card title={`Batting – ${curInn.battingTeam.name}`}><BattingTable inn={curInn} compact /></Card>
                <Card title={`Bowling – ${curInn.bowlingTeam.name}`}><BowlingTable inn={curInn} /></Card>
            </div>
            <Card title="Live Commentary" right={<FilterSelect value={filter} onChange={setFilter} />} className="flex flex-col">
                <div className="flex flex-col gap-3 max-h-[440px] overflow-y-auto no-scrollbar pr-1">
                    {liveCm.length === 0 && <p className="py-8 text-center text-sm text-gray-400">Nothing to show yet.</p>}
                    {liveCm.map((c, i) => <CommentaryItem key={i} c={c} />)}
                </div>
                <button onClick={() => setActiveTab("Commentary")} className="text-sm text-[#4F46E5] hover:underline mt-3 self-center">
                    View Full Commentary
                </button>
            </Card>
        </div>
    );

    const scorecardTab = innings.length === 0 ? (
        <Card><p className="py-8 text-center text-sm text-gray-400">The scorecard appears once the match starts.</p></Card>
    ) : (
        <div className="flex flex-col gap-4">
            {innings.map((inn) => (
                <Card key={inn.number} title={`${inn.battingTeam.name} – Innings ${inn.number}`}
                    right={<span className="text-sm font-semibold text-gray-900">{inn.runs}/{inn.wickets} ({inn.overs} ov)</span>}>
                    <BattingTable inn={inn} showOut />
                    <div className="mt-4"><BowlingTable inn={inn} /></div>
                    {inn.fow.length > 0 && (
                        <p className="mt-3 text-xs text-gray-500">
                            Fall of wickets: {inn.fow.map((f) => `${f.runs}-${f.wicket} (${f.name}, ${f.over} ov)`).join(", ")}
                        </p>
                    )}
                </Card>
            ))}
        </div>
    );

    const commentaryTab = (
        <Card title="Full Commentary" right={<FilterSelect value={filter} onChange={setFilter} />}>
            {innings.length > 1 && (
                <div className="flex gap-2 mb-3">
                    {innings.map((inn) => (
                        <button key={inn.number} onClick={() => setCmInnings(inn.number)}
                            className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${latestCm === inn.number ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "border-gray-200 text-gray-600"
                                }`}>
                            {inn.battingTeam.name}
                        </button>
                    ))}
                </div>
            )}
            <div className="flex flex-col gap-3">
                {filterItems(cmAll, filter).map((c, i) => <CommentaryItem key={i} c={c} />)}
                {cmAll.length === 0 && <p className="py-8 text-center text-sm text-gray-400">No balls bowled yet.</p>}
            </div>
        </Card>
    );

    const statsTab = innings.length === 0 ? (
        <Card><p className="py-8 text-center text-sm text-gray-400">Stats appear once the match starts.</p></Card>
    ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {innings.map((inn) => {
                const max = Math.max(1, ...inn.oversBreakdown.map((o) => o.runs));
                const fours = inn.batting.reduce((n, b) => n + b.fours, 0);
                const sixes = inn.batting.reduce((n, b) => n + b.sixes, 0);
                return (
                    <Card key={inn.number} title={`${inn.battingTeam.name} – Runs per over`}>
                        <div className="grid grid-cols-4 gap-2 text-center mb-4">
                            {[["Run rate", fmt2(inn.crr)], ["Fours", fours], ["Sixes", sixes], ["Extras", inn.extras.total]].map(([l, v]) => (
                                <div key={l}>
                                    <div className="text-lg font-bold text-gray-900">{v}</div>
                                    <div className="text-[10px] text-gray-400">{l}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-end gap-1.5 h-32">
                            {inn.oversBreakdown.map((o) => (
                                <div key={o.over} className="flex-1 flex flex-col items-center justify-end gap-1 h-full" title={`Over ${o.over}: ${o.runs} runs`}>
                                    <span className="text-[9px] text-gray-500">{o.runs}</span>
                                    <div className="w-full rounded-t" style={{ height: `${(o.runs / max) * 100}%`, minHeight: 3, background: overBg(o) }} />
                                    <span className="text-[9px] text-gray-400">{o.over}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                );
            })}
        </div>
    );

    const infoTab = (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card title="Match details">
                <div className="text-sm text-gray-600 flex flex-col gap-2">
                    <div>{m.teamA.name} vs {m.teamB.name}</div>
                    <div>{m.format} • {m.overs ? `${m.overs} overs` : "Unlimited overs"}</div>
                    {m.tossText && <div>{m.tossText}</div>}
                    <div>Status: {badgeText}</div>
                    {m.result && <div>Result: {m.result.summary}{m.result.margin ? ` (${m.result.margin})` : ""}</div>}
                </div>
            </Card>
            {[["teamA", m.teamA], ["teamB", m.teamB]].map(([k, team]) => (
                <Card key={k} title={`${team.name} – Playing XI`}>
                    {xi[k].length === 0 ? (
                        <p className="text-sm text-gray-400">No Playing XI saved.</p>
                    ) : (
                        <ol className="text-sm text-gray-700 flex flex-col gap-1.5">
                            {xi[k].map((p, i) => (
                                <li key={p.id} className="flex items-center gap-2">
                                    <span className="w-5 text-xs text-gray-400">{i + 1}</span>
                                    {p.name}
                                    {p.captain && <span className="text-[10px] font-bold text-white bg-amber-400 rounded-full px-1.5">C</span>}
                                    {p.viceCaptain && <span className="text-[10px] font-bold text-white bg-sky-500 rounded-full px-1.5">VC</span>}
                                </li>
                            ))}
                        </ol>
                    )}
                </Card>
            ))}
        </div>
    );

    const tabBody = { Live: liveTab, Scorecard: scorecardTab, Commentary: commentaryTab, Stats: statsTab, Info: infoTab }[activeTab];

    const stats = top?.role === "BOWLER"
        ? [[top.wickets, "Wickets"], [top.conceded, "Runs"], [top.overs, "Overs"], [fmt2(top.conceded / Math.max(0.1, Number(top.overs))), "Econ"]]
        : [[top?.runs, "Runs"], [top?.balls, "Balls"], [top?.fours, "Fours"], [top?.sixes, "Sixes"]];

    /* ---------- bottom bar ---------- */

    const bottomBar = curInn && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
            {cur?.chase ? (
                <>
                    <div><div className="text-xs text-gray-500 mb-1">Required Run Rate</div><div className="text-xl font-bold text-gray-900">{fmt2(cur.chase.rrr)}</div></div>
                    <div><div className="text-xs text-gray-500 mb-1">Runs Needed</div><div className="text-xl font-bold text-gray-900">{cur.chase.runsNeeded}</div></div>
                    <div><div className="text-xs text-gray-500 mb-1">Balls Remaining</div><div className="text-xl font-bold text-gray-900">{cur.chase.ballsLeft}</div></div>
                </>
            ) : (
                <>
                    <div><div className="text-xs text-gray-500 mb-1">Current Run Rate</div><div className="text-xl font-bold text-gray-900">{fmt2(curInn.crr)}</div></div>
                    <div><div className="text-xs text-gray-500 mb-1">Projected Score</div><div className="text-xl font-bold text-gray-900">{cur?.projected ?? "–"}</div></div>
                    <div><div className="text-xs text-gray-500 mb-1">Balls Remaining</div><div className="text-xl font-bold text-gray-900">{cur?.ballsLeft ?? "–"}</div></div>
                </>
            )}
            <div className="col-span-2 sm:col-span-1">
                <div className="text-xs text-gray-500 mb-1">Win Probability <span className="text-gray-400">(estimate)</span></div>
                <div className="flex items-center justify-between gap-2 text-xs font-medium text-gray-700 mb-1">
                    <span className="flex items-center gap-1"><TeamCrest team={m.teamA} size={16} />{m.teamA.name.slice(0, 10)} {win.teamA}%</span>
                    <span className="flex items-center gap-1"><TeamCrest team={m.teamB} size={16} />{m.teamB.name.slice(0, 10)} {win.teamB}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden flex">
                    <div className="h-full bg-[#6D28D9]" style={{ width: `${win.teamA}%` }} />
                    <div className="h-full bg-[#F2B84B]" style={{ width: `${win.teamB}%` }} />
                </div>
            </div>
            <div className="flex items-center gap-3 col-span-2 sm:col-span-3 lg:col-span-1">
                <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0"><Users2 size={18} className="text-[#4F46E5]" /></div>
                <div className="min-w-0">
                    <div className="text-xs text-gray-500">Highest Partnership</div>
                    {hp ? (
                        <>
                            <div className="text-sm font-semibold text-gray-900 truncate">{hp.names}</div>
                            <div className="text-xs text-gray-400">{hp.runs} ({hp.balls}) • Wicket {hp.wicketNo}</div>
                        </>
                    ) : <div className="text-sm text-gray-400">–</div>}
                </div>
            </div>
        </div>
    );

    /* ---------- sidebar ---------- */

    const r = 40;
    const circumference = 2 * Math.PI * r;
    const pPct = cur?.partnership.pct || 0;
    const dash = (pPct / 100) * circumference;

    const sidebar = (
        <div className="xl:col-span-1 flex flex-col gap-4">
            <Card title="Match Info">
                <div className="flex flex-col gap-2.5 text-sm text-gray-600">
                    <div className="flex items-center gap-2"><Calendar size={14} className="text-gray-400 shrink-0" />{fmtDateTime(m.scheduledAt)}</div>
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-gray-400 shrink-0" />{m.venue ? [m.venue.name, m.venue.city].filter(Boolean).join(", ") : "Venue TBD"}</div>
                    <div className="flex items-center gap-2"><Trophy size={14} className="text-gray-400 shrink-0" />{m.tournament} • Match {m.matchNumber}</div>
                    {m.umpires.length > 0 && <div className="flex items-center gap-2"><Users size={14} className="text-gray-400 shrink-0" />Umpires: {m.umpires.join(", ")}</div>}
                    {m.tvUmpire && <div className="flex items-center gap-2"><Tv size={14} className="text-gray-400 shrink-0" />TV Umpire: {m.tvUmpire}</div>}
                </div>
            </Card>

            {cur && (
                <Card title="Partnership">
                    <div className="text-sm text-gray-600 mb-2">
                        {cur.partnership.batters.length ? cur.partnership.batters.map((b) => b.name).join(" & ") : "–"}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{cur.partnership.runs} <span className="text-sm font-normal text-gray-400">({cur.partnership.balls})</span></div>
                            <div className="text-xs text-gray-400">Runs · Balls</div>
                        </div>
                        <div className="relative w-24 h-24 shrink-0">
                            <svg width="96" height="96" viewBox="0 0 96 96">
                                <circle cx="48" cy="48" r={r} fill="none" stroke="#EEF2FF" strokeWidth="8" />
                                <circle cx="48" cy="48" r={r} fill="none" stroke="#4F46E5" strokeWidth="8"
                                    strokeDasharray={`${dash} ${circumference}`} strokeLinecap="round" transform="rotate(-90 48 48)" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-lg font-bold text-gray-900">{pPct}%</span>
                                <span className="text-[9px] text-gray-400">of Runs</span>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {last6.length > 0 && (
                <Card title="Last 6 Overs">
                    <div className="grid gap-1.5 text-center" style={{ gridTemplateColumns: `repeat(${last6.length}, minmax(0, 1fr))` }}>
                        {last6.map((o) => <div key={o.over} className="text-[10px] text-gray-400">{o.over}</div>)}
                        {last6.map((o) => (
                            <div key={`${o.over}-r`} className="w-7 h-7 mx-auto rounded-full flex items-center justify-center text-white text-[11px] font-semibold" style={{ background: overBg(o) }}>
                                {o.runs}
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 flex flex-col gap-1">
                        {last6.map((o) => (
                            <div key={`${o.over}-d`} className="flex items-center justify-between text-[11px] text-gray-500">
                                <span>Over {o.over}{o.partial ? " (in progress)" : ""}</span>
                                <span className="tracking-wider">{o.detail}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            <Card title={m.status === "completed" ? "Player of the Match" : "Top Performer"}>
                {top ? (
                    <>
                        <div className="flex items-center gap-3 mb-3">
                            <TeamCrest team={{ name: top.name }} size={56} />
                            <div className="min-w-0">
                                <div className="font-semibold text-gray-900 truncate">{top.name}</div>
                                <div className="text-xs text-gray-400 truncate">{top.team}</div>
                                <span className="inline-block mt-1 text-[10px] font-bold text-white bg-[#4F46E5] px-2 py-0.5 rounded">{top.role}</span>
                            </div>
                        </div>
                        {/* <div className="grid grid-cols-4 gap-2 text-center border-t border-gray-100 pt-3">
                            {top.role === "BOWLER"
                                ? [[top.wickets, "Wickets"], [top.conceded, "Runs"], [top.overs, "Overs"], [fmt2(top.conceded / Math.max(0.1, Number(top.overs))), "Econ"]]
                                : [[top.runs, "Runs"], [top.balls, "Balls"], [top.fours, "Fours"], [top.sixes, "Sixes"]].map((x) => x)
                            .map(([v, l]) => (
                                <div key={l}>
                                    <div className="text-sm font-bold text-gray-900">{v}</div>
                                    <div className="text-[10px] text-gray-400">{l}</div>
                                </div>
                            ))}
                        </div> */}
                        <div className="grid grid-cols-4 gap-2 text-center border-t border-gray-100 pt-3">
                            {stats.map(([v, l]) => (
                                <div key={l}>
                                    <div className="text-sm font-bold text-gray-900">{v}</div>
                                    <div className="text-[10px] text-gray-400">{l}</div>
                                </div>
                            ))}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">{top.summary}{top.role !== "BOWLER" ? ` • SR ${top.sr}` : ""}</div>
                    </>
                ) : (
                    <p className="text-sm text-gray-400">Shown once there are runs or wickets.</p>
                )}
            </Card>
        </div>
    );

    return shell(
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 items-start">
            <div className="xl:col-span-3 flex flex-col gap-4 min-w-0">
                {hero}
                {tabsBar}
                {tabBody}
                {bottomBar}
            </div>
            {sidebar}
        </div>
    );
}

export default OrgLiveScores