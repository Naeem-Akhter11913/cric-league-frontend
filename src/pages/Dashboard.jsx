import { UserRound } from 'lucide-react'
import React, { useState } from 'react'
import { battingRows, bowlingRows, lastBalls, liveMatches, pointsTable, quickActions, stats, teamColors, topScorers, upcomingMatches } from '../data/data.orgdashboard'
import TeamBadge from '../components/organization/TeamBadge'
import DashboardFooter from '../components/DashboardFooter'

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("Top Run Scorers");
    return (
        <div className="h-screen flex-1 overflow-y-auto no-scrollbar">
            {/* Greeting */}
            <div className="p-4 sm:p-6 pb-2">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                    Welcome back, Naeem Akhter! <span>👋</span>
                </h1>
                <p className="text-sm text-gray-500 mt-1">Here's what's happening in your tournaments.</p>
            </div>

            {/* Stat cards */}
            <div className="px-4 sm:px-6 pb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: s.color }}>
                            <s.icon size={18} className="text-white" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-xs sm:text-sm text-gray-500 truncate">{s.label}</div>
                            <div className="text-xl sm:text-2xl font-bold text-gray-900">{s.value}</div>
                            <div className="text-xs text-gray-400 truncate">{s.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main grid */}
            <div className="px-4 sm:px-6 pb-4 grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                {/* LEFT column */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    {/* Live Matches */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold text-gray-900">Live Matches</h2>
                            <button className="text-sm text-blue-600 hover:underline">View All</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {liveMatches.map((m, i) => (
                                <div key={i} className="border border-gray-200 rounded-lg p-3 flex flex-col">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-0.5 rounded">LIVE</span>
                                        <span className="text-xs text-gray-400">{m.overs}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                                            <TeamBadge name={m.teamA} />
                                            <span className="text-xs font-medium text-gray-700 text-center truncate w-full">{m.teamA}</span>
                                        </div>
                                        <span className="text-xs text-gray-400">vs</span>
                                        <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                                            <TeamBadge name={m.teamB} />
                                            <span className="text-xs font-medium text-gray-700 text-center truncate w-full">{m.teamB}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm font-semibold text-gray-900 mb-2">
                                        <span>{m.scoreA} <span className="text-xs font-normal text-gray-400">{m.oversA}</span></span>
                                        <span>{m.scoreB} <span className="text-xs font-normal text-gray-400">{m.oversB}</span></span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                        <span>{m.rrrLabel || "RRR"}: {m.rrr}</span>
                                        <span>Target: {m.target}</span>
                                    </div>
                                    {m.note && <div className="text-xs text-green-600 font-medium mb-1">{m.note}</div>}
                                    <div className="text-xs text-gray-400 mt-auto pt-1 border-t border-gray-100">{m.tournament}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming + Top performers */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                        <div className="sm:col-span-2 bg-white border border-gray-200 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="font-semibold text-gray-900">Upcoming Matches</h2>
                                <button className="text-sm text-blue-600 hover:underline">View All</button>
                            </div>
                            <div className="flex flex-col gap-3">
                                {upcomingMatches.map((m, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="flex flex-col items-center justify-center w-10 shrink-0">
                                            <span className="text-sm font-bold text-gray-900">{m.date}</span>
                                            <span className="text-[10px] text-gray-400">{m.month}</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-sm text-gray-800 truncate">{m.teamA} vs {m.teamB}</div>
                                            <div className="text-xs text-gray-400 truncate">{m.meta}</div>
                                        </div>
                                        <div className="text-xs text-gray-500 shrink-0">{m.time}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sm:col-span-3 bg-white border border-gray-200 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3 gap-2">
                                <h2 className="font-semibold text-gray-900 shrink-0">Top Performers <span className="font-normal text-gray-400 text-sm">(This Tournament)</span></h2>
                                <button className="text-sm text-blue-600 hover:underline shrink-0">View All</button>
                            </div>
                            <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
                                {["Top Run Scorers", "Top Wicket Takers", "Best Strike Rate"].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setActiveTab(t)}
                                        className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${activeTab === t ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-500 hover:bg-gray-50"
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                {topScorers.map((p) => (
                                    <div key={p.rank} className="flex items-center gap-3 text-sm">
                                        <span className="w-4 text-gray-400 shrink-0">{p.rank}</span>
                                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-600 shrink-0">
                                            {p.name[0]}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <span className="text-gray-800">{p.name}</span>
                                            <span className="text-gray-400"> ({p.team})</span>
                                        </div>
                                        <span className="text-gray-800 font-medium shrink-0">{p.runs}</span>
                                        <span className="text-gray-400 text-xs shrink-0 hidden sm:inline">SR: {p.sr}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT column */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                    {/* Live match panel */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold text-gray-900">Live Match</h2>
                            <button className="text-xs text-blue-600 hover:underline">View Full Scorecard</button>
                        </div>
                        <div className="rounded-lg p-4 text-white mb-3" style={{ background: "linear-gradient(135deg, #7C3AED, #4338CA)" }}>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-medium opacity-90">Naeem Premier League 2026</span>
                                <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-0.5 rounded">LIVE</span>
                            </div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                                <div className="flex flex-col items-center gap-1">
                                    <TeamBadge name="Royal Warriors" size={40} />
                                    <span className="text-xs text-center">Royal<br />Warriors</span>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">128/4</div>
                                    <div className="text-xs opacity-80">15.3 Overs</div>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <TeamBadge name="Super Kings" size={40} />
                                    <span className="text-xs text-center">Super<br />Kings</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-3 text-xs opacity-90 border-t border-white/20 pt-2">
                                <span>CRR: 8.25</span>
                                <span>|</span>
                                <span>RRR: 9.56</span>
                                <span>|</span>
                                <span>Target: 171</span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="text-xs font-semibold text-gray-500 mb-1">Batting</div>
                            <div className="grid grid-cols-6 text-[11px] text-gray-400 mb-1">
                                <span className="col-span-2">Name</span><span>R</span><span>B</span><span>4s</span><span>6s</span>
                            </div>
                            {battingRows.map((b, i) => (
                                <div key={i} className="grid grid-cols-6 text-xs text-gray-800 py-0.5">
                                    <span className="col-span-2 truncate">{b.name}</span><span>{b.r}</span><span>{b.b}</span><span>{b.fours}</span><span>{b.sixes}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mb-3">
                            <div className="text-xs font-semibold text-gray-500 mb-1">Bowling</div>
                            <div className="grid grid-cols-5 text-[11px] text-gray-400 mb-1">
                                <span>Name</span><span>O</span><span>M</span><span>R</span><span>W</span>
                            </div>
                            {bowlingRows.map((b, i) => (
                                <div key={i} className="grid grid-cols-5 text-xs text-gray-800 py-0.5">
                                    <span className="truncate">{b.name}</span><span>{b.o}</span><span>{b.m}</span><span>{b.r}</span><span>{b.w}</span>
                                </div>
                            ))}
                        </div>

                        <div>
                            <div className="text-xs font-semibold text-gray-500 mb-1">Last 6 Balls</div>
                            <div className="flex gap-2">
                                {lastBalls.map((b, i) => (
                                    <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: b.bg }}>
                                        {b.v}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Points table */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <h2 className="font-semibold text-gray-900 text-sm mb-3">POINTS TABLE – NAEEM PREMIER LEAGUE 2026</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="text-gray-400 text-left">
                                        <th className="font-medium pb-2 pr-1">#</th>
                                        <th className="font-medium pb-2">Team</th>
                                        <th className="font-medium pb-2 px-1">P</th>
                                        <th className="font-medium pb-2 px-1">W</th>
                                        <th className="font-medium pb-2 px-1">L</th>
                                        <th className="font-medium pb-2 px-1">NRR</th>
                                        <th className="font-medium pb-2 pl-1">Pts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pointsTable.map((row) => (
                                        <tr key={row.pos} className="border-t border-gray-100">
                                            <td className="py-1.5 pr-1 text-gray-500">{row.pos}</td>
                                            <td className="py-1.5">
                                                <div className="flex items-center gap-1.5 min-w-0">
                                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: teamColors[row.team]?.bg }}></span>
                                                    <span className="truncate text-gray-800">{row.team}</span>
                                                </div>
                                            </td>
                                            <td className="py-1.5 px-1 text-gray-600">{row.p}</td>
                                            <td className="py-1.5 px-1 text-gray-600">{row.w}</td>
                                            <td className="py-1.5 px-1 text-gray-600">{row.l}</td>
                                            <td className={`py-1.5 px-1 ${row.nrr.startsWith("-") ? "text-red-500" : "text-green-600"}`}>{row.nrr}</td>
                                            <td className="py-1.5 pl-1 font-semibold text-gray-900">{row.pts}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="text-center mt-3">
                            <button className="text-sm text-blue-600 hover:underline">View Full Table</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 sm:px-6 pb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {quickActions.map((a, i) => (
                    <button key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 text-left hover:shadow-sm transition-shadow">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: a.color }}>
                            <a.icon size={18} className="text-white" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">{a.label}</div>
                            <div className="text-xs text-gray-400 truncate">{a.sub}</div>
                        </div>
                    </button>
                ))}
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "#2563EB" }}>
                        <UserRound size={18} className="text-white" />
                    </div>
                    <div className="min-w-0">
                        <div className="text-xs text-gray-500">Total Players</div>
                        <div className="text-xl font-bold text-gray-900">256</div>
                        <div className="text-xs text-gray-400">Active Players</div>
                    </div>
                </div>
            </div>

            <DashboardFooter />
        </div>
    )
}

export default Dashboard