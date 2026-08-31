// import React, { useEffect, useState } from 'react'
// import {
//   Users2,
//   CheckCircle2,
//   UserRound,
//   Trophy,
//   Star,
//   Search,
//   SlidersHorizontal,
//   ChevronDown,
//   Plus,
//   Eye,
//   MoreVertical,
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react'
// import Modal from '../model/Modal';
// import CreateTeam from '../components/CreateTeam';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { playerList } from '../store/action/player.action';
// import { createTeam, updateTeam, teamList } from '../store/action/teamActions';
// import toast from 'react-hot-toast';
// import { clearTeamError, clearTeamSuccess } from '../store/Slice/teamSlice';
// import TeamCard from '../components/TeamCard';
// import TeamsTables from '../components/TeamsTables';

// const teamColors = {
//   "Royal Warriors": { bg: "#F2B84B", fg: "#7A4B00", label: "RW" },
//   "Super Kings": { bg: "#1E3A8A", fg: "#FFFFFF", label: "SK" },
//   "Thunder Bolts": { bg: "#2563EB", fg: "#FFFFFF", label: "TB" },
//   "Green Warriors": { bg: "#059669", fg: "#FFFFFF", label: "GW" },
//   "Blue Tigers": { bg: "#4338CA", fg: "#FFFFFF", label: "BT" },
//   "Strikers Club": { bg: "#16A34A", fg: "#FFFFFF", label: "SC" },
// };

// const tabs = ["All Teams", "Active", "Inactive", "Blocked"];


// const OrgTeams = () => {
//   const [activeTab, setActiveTab] = useState("All Teams");
//   const [listSearch, setListSearch] = useState("");
//   const [sortOpen, setSortOpen] = useState(false);
//   const [sortBy, setSortBy] = useState("Points: High to Low");
//   const [openMenu, setOpenMenu] = useState(null);
//   const [perPage, setPerPage] = useState(10);
//   const [page, setPage] = useState(1);
//   const [openModel, setOpenModel] = useState(false);
//   // Holds the team object being edited. null = the modal is in "create" mode.
//   // Set this (and open the modal) from an Edit action in TeamCard/TeamsTables.
//   const [editingTeam, setEditingTeam] = useState(null);
//   const dispatch = useAppDispatch();
//   const { list: playersList } = useAppSelector(state => state.players)
//   const { loading, error, success, list: allTeamList } = useAppSelector(state => state.team);

//   const sortOptions = ["Points: High to Low", "Points: Low to High", "Name A-Z", "Most Matches"];

//   // Derived, live stats computed straight from allTeamList (no more hardcoded numbers)
//   const totalTeams = allTeamList?.length || 0;
//   const activeTeams = (allTeamList || []).filter(
//     (t) => (t.status || "").toLowerCase() === "active"
//   ).length;
//   const totalPlayers = (allTeamList || []).reduce(
//     (sum, t) => sum + (t.players?.length || 0),
//     0
//   );
//   const tournamentsPlayed = (allTeamList || []).filter((t) => t.tournament).length;
//   // No win/points data comes back from the API yet, so "top performer" falls back
//   // to the team with the most registered players.
//   const topPerformer = (allTeamList || []).reduce((top, t) => {
//     if (!top) return t;
//     return (t.players?.length || 0) > (top.players?.length || 0) ? t : top;
//   }, null);

//   const statCards = [
//     { label: "Total Teams", value: totalTeams, sub: "Across All Tournaments", icon: Users2, bg: "#EEF2FF", fg: "#4F46E5" },
//     { label: "Active Teams", value: activeTeams, sub: "Currently Active", icon: CheckCircle2, bg: "#ECFDF5", fg: "#16A34A" },
//     { label: "Total Players", value: totalPlayers, sub: "Registered Players", icon: UserRound, bg: "#FFF7ED", fg: "#EA580C" },
//     { label: "Tournaments Played", value: tournamentsPlayed, sub: "Total Participation", icon: Trophy, bg: "#EFF6FF", fg: "#2563EB" },
//   ];

