import { ChevronDown, Search } from 'lucide-react';
import React from 'react'
import { TEAM_COLORS } from '../data/player';
import Navbar from './Navbar';

const PlayerHero = ({ query, setQuery, role, setRole, team, setTeam })=> {
    return (
        <div
            className="relative overflow-hidden"
            style={{
                background:
                    "radial-gradient(ellipse 900px 500px at 78% 15%, rgba(124,92,252,0.35), transparent 60%), radial-gradient(ellipse 600px 400px at 95% 60%, rgba(59,130,246,0.18), transparent 60%), linear-gradient(180deg, var(--color-bg-dark) 0%, var(--color-bg-dark-2) 100%)",
            }}
        >
            <Navbar />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[46%] hidden md:block opacity-90">
                <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMaxYMid slice">
                    <defs>
                        <linearGradient id="batterGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-primary-light)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="var(--color-primary-700)" stopOpacity="0.6" />
                        </linearGradient>
                    </defs>
                    <g fill="url(#batterGrad)" opacity="0.8">
                        <path d="M300 300 C298 220 310 185 296 150 C288 130 298 104 322 96 C348 88 372 106 370 132 C368 156 354 170 358 194 C364 226 374 262 374 300 Z" />
                        <circle cx="326" cy="72" r="22" />
                        <rect x="330" y="40" width="6" height="46" rx="3" transform="rotate(18 330 40)" />
                    </g>
                </svg>
            </div>

            <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-16">
                <h1
                    className="font-display font-bold"
                    style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-hero-h1)" }}
                >
                    Players
                </h1>
                <p
                    className="font-body mt-2 mb-8"
                    style={{ color: "var(--color-text-onDark-muted)", fontSize: "var(--fs-hero-sub)" }}
                >
                    Talent. Passion. Performance.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                    <div
                        className="flex items-center gap-2 px-4 py-3 rounded-[var(--radius-md)] flex-1"
                        style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid var(--color-border-dark)" }}
                    >
                        <Search size={16} color="var(--color-text-onDark-faint)" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search players..."
                            className="bg-transparent outline-none font-body w-full"
                            style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-sm)" }}
                        />
                    </div>

                    <div
                        className="flex items-center justify-between gap-2 px-4 py-3 rounded-[var(--radius-md)] cursor-pointer"
                        style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid var(--color-border-dark)", minWidth: "140px" }}
                    >
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="bg-transparent outline-none font-body w-full appearance-none cursor-pointer"
                            style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-sm)" }}
                        >
                            <option style={{ color: "#000" }}>All Role</option>
                            <option style={{ color: "#000" }}>Batsman</option>
                            <option style={{ color: "#000" }}>Bowler</option>
                            <option style={{ color: "#000" }}>All Rounder</option>
                        </select>
                        <ChevronDown size={15} color="var(--color-text-onDark-faint)" />
                    </div>

                    <div
                        className="flex items-center justify-between gap-2 px-4 py-3 rounded-[var(--radius-md)] cursor-pointer"
                        style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid var(--color-border-dark)", minWidth: "140px" }}
                    >
                        <select
                            value={team}
                            onChange={(e) => setTeam(e.target.value)}
                            className="bg-transparent outline-none font-body w-full appearance-none cursor-pointer"
                            style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-sm)" }}
                        >
                            <option style={{ color: "#000" }}>All Teams</option>
                            {Object.keys(TEAM_COLORS).map((t) => (
                                <option key={t} style={{ color: "#000" }}>{t}</option>
                            ))}
                        </select>
                        <ChevronDown size={15} color="var(--color-text-onDark-faint)" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerHero