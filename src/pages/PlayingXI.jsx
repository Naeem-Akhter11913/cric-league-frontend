// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   Trash2, Info, Search, X, Plus, Check, GripVertical,
//   Award, Repeat, CircleDot, Hand, Users, Save, ChevronDown,
// } from "lucide-react";
// import toast from "react-hot-toast";
// import { useAppDispatch, useAppSelector } from "../store/hooks";
// import { fetchPlayingXI, savePlayingXI } from "../store/action/playingXI.action";
// import { clearPlayingXI } from "../store/Slice/playingXISlice";

// // ---------------------------------------------------------------------------
// // Constants
// // ---------------------------------------------------------------------------

// const ROLE_META = {
//   batter: { label: "Batters", short: "BATTERS", icon: Award, color: "emerald" },
//   allrounder: { label: "All Rounders", short: "ALL ROUNDERS", icon: Repeat, color: "violet" },
//   bowler: { label: "Bowlers", short: "BOWLERS", icon: CircleDot, color: "sky" },
//   keeper: { label: "Wicket Keepers", short: "WICKET KEEPER", icon: Hand, color: "amber" },
//   substitute: { label: "Substitute", short: "SUBSTITUTES", icon: Users, color: "rose" },
// };

// const COLOR_CLASSES = {
//   emerald: {
//     text: "text-emerald-600", chipText: "text-emerald-700", chipBg: "bg-emerald-50",
//     border: "border-emerald-100", ring: "ring-emerald-200",
//     tabActive: "border-emerald-500 bg-emerald-50 text-emerald-700", dot: "bg-emerald-500",
//   },
//   violet: {
//     text: "text-violet-600", chipText: "text-violet-700", chipBg: "bg-violet-50",
//     border: "border-violet-100", ring: "ring-violet-200",
//     tabActive: "border-violet-500 bg-violet-50 text-violet-700", dot: "bg-violet-500",
//   },
//   sky: {
//     text: "text-sky-600", chipText: "text-sky-700", chipBg: "bg-sky-50",
//     border: "border-sky-100", ring: "ring-sky-200",
//     tabActive: "border-sky-500 bg-sky-50 text-sky-700", dot: "bg-sky-500",
//   },
//   amber: {
//     text: "text-amber-600", chipText: "text-amber-700", chipBg: "bg-amber-50",
//     border: "border-amber-100", ring: "ring-amber-200",
//     tabActive: "border-amber-500 bg-amber-50 text-amber-700", dot: "bg-amber-500",
//   },
//   rose: {
//     text: "text-rose-600", chipText: "text-rose-700", chipBg: "bg-rose-50",
//     border: "border-rose-100", ring: "ring-rose-200",
//     tabActive: "border-rose-500 bg-rose-50 text-rose-700", dot: "bg-rose-500",
//   },
// };

// const FORMATS = ["T20", "T10", "ODI", "Test"];
// const SECTION_ORDER = ["batter", "allrounder", "bowler", "keeper", "substitute"];
// const FILTER_ORDER = ["batter", "allrounder", "bowler", "keeper"];
// const XI_TARGET = 11;
// const MAX_SUBS = 4;
// const EMPTY = [];

// // Team players come from the API populated like the Player docs in CreateTeam:
// // { _id, userId: { name }, battingStyle, bowlingStyle, playerType }
// const toCategory = (playerType = "") => {
//   const t = playerType.toLowerCase();
//   if (t === "batter") return "batter";
//   if (t === "bowler") return "bowler";
//   if (t.includes("keeper")) return "keeper";
//   return "allrounder";
// };

// const toRosterPlayer = (p) => ({
//   id: p._id,
//   name: p.userId?.name || "Unknown",
//   hand: p.battingStyle || "",
//   roleDetail: p.bowlingStyle || "",
//   category: toCategory(p.playerType),
// });

// // ---------------------------------------------------------------------------
// // Small components
// // ---------------------------------------------------------------------------

// function initials(name) {
//   return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
// }

// function Avatar({ name, size = "md" }) {
//   const sizes = { sm: "h-9 w-9 text-xs", md: "h-11 w-11 text-sm" };
//   return (
//     <div
//       className={`${sizes[size]} shrink-0 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white font-semibold flex items-center justify-center ring-2 ring-white shadow-sm`}
//     >
//       {initials(name)}
//     </div>
//   );
// }

// function RoleFilterCard({ roleKey, count, active, onClick }) {
//   const meta = ROLE_META[roleKey];
//   const colors = COLOR_CLASSES[meta.color];
//   const Icon = meta.icon;
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`flex-1 min-w-[86px] rounded-xl border px-3 py-2.5 text-left transition ${active ? colors.tabActive : "border-slate-200 bg-white hover:bg-slate-50"
//         }`}
//     >
//       <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${active ? "" : colors.text}`}>
//         <Icon className="h-3.5 w-3.5" />
//         <span>{meta.label}</span>
//       </div>
//       <div className="mt-1 flex items-baseline gap-1">
//         <span className="text-lg font-bold text-slate-900 leading-none">{count}</span>
//         <span className="text-[11px] text-slate-400">{count === 1 ? "Player" : "Players"}</span>
//       </div>
//     </button>
//   );
// }

