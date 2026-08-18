import React, { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";

/* ============================================================
   Design tokens are already defined in the project's global CSS
   (globals.css) — this component just references them via var(--...)
   Data
   ============================================================ */
const TOP_TEAMS = [
  { name: "Royal Warriors", league: "Naeem Premier League", wins: 15, matches: 12, points: 1568, crest: "#f5a623", ring: "#7c5cfc" },
  { name: "Super Kings", league: "Naeem Premier League", wins: 14, matches: 11, points: 1492, crest: "#f5a623", ring: "#f5a623" },
  { name: "Thunder Bolts", league: "Naeem Premier League", wins: 16, matches: 10, points: 1431, crest: "#3b82f6", ring: "#3b82f6" },
  { name: "Green Warriors", league: "City Champions Cup", wins: 15, matches: 9, points: 1380, crest: "#22c55e", ring: "#22c55e" },
];

const ALL_TEAMS = [
  { name: "Royal Warriors", league: "Naeem Premier League", played: 15, won: 12, lost: 3, points: 1568, nrr: "+1.235", form: ["W", "W", "W", "L", "W"], crest: "#f5a623" },
  { name: "Super Kings", league: "Naeem Premier League", played: 14, won: 11, lost: 3, points: 1492, nrr: "+0.845", form: ["W", "W", "W", "W", "L"], crest: "#f5a623" },
  { name: "Thunder Bolts", league: "Naeem Premier League", played: 16, won: 10, lost: 6, points: 1431, nrr: "+0.123", form: ["L", "W", "W", "W", "L"], crest: "#3b82f6" },
  { name: "Green Warriors", league: "City Champions Cup", played: 15, won: 9, lost: 6, points: 1380, nrr: "-0.250", form: ["W", "L", "W", "L", "W"], crest: "#22c55e" },
  { name: "Blue Tigers", league: "Naeem Premier League", played: 14, won: 8, lost: 6, points: 1275, nrr: "-1.125", form: ["W", "L", "W", "L", "W"], crest: "#3b82f6" },
  { name: "Strikers Club", league: "City Champions Cup", played: 15, won: 7, lost: 8, points: 1180, nrr: "-0.650", form: ["L", "W", "W", "L", "W"], crest: "#ef4444" },
  { name: "Lightning XI", league: "City Champions Cup", played: 14, won: 6, lost: 8, points: 1020, nrr: "-1.300", form: ["L", "W", "L", "W", "L"], crest: "#ef4444" },
  { name: "Rising Stars", league: "City Champions Cup", played: 13, won: 5, lost: 8, points: 980, nrr: "-1.789", form: ["L", "W", "L", "W", "L"], crest: "#22c55e" },
];

/* ============================================================
   Small building blocks
   ============================================================ */
function Crest({ color, size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 46" fill="none">
      <path
        d="M20 1 L37 8 V22 C37 33 30 41 20 45 C10 41 3 33 3 22 V8 Z"
        fill={color}
        opacity="0.16"
      />
      <path
        d="M20 1 L37 8 V22 C37 33 30 41 20 45 C10 41 3 33 3 22 V8 Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="20" cy="20" r="8" fill={color} opacity="0.9" />
      <path d="M15 20 L18.5 23.5 L25.5 16.5" stroke="#0a0a14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FormPill({ result }) {
  const isWin = result === "W";
  return (
    <span
      className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold font-body"
      style={{
        backgroundColor: isWin ? "var(--color-accent-green)" : "var(--color-accent-red)",
        color: "#ffffff",
      }}
    >
      {result}
    </span>
  );
}

function TopTeamCard({ team }) {
  return (
    <div
      className="rounded-[var(--radius-lg)] p-5 flex flex-col items-center text-center"
      style={{
        backgroundColor: "var(--color-card-dark)",
        border: "1px solid var(--color-border-dark)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: "var(--color-bg-dark)", border: `1px solid ${team.ring}55` }}
      >
        <Crest color={team.crest} size={30} />
      </div>

      <h3
        className="font-display font-semibold mb-1"
        style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-feature-h)" }}
      >
        {team.name}
      </h3>
      <p
        className="font-body mb-4"
        style={{ color: "var(--color-text-onDark-faint)", fontSize: "var(--fs-xs)" }}
      >
        {team.league}
      </p>

      <div className="w-full grid grid-cols-3 gap-2 pt-4" style={{ borderTop: "1px solid var(--color-border-dark)" }}>
        <div className="flex flex-col items-center">
          <span className="font-display font-bold" style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-h2)" }}>
            {team.wins}
          </span>
          <span className="font-body tracking-wide" style={{ color: "var(--color-text-onDark-faint)", fontSize: "9px" }}>
            WINS
          </span>
        </div>
        <div className="flex flex-col items-center" style={{ borderLeft: "1px solid var(--color-border-dark)", borderRight: "1px solid var(--color-border-dark)" }}>
          <span className="font-display font-bold" style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-h2)" }}>
            {team.matches}
          </span>
          <span className="font-body tracking-wide" style={{ color: "var(--color-text-onDark-faint)", fontSize: "9px" }}>
            MATCHES
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-display font-bold" style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-h2)" }}>
            {team.points}
          </span>
          <span className="font-body tracking-wide" style={{ color: "var(--color-text-onDark-faint)", fontSize: "9px" }}>
            POINTS
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Hero
   ============================================================ */
function Hero({ query, setQuery, tournament, setTournament, city, setCity }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 900px 500px at 78% 15%, rgba(124,92,252,0.35), transparent 60%), radial-gradient(ellipse 600px 400px at 95% 60%, rgba(59,130,246,0.18), transparent 60%), linear-gradient(180deg, var(--color-bg-dark) 0%, var(--color-bg-dark-2) 100%)",
      }}
    >
      <Navbar />
      {/* decorative silhouettes standing in for the celebration photo */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[46%] hidden md:block opacity-90">
        <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMaxYMid slice">
          <defs>
            <linearGradient id="playerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary-light)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--color-primary-700)" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <g fill="url(#playerGrad)" opacity="0.55">
            <path d="M240 300 C240 220 250 190 235 150 C228 132 236 108 258 100 C280 92 300 108 298 132 C296 154 285 168 288 190 C292 220 300 260 300 300 Z" />
            <circle cx="262" cy="80" r="20" />
          </g>
          <g fill="url(#playerGrad)" opacity="0.85">
            <path d="M310 300 C308 210 322 175 305 130 C296 108 306 80 332 72 C358 64 380 82 378 108 C376 132 362 148 366 172 C372 210 382 260 382 300 Z" />
            <circle cx="335" cy="50" r="22" />
          </g>
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-16">
        <h1
          className="font-display font-bold"
          style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-hero-h1)" }}
        >
          Teams
        </h1>
        <p
          className="font-body mt-2 mb-8"
          style={{ color: "var(--color-text-onDark-muted)", fontSize: "var(--fs-hero-sub)" }}
        >
          Strong Teams. Epic Battles.
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
              placeholder="Search teams..."
              className="bg-transparent outline-none font-body w-full"
              style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-sm)" }}
            />
          </div>

          <div
            className="flex items-center justify-between gap-2 px-4 py-3 rounded-[var(--radius-md)] cursor-pointer"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid var(--color-border-dark)", minWidth: "160px" }}
          >
            <select
              value={tournament}
              onChange={(e) => setTournament(e.target.value)}
              className="bg-transparent outline-none font-body w-full appearance-none cursor-pointer"
              style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-sm)" }}
            >
              <option style={{ color: "#000" }}>All Tournaments</option>
              <option style={{ color: "#000" }}>Naeem Premier League</option>
              <option style={{ color: "#000" }}>City Champions Cup</option>
            </select>
            <ChevronDown size={15} color="var(--color-text-onDark-faint)" />
          </div>

          <div
            className="flex items-center justify-between gap-2 px-4 py-3 rounded-[var(--radius-md)] cursor-pointer"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid var(--color-border-dark)", minWidth: "140px" }}
          >
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent outline-none font-body w-full appearance-none cursor-pointer"
              style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-sm)" }}
            >
              <option style={{ color: "#000" }}>All Cities</option>
            </select>
            <ChevronDown size={15} color="var(--color-text-onDark-faint)" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Table
   ============================================================ */