//   // Real team data comes from the API (allTeamList) — no more static mock rows.
//   // Fields not present in the API payload (tournaments, matches, won, lost, points)
//   // are rendered as "-" in the table below.
//   const filteredList = (allTeamList || []).filter((t) => {
//     const matchesTab =
//       activeTab === "All Teams"
//         ? true
//         : (t.status || "").toLowerCase() === activeTab.toLowerCase();
//     const matchesSearch = (t.name || "")
//       .toLowerCase()
//       .includes(listSearch.toLowerCase());
//     return matchesTab && matchesSearch;
//   });

//   // Single submit handler for the CreateTeam modal — CreateTeam tells us
//   // whether it was in edit mode via the second argument, so we dispatch the
//   // right thunk without needing two separate submit props.
//   const createTeamAction = (payload, isEdit) => {
//     if (isEdit) {
//         const {_id, ...rest} = payload;
//       dispatch(updateTeam({id: _id,payload:rest}));
//       // dispatch(updateTeam(payload));
//     } else {
//       dispatch(createTeam(payload));
//     }
//   }

//   // Opens the modal fresh, in create mode.
//   const handleOpenCreate = () => {
//     setEditingTeam(null);
//     setOpenModel(true);
//   };

//   // Opens the modal pre-filled with the given team. Wire this into the
//   // "Edit" action inside TeamCard's dropdown menu and TeamsTables' row menu,
//   // e.g. onClick={() => handleOpenEdit(team)}.
//   const handleOpenEdit = (team) => {
//     console.log(team)
//     setEditingTeam(team);
//     setOpenModel(true);
//   };

//   // Always clear the edit target when the modal closes so the next open
//   // (e.g. clicking "Register New Team") starts from a blank form.
//   const handleCloseModal = () => {
//     setOpenModel(false);
//     setEditingTeam(null);
//   };

//   useEffect(() => {
//     dispatch(playerList({ page: 1, limit: 20 }));
//     dispatch(teamList({ page: 1, limit: 20 }))
//   }, []);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       clearTeamError()
//       return;
//     }

//     if (success) {
//       toast.success(success);
//       clearTeamSuccess();
//       handleCloseModal();
//       dispatch(teamList({ page: 1, limit: 20 }))
//       return;
//     }
//   }, [error, success]);

//   return (
//     <>
//       <div className="h-screen overflow-y-auto no-scrollbar bg-[#F7F7F9]">
//         <style>{`
//                 .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
//                 .no-scrollbar::-webkit-scrollbar { display: none; }
//             `}</style>

//         <div className="p-2 sm:p-6">
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
//               <p className="text-sm text-gray-500 mt-1">Manage and view all registered teams</p>
//             </div>
//             <button onClick={handleOpenCreate} className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0">
//               <Plus size={16} />
//               Register New Team
//             </button>
//           </div>

//           {/* Stat cards */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
//             {statCards.map((s, i) => (
//               <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
//                 <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: s.bg }}>
//                   <s.icon size={19} style={{ color: s.fg }} />
//                 </div>
//                 <div className="min-w-0">
//                   <div className="text-xs sm:text-sm text-gray-500 truncate">{s.label}</div>
//                   <div className="text-xl sm:text-2xl font-bold text-gray-900">{s.value}</div>
//                   <div className="text-xs text-gray-400 truncate">{s.sub}</div>
//                 </div>
//               </div>
//             ))}
//             <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
//               <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "#FDF2F8" }}>
//                 <Star size={19} style={{ color: "#DB2777" }} />
//               </div>
//               <div className="min-w-0">
//                 <div className="text-xs sm:text-sm text-gray-500 truncate">Top Performer</div>
//                 <div className="text-lg sm:text-xl font-bold text-gray-900 truncate">{topPerformer?.name || "N/A"}</div>
//                 <div className="text-xs text-gray-400 truncate">Most Players Registered</div>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-5">
//             <div className="flex items-center gap-5 border-b border-gray-200 lg:border-0 w-full lg:w-auto overflow-x-auto no-scrollbar">
//               {tabs.map((t) => (
//                 <button
//                   key={t}
//                   onClick={() => setActiveTab(t)}
//                   className={`pb-2.5 lg:pb-0 text-sm font-medium whitespace-nowrap border-b-2 lg:border-0 transition-colors ${activeTab === t ? "text-[#4F46E5] border-[#4F46E5]" : "text-gray-500 border-transparent hover:text-gray-700"
//                     }`}
//                 >
//                   {t}
//                 </button>
//               ))}
//             </div>
//             <div className="flex items-center gap-2 flex-wrap">
//               <div className="relative">
//                 <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   value={listSearch}
//                   onChange={(e) => setListSearch(e.target.value)}
//                   type="text"
//                   placeholder="Search teams..."
//                   className="h-10 pl-9 pr-3 w-48 sm:w-56 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all"
//                 />
//               </div>
//               <button className="flex items-center gap-1.5 h-10 px-3.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
//                 <SlidersHorizontal size={15} />
//                 Filters
//               </button>
//               <div className="relative">
//                 <button
//                   onClick={() => setSortOpen(!sortOpen)}
//                   className="flex items-center gap-1.5 h-10 px-3.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
//                 >
//                   Sort By
//                   <ChevronDown size={15} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
//                 </button>
//                 {sortOpen && (
//                   <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
//                     {sortOptions.map((opt) => (
//                       <button
//                         key={opt}
//                         onClick={() => { setSortBy(opt); setSortOpen(false); }}
//                         className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${sortBy === opt ? "text-[#4F46E5] font-medium" : "text-gray-600"
//                           }`}
//                       >
//                         {opt}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>