// function HeaderSelect({ label, value, onChange, tone, children }) {
//   const tones = {
//     amber: "border-amber-200 bg-amber-50",
//     emerald: "border-emerald-200 bg-emerald-50",
//   };
//   return (
//     <label className={`relative flex items-center gap-2 rounded-xl border px-3.5 py-2 ${tones[tone]}`}>
//       <span className="text-xs text-slate-500">{label}:</span>
//       <select
//         value={value}
//         onChange={onChange}
//         className="cursor-pointer appearance-none bg-transparent pr-5 text-sm font-semibold text-slate-800 focus:outline-none"
//       >
//         {children}
//       </select>
//       <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-400" />
//     </label>
//   );
// }

// function RosterRow({ player, status, xiFull, subsFull, onAddXI, onAddSub }) {
//   return (
//     <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg transition">
//       <Avatar name={player.name} size="sm" />
//       <div className="min-w-0 flex-1">
//         <p className="text-sm font-semibold text-slate-800 truncate">{player.name}</p>
//         <p className="text-xs text-slate-400 truncate">
//           {[player.hand, player.roleDetail].filter(Boolean).join(" · ") || "—"}
//         </p>
//       </div>
//       {status ? (
//         <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
//           <Check className="h-4 w-4" />
//           {status === "xi" ? "XI" : "Sub"}
//         </span>
//       ) : (
//         <div className="flex items-center gap-1.5">
//           <button
//             type="button"
//             onClick={() => onAddXI(player.id)}
//             disabled={xiFull}
//             title={xiFull ? "Playing XI is full" : "Add to Playing XI"}
//             className="h-7 w-7 rounded-md border border-slate-200 bg-white text-slate-500 flex items-center justify-center hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             <Plus className="h-4 w-4" />
//           </button>
//           <button
//             type="button"
//             onClick={() => onAddSub(player.id)}
//             disabled={subsFull}
//             title={subsFull ? "Substitutes full" : "Add as substitute"}
//             className="h-7 rounded-md border border-slate-200 bg-white px-2 text-[11px] font-semibold text-slate-500 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Sub
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// function XICard({ player, badge, onRemove, onDragStart, onDragOver, onDrop, onDragEnd, isDragging }) {
//   return (
//     <div
//       draggable
//       onDragStart={onDragStart}
//       onDragOver={onDragOver}
//       onDrop={onDrop}
//       onDragEnd={onDragEnd}
//       className={`group flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition ${isDragging ? "opacity-40" : "hover:shadow-md hover:border-slate-300"
//         }`}
//     >
//       <span className="cursor-grab active:cursor-grabbing text-slate-300 group-hover:text-slate-400">
//         <GripVertical className="h-4 w-4" />
//       </span>
//       <Avatar name={player.name} size="sm" />
//       <div className="min-w-0 flex-1">
//         <p className="text-sm font-semibold text-slate-800 truncate">{player.name}</p>
//         <p className="text-xs font-medium text-emerald-600 truncate">
//           {[player.hand, player.roleDetail].filter(Boolean).join(" · ") || "—"}
//         </p>
//       </div>
//       {badge && (
//         <span
//           className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white ${badge === "C" ? "bg-amber-400" : "bg-sky-500"
//             }`}
//         >
//           {badge}
//         </span>
//       )}
//       <button
//         type="button"
//         onClick={() => onRemove(player.id)}
//         className="h-6 w-6 shrink-0 rounded-md flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition"
//         title="Remove"
//       >
//         <X className="h-4 w-4" />
//       </button>
//     </div>
//   );
// }

// function XISection({ roleKey, players, captainId, viceCaptainId, onRemove, onReorder }) {
//   const meta = ROLE_META[roleKey];
//   const colors = COLOR_CLASSES[meta.color];
//   const Icon = meta.icon;
//   const [dragIndex, setDragIndex] = useState(null);

//   if (players.length === 0) return null;

//   return (
//     <section className={`rounded-2xl border ${colors.border} ${colors.chipBg} bg-opacity-40 p-4 sm:p-5`}>
//       <div className="flex items-center gap-2 mb-3">
//         <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
//         <Icon className={`h-4 w-4 ${colors.text}`} />
//         <h3 className={`text-sm font-bold tracking-tight ${colors.chipText}`}>
//           {meta.short} ({players.length})
//         </h3>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
//         {players.map((p, idx) => (
//           <XICard
//             key={p.id}
//             player={p}
//             badge={p.id === captainId ? "C" : p.id === viceCaptainId ? "VC" : null}
//             onRemove={onRemove}
//             isDragging={dragIndex === idx}
//             onDragStart={() => setDragIndex(idx)}
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={() => {
//               if (dragIndex === null || dragIndex === idx) return;
//               onReorder(roleKey, dragIndex, idx);
//               setDragIndex(null);
//             }}
//             onDragEnd={() => setDragIndex(null)}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// // ---------------------------------------------------------------------------
// // Main component
// // ---------------------------------------------------------------------------

// export default function PlayingXI({ initialTeamId = "", initialFormat = "T20", isEdit = false, initialXI = null, onSaved }) {
//   const dispatch = useAppDispatch();
//   const teams = useAppSelector((s) => s.team.list) || EMPTY;
//   const { current: saved, loading, saving } = useAppSelector((s) => s.playingXI);
//   const hydrated = useRef(false);
//   const [teamId, setTeamId] = useState("");
//   const [format, setFormat] = useState("T20");
//   const [xiIds, setXiIds] = useState([]);
//   const [subIds, setSubIds] = useState([]);
//   const [captainId, setCaptainId] = useState("");
//   const [viceCaptainId, setViceCaptainId] = useState("");
//   const [search, setSearch] = useState("");
//   const [activeFilter, setActiveFilter] = useState(null);

//   const team = useMemo(() => teams.find((t) => t._id === teamId), [teams, teamId]);

//   const roster = useMemo(
//     () => (team?.players || EMPTY).filter((p) => typeof p === "object").map(toRosterPlayer),
//     [team]
//   );
//   const byId = useMemo(() => Object.fromEntries(roster.map((p) => [p.id, p])), [roster]);

//   // 1) Team or format changed: reset the screen, then ask the API for a saved XI
//   useEffect(() => {
//     // setXiIds([]);
//     // setSubIds([]);
//     // setCaptainId("");
//     // setViceCaptainId("");
//     // setSearch("");
//     // setActiveFilter(null);
//     // dispatch(clearPlayingXI());
//     // if (!teamId) return;

//     // let stale = false;

//     setXiIds([]);
//     setSubIds([]);
//     setCaptainId("");
//     setViceCaptainId("");
//     setSearch("");
//     setActiveFilter(null);
//     dispatch(clearPlayingXI());
//     if (!teamId) return;
//     if (initialXI) return;   // edit mode: filled from the table row below

//     let stale = false;
//     dispatch(fetchPlayingXI({ teamId, format }))
//       .unwrap()
//       .catch((err) => {
//         if (!stale) toast.error(typeof err === "string" ? err : "Failed to load Playing XI");
//       });
//     return () => { stale = true; };
//   }, [teamId, format, dispatch]);

//   // 2) A saved XI arrived in the store: fill the screen from it (only if it matches
//   //    the current selection, so a late response can't overwrite another team's screen)
//   useEffect(() => {
//     if (!saved || String(saved.teamId) !== teamId || saved.format !== format) return;
//     const inRoster = (id) => !!byId[id];
//     const xi = (saved.players || []).map(String).filter(inRoster);
//     setXiIds(xi);
//     setSubIds((saved.substitutes || []).map(String).filter(inRoster));
//     setCaptainId(xi.includes(String(saved.captain)) ? String(saved.captain) : "");
//     setViceCaptainId(xi.includes(String(saved.viceCaptain)) ? String(saved.viceCaptain) : "");
//     // Only re-run when the saved XI changes; a teams refetch must not wipe in-progress edits.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [saved]);

//   const xiSet = useMemo(() => new Set(xiIds), [xiIds]);
//   const subSet = useMemo(() => new Set(subIds), [subIds]);

//   const counts = useMemo(() => {
//     const c = { batter: 0, allrounder: 0, bowler: 0, keeper: 0 };
//     roster.forEach((p) => c[p.category]++);
//     return c;
//   }, [roster]);

//   const rosterByCategory = useMemo(() => {
//     const grouped = { batter: [], allrounder: [], bowler: [], keeper: [] };
//     roster
//       .filter(
//         (p) =>
//           (!activeFilter || p.category === activeFilter) &&
//           p.name.toLowerCase().includes(search.trim().toLowerCase())
//       )
//       .forEach((p) => grouped[p.category].push(p));
//     return grouped;
//   }, [roster, activeFilter, search]);

//   const sections = useMemo(() => {
//     const g = { batter: [], allrounder: [], bowler: [], keeper: [], substitute: [] };
//     xiIds.forEach((id) => byId[id] && g[byId[id].category].push(byId[id]));
//     subIds.forEach((id) => byId[id] && g.substitute.push(byId[id]));
//     return g;
//   }, [xiIds, subIds, byId]);

//   const xiCount = xiIds.length;
//   const isComplete = xiCount === XI_TARGET;
//   const canSave = isComplete && captainId && viceCaptainId && captainId !== viceCaptainId;
//   const xiPlayers = xiIds.map((id) => byId[id]).filter(Boolean);

//   const addToXI = (id) => {
//     if (xiSet.has(id) || subSet.has(id) || xiIds.length >= XI_TARGET) return;
//     setXiIds((prev) => [...prev, id]);
//   };

//   const addAsSub = (id) => {
//     if (xiSet.has(id) || subSet.has(id) || subIds.length >= MAX_SUBS) return;
//     setSubIds((prev) => [...prev, id]);
//   };

//   const removePlayer = (id) => {
//     setXiIds((prev) => prev.filter((x) => x !== id));
//     setSubIds((prev) => prev.filter((x) => x !== id));
//     if (captainId === id) setCaptainId("");
//     if (viceCaptainId === id) setViceCaptainId("");
//   };

//   const reorderSection = (roleKey, from, to) => {
//     if (roleKey === "substitute") {
//       setSubIds((prev) => {
//         const list = [...prev];
//         const [moved] = list.splice(from, 1);
//         list.splice(to, 0, moved);
//         return list;
//       });
//       return;
//     }
//     setXiIds((prev) => {
//       const section = prev.filter((id) => byId[id].category === roleKey);
//       const [moved] = section.splice(from, 1);
//       section.splice(to, 0, moved);
//       let i = 0;
//       return prev.map((id) => (byId[id].category === roleKey ? section[i++] : id));
//     });
//   };

//   const clearXI = () => {
//     setXiIds([]);
//     setSubIds([]);
//     setCaptainId("");
//     setViceCaptainId("");
//   };

//   const handleSave = async () => {
//     if (!canSave || saving) return;
//     try {
//       await dispatch(
//         savePlayingXI({
//           teamId,
//           format,
//           players: xiIds,
//           substitutes: subIds,
//           captain: captainId,
//           viceCaptain: viceCaptainId,
//         })
//       ).unwrap();
//       toast.success("Playing XI saved");
//     } catch (err) {
//       toast.error(typeof err === "string" ? err : "Failed to save Playing XI");
//     }
//   };

//   const hint = !teamId
//     ? null
//     : loading
//       ? "Loading saved Playing XI..."
//       : roster.length < XI_TARGET
//         ? `This team has only ${roster.length} players. Edit the team to add more.`
//         : !isComplete
//           ? `Select ${XI_TARGET - xiCount} more ${XI_TARGET - xiCount === 1 ? "player" : "players"} to complete your XI.`
//           : !captainId || !viceCaptainId
//             ? "Choose a captain and a vice captain to save."
//             : null;




//   // 1) Create mode only: team or format changed -> reset, then load a saved XI if there is one
//   useEffect(() => {
//     if (initialXI) return; // edit mode: state already came from the table row
//     setXiIds([]);
//     setSubIds([]);
//     setCaptainId("");
//     setViceCaptainId("");
//     setSearch("");
//     setActiveFilter(null);
//     dispatch(clearPlayingXI());
//     if (!teamId) return;

//     let stale = false;
//     dispatch(fetchPlayingXI({ teamId, format }))
//       .unwrap()
//       .catch((err) => {
//         if (!stale) toast.error(typeof err === "string" ? err : "Failed to load Playing XI");
//       });
//     return () => { stale = true; };
//   }, [teamId, format, dispatch]);

//   // 2) Create mode only: a saved XI arrived in the store -> fill the screen from it
//   useEffect(() => {
//     if (initialXI || !saved || String(saved.teamId) !== teamId || saved.format !== format) return;
//     const inRoster = (id) => !!byId[id];
//     const xi = (saved.players || []).map(String).filter(inRoster);
//     setXiIds(xi);
//     setSubIds((saved.substitutes || []).map(String).filter(inRoster));
//     setCaptainId(xi.includes(String(saved.captain)) ? String(saved.captain) : "");
//     setViceCaptainId(xi.includes(String(saved.viceCaptain)) ? String(saved.viceCaptain) : "");
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [saved]);
//   return (
//     <div className="min-h-screen w-full bg-slate-50 p-3 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-[1500px]">
//         {/* Header */}
//         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
//           <div>
//             {/* <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Playing XI</h1> */}
//             <h1 className="text-xl font-bold text-slate-900">{isEdit ? "Edit Playing XI" : "Create Playing XI"}</h1>
//             <p className="text-sm text-slate-500 mt-0.5">Select and arrange your best 11 players for the match.</p>
//           </div>
//           <div className="flex flex-wrap items-center gap-2">
//             <HeaderSelect label="Team" tone="amber" value={teamId} onChange={(e) => setTeamId(e.target.value)}>
//               <option value="">Select team</option>
//               {teams.map((t) => (
//                 <option key={t._id} value={t._id}>{t.name}</option>
//               ))}
//             </HeaderSelect>
//             <HeaderSelect label="Format" tone="emerald" value={format} onChange={(e) => setFormat(e.target.value)}>
//               {FORMATS.map((f) => (
//                 <option key={f} value={f}>{f}</option>
//               ))}
//             </HeaderSelect>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5">
//           {/* LEFT: team roster */}
//           <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 h-fit lg:sticky lg:top-6">
//             <h2 className="text-sm font-bold tracking-tight text-slate-800 mb-3">TEAM PLAYERS</h2>

//             {!teamId ? (
//               <p className="text-sm text-slate-400 text-center py-10">Select a team to load its players.</p>
//             ) : (
//               <>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {FILTER_ORDER.filter((k) => k !== "keeper" || counts.keeper > 0).map((k) => (
//                     <RoleFilterCard
//                       key={k}
//                       roleKey={k}
//                       count={counts[k]}
//                       active={activeFilter === k}
//                       onClick={() => setActiveFilter((prev) => (prev === k ? null : k))}
//                     />
//                   ))}
//                 </div>

//                 <div className="relative mb-4">
//                   <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
//                   <input
//                     type="text"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     placeholder="Search players..."
//                     className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
//                   />
//                 </div>

//                 <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1 -mr-1">
//                   {FILTER_ORDER.map((k) => {
//                     const list = rosterByCategory[k];
//                     if (!list.length) return null;
//                     const meta = ROLE_META[k];
//                     const colors = COLOR_CLASSES[meta.color];
//                     return (
//                       <div key={k}>
//                         <div className="flex items-center gap-1.5 mb-1.5 px-1">
//                           <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
//                           <h3 className={`text-xs font-bold tracking-tight ${colors.chipText}`}>
//                             {meta.short} ({list.length})
//                           </h3>
//                         </div>
//                         <div className="divide-y divide-slate-50">
//                           {list.map((p) => (
//                             <RosterRow
//                               key={p.id}
//                               player={p}
//                               status={xiSet.has(p.id) ? "xi" : subSet.has(p.id) ? "sub" : null}
//                               xiFull={xiIds.length >= XI_TARGET}
//                               subsFull={subIds.length >= MAX_SUBS}
//                               onAddXI={addToXI}
//                               onAddSub={addAsSub}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     );
//                   })}
//                   {roster.length === 0 && (
//                     <p className="text-sm text-slate-400 text-center py-6">This team has no players yet.</p>
//                   )}
//                   {roster.length > 0 && FILTER_ORDER.every((k) => !rosterByCategory[k].length) && (
//                     <p className="text-sm text-slate-400 text-center py-6">No players match your search.</p>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>

//           {/* RIGHT: Playing XI */}
//           <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
//             <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <span className="h-5 w-1 rounded-full bg-emerald-500" />
//                 <h2 className="text-base font-bold text-slate-800">
//                   PLAYING XI ({xiCount}/{XI_TARGET}) · {subIds.length}/{MAX_SUBS} subs
//                 </h2>
//                 {isComplete && <Check className="h-5 w-5 text-emerald-500 bg-emerald-50 rounded-full p-0.5" />}
//               </div>
//               <button
//                 type="button"
//                 onClick={clearXI}
//                 disabled={!xiCount && !subIds.length}
//                 className="flex items-center gap-1.5 rounded-lg border border-rose-200 text-rose-600 px-3 py-1.5 text-sm font-medium hover:bg-rose-50 disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 <Trash2 className="h-3.5 w-3.5" />
//                 Clear XI
//               </button>
//             </div>

//             <div className="flex items-start gap-2 rounded-xl border border-sky-100 bg-sky-50 px-3.5 py-2.5 mb-5">
//               <Info className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
//               <p className="text-xs text-sky-700">
//                 Use + to add a player to the XI or Sub to add a substitute. Drag to rearrange within a role, or use × to send a player back.
//               </p>
//             </div>

//             <div className="space-y-4">
//               {SECTION_ORDER.map((k) => (
//                 <XISection
//                   key={k}
//                   roleKey={k}
//                   players={sections[k]}
//                   captainId={captainId}
//                   viceCaptainId={viceCaptainId}
//                   onRemove={removePlayer}
//                   onReorder={reorderSection}
//                 />
//               ))}
//               {xiCount === 0 && subIds.length === 0 && (
//                 <div className="text-center py-16 text-slate-400 text-sm">
//                   {teamId
//                     ? "No players selected yet. Add players from the team on the left."
//                     : "Choose a team and format at the top right to start."}
//                 </div>
//               )}
//             </div>

//             {/* Captain / Vice Captain + Save */}
//             <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col lg:flex-row lg:items-end gap-4">
//               <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {[
//                   { label: "Captain", tag: "C", tagBg: "bg-amber-400", value: captainId, set: setCaptainId, other: viceCaptainId },
//                   { label: "Vice Captain", tag: "VC", tagBg: "bg-sky-500", value: viceCaptainId, set: setViceCaptainId, other: captainId },
//                 ].map((f) => (
//                   <div key={f.label}>
//                     <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5">
//                       {f.label}
//                       <span className={`h-4 min-w-[16px] px-1 rounded-full ${f.tagBg} text-white text-[9px] font-bold flex items-center justify-center`}>
//                         {f.tag}
//                       </span>
//                     </label>
//                     <div className="relative">
//                       <select
//                         value={f.value}
//                         onChange={(e) => f.set(e.target.value)}
//                         disabled={!xiPlayers.length}
//                         className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 disabled:bg-slate-50 disabled:text-slate-400"
//                       >
//                         <option value="">Select {f.label.toLowerCase()}</option>
//                         {xiPlayers.map((p) => (
//                           <option key={p.id} value={p.id} disabled={p.id === f.other}>
//                             {p.name}
//                           </option>
//                         ))}
//                       </select>
//                       <ChevronDown className="h-4 w-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 type="button"
//                 onClick={handleSave}
//                 disabled={!canSave || saving}
//                 className={`flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition w-full lg:w-auto ${canSave && !saving ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-300 cursor-not-allowed"
//                   }`}
//               >
//                 <Save className="h-4 w-4" />
//                 {saving ? "Saving..." : "Save Playing XI"}
//               </button>
//             </div>
//             {hint && <p className="text-xs text-amber-600 mt-2 text-right">{hint}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import {
  Trash2, Info, Search, X, Plus, Check, GripVertical,
  Award, Repeat, CircleDot, Hand, Users, Save, ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPlayingXI, savePlayingXI } from "../store/action/playingXI.action";