function TeamsTable({ teams }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-lg)]" style={{ border: "1px solid var(--color-border-light)" }}>
      <table className="w-full border-collapse min-w-[760px]">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border-light)" }}>
            {["#", "TEAM", "TOURNAMENT", "PLAYED", "WON", "LOST", "POINTS", "NRR", "FORM"].map((h, i) => (
              <th
                key={h}
                className="font-body font-semibold px-4 py-3 text-left whitespace-nowrap"
                style={{
                  color: "var(--color-text-onLight-faint)",
                  fontSize: "var(--fs-xs)",
                  letterSpacing: "0.03em",
                  textAlign: i === 0 ? "center" : i >= 3 && i <= 6 ? "center" : "left",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teams.map((t, idx) => (
            <tr
              key={t.name}
              className="transition-colors hover:bg-[var(--color-bg-light-2)]"
              style={{ borderBottom: idx === teams.length - 1 ? "none" : "1px solid var(--color-border-light)" }}
            >
              <td className="px-4 py-3 text-center font-body" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-sm)" }}>
                {idx + 1}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Crest color={t.crest} size={26} />
                  <span className="font-body font-semibold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                    {t.name}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 font-body" style={{ color: "var(--color-text-onLight-muted)", fontSize: "var(--fs-sm)" }}>
                {t.league}
              </td>
              <td className="px-4 py-3 text-center font-body" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                {t.played}
              </td>
              <td className="px-4 py-3 text-center font-body" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                {t.won}
              </td>
              <td className="px-4 py-3 text-center font-body" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                {t.lost}
              </td>
              <td className="px-4 py-3 text-center font-body font-semibold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                {t.points}
              </td>
              <td
                className="px-4 py-3 text-center font-body font-semibold"
                style={{
                  color: t.nrr.startsWith("+") ? "var(--color-accent-green)" : "var(--color-accent-red)",
                  fontSize: "var(--fs-sm)",
                }}
              >
                {t.nrr}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 justify-center">
                  {t.form.map((f, i) => (
                    <FormPill key={i} result={f} />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============================================================
   Page
   ============================================================ */
export default function TeamsPage() {
  const [query, setQuery] = useState("");
  const [tournament, setTournament] = useState("All Tournaments");
  const [city, setCity] = useState("All Cities");

  const filteredTeams = useMemo(() => {
    return ALL_TEAMS.filter((t) => {
      const matchesQuery = t.name.toLowerCase().includes(query.toLowerCase());
      const matchesTournament = tournament === "All Tournaments" || t.league === tournament;
      return matchesQuery && matchesTournament;
    });
  }, [query, tournament]);

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "var(--color-bg-light-2)" }}>
      
      <Hero
        query={query}
        setQuery={setQuery}
        tournament={tournament}
        setTournament={setTournament}
        city={city}
        setCity={setCity}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Top Teams */}
        <div className="flex items-center justify-between pt-10 pb-5">
          <h2 className="font-display font-bold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-h2)" }}>
            Top Teams
          </h2>
          <a
            href="#"
            className="font-body font-semibold flex items-center gap-1"
            style={{ color: "var(--color-primary)", fontSize: "var(--fs-sm)" }}
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12">
          {TOP_TEAMS.map((team) => (
            <TopTeamCard key={team.name} team={team} />
          ))}
        </div>

        {/* All Teams */}
        <div className="pb-6">
          <h2 className="font-display font-bold mb-4" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-h2)" }}>
            All Teams
          </h2>
          <TeamsTable teams={filteredTeams} />
          {filteredTeams.length === 0 && (
            <div className="text-center py-10 font-body" style={{ color: "var(--color-text-onLight-faint)" }}>
              No teams match your search.
            </div>
          )}
        </div>
      </div>

      <div className="h-10" />
    </div>
  );
}