//           <TeamsTables
//             page={page}
//             filteredList={filteredList}
//             setPerPage={setPerPage}
//             setPage={setPage}
//             perPage={perPage}
//             onEdit={handleOpenEdit}
//           />
//         </div>
//       </div>
//       <Modal
//         open={openModel}
//         onClose={handleCloseModal}
//         islogin
//       >
//         <CreateTeam
//           players={playersList}
//           submitTeam={createTeamAction}
//           loading={loading}
//           initialTeam={editingTeam}
//         />
//       </Modal>
//     </>
//   )
// }

// export default OrgTeams


import React, { useEffect, useState } from 'react'
import {
  Users2,
  CheckCircle2,
  UserRound,
  Trophy,
  Star,
  Plus,
} from 'lucide-react'
import Modal from '../model/Modal';
import CreateTeam from '../components/CreateTeam';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { playerList } from '../store/action/player.action';
import { createTeam, updateTeam, teamList } from '../store/action/teamActions';
import toast from 'react-hot-toast';
import { clearTeamError, clearTeamSuccess } from '../store/Slice/teamSlice';
import TeamsTables from '../components/TeamsTables';
import PlayingXI from './PlayingXI';

const tabs = ["All Teams", "Active", "Inactive", "Blocked"];
const sortOptions = ["Points: High to Low", "Points: Low to High", "Name A-Z", "Most Matches"];

const OrgTeams = () => {
  const [activeTab, setActiveTab] = useState("All Teams");
  const [search, setSearch] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Points: High to Low");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [xiOpenModel,setOpenXIModel] = useState(false)
  // Holds the team object being edited. null = the modal is in "create" mode.
  // Set this (and open the modal) from an Edit action in TeamCard/TeamsTables.
  const [editingTeam, setEditingTeam] = useState(null);
  const dispatch = useAppDispatch();
  const { list: playersList } = useAppSelector(state => state.players)
  const { loading, error, success, list: allTeamList } = useAppSelector(state => state.team);

  // Derived, live stats computed straight from allTeamList (no more hardcoded numbers)
  const totalTeams = allTeamList?.length || 0;
  const activeTeams = (allTeamList || []).filter(
    (t) => (t.status || "").toLowerCase() === "active"
  ).length;
  const totalPlayers = (allTeamList || []).reduce(
    (sum, t) => sum + (t.players?.length || 0),
    0
  );
  const tournamentsPlayed = (allTeamList || []).filter((t) => t.tournament).length;
  // No win/points data comes back from the API yet, so "top performer" falls back
  // to the team with the most registered players.
  const topPerformer = (allTeamList || []).reduce((top, t) => {
    if (!top) return t;
    return (t.players?.length || 0) > (top.players?.length || 0) ? t : top;
  }, null);

  const statCards = [
    { label: "Total Teams", value: totalTeams, sub: "Across All Tournaments", icon: Users2, bg: "#EEF2FF", fg: "#4F46E5" },
    { label: "Active Teams", value: activeTeams, sub: "Currently Active", icon: CheckCircle2, bg: "#ECFDF5", fg: "#16A34A" },
    { label: "Total Players", value: totalPlayers, sub: "Registered Players", icon: UserRound, bg: "#FFF7ED", fg: "#EA580C" },
    { label: "Tournaments Played", value: tournamentsPlayed, sub: "Total Participation", icon: Trophy, bg: "#EFF6FF", fg: "#2563EB" },
  ];

  // Real team data comes from the API (allTeamList) — no more static mock rows.
  // Fields not present in the API payload (tournaments, matches, won, lost, points)
  // are rendered as "-" in the table below.
  const filteredList = (allTeamList || []).filter((t) => {
    const matchesTab =
      activeTab === "All Teams"
        ? true
        : (t.status || "").toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = (t.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Single submit handler for the CreateTeam modal — CreateTeam tells us
  // whether it was in edit mode via the second argument, so we dispatch the
  // right thunk without needing two separate submit props.
  const createTeamAction = (payload, isEdit) => {
    if (isEdit) {
      const { _id, ...rest } = payload;
      dispatch(updateTeam({ id: _id, payload: rest }));
    } else {
      dispatch(createTeam(payload));
    }
  }

  // Opens the modal fresh, in create mode.
  const handleOpenCreate = () => {
    setEditingTeam(null);
    setOpenModel(true);
  };

  // Opens the modal pre-filled with the given team. Wired into the "Edit"
  // action inside TeamsTables' row menu, e.g. onClick={() => handleOpenEdit(team)}.
  const handleOpenEdit = (team) => {
    setEditingTeam(team);
    setOpenModel(true);
  };

  // Always clear the edit target when the modal closes so the next open
  // (e.g. clicking "Register New Team") starts from a blank form.
  const handleCloseModal = () => {
    setOpenModel(false);
    setEditingTeam(null);
  };

  useEffect(() => {
    dispatch(playerList({ page: 1, limit: 20 }));
    dispatch(teamList({ page: 1, limit: 20 }))
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearTeamError()
      return;
    }

    if (success) {
      toast.success(success);
      clearTeamSuccess();
      handleCloseModal();
      dispatch(teamList({ page: 1, limit: 20 }))
      return;
    }
  }, [error, success]);

  return (
    <>
      <div className="h-screen overflow-y-auto no-scrollbar bg-[#F7F7F9]">
        <style>{`
                .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

        <div className="p-2 sm:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
              <p className="text-sm text-gray-500 mt-1">Manage and view all registered teams</p>
            </div>
            <div className='flex gap-3'>

              <button onClick={handleOpenCreate} className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0">
                <Plus size={16} />
                Register Team
              </button>
              <button onClick={() => setOpenXIModel(true)} className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0">
                <Plus size={16} />
                Create XI
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {statCards.map((s, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
                <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                  <s.icon size={19} style={{ color: s.fg }} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-gray-500 truncate">{s.label}</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-400 truncate">{s.sub}</div>
                </div>
              </div>
            ))}
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "#FDF2F8" }}>
                <Star size={19} style={{ color: "#DB2777" }} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-gray-500 truncate">Top Performer</div>
                <div className="text-lg sm:text-xl font-bold text-gray-900 truncate">{topPerformer?.name || "N/A"}</div>
                <div className="text-xs text-gray-400 truncate">Most Players Registered</div>
              </div>
            </div>
          </div>

          {/* Tabs, search and table now live inside one bordered container */}
          <TeamsTables
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            search={search}
            onSearchChange={(v) => { setSearch(v); setPage(1); }}
            sortOpen={sortOpen}
            setSortOpen={setSortOpen}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOptions={sortOptions}
            page={page}
            filteredList={filteredList}
            setPerPage={setPerPage}
            setPage={setPage}
            perPage={perPage}
            onEdit={handleOpenEdit}
          />
        </div>
      </div>
      <Modal
        open={openModel}
        onClose={handleCloseModal}
        islogin
      >
        <CreateTeam
          players={playersList}
          submitTeam={createTeamAction}
          loading={loading}
          initialTeam={editingTeam}
        />
      </Modal>
      <Modal
        open={xiOpenModel}
        onClose={() => setOpenXIModel(false)}
        islogin
      >
        <PlayingXI/>
      </Modal>
    </>
  )
}

export default OrgTeams