import { clearPlayingXI } from "../store/Slice/playingXISlice";

// ---------------------------------------------------------------------------
// Constants
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
    text: "text-emerald-600", chipText: "text-emerald-700", chipBg: "bg-emerald-50",
    border: "border-emerald-100", ring: "ring-emerald-200",
    tabActive: "border-emerald-500 bg-emerald-50 text-emerald-700", dot: "bg-emerald-500",
  },
  violet: {
    text: "text-violet-600", chipText: "text-violet-700", chipBg: "bg-violet-50",
    border: "border-violet-100", ring: "ring-violet-200",
    tabActive: "border-violet-500 bg-violet-50 text-violet-700", dot: "bg-violet-500",
  },
  sky: {
    text: "text-sky-600", chipText: "text-sky-700", chipBg: "bg-sky-50",
    border: "border-sky-100", ring: "ring-sky-200",
    tabActive: "border-sky-500 bg-sky-50 text-sky-700", dot: "bg-sky-500",
  },
  amber: {
    text: "text-amber-600", chipText: "text-amber-700", chipBg: "bg-amber-50",
    border: "border-amber-100", ring: "ring-amber-200",
    tabActive: "border-amber-500 bg-amber-50 text-amber-700", dot: "bg-amber-500",
  },
  rose: {
    text: "text-rose-600", chipText: "text-rose-700", chipBg: "bg-rose-50",
    border: "border-rose-100", ring: "ring-rose-200",
    tabActive: "border-rose-500 bg-rose-50 text-rose-700", dot: "bg-rose-500",
  },
};

const FORMATS = ["T20", "T10", "ODI", "Test"];
const SECTION_ORDER = ["batter", "allrounder", "bowler", "keeper", "substitute"];
const FILTER_ORDER = ["batter", "allrounder", "bowler", "keeper"];
const XI_TARGET = 11;
const MAX_SUBS = 4;
const EMPTY = [];

// Works whether a ref comes back as an id string or a populated object
const idOf = (v) => String(v && typeof v === "object" ? v._id : v ?? "");

// Team players come from the API populated like the Player docs in CreateTeam:
// { _id, userId: { name }, battingStyle, bowlingStyle, playerType }
const toCategory = (playerType = "") => {
  const t = playerType.toLowerCase();
  if (t === "batter") return "batter";
  if (t === "bowler") return "bowler";
  if (t.includes("keeper")) return "keeper";
  return "allrounder";
};

const toRosterPlayer = (p) => ({
  id: p._id,
  name: p.userId?.name || "Unknown",
  hand: p.battingStyle || "",
  roleDetail: p.bowlingStyle || "",
  category: toCategory(p.playerType),
});

// ---------------------------------------------------------------------------
// Small components
// ---------------------------------------------------------------------------

function initials(name) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
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

function HeaderSelect({ label, value, onChange, tone, disabled = false, children }) {
  const tones = {
    amber: "border-amber-200 bg-amber-50",
    emerald: "border-emerald-200 bg-emerald-50",
  };
  return (
    <label className={`relative flex items-center gap-2 rounded-xl border px-3.5 py-2 ${tones[tone]} ${disabled ? "opacity-60" : ""}`}>
      <span className="text-xs text-slate-500">{label}:</span>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="cursor-pointer appearance-none bg-transparent pr-5 text-sm font-semibold text-slate-800 focus:outline-none disabled:cursor-not-allowed"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-400" />
    </label>
  );
}

