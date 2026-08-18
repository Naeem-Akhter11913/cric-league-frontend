import React, { useState } from 'react'
import {
    Radio,
    FileText,
    MessageSquare,
    BarChart3,
    Info,
    Play,
    RefreshCw,
    Calendar,
    MapPin,
    Trophy,
    Users,
    Tv,
    ChevronDown,
    Users2,
} from 'lucide-react'

const teamColors = {
    "Royal Warriors": { bg: "#6D28D9", fg: "#FFFFFF", label: "RW" },
    "Super Kings": { bg: "#F2B84B", fg: "#7A4B00", label: "SK" },
};

const TeamCrest = ({ name, size = 56 }) => {
    const c = teamColors[name] || { bg: "#9CA3AF", fg: "#FFFFFF", label: name.slice(0, 2).toUpperCase() };
    return (
        <div
            className="rounded-2xl flex items-center justify-center font-bold shrink-0"
            style={{ width: size, height: size, background: c.bg, color: c.fg, fontSize: size * 0.3 }}
        >
            {c.label}
        </div>
    );
};

const tabs = [
    { label: "Live", icon: Radio },
    { label: "Scorecard", icon: FileText },
    { label: "Commentary", icon: MessageSquare },
    { label: "Stats", icon: BarChart3 },
    { label: "Info", icon: Info },
];

const battingRows = [
    { name: "Naeem Akhter *", r: 52, b: 31, fours: 5, sixes: 2, sr: "167.7", highlight: true },
    { name: "Asif Khan", r: 28, b: 19, fours: 2, sixes: 1, sr: "147.4" },
    { name: "Arif Malik", r: 18, b: 12, fours: 1, sixes: 1, sr: "150.0" },
    { name: "Sameer Ansari", r: 12, b: 8, fours: 0, sixes: 0, sr: "150.0" },
];

const bowlingRows = [
    { name: "Imran Ali", o: "3.3", m: 0, r: 28, w: 2, econ: "8.00" },
    { name: "Arjun Verma", o: "3.0", m: 0, r: 22, w: 1, econ: "7.33" },
    { name: "Rakesh Singh", o: "3.0", m: 0, r: 19, w: 0, econ: "6.33" },
    { name: "Deepak Chahar", o: "3.0", m: 0, r: 27, w: 1, econ: "9.00" },
];

const commentary = [
    { over: "15.3", ball: "6", ballBg: "#7C3AED", bowler: "Imran Ali", batter: "Naeem Akhter", text: "SIX! That's a massive shot over long-on!" },
    { over: "15.2", ball: "2", ballBg: "#16A34A", bowler: "Imran Ali", batter: "Asif Khan", text: "Two runs." },
    { over: "15.1", ball: "1", ballBg: "#16A34A", bowler: "Imran Ali", batter: "Asif Khan", text: "Quick single." },
    { endOfOver: 15, runs: 10 },
    { over: "14.6", ball: "4", ballBg: "#16A34A", bowler: "Arjun Verma", batter: "Naeem Akhter", text: "FOUR! Back-to-back boundaries!" },
    { over: "14.5", ball: "4", ballBg: "#16A34A", bowler: "Arjun Verma", batter: "Naeem Akhter", text: "Beautiful drive through covers!" },
    { over: "14.4", ball: "1", ballBg: "#9CA3AF", bowler: "Arjun Verma", batter: "Asif Khan", text: "Pushed to mid-off." },
    { over: "14.3", ball: "W", ballBg: "#DC2626", bowler: "Arjun Verma", batter: "Arif Malik", text: "OUT! Caught at deep mid-wicket!", sub: "Arif Malik c Deepak Chahar b Arjun Verma 18 (12)" },
    { over: "14.2", ball: "0", ballBg: "#9CA3AF", bowler: "Arjun Verma", batter: "Arif Malik", text: "No run." },
    { over: "14.1", ball: "1", ballBg: "#16A34A", bowler: "Arjun Verma", batter: "Naeem Akhter", text: "Quick single." },
];

const overSummaries = [
    { over: 10, ball: "8", bg: "#16A34A", detail: "1 W 1 1 4 1" },
    { over: 11, ball: "6", bg: "#16A34A", detail: "4 4 1 1 . ." },
    { over: 12, ball: "12", bg: "#16A34A", detail: "W 0 2 1 4 1" },
    { over: 13, ball: "7", bg: "#F97316", detail: "1 4 1 1 . ." },
    { over: 14, ball: "11", bg: "#9CA3AF", detail: "1 W 0 1 4 1" },
    { over: 15, ball: "10", bg: "#2563EB", detail: "1 1 6 2 . ." },
];

const OrgLiveScores = () => {
    const [activeTab, setActiveTab] = useState("Live");

    const winPct = { rw: 68, sk: 32 };
    const partnershipPct = 50;
    const r = 40;
    const circumference = 2 * Math.PI * r;
    const dash = (partnershipPct / 100) * circumference;

    return (
        <div className="h-screen overflow-y-auto no-scrollbar bg-[#F7F7F9]">
            <style>{`
                .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

            <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="mb-5">
                    <h1 className="text-2xl font-bold text-gray-900">Live Score</h1>
                    <p className="text-sm text-gray-500 mt-1">Real-time scores and ball-by-ball updates</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 items-start">
                    {/* MAIN column */}
                    <div className="xl:col-span-3 flex flex-col gap-4 min-w-0">
                        {/* Hero */}
                        <div className="rounded-xl overflow-hidden text-white relative" style={{ background: "linear-gradient(160deg, #0B0F19, #111827)" }}>
                            <div className="p-4 sm:p-5">
                                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-1 rounded">LIVE</span>
                                        <span className="text-xs text-gray-300">Naeem Premier League 2026 • Match 18</span>
                                    </div>
                                    <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-200">20 Overs Match</span>
                                </div>
                                <div className="text-center text-xs sm:text-sm text-gray-300 mb-4">
                                    Royal Warriors won the toss and elected to bat
                                </div>
                                <div className="flex items-center justify-between gap-2 mb-4">
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                        <TeamCrest name="Royal Warriors" />
                                        <div className="text-2xl sm:text-3xl font-bold">128/4</div>
                                        <div className="text-xs text-gray-400">(15.3 Overs)</div>
                                        <div className="text-sm font-medium">Royal Warriors</div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs text-gray-300 shrink-0">
                                        VS
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                        <TeamCrest name="Super Kings" />
                                        <div className="text-2xl sm:text-3xl font-bold">125/6</div>
                                        <div className="text-xs text-gray-400">(20 Overs)</div>
                                        <div className="text-sm font-medium">Super Kings</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#F5F1E6] text-gray-800 px-4 sm:px-5 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm">
                                <span>CRR: <b>8.26</b></span>
                                <span className="text-gray-400">|</span>
                                <span>RRR: <b>9.78</b></span>
                                <span className="text-gray-400">|</span>
                                <span>Target: <b>172</b></span>
                                <span className="text-gray-400 hidden sm:inline">|</span>
                                <span className="text-[#4F46E5] font-medium">Royal Warriors need 44 runs in 27 balls</span>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-5 border-b border-gray-200 flex-1 overflow-x-auto no-scrollbar">
                                {tabs.map((t) => (
                                    <button
                                        key={t.label}
                                        onClick={() => setActiveTab(t.label)}
                                        className={`flex items-center gap-1.5 pb-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                                            activeTab === t.label ? "text-[#4F46E5] border-[#4F46E5]" : "text-gray-500 border-transparent hover:text-gray-700"
                                        }`}
                                    >
                                        <t.icon size={15} />
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button className="flex items-center gap-1.5 text-sm font-medium text-[#4F46E5] border border-[#4F46E5]/30 rounded-lg px-3.5 py-2 hover:bg-[#EEF2FF] transition-colors">
                                    <Play size={14} fill="currentColor" />
                                    Watch Live
                                </button>
                                <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-3.5 py-2 hover:bg-gray-50 transition-colors">
                                    <RefreshCw size={14} />
                                    Refresh
                                </button>
                            </div>
                        </div>

                        {activeTab === "Live" ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Batting + Bowling */}
                                <div className="flex flex-col gap-4">
                                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                                        <h3 className="font-semibold text-gray-900 mb-3">Batting – Royal Warriors</h3>
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
                                                    {battingRows.map((b, i) => (
                                                        <tr key={i} className="border-b border-gray-50 last:border-0">
                                                            <td className={`py-2 truncate ${b.highlight ? "text-[#4F46E5] font-medium" : "text-gray-800"}`}>{b.name}</td>
                                                            <td className="py-2 px-1 text-gray-800 font-medium">{b.r}</td>
                                                            <td className="py-2 px-1 text-gray-600">{b.b}</td>
                                                            <td className="py-2 px-1 text-gray-600">{b.fours}</td>
                                                            <td className="py-2 px-1 text-gray-600">{b.sixes}</td>
                                                            <td className="py-2 px-1 text-gray-600">{b.sr}</td>
                                                        </tr>
                                                    ))}
                                                    <tr className="border-b border-gray-50">
                                                        <td className="py-2 text-gray-500" colSpan={6}>Extras: 18 (b 2, lb 6, wd 8, nb 2)</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-2 font-bold text-gray-900">Total</td>
                                                        <td className="py-2 font-bold text-gray-900" colSpan={3}>128/4 (15.3 Overs)</td>
                                                        <td className="py-2 font-bold text-gray-900" colSpan={2}>CRR: 8.26</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                                        <h3 className="font-semibold text-gray-900 mb-3">Bowling – Super Kings</h3>
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
                                                    {bowlingRows.map((b, i) => (
                                                        <tr key={i} className="border-b border-gray-50 last:border-0">
                                                            <td className="py-2 text-gray-800 truncate">{b.name}</td>
                                                            <td className="py-2 px-1 text-gray-600">{b.o}</td>
                                                            <td className="py-2 px-1 text-gray-600">{b.m}</td>
                                                            <td className="py-2 px-1 text-gray-600">{b.r}</td>
                                                            <td className="py-2 px-1 text-gray-800 font-medium">{b.w}</td>
                                                            <td className="py-2 px-1 text-gray-600">{b.econ}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Live commentary */}
                                <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-semibold text-gray-900">Live Commentary</h3>
                                        <button className="flex items-center gap-1 text-xs font-medium text-[#4F46E5]">
                                            All Balls
                                            <ChevronDown size={13} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-3 max-h-[440px] overflow-y-auto no-scrollbar pr-1">
                                        {commentary.map((c, i) =>
                                            c.endOfOver ? (
                                                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-xs font-medium text-gray-500">
                                                    <span>End of Over {c.endOfOver}</span>
                                                    <span>{c.runs} Runs</span>
                                                </div>
                                            ) : (
                                                <div key={i} className="flex items-start gap-3">
                                                    <span className="text-[11px] text-gray-400 w-8 pt-1 shrink-0">{c.over}</span>
                                                    <div
                                                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 mt-0.5"
                                                        style={{ background: c.ballBg }}
                                                    >
                                                        {c.ball}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="text-xs text-gray-500 truncate">{c.bowler} to {c.batter}</div>
                                                        <div className="text-sm text-gray-800">{c.text}</div>
                                                        {c.sub && <div className="text-xs text-gray-500 mt-0.5">{c.sub}</div>}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <button className="text-sm text-[#4F46E5] hover:underline mt-3 self-center">
                                        View Full Commentary
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-sm text-gray-400">
                                {activeTab} content goes here.
                            </div>
                        )}

                        {/* Bottom stats bar */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Required Run Rate</div>
                                <div className="text-xl font-bold text-gray-900">9.78</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Runs Needed</div>
                                <div className="text-xl font-bold text-gray-900">44</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Balls Remaining</div>
                                <div className="text-xl font-bold text-gray-900">27</div>
                            </div>
                            <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                                <div className="text-xs text-gray-500 mb-1">Win Probability</div>
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-1">
                                    <span className="flex items-center gap-1"><TeamCrest name="Royal Warriors" size={16} />RW {winPct.rw}%</span>
                                    <span className="flex items-center gap-1"><TeamCrest name="Super Kings" size={16} />SK {winPct.sk}%</span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden flex">
                                    <div className="h-full bg-[#6D28D9]" style={{ width: `${winPct.rw}%` }}></div>
                                    <div className="h-full bg-[#F2B84B]" style={{ width: `${winPct.sk}%` }}></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 col-span-2 sm:col-span-3 lg:col-span-1">
                                <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
                                    <Users2 size={18} className="text-[#4F46E5]" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-xs text-gray-500">Highest Partnership</div>
                                    <div className="text-sm font-semibold text-gray-900 truncate">Naeem Akhter & Asif Khan</div>
                                    <div className="text-xs text-gray-400">80 (40) • 4th Wicket Partnership</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT sidebar */}
                    <div className="xl:col-span-1 flex flex-col gap-4">
                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 mb-3">Match Info</h3>
                            <div className="flex flex-col gap-2.5 text-sm text-gray-600">
                                <div className="flex items-center gap-2"><Calendar size={14} className="text-gray-400 shrink-0" />May 24, 2026 • 7:00 PM</div>
                                <div className="flex items-center gap-2"><MapPin size={14} className="text-gray-400 shrink-0" />City Stadium, City</div>
                                <div className="flex items-center gap-2"><Trophy size={14} className="text-gray-400 shrink-0" />NPL 2026 • Match 18</div>
                                <div className="flex items-center gap-2"><Users size={14} className="text-gray-400 shrink-0" />Umpires: Kumar, Ramesh</div>
                                <div className="flex items-center gap-2"><Tv size={14} className="text-gray-400 shrink-0" />TV Umpire: Siddharth</div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 mb-3">Partnership</h3>
                            <div className="text-sm text-gray-600 mb-2">Naeem Akhter & Asif Khan</div>
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">80 <span className="text-sm font-normal text-gray-400">(40)</span></div>
                                    <div className="text-xs text-gray-400">Runs · Balls</div>
                                </div>
                                <div className="relative w-24 h-24 shrink-0">
                                    <svg width="96" height="96" viewBox="0 0 96 96">
                                        <circle cx="48" cy="48" r={r} fill="none" stroke="#EEF2FF" strokeWidth="8" />
                                        <circle
                                            cx="48" cy="48" r={r} fill="none" stroke="#4F46E5" strokeWidth="8"
                                            strokeDasharray={`${dash} ${circumference}`}
                                            strokeLinecap="round"
                                            transform="rotate(-90 48 48)"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-lg font-bold text-gray-900">{partnershipPct}%</span>
                                        <span className="text-[9px] text-gray-400">of Runs</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 mb-3">Last 6 Overs</h3>
                            <div className="grid grid-cols-6 gap-1.5 text-center">
                                {overSummaries.map((o) => (
                                    <div key={o.over} className="text-[10px] text-gray-400">{o.over}</div>
                                ))}
                                {overSummaries.map((o) => (
                                    <div
                                        key={o.over + "-ball"}
                                        className="w-7 h-7 mx-auto rounded-full flex items-center justify-center text-white text-[11px] font-semibold"
                                        style={{ background: o.bg }}
                                    >
                                        {o.ball}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2 text-[10px] text-gray-400 text-center leading-relaxed">
                                {overSummaries.map((o) => o.detail).join("  ")}
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 mb-3">Player of the Match</h3>
                            <div className="flex items-center gap-3 mb-3">
                                <img src="https://i.pravatar.cc/80?img=12" alt="Naeem Akhter" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                                <div className="min-w-0">
                                    <div className="font-semibold text-gray-900 truncate">Naeem Akhter</div>
                                    <div className="text-xs text-gray-400 truncate">Royal Warriors</div>
                                    <span className="inline-block mt-1 text-[10px] font-bold text-white bg-[#4F46E5] px-2 py-0.5 rounded">BATTER</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 text-center border-t border-gray-100 pt-3">
                                <div>
                                    <div className="text-sm font-bold text-gray-900">52</div>
                                    <div className="text-[10px] text-gray-400">Runs</div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">31</div>
                                    <div className="text-[10px] text-gray-400">Balls</div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">5</div>
                                    <div className="text-[10px] text-gray-400">Fours</div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">2</div>
                                    <div className="text-[10px] text-gray-400">Sixes</div>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">SR: 167.7</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrgLiveScores