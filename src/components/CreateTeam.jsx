import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Plus,
  Check,
  Trash2,
  Info,
  Users,
  GripVertical,
  CheckCircle2,
  X,
  Sword,
  CircleDot,
  Repeat,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Static player pool — swap for API data as needed                   */
/* ------------------------------------------------------------------ */

const ROLES = [
  { key: "Batter", label: "Batter", icon: Sword, color: "blue" },
  { key: "Bowler", label: "Bowler", icon: CircleDot, color: "emerald" },
  { key: "All-Rounder", label: "All-Rounder", icon: Repeat, color: "violet" },
];

const ROLE_STYLES = {
  Batter: {
    tabActive: "border-blue-400 bg-blue-50 text-blue-600",
    text: "text-blue-600",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-600",
    headerBg: "bg-blue-50",
    headerText: "text-blue-700",
  },
  Bowler: {
    tabActive: "border-emerald-400 bg-emerald-50 text-emerald-600",
    text: "text-emerald-600",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-600",
    headerBg: "bg-emerald-50",
    headerText: "text-emerald-700",
  },
  "All-Rounder": {
    tabActive: "border-violet-400 bg-violet-50 text-violet-600",
    text: "text-violet-600",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-600",
    headerBg: "bg-violet-50",
    headerText: "text-violet-700",
  },
};

const PLAYER_POOL = [
  { id: "rohit", name: "Rohit Sharma", type: "Right Hand Batter", role: "Batter" },
  { id: "gill", name: "Shubman Gill", type: "Right Hand Batter", role: "Batter" },
  { id: "kohli", name: "Virat Kohli", type: "Right Hand Batter", role: "Batter" },
  { id: "iyer", name: "Shreyas Iyer", type: "Right Hand Batter", role: "Batter" },
  { id: "pant", name: "Rishabh Pant", type: "Left Hand Batter", role: "Batter" },
  { id: "sky", name: "Suryakumar Yadav", type: "Right Hand Batter", role: "Batter" },
  { id: "tilak", name: "Tilak Varma", type: "Left Hand Batter", role: "Batter" },
  { id: "yashasvi", name: "Yashasvi Jaiswal", type: "Left Hand Batter", role: "Batter" },

  { id: "bumrah", name: "Jasprit Bumrah", type: "Right Arm Fast", role: "Bowler" },
  { id: "shami", name: "Mohammed Shami", type: "Right Arm Fast", role: "Bowler" },
  { id: "kuldeep", name: "Kuldeep Yadav", type: "Left Arm Wrist Spin", role: "Bowler" },
  { id: "chahal", name: "Yuzvendra Chahal", type: "Right Leg Spin", role: "Bowler" },
  { id: "siraj", name: "Mohammed Siraj", type: "Right Arm Fast", role: "Bowler" },
  { id: "arshdeep", name: "Arshdeep Singh", type: "Left Arm Fast", role: "Bowler" },
  { id: "bhuvi", name: "Bhuvneshwar Kumar", type: "Right Arm Medium", role: "Bowler" },

  { id: "hardik", name: "Hardik Pandya", type: "Right Hand Bat, Right Arm Fast", role: "All-Rounder" },
  { id: "jadeja", name: "Ravindra Jadeja", type: "Left Hand Bat, Left Arm Spin", role: "All-Rounder" },
  { id: "axar", name: "Axar Patel", type: "Left Hand Bat, Left Arm Spin", role: "All-Rounder" },
  { id: "washington", name: "Washington Sundar", type: "Right Hand Bat, Off Spin", role: "All-Rounder" },
  { id: "shivam", name: "Shivam Dube", type: "Left Hand Bat, Medium", role: "All-Rounder" },
  { id: "krunal", name: "Krunal Pandya", type: "Left Hand Bat, Left Arm Spin", role: "All-Rounder" },
];

const PLAYERS_BY_ID = Object.fromEntries(PLAYER_POOL.map((p) => [p.id, p]));
const MAX_TEAM_SIZE = 11;

const DEFAULT_SELECTED = [
  "rohit",
  "kohli",
  "iyer",
  "pant",
  "bumrah",
  "shami",
  "kuldeep",
  "chahal",
  "hardik",
  "jadeja",
  "axar",
];

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export default function CreateTeam({ onBack, onConfirm }) {
  const [activeTab, setActiveTab] = useState("Batter");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState(DEFAULT_SELECTED);
  const [captainId, setCaptainId] = useState("rohit");
  const [viceCaptainId, setViceCaptainId] = useState("kohli");
  const [openMenuFor, setOpenMenuFor] = useState(null);

  const roleCounts = useMemo(() => {
    const counts = { Batter: 0, Bowler: 0, "All-Rounder": 0 };
    PLAYER_POOL.forEach((p) => counts[p.role]++);
    return counts;
  }, []);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const isFull = selectedIds.length >= MAX_TEAM_SIZE;
  const isTeamComplete = selectedIds.length === MAX_TEAM_SIZE;

  const filteredAvailable = useMemo(() => {
    return PLAYER_POOL.filter(
      (p) => p.role === activeTab && p.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [activeTab, search]);

  const selectedByRole = useMemo(() => {
    const grouped = { Batter: [], Bowler: [], "All-Rounder": [] };
    selectedIds.forEach((id) => {
      const player = PLAYERS_BY_ID[id];
      if (player) grouped[player.role].push(player);
    });
    return grouped;
  }, [selectedIds]);

  const addPlayer = (id) => {
    if (isFull || selectedSet.has(id)) return;
    setSelectedIds((prev) => [...prev, id]);
  };

  const removePlayer = (id) => {
    setSelectedIds((prev) => prev.filter((pid) => pid !== id));
    if (captainId === id) setCaptainId(null);
    if (viceCaptainId === id) setViceCaptainId(null);
    setOpenMenuFor(null);
  };

  const makeCaptain = (id) => {
    setCaptainId(id);
    if (viceCaptainId === id) setViceCaptainId(null);
    setOpenMenuFor(null);
  };

  const makeViceCaptain = (id) => {
    setViceCaptainId(id);
    if (captainId === id) setCaptainId(null);
    setOpenMenuFor(null);
  };

  const clearRole = (id) => {
    if (captainId === id) setCaptainId(null);
    if (viceCaptainId === id) setViceCaptainId(null);
    setOpenMenuFor(null);
  };

  const clearTeam = () => {
    setSelectedIds([]);
    setCaptainId(null);
    setViceCaptainId(null);
    setOpenMenuFor(null);
  };

  const canConfirm = isTeamComplete && captainId && viceCaptainId && captainId !== viceCaptainId;

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm &&
      onConfirm({
        players: selectedIds.map((id) => PLAYERS_BY_ID[id]),
        captainId,
        viceCaptainId,
      });
  };

  return (
    <div className="min-h-screen min-w-[70vw] bg-slate-50">
      <div className="p-2 lg:p-2">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-slate-900">Available Players</h2>

            <div className="mb-4 flex items-center gap-2">
              <div className="relative flex-1">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search players..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-300"
                />
              </div>
              <button className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50">
                <SlidersHorizontal size={16} />
              </button>
            </div>

            {/* Role tabs */}
            <div className="mb-4 grid grid-cols-3 gap-2 ">
              {ROLES.map((role) => {
                const isActive = activeTab === role.key;
                const styles = ROLE_STYLES[role.key];
                return (
                  <button
                    key={role.key}
                    onClick={() => setActiveTab(role.key)}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                      isActive ? styles.tabActive : "border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <role.icon size={14} />
                    {role.label} ({roleCounts[role.key]})
                  </button>
                );
              })}
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-slate-100 px-1 pb-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">
              <span>Player</span>
              <span className="hidden sm:block">Type</span>
              <span>Action</span>
            </div>

            {/* <div className="max-h-[520px] divide-y divide-slate-50 overflow-y-auto"> */}
            <div className="max-h-[520px] space-y-5 overflow-y-auto pr-1 custom-scrollbar">
            
              {filteredAvailable.length === 0 && (
                <p className="py-8 text-center text-sm text-slate-400">No players found.</p>
              )}
              {filteredAvailable.map((p) => {
                const alreadySelected = selectedSet.has(p.id);
                const styles = ROLE_STYLES[p.role];
                const disabled = alreadySelected || isFull;
                return (
                  <div key={p.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-xs font-semibold text-white">
                        {p.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">{p.name}</p>
                        <p className="truncate text-xs text-slate-400 sm:hidden">{p.type}</p>
                      </div>
                    </div>
                    <span
                      className={`hidden whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium sm:inline-block ${styles.badgeBg} ${styles.badgeText}`}
                    >
                      {p.type}
                    </span>
                    <button
                      onClick={() => addPlayer(p.id)}
                      disabled={disabled}
                      className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        alreadySelected
                          ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                          : disabled
                          ? "cursor-not-allowed border-slate-200 text-slate-300"
                          : "border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                      }`}
                    >
                      {alreadySelected ? <Check size={13} /> : <Plus size={13} />}
                      {alreadySelected ? "Added" : "Add"}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
              <Info size={14} className="shrink-0 text-slate-400" />
              Click on “+ Add” to select a player in your team
            </div> */}
          </div>

          {/* Selected team */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Selected Team ({selectedIds.length} / {MAX_TEAM_SIZE})
              </h2>
              {isTeamComplete ? (
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 size={13} />
                  Team Complete
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  In Progress
                </span>
              )}
            </div>

            <div className="max-h-[600px] space-y-5 overflow-y-auto pr-1 custom-scrollbar">
              {ROLES.map((role) => {
                const players = selectedByRole[role.key];
                if (!players.length) return null;
                const styles = ROLE_STYLES[role.key];
                return (
                  <div key={role.key}>
                    <div className={`mb-2 rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${styles.headerBg} ${styles.headerText}`}>
                      {role.label} ({players.length})
                    </div>
                    <div className="divide-y divide-slate-50">
                      {players.map((p) => {
                        const order = selectedIds.indexOf(p.id) + 1;
                        const isCaptain = captainId === p.id;
                        const isViceCaptain = viceCaptainId === p.id;
                        return (
                          <div key={p.id} className="flex items-center gap-3 py-2.5">
                            <GripVertical size={14} className="shrink-0 cursor-grab text-slate-300" />
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-xs font-semibold text-white">
                              {p.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-slate-800">{p.name}</p>
                              <p className="truncate text-xs text-slate-400">{p.type}</p>
                            </div>

                            {/* Role badge / captain-vc menu */}
                            <div className="relative">
                              <button
                                onClick={() => setOpenMenuFor(openMenuFor === p.id ? null : p.id)}
                                className={`flex h-7 min-w-[28px] items-center justify-center rounded-md px-2 text-xs font-bold ${
                                  isCaptain
                                    ? "bg-amber-400 text-white"
                                    : isViceCaptain
                                    ? "bg-rose-500 text-white"
                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                }`}
                              >
                                {isCaptain ? "C" : isViceCaptain ? "VC" : order}
                              </button>

                              {openMenuFor === p.id && (
                                <>
                                  <div className="fixed inset-0 z-10" onClick={() => setOpenMenuFor(null)} />
                                  <div className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-xl border border-slate-100 bg-white py-1 shadow-lg">
                                    <button
                                      onClick={() => makeCaptain(p.id)}
                                      className="block w-full px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-slate-50"
                                    >
                                      Make Captain
                                    </button>
                                    <button
                                      onClick={() => makeViceCaptain(p.id)}
                                      className="block w-full px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-slate-50"
                                    >
                                      Make Vice Captain
                                    </button>
                                    {(isCaptain || isViceCaptain) && (
                                      <button
                                        onClick={() => clearRole(p.id)}
                                        className="block w-full px-3 py-2 text-left text-xs font-medium text-slate-500 hover:bg-slate-50"
                                      >
                                        Clear Role
                                      </button>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>

                            <button
                              onClick={() => removePlayer(p.id)}
                              className="flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-50"
                            >
                              <Trash2 size={13} />
                              Remove
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {selectedIds.length === 0 && (
                <p className="py-10 text-center text-sm text-slate-400">
                  No players selected yet. Add players from the left panel.
                </p>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">
              <button
                onClick={clearTeam}
                disabled={selectedIds.length === 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-200 py-2.5 text-sm font-semibold text-rose-500 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 size={15} />
                Clear Team
              </button>
              <button
                onClick={handleConfirm}
                disabled={!canConfirm}
                className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Check size={15} />
                Confirm Team
              </button>
            </div>
            {!canConfirm && isTeamComplete && (
              <p className="mt-2 text-center text-xs text-rose-500">
                Assign both a Captain and a Vice Captain to continue.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom info bar */}
      {/* <div className="border-t border-slate-200 bg-white px-6 py-3 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-slate-500 sm:flex-row sm:gap-2">
          <span className="flex items-center gap-1.5">
            <Info size={13} className="text-slate-400" />
            Select exactly 11 players
          </span>
          <span className="hidden text-slate-300 sm:inline">•</span>
          <span>Choose 1 Captain and 1 Vice Captain</span>
          <span className="hidden text-slate-300 sm:inline">•</span>
          <span>Once 11 players are selected, all other players will be disabled</span>
        </div>
      </div> */}
    </div>
  );
}