function RosterRow({ player, status, xiFull, subsFull, onAddXI, onAddSub }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg transition">
      <Avatar name={player.name} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800 truncate">{player.name}</p>
        <p className="text-xs text-slate-400 truncate">
          {[player.hand, player.roleDetail].filter(Boolean).join(" · ") || "—"}
        </p>
      </div>
      {status ? (
        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
          <Check className="h-4 w-4" />
          {status === "xi" ? "XI" : "Sub"}
        </span>
      ) : (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onAddXI(player.id)}
            disabled={xiFull}
            title={xiFull ? "Playing XI is full" : "Add to Playing XI"}
            className="h-7 w-7 rounded-md border border-slate-200 bg-white text-slate-500 flex items-center justify-center hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onAddSub(player.id)}
            disabled={subsFull}
            title={subsFull ? "Substitutes full" : "Add as substitute"}
            className="h-7 rounded-md border border-slate-200 bg-white px-2 text-[11px] font-semibold text-slate-500 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Sub
          </button>
        </div>
      )}
    </div>
  );
}

function XICard({ player, badge, onRemove, onDragStart, onDragOver, onDrop, onDragEnd, isDragging }) {
  return (
    <div
      draggable
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
          {[player.hand, player.roleDetail].filter(Boolean).join(" · ") || "—"}
        </p>
      </div>
      {badge && (
        <span
          className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white ${
            badge === "C" ? "bg-amber-400" : "bg-sky-500"
          }`}
        >
          {badge}
        </span>
      )}
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

function XISection({ roleKey, players, captainId, viceCaptainId, onRemove, onReorder }) {
  const meta = ROLE_META[roleKey];
  const colors = COLOR_CLASSES[meta.color];
  const Icon = meta.icon;
  const [dragIndex, setDragIndex] = useState(null);

  if (players.length === 0) return null;

  return (
    <section className={`rounded-2xl border ${colors.border} ${colors.chipBg} bg-opacity-40 p-4 sm:p-5`}>
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
            badge={p.id === captainId ? "C" : p.id === viceCaptainId ? "VC" : null}
            onRemove={onRemove}
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
// Main component
// ---------------------------------------------------------------------------

export default function PlayingXI({ initialTeamId = "", initialFormat = "T20", isEdit = false, initialXI = null, onSaved }) {
  const dispatch = useAppDispatch();
  const teams = useAppSelector((s) => s.team.list) || EMPTY;
  const { current: saved, loading, saving } = useAppSelector((s) => s.playingXI);

  // Edit mode starts from the clicked table row
  const [teamId, setTeamId] = useState(initialTeamId || idOf(initialXI?.teamId));
  const [format, setFormat] = useState(initialXI?.format || initialFormat);
  const [xiIds, setXiIds] = useState([]);
  const [subIds, setSubIds] = useState([]);
  const [captainId, setCaptainId] = useState("");
  const [viceCaptainId, setViceCaptainId] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [filledFor, setFilledFor] = useState(null); // which row we've already filled from

  const team = useMemo(() => teams.find((t) => t._id === teamId), [teams, teamId]);

  const roster = useMemo(
    () => (team?.players || EMPTY).filter((p) => typeof p === "object").map(toRosterPlayer),
    [team]
  );
  const byId = useMemo(() => Object.fromEntries(roster.map((p) => [p.id, p])), [roster]);

  // EDIT mode: fill from the table row as soon as the roster is available
  useEffect(() => {
    if (!initialXI || roster.length === 0 || filledFor === initialXI._id) return;
    const inRoster = (id) => !!byId[id];
    const xi = (initialXI.players || []).map(idOf).filter(inRoster);
    const cap = idOf(initialXI.captain);
    const vc = idOf(initialXI.viceCaptain);

    setXiIds(xi);
    setSubIds((initialXI.substitutes || []).map(idOf).filter(inRoster));
    setCaptainId(xi.includes(cap) ? cap : "");
    setViceCaptainId(xi.includes(vc) ? vc : "");
    setFilledFor(initialXI._id);
  }, [initialXI, roster, byId, filledFor]);

  // CREATE mode: team or format changed -> reset, then load a saved XI if there is one
  useEffect(() => {
    if (initialXI) return; // edit mode never resets or fetches
    setXiIds([]);
    setSubIds([]);
    setCaptainId("");
    setViceCaptainId("");
    setSearch("");
    setActiveFilter(null);
    dispatch(clearPlayingXI());
    if (!teamId) return;

    let stale = false;
    dispatch(fetchPlayingXI({ teamId, format }))
      .unwrap()
      .catch((err) => {
        if (!stale) toast.error(typeof err === "string" ? err : "Failed to load Playing XI");
      });
    return () => { stale = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, format, dispatch]);

  // CREATE mode: a saved XI arrived in the store -> fill the screen from it
  useEffect(() => {
    if (initialXI || !saved || String(saved.teamId) !== teamId || saved.format !== format) return;
    const inRoster = (id) => !!byId[id];
    const xi = (saved.players || []).map(String).filter(inRoster);
    setXiIds(xi);
    setSubIds((saved.substitutes || []).map(String).filter(inRoster));
    setCaptainId(xi.includes(String(saved.captain)) ? String(saved.captain) : "");
    setViceCaptainId(xi.includes(String(saved.viceCaptain)) ? String(saved.viceCaptain) : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved]);

  const xiSet = useMemo(() => new Set(xiIds), [xiIds]);
  const subSet = useMemo(() => new Set(subIds), [subIds]);

  const counts = useMemo(() => {
    const c = { batter: 0, allrounder: 0, bowler: 0, keeper: 0 };
    roster.forEach((p) => c[p.category]++);
    return c;
  }, [roster]);

  const rosterByCategory = useMemo(() => {
    const grouped = { batter: [], allrounder: [], bowler: [], keeper: [] };
    roster
      .filter(
        (p) =>
          (!activeFilter || p.category === activeFilter) &&
          p.name.toLowerCase().includes(search.trim().toLowerCase())
      )
      .forEach((p) => grouped[p.category].push(p));
    return grouped;
  }, [roster, activeFilter, search]);

  const sections = useMemo(() => {
    const g = { batter: [], allrounder: [], bowler: [], keeper: [], substitute: [] };
    xiIds.forEach((id) => byId[id] && g[byId[id].category].push(byId[id]));
    subIds.forEach((id) => byId[id] && g.substitute.push(byId[id]));
    return g;
  }, [xiIds, subIds, byId]);

  const xiCount = xiIds.length;
  const isComplete = xiCount === XI_TARGET;
  const canSave = isComplete && captainId && viceCaptainId && captainId !== viceCaptainId;
  const xiPlayers = xiIds.map((id) => byId[id]).filter(Boolean);

  const addToXI = (id) => {
    if (xiSet.has(id) || subSet.has(id) || xiIds.length >= XI_TARGET) return;
    setXiIds((prev) => [...prev, id]);
  };

  const addAsSub = (id) => {
    if (xiSet.has(id) || subSet.has(id) || subIds.length >= MAX_SUBS) return;
    setSubIds((prev) => [...prev, id]);
  };

  const removePlayer = (id) => {
    setXiIds((prev) => prev.filter((x) => x !== id));
    setSubIds((prev) => prev.filter((x) => x !== id));
    if (captainId === id) setCaptainId("");
    if (viceCaptainId === id) setViceCaptainId("");
  };

  const reorderSection = (roleKey, from, to) => {
    if (roleKey === "substitute") {
      setSubIds((prev) => {
        const list = [...prev];
        const [moved] = list.splice(from, 1);
        list.splice(to, 0, moved);
        return list;
      });
      return;
    }
    setXiIds((prev) => {
      const section = prev.filter((id) => byId[id].category === roleKey);
      const [moved] = section.splice(from, 1);
      section.splice(to, 0, moved);
      let i = 0;
      return prev.map((id) => (byId[id].category === roleKey ? section[i++] : id));
    });
  };

  const clearXI = () => {
    setXiIds([]);
    setSubIds([]);
    setCaptainId("");
    setViceCaptainId("");
  };

  const handleSave = async () => {
    if (!canSave || saving) return;
    try {
      await dispatch(
        savePlayingXI({
          teamId,
          format,
          players: xiIds,
          substitutes: subIds,
          captain: captainId,
          viceCaptain: viceCaptainId,
        })
      ).unwrap();
      toast.success("Playing XI saved");
      onSaved?.();
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to save Playing XI");
    }
  };

  const hint = !teamId
    ? null
    : loading
      ? "Loading saved Playing XI..."
      : roster.length < XI_TARGET
        ? `This team has only ${roster.length} players. Edit the team to add more.`
        : !isComplete
          ? `Select ${XI_TARGET - xiCount} more ${XI_TARGET - xiCount === 1 ? "player" : "players"} to complete your XI.`
          : !captainId || !viceCaptainId
            ? "Choose a captain and a vice captain to save."
            : null;

  return (
    <div className="min-h-screen w-full bg-slate-50 p-3 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px]">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{isEdit ? "Edit Playing XI" : "Create Playing XI"}</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {isEdit
                ? "Update the players, captain and vice captain, then save."
                : "Select and arrange your best 11 players for the match."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <HeaderSelect label="Team" tone="amber" value={teamId} disabled={isEdit} onChange={(e) => setTeamId(e.target.value)}>
              <option value="">Select team</option>
              {teams.map((t) => (
                <option key={t._id} value={t._id}>{t.name}</option>
              ))}
            </HeaderSelect>
            <HeaderSelect label="Format" tone="emerald" value={format} disabled={isEdit} onChange={(e) => setFormat(e.target.value)}>
              {FORMATS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </HeaderSelect>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5">
          {/* LEFT: team roster */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 h-fit lg:sticky lg:top-6">
            <h2 className="text-sm font-bold tracking-tight text-slate-800 mb-3">TEAM PLAYERS</h2>

            {!teamId ? (
              <p className="text-sm text-slate-400 text-center py-10">Select a team to load its players.</p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  {FILTER_ORDER.filter((k) => k !== "keeper" || counts.keeper > 0).map((k) => (
                    <RoleFilterCard
                      key={k}
                      roleKey={k}
                      count={counts[k]}
                      active={activeFilter === k}
                      onClick={() => setActiveFilter((prev) => (prev === k ? null : k))}
                    />
                  ))}
                </div>

                <div className="relative mb-4">
                  <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search players..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1 -mr-1">
                  {FILTER_ORDER.map((k) => {
                    const list = rosterByCategory[k];
                    if (!list.length) return null;
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
                            <RosterRow
                              key={p.id}
                              player={p}
                              status={xiSet.has(p.id) ? "xi" : subSet.has(p.id) ? "sub" : null}
                              xiFull={xiIds.length >= XI_TARGET}
                              subsFull={subIds.length >= MAX_SUBS}
                              onAddXI={addToXI}
                              onAddSub={addAsSub}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {roster.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-6">This team has no players yet.</p>
                  )}
                  {roster.length > 0 && FILTER_ORDER.every((k) => !rosterByCategory[k].length) && (
                    <p className="text-sm text-slate-400 text-center py-6">No players match your search.</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* RIGHT: Playing XI */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-emerald-500" />
                <h2 className="text-base font-bold text-slate-800">
                  PLAYING XI ({xiCount}/{XI_TARGET}) · {subIds.length}/{MAX_SUBS} subs
                </h2>
                {isComplete && <Check className="h-5 w-5 text-emerald-500 bg-emerald-50 rounded-full p-0.5" />}
              </div>
              <button
                type="button"
                onClick={clearXI}
                disabled={!xiCount && !subIds.length}
                className="flex items-center gap-1.5 rounded-lg border border-rose-200 text-rose-600 px-3 py-1.5 text-sm font-medium hover:bg-rose-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear XI
              </button>
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-sky-100 bg-sky-50 px-3.5 py-2.5 mb-5">
              <Info className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
              <p className="text-xs text-sky-700">
                Use + to add a player to the XI or Sub to add a substitute. Drag to rearrange within a role, or use × to send a player back.
              </p>
            </div>

            <div className="space-y-4">
              {SECTION_ORDER.map((k) => (
                <XISection
                  key={k}
                  roleKey={k}
                  players={sections[k]}
                  captainId={captainId}
                  viceCaptainId={viceCaptainId}
                  onRemove={removePlayer}
                  onReorder={reorderSection}
                />
              ))}
              {xiCount === 0 && subIds.length === 0 && (
                <div className="text-center py-16 text-slate-400 text-sm">
                  {teamId
                    ? "No players selected yet. Add players from the team on the left."
                    : "Choose a team and format at the top right to start."}
                </div>
              )}
            </div>

            {/* Captain / Vice Captain + Save */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col lg:flex-row lg:items-end gap-4">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Captain", tag: "C", tagBg: "bg-amber-400", value: captainId, set: setCaptainId, other: viceCaptainId },
                  { label: "Vice Captain", tag: "VC", tagBg: "bg-sky-500", value: viceCaptainId, set: setViceCaptainId, other: captainId },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5">
                      {f.label}
                      <span className={`h-4 min-w-[16px] px-1 rounded-full ${f.tagBg} text-white text-[9px] font-bold flex items-center justify-center`}>
                        {f.tag}
                      </span>
                    </label>
                    <div className="relative">
                      <select
                        value={f.value}
                        onChange={(e) => f.set(e.target.value)}
                        disabled={!xiPlayers.length}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 disabled:bg-slate-50 disabled:text-slate-400"
                      >
                        <option value="">Select {f.label.toLowerCase()}</option>
                        {xiPlayers.map((p) => (
                          <option key={p.id} value={p.id} disabled={p.id === f.other}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="h-4 w-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleSave}
                disabled={!canSave || saving}
                className={`flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition w-full lg:w-auto ${
                  canSave && !saving ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Playing XI"}
              </button>
            </div>
            {hint && <p className="text-xs text-amber-600 mt-2 text-right">{hint}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}