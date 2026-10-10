import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Undo2 } from "lucide-react";
import toast from "react-hot-toast";
import * as api from "../store/API/scoringAPI";

/* ------------------------------ helpers ------------------------------ */

const uuid = () =>
    typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const WICKET_LABEL = {
    bowled: "Bowled", caught: "Caught", lbw: "LBW", run_out: "Run out",
    stumped: "Stumped", hit_wicket: "Hit wicket", other: "Other",
};
const ALLOWED_ON_EXTRA = { wide: ["stumped", "run_out", "hit_wicket"], no_ball: ["run_out"] };
const NEEDS_FIELDER = ["caught", "run_out", "stumped"];
const BALL_STYLE = {
    dot: "bg-gray-400", run: "bg-emerald-600", four: "bg-blue-600",
    six: "bg-violet-600", wicket: "bg-red-600", extra: "bg-amber-500",
};
const EXTRA_BUTTONS = [
    { key: "wide", label: "Wide" }, { key: "no_ball", label: "No ball" },
    { key: "bye", label: "Bye" }, { key: "leg_bye", label: "Leg bye" },
];

const Card = ({ title, children, className = "" }) => (
    <div className={`rounded-xl border border-gray-200 bg-white p-4 ${className}`}>
        {title && <h3 className="mb-3 text-sm font-semibold text-gray-700">{title}</h3>}
        {children}
    </div>
);

const Select = ({ label, value, onChange, options, placeholder }) => (
    <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
        >
            <option value="">{placeholder}</option>
            {options.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
    </div>
);

const Primary = ({ children, ...p }) => (
    <button
        {...p}
        className="h-11 w-full rounded-xl bg-[#4F46E5] text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] disabled:cursor-not-allowed disabled:opacity-40"
    >
        {children}
    </button>
);

const inningsLine = (i) => `${i.team} ${i.runs}/${i.wickets} (${i.overs} ov)`;

/* -------------------------------- toss -------------------------------- */

function TossStep({ data, busy, onSubmit }) {
    const { teamA, teamB, format } = data.match;
    const [winner, setWinner] = useState("");
    const [decision, setDecision] = useState("");
    const missing = [!data.xiReady.teamA && teamA.name, !data.xiReady.teamB && teamB.name].filter(Boolean);


    const tile = (active) =>
        `rounded-xl border-2 px-4 py-4 text-sm font-semibold transition-colors ${active ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "border-gray-200 text-gray-700 hover:bg-gray-50"
        }`;



    return (
        <Card title="Toss">
            {missing.length > 0 && (
                <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                    Save a {format} Playing XI for {missing.join(" and ")} first (Teams → Playing XI), then come back.
                </div>
            )}
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Who won the toss?</p>
            <div className="mb-5 grid grid-cols-2 gap-3">
                {[teamA, teamB].map((t) => (
                    <button key={t._id} onClick={() => setWinner(t._id)} className={tile(winner === t._id)}>{t.name}</button>
                ))}
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">They chose to</p>
            <div className="mb-5 grid grid-cols-2 gap-3">
                <button onClick={() => setDecision("bat")} className={tile(decision === "bat")}>Bat first</button>
                <button onClick={() => setDecision("bowl")} className={tile(decision === "bowl")}>Bowl first</button>
            </div>
            <Primary disabled={busy || !winner || !decision || missing.length > 0} onClick={() => onSubmit({ winnerTeamId: winner, decision })}>
                Record toss
            </Primary>
        </Card>
    );
}

/* ------------------------------- openers ------------------------------ */

function OpenersStep({ data, busy, onSubmit }) {
    const s = data.setup;
    const [striker, setStriker] = useState("");
    const [nonStriker, setNonStriker] = useState("");
    const [bowler, setBowler] = useState("");
    const toss = data.match.toss;
    const first = data.innings[0];

    return (
        <Card title={`Start innings ${s.inningsNumber}`}>
            <p className="mb-4 text-sm text-gray-600">
                {s.step === "openers" && toss
                    ? `${toss.winner.name} won the toss and chose to ${toss.decision}. ${s.battingTeam.name} bat first.`
                    : `Innings break. ${first ? inningsLine(first) : ""}. ${s.battingTeam.name} need ${s.target} runs to win.`}
            </p>
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Select label={`Striker (${s.battingTeam.name})`} value={striker} onChange={setStriker} placeholder="Select striker" options={s.battingXI} />
                <Select
                    label="Non-striker"
                    value={nonStriker}
                    onChange={setNonStriker}
                    placeholder="Select non-striker"
                    options={s.battingXI.filter((p) => p.id !== striker)}
                />
                <Select label={`Opening bowler (${s.bowlingTeam.name})`} value={bowler} onChange={setBowler} placeholder="Select bowler" options={s.bowlingXI} />
            </div>
            <Primary disabled={busy || !striker || !nonStriker || !bowler} onClick={() => onSubmit({ striker, nonStriker, bowler })}>
                Start innings {s.inningsNumber}
            </Primary>
        </Card>
    );
}

/* ------------------------------ scorecard ----------------------------- */

function Scorecard({ c }) {
    return (
        <Card title={`${c.battingTeam.name} — innings ${c.number}`}>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-sm">
                    <thead>
                        <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400">
                            <th className="py-2 font-medium">Batter</th>
                            <th className="py-2 text-right font-medium">R</th>
                            <th className="py-2 text-right font-medium">B</th>
                            <th className="py-2 text-right font-medium">4s</th>
                            <th className="py-2 text-right font-medium">6s</th>
                            <th className="py-2 text-right font-medium">SR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {c.batting.map((b) => (
                            <tr key={b.id} className="border-t border-gray-50">
                                <td className="py-2">
                                    <div className="font-medium text-gray-800">{b.name}</div>
                                    <div className="text-xs text-gray-400">{b.out}</div>
                                </td>
                                <td className="py-2 text-right font-semibold">{b.runs}</td>
                                <td className="py-2 text-right text-gray-600">{b.balls}</td>
                                <td className="py-2 text-right text-gray-600">{b.fours}</td>
                                <td className="py-2 text-right text-gray-600">{b.sixes}</td>
                                <td className="py-2 text-right text-gray-600">{b.sr}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-2 text-xs text-gray-500">
                Extras {c.extras.total} (wd {c.extras.wides}, nb {c.extras.noBalls}, b {c.extras.byes}, lb {c.extras.legByes})
            </p>

            <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[420px] text-sm">
                    <thead>
                        <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400">
                            <th className="py-2 font-medium">Bowler</th>
                            <th className="py-2 text-right font-medium">O</th>
                            <th className="py-2 text-right font-medium">R</th>
                            <th className="py-2 text-right font-medium">W</th>
                            <th className="py-2 text-right font-medium">Econ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {c.bowling.map((b) => (
                            <tr key={b.id} className="border-t border-gray-50">
                                <td className="py-2 font-medium text-gray-800">{b.name}</td>
                                <td className="py-2 text-right text-gray-600">{b.overs}</td>
                                <td className="py-2 text-right text-gray-600">{b.runs}</td>
                                <td className="py-2 text-right font-semibold">{b.wickets}</td>
                                <td className="py-2 text-right text-gray-600">{b.econ}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {c.fow.length > 0 && (
                <p className="mt-3 text-xs text-gray-500">
                    Fall of wickets: {c.fow.map((f) => `${f.runs}-${f.wicket} (${f.name}, ${f.over} ov)`).join(", ")}
                </p>
            )}
        </Card>
    );
}

/* ------------------------------ wicket modal -------------------------- */

function WicketModal({ c, bowlingXI, extra, onClose, onSubmit }) {
    const types = Object.keys(WICKET_LABEL).filter((t) => !ALLOWED_ON_EXTRA[extra] || ALLOWED_ON_EXTRA[extra].includes(t));
    const [type, setType] = useState(types[0]);
    const [out, setOut] = useState(c.striker.id);
    const [fielder, setFielder] = useState("");
    const [runs, setRuns] = useState(0);
    const strikerOnly = ["bowled", "caught", "lbw", "stumped", "hit_wicket"].includes(type);
    const playerOut = strikerOnly ? c.striker.id : out;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Wicket</h3>
                <div className="space-y-4">
                    <Select label="How out?" value={type} onChange={setType} placeholder="Select" options={types.map((t) => ({ id: t, name: WICKET_LABEL[t] }))} />
                    {!strikerOnly && (
                        <Select
                            label="Who is out?"
                            value={out}
                            onChange={setOut}
                            placeholder="Select"
                            options={[c.striker, c.nonStriker].map((p) => ({ id: p.id, name: p.name }))}
                        />
                    )}
                    {NEEDS_FIELDER.includes(type) && (
                        <Select label="Fielder (optional)" value={fielder} onChange={setFielder} placeholder="Not recorded" options={bowlingXI} />
                    )}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Runs completed on this ball
                        </label>
                        <div className="flex gap-2">
                            {[0, 1, 2, 3].map((n) => (
                                <button
                                    key={n}
                                    onClick={() => setRuns(n)}
                                    className={`h-10 w-10 rounded-lg border text-sm font-semibold ${runs === n ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "border-gray-200 text-gray-600"}`}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex gap-3">
                    <button onClick={onClose} className="h-10 flex-1 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button
                        onClick={() => onSubmit(runs, { type, playerOut, fielder: fielder || undefined })}
                        className="h-10 flex-1 rounded-lg bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
                    >
                        Confirm wicket
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------ pick a player ------------------------- */

function PickPlayer({ title, players, onPick, busy }) {
    return (
        <Card title={title} className="border-amber-200 bg-amber-50/40">
            {players.length === 0 ? (
                <p className="text-sm text-gray-500">No eligible players left.</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {players.map((p) => (
                        <button
                            key={p.id}
                            disabled={busy}
                            onClick={() => onPick(p.id)}
                            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5] disabled:opacity-40"
                        >
                            {p.name}
                        </button>
                    ))}
                </div>
            )}
        </Card>
    );
}

/* -------------------------------- console ----------------------------- */

function Console({ data, busy, onBall, onUndo, onBatter, onBowler }) {
    const c = data.current;
    const m = data.match;
    const [extra, setExtra] = useState(null);
    const [wicketOpen, setWicketOpen] = useState(false);
    const blocked = busy || c.needs.batter || c.needs.bowler;

    const payload = (n, wicket) => {
        const p = { runs: 0, extraType: extra, extraRuns: 0 };
        if (extra === "wide") p.extraRuns = 1 + n;
        else if (extra === "no_ball") { p.runs = n; p.extraRuns = 1; }
        else if (extra === "bye" || extra === "leg_bye") p.extraRuns = n;
        else p.runs = n;
        if (wicket) { p.isWicket = true; p.wicket = wicket; }
        return p;
    };
    const send = async (n, wicket) => {
        await onBall(payload(n, wicket));
        setExtra(null);
    };

    const hint = {
        wide: "Wide: tap the extra runs run (0 = just the wide)",
        no_ball: "No ball: tap the runs hit off the bat (0 = just the no ball)",
        bye: "Bye: tap how many byes were run",
        leg_bye: "Leg bye: tap how many leg byes were run",
    }[extra];

    return (
        <>
            <Card>
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <div className="text-xs text-gray-500">{c.battingTeam.name} · Innings {c.number}</div>
                        <div className="text-4xl font-bold text-gray-900">{c.runs}/{c.wickets}</div>
                        <div className="text-sm text-gray-500">{c.overs} / {m.overs} overs · CRR {c.crr}</div>
                    </div>
                    {c.chase && (
                        <div className="text-right text-sm">
                            <div className="font-semibold text-[#4F46E5]">
                                {c.battingTeam.name} need {c.chase.runsNeeded} runs in {c.chase.ballsLeft} balls
                            </div>
                            <div className="text-gray-500">Target {c.chase.target} · RRR {c.chase.rrr ?? "–"}</div>
                        </div>
                    )}
                </div>
                {data.innings[0] && c.number === 2 && (
                    <div className="mt-2 text-xs text-gray-400">1st innings: {inningsLine(data.innings[0])}</div>
                )}
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card title="Batters">
                    {[c.striker, c.nonStriker].map((b, i) =>
                        b ? (
                            <div key={b.id} className="flex items-center justify-between border-b border-gray-50 py-2 last:border-0">
                                <span className={`text-sm ${i === 0 ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                                    {b.name}{i === 0 ? " *" : ""}
                                </span>
                                <span className="text-sm text-gray-700">{b.runs} ({b.balls}) · {b.fours}x4 · {b.sixes}x6</span>
                            </div>
                        ) : (
                            <div key={i} className="py-2 text-sm text-amber-600">New batter needed</div>
                        )
                    )}
                </Card>
                <Card title="Bowler">
                    {c.bowler ? (
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm font-semibold text-gray-900">{c.bowler.name}</span>
                            <span className="text-sm text-gray-700">{c.bowler.overs}-{c.bowler.runs}-{c.bowler.wickets} · econ {c.bowler.econ}</span>
                        </div>
                    ) : (
                        <div className="py-2 text-sm text-amber-600">New bowler needed</div>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-gray-400">Last balls</span>
                        {c.lastBalls.length === 0 && <span className="text-xs text-gray-400">–</span>}
                        {c.lastBalls.map((b, i) => (
                            <span key={i} className={`flex h-7 min-w-[28px] items-center justify-center rounded-full px-1.5 text-xs font-semibold text-white ${BALL_STYLE[b.kind]}`}>
                                {b.text}
                            </span>
                        ))}
                    </div>
                </Card>
            </div>

            {c.needs.batter && <PickPlayer title="Select the new batter" players={c.availableBatters} onPick={onBatter} busy={busy} />}
            {c.needs.bowler && <PickPlayer title="Select the bowler for the next over" players={c.availableBowlers} onPick={onBowler} busy={busy} />}

            <Card title="Score this ball">
                <div className="mb-3 flex flex-wrap gap-2">
                    {EXTRA_BUTTONS.map((e) => (
                        <button
                            key={e.key}
                            disabled={blocked}
                            onClick={() => setExtra(extra === e.key ? null : e.key)}
                            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold disabled:opacity-40 ${extra === e.key ? "border-amber-500 bg-amber-50 text-amber-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            {e.label}
                        </button>
                    ))}
                </div>
                {hint && <p className="mb-3 text-xs text-amber-700">{hint}</p>}

                <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                    {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                        <button
                            key={n}
                            disabled={blocked || ((extra === "bye" || extra === "leg_bye") && n === 0)}
                            onClick={() => send(n)}
                            className="h-14 rounded-xl border border-gray-200 text-lg font-bold text-gray-800 transition-colors hover:bg-[#EEF2FF] hover:text-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {n}
                        </button>
                    ))}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                        disabled={blocked}
                        onClick={() => setWicketOpen(true)}
                        className="h-11 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-40"
                    >
                        Wicket
                    </button>
                    <button
                        disabled={busy || !data.canUndo}
                        onClick={onUndo}
                        className="flex h-11 items-center justify-center gap-1.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                    >
                        <Undo2 size={15} /> Undo last ball
                    </button>
                </div>
            </Card>

            <Scorecard c={c} />

            {wicketOpen && (
                <WicketModal
                    c={c}
                    extra={extra}
                    bowlingXI={[]}
                    onClose={() => setWicketOpen(false)}
                    onSubmit={async (runs, wicket) => {
                        setWicketOpen(false);
                        await send(runs, wicket);
                    }}
                />
            )}
        </>
    );
}

/* --------------------------------- page ------------------------------- */

export default function MatchScoring() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);


    const load = useCallback(async () => {
        try {
            const body = await api.getState(id);
            // console.log(body)
            setData(body.data);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load this match");
        }
    }, [id]);

    useEffect(() => { load(); }, [load]);

    const act = async (call, successMsg) => {
        try {
            setBusy(true);
            const body = await call();
            setData(body.data);
            if (successMsg) toast.success(successMsg);
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setBusy(false);
        }
    };

    if (error) return <div className="p-6 text-sm text-rose-500">{error}</div>;
    if (!data) return <div className="p-6 text-sm text-gray-400">Loading match...</div>;

    const m = data.match;
    const status = m.status;

    return (
        <div className="h-screen overflow-y-auto bg-[#F7F7F9] p-4 sm:p-6">
            <div className="mx-auto max-w-4xl space-y-4">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                        <ArrowLeft size={16} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{m.teamA.name} vs {m.teamB.name}</h1>
                        <p className="text-xs text-gray-500">
                            {m.tournament} · Match {m.matchNumber} · {m.format} · {m.overs} overs{m.venue ? ` · ${m.venue}` : ""}
                        </p>
                    </div>
                    <span className="ml-auto rounded-full bg-white px-3 py-1 text-xs font-medium capitalize text-gray-600 border border-gray-200">
                        {status.replace("_", " ")}
                    </span>
                </div>

                {status === "scheduled" && (
                    <TossStep data={data} busy={busy} onSubmit={(b) => act(() => api.recordToss(id, b), "Toss recorded")} />
                )}

                {(status === "toss_done" || status === "innings_break") && (
                    <>
                        {status === "innings_break" && data.current && <Scorecard c={data.current} />}
                        <OpenersStep
                            key={data.setup.inningsNumber}
                            data={data}
                            busy={busy}
                            onSubmit={(b) => act(() => api.startInnings(id, b), `Innings ${data.setup.inningsNumber} started`)}
                        />
                    </>
                )}

                {status === "live" && data.current && (
                    <Console
                        data={data}
                        busy={busy}
                        onBall={(b) => act(() => api.recordBall(id, { ballUuid: uuid(), ...b }))}
                        onUndo={() => act(() => api.undoBall(id), "Last ball removed")}
                        onBatter={(pid) => act(() => api.selectBatter(id, pid))}
                        onBowler={(pid) => act(() => api.selectBowler(id, pid))}
                    />
                )}

                {status === "completed" && (
                    <>
                        <Card className="border-emerald-200 bg-emerald-50/50">
                            <div className="text-lg font-bold text-gray-900">{m.result?.summary}</div>
                            {m.result?.margin && <div className="text-sm text-gray-600">{m.result.margin}</div>}
                            <div className="mt-2 space-y-0.5 text-sm text-gray-600">
                                {data.innings.map((i) => <div key={i.number}>{inningsLine(i)}</div>)}
                            </div>
                            {data.canUndo && (
                                <button
                                    disabled={busy}
                                    onClick={() => act(() => api.undoBall(id), "Last ball removed")}
                                    className="mt-3 flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    <Undo2 size={13} /> Undo last ball
                                </button>
                            )}
                        </Card>
                        {data.current && <Scorecard c={data.current} />}
                    </>
                )}

                {(status === "cancelled" || status === "abandoned") && (
                    <Card><p className="text-sm text-gray-500">This match was {status}.</p></Card>
                )}
            </div>
        </div>
    );
}