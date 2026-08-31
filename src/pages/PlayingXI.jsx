import React, { useMemo, useState } from "react";
import {
  Crown,
  Trash2,
  Shuffle,
  Info,
  Search,
  SlidersHorizontal,
  X,
  Plus,
  Check,
  GripVertical,
  Award,
  Repeat,
  CircleDot,
  Hand,
  Users,
  Save,
  ChevronDown,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Static roster data (mirrors the mock)
// ---------------------------------------------------------------------------

const ROLE_META = {
  batter: { label: "Batters", short: "BATTERS", icon: Award, color: "emerald" },
  allrounder: { label: "All Rounders", short: "ALL ROUNDERS", icon: Repeat, color: "violet" },
  bowler: { label: "Bowlers", short: "BOWLERS", icon: CircleDot, color: "sky" },
  keeper: { label: "Wicket Keepers", short: "WICKET KEEPER", icon: Hand, color: "amber" },
  substitute: { label: "Substitute", short: "SUBSTITUTES", icon: Users, color: "rose" },
};

const COLOR_CLASSES = {
  emerald: {
    text: "text-emerald-600",
    chipText: "text-emerald-700",
    chipBg: "bg-emerald-50",
    border: "border-emerald-100",
    ring: "ring-emerald-200",
    tabActive: "border-emerald-500 bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
  violet: {
    text: "text-violet-600",
    chipText: "text-violet-700",
    chipBg: "bg-violet-50",
    border: "border-violet-100",
    ring: "ring-violet-200",
    tabActive: "border-violet-500 bg-violet-50 text-violet-700",
    dot: "bg-violet-500",
  },
  sky: {
    text: "text-sky-600",
    chipText: "text-sky-700",
    chipBg: "bg-sky-50",
    border: "border-sky-100",
    ring: "ring-sky-200",
    tabActive: "border-sky-500 bg-sky-50 text-sky-700",
    dot: "bg-sky-500",
  },
  amber: {
    text: "text-amber-600",
    chipText: "text-amber-700",
    chipBg: "bg-amber-50",
    border: "border-amber-100",
    ring: "ring-amber-200",
    tabActive: "border-amber-500 bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
  },
  rose: {
    text: "text-rose-600",
    chipText: "text-rose-700",
    chipBg: "bg-rose-50",
    border: "border-rose-100",
    ring: "ring-rose-200",
    tabActive: "border-rose-500 bg-rose-50 text-rose-700",
    dot: "bg-rose-500",
  },
};

const INITIAL_ROSTER = [
  { id: "rohit", name: "Rohit Sharma", hand: "RHB", roleDetail: "Opening Batter", points: 245, category: "batter" },
  { id: "gill", name: "Shubman Gill", hand: "RHB", roleDetail: "Opening Batter", points: 232, category: "batter" },
  { id: "kohli", name: "Virat Kohli", hand: "RHB", roleDetail: "Top Order", points: 265, category: "batter" },
  { id: "sky", name: "Suryakumar Yadav", hand: "RHB", roleDetail: "Middle Order", points: 228, category: "batter" },
  { id: "ruturaj", name: "Ruturaj Gaikwad", hand: "RHB", roleDetail: "Top Order", points: 219, category: "batter" },
  { id: "jaiswal", name: "Yashasvi Jaiswal", hand: "LHB", roleDetail: "Opening Batter", points: 218, category: "batter" },

  { id: "hardik", name: "Hardik Pandya", hand: "RHB", roleDetail: "Medium Fast", points: 248, category: "allrounder" },
  { id: "jadeja", name: "Ravindra Jadeja", hand: "LHB", roleDetail: "Slow Left Arm", points: 221, category: "allrounder" },
  { id: "axar", name: "Axar Patel", hand: "LHB", roleDetail: "Off Spin", points: 210, category: "allrounder" },
  { id: "sundar", name: "Washington Sundar", hand: "RHB", roleDetail: "Off Spin", points: 198, category: "allrounder" },

  { id: "bumrah", name: "Jasprit Bumrah", hand: "RHB", roleDetail: "Fast", points: 252, category: "bowler" },
  { id: "siraj", name: "Mohammed Siraj", hand: "RHB", roleDetail: "Fast", points: 229, category: "bowler" },
  { id: "kuldeep", name: "Kuldeep Yadav", hand: "LHB", roleDetail: "Wrist Spin", points: 215, category: "bowler" },
  { id: "arshdeep", name: "Arshdeep Singh", hand: "LHB", roleDetail: "Left Arm Fast", points: 208, category: "bowler" },

  { id: "pant", name: "Rishabh Pant", hand: "LHB", roleDetail: "Wicket Keeper", points: 231, category: "keeper" },

  { id: "samson", name: "Sanjiv Samson", hand: "RHB", roleDetail: "Wicket Keeper", points: 210, category: "substitute" },
  { id: "hooda", name: "Deepak Hooda", hand: "RHB", roleDetail: "Batting Allrounder", points: 192, category: "substitute" },
  { id: "tushar", name: "Tushar Deshpande", hand: "RHB", roleDetail: "Batting Allrounder", points: 187, category: "substitute" },
];

const DEFAULT_XI_IDS = [
  "rohit", "kohli", "gill",
  "hardik", "jadeja", "axar",
  "bumrah", "siraj", "kuldeep", "arshdeep",
  "pant",
];
const DEFAULT_SUB_IDS = ["samson", "hooda", "tushar"];

const SECTION_ORDER = ["batter", "allrounder", "bowler", "keeper", "substitute"];
const XI_TARGET = 11;

// ---------------------------------------------------------------------------

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ name, size = "md" }) {
  const sizes = { sm: "h-9 w-9 text-xs", md: "h-11 w-11 text-sm" };
  return (
    <div
      className={`${sizes[size]} shrink-0 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white font-semibold flex items-center justify-center ring-2 ring-white shadow-sm`}
    >
      {initials(name)}
    </div>
  );
}

function RoleFilterCard({ roleKey, count, active, onClick }) {
  const meta = ROLE_META[roleKey];
  const colors = COLOR_CLASSES[meta.color];
  const Icon = meta.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 min-w-[86px] rounded-xl border px-3 py-2.5 text-left transition ${
        active ? colors.tabActive : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${active ? "" : colors.text}`}>
        <Icon className="h-3.5 w-3.5" />
        <span>{meta.label}</span>
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-lg font-bold text-slate-900 leading-none">{count}</span>
        <span className="text-[11px] text-slate-400">{count === 1 ? "Player" : "Players"}</span>
      </div>
    </button>
  );
}

function RosterRow({ player, added, onAdd }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg transition">
      <Avatar name={player.name} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800 truncate">{player.name}</p>
        <p className="text-xs text-slate-400 truncate">
          {player.hand} <span className="mx-1 text-slate-300">&middot;</span> {player.roleDetail}
        </p>
      </div>
      <span className="text-xs font-semibold text-slate-500 tabular-nums w-9 text-right">{player.points}</span>
      <button
        type="button"
        onClick={() => onAdd(player.id)}
        disabled={added}
        title={added ? "Already selected" : "Add to Playing XI"}
        className={`h-7 w-7 shrink-0 rounded-md flex items-center justify-center border transition ${
          added
            ? "bg-emerald-50 border-emerald-200 text-emerald-500 cursor-default"
            : "bg-white border-slate-200 text-slate-500 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50"
        }`}
      >
        {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </button>
    </div>
  );
}

function XICard({ player, onRemove, draggable, onDragStart, onDragOver, onDrop, onDragEnd, isDragging }) {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`group flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition ${
        isDragging ? "opacity-40" : "hover:shadow-md hover:border-slate-300"
      }`}
    >
      <span className="cursor-grab active:cursor-grabbing text-slate-300 group-hover:text-slate-400">
        <GripVertical className="h-4 w-4" />
      </span>
      <Avatar name={player.name} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800 truncate">{player.name}</p>
        <p className="text-xs font-medium text-emerald-600 truncate">
          {player.hand}
          {player.roleDetail ? (
            <>
              <span className="mx-1 text-slate-300">&middot;</span>
              <span className="text-sky-600">{player.roleDetail}</span>
            </>
          ) : null}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onRemove(player.id)}
        className="h-6 w-6 shrink-0 rounded-md flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition"
        title="Remove"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function XISection({ roleKey, players, onRemove, onReorder }) {
  const meta = ROLE_META[roleKey];
  const colors = COLOR_CLASSES[meta.color];
  const Icon = meta.icon;
  const [dragIndex, setDragIndex] = useState(null);

  if (players.length === 0) return null;

  return (
    <section
      className={`rounded-2xl border ${colors.border} ${colors.chipBg} bg-opacity-40 p-4 sm:p-5`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
        <Icon className={`h-4 w-4 ${colors.text}`} />
        <h3 className={`text-sm font-bold tracking-tight ${colors.chipText}`}>
          {meta.short} ({players.length})
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {players.map((p, idx) => (
          <XICard
            key={p.id}
            player={p}
            onRemove={onRemove}
            draggable
            isDragging={dragIndex === idx}
            onDragStart={() => setDragIndex(idx)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIndex === null || dragIndex === idx) return;
              onReorder(roleKey, dragIndex, idx);
              setDragIndex(null);
            }}
            onDragEnd={() => setDragIndex(null)}
          />
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------

export default function PlayingXI() {
  const [xiIds, setXiIds] = useState(DEFAULT_XI_IDS);
  const [subIds, setSubIds] = useState(DEFAULT_SUB_IDS);
  const [order, setOrder] = useState(() => {
    const grouped = {};
    SECTION_ORDER.forEach((k) => (grouped[k] = []));
    DEFAULT_XI_IDS.forEach((id) => {
      const p = INITIAL_ROSTER.find((r) => r.id === id);
      grouped[p.category].push(id);
    });
    DEFAULT_SUB_IDS.forEach((id) => grouped.substitute.push(id));
    return grouped;
  });
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [captainId, setCaptainId] = useState("rohit");
  const [viceCaptainId, setViceCaptainId] = useState("hardik");
  const [savedFlash, setSavedFlash] = useState(false);

  const byId = useMemo(() => {
    const map = {};
    INITIAL_ROSTER.forEach((p) => (map[p.id] = p));
    return map;
  }, []);

  const selectedIds = useMemo(() => new Set([...xiIds, ...subIds]), [xiIds, subIds]);

  const counts = useMemo(() => {
    const c = { batter: 0, allrounder: 0, bowler: 0, keeper: 0, substitute: 0 };
    INITIAL_ROSTER.forEach((p) => c[p.category]++);
    return c;
  }, []);

  const filteredRoster = useMemo(() => {
    return INITIAL_ROSTER.filter((p) => {
      const matchesFilter = !activeFilter || p.category === activeFilter;
      const matchesSearch = p.name.toLowerCase().includes(search.trim().toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  const rosterByCategory = useMemo(() => {
    const grouped = {};
    SECTION_ORDER.forEach((k) => (grouped[k] = []));
    filteredRoster.forEach((p) => grouped[p.category].push(p));
    return grouped;
  }, [filteredRoster]);

  const xiCount = xiIds.length;
  const isComplete = xiCount === XI_TARGET;

  function addPlayer(id) {
    const player = byId[id];
    if (!player || selectedIds.has(id)) return;
    if (player.category === "substitute") {
      setSubIds((prev) => [...prev, id]);
    } else {
      setXiIds((prev) => [...prev, id]);
    }
    setOrder((prev) => ({ ...prev, [player.category]: [...prev[player.category], id] }));
  }

  function removePlayer(id) {
    const player = byId[id];
    if (!player) return;
    setXiIds((prev) => prev.filter((x) => x !== id));
    setSubIds((prev) => prev.filter((x) => x !== id));
    setOrder((prev) => ({
      ...prev,
      [player.category]: prev[player.category].filter((x) => x !== id),
    }));
    if (captainId === id) setCaptainId("");
    if (viceCaptainId === id) setViceCaptainId("");
  }

  function reorderSection(roleKey, from, to) {
    setOrder((prev) => {
      const list = [...prev[roleKey]];
      const [moved] = list.splice(from, 1);
      list.splice(to, 0, moved);
      return { ...prev, [roleKey]: list };
    });
  }

  function clearXI() {
    setXiIds([]);
    setSubIds([]);
    setOrder(() => {
      const grouped = {};
      SECTION_ORDER.forEach((k) => (grouped[k] = []));
      return grouped;
    });
    setCaptainId("");
    setViceCaptainId("");
  }

  function autoArrange() {
    setOrder((prev) => {
      const next = {};
      SECTION_ORDER.forEach((k) => {
        next[k] = [...prev[k]].sort((a, b) => byId[b].points - byId[a].points);
      });
      return next;
    });
  }

  function handleSave() {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2200);
  }

  const xiPlayersFlat = [...xiIds, ...subIds].map((id) => byId[id]).filter(Boolean);

  return (
    <div className="min-h-screen w-full bg-slate-50 p-3 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px]">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Playing XI</h1>
            <p className="text-sm text-slate-500 mt-0.5">Select and arrange your best 11 players for the match.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2">
              <Crown className="h-4 w-4 text-amber-500" />
              <span className="text-xs text-slate-500">Team:</span>
              <span className="text-sm font-semibold text-slate-800">Warrior Kings</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2">
              <span className="text-xs text-slate-500">Format:</span>
              <span className="text-sm font-semibold text-emerald-700">T20</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5">
          {/* LEFT: Player selection */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 h-fit lg:sticky lg:top-6">
            <h2 className="text-sm font-bold tracking-tight text-slate-800 mb-3">PLAYER SELECTION</h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {SECTION_ORDER.map((k) => (
                <RoleFilterCard
                  key={k}
                  roleKey={k}
                  count={counts[k]}
                  active={activeFilter === k}
                  onClick={() => setActiveFilter((prev) => (prev === k ? null : k))}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search players..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                />
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>

            <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1 -mr-1">
              {SECTION_ORDER.map((k) => {
                const list = rosterByCategory[k];
                if (!list || list.length === 0) return null;
                const meta = ROLE_META[k];
                const colors = COLOR_CLASSES[meta.color];
                return (
                  <div key={k}>
                    <div className="flex items-center gap-1.5 mb-1.5 px-1">
                      <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                      <h3 className={`text-xs font-bold tracking-tight ${colors.chipText}`}>
                        {meta.short} ({list.length})
                      </h3>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {list.map((p) => (
                        <RosterRow key={p.id} player={p} added={selectedIds.has(p.id)} onAdd={addPlayer} />
                      ))}
                    </div>
                  </div>
                );
              })}
              {filteredRoster.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-6">No players match your search.</p>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-400">
              <span><b className="text-slate-500">RHB</b> - Right Hand Bat</span>
              <span><b className="text-slate-500">LHB</b> - Left Hand Bat</span>
              <span><b className="text-slate-500">WK</b> - Wicket Keeper</span>
            </div>
          </div>

          {/* RIGHT: Playing XI */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-emerald-500" />
                <h2 className="text-base font-bold text-slate-800">
                  PLAYING XI ({xiCount}/{XI_TARGET})
                </h2>
                {isComplete && <Check className="h-5 w-5 text-emerald-500 bg-emerald-50 rounded-full p-0.5" />}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearXI}
                  className="flex items-center gap-1.5 rounded-lg border border-rose-200 text-rose-600 px-3 py-1.5 text-sm font-medium hover:bg-rose-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear XI
                </button>
                <button
                  type="button"
                  onClick={autoArrange}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 text-slate-600 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
                >
                  <Shuffle className="h-3.5 w-3.5" />
                  Auto Arrange
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-sky-100 bg-sky-50 px-3.5 py-2.5 mb-5">
              <Info className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
              <p className="text-xs text-sky-700">
                Drag and drop players to rearrange within a role, or use the &times; to send a player back to the roster.
              </p>
            </div>

            <div className="space-y-4">
              {SECTION_ORDER.map((k) => (
                <XISection
                  key={k}
                  roleKey={k}
                  players={order[k].map((id) => byId[id])}
                  onRemove={removePlayer}
                  onReorder={reorderSection}
                />
              ))}
              {xiCount === 0 && subIds.length === 0 && (
                <div className="text-center py-16 text-slate-400 text-sm">
                  No players selected yet — add players from the roster on the left.
                </div>
              )}
            </div>

            {/* Captain / Vice Captain + Save */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col lg:flex-row lg:items-end gap-4">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5">
                    Captain
                    <span className="h-4 w-4 rounded-full bg-amber-400 text-white text-[9px] font-bold flex items-center justify-center">
                      C
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      value={captainId}
                      onChange={(e) => setCaptainId(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                    >
                      <option value="">Select captain</option>
                      {xiPlayersFlat.map((p) => (
                        <option key={p.id} value={p.id} disabled={p.id === viceCaptainId}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="h-4 w-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5">
                    Vice Captain
                    <span className="h-4 w-4 rounded-full bg-sky-500 text-white text-[9px] font-bold flex items-center justify-center">
                      VC
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      value={viceCaptainId}
                      onChange={(e) => setViceCaptainId(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                    >
                      <option value="">Select vice captain</option>
                      {xiPlayersFlat.map((p) => (
                        <option key={p.id} value={p.id} disabled={p.id === captainId}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="h-4 w-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSave}
                disabled={!isComplete}
                className={`flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition w-full lg:w-auto ${
                  isComplete ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                <Save className="h-4 w-4" />
                {savedFlash ? "Saved!" : "Save Playing XI"}
              </button>
            </div>
            {!isComplete && (
              <p className="text-xs text-amber-600 mt-2 text-right">
                Select {XI_TARGET - xiCount} more {XI_TARGET - xiCount === 1 ? "player" : "players"} to complete your XI.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}